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
import CategorySongItem from "./CategorySongItem";
import { useGetCategoryQuery } from "../../graphql/GraphQL";

const CategorySongList: React.FC = () => {
  const [datas, setDatas] = useState([]); // State to store categories
  const { data, loading,refetch } = useGetCategoryQuery({
    variables: {
      filter: "",
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "network-only",
  });

  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const [searchTerm, setSearchTerm] = useState("");

  const dataCategories = !loading && data ? data.categories : [];
  // const onFilter = (filter: string) => {
  //   refetch({ filter });
  // };
  // Update state when query data changes

  useEffect(() => {
      setDatas(data?.categories);
  }, [data,setDatas]);

  useEffect(()=>{},[])
  // Handle loading state
const handleCategoryAdded = (newCategory) => {
    setDatas((prevDatas) => [...prevDatas, newCategory]);
  };

 
  // Render component
  return (
    <Container maxWidth="md-6" sx={{ marginTop: "-80px" }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2,color:'red' }}>
          Catégorie de chant 
        </Typography>
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
        <Grid container spacing={3}>
          {datas?.length > 0 ? (
            datas?.map((category) => (
              <Grid item xs={12} md={6} key={category?.id}>
                <Box
                  sx={{
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "red" }}>
                    {category?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "red" }}>
                    Type:{category?.typeInfo?.name}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No categories found.</Typography>
          )}
        </Grid>
        <CategorySongForm open={openForm} setOpen={setOpenForm}  onCategoryAdded={handleCategoryAdded}/>
      </Box>
    </Container>
  );
};

export default CategorySongList;
