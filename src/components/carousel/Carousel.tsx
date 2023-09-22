import { useEffect, useState } from "react";
import { CarouselPropsType } from "../../appTypes";
import styles from './Carousel.module.css';

const Carousel = ({ products }: { products: CarouselPropsType[] }) => {
  const [currentImg, setCurrentImg] = useState<CarouselPropsType>(products[0]);
  useEffect(() => {
    const changeImage = setTimeout(() => {
    console.log('checking');
    const currentIndex = products.findIndex(
      (item) => item.id === currentImg.id,
    );
    const nextIndex =
      currentIndex + 1 >= products.length ? 0 : currentIndex + 1;
    setCurrentImg(products[nextIndex]);
  }, 3000);
  return () => {
    clearTimeout(changeImage);
  }
  }, [products, currentImg])
  return (
    <div className={styles.carousel}>
      <img 
        src={currentImg.image} 
        alt={currentImg.title} 
        className={styles.productImg}  
      />
      <div className={styles.buttons}>
        {products.map((product) => (
          <button
            className={product.id === currentImg.id ? styles.current : ""}
            key={product.id}
            onClick={() => {
              setCurrentImg(product);
            }}
            data-testid={product.title}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
