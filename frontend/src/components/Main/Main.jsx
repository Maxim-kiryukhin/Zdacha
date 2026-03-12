import '../Main/Main.css'
import '../Halfs/Halfs'
import Halfs from '../Halfs/Halfs'
import '../Footer/Footer'
import Footer from '../Footer/Footer'
import { getHalfs } from '../../data/Halfs'


function Main(props){
    return (
        <>
            <div className='main'>
                <div className='main_header'>
                    {/* <div className='header_left'>
                        Lorem, ipsum dolor.
                    </div> */}
                    <div className='main_header_middle'>
                        <p className='martian-mono'>Вкус&Традиция</p>
                    </div>
                    {/* <div className='main_header_right'>
                        Lorem, ipsum dolor.
                    </div> */}
                </div>
                <div className='text'>
                    <p className='oswald'>
                        Выберите интересующий ресторан
                    </p>
                </div>
                <div className='text_small'>
                    <p className='comfortaa'>
                        Быстрый ланч, уютный вечер вдвоем, шумные посиделки с компанией. В нашем меню есть всё, чтобы сделать ваш момент особенным.
                    </p>
                </div>
            </div>

            <Halfs order="0" OnClick={props.OnClick} {...getHalfs[0]}></Halfs>
            <Halfs order="1" OnClick={props.OnClick} {...getHalfs[1]}></Halfs>
            <Halfs order="0" OnClick={props.OnClick} {...getHalfs[2]}></Halfs>
            <Halfs order="1" OnClick={props.OnClick} {...getHalfs[3]}></Halfs>


            <div className='main-about_half'>
                <div className='first_half'>
                    <div className='pic'>
                        <img src="src\assets\Иконки\иконка-сайта.svg" alt="" />
                    </div>
                    <div className='first_half_desc_text'>
                        <h1 className='martian-mono'>
                            Вкус&Традиция
                        </h1>
                    </div> 
                    <button className='first_half_desc_button' onClick={() => props.OnClick("About")}>
                        <p className='montserrat'>О нас</p>
                    </button>
                </div>
                <img className='second_half' src="src/assets/Фото ресторанов/10724.jpg" alt="" />
            </div>


            <Footer></Footer>
        </>
      )
}

export default Main