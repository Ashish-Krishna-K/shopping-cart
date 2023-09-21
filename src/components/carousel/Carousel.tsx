import { useState } from "react";
import { CarouselPropsType } from "../../appTypes";

const Carousel = ({ products }: { products: CarouselPropsType[] }) => {
  const [currentImg, setCurrentImg] = useState<CarouselPropsType>(products[0]);
  setTimeout(() => {
    const currentIndex = products.findIndex(
      (item) => item.id === currentImg.id,
    );
    const nextIndex =
      currentIndex + 1 >= products.length ? 0 : currentIndex + 1;
    setCurrentImg(products[nextIndex]);
  }, 3000);
  return (
    <div>
      <img src={currentImg.image} alt={currentImg.title} />
      <div>
        {products.map((product) => (
          <button
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
