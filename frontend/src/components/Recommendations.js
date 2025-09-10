import React, { useState, useEffect } from 'react';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [filteredRecs, setFilteredRecs] = useState([]);
    const [filters, setFilters] = useState({ category: 'all', status: 'new' });

    useEffect(() => {
        fetch('/api/recommendations')
            .then(res => res.json())
            .then(data => {
                setRecommendations(data);
            })
            .catch(err => console.error("Failed to fetch recommendations:", err));
    }, []);

    useEffect(() => {
        let data = [...recommendations];
        if (filters.category !== 'all') {
            data = data.filter(r => r.category === filters.category);
        }
        if (filters.status !== 'all') {
            data = data.filter(r => r.status === filters.status);
        }
        setFilteredRecs(data);
    }, [filters, recommendations]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const activeRecs = recommendations.filter(r => r.status === 'new').length;
    const highPriorityRecs = recommendations.filter(r => r.priority === 'high' && r.status === 'new').length;
    const savings = recommendations.filter(r => r.category === 'cost' && r.status !== 'dismissed').reduce((acc, r) => acc + r.impact.value, 0);


    return (
        <div id="recommendations" className="dashboard-content page-content active">
            <h1 className="hero-title" style={{ color: 'var(--dark-blue)' }}>AI-Powered Recommendations</h1>
            <p className="hero-subtitle" style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Proactive insights to optimize cost, enhance performance, and strengthen security.</p>
            <div className="alerts-summary-grid">
                <div className="summary-card">
                    <div className="summary-card-title">Active Recommendations</div>
                    <div id="rec-active-summary" className="summary-card-value">{activeRecs}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">Potential Monthly Savings</div>
                    <div id="rec-savings-summary" className="summary-card-value" style={{ color: 'var(--success-green)' }}>${savings}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">High Priority</div>
                    <div id="rec-high-priority-summary" className="summary-card-value" style={{ color: 'var(--danger-red)' }}>{highPriorityRecs}</div>
                </div>
            </div>
            <div className="alerts-toolbar">
                <select name="category" id="recCategoryFilter" onChange={handleFilterChange}>
                    <option value="all">All Categories</option>
                    <option value="cost">Cost</option>
                    <option value="performance">Performance</option>
                    <option value="security">Security</option>
                </select>
                <select name="status" id="recStatusFilter" onChange={handleFilterChange}>
                    <option value="new">New</option>
                    <option value="all">All Statuses</option>
                    <option value="applied">Applied</option>
                    <option value="dismissed">Dismissed</option>
                </select>
            </div>
            <div id="recommendationsGrid" className="recommendations-grid">
                {filteredRecs.map(rec => (
                    <div key={rec.id} className="recommendation-card">
                        <div className="rec-header">
                            <span className={`rec-category ${rec.category}`}>{rec.category}</span>
                            <span className={`severity-badge ${rec.priority}`}>{rec.priority}</span>
                        </div>
                        <div className="rec-content">
                            <h3 className="rec-title">{rec.title}</h3>
                            <p className="rec-description">{rec.description}</p>
                            <div className="rec-impact">
                                <span className="rec-impact-label">Potential Impact:</span>
                                <span className="rec-impact-value" style={{ color: rec.category === 'cost' ? 'var(--success-green)' : 'var(--dark-blue)' }}>
                                    {rec.impact.value} {rec.impact.unit}
                                </span>
                            </div>
                        </div>
                        <div className="rec-footer">
                            <span className={`rec-status-tag ${rec.status}`}>Status: {rec.status}</span>
                            <div className="action-buttons">
                                {rec.status === 'new' && (
                                    <>
                                        <button className="accept-btn">Apply</button>
                                        <button className="dismiss-btn">Dismiss</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
