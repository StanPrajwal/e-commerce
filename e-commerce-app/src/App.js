import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import Products from "./Components/Product";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Products/>}/>
        <Route path="/carts" element={<Cart/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
