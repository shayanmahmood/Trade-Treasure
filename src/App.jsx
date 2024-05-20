import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Store from "./pages/Store";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./pages/ProtectedRoute";
import GlobalStyles from "../src/styles/GlobalStyle";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import PayBill from "./pages/payBill";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DCBE93",
    },
  },
  Button: {
    contained: {
      main: "#ff5533",
    },
  },
  typography: {
    useNextVariants: true,
    h6: {
      color: "#484b42",
      fontWeight: "bolder",
      fontSize: "20px",
    },
    h5: {
      color: "#484b42",
      fontWeight: "bolder",
      fontSize: "15px",
    },
    h2: {
      color: "#484b42",
      fontWeight: "bolder",
      fontSize: "12px",
      fontFamily: "Poppins",
    },
    heading: {
      color: "#484b42",
      fontWeight: "bolder",
      fontSize: "18px",
      fontFamily: "Poppins",
    },
  },
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
});
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/store" replace />} />
              <Route path="/store" element={<Store />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payBill" element={<PayBill />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
