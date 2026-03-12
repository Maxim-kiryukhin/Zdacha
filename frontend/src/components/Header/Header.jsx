import './Header.css'

function Header(props){
  const Authenticated = !!localStorage.getItem('token');

    return (
        <>
          <div className='header'>
            <div className='header_left'>
              <button className='header_button men' onClick={() => props.OnClick("Menu")}>
                {/* <p className='montserrat'>{props.button_text}</p> */}
              </button>
              <div className='header_number'>
                <p>+8 (123) 456 78 90</p>
              </div>
            </div>
            <div className='header_middle'>
              <div className='header_logo'>
                <p className='martian-mono'>Вкус&Традиция</p>
              </div>
              <button className='header_button mid' onClick={() => props.OnClick("Main")}>
                <p className='montserrat'>Выбрать другой ресторан</p>
              </button>
            </div>
            <div className='header_right'>
              {Authenticated ? 
                <button className='header_button acc' onClick={() => props.OnClick("Orders")}></button>
              :
                <button className='header_button acc' onClick={() => props.OnClick("Account")}></button>
              }
              <button className='header_button bas' onClick={() => props.OnClick("Cart")}></button>
            </div>
          </div>
        </>
      )
}

export default Header