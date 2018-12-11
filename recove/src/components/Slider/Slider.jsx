import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MobileStepper, Paper, Typography, Button  } from 'material-ui';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import c1 from '../../assets/img/c1.JPG'
import c2 from '../../assets/img/c2.jpg'
import c3 from '../../assets/img/c3.jpg'

const tutorialSteps = [
    {
        label: 'Podrás observar en un mapa todos los Puntos Recove.',
        imgPath: c1,
    },
    {
        label: 'Publica tus materiales en Recove para que la comunidad pueda verlos.',
        imgPath: c2,
    },
    {
        label: 'Observa el detalle de los puntos Recove.',
        imgPath: c3,
    },
];

const styles = theme => ({
    root: {
        maxWidth: 800,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        marginBottom: 20,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 500,
        maxWidth: 800,
        overflow: 'hidden',
        width: '100%',
    },
});

class SwipeableTextMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;

        const maxSteps = tutorialSteps.length;

        return (
            <center>
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}>
                        <Typography>{tutorialSteps[activeStep].label}</Typography>
                    </Paper>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.activeStep}
                        onChangeIndex={this.handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map(step => (
                            <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
                        ))}
                    </SwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                                Siguiente
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Atras
            </Button>
                        }
                    />
                </div>
                <br/>
                <br/>
            </center>
            
        );
    }
}

SwipeableTextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);