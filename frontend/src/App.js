// import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./components/footer";
import Home from "./pages/home";

function App() {
  return (
      <div className="App">
          <Router>
            <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
              </Routes>
            <Footer />
          </Router>
    </div>
  );
}

export default App;
