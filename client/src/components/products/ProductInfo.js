import React from 'react'
import { Link } from 'react-router-dom'

const ProductInfo = (props) => (
    <li className='product-info'>
        <span>{props.name}</span>
        <img src={props.image} alt={props.name}/>
        <Link to={`/products/${props._id}`}>More Details</Link>
    </li>
)

export default ProductInfo
