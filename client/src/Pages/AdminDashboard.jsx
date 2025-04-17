import React, { useEffect, useState } from 'react';
import { getCrewList } from '../services/api';
import CrewTable from '../components/CrewTable';
import ShiftChangeModal from '../components/ShiftChangeModal';
import BusSwapModal from '../components/BusSwapModal';
import { useNavigate } from 'react-router-dom'; 


const AdminDashboard = () => {
  const [crews, setCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [isShiftModalVisible, setShiftModalVisible] = useState(false);
  const [isBusSwapModalVisible, setBusSwapModalVisible] = useState(false);
   
  const navigate = useNavigate();
  const fetchCrewList = async () => {
    const data = await getCrewList();
    setCrews(data);
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you're using localStorage
   navigate('/newUser/login') // Redirect to login page
  };

  useEffect(() => {
    fetchCrewList();
  }, []);

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
      <header style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#1890ff', color: '#fff' }}>
        <h1>Admin Dashboard</h1>
        <button 
          onClick={handleLogout} 
          style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>
      
      <div className="fullscreen-content">
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
      </div>
    </div>
  );
};

export default AdminDashboard;