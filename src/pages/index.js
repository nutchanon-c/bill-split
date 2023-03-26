import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { AddPerson as AddItemForm } from "@/components/add-item";
import { Item } from "@/components/item";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const localStorageItems = localStorage.getItem("items");
    if (localStorageItems) {
      setItems(JSON.parse(localStorageItems));
    }
  }, []);
  const handleAddItem = (item) => {
    let temp = items;
    temp.push(item);
    setItems([...temp]);
    localStorage.setItem("items", JSON.stringify(temp));
  };
  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
    localStorage.setItem("items", JSON.stringify(newItems));
  };
  const handleNext = () => {
    router.push("/people");
  };
  return (
    <>
      <Head>
        <title>Bill Splitting</title>
        <meta name="description" content="Simple Bill Split" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 flex flex-col justify-center items-center h-screen w-screen">
        <div className="text-2xl font-bold">Bill Split</div>
        <div className="flex flex-col">
          <AddItemForm onAddItem={handleAddItem} />
          <div className="flex flex-col mt-10">
            {items &&
              items.map((item, index) => {
                return (
                  <Item
                    key={index}
                    item={item}
                    index={index}
                    handleRemoveItem={handleRemoveItem}
                  />
                );
              })}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="bg-blue-50 text-black w-20 h-10 rounded-lg"
        >
          {"Next >"}
        </button>
      </div>
    </>
  );
}
