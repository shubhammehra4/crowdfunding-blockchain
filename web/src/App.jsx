import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CreateFund from "./pages/CreateFund";
import FundDetails from "./pages/FundDetails";
import Funds from "./pages/Funds";
import Home from "./pages/Home";
import MyCampaigns from "./pages/MyCampaigns";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create-fund" element={<CreateFund />} />
            <Route exact path="/funds" element={<Funds />} />
            <Route exact path="/fund/:contract_address" element={<FundDetails />} />
            <Route exact path="/my_campaigns" element={<MyCampaigns />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
