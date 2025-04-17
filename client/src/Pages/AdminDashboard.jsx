import React, { useEffect, useState } from 'react';
import { getCrewList } from '../services/api';
import CrewTable from '../components/CrewTable';
import ShiftChangeModal from '../components/ShiftChangeModal';
import BusSwapModal from '../components/BusSwapModal';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [crews, setCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [isShiftModalVisible, setShiftModalVisible] = useState(false);
  const [isBusSwapModalVisible, setBusSwapModalVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchCrewList = async () => {
    const data = await getCrewList();
    setCrews(data);
  };

  useEffect(() => {
    if (location.pathname === '/admin') {
      fetchCrewList();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/newUser/login');
  };

  const handleChangeShiftClick = (crew) => {
    setSelectedCrew(crew);
    setShiftModalVisible(true);
  };

  const handleSwapBusClick = (crew) => {
    setSelectedCrew(crew);
    setBusSwapModalVisible(true);
  };

  return (
    <div className="fullscreen-container">
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#1890ff',
          color: '#fff',
        }}
      >
        <h1>Admin Dashboard</h1>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{ padding: '10px', backgroundColor: '#243b55', border: 'none', cursor: 'pointer' }}
          >
            Crew Details
          </button>
          <button
            onClick={() => navigate('/admin/bus-details')}
            style={{ padding: '10px', backgroundColor: '#243b55', border: 'none', cursor: 'pointer' }}
          >
            Bus Details
          </button>
          <button
            onClick={() => navigate('/admin/bus-routes')}
            style={{ padding: '10px', backgroundColor: '#243b55', border: 'none', cursor: 'pointer' }}
          >
            Bus Routes
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="fullscreen-content">
        {location.pathname === '/admin' && (
          <>
            <CrewTable
              crews={crews}
              onChangeShiftClick={handleChangeShiftClick}
              onSwapBusClick={handleSwapBusClick}
            />

            <ShiftChangeModal
              visible={isShiftModalVisible}
              crew={selectedCrew}
              onClose={() => setShiftModalVisible(false)}
              refreshList={fetchCrewList}
            />

            <BusSwapModal
              visible={isBusSwapModalVisible}
              crew={selectedCrew}
              onClose={() => setBusSwapModalVisible(false)}
              refreshList={fetchCrewList}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;