import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/css/HotelDetails.css";

const HotelDetails = () => {
    const { id } = useParams();
    const [hotelRequest, setHotelRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://vibe-copilot-77jk.onrender.com/hotel_requests/${id}`)
            .then((response) => response.json())
            .then((data) => setHotelRequest(data))
            .catch((error) => console.error("Error fetching hotel request:", error));
    }, [id]);

    if (!hotelRequest) return <div>Loading...</div>;

    return (
        <div className="hotel-details-container">
            <div className="display-header">
        <h2>Hotel Request Details</h2>
            </div>
        <div className="details-grid">
            <div className="detail-item">
                <span className="detail-label">Employee ID :</span>
                <span className="detail-value">{hotelRequest.employee_id}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Employee Name:</span>
                <span className="detail-value">{hotelRequest.employee_name}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Check-in Date:</span>
                <span className="detail-value">{hotelRequest.check_in}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Room Type:</span>
                <span className="detail-value">{hotelRequest.room_type}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Booking Confirmation Number:</span>
                <span className="detail-value">{hotelRequest.booking_confirmation_number || "-"}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Booking Confirmation Email:</span>
                <span className="detail-value">{hotelRequest.confirmation_email || "-"}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{hotelRequest.employee_id}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Check-out Date:</span>
                <span className="detail-value">{hotelRequest.check_out}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Special Requests:</span>
                <span className="detail-value">{hotelRequest.special_requests || "-"}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Destination:</span>
                <span className="detail-value">{hotelRequest.destination}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Number of Rooms:</span>
                <span className="detail-value">{hotelRequest.number_of_rooms}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Hotel Preferences:</span>
                <span className="detail-value">{hotelRequest.hotel_preferences || "-"}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Manager Approval:</span>
                <span className="detail-value">{hotelRequest.manager_approval || "No"}</span>
            </div>
            <div className="button-group">
                <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    Back to List
                </button>
                <button 
                    className="update-button"
                    onClick={() => navigate(`/admin/hotel-edit/${hotelRequest.employee_id}`)}
                >
                    Update
                </button>
            </div>
        </div>
        </div>
    );
};

export default HotelDetails;