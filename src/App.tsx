import Header from "./components/header"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Routes, Route } from "react-router";
import Home from "./pages/Home";

function App() {

  return (
    <ThemeProvider>
      <div className='App bg-white dark:bg-gray-900 min-h-screen transition-colors'>
        <Header />
        <div className="pt-20">
          <Routes>  
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
