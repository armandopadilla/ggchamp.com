import React from 'react';
import PropTypes from 'prop-types';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'http://i.imgur.com/uNn7tqw.png';

const url = 'https://ggchamp.us20.list-manage.com/subscribe/post?u=afa1370e4992538f5dc578b0c&amp;id=48f30c6477';

const CustomForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <div
      style={{
        background: "#ffc071",
        borderRadius: 2,
        padding: 10,
        display: "inline-block"
      }}
    >
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        style={{ fontSize: "2em", padding: 5 }}
        ref={node => (name = node)}
        type="text"
        placeholder="Name"
      />
      <br />
      <input
        style={{ fontSize: "2em", padding: 5 }}
        ref={node => (email = node)}
        type="email"
        placeholder="Email"
      />
      <br />
      <button style={{ fontSize: "2em", padding: 5 }} onClick={submit}>
        Sign up for our Beta!
      </button>
    </div>
  );
};

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
        League of Legends™ Peer-to-Peer Betting
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        GGChamp is a peer-to-peer website that allows players to bet against each other on their own terms
      </Typography>
      <div className={classes.card}>
      <div>
        {/* <MailchimpSubscribe url={url} /> */}
        {/* <h2>Custom Form</h2> */}
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
</div>
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
