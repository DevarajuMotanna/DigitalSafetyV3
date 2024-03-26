// import React from 'react';
import './safetyDigitilization.css';
import mainLogo from'./../../assets/maruti_suzuki_medium.svg';
import searchLogo from'./../../assets/search_icon_grey.svg';
import workPermit from'./../../assets/work_permit.svg';
import module2 from'./../../assets/module_2.svg';
import module3 from'./../../assets/module_3.svg';

const SafetyDigitilization = () => {
    return (
        <div className='digitalization-page'>
            <div className='page-header'>
                <img src={mainLogo} alt='maruti_suzuki_logo'/>
                <span className='header'>Safety Digitalization</span>
            </div>
            <div className='page-content'>
                <div className='page-utilities'>
                    <div className='search-block'>
                        <img className='search_icon' src={searchLogo} alt='search'/>
                        <input className='search' id='search' name='search' type='text' placeholder='Search'/>
                    </div>
                    <div className='filter-block'>
                        <select className='dropdown' name="cars" id="cars">
                            <option value="volvo">Default</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
                <div className='cards-block'>
                    <div className='card active'>
                        <div className='card_icon'><img src={workPermit} alt='module_3'/></div>
                        <div className='card_text'>Wrork Permit</div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'><img src={module2} alt='module_3'/></div>
                        <div className='card_text'>Wrork Permit</div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'><img src={module3} alt='module_3'/></div>
                        <div className='card_text'>Module</div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SafetyDigitilization