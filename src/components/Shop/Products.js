import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Test",
    price: 6,
    description: "This is a first product -  amazing!",
  },
  {
    id: "p2",
    name: "Test - 2",
    price: 6,
    description: "This is a second product -  Great!",
  },
  {
    id: "p3",
    name: "Test - 3",
    price: 6,
    description: "This is a third product -  Awesome!",
  },
];

const Products = (props) => {
  const productItem = DUMMY_PRODUCTS.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      description={product.description}
    />
  ));
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productItem}</ul>
    </section>
  );
};

export default Products;
