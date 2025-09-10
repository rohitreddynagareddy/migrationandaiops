import React from 'react';
import './Recommendations.css';

const Recommendations = () => {
    return (
        <main id="recommendations" className="dashboard-content page-content">
            <h1 className="hero-title" style={{color: 'var(--dark-blue)'}}>AI-Powered Recommendations</h1>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)', marginBottom: '1.5rem'}}>Proactive insights to optimize cost, enhance performance, and strengthen security.</p>
            <div className="alerts-summary-grid">
                <div className="summary-card">
                    <div className="summary-card-title">Active Recommendations</div>
                    <div id="rec-active-summary" className="summary-card-value">0</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">Potential Monthly Savings</div>
                    <div id="rec-savings-summary" className="summary-card-value" style={{color: 'var(--success-green)'}}>$0</div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-title">High Priority</div>
                    <div id="rec-high-priority-summary" className="summary-card-value" style={{color: 'var(--danger-red)'}}>0</div>
                </div>
            </div>
            <div className="alerts-toolbar">
                <select id="recCategoryFilter">
                    <option value="all">All Categories</option>
                    <option value="cost">Cost</option>
                    <option value="performance">Performance</option>
                    <option value="security">Security</option>
                </select>
                <select id="recStatusFilter">
                    <option value="new">New</option>
                    <option value="all">All Statuses</option>
                    <option value="applied">Applied</option>
                    <option value="dismissed">Dismissed</option>
                </select>
            </div>
            <div id="recommendationsGrid" className="recommendations-grid"></div>
        </main>
    );
};

export default Recommendations;
