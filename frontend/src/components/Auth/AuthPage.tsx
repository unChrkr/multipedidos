import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login as loginAction } from '../../store/authSlice';
import { register, login } from '../../services/authService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AllPage, ButtonsRegisterLogin, CustomButton, LoginForm, PasswordWrapper, RegisterForm } from './AuthPageStyle';
import { toast } from 'react-toastify';

type LoginFormInputs = {
  email: string;
  password: string;
};

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().email('Deve ser um email válido'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmitLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data);
      if (response) {
        dispatch(loginAction(response));
        navigate('/reservation');
      } else {
        console.error('Token not get on the response', response);
      }
    } catch (error) {
      console.error(error)
      toast.error('Email ou senha errados, tente fazer o login novamente')
    }
  };

  const onSubmitRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await register(data);
      setIsLogin(true);
    } catch (error) {
      console.error(error)
      toast.error('Email ou senha errados, tente fazer o login novamente')
    }
  };

  return (
    <AllPage sx={{ marginTop: '80px' }}>
      <ButtonsRegisterLogin>
        <Button variant="contained" onClick={() => setIsLogin(true)} disabled={isLogin}>
          Entrar
        </Button>
        <Button variant="contained" onClick={() => setIsLogin(false)} disabled={!isLogin}>
          Cadastro
        </Button>
      </ButtonsRegisterLogin>

      {isLogin ? (
        <LoginForm onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <Typography variant="h5" gutterBottom>Entrar</Typography>
          <TextField
            {...registerLogin('email')}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!loginErrors.email}
            helperText={loginErrors.email ? loginErrors.email.message : ''}
          />
          <PasswordWrapper>
            <TextField
              {...registerLogin('password')}
              label="Senha"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              error={!!loginErrors.password}
              helperText={loginErrors.password ? loginErrors.password.message : ''}
            />
            <IconButton
              type="button"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </PasswordWrapper>
          <CustomButton variant="contained" type="submit">Login</CustomButton>
        </LoginForm>
      ) : (
          <RegisterForm onSubmit={handleSubmitRegister(onSubmitRegister)}>
            <Typography variant="h5" gutterBottom>Cadastrar</Typography>
            <TextField
              {...registerRegister('name')}
              label="Nome"
              variant="outlined"
              fullWidth
              error={!!registerErrors.name}
              helperText={registerErrors.name ? registerErrors.name.message : ''}
            />
            <TextField
              {...registerRegister('email')}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!registerErrors.email}
              helperText={registerErrors.email ? registerErrors.email.message : ''}
            />
            <TextField
              {...registerRegister('password')}
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              error={!!registerErrors.password}
              helperText={registerErrors.password ? registerErrors.password.message : ''}
            />
            <CustomButton variant="contained" type="submit">Cadastrar</CustomButton>
          </RegisterForm>
      )}
    </AllPage>
  );
};

export default AuthPage;
