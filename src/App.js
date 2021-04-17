import Theme from './theme/config'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Index from './pages/Index'
import DataProvider from './context/dataContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/privateRoute'

function App() {
  return (
    <DataProvider>
      <Theme>
        <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/register" component={Signup} />
              <PrivateRoute exact path='/' component={Index} />
            </Switch>
          </Router>
      </Theme>
    </DataProvider>
  );
}

export default App;