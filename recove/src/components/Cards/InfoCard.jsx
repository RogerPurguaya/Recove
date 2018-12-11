import React, { Component } from 'react';
import { Button, CustomSnackBar }from "components"
import {Snackbar, Card, CardActions, CardContent, CardMedia, Typography} from 'material-ui'
import axios from "../../axios.config"

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  container: {
    position: 'absolute',
    top:'15%',
    left:'38%'}
};

export default class SimpleMediaCard extends Component {
  /* const { classes, data } = props; */
  state = {
    showAlert: false
  } 
  
  //manejador para ostar alerta de éxito:
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showAlert: false });
  };

  //manejador para guardar como favorita la publicación.
  onButtonClick = (id) => {
    let usuario = localStorage.usuario && JSON.parse(localStorage.usuario)
    if(usuario){
      let data = { idPublicacion: id }
      let config = { 'Content-Type': 'application/json',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}
      axios.post('/favoritos',data,config)
      .then(response => {
        this.setState({ showAlert:true })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    let { data } = this.props, { showAlert } = this.state, alert = null
    if (showAlert) {
      alert = (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={showAlert}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <CustomSnackBar
            onClose={this.handleClose}
            variant="success"
            message="¡Se Agregó a tu lista de favoritos!"
          />
        </Snackbar>
      )
    }
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            image={ data.imagen }
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h3">
              Descripción: {data.descripcion}
            </Typography>
            {console.log(data)}
            <Typography component="p">
              {`Tipo:      ${data.tipo}`}<br/>
              {`Fecha:     ${data.fecha}`}<br/>
              {`Estado:    ${data.estado}`}<br/>
              {`Usuario:   ${data.id_usuario.email}`}<br/>
              {`Categoria: ${data.categorias[0].nombre}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" 
            color="success" 
            onClick={() => this.onButtonClick(data._id)}
            >
              Agregar a intereses
            </Button>
          </CardActions>
        </Card>
        {alert}
      </div>
    );
  }
}
