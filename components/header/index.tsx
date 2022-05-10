
import Link from 'next/link'
import Logo from "../../public/images/icons/logo.png";

import Image from 'next/image'
import Head from 'next/head'
import styles from "../../styles/header/index.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCartShopping,
    faLocationPin,
    faTruck,
    faPhoneFlip,
    faRightFromBracket,
    faRightToBracket,
    faCartArrowDown
} from "@fortawesome/free-solid-svg-icons";

const HeadMeta = (metaProps: any) => {
    return (
        <Head>
            <meta name="description" content={"Autochek Asssessment"} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

const HeaderContent = () => {
    return (
        <div className={styles.topbar_info_wrap}>
            <div className={styles.topbar_info}>
                <div className={styles.discounttxt}>
                    Offer Zone Top Deals  &amp; Discounts
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
                <div className={styles.topbar_other_links}>
                    <div className={styles.each_item}>
                        <FontAwesomeIcon icon={faLocationPin} />
                        Select Location
                    </div>
                    <div className={styles.each_item}>
                        <FontAwesomeIcon icon={faTruck} />
                        Track Order
                    </div>
                    <div className={styles.each_item}>
                        <FontAwesomeIcon icon={faPhoneFlip} />
                        01- 4334-434
                    </div>
                    <div className={styles.each_item}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                        Log In
                    </div>
                    <div className={styles.each_item}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Register
                    </div>
                </div>
            </div>
            <div className={styles.main_header_wrap}>
                <div className={styles.logo_wrap}>
                <Link href="/">
                <a>
                    <div className={styles.logo}>
                        <Image src={Logo} />
                    </div>
                    </a>
                    </Link>
                </div>
                <div className={styles.search_bar}>
                    <form action="">
                        <input type="text" placeholder="Search" />
                        <button className={`btn ${styles.search_btn}`} type="submit">Search</button>
                    </form>
                    <div className={styles.cart_cta_wrap}>
                        <div className={styles.cart_cta}>
                            <FontAwesomeIcon style={{ color: "white" }} icon={faCartArrowDown} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function Header() {
    return (
        <>
            <HeadMeta />
            <HeaderContent />
        </>
    )
}