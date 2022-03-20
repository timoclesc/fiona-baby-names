import React from 'react'

function SubmitForm ({users, handleSubmit, onInputChange, state}) {
    return (
        <form className="form" onSubmit={handleSubmit}>
          <h2>Name me you must</h2>
          <label htmlFor="submitter">I am </label>
          <select name="submitter" id="submitter" onChange={onInputChange}>
            <option value="">---</option>
            {users.map(person => <option key={person.name} value={person.name}>{person.name}</option>)}
          </select>
      
          <label htmlFor="name">A good name would be: </label>
          <input type="text" name="name" id="name" value={state.name} onChange={onInputChange}></input>

          <button type="submit" disabled={!state.name || state.isLoading }>Save this name</button>
      </form>
    )
}

export default SubmitForm;