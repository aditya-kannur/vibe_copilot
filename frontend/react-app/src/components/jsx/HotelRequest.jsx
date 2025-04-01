import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/css/HotelRequest.css";

function HotelRequest() {
    const [hotelRequests, setHotelRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/hotel_requests")
            .then((response) => response.json())
            .then((data) => setHotelRequests(data))
            .catch((error) => console.error("Error fetching hotel requests:", error));
    }, []);

    return (
        <div className="hotel-request-container">
            <div className="table-wrapper">
                <table className="hotel-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Destination</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Rooms</th>
                            <th>Room Type</th>
                            <th>Status</th>
                            <th>Manager Approval</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotelRequests.map((request, index) => (
                            <tr 
                                key={index} 
                                onClick={() => navigate(`/update-hotel/${request.employee_id}`)} 
                                style={{ cursor: "pointer" }}
                            >
                                <td>{request.employee_id}</td>
                                <td>{request.employee_name}</td>
                                <td>{request.destination}</td>
                                <td>{request.check_in || "N/A"}</td>
                                <td>{request.check_out || "N/A"}</td>
                                <td>{request.number_of_rooms}</td>
                                <td>{request.room_type}</td>
                                <td>{request.booking_status}</td>
                                <td>{request.manager_approval || "N/A"}</td>
                                <td>{request.email || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}    

export default HotelRequest;
