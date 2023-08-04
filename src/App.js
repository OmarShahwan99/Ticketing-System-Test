import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import TicketDetails from "./components/Tickets/TicketDetails";
import IndexPage from "./pages/IndexPage";

const clientQuery = new QueryClient();

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <QueryClientProvider client={clientQuery}>
      <DefaultLayout>
        <Routes>
          {isAuth && <Route path="/" element={<IndexPage />} />}
          {isAuth && <Route path="/:id" element={<TicketDetails />} />}
          {!isAuth && <Route path="/login" element={<Login />} />}
          {!isAuth && <Route path="/register" element={<Register />} />}
        </Routes>
      </DefaultLayout>
    </QueryClientProvider>
  );
}

export default App;
