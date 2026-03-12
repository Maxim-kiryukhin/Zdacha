import { useState } from 'react'
import { useEffect } from 'react'
import './About.css'
import '../Halfs/Halfs'
import Halfs from '../Halfs/Halfs'

import { getHalfs_Alex } from '../../data/Halfs'

import TwoBut from '../TwoBut/TwoBut'
import { GetTwoBut } from '../../data/TwoBut'
import Reviews from '../Reviews/Reviews'
import { getReviews } from '../../data/Reviews'
import BigFooter from '../BigFooter/BigFooter'
import { getBigFooter } from '../../data/BigFooter'
import Header from '../Header/Header'
import Slider from '../Swiper/Slider/Slider'



function About(props){
    //Сам сделал, работает, но надо проверять
    const [review, setReview] = useState(0)
    function ChangeReview(newReview){
        if (review == getReviews.length-1  || review>2){
            setReview(0)
        }else{
            setReview(newReview+1)
        }
    }
    setTimeout(() => {
        ChangeReview(review)
    }, 5000);
    //Сам сделал

    return (
        <>
            <div className='about-main'>
                <Header OnClick={props.OnClick}></Header>
                <div className='text Montserrat'>
                    <p className='oswald'>
                        Проверенная классика в авторском прочтении 0 только фермерские продукты и мастерство наших шефов
                    </p>
                </div>
            </div>

            <div className='about_half'>
                <div className='first_half'>
                    <div className='pic'>
                        <img src="src\assets\Иконки\иконка-сайта.svg" alt="" />
                    </div>
                    <div className='first_half_desc_text'>
                        <h1 className='martian-mono'>
                            Вкус&Традиция
                        </h1>
                        {/* <p className='montserrat'>
                            {props.adress_street}
                        </p> */}
                    </div> 
                </div>
                <img className='second_half' src="src/assets/Фото ресторанов/10724.jpg" alt="" />
            </div>

            <div className='about_half'>
                <img className='second_half' src="src/assets/Фото ресторанов/927.jpg" alt="" />
                <div className='first_half'>
                    <div className='first_half_desc_text second'>
                        <h1 className='montserrat'>
                            Ваше доверие - наша главная ценность, а безупречный сервис - наш золотой стандарт
                        </h1>
                        {/* <p className='montserrat'>
                            sdsd
                        </p> */}
                    </div>
                </div>
            </div>
            <div className='zagolovok-slider'>
                <div className='zagolovok montserrat'>Просмотрите наши новинки</div>
                <Slider OnClick={props.OnClick} GoodPage={props.GoodPage}></Slider>
            </div>
            

            <BigFooter {...getBigFooter[0]}></BigFooter>
        </>
      )
}

export default About