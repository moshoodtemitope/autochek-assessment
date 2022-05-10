import React from "react";
import Image from 'next/image'

export interface CarGalleryThumbProps {
  selected: boolean
  onClick(): any
  imgSrc: any
}
export const CarGalleryThumb = ({ selected, onClick, imgSrc }: CarGalleryThumbProps) => (
  <div
    className={`embla__slide embla__slide--thumb ${selected ? "is-selected" : ""
      }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb"
      type="button"
    >
      <div className="embla__slide__thumbnail">
        <Image
          src={imgSrc}
          layout='fill'
          className="rounded-lg"
          alt="Car Picture"

        />
      </div>

      
    </button>
  </div>
);
