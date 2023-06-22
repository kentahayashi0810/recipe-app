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
  const [isActivated, setIsActivated] = useState(false);
  const [LeaItems, setLeaItems] = useState([]);
  const [KentaItems, setKentaItems] = useState([]);
  const [sharedItems, setSharedItems] = useState([]);

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

  const moveItemHandler = (name, item) => {
    // それぞれの買い物リストにアイテムを追加
    switch (name) {
      case "Lea":
        setLeaItems((prevItems) => {
          return [...prevItems, item];
        });
        break;

      case "Kenta":
        setKentaItems((prevItems) => {
          return [...prevItems, item];
        });
        break;

      case "shared":
        setSharedItems((prevItems) => {
          return [...prevItems, item];
        });
        break;

      default:
        return;
    }

    // 必要材料リストから追加したアイテムを削除
    deleteIngredient(item);
  };

  const deleteIngredient = (item) => {
    const filteredShoppingList = shoppingList.filter(
      (ingredient) => ingredient !== item
    );

    setShoppingList(filteredShoppingList);
  };

  const handleCopy = (name) => {
    const ingredientsStr =
      name === "Lea"
        ? LeaItems.join(", ")
        : "kenta"
        ? KentaItems.join(", ")
        : SharedItems.join(", ");
    return navigator.clipboard.writeText(ingredientsStr).then(() => {
      setIsActivated(true);
      setTimeout(() => {
        setIsActivated(false);
      }, 1600);
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

      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.container}>
            <h1 className={styles.title}>Recipe App</h1>
            {/* 料理リストの書き出し */}
            <ul className={styles.recipelist}>
              {recipes.map((recipe, index) => {
                return (
                  <li className={styles.recipe} key={recipe.name + index}>
                    <span>{recipe.name}</span>
                    <button onClick={addHandler.bind(this, recipe.ingredients)}>
                      Add
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* 必要材料と振り分けボタンの書き出し */}
          <div className={styles.container}>
            <ul className={styles.addedIngredients}>
              {shoppingList.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{item}</span>
                    <button onClick={moveItemHandler.bind(this, "Kenta", item)}>
                      Kenta
                    </button>
                    <button onClick={moveItemHandler.bind(this, "Lea", item)}>
                      Lea
                    </button>
                    <button
                      onClick={moveItemHandler.bind(this, "shared", item)}
                    >
                      Shared Items
                    </button>
                    <button onClick={deleteIngredient.bind(this, item)}>
                      No need to buy
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.shoppingList}>
            {/* Leaの買い物リスト */}
            <div>
              <h2>Lea's Shopping List</h2>
              <ul>
                {LeaItems.map((item) => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
              <button onClick={handleCopy.bind(null, "Lea")}>Copy</button>
              <span className="message">{isActivated ? "Copied!!" : ""}</span>
            </div>
            {/* Kentaの買い物リスト */}
            <div>
              <h2>Kenta's Shopping List</h2>
              <ul>
                {KentaItems.map((item) => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
              <button onClick={handleCopy.bind(null, "Kenta")}>Copy</button>
              <span className="message">{isActivated ? "Copied!!" : ""}</span>
            </div>
            {/* 共通の買い物リスト */}
            <div>
              <h2>Shared items Shopping List</h2>
              <ul>
                {sharedItems.map((item) => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
              <button onClick={handleCopy.bind(null, "shared")}>Copy</button>
              <span className="message">{isActivated ? "Copied!!" : ""}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
