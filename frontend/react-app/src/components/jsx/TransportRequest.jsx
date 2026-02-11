import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "../../components/css/TransportRequest.css";

function TransportRequest({ filter }) {
    const [transportRequests, setTransportRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://vibe-copilot-77jk.onrender.com/transport_requests")
            .then((response) => response.json())
            .then((data) => {
                const reversedData = data.reverse();
                setTransportRequests(reversedData);
                setFilteredRequests(reversedData);
            })
            .catch((error) => console.error("Error fetching transport requests:", error));
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const filtered = transportRequests.filter(request => {
            if (!request.travel_date) return false;

            const travelDate = new Date(request.travel_date);
            travelDate.setHours(0, 0, 0, 0);

            switch (filter) {
                case "All":
                    return true;
                case "Upcoming":
                    return travelDate >= currentDate;
                case "Completed":
                    return travelDate < currentDate;
                case "Cancelled":
                    return request.manager_approval?.toLowerCase() === "rejected";
                default:
                    return true;
            }
        });

        setFilteredRequests(filtered);
    }, [filter, transportRequests]);

    return (
        <div className="transport-request-container">
            <div className="table-wrapper">
                <table className="transport-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Return</th>
                            <th>Time</th>
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
                                <td>{request.transport_type}</td>
                                <td>{request.from_location}</td>
                                <td>{request.to_location}</td>
                                <td>{request.travel_date}</td>
                                <td>{request.return_date || "N/A"}</td>
                                <td>{request.preferred_time || "N/A"}</td>
                                <td>{request.manager_approval || "Pending"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransportRequest;
