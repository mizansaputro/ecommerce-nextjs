import React, {Fragment} from 'react';
import styleOff from "../../styles/Offers.module.css";

const Offers = () => {
  return (
    <Fragment>
        <div className={`${styleOff.outer}`}>
            <div className={`${styleOff.container}`}>
                <div className={`${styleOff.containerText}`}>
                    <div className={`${styleOff.title}`}>Deal of the Week</div>
                    <div className={`${styleOff.body}`}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>
                    <div className={`${styleOff.btn}`}>Shop Now</div>
                </div>
                <div className={`${styleOff.containerImg}`}>
                    <img src="/bag.png" alt="" />
                </div>
            </div>
        </div>
    </Fragment>
  );
}

export default Offers;