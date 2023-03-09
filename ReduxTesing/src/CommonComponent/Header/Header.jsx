import React from 'react'
import { useState } from 'react';
import { NavLink } from "react-router-dom";

function Header(props) {
    const [add, setadd] = useState({
        id: 11,
        name: 3000
    })
    return (
        <div className="addpage">
            <div className='addtext'>{props.title}</div>
            <NavLink
                to={props.pathName}
            >
                <button className='btn-add'>{props.buttonName}</button>
            </NavLink>
        </div>
    )
}

export default Header;