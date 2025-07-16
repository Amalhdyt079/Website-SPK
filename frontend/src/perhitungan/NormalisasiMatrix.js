import React from "react";

const NormalizedMatrix = ({ normalizedMatrix }) => {
    // Pastikan normalizedMatrix adalah objek
    if (typeof normalizedMatrix !== 'object' || normalizedMatrix === null) {
        return <div>Tidak ada data matriks yang tersedia.</div>;
    }

    // Ambil kunci dari objek untuk digunakan sebagai header tabel
    const keys = Object.keys(normalizedMatrix);
    const columns = Object.keys(normalizedMatrix[keys[0]]); // Ambil kolom dari objek pertama

    return (
        <div >
            <h2>Matriks Normalisasi</h2>
            <table striped bordered hover responsive className="table-Z">
                <thead>
                    <tr>
                        <th>Index</th>
                        {columns.map((col, index) => (
                            <th key={index}>Kolom {col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => (
                        <tr key={key}>
                            <td>{key}</td>
                            {columns.map((col) => (
                                <td key={col}>{normalizedMatrix[key][col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NormalizedMatrix;