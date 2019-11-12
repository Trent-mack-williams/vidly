import React, { Component } from "react";
import HeartIcon from "./common/heart.jsx";

class MoviesTable extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { pagesMovies, onDelete, onLike, onSort } = this.props;
    return (
      <table className="movies table">
        <thead>
          <tr className="row">
            <th className="col-4" onClick={() => this.raiseSort("title")}>
              Title
            </th>
            <th className="col" onClick={() => this.raiseSort("genre.name")}>
              Genre
            </th>
            <th className="col" onClick={() => this.raiseSort("numberInStock")}>
              Stock
            </th>
            <th
              className="col"
              onClick={() => this.raiseSort("dailyRentalRate")}
            >
              Rate
            </th>
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
