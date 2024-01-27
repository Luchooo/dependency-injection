import { describe, expect, test } from "vitest";
import { getFilterProducts, getMenProducts } from "./with-di";

describe("getMenProducts function", () => {
  test("Should be size 1 length", async () => {
    const products = [
      { id: 1, category: "jeweler's" },
      { id: 2, category: "men's clothing" },
    ];
    const newProducts = await getMenProducts(products);
    expect(newProducts.length).toBe(1);
    expect(newProducts).toEqual([
      {
        id: 2,
        category: "men's clothing",
      },
    ]);
  });

  test("Should be size 0 length", async () => {
    const products = [
      { id: 1, category: "jeweler's" },
      { id: 2, category: "food" },
    ];
    const newProducts = await getMenProducts(products);
    expect(newProducts.length).toBe(0);
  });
});

describe("getFilterProducts function", () => {
  test("should return an array with only the id and category property", async () => {
    type Product = {
      id: number;
      category: string;
      title?: string;
    };

    const menProducts: Product[] = [
      { id: 1, category: "food", title: "product one" },
      { id: 2, category: "food", title: "product two" },
    ];
    const result = await getFilterProducts(menProducts);
    expect(result).toEqual([
      { id: 1, category: "food" },
      { id: 2, category: "food" },
    ]);
  });
});
