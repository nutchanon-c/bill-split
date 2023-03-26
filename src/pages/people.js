import { AddPersonForm } from "@/components/add-person";
import { NextButton } from "@/components/next-button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
export default function People() {
  const router = useRouter();
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
      console.log(localStorageItems.length);
      setItems(JSON.parse(localStorageItems));
    } else {
      console.log("blank");
      setItems([]);
      setPeople([]);
      localStorage.removeItem("people");
      localStorage.removeItem("items");
      return;
    }
    const localStoragePeople = localStorage.getItem("people");
    if (localStoragePeople) {
      setPeople(JSON.parse(localStoragePeople));
    }
  }, []);

  useEffect(() => {
    if (people.length === 0) {
      localStorage.removeItem("people");
    } else {
      localStorage.setItem("people", JSON.stringify(people));
    }
  }, [people]);

  const handleAddPerson = (person) => {
    // add new person and reset checked states
    if (!person) {
      alert("Please enter name");
      return false;
    }
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
      return true;
    }
    alert("Please select at least 1 item");
    return false;
  };
  const handleCheckboxChange = (event, index) => {
    // update checkbox state
    const { checked } = event.target;
    setCheckedItems({ ...checkedItems, [index]: checked });
  };
  const handleNext = () => {
    router.push("/summary");
  };

  const handleClearPeople = () => {
    setPeople([]);
    localStorage.removeItem("people");
  };
  const removePerson = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    console.log(newPeople);
    setPeople([...newPeople]);
  };

  return (
    <div className="flex flex-col p-5 md:p-10 justify-center items-center h-screen w-screen">
      <p className="font-bold text-center mb-4">Add People</p>
      <div className="flex flex-col md:flex-row">
        <div className="p-5 md:p-10 flex flex-col justify-center items-center">
          <AddPersonForm addPerson={handleAddPerson} />
          {items &&
            items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full px-2 md:px-10 py-2"
                >
                  <div className="flex flex-row space-x-2">
                    <input
                      type="checkbox"
                      checked={checkedItems[index]}
                      onChange={(event) => handleCheckboxChange(event, index)}
                    />
                    <p>{item.name}</p>
                  </div>
                  <p>{item.price}</p>
                </div>
              );
            })}
        </div>
        <div className="p-5 md:p-10 flex flex-col justify-center items-center">
          {people.length > 0 ? (
            <div className="w-full md:w-52">
              <table className="divide-y divide-gray-200 w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Items</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person, index) => {
                    return (
                      <tr key={index}>
                        <td className="border-y px-2 md:px-4 py-2">
                          <p>{person.name}</p>
                        </td>
                        <td className="border-y px-2 md:px-4 py-2">
                          <p>
                            {items
                              .map((item, idx) => {
                                if (person.consumedItems.includes(idx)) {
                                  return item.name;
                                }
                              })
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </td>
                        <td className="border-y px-2 md:px-4 py-2">
                          <button
                            onClick={() => {
                              removePerson(index);
                            }}
                            className="border border-red-500 rounded-lg w-5 h-5 flex justify-center items-center text-red-500"
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center items-center w-full">
                <button
                  onClick={handleClearPeople}
                  className="mt-5 text-red-500"
                >
                  Clear List
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <NextButton onPressed={handleNext} />
      <Footer />
    </div>
  );
}
