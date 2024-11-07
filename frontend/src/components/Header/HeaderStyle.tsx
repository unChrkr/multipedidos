import { styled } from '@mui/system';
import { AppBar, Box, Toolbar, Button } from '@mui/material';

export const HeaderContainer = styled(AppBar)({
  display: 'flex',
  width: '100%',
  position: 'fixed',
  justifyContent: 'center',
});

export const NavButton = styled(Button)`
  color: white;
`;

export const DrawerButton = styled(Button)`
  color: white;
`;

export const DrawerListContainer = styled(Box)({
  padding: 0,
  '& .MuiTypography-root': {
    padding: '10px 0px',
    fontWeight: 'bolder',
  },
  '& .MuiButton-root': {
    color: 'white',
  },
});

export const ToolbarContainer = styled(Toolbar)({
  maxWidth: '1000px',
  width: '100%',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
});
