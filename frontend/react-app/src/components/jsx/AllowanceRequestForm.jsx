import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import "../../components/css/AllowanceRequestForm.css";

const AllowanceRequestForm = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        employee_name: "",
        project_id: "",
        mobile_number: "",
        email: "",
        amount: "",
        currency: "",
        purpose: "",
        request_date: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/allowance_requests", formData);
            toast.success("Allowance request submitted successfully!", {
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
                amount: "",
                currency: "",
                purpose: "",
                request_date: "",
                remarks: "",
            });
        } catch (error) {
            console.error("Error submitting allowance request:", error);
            toast.error("Failed to submit allowance request", {
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
        <div className="allowance-request-form-container">
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

            <div className="allowance-request-form-header">
                <button
                    className="allowance-request-back-btn"
                    onClick={() => window.history.back()}
                    style={{ border: "none", background: "transparent", color: "white", fontSize: "20px" }}
                >
                    <FaArrowLeft />
                </button>
                <h2 className="allowance-request-form-title">Allowance Request Form</h2>
                <div style={{ width: "40px" }}></div>
            </div>

            <form onSubmit={handleSubmit} className="allowance-request-form">
                <div className="allowance-request-form-group">
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Employee Name:</label>
                    <input
                        type="text"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Currency:</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Currency</option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>

                <div className="allowance-request-form-group">
                    <label>Purpose:</label>
                    <input
                        type="text"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group">
                    <label>Request Date:</label>
                    <input
                        type="date"
                        name="request_date"
                        value={formData.request_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="allowance-request-form-group allowance-request-full-width">
                    <label>Remarks:</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="allowance-request-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AllowanceRequestForm;
