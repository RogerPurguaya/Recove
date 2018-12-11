import React, { Component } from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps"
import UserIcon from "../../assets/img/user_icon.png"

class GeoMap extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          currentPosition : null,
          infoMarker: {}  
        };
      }
        
    positionChangedHandler = (event) => {
      this.setState({
        currentPosition: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      })
      this.props.onMarkerChanged(this.state.currentPosition)
    }

    componentDidMount() {
        let geo = navigator.geolocation
        if(geo){ 
          geo.getCurrentPosition((position) => { 
            this.setState({
              currentPosition: {lat: position.coords.latitude,
                lng: position.coords.longitude}
           })
           this.props.onMarkerChanged(this.state.currentPosition)
          })
        }
      }
    
    render(){
        let content = (<div>
           <h2>Por favor acepte acceder a su ubicación para habilitar el mapa</h2>
        </div>)
        if (this.state.currentPosition !== null) {
            content = (<GoogleMap
              defaultZoom={17}
              defaultCenter={this.state.currentPosition}
              defaultMapTypeId="hybrid"  
              defaultOptions={{
                scrollwheel: false,
                zoomControl: true,
              }}
            >
                 <Marker position={this.state.currentPosition} 
                         defaultIcon={UserIcon}
                         defaultTitle={'Ahora estás aqui'}
                         defaultDraggable={true}
                         onDragEnd={this.positionChangedHandler}
                  />
            </GoogleMap>
            )
        }
        return (content)
    }
}
const CustomSkinMap = withScriptjs(
  withGoogleMap(GeoMap)
);

export default CustomSkinMap