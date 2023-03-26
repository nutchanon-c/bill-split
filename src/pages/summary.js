import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Summary() {
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [vat, setVat] = useState(0);
  const router = useRouter();
  const itemConsumptionCount = {};

  useEffect(() => {
    const localStorageItems = localStorage.getItem("items");

    if (localStorageItems) {
      setItems(JSON.parse(localStorageItems));
    }
    const localStoragePeople = localStorage.getItem("people");
    if (localStoragePeople) {
      setPeople(JSON.parse(localStoragePeople));
    }
    const localStorageVat = localStorage.getItem("vat");
    if (localStorageVat && localStorageVat !== "NaN") {
      setVat(localStorageVat);
    } else {
      setVat(0);
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("items");
    localStorage.removeItem("people");
    localStorage.removeItem("vat");
    router.replace("/");
  };

  items.forEach((item, itemIndex) => {
    let count = 0;
    people.forEach((person) => {
      if (person.consumedItems.includes(itemIndex)) {
        count++;
      }
    });
    itemConsumptionCount[item.name] = count;
  });

  return (
    <div className="p-10 flex flex-col justify-center items-center h-screen w-screen">
      <p className="font-bold text-3xl">Summary</p>
      <div className="flex flex-col w-60 items-center">
        <div className="flex flex-row justify-between w-full">
          <p>Total Price (Before VAT): </p>
          <p className="text-blue-500">
            {items.reduce((accumulator, item) => {
              return accumulator + item.price;
            }, 0)}
            THB
          </p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p>Total Price (+VAT): </p>
          <p className="text-blue-500">
            {parseFloat(
              items.reduce((accumulator, item) => {
                return accumulator + item.price;
              }, 0)
            ) + parseFloat(vat)}
            THB
          </p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p>VAT/person: </p>
          <p className="text-blue-500">
            {parseFloat(vat) / people.length}
            THB
          </p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="">
            <th className="border px-4 py-2 text-left text-xs">Name</th>
            <th className="border px-4 py-2 text-left text-xs">Items</th>
            <th className="border px-4 py-2 text-left text-xs">Items Price</th>
            <th className="border px-4 py-2 text-left text-xs">
              Total Price (VAT included)
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => {
            const consumedItems = items.filter((item, itemIndex) => {
              return person.consumedItems.includes(itemIndex);
            });
            const consumedItemNames = consumedItems.map((item) => item.name);
            const consumedItemNamesString = consumedItemNames.join(", ");
            const totalPrice = consumedItems.reduce((accumulator, item) => {
              return accumulator + item.price / itemConsumptionCount[item.name];
            }, 0);

            return (
              <tr key={index}>
                <td className="border px-4 py-2">{person.name}</td>
                <td className="border px-4 py-2">{consumedItemNamesString}</td>
                <td className="border px-4 py-2">
                  {parseFloat(totalPrice).toFixed(2)}
                </td>
                <td className="border px-4 py-2 text-green-300">
                  {vat === 0
                    ? "no"
                    : (parseFloat(totalPrice) + vat / people.length).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={handleReset}
        className="mt-10 border border-white bg-blue-50 text-black px-4 py-2 rounded-lg"
      >
        Reset
      </button>
      <Footer />
    </div>
  );
}
