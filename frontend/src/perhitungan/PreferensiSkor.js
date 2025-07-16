import React from "react";
import { Table } from "react-bootstrap";

const PreferenceScores = ({ preferenceScores, alternatives }) => {
    const sortedScores = Object.entries(preferenceScores).sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>Hasil Rekomendasi Objek Wisata Terbaik</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Alternatif</th>
                        <th>Nilai Preferensi</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedScores.map(([altId, score], index) => (
                        <tr key={altId}>
                            <td>{index + 1}</td>
                            <td>{alternatives[altId].nama}</td>
                            <td>{score.toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreferenceScores;