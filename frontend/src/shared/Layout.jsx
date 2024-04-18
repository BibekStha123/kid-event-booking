import React from 'react';
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Appbar from './Appbar';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Layout(props) {
    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Appbar />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Outlet />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default Layout;