import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText } from "material-ui"
import { Button, RegularCard } from "components"

class AlertDialog extends React.Component {
  state = {
    open: this.props.open,
  };

  handleClose = () => {
    this.props.onClose()
  };

  handleAccept = () => {
    this.props.onAcceptClick()
    this.setState({open: false})
  }

  render() {
    const {title, content, headerColor, alertType} = this.props
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <RegularCard 
        cardTitle= {title}
        headerColor={headerColor}
        content={<div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {alertType === 'confirm' ? (<div><Button size="small" onClick={this.handleClose} color="danger">
              Cancelar
            </Button>
            <Button size="small" onClick={this.handleAccept} color="success">
              Aceptar
            </Button></div>) : (<div>
              <Button size="small" onClick={this.handleClose} color="success">
              Aceptar
            </Button>
            </div>)}
          </DialogActions>
          </div>
        }
        />
           
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;