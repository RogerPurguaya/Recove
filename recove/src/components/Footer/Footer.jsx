import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, withStyles } from "material-ui";

import footerStyle from "assets/jss/material-dashboard-react/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
            <p className={classes.inlineBlock}>
                Recove
            </p>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <p className={classes.inlineBlock}>
              Fanpage
              </p>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <p className={classes.inlineBlock}>
                Cambiando al mundo
              </p>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <p className={classes.inlineBlock}>
                Recicla
               </p>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
              Recove , Recicla, compra y vende.
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
