import React, { useEffect, useState } from 'react'
import axios from 'axios';

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
  
    useEffect(() => {
      fetchFlights();
    }, []);
  
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getFlights');
        console.log("response.data===", response.data)
        setFlights(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSelectFlight = (flight) => {
      setSelectedFlight(flight);
    };
  
    const subscribeToFlight = async (flightId) => {
      try {
        await axios.post(`http://localhost:5000/api/subscribe/${flightId}`);
        alert('Subscribed to flight notifications!');
      } catch (error) {
        console.error('Error subscribing to flight:', error);
      }
    };
  
    return (
      <div>
        <h1>Flight Status : </h1>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id} onClick={() => handleSelectFlight(flight)}>
            Flight Name : {flight.name} - {flight.status}
              <button onClick={() => subscribeToFlight(flight.id)} style={{margin: 10}}>Subscribe</button>
            </li>
          ))}
        </ul>
  
        {selectedFlight && (
          <div>
            <h2>Selected Flight Details</h2>
            <p>Name: {selectedFlight.name}</p>
            <p>Status: {selectedFlight.status}</p>
          </div>
        )}
      </div>
    );
}
export default FlightStatus