import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function ProductDescription() {
    const allProducts = useSelector(state => state.Product.productsList)
    var thisProduct = []
    const { id } = useParams()

    const filterProducts = () => {
        return allProducts.filter(product => product._id === id)
    }

    thisProduct = filterProducts()
    
    console.log(thisProduct)

    return (
        <>
            {thisProduct.length > 0 && <h4>{thisProduct[0].description}</h4>}
        </>
    )
}