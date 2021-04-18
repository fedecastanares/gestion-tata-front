import React, {useContext, useState} from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, CircularProgress, Grid, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DataContext } from '../../context/dataContext';
import UserService from '../../services/UserService';
import Message from '../Message';
import Logos from '../Logos';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({history}) {

  const classes = useStyles();
  const User = new UserService();
  const {setauth, setError} = useContext(DataContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [loading, setloading] = useState(false);


  const handleSubmit = e => {
    setloading(true);
    e.preventDefault();
    const validate = User.loginValidate(user, setError);
    if (validate) {
      const login = async (user) => {
        const successfull = await User.login(user.email.toLowerCase(), user.password);
        if (successfull){
          setauth(true);
          setError(false)
          history.push('/');
        } else {
          setError({severity : 'warning', message: "Usuario o contraseña invalida"})
        }
      }
      login(user);
    } else {
      setError({severity : 'warning', message: "Usuario o contraseña invalida"})
    }
    setloading(false);
  }

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
  })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logos />
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Message/>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type='email'
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <FormControlLabel
            style={{marginTop: '1vh', marginLeft: '0.05vw'}}
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Grid container justify='center' alignContent='center' style={{height: '10vh'}}>
            <Grid item>
              { loading && <CircularProgress /> }
            </Grid>
          </Grid>
    </Container>
  );
}
