import { NextPageContext } from "next";

import Error from "./error";

function ErrorPage({ statusCode }: { statusCode: number }) {
  return <Error statusCode={statusCode} />;
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
