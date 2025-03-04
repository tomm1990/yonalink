import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';

const queryClient = new QueryClient();

const App = () => {

  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
        <Container component="main">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/main" element={<Main />} />
            </Routes>
          </QueryClientProvider>
        </Container>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  )
}

export default App
