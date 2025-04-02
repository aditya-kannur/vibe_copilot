import React from 'react';

const Filters = ({ selectedFilter, onFilterChange, onAddClick }) => {
    return (
        <div className='filters-container'>
            <div className='filter-group'>
                {["All", "Upcoming", "Completed", "Cancelled"].map((filter) => (
                    <label key={filter}>
                        <input
                            type="radio"
                            name="statusFilter"
                            value={filter}
                            checked={selectedFilter === filter}
                            onChange={() => onFilterChange(filter)}
                        />
                        {filter}
                    </label>
                ))}
            </div>
            <button className="add-button" onClick={onAddClick}>
                Add
            </button>
        </div>
    );
};

export default Filters;