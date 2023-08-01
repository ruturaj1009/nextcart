import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center d-flex flex-column justify-content-center align-items-center">
          <h1 className="mt-4">Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? <h5>No Products Found</h5>
              : <h5>{values?.results.length} Products Found</h5>
              }
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} >
                <img
                  src={`/api/v1/product/product-img/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={{color:"green",fontWeight:"500",fontSize:"25px"}}>{p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
