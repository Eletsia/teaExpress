import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from './shared/Router';
// import Router from "./shared/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

// import Router from "./shared/Router";

// const App = () => {
//   return <Router />;
// };

export default App;
