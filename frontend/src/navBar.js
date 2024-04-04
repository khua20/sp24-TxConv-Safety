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
        <div id="icon">
            <Link to="/shop" class="sign">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="bag" role="img" aria-label="Empty bag">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5a2 2 0 1 1 4 0v1h-4V5zM8 8v2a1 1 0 1 0 2 0V8h4v2a1 1 0 1 0 2 0V8h.624a1 1 0 0 1 .973.771l.34 1.442A40.001 40.001 0 0 1 19 19.375V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-.625c0-3.085.357-6.16 1.063-9.162l.34-1.442A1 1 0 0 1 7.376 8H8zm0-2V5a4 4 0 1 1 8 0v1h.624a3 3 0 0 1 2.92 2.313l.34 1.442A41.995 41.995 0 0 1 21 19.375V20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-.625a42 42 0 0 1 1.116-9.62l.34-1.442A3 3 0 0 1 7.376 6H8z"></path>
            </svg>
            </Link>
            <Link to="/login" class="sign">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class="log" role="img">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 6A5 5 0 1 1 7 6a5 5 0 0 1 10 0zm-2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 19.801v-1.134C21 14.222 16.5 12 12 12s-9 2.222-9 6.667V19.8c0 1.255.79 2.36 2.022 2.6 1.495.292 3.822.6 6.978.6 3.156 0 5.483-.308 6.979-.6 1.231-.24 2.021-1.345 2.021-2.6zm-2-1.134V19.8a.781.781 0 0 1-.142.472.411.411 0 0 1-.262.165c-1.372.268-3.57.562-6.596.562-3.026 0-5.224-.294-6.596-.562a.411.411 0 0 1-.262-.165A.781.781 0 0 1 5 19.8v-1.134c0-1.435.684-2.521 1.912-3.33C8.2 14.49 10.042 14 12 14c1.958 0 3.8.49 5.088 1.337 1.228.809 1.912 1.895 1.912 3.33z"></path>
            </svg>
            </Link>
        </div>
    </header>
  );
}

export default NavBar;
