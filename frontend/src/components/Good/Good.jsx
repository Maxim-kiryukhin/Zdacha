import './Good.css'
import Header_black from '../Header_black/Header_black'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react'


function Good(props){
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
        <>
            <Header_black OnClick={props.OnClick}></Header_black>
            <div className='good-main'>
                
                <div className='twodiv'>
                    <div className='left'>
                        <div className='zagolovok montserrat'>{props.name}</div>
                        <div className='pic'><img src={`${props.pic}`} alt="" /></div>
                    </div>
                    <div className='right'>
                        <div className='top-desc'>
                            <div className='price montserrat'>{`${props.price} р`}</div>
                            <div className='price montserrat'>{`${props.weight} г`}</div>
                        </div>
                        <div className='buttons'>
                            <button onClick={() =>{ MinusCounter(counter-1); MinusCart()}}>
                                <p className='montserrat'>-</p>
                            </button>
                            <div className='counter'>
                                <p className='montserrat count'>{counter}</p>
                            </div>
                            <button onClick={() =>{ PlusCounter(counter+1); PlusCart()}}>
                                <p className='montserrat'>+</p>
                            </button>
                        </div>
                        <div className='desc'>{props.description}</div>
                        <div className='price montserrat'>Состав: </div>
                        <div className='sostav montserrat'>{props.ingredients}</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Good