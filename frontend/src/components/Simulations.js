import React, { useState, useEffect } from 'react';

const Simulations = () => {
    const [services, setServices] = useState([]);
    const [targetService, setTargetService] = useState('');
    const [log, setLog] = useState(['Ready to start simulation...']);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        fetch('/api/simulation/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                if (data.length > 0) {
                    setTargetService(data[0].id);
                }
            })
            .catch(err => console.error("Failed to fetch simulation services:", err));
    }, []);

    const addLog = (message) => {
        setLog(prevLog => [...prevLog, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    const runSimulation = () => {
        setIsSimulating(true);
        setLog([`[${new Date().toLocaleTimeString()}] Initializing simulation...`]);
        addLog(`Starting failure injection on ${targetService}...`);

        let queue = [targetService];
        let processed = new Set();

        const processQueue = () => {
            if (queue.length === 0) {
                addLog('Cascading effects simulation complete.');
                setIsSimulating(false);
                return;
            }
            const currentId = queue.shift();
            processed.add(currentId);

            setServices(prevServices => prevServices.map(s => {
                if (s.id === currentId) {
                    const newStatus = s.id === targetService ? 'failed' : 'degraded';
                    addLog(`${s.id} has become ${newStatus}.`);
                    return { ...s, status: newStatus };
                }
                return s;
            }));

            services.forEach(s => {
                if (s.dependencies.includes(currentId) && !processed.has(s.id)) {
                    queue.push(s.id);
                }
            });

            setTimeout(processQueue, 1500);
        };
        processQueue();
    };

    const resetSimulation = () => {
        fetch('/api/simulation/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch simulation services:", err));
        addLog('Simulation environment has been reset.');
    };

    return (
        <div id="simulations" className="dashboard-content page-content active">
            <h1 className="hero-title" style={{ color: 'var(--dark-blue)' }}>Chaos & Performance Simulations</h1>
            <p className="hero-subtitle" style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Test infrastructure resilience by simulating failure events in a safe environment.</p>
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
                        <select id="targetService" value={targetService} onChange={(e) => setTargetService(e.target.value)}>
                            {services.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                        </select>
                    </div>
                    <button id="runSimulationBtn" className="action-button" style={{ marginTop: '1rem' }} onClick={runSimulation} disabled={isSimulating}>
                        {isSimulating ? 'Simulating...' : 'Run Simulation'}
                    </button>
                    <button id="resetSimulationBtn" className="action-button secondary" style={{ marginTop: '0.5rem' }} onClick={resetSimulation} disabled={isSimulating}>
                        Reset
                    </button>
                    <div className="sim-results-log" id="simulationLog" style={{ marginTop: '1rem' }}>
                        {log.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                </div>
                <div className="simulation-visualization" id="simulationViz">
                    {services.map(s => (
                        <div
                            key={s.id}
                            id={`node-${s.id}`}
                            className={`sim-node ${s.status}`}
                            style={{ left: s.pos.x, top: s.pos.y, transform: 'translate(-50%, -50%)' }}
                        >
                            {s.id}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Simulations;
