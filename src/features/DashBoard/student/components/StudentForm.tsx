import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import InputField from 'components/FormField/InputField';
import RadioGroupField from 'components/FormField/RadioGroupField';
import SelectField from 'components/FormField/SelectField';
import { fetchCity, selectCityOptions } from 'features/DashBoard/city/citySlice';
import { Student } from 'models';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto',
  },
}));

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const classes = useStyle();
  const cityOptions = useAppSelector(selectCityOptions);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');

  const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name.')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value.split(' ') || [];
        return parts.length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  })
  .required();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (formValues: Student) => {
    try {
        setError('')
        await onSubmit?.(formValues)
    } catch (error:any) {
      setError(error.message);
        
    }
  };

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
