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
import TypesForm from "./TypesForm";
import TypesItem from "./TypesItem";
import { invoke } from "@tauri-apps/api/tauri";
import { TypeSong } from "../../models/model";

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

const TypesList: React.FC =  () => {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const [listTypes, setListTypes] = useState<TypeSong[]>([]);

  const onSubmit = (data: FormData) => {
    // save();
    // console.log("Form Submitted:", data);
  };
  
const fetch = async () => {
  const result = await invoke("retrieve_types", {
  }).then((response) => setListTypes(response));
};
  useEffect(() => {
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
                sTYPE DE CHANT

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
              {listTypes.map((element) => (
                <TypesItem values={element}/>
               ))} 
              <TypesForm open={openForm} setOpen={setOpenForm} />
            </Grid>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default TypesList;
