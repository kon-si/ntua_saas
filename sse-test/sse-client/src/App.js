import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ facts, setFacts ] = useState([]);

  useEffect( () => {
      const events = new EventSource('http://localhost:8000/events');
      events.onmessage = (event) => {
        // PARSE THE DATA
        const parsedData = JSON.parse(event.data);

        setFacts((facts) => facts.concat(parsedData));
      };
      
      return () => {
        events.close();
      };

  }, []);
  // IMPORTANT NOTE
  // useEffect excecutes every time the dependencies([]) have changed

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Fact</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{fact.info}</td>
              <td>{fact.source}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default App;