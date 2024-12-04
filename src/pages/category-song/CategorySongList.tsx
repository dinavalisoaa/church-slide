import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Menu as MenuIcon,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CategorySongForm from "./CategorySongForm";
import { invoke } from "@tauri-apps/api/tauri";
import { CategorySong } from "../../models/model";
import CategorySongItem from './CategorySongItem';

const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
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

const CategorySongList: React.FC =  () => {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);

  const { handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: selectOptions[0].label,
      subject: "",
      question: "",
      checkbox: ["lorem"],
      radio: "one",
      switch: ["one"],
      file: null,
    },
  });
  const [searchTerm, setSearchTerm] = useState("");


  const onSubmit = (data: FormData) => {
    // save();
    // console.log("Form Submitted:", data);
  };
  
  const [listCategorySong, setListCategorySong] = useState<CategorySong[]>([]);
// const   =async (id)=>{
//   const result = await invoke("retrieve_type_by_id", {
//     id:id
//   }).then((response) => setListCategorySong(response));
// }
const fetch = async () => {
  const result = await invoke("retrieve_category_song", {
  }).then((response) => setListCategorySong(response));
};
  useEffect(() => {
    console.log("data=",listCategorySong);
    fetch();
  },[fetch]);
  

  return (
    <>
      <Container maxWidth="md-6" sx={{ marginTop: "-80px" }}>
        {/* Section de formulaire principal */}
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "row-reverse",
            placeContent: "center space-evenly",
            flexWrap: "nowrap",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 4,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              borderRadius: "19px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "black",
                  fontFamily: "Neue Montreal",
                }}
              >
              Catégorie de chant
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontFamily: "Neue Montreal", fontWeight: 500 }}
                onClick={handleOpenForm}
                startIcon={<MenuIcon />}
              >
                Ajouter nouveau
              </Button>
            </Box>
            <Box sx={{ mb: 2, alignItems: "center" }}>
              <TextField
                fullWidth
                sx={{ width: "50%" }}
                label="Search for a card"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                aria-label="Search for a card"
              />
            </Box>

            {/* Diviseur */}

            <Grid container spacing={3}>
              {/* {filteredCards.map((card, index) => ( */}
              {listCategorySong.map((element) => (
                <CategorySongItem values={element}/>
               ))} 
              <CategorySongForm open={openForm} setOpen={setOpenForm} />
            </Grid>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default CategorySongList;
