import DateCounter from "./DateCounter";

export default function App() {
  return (
    <>
      <DateCounter />
    </>
  );
}

// import { useEffect } from "react";
// import Header from "./Header";
// import Main from "./Main";
// export default function App() {
//   useEffect(function () {
//     fetch("http://localhost:8000/questions")
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((e) => console.log(e));
//   });
//   return (
//     <div className="app">
//       <Header />
//       <Main className="main">
//         <p>1/15</p>
//         <p>question</p>
//       </Main>
//     </div>
//   );
// }
