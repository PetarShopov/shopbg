import React from 'react'
import Input from '../common/forms/Input'

const AddProductForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input
            name='name'
            placeholder='Name'
            value={props.product.name}
            onChange={props.onChange} />
        <br />
        <Input
            name='price'
            type='number'
            placeholder='Price'
            value={props.product.price}
            onChange={props.onChange} />
        <br />
        <Input
            name='image'
            type='url'
            placeholder='Image'
            value={props.product.image}
            onChange={props.onChange} />
        <br />
        <Input
            name='type'
            placeholder='Type'
            value={props.product.type}
            onChange={props.onChange} />
        <br />
        <Input
            name='status'
            placeholder='Status'
            value={props.product.status}
            onChange={props.onChange} />
        <br />
        <input type="submit" onClick={props.onSave}/>
    </form>
)

export default AddProductForm
