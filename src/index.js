import ReactDOM from 'react-dom/client';
import React    from 'react';

import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>
);