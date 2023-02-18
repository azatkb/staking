import Modal from 'react-modal';
import { useState } from "react";
import MobileHeader from './mobile';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        overflow: "visible",
        background: "transparent"
    },
};

const formatAddress = (account) => {
    let start = account.slice(0, 6);
    let end = account.slice(account.length - 5, account.length);
    return start + "...." + end;
}

export const Header = ({ rate, account }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const onCloseModalMenu = ()=>{
        setIsOpen(false);
    }

    const onOpenModal = ()=>{
        setIsOpen(true);
    }

    const onExit = () => {
        localStorage.removeItem("wallet");
        window.location.href = '/'
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={onCloseModalMenu}
                >
                    <MobileHeader account={account} onExit={onExit} onCloseModalMenu={onCloseModalMenu}></MobileHeader>
            </Modal>
            <div class="cabinet__header font-17">
                <div class="container">
                    <div class="cabinet__header-cnt">
                        <div class="header__logo _cabinet">
                            <div class="header__hamburger _cabinet js_modal-btn" onClick={onOpenModal}>
                                <div class="header__hamburger-line"></div>
                                <div class="header__hamburger-line"></div>
                                <div class="header__hamburger-line"></div>
                            </div>
                            <a href="#top" class="header__logo-cnt js_anchor">
                                <img src="img/company.svg" alt="" class="header__logo-img" />
                                <div class="header__logo-name font-ttl-25">
                                    Bullstake
                                </div>
                            </a>
                        </div>
                        <div class="cabinet__header-rate">
                            <img src="img/rate.svg" alt="" class="cabinet__header-rate-img" />
                            <div class="cabinet__header-rate-txt">
                                Курс 1 Eth - <span class="js_eth-usd">{rate}</span>$
                            </div>
                        </div>
                        <div class="cabinet__header-exit js_wallet-btn-disconnect" onClick={onExit}>
                            <div class="cabinet__header-exit-address js_cabinet-wallet-address">{formatAddress(account)}</div>
                            <img src="img/header-exit.svg" alt="" class="cabinet__header-exit-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;