import React, {Fragment, useEffect} from "react";
import stylePage from "../../styles/Pagination.module.css";

const Pagination = (props) => {
    let pages = [];
    
    for (let i=1; i<= Math.ceil(props.totalPosts/props.postsPerPages);i++){
        pages.push(i);
    }
    useEffect(()=> {
        window.scrollTo(0, 350)

    },[props.currentPage])
    return (
        <Fragment>
            <div className={stylePage.pagination}>
                {
                    pages.map((page, index) => {
                        return (
                            <button key={index} onClick={() => props.setCurrentPage(page)} className=
                            {page===props.currentPage? stylePage.active : ""}>
                                {page}
                            </button>
                        )
                    })
                }
            </div>
        </Fragment>
    );
}
export default Pagination;