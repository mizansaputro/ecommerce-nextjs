import React, {Fragment} from 'react';
import stylePoster from "../../styles/Poster.module.css";

const Poster = () => {
    return (
        <Fragment>
            <div className={stylePoster.container}>
                <div className={stylePoster.gridContainer}>
                    <div className={`${stylePoster.bgContainer} ${stylePoster.men}`}>
                        <div className={stylePoster.title}>Men</div>
                    </div>
                    <div className={`${stylePoster.bgContainer} ${stylePoster.women}`}>
                        <div className={stylePoster.title}>Women</div>
                    </div>
                    <div className={`${stylePoster.bgContainer} ${stylePoster.kids}`}>
                        <div className={stylePoster.title}>Kids</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Poster;