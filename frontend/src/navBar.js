import React from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <header>
        <div className="logo">Logo/Name</div>
        <nav>
            <ul>
            <li ><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/chart">Chart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
        <Link to="/login">
        <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class="x1lliihq xxk0z11 xvy4d1p x1afcbsf x174y0p0 x1a7gu1z" role="img">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 6A5 5 0 1 1 7 6a5 5 0 0 1 10 0zm-2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 19.801v-1.134C21 14.222 16.5 12 12 12s-9 2.222-9 6.667V19.8c0 1.255.79 2.36 2.022 2.6 1.495.292 3.822.6 6.978.6 3.156 0 5.483-.308 6.979-.6 1.231-.24 2.021-1.345 2.021-2.6zm-2-1.134V19.8a.781.781 0 0 1-.142.472.411.411 0 0 1-.262.165c-1.372.268-3.57.562-6.596.562-3.026 0-5.224-.294-6.596-.562a.411.411 0 0 1-.262-.165A.781.781 0 0 1 5 19.8v-1.134c0-1.435.684-2.521 1.912-3.33C8.2 14.49 10.042 14 12 14c1.958 0 3.8.49 5.088 1.337 1.228.809 1.912 1.895 1.912 3.33z"></path>
        </svg>
        </Link>
    </header>
  );
}

export default NavBar;
