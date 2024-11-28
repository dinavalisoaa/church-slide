import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import TypesDetails from "./TypesDetails";


const TypesItem = ({values}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Grid item xs={12} sm={6} md={4} key={1}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Carte cliquable */}
          <Card
           onClick={handleOpen}
            sx={{
              maxWidth: 345,
              boxShadow: 3,
              cursor: "pointer",
              borderRadius: "16px",
              width: "100%",
              gap: "10px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              boxShadow: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
         
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                fontFamily={"Neue Montreal"}
              >
                {values.name}
              </Typography>
            
            </CardContent>
            {/* <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/150"
              alt="Petite image"
            /> */}
          </Card>
          <TypesDetails open={open} setOpen={setOpen} data={values} />
        </div>
      </Grid>
    </>
  );
};


export default TypesItem;
