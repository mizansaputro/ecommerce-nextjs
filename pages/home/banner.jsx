import React, {Fragment} from "react";
import styleBanner from "../../styles/Banner.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <Fragment>
            <div className={styleBanner.container}>
                <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                    <div>
                        <img src="https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg" />       
                    </div>
                    <div>
                        <img src="http://graphicgoogle.com/wp-content/uploads/2017/10/Facebook-New-Fashion-Sale-Banner.jpg" />
                                            
                    </div>
                    <div>
                        <img src="https://finndit.com/assets/upload_file/company/Mea_Bella.jpg" />    
                    </div>
                </Carousel>
            </div>
        </Fragment>
    );
}

export default Banner;