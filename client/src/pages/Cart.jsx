import React,{useState,useEffect} from 'react';
import Layout from './../components/Layout/Layout';
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";
import { useRef } from 'react';
import { Button} from 'antd';
import {AiOutlinePlus, AiOutlineMinus,AiFillDelete} from 'react-icons/ai';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import  toast  from 'react-hot-toast';

const Cart = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    // const [drop,setDrop] = useState(false);
    const navigate = useNavigate();
    const windowSize = useRef([window.innerWidth]);

     

    const totalPrice = () => {
        try {
          let total = 0;
          cart?.map((item) => {
            total = total + item.price;
            
          });
          
          return total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          });
        } catch (error) {
          console.log(error);
        }
      };

      const removeCartItem = (pid) => {
        try {
          let myCart = [...cart];
          let index = myCart.findIndex((item) => item._id === pid);
          myCart.splice(index, 1);
          setCart(myCart);
          localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
          console.log(error);
        }
      };

      const getToken = async ()=>{
        try {
          const { data } = await axios.get("/api/v1/product/braintree/token");
          setClientToken(data?.clientToken);
          
        } catch (error) {
          console.log(error)
        }
      };

      useEffect(() => {
        getToken();
      }, [auth?.token]);

      const handlePayment = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          const { data } = await axios.post("/api/v1/product/braintree/payment", {
            nonce,
            cart,
          });
          setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/dashboard/user/orders");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

      // const handledrop = () =>{
      //   setDrop(true);
      // }

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row" style={{width:windowSize.current[0]}}>
          <div className="col-md-12" >
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-img/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{minHeight:"140px", maxWidth:"140px"}}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn flex-column ">
                  <div className='flex-row'>
                  <Button type="primary" shape="circle" icon={<AiOutlinePlus/>}></Button>
                  {p.price}
                  <Button type="primary" shape="circle" icon={<AiOutlineMinus/>}></Button>
                  </div>
                  <div className='mt-2'>
                  <Button type="primary" shape="round" icon={<AiFillDelete />} onClick={() => removeCartItem(p._id)}>Remove</Button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                        googlePay:{
                          flow:"vault",
                        }
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
