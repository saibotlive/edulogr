import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Box mt={4}>{children}</Box>
      </Container>
    </div>
  );
};

export default Layout;
