import './OrderItem.css'

function OrderItem(props){
    return (
        <>
            <div className='order-item'>
                <div className='pic' onClick={() => props.GoodPage('Good', props.good)}>
                    <img src={`${props.good.pic}`} alt="" />
                </div>
                <div className='desc'>
                    <div className='name'><p className='montserrat'>{`${props.good.name}`}</p></div>
                    <div className='price'><p className='montserrat'>{`${props.good.price}`} р</p></div>
                </div>
                <div className='buttons'>
                    <div className='amount'><p className='montserrat'>{props.amount}</p></div>
                </div>
                <div className='final-price'><p className='montserrat'>{`${props.price} р`}</p></div>
            </div>
        </>
      )
}

export default OrderItem