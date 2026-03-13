import React, { useState } from 'react';
import './MenuComps.css'

const MenuComps = (props) => {
    // Локальное состояние для счетчика
    const [counter, setCounter] = useState(0)
    const AmountAvaliable = props.amount_avaliable
    function MinusCounter(newCounter){
        setCounter(newCounter)
        if (counter == 0){
            setCounter(0) 
        }
    }
    function PlusCounter(newCounter){
        setCounter(newCounter)
        if (counter >= AmountAvaliable){
            setCounter(AmountAvaliable)
        }
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
        <div className='slider-comp'>
            <img 
                src={`${props.pic}`} 
                onClick={() => props.GoodPage && props.GoodPage('Good', props.good)} 
                alt={props.name} 
                className='comp_pic' 
            />
            <div className='comp_all'>
                <div className='comp_text'>
                    <div className='comp_top'>
                        <p className='montserrat'>{props.name}</p>
                        <p className='montserrat'>{props.price}</p>
                    </div>
                    <div className='comp_desc'>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className='comp_bot'>
                    <div className='comp_count'>
                        <button onClick={() => { MinusCounter(counter-1); MinusCart(); }}>
                            <p className='montserrat minus'>-</p>
                        </button>
                        <div>
                            <p className='oswald count_number'>{counter}</p>
                        </div>
                        <button onClick={() => { PlusCounter(counter + 1); PlusCart(); }}>
                            <p className='montserrat plus'>+</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuComps;