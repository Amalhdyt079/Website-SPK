import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import FooterComp from './components/FooterComp';
import HeroComp from './components/home';
import GalleryComp from './components/GalleryComp';
import ServiceComp from './components/ServiceComp';
import FaqComp from './components/FaqComp';
import Criterias from './page/criterias';
import Alternative from './page/alternative';
import RekomendasiObjek from './page/hasilspk';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <Routes>
          {/* Route untuk halaman utama */}
          <Route path="/" element={
            <>
              <HeroComp />
              
              <br /> <br />
              <GalleryComp />
              {/* <FaqComp /> */}
              <ServiceComp />
              <FaqComp />
              <FooterComp />
            </>
          } />
          {/* Route untuk halaman Criteria */}
          <Route path="/criteria" element={<Criterias />} />
          {/* Route untuk halaman Alternative */}
          <Route path="/alternative" element={<Alternative />} />
          {/* Route untuk halaman Hasil */}
          <Route path="/hasilspk" element={<RekomendasiObjek/>} />
        </Routes>
        {/* <FooterComp /> */}
      </div>
    </Router>
  );
}

export default App;
