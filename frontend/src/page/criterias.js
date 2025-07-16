import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

const Criterias = () => {

    const [criterias, setCriterias] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        axios.get('http://localhost:5000/criterias')
            .then(response => {
                setCriterias(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the kriteria data!", error);
            });
    }, []);

    return (
        <>
            <div className="hero min-vh-85 w-100 bg-dark text-white d-flex align-items-center">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center fs-1 animate__animated animate__bounce animate__fadeInUp">
                                KRITERIA WISATA DIY
                            </h1>
                            <p className="text-center text-white-50 animate__animated animate__fadeInUp animate__delay-1s">
                                Rekomendasi Tempat Wisata di Yogyakarta
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <div className="container my-5">
            <h1 className="text-center mt-5" data-aos="fade-up">Data Kriteria</h1>
            <p className='paragraf-1'>
            Di bawah ini adalah data kriteria yang digunakan untuk memberikan rekomendasi wisata. Anda dapat menyesuaikan bobot pada setiap kriteria 
            sesuai dengan preferensi Anda untuk mendapatkan rekomendasi yang paling relevan dengan kebutuhan dan keinginan Anda. 
            Setiap kriteria memiliki atribut tertentu yang menentukan perannya dalam proses seleksi, yaitu sebagai pengurang biaya (Cost) atau penambah manfaat (Benefit).
            </p>
                <Table striped bordered hover responsive className='text-center'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kriteria</th>
                            <th>Atribut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {criterias.map((criteria, index) => (
                            <tr key={criteria.id_kriteria}>
                                <td>{index + 1 }</td>
                                <td>{criteria.kriteria}</td>
                                <td>{criteria.atribut}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default Criterias;