import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    dogCount: 0,
    litterCount: 0,
    reservationCount: 0,
    contactCount: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch actual data from your API
    // For now, we'll use mock data
    const fetchDashboardData = async () => {
      try {
        // Simulating API call with timeout
        setTimeout(() => {
          setStats({
            dogCount: 12,
            litterCount: 3,
            reservationCount: 8,
            contactCount: 25
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Breeder Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Dogs</h3>
          <p className="stat-value">{stats.dogCount}</p>
          <p className="stat-label">Total dogs in your kennel</p>
        </div>
        
        <div className="stat-card">
          <h3>Litters</h3>
          <p className="stat-value">{stats.litterCount}</p>
          <p className="stat-label">Active litters</p>
        </div>
        
        <div className="stat-card">
          <h3>Reservations</h3>
          <p className="stat-value">{stats.reservationCount}</p>
          <p className="stat-label">Pending reservations</p>
        </div>
        
        <div className="stat-card">
          <h3>Contacts</h3>
          <p className="stat-value">{stats.contactCount}</p>
          <p className="stat-label">Total contacts</p>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Upcoming Tasks</h2>
          <ul className="task-list">
            <li className="task-item">
              <span className="task-date">Today</span>
              <span className="task-title">Vaccinate Luna's puppies</span>
            </li>
            <li className="task-item">
              <span className="task-date">Tomorrow</span>
              <span className="task-title">Vet appointment for Max</span>
            </li>
            <li className="task-item">
              <span className="task-date">Mar 8</span>
              <span className="task-title">Update website with new litter photos</span>
            </li>
          </ul>
        </div>
        
        <div className="dashboard-section">
          <h2>Recent Inquiries</h2>
          <ul className="inquiry-list">
            <li className="inquiry-item">
              <div className="inquiry-header">
                <span className="inquiry-name">John Smith</span>
                <span className="inquiry-date">5 hours ago</span>
              </div>
              <p className="inquiry-message">Interested in puppies from upcoming litter...</p>
            </li>
            <li className="inquiry-item">
              <div className="inquiry-header">
                <span className="inquiry-name">Sarah Johnson</span>
                <span className="inquiry-date">Yesterday</span>
              </div>
              <p className="inquiry-message">Questions about health testing for parents...</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
