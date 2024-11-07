import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import 'dayjs/locale/pt-br';
import baseUrl from '../../utils/baseurl';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CustomButton, ReservationForm, Teste } from './ReservationPageStyle';

interface User {
  email: string;
  id: number;
  name: string;
  reservation?: {
    dayTime: string;
    id: number;
    numberOfPeople: number;
    userId: number;
  };
}

const reservationSchema = z.object({
  numberOfPeople: z.number().min(1, "O número de pessoas deve ser pelo menos 1"),
  date: z.string(),
  time: z.string()
    .refine((time) => /^\d{2}:\d{2}$/.test(time), {
      message: "Formato de horário inválido. Use HH:mm.",
    })
    .refine((time) => {
      const [hours] = time.split(':').map(Number);
      return hours >= 15 && hours <= 20;
    }, {
      message: "O horário deve estar entre 15:00 e 20:00.",
    }),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

const ReservationPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Necessário fazer login para ter acesso a reserva");
        navigate('/auth');
        return;
      }

      try {
        const userResponse = await axios.get(`${baseUrl}/auth/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error at get user informations', error);
      }
    };
    fetchUserData();
  }, [navigate]);

  const onSubmit: SubmitHandler<ReservationFormInputs> = async (data) => {
    const token = localStorage.getItem('token');
    if (!selectedDate) {
      toast.error('Data não selecionada');
      return;
    }

    const [hours, minutes] = data.time.split(':').map(Number);
    const reservationDate = DateTime.fromJSDate(selectedDate)
      .setZone('America/Sao_Paulo')
      .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })
      .toISO();

    const reservationData = {
      numberOfPeople: data.numberOfPeople,
      date: reservationDate,
    };

    try {
      await axios.post(`${baseUrl}/reservation`, reservationData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Reserva criada com sucesso');
      setUser(prev => {
        if (prev) {
          return {
            ...prev,
            reservation: {
              id: prev.reservation ? prev.reservation.id : Math.random(),
              numberOfPeople: data.numberOfPeople,
              dayTime: reservationData.date ?? "",
              userId: prev.id
            },
          };
        }
        return prev;
      });
    } catch (error) {
      toast.error('Erro ao realizar reserva, tente novamente');
      console.error('Erro ao criar a reserva:', error);
    }
  };

  return (
    <Teste>
      {user && <Typography variant="h5">Olá, {user.name}</Typography>}
      <Typography variant="h4" gutterBottom>
        Faça sua Reserva
      </Typography>
      <ReservationForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="number"
          label="Número de Pessoas"
          variant="outlined"
          fullWidth
          {...register('numberOfPeople', { valueAsNumber: true })}
          error={!!errors.numberOfPeople}
          helperText={errors.numberOfPeople?.message}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setValue('date', date ? format(date, 'yyyy-MM-dd') : '');
          }}
          placeholderText="Selecione uma data"
          locale={ptBR}
          filterDate={(date) => date >= new Date()}
          dateFormat="dd/MM/yyyy"
          className="react-datepicker__input-container"
        />
        <TextField
          label="Horário (HH:mm)"
          variant="outlined"
          fullWidth
          {...register('time')}
          error={!!errors.time}
          helperText={errors.time?.message}
        />
        <CustomButton variant="contained" type="submit">
          Reservar
        </CustomButton>
      </ReservationForm>
      {user?.reservation && (
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Sua Reserva:
        </Typography>
      )}
      {user?.reservation ? (
        <Typography variant="body1">
          {`Reserva para ${user.reservation.numberOfPeople} pessoas em ${format(new Date(user.reservation.dayTime), 'dd/MM/yyyy')} às ${format(new Date(user.reservation.dayTime), 'HH:mm')}`}
        </Typography>
      ) : (
        <Typography variant="body1">Você ainda não tem reservas.</Typography>
      )}
    </Teste>
  );
};

export default ReservationPage;
