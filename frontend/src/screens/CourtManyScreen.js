import React from 'react';
import CourtCard from '../components/CourtCard';
import '../styles/CourtManyScreen.css';

function CourtManyScreen() {
    const courts = [
        { name: 'Court 1', location: '123 Main St', ownerName: 'John Doe', status: 'Open', createdAt: '2023-06-15T00:00:00Z' },
        { name: 'Court 2', location: '456 Elm St', ownerName: 'Jane Smith', status: 'Closed', createdAt: '2023-07-20T00:00:00Z' },
        { name: 'Court 3', location: '789 Oak St', ownerName: 'Jim Brown', status: 'Open', createdAt: '2023-05-10T00:00:00Z' }
    ];

    return (
        <div className="screen courts-screen">
            <h2>Courts Near Me</h2>
            <div className="container">
                {courts.map((court, index) => (
                    <CourtCard key={index} {...court} />
                ))}
            </div>
        </div>
    );
}

export default CourtManyScreen;
