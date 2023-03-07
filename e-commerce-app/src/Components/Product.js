import Axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "./Card"
import "./styles/Product.css"
function Products(){
    const [products,setProducts] = useState()
    console.log(products)
    const [brands,setBrands] = useState()
    const [categories,setCategories] = useState()
    const [filters] = useState(new Map())
    const [price,setPrice] = useState({form:"",to:""})
    const [message,setMessage] = useState()
    const navigate = useNavigate()
    const getAllProducts = ()=>{
       
        Axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products")
        .then(res=>{
            let product = res.data.data
            let temp = []
            if(price.from && price.to){
                for(let i=0;i<product.length;i++){
                    if(parseInt(price.from) <=  product[i].price && parseInt(price.to) >=  product[i].price){
                        // console.log(price.to)
                        temp.push(product[i])
                    }
                }
                setProducts(temp)
                setPrice({form:"",to:""})

            }else{
                setProducts(res.data.data)
            }
            let brandmap = new Map()
            
            let Brands = []
            let Category = []
            for(let i=0;i < product.length;i++){
                let brand = product[i].brand
                let category = product[i].category
                if(!brandmap.has(brand)){
                    brandmap.set(brand,brand)
                    Brands.push(brand)
                }
                if(!brandmap.has(category)){
                    brandmap.set(category,category)
                    Category.push(category)
                }
            }
            setBrands(Brands)
            setCategories(Category)
        })
        .catch(err=>alert("Server is not responding"))  
    }
    useEffect(()=>{
        getAllProducts()
    },[])
    function getProducts(){
        console.log(filters)
        if(filters.size){
            Axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products")
            .then(res=>{
                let temp = res.data.data
                let product = []
                
                for(let i=0;i<temp.length;i++){
                    // console.log(temp[i])
                    if(filters.has(temp[i].brand) || filters.has(temp[i].category)){

                        console.log(temp[i].price === parseInt(price.from),"price")
                        if(price.from && price.to){
                            if(parseInt(price.from) <=  temp[i].price && parseInt(price.to) >=  temp[i].price){
                                product.push(temp[i])
                            }
                        }else{
                            product.push(temp[i])
                        }
                        
                    }
                }
                // console.log(product)
                setProducts(product)

            })
            .catch(err=>alert("Server is not responding"))
        }else{
            // console.log("get ALL")
            getAllProducts()
        }
       
    }
    function filterPrice(e){
        const {name,value} = e.target
        setPrice((prev)=>{
            return {...prev,[name]:value}
        })

    }
    const addFilter=(e,brand)=>{
        if(filters.has(brand)){
                
            filters.delete(brand)
        }
        else{
            filters.set(brand,1)
           
        }
        getProducts()
       
    }
    
    return <div id="product-container">
        {message?<h1 id="alert">{message}</h1>:""}
        <div id="my-cart">
            <span onClick={()=>navigate("/carts")}>My Cart</span>
        </div>
        <div id="filter">
            <div className="filters" id="brand-filter">
                <h5>Filter By Brands</h5>
                <div>
                    {brands && brands.map((brand,index)=>{
                        
                        return <p key={index}>
                            <input 
                                type="checkbox" 
                                onClick={(e)=>addFilter(e,brand)}
                            /> {brand}</p>
                    })}
                </div>
            </div>
            <div  className="filters" id="category-filter">
            <h5>Filter By Categories</h5>
                <div>
                    {categories && categories.map((category,index)=>{
                        return <p key={index}>
                            <input 
                                type="checkbox"
                                onClick={(e)=>addFilter(e,category)}
                            /> 
                                {category}</p>
                    })}
                </div>
                
            </div>
            <div  className="filters" id="price-filter">
            <h5>Filter By Price Range</h5>
            <div id="price-range">
                <input 
                    placeholder="From" 
                    type="number" 
                    name = "from"
                    value={price.from}
                    onChange={(e)=>filterPrice(e)}
                />
                <input
                    placeholder="To" 
                    type="number" 
                    name="to"
                    value={price.to}
                    onChange={(e)=>filterPrice(e)}
                />
            </div>
            <div id="price-btn">
            <button onClick={getProducts}>Filter</button>
            </div>
            
            </div>

        </div>
        <Card products={products} setMessage={setMessage}/>

    </div>
}

export default Products