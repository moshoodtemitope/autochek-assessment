import Head from 'next/head'

import styles from "../../styles/details-page.module.scss"

import { getACarMedia, getACarData } from "../../services";
import { getDateInfo } from "../../shared-utils/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faGaugeHigh,
  faGasPump,
  faCarBattery,
  faCarOn,
  faMoneyBill1Wave,
  faLandmark,
  faCloudSun,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import CarGallerySlider from "../../components/details-slider";



const SecondPanelInfo = ({ singleCarData }: any) => {
  
  return (
    <div className={styles.panel_wrap}>
      <div className={styles.panel_content}>
        <div className={`${styles.panel_horizontal} ${styles.three_items}`}>
          <div className={styles.each_panel_info}>
            <div className={styles.info_icon_and_title}>
              <FontAwesomeIcon style={{ color: "#85929E" }} icon={faMoneyBill1Wave} />
              <div className={styles.info_title}>Financing</div>
            </div>
            <div className={` ${styles.info_txt} ${singleCarData.hasFinancing ? styles.info_txt_true : ""}`}>
              {singleCarData.hasFinancing ? "Available" : "Not Available"}
            </div>
            {singleCarData.hasFinancing &&
              <div className={styles.info_cta}>
                <div className={styles.cta_txt}>Apply for loan</div>
              </div>
            }
          </div>
          <div className={styles.each_panel_info}>
            <div className={styles.info_icon_and_title}>
              <FontAwesomeIcon style={{ color: "#85929E" }} icon={faLandmark} />
              <div className={styles.info_title}>Insurance</div>
            </div>
            <div className={`${styles.info_txt} ${singleCarData.insured ? styles.info_txt_true : ""}`}>
              {singleCarData.insured ? "Available" : "Not Available"}
            </div>
            {!singleCarData.insured &&
              <div className={`${styles.cta_txt} ${!singleCarData.insured ? styles.info_cta_active : ""}`}>

                {singleCarData.insured ? "" : "Buy now"}
              </div>
            }
          </div>
          <div className={styles.each_panel_info}>
            <div className={styles.info_icon_and_title}>
              <FontAwesomeIcon style={{ color: "#85929E" }} icon={faLandmark} />
              <div className={styles.info_title}>Warranty</div>
            </div>
            <div className={`${styles.info_txt} ${singleCarData.hasWarranty ? styles.info_txt_true : ""}`}>
              {singleCarData.hasWarranty ? "Available" : "Not Available"}
            </div>
            {!singleCarData.hasWarranty &&
              <div className={styles.info_cta}>
                <div className={`${styles.cta_txt} ${!singleCarData.hasWarranty ? styles.info_cta_active : ""}`}>

                  {singleCarData.hasWarranty ? "" : "Buy now"}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const FirstPanelInfo = ({ singleCarData, aCarMediaData }: any) => {
  
  let mediaItems = aCarMediaData.carMediaList;
  const SLIDE_COUNT = mediaItems.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className={styles.panel_wrap}>
      <div className={styles.panel_content}>
        <div className={styles.top_bar_section}>
          <div>
            <div className={styles.car_name}>
              {singleCarData.year} {singleCarData.carName}
              {singleCarData.isFeatured &&
                <span className={styles.car_featured}>
                  Featured
                </span>
              }
            </div>
            <div className={styles.horizontal_details}>
              <div className={` ${styles.car_condition} ${singleCarData.sellingCondition !== "" ? styles.new_car : styles.used_car}`}>
                condition: {singleCarData.sellingCondition}
              </div>
              <div className={styles.car_location}>
                <FontAwesomeIcon style={{ color: "#85929E" }} icon={faLocationPin} />
                <div className={styles.location_text}>{singleCarData.city},{singleCarData.state} </div>
              </div>

            </div>

          </div>
          <div>
            <div className={styles.rating_txt}>
              <FontAwesomeIcon style={{ color: "white" }} icon={faStar} />
              {Math.floor(singleCarData.gradeScore)}
            </div>
            <div className={`${styles.horizontal_details} ${styles.borderd}`}>
              <div className={styles.owner_type}>{singleCarData.ownerType} Listing </div>
              <div className={styles.date_posted}>Updated: {getDateInfo(singleCarData.updatedAt)} </div>
            </div>
          </div>
        </div>
        <div className={styles.media_and_info}>
          <div className={styles.gallery_wrap}>
          {aCarMediaData.carMediaList.length ===0 &&
            <div className={styles.no_preview_photos}>
                <FontAwesomeIcon  icon={faCloudSun} />
                <div className={styles.no_preview_msg}>No preview photo available</div>
                
            </div>
          }
            {aCarMediaData.carMediaList.length >= 1 &&
              <CarGallerySlider mediaList={mediaItems} slides={slides} />
            }
          </div>
          <div className={styles.other_info}>
            <div className={styles.car_price}>&#x20A6;{singleCarData.marketplacePrice.toLocaleString("en-ng")}</div>
            {singleCarData.hasFinancing &&
              <div className={styles.loan_facility}>
                **Pay from <span>{singleCarData.installment.toLocaleString("en-ng")}/month</span>
              </div>
            }
            <div className={styles.car_features_horizontal}>
              <div className={styles.each_feature}>
                <FontAwesomeIcon style={{ color: "#5D6D7E" }} icon={faGaugeHigh} />
                {singleCarData.mileage}{singleCarData.mileageUnit}
              </div>
              <div className={styles.each_feature}>
                <FontAwesomeIcon style={{ color: "#5D6D7E" }} icon={faGasPump} />
                {singleCarData.fuelType}
              </div>
              <div className={styles.each_feature}>
                <FontAwesomeIcon style={{ color: "#5D6D7E" }} icon={faCarBattery} />
                {singleCarData.transmission}
              </div>
              <div className={styles.each_feature}>
                <FontAwesomeIcon style={{ color: "#5D6D7E" }} icon={faCarOn} />
                {singleCarData.model.wheelType}
              </div>
            </div>
            <div className={styles.book_inspection}>
              <button type="button" className={`btn ${styles.book_btn}`}>
                Book Inspection
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}


const ACarDetailsPage = ({ singleCarData, aCarMediaData }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AutoChek Assessment</title>
        <meta name="description" content="A Car Products Classified App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.details_page_wrap}>
        <FirstPanelInfo aCarMediaData={aCarMediaData} singleCarData={singleCarData} />
        <SecondPanelInfo singleCarData={singleCarData} />

      </div>
    </div>
  )
}



export async function getServerSideProps(context: any) {
  const carid = context.params["carid"];
  let idRetrieved = carid.split("ref-")[1];

  const [aCarMediaData, singleCarData] = await Promise.all([
    getACarMedia(idRetrieved), getACarData(idRetrieved)
  ]);
  

  return { props: { aCarMediaData, singleCarData } };
}

export default ACarDetailsPage
