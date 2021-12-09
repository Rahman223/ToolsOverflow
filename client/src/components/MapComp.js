import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const apiKey = process.env.REACT_APP_MAP_API 


const containerStyle = {
  height: '400px',
  width: '900px',
  margin: '0 auto',
  position: 'relative'
};

const style ={
  height: '400px',
  borderColor: 'black',
  borderStyle: 'solid',
  borderRadius: '10px',
  width: '900px',
  margin: '0 auto',
}


class MapComp extends Component {
    constructor(props){
        super(props);
        this.state= {
            address: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            position : {
                lat: this.props.position.lat,
                lng: this.props.position.lng
            } 
        }
    }

    onMarkerDragEnd = ( event, eve2, eve3 ) => {
        console.log( 'event', eve3 );
        const {latLng} = eve3;
        let newLat = latLng.lat(),
         newLng = latLng.lng()

         this.setState(prevState => {
            let position = { ...prevState.position };
            position.lat = newLat;
            position.lng = newLng;
            return {position}
        })

        this.props.onLocationChange(this.state.position.lat, this.state.position.lng)
    }

    handleChange = address => {
        this.setState({ address });
      };
     
    handleSelect = address => {
      this.setState({ address });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          console.log('Success', latLng)
          this.setState({position: latLng});
          this.props.onLocationChange(this.state.position.lat, this.state.position.lng)

      })
        .catch(error => console.error('Error', error));
    };

  render() {
    return (
<div className="mapComponent">
            <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        <Map
        google={this.props.google}
        initialCenter={this.state.position}
        containerStyle={containerStyle}
        style={style}
        zoom={12}
        center={this.state.position}
        >
            
            
            
            <Marker 
            draggable={true}
            onDragend={ this.onMarkerDragEnd }
            position={this.state.position} 
            />  

        </Map>

        </div>
      
    )
  }
}

export default GoogleApiWrapper({
    apiKey: (apiKey)
  })(MapComp)