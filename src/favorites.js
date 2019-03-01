import React from 'react';
class Favorites extends React.Component {

  state = {
    forecast: []
  }

  componentDidMount() {
    this.props.getData(this.props.city).then(res =>
      this.setState({forecast: res.forecast.forecastday})
    )
  }

  render() {

    var forecast = this.state.forecast.map(
      function iterator( day, i=0 ) {
          i++;
          return(
              <img key={i} src={ day.day.condition.icon } alt={ day.day.condition.text } />
          );
      },
      this
    );     

    return (
      <li>
        {this.props.city} <span onClick={() => this.props.removeCity(this.props.city)}>remove</span>
        <p>{ forecast }</p>
      </li>
    )
  }
}
export default Favorites;