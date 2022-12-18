import React, {Fragment} from 'react';
import styleBot from "../../styles/Bottom.module.css";

const Bottom = () => {
  return (
    <Fragment>
        <div className={styleBot.container}>
            <div className={styleBot.info}>
                <div className={styleBot.desc}>
                    <div className={styleBot.title}>fashion</div>
                    <div className={styleBot.desc}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}</div>
                </div>
                <div className={styleBot.menus}>
                    <div className={styleBot.header}>Menus</div>
                    <div className={styleBot.body}>Shop</div>
                    <div className={styleBot.body}>Best Seller</div>
                    <div className={styleBot.body}>Collection</div>
                    <div className={styleBot.body}>Blog</div>
                    <div className={styleBot.body}>Contact</div>

                </div>
                <div className={styleBot.contact}>
                    <div className={styleBot.header}>Contact Us</div>
                    <div className={styleBot.flex}>
                        <img src="/phone.png" alt="phone" />
                        <div className={styleBot.text}>(+62) 89 6750 69841</div>
                    </div>
                    <div className={styleBot.flex}>
                        <img src="/mail.png" alt="phone" />
                        <div className={styleBot.text}>mail@fashion.com</div>
                    </div>
                    <div className={styleBot.flex}>
                        <img src="/location.png" alt="phone" />
                        <div className={styleBot.text}>489, Hog Camp Road, Illinois</div>
                    </div>
                </div>
            </div>
            <div className={styleBot.tag}>
                <div className={styleBot.tagText}>© Copyright 2020 AVANA. All rights reserved.</div>
            </div>
        </div>
    </Fragment>
  )
}

export default Bottom;