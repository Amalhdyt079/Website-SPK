import React, { useState } from 'react';
import Prefensi from './pemeringkatan'; 
import CalculationView from './viewhitung'; 

const MainComponent = () => {
    const [isCalculated, setIsCalculated] = useState(false);
    const [preferences, setPreferences] = useState({});

    const handleCalculate = (prefs) => {
        setPreferences(prefs);
        setIsCalculated(true);
    };

    return (
        <div>
            <Prefensi onCalculate={handleCalculate} />
            {/* <div className="text-center mt-4">
                <button onClick={() => handleCalculate(preferences)} className="btn btn-primary">
                    Hitung
                </button>
            </div> */}
            {isCalculated && <CalculationView preferences={preferences} />}
        </div>
    );
};

export default MainComponent;