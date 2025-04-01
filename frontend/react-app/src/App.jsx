import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeRequest from './components/jsx/ChangeRequest';
import HotelRequest from './components/jsx/HotelRequest';
import HotelRequestForm from './components/jsx/HotelRequestForm';
import UpdateHotelRequestForm from './components/jsx/UpdateData'; // Updated import
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-hotel-request" element={<HotelRequestForm />} />
        <Route path="/update-hotel/:id" element={<UpdateHotelRequestForm />} /> {/* Ensure consistency in param name */}
      </Routes>
    </Router>
  );
};

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();

  return (
    <div>
      <div className='scrollbar'></div>
      <div className='dashboard'>
        <div className='change-type'> <ChangeRequest /> </div>
        
        <div className='filters-container'>
          <div className='filter-group'>
            {["All", "Upcoming", "Completed", "Cancelled"].map((filter) => (
              <label key={filter}>
                <input
                  type="radio"
                  name="statusFilter"
                  value={filter}
                  checked={selectedFilter === filter}
                  onChange={() => setSelectedFilter(filter)}
                />
                {filter}
              </label>
            ))}
          </div>
          <button className="add-button" onClick={() => navigate('/add-hotel-request')}>
             Add
          </button>
        </div>

        <div className="hotel-request-section">
          <HotelRequest />
        </div>
      </div>
    </div>
  );
};

export default App;
