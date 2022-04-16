import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FundDetails from "./components/FundDetails";
import Layout from "./components/layout/Layout";
import CreateFund from "./pages/CreateFund";
import Funds from "./pages/Funds";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create-fund" element={<CreateFund />} />
            <Route exact path="/funds" element={<Funds />} />
            <Route exact path="/fund/:id" element={<FundDetails />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
