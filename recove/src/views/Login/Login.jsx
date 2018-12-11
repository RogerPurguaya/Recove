import React from "react";
import { Grid,TextField, Card } from "material-ui";
import axios from "../../axios.config"
import { RegularCard, Button, ItemGrid } from "components";

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

class Login extends React.Component {
  state = {
    email: '',
    pass: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  //manejador de submit:
  onSubmit = (event) => {
    event.preventDefault()
    /* let data = new FormData()
    data.append('email', this.state.email)
    data.append('password', this.state.pass) */
     
    let data = {
      email: this.state.email,
      password: this.state.pass
    }
    
    let config = { 'Content-Type': `application/json`}

    axios.post('/signIn', data , config)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('usuario',JSON.stringify(response.data.usuario))
        this.props.onAuth(true)
      })
      .catch(error => {
        console.log(error)
      })

  }

  render() {

      return (<div style={styles.container}>
      <Card styles={styles.card}>
      <form onSubmit={this.onSubmit} encType="multipart/form-data" >
      <center>
      <Grid container >
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Inicia Sesión"
            cardSubtitle="Completa los siguientes campos"
            content={
              <div>
                <Grid container >
                  <ItemGrid xs={12} sm={12} md={12}>
                    <TextField
                      id="name"
                      label="Name"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                  </ItemGrid>
                </Grid>
                <Grid container >
                  <ItemGrid xs={12} sm={12} md={12}>
                    <TextField
                      id="password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      onChange={this.handleChange('pass')}
                      margin="normal"
                    />
                  </ItemGrid>
                </Grid>
                <Grid container >
                  <ItemGrid xs={12} sm={12} md={12}>
                  <input type="submit" id="raised-button-login" style={{display: 'none'}}/>
                    <label htmlFor="raised-button-login">
                      <Button type="submit" variant="raised" size="large" color="success" component="span">
                        Entrar
                      </Button>
                    </label>
                  </ItemGrid>
                </Grid>
              </div>
            }
          />
        </ItemGrid>
      </Grid>
      </center>
      </form>
     </Card>  
      
    </div>
      )
    }
}
export default Login;
