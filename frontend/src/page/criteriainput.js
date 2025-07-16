import React, {useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const RekomendasiObjek = ({ criterias, setCriterias }) => {
    useEffect(() => {
        // Fetch data from backend API
        axios.get('http://localhost:5000/criterias')
            .then(response => {
                setCriterias(response.data);
            })
            .catch(error => {
                console.error("Error fetching kriteria data!", error);
            });
    }, [setCriterias]);

    const calculateTotalWeight = () => {
        return criterias.reduce((total, criteria) => total + parseFloat(criteria.bobot || 0), 0);
    };

    const handleWeightChange = (id, value) => {
        const newWeight = parseFloat(value) || 0; // Default value if input is empty
        const currentTotal = calculateTotalWeight();

        // Get the criteria being edited
        const currentCriteria = criterias.find(criteria => criteria.id_kriteria === id);
        if (!currentCriteria) return;

        // Validate: Ensure total weight does not exceed 1
        const updatedTotal = currentTotal - (parseFloat(currentCriteria.bobot) || 0) + newWeight;
        if (updatedTotal > 1) {
            alert('Total bobot semua kriteria tidak boleh melebihi 1!');
            return;
        }

        // Update criteria weight
        const updatedCriterias = criterias.map(criteria => {
            if (criteria.id_kriteria === id) {
                return { ...criteria, bobot: newWeight };
            }
            return criteria;
        });
        setCriterias(updatedCriterias);
    };

    return (
        <div className="container">
            <h4>Kriteria dan Bobot</h4><br />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kriteria</th>
                        <th>Bobot
                        <h6 style={{ fontSize: 'small', margin: 0 }}>Total Bobot (Max 1) : {calculateTotalWeight().toFixed(2)}</h6>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {criterias.map((criteria, index) => (
                        <tr key={criteria.id_kriteria}>
                            <td>{index + 1}</td>
                            <td>{criteria.kriteria}</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={criteria.bobot}
                                    onChange={(e) => handleWeightChange(criteria.id_kriteria, e.target.value)}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default RekomendasiObjek;
