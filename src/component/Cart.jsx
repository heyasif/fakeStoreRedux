import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increment, decrement } from "../store/cartSlice"; // Make sure to import these
import { useEffect, useState } from "react";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart); // Adjusted variable name for clarity
  const dispatch = useDispatch();

  function handleRemoveFromCart(id) {
    dispatch(removeFromCart(id));
  }

  function handleIncrementQuantity(id) {
    dispatch(increment(id));
  }

  function handleDecrementQuantity(id) {
    dispatch(decrement(id));
  }

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center" }}>Cart Component</h1> <br />
      <div className="row">
        {cartItems?.map((item, index) => (
          <div className="col-md-3" key={index}>
            <Card style={{ width: "18rem", margin: "20px" }}>
              <div className="text-center">
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{
                    width: "100px",
                    height: "130px",
                    marginTop: "30px",
                  }}
                />

                <Card.Body>
                  <Card.Title style={{ height: "50px", overflow: "hidden" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{ height: "50px", overflow: "hidden" }}>
                    {item.description}
                  </Card.Text>
                  {/* Display Quantity */}
                  <div>
                    <Button
                      variant="secondary"
                      onClick={() => handleDecrementQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span> {item.quantity} </span>
                    <Button
                      variant="secondary"
                      onClick={() => handleIncrementQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Footer>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
