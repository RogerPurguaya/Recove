import React, { Component } from "react";
import { Grid, FormControl, TextField } from "material-ui";
import { ProfileCard, RegularCard, Button, ItemGrid, CustomAlert } from "components";
import axios from "../../axios.config"
import avatarDef from "assets/img/faces/marc.jpg";

class UserProfile extends Component { 
  state = {
    nombre: '',
    email: '',
    direccion:'',
    celular:'',
    avatar:'',
    newAvatar:null,
    calificacion:'',
    usuario:'',
    showAlert: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value});
  };

  //manejador para boton de imagen
  fileSelectedHandler = (event) => {
    this.setState({ newAvatar: event.target.files[0] })
  }

  //manejador para mostrar alertas:
  onCloseAlert = () => {
    this.setState({showAlert: false})
  }
  
  //manejador para envío post del formulario.
  onSubmit = (event) => {
    event.preventDefault();   
    let formData = new FormData()
    formData.append('nombre', this.state.nombre)
    formData.append('direccion', this.state.direccion)
    formData.append('celular', this.state.celular)
    if (this.state.newAvatar !== null) {
      formData.append('avatar', this.state.newAvatar, this.state.newAvatar.name)
    }

    let config = {
   'accept': 'application/json',
   'Content-Type': `multipart/form-data`,
   headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
   }
   //truco raro xq no se reconoce this dentro de la promesa :(
    let show = () => {this.setState({showAlert:true})}

   axios.put('/usuarios', formData , config)
   .then(function (response) {
     show()
     console.log(response);
   })
   .catch(function (response) {
     console.log(response);
   });
 } 
   
componentDidMount() {
  if (localStorage.usuario) {
    let usuario = JSON.parse(localStorage.usuario)
    this.setState({
      usuario: usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      direccion: usuario.direccion,
      celular: usuario.celular,
      avatar: usuario.avatar,
      calificacion: usuario.calificacion
    })
  }
}
  render() {
  let avatar = this.state.usuario.avatar || avatarDef
  let alert = null
    if (this.state.showAlert) { 
      alert = (<CustomAlert 
                  title="Perfil Guardado."
                  content={`${this.state.nombre} ,Tus datos fueron actualizados satisfactoriamente.`}
                  open={this.state.showAlert}
                  onClose={this.onCloseAlert}
                  headerColor="green"
               />)
    }
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <RegularCard
            cardTitle="Mis datos"
            cardSubtitle="Si dessea modifique los siguientes campos"
            content={
              <div><form onSubmit={this.onSubmit} encType="multipart/form-data">
                <FormControl fullWidth>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                      <TextField
                        id="name"
                        label="Nombres"
                        value={this.state.nombre}
                        onChange={this.handleChange('nombre')}
                        fullWidth
                        margin="normal"
                      />
                  </ItemGrid>                  
                  <ItemGrid xs={12} sm={12} md={6}>
                      <TextField
                        id="dire"
                        label="Direccion"
                        value={this.state.direccion}
                        onChange={this.handleChange('direccion')}
                        fullWidth
                        margin="normal"
                      />
                  </ItemGrid>
                  
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <FormControl fullWidth disabled>
                      <TextField
                        id="email"
                        label="Email"
                        disabled={true}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        fullWidth
                        margin="normal"
                      />
                   </FormControl>
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                  <br/>
                    <FormControl fullWidth>
                      <TextField
                        id="celular"
                        label="Celular:"
                        value={this.state.celular}
                        onChange={this.handleChange('celular')}
                        fullWidth
                        margin="normal"
                      />
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                      <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        name="avatar"
                        onChange={this.fileSelectedHandler}
                      />
                      <label htmlFor="raised-button-file"><br/>
                        <Button variant="raised" size="large" color="info" component="span">
                          Avatar
                        </Button>
                      </label>
                  </ItemGrid>
                </Grid>
                <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <input type="submit"
                           id="raised-button-send"
                           style={{display: 'none'}}
                    />
                    <label htmlFor="raised-button-send"><br/>
                      <Button type="submit" variant="raised" size="large" color="primary" component="span">
                        Actualizar Perfil
                      </Button>
                    </label>
                  </ItemGrid>
                </Grid>
                </FormControl>
                </form>
                {alert}
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={avatar}
            subtitle={this.state.nombre}
            title={this.state.email}
            description="Gracias por unirte a recove"
            footer={
              <Button color="primary" round>
                {this.state.calificacion + ' '} ESTRELLAS
              </Button>
            }
          />
        </ItemGrid>
      </Grid>
      
    </div>
  );
}
  }
export default UserProfile
