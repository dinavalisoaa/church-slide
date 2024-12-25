import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Settings,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  ListAlt,
  Menu as MenuIcon,
} from "@mui/icons-material";

const Sidebar = ({ open, onToggle }) => {
  const [openSubMenu, setOpenSubMenu] = useState(false); // Gérer l'état du sous-menu
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu); // Toggle l'état du sous-menu
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(open);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <Drawer
        sx={{
          width: open ? 240 : 60, 
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            boxSizing: "border-box",
            backgroundColor: "#333",
            borderRadius:"10px",
            color: "white",
            transition: "width 0.3s ease",
            overflowY: "auto", 
            overflowX: "hidden", // Evite un scrollbar horizontal non désiré
          },
        }}
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <div style={{ padding: "16px" }}>
          {/* Afficher l'image lorsque le menu est ouvert */}
          {open ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Admin Avatar"
                src="https://via.placeholder.com/40" // Remplacer avec le lien vers ton image
                style={{ marginBottom: "8px" }}
              />
              <h3>Admin Panel</h3>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="Admin Avatar"
                src="https://via.placeholder.com/40"
                style={{ marginBottom: "8px" }}
              />
            </div>
          )}

        </div>

        <Divider />

        <List>
          <ListItem button component={Link} to="/home">
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Home" : ""}
            />
          </ListItem>

          <ListItem button component={Link} to="/form">
            <ListItemIcon sx={{ color: "white" }}>
              <Person />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Form" : ""}
            />
          </ListItem>
          <ListItem button component={Link} to="/type-crud">
            <ListItemIcon sx={{ color: "white" }}>
              <Person />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Type de chant" : ""}
            />
          </ListItem>

          <ListItem button component={Link} to="/category-song">
            <ListItemIcon sx={{ color: "white" }}>
              <Person />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Categorie de chant" : ""}
            />
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon sx={{ color: "white" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Index" : ""}
            />
          </ListItem>

          {/* Sous-menu */}
          <ListItem button onClick={handleSubMenuToggle}>
            <ListItemIcon sx={{ color: "white" }}>
              <ListAlt />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Admin Settings" : ""}
            />
            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/other">
                <ListItemIcon sx={{ color: "white" }}>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                  primary={open ? "User Management" : ""}
                />
              </ListItem>
              <ListItem button component={Link} to="/settings/system-settings">
                <ListItemIcon sx={{ color: "white" }}>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                  primary={open ? "System Settings" : ""}
                />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/logout">
            <ListItemIcon sx={{ color: "white" }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white" }}
              primary={open ? "Logout" : ""}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
