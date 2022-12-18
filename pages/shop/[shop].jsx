import React, {Fragment, useState, useEffect, useCallback} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import Banner from './banner';
import Filter from './filter';
import styleShop from "../../styles/Shop.module.css";
import ItemsFilter from './itemsFilter';
import { useSelector } from 'react-redux';

const Shop = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        brands: [],
        colors: [],
        sizes: []
    });
    const [itemsFilter, setItemsFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPages, setPostsPerPage] = useState(6);
    const [sortBy, setSortBy] = useState("Best Sellers");
    const router = useRouter();
    const {shop} = router.query;
    const {value} = useSelector(state => state.search);


    
    
    useEffect(() => {
        const getItemsFromDB = async () =>{
            await axios.get('http://localhost:3004/items')
                .then(res => setItems(res.data));
        }
        getItemsFromDB();
        if (shop!=="all"){
            setFilters(prevFilters => ({
                ...prevFilters,
                category: shop
            }));
        }else{
            setFilters(prevFilters => ({
                ...prevFilters,
                category: "all"
            }));
        }
        
    }, [shop]);
    
    const lastPostIndex = currentPage*postsPerPages;
    const firstPostIndex = lastPostIndex-postsPerPages;
    let currentPost = itemsFilter.length!==0? itemsFilter?.slice(firstPostIndex,lastPostIndex):items.slice(firstPostIndex,lastPostIndex) ;

    return (
        <Fragment>
            <Banner shop={shop}/>
            <div className={styleShop.container}>
                <Filter filters={filters} setFilters={setFilters} items={items} itemsFilter={itemsFilter} setItemsFilter={setItemsFilter} value={value} shop={shop}  />
                <ItemsFilter postsPerPages={postsPerPages} setPostsPerPage={setPostsPerPage} sortBy={sortBy} setSortBy={setSortBy}
                    lastPostIndex={lastPostIndex}
                    firstPostIndex={firstPostIndex}
                    itemsFilter={itemsFilter.length!==0? itemsFilter:items}
                    setItemsFilter={setItemsFilter}
                    currentPost={currentPost}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    value={value}
                />
            </div>
        </Fragment>
    )
}

export default Shop;