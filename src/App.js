import './App.css';

import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  //const state = useSelector((state) => state);

  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/register">
        <Registration />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
