import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import ProfilePage from './pages/ProfilePage'
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import LogIn from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PrivateRoute from './components/PrivateRoute';
import AuthButton from './components/AuthButton';
import NavBarProfile from './components/NavBarProfile'

import './App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow mb-3">
      <div className="d-flex justify-content-start">
        <Link className="navbar-brand nav-link item home"  to="/">ToolsOverflow</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item d-flex align-items-center">
            <NavLink className="nav-link item" exact to="/posts/new">
              Create Post
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center">
            <NavLink className="nav-link item" exact to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item d-flex align-items-center">
            <NavLink className="nav-link item" exact to="/about-us">
              About Us
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" exact to="/log-in">
              Log In
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" exact to="/Register">
              Register
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className="ms-auto d-flex">
        <AuthButton/>
        <NavBarProfile/>
      </div>

      
    </nav>
  );
}


class App extends React.Component {
  render() {
    return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center container-app">
            <div className="row justify-content-center">
              <Switch>
                <PrivateRoute path="/posts/new" component={CreatePost} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <Route path="/log-in" component={LogIn} />
                <Route path="/Register" component={Register}/>
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/" component={PostsListPage} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
