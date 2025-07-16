import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
import axios from "axios";

const Alternatives = () => {
    const [alternatives, setAlternatives] = useState([]);

    useEffect(() => {
        const fetchAlternatives = async () => {
            const response = await axios.get("http://localhost:5000/alternatives");
            setAlternatives(response.data);
        };
        fetchAlternatives();
    }, []);

    return (
        <div>
            <h1>Proses Perhitungan SAW</h1> <br />
            <h2>Tabel Alternatif</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>N0</th>
                        <th>Nama</th>
                        <th>Jenis Wisata</th>
                        <th>Jarak</th>
                        <th>Harga</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {alternatives.map((alt) => (
                        <tr key={alt.id_alternatif}>
                            <td>{alt.id_alternatif}</td>
                            <td>{alt.nama}</td>
                            <td>{alt.jenis_wisata}</td>
                            <td>{alt.jarak}</td>
                            <td>{alt.harga}</td>
                            <td>{alt.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Alternatives;