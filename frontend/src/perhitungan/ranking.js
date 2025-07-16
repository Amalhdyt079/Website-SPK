import React, { useState, useEffect } from "react";
import axios from "axios";

const Perhitungan = () => {
    const [alternatives, setAlternatives] = useState({});
    const [criterias, setCriterias] = useState({});
    const [evaluations, setEvaluations] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [minValues, setMinValues] = useState({});
    const [maxValues, setMaxValues] = useState({});
    const [normalizedMatrix, setNormalizedMatrix] = useState({});
    const [preferenceScores, setPreferenceScores] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const altResponse = await axios.get("http://localhost:5000/alternatives");
                const critResponse = await axios.get("http://localhost:5000/criterias");
                const evalResponse = await axios.get("http://localhost:5000/evaluations");

                // Set Alternatives
                setAlternatives(
                    altResponse.data.reduce((obj, item) => {
                        obj[item.id_alternatif] = {
                            nama: item.nama,
                            jenis_wisata: item.jenis_wisata,
                            jarak: item.jarak,
                            harga: item.harga,
                            rating: item.rating,
                        };
                        return obj;
                    }, {})
                );

                // Set Criterias
                setCriterias(
                    critResponse.data.reduce((obj, item) => {
                        obj[item.id_kriteria] = {
                            kriteria: item.kriteria,
                            bobot: Number(item.bobot),
                            atribut: item.atribut, // cost atau benefit
                        };
                        return obj;
                    }, {})
                );

                // Set Evaluations
                setEvaluations(
                    evalResponse.data.map((item) => ({
                        id: item.id,
                        alternativeId: item.id_alternatif,
                        criteriaId: item.id_kriteria,
                        value: Number(item.value),
                    }))
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateSAW = () => {
        const tempMinValues = {};
        const tempMaxValues = {};
        const tempNormalizedMatrix = {};
        const tempPreferenceScores = {};

        // Ensure data is loaded
        if (
            Object.keys(alternatives).length === 0 ||
            Object.keys(criterias).length === 0 ||
            evaluations.length === 0
        ) {
            alert("Data belum lengkap untuk perhitungan SAW.");
            return;
        }

        // Menentukan nilai minimum dan maksimum per kriteria
        evaluations.forEach(({ criteriaId, value }) => {
            if (criterias[criteriaId].atribut === "cost") {
                tempMinValues[criteriaId] = Math.min(tempMinValues[criteriaId] || value, value);
            } else {
                tempMaxValues[criteriaId] = Math.max(tempMaxValues[criteriaId] || value, value);
            }
        });

        console.log("Nilai Minimum per Kriteria:", tempMinValues);
        console.log("Nilai Maksimum per Kriteria:", tempMaxValues);

        // Normalisasi Matriks Keputusan
        evaluations.forEach(({ alternativeId, criteriaId, value }) => {
            if (!tempNormalizedMatrix[alternativeId]) {
                tempNormalizedMatrix[alternativeId] = {};
            }
            if (criterias[criteriaId].atribut === "cost") {
                tempNormalizedMatrix[alternativeId][criteriaId] =
                    tempMinValues[criteriaId] / value;
            } else {
                tempNormalizedMatrix[alternativeId][criteriaId] =
                    value / tempMaxValues[criteriaId];
            }
        });

        console.log("Matriks Normalisasi:", tempNormalizedMatrix);

        // Menghitung nilai preferensi
        for (const altId in tempNormalizedMatrix) {
            tempPreferenceScores[altId] = Object.keys(tempNormalizedMatrix[altId]).reduce(
                (total, criteriaId) =>
                    total +
                    tempNormalizedMatrix[altId][criteriaId] * criterias[criteriaId].bobot,
                0
            );
        }

        console.log("Nilai Preferensi:", tempPreferenceScores);

        // Mengurutkan preferensi
        const sortedResults = Object.entries(tempPreferenceScores).sort(
            (a, b) => b[1] - a[1]
        );

        setMinValues(tempMinValues);
        setMaxValues(tempMaxValues);
        setNormalizedMatrix(tempNormalizedMatrix);
        setPreferenceScores(tempPreferenceScores);

        setResult(
            sortedResults.map(([altId, score], index) => ({
                rank: index + 1,
                alternative: alternatives[altId],
                preferenceValue: score.toFixed(4),
            }))
        );
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Perhitungan SAW</h1>
            <button onClick={calculateSAW} className="btn">
                Hitung
            </button>
            {result && (
                <div className="results">
                    <h2>Hasil Perhitungan</h2>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Alternatif</th>
                                <th>Jenis Wisata</th>
                                <th>Jarak</th>
                                <th>Harga</th>
                                <th>Rating</th>
                                <th>Nilai Preferensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map(({ rank, alternative, preferenceValue }) => (
                                <tr key={rank}>
                                    <td>{rank}</td>
                                    <td>{alternative.nama}</td>
                                    <td>{alternative.jenis_wisata}</td>
                                    <td>{alternative.jarak}</td>
                                    <td>{alternative.harga}</td>
                                    <td>{alternative.rating}</td>
                                    <td>{preferenceValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="steps">
                <h3>Langkah-langkah Perhitungan :</h3>
                <div className="steps">
                    <h4>Menentukan Nilai Maksimum per Kriteria:</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Atribut</th>
                                {/* <th>Tipe</th> */}
                                <th>Nilai mx</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(maxValues).map((criteriaId) => (
                                <tr key={criteriaId}>
                                    <td>{criterias[criteriaId].kriteria}</td>
                                    <td>{criterias[criteriaId].atribut}</td>
                                    {/* <td>{criterias[criteriaId].atribut === "cost" ? "Biaya" : "Manfaat"}</td> */}
                                    <td>{maxValues[criteriaId]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h4>2. Matriks Normalisasi:</h4>
            <pre>{JSON.stringify(normalizedMatrix, null, 2)}</pre>

            <h4>3. Nilai Preferensi:</h4>
            <pre>{JSON.stringify(preferenceScores, null, 2)}</pre>
        </div>
  );
};

export default Perhitungan;
