import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/new_ky_sheet/Sidebar";
import TopTableDetails from "../Section/NewKySheet/TopTableDetails";
import { LinearProgress, Stack } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function CreateNewKySheet() {
  let { pageNumber } = useParams();
  pageNumber = +pageNumber;
  return (
    <div className="">
      <div className="row d-flex">
        <div className="col-md-8">
          <TopTableDetails />
        </div>
      </div>
      <div>
        <LinearProgress
          variant="determinate"
          value={pageNumber === 1 ? 10 : pageNumber === 2 ? 30 : 50}
          sx={{ my: 2 }}
        />
      </div>
      <div className="row d-flex">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-md-12">
          <hr />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginX: 3, my: 1 }}
          >
            <button
              style={{
                borderRadius: "4px",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Exit
            </button>
            <Stack direction="row" spacing={2}>
              <button
                style={{
                  borderRadius: "4px",
                  border: "none",
                  padding: "5px 10px",
                }}
              >
                Previous
              </button>
              <button
                style={{
                  borderRadius: "4px",
                  border: "none",
                  padding: "5px 10px",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Next
              </button>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}
