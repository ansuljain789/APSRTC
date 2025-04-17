import React, { useEffect, useState } from 'react'

const Driver = () => {
  const [busNumber, setBusNumber] = useState("Loading...")
  const [crewResponse, setCrewResponse] = useState("")
  const [crew, setCrew] = useState(null) // to store crew details
  const [accepted, setAccepted] = useState(false) // flag to hide buttons if accepted

  useEffect(() => {
    // Fetch the bus number from backend
    const fetchBusNumber = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bus')
        const data = await response.json()
        setBusNumber(data.busNumber)
      } catch (error) {
        console.error("Error fetching bus number:", error)
        setBusNumber("Unavailable")
      }
    }
    fetchBusNumber()
  }, [])

  useEffect(() => {
    // Fetch crew details from the crewDetail endpoint in crew.js
    const fetchCrewDetail = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/crew/crewDetail')
        const data = await response.json()
        setCrew(data)
      } catch (error) {
        console.error("Error fetching crew details:", error)
      }
    }
    fetchCrewDetail()
  }, [])

  const containerStyle = {
    maxWidth: '900px',
    height: '50vh',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff'
  }

  const messageBoxStyle = {
    padding: '50px',
    marginBottom: '35px',
    border: '2px solid #4CAF50',
    borderRadius: '5px',
    backgroundColor: '#E8F5E9',
    color: '#1B5E20',
    fontSize: '28px'
  }

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  }

  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: '#fff'
  }

  const declineButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    color: '#fff'
  }

  const responseStyle = {
    marginTop: '20px',
    fontSize: '20px',
    color: '#333'
  }

  // Build the bus message dynamically based on the busNumber value.
  const busMessageContent = `Bus number ${busNumber} is scheduled to depart soon.`

  // Send crew's choice using your backend's sendMessageToCrew via admin.js/message.js.
  const handleChoice = async (choice) => {
    // Ensure that crew details are loaded
    if (!crew) {
      setCrewResponse("Crew information not loaded yet.")
      return
    }
    // Set content based on the crew's choice.
    const content =
      choice === 'accept'
        ? 'This ride is confirmed.'
        : 'Crew declined the ride.'

    try {
      const response = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: crew._id, content })
      })
      const result = await response.json()
      setCrewResponse(result.message)
      if (choice === 'accept') {
        setAccepted(true)
      }
    } catch (error) {
      console.error("Error sending crew choice:", error)
      setCrewResponse("There was an error processing your request.")
    }
  }

  return (
    <div style={containerStyle}>
      {/* Show the dynamic bus message if no crew response exists */}
      {!crewResponse && (
        <div style={messageBoxStyle}>{busMessageContent}</div>
      )}
      {/* Hide buttons if the request is accepted; otherwise display them */}
      {!accepted && (
        <div>
          <button 
            style={acceptButtonStyle} 
            onClick={() => handleChoice('accept')}
          >
            Accept
          </button>
          <button 
            style={declineButtonStyle} 
            onClick={() => handleChoice('decline')}
          >
            Decline
          </button>
        </div>
      )}
      {/* Display either the acceptance or decline response */}
      {crewResponse && (
        <div style={responseStyle}>{crewResponse}</div>
      )}
    </div>
  )
}

export default Driver;
