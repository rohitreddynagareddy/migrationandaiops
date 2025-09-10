import React from 'react';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="status-banner">
        <div className="system-status">
          <span className="status-dot"></span>All Azure Systems are 100% Connected
        </div>
        <div className="alert-badge">28 New AI Alerts & Recommendations</div>
      </div>
      <div className="user-actions">
        <div className="user-info">User: Admin</div>
        <button className="action-button secondary">Invite</button>
        <button className="action-button">Publish</button>
      </div>
    </header>
  );
};

export default Topbar;
