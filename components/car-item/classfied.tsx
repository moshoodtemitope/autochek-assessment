import React, {useEffect } from 'react';
import Image from 'next/image'
import PlaceImg from '../../public/images/lazy-load.jpeg'
import styles from "../../styles/components/caritem.module.scss";
import { shimmerPreload, toBase64 } from "../../shared-utils/helpers"


interface carItemProps {
    carInfo: any
    isBrandCard?: boolean
    showTag?: boolean
    cardCta?: string
    urlPrefix: string
    urlSplitter: string
    isDetailedCard?: boolean
}




const ClassifiedCarItem = ({ carInfo, isBrandCard, showTag, cardCta, urlSplitter, urlPrefix }: carItemProps) => {
    const [srcImg, setSrc] = React.useState(carInfo.imageUrl);
    useEffect(() => {
        setSrc(srcImg);
    }, [srcImg]);

    return (
        <div>
            {showTag &&
                <span
                    className={`${styles.card_tag}`}>
                    New
                </span>
            }
            <div className={styles.car_image}>
                <Image
                    alt={carInfo.title}
                    src={srcImg || PlaceImg}
                    width={150}
                    height={100}
                    placeholder="blur"
                    onLoadingComplete={(result) => {
                        if (result.naturalWidth === 0) {
                            // Broken image
                            setSrc(PlaceImg);
                        }
                    }}
                    onError={() => setSrc(PlaceImg)}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmerPreload(700, 475))}`}
                />

            </div>


            <div className={styles.car_info_detailed}>

                <div className={styles.car_name_detailed}>
                    {carInfo.year} {carInfo.title}
                </div>


                <div className={styles.detailed_card}>
                    <div className={styles.car_info_bits}>
                        <div className={styles.each_info_bit}>
                            <div className={styles.info_title}>mileage</div>
                            <div className={styles.info_txt}>{carInfo.mileage}{carInfo.mileageUnit} </div>
                        </div>
                        <div className={styles.each_info_bit}>
                            <div className={styles.info_title}>location</div>
                            <div className={styles.info_txt}>{carInfo.city}, {carInfo.state} </div>
                        </div>
                        
                    </div>
                    <div className={styles.car_price_detailed}>
                        <div className={styles.main_price}>&#x20A6;{carInfo.marketplacePrice.toLocaleString("en-ng")}</div>
                        {carInfo.hasFinancing &&
                            <div className={styles.each_info_bit}>
                                <div className={styles.info_title}>Pay monthly</div>
                                <div className={styles.info_txt}> from &#x20A6;{carInfo.installment.toLocaleString("en-ng")} /m </div>
                            </div>

                        }
                    </div>
                    <button type="button" className={`btn ${styles.buy_now}`}>
                        {cardCta}
                    </button>
                </div>


            </div>
        </div>
    )
}

export default ClassifiedCarItem;

