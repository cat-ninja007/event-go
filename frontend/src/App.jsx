import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes";

// Use an empty theme to debug Chakra UI
const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
