import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Alternatives = () => {
    const [alternatives, setAlternatives] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newAlternative, setNewAlternative] = useState({ nama: '', jenis_wisata: '', jarak: '', harga: '', rating: '' });
    const [editAlternative, setEditAlternative] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchAlternatives();
    }, []);

    const fetchAlternatives = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/alternatives');
            setAlternatives(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data alternatif!", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewAlternative({ nama: '', jenis_wisata: '', jarak: '', harga: '', rating: '' });
        setError('');
        setSuccessMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAlternative({ ...newAlternative, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newAlternative.nama || !newAlternative.jenis_wisata || !newAlternative.jarak || !newAlternative.harga || !newAlternative.rating) {
            setError('Semua field harus diisi.');
            return;
        }
        if (newAlternative.rating <= 0) {
            setError('Rating harus lebih besar dari 0.');
            return;
        }
        if (newAlternative.rating > 5) {
            setError('Rating tidak boleh lebih dari 5.');
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/alternatives', newAlternative);
            setSuccessMessage('Alternatif berhasil ditambahkan!');
            handleCloseModal();
            fetchAlternatives();
        } catch (error) {
            setError("Terjadi kesalahan saat menambahkan alternatif!");
            console.error("Terjadi kesalahan saat menambahkan alternatif!", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (alternative) => {
        setEditAlternative(alternative);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditAlternative(null);
        setError('');
        setSuccessMessage('');
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditAlternative({ ...editAlternative, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editAlternative.nama || !editAlternative.jenis_wisata || !editAlternative.jarak || !editAlternative.harga || !editAlternative.rating) {
            setError('Semua field harus diisi.');
            return;
        }
        if (editAlternative.rating <= 0) {
            setError('Rating harus lebih besar dari 0.');
            return;
        }
        if (editAlternative.rating > 5) {
            setError('Rating tidak boleh lebih dari 5.');
            return;
        }
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/alternatives/${editAlternative.id_alternatif}`, editAlternative);
            setSuccessMessage('Alternatif berhasil diperbarui!');
            handleCloseEditModal();
            fetchAlternatives();
        } catch (error) {
            setError("Terjadi kesalahan saat memperbarui alternatif!");
            console.error("Terjadi kesalahan saat memperbarui alternatif!", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapusnya?")) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5000/alternatives/${id}`);
                setSuccessMessage('Alternatif berhasil dihapus!');
                fetchAlternatives();
            } catch (error) {
                setError("Terjadi kesalahan saat menghapus alternatif!");
                console.error("Terjadi kesalahan saat menghapus alternatif!", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <div className="hero min-vh-85 w-100 bg-dark text-white d-flex align-items-center">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center fs-1">ALTERNATIF WISATA DIY</h1>
                            <p className="text-center text-white-50">Rekomendasi Tempat Wisata di Yogyakarta</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="container my-5">
                <h1 className="text-center mt-5">Data Destinasi Wisata</h1>
                <Button onClick={handleAddClick}>Tambah</Button> <br /> <br />
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jenis Wisata</th>
                            <th>Jarak (Km)</th>
                            <th>Harga</th>
                            <th>Rating</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    <Spinner animation="border" />
                                </td>
                            </tr>
                        ) : (
                            alternatives.map((alternative, index) => (
                                <tr key={alternative.id_alternatif}>
                                    <td>{index + 1}</td>
                                    <td>{alternative.nama}</td>
                                    <td>{alternative.jenis_wisata}</td>
                                    <td>{alternative.jarak} Km</td>
                                    <td>Rp. {alternative.harga}</td>
                                    <td>{alternative.rating}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button variant="warning" onClick={() => handleEditClick(alternative)} className="btn-edit">Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(alternative.id_alternatif)} className="btn-delete">Hapus</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Tambah Data */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Wisata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={newAlternative.nama}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jenis Wisata</Form.Label>
                            <Form.Select
                                name="jenis_wisata"
                                value={newAlternative.jenis_wisata}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Wisata</option>
                                <option value="Wisata Alam">Wisata Alam</option>
                                <option value="Wisata Sejarah">Wisata Sejarah</option>
                                <option value="Wisata Budaya">Wisata Budaya</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jarak (Km)</Form.Label>
                            <Form.Control
                                type="number"
                                name="jarak"
                                value={newAlternative.jarak}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Harga (Rp)</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={newAlternative.harga}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name="rating"
                                value={newAlternative.rating}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Tambah
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Data */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data Wisata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editAlternative && (
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama"
                                    value={editAlternative.nama}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Jenis Wisata</Form.Label>
                                <Form.Select
                                    name="jenis_wisata"
                                    value={editAlternative.jenis_wisata}
                                    onChange={handleEditInputChange}
                                    required
                                >
                                    <option value="">Pilih Jenis Wisata</option>
                                    <option value="Wisata Alam">Wisata Alam</option>
                                    <option value="Wisata Sejarah">Wisata Sejarah</option>
                                    <option value="Wisata Budaya">Wisata Budaya</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Jarak (Km)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="jarak"
                                    value={editAlternative.jarak}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Harga (Rp)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="harga"
                                    value={editAlternative.harga}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    name="rating"
                                    value={editAlternative.rating}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group> <br />
                            <Button variant="primary" type="submit" className="mt-3">
                                Simpan Perubahan
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Alternatives;