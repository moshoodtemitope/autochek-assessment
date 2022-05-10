import { ReactNode } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Pagination from '@etchteam/next-pagination'

import styles from "../../styles/Home.module.scss"
import styles3 from "../../styles/components/pagination.module.scss"
import carStyles from "../../styles/components/caritem.module.scss";
import { getCarMakes, getAllCarsData } from "../../services";
import { transformUrl, breakDataIntoChunks } from "../../shared-utils/helpers"

import ClassifiedCarItem from "../../components/car-item/classfied"









const AllCarsShowcase = ({ allCarsData }: any) => {
  let chunkedData = breakDataIntoChunks({ dataToChunk: allCarsData, chunkSize: 3, sizeOfData: allCarsData.length });
  
  return (
    <div className={styles.cars_show_wrap}>
      <div className={`${styles.heading_text} ${styles.to_left}`}>Cars for Sale</div>
      
      {
        chunkedData.map((eachChunk, idx) => {
          return (
            <div className={styles.cars_card} key={idx}>
              
              <div className={styles.allcars_list}>
                {
                  eachChunk.map((car:any, index:any) => {
                    return (
                      <Link

                        href={transformUrl({
                          urlPrefix: "/cars-for-sale",
                          urlToTransform: car.websiteUrl,
                          urlSplitter: "/car"
                        })}
                        key={index}>
                        <a className={carStyles.car_item}>
                          <ClassifiedCarItem
                            showTag={index == 1 || index == 2}
                            cardCta="More details"
                            carInfo={car}
                            urlPrefix="/car"
                            urlSplitter="/car"
                            isDetailedCard={true}
                          />
                        </a>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
      

    </div>
  )
}




const AllCarsPage = ({ allCarsData, allCarMakes }: any) => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>AutoChek Assessment</title>
        <meta name="description" content="A Car Products Classified App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={`${styles.classifieds_wrapper}`}>
        <div className={`${styles.classified_items} ${styles.full_width}`}>
          <AllCarsShowcase allCarsData={allCarsData.result} />
          <div className={styles.pagination_wrap}>
            <Pagination sizes={[25,40,50,60]} theme={styles3} total={allCarsData.pagination.total} />
          </div>
          
        </div>
      </div>


    </div>
  )
}



export async function getServerSideProps({query}:any) {
  const pageNum = query.page;
  const pageSize = query.size;
  const [allCarMakes, allCarsData] = await Promise.all([
    getCarMakes(), getAllCarsData({
      isRandomData: false,
      pageNum, 
      pageSize
    })
  ]);

  return { props: { allCarMakes, allCarsData } };
}

export default AllCarsPage
