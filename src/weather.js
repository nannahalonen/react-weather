import React from 'react';

class Weather extends React.Component{

    render(){
        return(
            <div className="weather-info">

                {
                    this.props.location.country && this.props.location.city && <h3>{this.props.location.city}, {this.props.location.country}</h3> 
                }            

                {
                    this.props.location.icon && <img src={this.props.location.icon} alt={this.props.location.description} />
                }

                {
                    this.props.description && <p className="descriptipn">{this.props.location.description}
                    </p>
                }                
                
                {
                    this.props.location.temperature && <p className="weather__key">Temperature: 
                        <span className="weather__value">  {this.props.location.temperature}</span>
                    </p>
                }

                {
                    this.props.location.humidity && <p className="weather__key">Humidity: 
                        <span className="weather__value">  {this.props.location.humidity}</span>
                    </p>
                }

                {
                    this.props.location.description && <p className="weather__key">Conditions:  
                        <span className="weather__value">  {this.props.location.description}</span>
                    </p>
                }

                {
                    this.props.error && <p className="weather__error">{this.props.error}</p>
                }
                {
                    this.props.location.country && this.props.location.city && <button onClick={this.props.addCity}>Add to Favorites</button>
                }

            </div>
        )
    }
}

export default Weather;