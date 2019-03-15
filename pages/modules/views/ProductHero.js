import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'http://i.imgur.com/uNn7tqw.png';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    width: 200,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.warning.main,
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
  },
  cardContent: {
    maxWidth: 400,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ProductHero extends React.Component {

  state = {
    open: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render () {
    const { classes } = this.props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Bet On Your Skills
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        GGChamp is a peer-to-peer website that allows players to bet against each other on their own terms
      </Typography>
      <div className={classes.card}>
              <form onSubmit={this.handleSubmit} className={classes.cardContent}>
                <TextField noBorder className={classes.textField} placeholder="Your email" />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  JOIN OUR BETA
                </Button>
              </form>
            </div>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Terms and Conditions Apply
      </Typography>
      <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          message="We will send you an invitation to our Beta!"
        />
    </ProductHeroLayout>
  );
  }
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
