import React, { useState } from 'react';
import { Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Box, Button, Typography, TextareaAutosize, Divider, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { mdiAccount, mdiMail, mdiGithub, mdiBallotOutline } from '@mdi/js';
import { useForm, Controller } from 'react-hook-form';
import { invoke } from "@tauri-apps/api/tauri";

const selectOptions = [
  { id: 1, label: 'Business development' },
  { id: 2, label: 'Marketing' },
  { id: 3, label: 'Sales' },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  question: string;
  checkbox: string[];
  radio: string;
  switch: string[];
  file: File | null;
};

const FormPage: React.FC = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: selectOptions[0].label,
      subject: '',
      question: '',
      checkbox: ['lorem'],
      radio: 'one',
      switch: ['one'],
      file: null,
    },
  });

  
  const save = async () => {
    console.log("Hello ,,............ ooo"); 
    const param = {
      name:'Im Creep'
     
    };
   const s=await invoke("save_types", {
      form: param,
    }).then((response) => console.log("................>greet", response));
    console.log(s,".............");
  };

  const save_test = async () => {

  };

  const [formStatus, setFormStatus] = useState<'info' | 'success' | 'danger' | 'warning'>('info');

  const onSubmit = (data: FormData) => {
    save();
    console.log('Form Submitted:', data);
  };

  const handleFormStatusChange = () => {
    const statuses: ('info' | 'success' | 'danger' | 'warning')[] = ['info', 'success', 'danger', 'warning'];
    setFormStatus(statuses[(statuses.indexOf(formStatus) + 1) % statuses.length]);
  };

  return (
    <Container  maxWidth="md-6" sx={{ marginTop: -1 }}>
      {/* Titre du formulaire */}
      <Typography variant="h4" component="h1" sx={{ color: 'black',fontWeight: 600, marginBottom: 3 }}>
        Forms Example
      </Typography>

      {/* Section de formulaire principal */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Nom avec icône */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nom requis' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nom"
                  fullWidth
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: <i className="mdi mdi-account"></i>,
                  }}
                />
              )}
            />
          </Grid>

          {/* Email avec icône */}
          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email requis' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <i className="mdi mdi-mail"></i>,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Téléphone */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Téléphone"
                  fullWidth
                  variant="outlined"
                  helperText="Ne pas entrer de zéro devant"
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Liste déroulante */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="department-label">Département</InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="department-label" label="Département">
                    {selectOptions.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Question (textarea) */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Question"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder="Expliquez comment nous pouvons vous aider"
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Diviseur */}
        <Divider sx={{ marginY: 2 }} />

        {/* Checkbox */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label="Lorem"
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Boutons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ padding: '10px 20px' }}
          >
            Soumettre
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            type="reset"
            sx={{ padding: '10px 20px' }}
          >
            Réinitialiser
          </Button>
        </Box>

        {/* Formulaire avec statut */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Statut du formulaire
          </Typography>
          <Box
            sx={{
              backgroundColor: formStatus === 'info' ? '#E3F2FD' : formStatus === 'success' ? '#C8E6C9' : formStatus === 'danger' ? '#FFCDD2' : '#FFF9C4',
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color={formStatus === 'info' ? 'primary' : formStatus === 'success' ? 'success' : formStatus === 'danger' ? 'error' : 'warning'}>
              {formStatus} state
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleFormStatusChange}>
              Changer le statut
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};   <Typography
variant="h5"
sx={{
  fontWeight: 400,
  color: "black",
  fontFamily: "Neue Montreal",
}}
>
Nouveau type de chant

</Typography>

export default FormPage;
