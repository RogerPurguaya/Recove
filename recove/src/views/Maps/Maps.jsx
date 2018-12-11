import React, { Component } from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
import  axios  from "../../axios.config";
import { InfoCard }   from "components";
import { Modal } from "material-ui"
import UserIcon from "../../assets/img/user_icon.png"
import PointerIcon from "../../assets/img/recove_pointer.png"

class CustomMap extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          markers : [],
          currentPosition : null,
          showModal: false,
          infoMarker: {}  
        };
      }
    
    markerCliked = (data) => {
      this.setState({
        showModal: true,
        infoMarker: data
      })
    }

    handleClose = () => {
      this.setState({ showModal: false });
    };

     getMarkers = (filter) => { //para futoro agregar filtros.
         axios.get('/publicaciones')
            .then((response) => {  
                  return JSON.stringify(response.data)
            })
            .catch((error) => {
                 console.log(error)
            })    
    }  
     
    componentDidMount() {
        let geo = navigator.geolocation
        if(geo){ 
          geo.getCurrentPosition((position) => {
            let config = {
              'accept': 'application/json',
               headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            }
            axios.get('/publicaciones', config)
              .then((response) => {  
                 let data = response.data
                 this.setState({
                  markers: data,
                  currentPosition: {lat: position.coords.latitude,
                    lng: position.coords.longitude}
               })
               })
              .catch((error) => {
                 console.log(error)
            })
          })
        }
      }
    
    render(){
        
      if (!this.state.currentPosition) {
      return (<div><h2>Por favor acepte acceder a su ubicación para habilitar el mapa</h2></div>)
        }

        let modal = null
        if (this.state.showModal) {
            modal = (<Modal
              open={this.state.showModal}
              onClose={this.handleClose}>
                    <InfoCard data={this.state.infoMarker} actions={true}/>
                  </Modal>) 
          }

      return (<GoogleMap
              defaultZoom={17}
              defaultCenter={this.state.currentPosition}
              defaultMapTypeId="hybrid"  
              defaultOptions={{
                scrollwheel: false,
                zoomControl: true
              }}
            >
              <Marker position={this.state.currentPosition} 
                      onClick={() => alert('Esta es tu posición actual.')}
                      defaultIcon={UserIcon}
                      defaultTitle={'Ahora estás aqui'}
              />

            {
              this.state.markers.map((marker, index, array) => {  
                if (array.length > 0) {
                  return(
                    <Marker position={marker.ubicacion} 
                    key={index}
                    defaultIcon={PointerIcon}
                    defaultTitle={'Punto Recove'}
                    onClick={() => this.markerCliked(marker)}
                  />
                  )
                } else { return null }
              }) 
            }
            { modal }
            </GoogleMap>
            )
    }
}

const CustomSkinMap = withScriptjs(
  withGoogleMap(CustomMap)
);

function Maps ({...props}) {
    return (
      <CustomSkinMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSMQzZJ1s68VrvsMdJTzurtv-bPY57ZcI"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
export default Maps;

