import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React, { InputHTMLAttributes } from 'react';
import { Control, Controller, useController, useForm } from 'react-hook-form';

export interface QuantityFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function QuantityField({ name, control, label, disabled }: QuantityFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const { setValue } = useForm();

//   const handlePlus = () => {
//     setValue(value - 1);
//   };
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Box>
        {/* <IconButton onClick={handlePlus}>
          <RemoveCircleOutline />
        </IconButton> */}
        <OutlinedInput
          id={name}
          type="number"
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {/* <IconButton onClick={() => setValue(name, Number.parseInt(value) + 1)}>
          <AddCircleOutline />
        </IconButton> */}
      </Box>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
