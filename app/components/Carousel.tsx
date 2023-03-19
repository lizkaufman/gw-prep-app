"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";
import styles from "../styles/carousel.module.css";
import logos from "../images/logos";

const {
  aosLogo,
  fortyKLogo,
  horusHeresyLogo,
  middleEarthLogo,
  blackLibraryLogo,
  citadelLogo,
} = logos;

//TODO: abstract away in separate file (logos/index.ts?)
const images: ImageProps[] = [
  { src: aosLogo, alt: "aos logo", width: 230 },
  { src: fortyKLogo, alt: "40k logo", width: 200 },
  { src: middleEarthLogo, alt: "middle earth logo", width: 200 },
  { src: horusHeresyLogo, alt: "horus herusy logo", width: 200 },
  { src: blackLibraryLogo, alt: "black library logo", width: 200 },
  { src: citadelLogo, alt: "citadel logo", width: 200 },
];

// interface CarouselProps {
//   images: ImageProps[];
// }

// const Carousel: React.FC<CarouselProps> = ({ images }) => {
const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselImages}>
        {images.map((imageProps, index) => (
          <div
            key={index}
            className={`${styles.carouselImage} ${
              index === activeIndex ? styles.active : ""
            }`}
          >
            <Image {...imageProps} />
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={goToPrevSlide}>
        {"<"}
      </button>
      <button className={styles.nextButton} onClick={goToNextSlide}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
