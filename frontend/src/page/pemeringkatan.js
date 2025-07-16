import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RekomendasiObjek from './criteriainput';
import EvaluationForm from './evaluations';

const Prefensi = ({ onCalculate }) => {
    const [criterias, setCriterias] = useState([]);
    const [preferences, setPreferences] = useState({
        nature: '0',
        history: '0',
        culture: '0',
    });

    const fetchData = async () => {
        try {
            const criteriasResponse = await fetch('http://localhost:5000/criterias');
            const criteriasData = await criteriasResponse.json();

            const preferencesResponse = await fetch('http://localhost:5000/evaluations/1');
            const preferencesData = await preferencesResponse.json();

            setCriterias(criteriasData);
            setPreferences({
                nature: preferencesData.nature || '0',
                history: preferencesData.history || '0',
                culture: preferencesData.culture || '0',
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Terjadi kesalahan saat mengambil data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            const criteriasResponse = await fetch('http://localhost:5000/criterias', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(criterias),
            });

            if (!criteriasResponse.ok) {
                throw new Error('Gagal menyimpan data kriteria.');
            }

            const valueMapping = {
                nature: 0,
                history: 0,
                culture: 0,
            };

            Object.keys(preferences).forEach((key) => {
                if (preferences[key] === '1') {
                    valueMapping[key] = 3;
                } else if (preferences[key] === '2') {
                    valueMapping[key] = 2;
                } else if (preferences[key] === '3') {
                    valueMapping[key] = 1;
                }
            });

            const preferencesResponse = await fetch(`http://localhost:5000/evaluations/1`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Wisata Alam': valueMapping.nature,
                    'Wisata Sejarah': valueMapping.history,
                    'Wisata Budaya': valueMapping.culture,
                }),
            });

            if (!preferencesResponse.ok) {
                throw new Error('Gagal menyimpan data preferensi.');
            }

            alert('Data berhasil disimpan!');

            // Call onCalculate to pass preferences to MainComponent
            onCalculate(preferences);
            fetchData();
        } catch (error) {
            alert('Terjadi kesalahan saat menyimpan data. ' + error.message);
        }
    };

    return (
        <Container fluid className="my-5">
            <h1 className="text-center mb-4">Isi Bobot Kriteria dan Peringkat Wisata</h1>
            <p className="container my-3">
                Beri nilai pada setiap kriteria berdasarkan kepentingannya bagi Anda, dengan total nilai semua kriteria maksimal 1 (satu).
                Sesuaikan bobot agar rekomendasi optimal sesuai kebutuhan dan keinginan Anda, Nilai ini menentukan prioritas dalam memilih destinasi.
                Setelah itu, pilih jenis wisata dari yang paling sesuai dengan preferensi Anda.
            </p>
            <Row>
                <h5 className='justify-text'>PENTING! ⚠️</h5>
                <p>Dalam pengisian nilai bobot kriteria, harapmemperhatikan format penulisan yang benar:</p>
                <ul className='center-list'>
                    <li>Gunakan TITIK (.) untuk memisahkan angka desimal. </li>
                    <li>JANGAN menggunakan KOMA (,) </li>
                </ul>
                <Col md={6} className="mb-4">
                    <div className="border p-2 shadow-sm rounded">
                        <RekomendasiObjek criterias={criterias} setCriterias={setCriterias} />
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <div className="border p-2 shadow-sm rounded">
                        <EvaluationForm preferences={preferences} setPreferences={setPreferences} />
                    </div>
                </Col>
            </Row>
            <div className="text-center mt-4">
                <button onClick={handleSubmit} className="btn btn-primary">
                    Simpan
                </button>
            </div>
        </Container>
    );
};

export default Prefensi;