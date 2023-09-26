import { ForwardedRef, forwardRef } from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = forwardRef(function LoadingSpinner(
  // because typescript expects other props to be passed along
  // with a ref
  _: unknown,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return <div ref={ref} className={styles.loadingContainer}></div>;
});

export default LoadingSpinner;
