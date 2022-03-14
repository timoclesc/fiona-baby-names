import BabyYoda from './baby-yoda';
import SubmitForm from './components/SubmitForm'
import MyNames from './components/MyNames'
import RateNames from './components/RateNames'
import ViewToggle from './components/ViewToggle'
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';

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
      data: [],
      idsToUpdate: [],
      currentView: 'mine',
      currentId: ''
      // Dev values
      // user: 'Kim',
      // loggedIn: true,
      // data: dummyData,
      // currentId: '1644020406092'
    }
  );

  const password = useRef();

  const kimPassword = "1F884A";
  const shazPassword = "D10DC0";

  const handleSubmit = function (e) {
    setState({
      ...state,
      isLoading: true,
      hasError: false,
      hasConfirm: false
    });
    e.preventDefault();

    if (state.name) {
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

    if (password.current?.value === kimPassword) {
      user = 'Kim';
    } else if (password.current?.value === shazPassword) {
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
      loggedIn: true,
      user: user
    });

    axios.get(`${url}`)
      .then(response => {
        setState({
          ...state,
          isLoading: false,
          hasError: response.status !== 200,
          data: response.data,
         currentId: response.data.find(item => item.submitter !== user)?.id,
         user: user
        });
    }, response => {
      console.error(response);
      setState({
        ...state,
        hasError: true
      })
    }
    )

    // Dev only
    // setTimeout(
    //   () => {
    //     setState({
    //       ...state,
    //       isLoading: false,
    //       data: dummyData,
    //       user: user,
    //       hasError: false,

    //     });
    //   }, 1000
    // )
  }

  const handleToggleChange = (e) => {
    const name = e.target.getAttribute('name');
    setState({
      ...state,
      currentView: name
    })
  }

  const handleRating = (e) => {
    var rating = e.target.value;
    setState(
      currentState => ({
      ...currentState,
        data: [
          ...currentState.data.map(entry => entry.id !== currentState.currentId ? entry : {...entry, rating: rating }),
        ],
        idsToUpdate: [...currentState.idsToUpdate, currentState.currentId]
    }));
  }

  const changeId = (change) => {
    var newIndex = rateNames.map(entry => entry.id).indexOf(state.currentId.toString()) + change;

    newIndex > -1 && setState(
      currentState => ({
        ...currentState, 
        currentId: rateNames[newIndex].id
      })
    );
  }

  const handleSaveNames = () => {
    var hasError = false;
    const entriesToUpdate = state.data.filter(entry => state.idsToUpdate.includes(entry.id));

    setState({
      ...state,
      isLoading: true
    });

    
    const promises = Promise.all(entriesToUpdate.map( 
      entry => axios.patch(`${url}/id/${entry.id}`, entry)
        .then(response => {
          if (response.status !== 200) {
            hasError = true;
            console.error(response);
          }
        })
    )).then(
      () => {
        setState({
          ...state,
          isLoading: false,
          hasError: hasError,
          idsToUpdate: hasError ? state.idsToUpdate : []
        });
      }
    );
  }

  var containerClasses = `baby-container ${state.isLoading ? 'is-loading' : ''}`;

  const onInputChange = (e) => {
    setState({
      ...state,
      id: new Date().getTime(),
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  var usersNames = state.data.filter(item => item.submitter === state.user);
  var rateNames = state.data.filter(item => item.submitter !== state.user);

  return (
    <div className="App">
      <div className={containerClasses}>
        <BabyYoda />
        <div className="rainbow"></div>
      </div>

      {state.data.length === 0 && <SubmitForm handleSubmit={handleSubmit} onInputChange={onInputChange} state={state} />}

      <div className="notification">
        {state.hasError ? <p>Uh-oh, something went wrong...</p> : ''}
        {state.hasConfirm ? <p>Success!</p> : ''}
      </div>


      {state.data.length === 0 && <>
        <hr />
        <div className="login-container">
          <label htmlFor="password">Login</label>
          <input id="password" type="password" ref={password} placeholder="password"></input>
          <button onClick={handleLogin}> Login</button>
        </div>
      </>}

      {state.data.length > 0 && <ViewToggle handleClick={handleToggleChange} currentView={state.currentView} />}

      {state.data.length > 0 && state.currentView === 'mine' && <MyNames names={usersNames} />}
      {state.data.length > 0 && state.currentView === 'rate' && <RateNames saveNames={handleSaveNames} handleRating={handleRating} changeId={changeId} currentName={rateNames.find(entry => entry.id === state.currentId)} />}
    </div>
  );
}


export default App;
