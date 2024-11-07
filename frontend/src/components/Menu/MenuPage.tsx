import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchMenu } from '../../store/menuSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Section, ItemGrid, MenuCard, MenuCardContent } from './MenuPageStyle';

const typeTranslations: { [key: string]: string } = {
  starter: 'Entradas',
  mainCourse: 'Pratos Principais',
  dessert: 'Sobremesas',
  drink: 'Bebidas',
};

const MenuPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [status, dispatch]);

  const groupedItems = items.reduce((acc: any, item: { type: any; }) => {
    const { type } = item;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  return (
    <Container>
      <Typography variant='h4' gutterBottom sx={{ marginTop: '100px' }}>
        Menu do Restaurante
      </Typography>
      {status === 'loading' && <Typography>Carregando...</Typography>}
      {status === 'failed' && (
        <Typography>Erro ao carregar o menu. Tente novamente mais tarde.</Typography>
      )}
      {status === 'succeeded' && Object.keys(groupedItems).map((type) => (
        <Section key={type}>
          <Typography variant="h5" gutterBottom>
            {typeTranslations[type] || type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
          <Grid container spacing={2}>
            {groupedItems[type].map((item: any) => (
              <ItemGrid item xs={12} sm={6} md={4} key={item.id}>
                <MenuCard>
                  <MenuCardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="textSecondary">{item.description}</Typography>
                    <Typography variant="body1">Preço: R$ {item.price}</Typography>
                  </MenuCardContent>
                </MenuCard>
              </ItemGrid>
            ))}
          </Grid>
        </Section>
      ))}
    </Container>
  );
};

export default MenuPage;
