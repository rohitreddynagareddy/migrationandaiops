import React, { useState, useEffect } from 'react';

const AlertsCenter = () => {
    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [filters, setFilters] = useState({ search: '', severity: 'all', status: 'all' });

    useEffect(() => {
        fetch('/api/alerts')
            .then(res => res.json())
            .then(data => {
                setAlerts(data.map(a => ({ ...a, timestamp: new Date(a.timestamp) })));
                setFilteredAlerts(data.map(a => ({ ...a, timestamp: new Date(a.timestamp) })));
            })
            .catch(err => console.error("Failed to fetch alerts:", err));
    }, []);

    useEffect(() => {
        let data = [...alerts];
        if (filters.search) {
            data = data.filter(a => a.service.toLowerCase().includes(filters.search) || a.description.toLowerCase().includes(filters.search));
        }
        if (filters.severity !== 'all') {
            data = data.filter(a => a.severity === filters.severity);
        }
        if (filters.status !== 'all') {
            data = data.filter(a => a.status === filters.status);
        }
        setFilteredAlerts(data);
    }, [filters, alerts]);

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const totalAlerts = alerts.length;
    const unresolvedAlerts = alerts.filter(a => a.status !== 'resolved').length;
    const highPriorityAlerts = alerts.filter(a => a.severity === 'high' && a.status !== 'resolved').length;

    return (
        <div id="alerts-center" className="dashboard-content page-content active">
            <h1 className="hero-title" style={{ color: 'var(--dark-blue)' }}>Alerts Center</h1>
            <p className="hero-subtitle" style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Monitor, filter, and manage all system alerts from a centralized location.</p>
            <div className="alerts-summary-grid">
                <div className="summary-card">
                    <div className="summary-card-title">Total Alerts (24h)</div>
                    <div id="total-alerts-summary" className="summary-card-value">{totalAlerts}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">Unresolved</div>
                    <div id="unresolved-alerts-summary" className="summary-card-value" style={{ color: 'var(--warning-yellow)' }}>{unresolvedAlerts}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">High Priority</div>
                    <div id="high-priority-summary" className="summary-card-value" style={{ color: 'var(--danger-red)' }}>{highPriorityAlerts}</div>
                </div>
            </div>
            <div className="alerts-toolbar">
                <div className="search-bar">
                    <input type="text" name="search" id="alertSearchInput" placeholder="Search by service or description..." onChange={handleFilterChange} />
                </div>
                <select name="severity" id="severityFilter" onChange={handleFilterChange}>
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <select name="status" id="statusFilter" onChange={handleFilterChange}>
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
                    <tbody id="alertsTableBody">
                        {filteredAlerts.map(alert => (
                            <tr key={alert.id}>
                                <td><span className={`severity-indicator`} style={{color: `var(--${alert.severity === 'high' ? 'danger-red' : alert.severity === 'medium' ? 'warning-yellow' : 'success-green'}`}}>{alert.severity}</span></td>
                                <td><span className={`status-tag ${alert.status}`}>{alert.status}</span></td>
                                <td>{alert.service}</td>
                                <td style={{ whiteSpace: 'normal' }}>{alert.description}</td>
                                <td>{timeSince(alert.timestamp)}</td>
                                <td className="table-actions">
                                    {alert.status === 'new' && <button className="acknowledge">Acknowledge</button>}
                                    {alert.status !== 'resolved' && <button className="resolve">Resolve</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlertsCenter;
