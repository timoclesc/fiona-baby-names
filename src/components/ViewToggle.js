import React from 'react';

function ViewToggle ({currentView, handleClick}) {
    const views = [
        {name: 'mine', label: 'My Names'},
        {name: 'rate', label: 'Rate Names'}
    ];
    return (
        <div className='toggle-container'>
            {views.map((button => <button key={button.name} onClick={handleClick} className={currentView === button.name ? 'current-toggle' : ''} name={button.name}>{button.label}</button>))}
        </div>
    )
}

export default ViewToggle;