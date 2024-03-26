import warnings
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer,util
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from joblib import Parallel, delayed
warnings.filterwarnings("ignore")
from flask import Flask, request, jsonify
app = Flask(__name__)

import nltk
nltk.download('wordnet')

sim_thresh=0.25
top_recomm_val = 20
keyword_weight=2
model = SentenceTransformer('all-MiniLM-L6-v2')

with open('./Embeddings/embeddings_df.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

def CapitalizingLetter(df):
    print("Inside CapitalizingLetter")
    df['Observation Details'] = df['Observation Details'].str.capitalize()
    df['HazardA'] = df['HazardA'].str.capitalize()
    df['HazardB'] = df['HazardB'].str.capitalize()
    df['HazardC'] = df['HazardC'].str.capitalize()
    df['Hazard Category'] = df['Hazard Category'].str.capitalize()
    df['Risk_Category'] = df['Risk_Category'].str.capitalize()
    # df['New_Location'] = df['New_Location'].str.capitalize()
    # df['Location Category'] = df['Location Category'].str.capitalize()
    df['Nature of Work'] = df['Nature of Work'].str.capitalize()
    df['Associated Hazard'] = df['Associated Hazard'].str.capitalize()
    return df

loaded_data = CapitalizingLetter(loaded_data)
obs_embd = loaded_data['Obs_embd']

def preprocess(df):
    print("Inside preprocess")
    REPLACE_NO_SPACE = re.compile("(\.)|(\;)|(\:)|(\!)|(\')|(\?)|(\,)|(\")|(\|)|(\()|(\))|(\[)|(\])|(\%)|(\$)|(\>)|(\<)|(\{)|(\})")
    REPLACE_WITH_SPACE = re.compile("(<br\s/><br\s/?)|(-)|(/)|(:).")
    tempArr = []
    for line in df:
        # remove puctuation
        tmpL = REPLACE_NO_SPACE.sub("", line.lower())
        tmpL = REPLACE_WITH_SPACE.sub(" ", tmpL)
        tempArr.append(tmpL)
    return tempArr

def get_embeddings_miniLM(text,model=model):
    print("Inside get_embeddings_miniLM")
    corpus_embeddings = model.encode(text)
    return corpus_embeddings

def get_location_df(Location):
    print('Inside get_location_df')
    df_bldg = loaded_data[loaded_data['New_Location']==Location]
    df_others = loaded_data[loaded_data['New_Location']!=Location]
    return df_bldg,df_others

def cos_sim_miniLM(input_data, loaded_data, n_jobs=-1):
    print('MultiProcess-cos_sim_miniLM')

    input_data['Activity'] = preprocess(input_data['Activity'])
    input_data['input_text_embedding'] = input_data['Activity'].apply(get_embeddings_miniLM)

    vec_col1 = np.vstack(input_data['input_text_embedding'])
    vec_col2 = np.vstack(loaded_data['Obs_embd'])

    cos_sim = Parallel(n_jobs=n_jobs)(delayed(cosine_similarity)(vec1.reshape(1, -1), vec_col2) for vec1 in vec_col1)
    cos_sim = np.vstack(cos_sim)

    multi_index = pd.MultiIndex.from_product([input_data.index, loaded_data.index], names=["input_idx", "loaded_idx"])

    df_cos_sim = pd.DataFrame(cos_sim.flatten(), index=multi_index, columns=["cosine_similarity"]).reset_index()

    df_merge = df_cos_sim.merge(input_data, left_on="input_idx", right_index=True).merge(loaded_data, left_on="loaded_idx", right_index=True)

    df_merge = df_merge[['Activity', 'Observation Details', 'HazardA', 'cosine_similarity','Risk_Cal','Risk_Category','Hazard Category']]
    df_merge = df_merge.rename(columns={'HazardA':'Hazards'})
    df_merge = df_merge.drop_duplicates(subset=['Activity', 'Observation Details'])

    df_merge = df_merge.sort_values(by=['Activity', 'cosine_similarity'], ascending=False).reset_index(drop=True)
    return df_merge

def search_keywords(observations, keywords):
    print("Inside search_keywords")
    lemmatizer = WordNetLemmatizer()
    keyword_lemmas = {lemmatizer.lemmatize(keyword, wordnet.VERB) if ' ' not in keyword else keyword.lower() for keyword in keywords}
    results = []

    for obs in observations:
        obs_words = re.findall(r'\w+', obs.lower())
        obs_lemmas = {lemmatizer.lemmatize(word, wordnet.VERB) for word in obs_words}

        if keyword_lemmas.intersection(obs_lemmas):
            results.append(obs)
        else:
            for keyword in keyword_lemmas:
                if ' ' in keyword and keyword in obs.lower():
                    results.append(obs)
                    break
    return results

def sim_with_bldg(df_input,Location,sim_thresh):
    print('Inside sim_with_bldg')
    df_bldg,df_others = get_location_df(Location)
    recomm_bld14 = cos_sim_miniLM(df_input,df_bldg)
    recomm_others = cos_sim_miniLM(df_input,df_others)
    recomm_bld14['bldg'] = 'yes'
    recomm_others['bldg'] = 'no'

    combined_obs = pd.concat([recomm_bld14, recomm_others])
    combined_obs = combined_obs[combined_obs['cosine_similarity']>=sim_thresh]

    obs_lst = combined_obs['Observation Details'].unique().tolist()
    keyword_lst = combined_obs['Activity'].unique().tolist()

    results = search_keywords(obs_lst, keyword_lst)
    match_obs = pd.DataFrame({'Observation Details': results})

    match_obs['keyword_based'] = 'yes'

    combined_obs = combined_obs.merge(match_obs,on='Observation Details', how='left')
    combined_obs['keyword_based'] = combined_obs['keyword_based'].fillna('no')

    combined_obs = combined_obs.sort_values(by=['keyword_based'],ascending=False)
    combined_obs = combined_obs.drop_duplicates(subset=['Activity','Observation Details']).reset_index(drop=True)

    keywrd_weight =  combined_obs[combined_obs['keyword_based']=='yes'].groupby('Activity')['Observation Details'].nunique()
    emb_weight =  combined_obs[combined_obs['keyword_based']=='no'].groupby('Activity')['Observation Details'].nunique()

    combined_obs['keywrd_weight'] = combined_obs['Activity'].map(keywrd_weight)
    combined_obs['emb_weight'] = combined_obs['Activity'].map(emb_weight)

    combined_obs['keywrd_weight'] = combined_obs['keywrd_weight'].fillna(0)
    combined_obs['emb_weight'] = combined_obs['emb_weight'].fillna(0)

    act_weight_kwrd_emb = combined_obs[['Activity','keywrd_weight','emb_weight']]
    act_weight_kwrd_emb = act_weight_kwrd_emb.drop_duplicates().reset_index(drop=True)

    for i in range(len(act_weight_kwrd_emb)):
        if((act_weight_kwrd_emb['keywrd_weight'].iloc[i]!=0) and (act_weight_kwrd_emb['emb_weight'].iloc[i]>act_weight_kwrd_emb['keywrd_weight'].iloc[i]*2)):
            act_weight_kwrd_emb['emb_weight'].iloc[i] = act_weight_kwrd_emb['keywrd_weight'].iloc[i]*2

    act_weight_kwrd_emb['keyword_proportion'] = act_weight_kwrd_emb["keywrd_weight"] / (act_weight_kwrd_emb["keywrd_weight"] + act_weight_kwrd_emb["emb_weight"])
    act_weight_kwrd_emb['embedding_proportion'] = act_weight_kwrd_emb["emb_weight"] / (act_weight_kwrd_emb["keywrd_weight"] + act_weight_kwrd_emb["emb_weight"])

    act_weight_kwrd_emb["weighted_keyword_proportion"] = act_weight_kwrd_emb['keyword_proportion']*keyword_weight
    act_weight_kwrd_emb["sum_weighted_proportions"] = act_weight_kwrd_emb['weighted_keyword_proportion'] + act_weight_kwrd_emb['embedding_proportion']

    act_weight_kwrd_emb["normalized_keyword_proportion"] = act_weight_kwrd_emb["weighted_keyword_proportion"] / act_weight_kwrd_emb["sum_weighted_proportions"]
    act_weight_kwrd_emb["normalized_embedding_proportion"] = act_weight_kwrd_emb['embedding_proportion'] / act_weight_kwrd_emb["sum_weighted_proportions"]

    act_weight_kwrd_emb['sum_all_normalized_keyword_proportions'] = act_weight_kwrd_emb["normalized_keyword_proportion"].sum()
    act_weight_kwrd_emb['sum_all_normalized_embedding_proportions'] = act_weight_kwrd_emb["normalized_embedding_proportion"].sum()
    act_weight_kwrd_emb['sum_all_normalized_proportions'] = act_weight_kwrd_emb['sum_all_normalized_keyword_proportions'] + act_weight_kwrd_emb['sum_all_normalized_embedding_proportions']

    act_weight_kwrd_emb["keyword_hazards"] = round(top_recomm_val * (act_weight_kwrd_emb["normalized_keyword_proportion"] / act_weight_kwrd_emb['sum_all_normalized_proportions']))
    act_weight_kwrd_emb["embedding_hazards"] = round(top_recomm_val * (act_weight_kwrd_emb["normalized_embedding_proportion"] / act_weight_kwrd_emb['sum_all_normalized_proportions']))

    act_weight_kwrd_emb["obs_count"] = act_weight_kwrd_emb["keyword_hazards"] + act_weight_kwrd_emb["embedding_hazards"]

    act_weight_kwrd_emb = act_weight_kwrd_emb[['Activity','keywrd_weight','emb_weight','obs_count']]
    act_weight_kwrd_emb = act_weight_kwrd_emb.drop_duplicates().reset_index(drop=True)

    combined_obs = combined_obs.drop(columns={'keywrd_weight','emb_weight'})
    combined_obs = combined_obs.merge(act_weight_kwrd_emb,on='Activity',how='inner')

    return combined_obs

def obsCount_calculation_table(combined_obs_df,top_recomm_val):
    print("Inside obsCount_calculation_table")
    weight_input = combined_obs_df[['Activity','weightage', 'bldg_yes_count', 'bldg_no_count', 'keyword_based', 'obs_count']]
    weight_input = weight_input.drop_duplicates().reset_index(drop=True)

    # adding total observations, bldg yes & no count of keyword & embedding based observations
    weight_input['weightage'] =  weight_input.groupby('Activity')['weightage'].transform('sum')
    weight_input['bldg_yes_count'] =  weight_input.groupby('Activity')['bldg_yes_count'].transform('sum')
    weight_input['bldg_no_count'] =  weight_input.groupby('Activity')['bldg_no_count'].transform('sum')
    weight_input = weight_input.drop(columns={'keyword_based'})
    weight_input = weight_input.drop_duplicates().reset_index(drop=True)
    weight_input['bldg%'] = weight_input['obs_count']/weight_input['bldg_yes_count']

    if((weight_input['obs_count'].min())<=0):

        num_zeros = (weight_input['obs_count'] <= 0).sum()
        weight_input.loc[weight_input['obs_count'] <= 0, 'obs_count'] = 1
        max_val_index = weight_input['obs_count'].idxmax()
        diff = (weight_input['obs_count'].max()) - num_zeros
        weight_input.loc[max_val_index, 'obs_count'] = diff

    combined_obs_df = combined_obs_df.drop(columns={'weightage', 'bldg_yes_count', 'bldg_no_count', 'obs_count'})
    combined_obs_df = combined_obs_df.merge(weight_input, on='Activity', how='inner')
    combined_obs_df = combined_obs_df.sort_values(by=['Activity','keyword_based','cosine_similarity'], ascending=False)
    combined_obs_df = combined_obs_df.drop_duplicates(subset=['Activity','Observation Details']).reset_index(drop=True)
    return combined_obs_df

def topRecomm_weightedObs_bldgYes(activityObs_df):
    print("Inside topRecomm_weightedObs_bldgYes")
    topRecomm_weightedObs = pd.DataFrame()
    df_grp = activityObs_df.groupby('Activity')
    for k, val in df_grp:
        df = df_grp.get_group(k)
        df = df.sort_values(by=['keyword_based','cosine_similarity'], ascending=False).reset_index(drop=True)

        if(df['bldg_yes_count'][0]==0):
            df = (df[df['bldg']=='no']).head(int(df['obs_count'][0]))
        elif(df['bldg_no_count'][0]==0):
            df = (df[df['bldg']=='yes']).head(int(df['obs_count'][0]))
        elif(df['bldg%'][0]<=0.5):
            df = (df[df['bldg']=='yes']).head(int(df['obs_count'][0]))
        else:
            div_obs_cnt = round(df['obs_count'][0]/2)
            if(df['bldg_yes_count'][0]<div_obs_cnt):
                add_obs_to_bldgNo = div_obs_cnt - df['bldg_yes_count'][0]
                df_yes = (df[df['bldg']=='yes']).head(int(df['bldg_yes_count'][0]))
                df_no = (df[df['bldg']=='no']).head(int(df['obs_count'][0] - div_obs_cnt)+int(add_obs_to_bldgNo))
                df = pd.concat([df_yes,df_no])

            elif(df['bldg_no_count'][0]<div_obs_cnt):
                add_obs_to_bldgYes = div_obs_cnt - df['bldg_no_count'][0]
                df_yes = (df[df['bldg']=='yes']).head(int(df['obs_count'][0] - div_obs_cnt)+int(add_obs_to_bldgYes))
                df_no = (df[df['bldg']=='no']).head(int(df['bldg_no_count'][0]))
                df = pd.concat([df_yes,df_no])

            else:
                df_yes = (df[df['bldg']=='yes']).head(div_obs_cnt)
                df_no = (df[df['bldg']=='no']).head(int(df['obs_count'][0] - div_obs_cnt))
                df = pd.concat([df_yes,df_no])

        topRecomm_weightedObs = topRecomm_weightedObs.append(df)
        topRecomm_weightedObs = topRecomm_weightedObs.drop_duplicates(subset=['Activity','Observation Details'])
        topRecomm_weightedObs = topRecomm_weightedObs.reset_index(drop=True)

    return topRecomm_weightedObs

def get_recommendation(input_df,Location):
    print("Inside get_recommendation")

    combined_obs=sim_with_bldg(input_df,Location,sim_thresh) #Inside get_location_df

    #grouping based on activity
    act_grp = combined_obs.groupby('Activity')
    combined_obs_weights = pd.DataFrame()

    for k,val in act_grp:
        # take single dataframe for an activity
        df = act_grp.get_group(k)

        # sorting basis high similarity
        df = df.sort_values(by=['cosine_similarity'],ascending=False)

        if(df['emb_weight'].iloc[0]>0):
            # creating dataframe and taking observations as per new emb weights
            df_emb = (df[df['keyword_based']=='no']).head(int(df['emb_weight'].iloc[0]))
            df_remain =  df[df['keyword_based']=='yes']
            df = pd.concat([df_emb,df_remain])

        #appending all activity dataframes into one
        combined_obs_weights = combined_obs_weights.append(df).drop_duplicates().reset_index(drop=True)

    #combined_obs_weights = combined_obs.copy()

    # mapping bldg yes & no count both for keyword & embedding based obs
    bldg_yes_count_keywrd =  combined_obs_weights[(combined_obs_weights['keyword_based']=='yes') &
                             (combined_obs_weights['bldg']=='yes')].groupby('Activity')['Observation Details'].nunique()

    bldg_no_count_keywrd =  combined_obs_weights[(combined_obs_weights['keyword_based']=='yes') &
                                 (combined_obs_weights['bldg']=='no')].groupby('Activity')['Observation Details'].nunique()

    bldg_yes_count_emb =  combined_obs_weights[(combined_obs_weights['keyword_based']=='no') &
                                 (combined_obs_weights['bldg']=='yes')].groupby('Activity')['Observation Details'].nunique()

    bldg_no_count_emb =  combined_obs_weights[(combined_obs_weights['keyword_based']=='no') &
                                 (combined_obs_weights['bldg']=='no')].groupby('Activity')['Observation Details'].nunique()

    combined_obs_weights['bldg_yes_count_keywrd'] = combined_obs_weights['Activity'].map(bldg_yes_count_keywrd)
    combined_obs_weights['bldg_no_count_keywrd'] = combined_obs_weights['Activity'].map(bldg_no_count_keywrd)
    combined_obs_weights['bldg_yes_count_emb'] = combined_obs_weights['Activity'].map(bldg_yes_count_emb)
    combined_obs_weights['bldg_no_count_emb'] = combined_obs_weights['Activity'].map(bldg_no_count_emb)


    # grouping basis activity & keyword based observations
    combined_obs_weights_new = pd.DataFrame()
    df_grp = combined_obs_weights.groupby(['Activity','keyword_based'])

    for k,val in df_grp:
        df = df_grp.get_group(k)
        # finding activity wise total obs count(weightage), bldg yes & no count both for embedding & keyword based observations
        df['bldg_yes_count'] = df[(df['bldg']=='yes')]['Observation Details'].nunique()
        df['bldg_no_count'] = df[(df['bldg']=='no')]['Observation Details'].nunique()
        df['weightage'] = df['Observation Details'].nunique()

        combined_obs_weights_new = combined_obs_weights_new.append(df).reset_index(drop=True)

    combined_obs_count_df = obsCount_calculation_table(combined_obs_weights_new,top_recomm_val)

    topRecomm_combined = topRecomm_weightedObs_bldgYes(combined_obs_count_df)
    topRecomm_combined = topRecomm_combined.drop(index=0)

    keywrd_obs_count =  topRecomm_combined[
    (topRecomm_combined['keyword_based']=='yes')].groupby('Activity')['Observation Details'].nunique()

    emb_obs_count =  topRecomm_combined[
        (topRecomm_combined['keyword_based']=='no')].groupby('Activity')['Observation Details'].nunique()

    bldg_yes_obs_count =  topRecomm_combined[
        (topRecomm_combined['bldg']=='yes')].groupby('Activity')['Observation Details'].nunique()

    bldg_no_obs_count =  topRecomm_combined[
        (topRecomm_combined['bldg']=='no')].groupby('Activity')['Observation Details'].nunique()

    topRecomm_combined['keywrd_obs_count'] = topRecomm_combined['Activity'].map(keywrd_obs_count)
    topRecomm_combined['emb_obs_count'] = topRecomm_combined['Activity'].map(emb_obs_count)
    topRecomm_combined['bldg_yes_obs_count'] = topRecomm_combined['Activity'].map(bldg_yes_obs_count)
    topRecomm_combined['bldg_no_obs_count'] = topRecomm_combined['Activity'].map(bldg_no_obs_count)

    topRecomm_combined = topRecomm_combined.sort_values(by=['Risk_Cal'],ascending=False).reset_index(drop=True)

    print("Giving Recommendation...........")

    return topRecomm_combined

from flask import Flask, request, jsonify
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Define route for /recommendation
@app.route('/recommendation', methods=['POST'])
def get_recommendation_api():
    # Parse JSON input
    data = request.json

    # Extract necessary information
    location = data['location']
    #work_permit=data['work_permit']
    activities = data['activities']

    # Call the model
    df = pd.DataFrame({'Location': [location] * len(activities), 'Activity': activities})
    recommendation = get_recommendation(df, location)

    # Prepare response
    response_data = {
        'recommendation': recommendation.to_dict(orient='records')
    }

    # Return response
    return jsonify(response_data)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5001)