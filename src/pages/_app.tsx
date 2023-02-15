import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/Layout";
import SEO from "next-seo.config";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}
