import { useRef, useState } from "react";
import { type CarouselPropsType } from "../../appTypes";
import styles from "./Carousel.module.css";
import { useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Carousel = ({ products }: { products: CarouselPropsType[] }) => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState<CarouselPropsType>(products[0]);
  const [showImg, setShowImg] = useState<boolean>(true);
  const enterRef = useRef<HTMLImageElement | null>(null);
  const exitRef = useRef<HTMLImageElement | null>(null);
  const imgRef = showImg ? enterRef : exitRef;

  const changeImage = () => {
    // We want the image to change every 3 seconds hence changing
    // the currentImg state to the next item in the array.
    const currentIndex = products.findIndex(
      (item) => item.id === currentImg.id,
    );
    const nextIndex =
      currentIndex + 1 >= products.length ? 0 : currentIndex + 1;
    setCurrentImg(products[nextIndex]);
  };

  return (
    <div className={styles.carousel}>
      {/* 
        The aim is to show a smooth fade in from left and fade out to the
        right transition hence using the SwitchTransition component. 
       */}
      <SwitchTransition>
        <CSSTransition
          // based on showImg state the enter and exit phase of transiton
          // gets determined
          key={showImg ? "enter" : "exit"}
          nodeRef={imgRef}
          appear={true}
          addEndListener={(done: () => void) => {
            imgRef.current!.addEventListener("transitionend", done, false);
          }}
          classNames={{
            appear: styles.productImgAppear,
            appearActive: styles.productImgAppearActive,
            appearDone: styles.productImgAppearDone,
            enter: styles.productImgEnter,
            enterActive: styles.productImgEnterActive,
            enterDone: styles.productImgEnterDone,
            exit: styles.productImgExit,
            exitActive: styles.productImgExitActive,
            exitDone: styles.productImgExitDone,
          }}
          onEntered={() => {
            // We want the image to exit 3 seconds after it completes the
            // enter transition
            setTimeout(() => {
              // To trigger the exit phase of the transition
              setShowImg(false);
            }, 3000);
          }}
          onExited={() => {
            // We want to trigger the enter phase once exit is completed
            // while also changing the currentImg state to the next item
            setShowImg(true);
            changeImage();
          }}
        >
          <img
            ref={imgRef}
            src={currentImg.image}
            alt={currentImg.title}
            onClick={() => {
              // We want the user to be redirected to the shop page if they
              // click on the image
              navigate("/shop");
            }}
            className={styles.productImg}
          />
        </CSSTransition>
      </SwitchTransition>
      <div className={styles.indicators}>
        {/* 
            We want a small indication of the image position to the user however 
            setting up the indicator to be clickable to navigate to different image
            caused issues with the transitions hence currently it's not clickable
          */}
        {products.map((product) => (
          <div
            key={product.id}
            className={
              currentImg
                ? currentImg.id === product.id
                  ? styles.currentImg
                  : styles.imgIndicator
                : ""
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
