import React from "react";
// import { Table } from "react-bootstrap";

const MaxMinValues = ({ maxValues, minValues, criterias }) => {
    return (
        <div>
            <h2>Nilai Maksimum dan Minimum per Kriteria</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>Kriteria</th>
                        <th>Atribut</th>
                        <th>Nilai Max/Min</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(maxValues).map((criteriaId) => (
                        <tr key={criteriaId}>
                            <td>{criterias[criteriaId].kriteria}</td>
                            <td>{criterias[criteriaId].atribut}</td>
                            <td>{maxValues[criteriaId]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaxMinValues;