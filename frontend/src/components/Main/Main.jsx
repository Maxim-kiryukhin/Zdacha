import '../Main/Main.css'
import '../Halfs/Halfs'
import Halfs from '../Halfs/Halfs'
import '../Footer/Footer'
import Footer from '../Footer/Footer'
import { getHalfs } from '../../data/Halfs'

import photo10724 from '../../assets/photos/10724.jpg'
import sitelogo from '../../assets/icons/site-icon.svg'

function Main(props){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
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

            {windowWidth > 600 ? (
                <>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[0]}
                    ></Halfs>
                    <Halfs
                        order="1"
                        OnClick={props.OnClick}
                        {...getHalfs[1]}
                    ></Halfs>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[2]}
                    ></Halfs>
                    <Halfs
                        order="1"
                        OnClick={props.OnClick}
                        {...getHalfs[3]}
                    ></Halfs>
                </>
            ) : (
                <>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[0]}
                    ></Halfs>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[1]}
                    ></Halfs>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[2]}
                    ></Halfs>
                    <Halfs
                        order="0"
                        OnClick={props.OnClick}
                        {...getHalfs[3]}
                    ></Halfs>
                </>
            )}


            <div className='main-about_half'>
                <div className='first_half'>
                    <div className='pic'>
                        <img src={sitelogo} alt="" />
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
                <img className='second_half' src={photo10724} alt="" />
            </div>


            <Footer></Footer>
        </>
      )
}

export default Main