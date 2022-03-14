import React from 'react'

const ratings = [
  {value: '', label: '---'},
  {value: 0, label: 'maybe no'},
  {value: 1, label: 'meh'},
  {value: 2, label: 'ok'},
  {value: 3, label: 'that\'s nice'},
  {value: 4, label: 'omg yes'}
];

function RateNames ({currentName, handleRating, changeId, saveNames}) {
    return (
        <>
          <h2>What if I were named...</h2>
          <p className='name'>{currentName.name}</p>
          <div className='rating-container'>
            <button className='prev-button' onClick={()=> changeId(-1)}>Prev</button>
            <select className='rating-selector' onChange={handleRating} value={currentName.rating ? currentName.rating : ''}>
              {ratings.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
            <button className='next-button' onClick={()=> changeId(1)}>Next</button>
          </div>
          <button onClick={saveNames}>Save</button>
        </>
    )
}

export default RateNames;