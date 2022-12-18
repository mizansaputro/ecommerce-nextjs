import { sortBy, uniq } from 'lodash';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import styleFilter from "../../styles/Filter.module.css"

const Filter = ({filters, setFilters, items, itemsFilter, setItemsFilter, value, shop}) => {
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const router = useRouter();
    
    const getUniqueData = () => {
        let dataCategory = [];
        let dataBrands = [];
        let dataColors = [];
        let dataSizes = [];

        items?.map(item => {
            if (!dataCategory.includes(item.category)){
                dataCategory.push(item.category);
            }
            if (!dataBrands.includes(item.brand)){
                dataBrands.push(item.brand);
            }
            item?.color.map(color => {
                if (!dataColors.includes(color)){
                    dataColors.push(color);
                }
            });
            item?.size.map(size => {
                if (!dataSizes.includes(size)){
                    dataSizes.push(size);
                }
            });
        });
        setUniqueCategory(dataCategory);
        setBrands(dataBrands);
        setColors(dataColors);
        setSizes(dataSizes);
    }
    const handlerFilterCategory = (category) =>{
        setFilters(prevFilters => ({
            ...prevFilters,
            category: category
        }));
        router.push(`/shop/${category}`);

    }
    const handlerClickBrand =  (event) => {
        const brand = event.target.value;
        if (Array.isArray(filters.brands)){
            if (!(filters.brands.includes(brand))){
                setFilters(prevFilters => ({
                    ...prevFilters,
                    brands: [...filters.brands, filters.brands.push(brand)].filter(e => typeof e === 'string' && e !== "")
                }));
            }else{
                const index = filters.brands.indexOf(brand);
                setFilters(prevFilters => ({
                    ...prevFilters,
                    brands: [...filters.brands, filters.brands.splice(index,1)].filter(e => typeof e === 'string' && e !== "")
                }));
                
            }
        }
    }
    const handlerClickColor = (color) => {
        if (Array.isArray(filters.colors)){
            if (!(filters.colors.includes(color))){
                setFilters(prevFilters => ({
                    ...prevFilters,
                    colors: [...filters.colors, filters.colors.push(color)].filter(e => typeof e === 'string' && e !== "")
                }));
            }else{
                const index = filters.colors.indexOf(color);
                setFilters(prevFilters => ({
                    ...prevFilters,
                    colors: [...filters.colors, filters.colors.splice(index,1)].filter(e => typeof e === 'string' && e !== "")
                }));
                
            }
        }
    }
    const handlerClickSize = (size) => {
        if (Array.isArray(filters.sizes)){
            if (!(filters.sizes.includes(size))){
                setFilters(prevFilters => ({
                    ...prevFilters,
                    sizes: [...filters.sizes, filters.sizes.push(size)].filter(e => typeof e === 'string' && e !== "")
                }));
            }else{
                const index = filters.sizes.indexOf(size);
                setFilters(prevFilters => ({
                    ...prevFilters,
                    sizes: [...filters.sizes, filters.sizes.splice(index,1)].filter(e => typeof e === 'string' && e !== "")
                }));
                
            }
        }
    }
    const getIsBrandsIncludeInFilter = (item) => {
        if (filters.brands.length===0){
            return true;
        }else{
            for (let i=0; i<filters.brands.length;i++){
                if (filters.brands[i]===item.brand){
                    return true;
                }
            }
        }
        return false;
    }
    const getIsColorsIncludeInFilter = (item) => {
        if (filters.colors.length===0){
            return true;
        }else{
            if (filters.colors.length!==0){
                // eslint-disable-next-line array-callback-return
                item.color.map(color => {
                    for (let i=0;i<filters.colors[i];i++){
                        if (color===filters.colors[i]){
                            return true;
                        }
                    }
                })
            }
        }
        return false;
    }
    const getIsSizesIncludeInFilter = (item) => {
        if (filters.sizes.length===0){
            return true;
        }else{
            if (filters.sizes.length!==0){
                // eslint-disable-next-line array-callback-return
                item.sizes.map(size => {
                    for (let i=0;i<filters.sizes[i];i++){
                        if (size===filters.sizes[i]){
                            return true;
                        }
                    }
                })
            }
        }
        return false;
    }
    const getItemsFilter = () => {
        let itemsData = items;
        let newData = [];
        // eslint-disable-next-line array-callback-return
        itemsData?.map((item) => {
            if (filters.category?.length!==0 || filters.category!=="all"){
                if (item.category===filters.category && getIsBrandsIncludeInFilter(item) && getIsColorsIncludeInFilter(item) && getIsSizesIncludeInFilter(item)){
                    newData.push(item)
                }
            }else{
                if (getIsBrandsIncludeInFilter(item) && getIsColorsIncludeInFilter(item)){
                    newData.push(item)
                }
            }
        
        })
        setItemsFilter(newData);
    }
    useEffect(() => {
        getUniqueData();
        getItemsFilter();
    }, [items, filters.category, filters.brands, filters.colors, filters.sizes]);
    return (
        <Fragment>
            <div className={styleFilter.container}>
                <div className={styleFilter.categoriesContainer}>
                    <div className={styleFilter.header}>CATEGORIES</div>
                    {
                        uniqueCategory?.map(category => {
                            return(
                                <div className={filters.category===category? `${styleFilter.body} ${styleFilter.choosen}`:styleFilter.body} key={category} onClick={() => handlerFilterCategory(category)}>{category}</div>
                            );
                        })
                    }
                    <div className={`${styleFilter.header} ${styleFilter.marginTopHeader}`}>BRANDS</div>
                    {
                        brands?.map(brand => {
                            return(
                                <label htmlFor={brand} key={brand} className={styleFilter.checkBox} onClick={(event) => handlerClickBrand(event)}>
                                    <input type="checkbox" id={brand} name={brand} value={brand} className={`${styleFilter.body} ${styleFilter.checkboxLabel}`}/>
                                    <div className={`${styleFilter.body} ${styleFilter.checkboxText}`}>{brand}</div>
                                </label>
                            );
                        })
                    }
                    <div className={`${styleFilter.header} ${styleFilter.marginTopHeader}`}>COLORS</div>
                    <div className={styleFilter.gridContainer}>
                        {
                            colors?.map(color => {
                                return(
                                    <button key={color} className={filters.colors.includes(color)? `${styleFilter.colorBtn} ${styleFilter.activeColorBtn}`:styleFilter.colorBtn } onClick={() => handlerClickColor(color)}>{color}</button>
                                );
                            })
                        }
                    </div>
                    <div className={`${styleFilter.header} ${styleFilter.marginTopHeader}`}>SIZE</div>
                    <div className={styleFilter.gridContainer}>
                        {
                            sizes?.map(size => {
                                return(
                                    <button key={size} className={filters.sizes.includes(size)? `${styleFilter.colorBtn} ${styleFilter.activeColorBtn}`:styleFilter.colorBtn } onClick={() => handlerClickSize(size)}>{size}</button>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Filter;