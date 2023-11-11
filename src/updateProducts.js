import Header from "./header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function UpdateProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { id } = useParams();

  console.warn("params", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await fetch(`http://localhost:8000/api/product/${id}`);
        result = await result.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function editProduct(id) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("price", price);
      formData.append("name", name);
      formData.append("description", description);

      const response = await fetch(`http://localhost:8000/api/updateproduct/${id}?_method=PUT`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product has been updated!");
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
      <h1>Update Products</h1>
      <div className="col-sm-6 offset-sm-3 mt-4 d-flex flex-wrap flex-column">
        <input type="text" className="form-controll mb-4" defaultValue={data.name} onChange={(el) => setName(el.target.value)}></input>
        <input type="text" className="form-controll mb-4" defaultValue={data.price} onChange={(el) => setPrice(el.target.value)}></input>
        <input type="text" className="form-controll mb-4" defaultValue={data.description} onChange={(el) => setDescription(el.target.value)}></input>
        <input type="file" className="form-controll mb-4" defaultValue={data.file_path} onChange={(el) => setFile(el.target.files[0])}></input>
        <img width={"50%"} height={"50%"} src={`http://localhost:8000/${data.file_path}`}></img>
        <button className="btn btn-danger mb-5" onClick={() => editProduct(data.id)}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProducts;
