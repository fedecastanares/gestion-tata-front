import React, {useEffect, useContext} from 'react'; 

import { Container } from '@material-ui/core'

import { DataContext } from '../context/dataContext'
import UserService from '../services/UserService';

import Table from '../components/MyTable'
import Logos from '../components/Logos'
import LogOut from '../components/LogOut'
import TableSkeleton from '../components/TableSkeleton'

const Index = ({history}) => {
    const { auth, setUsers, setEmployeesQty, employeesQty, renderUsers, setRenderUsers } = useContext(DataContext);
    const columnsTitle = ["Nombre", "Apellido", "Unidad de negocio", "Sector", "Telefono", "Email"];
    

    useEffect(() => {
        const User = new UserService();
        const getUsers = async () => {
            const response = await User.getUsers();
            if (response !== undefined) {
                setUsers(response.data.users);
                setRenderUsers(response.data.users);
                setEmployeesQty(response.data.employeesQty);
            } else {
                history.push('/login');
            }
        }
        getUsers();
    // eslint-disable-next-line
    }, [auth])
    

    return ( 
        <div style={{marginBottom: '5vh'}}>
        <div style={{marginTop:'5vh', marginBottom: '1vh'}}>
            <Logos />
        </div>
        <Container>
            <LogOut />
            {renderUsers ? <Table header='Empleados' data={renderUsers} employeesQty={employeesQty} columnsTitle={columnsTitle} history={history} />:
            <TableSkeleton header='Empleados' size={3} columnsTitle={columnsTitle} />}
        </Container>
        </div>
     );
}
 
export default Index;