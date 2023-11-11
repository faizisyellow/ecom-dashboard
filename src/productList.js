import React, { useState, useEffect } from "react";
import Header from "./header";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  console.warn("result", data);

  async function deleteOperation(id) {
    if (window.confirm(`Are you sure to delete product with id ${id}?`)) {
      let result = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      getData();
      alert(`Product has been deleted`);
    } else {
      getData();
    }
  }
  async function getData() {
    const fetchData = async () => {
      try {
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }
  return (
    <div>
      <Header />
      <h1 className="mt-5">Product List</h1>
      <div className="col-sm-8 offset-sm-2 mt-5">
        <Table striped bordered hover>
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
            <tbody>
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
                    <span className="btn Delete" onClick={() => deleteOperation(item.id)}>
                      Delete
                    </span>
                    <Link to={`updateProducts/${item.id}`}>
                      <span className="btn Update ms-sm-3">Update</span>
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
export default ProductList;
