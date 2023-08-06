import React, { useState, useEffect } from "react";
import Layout from './../components/Layout/Layout';
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from "../context/cart";
import "../styles/CategoryProductStyles.css";


const SingleCategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [page,setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [cart,setCart] = useCart();

  useEffect(()=>{
    if(params?.slug) getCategoryproduct();
  },[params?.slug]);

  const getCategoryproduct = async () =>{
    try {
      const {data} = await axios.get(`/api/v1/product/category-product/${params.slug}`);
      setProducts(data?.product);
      setCategory(data?.category);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
          <h1 className="text-center">{category?.name} </h1>
          <h3 className="text-center">{products.length} products found </h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-img/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div> */}
        </div>
    </Layout>
  )
}

export default SingleCategory;
