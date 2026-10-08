import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import PropertyDetails from "./pages/PropertyDetails"
import FloatingButton from "./components/UI/FloatingButton"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/imoveis/:slug" element={<PropertyDetails />} />
      </Routes>
      <FloatingButton />
    </BrowserRouter>
  )
}

export default App
