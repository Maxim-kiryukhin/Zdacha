import '../Cart/Cart.css'
import Header_black from '../Header_black/Header_black'
import Footer from '../Footer/Footer'
import Item from './Item'
import { useEffect, useState } from 'react'


function Cart(props){
    const [items, setItems] = useState([])
    const [password, setPassword] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    const setPass = (e) =>{
        const value = e.target.value
        setPassword(value)
    }

    const GetItems = async () => {
        try {
            const response = await fetch('/api/getitemsincart', {
                method: 'GET',
                headers: {'Content-Type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('token')}`}
            });

            if (response.ok){
                const data = await response.json()
                setItems(data.data)
            } else {
                console.log('При получении товаров возникла ошибка')
            }
        } catch (err) {
            console.log(err)
        }
    };

    const MakeOrder = async () => {
        try {
            const response = await fetch('/api/createorder', {
                method: 'POST',
                headers: {'Content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('token')}`},
                body: JSON.stringify({password})
            })
            if (response.ok){
                GetItems()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetItems();
    }, []);
    useEffect(() => {
        const total = items.reduce((sum, item) => {
            return sum + (item.good.price * item.amount)
        }, 0)
        setTotalPrice(total)
    }, [items]);
    return (
        <>
            <Header_black OnClick={props.OnClick}></Header_black>
            <div className='cart_main'>
                <div className='left'>
                    <div className='zagolovok'>
                        <p className='montserrat'>Ваша корзина товаров</p>
                    </div>
                        {items.map((item) => (<Item
                            key = {item.good.id}
                            id = {item.good.id}
                            name = {item.good.name}
                            amount = {item.amount}
                            amount_avaliable = {item.good.amount_avaliable}
                            price = {item.good.price}
                            pic = {item.good.pic}
                            item = {item}
                            onClick = {props.onClick}
                            GetItems = {GetItems}
                            GoodPage={props.GoodPage}
                            setTotalPrice = {(diff) => setTotalPrice(prev => prev + diff)}
                        ></Item>))}
                </div>

                <div className='right'>
                    <div className='zagolovok'>
                        <p className='montserrat'>Сумма заказа</p>
                    </div>

                    

                    <div className='confirmation'>
                        <div className='total-price'>
                            <p className='montserrat total'>Итого</p>
                            <p className='montserrat price'>{totalPrice} р</p>
                        </div>

                        <input 
                        name="password" 
                        value={password}
                        onChange={setPass}
                        type="password" 
                        placeholder='Введите пароль'/>

                        <div className='confirm' onClick={MakeOrder}><p className='montserrat'>ОФОРМИТЬ ЗАКАЗ</p></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
      )
}

export default Cart