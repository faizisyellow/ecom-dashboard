import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      <Navbar className="nav" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {" "}
            E-Commerce
          </Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {localStorage.getItem("user-info") ? (
              <>
                <Link to="/"> Products List</Link>
                <Link to="/addProducts">Add Products</Link>
                <Link to="/search">Search Products</Link>
              </>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </Nav>
          {localStorage.getItem("user-info") ? (
            <Nav >
              <NavDropdown  title={user && user.name}>
                <NavDropdown.ItemText onClick={logout}>Logout</NavDropdown.ItemText>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
