import React from 'react';
import './Simulations.css';

const Simulations = () => {
    return (
        <main id="simulations" className="dashboard-content page-content">
            <h1 className="hero-title" style={{color: 'var(--dark-blue)'}}>Chaos & Performance Simulations</h1>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)', marginBottom: '1.5rem'}}>Test infrastructure resilience by simulating failure events in a safe environment.</p>
            <div className="simulation-grid">
                <div className="simulation-controls card">
                    <h3 className="section-header">Simulation Setup</h3>
                    <div className="form-field">
                        <label htmlFor="simulationType">Simulation Type</label>
                        <select id="simulationType">
                            <option value="failure">Failure Injection</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="targetService">Target Service</label>
                        <select id="targetService"></select>
                    </div>
                    <button id="runSimulationBtn" className="action-button" style={{marginTop: '1rem'}}>Run Simulation</button>
                    <button id="resetSimulationBtn" className="action-button secondary" style={{marginTop: '0.5rem'}} disabled>Reset</button>
                    <div className="sim-results-log" id="simulationLog" style={{marginTop: '1rem'}}>
                        <p>Ready to start simulation...</p>
                    </div>
                </div>
                <div className="simulation-visualization" id="simulationViz"></div>
            </div>
        </main>
    );
};

export default Simulations;
