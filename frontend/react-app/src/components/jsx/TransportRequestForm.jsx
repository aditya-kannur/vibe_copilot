import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import "../../components/css/TransportRequestForm.css";

const TransportRequestForm = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        employee_name: "",
        project_id: "",
        mobile_number: "",
        email: "",
        transport_type: "",
        from_location: "",
        to_location: "",
        travel_date: "",
        return_date: "",
        preferred_time: "",
        special_requests: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://vibe-copilot-77jk.onrender.com/transport_requests", formData);
            toast.success("Transport request submitted successfully!", {
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
                project_id: "",
                mobile_number: "",
                email: "",
                transport_type: "",
                from_location: "",
                to_location: "",
                travel_date: "",
                return_date: "",
                preferred_time: "",
                special_requests: "",
            });
        } catch (error) {
            console.error("Error submitting transport request:", error);
            toast.error("Failed to submit transport request", {
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
        <div className="transport-request-form-container">
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

            <div className="transport-request-form-header">
                <button
                    className="transport-request-back-btn"
                    onClick={() => window.history.back()}
                    style={{ border: "none", background: "transparent", color: "white", fontSize: "20px" }}
                >
                    <FaArrowLeft />
                </button>
                <h2 className="transport-request-form-title">Transportation Request Form</h2>
                <div style={{ width: "40px" }}></div>
            </div>

            <form onSubmit={handleSubmit} className="transport-request-form">
                <div className="transport-request-form-group">
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Employee Name:</label>
                    <input
                        type="text"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Transport Type:</label>
                    <select
                        name="transport_type"
                        value={formData.transport_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="transport-request-form-group">
                    <label>From Location:</label>
                    <input
                        type="text"
                        name="from_location"
                        value={formData.from_location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>To Location:</label>
                    <input
                        type="text"
                        name="to_location"
                        value={formData.to_location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Travel Date:</label>
                    <input
                        type="date"
                        name="travel_date"
                        value={formData.travel_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Return Date:</label>
                    <input
                        type="date"
                        name="return_date"
                        value={formData.return_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="transport-request-form-group">
                    <label>Preferred Time:</label>
                    <input
                        type="time"
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleChange}
                    />
                </div>

                <div className="transport-request-form-group transport-request-full-width">
                    <label>Special Requests:</label>
                    <textarea
                        name="special_requests"
                        value={formData.special_requests}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="transport-request-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TransportRequestForm;
