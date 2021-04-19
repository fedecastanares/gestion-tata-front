import React, {createContext, useState} from 'react';

export const DataContext = createContext();

const DataProvider = ({children}) => {

    const [darkmode, setdarkMode] = React.useState(false);
    const [auth, setauth] = useState(undefined);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState(false);
    const [renderUsers, setRenderUsers] = useState(false);
    const [employeesQty, setEmployeesQty] = useState(0);

    return(
        <DataContext.Provider
            value={{
                auth,
                error,
                darkmode,
                users,
                employeesQty,
                renderUsers,
                setauth,
                setError,
                setdarkMode,
                setUsers,
                setEmployeesQty,
                setRenderUsers
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;