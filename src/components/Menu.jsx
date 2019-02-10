import React from 'react'

function Menu(){
    return(
        <div className="menu">
        <h1>Kanban board</h1>
        <button className="no-action">Ingen åtgärd</button>
        <button className="done">Klar</button>
        </div>
    )
}

export default Menu