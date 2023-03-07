import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cart.css"

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [cartmap] = useState(new Map());
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()
  const getData = (id) => {
   
    Axios.get(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`
    )
      .then((res) => {
        // console.log(res)
        if (!cartmap.has(id)) {
            cartmap.set(id, res.data.data);
            // console.log("totllllll")
            setTotal(prev=>prev+res.data.data.price)
            setCartData((cartData) => {
                return [...cartData, res.data.data];
            });
        }
      })
      .catch((err) => alert("Server not responding"));
  };
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart.length) {
        cart.forEach((element) => {
          getData(element);
        });
      }
    }
  }, []);
 
  // console.log(cartData);
  function removerCart(id){
    let cart = JSON.parse(localStorage.getItem("cart"))
    let temp = []
    for(let i=0;i<cart.length;i++){
        if(id !== cart[i]){
            temp.push(cart[i])
        }
    }
    localStorage.setItem("cart",JSON.stringify(temp))
    let cartTemp = cartData.filter((data)=>{
      if(data.id !== id){
        return data
      }
    })
    setCartData(cartTemp)
    
  }
  return (
      <div id="cart-container">
        <div id="products">
            <span onClick={()=>navigate('/')}>Product Page</span>
        </div>
        <div id="total-price">
            <span id="cart-total">Total Price :
             <span> {total}</span> Rs.</span>
        </div>
        <div id="carts">
        {cartData &&
          cartData.map((item) => {
            return (
              <div className="card" key={item.id} id="cart-card">
                <img width="100%" src={item.image} alt={item.title} />
                <div className="details">
                  <h3>{item.title}</h3>
                  <p>Brand : {item.brand}</p>
                  <p>Category : {item.category}</p>
                  <p id="price">Price : {item.price}</p>
                  <div className="remove-btn">
                    <button onClick={()=>removerCart(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
  );
}
export default Cart;
