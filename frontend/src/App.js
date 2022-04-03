// import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home";
import Form1 from "./pages/Form1";
import FundList from "./pages/FundList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Form1" element={<Form1 />} />
          <Route exact path="/FundList" element={<FundList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
