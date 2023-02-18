import imgUrl2 from "../../img/Group 634.svg";
import config from "../../config";
import "./modalMenu.css";

export const ModalMenu = ({ startStacking, switchModalOpen }) => {

    let etherscan = config.prod ? "https://etherscan.io/address/" : "https://goerli.etherscan.io/address/";

    return (
        <div class="modal modal_menu mfp-hide js_modal js_modal-menu">
            <button className="close_modal" onClick={switchModalOpen}>
                <img src={imgUrl2} />
            </button>
            <div class="modal__logo">
                <img src="img/company.svg" alt="" />
            </div>
            <div class="modal__cnt">
                <div class="modal__menu">
                    <a href="#staking" class="modal__menu-itm">
                        <div class="modal__menu-itm-txt">
                            Стейкинг
                        </div>
                    </a>
                    <a href="#advantages" class="modal__menu-itm">
                        <div class="modal__menu-itm-txt">
                            Преимущества
                        </div>
                    </a>
                    <a href="#start" class="modal__menu-itm">
                        <div class="modal__menu-itm-txt">
                            Как начать
                        </div>
                    </a>
                    <a href="#faq" class="modal__menu-itm">
                        <div class="modal__menu-itm-txt">
                            Вопросы
                        </div>
                    </a>
                    <a href="#contacts" class="modal__menu-itm">
                        <div class="modal__menu-itm-txt">
                            Контакты
                        </div>
                    </a>
                    <a href={etherscan + config.contract} class="modal__menu-itm">
                        <img src="img/menu-etherscan.svg" alt="" class="modal__menu-itm-img" />
                        <div class="modal__menu-itm-txt">
                            Etherscan
                        </div>
                    </a>
                    <a href="" class="modal__menu-itm">
                        <img src="img/menu-audit.svg" alt="" class="modal__menu-itm-img" />
                        <div class="modal__menu-itm-txt">
                            Аудит
                        </div>
                    </a>
                </div>
                <div class="modal__buttons">
                    <div class="btn btn_red-border modal__buttons-itm js_modal-btn" onClick={startStacking}>
                        Начать стейкинг
                    </div>
                    <a href="/staking" class="modal__buttons-exit _hidden"></a>
                </div>
            </div>
        </div>

    )
}

export default ModalMenu;