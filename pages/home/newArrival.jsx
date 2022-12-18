import React, {Fragment, useState, useEffect} from 'react';
import {useRouter} from "next/router";
import styleNA from "../../styles/NewArrival.module.css";

const NewArrival = ({items}) => {
    const [itemsDescendingByDate, setItemsDescendingByDate] = useState([]);
    const router = useRouter();
    const handleSortItemsDescendingByDate = () => {
        return items.sort((a, b) => {
            a = a.date_post.split('/');
            b = b.date_post.split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        })
    }

    const handlerClickItem = (id) =>{
        router.push(`/detailItem/${id}`);
    }

    useEffect (() => {
        setItemsDescendingByDate(handleSortItemsDescendingByDate().slice(0).reverse().slice(0,8))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <Fragment>
            <div className={styleNA.header}>
                <div className={styleNA.title}>New Arrival</div>
                <div className={styleNA.body}>Add our products to your weekly lineup</div>
            </div>
            <div className={styleNA.gridContainer}>
            {
                itemsDescendingByDate?.map(item => {
                    let isDiscount = false;
                    let price = parseInt(item.price.substr(2));
                    let disc = parseInt(item.discount.substr(0,item.discount.length-1));
                    let finalPrice = price - (price*disc/100);
                    if (disc!==0){
                        isDiscount = true;
                    }
                    return (
                        <button key={item.id} className={styleNA.btn} onClick={() => handlerClickItem(item.id)} >
                            <div className={styleNA.img}>
                                <div className={isDiscount? styleNA.show:styleNA.hide}>
                                    <div className={styleNA.textSale}>SALE</div>
                                </div>
                                <img src={item.img1} alt={item.name}/>
                            </div>
                            <div className={styleNA.info}>
                                <div className={styleNA.name}>{item.name}</div>
                                <div className={isDiscount? `${styleNA.price} ${styleNA.line}`:styleNA.price}>
                                    Rp {price}
                                </div>
                                <div className={isDiscount? styleNA.finalPrice:styleNA.noDisplay}>
                                    Rp {finalPrice}
                                </div>
                            </div>                  
                        </button>
                    );
                })
            }
            </div>
        </Fragment>
    );
}

export default NewArrival;