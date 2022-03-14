import React from 'react'

function MyNames ({names}) {
    return (
        <>
          <h2>Your Names</h2>
          <div className="name-container">
            {names.map(item => <p key={item.id}>{item.name}</p>)}
          </div>
        </>
    )
}

export default MyNames;