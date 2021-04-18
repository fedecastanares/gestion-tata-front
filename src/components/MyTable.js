import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {Typography, Table ,TableBody, TableCell, TableContainer , TableHead, TableRow, Fab, Grid, Button, Link} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';

import UserService from '../services/UserService'

const useStyles = makeStyles((theme) => ({
    table: {
        borderRadius: '1vh',
        border: `0.0001vh solid ${theme.palette.secondary.main}` 
    }
  }))
  
  const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.secondary.main,
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

const MyTable = ({header, data, employeesQty, columnsTitle}) => {
    const classes = useStyles();
    const User = new UserService();

    const columns = Object.keys(data[0]);

    const handleClick = (type, header, rowId, row ) => {
        console.log(type);
        console.log(header);
        console.log(rowId);
        console.log(row);
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
        <TableContainer className={classes.table}>
            <Table> 
            <TableHead>
                <TableRow>
                    {columnsTitle.map(column => 
                      <StyledTableCell key={column}>{column}</StyledTableCell>
                        )}
                    { User.isAdmin() && <StyledTableCell align="center">Editar</StyledTableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => 
                <StyledTableRow key={row.email}>
                    {columns.map(cell => cell !== '_id' && <StyledTableCell key={cell}>{row[cell]}</StyledTableCell> )}
                    {User.isAdmin() && <StyledTableCell align="center"><Fab size='small' aria-label="edit" color='primary' onClick={() => handleClick('edit', header, row._id, row)}><EditIcon /></Fab ></StyledTableCell>}
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