import React from "react";
import {Grid,FormControl ,TextField ,Select, MenuItem,InputLabel,Input} from "material-ui";
import { RegularCard, A, P, Button, ItemGrid, CustomAlert,GeoMap,PreviewImage} 
from "components";
import  axios  from "../../axios.config";
import io from "socket.io-client"
import { DOMAIN_API } from "../../axios.config"
class Publications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
      tipo: '',
      categorias: '', //select categorias.
      lat: '0.00000',
      lng: '0.00000',
      imagen: null,
      imagePreviewUrl: '', //previsualización de imagen
      arrayCats: [], //categorias disponibles desde la BD
      showAlert:false
    };
  }

  //manejador para cambiar los input de lat y lng:
 ubicacionChangeHandler = (latlng) => {   
  this.setState({
      lat: latlng.lat.toFixed(9), //recortamos los decimales a 9.
      lng: latlng.lng.toFixed(9) //recortamos los decimales a 9.
    })
 }

 //manejador para inputs de descripcion, tipo y categorias
  handleChange = event => { this.setState({ [event.target.name]: event.target.value });}

  //manejador para mostrar notificaciones:
  onCloseAlert = () => { this.setState({showAlert: false})}

  //manejador de sockets:
  handleSockets = (data) => {
  this.socket.emit('new-publicacion', {publicacion: data})
  } 
  //manejador para previsualización de imagen
  fileSelectedHandler = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagen: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  //manjador para envío post del formulario.
  onSubmit = (event) => {
   event.preventDefault();
   let formData = new FormData()
   formData.append('lat', this.state.lat)
   formData.append('lng', this.state.lng)
   formData.append('descripcion', this.state.descripcion)
   formData.append('tipo', this.state.tipo)
   formData.append('categorias', this.state.categorias)
   formData.append('imagen', this.state.imagen, this.state.imagen.name)
   let config = { 'accept': 'application/json','Content-Type': `multipart/form-data`, headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}} 
  
  axios.post('/publicaciones',formData,config)
  .then((response)  => {
    this.setState({showAlert:true});
    this.handleSockets(this.state.descripcion)
  })
  .catch((error) =>  {
    console.log(error);
  }); 
} 

//Despues del montado hacemos la petición de categorías:
 componentDidMount(){
   let config = { 'accept': 'application/json',
   headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}
   axios.get('/categorias', config)
   .then((response) => {
      let data = response.data
      this.socket = io.connect(DOMAIN_API)
      this.setState({
        arrayCats: data
      })
   })
   .catch((error) => {
      console.log(error)
   })
 }
 
  render() {
    let alert = null, { showAlert } = this.state
    if (showAlert) { 
      alert = (<CustomAlert 
                  title="Publicación satisfactoria."
                  content={`Enbuenahora! Se ha guardado correctamente tu publicación de tipo ${this.state.tipo} ¡Gracias por publicar en Recove!`}
                  open={showAlert}
                  onClose={this.onCloseAlert}
                  headerColor="green"
                  
               />)
    }

    return (
      <RegularCard
        cardTitle="Publicaciones"
        headerColor='orange'
        cardSubtitle={
          <P> Las publicaciones que realizes se mostrarán en el{" "}
            <A target="_blank" href="http://localhost:3000/mapa">mapa</A>{" "}
            de puntos Recove.{" "}
          </P>
        }
        content={
          <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            cardTitle="Datos de tu publicación"
            cardSubtitle="Es necesario llenar todos los campos que contienen: (*)"
            headerColor='green'
            content={
              <div><br/>
              <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data">
              <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="catId">Categoría:</InputLabel>
                      <Select
                        value={this.state.categorias}
                        onChange={this.handleChange.bind(this)}
                        inputProps={{
                          name: 'categorias',
                          id: 'catId',
                        }}
                      >
                      {
                      this.state.arrayCats.map((item, key) => {
                        return(<MenuItem key={key} value={item._id}>{item.nombre}</MenuItem>)
                        })
                      }
                      </Select>
                    </FormControl>
                  </ItemGrid>
                
                  <ItemGrid xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="tipoId">Tipo:</InputLabel>
                    <Select
                        value={this.state.tipo}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'tipo',
                          id: 'tipoId',
                        }}
                      >
                        <MenuItem value={'gratis'}>Gratis</MenuItem>
                        <MenuItem value={'venta'}>Venta</MenuItem>
                      </Select>
                    </FormControl>
                  </ItemGrid>
                </Grid> 
                <br/><br/>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                      <TextField
                        id="descripcion"
                        label="Descripción de los reciclables:"
                        name="descripcion"
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </ItemGrid>
                </Grid>
                <br/>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                      <Input
                        value={this.state.lat}
                        disabled
                        name="lat"
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                      <Input
                        value={this.state.lng}
                        disabled
                        name="lng"
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </ItemGrid>
                </Grid><br/>
                <Grid container> 
                <ItemGrid xs={12} sm={12} md={6}>
                  <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    name="imagen"
                    onChange={this.fileSelectedHandler}
                  />
                  <label htmlFor="raised-button-file">
                  <Button variant="raised" size="large" color="info" component="span">
                    Imagen
                  </Button>
                  </label>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <input type="submit"
                           id="raised-button-send"
                           style={{display: 'none'}}
                    />
                    <label htmlFor="raised-button-send">
                      <Button type="submit" variant="raised" size="large" color="success" component="span">
                        Publicar
                    </Button>
                    </label>
                  </ItemGrid>
                </Grid>
              </form>
              <br/>
              <PreviewImage
               imagePreviewUrl={this.state.imagePreviewUrl}
              />
              {alert}                
              </div>
            }
          />
        </ItemGrid>
              <ItemGrid xs={12} sm={12} md={6}>
                <p>Ahora arrastra el marcador hasta el lugar donde deseas registrar tu publicación</p>
                <GeoMap 
                 googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSMQzZJ1s68VrvsMdJTzurtv-bPY57ZcI"
                 loadingElement={<div style={{ height: `100%` }} />}
                 containerElement={<div style={{ height: `100vh` }} />}
                 mapElement={<div style={{ height: `100%` }} />}
                 onMarkerChanged={(latlng) => {this.ubicacionChangeHandler(latlng)}}
                />
              </ItemGrid>
            </Grid>
            <br />
            <br />  
          </div>
        }
      />
    );
  }
}

export default Publications;
