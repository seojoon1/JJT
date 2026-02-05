import Header from "./components/header"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Routes, Route } from "react-router";
function App() {

  return (
    <ThemeProvider>
      <div className='App bg-white dark:bg-gray-900 min-h-screen transition-colors'>
        <Header />
        <Routes>  
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
