import { ContractAddress } from "../../erc20";
import { isAutorized } from "../../auth";

function Home({ translator }) {

   let auth = isAutorized();

   const onExit = (e)=>{
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      window.location.reload();
   }

   const onRuClick= ()=>{
      translator.setLocale('ru');
      window.location.reload();
  }

  const onEnClick= ()=>{
      translator.setLocale('en');
      window.location.reload();
  }

   return (
      <div>

         <header id="header">
            <div className="container">
                  <a className="header__logo" href="/">
                     <img src="img/logo.svg" alt=""/>
                  </a>
            
                  <div className="mobile__menu-button t-btn transparent small closed">
                     <div className="mobile__button">
                        <img className="default" src="img/icons/menu.svg" alt=""/>
                        <img className="opened" src="img/icons/menu__close.svg" alt=""/><span className="default">{translator.t('menu')}</span><span className="opened">{translator.t('close')}</span>
                     </div>
                  
                     <div id="mobile__menu">
                        <div className="header__menu">
                           <a className="header__menu-link" href="#about-section">{translator.t('company')}</a>
                           <a className="header__menu-link" href="#token-section">{translator.t('token')}</a>
                           <a className="header__menu-link" href="#timeline-section">{translator.t('timeline')}</a>
                           <a className="header__menu-link" href="/ovp.pdf" target="_blank">Whitepaper</a>
                           <a className="header__menu-link" href="#how-section">{translator.t('how_to_buy')}</a>
                           <a className="header__menu-link" href="#faq-section">FAQ</a>
                           <a className="header__menu-link" href={`https://etherscan.io/token/${ContractAddress}`} target="_blank">Ethrerscan</a>
                           <a className="header__menu-link" href="#community-section">Community</a>
                        </div>
                        <div className={ "language__select " + translator.locale }>
                           <div className="language__ru language" onClick={onRuClick}>Ru</div>
                           <div className="language__en language" onClick={onEnClick}>En</div>
                        </div>
                        <a className="t-btn header-transparent swap-btn" href="/swap">
                              <img className="img-svg swap-icon" src="img/icons/swap.svg" alt=""/><span>{translator.t('swap_tokens')}</span>
                        </a>
                        <div className="t-btn header-transparent modal__open" data-modal="login">
                           <img className="img-svg swap-icon" src="img/icons/cabinet.svg" alt=""/><span>{translator.t('enter_to_profile')}</span>
                        </div>
                     </div>
                  </div>
      
                  <div className="header__menu pc__menu">
                        {/* <a className="header__menu-link" href="#about-section">{translator.t('company')}</a> */}
                        <a className="header__menu-link" href="#token-section">{translator.t('token')}</a>
                        {/* <a className="header__menu-link" href="#timeline-section">{translator.t('timeline')}</a> */}
                        <a className="header__menu-link" href="/ovp.pdf" target="_blank">Whitepaper</a>
                        <a className="header__menu-link" href="#how-section">{translator.t('how_to_buy')}</a>
                        <a className="header__menu-link" href="#faq-section">FAQ</a>
                        <a className="header__menu-link" href={`https://etherscan.io/token/${ContractAddress}`} target="_blank">Ethrerscan</a>
                        <a className="header__menu-link" href="#community-section">Community</a>
                  </div>
            
                  <div className={ " header__language language__select " + translator.locale }>
                        <div className="language__ru language" onClick={onRuClick}>Ru</div>
                        <div className="language__en language" onClick={onEnClick}>En</div>
                  </div>
                  <a className="t-btn transparent-blue swap-btn" href="/swap">
                        <img className="img-svg swap-icon" src="img/icons/swap.svg" alt=""/><span>{translator.t('swap_tokens')}</span>
                        <div className="button__bg-hover"></div>
                     </a>
                  {
                !auth &&
                <div className="t-btn header-transparent modal__open" data-modal="login">
                    <img className="img-svg swap-icon" src="img/icons/cabinet.svg" alt=""/><span>{translator.t('enter_to_profile')}</span>
                </div>
            }{
                auth &&
                <div className="transparent__menu"><a className="transparent__menu-link" href="/balance">{translator.t('profile')}</a>
                <a className="transparent__menu-link" href="#" onClick={onExit}>
                    <img className="img-svg" src="img/icons/exit.svg" alt=""/>
                </a>
            </div>
            }
            </div>
         </header>

         <section className="intro-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
            <div className="container">
                  <div className="intro__left">
                     <h1 className="intro__title t-title">{translator.t('intro_title')}</h1>
                     <h2 className="intro__subtitle t-subtitle">{translator.t('intro_desc')}</h2>
                     <div className="intro__buttons"> <a className="t-btn blue" href="#how-section"><span>{translator.t('how_to_buy')} OVP</span><img className="img-svg swap-icon" src="img/icons/right-arrow.svg" alt=""/><div className="button__bg-hover"></div></a>
                        <div className="button__with__description"><a className="t-btn transparent" href="/ovp.pdf" target="_blank"><span>Whitepaper</span><div className="button__bg-hover"> </div></a>
                              <div className="button__description">PDF</div>
                        </div>
                     </div>
                  </div>
                  <div className="intro__right">
                     <img className="intro__right-img" src="img/landing/coinvideo.png" alt=""/>
                     <div className="intro__video-box">
                        <div className="video-box__bg" style={{ backgroundImage: " url('img/landing/videobg2.jpg')"}}></div>
                        <video src="img/landing/intro__video.mp4" poster="img/landing/videobg2.jpg" autoPlay={true} no-controls="true" loop playsInline muted>Your browser doesn't support HTML5 video tag</video>
                     </div>
                  </div>
            </div>
         </section>

         <section className="industry-section">
            <div className="container">
                  <h2 className="t-title">{translator.t('industry')} </h2>
                  <div className="industry__box">
                     <div className="industry__left">
                        <img className="img__ru" src={`img/landing/chart-${translator.locale}.svg`} alt=""/>
                     </div>
                     <div className="industry__right">
                        <h3 className="small-title">{translator.t('market_volume')}</h3>
                        <p>{translator.t('market_text')}</p>
                     </div>
                  </div>
            </div>
         </section>

         <section className="about-section" id="about-section">
            <img className="about__img" src="img/landing/about/about.jpg" alt=""/>
            <div className="container">
                  <div className="about__content">
                     <img className="gaming-logo" src="img/landing/gaming-logo.svg" alt=""/>
                     <h2 className="about__title t-title">OVP-Only Virtual Projects</h2>
                     <h3 className="about__subtitle t-subtitle">{translator.t('company_about')}</h3>
                     <div className="about__list">
                        <div className="about__list-item">
                              <img src="img/landing/about/icon1.svg" alt=""/>
                              <div className="title">{translator.t('design')}</div>
                        </div>
                        <div className="about__list-item">
                              <img src="img/landing/about/icon2.svg" alt=""/>
                              <div className="title">{translator.t('projecting')}</div>
                        </div>
                        <div className="about__list-item">
                              <img src="img/landing/about/icon3.svg" alt=""/>
                              <div className="title">{translator.t('development')}</div>
                        </div>
                        <div className="about__list-item">
                              <img src="img/landing/about/icon4.svg" alt=""/>
                              <div className="title">{translator.t('diversification')}</div>
                        </div>
                        <div className="about__list-item">
                              <img src="img/landing/about/icon5.svg" alt=""/>
                              <div className="title">{translator.t('marketing')}</div>
                        </div>
                        <div className="about__list-item">
                              <img src="img/landing/about/icon6.svg" alt=""/>
                              <div className="title">{translator.t('projects_managment')}</div>
                        </div>
                     </div>
                     <div className="about__advantages">
                        <div className="about__advantages-item">
                              <div className="item__left">
                                 <div className="number">3.2</div>
                                 <div className="value">{translator.t('mln')}</div>
                              </div>
                              <div className="item__right">
                                 <div className="title">{translator.t('users_in_world')} <br/> {translator.t('users_in_world2')}</div>
                              </div>
                        </div>
                        <div className="about__advantages-item">
                              <div className="item__left">
                                 <div className="number">190</div>
                                 <div className="value">{translator.t('men')}</div>
                              </div>
                              <div className="item__right">
                                 <div className="title">{translator.t('team_members')}<br></br> {translator.t('team_members2')}</div>
                              </div>
                        </div>
                        <div className="about__advantages-item">
                              <div className="item__left">
                                 <div className="number">7</div>
                                 <div className="value">{translator.t('years')}</div>
                              </div>
                              <div className="item__right">
                                 <div className="title">{translator.t('years_expirience')}<br></br>{translator.t('years_expirience2')}</div>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
         </section>

         <section className="projects-section">
            <div className="container">
                  <h2 className="t-title">{translator.t('cuurent_projects')}</h2>
                  <div className="projects__box">
                     <div className="projects__item wow">
                        <div className="item__header">
                              <div className="title">SeptiumWOW</div>
                              <div className="status">{translator.t('projects_lounched')}</div>
                        </div>
                        <img className="item__img" src="img/landing/wow.png" alt=""/>
                        <div className="description">{translator.t('project1')}</div>
                        <a className="t-btn transparent small" href="https://septiumwow.ru/"> <span>{translator.t('project1_link')}</span>
                              <div className="button__bg-hover"></div>
                        </a>
                     </div>
                     <div className="projects__item metaworld">
                        <div className="item__header">
                              <div className="title">Metaworld</div>
                              <div className="status">{translator.t('prepering_to_lounch')}</div>
                        </div>
                        <img className="item__img" src="img/landing/ea.png" alt=""/>
                        <div className="description">{translator.t('projects2')}</div>
                        <div className="item__progress">
                              <div className="progress__title">{translator.t('development_proccess')}</div>
                              <div className="progress__bar">
                                 <div className="progress__line" style={{ width:"67%"}}>
                                    <div className="progress__dot"><span>67%</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="progress__years">
                                 <div className="start">2020</div>
                                 <div className="final">2022</div>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
         </section>

         <section className="technologies-section">
            <div className="container">
                  <h2 className="t-title">{translator.t('modern_tech')}</h2>
                  <h3 className="t-subtitle">{translator.t('modern_tech_desc')}</h3>
                  <div className="technologies__box">
                     <a className="item item1" href="#">
                        <img className="img-svg" src="img/landing/technologies/img1.svg" alt=""/>
                     </a>
                     <a className="item item2" href="#">
                        <img className="img-svg" src="img/landing/technologies/img2.svg" alt=""/>
                     </a>
                     <a className="item item3" href="#">
                        <img className="img-svg" src="img/landing/technologies/img3.svg" alt=""/>
                     </a>
                     <a className="item item4" href="#">
                        <img className="img-svg" src="img/landing/technologies/img4.svg" alt=""/>
                     </a>
                     <a className="item item5" href="#">
                        <img className="img-svg" src="img/landing/technologies/img5.svg" alt=""/>
                     </a>
                  </div>
            </div>
         </section>

         <section className="token-section white-section" id="token-section">
            <div className="container">
                  <img className="token__bg" src="img/landing/token__bg.jpeg" alt=""/>
                  <div className="token__left">
                     <h2 className="token__title t-title">{translator.t('gic_token')}</h2>
                     <h3 className="token__subtitle t-subtitle">{translator.t('gic_token_desc')}</h3>
                     <p>{translator.t('gic_token_des2')}</p>
                  </div>
            </div>
         </section>

         <section className="info-section white-section">
            <div className="container">
                  <div className="info__box" style={{ backgroundImage: "url('img/landing/info__box-bg.png')"}}>
                     <h2 className="info__title t-title">{translator.t('token_desc3')}</h2>
                     <div className="info__list">
                        <div className="info__item">
                              <div className="title">{translator.t('token_name')}</div>
                              <div className="value">OVP Token</div>
                        </div>
                        <div className="info__item">
                              <div className="title">{translator.t('circulation')}</div>
                              <div className="value">25 000 000 000</div>
                        </div>
                        <div className="info__item">
                              <div className="title">{translator.t('token_symbol')}</div>
                              <div className="value">OVP</div>
                        </div>
                        <div className="info__item">
                              <div className="title">{translator.t('smart_contract')}</div>
                              <div className="value blue-text">{ContractAddress}</div>
                        </div>
                        <div className="info__item">
                              <div className="title">{translator.t('total_supply')}</div>
                              <div className="value">35 000 000 000</div>
                        </div>
                        <div className="info__item">
                              <div className="title">{translator.t('format')}</div>
                              <div className="value">ERC20</div>
                        </div>
                     </div>
                     <a className="t-btn transparent small" href={`https://etherscan.io/token/${ContractAddress}`}> <span>Etherscan</span>
                        <div className="button__bg-hover"></div>
                     </a>
                  </div>
            </div>
         </section>

         <section className="buy-section white-section">
            <div className="container">
                  <h2 className="t-title">{translator.t('investment_title')}</h2>
                  <h3 className="buy__subtitle t-subtitle">{translator.t('investment_desc')}</h3><a className="t-btn green" href="/swap"><span>{translator.t('investment_buy')}</span><img className="img-svg swap-icon" src="img/icons/right-arrow.svg" alt=""/><div className="button__bg-hover"></div></a>
            </div>
         </section>

         <section className="timeline-section white-section" id="timeline-section">
            <div className="container">
                  <div className="timeline__box" style={{ backgroundImage:"url('img/landing/info__box-bg.png')"}}>
                     <h2 className="timeline__title t-title">{translator.t('timeline_title')}</h2>
                     <h3 className="timeline__subtitle t-subtitle">{translator.t('timeline_desc')}</h3>
                     <div className="button__with__description"><a className="t-btn transparent small" href="/" target="_blank"><span>Whitepaper</span><div className="button__bg-hover"></div></a>
                        <div className="button__description">PDF</div>
                     </div>
                     <div className="timeline__list-box">
                        <div className="timeline__list">
                              <div className="timeline__top">
                                 <div className="episode episode1">
                                    <div className="time"><span>03/2015</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point1')}</div>
                                 </div>
                                 <div className="episode episode2">
                                    <div className="time"><span>10/2017</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point2')}</div>
                                 </div>
                                 <div className="episode episode3">
                                    <div className="time"><span>11/2020</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point3')}</div>
                                 </div>
                                 <div className="episode episode4">
                                    <div className="time"><span>07/2022</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point4')}</div>
                                 </div>
                                 <div className="episode waiting episode5">
                                    <div className="time"><span>08/2022</span>
                                          <img src="img/icons/time.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point5')}</div>
                                 </div>
                              </div>
                              <div className="progress__bar timeline__bar">
                                 <div className="progress__line" style={{ width:"65.5%"}}>
                                    <div className="progress__dot"></div>
                                 </div>
                              </div>
                              <div className="timeline__bottom">
                                 <div className="episode episode1">
                                    <div className="time"><span>05/2015</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point6')}</div>
                                 </div>
                                 <div className="episode episode2">
                                    <div className="time"><span>08/2019</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point7')}</div>
                                 </div>
                                 <div className="episode episode3">
                                    <div className="time"><span>01/2021</span>
                                          <img src="img/icons/check.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point8')}</div>
                                 </div>
                                 <div className="episode waiting episode4">
                                    <div className="time"><span>12/2022</span>
                                          <img src="img/icons/time.svg" alt=""/>
                                    </div>
                                    <div className="title">{translator.t('timeline_point9')}</div>
                                 </div>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
         </section>

         <section className="how-section white-section" id="how-section">
            <div className="container">
                  <div className="how__left">
                     <h1 className="how__title t-title">{translator.t('how_to_buy_title')}</h1>
                     <p>{translator.t('how_to_buy_desc')}</p>
                     <div className="how__left-description">
                        <div className="text">{translator.t('how_to_buy_node')} <a href="#supported-wallets">{translator.t('how_to_buy_link')} </a>
                        </div>
                        <img className="icon" src="img/icons/document.svg" alt=""/>
                     </div>
                  </div>
                  <div className="how__right">
                     <div className="how__video" style={{ backgroundImage: "url('img/landing/how.jpeg')"}}>
                        <div className="how__video-content">
                              <div className="how__video-title">{translator.t('how_to_buy_ques')}</div>
                              <div className="how__video-play modal__open" data-modal="video" data-src="EadeOYFAzJ4">
                                 <img className="img-svg" src="img/icons/play.svg" alt=""/>
                              </div>
                              <div className="how__video-subtitle">{translator.t('how_to_buy_ques2')}?</div>
                        </div>
                     </div>
                     <div className="how__left-description">
                        <div className="text">Обратите внимание, что не все кошельки поддерживают хранение токенов OVP. Пожалуйста, ознакомьтесь со <a href="#">списком поддерживаемых кошельков.</a>
                        </div>
                        <img className="icon" src="img/icons/document.svg" alt=""/>
                     </div>
                  </div>
            </div>
         </section>

         <section className="instruction-section white-section">
            <div className="container">
                  <div className="instruction__buttons">
                     <div className="instruction__button active">{translator.t('for_crypto')}</div>
                     <div className="instruction__button">{translator.t('for_fiat')}</div>
                  </div>
                  <div className="instruction__tabs">
                     <div className="instruction__tab active">
                        <div className="instruction__item item1">
                              <div className="instruction__number"><span>1</span>
                                 <img className="icon" src="img/landing/instruction/icon1.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction1')}</div>
                                 <p>{translator.t('instruction_desc1')}</p>
                              </div>
                        </div>
                        <div className="instruction__item item2">
                              <div className="instruction__number"><span>2</span>
                                 <img className="icon" src="img/landing/instruction/icon2.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction2')}</div>
                                 <p>{translator.t('instruction_desc2')}</p>
                              </div>
                        </div>
                        <div className="instruction__item item3">
                              <div className="instruction__number"><span>3</span>
                                 <img className="icon" src="img/landing/instruction/icon3.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction3')}</div>
                                 <p>{translator.t('instruction_desc3')}</p>
                              </div>
                        </div>
                        <div className="instruction__item item4">
                              <div className="instruction__number"><span>4</span>
                                 <img className="icon" src="img/landing/instruction/icon4.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction4')}</div>
                                 <p>{translator.t('instruction_desc4')}</p>
                              </div>
                        </div>
                     </div>
                     <div className="instruction__tab">
                        <div className="instruction__item item1">
                              <div className="instruction__number"><span>1</span>
                                 <img className="icon" src="img/landing/instruction/icon1.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction5')}</div>
                                 <p>{translator.t('instruction_desc5')}</p><a className="t-btn green" href="/swap"><span>{translator.t('do_register')}</span><img className="img-svg swap-icon" src="img/icons/right-arrow.svg" alt=""/><div className="button__bg-hover"></div></a>
                              </div>
                        </div>
                        <div className="instruction__item item2 token2">
                              <div className="instruction__number"><span>2</span>
                                 <img className="icon" src="img/landing/instruction/icon5.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction6')}</div>
                                 <p>{translator.t('instruction_desc6')}</p>
                              </div>
                        </div>
                        <div className="instruction__item item3">
                              <div className="instruction__number"><span>3</span>
                                 <img className="icon" src="img/landing/instruction/icon2.svg" alt=""/>
                              </div>
                              <div className="instruction__line"></div>
                              <div className="instruction__content">
                                 <div className="title">{translator.t('instruction7')}</div>
                                 <p>{translator.t('instruction_desc7')}</p>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
         </section>

         <section className="wallets-section white-section" id="supported-wallets">
            <div className="container">
                  <h2 className="wallets__title t-title">{translator.t('supported_wallet')}</h2>
                  <h3 className="wallets__subtitle t-subtitle">{translator.t('supported_wallet_desc')}</h3>
                  <div className="wallets__box">

                     <a className="wallets__item item1" href="https://metamask.io/" target="_blank">
                        <div className="item__img-box">
                              <img className="item__img img-svg" src="img/landing/wallets/metamask.svg" alt=""/>
                        </div>
                        <div className="item__link">metamask.io</div>
                     </a>
                     <a className="wallets__item item1" href="https://walletconnect.com/" target="_blank">
                        <div className="item__img-box">
                              <img className="item__img img-svg" src="img/landing/wallets/walletconnect.svg" alt=""/>
                        </div>
                        <div className="item__link">walletconnect.com</div>
                     </a>
                     <a className="wallets__item item1" href="https://www.coinbase.com/ru/" target="_blank">
                        <div className="item__img-box">
                              <img className="item__img img-svg" src="img/landing/wallets/coinbase.svg" alt=""/>
                        </div>
                        <div className="item__link">coinbase.com</div>
                     </a>
     
                  </div>
            </div>
         </section>

         <section className="faq-section white-section">
            <div className="faq__anchor" id="faq-section"></div>
            <div className="container">
                  <h2 className="faq__title t-title">{translator.t('faq_title')}</h2>
                  <h3 className="faq__subtitle t-subtitle">{translator.t('faq_desc')}</h3>
                  <div className="faq__box">
                     <div className="faq__left faq__column">
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques1')}</div>
                              </div>
                              <div className="item__content">
                                 <p>{translator.t('faq_ans')}</p>
                              </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques2')}</div>
                              </div>
                              <div className="item__content">
                                   <p>{translator.t('faq_ans')}</p>
                               </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques3')}</div>
                              </div>
                              <div className="item__content">
                                  <p>{translator.t('faq_ans')}</p>                              
                              </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques4')}</div>
                              </div>
                              <div className="item__content">
                                 <p>{translator.t('faq_ans')}</p>   
                              </div>
                        </div>
                     </div>
                     <div className="faq__right faq__column">
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques5')}</div>
                              </div>
                              <div className="item__content">
                                   <p>{translator.t('faq_ans')}</p>   
                              </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques6')}</div>
                              </div>
                              <div className="item__content">
                                  <p>{translator.t('faq_ans')}</p>   
                              </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques7')}</div>
                              </div>
                              <div className="item__content">
                                   <p>{translator.t('faq_ans')}</p>   
                              </div>
                        </div>
                        <div className="faq__item">
                              <div className="item__header">
                                 <img className="img-svg" src="img/icons/down-arrow.svg" alt=""/>
                                 <div className="item__title">{translator.t('faq_ques8')}</div>
                              </div>
                              <div className="item__content">
                                 <p>{translator.t('faq_ans')}</p>   
                            </div>
                        </div>
                     </div>
                  </div>
            </div>
         </section>

         <section className="community-section white-section" id="community-section">
            <div className="container">
                  <div className="community__box" style={{ backgroundImage: "url('img/landing/community.jpg')"}}>
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
                           <span> <span>{translator.t('buy_tokens')}</span></span><img className="img-svg swap-icon" src="img/icons/right-arrow.svg" alt=""/><div className="button__bg-hover"></div></a>
                  </div>
            </div>
         </section>

         <footer className="white__footer" id="footer">
            <div className="container">
                  <a className="footer__logo" href="/">
                     <svg  className="img-svg" width="152" height="41" viewBox="0 0 152 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M62.7921 14.2001V27.0961C62.7921 29.9121 61.4694 31.3201 58.8241 31.3201H54.5681C51.9228 31.3201 50.6001 29.9121 50.6001 27.0961V14.2001C50.6001 11.3841 51.9228 9.97607 54.5681 9.97607H58.8241C61.4694 9.97607 62.7921 11.3841 62.7921 14.2001ZM58.3121 27.6081V13.6561C58.3121 13.4854 58.2481 13.3361 58.1201 13.2081C58.0134 13.0801 57.8748 13.0161 57.7041 13.0161H55.6881C55.5174 13.0161 55.3681 13.0801 55.2401 13.2081C55.1334 13.3361 55.0801 13.4854 55.0801 13.6561V27.6081C55.0801 27.7787 55.1334 27.9281 55.2401 28.0561C55.3681 28.1841 55.5174 28.2481 55.6881 28.2481H57.7041C57.8748 28.2481 58.0134 28.1841 58.1201 28.0561C58.2481 27.9281 58.3121 27.7787 58.3121 27.6081Z" fill="white"/>
                           <path d="M74.4521 10.2961H78.7721L74.4841 31.0001H69.3321L65.0441 10.2961H69.3961L71.9241 25.4001L74.4521 10.2961Z" fill="white"/>
                           <path d="M89.0391 10.2961C91.6844 10.2961 93.0071 11.7041 93.0071 14.5201V18.6481C93.0071 21.4641 91.6844 22.8721 89.0391 22.8721H85.4231V31.0001H80.9431V10.2961H89.0391ZM88.5271 19.1601V14.0081C88.5271 13.8374 88.4631 13.6881 88.3351 13.5601C88.2284 13.4321 88.0898 13.3681 87.9191 13.3681H85.4231V19.8001H87.9191C88.0898 19.8001 88.2284 19.7361 88.3351 19.6081C88.4631 19.4801 88.5271 19.3307 88.5271 19.1601Z" fill="white"/>
                           <path d="M109.437 27.6081V24.4081H113.693V27.0961C113.693 29.9121 112.37 31.3201 109.725 31.3201H105.693C103.048 31.3201 101.725 29.9121 101.725 27.0961V14.2001C101.725 11.3841 103.048 9.97607 105.693 9.97607H109.725C112.37 9.97607 113.693 11.3841 113.693 14.2001V16.1521H109.437V13.6561C109.437 13.4854 109.373 13.3361 109.245 13.2081C109.138 13.0801 109 13.0161 108.829 13.0161H106.813C106.642 13.0161 106.493 13.0801 106.365 13.2081C106.258 13.3361 106.205 13.4854 106.205 13.6561V27.6081C106.205 27.7787 106.258 27.9281 106.365 28.0561C106.493 28.1841 106.642 28.2481 106.813 28.2481H108.829C109 28.2481 109.138 28.1841 109.245 28.0561C109.373 27.9281 109.437 27.7787 109.437 27.6081Z" fill="white"/>
                           <path d="M128.573 14.2001V27.0961C128.573 29.9121 127.251 31.3201 124.605 31.3201H120.349C117.704 31.3201 116.381 29.9121 116.381 27.0961V14.2001C116.381 11.3841 117.704 9.97607 120.349 9.97607H124.605C127.251 9.97607 128.573 11.3841 128.573 14.2001ZM124.093 27.6081V13.6561C124.093 13.4854 124.029 13.3361 123.901 13.2081C123.795 13.0801 123.656 13.0161 123.485 13.0161H121.469C121.299 13.0161 121.149 13.0801 121.021 13.2081C120.915 13.3361 120.861 13.4854 120.861 13.6561V27.6081C120.861 27.7787 120.915 27.9281 121.021 28.0561C121.149 28.1841 121.299 28.2481 121.469 28.2481H123.485C123.656 28.2481 123.795 28.1841 123.901 28.0561C124.029 27.9281 124.093 27.7787 124.093 27.6081Z" fill="white"/>
                           <path d="M136.361 10.2961V31.0001H131.881V10.2961H136.361Z" fill="white"/>
                           <path d="M151.566 31.0001H147.086V13.8161C147.086 13.6454 147.022 13.4961 146.894 13.3681C146.787 13.2401 146.649 13.1761 146.478 13.1761H144.75C144.579 13.1761 144.43 13.2401 144.302 13.3681C144.195 13.4961 144.142 13.6454 144.142 13.8161V31.0001H139.662V14.2001C139.662 11.3841 140.985 9.97607 143.63 9.97607H147.598C150.243 9.97607 151.566 11.3841 151.566 14.2001V31.0001Z" fill="white"/>
                           <path d="M35.7805 30.575L17.892 41L15.5449 38.1079L15.9881 19.2017L33.1218 10.0439L35.7805 10.0439V30.575Z" fill="#009691"/>
                           <path className="letter" d="M23.997 29.7357L23.9967 27.2041L27.224 25.3412C27.8735 24.9663 28.3945 24.4843 28.7869 23.8952C29.1792 23.2937 29.3754 22.6928 29.3754 22.0927C29.3753 21.5176 29.1791 21.1683 28.7866 21.0448C28.3942 20.9212 27.8732 21.0469 27.2237 21.4219L23.9964 23.2847L23.9962 20.7531L27.2437 18.8785C28.3669 18.2302 29.3479 17.8452 30.1869 17.7235C31.0259 17.6018 31.6754 17.7457 32.1356 18.1552C32.5957 18.5522 32.8258 19.2008 32.8259 20.101C32.826 21.0136 32.596 21.9465 32.136 22.8997C31.676 23.8404 31.0265 24.7404 30.1876 25.5997C29.3622 26.4512 28.3812 27.205 27.2445 27.8611L23.997 29.7357ZM21.6023 35.2252L21.6011 22.1356L24.9501 20.2024L24.9513 33.292L21.6023 35.2252Z" fill="#15141A"/>
                           <path d="M0.109928 30.6176L0 10.0439L3.13785 10.3394L17.8723 19.9402L17.8723 40.9997L0.109928 30.6176Z" fill="#45BFBB"/>
                           <path d="M17.9084 20.2356L0.0361328 10.0439L17.9084 0L35.7808 10.0439L17.9084 20.2356Z" fill="#7DFCF7"/>
                           <path  className="letter" d="M24.3937 13.6881C23.0867 14.4429 21.6766 14.9576 20.1633 15.2323C18.6522 15.4917 17.1309 15.4992 15.5995 15.2547C14.0823 15.0021 12.6479 14.4855 11.2965 13.705C9.93297 12.9176 9.03243 12.0857 8.59488 11.2095C8.17154 10.3251 8.19054 9.45006 8.65191 8.58433C9.12748 7.71039 10.0187 6.89604 11.3257 6.14125C12.6327 5.38647 14.0357 4.87586 15.5348 4.60942C17.0339 4.34298 18.542 4.3361 20.0592 4.58879C21.5786 4.82631 23.026 5.34227 24.4016 6.13668C25.7531 6.91715 26.6405 7.74959 27.0638 8.634C27.5014 9.5102 27.4955 10.3847 27.0462 11.2574C26.5848 12.1231 25.7007 12.9333 24.3937 13.6881ZM21.9502 12.277C22.5043 11.957 22.8446 11.5793 22.9713 11.1438C23.0859 10.7013 22.9694 10.232 22.6218 9.73593C22.2621 9.23287 21.6478 8.73047 20.7791 8.22874C19.8982 7.72004 19.0283 7.36531 18.1692 7.16456C17.2981 6.95685 16.4855 6.88956 15.7314 6.96271C14.9773 7.03586 14.3232 7.23241 13.7692 7.55237C13.2151 7.87233 12.8737 8.25766 12.7449 8.70834C12.6182 9.14385 12.7348 9.61313 13.0944 10.1162C13.442 10.6123 14.0502 11.1112 14.919 11.6129C15.7878 12.1147 16.6578 12.4694 17.5289 12.6771C18.3879 12.8779 19.2005 12.9452 19.9667 12.879C20.735 12.7976 21.3962 12.597 21.9502 12.277Z" fill="#242329"/>
                           <path  className="letter" d="M5.95237 31.3046L2.40283 15.6567L5.83447 17.638L7.83109 26.3888L8.47621 30.307L9.123 27.1347L11.1232 20.6915L14.5145 22.6494L10.9383 34.1833L5.95237 31.3046Z" fill="#15141A"/>
                           <rect x="95" y="19" width="4" height="5" rx="2" fill="white"/>
                     </svg>
                  </a>
                  <div className="footer__center">
                     <img className="gaming-logo img-svg" src="img/landing/gaming-logo.svg" alt=""/>
                  </div>
                  <div className="footer__right">OVP-Only Virtual Projects
                     <br/>2022
                  </div>
            </div>
         </footer>

         <div className="modal video center" data-modal="video">
            <div className="video-content"></div>
            <div className="modal__close">
                  <img className="img-svg" src="img/icons/close.svg" alt="Close"/>
            </div>
         </div>

      </div>
   );
}



export default Home;