import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Details from './Components/Details';

import Home from './pages/Home';



const Routes = () => {
    return (
        <BrowserRouter>
        
            <Switch> 
                <Route exact path="/" component={Home} />
                <Route exact path="/comics/:id" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;