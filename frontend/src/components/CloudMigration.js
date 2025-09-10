import React, { useState, useEffect } from 'react';

const CloudMigration = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [resources, setResources] = useState([]);
    const [scanComplete, setScanComplete] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [planValidated, setPlanValidated] = useState(false);
    const [migrationStarted, setMigrationStarted] = useState(false);
    const [migrationProgress, setMigrationProgress] = useState(0);
    const [migrationStatus, setMigrationStatus] = useState([]);

    const handleScan = () => {
        setScanComplete(true);
        fetch('/api/migration/resources')
            .then(res => res.json())
            .then(data => {
                setResources(data.map(r => ({ ...r, compatibility: 'Pending...' })));
            })
            .catch(err => console.error("Failed to fetch migration resources:", err));
    };

    const handleAnalysis = () => {
        setAnalysisComplete(true);
        setResources(prev => prev.map(r => {
            if (r.type === 'SQL Database') return { ...r, compatibility: 'Incompatible' };
            return { ...r, compatibility: 'Compatible' };
        }));
        setTimeout(() => setActiveStep(2), 1000);
    };

    const handleValidation = () => {
        setPlanValidated(true);
        setActiveStep(3);
    };

    const handleMigration = () => {
        setMigrationStarted(true);
        const compatibleResources = resources.filter(r => r.compatibility === 'Compatible');
        setMigrationStatus(compatibleResources.map(r => ({ name: r.name, status: 'Pending' })));

        let completed = 0;
        const total = compatibleResources.length;

        compatibleResources.forEach((resource, index) => {
            setTimeout(() => {
                setMigrationStatus(prev => prev.map(s => s.name === resource.name ? { ...s, status: 'In Progress...' } : s));

                setTimeout(() => {
                    const success = Math.random() > 0.1;
                    setMigrationStatus(prev => prev.map(s => s.name === resource.name ? { ...s, status: success ? 'Completed' : 'Failed' } : s));
                    completed++;
                    setMigrationProgress((completed / total) * 100);
                }, 3000 + (Math.random() * 2000));
            }, index * 4000);
        });
    };

    return (
        <div id="cloud-migration" className="dashboard-content page-content active">
            <h1 className="hero-title" style={{ color: 'var(--dark-blue)' }}>Azure to Apache CloudStack Migration</h1>
            <p className="hero-subtitle" style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Utilize this tool to analyze your Azure environment and simulate a migration to the open-source Apache CloudStack platform to forecast significant cost savings.</p>
            <div className="migration-wizard">
                {/* Step 1 */}
                <div id="migration-step-1" className={`wizard-step ${activeStep === 1 ? 'active' : ''}`}>
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">1</div>
                        <h2 className="wizard-step-title">Discovery & Analysis</h2>
                    </div>
                    <div className="wizard-step-content" style={{display: activeStep === 1 ? 'block' : 'none'}}>
                        <p style={{ marginBottom: '1rem' }}>Begin by scanning your connected Azure subscriptions to discover resources eligible for migration.</p>
                        <button id="scanAzureBtn" className="action-button" onClick={handleScan} disabled={scanComplete}>
                            {scanComplete ? 'Scan Complete' : 'Scan Azure Resources'}
                        </button>
                        {scanComplete && (
                            <div id="scanResults" style={{ marginTop: '1.5rem' }}>
                                <h3 className="section-header">Discovered Resources</h3>
                                <div className="table-container card">
                                    <table className="styled-table" id="resourcesTable">
                                        <thead>
                                            <tr>
                                                <th>Resource Name</th>
                                                <th>Type</th>
                                                <th>Location</th>
                                                <th>Size/SKU</th>
                                                <th>Est. Monthly Cost</th>
                                                <th>Compatibility</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resources.map(r => (
                                                <tr key={r.name}>
                                                    <td>{r.name}</td>
                                                    <td>{r.type}</td>
                                                    <td>{r.loc}</td>
                                                    <td>{r.sku}</td>
                                                    <td>${r.cost}/mo</td>
                                                    <td><span className={`status-tag ${r.compatibility.toLowerCase()}`}>{r.compatibility}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div id="analysisSection" style={{ marginTop: '1rem', textAlign: 'right' }}>
                                    <button id="analyzeCostBtn" className="action-button secondary" onClick={handleAnalysis} disabled={analysisComplete}>
                                        {analysisComplete ? 'Analysis Complete' : 'Analyze Compatibility & Cost'}
                                    </button>
                                </div>
                                {analysisComplete && (
                                    <div id="analysisResult" className="summary-card" style={{ marginTop: '1rem', textAlign: 'center' }}>
                                        <div className="summary-card-title">Analysis Complete</div>
                                        <div className="summary-card-value" style={{ color: 'var(--success-green)' }}>Potential Savings: ~$3,200/mo</div>
                                        <p>Proceed to generate the migration plan.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* Step 2 */}
                <div id="migration-step-2" className={`wizard-step ${activeStep === 2 ? 'active' : ''}`}>
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">2</div>
                        <h2 className="wizard-step-title">Migration Plan</h2>
                    </div>
                    <div className="wizard-step-content" style={{display: activeStep === 2 ? 'block' : 'none'}}>
                        <p style={{ marginBottom: '1rem' }}>The AI has generated a recommended migration plan. Review and validate before execution.</p>
                        <div className="table-container card">
                            <table className="styled-table" id="migrationPlanTable">
                                <thead>
                                    <tr>
                                        <th>Azure Resource</th>
                                        <th>CloudStack Equivalent</th>
                                        <th>Migration Strategy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr><td>VM-PROD-WEB-01</td><td>Large Instance (4vCPU, 16GB RAM)</td><td>Lift & Shift (V2V)</td></tr>
                                     <tr><td>SQL-DB-PROD-01</td><td>Self-Hosted PostgreSQL on VM</td><td>Re-platform</td></tr>
                                     <tr><td>storage-prod-logs</td><td>NFS Share</td><td>Data Transfer</td></tr>
                                     <tr><td>VM-DEV-TEST-01</td><td>Small Instance (2vCPU, 4GB RAM)</td><td>Lift & Shift (V2V)</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                            <button id="validatePlanBtn" className="action-button" onClick={handleValidation} disabled={planValidated}>
                                {planValidated ? 'Validated' : 'Validate Plan & Proceed'}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Step 3 */}
                <div id="migration-step-3" className={`wizard-step ${activeStep === 3 ? 'active' : ''}`}>
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">3</div>
                        <h2 className="wizard-step-title">Execute & Monitor</h2>
                    </div>
                    <div className="wizard-step-content" style={{display: activeStep === 3 ? 'block' : 'none'}}>
                        <p style={{ marginBottom: '1rem' }}>Start the automated migration process. This is a simulation and will not affect live resources.</p>
                        <button id="startMigrationBtn" className="action-button" onClick={handleMigration} disabled={migrationStarted}>
                            {migrationStarted ? 'Simulation Finished' : 'Start Simulated Migration'}
                        </button>
                        {migrationStarted && (
                            <div id="migrationProgress" style={{ marginTop: '1.5rem' }}>
                                <h3 className="section-header">Overall Progress</h3>
                                <div className="progress-bar-container">
                                    <div id="overallProgressBar" className="progress-bar" style={{width: `${migrationProgress}%`}}></div>
                                </div>
                                <div className="table-container card" style={{ marginTop: '1rem' }}>
                                    <table className="styled-table" id="migrationStatusTable">
                                        <thead>
                                            <tr>
                                                <th>Resource</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {migrationStatus.map(s => (
                                                <tr key={s.name}>
                                                    <td>{s.name}</td>
                                                    <td><span className={`status-tag ${s.status.toLowerCase().replace(' ', '-')}`}>{s.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudMigration;
