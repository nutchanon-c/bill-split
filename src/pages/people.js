import { AddPersonForm } from "@/components/add-person";
import { useState, useEffect } from "react";

export default function People() {
  const [items, setItems] = useState([]);

  const [people, setPeople] = useState([]);

  const [checkedItems, setCheckedItems] = useState(
    items.reduce((acc, item, index) => {
      acc[index] = false;
      return acc;
    }, {})
  );

  useEffect(() => {
    const localStorageItems = localStorage.getItem("items");
    if (localStorageItems) {
      setItems(JSON.parse(localStorageItems));
    }
    const localStoragePeople = localStorage.getItem("people");
    if (localStoragePeople) {
      setPeople(JSON.parse(localStoragePeople));
    }
  }, []);

  const handleAddPerson = (person) => {
    // add new person and reset checked states
    let consumedIndexList = [];
    for (let [key, value] of Object.entries(checkedItems)) {
      console.log(key, value);
      if (value) {
        consumedIndexList.push(parseInt(key));
      }
    }

    if (consumedIndexList.length > 0) {
      let temp = people;
      temp.push({ name: person, consumedItems: consumedIndexList });
      setPeople([...temp]);
      setCheckedItems(
        items.reduce((acc, item, index) => {
          acc[index] = false;
          return acc;
        }, {})
      );
      localStorage.setItem("people", JSON.stringify(temp));
    }
  };
  const handleCheckboxChange = (event, index) => {
    // update checkbox state
    const { checked } = event.target;
    setCheckedItems({ ...checkedItems, [index]: checked });
  };

  return (
    <div className="p-10 flex flex-row justify-center items-center h-screen w-screen">
      <div className="p-10 flex flex-col justify-center items-center">
        <p>Add People</p>
        <AddPersonForm addPerson={handleAddPerson} />
        {items.map((item, index) => {
          return (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={(event) => handleCheckboxChange(event, index)}
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>
      <div className="p-10 flex flex-col justify-center items-center ">
        {people &&
          people.map((person, index) => {
            return (
              <div key={index} className="flex flex-row">
                <p>{person.name}</p>
                <p>
                  {items
                    .map((item, idx) => {
                      if (person.consumedItems.includes(idx)) {
                        return item.name;
                      }
                    })
                    .join(",")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
