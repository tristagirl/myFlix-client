import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from "react-router-dom";
//import PropTypes from 'prop-types';
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import RegistrationView from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from '../navbar-view/navbar-view';
import { Row, Col, Navbar, Button } from "react-bootstrap";
export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    window.location.replace("/")
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get("https://enigmatic-atoll-33732.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderMovie = (props) => {
    if (!localStorage.getItem('user')) return <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
    return <Col md={8}>
      <MovieView movie={props.movies.find(m => m._id === window.location.href.split("/movies/")[1] )} onBackClick={() => props.history.goBack()} />
    </Col>
  };


  renderDirector = ({movies}) => {
    const directorNAME = window.location.href.split("/directors/")[1].replace("%20", " ");
    const director = movies.find(m => m.Director.Name === directorNAME).Director;
    console.log(directorNAME)
    console.log(director)
    if (!localStorage.getItem('user')) return <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
    return <Col md={8}>
      <DirectorView director={director} onBackClick={() => window.location.replace("/")} />
    </Col>
  }

  renderMovies = (props) => {
    if (!localStorage.getItem('user'))  return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    return props.movies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))
  }

  renderGenre = ({movies}) => {
    const directorNAME = window.location.href.split("/genres/")[1].replace("%20", " ");
    const director = movies.find(m => m.Genre.Name === directorNAME).Genre;
    console.log(directorNAME)
    console.log(director)
    if (!localStorage.getItem('user')) return <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
    return <Col md={8}>
      <GenreView genre={director} onBackClick={() => window.location.replace("/")} />
    </Col>
  }

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <Navbar bg="primary" expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link style={{ color: "red" }} to={"/"}>MyFlixApp</Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <>
                <Link to={`/users/${user}`} >
                  <Button variant="link">USER: {user}</Button>
                </Link>
                <Button onClick={() => this.onLoggedOut()} variant="link">LOGOUT</Button>
              </>
            ) : (
                <>
                  <Link to={`/login`} >
                  <Button variant="link">Login</Button>
                </Link>
                <Link to={`/register`} >
                  <Button variant="link">Register</Button>
                </Link>
                </>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Row className="main-view justify-content-md-center">
              <Routes> 
          <Route exact path="/" element={<this.renderMovies movies={movies} />} />

          <Route exact path="/register" element={<RegistrationView />}/>
          <Route exact path="/login" element={<LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>}  />                         
          <Route exact path="/movies/:movieId" element={<this.renderMovie movies={movies} />} />
          <Route exact path="/directors/:name" element={<this.renderDirector  movies={movies} />} />

          <Route exact path="/genres/:name" element={<this.renderGenre movies={movies} user={user} />} />

          <Route exact path="/profile" element={({ history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            return (
              <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/navbar" element={({ history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }
            return (
              <Col md={8}>
                <NavbarView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/users/:Username" element={({ match, history }) => {
            if (!user) return <Redirect to="/" />;
            <Col>
              <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            </Col>
            if (movies.length === 0) {
              return <div className="main-view" />;
            }
            return <Col md={8}>
              <ProfileView history={history} movies={movies} user={user === match.params.username} />

            </Col>
          }} />
      </Routes>
        </Row>
      </Router>
    );
  }
}