import React, { useState, useEffect } from "react";
import axios from "axios";
import Alternatives from "../perhitungan/Alternatives";
import Criteria from "../perhitungan/Criterias";
import Evaluations from "../perhitungan/Evaluations";
import MaxMinValues from "../perhitungan/NilaiMinimumMaks";
import NormalizedMatrix from "../perhitungan/NormalisasiMatrix";
import PreferenceScores from "../perhitungan/PreferensiSkor";

const CalculationView = () => {
    const [alternatives, setAlternatives] = useState({});
    const [criterias, setCriterias] = useState({});
    const [evaluations, setEvaluations] = useState([]);
    const [maxValues, setMaxValues] = useState({});
    const [minValues, setMinValues] = useState({});
    const [normalizedMatrix, setNormalizedMatrix] = useState({});
    const [preferenceScores, setPreferenceScores] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const altResponse = await axios.get("http://localhost:5000/alternatives");
            const critResponse = await axios.get("http://localhost:5000/criterias");
            const evalResponse = await axios.get("http://localhost:5000/evaluations");

            // Convert alternatives to an object for easier access
            setAlternatives(
                altResponse.data.reduce((obj, item) => {
                    obj[item.id_alternatif] = item; // Use id_alternatif as key
                    return obj;
                }, {})
            );

            setCriterias(
                critResponse.data.reduce((obj, item) => {
                    obj[item.id_kriteria] = {
                        kriteria: item.kriteria,
                        bobot: Number(item.bobot),
                        atribut: item.atribut,
                    };
                    return obj;
                }, {})
            );

            setEvaluations(evalResponse.data);
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

        // Determine min and max values for each criteria
        evaluations.forEach(({ id_kriteria, value }) => {
            if (!criterias[id_kriteria]) {
                console.error(`Kriteria dengan ID ${id_kriteria} tidak ditemukan.`);
                return; // Skip this iteration if the kriteria is not found
            }
            if (criterias[id_kriteria].atribut === "cost") {
                tempMinValues[id_kriteria] = Math.min(tempMinValues[id_kriteria] || value, value);
            } else {
                tempMaxValues[id_kriteria] = Math.max(tempMaxValues[id_kriteria] || value, value);
            }
        });

        // Normalize the decision matrix
        evaluations.forEach(({ id_alternatif, id_kriteria, value }) => {
            if (!tempNormalizedMatrix[id_alternatif]) {
                tempNormalizedMatrix[id_alternatif] = {};
            }
            if (!criterias[id_kriteria]) {
                console.error(`Kriteria dengan ID ${id_kriteria} tidak ditemukan.`);
                return; // Skip this iteration if the kriteria is not found
            }
            if (criterias[id_kriteria].atribut === "cost") {
                tempNormalizedMatrix[id_alternatif][id_kriteria] =
                    tempMinValues[id_kriteria] / value;
            } else {
                tempNormalizedMatrix[id_alternatif][id_kriteria] =
                    value / tempMaxValues[id_kriteria];
            }
        });

        // Calculate preference scores
        for (const altId in tempNormalizedMatrix) {
            tempPreferenceScores[altId] = Object.keys(tempNormalizedMatrix[altId]).reduce(
                (total, criteriaId) =>
                    total +
                    tempNormalizedMatrix[altId][criteriaId] * criterias[criteriaId].bobot,
                0
            );
        }

        // Update state with calculated values
        setMaxValues(tempMaxValues);
        setMinValues(tempMinValues);
        setNormalizedMatrix(tempNormalizedMatrix);
        setPreferenceScores(tempPreferenceScores);
    };

    return (
        <div>
            <h1>Perhitungan SAW</h1>
            <button onClick={calculateSAW}>Hitung</button>
            <Alternatives /> <br />
            <Criteria /><br />
            <Evaluations /><br />
            <MaxMinValues maxValues={maxValues} minValues={minValues} criterias={criterias} /><br />
            <NormalizedMatrix normalizedMatrix={normalizedMatrix} /><br />
            <PreferenceScores preferenceScores={preferenceScores} alternatives={alternatives} /><br />
        </div>
    );
};

export default CalculationView;