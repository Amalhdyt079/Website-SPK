import React from "react";
// import { Container, Row, Col} from "react-bootstrap"
import { Carousel } from 'react-bootstrap';
import heroImage1 from '../assets/img/hero/hero7.webp';
import heroImage2 from '../assets/img/hero/hero4.jpg';
import heroImage3 from '../assets/img/hero/hero3.jpg';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={heroImage1} alt="First slide" />
        <Carousel.Caption>
          <h3>JOGJAKU</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={heroImage2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Jalan Malioboro</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={heroImage3} alt="Third slide" />
        <Carousel.Caption>
          <h3> Candi Prambanan </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;