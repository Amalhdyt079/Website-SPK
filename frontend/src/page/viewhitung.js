import React, { useState, useEffect } from "react";
import axios from "axios";
import Alternatives from "../perhitungan/Alternatives";
import Criteria from "../perhitungan/Criterias";
import Evaluations from "../perhitungan/Evaluations";
import MaxMinValues from "../perhitungan/NilaiMinimumMaks";
import NormalizedMatrix from "../perhitungan/NormalisasiMatrix";
import PreferenceScores from "../perhitungan/PreferensiSkor";

const CalculationView = ({ preferences }) => {
  const btnRef = React.useRef(null);
  const [alternatives, setAlternatives] = useState({});
  const [criterias, setCriterias] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [maxValues, setMaxValues] = useState({});
  const [minValues, setMinValues] = useState({});
  const [normalizedMatrix, setNormalizedMatrix] = useState({});
  const [preferenceScores, setPreferenceScores] = useState({});
  const [showSections, setShowSections] = useState(false); // State to control visibility
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [altResponse, critResponse, evalResponse] = await Promise.all([
          axios.get("http://localhost:5000/alternatives"),
          axios.get("http://localhost:5000/criterias"),
          axios.get("http://localhost:5000/evaluations"),
        ]);

        setAlternatives(
          altResponse.data.reduce((obj, item) => {
            obj[item.id_alternatif] = item;
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().then(() => {
      setTimeout(() => {
        btnRef.current.click();
      }, 500);
    });

    const handleScroll = () => {
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateSAW = () => {
    const tempMinValues = {};
    const tempMaxValues = {};
    const tempNormalizedMatrix = {};
    const tempPreferenceScores = {};

    if (
      Object.keys(alternatives).length === 0 ||
      Object.keys(criterias).length === 0 ||
      evaluations.length === 0
    ) {
      alert("Data belum lengkap untuk perhitungan SAW.");
      return;
    }

    evaluations.forEach(({ id_kriteria, value }) => {
      if (!criterias[id_kriteria]) {
        console.error(`Kriteria dengan ID ${id_kriteria} tidak ditemukan.`);
        return;
      }
      if (criterias[id_kriteria].atribut === "cost") {
        tempMinValues[id_kriteria] = Math.min(
          tempMinValues[id_kriteria] || value,
          value
        );
      } else {
        tempMaxValues[id_kriteria] = Math.max(
          tempMaxValues[id_kriteria] || value,
          value
        );
      }
    });

    evaluations.forEach(({ id_alternatif, id_kriteria, value }) => {
      if (!tempNormalizedMatrix[id_alternatif]) {
        tempNormalizedMatrix[id_alternatif] = {};
      }
      if (!criterias[id_kriteria]) {
        console.error(`Kriteria dengan ID ${id_kriteria} tidak ditemukan.`);
        return;
      }
      if (criterias[id_kriteria].atribut === "cost") {
        tempNormalizedMatrix[id_alternatif][id_kriteria] =
          tempMinValues[id_kriteria] / value;
      } else {
        tempNormalizedMatrix[id_alternatif][id_kriteria] =
          value / tempMaxValues[id_kriteria];
      }
    });

    for (const altId in tempNormalizedMatrix) {
      tempPreferenceScores[altId] = Object.keys(
        tempNormalizedMatrix[altId]
      ).reduce(
        (total, criteriaId) =>
          total +
          tempNormalizedMatrix[altId][criteriaId] *
          criterias[criteriaId].bobot,
        0
      );
    }

    setMaxValues(tempMaxValues);
    setMinValues(tempMinValues);
    setNormalizedMatrix(tempNormalizedMatrix);
    setPreferenceScores(tempPreferenceScores);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSections = () => {
    setShowSections((prev) => !prev); 
  };

  return (
    <div>
      <PreferenceScores preferenceScores={preferenceScores} alternatives={alternatives}/> <br />

      <div className="text-center mt-4">
        <button onClick={toggleSections} className="btn-1">
          {showSections ? "Sembunyikan Perhitungan" : "Tampilkan Perhitungan"}
        </button>
      </div> <br />

      {showSections && (
        <>
          <Alternatives alternatives={alternatives} /> <br />
          <Criteria criterias={criterias} /> <br />
          <Evaluations evaluations={evaluations} /> <br />
          <MaxMinValues maxValues={maxValues} minValues={minValues} criterias={criterias} /> <br />
          <NormalizedMatrix normalizedMatrix={normalizedMatrix} /> <br />
          <PreferenceScores preferenceScores={preferenceScores} alternatives={alternatives}
          />
        </>
      )}

      <div className="text-center mt-4">
        <button ref={btnRef} onClick={calculateSAW}
          className="btn btn-primary d-none"
        ></button>
      </div>

      <div>
        {showArrow && (
          <div onClick={handleScrollToTop} className="scroll-to-top">
            ↑
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationView;