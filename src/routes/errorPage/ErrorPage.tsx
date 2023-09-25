import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  let errorMsg: string;

  if (isRouteErrorResponse(error)) {
    errorMsg = error.statusText;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  } else if (typeof error === "string") {
    errorMsg = error;
  } else {
    errorMsg = "Unknown error";
  }

  return (
    <section className={styles.errorPage}>
      <div className={styles.container}>
        <h1>Oops! An Error occured!</h1>
        <p>{errorMsg}</p>
      </div>
    </section>
  );
};

export default ErrorPage;
