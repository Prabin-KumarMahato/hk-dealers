import React from "react";
import { Link } from "react-router-dom";

const WatchCard = ({ watch }) => {
  return (
    <div className='product-card'>
      <img
        src={
          watch.image ||
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
        alt={`${watch.brand} ${watch.model}`}
        className='product-image'
      />
      <div className='product-info'>
        <div className='product-brand'> {watch.brand} </div>{" "}
        <h3 className='product-name'> {watch.model} </h3>{" "}
        <div className='product-price'>
          {" "}
          HKD {watch.price ? watch.price.toLocaleString() : "—"}{" "}
        </div>{" "}
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {" "}
          {watch.condition}{" "}
        </p>{" "}
        <Link
          to={`/product/${watch.id}`}
          className='btn btn-primary'
          style={{ width: "100%", textAlign: "center" }}>
          View Details{" "}
        </Link>{" "}
      </div>{" "}
    </div>
  );
};

export default WatchCard;
