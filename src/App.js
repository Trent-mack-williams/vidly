import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies.jsx";
import MovieForm from "./components/movieForm.jsx";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main role="main">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/movieForm/:id" component={MovieForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/notFound" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
