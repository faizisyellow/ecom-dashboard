// import logo from "./logo.svg";
import "./App.css";
// import Header from "./header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addproducts from "./addProducts";
import Updateproducts from "./updateProducts";
import Register from "./register";
import Login from "./login";
import Protected from "./protected";
import ProductList from "./productList";
import SearchProduct from "./searchProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProducts" element={<Protected Cmp={Addproducts} />} />
          <Route path="/updateProducts/:id" element={<Protected Cmp={Updateproducts} />} />
          <Route path="/search" element={<Protected Cmp={SearchProduct} />} />
          <Route path="/" element={<Protected Cmp={ProductList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
