import React, { Component } from "react";
import { recipe } from "../tempDetails";

class RecipeDetails extends Component {
  // This uses constructor function to pass down the props
  // // Setting up state for details page
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipe,
  //     url: `https://www.food2fork.com/api/get?key=ab277943dbf7c7ee9db2cb144fbb53da&rId=${this.props.id}`
  //   };
  // }

  // //Fetching data for the state
  // async componentDidMount() {
  //   try {
  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     console.log(jsonData);
  //     this.setState({
  //       recipe: jsonData.recipe
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // This is another mentod to pass down state to the compeonet

  state = {
    recipe: recipe
  };

  async componentDidMount() {
    const id = this.props.id;
    const url = `https://www.food2fork.com/api/get?key=ab277943dbf7c7ee9db2cb144fbb53da&rId=${id}`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      console.log(jsonData);
      this.setState(
        () => {
          return { recipe: jsonData.recipe };
        },
        () => {}
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.state.recipe);
    // Destructuring the details
    const {
      image_url,
      publisher_url,
      publisher,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    // Destructing props for button change
    const { handleIndex } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(1)}
              >
                Back to recipe list
              </button>
              <img src={image_url} className="d-block w-100" alt="recipe" />
            </div>
            {/*details*/}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                Provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_balnk"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2 text-capitalize"
              >
                Publisher Webpage
              </a>
              <a
                href={source_url}
                target="_balnk"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 mx-3 text-capitalize"
              >
                Recipe URL
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-2 mb-3">Ingredients</h2>
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className="list-group-item text-slanted">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default RecipeDetails;
