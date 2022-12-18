import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styleItemsFil from "../../styles/ItemsFilter.module.css";
import Pagination from './pagination';
const _ = require("lodash"); 


const ItemsFilter = ({postsPerPages, setPostsPerPage, sortBy, setSortBy, firstPostIndex, lastPostIndex, itemsFilter, setItemsFilter, currentPage, setCurrentPage, currentPost, value}) => {
  const limitPosts = [6,12,18];
  const sort = ["Best Sellers", "Lowest Price", "Highest Price"];
  const router = useRouter(); 

  const handlerClickPageLimit = (event) => {
    const limitPostChoosen = event.target.value;

    setPostsPerPage(limitPostChoosen);
    setCurrentPage(1);
  }
  const pushFinalPriceToArrayOfDictionary = (data) =>{
    let price = 0;
    let discount = 0;
    let finalPrice = 0;
    data?.map((item,index)=>{
        price = parseInt(item.price.substr(2));
        discount =  parseInt(item.discount.substr(0, item.discount.length-1));
        finalPrice = price - (price*discount)/100;
        data[index].finalPrice = finalPrice;
    })
    return data;
  }
  const sortedItemsBy = (condition) =>{
    let dataFilter = [];
    if (condition==="Best Sellers"){
        dataFilter = _.sortBy(itemsFilter, ['buy'], ['desc']).reverse();
    }else {
        let dataItems = itemsFilter;
        let dataPushFinalPrice = pushFinalPriceToArrayOfDictionary(dataItems);
        
        if(condition==="Lowest Price"){
            dataFilter = _.sortBy(dataPushFinalPrice, ['finalPrice'], ['asc']);
        }else if(condition==="Highest Price"){
            dataFilter = _.sortBy(dataPushFinalPrice, ['finalPrice'], ['asc']).reverse();
        }
    }
    setCurrentPage(1);
    return dataFilter;
}
  const handlerClickSort = (event) => {
    const sortChoosen = event.target.value;
    setSortBy(sortChoosen);
    setItemsFilter(sortedItemsBy(sortChoosen));
  }
  const handlerClickItem = (id) =>{
    router.push(`/detailItem/${id}`);
  }
  
  useEffect(()=>{
    setItemsFilter(sortedItemsBy(sortBy));
  }, [itemsFilter[0]?.id]);
  
  return (
    <Fragment>
        <div className={styleItemsFil.container}>
            <div className={styleItemsFil.filter}>
              <div className={styleItemsFil.infoPage}>Show {firstPostIndex+1} - {lastPostIndex} of {itemsFilter.length} Products</div>
              <div className={styleItemsFil.filterContainer}>
                <label className={styleItemsFil.info} htmlFor="limitPage">
                  <select id="limitPage" className={styleItemsFil.formInput} onChange={event => handlerClickPageLimit(event)}>
                      {
                          limitPosts?.map(limit => {
                              return(
                                  <option value={limit} key={limit}>Show {limit} Products</option>
                              );
                          })
                      }
                  </select>
                </label>
                <label className={styleItemsFil.info} htmlFor="sort">
                  <select id="sort" className={styleItemsFil.formInput} onChange={event => handlerClickSort(event)}>
                      {
                          sort?.map(sort => {
                              return(
                                  <option value={sort} key={sort}>{sort}</option>
                              );
                          })
                      }
                  </select>
                </label>
              </div>
            </div>
            <div className={styleItemsFil.itemsContainer}>
              {
                currentPost?.map((item,index) => {
                  let isDiscount = false;
                  let price = parseInt(item.price.substr(2));
                  let disc = parseInt(item.discount.substr(0,item.discount.length-1));
                  let finalPrice = price - (price*disc/100);
                  if (disc!==0){
                      isDiscount = true;
                  }
                  
                  if (value.length!==0){
                    if (value.toLowerCase()===item.category.toLowerCase()||value.toLowerCase()===item.brand.toLowerCase()||value.toLowerCase()===item.name.toLowerCase()){
                      return (
                        <button key={item.id} className={styleItemsFil.itemContainer} onClick={()=>handlerClickItem(item.id)}>
                          <div>
                            <div className={isDiscount? styleItemsFil.sale:styleItemsFil.noDisplay}>SALE {disc}%</div>
                            <img src={item.img1} alt={item.name} className={styleItemsFil.img} />
                          </div>
                          <div className={styleItemsFil.itemInfo}>
                            <div className={styleItemsFil.name}>{item.name}</div>
                            <div className={isDiscount? `${styleItemsFil.price} ${styleItemsFil.line}`:styleItemsFil.price}>
                                Rp {price}
                            </div>
                            <div className={isDiscount? styleItemsFil.finalPrice:styleItemsFil.noDisplay}>
                                Rp {finalPrice}
                            </div>
                          </div>
                        </button>
                      )
                    }
                  }else{
                    return (
                      <button key={item.id} className={styleItemsFil.itemContainer} onClick={()=>handlerClickItem(item.id)}>
                        <div>
                          <div className={isDiscount? styleItemsFil.sale:styleItemsFil.noDisplay}>SALE {disc}%</div>
                          <img src={item.img1} alt={item.name} className={styleItemsFil.img} />
                        </div>
                        <div className={styleItemsFil.itemInfo}>
                          <div className={styleItemsFil.name}>{item.name}</div>
                          <div className={isDiscount? `${styleItemsFil.price} ${styleItemsFil.line}`:styleItemsFil.price}>
                              Rp {price}
                          </div>
                          <div className={isDiscount? styleItemsFil.finalPrice:styleItemsFil.noDisplay}>
                              Rp {finalPrice}
                          </div>
                        </div>
                      </button>
                    )
                  }
                })
              }
            </div>
            <Pagination totalPosts={itemsFilter.length} postsPerPages={postsPerPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    </Fragment>
  )
}

export default ItemsFilter;