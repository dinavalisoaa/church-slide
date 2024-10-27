import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import type { Router } from "@toolpad/core";
import { invoke } from "@tauri-apps/api/tauri";

import {
  useEffect,
} from "react";
// Import the form component for the new route
// import FormComponent from './dashboard/form/page';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function OrdersPage() {
  console.log("Hello_________________");
  // invoke("create_post", {
  //   amount: 1234,
  //   verification: 24.3,
  //   published_at: "2022-02-20",
  //   title: "Jim Cliff",
  //   text: "Camea",
  // }).then((response) => console.log("................>greet", response));

 
  return (
    <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
      <Button>Order 1sajkdjaksd</Button>
      <Button>Order 2</Button>
      <Button>Order 3</Button>
    </Stack>
  );
}

function DemoPageContent({
  pathname,
  navigate,
}: {
  pathname: string;
  navigate: (path: string | URL) => void;
}) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>
        <p>Dashboard content for {pathname}</p>
        <h2>Its work</h2>
      </Typography>

      <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
        <Button onClick={() => navigate("/orders")}>Go to Orders</Button>
        <Button onClick={() => navigate("/dashboard/form")}>
          Go to Form Page
        </Button>
      </Stack>
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutPattern(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/orders");
  const navigate = React.useCallback(
    (path: string | URL) => setPathname(String(path)),
    []
  );

  useEffect(() => {
    invoke("greet", {
      text: "Hello hello",
    }).then((response) => console.log("................>greet", response));
  
  }, []);
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <DashboardIcon />,
        },
        {
          segment: "orders",
          title: "Orders",
          icon: <ShoppingCartIcon />,
          pattern: "orders{/:orderId}*",
        },
        {
          segment: "form",
          title: "Form",
          icon: <DashboardIcon />,
          pattern: "dashboard/form",
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {pathname === "/orders" && <OrdersPage />}
          {/* {pathname === '/dashboard/form' && <FormComponent />} */}
          {pathname === "/" && (
            <DemoPageContent pathname={pathname} navigate={navigate} />
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
