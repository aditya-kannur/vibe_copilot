import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "../../components/css/AllowanceRequest.css";

function AllowanceRequest({ filter }) {
    const [allowanceRequests, setAllowanceRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://vibe-copilot-77jk.onrender.com/allowance_requests")
            .then((response) => response.json())
            .then((data) => {
                const reversedData = data.reverse();
                setAllowanceRequests(reversedData);
                setFilteredRequests(reversedData);
            })
            .catch((error) => console.error("Error fetching allowance requests:", error));
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const filtered = allowanceRequests.filter(request => {
            if (!request.request_date) return false;

            const reqDate = new Date(request.request_date);
            reqDate.setHours(0, 0, 0, 0);

            switch (filter) {
                case "All":
                    return true;
                case "Upcoming":
                    return reqDate >= currentDate;
                case "Completed":
                    return reqDate < currentDate;
                case "Cancelled":
                    return request.manager_approval?.toLowerCase() === "rejected";
                default:
                    return true;
            }
        });

        setFilteredRequests(filtered);
    }, [filter, allowanceRequests]);

    return (
        <div className="allowance-request-container">
            <div className="table-wrapper">
                <table className="allowance-table">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Purpose</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Payment</th>
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
                                <td>{request.amount}</td>
                                <td>{request.currency}</td>
                                <td>{request.purpose}</td>
                                <td>{request.request_date}</td>
                                <td>{request.manager_approval || "Pending"}</td>
                                <td>{request.payment_status || "Pending"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllowanceRequest;
