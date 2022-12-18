import React, {Fragment, useEffect} from 'react';
import styleBanner from "../../styles/Banner.module.css";

const Banner = ({shop}) => { 
    return (
        <Fragment>
            <div className={styleBanner.container}>
                <div className={styleBanner.bannerContainer}>
                    {
                        shop!=="all"? 
                            <div className={styleBanner.header}>{shop}</div>
                                :    
                            <div className={styleBanner.banner}>
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/40058396168299.5ea8569a1915f.png" alt="banner" className={styleBanner.banner}/>
                            </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Banner;