import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import CourtCard from '../components/CourtCard'
import '../styles/CourtManyScreen.css';

function CourtManyScreen() {
    const [courts, setCourts] = useState([])

    useEffect(() => {
        fetchCourts()
    }, [])

    async function fetchCourts() {
        const { data, error } = await supabase
            .from('courts')
            .select('*')

        if (error) console.log('error', error)
        else setCourts(data)
    }

    return (
        <div>
            <h1>Courts</h1>
            {courts.map(court => (
                <CourtCard key={court.id} court={court} />
            ))}
        </div>
    )
}

export default CourtManyScreen