import Header from "./header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleAddProduct() {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("price", price);
      formData.append("name", name);
      formData.append("description", description);

      const response = await fetch("http://localhost:8000/api/addProduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product Added!");
        navigate('/')
      } else {
        const errorData = await response.json();
        console.error("Failed to add product. Error:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div>
      <Header />
      <h1> Add Products</h1>
      <div className="col-sm-6 offset-sm-3 mt-4">
        <input type="text" className="form-control mb-4" placeholder="Name" onChange={(el) => setName(el.target.value)}></input>
        <input type="file" className="form-control mb-4" placeholder="File" onChange={(el) => setFile(el.target.files[0])}></input>
        <input type="text" className="form-control mb-4" placeholder="Price" onChange={(el) => setPrice(el.target.value)}></input>
        <textarea type="text" className="form-control mb-4" placeholder="Description" onChange={(el) => setDescription(el.target.value)}></textarea>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}
export default AddProducts;
