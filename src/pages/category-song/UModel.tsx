import { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

  const TypesForm = ({isFullScreen ,setIsFullScreen,setOpen,handleClose}) => {
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    handleClose();
  };

  return (
    <>
     
        <Box
          component="form"
          onSubmit={handleSubmit}
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

          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Formulaire de création/modification
          </Typography>

          {/* Champs de formulaire */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Boutons d'action */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
          >
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </Box>
        </Box>
    </>
  );
};
export default TypesForm;
