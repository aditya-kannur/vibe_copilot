import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import "../../components/css/CabRequestForm.css";

const CabRequestForm = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        employee_name: "",
        project_id: "",
        mobile_number: "",
        email: "",
        pickup_location: "",
        drop_location: "",
        pickup_date: "",
        pickup_time: "",
        number_of_passengers: "",
        cab_type: "",
        special_requests: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/cab_requests", formData);
            toast.success("Cab request submitted successfully!", {
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
                pickup_location: "",
                drop_location: "",
                pickup_date: "",
                pickup_time: "",
                number_of_passengers: "",
                cab_type: "",
                special_requests: "",
            });
        } catch (error) {
            console.error("Error submitting cab request:", error);
            toast.error("Failed to submit cab request", {
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
        <div className="cab-request-form-container">
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

            <div className="cab-request-form-header">
                <button
                    className="cab-request-back-btn"
                    onClick={() => window.history.back()}
                    style={{ border: "none", background: "transparent", color: "white", fontSize: "20px" }}
                >
                    <FaArrowLeft />
                </button>
                <h2 className="cab-request-form-title">Cab/Bus Request Form</h2>
                <div style={{ width: "40px" }}></div>
            </div>

            <form onSubmit={handleSubmit} className="cab-request-form">
                <div className="cab-request-form-group">
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Employee Name:</label>
                    <input
                        type="text"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Pickup Location:</label>
                    <input
                        type="text"
                        name="pickup_location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Drop Location:</label>
                    <input
                        type="text"
                        name="drop_location"
                        value={formData.drop_location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Pickup Date:</label>
                    <input
                        type="date"
                        name="pickup_date"
                        value={formData.pickup_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Pickup Time:</label>
                    <input
                        type="time"
                        name="pickup_time"
                        value={formData.pickup_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Number of Passengers:</label>
                    <input
                        type="number"
                        name="number_of_passengers"
                        value={formData.number_of_passengers}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>

                <div className="cab-request-form-group">
                    <label>Cab/Bus Type:</label>
                    <select
                        name="cab_type"
                        value={formData.cab_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>

                <div className="cab-request-form-group cab-request-full-width">
                    <label>Special Requests:</label>
                    <textarea
                        name="special_requests"
                        value={formData.special_requests}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="cab-request-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CabRequestForm;
