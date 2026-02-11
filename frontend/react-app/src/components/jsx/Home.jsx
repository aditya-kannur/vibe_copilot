import React, { useState } from 'react';
import ChangeRequest from './ChangeRequest';
import HotelRequest from './HotelRequest';
import FlightRequest from './FlightRequest';
import CabRequest from './CabRequest';
import TransportRequest from './TransportRequest';
import AllowanceRequest from './AllowanceRequest';
import Filters from '../jsx/Filters';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [activeRequestType, setActiveRequestType] = useState("Hotel Request");
    const navigate = useNavigate();

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleAddClick = () => {
        switch (activeRequestType) {
            case "Hotel Request":
                navigate('/admin/add-hotel-request');
                break;
            case "Flight Ticket Request":
                navigate('/admin/add-flight-request');
                break;
            case "Cab/Bus Request":
                navigate('/admin/add-cab-request');
                break;
            case "Transportation Request":
                navigate('/admin/add-transport-request');
                break;
            case "Travelling Allowance Request":
                navigate('/admin/add-allowance-request');
                break;
            default:
                break;
        }
    };

    const handleRequestTypeSelect = (type) => {
        setActiveRequestType(type);
    }

    const renderRequestComponent = () => {
        switch (activeRequestType) {
            case "Hotel Request":
                return <HotelRequest filter={selectedFilter} />;
            case "Flight Ticket Request":
                return <FlightRequest filter={selectedFilter} />;
            case "Cab/Bus Request":
                return <CabRequest filter={selectedFilter} />;
            case "Transportation Request":
                return <TransportRequest filter={selectedFilter} />;
            case "Travelling Allowance Request":
                return <AllowanceRequest filter={selectedFilter} />;
            default:
                return <HotelRequest filter={selectedFilter} />;
        }
    };

    return (
        <div>
            <div className='scrollbar'></div>
            <div className='dashboard'>
                <div className='change-type'> <ChangeRequest onSelect={handleRequestTypeSelect} /> </div>
                <Filters
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                    onAddClick={handleAddClick}
                />
                <div className="hotel-request-section">
                    {renderRequestComponent()}
                </div>
            </div>
        </div>
    );
};

export default Home;