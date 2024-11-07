import { styled } from '@mui/system';
import { Box, Card, CardContent, Grid } from '@mui/material';

export const Container = styled(Box)({
  padding: '20px',
});

export const Section = styled(Box)({
  marginBottom: '20px',
});

export const ItemGrid = styled(Grid)({
  padding: '10px',
});

export const MenuCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const MenuCardContent = styled(CardContent)({
  flexGrow: 1,
});
