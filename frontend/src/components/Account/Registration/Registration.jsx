import { getBigFooter } from '../../../data/BigFooter'
import BigFooter from '../../BigFooter/BigFooter'
import Header_black from '../../Header_black/Header_black'
import './Registration.css'
import { useState } from 'react';

function Registration(props) {
    // 1. Состояния
    const [checkPass, setCheckPass] = useState(
        ''
    );

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        login: '',
        email: '',
        password: '',
    });

    // 2. Измненения
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePass = (e) => {
        setCheckPass(e.target.value);
    };    

    // 3. В апи
    const handleSubmit = async () => {
        if (formData.password !== checkPass) {
            alert("Пароли не совпадают!");
        return;
        }

        try {
            const response = await fetch('/api/registration/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                name: formData.name,
                surname: formData.surname,
                patronymic: formData.patronymic,
                login: formData.login,
                email: formData.email,
                password: formData.password
                })
            });

            if (response.ok) {
                props.OnClick("Account");
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка при регистрации");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };

    return (
        <>
        <div className='account_main'>
            <Header_black OnClick={props.OnClick}></Header_black>
            <div className='account_middle'>
            <div className='big_text'><p className='oswald'>Регистрация</p></div>
            
            <div className='two_input'>
                <div className='account_input'>
                    <p>Имя</p>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder='Введите имя'/>
                </div>
                <div className='account_input'>
                    <p>Фамилия</p>
                    <input 
                        name="surname" 
                        value={formData.surname} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder='Введите фамилию'/>
                </div>
                <div className='account_input'>
                    <p>Отчество</p>
                    <input 
                        name="patronymic" 
                        value={formData.patronymic} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder='Введите отчество'/>
                </div>
                <div className='account_input'>
                    <p>Логин</p>
                    <input 
                        name="login" 
                        value={formData.login} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder='Введите логин'/>
                </div>
                <div className='account_input'>
                    <p>Почта</p>
                    <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder='Введите почту'/>
                </div>
                <div className='account_input'>
                    <p>Пароль</p>
                    <input 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        type="password" 
                        placeholder='Введите пароль'/>
                </div>
                <div className='account_input'>
                    <p>Подтвердите пароль</p>
                    <input 
                        name="checkPass" 
                        value={checkPass} 
                        onChange={handlePass} 
                        type="password" 
                        placeholder='Подтвердите пароль'/>
                </div>
            </div>

            <div className='account_enter' onClick={handleSubmit}>
                <p>ЗАРЕГИСТРИРОВАТЬСЯ</p>
            </div>
            
            <p className='account_reg' onClick={() => props.OnClick("Account")}>Войти</p>
            </div>
            <BigFooter {...getBigFooter[0]} />
        </div>
        </>
    );
}

export default Registration