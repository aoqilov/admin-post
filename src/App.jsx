import { useEffect } from "react";
import RoutesWrapper from "./routes/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { get } from "lodash";
function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));

  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/");
    } else {
      navigate("/auth/registration");
    }
  }, [isAuthenticated]);

  return <RoutesWrapper />;
}

export default App;
