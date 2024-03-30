import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Socks", quantity: 12, packed: false },
//   { id: 4, description: "Socks", quantity: 12, packed: false },
//   { id: 5, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setitems] = useState([]);

  function handleadditems(setitem) {
    setitems((items) => [...items, setitem]);
  }
  function handledelete(id) {
    console.log(setitems((items) => items.filter((items) => items.id !== id)));
  }
  function handlecheck(id) {
    setitems((items) =>
      items.map((items) =>
        items.id === id ? { ...items, packed: !items.packed } : items
      )
    );
  }
  function handlelist() {
    setitems([]);
  }
  return (
    <div className="app">
      <Logo />
      <From onaddingitem={handleadditems} />
      <Packingitems
        items={items}
        ondelte={handledelete}
        oncheck={handlecheck}
        onlist={handlelist}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function From({ onaddingitem }) {
  const [discrpiton, setdiscrption] = useState("");
  const [list, setlist] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();
    const setitems = { discrpiton, list, packed: false, id: Date.now() };
    onaddingitem(setitems);
    console.log(setitems);
    setdiscrption("");
    setlist(1);
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h2>What do you need for your trip</h2>
      <select value={list} onChange={(e) => setlist(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items.."
        value={discrpiton}
        onChange={(e) => setdiscrption(e.target.value)}
      ></input>
      <button>add</button>
    </form>
  );
}
function Packingitems({ items, ondelte, oncheck, onlist }) {
  const [sortby, setsort] = useState("input");
  let sortedall;
  if (sortby === "input") sortedall = items;
  if (sortby === "discrption")
    sortedall = items
      .slice()
      .sort((a, b) => a.discrpiton.localeCompare(b.discrpiton));
  if (sortby === "packed")
    sortedall = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedall.map((items) => (
          <Items
            items={items}
            key={items.id}
            ondelte={ondelte}
            oncheck={oncheck}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortby} onChange={(e) => setsort(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="discrption">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onlist}>clear list</button>
      </div>
    </div>
  );
}
function Items({ items, ondelte, oncheck }) {
  return (
    <div>
      <span style={items.packed ? { textDecoration: "line-through " } : {}}>
        <input
          type="checkBox"
          value={items.packed}
          onClick={() => oncheck(items.id)}
        ></input>
        <li>{items.discrpiton}</li>
        <li>{items.list} items</li>
        <button onClick={() => ondelte(items.id)}>❌</button>
      </span>
    </div>
  );
}
function Stats({ items }) {
  const total = items.length;
  const totalpacked = items.map((items) => (items.packed === true ? 1 : 0));
  const sum = totalpacked.reduce((total, num) => total + num, 0);

  return (
    <footer className="stats">
      {total > 0 && sum === total ? (
        "wow ready to go ✈️ "
      ) : (
        <em>
          💼 you have {total} items in your list,and you packet {sum}/{total}
        </em>
      )}
    </footer>
  );
}
