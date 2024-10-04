import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CountryListPage from "../Pages/CountryListPage";
import CountryInfoPage from "../Pages/CountryInfoPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryListPage />}></Route>
        <Route
          path="/country/:countryCode"
          element={<CountryInfoPage />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default MainRoutes;
