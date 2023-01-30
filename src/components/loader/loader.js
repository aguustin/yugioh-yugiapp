import React from "react";
import card from '../../imgs/card.png';
import "./loader.css";


export const SignSuccesfully = () => {
  return (
    <div className="sucess">
      <p>Account created succesfully!</p>
    </div>
  )
}

export const Error = () => {
  return (
    <div className="error">
      <p>Ocurrio un error!</p>
    </div>
  )
}


export const DeletedCard = () => {
  return (
    <div className="card-deleted">
      <p>Card deleted succesfully!</p>
    </div>
  )
}

export const CardSpinner = () => {
  return (
    <div className="loading-img">
      <img src={card} alt=""></img>
    </div>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
    </div>
  )
}

export default LoadingSpinner;
