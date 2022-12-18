import React, {Fragment} from 'react';
import styleBanner from "../../styles/Banner.module.css";

const Banner = () => { 
    return (
        <Fragment>
            <div className={styleBanner.container}>
                <div className={styleBanner.bannerContainer}>
                    <div className={styleBanner.header}>Cart</div>                
                </div>
            </div>
        </Fragment>
    )
}

export default Banner;