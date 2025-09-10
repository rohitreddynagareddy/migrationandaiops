import React from 'react';
import './CloudMigration.css';

const CloudMigration = () => {
    return (
        <main id="cloud-migration" className="dashboard-content page-content">
            <h1 className="hero-title" style={{color: 'var(--dark-blue)'}}>Azure to Apache CloudStack Migration</h1>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)', marginBottom: '1.5rem'}}>Utilize this tool to analyze your Azure environment and simulate a migration to the open-source Apache CloudStack platform to forecast significant cost savings.</p>
            <div className="migration-wizard">
                <div id="migration-step-1" className="wizard-step active">
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">1</div>
                        <h2 className="wizard-step-title">Discovery & Analysis</h2>
                    </div>
                    <div className="wizard-step-content">
                        <p style={{marginBottom: '1rem'}}>Begin by scanning your connected Azure subscriptions to discover resources eligible for migration.</p>
                        <button id="scanAzureBtn" className="action-button">Scan Azure Resources</button>
                        <div id="scanResults" style={{display: 'none', marginTop: '1.5rem'}}>
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
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div id="analysisSection" style={{marginTop: '1rem', textAlign: 'right'}}>
                                <button id="analyzeCostBtn" className="action-button secondary">Analyze Compatibility & Cost</button>
                            </div>
                            <div id="analysisResult" className="summary-card" style={{display:'none', marginTop:'1rem', textAlign:'center'}}>
                                <div className="summary-card-title">Analysis Complete</div>
                                <div className="summary-card-value" style={{color: 'var(--success-green)'}}>Potential Savings: ~$3,200/mo</div>
                                <p>Proceed to generate the migration plan.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="migration-step-2" className="wizard-step">
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">2</div>
                        <h2 className="wizard-step-title">Migration Plan</h2>
                    </div>
                    <div className="wizard-step-content">
                        <p style={{marginBottom: '1rem'}}>The AI has generated a recommended migration plan. Review and validate before execution.</p>
                        <div className="table-container card">
                            <table className="styled-table" id="migrationPlanTable">
                                <thead>
                                    <tr>
                                        <th>Azure Resource</th>
                                        <th>CloudStack Equivalent</th>
                                        <th>Migration Strategy</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div style={{marginTop: '1rem', textAlign: 'right'}}>
                            <button id="validatePlanBtn" className="action-button">Validate Plan & Proceed</button>
                        </div>
                    </div>
                </div>
                <div id="migration-step-3" className="wizard-step">
                    <div className="wizard-step-header">
                        <div className="wizard-step-number">3</div>
                        <h2 className="wizard-step-title">Execute & Monitor</h2>
                    </div>
                    <div className="wizard-step-content">
                        <p style={{marginBottom: '1rem'}}>Start the automated migration process. This is a simulation and will not affect live resources.</p>
                        <button id="startMigrationBtn" className="action-button">Start Simulated Migration</button>
                        <div id="migrationProgress" style={{display: 'none', marginTop: '1.5rem'}}>
                            <h3 className="section-header">Overall Progress</h3>
                            <div className="progress-bar-container">
                                <div id="overallProgressBar" className="progress-bar"></div>
                            </div>
                            <div className="table-container card" style={{marginTop: '1rem'}}>
                                <table className="styled-table" id="migrationStatusTable">
                                    <thead>
                                        <tr>
                                            <th>Resource</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CloudMigration;
