import { Link } from "react-router-dom";
import imgUrl2 from "../../img/Group 634.svg";
import { ReactComponent as BalanceSvg } from '../../img/menu-staking.svg';
import { ReactComponent as HistorySvg } from '../../img/menu-history.svg';
import { ReactComponent as SecuritySvg } from '../../img/menu-security.svg';
import { ReactComponent as SupportSvg } from '../../img/menu-support.svg';

const formatAddress = (account) => {
    let start = account.slice(0, 6);
    let end = account.slice(account.length - 5, account.length);
    return start + "...." + end;
}

export const MobileHeader = ({ onCloseModalMenu, account, onExit }) => {

    let url = window.location.href;

    return (
        <div class="modal modal_menu mfp-hide js_modal js_modal-menu-cabinet">
            <button className="close_modal" onClick={onCloseModalMenu}>
                <img src={imgUrl2} />
            </button>
            <div class="modal__logo">
                <img src="img/company.svg" alt="" />
            </div>
            {/* <div class="modal__close js_modal-close"></div> */}
            <div class="modal__cnt">
                <div class="modal__menu">
                    <Link to="/staking" className={ url.indexOf('staking') > (-1)? "modal__menu-itm _gray" : "modal__menu-itm" }>
                        <BalanceSvg></BalanceSvg>
                        <div className="modal__menu-itm-txt">
                            Баланс и стейкинг
                        </div>
                    </Link>
                    <Link to="/history" className={ url.indexOf('history') > (-1)? "modal__menu-itm _gray" : "modal__menu-itm" }>
                        <HistorySvg></HistorySvg>
                        <div className="modal__menu-itm-txt">
                            История
                        </div>
                    </Link>
                    <Link to="/security" className={ url.indexOf('security') > (-1)? "modal__menu-itm _gray" : "modal__menu-itm" }>
                        <SecuritySvg></SecuritySvg>
                        <div className="modal__menu-itm-txt">
                            Безопасность
                        </div>
                    </Link>
                    <Link to="/support" className={ url.indexOf('support') > (-1)? "modal__menu-itm _gray" : "modal__menu-itm" }>
                        <SupportSvg></SupportSvg>
                        <div className="modal__menu-itm-txt">
                            Поддержка
                        </div>
                    </Link>
                </div>
                <a href="/" class="cabinet__header-exit _modal" onClick={onExit}>
                    <div class="cabinet__header-exit-address js_cabinet-wallet-address">{ formatAddress(account) }</div>
                    <img src="img/header-exit.svg" alt="" class="cabinet__header-exit-icon" />
                </a>
                <div class="modal__menu">
                    <div class="modal__menu-itm _gray js_wallet-btn-disconnect">
                        <img src="img/menu-site.svg" alt="" class="modal__menu-itm-img" />
                        <div class="modal__menu-itm-txt">
                            Сайт платформы
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MobileHeader;