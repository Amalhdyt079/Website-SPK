import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap"

const FaqComp = () => {
    return (
        <div className="faq" id="faq">
            <Container>
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center" data-aos="fade-up">Biasa di Tanyakan</h2>
                        <p className="text-center" data-aos="fade-up" data-aos-delay="200">Berikut adalah beberapa pertanyaan umum meneganai wisata di Yogyakarta:
                        </p>
                    </Col>
                </Row>
                <Row className="row-cols-lg-2 row-cols-1 g-4">
                    <Col data-aos="fade-up" data-aos-delay="400">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Jenis wisata apa yang tersedia?</Accordion.Header>
                                <Accordion.Body>
                                    Terdapat berbagai jenis wisata yang dapat dinikmati, mulai dari wisata alam, budaya, sejarah, hingga wisata kuliner dan belanja. Setiap tempat menawarkan pengalaman unik sesuai minat pengunjung.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col data-aos="fade-up" data-aos-delay="500">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Apa yang membedakan objek wisata ini dari wisata yang lain?</Accordion.Header>
                                <Accordion.Body>
                                    Objek wisata ini menawarkan keunikan tertentu, baik dari segi lokasi, pengalaman budaya, ataupun keindahan alam yang sulit ditemukan di tempat lain.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col data-aos="fade-up" data-aos-delay="600">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Apa destinasi wisata terbaik di Yogyakarta?</Accordion.Header>
                                <Accordion.Body>
                                    Yogyakarta memiliki banyak destinasi wisata menarik, seperti Candi Borobudur, Candi Prambanan, Pantai Parangtritis, serta Keraton Yogyakarta yang kaya akan sejarah dan budaya.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col data-aos="fade-up" data-aos-delay="700">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Bagaimana cara memilih objek wisata yang sesuai dengan minat?</Accordion.Header>
                                <Accordion.Body>
                                    Pilih objek wisata berdasarkan minat pribadi, seperti sejarah, alam, budaya, atau kuliner. Jika tertarik dengan sejarah, kunjungi situs-situs bersejarah, sementara untuk alam, jelajahi pantai atau gunung.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col data-aos="fade-up" data-aos-delay="800">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Apa saja objek wisata yang direkomendasikan?</Accordion.Header>
                                <Accordion.Body>
                                    Beberapa objek wisata yang direkomendasikan di Yogyakarta antara lain Candi Borobudur, Pantai Parangtritis, Kaliurang, dan Jalan Malioboro untuk berbelanja.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col data-aos="fade-up" data-aos-delay="1000">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Apa yang harus dipersiapkan sebelum berkunjung?</Accordion.Header>
                                <Accordion.Body>
                                    Pastikan membawa perlengkapan yang sesuai seperti pakaian nyaman, kamera, dan perlindungan seperti tabir surya. Selain itu, siapkan pengetahuan mengenai lokasi wisata dan jam operasionalnya.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                <Col data-aos="fade-up" data-aos-delay="400">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Apa saja rekomendasi objek wisata alam di Yogyakarta?</Accordion.Header>
                            <Accordion.Body>
                                Beberapa objek wisata alam yang populer di Yogyakarta adalah:
                                <ul>
                                    <li>Gunung Merapi - untuk pendakian dan menikmati pemandangan gunung berapi aktif.</li>
                                    <li>Pantai Parangtritis - pantai dengan pemandangan sunset yang indah.</li>
                                    <li>Hutan Pinus Mangunan - tempat yang cocok untuk bersantai dan berfoto.</li>
                                    <li>Kalibiru - wisata alam dengan pemandangan perbukitan dan spot foto menarik.</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>

                <Col data-aos="fade-up" data-aos-delay="500">
                    <Accordion>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Objek wisata sejarah mana yang wajib dikunjungi?</Accordion.Header>
                            <Accordion.Body>
                                Beberapa objek wisata sejarah yang wajib dikunjungi di Yogyakarta adalah:
                                <ul>
                                    <li>Candi Borobudur - candi Buddha terbesar di dunia yang menjadi situs Warisan Dunia UNESCO.</li>
                                    <li>Candi Prambanan - kompleks candi Hindu terbesar di Indonesia.</li>
                                    <li>Kraton Yogyakarta - istana resmi Kesultanan Yogyakarta yang kaya akan sejarah dan budaya.</li>
                                    <li>Museum Sonobudoyo - museum dengan koleksi artefak sejarah dan budaya Jawa.</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </div >
    );
};

export default FaqComp;