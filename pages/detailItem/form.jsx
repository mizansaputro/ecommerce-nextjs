import React, {Fragment, useEffect, useState} from 'react';
import styleForm from "../../styles/Form.module.css";
import {useSelector, useDispatch} from "react-redux";
import { addItem } from '../../redux/features/cart/cartSlice';

const Form = ({item}) => {
    const [finalPrice, setFinalPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState();
    const [qty, setQty] = useState(1);
    const [noActiveBtn, setNoActiveBtn] = useState(false);
    const [ActiveBtn, setActiveBtn] = useState(false);
    const [var1, setVar1] = useState("");
    const [var2, setVar2] = useState("");
    const [name, setName] = useState("");
    const [img1, setImg1] = useState("");

    const dispatch = useDispatch();

    const getFinalPrice = () => {
        const price = parseInt(item.price.substr(2));
        const disc = parseInt(item.discount.substr(0, item.discount.length-1));
        const fPrice = price - (price*disc/100);
        setFinalPrice(fPrice);
        setPrice(price);
    }
    const handlerClickVar1 = (event) =>{
        const var1Text = event.target.value;
        setVar1(var1Text);
    }
    const handlerClickVar2 = (event) =>{
        const var2Text = event.target.value;
        setVar2(var2Text);
    }
    const handlerClickUp = () => {
        setQty(qty+1);
    }
    const handlerClickDown = () => {
        if (qty-1>0){
            setQty(qty-1);
        }
    }
    const handlerInputQty = (event) => {
        const re = /^[0-9\b]+$/;

        const updateQty = event.target.value;
        if (updateQty === '' || re.test(updateQty)) {
            if (updateQty.length===1){
                if (updateQty!=="0"){
                    setQty(updateQty);
                }
            }else{
                setQty(updateQty);
            }
        }
    }
    const handlerClickAddToCart =  () => {
        if (qty.length===0){
            setNoActiveBtn(true);
            setTimeout(()=>{
                setNoActiveBtn(false);
            }, 3000);
        }else{
            setActiveBtn(true);
            setTimeout(()=>{
                setActiveBtn(false);
            }, 3000);
            dispatch(addItem({name, var1, var2, qty, price, finalPrice, discount, img1}));
             
        }
    }

    useEffect(()=> {
        getFinalPrice();
        setDiscount(parseInt(item.discount.substr(0, item.discount.length-1)));    
    }, [item, qty, noActiveBtn])
    useEffect(()=>{
        setName(item.name);
        setImg1(item.img1);  
        setVar1(item.color[0]);
        setVar2(item.size[0]);
    }, [item]);
    if (discount!==undefined){
        return (
            <Fragment>
                <div className={noActiveBtn? styleForm.show:styleForm.hide} >quantity cannot be empty!</div>
                <div className={ActiveBtn? styleForm.show:styleForm.hide} >Yeay! Product succesfully added to cart!</div>
                <div className={styleForm.container}>
                    <div className={styleForm.category}>{item.category}</div>
                    <div className={styleForm.name}>{item.name}</div>
                    <div className={styleForm.flex}>
                        <div className={discount===0? styleForm.price:`${styleForm.price} ${styleForm.discPrice}`}>Rp {price}</div>
                        <div className={discount===0? styleForm.noDisplay:styleForm.price}>Rp {finalPrice}</div>
                    </div>
                    <div className={styleForm.desc}>{item.description}</div>
                    <div className={styleForm.form}>
                        <div className={styleForm.formContainer}>
                            <label className={styleForm.info} htmlFor="color">Color</label>
                            <select id="color" className={styleForm.formInput} onChange={event => handlerClickVar1(event)}>
                                {
                                    item.color?.map(color => {
                                        return(
                                            <option value={color} key={color}>{color}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className={styleForm.formContainer}>
                            <label className={styleForm.info} htmlFor="size">Size</label>
                            <select id="size" className={styleForm.formInput} onChange={event => handlerClickVar2(event)}>
                                {
                                    item.size?.map(size => {
                                        return(
                                            <option value={size} key={size}>{size}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className={styleForm.formContainer}>
                            <div className={styleForm.info}>Quantity</div>
                            <input type="text" id="qty" value={qty} onChange={event=>handlerInputQty(event)} className={`${styleForm.formInput} ${styleForm.quantity}`}/>
                            <div className={styleForm.btnQtyContainer}>
                                <div className={styleForm.top} onClick={handlerClickUp}><i className={`${styleForm.arrow} ${styleForm.up}`}></i></div>
                                <div className={styleForm.bot} onClick={handlerClickDown}><i className={`${styleForm.arrow} ${styleForm.down}`}></i></div>
                            </div>
                            <button className={qty.length===0? `${styleForm.addToCartBtn} ${styleForm.noActiveBtn}`:styleForm.addToCartBtn} onClick={handlerClickAddToCart}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Form;