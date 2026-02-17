import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "../../components/css/FlightRequest.css";

function FlightRequest({ filter }) {
    const [flightRequests, setFlightRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://vibe-copilot-77jk.onrender.com/flight_requests")
            .then((response) => response.json())
            .then((data) => {
                const reversedData = data.reverse();
                setFlightRequests(reversedData);
                setFilteredRequests(reversedData);
            })
            .catch((error) => console.error("Error fetching flight requests:", error));
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const filtered = flightRequests.filter(request => {
            if (!request.departure_date) return false;

            const deptDate = new Date(request.departure_date);
            deptDate.setHours(0, 0, 0, 0);

            switch (filter) {
                case "All":
                    return true;
                case "Upcoming":
                    return deptDate >= currentDate;
                case "Completed":
                    return deptDate < currentDate; // Simplified logic as 'return_date' is optional
                case "Cancelled":
                    return request.manager_approval?.toLowerCase() === "rejected";
                default:
                    return true;
            }
        });

        setFilteredRequests(filtered);
    }, [filter, flightRequests]);

    return (
        <div className="flight-request-container">
            <div className="table-wrapper">
                <table className="flight-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Return</th>
                            <th>Airline</th>
                            <th>Class</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr
                                key={index}
                                className="clickable-row"
                            >
                                <td className="actions-cell">
                                    {/* Placeholders for View/Edit */}
                                    <button
                                        className="action-btn view-btn"
                                        disabled
                                        title="View Details (Not Implemented)"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-btn edit-btn"
                                        disabled
                                        title="Edit (Not Implemented)"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td>{request.employee_id}</td>
                                <td>{request.employee_name}</td>
                                <td>{request.email || "N/A"}</td>
                                <td>{request.from_city}</td>
                                <td>{request.to_city}</td>
                                <td>{request.departure_date || "N/A"}</td>
                                <td>{request.return_date || "N/A"}</td>
                                <td>{request.airline_preference || "Any"}</td>
                                <td>{request.travel_class}</td>
                                <td>{request.manager_approval || "Pending"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FlightRequest;
