import React, { useState } from 'react';
import ChangeRequest from './ChangeRequest';
import HotelRequest from './HotelRequest';
import Filters from '../jsx/Filters';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const navigate = useNavigate();

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleAddClick = () => {
        navigate('/admin/add-hotel-request');
    };

    return (
        <div>
            <div className='scrollbar'></div>
            <div className='dashboard'>
                <div className='change-type'> <ChangeRequest /> </div>
                <Filters 
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                    onAddClick={handleAddClick}
                />
                <div className="hotel-request-section">
                    <HotelRequest filter={selectedFilter} />
                </div>
            </div>
        </div>
    );
};

export default Home;