import React from 'react';
import './AlertsCenter.css';

const AlertsCenter = () => {
    return (
        <main id="alerts-center" className="dashboard-content page-content">
            <h1 className="hero-title" style={{color: 'var(--dark-blue)'}}>Alerts Center</h1>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)', marginBottom: '1.5rem'}}>Monitor, filter, and manage all system alerts from a centralized location.</p>
            <div className="alerts-summary-grid">
                <div className="summary-card">
                    <div className="summary-card-title">Total Alerts (24h)</div>
                    <div id="total-alerts-summary" className="summary-card-value">0</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">Unresolved</div>
                    <div id="unresolved-alerts-summary" className="summary-card-value" style={{color: 'var(--warning-yellow)'}}>0</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">High Priority</div>
                    <div id="high-priority-summary" className="summary-card-value" style={{color: 'var(--danger-red)'}}>0</div>
                </div>
            </div>
            <div className="alerts-toolbar">
                <div className="search-bar">
                    <input type="text" id="alertSearchInput" placeholder="Search by service or description..." />
                </div>
                <select id="severityFilter">
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <select id="statusFilter">
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            <div className="table-container card">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Timestamp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="alertsTableBody"></tbody>
                </table>
            </div>
        </main>
    );
};

export default AlertsCenter;
