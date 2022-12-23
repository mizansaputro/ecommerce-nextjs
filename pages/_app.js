import { Fragment } from 'react';
import '../styles/globals.css';
import Bottom from './bottom/bottom';
import Navbar from './navbar/navbar';
import {Provider} from "react-redux";
import store from '../redux/store/store';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar/>
        <Component {...pageProps} />
        <Bottom/>
      </Provider>
    </Fragment>
  )
}


export default MyApp;
