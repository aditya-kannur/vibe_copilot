import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/css/HotelRequestForm.css";

const UpdateHotelRequestForm = () => {
  const { id } = useParams();  // Get the employee_id from the URL
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
    confirmation_number: "",  // New field
    confirmation_email: "",   // New field
    approval: "Pending",      // New field (default to Pending)
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/hotel_requests/${id}`)
      .then((response) => {
        if (response.data) {
          setFormData(response.data);
        }
      })
      .catch((error) => console.error("Error fetching hotel request:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the hotel request on the server
      await axios.put(`http://127.0.0.1:8000/hotel_requests/${id}`, formData);
      alert("Hotel request updated successfully!");
      navigate("/");  // Redirect to home page
    } catch (error) {
      console.error("Error updating hotel request:", error);
      alert("Failed to update hotel request.");
    }
  };

  return (
    <div className="hotel-request-form-container">
      <div className="hotel-request-form-header">
        <h2 className="hotel-request-form-title">Update Hotel Request</h2>
        <button className="hotel-request-back-btn" onClick={() => navigate("/")}>Back</button>
      </div>
      <form onSubmit={handleSubmit} className="hotel-request-form">
        <div className="hotel-request-form-group">
          <label>Employee ID:</label>
          <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} disabled />
        </div>
        <div className="hotel-request-form-group">
          <label>Employee Name:</label>
          <input type="text" name="employee_name" value={formData.employee_name} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Mobile Number:</label>
          <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Destination:</label>
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Check-in Date:</label>
          <input type="date" name="check_in" value={formData.check_in} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Check-out Date:</label>
          <input type="date" name="check_out" value={formData.check_out} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Number of Rooms:</label>
          <select name="number_of_rooms" value={formData.number_of_rooms} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="hotel-request-form-group">
          <label>Room Type:</label>
          <select name="room_type" value={formData.room_type} onChange={handleChange} required>
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div className="hotel-request-form-group hotel-request-full-width">
          <label>Special Requests:</label>
          <textarea name="special_requests" value={formData.special_requests} onChange={handleChange}></textarea>
        </div>
        <div className="hotel-request-form-group hotel-request-full-width">
          <label>Hotel Preferences:</label>
          <textarea name="hotel_preferences" value={formData.hotel_preferences} onChange={handleChange}></textarea>
        </div>
        <div className="hotel-request-form-group">
          <label>Confirmation Number:</label>
          <input type="text" name="confirmation_number" value={formData.confirmation_number} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Confirmation Email:</label>
          <input type="email" name="confirmation_email" value={formData.confirmation_email} onChange={handleChange} required />
        </div>
        <div className="hotel-request-form-group">
          <label>Approval Status:</label>
          <select name="approval" value={formData.approval} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="hotel-request-submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateHotelRequestForm;
