import React, { useState, useEffect } from "react";
// import db_database from config;
import { Container, Row, Col } from "react-bootstrap";

const ServiceComp = () => {
  // State to hold the data fetched from the database
  const [servicesData, setServicesData] = useState([]);

  // Fetch the data from an API or your backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://api.example.com/services');
        const data = await response.json();
        setServicesData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="services min-vh-100 d-flex align-items-center" id="services">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center fw-bold" data-aos="fade-up">Services</h1>
            <p className="text-center" data-aos="fade-up" data-aos-delay="200">
            Perjalanan jadi lebih seru! Dapatkan kemudahan, kenyamanan, dan keamanan dalam setiap langkah perjalanan Anda.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-5 px-3" data-aos="fade-up" data-aos-delay="1000">
            <i className="fa-solid fa-map-location-dot fs-2 mb-4"></i>
            <h5 className="fw-bold">Jenis Wisata</h5>
            <p>Wisata Alam, Budaya, dan Sejarah</p>
          </Col>
          <Col className="text-center py-5 px-3" data-aos="fade-up" data-aos-delay="1200">
            <i className="fa-solid fa-route fs-2 mb-4"></i>
            <h5 className="fw-bold">Jarak</h5>
            <p>Terjangkau dari Kota</p>
          </Col>
          <Col className="text-center py-5 px-3" data-aos="fade-up" data-aos-delay="1400">
            <i className="fa-solid fa-dollar-sign fs-2 mb-4"></i>
            <h5 className="fw-bold">Harga</h5>
            <p>Mulai dari Rp.0</p>
          </Col>
          <Col className="text-center py-5 px-3" data-aos="fade-up" data-aos-delay="1600">
            <i className="fa-solid fa-star fs-2 mb-4"></i>
            <h5 className="fw-bold">Rating</h5>
            <p>4.5/5 berdasarkan ulasan</p>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default ServiceComp;