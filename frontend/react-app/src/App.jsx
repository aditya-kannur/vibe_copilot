import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/jsx/Home';
import HotelRequestForm from './components/jsx/HotelRequestForm';
import FlightRequestForm from './components/jsx/FlightRequestForm';
import CabRequestForm from './components/jsx/CabRequestForm';
import TransportRequestForm from './components/jsx/TransportRequestForm';
import AllowanceRequestForm from './components/jsx/AllowanceRequestForm';
import UpdateHotelRequestForm from './components/jsx/UpdateData';
import HotelDetails from './components/jsx/HotelDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/add-hotel-request" element={<HotelRequestForm />} />
        <Route path="/admin/add-flight-request" element={<FlightRequestForm />} />
        <Route path="/admin/add-cab-request" element={<CabRequestForm />} />
        <Route path="/admin/add-transport-request" element={<TransportRequestForm />} />
        <Route path="/admin/add-allowance-request" element={<AllowanceRequestForm />} />
        <Route path="/admin/hotel-edit/:id" element={<UpdateHotelRequestForm />} />
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
};

export default App;