import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "../../components/css/CabRequest.css";

function CabRequest({ filter }) {
    const [cabRequests, setCabRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/cab_requests")
            .then((response) => response.json())
            .then((data) => {
                const reversedData = data.reverse();
                setCabRequests(reversedData);
                setFilteredRequests(reversedData);
            })
            .catch((error) => console.error("Error fetching cab requests:", error));
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const filtered = cabRequests.filter(request => {
            if (!request.pickup_date) return false;

            const pickupDate = new Date(request.pickup_date);
            pickupDate.setHours(0, 0, 0, 0);

            switch (filter) {
                case "All":
                    return true;
                case "Upcoming":
                    return pickupDate >= currentDate;
                case "Completed":
                    return pickupDate < currentDate;
                case "Cancelled":
                    return request.manager_approval?.toLowerCase() === "rejected";
                default:
                    return true;
            }
        });

        setFilteredRequests(filtered);
    }, [filter, cabRequests]);

    return (
        <div className="cab-request-container">
            <div className="table-wrapper">
                <table className="cab-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Pickup Loc</th>
                            <th>Drop Loc</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Passengers</th>
                            <th>Type</th>
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
                                <td>{request.pickup_location}</td>
                                <td>{request.drop_location}</td>
                                <td>{request.pickup_date}</td>
                                <td>{request.pickup_time}</td>
                                <td>{request.number_of_passengers}</td>
                                <td>{request.cab_type}</td>
                                <td>{request.manager_approval || "Pending"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CabRequest;
