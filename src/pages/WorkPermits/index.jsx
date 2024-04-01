/* eslint-disable-file no-use-before-define */
import "./workPermit.css";
// import searchLogo from "./../../assets/search_icon_grey.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Response from "../../Data/WorkpermitResponse";
import {
  Alert,
  AlertTitle,
  Box,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";

// eslint-disable-next-line
const FilterComponent = ({
  // eslint-disable-next-line
  handleFilterChange,
  // eslint-disable-next-line
  permitTypeFilter,
  // eslint-disable-next-line
  dateFilter,
  // eslint-disable-next-line
  kyStatusFilter,
  // eslint-disable-next-line
  resetFilters,
  // eslint-disable-next-line
  handlefilters,
}) => {
  // const [workPermitData, setWorkPermitData] = useState([]);
  // const { id } = useParams();

  // const departments = workPermitData?.map((item) => item?.issuingDepartment);
  // const uniqueDepartments = [...new Set(departments)];

  const uniquePermitTypes = [
    "MATERIAL LIFTING AND SHIFTING",
    "PERMIT TO WORK FOR HOT WORK",
    "HOT WORK",
    "HEIGHT /CIVIL /EXCAVATION WORK",
    "HEIGHT /CIVIL /EXCAVATION + CONFINED SPACE WORK",
    "PERMIT TO WORK FOR HEIGHT /CIVIL /EXCAVATION WORK",
    "HOT + HEIGHT /CIVIL /EXCAVATION WORK",
  ];

  // const riskCategories = workPermitData?.map((item) => item?.riskCategory);
  // const uniqueRiskCategories = [...new Set(riskCategories)];

  // const kyStatuses = workPermitData?.map((item) => item?.kyStatus);
  // const uniqueKyStatuses = [...new Set(kyStatuses)];

  // const getWorkPermitData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/workpermit/api/get-work-permit?workPermitID=${id}`
  //     );

  //     setWorkPermitData(response?.data?.data.records);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getWorkPermitData();
  // }, []);

  return (
    <div className="w-100">
      <div className="d-flex justify-content-md-between align-items-center mb-3 filter-bar">
        <div className="w-100">
          <label htmlFor="area">Checklist Status</label>
          <select
            className="form-select"
            name="kyStatus"
            value={kyStatusFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <div className="w-100">
          <label htmlFor="permitType">Permit type</label>
          <select
            className="form-select"
            name="permitType"
            value={permitTypeFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {uniquePermitTypes?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-100">
          <label htmlFor="date">Date</label>
          <select
            className="form-select"
            name="date"
            value={dateFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {/* <option value="Latest">Latest</option> */}
            <option value="Today">Today</option>
            <option value="Last 2 Days">Last 2 Days</option>
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
            onClick={() => handlefilters()}
            style={{ width: "60px" }}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

function WorkPermit() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [areaFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [permitTypeFilter, setPermitTypeFilter] = useState("All");
  const [kyStatusFilter, setKyStatusFilter] = useState("All");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const type = searchParams.get("type");

  const handleTypeChange = (changeData) => {
    const currentDate = new Date().toLocaleDateString();
    let lastTwoDays = new Date(currentDate);
    lastTwoDays.setDate(lastTwoDays.getDate() - 2);

    if (type === "" || type === null || type === undefined) {
      setFinalData(changeData);
    } else if (type === "activeCheckList") {
      setKyStatusFilter("Y");
      setDateFilter("Today");
    } else if (type === "noActiveCheckList") {
      setKyStatusFilter("N");
      setDateFilter("Today");
    } else if (type === "last2Days") {
      setDateFilter("Last 2 Days");
    }
  };

  const handleFilterChange = (event) => {
    switch (event.target.name) {
      case "permitType":
        setPermitTypeFilter(event.target.value);
        break;

      case "date":
        setDateFilter(event.target.value);
        break;

      case "kyStatus":
        setKyStatusFilter(event.target.value);
        break;
    }
  };

  const axiosClient = axios.create();

  axiosClient.defaults.baseURL = "http://localhost:9090/workpermit/api/v1";

  useEffect(() => {
    const getData = async () => {
      let paginationData = [];
      let totalPaginatedData = Response;
      try {
        for (let i = 1; i <= 999; i++) {
          const response = await axiosClient.get(`/work-permits?pageNo=${i}`);
          const responseData = response?.data?.data.records;
          paginationData = [...paginationData, ...responseData];
          totalPaginatedData.push(paginationData);
          if (paginationData.length == 0 || !paginationData) {
            break;
          }
        }

        console.log(paginationData);
        setFilteredData(paginationData);
        setFinalData(paginationData);

        // paginationData = [];
        // setFilteredData(response?.data?.data.records);
        // setFinalData(response?.data?.data.records);
      } catch (error) {
        console.log(error);
      }
    };
    // if (type) {
    //   console.log("type==>", type);
    //   handlefilters();
    // }
    // handlefilters();
    getData();
  }, []);

  useEffect(() => {
    if (finalData && finalData.length > 0) {
      handleTypeChange(finalData);
    }
  }, [finalData]);

  const handlefilters = () => {
    // console.log(finalData);
    if (finalData && finalData.length > 0) {
      const result = finalData.filter((data) => {
        if (
          kyStatusFilter !== "All" &&
          permitTypeFilter !== "All" &&
          dateFilter !== "All"
        ) {
          return (
            data.wpCheckList === kyStatusFilter &&
            data.workPermitType === permitTypeFilter &&
            checkDateFilter(data)
          );
        } else if (kyStatusFilter !== "All" && permitTypeFilter !== "All") {
          return (
            data.wpCheckList === kyStatusFilter &&
            data.workPermitType === permitTypeFilter &&
            checkDateFilter(data)
          );
        } else if (kyStatusFilter !== "All") {
          return data.wpCheckList === kyStatusFilter && checkDateFilter(data);
        } else if (permitTypeFilter !== "All") {
          return (
            data.workPermitType === permitTypeFilter && checkDateFilter(data)
          );
        } else if (dateFilter !== "All") {
          return checkDateFilter(data);
        } else {
          return true;
        }
      });
      // console.log(result);
      setFilteredData(result);
    }
  };
  const checkDateFilter = (data) => {
    const dataToDate = data.wpIssueToDate;

    if (dateFilter === "Today") {
      const date = dayjs().format("YYYY-MM-DD");

      return data.wpIssueFromDate === date;
    } else if (dateFilter === "Last 2 Days") {
      const start = dayjs().subtract(2, "day").format("YYYY-MM-DD");
      const end = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      return start <= dataToDate && end >= dataToDate;
    } else if (dateFilter === "Last Week") {
      const date = dayjs()
        .startOf("week")
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      const start = dayjs(date)
        .startOf("week")
        .add(1, "day")
        .format("YYYY-MM-DD");
      const end = dayjs(date).add(1, "day").format("YYYY-MM-DD");
      return start <= dataToDate && end >= dataToDate;
    } else if (dateFilter === "Last Month") {
      const date = dayjs()
        .startOf("month")
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      const start = dayjs(date).startOf("month").format("YYYY-MM-DD");
      const end = dayjs(date).format("YYYY-MM-DD");
      return start <= dataToDate && end >= dataToDate;
    } else if (dateFilter === "Last Year") {
      const date = dayjs()
        .startOf("year")
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      const start = dayjs(date).startOf("year").format("YYYY-MM-DD");
      const end = dayjs(date).format("YYYY-MM-DD");
      return start <= dataToDate && end >= dataToDate;
    } else {
      return true; // No date filter applied
    }
  };

  useEffect(() => {
    handlefilters();
  }, [permitTypeFilter, dateFilter, kyStatusFilter]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };
  console.log(filteredData);
  return (
    <div className="work-permits-page">
      <div className="page-header">
        <span className="header">Work Permits</span>
      </div>
      <div className="page-content">
        <div className="page-utilities">
          {/* <div className="search-block">
            <img className="search_icon" src={searchLogo} alt="search" />
            <input
              className="search"
              id="search"
              name="search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div> */}
          <div className="btn-block">
            {/* <button className='btn btn-primary'>Create New Work Permit</button> */}
          </div>
        </div>
        <FilterComponent
          permitTypeFilter={permitTypeFilter}
          dateFilter={dateFilter}
          handleFilterChange={handleFilterChange}
          areaFilter={areaFilter}
          kyStatusFilter={kyStatusFilter}
          handlefilters={handlefilters}
        />
        <div className="table-block">
          <div className="table_wrapper">
            <table className="table table-striped align-middle">
              <thead className="bg-#EFEFEF">
                <tr>
                  <th style={{ width: "150px" }}>WPNo</th>
                  <th style={{ width: "150px" }}>Place</th>
                  <th style={{ width: "150px" }}>Type Of Permit</th>
                  <th style={{ width: "150px" }}>From Date</th>
                  <th style={{ width: "150px" }}>To Date</th>
                  <th style={{ width: "150px" }}>Check Sheet Status</th>
                  {/* <th>&nbsp;</th> */}
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={{
                            pathname: `/work-permit/${item?.workPermitPlanId}`,
                            state: item,
                          }}
                        >
                          {item?.workPermitPlanId || "-"}
                        </Link>
                      </td>
                      {/* <td>
                      <span
                        style={{
                          backgroundColor: item?.status,
                          width: "15px",
                          height: "15px",
                        }}
                        className={`badge rounded-pill block m-0 p-0 red-pill d-block`}
                      >
                        {" "}
                      </span>
                    </td> */}
                      <td className="area-cell">
                        <span className="area">
                          {item?.workPermitPlace || "-"}
                        </span>
                        <span className="sub-area">{item?.subArea}</span>
                      </td>
                      <td className="permitType">
                        {item?.workPermitType || "-"}
                      </td>
                      <td width="10%">
                        <span className="start-date">
                          {item?.wpIssueFromDate}
                        </span>{" "}
                      </td>
                      <td>
                        <span className="end-date">
                          {item?.wpIssueToDate || "-"}
                        </span>
                      </td>
                      {/* <td>{item?.WpNoPersion}</td> */}
                      <td>
                        <span className="text-primary fw-semibold left-text">
                          {item?.wpCheckList || "Y"}
                        </span>
                      </td>
                    </tr>
                  ))}
                {!filteredData.length && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Alert
                        severity="warning"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          height: "150px",
                          alignItems: "center",
                        }}
                      >
                        <AlertTitle sx={{ fontWeight: 600, marginTop: "8px" }}>
                          No records found
                        </AlertTitle>
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </table>
            <Box>
              <TablePagination
                component="div"
                count={filteredData.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPermit;
