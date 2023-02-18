import { Link } from "react-router-dom";
import { ReactComponent as BalanceSvg } from '../../img/menu-staking.svg';
import { ReactComponent as HistorySvg } from '../../img/menu-history.svg';
import { ReactComponent as SecuritySvg } from '../../img/menu-security.svg';
import { ReactComponent as SupportSvg } from '../../img/menu-support.svg';
import "./sidebar.css";

export const Sidebar = ({ balance })=>{
    
    let url = window.location.href;
 
    return(
        <div class="cabinet__menu">
    <div class="container">
        <div class="cabinet__menu-cnt">
            <div class="cabinet__menu-icon">
                <Link to="/staking" style={{ paddingTop: '5px' }}>
                   <img src="img/company.svg" alt="" class="cabinet__menu-icon-img"/>
                </Link>
            </div>
            <div class="cabinet__menu-company">
                Bullstake
            </div>
            <div class="cabinet__menu-balance">
                <div class="cabinet__menu-balance-txt">
                    Всего на балансе
                </div>
                <div class="cabinet__menu-balance-val font-ttl-28">
                    <span class="js_check-result-current-balance">{ balance? parseFloat(balance).toFixed(4) : 0 }</span> Eth
                </div>
            </div>
            <div class="cabinet__menu-lst font-17">
                <Link to="/staking">
                    <div className={ url.indexOf('staking') > (-1)? "cabinet__menu-lst-itm js_cabinet-page-btn _active":"cabinet__menu-lst-itm js_cabinet-page-btn"} data-target="js_cabinet-page-staking">
                        <BalanceSvg></BalanceSvg>
                        <div class="cabinet__menu-lst-itm-txt">
                            Баланс и стейкинг
                        </div>
                    </div>
                </Link>
                <Link to="/history">
                    <div className={ url.indexOf('history') > (-1)? "cabinet__menu-lst-itm js_cabinet-page-btn _active":"cabinet__menu-lst-itm js_cabinet-page-btn"} data-target="js_cabinet-page-history">
                        <HistorySvg></HistorySvg>
                        <div class="cabinet__menu-lst-itm-txt">
                            История
                        </div>
                    </div>
                </Link>
                <Link to="/security">
                    <div className={ url.indexOf('security') > (-1)? "cabinet__menu-lst-itm js_cabinet-page-btn _active":"cabinet__menu-lst-itm js_cabinet-page-btn"} data-target="js_cabinet-page-security">
                        <SecuritySvg></SecuritySvg>
                        <div class="cabinet__menu-lst-itm-txt">
                            Безопасность
                        </div>
                    </div>
                </Link>
                <Link to="/support">
                    <div className={ url.indexOf('support') > (-1)? "cabinet__menu-lst-itm js_cabinet-page-btn _active":"cabinet__menu-lst-itm js_cabinet-page-btn"}data-target="js_cabinet-page-support">
                        <SupportSvg></SupportSvg>
                        <div class="cabinet__menu-lst-itm-txt">
                            Поддержка
                        </div>
                    </div>
                </Link>
            </div>
            <div class="cabinet__menu-site font-17 js_wallet-btn-disconnect">
                <img src="img/menu-site.svg" alt="" class="cabinet__menu-site-img"/>
                <div class="cabinet__menu-site-txt">
                    Сайт платформы
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Sidebar;