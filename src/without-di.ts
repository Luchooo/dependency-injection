type Product = {
  id: number;
  category: string;
};

const getFilterProducts = async (
  menProducts: Product[]
): Promise<Product[]> => {
  const filterProducts = menProducts.map((product: Product) => {
    return {
      id: product.id,
      category: product.category,
    };
  });
  return filterProducts;
};

const getMenProducts = async (data: Product[]): Promise<Product[]> => {
  const menProducts = data.filter((item) => item.category === "men's clothing");
  return await getFilterProducts(menProducts);
};

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: Product[] = await res.json();
  const menProducts = await getMenProducts(data);
  return menProducts;
};

const main = async () => {
  const jobs = await getProducts();
  console.log(jobs);
};

main();
