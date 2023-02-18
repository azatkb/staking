import config from "../../config"

export const Header = ({ onOpenModal, switchModalOpen }) => {

    let etherscan = config.prod ? "https://etherscan.io/address/" : "https://goerli.etherscan.io/address/";

    return (

        <div class="header js_header">
            <div class="container">
                <div class="header__cnt">
                    <div class="header__logo">
                        <div class="header__hamburger js_modal-btn" onClick={switchModalOpen}>
                            <div class="header__hamburger-line"></div>
                            <div class="header__hamburger-line"></div>
                            <div class="header__hamburger-line"></div>
                        </div>
                        <a href="#top" class="header__logo-cnt js_anchor">
                            <img src="/img/company.svg" alt="" class="header__logo-img" />
                            <div class="header__logo-name font-ttl-25">
                                Bullstack
                            </div>
                        </a>
                    </div>
                    <div class="header__lst-1">
                        <a href="#staking" class="header__lst-1-itm js_anchor">
                            Стейкинг
                        </a>
                        <a href="#advantages" class="header__lst-1-itm js_anchor">
                            Преимущества
                        </a>
                        <a href="#start" class="header__lst-1-itm js_anchor">
                            Как начать
                        </a>
                        <a href="#faq" class="header__lst-1-itm js_anchor">
                            Вопросы
                        </a>
                        <a href="#contacts" class="header__lst-1-itm js_anchor">
                            Контакты
                        </a>
                    </div>
                    <div class="header__lst-2">
                        <a href={etherscan + config.contract} target="_blank" class="header__lst-2-itm _etherscan">
                            <img src="/img/header-etherscan.svg" class="header__lst-2-itm-img" />
                            <div class="header__lst-2-itm-txt">
                                Etherscan
                            </div>
                        </a>
                        <a href="" target="_blank" class="header__lst-2-itm _audit">
                            <img src="/img/header-audit.svg" class="header__lst-2-itm-img" />
                            <div class="header__lst-2-itm-txt">
                                Аудит
                            </div>
                        </a>
                    </div>
                    <div class="header__lst-3">
                        <div class="btn btn_red-border header__lst-3-btn js_modal-btn" onClick={onOpenModal}>
                            Начать стейкинг
                        </div>
                        <a href="/cabinet" class="header__lst-3-exit _hidden"></a>
                    </div>
                </div>
            </div>
        </div>

    )
}