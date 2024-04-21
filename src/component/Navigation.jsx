import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navigation() {
  const cartProducts = useSelector((state) => state.cart);
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Fake Store
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to={"/cart"} style={{ textDecoration: "none" }}>
              <div className="cart-icon-container">
                <i
                  className="bi bi-cart-check"
                  style={{ fontSize: "25px" }}
                ></i>
                <Badge className="cart-badge" bg="success">
                  {cartProducts.length}
                </Badge>
              </div>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
