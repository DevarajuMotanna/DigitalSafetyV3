import "./allKySheets.css";
import PopOver from "../../components/popOver/index.jsx";
import searchLogo from "../../assets/search_icon_grey.svg";
import backArrow from "../../assets/back-arrow.svg";
import { Link } from "react-router-dom";

function AllKySheets() {
  return (
    <div>
      <PopOver />
      <div className="all-ky-sheets-page">
        <div className="top-menu-options">
          <Link to="/dashboard" className="btn btn-info">
            <img className="back-icon" src={backArrow} alt="back arrow" />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back to Work Permits
          </Link>
          <div className="work-permit-info">
            <div className="name">Work Permit Number</div>
            <div className="number">WP12345</div>
          </div>
        </div>
        <div className="page-header">
          <div className="sub-heading">WP12345</div>
          <span className="header">All KY Sheets</span>
        </div>
        <div className="page-content">
          <div className="page-utilities">
            <div className="search-block">
              <img className="search_icon" src={searchLogo} alt="search" />
              <input
                className="search"
                id="search"
                name="search"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="btn-block">
              <button className="btn btn-primary">
                Create New Work Permit
              </button>
            </div>
          </div>
          <div className="table-block">
            <div className="table-title">
              <span className="title">Active KT Sheets</span>
            </div>
            <div className="table_wrapper">
              <table className="data-table">
                <tr>
                  <th style={{ width: "10%" }}>Work Permit No</th>
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "20%" }}>Area / Sub Area</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Requiring Department
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Issuing Departmnet
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
                <tr>
                  <td className="table-cell">12345</td>
                  <td className="table-cell" width="20%">
                    <span className="start-date">07/27/23</span>
                  </td>
                  <td className="table-cell area-cell">
                    <span className="area">Building 5</span>
                    <span className="sub-area">First Floor Cealing area</span>
                  </td>
                  <td className="table-cell text-center">CVL-R</td>
                  <td className="table-cell text-center">EN7F</td>
                  <td className="table-cell actions-cell text-center">
                    <button className="btn btn-view-more">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="table-cell">12345</td>
                  <td className="table-cell" width="20%">
                    <span className="start-date">
                      07/27/23 - <span className="end-date">08/27/23</span>
                    </span>
                  </td>
                  <td className="table-cell area-cell">
                    <span className="area">Building 5</span>
                    <span className="sub-area">First Floor Cealing area</span>
                  </td>
                  <td className="table-cell text-center">CVL-R</td>
                  <td className="table-cell text-center">EN7F</td>
                  <td className="table-cell actions-cell text-center">
                    <button className="btn btn-view-more">View Details</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="table-block">
            <div className="table-title">
              <span className="title">Completed / Archived KT Sheets</span>
            </div>
            <div className="table_wrapper">
              <table className="data-table">
                <tr>
                  <th style={{ width: "10%" }}>Work Permit No</th>
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "20%" }}>Area / Sub Area</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Requiring Department
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Issuing Departmnet
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
                <tr>
                  <td className="table-cell">12345</td>
                  <td className="table-cell" width="20%">
                    <span className="start-date">
                      07/27/23 - <span className="end-date">08/27/23</span>
                    </span>
                  </td>
                  <td className="table-cell area-cell">
                    <span className="area">Building 5</span>
                    <span className="sub-area">First Floor Cealing area</span>
                  </td>
                  <td className="table-cell text-center">CVL-R</td>
                  <td className="table-cell text-center">EN7F</td>
                  <td className="table-cell actions-cell text-center">
                    <button className="btn btn-view-more">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="table-cell">12345</td>
                  <td className="table-cell" width="20%">
                    <span className="start-date">
                      07/27/23 - <span className="end-date">08/27/23</span>
                    </span>
                  </td>
                  <td className="table-cell area-cell">
                    <span className="area">Building 5</span>
                    <span className="sub-area">First Floor Cealing area</span>
                  </td>
                  <td className="table-cell text-center">CVL-R</td>
                  <td className="table-cell text-center">EN7F</td>
                  <td className="table-cell actions-cell text-center">
                    <button className="btn btn-view-more">View Details</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllKySheets;
