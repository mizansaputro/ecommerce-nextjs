import axios from "axios";
import React, {Fragment, useEffect, useState } from "react";
//import styleHome from "../../styles/Home.module.css";
import Banner from "./banner";
import Category from "./category";
import NewArrival from "./newArrival";
import Offers from "./offers";
import Poster from "./poster";
import TopCollection from "./topCollection";

const Home = () => {
    const [items, setItems] = useState([]);

    const getItemsFromDB = () =>{
        axios.get('http://localhost:3004/items')
            .then(res => setItems(res.data));
    }

    useEffect(() => {
        getItemsFromDB();
    }, [setItems]);

    return (
        <Fragment>
            <Banner/>
            <TopCollection items={items}/>
            <Offers/>
            <NewArrival items={items}/>
            <Poster/>
            <Category items={items}/>
        </Fragment>
    );
}

export default Home;