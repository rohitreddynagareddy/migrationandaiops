import React, { useEffect, useState } from 'react';

const HomeDashboard = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const generatedData = Array.from({ length: 24 }, () => Math.random() * (98 - 70) + 70);
        setChartData(generatedData);
    }, []);

    return (
        <div id="home-dashboard" className="dashboard-content page-content active">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Azure Infrastructure Health Monitor</h1>
                    <p className="hero-subtitle">AI-Powered Digital Twin predicting failures 48 hours in advance</p>
                </div>
            </div>
            <div className="alerts-section">
                <h2 className="section-header">Live Predictions</h2>
                <div className="alerts-grid">
                    <div className="alert-card high">
                        <div className="alert-header">
                            <div className="alert-title">Critical Failure Risk: SQL-DB-PROD-01</div>
                            <span className="severity-badge high">High</span>
                        </div>
                        <p className="alert-description">AI model predicts a 92% probability of cascading failure within the next 12 hours due to sustained high CPU utilization and memory pressure.</p>
                        <div className="alert-meta">
                            <span>Source: Prometheus</span>
                            <span>Time: 2 min ago</span>
                        </div>
                    </div>
                    <div className="alert-card medium">
                        <div className="alert-header">
                            <div className="alert-title">Performance Degradation: AppSvc-Gateway</div>
                            <span className="severity-badge medium">Medium</span>
                        </div>
                        <p className="alert-description">Response latency has increased by 75% over the last hour. Potential scaling issue detected.</p>
                        <div className="alert-meta">
                            <span>Source: Azure Monitor</span>
                            <span>Time: 15 min ago</span>
                        </div>
                    </div>
                    <div className="alert-card low">
                        <div className="alert-header">
                            <div className="alert-title">Storage Capacity Warning</div>
                            <span className="severity-badge low">Low</span>
                        </div>
                        <p className="alert-description">Storage account 'datalakegen2prod' is projected to reach 85% capacity in the next 72 hours.</p>
                        <div className="alert-meta">
                            <span>Source: Capacity Planner</span>
                            <span>Time: 1 hour ago</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-grid">
                <div className="chart-container">
                    <div className="chart-header">
                        <div className="chart-title">System Reliability Score (24h)</div>
                    </div>
                    <div className="chart-area" id="chartArea">
                        {chartData.map((height, i) => (
                            <div key={i} className="chart-bar" style={{ height: `${height}%` }}></div>
                        ))}
                    </div>
                </div>
                <div className="summary-panel">
                    <h3 className="summary-title">Today's Twin Summary</h3>
                    <div className="summary-item">
                        <span className="summary-label">Reliability Score</span>
                        <span className="summary-value positive">98.7%</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Predicted Outages</span>
                        <span className="summary-value danger">1</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Anomalies Detected</span>
                        <span className="summary-value warning">14</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Automated Actions</span>
                        <span className="summary-value">3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;
