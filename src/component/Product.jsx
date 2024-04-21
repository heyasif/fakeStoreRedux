import { useSelector, useDispatch } from "react-redux";
import { addToCart, increment, decrement } from "../store/cartSlice";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function Product() {
  const [data, setData] = useState([]);
  const cart = useSelector((state) => state.cart); // Use 'cart' instead of 'Cart'
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      setData(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center" }}>Product Component</h1> <br />
      <div className="row">
        {data?.map((product, index) => {
          const cartItem = cart?.find((item) => item.id === product.id);
          return (
            <div className="col-md-3" key={index}>
              <Card style={{ width: "18rem", margin: "20px" }}>
                <div className="text-center">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{
                      width: "100px",
                      height: "130px",
                      marginTop: "30px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ height: "50px", overflow: "hidden" }}>
                      {product.title}
                    </Card.Title>
                    <Card.Text style={{ height: "50px", overflow: "hidden" }}>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {cartItem ? (
                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => handleDecrement(product.id)}
                        >
                          -
                        </Button>{" "}
                        {cartItem.quantity}{" "}
                        <Button
                          variant="secondary"
                          onClick={() => handleIncrement(product.id)}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Card.Footer>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
