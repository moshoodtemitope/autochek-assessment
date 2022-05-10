import { ReactNode } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.scss'
import { getCarMakes, getAllCarsData } from "../services";

import CarsBanner from "../components/slider"
import CarItem from "../components/car-item"
import { breakDataIntoChunks } from "../shared-utils/helpers"








const AllCarsShowcase = ({ allCarsData }: any) => {
  let chunkedData = breakDataIntoChunks({ dataToChunk: allCarsData.result, chunkSize: 3, sizeOfData: allCarsData.result.length });

  return (
    <div className={styles.cars_show_wrap}>
      <div className={styles.heading_text}>Our Newest Cars</div>
      <div className={styles.cars_card}>

        <div className={styles.allcars_list}>
          {
            chunkedData[0].map((car:any, index:any) => {
              return (
                <CarItem
                  showTag={index == 1 || index == 2}
                  cardCta="Buy Car"
                  carInfo={car}
                  urlPrefix = "/cars-for-sale"
                  urlSplitter="/car"
                  key={index}
                />
              )
            })
          }
        </div>
      </div>
      <div className={styles.view_more_cars}>
        <Link href="/cars-for-sale">
          <a>More Car deals &gt;&gt;</a>
        </Link>
      </div>

    </div>
  )
}

const PopularMakesShowcase = ({ allCarMakes }: any) => {
  let chunkedData = breakDataIntoChunks({ dataToChunk: allCarMakes, chunkSize: 3, sizeOfData: allCarMakes.length });
  return (
    <div className="popular_cars_list_wrap">

      <div className="cars_show_wrap">

        {
          chunkedData.map((eachChunk, idx) => {
            return (
              <div className={styles.cars_card} key={idx}>
                {/* <div className="cars_card_header">New Cars Stock</div> */}
                <div className={styles.allcars_list}>
                  {
                    eachChunk.map((car:any, index:any) => {
                      return (
                        <CarItem

                          carInfo={car}
                          isBrandCard={true}
                          key={index}
                        />
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

const FilterItemsWrap = () => {
  return (
    <div className={styles.filters_wrap}>

      <div className={styles.filter_wrap}>
        <div className={styles.filters_header}>Search here...</div>
        <input type="text" placeholder="Product name..." />
        <button className={`btn ${styles.search_cta}`}> &gt;</button>
      </div>
      <div className={styles.filter_wrap}>
        <div className={styles.filters_header}>Price</div>
        <div className={styles.each_filter_type}> Under &#x20A6;500,000 </div>
        <div className={styles.each_filter_type}> &#x20A6;500,000 - &#x20A6;1,500,000 </div>
        <div className={styles.each_filter_type}> &#x20A6;1,500,000 - &#x20A6;2,500,000 </div>
      </div>
      <div className={styles.filter_wrap}>
        <div className={styles.filters_header}>Discounts</div>
        <div className={styles.each_filter_type}> <input type="checkbox" name="" id="ten_more" /> <label htmlFor="ten_more">10% or more</label>  </div>
        <div className={styles.each_filter_type}> <input type="checkbox" name="" id="twen_more" /> <label htmlFor="twen_more"> 20% or more </label></div>
        <div className={styles.each_filter_type}> <input type="checkbox" name="" id="thirty_more" /> <label htmlFor="thirty_more">30% or more</label>  </div>
      </div>
    </div>
  )
}

const LandingPage = ({ allCarsData, allCarMakes }: any) => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>AutoChek Assessment</title>
        <meta name="description" content="A Car Products Classified App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CarsBanner slides={allCarsData.selectedData} />
      <div className={styles.popularbrands_header}> Popular Car Brands</div>
      <div className={styles.classifieds_wrapper}>
        <div className={styles.classified_items}>
          <PopularMakesShowcase allCarMakes={allCarMakes.makeList} />
          <AllCarsShowcase allCarsData={allCarsData.mainData} />
        </div>
        <FilterItemsWrap />
      </div>


    </div>
  )
}



export async function getServerSideProps({query}:any) {
  const pageNum = query.page;
  const pageSize = query.size;
  const [allCarMakes, allCarsData] = await Promise.all([
    getCarMakes(), getAllCarsData({
      isRandomData: true,
      pageNum, 
      pageSize
    })
  ]);

  return { props: { allCarMakes, allCarsData } };
}

export default LandingPage
