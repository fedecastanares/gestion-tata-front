import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Table ,TableBody, TableCell, TableContainer , TableHead, TableRow, Grid} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

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

const TableSkeleton = ({header, columnsTitle, size}) => {
    const classes = useStyles();



    return ( 
        <>
        <Grid container alignItems='center' justify='flex-start' style={{marginBottom: '1vh'}}>
          <Grid item xs={8}>
            <Typography variant="h5" component="h5" gutterBottom >{header}</Typography>
          </Grid>
        </Grid>
        <TableContainer className={classes.table}>
            <Table> 
            <TableHead>
                <TableRow>
                    {columnsTitle.map(column => 
                      <StyledTableCell key={column}>{column}</StyledTableCell>
                        )}
                </TableRow>
            </TableHead>
            <TableBody>
                {Array(size).fill(
                <StyledTableRow >
                        {columnsTitle.map(row => 
                            <StyledTableCell key={row}><Skeleton /></StyledTableCell>
                            )}
                </StyledTableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer >
        </>
     );
}
 
export default TableSkeleton;

/*
                {columnsTitle.map(row => 
                <StyledTableRow key={row}>
                    {columns.map(cell => cell !== '_id' && <StyledTableCell key={cell}>{row[cell]}</StyledTableCell> )}
                    {User.isAdmin() && <StyledTableCell align="center"><Fab size='small' aria-label="edit" color='primary' onClick={() => handleClick('edit', header, row._id, row)}><EditIcon /></Fab ></StyledTableCell>}
                </StyledTableRow>
                )}
                */