import { useState } from "react";
import { getBigFooter } from "../../data/BigFooter";
import BigFooter from "../BigFooter/BigFooter";
import "./Account.css";

import Header_black from "../Header_black/Header_black";

import maxicon from "../../assets/icons/soc/max.svg";
import odnoklicon from "../../assets/icons/soc/odnokl.svg";
import vkicon from "../../assets/icons/soc/vk.png";

function Account(props) {
    // 1. Состояния
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // 2. Измненения
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. В апи
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/authentication/", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.is_admin) {
                    window.location.href = "/admin/";
                } else if (data.is_banned) {
                    console.log("Ошибка. Пользователь заблокирован!");
                } else {
                    localStorage.setItem("token", data.token);
                    props.OnClick("Main");
                }
            } else {
                const error = await response.json();
                alert(error.message || "Ошибка при авторизации");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };

    return (
        <>
            <div className="account_main">
                <Header_black OnClick={props.OnClick}></Header_black>
                <div className="account_middle">
                    <div className="big_text">
                        <p className="oswald">Вход</p>
                    </div>
                    {/* <div className="two_log">
                        <div className="login_soc">
                            <img src={maxicon} alt="" className="account_pic" />
                            <p>Войти через Max</p>
                        </div>
                        <div className="login_soc">
                            <img src={vkicon} alt="" className="account_pic" />
                            <p>Войти через VK</p>
                        </div>
                    </div> */}
                    <div>
                        <p>ИЛИ</p>
                    </div>
                    <div className="two_input">
                        <div className="account_input">
                            <p>Почта</p>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Введите почту"
                            />
                        </div>
                        <div className="account_input">
                            <p>Пароль</p>
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Введите пароль"
                            />
                        </div>
                    </div>
                    <div className="account_enter" onClick={handleSubmit}>
                        <p>ВОЙТИ</p>
                    </div>
                    <p
                        className="account_reg"
                        onClick={() => props.OnClick("Registration")}
                    >
                        Зарегестрироваться
                    </p>
                </div>
                <BigFooter {...getBigFooter[0]}></BigFooter>
            </div>
        </>
    );
}

export default Account;
