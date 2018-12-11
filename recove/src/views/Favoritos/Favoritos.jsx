import React, { Component } from 'react';
import { Grid, Card, CardContent,Typography, CardActions, Modal  } from 'material-ui';
import { ItemGrid, RegularCard, ScrollList, P, TrackingMap, Button } from "components";
import axios from "../../axios.config";

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    marginBottom:10,
    height:400
  },
  appBar: {
    zIndex: 1200,
  },
  drawerPaper: {
    position: 'relative'
  },
  card:{
    width: '100%',
    marginTop:'20px'
  },
  img: {
    width: '100%',
    height: '70%'
  },
  containerMap: {
    width: '700px',
    height: '100%',
    margin: 'auto'
  }
}

export default class ClippedDrawer extends Component {

  state = {
    favoritos: null,
    itemSelected: null,
    showMap: false,
    idFavorito: null
  }

  //manejador cuando se hace click en un item de la lista:
  itemClickedHandler = (item) => {
    this.setState({
      itemSelected: item
    })
  }

  //manejador para visualizar el item en el mapa
  showMapHandler = () => { this.setState({ showMap: true }) }
  //manejador para ocultar el modal de mapa
  handleClose = () => { this.setState({ showMap: false}) }
//manejador para ocultar la previsualización
  handleClosePreview = () => { this.setState({ itemSelected: null})}

  componentDidMount() {
    if(localStorage.token){
      let token = localStorage.getItem('token')
      let config = {
        'accept': 'application/json',
         headers: {'Authorization': 'Bearer '+token}
      }
      axios.get('/favoritos-user', config)
      .then(response => { 
        this.setState({
            favoritos: response.data
          })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    let { favoritos, itemSelected, showMap } = this.state
    let preview, modal = null

    if (!favoritos) {
      return (<div>Cargando...</div>)
    }

     if (showMap) {
            modal = (<Modal
              open={showMap}
              onClose={this.handleClose}>
                    <div style={styles.containerMap}>
                    <TrackingMap destinationPointer={itemSelected.ubicacion}/>
                    </div>
                  </Modal>) 
          }

    if (itemSelected) {
      preview = (
              <div>
                <Card style={styles.card}>
                  <img style={styles.img} src={itemSelected.imagen} alt='not found'/>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h3">
                      Descripción: {itemSelected.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="info" 
                      onClick={() => this.showMapHandler(itemSelected.ubicacion)}>
                      Ver en el Mapa
                    </Button>
                  </CardActions>
                </Card>
              </div>
      )
    }

    return (
      <RegularCard
        cardTitle="Publicaciones de interés."
        headerColor='red'
        cardSubtitle={
          <P>Aquí se muestran las publicaciones que marcaste como de interés.</P>
        }
        content={
          <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            cardTitle="Elegiste éstas publicaciones como de interés:"
            cardSubtitle="Haz click en un ítem para ves los detalles."
            headerColor='green'
            content={
              <div>
                   {<ScrollList 
                      list={this.state.favoritos}
                      onItemClick={(item) => {this.itemClickedHandler(item)}}
                      onItemRemoved={this.handleClosePreview}
                      />}            
              </div>
            }
          />
        </ItemGrid>
              <ItemGrid xs={12} sm={12} md={6}>
              { preview }
              </ItemGrid>
          </Grid>
          {modal} 
          </div>
        }
      />
    );
  }
}
