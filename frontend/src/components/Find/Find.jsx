import './Find.css'

import Header_black from '../Header_black/Header_black'
import Footer from '../Footer/Footer'
import MapComponent from '../MapComponent/MapComponent'


function Find(props){

    
    

    return (
        <>
            <Header_black OnClick={props.OnClick}></Header_black>
            <div className='find-main'>
                <div className='montserrat top'>Ресторан на карте</div>
                <div className='map'>
                    {props.currentadress === "ул. Братиславская, д.12" && <MapComponent x={55.65968 } y={37.75269} currentadress={props.currentadress}></MapComponent>}
                    {props.currentadress === "пр-т Мира, д.118" && <MapComponent x={55.8107} y={37.6383} currentadress={props.currentadress}></MapComponent>}
                    {props.currentadress === "Ул. Таганская, д.1/2, стр.2" && <MapComponent x={55.741555} y={37.657177} currentadress={props.currentadress}></MapComponent>}
                    {props.currentadress === "Ул. Большая Пионерская, 7 с1" && <MapComponent x={55.72903} y={37.63455} currentadress={props.currentadress}></MapComponent>}
                </div>
                
                <div className='zagolovok montserrat'>Контактные данные</div>
                <div className='contact'>
                    <div className='row montserrat'><div className='name montserrat'>Адрес</div><div className='data'>Улица Большая Ордынка, 29 ст1</div></div>
                    <div className='row montserrat'><div className='name montserrat'>Номер телефона</div><div className='data'>8 (123) 456 78 90</div></div>
                    <div className='row montserrat'><div className='name montserrat'>Email</div><div className='data'>TasteAndTradition@yandex.ru</div></div>
                </div>
            </div>
            
            <Footer></Footer>
        </>
      )
}

export default Find