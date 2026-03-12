import '../Orders/Orders.css'
import Header_black from '../Header_black/Header_black'
import Footer from '../Footer/Footer'
import Order from './Order'
import { useEffect, useState } from 'react'


function Orders(props){
    const [items, setItems] = useState([])

    const GetOrders = async () => {
        try {
            const response = await fetch('/api/getorders', {
                method: 'GET',
                headers: {'Content-Type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('token')}`}
            });

            if (response.ok){
                const data = await response.json()
                const sorteddata = data.data.sort((a, b) =>  b.id - a.id)
                setItems(data.data)
                console.log(data.data)
            } else {
                console.log('При получении товаров возникла ошибка')
            }
        } catch (err) {
            console.log(err)
        }
    };

    function ExitAccount(){
        localStorage.removeItem('token');
        props.OnClick('Main')
    }

    useEffect(() => {
        GetOrders();
    }, []);
    return (
        <>
            <Header_black OnClick={props.OnClick}></Header_black>
            <div className='orders_main'>
                <div className='left'>
                    <div className='zagolovok'>
                        <p className='montserrat'>Список ваших заказов</p>
                        <div className='exit montserrat' onClick={ExitAccount}>Выйти</div>
                    </div>
                        {items.map((item) => (<Order
                            key = {item.id}
                            {...item}
                            GetOrders = {GetOrders}
                            GoodPage={props.GoodPage}
                        >
                        </Order>))}
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Orders