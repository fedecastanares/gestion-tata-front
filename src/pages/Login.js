import React from 'react';
import Login from '../components/login/login'
import Copyright from '../components/login/copyright'


const LoginPage = ({history}) => {
    return ( 
        <>
            <Login history={history}/>
            <Copyright/>
        </>
     );
}
 
export default LoginPage;