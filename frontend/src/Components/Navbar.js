import React from 'react';
import { Route } from "react-router-dom";
import './Styles.css';

export default function Navbar() {
    return (
        <div id='nav-div'>
            <ul>
                <Route exact={true} path='/' render={() => 
                <>
                    <li className='nav-item'><a href='favorites'>Favorites</a></li>
                </>
                } />
                <Route exact={true} path='/favorites' render={() => 
                <>
                    <li className='nav-item'><a href='/'>Home</a></li>
                </>
                } />
            </ul>
        </div>
    );
}