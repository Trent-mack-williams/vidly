import React, { Component } from "react";
import Pagination from "./common/pagination.jsx";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { paginate } from "../utils/paginate.js";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService.js";
class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "allGenres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genre: genres });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
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

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  //this updates current page
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    /*we use descturcting to fetch a property from the following obj*/
    const { length: count } = this.state.movies;
    const {
      movies,
      pageSize,
      selectedGenre,
      currentPage,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the DB</p>;

    //FILTER
    // create a new array called filtered which contains all the movies where the clicked genre aka (selectedGenre) share genre
    // if there is no match of genres or if the if statement is falsy then just set the new filtered array to all the movies
    const filtered = selectedGenre
      ? movies.filter(m => m.genre._id === selectedGenre)
      : movies;

    //SORT
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //PAGINATE
    const pagesMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genre}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
            textProperty="_id"
            valueProperty="name"
          />
        </div>

        <div className="col">
          <p>
            there are {count} movies in the DB currently showing{" "}
            {filtered.length}
          </p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            pagesMovies={pagesMovies}
            onSort={this.handleSort}
            sortColumn={this.sortColumn}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
