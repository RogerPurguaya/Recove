import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, DirectionsRenderer} 
from "react-google-maps"

class TrackingMap extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          currentPosition : null,
          infoMarker: {},
          directions: null  
        };
      }

    componentDidMount() {
        let geo = navigator.geolocation
        if(geo){ 
          geo.getCurrentPosition((position) => { 
            const google = window.google;
            const DirectionsService = new google.maps.DirectionsService();
            let currentPosition = {lat: position.coords.latitude,
                lng: position.coords.longitude}
                
            DirectionsService.route({
                origin: currentPosition,
                destination: this.props.destinationPointer,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        currentPosition,
                        directions: result
                     })
                }else{
                    console.error(`error fetching directions ${result}`);
                }
            }) 
          })
        }
      }
    
    render(){
        let { currentPosition, directions } = this.state
        if (!currentPosition) {
            return (<div>
                <h2>Por favor acepte acceder a su ubicación para habilitar el mapa</h2>
                </div>)
        }

       return (<GoogleMap
              defaultZoom={17}
              defaultCenter={currentPosition}
              defaultMapTypeId="hybrid"  
              defaultOptions={{
                scrollwheel: false,
                zoomControl: true,
                }}
                >
                <DirectionsRenderer directions={directions} />
            </GoogleMap>
            )
    }
}
const CustomSkinMap = withScriptjs(
  withGoogleMap(TrackingMap)
);

function Maps ({...props}) {
    return (
      <CustomSkinMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSMQzZJ1s68VrvsMdJTzurtv-bPY57ZcI"
        loadingElement={<div style={{ height: `80%` }} />}
        containerElement={<div style={{ height: `80vh` }} />}
        mapElement={<div style={{ height: `80%` }} />}
        {...props}
      />
    );
  }

export default Maps