/**
 * Created by bipuk on 5/17/2017.
 */
import React from 'react';
import {Popular} from './popular';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Nav} from './Nav'
import Home from './Home';
import Battle from './Battle';

export class App extends React.Component{
    render(){

        return(
            <Router>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path="/popular" component={Popular}/>
                        <Route extact path="/battle" component={Battle}/>
                        <Route render={()=> {
                            return <p>Sorry Mate Nothing found!!</p>;
                        }}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}