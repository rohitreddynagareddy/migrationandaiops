import React, { useState, useEffect } from 'react';

const AIAgent = () => {
    const [messages, setMessages] = useState([{ text: "Hello! I'm the Reliability Twin AI Agent. I'm monitoring all systems. Ask me anything about the infrastructure health.", sender: 'agent' }]);
    const [inputValue, setInputValue] = useState('');
    const [agentResponses, setAgentResponses] = useState(null);

    useEffect(() => {
        fetch('/api/agent/responses')
            .then(res => res.json())
            .then(data => setAgentResponses(data))
            .catch(err => console.error("Failed to fetch agent responses:", err));
    }, []);

    const addMessage = (text, sender) => {
        setMessages(prevMessages => [...prevMessages, { text, sender }]);
    };

    const handleChatSubmit = () => {
        if (inputValue.trim()) {
            addMessage(inputValue, 'user');
            setInputValue('');
            setTimeout(() => {
                let response = agentResponses?.default || "Sorry, I'm having trouble connecting. Please try again later.";
                if (agentResponses) {
                    if (inputValue.toLowerCase().includes('status')) response = agentResponses.status;
                    else if (inputValue.toLowerCase().includes('sql')) response = agentResponses.sql;
                    else if (inputValue.toLowerCase().includes('risk')) response = agentResponses.risk;
                }
                addMessage(response, 'agent');
            }, 1000 + Math.random() * 500);
        }
    };

    return (
        <div id="ai-agent" className="dashboard-content page-content active">
            <div className="ai-agent-grid">
                <div className="ai-agent-column">
                    <div className="chat-container">
                        <div className="chat-header">AI Agent Chat</div>
                        <div className="chat-messages" id="chatMessages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                id="chatInput"
                                placeholder="e.g., 'What's the status of the SQL database?'"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                            />
                            <button id="chatSendBtn" onClick={handleChatSubmit}>Send</button>
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
                            <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>Scale up AppSvc-Gateway to handle a predicted traffic spike.</p>
                                <div className="action-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="accept-btn">Accept</button>
                                    <button className="dismiss-btn">Dismiss</button>
                                </div>
                            </div>
                            <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>Apply critical security patch to 12 virtual machines.</p>
                                <div className="action-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="accept-btn">Accept</button>
                                    <button className="dismiss-btn">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAgent;
