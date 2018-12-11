import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {
  withStyles, AppBar, Tabs, Tab, Typography, Grid,
} from 'material-ui';
import Slider from '../../components/Slider/Slider.jsx'
import { ItemGrid } from "components";
import Nosotros from '../../components/Slider/Nosotros.jsx'
import mision from "../../assets/img/mision.JPG"
import vision from "../../assets/img/vision.JPG"
import valores from "../../assets/img/valores.JPG"
import back from "../../assets/img/back.jpg"
import Registrar from '../Login/Registrar.jsx'

const style = {
  color: {
    background: 'linear-gradient(45deg, #009688 30%, #80CBC4 90%)',
  },
  centrado: {
    justify: 'center',
  }
};
function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
   backgroundImage:`url(${back})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat:'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
  },
});

const redondo = { height: '300px', width: '300px', backgroundRepeat: 'no-repeat', backgroundPosition: '50%', borderRadius: '50%', backgroundSize: '100% auto', verticalAlign: 'text-bottom', position: 'relative', display: 'inline' };
const PcontImgText = { width: '1024px', height: 'auto', position: 'relative', margin: 'auto' };
const contImgText = { width: '335px', height: 'auto', position: 'relative', display: 'inline-block', verticalAlign: 'top', overflow: 'hidden' };
const ImgText = { height: 'auto', textAlign: 'center', color: 'white' };

class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
    password: '',
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  haChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={style.color}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="inheret"
            textColor="inheret"
            centered
          >
            <Tab label="¡Bienvenido!" />
            <Tab label="Nuestro valores" />
            <Tab label="¿Quiénes somos?" />
            <Tab label="Registrate" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Slider />
            <center>
              <div style={PcontImgText}>
                <div style={contImgText}>
                  <img style={redondo} src="https://premium.wpmudev.org/wp-content/uploads/2011/04/Google-Maps.png" alt="not found" />
                  <h4 style={ImgText}>Mapa</h4>
                  <p style={ImgText}>Busque los productos desde un mapa</p>
                </div>
                <div style={contImgText}>
                  <img style={redondo} src="https://cf-cdn.gananci.com/wp-content/uploads/2015/11/Hombre-reciclado-619x346.jpg" alt="not found" />
                  <h4 style={ImgText}>Recicla</h4>
                  <p style={ImgText}>Recicla tus produtos y cuida el medio ambiente</p>
                </div>
                <div style={contImgText}>
                  <img style={redondo} src="http://static.iris.net.co/finanzas/upload/images/2016/11/23/70653_1.jpg" alt="not found" />
                  <h4 style={ImgText}>Gana</h4>
                  <p style={ImgText}>Gana vendiendo tus productos de reciclaje</p>
                </div>
              </div>
            </center>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <center>
              <ItemGrid xs={12} sm={12} md={6}>
                <Nosotros titulo="Valores" img={valores} cuerpo="Los valores que guían el que hacer diario de la empresa son la seguridad, innovación, excelencia, ética, eficiencia y compromiso. Seguridad porque velamos por la integridad de las personas y el cuidado del medio ambiente. Innovación porque innovamos constantemente en todos los ámbitos de recove para agregar   valor a nuestros servicios. Excelencia porque procuramos siempre superar las expectativas de nuestros usuarios. Ética porque nos comportamos de manera correcta ante otras personas. Eficiencia porque somos eficientes en el uso de los recursos. " />
              </ItemGrid>
            </center>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={6}>
                <Nosotros titulo="Misión" img={mision} cuerpo="Conscientizar y educar a todas las personas sobre la importancia de cuidar el medio ambiente bajo la participación de los usuarios los cuales deberán tener un pensamiento ecológico para reciclar. A su vez gestionar residuos de una manera sostenible para poder ser transformados en recursos que no generen valor y repercutan en una mayor calidad de vida de las personas a través de la aplicación web. Generar trabajos temporales para personas desempleadas, proporcionandole todo la facilidad de reciclaje." />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={6}>
                <Nosotros titulo="Visión" img={vision} cuerpo="Ser la primera organización sin fines de lucro que establece una arraigada cultura ecológica emergida desde la base de la sociedad. Construyendo en ella una conciencia ambientalista que reconozca la trascendental acción del ser humano en el cuidado del planeta. Promoviendo esta nueva actividad de reciclaje mediante la aplicación y poder minimizar la cantidad de residuos que afectan al medio ambiente. De esta forma buscamos ser reconocidos con una organización fundamental que agrega valor a la sociedad." />
              </ItemGrid>
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Registrar />
          </TabContainer>

        </SwipeableViews>
      </div>
    );
  }
}
FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);