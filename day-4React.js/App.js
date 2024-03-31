import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showbox, setbox] = useState(false);
  const [friend, setfriends] = useState(initialFriends);
  const [selectfri, setselectfri] = useState(null);
  function handleclick() {
    setbox((show) => !show);
  }
  function handleaddnewfri(friend) {
    setfriends((friends) => [...friends, friend]);
    setbox(false);
  }
  function handleclickselectfri(friend) {
    // setselectfri(friend);
    setselectfri((crr) => (crr?.id === friend.id ? null : friend));
    setbox(false);
  }
  function handlesplit(value) {
    console.log(value);
    setfriends((friend) =>
      friend.map((friend) =>
        friend.id === selectfri.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friendslist
          friends={friend}
          onselectfri={handleclickselectfri}
          selectfri={selectfri}
        />
        {showbox && <Formaddfri onaddfri={handleaddnewfri} />}
        <Button onClick={handleclick}>{showbox ? "close" : "add"}</Button>
      </div>
      <div>
        {selectfri && (
          <Fromsplitbill selectfri={selectfri} handlelast={handlesplit} />
        )}
      </div>
    </div>
  );
}

function Friendslist({ friends, onselectfri, selectfri }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friends={friend}
          key={friend.id}
          onselectfri={onselectfri}
          selectfri={selectfri}
        />
      ))}
    </ul>
  );
}
function Friends({ friends, onselectfri, selectfri }) {
  const select = selectfri?.id === friends.id;
  return (
    <li className={select ? "slected" : ""}>
      <img src={friends.image} alt={friends.name} />
      <h3>{friends.name}</h3>
      {friends.balance < 0 && (
        <p className="red">
          you owe {friends.name} {Math.abs(friends.balance)}$
        </p>
      )}
      {friends.balance > 0 && (
        <p className="green">
          {friends.name} owes you {Math.abs(friends.balance)}$
        </p>
      )}
      {friends.balance === 0 && (
        <p className="black">
          you are even {friends.name} {Math.abs(friends.balance)}$
        </p>
      )}
      <Button onClick={() => onselectfri(friends)}>
        {select ? "close" : "select"}
      </Button>
    </li>
  );
}

function Formaddfri({ onaddfri }) {
  const [name, setname] = useState("");
  const [img, setimg] = useState("https://i.pravatar.cc/48?u=933372");
  function handlesubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    console.log(Boolean(name, img));
    if (!name || !img) return;
    const newfri = {
      name,
      img,
      balance: 0,
      id,
    };
    onaddfri(newfri);
    setname("");
    setimg("https://i.pravatar.cc/48?u=933372");
  }
  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label>name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <label>img url</label>
      <input
        type="text"
        value={img}
        onChange={(e) => setimg(e.target.value)}
      ></input>
      <Button>add</Button>
    </form>
  );
}
function Fromsplitbill({ selectfri, handlelast }) {
  const [bill, setbill] = useState();
  const [exp, setexp] = useState();

  const [whoispaying, setwhoispaying] = useState("you");
  const paybyuser = bill ? bill - exp : "";
  function handlesplit(e) {
    e.preventDefault();
    if (console.log(!bill || !exp)) return;

    handlelast(whoispaying === "you" ? exp : -paybyuser);
  }
  return (
    <form className="form-split-bill">
      <h2>split a bill with {selectfri.name}</h2>
      <label>BILL VALUE</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      ></input>
      <label>YOUR EXPENSES</label>
      <input
        type="text"
        value={exp}
        onChange={(e) => setexp(Math.min(Number(e.target.value), bill ?? 0))}
      ></input>
      <label>{selectfri.name} EXPENSES</label>
      <input type="text" disabled value={paybyuser}></input>

      <label>who is paying the bill</label>
      <select
        value={whoispaying}
        onChange={(e) => setwhoispaying(e.target.value)}
      >
        <option value="you">you</option>
        <option value="friend">friend</option>
      </select>

      <Button onClick={handlesplit}>split bill</Button>
    </form>
  );
}
