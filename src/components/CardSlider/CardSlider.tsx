import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import Loader from "../../components/Loader/Loader";
import Button, { ButtonTypes } from "../Button/Button";
import "./card-slider.scss";

interface CardSliderProps {
  children: JSX.Element[] | JSX.Element | undefined;
  isLoading: boolean;
}

const getWindowSize = () => {
  const { innerWidth } = window;
  return innerWidth;
};

const CardSlider = ({ children, isLoading }: CardSliderProps) => {
  const [windowSize, setWindowSize] = useState(getWindowSize);
  const [offset, setOffset] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const contentsContainerRef = useRef<HTMLDivElement>(null)
  const innerContainerRef = useRef<HTMLDivElement>(null)

  // called initially
  useEffect(() => {
    setScrollX(contentsContainerRef.current?.scrollLeft ?? -1);
    // Update the state with new window width
    const handleResize = () => {
      setWindowSize(getWindowSize);
    };

    // Add a listener
    window.addEventListener("resize", handleResize);

    // Clean up the listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    if (!isLoading) {
      const contentsContainerObj = contentsContainerRef.current;
      if (contentsContainerObj) {
        if (contentsContainerObj.children[0].clientWidth < contentsContainerObj.clientWidth) {
          setIsScrollEnd(true)
        }
      }
    }
  }, [isLoading])

  useEffect(() => {
    const contentsContainerObj = contentsContainerRef.current;
    contentsContainerObj!.scrollLeft = scrollX;

    setIsScrollEnd((contentsContainerObj!.scrollWidth <= scrollX + offset + 66))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollX]);

  const scroll = (scrollOffset: number) => {
    setOffset(scrollOffset);
    const refObject = contentsContainerRef.current;

    if (refObject!.scrollWidth > scrollX + 66) {
      setScrollX(scrollX + scrollOffset ?? -1);
    }
  };

  return (
    <div className="card-slider-container">
      {
        // scrollX round down bc it could be sth like 0.2
        Math.floor(scrollX) > 0 ? (
          <div className="scroll-button left">
            <Button
              type={ButtonTypes.circle}
              onClick={() => scroll((windowSize / 2) * -1)}
              children={<FontAwesomeIcon icon={faAngleLeft} />}
            />
          </div>
        ) : null
      }

      <div className="contents" ref={contentsContainerRef}>
        {isLoading ? <Loader /> : <div className="flex space-x-4" ref={innerContainerRef}>{children}</div>}
      </div>

      {!isScrollEnd && (
        <div className="scroll-button right">
          <Button
            type={ButtonTypes.circle}
            onClick={() => scroll(windowSize / 2)}
            children={<FontAwesomeIcon icon={faAngleRight} />}
          />
        </div>

      )}
    </div>
  );
};

export default CardSlider;

CardSlider.defaultProps = {
  isLoading: false
}