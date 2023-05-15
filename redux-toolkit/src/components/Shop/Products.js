import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "1",
    price: 10,
    name: "My First book",
    description: "This is a first product - amazing!",
  },
  {
    id: "2",
    price: 32,
    name: "My Second book",
    description: "This is a second product - amazing!",
  },
];

const Products = (props) => {
  const productList = DUMMY_PRODUCTS.map((product) => (
    <ProductItem
      name={product.name}
      price={product.price}
      description={product.description}
      id={product.id}
      key={product.id}
    />
  ));
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
