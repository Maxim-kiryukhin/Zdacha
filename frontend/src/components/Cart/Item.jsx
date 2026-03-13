import { use } from 'react'
import '../Cart/Item.css'
import { useState, useEffect } from 'react'

function Item(props){
    const [SelectedAmount, SetSelectedAmount] = useState(props.amount)
    const AmountAvaliable = props.amount_avaliable
    const [ItemPrice, SetItemPrice] = useState(props.amount * props.price)

    function MinusCounter(newCounter){
        SetSelectedAmount(newCounter)
        SetItemPrice(newCounter * props.price)
        if (newCounter <= 0){
            SetSelectedAmount(0) 
            SetItemPrice(0)
            MinusCartUpdate()
        }
        MinusCart()
        props.setTotalPrice(-props.price)
    }
    function PlusCounter(newCounter){
        SetSelectedAmount(newCounter)
        SetItemPrice(newCounter * props.price)
        if (SelectedAmount >= AmountAvaliable){
            SetSelectedAmount(AmountAvaliable)
            SetItemPrice(props.price * SelectedAmount)
            props.setTotalPrice(Number(-props.price))
        }
        PlusCart()
        props.setTotalPrice(Number(props.price))
    }

    const MinusCart = async () => {
        try {
            const response = await fetch(`/api/decreasegoodincart/${props.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
            if (response.ok) {
                console.log('Ok')
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };
    // НЕ ТРОГАТЬ, НОРМАЛЬНО СДЕЛАЛ, ОПЯТЬ ПОЛОМАЮ
    const MinusCartUpdate = async () => {
        try {
            const response = await fetch(`/api/decreasegoodincart/${props.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
            if (response.ok) {
                console.log('Ok')
                props.GetItems()
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };

    const PlusCart = async () => {
        try {
            const response = await fetch(`/api/increasegoodincart/${props.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
            if (response.ok) {
                console.log('Ok')
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };

    return (
        <>
            <div className='cart-item'>
                <div className='pic' onClick={() => props.GoodPage('Good', props.item.good)}>
                    <img src={`${props.pic}`} alt="" />
                </div>
                <div className='desc'>
                    <div className='name'><p className='montserrat'>{`${props.name}`}</p></div>
                    <div className='price'><p className='montserrat'>{`${props.price}`} р</p></div>
                </div>
                <div className='buttons'>
                    <button onClick={() => {PlusCounter(SelectedAmount+1)}}><p className='change'>+</p></button>
                    <div className='amount'><p className='montserrat'>{SelectedAmount}</p></div>
                    <button onClick={() => {MinusCounter(SelectedAmount-1)}}><p className='change'>-</p></button>
                </div>
                <div className='final-price'><p className='montserrat'>{`${ItemPrice} р`}</p></div>
            </div>
        </>
    )
}

export default Item