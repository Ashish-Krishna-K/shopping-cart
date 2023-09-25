import { useRef, useState } from "react";
import { CarouselPropsType } from "../../appTypes";
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
    const currentIndex = products.findIndex(
      (item) => item.id === currentImg.id,
    );
    const nextIndex =
      currentIndex + 1 >= products.length ? 0 : currentIndex + 1;
    setCurrentImg(products[nextIndex]);
  };

  return (
    <div className={styles.carousel}>
      <SwitchTransition>
        <CSSTransition
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
            setTimeout(() => {
              setShowImg(false);
            }, 3000);
          }}
          onExited={() => {
            setShowImg(true);
            changeImage();
          }}
        >
          <img
            ref={imgRef}
            src={currentImg ? currentImg.image : ""}
            alt={currentImg ? currentImg.title : ""}
            onClick={() => {
              navigate("/shop");
            }}
            className={styles.productImg}
          />
        </CSSTransition>
      </SwitchTransition>
      <div className={styles.indicators}>
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
