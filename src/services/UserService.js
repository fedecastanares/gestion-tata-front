import axios from 'axios'
import { axiosApiInstance } from './instance';
import { authenticateUser, dataUser, setAdmin, isAdmin as isAdminAuthenticatedAuth, isUserAuthenticated as isUserAuthenticatedAuth, getUser as getUserAuthenticatedAuth,  deauthenticateUser as deauthenticateUserAuthenticatedAuth, deauthenticateUser } from './auth/auth';


export default class Users {
    
    async getUsers() {
        try {
            const response = await axiosApiInstance.get(`/users`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(name, surname, departament, business, telephone, email) {
        try {
            var data = JSON.stringify({name, surname, departament, business, telephone, email});
            await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/register`, data, 
            {headers: {'Content-Type': 'application/json'}})
            return true
        } catch (error) {
           return false
        }
    }

    async login(email, password) {
        try {
            var data = JSON.stringify({"email": email,"password" : password});
            const response = await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/login`, data, 
            {headers: {'Content-Type': 'application/json'}})
            authenticateUser(response.data.user.token);
            dataUser(response.data.user.name, response.data.user.name);
            if (response.data.user.role !== undefined && response.data.user.role === "ADMIN"){
                setAdmin(true);
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    loginValidate(user, setError) {
        if (user.email !== 'admin') {
            if ( user.email === '' ) {
                setError({severity : 'warning', message: "Debe ingresar su email"})
                return false;
            }
            if ( user.email.indexOf('@') === -1) {
                setError({severity : 'warning', message: "Debe ingresar un email valido"})
                return false;
            }
            if ( user.password === '' ) {
                setError({severity : 'warning', message: "Debe ingresar su contraseña"})
                return false;
            }
            if ( user.password.length < 7 ) {
                setError({severity : 'warning', message: "Contraseña incorrecta"})
                return false;
            }
        }
        return true;
    }

    signUpValidate(user, setError) {
        return true;
    }
    
    isUserAuthenticated() {
        return isUserAuthenticatedAuth();
    }

    isAdmin() {
        return isAdminAuthenticatedAuth();
    }

    getUser(){
        return getUserAuthenticatedAuth();
    }

    deauthenticateUser(){
        return deauthenticateUserAuthenticatedAuth();
    }

}