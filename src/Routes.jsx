import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/index";
import DashBoard from "./pages/Dashboard/index";
// import SafetyDigitilization from './pages/SafetyDigitilization/index.jsx';
import WorkPermit from "./pages/WorkPermits/index";
import Modules from "./pages/Modules/index";
// import SingleWorkPermit from "./pages/WorkPermits/SingleWorkPermit";
// import AllKySheets from './pages/AllKYSheets/index.js';
import MainLayout, {
  MainLayoutWithOutClock,
} from "./components/mainLayout/index";
import MarutiHomePage from "./components/MarutiHomePage/index";
import SecondPage from "./components/Screen2/Index";
import Kyhazard from "./components/KY Hazard/Index";
import WPNumberDetails from "./pages/WPNumberDetails";
import CreateNewKySheet from "./layout/CreateNewKySheet";
import KYsheetDetails from "./pages/newKYSheet/KYsheetDetails";
import { KYsheetHints } from "./pages/newKYSheet/KYsheetHints";
import KYCertify from "./pages/newKYSheet/KYCertify";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MarutiHomePage />} />
          <Route path="module" element={<Modules />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="cards/dashboard" element={<DashBoard />} />
            <Route path="dashboard/work-permit" element={<WorkPermit />} />
            <Route
              path="cards/dashboard/work-permit"
              element={<WorkPermit />}
            />
            <Route path="work-permit" element={<WorkPermit />} />
            <Route path="cards/work-permit" element={<WorkPermit />} />
            {/* <Route path="work-permit/:id" element={<SingleWorkPermit />} /> */}
          </Route>
          <Route element={<MainLayoutWithOutClock />}>
            <Route path="cards/work-permit/:id" element={<WPNumberDetails />} />
            <Route path="work-permit/:id" element={<WPNumberDetails />} />
            <Route
              path="cards/work-permit/hints/:id"
              element={<WPNumberDetails />}
            />
            <Route path="work-permit/hints/:id" element={<WPNumberDetails />} />
          </Route>

          <Route element={<CreateNewKySheet />}>
            <Route
              path="new_ky_sheet_details/:pageNumber"
              element={<KYsheetDetails />}
            />
            <Route
              path="wp_details_hints/:pageNumber"
              element={<KYsheetHints />}
            />
            <Route path="wp_certify/:pageNumber" element={<KYCertify />} />
          </Route>

          <Route path="/" element={<MarutiHomePage />}></Route>
          <Route path="cards" element={<SecondPage />}></Route>
          <Route path="KYHazard" element={<Kyhazard />}></Route>
          <Route path="cards/KYHazard" element={<Kyhazard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
