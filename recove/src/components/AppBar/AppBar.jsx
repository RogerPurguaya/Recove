import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';
import { Person } from "@material-ui/icons"
import { Button } from "components"

const styles = {
  root: {
    flexGrow: 1,
  },
   color: {
     background: 'linear-gradient(45deg, #009688 30%, #80CBC4 90%)',
  },
  flex: {
    
    flex: 10,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 50,
  },
};

export default class ButtonAppBar extends React.Component {
  
  showModal = () => {
    this.props.onLoginClick()
  }

  render(){
    return (
      <div style={styles.root}>
        <AppBar position="static" style={styles.color}>
          <Toolbar >
            <Typography variant="title" color="inherit" style={styles.flex}>
              RECOVE
            </Typography>
            <div onClick={this.showModal}>
              <Button color="white"><Person />Ingresar </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  }
  
