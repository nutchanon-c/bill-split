import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { AddPerson as AddItemForm } from "@/components/add-item";
import { Item } from "@/components/item";
import { NextButton } from "@/components/next-button";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [vatAmount, setVatAmount] = useState(0);
  const [scAmount, setScAmount] = useState(0);

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
    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }
    router.push("/people");
  };
  const handleClearItems = () => {
    setItems([]);
    localStorage.removeItem("items");
  };
  const handleVatChange = (e) => {
    setVatAmount(parseFloat(e.target.value));
    localStorage.setItem("vat", parseFloat(e.target.value));
  };
  const handleScChange = (e) => {
    setScAmount(parseFloat(e.target.value));
    localStorage.setItem("serviceCharge", parseFloat(e.target.value));
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
        <div className="text-2xl font-bold my-4">Items</div>
        <div className="flex flex-row items-center space-x-4 my-3">
          <p>VAT (THB): </p>
          <input
            type="number"
            value={vatAmount}
            onChange={handleVatChange}
            className="px-3 py-2"
          />
        </div>
        <div className="flex flex-row items-center space-x-4 my-3">
          <p>Service Charge(THB): </p>
          <input
            type="number"
            value={scAmount}
            onChange={handleScChange}
            className="px-3 py-2"
          />
        </div>
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
          {items.length > 0 ? (
            <button onClick={handleClearItems} className="text-red-500 my-5">
              Clear All Items
            </button>
          ) : null}
        </div>
        <NextButton onPressed={handleNext} />
        <Footer />
      </div>
    </>
  );
}
