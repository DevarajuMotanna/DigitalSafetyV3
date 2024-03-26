// eslint-disable-next-line
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";
import { useEffect } from "react";
import Map from "../Dashboard/Map";
import { useNavigate } from "react-router-dom";

// import map from'./../../assets/ok.png';
// import Table from "../../components/table";
// import CustomMap from '../../components/Map'

// eslint-disable-next-line
const DashBoard = (props) => {
  const [workPermitData, setWorkPermitData] = useState([]);
  const maps = [
    "https://www.google.com/maps/d/u/0/embed?mid=1UMcXTWzduulegwDpDPW5axN42plgmLc&ehbc=2E312F",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d577.6899516563612!2d76.68448719985!3d28.885503724666062!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9bb9bf50fe11%3A0x53feea137e1b99bf!2sMSIL%20R%20office!5e1!3m2!1sen!2sin!4v1711295603022!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2310.8333257047125!2d76.6819491393653!3d28.88219936036237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b06ed7a76df%3A0x70685642fcd09729!2sMSIL%20Parking!5e1!3m2!1sen!2sin!4v1711295934201!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9242.959606458238!2d76.68083564742695!3d28.886398309304276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjEiTiA3NsKwNDEnMDQuMSJF!5e1!3m2!1sen!2sin!4v1711296590596!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9242.959606458238!2d76.68083564742695!3d28.886398309304276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjEiTiA3NsKwNDEnMDQuMSJF!5e1!3m2!1sen!2sin!4v1711296677539!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.410746073271!2d76.68188170892401!3d28.886139975425113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjEiTiA3NsKwNDEnMDQuMSJF!5e0!3m2!1sen!2sin!4v1708962265936!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.4258834461616!2d76.681855708924!3d28.885689975425322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzA4LjUiTiA3NsKwNDEnMDQuMCJF!5e0!3m2!1sen!2sin!4v1708962318762!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.408761379513!2d76.68148470892399!3d28.886198975425092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjMiTiA3NsKwNDEnMDIuNiJF!5e0!3m2!1sen!2sin!4v1708962385662!5m2!1sen!2sin",
  ];
  const [selecteMap, setSelectedMap] = useState(maps[0]);
  const navigate = useNavigate();

  const getWorkPermitData = async () => {
    try {
      // const response = {
      //   error: false,
      //   errors: null,
      //   data: {
      //     workPermitWithActiveCheckListToday: 4,
      //     workPermitOverLast2Days: 106,
      //     workPermitWithNoCheckListToday: 34,
      //   },
      // };

      const response = await axios.get(
        "http://localhost:9090/workpermit/api/v1/work-permit-tab-count"
      );

      setWorkPermitData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkPermitData();
  }, []);

  console.log(workPermitData);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <span className="header">Dashboard</span>
      </div>
      <div className="page-content">
        <div className="top-block">
          <div className="map-and-options-block">
            <div className="info-cards-block">
              <div
                className="card green"
                onMouseEnter={() => setSelectedMap(maps[1])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit?type=activeCheckList")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitWithActiveCheckListToday
                    ?.totalCount || 0}
                </div>
                <div className="card_text">
                  Work Permit With Active Checklist
                </div>
              </div>
              {/* </Link> */}

              {/* <Link to="/work-permit" className="card red">
                <div className="card_number">
                  {workPermitData?.workPermitWithNoCheckListToday || 0}
                </div>
                <div className="card_text">
                  Wrork Permit With No Checklist Today
                </div>
              </Link> */}
              <div
                className="card red"
                onMouseEnter={() => setSelectedMap(maps[2])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit?type=noActiveCheckList")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitWithNoCheckListToday?.totalCount ||
                    0}
                </div>
                <div className="card_text">
                  Work Permit With No Checklist Today
                </div>
              </div>
              {/* <Link to="/work-permit" className="card amber">
                <div className="card_number">1</div>
                <div className="card_text">Wrork Permit On Hold By Safety</div>
              </Link> */}
              {/* <div
                className="card amber"
                onMouseEnter={() => setSelectedMap(maps[3])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit")}
              >
                <div className="card_number">1</div>
                <div className="card_text">Work Permit On Hold By Safety</div>
              </div> */}

              <div
                className="card"
                onMouseEnter={() => setSelectedMap(maps[4])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit?type=last2Days")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitOverLast2Days?.totalCount || 0}
                </div>
                <div className="card_text">Work Permit Over (Last 2 days)</div>
              </div>
            </div>
            {/* <CustomMap/> */}
            {/* <MainScreen /> */}
            <div className="map">
              <Map url={selecteMap} />
            </div>

            {/* <div className="map">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1Kg7XXmJZ5idsf9tKHINMS0I_LVOX9m8&ehbc=2E312F"
                width="800"
                height="1000"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            {/* <div>
              <div>
                <h1>Permit Data Table</h1>
                <Table
                  data={dummyData}
                  columns={columns}
                  defaultRowsPerPage={10}
                  pagination={true}
                />
              </div>
            </div> */}
            {/* <h1> Main Map </h1> */}
            {/* <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16648.252418965956!2d76.67183185033349!3d28.886346872406573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1698910968369!5m2!1sen!2sin"
                width="800"
                height="600"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}
            {/* <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1155.371777203388!2d76.68136710000333!3d28.886234144910222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1710400040876!5m2!1sen!2sin"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            {/* <div className='btn-block'>
                            <button className='btn'>Create new Work Permit</button>
                            <button className='btn'>Create new KY Sheet</button>
                            <button className='btn'>Create new Check Sheet</button>
                        </div> */}
          </div>
        </div>
        {/* <div className='table-block'>
                    <div className='table-title'>
                        <span className='title'>Recent Work Permits</span>
                        <Link className='view-all' to="/workPermit">View All</Link>
                    </div>
                    <div className='table_wrapper'>
                        <table className='data-table'>
                            <tr>
                                <th style={{'width':'5%'}}>Work Permit No</th>
                                <th style={{'width':'5%'}}>Status</th>
                                <th style={{'width':'20%'}}>Area / Sub Area</th>
                                <th style={{'width':'10%'}}>Permit Type</th>
                                <th style={{'width':'15%'}}>Date</th>
                                <th style={{'width':'5%'}}>Requiring Department</th>
                                <th style={{'width':'5%'}}>Issuing Departmnet</th>
                                <th style={{'width':'5%'}}>Ky Status</th>
                                <th style={{'width':'10%'}}>Risk Category</th>
                                <th style={{'width':'10%'}}>Check Sheet Status</th>
                                <th style={{'width':'15%'}}></th>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot red'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot green'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='table-block'>
                    <div className='table-title'>
                        <span className='title'>Recent KY Sheets</span>
                        <Link to="/allKySheets" className='view-all'>View All</Link>
                    </div>
                    <div className='table_wrapper'>
                        <table className='data-table'>
                            <tr>
                                <th style={{'width':'5%'}}>Work Permit No</th>
                                <th style={{'width':'5%'}}>Status</th>
                                <th style={{'width':'20%'}}>Area / Sub Area</th>
                                <th style={{'width':'10%'}}>Permit Type</th>
                                <th style={{'width':'15%'}}>Date</th>
                                <th style={{'width':'5%'}}>Requiring Department</th>
                                <th style={{'width':'5%'}}>Issuing Departmnet</th>
                                <th style={{'width':'5%'}}>Ky Status</th>
                                <th style={{'width':'10%'}}>Risk Category</th>
                                <th style={{'width':'10%'}}>Check Sheet Status</th>
                                <th style={{'width':'15%'}}></th>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot red'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot green'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> */}
      </div>
    </div>
  );
};
export default DashBoard;
