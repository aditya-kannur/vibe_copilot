import React, { useState } from "react";
import "../../components/css/ChangeRequest.css"; 

function ChangeRequest({ onSelect }) {
    const [activeTab, setActiveTab] = useState("Hotel Request");
    const requestTypes = [
        "Hotel Request", 
        "Flight Ticket Request", 
        "Cab/Bus Request", 
        "Transportation Request", 
        "Travelling Allowance Request"
    ];

    const handleSelect = (type) => {
        setActiveTab(type);
        onSelect(type);
    };

    return (
        <div className="change-request-container">
            <div>
                {requestTypes.map((type) => (
                    <button
                        key={type}
                        className={`tab-button ${activeTab === type ? "active" : ""}`}
                        onClick={() => handleSelect(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChangeRequest;
