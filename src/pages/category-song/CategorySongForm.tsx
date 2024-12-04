import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useForm, Controller } from "react-hook-form";
import { invoke } from "@tauri-apps/api/tauri";
import { CategorySong, TypeSong } from "../../models/model";

const CategorySongForm = ({ open, setOpen }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setOpen(false);

  const [typeSong, setTypeSong] = useState<TypeSong[]>([]);

  const fetch_types = async () => {
    const result = await invoke("retrieve_types", {
    }).then((response) => setTypeSong(response));
  };
    useEffect(() => {
      fetch_types();
      // console.log(typeSong);
    },[fetch_types]);
    

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  type FormData = {
    name: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resetOptions: { keepIsSubmitted: true },defaultValues: {
          name: "dasodio",
        },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Data here=",data);
    handleClose();
    await invoke("save_category_song", {
      form: {
        name: data.name,
        type_id: data.type,
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
              Nouveau categorie de chant
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

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-song-label">Type de chant</InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="type-song-label" label="Type de chant">
                    {typeSong.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
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
      </Modal>
    </>
  );
};
export default CategorySongForm;