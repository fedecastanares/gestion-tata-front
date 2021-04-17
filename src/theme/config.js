import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const Palette = ({children}) => {

    const theme = createMuiTheme({
        type: 'dark',
        palette: {
          primary: {
            main: '#00548b',
          },
          secondary: {
            main: '#000',
          },
        },
      });

    return ( 
        <>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        </>
     );
}
 
export default Palette;