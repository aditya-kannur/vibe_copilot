import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/jsx/Home';
import HotelRequestForm from './components/jsx/HotelRequestForm';
import UpdateHotelRequestForm from './components/jsx/UpdateData';
import HotelDetails from './components/jsx/HotelDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/add-hotel-request" element={<HotelRequestForm />} />
        <Route path="/admin/hotel-edit/:id" element={<UpdateHotelRequestForm />} />
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
};

export default App;