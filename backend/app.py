from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

@app.route('/api/alerts')
def get_alerts():
    alerts_data = [
        { 'id': 1, 'severity': 'high', 'status': 'new', 'service': 'SQL-DB-PROD-01', 'description': 'CPU utilization has exceeded 95% for 15 minutes.', 'timestamp': '2023-10-27T10:00:00Z' },
        { 'id': 2, 'severity': 'medium', 'status': 'new', 'service': 'AppSvc-Gateway', 'description': 'Response latency is above 2000ms.', 'timestamp': '2023-10-27T09:40:00Z' },
        { 'id': 3, 'severity': 'low', 'status': 'acknowledged', 'service': 'Storage-Prod', 'description': 'Storage account capacity is at 85%.', 'timestamp': '2023-10-27T09:00:00Z' },
        { 'id': 4, 'severity': 'medium', 'status': 'new', 'service': 'AKS-Cluster-Prod', 'description': 'Node is unresponsive and needs reboot.', 'timestamp': '2023-10-27T08:00:00Z' },
        { 'id': 5, 'severity': 'high', 'status': 'resolved', 'service': 'VM-Auth-Service', 'description': 'Critical security vulnerability CVE-2024-12345 detected.', 'timestamp': '2023-10-27T06:00:00Z' },
        { 'id': 6, 'severity': 'low', 'status': 'resolved', 'service': 'CosmosDB-WestUS', 'description': 'Request units are nearing provisioned limit.', 'timestamp': '2023-10-27T02:00:00Z' }
    ]
    return jsonify(alerts_data)

@app.route('/api/recommendations')
def get_recommendations():
    recommendations_data = [
        { 'id': 1, 'category': 'cost', 'priority': 'high', 'status': 'new', 'title': 'Right-size Underutilized VMs', 'description': 'Our analysis shows 5 VMs in the "Production" subscription are consistently operating at less than 15% CPU. Downsizing them from D4s_v3 to D2s_v3 could significantly reduce costs without impacting performance.', 'impact': { 'value': 450, 'unit': '$/mo savings' } },
        { 'id': 2, 'category': 'security', 'priority': 'high', 'status': 'new', 'title': 'Enable MFA for Admin Accounts', 'description': 'Multi-Factor Authentication is not enabled for 3 administrator accounts, posing a significant security risk. Enforce MFA to protect against unauthorized access.', 'impact': { 'value': 'Critical', 'unit': 'Risk Reduction' } },
        { 'id': 3, 'category': 'performance', 'priority': 'medium', 'status': 'new', 'title': 'Upgrade SQL-DB to a Higher Tier', 'description': 'The primary SQL database is experiencing high DTU saturation during peak hours, leading to query throttling. Upgrading from S2 to S3 tier will improve response times.', 'impact': { 'value': '+35%', 'unit': 'Performance' } },
        { 'id': 4, 'category': 'cost', 'priority': 'low', 'status': 'applied', 'title': 'Delete Unassociated Public IPs', 'description': 'Found 12 public IP addresses that are no longer associated with any running service. Deleting them will remove unnecessary costs.', 'impact': { 'value': 85, 'unit': '$/mo savings' } },
        { 'id': 5, 'category': 'security', 'priority': 'medium', 'status': 'dismissed', 'title': 'Restrict Network Access to Storage', 'description': 'The "Storage-Prod" account allows public access. Restrict access to specific virtual networks to enhance data security.', 'impact': { 'value': 'High', 'unit': 'Risk Reduction' } }
    ]
    return jsonify(recommendations_data)

@app.route('/api/simulation/services')
def get_simulation_services():
    services = [
        { 'id': 'AppSvc-Gateway', 'dependencies': ['SQL-DB-PROD-01', 'VM-Auth-Service'], 'status': 'healthy', 'pos': { 'x': '50%', 'y': '10%' } },
        { 'id': 'SQL-DB-PROD-01', 'dependencies': ['Storage-Prod'], 'status': 'healthy', 'pos': { 'x': '30%', 'y': '40%' } },
        { 'id': 'VM-Auth-Service', 'dependencies': [], 'status': 'healthy', 'pos': { 'x': '70%', 'y': '40%' } },
        { 'id': 'AKS-Cluster-Prod', 'dependencies': ['SQL-DB-PROD-01', 'Storage-Prod'], 'status': 'healthy', 'pos': { 'x': '50%', 'y': '70%' } },
        { 'id': 'Storage-Prod', 'dependencies': [], 'status': 'healthy', 'pos': { 'x': '30%', 'y': '90%' } }
    ]
    return jsonify(services)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
