import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import axios from "axios";

// IMPORT MODULES

// IMPORT COMPONENTS
import Divider from "material-ui/Divider";
// IMPORT CSS
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };

    // BIND FUNCTIONS HERE
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
  }

  //   LIFESTYLE FUNCTIONS
  componentDidMount() {
    axios.get("api/cart").then(response => {
      this.setState({ cart: response.data.tracks });
    });
  }

  // CUSTOM FUNCS
  handleDeleteFromCart(track) {
    axios
      .delete(`/api/cart/${track}`)
      .then(response => this.setState({ cart: response.data.tracks }))
      .catch(console.log);
  }

  // RENDER
  render() {
    let cartDisplay =
      this.state.cart && this.state.cart.length > 0 ? (
        this.state.cart.map(track => {
          return (
            <div className="cart-item" key={track}>
              <div className="cart-left">
                <p>
                  {track}
                  <IconButton
                    onClick={() => this.handleDeleteFromCart(track)}
                    iconClassName="fa fa-trash"
                    iconStyle={{ iconHoverColor: "#faa916" }}
                    tooltip={"Delete From Cart"}
                    touch={true}
                    tooltipPosition="bottom-right"
                  />
                </p>
              </div>
              <div className="cart-right">
                <span style={{ fontWeight: "bold" }}>$10.00</span>
              </div>
            </div>
          );
        })
      ) : (
        <p>Your Cart is Empty </p>
      );
    return (
      <div>
        <div>{cartDisplay}</div>
        <Divider />
        <div
          style={{
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          Total: ${this.state.cart.length * 10}.00
        </div>
      </div>
    );
  }
}
// MAPSTATE TO PROPS FOR REDUX
// function mapStateToProps(state){
//     return state
// }

// EXPORT COMPONENT
export default Cart;
// REDUX
// export default connect(mapStateToProps, outputActions)();
