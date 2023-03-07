function Card({products,setMessage}) {
    const addToCart = (id) =>{
        if(localStorage.getItem("cart")){
            let cart = JSON.parse(localStorage.getItem("cart"))
            if(cart.indexOf(id) !== -1){
                setMessage('Product already in the cart.')
                setTimeout(()=>{
                    setMessage('')
                },3000)
                
            }else{
                cart.push(id)
                localStorage.setItem("cart",JSON.stringify(cart))
                setMessage('Product added to The cart')
                setTimeout(()=>{
                    setMessage('')
                },3000)
                
            }
        }else{
            let cart = [id]
            localStorage.setItem("cart",JSON.stringify(cart))
            
        }
    }
  return (
    <div className="cards">
      {products &&
        products.map((item) => {
          return (
            <div className="card" key={item.id}>
              <img width="100%" src={item.image} alt={item.title} />
              <div className="details">
                <h3>{item.title}</h3>
                <p>Brand : {item.brand}</p>
                <p>Category : {item.category}</p>
                <p id="price">Price : {item.price}</p>
                <div id="cart-btn">
                  <button onClick={() => addToCart(item.id)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Card
