import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./common/heart.jsx";

class MoviesTable extends Component {
  render() {
    const { pagesMovies, onDelete, onLike, onSort } = this.props;
    console.log(pagesMovies);
    return (
      <table className="movies table">
        <thead>
          <tr className="row">
            <th className="col-4" onClick={() => onSort("title")}>
              Title
            </th>
            <th className="col" onClick={() => onSort("genre.name")}>
              Genre
            </th>
            <th className="col" onClick={() => onSort("numberInStock")}>
              Stock
            </th>
            <th className="col" onClick={() => onSort("dailyRentalRate")}>
              Rate
            </th>
            <th className="col">Delete</th>
            <th className="col">Liked</th>
          </tr>
        </thead>
        <tbody>
          {pagesMovies.map(movie => (
            <tr key={movie._id} className="row">
              <td className="col-4">
                <Link to={`/movieForm/${movie._id}`}>{movie.title}</Link>
              </td>
              <td className="col">{movie.genre.name}</td>
              <td className="col">{movie.numberInStock}</td>
              <td className="col">{movie.dailyRentalRate}</td>
              <td className="col">
                <button
                  className="btn btn-danger btn-sm"
                  /*on click we will run the handle delete function on THIS obj passing this obj in as a parameter*/
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
              <td className="col">
                <HeartIcon liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;
