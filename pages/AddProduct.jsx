import Head from "next/head";

import { AddEditProduct, Layout } from "@/components";

const AddProduct = () => {
  return (
    <Layout>
      <Head>
        <title>Add Product</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="w-full min-h-screen flex items-center justify-center">
        <AddEditProduct />
      </div>
    </Layout>
  );
};

export default AddProduct;
