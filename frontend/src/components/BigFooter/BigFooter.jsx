import './BigFooter.css'

function BigFooter(props){
    return (
        <>
            <div className='main_bigfooter'>
                <div className='bigfooter_numbers'>
                    <p className='montserrat'>Наши телефоны:</p>
                    <p className='montserrat'>8 (123) 456 78 90</p>
                </div>
                <div  className='bigfooter_icons'>
                    <img src={props.pic1} alt="" className='icon'/>
                    <img src={props.pic2} alt="" className='icon'/>
                    <img src={props.pic3} alt="" className='icon'/>
                </div>
                <div className='bigfooter_mail'>
                    <p className='montserrat'>Написать нам:</p>
                    <p className='montserrat'>TasteAndTradition@yandex.ru</p>
                </div>
            </div>
        </>
    )
}
export default BigFooter