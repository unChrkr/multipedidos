import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerListContainer, HeaderContainer, DrawerButton } from './HeaderStyle';


const DrawerList = ({ onNavigate }: { onNavigate: (href: string) => void }) => (
  <DrawerListContainer>
    <Typography variant="h6" align="center">Menu</Typography>
    <List>
      <ListItem button onClick={onNavigate('/menu')} component={Link as any} to="/menu">
        <ListItemText primary="Menu" />
      </ListItem>
      <ListItem button onClick={onNavigate('/auth')} component={Link as any} to="/auth">
        <ListItemText primary="Login/Register" />
      </ListItem>
      <ListItem button onClick={onNavigate('/reservation')} component={Link as any} to="/reservation">
        <ListItemText primary="Reserva" />
      </ListItem>
    </List>
  </DrawerListContainer>
);

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (href: string) => () => {
    navigate(href);
    setDrawerOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Teobaldo Master Chef
          </Typography>
          <DrawerButton onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="large" style={{ paddingLeft: '15px' }} />
          </DrawerButton>
        </Toolbar>
      </HeaderContainer>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerList onNavigate={handleNavigation} />
      </Drawer>
    </>
  );
};

export default Header;
