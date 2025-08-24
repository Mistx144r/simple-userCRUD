import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./src/components/pages/LoginPage";
import RegisterPage from "./src/components/pages/RegisterPage";
import Dashboard from "./src/components/pages/Dashboard";
import PrivateRoute from "./src/components/utils/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
