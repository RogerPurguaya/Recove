import React from 'react';
import { Card, CardContent, Typography } from 'material-ui';
import Form from './Form.jsx'

const styles = {
    card: {
        maxWidth: 400,
        color: 'white'        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        color: 'white'
    },
};
const gorun = { background:'#F44336'}
const Registrar = (props) => (
    <div>
        <center>
            <Card style={styles.card}>
                <CardContent>
                    <div style={gorun}>
                        <Typography variant="headline" component="h2" style={styles.pos}>
                            ¡¡¡Regístrate!!!
                     </Typography>
                        <Typography style={styles.pos} color="textSecondary">
                            Llena el siguiente formulario
                     </Typography>
                    </div>
                    <Typography component="p" style={styles.pos}>
                        <Form />
                    </Typography>
                    <br/>
                </CardContent>
            </Card>
        </center>
    </div>
);
export default Registrar;