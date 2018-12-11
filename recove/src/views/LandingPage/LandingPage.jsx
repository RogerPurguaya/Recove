import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { Modal } from "material-ui";
import  AppBar  from "components/AppBar/AppBar.jsx";
import Login from "../Login/Login.jsx"
import Landing from './LandingPage2.jsx';

export default class LandingPage extends Component {
    state = {
        showModal: false,
        auth: false
    }

    handleAuth = (auth) => {
        this.setState({auth: true})
    }

    handleClose = () => {
        this.setState({ showModal: false });
      };
    
    changeShowModal = () => {
        this.setState({ showModal: true })
    }
    handleClick = () => {
        alert('Has aceptado el modal')
    }

    render() {

        if (this.state.auth) {
            return  <Redirect to='/home/historial'/>
        } 
        return(<div>
            <AppBar onLoginClick={this.changeShowModal}/>
            <Modal
              open={this.state.showModal}
              onClose={this.handleClose}>
                  <Login onAuth={(auth) => {this.handleAuth(auth)}}/> 
            </Modal>
            <Landing />
            </div> )
        }
}