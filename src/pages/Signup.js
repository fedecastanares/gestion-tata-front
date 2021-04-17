import React, {useContext, useState} from 'react';
import { Button, CssBaseline, TextField, Typography, Container , Grid, Checkbox, InputLabel, Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';


import {DataContext} from '../context/dataContext'
import UserService from '../services/UserService';
import Message from '../components/Message'
import Logos from '../components/Logos';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

export default function SignIn({history}) {
  const classes = useStyles();
  const User = new UserService();

  const businessList = ['BAS', 'Multiahorro', 'Frontoy', '3iDigital', 'TaTa', 'San Roque'];
  const departamentsList = ['Gestion Humana', 'Contabilidad', 'Tecnología', 'Comercial', 'ATC.'];
  
  const { setError } = useContext(DataContext)
  const [user, setUser] = useState({
    name: '',
    surname: '',
    departament: '',
    business: '',
    telephone: '',
    email: ''
  })
  const [ isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const validate = User.signUpValidate(user, setError);
    if (validate) {
      const signUp = async (user) => {
        const successfull = await User.signUp(user.name.trim(), user.surname.trim(), user.departament.trim(), user.business.trim(), user.telephone.trim(), user.email.toLowerCase().trim());
        if (successfull){
          setError(false);
          swal({
            title: "Usuario creado!",
            text: `${user.name} podra ingresar a su cuenta con su email y su telefono como contraseña`,
            icon: "success",
          })
            .then((ok) => {
            if (ok) {
              history.push('/');
            }
          });
        }
      }
      signUp(user);
    } else {
      setError({severity : 'warning', message: "Usuario o contraseña invalida"})
    }
  }

  const handleChange = () => {
    setIsAdmin(!isAdmin);
  }

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
  })
  }

  return (
    <Container component="main" maxWidth="xs" style={{marginBottom: '5vh'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Logos />
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Message/>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="surname"
                    label="Apellido"
                    name="surname"
                    autoComplete="surname"
                    autoFocus
                    onChange={onChange}
                    />
            </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel id="business" style={{marginBottom:'1vh'}}>Unidades de Negocio</InputLabel>
              <Select
                labelId="business"
                id="business"
                name='business'
                value={user.business}
                onChange={onChange}
                variant='outlined'
                defaultValue=''
                fullWidth
              >
                {businessList.map(business => <MenuItem key={business} value={business}>{business}</MenuItem> )}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="departament" style={{marginBottom:'1vh'}}>Sector</InputLabel>
                <Select
                  labelId="departament"
                  id="SelectDepartament"
                  name='departament'
                  value={user.departament}
                  onChange={onChange}
                  variant='outlined'
                  defaultValue=''
                  fullWidth
                >
                  {departamentsList.map(departament => <MenuItem key={departament} value={departament}>{departament}</MenuItem> )}
                </Select>
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="telephone"
            label="Telefono"
            type="tel"
            id="telephone"
            autoComplete="telephone"
            onChange={onChange}
          />
          <Grid container alignItems='center' style={{marginTop: '1vh'}}>
            <Grid item>
              <Checkbox
              checked={isAdmin}
              onChange={handleChange}
              name="isAdmin"
              color="primary"
              />
            </Grid>
            <Grid item>
            <Typography component="p" variant="body1">
              Administrador
            </Typography>
            </Grid>
          </Grid>
           <Button
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.submit}
            onClick={()=> history.push('/')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop: 15}}
          >
            Registrar
          </Button>
        </form>
      </div>
    </Container>
  );
}