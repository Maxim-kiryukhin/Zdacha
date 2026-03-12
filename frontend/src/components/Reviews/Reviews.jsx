import './Reviews.css'

function Reviews(props){
    return (
        <>
            <div className='reviews_main'>
                <div className='reviews_text '>
                    <p className='oswald'>Посмотрите на отзывы оставленные нашими посетителями</p>
                </div>
                <div className='reviews_three_blocks'>
                    <div className='reviews_blocks'>
                        <p className='montserrat'>{props.review1}</p>
                        {/* <button className='review_button'>
                            <p className='montserrat'>Посмотреть больше отзывов</p>
                        </button> */}
                    </div>
                    <div className='reviews_blocks'>
                        <p className='montserrat'>{props.review2}</p>
                        {/* <button className='review_button'>
                            <p className='montserrat'>Посмотреть больше отзывов</p>
                        </button> */}
                    </div>
                    {/* <div className='reviews_blocks'>
                        <p className='montserrat'>{props.review3}</p>
                        <button className='review_button'>
                            <p className='montserrat'>Посмотреть больше отзывов</p>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Reviews