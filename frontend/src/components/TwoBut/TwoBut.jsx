import './TwoBut.css'

function TwoBut(props){
    return (
        <>
            <div className='main_twobut'>
                    <button className='first_twobut_desc_button' onClick={() => props.OnClick(props.Link1)}>
                        <p className='oswald'>{props.button_text1}</p>
                    </button>
                    <button className='first_twobut_desc_button' onClick={() => props.OnClick(props.Link2)}>
                        <p className='oswald'>{props.button_text2}</p>
                    </button>
            </div>
        </>
    )
}
export default TwoBut