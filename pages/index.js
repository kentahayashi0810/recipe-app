import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import recipelist from "../public/recipes.json";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [recipes, setRecipes] = useState(recipelist);
  const [shoppingList, setShoppingList] = useState([]);

  const addHandler = (ingredients) => {
    ingredients.map((item) => {
      if (shoppingList.includes(item)) {
        return;
      } else {
        setShoppingList((prevShoppingList) => {
          return [...prevShoppingList, item];
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Recipe App</title>
        <meta name="description" content="Recipe App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul className={styles.recipelist}>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.name}>
                <button onClick={addHandler.bind(this, recipe.ingredients)}>
                  Add
                </button>
                <span>{recipe.name}</span>
              </li>
            );
          })}
        </ul>
        <ul className={styles.addedIngredients}>
          {shoppingList.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </main>
    </>
  );
}
