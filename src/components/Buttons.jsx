import React from "react";
import './buttons.css';

function Buttons(props){

    function handleClick(event){
        event.target.classList.add("focus");
    }

    return(
        <div className="buttons">
            <div>Filter by:</div>
            <div className="focus" onClick={handleClick}>Read</div>
            <div onClick={handleClick}>Unread</div>
            <div onClick={handleClick}>Favourites</div>
        </div>
    )
}

export default Buttons;