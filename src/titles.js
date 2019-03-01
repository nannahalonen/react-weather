import React from 'react';
class Titles extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title-container__title">Weather Scanner </h1>
        <h2 className="title-container__subtitle"> Helps you find weather conditions in cities...  </h2>
        <form id="form" onSubmit = {this.props.loadWeather}>
          <input type="text" name="location" placeholder="Location..."/>
          <button>Get Weather</button>
        </form>
      </div>
    )
  }
}
export default Titles;