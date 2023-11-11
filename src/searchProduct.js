import Header from "./header";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SearchProducts() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  async function search(key) {
    console.warn(key);
    let result = await fetch(`http://localhost:8000/api/search/${key}`);
    result = await result.json();
    setData(result);
  }

  async function deleteOperation(id) {
    if (window.confirm(`Are you sure to delete product with id ${id}?`)) {
      let result = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      search();
      alert(`Product has been deleted`);
      navigate("/");
    } else {
      search();
    }
  }

  return (
    <div>
      <Header />
      <h1 className="mb-4"> Search Products</h1>
      <div className="col-sm-6 offset-sm-3">
        <input onChange={(e) => search(e.target.value)} type="text" className="form-control" placeholder="Type to search for a product"></input>
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img style={{ width: 100 }} src={`http://localhost:8000/${item.file_path}`} alt="gambar"></img>
                </td>
                <td>
                  <div className="d-flex">
                    <span className="btn Delete mb-3" onClick={() => deleteOperation(item.id)}>
                      Delete
                    </span>
                    <Link to={`/updateProducts/${item.id}`}>
                      <span className="btn Update ms-3">Update</span>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default SearchProducts;
