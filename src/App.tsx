import Header from "./components/header"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import TournamentPage from "./pages/TournamentPage";
import ScrollToTop from "./utiles/stt";

function App() {

  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className='App bg-white dark:bg-gray-900 min-h-screen transition-colors'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tm" element={<TournamentPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
