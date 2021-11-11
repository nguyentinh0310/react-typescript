import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/FormField/QuantityField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface AddToCartFormProps {
  onSubmit?: (formValues: any) => void;
}

export default function AddToCartForm({ onSubmit }: AddToCartFormProps) {
  const schema = yup.object({
    quantity: yup
      .number()
      .required('Please enter quanity')
      .min(1, 'Mininum value is 1')
      .typeError('Please enter a number'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (formValues: any) => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>

        <QuantityField name="quantity" label="Quanrity" control={control} />

      <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
        Buy
      </Button>
    </form>
  );
}
