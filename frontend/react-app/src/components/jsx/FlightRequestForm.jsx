import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import "../../components/css/FlightRequestForm.css";

const FlightRequestForm = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        employee_name: "",
        project_id: "",
        mobile_number: "",
        email: "",
        from_city: "",
        to_city: "",
        departure_date: "",
        return_date: "",
        airline_preference: "",
        travel_class: "",
        meal_preference: "",
        special_requests: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/flight_requests", formData);
            toast.success("Flight request submitted successfully!", {
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
                from_city: "",
                to_city: "",
                departure_date: "",
                return_date: "",
                airline_preference: "",
                travel_class: "",
                meal_preference: "",
                special_requests: "",
            });
        } catch (error) {
            console.error("Error submitting flight request:", error);
            toast.error("Failed to submit flight request", {
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
        <div className="flight-request-form-container">
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

            <div className="flight-request-form-header">
                <button
                    className="flight-request-back-btn"
                    onClick={() => window.history.back()}
                    style={{ border: "none", background: "transparent", color: "white", fontSize: "20px" }}
                >
                    <FaArrowLeft />
                </button>
                <h2 className="flight-request-form-title">Flight Request Form</h2>
                <div style={{ width: "40px" }}></div>
            </div>

            <form onSubmit={handleSubmit} className="flight-request-form">
                <div className="flight-request-form-group">
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Employee Name:</label>
                    <input
                        type="text"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>From City:</label>
                    <input
                        type="text"
                        name="from_city"
                        value={formData.from_city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>To City:</label>
                    <input
                        type="text"
                        name="to_city"
                        value={formData.to_city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Departure Date:</label>
                    <input
                        type="date"
                        name="departure_date"
                        value={formData.departure_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Return Date:</label>
                    <input
                        type="date"
                        name="return_date"
                        value={formData.return_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Airline Preference:</label>
                    <input
                        type="text"
                        name="airline_preference"
                        value={formData.airline_preference}
                        onChange={handleChange}
                    />
                </div>

                <div className="flight-request-form-group">
                    <label>Travel Class:</label>
                    <select
                        name="travel_class"
                        value={formData.travel_class}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Class</option>
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                    </select>
                </div>

                <div className="flight-request-form-group">
                    <label>Meal Preference:</label>
                    <select
                        name="meal_preference"
                        value={formData.meal_preference}
                        onChange={handleChange}
                    >
                        <option value="">Select Meal</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>

                <div className="flight-request-form-group flight-request-full-width">
                    <label>Special Requests:</label>
                    <textarea
                        name="special_requests"
                        value={formData.special_requests}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="flight-request-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FlightRequestForm;
