import React, {useContext, useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Typography, Container , Grid, Checkbox, InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
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
  linearProgress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn({history, match}) {
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
  const [ loading, setLoading ] = useState(false);
  const [ isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    if (match.params.id !== undefined){
      const loadData = async () => {
        setLoading(true);
        const response = await User.getUserInfoById(match.params.id);
        setUser({...user,
          name: response.name,
          surname: response.surname,
          departament: response.departament,
          business: response.business,
          telephone: response.telephone,
          email: response.email
      });
        setIsAdmin(response.role === "ADMIN");
        setLoading(false);
       }
      loadData();
    }
  // eslint-disable-next-line
  },[])

  const handleSubmit = e => {
    e.preventDefault();
    const validate = User.signUpValidate(user, setError);
    let successfull = false;
    const showAlert = (title, text) => {
      swal({
        title: title ,
        text: text ,
        icon: "success",
      })
        .then((ok) => {
        if (ok) {
          history.push('/');
        }
      });
    }
    
    if (validate) {
      const signUp = async (user) => {
        successfull = await User.signUp(user.name.trim(), user.surname.trim(), user.departament.trim(), user.business.trim(), user.telephone.trim(), user.email.toLowerCase().trim(), isAdmin);
        successfull && showAlert("Usuario creado!", `${user.name} podra ingresar a su cuenta con su email y su telefono como contraseña`);
      }
      const updateById = async (user, id) => {
        successfull = await User.updateById(user.name.trim(), user.surname.trim(), user.departament.trim(), user.business.trim(), user.telephone.trim(), user.email.toLowerCase().trim(), isAdmin, id);
        successfull && showAlert("Usuario modificado!", `El usuaro de ${user.name} fue editado correctamente`);
      }
      match.params.id !== undefined ? updateById(user, match.params.id) : signUp(user);
      setError(false);
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
          {match.params.id === undefined ? 'Registro' : 'Editar'}
        </Typography>
        <Message/>
        {loading ? <div className={classes.linearProgress}><LinearProgress /></div> : 
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
                      autoFocus={match.params.id === undefined ? true : false}
                      onChange={onChange}
                      value={user.name}
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
                      onChange={onChange}
                      value={user.surname}
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
              onChange={onChange}
              value={user.email}
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
              value={user.telephone}
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
              {match.params.id === undefined ? 'Registrar' : 'Editar'}
            </Button>
          </form>
        }
      </div>
    </Container>
  );
}