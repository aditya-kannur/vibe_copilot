import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import "../../components/css/HotelRequestForm.css";

const HotelRequestForm = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    mobile_number: "",
    email: "",
    destination: "",
    check_in: "",
    check_out: "",
    number_of_rooms: "",
    room_type: "",
    special_requests: "",
    hotel_preferences: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/hotel_requests", formData);
      toast.success("Hotel request submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        employee_id: "",
        employee_name: "",
        mobile_number: "",
        email: "",
        destination: "",
        check_in: "",
        check_out: "",
        number_of_rooms: "",
        room_type: "",
        special_requests: "",
        hotel_preferences: "",
      });
    } catch (error) {
      console.error("Error submitting hotel request:", error);
      toast.error("Failed to submit hotel request", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="hotel-request-form-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="hotel-request-form-header">
        <button
          className="hotel-request-back-arrow"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft />
        </button>
        <h2 className="hotel-request-form-title">Hotel Request Form</h2>
        <div style={{ width: "40px" }}></div> 
      </div>
      
      <form onSubmit={handleSubmit} className="hotel-request-form">
        <div className="hotel-request-form-group">
          <label>Employee ID:</label>
          <input 
            type="text" 
            name="employee_id" 
            value={formData.employee_id} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Employee Name:</label>
          <input 
            type="text" 
            name="employee_name" 
            value={formData.employee_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Mobile Number:</label>
          <input 
            type="text" 
            name="mobile_number" 
            value={formData.mobile_number} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Destination:</label>
          <input 
            type="text" 
            name="destination" 
            value={formData.destination} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Check-in Date:</label>
          <input 
            type="date" 
            name="check_in" 
            value={formData.check_in} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Check-out Date:</label>
          <input 
            type="date" 
            name="check_out" 
            value={formData.check_out} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="hotel-request-form-group">
          <label>Number of Rooms:</label>
          <select 
            name="number_of_rooms" 
            value={formData.number_of_rooms} 
            onChange={handleChange} 
            required
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        
        <div className="hotel-request-form-group">
          <label>Room Type:</label>
          <select 
            name="room_type" 
            value={formData.room_type} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        
        <div className="hotel-request-form-group hotel-request-full-width">
          <label>Special Requests:</label>
          <textarea 
            name="special_requests" 
            value={formData.special_requests} 
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="hotel-request-form-group hotel-request-full-width">
          <label>Hotel Preferences:</label>
          <textarea 
            name="hotel_preferences" 
            value={formData.hotel_preferences} 
            onChange={handleChange}
          ></textarea>
        </div>
        
        <button type="submit" className="hotel-request-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HotelRequestForm;