import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { bookVenue } from '../services/bookings';
import useForm from './useForm';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const initialValues = {
  venueId: '',
  guests: 1,
  dateFrom: dayjs(new Date()),
  dateTo: dayjs(new Date()).add(2, 'day'),
};

export default function useBookVenue(id, maxGuests = 100) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { input, values, setValues } = useForm(
    {
      ...initialValues,
      venueId: id,
    },
    onSubmit,
    yup.object({
      guests: yup
        .number()
        .required('Guests is required')
        .min(1, 'Guests must be at least 1')
        .max(maxGuests, 'Guests must be at most ' + maxGuests),
    })
  );
  const { mutate, isLoading } = useMutation(['bookings', 'post'], () => bookVenue(values), {
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries('bookings');

      setTimeout(() => {
        setSuccess(false);
        navigate('/my-bookings');
      }, 2000);
    },
    onError: (e) => {
      setError(e?.response?.data?.errors?.[0].message);
    },
  });

  async function onSubmit(values) {
    mutate(values);
  }
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearFeedback = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    error,
    success,
    input,
    values,
    setValues,
    mutate,
    isLoading,
    clearFeedback,
  };
}
