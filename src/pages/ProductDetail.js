import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className='container'>
      <h2> Product Detail </h2> <p> Showing details for product# {id} </p>{" "}
    </div>
  );
};

export default ProductDetail;
