import React from 'react';
<<<<<<< Updated upstream
=======
//importing axios library to fetch movies from database
import axios from 'axios';

import './main-view.scss'


//importing the registration view into the main-view
import { RegistrationView } from '../registration-view/registration-view';
//importing the login view into the main-view
import { LoginView } from '../login-view/login-view';
//importing the movie-card into the main-view
>>>>>>> Stashed changes
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

let imgPath = './img';

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
<<<<<<< Updated upstream
      movies: [
        { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', ImagePath: imgPath + 'inception.png', Genre:'Action, Adventure, Sci-fi', Director:'Christopher Nolan'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: imgPath + 'shawshank.jpg', Genre:'Drama', Director:'Frank Darabont'},
        { _id: 3, Title: "Harry Potter and the Sorcerer's Stone", Description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.', ImagePath: imgPath + 'harrypotter.jpg', Genre:'Adventure, Family, Fantasy', Director:'Chris Columbus'}
      ],
      selectedMovie: null
    }
=======
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://agile-badlands-90637.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
>>>>>>> Stashed changes
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
        <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
}