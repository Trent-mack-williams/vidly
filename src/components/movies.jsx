import React, { Component } from "react";
import HeartIcon from "./common/heart.jsx";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import { getMovies } from "../services/fakeMovieService";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleDelete = movie => {
    /*We create a copy array of the state but one which has been filtered by if there Id doesnt match the id of this movie given in to the parameters
    (when you filter u return a copy of an array include only those that return true)*/
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    /* we then override the state using the set state giving in the name of the state we with to change and its new variable
    (sid enote as these both match you could just have ({movies}) ) */
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  //this updates current page
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    /*we use descturcting to fetch a property from the following obj*/
    const { length: count } = this.state.movies;
    const { movies, pageSize, currentPage } = this.state;
    const pagesMovies = paginate(movies, currentPage, pageSize);

    if (count === 0) {
      return <p>There are no movies in the DB</p>;
    }

    return (
      <React.Fragment>
        <p>there are {count} movies in the DB</p>
        <table className="movies table">
          <thead>
            <tr className="row">
              <th className="col-4">Title</th>
              <th className="col">Genre</th>
              <th className="col">Stock</th>
              <th className="col">Rate</th>
              <th className="col">Delete</th>
              <th className="col">Liked</th>
            </tr>
          </thead>
          <tbody>
            {pagesMovies.map(movie => (
              <tr key={movie._id} className="row">
                <td className="col-4">{movie.title}</td>
                <td className="col">{movie.genre.name}</td>
                <td className="col">{movie.numberInStock}</td>
                <td className="col">{movie.dailyRentalRate}</td>
                <td className="col">
                  <button
                    className="btn btn-danger btn-sm"
                    /*on click we will run the handle delete function on THIS obj passing this obj in as a parameter*/
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
                <td className="col">
                  <HeartIcon
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
