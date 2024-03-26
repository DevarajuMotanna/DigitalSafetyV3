import React, { useState } from "react";
import "./workPermit.css";
import { useLocation } from 'react-router-dom';
import getData from '../../hooks/useData';
import searchLogo from './../../assets/search_icon_grey.svg';


const FilterComponent = () => {
  const [area, setArea] = React.useState("All");
  const [permitType, setPermitType] = React.useState("All");
  const [riskCategory, setRiskCategory] = React.useState("All");
  const [date, setDate] = React.useState("Latest");

  const handleFilterChange = (event) => {
    switch (event.target.name) {
      case "area":
        setArea(event.target.value);
        break;
      case "permitType":
        setPermitType(event.target.value);
        break;
      case "riskCategory":
        setRiskCategory(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setArea("All");
    setPermitType("All");
    setRiskCategory("All");
    setDate("Latest");
  };

  return (
    <div className="">
      <br />
      <div className="d-flex justify-content-md-between align-items-center mb-3 filter-bar">
      <div className="w-100">
          <label htmlFor="area">Sort by</label>
          <select
            className="form-select"
            name="area"
            value={area}
            onChange={handleFilterChange}
          >
            <option value="latest">Latest</option>
            <option value="Area 1">Area 1</option>
            <option value="Area 2">Area 2</option>
            <option value="Area 3">Area 3</option>
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="area">Area</label>
          <select
            className="form-select"
            name="area"
            value={area}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Area 1">Area 1</option>
            <option value="Area 2">Area 2</option>
            <option value="Area 3">Area 3</option>
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="permitType">Permit type</label>
          <select
            className="form-select"
            name="permitType"
            value={permitType}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Building Permit">Building Permit</option>
            <option value="Electrical Permit">Electrical Permit</option>
            <option value="Mechanical Permit">Mechanical Permit</option>
            <option value="Plumbing Permit">Plumbing Permit</option>
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="riskCategory">Risk category</label>
          <select
            className="form-select"
            name="riskCategory"
            value={riskCategory}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="date">Date</label>
          <select
            className="form-select"
            name="date"
            value={date}
            onChange={handleFilterChange}
          >
            <option value="Latest">Latest</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
        <div className="">
        <label htmlFor="area">&nbsp;</label>
        <button
        type="button"
        className="btn btn-primary"
        onClick={resetFilters}
      >
        Reset
      </button>
        </div>
      </div>
    </div>
  );
};





// eslint-disable-next-line
const Modal = ({ setShowModal }) => {
  return <div className="kysheet-modal modal fade show d-block modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content rounded-0 ">
        <div className="modal-header">

          <button onClick={() => setShowModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <label>Work Permit Number</label>
                <p>WP12345</p>
              </div>
            </div>
            <svg width="100%" height="260" viewBox="0 0 517 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="260" fill="#D9D9D9" />
            </svg>

            <div>
                <label className="mb-3">Status</label>
                <p className="text-danger">High</p>
              </div>

            <div className="row">
            <div className="col-6">
                <label className="mb-3">Area</label>
                <p className="text-muted">Building 5</p>
              </div>
              <div className="col-6">
                <label className="mb-3">Sub-area</label>
                <p className="text-muted">First Floor Seating Area</p>
              </div>
            </div>
            <div>
                <label className="mb-3">Work Date</label>
                <p className="text-muted">Aug 01, 2023-Oct 27, 2023</p>
              </div>
            <div className="row my-2">
              <div className="col-12">
                <label>Permit Type</label>
                <p>Hot / Height</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Requiring Department</label>
                <p className="text-muted">CVL-R</p>
              </div>
              <div className="col-6">
                <label>Issuing Department</label>
                <p className="text-muted">CVL-R</p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <label>KY Status</label>
                <p>Update</p>
              </div>
            </div>
            <br />
            <div className="row mt-2">
              <div className="col-12">
                <p className="text-muted fw-semibold">FORM ATTACHMENTS</p>
              </div>
            </div>
            <svg width="100%" height="260" viewBox="0 0 517 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="260" fill="#D9D9D9" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  </div>
}


const AccountList = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const workPermitId = location.pathname.slice(13)
  const data = getData(workPermitId);

  console.log('__here', data, workPermitId)


  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  console.log({ showModal })


  const kySheets = data.activeKySheets.filter(item => item.kySheetNo.toString().includes(searchQuery))
  const checklist = data.activeCheckList.filter(item => item.kySheetNo.toString().includes(searchQuery))

  return (
    <div className="account-list">
      {
        showModal && <Modal setShowModal={setShowModal} />
      }
      <h1 className="account-list-heading">WP{workPermitId}</h1>
      <div className='page-utilities'>
        <div className='search-block'>
          <img className='search_icon' src={searchLogo} alt='search' />
          <input
            className='search form-control ps-5 grey-bg'
            id='search'
            name='search'
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className='btn-block'>
          {/* <button className='btn btn-primary'>Create New Work Permit</button> */}
        </div>
      </div>
      <FilterComponent />
      <br />
      {
        kySheets.length > 0 && <>
          <p className="fw-semibold">Active KY Sheets</p>
          <table className="table table-striped table-reversed align-middle" width="100%">
            <thead>
              <tr>
                <th>KY Sheet No.</th>
                <th>Date</th>
                <th>Area/Sub Area</th>
                <th>Requiring Department</th>
                <th>Issuing Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {kySheets.length > 0 && kySheets.map((account) => (
                <tr key={account.kySheetNo}>
                  <td>{account.kySheetNo}</td>
                  <td>{account.date}</td>
                  <td>{account.area}</td>
                  <td>{account.requiringDepartment}</td>
                  <td>{account.issuingDepartment}</td>
                  <td>
                    <button onClick={() => setShowModal(true)} type="button" className="btn btn-outline-primary">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
      <br />
      {
        checklist.length > 0 && <><p className="fw-semibold">Active checklist</p>
          <table className="table table-striped align-middle" width="100%">
            <thead>
              <tr>
                <th>KY Sheet No.</th>
                <th>Date</th>
                <th>Area/Sub Area</th>
                <th>Requiring Department</th>
                <th>Issuing Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {checklist.map((account) => (
                <tr key={account.kySheetNo}>
                  <td>{account.kySheetNo}</td>
                  <td>{account.date}</td>
                  <td>{account.area}</td>
                  <td>{account.requiringDepartment}</td>
                  <td>{account.issuingDepartment}</td>
                  <td>
                    <button onClick={() => setShowModal(true)} type="button" className="btn btn-outline-primary">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }

    </div>
  );
};

export default AccountList;
