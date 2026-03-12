import './BigFooter.css'
import maxicon from '../../assets/icons/soc/max.svg'
import odnoklicon from '../../assets/icons/soc/odnokl.svg'
import vkicon from '../../assets/icons/soc/vk.png'

function BigFooter(props){
    return (
        <>
            <div className='main_bigfooter'>
                <div className='bigfooter_numbers'>
                    <p className='montserrat'>Наши телефоны:</p>
                    <p className='montserrat'>8 (123) 456 78 90</p>
                </div>
                <div  className='bigfooter_icons'>
                    <img src={maxicon} alt="" className='icon'/>
                    <img src={odnoklicon} alt="" className='icon'/>
                    <img src={vkicon} alt="" className='icon'/>
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