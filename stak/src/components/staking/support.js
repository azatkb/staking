import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useState } from "react";
import { toast } from 'react-toastify';

export const Support = ({ account, balance, rate }) => {

    document.body.style.background = "#fff";

    const [text, setText] = useState("");
    const onTextChange = (e) => {
        setText(e.target.value);
    }

    const onSendClick = () => {
        if (text.length > 0) {
            toast.success("Отправлено!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setText("");
        } else {
            toast.error("Введите текст!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="cabinet_page">
            <Header account={account} rate={rate}></Header>
            <Sidebar balance={balance}></Sidebar>
            <div class="cabinet__main js_cabinet-page js_cabinet-page-support ">
                <div class="container">
                    <div class="cabinet__main-cnt">
                        <div class="cabinet__support">
                            <div class="cabinet__support-top">
                                <div class="cabinet__support-top-ttl font-35">
                                    Поддержка
                                </div>
                                <div class="cabinet__support-top-contacts">
                                    <a href="" class="cabinet__support-top-contacts-itm">
                                        <div class="cabinet__support-top-contacts-itm-img _telegram"></div>
                                        <div class="cabinet__support-top-contacts-itm-txt">
                                            Telegram
                                        </div>
                                    </a>
                                    <a href="" class="cabinet__support-top-contacts-itm">
                                        <div class="cabinet__support-top-contacts-itm-img _discord"></div>
                                        <div class="cabinet__support-top-contacts-itm-txt">
                                            Discord
                                        </div>
                                    </a>
                                    <a href="" class="cabinet__support-top-contacts-itm">
                                        <div class="cabinet__support-top-contacts-itm-img _email"></div>
                                        <div class="cabinet__support-top-contacts-itm-txt">
                                            E-mail
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="cabinet__support-main _item">
                                <div class="cabinet__support-main-ttl">
                                    Вопрос или обращение
                                </div>
                                <div>
                                    <textarea value={text} onChange={onTextChange} cols="30" rows="5" maxLength="150" name="question" class="cabinet__support-main-input js_qna-question"></textarea>
                                    <button onClick={onSendClick} class="btn btn_red cabinet__support-main-btn js_qna-question-btn">
                                        Задать вопрос
                                    </button>
                                </div>
                            </div>
                            <div class="cabinet__support-lst js_qna"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Support;