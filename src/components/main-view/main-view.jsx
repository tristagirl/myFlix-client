import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setMoviews } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import './main-view.scss';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

export class MainView extends React.Component {
    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
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

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get(`https://enigmatic-atoll-33732.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}`}
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

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <NavbarView user={user} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/login" element={<LoginView />} />
                        <Route exact path="register" element={<RegistrationView />} />
                        <Route exact path="/movies/:movieId" element={<MovieView
                            movie={movies.find(m => m._id === match.params.movieId)}
                            onBackClick={() => history.goBack()} />} />
                        <Route exact path="/profile" element={<ProfileView/> } />
                        <Route exact path="/genres/:name" element={<><GenreView
                            genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                            onBackClick={() => history.goBack()}
                            movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                        <Route path="/directors/:name" element={<DirectorView
                            director={movies.find(m => m.Director.Name === match.params.name).Director}
                            onBackClick={() => history.goBack()}
                            movies={movies.filter(movie => movie.Director.Name === match.params.name)} />} /></>
                        }/>

                    </Row>
<<<<<<< Updated upstream
                </Container>
            </Router>
        );
    }
}
=======
                  </Router>
            
                );
              }
            
            }
            
let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}
            
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
            
>>>>>>> Stashed changes
