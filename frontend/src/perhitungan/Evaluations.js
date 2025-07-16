import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
import axios from "axios";

const EvaluationsTable = () => {
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        const fetchEvaluations = async () => {
            const response = await axios.get("http://localhost:5000/evaluations");
            setEvaluations(response.data);
        };
        fetchEvaluations();
    }, []);

    return (
        <div>
            <h2>Tabel Matriks keputusan</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Alternatif</th>
                        <th>Kriteria</th>
                        <th>Nilai</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluations.map((index, Number) => (
                        <tr key={index.id}>
                            <td>{Number +1}</td>
                            <td>{index.id_alternatif}</td>
                            <td>{index.id_kriteria}</td>
                            <td>{index.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EvaluationsTable;