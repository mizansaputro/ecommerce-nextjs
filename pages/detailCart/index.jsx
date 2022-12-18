import React, {Fragment, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Banner from './banner';
import { updateItem, removeItem, getIsAnyNullQtyinCart, deleteAllItemsInCart } from '../../redux/features/cart/cartSlice';
import styleDC from "../../styles/DetailCart.module.css";
import axios from 'axios';
import { useRouter } from 'next/router';

const DetailCart = () => {
    const {cart, quantity, subtotal, isAnyNullQty} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDisc, setTotalDisc] = useState(0);
    const [isNoActive, setIsNoActive] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    const handlerClickRemove = (index) =>{
        dispatch(removeItem({index}));
    }
    const handlerInputQty = (event,index) => {
        const re = /^[0-9\b]+$/;

        let qty = event.target.value;
        if (qty === '' || re.test(qty)) {
            if (qty.length===1){
                if (qty!=="0"){
                    dispatch(updateItem({qty,index}))
                }
            }else{
                dispatch(updateItem({qty,index}));
            }
        }
        dispatch(getIsAnyNullQtyinCart());
    }
    const handlerMinusQty = (index) =>{
        let qty = cart[index].qty-1;
        dispatch(updateItem({qty,index}));
    }
    const handlerPlusQty = (index) =>{
        let qty = cart[index].qty+1;
        dispatch(updateItem({qty,index}));
    }
    const getTotalPriceAndTotalDiscount = () => {
        let totalP = 0;
        let totalD = 0;
        cart?.map(item => {
            totalP+=item.qty*item.price;
            totalD+= ((item.discount*item.price)/100)*item.qty;
        })
        setTotalPrice(totalP);
        setTotalDisc(totalD);
    }
    const handlerClickCheckout = () => {
        if (cart?.length===0 || isAnyNullQty){
            setIsNoActive(true);
            setTimeout(()=>{
                setIsNoActive(false);
            }, 3000);
        }else{
            setIsActive(true);
            setTimeout(()=>{
                setIsActive(false);
            }, 3000);
            axios.post('http://localhost:3004/buyer', {
                date: new Date().getTime(),
                cart: cart,
                qty: quantity,
                total: subtotal 
            })
            dispatch(deleteAllItemsInCart());
            setTimeout(()=>{
                router.push("/");
            }, 3000);
            
        }
    }
    useEffect(()=>{
        getTotalPriceAndTotalDiscount();     
    }, [subtotal, quantity]);
    
    return (
        <Fragment>
            <div className={isNoActive? styleDC.noActivePopup:styleDC.hide}>Cart can't be empty or any blank qty in cart!</div>
            <div className={isActive? styleDC.noActivePopup:styleDC.hide}>Success!</div>
            <Banner/>
            <div className={styleDC.container}>
                <div className={styleDC.innerContainer}>
                    <div className={styleDC.tableCartContainer}>
                        <div className={styleDC.headerContainer}>
                            <div className={styleDC.product}>
                                <div className={styleDC.header}>Product</div>
                            </div>
                            <div className={styleDC.qty}>
                                <div className={styleDC.header}>Qty</div>
                            </div>
                            <div className={styleDC.price}>
                                <div className={styleDC.header}>Price</div>
                            </div>
                        </div>
                        <div className={styleDC.itemsContainer}>
                            {
                                cart.map((item,index) => {
                                    let subtotal = item.qty!==''? item.price*item.qty:0;
                                    let finalSubtotal = item.qty!=='' && item.discount!==0? item.finalPrice*item.qty:0;;
                                    return (
                                        <div className={styleDC.itemContainer} key={index}>
                                            <div className={styleDC.productContainer}>
                                                <img src={item.img1} alt={item.name} className={styleDC.imgContainer}/>
                                                <div className={styleDC.info}>
                                                    <div className={styleDC.name}>{item.name}</div>
                                                    <div className={styleDC.remove} onClick={() => handlerClickRemove(index)}>Remove</div>
                                                </div>
                                            </div>
                                            <div className={styleDC.qtyContainer}>
                                                <div className={`${styleDC.inputQty} ${styleDC.btnQty}`} onClick={()=>handlerMinusQty(index)}>-</div>
                                                <input type="text" id="qty" value={item.qty} onChange={event=>handlerInputQty(event, index)} className={styleDC.inputQty}/>
                                                <div className={`${styleDC.inputQty} ${styleDC.btnQty}`} onClick={() => handlerPlusQty(index)}>+</div>
                                            </div>
                                            <div className={styleDC.priceContainer}>
                                                <div className={item.discount===0? styleDC.subtotalItem:`${styleDC.subtotalItem} ${styleDC.line}`}>Rp {subtotal}</div>
                                                <div className={item.discount===0? styleDC.hide:styleDC.subtotalItem}>Rp {finalSubtotal}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className={styleDC.tableSummaryContainer}>
                        <div className={styleDC.summaryHeaderContainer}>
                                <div className={styleDC.textSummary}>Summary</div>
                        </div>
                        <div className={styleDC.infoSummary}>
                            <div className={styleDC.flex}>
                                <div className={styleDC.title}>Subtotal</div>
                                <div className={styleDC.body}>Rp {totalPrice}</div>
                            </div>
                            <div className={styleDC.flex}>
                                <div className={styleDC.title}>Discount</div>
                                <div className={styleDC.body}>-Rp {totalDisc}</div>
                            </div>
                            <div className={`${styleDC.flex} ${styleDC.grandTotalContainer}`}>
                                <div className={styleDC.titleGranTotal}>Order Total</div>
                                <div className={styleDC.bodyGrandTotal}>Rp {subtotal}</div>
                            </div>
                            <div className={cart?.length===0 || isAnyNullQty? `${styleDC.btnCheckout} ${styleDC.noActive}`:styleDC.btnCheckout} onClick={handlerClickCheckout}>
                                <div className={styleDC.btnText}>CONTINUE TO CHECKOUT</div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailCart;