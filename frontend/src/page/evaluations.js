import React from 'react';
import { Table } from 'react-bootstrap';

const EvaluationForm = ({ preferences, setPreferences }) => {
    const handlePreferencesChange = (event) => {
        const { name, value } = event.target;

        let updatedPreferences = { ...preferences, [name]: value };

        if (value === '1') {
            Object.keys(updatedPreferences).forEach((key) => {
                if (key !== name && updatedPreferences[key] === '1') {
                    updatedPreferences[key] = '0';
                }
            });
        }

        setPreferences(updatedPreferences);
    };

    const getAvailableOptions = (currentField) => {
        const selectedValues = Object.values(preferences).filter((value) => value !== '0');
        const allOptions = ['1', '2', '3'];

        return allOptions.filter((option) => option === preferences[currentField] || !selectedValues.includes(option));
    };

    return (
        <div className="container">
            <h4>Jenis Wisata</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Jenis Wisata</th>
                        <th>Peringkat (1-3)</th>
                    </tr>
                </thead>
                <tbody>
                    {['nature', 'history', 'culture'].map((field, index) => (
                        <tr key={index}>
                            <td>{field === 'nature' ? 'Wisata Alam' : field === 'history' ? 'Wisata Sejarah' : 'Wisata Budaya'}</td>
                            <td>
                                <select
                                    name={field}
                                    value={preferences[field]}
                                    onChange={handlePreferencesChange}
                                    className="form-control"
                                >
                                    <option value="0">Pilih Peringkat</option>
                                    {getAvailableOptions(field).map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EvaluationForm;
