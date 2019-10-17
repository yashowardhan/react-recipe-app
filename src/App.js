import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import { recipe } from "./tempDetails";

class App extends Component {
  // Setting the inital state
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=ab277943dbf7c7ee9db2cb144fbb53da",
    base_url:
      "https://www.food2fork.com/api/search?key=ab277943dbf7c7ee9db2cb144fbb53da",
    details_id: 35375,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  };

  //  Getting Data using Fetch api
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return { error: "sorry, recipe not found" };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.recipes };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //  Now we use Life cycle method
  componentDidMount() {
    this.getRecipes();
  }

  // Switch between views bascially consitionally rendering the page
  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          ></RecipeList>
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          ></RecipeDetails>
        );
    }
  };

  // handle button clicks to switch between the pages
  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  // Search methods
  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: "" };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    // console.log(this.state.recipes);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
