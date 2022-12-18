import React, {Fragment, useEffect, useState} from "react";
import styleNav from "../../styles/Navbar.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import {useSelector, useDispatch} from "react-redux";
import {removeItem, deleteAllItemsInCart} from "../../redux/features/cart/cartSlice";
import { setSearch } from "../../redux/features/search/searchSlice";



const Navbar = () => {
    const {value} = useSelector(state => state.cart);
    const {cart, quantity, subtotal, isAnyNullQty} = useSelector(state => state.cart);
    const [isActiveCollection, setIsActiveCollection] = useState(false);
    const [isCartActive, setIsCartActive] = useState(false);
    const [items, setItems] = useState([]);
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isNoActive, setIsNoActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    

    const getItemsFromDB = async () =>{
        await axios.get('http://localhost:3004/items')
            .then(res => setItems(res.data));

    }
    const getUniqueCategory = () => {
        let data = [];
        items?.map(item => {
            if (!data.includes(item.category)){
                data.push(item.category);
            }
        })
        
        setUniqueCategory(data);
    }

    const handlerCollectionClick = () =>{
        setIsActiveCollection(!isActiveCollection);
        setIsCartActive(false);
        setIsSearchActive(false);

    }
    const handlerClickCart = () => {
        setIsCartActive(!isCartActive);
        setIsActiveCollection(false);
        setIsSearchActive(false);

    }
    const handlerClickPage = () => {
        setIsCartActive(false);
        setIsActiveCollection(false);
        setIsSearchActive(false);
        let searchText = '';
        dispatch(setSearch({searchText}));
    }
    const handlerClickCollectionItem = (category) => {
        handlerClickPage();
        router.push(`/shop/${category}`);
    
    }
    const handlerRemoveItem = (index) => {
        dispatch(removeItem({index}));
    }
    const handlerClickViewCart = () => {
        setIsCartActive(false);
        router.push("/detailCart");
    }
    const handlerClickCheckout = () =>{
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
                setIsCartActive(false);
                router.push("/");
            }, 3000);
            
        }
    }
    const handlerClickSearch = () => {
        let searchText = '';
        dispatch(setSearch({searchText}));
        setIsSearchActive(!isSearchActive);
        setIsActiveCollection(false);
        setIsCartActive(false);
    }
    const handlerClickCancelSearch = () => {
        let searchText = '';
        dispatch(setSearch({searchText}));
        setIsSearchActive(false);
    }
    const handlerPressEnter = (event) => {
        if (event.key==="Enter"){
            setIsSearchActive(false);
            let searchText = event.target.value;
            dispatch(setSearch({searchText}));
            router.push(`/shop/${searchText}`);
        }
    }
    useEffect(() => {
        getItemsFromDB();
        getUniqueCategory();
    }, [items[0]?.id]);

    return (     
        <Fragment>
            <div className={isCartActive? styleNav.showCart:styleNav.hide}>
                <div className={styleNav.cartContainer}>
                    <div className={styleNav.header}>Your Cart</div>
                    <div className={styleNav.body}>You have {quantity} items in your cart!</div>
                    <div className={styleNav.scrollCart}>
                        {
                            cart?.map((item,index) => {
                                return (
                                    <div className={styleNav.itemContainer} key={index}>
                                        <div>
                                            <img src={item.img1} alt={item.name} className={styleNav.itemImg}/>
                                        </div>
                                        <div className={styleNav.itemInfo}>
                                            <div className={styleNav.itemName}>{item.name}</div>
                                            <div className={styleNav.priceInfo}>
                                                <div className={item.discount===0? styleNav.itemFinalPrice:`${styleNav.itemFinalPrice} ${styleNav.line}`}>Rp {item.price}</div>
                                                <div className={item.discount===0? styleNav.hide:styleNav.itemFinalPrice}>Rp {item.finalPrice}</div>
                                            </div>
                                            <div className={styleNav.itemQty}>Qty: {item.qty}</div>
                                            <div className={styleNav.itemDelete} onClick={() => handlerRemoveItem(index)}>Remove</div>
                                        </div>
                                        <div className={styleNav.itemTotal}>
                                            <div className={item.discount===0? styleNav.priceTotal:`${styleNav.priceLine}`}>Rp {item.qty*item.price}</div>
                                            <div className={item.discount===0? styleNav.hide:styleNav.priceTotal}>Rp {item.qty*item.finalPrice}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className={styleNav.btnContainer}>
                        <div className={styleNav.subtotal}>
                            <div className={styleNav.subtotalText}>Subtotal: </div>
                            <div className={`${styleNav.subtotalText} ${styleNav.subtotalRight}`}>Rp {subtotal}</div>
                        </div>
                        <div className={styleNav.btn} onClick={handlerClickViewCart}>VIEW CART</div>
                        <div className={isAnyNullQty || cart?.length===0? `${styleNav.btn} ${styleNav.btnCheckout} ${styleNav.btnNoActive}`:`${styleNav.btn} ${styleNav.btnCheckout}`} onClick={handlerClickCheckout}>PROCEED TO CHECKOUT</div>
                    </div>
                </div>
            </div>
            <div className={isCartActive? `${styleNav.container} ${styleNav.flexContainer} ${styleNav.darkNav}`:`${styleNav.container} ${styleNav.flexContainer}`}>
                <div className={`${styleNav.flexContainer}`}>
                    <div className={`${styleNav.storeName}`}>fashionista</div>
                    <div className={`${styleNav.dot}`}>.</div>        
                </div>
                <div className={`${styleNav.flexContainer} ${styleNav.menuLink}`}>
                    <Link href={"/"} style={{textDecoration:'none', color:'#333333'}}><div className={`${styleNav.menuItem}`}>HOME</div></Link>
                    <Link href={"/shop/all"} style={{textDecoration:'none', color:'#333333'}} onClick={handlerClickPage}><div className={`${styleNav.menuItem}`}>SHOP</div></Link>
                    <Link href={"/shop/all"} style={{textDecoration:'none', color:'#333333'}} onClick={handlerClickPage}><div className={`${styleNav.menuItem}`}>BEST SELLERS</div></Link>
                    <div className={`${styleNav.menuItem}`} onClick={handlerCollectionClick}>COLLECTION</div>
                    <div className={`${styleNav.menuItem}`}>CONTACT US</div>
                </div>
                <div className={`${styleNav.flexContainer} ${styleNav.icon}`}>
                    <div className={styleNav.cartContainerImg}>
                        <div className={quantity===0? styleNav.hide:styleNav.popup}>{quantity}</div>
                        <img className={`${styleNav.iconImg}`} src={"/cart.png"}  onClick={handlerClickCart}/>
                    </div>
                    <img className={`${styleNav.iconImg}`} src={"/search.png"} onClick={handlerClickSearch}/>
                </div>
            </div>
            <div className={isActiveCollection? styleNav.show:styleNav.hide}>
                <div className={styleNav.collectionContainer}>
                    <div className={styleNav.gridCollection}>
                        {
                            uniqueCategory?.map(category => {
                                return (
                                    <div key={category} className={styleNav.itemCol} onClick={() => handlerClickCollectionItem(category)}>{category}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styleNav.imgContainer}>
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ65i8pxLhr_lpNJcd6W5lXx5CKZqU8cLRwGw&usqp=CAU"} alt="banner" className={styleNav.imgBanner} />
                    </div>
                </div>
            </div>
            <div className={isActiveCollection || isCartActive || isSearchActive? `${styleNav.show} ${styleNav.darker}`:styleNav.hide} onClick={handlerClickPage}></div>
            <div className={isActive? styleNav.noActivePopup:styleNav.hide}>Success!</div>
            <div className={isNoActive? styleNav.noActivePopup:styleNav.hide}>{`Cart can't be empty or any blank qty in cart!`}</div>
            <div className={isSearchActive? styleNav.serachActive:styleNav.hide}>
                <input type="text" className={styleNav.searchInput} placeholder="Search..." onKeyPress={event => handlerPressEnter(event)} defaultValue={`${value}`}/>
                <div className={styleNav.cancelSearch} onClick={handlerClickCancelSearch}>
                    <div className={styleNav.x}>X</div> 
                </div>
            </div>
        </Fragment>
    );
}
export default Navbar;

