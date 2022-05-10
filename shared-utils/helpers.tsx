interface itemsChunkProps {
    dataToChunk: [],
    chunkSize: number,
    sizeOfData: number
}

interface TransformUrlProps{
    urlToTransform: string,
    urlSplitter: string,
    urlPrefix:string
}


export const shimmerPreload = (w: number, h: number) => {
    return (`
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`)
}
export const toBase64 = (str: string) => {
    return typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)
}

export const transformUrl = ({urlPrefix,urlToTransform,urlSplitter}:TransformUrlProps) => {
    let carPath = urlToTransform.split(urlSplitter)[1];

    return `${urlPrefix}${carPath}`;
}

export const getDateInfo =(dateValue:string)=>{
    let dateString = dateValue.split("T")[0];
        dateString = new Date(dateString).toUTCString();
        
        dateString = dateString.split('00').slice(0, 3).join(' ').replace(/:/g,'' );
        
        return dateString;

}

export const breakDataIntoChunks = ({ dataToChunk, chunkSize, sizeOfData }: itemsChunkProps) => {
    let resultingData = [];
    let tempData: any = [];
    for (let i = 0; i < sizeOfData; i++) {
        tempData.push(dataToChunk[i]);
        if (((i + 1) % chunkSize) == 0) {
            resultingData.push(tempData);
            tempData = [];
        }
    }

    if (tempData.length != 0) {
        let a = tempData.length;
        if (a != chunkSize)
            resultingData.push(tempData);
    }
    return resultingData;
}