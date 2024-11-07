import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const AllPage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '30px',
});

export const ButtonsRegisterLogin = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-evenly',
  maxWidth: '350px',
  marginTop: '50px',
  button: {
    width: '120px',
  },
});

export const PasswordWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});


export const LoginForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '80%',
  maxWidth: '400px',
  alignItems: 'center',
  marginTop: '35px',
});

export const RegisterForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '400px',
  width: '80%',
  alignItems: 'center',
  marginTop: '35px'
});

export const CustomButton = styled(Button)({
  width: '80%',
});