import '../Orders/Order.css'
import OrderItem from './OrderItem'
import { useState } from 'react'

function Order(props){
    const [hidden, setHidden] = useState(true)

    const status = props.status

    const CancelOrder = async () => {
        try {
            const response = await fetch(`/api/cancelorder/${props.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
            if (response.ok) {
                console.log('Ok')
                props.GetOrders()
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };
    const Button = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            <div className='order-main'>
                <div className='order' onClick={() => setHidden(!hidden)}>
                    <div className='desc'>
                        <div className='name'><p className='montserrat'>{`Заказ от: ${props.name}`}</p></div>
                        <div className='price'><p className='montserrat'>{`Стоимость: ${props.price}`} р</p></div>
                    </div>
                    {status === 'new' && <div className='status new'><p>Новый</p></div> }
                    {status === 'confirmed' && <div className='status confirmed'><p>Подтвержден</p></div> }
                    {status === 'canceled' && <div className='status canceled'><p>Отменен</p></div> }
                    {status === 'declined' && <div className='status declined'><p>Отказано</p></div> }

                    {props.status == "new" ? <div className='buttons'>
                        <button onClick={(e) => {Button(e), CancelOrder()}}><p className='cancel'>Отменить заказ</p></button>
                    </div> : ''}
                </div>
                <div className={`items ${hidden ? 'hidden' : ''}`}>
                    {props.items.map((item) => 
                        <OrderItem
                            key = {item.id}
                            good = {item.good}
                            price = {item.price}
                            amount = {item.amount}
                            hidden = {hidden}
                            GoodPage={props.GoodPage}
                        ></OrderItem>
                    )}
                </div>
                
            </div>
        </>
    )
}

export default Order