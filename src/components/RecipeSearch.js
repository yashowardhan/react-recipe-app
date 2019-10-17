import React, { Component } from "react";

class RecipeSearch extends Component {
  render() {
    const { value, handleSubmit, handleChange } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 text-center">
              <h1 className="text-slanted text-capitalize">
                Search for recipe with{" "}
                <strong className="text-danger">Food to fork</strong>
              </h1>
              <form className="mt-4" onSubmit={handleSubmit}>
                <label htmlFor="search" className="text-capitalize">
                  type recipes separated by comma
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    name="search"
                    placeholder="chicken, onions, carrots"
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="input-group-text bg-primary text-white"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default RecipeSearch;
