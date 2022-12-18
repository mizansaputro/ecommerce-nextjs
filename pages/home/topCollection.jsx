import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const _ = require("lodash");
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-grid-carousel';

import styleTC from "../../styles/TopCollection.module.css";

const TopCollection = ({items}) => {
    const [itemsDescendingByBuy, setItemsDescendingByBuy] = useState([]);
    const router = useRouter();

    const handleSortItemsDescendingByBuy = () => {
        return _.orderBy(items, ['buy'], ['desc']);
    }
    const handlerClickItem = (id) =>{
        router.push(`/detailItem/${id}`);
    }
    useEffect (() => {
        setItemsDescendingByBuy(handleSortItemsDescendingByBuy().slice(0,8))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);
    
    return (
        <Fragment>
            <div className={`${styleTC.textHeader}`}>
                <div className={`${styleTC.textTitle}`}>Top Collection</div>
                <div className={`${styleTC.textBody}`}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>
            </div>
            <div className={`${styleTC.container}`} >
                <Carousel containerClassName={`${styleTC.containerCarousel}`} cols={4} rows={1} gap={10} loop>
                    {itemsDescendingByBuy?.map((item) => {
                        let isDiscount = false;
                        let price = parseInt(item.price.substr(2));
                        let disc = parseInt(item.discount.substr(0,item.discount.length-1));
                        let finalPrice = price - (price*disc/100);
                        if (disc!==0){
                            isDiscount = true;
                        }
                        return (
                            <Carousel.Item key={item.id} >
                                <button  className={`${styleTC.itemContainerBtn}`}  onClick={() => handlerClickItem(item.id)}>
                                    <div className={`${styleTC.imgContainer}`}>
                                        <div className={isDiscount? styleTC.show:styleTC.hide}>
                                            <div className={styleTC.textSale}>SALE</div>
                                        </div>
                                        <img src={item.img1} alt={item.id} className={`${styleTC.imageComp}`} />
                                    </div>
                                    <div className={`${styleTC.captionItem}`}>
                                        <p className={`${styleTC.nameItem}`}>{item.name}</p>
                                        <p className={isDiscount? `${styleTC.priceItem} ${styleTC.line}`:styleTC.priceItem}>Rp {price}</p>
                                        <p className={isDiscount? styleTC.priceItem:styleTC.hide}>Rp {finalPrice}</p>
                                    </div>          
                                </button>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </Fragment>
    )
}

export default TopCollection;

