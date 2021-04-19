import React, {useContext} from 'react';
import swal from 'sweetalert';
import { DataContext } from '../context/dataContext'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {Typography, Table ,TableBody, TableCell, TableContainer , TableHead, TableRow, Fab, Grid, Button, Link} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import UserService from '../services/UserService'
import SearchBar from '../components/SearchBar'

const useStyles = makeStyles((theme) => ({
    table: {
        borderRadius: '1vh',
        border: `0.0001vh solid ${theme.palette.common.black}` 
    }
  }))
  
  const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
  
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

const MyTable = ({header, data, columnsTitle, history}) => {
    const classes = useStyles();
    const User = new UserService();
    const { users, setUsers, employeesQty, setEmployeesQty } = useContext(DataContext);
    const columns = Object.keys(data[0]);

    const handleClick = (action, rowId) => {
      switch(action){
        case 'edit':  history.push(`/register/${rowId}`);
          break;
        case 'remove': 
          swal({
            title: "¿Está seguro que lo desea eliminar?",
            text: `Una vez eliminado no lo podra recuperar`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((ok) => {
            if (ok) {
              const remove = ( async () => await User.deleteUserById(rowId))();
              if (remove) {
                const newState = users.filter(user => user._id !== rowId);
                setUsers(newState);
                setRenderUsers(newState);
                setEmployeesQty(employeesQty - 1);
              }
            }
          });
          break;
        default: console.log(action);
      }
    }

    return ( 
    <>
        <Grid container alignItems='center' justify='space-around' style={{marginBottom: '1vh'}}>
          <Grid item xs={8}>
            <Typography variant="h5" component="h5" gutterBottom >{header}</Typography>
          </Grid>
          <Grid item xs={4}>
           {User.isAdmin() && <Link href='/register'><Button variant="contained" color="primary" fullWidth startIcon={<AddIcon />} >Nuevo</Button></Link>}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={8} lg={4}>
            <SearchBar />
          </Grid>
        </Grid>
        <TableContainer className={classes.table}>
            <Table> 
            <TableHead>
                <TableRow>
                    {columnsTitle.map(column => 
                      <StyledTableCell key={column}>{column}</StyledTableCell>
                        )}
                    { User.isAdmin() && <StyledTableCell align="center">Editar</StyledTableCell>}
                    { User.isAdmin() && <StyledTableCell align="center">Eliminar</StyledTableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => 
                <StyledTableRow key={row.email}>
                    {columns.map(cell => cell !== '_id' && <StyledTableCell key={cell}>{row[cell]}</StyledTableCell> )}
                    {User.isAdmin() && <StyledTableCell align="center"><Fab size='small' aria-label="edit" color='primary' onClick={() => handleClick('edit',row._id)}><EditIcon /></Fab ></StyledTableCell>}
                    {User.isAdmin() && <StyledTableCell align="center"><Fab size='small' aria-label="remove" color='secondary' onClick={() => handleClick('remove',row._id)}><CloseIcon /></Fab ></StyledTableCell>}
                </StyledTableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer >
        <Grid container justify='flex-end' style={{marginTop: '2vh'}}>
          <Grid item xs={8} sm={6} lg={4}>
            <Alert variant="filled" severity="info">
              Total de empleados: {employeesQty}{<br></br>}
              Mostrando {data.length} empleados
            </Alert>
          </Grid>
        </Grid>
    </> 
    );
}
 
export default MyTable;