import React from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';

const Products = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu/>
              </div>
              <div className="col-md-9">
                <div className="card w-75 p-2">
                <h1>create product</h1>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products
