import React from 'react';
import { List, ListItem, ListItemText, Avatar, Button, Snackbar } from 'material-ui';
import { CustomSnackBar } from "components"
import { Delete } from "@material-ui/icons"
import axios from "../../axios.config"
//import styles from "./ScrollList.css" necesara congifuracion de css loader
//import io from "socket.io-client"
const styles = {
    root: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 350
    },
    listSection: {
        backgroundColor: '#ffff80',
        marginBottom:'10px'
    },
    ulSection: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    avatar:{
       margin: 10, width: 60, height: 60 
      },
    container:{
      width: '100%', cursor: 'pointer'
    },
    imgContainer:{
      width: '20%', float:'left' 
    },
    textContainer:{
      width: '80%', float:'left', marginTop:'25px', textAlign: 'center'
    }
}

class ScrollList  extends React.Component{
  
  state = {
    showSnackBar: false
  }
  
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showSnackBar: false });
  };

  //manejador para remover el item de la lista:
  deleteHandler = (id, removed) => {
    let config = { 'Content-Type': 'application/json',
    headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}
    axios.delete('/favoritos/'+id, config)
    .then(response => {
      this.setState({showSnackBar: true}) // para mostrar la notificación.
      document.getElementById(removed).remove() //removeos el item de la lista.
      this.props.onItemRemoved() // borramos la previsualización en el padre.
    })
    .catch(error => {
      console.log(error)
    })
  }

  //manejador para cuando se haga click en un item 
  // y envíe el estado al componente padre:
  onItemClickHandler = (item) => {
    this.props.onItemClick(item)
  }

  render() {
    let { list } = this.props
    let alert = null , { showSnackBar } = this.state;
    if (showSnackBar) {
      alert = (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <CustomSnackBar
            onClose={this.handleClose}
            variant="warning"
            message="Se quitó de tu lista de favoritos!"
          />
        </Snackbar>
      )
    }
    return (
    <List style={styles.root}>
      {list.map((item, i) => {
        let publicacion = item.idPublicacion || null
        return (<ListItem 
            key={i}
            id={i}
            style={styles.listSection} 
            >
            { publicacion ? (<div style={styles.container} onClick={() => this.onItemClickHandler(publicacion) }>
            <ListItemText>
              <div style={styles.imgContainer} ><Avatar alt="not found" src={publicacion.imagen} style={styles.avatar} /></div>
              <div style={styles.textContainer}>{publicacion.descripcion}</div>
            </ListItemText></div>) : (<div style={styles.container}>Esta publicación ya no esta disponible.</div>) }
              
              <Button variant="fab" aria-label="delete" 
              color="secondary"
              onClick={() => {this.deleteHandler(item._id, i)}}
              >
                <Delete />
              </Button>
            </ListItem>
          )})}
        {alert}
    </List>
  );
  }
}

export default ScrollList;