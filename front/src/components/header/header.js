import { isAutorized, getEmail, getRole } from "../../auth";

const formatAddress = (account) =>{
    let start = account.slice(0,6);
    let end = account.slice(account.length-5,account.length);
    return start + "...." + end;
}

const formatEmail = (email) =>{
    if(email.length > 15){
        let start = email.slice(0,3);
        let end = email.slice(email.length-10,email.length);
        return start + "...." + end;
    }else{
        return email;
    }
}

const formatBalance = (balance) =>{
    if(balance > 99999){
        return (balance / 1000) + "k";
    }else{
        return balance.toFixed(1);
    }
}

function Header({ account, balance, ovpPrice, translator, onDisconnect }){

    let auth = isAutorized();
    let email = getEmail();
    let role = getRole();

    const onExit = (e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        window.location.href = '/swap';
    }

    const onRuClick= ()=>{
        translator.setLocale('ru');
        window.location.reload();
    }

    const onEnClick= ()=>{
        translator.setLocale('en');
        window.location.reload();
    }

    return(
        <header className="main__header" id="header">
        <div className="container">
            <a className="header__logo" href="/">
                <img src="/img/logo.svg" alt=""/>
            </a>
            <div className="mobile__menu-button t-btn transparent small closed">
                <div className="mobile__button">
                    <img className="default" src="/img/icons/menu.svg" alt=""/>
                    <img className="opened" src="/img/icons/menu__close.svg" alt=""/><span className="default">{translator.t('menu')}</span><span className="opened">{translator.t('close')}</span>
                </div>
            
                <div id="mobile__menu">
                    <div className="header__menu"><a className="header__menu-link" href="/#token-section">{translator.t('token')}</a><a className="header__menu-link" href="/#faq-section">FAQ</a>
                    </div>
                    <div className={ "language__select " + translator.locale }>
                        <div className="language__ru language" onClick={onRuClick}>Ru</div>
                        <div className="language__en language" onClick={onEnClick}>En</div>
                    </div>
                    <div className="t-btn header-transparent modal__open" data-modal="add-wallet">
                        <img className="img-svg swap-icon" src="/img/icons/add-wallet.svg" alt=""/><span>{translator.t('connect_wallet')}</span>
                    </div>
                    {
                        !auth &&
                        <div className="t-btn header-transparent modal__open" data-modal="login">
                            <img className="img-svg swap-icon" src="/img/icons/cabinet.svg" alt=""/><span>{translator.t('enter_to_profile')}</span>
                        </div>
                    }{
                        auth &&
                        <div className="transparent__menu"> <a className="transparent__menu-link" href="/balance">{email}</a><a className="transparent__menu-link" href="/balance">0 OVP</a><a className="transparent__menu-link" href="/balance">{translator.t('profile')}</a>
                        <a className="transparent__menu-link" href="#" onClick={onExit}>
                            <img className="img-svg" src="/img/icons/exit.svg" alt=""/>
                        </a>
                    </div>
                    }
                </div>
            </div>
         
            <div className="header__menu"><a className="header__menu-link" href="/#token-section">{translator.t('token')}      </a>
            <a className="header__menu-link" href="/#faq-section">FAQ</a>
            </div>
          
            <div className="header__course">{translator.t('rate')} 1 OVP = ${ovpPrice.toFixed(4)}</div>
         
            <div className={ "language__select header__language " + translator.locale }>
                <div className="language__ru language" onClick={onRuClick}>Ru</div>
                <div className="language__en language" onClick={onEnClick}>En</div>
            </div>
            {
                !account &&
                <div className="t-btn header-transparent modal__open" data-modal="add-wallet" id="add-wallet">
                    <img className="img-svg swap-icon" src="/img/icons/add-wallet.svg" alt=""/><span>{translator.t('connect_wallet')}</span>
                </div>
            }
            {
                account &&
                <div className="t-btn header-transparent wallet__exit"><span>{formatAddress(account)}</span>
                    <img className="img-svg" src="/img/icons/exit.svg" alt="" onClick={onDisconnect}/>
                </div>
            }
            {
                !auth &&
                <div className="t-btn header-transparent modal__open" data-modal="login">
                    <img className="img-svg swap-icon" src="/img/icons/cabinet.svg" alt=""/><span>{translator.t('enter_to_profile')}</span>
                </div>
            }{
                auth &&
                <div className="transparent__menu"> <a className="transparent__menu-link" href="/balance">{formatEmail(email)}</a>
                    <a className="transparent__menu-link" href="/balance">{formatBalance(balance)} OVP</a>
                    <a className="transparent__menu-link" href="/balance">{translator.t('profile')}</a>
                    <a className="transparent__menu-link" href="#" onClick={onExit}>
                        <img className="img-svg" src="/img/icons/exit.svg" alt=""/>
                    </a>
                </div>
            }
            {
                (auth) && (role == 'admin') &&
                <div className="t-btn header-transparent admin-link">
                     <a className="transparent__menu-link" href="/purchases">
                         <span>АП</span>
                     </a>
                </div>
            }
        </div>
    </header>
    )
}

export default Header;