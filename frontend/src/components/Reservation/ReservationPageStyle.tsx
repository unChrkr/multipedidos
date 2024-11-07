import styled from "@emotion/styled";
import { Button, Container } from "@mui/material";

export const Teste = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '100px',
  });

  export const ReservationForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
    width: '80%',
    alignItems: 'center',
    marginTop: '35px',
  });

  export const CustomButton = styled(Button)({
    width: '80%',
  });