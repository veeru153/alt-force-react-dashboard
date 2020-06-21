import React from 'react';
import './App.css';
import Register from './components/Register/Register';
import OTP from './components/OTP/OTP';
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/verify" component={OTP} />
                <Route path="/" component={Dashboard} exact/>
            </Switch>
        </div>
    );
}

export default App;
