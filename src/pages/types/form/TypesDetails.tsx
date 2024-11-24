import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Card,
  Menu as MenuIcon,
  CardContent,
  CardMedia,
  Modal,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useForm, Controller } from "react-hook-form";
import { invoke } from "@tauri-apps/api/tauri";

const TypesDetails = ({ open, setOpen,data }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setOpen(false);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  type FormData = {
    name: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resetOptions: { keepIsSubmitted: true },
  });

  const onSubmit = async (data: FormData) => {
    handleClose();
    control._reset();
    await invoke("save_types", {
      form: {
        name: data.name,
      },
    }).then((response));
  };

  // const { handleSubmit } = useForm<FormData>({
  //   defaultValues: {
  //     name: "",
  //   },
  // });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Données du formulaire:", formData);
  //   handleClose();
  // };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isFullScreen ? "75%" : 400,
            maxWidth: isFullScreen ? "75%" : "auto",
            height: isFullScreen ? "75%" : "auto",
            bgcolor: "background.paper",
            border: "2px #000",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            overflowY: "auto",
          }}
        >
          {/* Boutons Fermer et Agrandir */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton onClick={toggleFullScreen} color="primary" size="small">
              <FullscreenIcon />
            </IconButton>
            <IconButton onClick={handleClose} color="secondary" size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Champs de formulaire */}
          <Grid container spacing={2}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                color: "black",
                fontFamily: "Neue Montreal",
              }}
            >
                Mettre à jour  type de chant
            </Typography>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Nom requis" }}
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
          </Grid>

          {/* Boutons d'action */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
          >
             <Button type="submit" variant="contained" color="primary">
              Mettre à jour
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              Supprimer
            </Button>
           
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default TypesDetails;
