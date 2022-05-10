import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CarGalleryThumb } from "./thumbs-slider";
import {PrevButton, NextButton } from "../slider/slider_button";
import Image from 'next/image'
import { shimmerPreload, toBase64 } from "../../shared-utils/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExpand
} from "@fortawesome/free-solid-svg-icons";


export interface CarGallerySliderProps {
    slides: any[],
    mediaList:any[]
}
const CarGallerySlider = ({ slides, mediaList }: CarGallerySliderProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false, loop: true });
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        containScroll: "keepSnaps",
        // selectedClass: "",
        dragFree: true
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [isOnFullScreen, setFullScreenMode] = useState(false);
    
    const [srcImg, setSrc] = React.useState(`data:image/svg+xml;base64,${toBase64(shimmerPreload(700, 475))}`);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    
    const onThumbClick = useCallback(
        (index:any) => {
            if (!embla || !emblaThumbs) return;
            if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
        },
        [embla, emblaThumbs]
    );

    const onSelect = useCallback(() => {
        if (!embla || !emblaThumbs) return;
        setSelectedIndex(embla.selectedScrollSnap());
        emblaThumbs.scrollTo(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla, emblaThumbs, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        embla.on("select", onSelect);
    }, [embla, onSelect]);

    return (
        <div className={`slider_wrapper ${isOnFullScreen?"fullscreen":""}`}>
            <div className="embla_details_wrap">
                <div className="embla__viewport" ref={mainViewportRef}>
                    <div className="embla__container">
                        {slides.map((index) => (
                            <div className="embla__slide" key={index}>
                                <div className="slide_count" onClick={()=>setFullScreenMode(!isOnFullScreen)}>
                                    {index+1} of {mediaList.length}
                                    <FontAwesomeIcon style={{ color: "white" }} icon={faExpand} />
                                </div>
                                
                                <div className="embla__slide__inner">
                                    <div className="embla__slide__img">
                                        <Image
                                            src={mediaList[index].url || srcImg }
                                            layout='fill'
                                            className="rounded-lg"
                                            alt="cover image"
                                            placeholder="blur"
                                            onLoadingComplete={(result) => {
                                                if (result.naturalWidth === 0) {
                                                    // Broken image
                                                    setSrc(mediaList[index].url);
                                                }
                                            }}
                                            
                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmerPreload(700, 475))}`}
                                        />
                                    </div>

                                   
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>

            <div className="embla_details_wrap embla--thumb">
                <div className="embla__viewport" ref={thumbViewportRef}>
                    <div className="embla__container embla__container--thumb">
                        {slides.map((index) => (
                            <CarGalleryThumb
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                imgSrc={mediaList[index].url}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarGallerySlider;
