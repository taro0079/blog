---
title: "dog"
date: "2022-02-15"
desciption: "dog dog"
image: dog.png
---

## Table of Contents

## DOG

I have a dog

## test

test

## test test

test test test

```js[class="line-numbers"]
import Layout from "../components/layout";
import "../styles/globals.css";
import "../styles/prism.css";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```
