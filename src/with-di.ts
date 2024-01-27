type Product = {
  id: number;
  category: string;
};

type ProductServiceConfig = {
  getProducts: () => Promise<Product[]>;
  getMenProducts: (products: Product[]) => Promise<Product[]>;
  getFilterProducts: (products: Product[]) => Promise<Product[]>;
};

type ProductService = {
  getProducts: () => Promise<Product[]>;
};

export const getFilterProducts = async (
  menProducts: Product[]
): Promise<Product[]> => {
  return menProducts.map(({ id, category }: Product) => ({ id, category }));
};

export const getMenProducts = async (data: Product[]): Promise<Product[]> => {
  return data.filter((item) => item.category === "men's clothing");
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Error fetching products");
  return await res.json();
};

const productService = (config: ProductServiceConfig): ProductService => {
  const getProducts = async (): Promise<Product[]> => {
    const products = await config.getProducts();
    const menProducts = await config.getMenProducts(products);
    return await config.getFilterProducts(menProducts);
  };

  return { getProducts };
};

const main = async (filteredProdSrv: ProductService): Promise<void> => {
  const jobs = await filteredProdSrv.getProducts();
  console.log(jobs);
};

const filteredProdSrv = productService({
  getFilterProducts,
  getMenProducts,
  getProducts,
});

export const mainDependencyInjection = async (): Promise<void> => {
  try {
    await main(filteredProdSrv);
  } catch (e) {
    console.error(e);
  }
};
