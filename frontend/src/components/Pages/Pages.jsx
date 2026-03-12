import { useState } from 'react'
import { useEffect } from 'react'
import './Pages.css'
import '../Halfs/Halfs'
import Halfs from '../Halfs/Halfs'
import { getHalfs_Brat } from '../../data/Halfs'
import { getHalfs_Alex } from '../../data/Halfs'
import { getHalfs_Tagan } from '../../data/Halfs'
import { getHalfs_Zhuk } from '../../data/Halfs'
import TwoBut from '../TwoBut/TwoBut'
import { GetTwoBut } from '../../data/TwoBut'
import Reviews from '../Reviews/Reviews'
import { getReviews } from '../../data/Reviews'
import BigFooter from '../BigFooter/BigFooter'
import { getBigFooter } from '../../data/BigFooter'
import Header from '../Header/Header'



function Pages(props){
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
            <div className='main2'>
                <Header OnClick={props.OnClick}></Header>
                <div className='text Montserrat'>
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
            {props.currentadress === "ул. Братиславская, д.12" && <Halfs order="0" OnClick={props.OnClick} {...getHalfs_Brat[0]}></Halfs>}
            {props.currentadress === "ул. Братиславская, д.12" && <Halfs order="1" OnClick={props.OnClick} {...getHalfs_Brat[1]}></Halfs>}

            {props.currentadress === "пр-т Мира, д.118" && <Halfs order="0" OnClick={props.OnClick} {...getHalfs_Alex[0]}></Halfs>}
            {props.currentadress === "пр-т Мира, д.118" && <Halfs order="1" OnClick={props.OnClick} {...getHalfs_Alex[1]}></Halfs>}

            {props.currentadress === "Ул. Таганская, д.1/2, стр.2" && <Halfs order="0" OnClick={props.OnClick} {...getHalfs_Tagan[0]}></Halfs>}
            {props.currentadress === "Ул. Таганская, д.1/2, стр.2" && <Halfs order="1" OnClick={props.OnClick} {...getHalfs_Tagan[1]}></Halfs>}

            {props.currentadress === "Ул. Большая Пионерская, 7 с1" && <Halfs order="0" OnClick={props.OnClick} {...getHalfs_Zhuk[0]}></Halfs>}
            {props.currentadress === "Ул. Большая Пионерская, 7 с1" && <Halfs order="1" OnClick={props.OnClick} {...getHalfs_Zhuk[1]}></Halfs>}

            {/* <Halfs order="0" OnClick={props.OnClick} {...getHalfs_Brat[0]}></Halfs>
            <Halfs order="1" OnClick={props.OnClick} {...getHalfs_Brat[1]}></Halfs> */}

            {/* <TwoBut {...GetTwoBut[0]}></TwoBut> */}
            <Reviews {...getReviews[review]}></Reviews>
            <BigFooter {...getBigFooter[0]}></BigFooter>
        </>
      )
}

export default Pages