import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import styleCat from "../../styles/Category.module.css";
import Carousel from 'react-grid-carousel';


const Category = ({items}) => {
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");
    const router = useRouter();

    const getUniqueCategory = () => {
        let data = [];
        items?.map(item => {
            if (!data.includes(item.category)){
                data.push(item.category);
            }
        })
        if (activeCategory?.length===0 || activeCategory===undefined){
            setActiveCategory(data[0]);
        }
        setUniqueCategory(data);
    }
    const handlerChooseCategory = (event) => {
        const categoryChoosen = event.target.innerText;
        setActiveCategory(categoryChoosen);
    }
    const handlerClickItem = (id) =>{
        router.push(`/detailItem/${id}`);
    }
    useEffect (() => {
        getUniqueCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, activeCategory]);
    
    return (
        <Fragment>
            <div className={styleCat.container}>  
                <div className={styleCat.fillContainer}>
                    <div className={styleCat.bgContainer}>
                        <div className={styleCat.innerContainer}>
                            <div className={styleCat.title}>Men</div>
                            <div className={styleCat.body}>Add our products to your weekly lineup</div>
                            <div className={styleCat.btn}>
                                <div className={styleCat.btnText}>Discover More</div> 
                            </div>
                        </div>
                    </div>
                    <div className={styleCat.carouselContainer}>
                        <div className={styleCat.chooseCatContainer}>
                            <div className={styleCat.flex}>
                                {
                                    uniqueCategory?.map((category,index) => {
                                        return (
                                            <div key={index} onClick={event => handlerChooseCategory(event)} className={activeCategory===category? styleCat.catText : `${styleCat.catText} ${styleCat.noActive}`}>
                                                {category}
                                            </div>
                                        );
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className={styleCat.categoryDisplay}>
                            <Carousel className={styleCat.gridCategory} cols={3} rows={1} gap={10} loop>
                            {
                                items.map((item, index) => {
                                    let isDiscount = false;
                                    let price = parseInt(item.price.substr(2));
                                    let disc = parseInt(item.discount.substr(0,item.discount.length-1));
                                    let finalPrice = price - (price*disc/100);
                                    if (disc!==0){
                                        isDiscount = true;
                                    }
                                    if (item.category===activeCategory){
                                        return (
                                            <Carousel.Item key={index}>
                                                <button className={styleCat.btnContainer} onClick={() => handlerClickItem(item.id)}>
                                                    <div className={isDiscount? styleCat.show:styleCat.hide}>
                                                        <div className={styleCat.textSale}>SALE</div>
                                                    </div>
                                                    <img src={item.img1} alt={item.name} className={styleCat.categoryContainer}/>
                                                    <div className={styleCat.info}>
                                                        <div className={styleCat.name}>{item.name}</div>
                                                        <div className={isDiscount? `${styleCat.price} ${styleCat.line}`:styleCat.price}>
                                                            Rp {price}
                                                        </div>
                                                        <div className={isDiscount? styleCat.finalPrice:styleCat.noDisplay}>
                                                            Rp {finalPrice}
                                                        </div>
                                                    </div>
                                                </button>
                                            </Carousel.Item>
                                        );
                                    }
                                    return null;
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Category;