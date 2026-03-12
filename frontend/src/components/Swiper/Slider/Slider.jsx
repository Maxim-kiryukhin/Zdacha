import {useState, useEffect} from 'react';
// Импорт компонентов Swiper для React
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Импорт базовых стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MenuComps from '../MenuComps/MenuComps';

const Slider = (props) => {
    // Берем только первые 5 товаров для слайдера новинок
    const [goods, setGoods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            setIsLoading(true);
            fetch('/api/getnewgoods')
            .then(res => res.json())
            .then(data => {
                setGoods(data.data);
                setIsLoading(false);
                console.log(data.data.pic)
            })
            .catch(err => console.error('er', err))
        }, []);

    return (
        <div>
            <Swiper
                // Подключаем модули навигации (стрелочки) и пагинации (точки)
                modules={[Navigation, Pagination]}
                spaceBetween={20} // Расстояние между слайдами
                slidesPerView={3} // Количество карточек на экране по умолчанию
                navigation
                // pagination={{ clickable: true }}
                // Адаптив: сколько карточек показывать на разных экранах
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {isLoading ? <p>Загрузка...</p> :
                goods.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MenuComps
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            pic={item.pic}
                            amount_avaliable={item.amount_avaliable}
                            OnClick={props.OnClick}
                            GoodPage={props.GoodPage}
                            good={item}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
