import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Gallery1 from "../assets/img/gallery/gallery 11.webp";
import Gallery2 from "../assets/img/gallery/jogja-2.jpg";
import Gallery3 from "../assets/img/gallery/gallery 7.jpg";
import Gallery4 from "../assets/img/gallery/gallery 10.jpg";
import Gallery5 from "../assets/img/gallery/gallery 8.png";
import Gallery6 from "../assets/img/gallery/gallery 9.jpg";

const GalleryComp = () => {
  const images = [
    { src: Gallery1, title: "Hutan Pinus Mangunan ", text: "Hutan Pinus Mangunan di Bantul, Yogyakarta, menawarkan pemandangan asri dengan pohon pinus tinggi, udara sejuk, dan panorama bukit hijau. Tempat ini cocok untuk bersantai, berjalan di antara pohon, atau berfoto di spot indah." },
    { src: Gallery2, title: "Tugu Jogja", text: "Tugu Jogja adalah ikon kota Yogyakarta yang terletak di pusat kota. Monumen putih berbentuk obelisk ini simbolkan perjuangan dan sejarah Yogyakarta. Tugu ini juga menjadi titik pertemuan utama jalan-jalan penting di kota yogyakarta." },
    { src: Gallery3, title: "Candi Prambanan", text: "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia, terletak di antara Yogyakarta dan Solo. Dibangun pada abad ke-9, candi ini terkenal dengan arsitektur megahnya dan relief yang menggambarkan kisah Ramayana." },
    { src: Gallery4, title: "Sungai Mudal", text: "Sungai Mudal, yang terletak di Kulon Progo, Yogyakarta, adalah destinasi wisata alam yang terkenal dengan air terjun dan kolam alami berair jernih. Dikelilingi pepohonan hijau, tempat ini menawarkan suasana sejuk dan menenangkan." },
    { src: Gallery5, title: "Wisata Sejarah", text: "Keraton Yogyakarta adalah istana resmi Kesultanan Yogyakarta yang terletak di pusat Kota Yogyakarta, Indonesia. Dibangun pada tahun 1755 oleh Sultan Hamengkubuwono I, keraton ini menjadi pusat budaya, seni, dan tradisi Jawa yang masih hidup hingga kini." },
    { src: Gallery6, title: "Pertunjukan Wayang Prambanan", text: "Pertunjukan Wayang di Prambanan adalah sajian seni tradisional yang memadukan kisah epik seperti Ramayana dengan iringan gamelan khas Jawa. Biasanya digelar di panggung terbuka dengan latar megah Candi Prambanan." },
  ];

  return (
    <div className="gallery min-vh-100 d-flex align-items-center" id="gallery">
      <Container>
        <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 g-4">
          {images.map((image, index) => (
            <Col key={index}>
              <Card className="gallery-card" data-aos="fade-up" data-aos-delay={`${200 * index}`}>
                <Card.Img variant="top" src={image.src} alt={`Gallery Image ${index + 1}`} />
                <Card.Body>
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Text>{image.text}</Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default GalleryComp;
