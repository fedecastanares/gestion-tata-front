import React from 'react';

import {Link, IconButton, Grid, Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserService from '../services/UserService'


const LogOut = () => {

    const User = new UserService();

    const handleClick = () => {
        User.deauthenticateUser();
      }

    return ( 
        <>
        <Grid container justify='flex-end' alignItems='center'  style={{marginBottom: '1vh'}}>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item>
                        <AccountCircleIcon size='medium' />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="p" color='inherit'  >{User.getUser() ? User.getUser().replace(/['"]+/g, '') : null}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Link href='/' underline='none'>
                    <IconButton color='inherit' size='medium' onClick={handleClick}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Link>
            </Grid>
        </Grid>
        </>
     );
}
 
export default LogOut;