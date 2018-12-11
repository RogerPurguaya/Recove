import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField } from 'material-ui';
import { CustomAlert } from "components"
import axios from "../../axios.config"

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'white'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
});
const color = { background:'red',color: 'white', };

class TextFields extends React.Component {
    state = {
        name: '',
        direccion: '',
        email: '',
        pass: '',
        cell: '+51',
        showAlert: false
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onCloseAlert = () => {
        this.setState({showAlert: false})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            'nombre': this.state.name.trim(),
            'direccion': this.state.direccion.trim(),
            'email': this.state.email.trim(),
            'password': this.state.pass.trim(),
            'celular': this.state.cell.replace('+51','').trim()
        }
        let config = {
            'accept': 'application/json'
        }
        axios.post('/signUp',data,config)
        .then(response => {
            this.setState({showAlert: true})
        })
        .catch(error => {
            console.log(error)
        })
    
    }
    render() {
        const { classes } = this.props;

        let alert = null, { showAlert } = this.state
        if (showAlert) { 
          alert = (<CustomAlert 
                      title="Registro Exitoso !!"
                      content={`Enbuenahora ${this.state.name}! tu registro fué guardado correctamente ¡Gracias por unirte a Recove!`}
                      open={showAlert}
                      onClose={this.onCloseAlert}
                      headerColor="green"
                   />)
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                    <TextField 
                        required
                        id="name"
                        label="Nombres"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        required
                        id="direccion"
                        label="Dirección"
                        className={classes.textField}
                        value={this.state.direccion}                    
                        onChange={this.handleChange('direccion')}                    
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        required
                        id="cell"
                        label="Celular"
                        className={classes.textField}
                        value={this.state.cell}
                        onChange={this.handleChange('cell')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}  
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        required
                        id="pass"
                        label="Contraseña"
                        className={classes.textField}
                        type="password"
                        value={this.state.pass}
                        onChange={this.handleChange('pass')}
                        margin="normal"
                        fullWidth
                    />
                     <center>
                <input type="submit"
                       id="raised-button-signUp"
                       style={{display: 'none'}}
                    />
                    <label htmlFor="raised-button-signUp">
                    <Button type="submit" variant="raised" size="large" color="success" component="span" style={color}
                    >
                        Registrarme
                     </Button>
                    </label>                    
                </center>
                </form>
                <br/>
                <br/>
                {alert}
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);