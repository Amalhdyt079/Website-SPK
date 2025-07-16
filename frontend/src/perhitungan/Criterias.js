import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
import axios from "axios";

const Criteria = () => {
    const [criteria, setCriteria] = useState([]);

    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const response = await axios.get("http://localhost:5000/criterias");
                setCriteria(response.data);
            } catch (error) {
                console.error("Error fetching criteria data:", error);
            }
        };
        fetchCriteria();
    }, []);

    return (
        <div>
            <h2>Tabel Kriteria</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kriteria</th>
                        <th>Bobot</th>
                        <th>Atribut</th>
                    </tr>
                </thead>
                <tbody>
                    {criteria.map((crit) => (
                        <tr key={crit.id_kriteria}>
                            <td>{crit.id_kriteria}</td>
                            <td>{crit.kriteria}</td>
                            <td>{crit.bobot}</td>
                            <td>{crit.atribut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Criteria;