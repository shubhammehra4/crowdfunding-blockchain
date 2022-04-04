import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import FundDetails from "./components/FundDetails";
import Navbar from "./components/Navbar";
import Form1 from "./pages/Form1";
import FundList from "./pages/FundList";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Form1" element={<Form1 />} />
          <Route exact path="/FundList" element={<FundList />} />
          <Route exact path="/fund/:id" element={<FundDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
