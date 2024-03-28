import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast react pizza co.</h1>
    </header>
  );
}
function Main() {
  const pizzadata1 = pizzaData;

  return (
    <main className="menu">
      <h2> our menu</h2>
      {pizzadata1.length ? (
        <>
          <p>
            Welcome to {resname.resname1}, where culinary excellence meets a
            cozy ambiance. Indulge in our delightful array of pizzas, crafted
            with passion and served with a smile. Experience dining like never
            before at {resname.resname1}."
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaobj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <h2>working in progress</h2>
      )}
    </main>
  );
}
function Pizza({ pizzaobj }) {
  console.log(pizzaobj);
  return (
    <li className={`pizza  ${pizzaobj.soldOut ? "sold-out" : ""}`}>
      <div>
        <img src={pizzaobj.photoName} alt={pizzaobj.name}></img>
        <h3>{pizzaobj.name}</h3>

        <p>{pizzaobj.ingredients}</p>
        <span>{pizzaobj.soldOut ? "SOLD OUT" : pizzaobj.price}</span>
      </div>
    </li>
  );
}
function Footer() {
  const openhr = 10;
  const closehr = 11;
  const currentHr = new Date().getHours();
  const shopopen = currentHr >= openhr && currentHr < closehr;
  return (
    <footer className="footer">
      {shopopen ? (
        <Openhr closehr={closehr} />
      ) : (
        `we are closed now come back in ${openhr}:00`
      )}
      <Openbtn disabled={!shopopen} />
    </footer>
  );
}

function Openhr(props) {
  return <p>we are open now until {props.closehr}:00</p>;
}
function Openbtn(props) {
  return (
    <div>
      <button className="btn" disabled={props.disabled}>
        order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const resname = {
  resname1: "italian",
};
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
