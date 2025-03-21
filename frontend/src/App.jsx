import { AppRouter } from "./router/AppRouter"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserProvider } from "./utils/UserContext";

function App() {

  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default App
