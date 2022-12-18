import React, {Fragment, useState, useEffect} from 'react';
import axios from "axios";
import styleRec from "../../styles/Recommendation.module.css";
import {useRouter} from "next/router";

const Recommendation = () => {
    const [items, setItems] = useState([]);
    const router = useRouter();

    const getItemsFromDB = () =>{
        axios.get('http://localhost:3004/items')
            .then(res => setItems(res.data));
    }
    const handlerClickItem = (id) =>{
        router.push(`/detailItem/${id}`);
    }
    useEffect(() => {
        getItemsFromDB();
    }, [setItems]);

    return (
        <Fragment>
            <div className={styleRec.header}>Suggested for You</div>
            <div className={styleRec.gridContainer}>
                {
                    items.slice(0,5)?.map( item => {
                        let isDiscount = false;
                        let price = parseInt(item.price.substr(2));
                        let disc = parseInt(item.discount.substr(0,item.discount.length-1));
                        let finalPrice = price - (price*disc/100);
                        if (disc!==0){
                            isDiscount = true;
                        }
                        return(
                            <button key={item.id} className={styleRec.itemContainer} onClick={() => handlerClickItem(item.id)}>
                                <div className={isDiscount? styleRec.show:styleRec.hide}>
                                    <div className={styleRec.textSale}>SALE</div>
                                </div>
                                <img src={item.img1} alt={item.name} className={styleRec.itemImg}/>
                                <div className={styleRec.name}>{item.name}</div>
                                <div className={styleRec.info}>
                                    <div className={isDiscount? `${styleRec.price} ${styleRec.line}`:styleRec.price}>
                                        Rp {price}
                                    </div>
                                    <div className={isDiscount? styleRec.finalPrice:styleRec.noDisplay}>
                                        Rp {finalPrice}
                                    </div>
                                </div>   
                            </button>
                        );
                    })
                }
            </div>
        </Fragment>
    )
}

export default Recommendation;