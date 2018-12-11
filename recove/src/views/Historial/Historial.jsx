import React,{Component} from "react";
import { Grid } from "material-ui";
import { RegularCard, ItemGrid, Button, CustomAlert } from "components";
import axios from "../../axios.config"
import { Table, TableCell, TableBody, TableRow, TableHead } from "material-ui"

const styles = {
  tableCell: {
    color: 'orange',
    fontSize: '20px'
  },
  img: {
    width: '90px',
    heigth: '75px'
  }
}

class Historial extends Component {
  state={
      publicaciones : [],
      showAlert:false,
      showSuccess: false,
      idItemSelected:null
  }

  onCloseAlert = () => {
    this.setState({showAlert: false, showSuccess: false})
  }
 
  itemRemoveHandler = (e) => {
     this.setState({
      idItemSelected: e.target.value,
      showAlert: true
    }) 
  }

 //manejador para eliminación de publicación
  deleteHandler = () => {
  let id = this.state.idItemSelected
  let config = {
    'accept': 'application/json',
     headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
  } 
  axios.delete('/publicaciones/'+id, config)
    .then(response => {
      this.setState({
        showSuccess: true
      }) 
      document.getElementById(id).remove()
    })
    .catch(error => {
      console.log(error)
    }) 
}

componentDidMount() { 
  let config = {
    'Content-Type': 'application/json',
    headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
  }
  axios.get('/historial/usuario', config)
    .then(response => {
      this.setState({
        publicaciones: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
}

  render(){
  const tableHead = ['Fecha','Tipo','Descripción','Categoría','Imagen','Acciones']
  let alert, alert2 = null 
  let {idItemSelected, showSuccess, showAlert} = this.state
    if (showAlert && idItemSelected !== null) { 
      alert = (<CustomAlert 
                  title="¿Estás seguro de eliminar esta publicación?"
                  content={`Esta publicación se eliminará permanentemente de Recove. Pulsa en aceptar para confirmar esto.`}
                  headerColor="red"
                  open={this.state.showAlert}
                  onClose={this.onCloseAlert}
                  onAcceptClick={this.deleteHandler}
                  alertType="confirm"
               />)
    }
    if (showSuccess) {
      alert2 = (<CustomAlert 
                  title="Publicación eliminada correctamente."
                  content={`Esta publicación se ha eliminado permanentemente de Recove. Pulsa en aceptar para seguir.`}
                  headerColor="green"
                  open={this.state.showSuccess}
                  onClose={this.onCloseAlert}
              />)
    }
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          plainCard
          headerColor="orange"
          cardTitle="Acciones que ayudan al planeta"
          cardSubtitle="Historial de reciclaje"
          content={
            <Table>
            <TableHead>
              <TableRow>
                { tableHead.map((item, i) => {
                return <TableCell key={i}><p style={styles.tableCell}>{item}</p></TableCell>
                }) }
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.publicaciones.map((p, i) => {
                let fecha = new Date(p.fecha)
                return (
                  <TableRow key={i} id={p._id}>
                    <TableCell>
                      {`${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`  }
                    </TableCell>
                    <TableCell>{p.tipo}</TableCell>
                    <TableCell>{p.descripcion}</TableCell>
                    <TableCell>{p.categorias[0].nombre}</TableCell>
                    <TableCell>
                      <img src={p.imagen} alt="not found" style={styles.img}/> 
                    </TableCell>
                      <TableCell>
                          <input
                              id={p.fecha} 
                              style={{display: 'none'}}
                              defaultValue={p._id}
                              onClick = {this.itemRemoveHandler}
                          />
                          <label htmlFor={p.fecha}>
                            <Button type="submit" variant="raised" size="large" color="danger" component="span">
                              Eliminar
                          </Button>
                          </label>
                      </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          }
        />
      </ItemGrid>
      {alert}
      {alert2}
    </Grid>
  );
}
  }
export default Historial;
