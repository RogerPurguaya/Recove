import React from 'react';
import { Card, CardContent, CardMedia, Typography } from 'material-ui';

const styles = {
    card: {
        maxWidth: 'auto',
    },
    media: {
        height: 'auto',
        paddingTop: '56.25%', // 16:9
    },
};

const SimpleMediaCard = (props) => (
    <div>
        <Card style={styles.card}>
            <CardMedia
                style={styles.media}
                image={props.img}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {props.titulo}
                </Typography>
                <Typography component="p" >
                        {props.cuerpo}
                </Typography>
            </CardContent>
        </Card>
    </div>
)

export default SimpleMediaCard;