import logo2 from '../../assets/logo-2.png';
import './modules.css';
import { Link } from 'react-router-dom';




const Modules = () => {
    return <div className='modules'>
        <img src={logo2} alt="" />
        <br /><br /><br />
        <div className="input-group mb-3 rounded-2">
            <span className="input-group-text border-0 bg-transparent" id="basic-addon1">
                <img className="search_icon" src="/src/assets/search_icon_grey.svg" alt="search" />
            </span>
            <input type="text" className="form-control border-0  bg-transparent" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="row w-100 mt-5 d-flex justify-content-between">
            <Link to="/dashboard" className="col-md-4 btn btn-outline-primary">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.94165 7.5H21.9417" stroke="#2D3394" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.94165 13.5H21.9417" stroke="#2D3394" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.94165 19.5H21.9417" stroke="#2D3394" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M27.9417 21.5V1.5H1.94165V27.5C1.94165 29.71 3.73165 31.5 5.94165 31.5M5.94165 31.5C8.15165 31.5 9.94165 29.71 9.94165 27.5V25.5H31.9417V26.5C31.9417 29.262 29.7037 31.5 26.9417 31.5H5.94165Z" stroke="#2D3394" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                Work permit
            </Link>
            <div className="col-md-4 btn disabled">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_3536)">
                        <path d="M25.6083 6.5H28.9417V31.1667H4.94165V6.5H8.27498" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                        <path d="M12.275 19.1667L15.6084 22.5L21.6084 16.5" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                        <path d="M20.275 5.16683C20.275 3.32616 18.7823 1.8335 16.9417 1.8335C15.101 1.8335 13.6083 3.32616 13.6083 5.16683H10.9417V9.16683H22.9417V5.16683H20.275Z" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_3536">
                            <rect width="32" height="32" fill="white" transform="translate(0.94165 0.5)" />
                        </clipPath>
                    </defs>
                </svg>

                Hazadous</div>
            <div className="col-md-4 btn disabled">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_3536)">
                        <path d="M25.6083 6.5H28.9417V31.1667H4.94165V6.5H8.27498" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                        <path d="M12.275 19.1667L15.6084 22.5L21.6084 16.5" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                        <path d="M20.275 5.16683C20.275 3.32616 18.7823 1.8335 16.9417 1.8335C15.101 1.8335 13.6083 3.32616 13.6083 5.16683H10.9417V9.16683H22.9417V5.16683H20.275Z" stroke="#A4A4A4" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_3536">
                            <rect width="32" height="32" fill="white" transform="translate(0.94165 0.5)" />
                        </clipPath>
                    </defs>
                </svg>

                Module 3</div>
        </div>
    </div>
};

export default Modules;
