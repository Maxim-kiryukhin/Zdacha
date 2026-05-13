import { useState } from "react";
import "./App.css";
import "./components/Main/Main";
import Main from "./components/Main/Main";
import "./components/Pages/Pages";
import Pages from "./components/Pages/Pages";
import Menu from "./components/Menu/Menu";
import Account from "./components/Account/Account";
import Registration from "./components/Account/Registration/Registration";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Good from "./components/Good/Good";
import Find from "./components/Find/Find";
import About from "./components/About/About";

import Slider from "./components/Swiper/Slider/Slider";

function App() {
  const [page, setPage] = useState("Main");
  const [data, setData] = useState();
  const [currentadress, setAdress] = useState();

  function ChangePage(newPage) {
    setPage(newPage);
    console.log(window.scrollY);
    console.log(page);
    window.scrollTo(0, 0);
  }

  function GoodPage(newPage, array) {
    setPage(newPage);
    window.scrollTo(0, 0);
    setData(array);
    console.log(array);
    console.log(data);
  }

  function ChangePageMap(newPage, adress) {
    setPage(newPage);
    window.scrollTo(0, 0);
    setAdress(adress);
    console.log(adress);
    console.log(currentadress);
  }
  return (
    <>
      {page === "Main" && <Main OnClick={ChangePageMap}></Main>}
      {page === "Main2" && (
        <Pages OnClick={ChangePage} currentadress={currentadress}></Pages>
      )}
      {page === "Menu" && (
        <Menu OnClick={ChangePage} GoodPage={GoodPage}></Menu>
      )}

      {page === "Account" && <Account OnClick={ChangePage}></Account>}
      {page === "Registration" && (
        <Registration OnClick={ChangePage}></Registration>
      )}

      {page === "Cart" && (
        <Cart OnClick={ChangePage} GoodPage={GoodPage}></Cart>
      )}
      {page === "Orders" && (
        <Orders OnClick={ChangePage} GoodPage={GoodPage}></Orders>
      )}
      {page === "Good" && <Good OnClick={ChangePage} {...data}></Good>}

      {page === "Find" && (
        <Find OnClick={ChangePage} currentadress={currentadress}></Find>
      )}
      {page === "About" && (
        <About OnClick={ChangePage} GoodPage={GoodPage}></About>
      )}
    </>
  );
}

export default App;
