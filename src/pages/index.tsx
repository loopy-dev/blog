import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export const getServerSideProps = async () => {
  const response = await axios.get<Product>("https://dummyjson.com/products/1");
  const product = response.data;

  return {
    props: {
      product,
    },
  };
};

interface Props {
  product: Product;
}

const Home = ({ product }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      <div>{JSON.stringify(product)}</div>
    </>
  );
};

export default Home;
