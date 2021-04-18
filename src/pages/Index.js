import React, {useEffect, useContext} from 'react'; 

import { Container } from '@material-ui/core'

import { DataContext } from '../context/dataContext'
import UserService from '../services/UserService';

import Table from '../components/MyTable'
import Logos from '../components/Logos'
import LogOut from '../components/LogOut'
import TableSkeleton from '../components/TableSkeleton'

const Index = () => {
    const { auth, users, setUsers, setEmployeesQty, employeesQty } = useContext(DataContext);
    const columnsTitle = ["Nombre", "Apellido", "Unidad de negocio", "Sector", "Telefono", "Email"];
    

    useEffect(() => {
        const User = new UserService();
        const getUsers = async () => {
            const response = await User.getUsers();
            setUsers(response.data.users);
            setEmployeesQty(response.data.employeesQty);
        }
        getUsers();
    // eslint-disable-next-line
    }, [auth])
    

    return ( 
        <>
        <div style={{marginTop:'5vh', marginBottom: '1vh'}}>
            <Logos />
        </div>
        <Container>
            <LogOut />
            {users ? <Table header='Empleados' data={users} employeesQty={employeesQty} columnsTitle={columnsTitle} />:
            <TableSkeleton header='Empleados' size={3} columnsTitle={columnsTitle} />}
        </Container>
        </>
     );
}
 
export default Index;