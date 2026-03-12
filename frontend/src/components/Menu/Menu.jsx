import { useState, useEffect } from 'react'
import './Menu.css'
import BigFooter from '../BigFooter/BigFooter'
import { getBigFooter } from '../../data/BigFooter'
import Header from '../Header/Header'
import Menu_comps from '../Menu_comp/Menu_comp'
import { getMenu_comps_cold } from '../../data/Menu_comps'
import { getMenu_comps_hot } from '../../data/Menu_comps'
import { getMenu_comps_main } from '../../data/Menu_comps'
import { getMenu_comps_soups } from '../../data/Menu_comps'
import { getMenu_comps_desserts } from '../../data/Menu_comps'
import { getMenu_comps_drinks } from '../../data/Menu_comps'
import { getMenu_comps_bar } from '../../data/Menu_comps'

function Menu(props){
    const [menu_page, setMenu_page] = useState("Холодные закуски")
    const [goods, setGoods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function ChangeMenu_page(newMenu_page){
        setMenu_page(newMenu_page)
    }

    useEffect(() => {
        if (menu_page === "Холодные закуски"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/cold')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
                console.log(data.data.pic)
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Горячие закуски"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/hot')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Основные блюда"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/main')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Супы"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/soup')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Десерты"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/sweet')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Напитки"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/drinks')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        } else if (menu_page === "Барная карта"){
            setIsLoading(true);
            fetch('/api/getgoodsbycategory/bar')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
            })
            .catch(err => console.error('er', err))
        }
    }, [menu_page]);

    return (
        <>
            <div>
                <div className='menu_header'>
                    <Header OnClick={props.OnClick}></Header>
                </div>
                <div className='menu_middle'>
                    <div className='menu_select'>
                        <div className='select_but montserrat' onClick={() => ChangeMenu_page("Холодные закуски")}>
                            Холодные закуски
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Горячие закуски")}>
                            Горячие закуски
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Основные блюда")}>
                            Основные блюда
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Супы")}>
                            Супы
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Десерты")}>
                            Десерты
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Напитки")}>
                            Напитки
                        </div>
                        <div className='select_but' onClick={() => ChangeMenu_page("Барная карта")}>
                            Барная карта
                        </div>
                        
                    </div>
                    <div className='menu_tap'>
                        {menu_page === "Холодные закуски" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Горячие закуски" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Основные блюда" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Супы" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Десерты" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Напитки" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                        {menu_page === "Барная карта" && (
                            isLoading ? <p>Загрузка...</p> :
                            goods.map((item, index) => <Menu_comps
                                key = {index}
                                id = {item.id}
                                name = {item.name}
                                price = {item.price}
                                description = {item.description}
                                pic = {item.pic}
                                amount_avaliable = {item.amount_avaliable}
                                OnClick = {props.OnClick}
                                GoodPage={props.GoodPage}
                                good = {item}
                            ></Menu_comps>)
                            )
                        }
                    </div>
                </div>

                <BigFooter {...getBigFooter[0]}></BigFooter>
            </div>

        </>
      )
}

export default Menu