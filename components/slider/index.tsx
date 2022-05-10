import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { DotButton, PrevButton, NextButton } from "./slider_button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'

import { transformUrl } from "../../shared-utils/helpers"


const options = { delay: 10000 } // Options
const autoplayRoot = (emblaRoot: { parentElement: any; }) => emblaRoot.parentElement // Root node
const autoplay = Autoplay(options, autoplayRoot)


const CarsBanner = ({ slides }: any) => {
    const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false, loop: true }, [autoplay]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<any[]>([]);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [
        embla
    ]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    return (
        <div className="embla_wrap">
            <div className="embla">
                <div className="embla__viewport" ref={viewportRef}>
                    <div className="embla__container">
                        {slides.map((car: any, index: number) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__inner">
                                    <Image
                                        src={car.imageUrl}
                                        layout='fill'
                                        className="rounded-lg"
                                        alt="cover image"
                                    
                                    />
                                    
                                </div>
                                <div className="each_caption">
                                    <span className="car_price">&#x20A6;{car.marketplacePrice.toLocaleString("en-ng")}</span>
                                    <div className="car_title">{car.year} {car.title}</div>
                                    
                                    <Link 
                                        href={{
                                                pathname: transformUrl({ urlPrefix: "/cars-for-sale", urlToTransform: car.websiteUrl,urlSplitter:"/car"})
                                        }}>
                                        <a className="btn buy_now">Shop now</a>   
                                    </Link>
                                    {car.hasFinancing && <div className="car_finance_msg">**Take advantage of Car Financing</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarsBanner;
