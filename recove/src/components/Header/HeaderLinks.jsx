import React from "react";
import { withStyles, IconButton, MenuItem,Menu, Avatar } from "material-ui";
import { Notifications, Person, Power, DeleteForever } from "@material-ui/icons";
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import { Redirect} from "react-router-dom"
import { DOMAIN_API } from "../../axios.config"
import io from "socket.io-client"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar:{margin: '10', width: 30, height: 30,}
};


class HeaderLinks extends React.Component {
  state = {
    anchor  : null,
    anchor2 : null,
    redirect: false,
    usuario :'',
    notifications: []
  };
  
//------------------
//manejador para cuando se clickea un icono, se setea y luego se hace visible
// sirve para cualquier icono dependiendo el value que tenga
handleMenu = event => {
  let anchor = event.currentTarget.value
  this.setState({ [anchor]: event.currentTarget });
};
//manejador de cierres:
handleClose = () => { 
  this.setState({ anchor: null, anchor2: null });
};

//manejador de cierre de sesión:
  handleExit = () => {
    localStorage.clear()
    this.setState({ redirect: true})
  };

  cleanAll = () => {
    this.setState({notifications: []})
    this.handleClose()
  }

  /* handleSockets = () => {
    this.socket.emit('new-publicacion', {publicacion: 'tienes una nueva publicacion'})
  } */

  componentDidMount() {
    if (localStorage.usuario) {
      this.setState({ usuario: JSON.parse(localStorage.usuario)})
      this.socket =  io.connect(DOMAIN_API)
      this.socket.on('new-notification', data => {
        this.setState({
      notifications: [data.publicacion,...this.state.notifications] //agregamos la nuev notif.
      })
    })
    }
  }

  render() {
    let { redirect } = this.state;
    if (redirect) { return <Redirect  to="/" /> }
    let { anchor, anchor2, usuario, notifications } = this.state;
    const { classes } = this.props;
    let open = Boolean(anchor), open2 = Boolean(anchor2);
    let nombre = usuario.nombre || 'User', nro = notifications.length || null

    return (
      <div>
      <IconButton
        value="anchor"
        aria-owns={open ? 'menu-notifications' : null}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <Notifications className={classes.links}/>
        {nro ? (<span className={classes.notifications}>{nro}</span>) : null}
      </IconButton>
      
      <Menu
        id="menu-notifications"
        anchorEl={anchor}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={open}
        onClose={this.handleClose}
      >
        <MenuItem> 
        {nro ? (<div>¡Notificaciones nuevas!
                <IconButton color="secondary" onClick={this.cleanAll}>
                <DeleteForever />
                </IconButton></div>) : "No hay nuevas notificaciones."} 
        </MenuItem>
       {
        notifications.map((item, i) => {
          //console.log('items en map: ',item)
           return (
            <MenuItem 
            key={i}
            onClick={this.handleClose}
            className={classes.dropdownItem}
            >
              <Notifications />{item.publicacion}
            </MenuItem> 
          ) 
        })
      } 
        
      </Menu>

      <IconButton
        value="anchor2"
        aria-owns={open2 ? 'menu-user' : null}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
      <Avatar alt="U" src={usuario.avatar} style={styles.avatar} onClick={this.handleClose}/>
      </IconButton>
      <Menu
        id="menu-user"
        anchorEl={anchor2}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        transformOrigin={{ vertical: 'top', horizontal: 'right'}}
        open={open2}
        onClose={this.handleClose}
      >
        <MenuItem 
        onClick={this.handleClose}
        className={classes.dropdownItem}>
         <Person />{nombre.split(' ')[0].toUpperCase()}
        </MenuItem>
        <MenuItem 
        onClick={this.handleExit}
        className={classes.dropdownItem}>
        <Power />Cerrar Sesión
        </MenuItem>
      </Menu>
    </div>
    )
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
 