import React, { Fragment, useEffect } from 'react';
import styleDI from "../../styles/DetailItem.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Form from './form';
import Recommendation from './recommendation';

const DetailItem = ({item}) => {
    return (
        <Fragment>
            <div className={styleDI.outer}>
                <div className={styleDI.container}>
                    <div className={styleDI.carousel}>
                        <Carousel 
                            infiniteLoop={true}
                            showArrows={true}
                            showStatus={false}
                            showIndicators={true}
                            dynamicHeight={true}
                            thumbWidth={100}
                            className={styleDI.carousel}
                        >
                            <div>
                                <img src={item.img1} alt="img-1" className={styleDI.img} />
                            </div>
                            <div>
                                <img src={item.img2} alt="img-2"/>
                            </div>
                            <div>
                                <img src={item.img3} alt="img-3"/>
                            </div>
                            <div>
                                <img src={item.img4} alt="img-4"/>
                            </div>
                        </Carousel>
                    </div>
                    <div className={styleDI.form}>
                        <Form item={item}/>
                    </div>
                </div>
                <div className={styleDI.recommendationContainer}>
                    <Recommendation/>
                </div>
            </div>
        </Fragment>
    );
}
export default DetailItem;

export const getServerSideProps = async ({params}) => {
    const response = await fetch(`http://localhost:3004/items/${params.detailitem}`);
    const data = await response.json();
    return {
        props: {
            item: data
        }
    }
}