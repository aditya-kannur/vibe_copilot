import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "../../components/css/HotelRequest.css";

function HotelRequest({ filter }) {
    const [hotelRequests, setHotelRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://vibe-copilot-77jk.onrender.com/hotel_requests")
            .then((response) => response.json())
            .then((data) => {
                const reversedData = data.reverse();
                setHotelRequests(reversedData);
                setFilteredRequests(reversedData);
            })
            .catch((error) => console.error("Error fetching hotel requests:", error));
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        const filtered = hotelRequests.filter(request => {
            if (!request.check_in || !request.check_out) return false;
            
            const checkInDate = new Date(request.check_in);
            const checkOutDate = new Date(request.check_out);
            checkInDate.setHours(0, 0, 0, 0);
            checkOutDate.setHours(0, 0, 0, 0);

            switch(filter) {
                case "All":
                    return true;
                case "Upcoming":
                    return currentDate >= checkInDate;
                case "Completed":
                    return currentDate > checkOutDate;
                case "Cancelled":
                    return request.manager_approval?.toLowerCase() === "rejected";
                default:
                    return true;
            }
        });
        
        setFilteredRequests(filtered);
    }, [filter, hotelRequests]);

    const handleRowClick = (employeeId, e) => {
        if (!e.target.closest('.action-btn')) {
            navigate(`/hotel-details/${employeeId}`);
        }
    };

    return (
        <div className="hotel-request-container">
            <div className="table-wrapper">
                <table className="hotel-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Destination</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Rooms</th>
                            <th>Room Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr 
                                key={index}
                                onClick={(e) => handleRowClick(request.employee_id, e)}
                                className="clickable-row"
                            >
                                <td className="actions-cell">
                                    <button 
                                        className="action-btn view-btn"
                                        onClick={() => navigate(`/hotel-details/${request.employee_id}`)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button 
                                        className="action-btn edit-btn"
                                        onClick={() => navigate(`/admin/hotel-edit/${request.employee_id}`)}
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td>{request.employee_id}</td>
                                <td>{request.employee_name}</td>
                                <td>{request.email || "N/A"}</td>
                                <td>{request.destination}</td>
                                <td>{request.check_in || "N/A"}</td>
                                <td>{request.check_out || "N/A"}</td>
                                <td>{request.number_of_rooms}</td>
                                <td>{request.room_type}</td>
                                <td>{request.manager_approval || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HotelRequest;