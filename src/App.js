import React from 'react'
import './App.css'
import Titles from './titles'
import Favorites from './favorites'
import Weather from './weather'
import API_KEY from './config'
import localforage from 'localforage'

class App extends React.Component {
  state = {
    location: {},
    cityList: []
  }

  addCity = async () => {
    let cities = this.state.cityList

    if (!cities.includes(this.state.city) && cities.length < 5) {
      cities.push(this.state.city)
      localforage.setItem('selectedCities', cities)
      this.setState({ cityList: cities })
    } else {
      this.setState({
        error: 'Favorites full!'
      })
    }
  }

  removeCity = async city => {
    let cities = this.state.cityList
    var filtered = cities.filter(function(value, index, arr) {
      return value !== city
    })
    localforage.setItem('selectedCities', filtered)
    this.setState({ cityList: filtered })
  }

  async getWeatherData(city) {
    return new Promise(async function(resolve, reject) {
      const weatherAPIUrlBase =
        'http://api.apixu.com/v1/forecast.json?key=' +
        API_KEY +
        '&days=7&q=' +
        city
      const api_call = await fetch(weatherAPIUrlBase)
      const response = await api_call.json()

      resolve(response)
    })
  }

  getWeather = async e => {
    e.preventDefault()

    const location = e.target.elements.location.value

    if (location) {
      this.getWeatherData(location).then(response => {
        console.log(response)

        if (response.error) {
          this.setState({
            error: response.error.message,
            location: {}
          })
        } else {
          this.setState({
            location: {
              temperature: response.current.temp_c,
              city: response.location.name,
              country: response.location.country,
              humidity: response.current.humidity,
              feelslike: response.current.feelslike_c,
              description: response.current.condition.text,
              icon: response.current.condition.icon
            },
            error: ''
          })
        }
      })
    } else {
      this.setState({
        error: 'Please enter location...',
        location: {}
      })
    }
  }

  getCities = () => {
    return new Promise(function(resolve, reject) {
      localforage
        .getItem('selectedCities')
        .then(function(cityList) {
          if (cityList) {
            resolve(cityList)
          }
          resolve([])
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  componentDidMount() {
    this.getCities().then(res => this.setState({ cityList: res }))
  }

  render() {
    var favorites = this.state.cityList.map(function iterator(city, i = 0) {
      i++
      return (
        <Favorites
          key={i}
          city={city}
          getData={this.getWeatherData}
          removeCity={this.removeCity}
        />
      )
    }, this)

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="left">
              <Titles loadWeather={this.getWeather} />

              <Weather
                location={this.state.location}
                error={this.state.error}
                cityList={this.state.cityList}
                addCity={this.addCity}
              />
            </div>
            <div className="right">
              <div className="container">
                <h4>Favorites</h4>
                <ul>{favorites}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App
