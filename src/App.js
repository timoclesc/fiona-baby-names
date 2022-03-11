import BabyYoda from './baby-yoda';
import './App.css';
import axios from 'axios';
import { useState, useRef} from 'react';

const url = 'https://sheet.best/api/sheets/b0f0eada-bf2e-40bf-ae70-eaf10af373ec';

function App() {
  const [state, setState] = useState(
    {
      id: new Date().getTime(),
      name: '',
      submitter: '',
      isLoading: false,
      hasError: false,
      hasConfirm: false,
      loggedIn: false,
      user: '',
      data: []
    }
  );

  const password = useRef();

  const kimPassword = "1F884A";
  const shazPassword = "D10DC0";

  const handleSubmit = function(e) {
    setState({
      ...state,
      isLoading: true,
      hasError: false,
      hasConfirm: false
    });
      e.preventDefault();

      if(state.name) {
        axios.post(url, state)
        .then(response => {
          setState({
            ...state,
            isLoading: false,
            hasError: response.status !== 200,
            hasConfirm: response.status === 200,
          });
        })
      }
  }

  const handleLogin = (e) => {
    var user = '';

    if (password.current?.value === kimPassword ) {
      user = 'Kim';
    } else if (password.current?.value === shazPassword ) {
      user = 'Shaz';
    } else {
      setState({
        ...state,
        hasError: true,
      });
      return;
    }

    setState({
      ...state,
      isLoading: true,
      loggedIn: user
    });

    axios.get(`${url}/submitter/${user}`)
      .then(response => {
        setState({
          ...state,
          isLoading: false,
          hasError: response.status !== 200,
          data: response.data
        });
    })
  }

  var rainbowClassnames = `rainbow-container ${state.isLoading ? 'is-loading' : ''}`;

  const onInputChange = (e) => {
    setState({
      ...state,
      id: new Date().getTime(),
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  return (
    <div className="App">
      <div className="baby-container">
        <BabyYoda />
      </div>
      <h2>Name me you must</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="submitter">I am </label>
        <select name="submitter" id="submitter" onChange={onInputChange}>
          <option value="">---</option>
          <option value="Shaz">Shaz</option>
          <option value="Kim">Kim</option>
        </select>
    
        <label htmlFor="name">A good name would be: </label>
        <input type="text" name="name" id="name" value={state.name} onChange={onInputChange}></input>


        <button type="submit" disabled={!state.name || state.isLoading }>Save this name</button>
      </form>


      <div className="notification">
        {state.hasError ? <p>Uh-oh, something went wrong...</p> : ''}
        {state.hasConfirm ? <p>Success!</p> : ''}
      </div> 

      <div className={rainbowClassnames}>
        <div className="rainbow"></div>
      </div>
            
      <hr />

      <div className="login-container">
        <label htmlFor="password">See my names</label>
        <input id="password" type="password" ref={password} placeholder="password"></input>
        <button onClick={handleLogin}> Show my names</button>
      </div>
      <div className="name-container">
        {state.data.map( item => <p key={item.id}>{item.name}</p>)}
      </div>

    </div>
  );
}

export default App;
