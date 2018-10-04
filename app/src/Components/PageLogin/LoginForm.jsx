import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      redirectToReferrer: false
    };
  }

  render() {
    // const {classes} = props;
    const { email, password, redirectToReferrer } = this.state;
    const { classes } = this.props;
    /**
     * Редирект в случае успешной авторизации
     */
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        {/* <form className={classes.form}> */}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="raised"
          color="primary"
          className={classes.submit}
        >
          Войти
            </Button>
        {/*  </form> */}
      </React.Fragment>
    )
  }

  _confirm = async data => {
    console.log('--- login');
    console.log(data);
    const login = data.login;
    /* this._saveUserData(login); */
    this.setState({ redirectToReferrer: true });
  };

  /*   _saveUserData = token => {
      localStorage.setItem(AUTH_TOKEN, token);
    } */
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LoginForm);