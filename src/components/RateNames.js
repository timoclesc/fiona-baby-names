import React from 'react'

const ratings = [...Array(3).keys()];

function RateNames ({currentName, handleRating, changeId, saveNames}) {
    return (
        <>
          <h2>What if I were named...</h2>
          <p className='name'>{currentName.name}</p>
          <div className='rating-container'>
            <button className='prev-button' onClick={()=> changeId(-1)}>Prev</button>
            <select className='rating-selector' onChange={handleRating} value={currentName.rating ? currentName.rating : 0}>
              {ratings.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <button className='next-button' onClick={()=> changeId(1)}>Next</button>
          </div>
          <button onClick={saveNames}>Save</button>
        </>
    )
}

export default RateNames;