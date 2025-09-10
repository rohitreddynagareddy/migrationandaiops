import React from 'react';
import './AIAgent.css';

const AIAgent = () => {
    return (
        <main id="ai-agent" className="dashboard-content page-content">
            <div className="ai-agent-grid">
                <div className="ai-agent-column">
                    <div className="chat-container">
                        <div className="chat-header">AI Agent Chat</div>
                        <div className="chat-messages" id="chatMessages">
                            <div className="message agent">Hello! I'm the Reliability Twin AI Agent. I'm monitoring all systems. Ask me anything about the infrastructure health.</div>
                        </div>
                        <div className="chat-input">
                            <input type="text" id="chatInput" placeholder="e.g., 'What's the status of the SQL database?'" />
                            <button id="chatSendBtn">Send</button>
                        </div>
                    </div>
                </div>
                <div className="ai-agent-column">
                    <div className="ai-panel">
                        <h3 className="section-header">Proactive Insights</h3>
                        <div className="insights-list">
                            <div className="summary-item">
                                <div className="summary-label">Highest Risk Component</div>
                                <div className="summary-value danger">SQL-DB-PROD-01</div>
                            </div>
                            <div className="summary-item">
                                <div className="summary-label">Top Efficiency Opportunity</div>
                                <div className="summary-value positive">Scale down VM-cluster-dev</div>
                            </div>
                        </div>
                    </div>
                    <div className="ai-panel">
                        <h3 className="section-header">Recommended Actions</h3>
                        <div className="actions-list">
                            <div className="summary-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <p>Scale up AppSvc-Gateway to handle a predicted traffic spike.</p>
                                <div className="action-buttons" style={{display: 'flex', gap: '0.5rem'}}>
                                    <button className="accept-btn">Accept</button>
                                    <button className="dismiss-btn">Dismiss</button>
                                </div>
                            </div>
                            <div className="summary-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <p>Apply critical security patch to 12 virtual machines.</p>
                                <div className="action-buttons" style={{display: 'flex', gap: '0.5rem'}}>
                                    <button className="accept-btn">Accept</button>
                                    <button className="dismiss-btn">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AIAgent;
