import img8 from "../../img/icons/right-arrow.svg";
import img9 from "../../img/landing/community.jpg";
import { ContractAddress } from "../../erc20";

function classNameName({ isWhite, translator }){
    
    return(
        <section className={ isWhite ? "community-section white-section" : "community-section"} id="community-section">
        <div className="container">
            <div className="community__box" style={{ backgroundImage: "url(" +img9+ ")"}}>
                <h2 className="community__title t-title">Community</h2>
                <h3 className="community__subtitle t-subtitle">{translator.t('comunity_desc')}</h3>
                <div className="community__social">
                <a className="social__link" href="https://twitter.com/OvpCoin" target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/twitter.svg" alt=""/>
                              </div><span>Twitter</span>
                        </a>
                        <a className="social__link" href="https://t.me/ovpcoin" target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/Telegram.svg" alt=""/>
                              </div><span>Telegram</span>
                        </a>
                        <a className="social__link" href="https://www.instagram.com/ovpcoin/" target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/Instagram.svg" alt=""/>
                              </div><span>Instagram</span>
                        </a>
                        <a className="social__link" href="https://discord.gg/PXjRc7F2Hq" target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/Discord.svg" alt=""/>
                              </div><span>Discord</span>
                        </a>
                        <a className="social__link" href="#" target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/Email.svg" alt=""/>
                              </div><span>E-mail</span>
                        </a>
                        <a className="social__link" href={`https://etherscan.io/token/${ContractAddress}`} target="_blank">
                              <div className="social__link-img">
                                 <img className="img-svg" src="img/icons/social/Etherscan.svg" alt="/"/>
                              </div><span>Etherscan</span>
                        </a>
                </div>
                   <a className="t-btn blue" href="/swap">
                      <span>{translator.t('buy_tokens')}</span>
                      <img className="img-svg swap-icon" src={img8} alt=""/>
                      <div className="button__bg-hover"></div>
                    </a>
            </div>
        </div>
    </section>
    )
}

export default classNameName;