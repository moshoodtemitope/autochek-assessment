import axios from 'axios'
import { Paths } from './paths'



export const getCarMakes = async () => {
    const initialData = await axios.get(
        `${Paths.GET_MAKES}?popular=true`
    )
        .then(({ data }) => {
            return data;
        })
    return initialData
}

export const getAllCarsData = async ({isRandomData, pageNum, pageSize}:any) => {
    const carsData = await axios.get(
        `${Paths.SEARCH_CARS}`,{
            params:{
                page_number: pageNum||1,
                page_size: pageSize||25
            }
        }
    )
        .then(({ data }) => {
            let mainData = data;
            if(isRandomData){
                return {
                    mainData,
                    selectedData: data.result.slice(0, 5)
                };
            }
            return data;
        })
    return carsData;
}

export const getACarData = async (carId:string) => {
    
    const carsData = await axios.get(
        `${Paths.GET_BASE_INFO}car/${carId}`
    )
        .then(({ data }) => {
            
            return data;
        })
    return carsData;
}

export const getACarMedia = async (carId:string) => {
    
    const carsData = await axios.get(
        `${Paths.GET_BASE_INFO}car_media?carId=${carId}`
    )
    .then(({ data }) => {
        
        return data;
    })
    return carsData;
}