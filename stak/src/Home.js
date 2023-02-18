import { useState } from "react";
import { Header } from "./components/header/header";
import { Faq } from "./components/faq/faq";
import ConnectWallet from "./components/connectWallet/connectWallet";
import ModalMenu from "./components/modalMenu/modalMenu";
import Modal from 'react-modal';
import config from "./config";
import imgUrl2 from "./img/Group 634.svg";
import "./scss/style.scss";

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

Modal.setAppElement('#root');

function App({ onConnectMetamask, onWalletConnect, onCoinbaseConnect}) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [contracModalIsOpen, setContracModalIsOpen] = useState(false);
  const [modalMenuIsOpen, setMenuIsOpen] = useState(false);

  const switchContractModal = ()=>{
    setContracModalIsOpen(!contracModalIsOpen);
  }

  const onCloseModalMenu = ()=>{
    setMenuIsOpen(false);
  }

  const startStacking = ()=>{
    setMenuIsOpen(false);
    setIsOpen(true);
  }

  const onCloseModal = ()=>{
    setIsOpen(false);
  }

  const onOpenModal = ()=>{
    setIsOpen(true);
  }

  const switchModalOpen = ()=>{
    setMenuIsOpen(!modalMenuIsOpen);
  }

  let etherscan = config.prod ? "https://etherscan.io/address/" : "https://goerli.etherscan.io/address/";
  document.body.style.background = "#161414";

  return (
    <div className="App">
        <Modal
          isOpen={contracModalIsOpen}
          style={customStyles}
          onRequestClose={switchContractModal}
          >
            <div class="modal mfp-hide js_modal js_modal-contract">
                <div class="modal__logo">
                    <img src="img/company.svg" alt=""/>
                </div>
                <button className="close_modal" onClick={switchContractModal}>
                    <img src={imgUrl2} />
                </button>
                <div class="modal__cnt">
                    <div class="modal__ttl font-25">
                        Что такое смарт-контракт?
                    </div>
                    <div class="modal__txt font-16">
                        <p>
                            Смарт-контракт — компьютерный алгоритм, предназначенный для формирования, управления и предоставления информации о владении чем-либо. Чаще всего речь идёт о применении технологии блокчейна. В более узком смысле под смарт-контрактом понимается набор функций и данных (текущее состояние), находящихся по определённому адресу в блокчейне.
                        </p>
                        <p>
                            Умные контракты впервые получили широкое распространение с появлением Ethereum. Идея создания проекта появилась в 2013 году.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={onCloseModal}
          >
           <ConnectWallet onCloseModal={onCloseModal} onConnectMetamask={onConnectMetamask} onWalletConnect={onWalletConnect} onCoinbaseConnect={onCoinbaseConnect}></ConnectWallet>
        </Modal>
        <Modal
          isOpen={modalMenuIsOpen}
          style={customStyles}
          onRequestClose={onCloseModalMenu}
          >
            <ModalMenu startStacking={startStacking} switchModalOpen={switchModalOpen}></ModalMenu>
        </Modal>
        <Header onOpenModal={onOpenModal} switchModalOpen={switchModalOpen}></Header>

        <div class="top" id="top">
          <div class="container">
              <img src="img/top-mobile.png" alt="" class="top__img"/>
              <h2 class="ttl top__ttl">
                  Стейкинг Ethereum.<br/>
                  Получайте до {config.percents}% в день.
              </h2>
              <div class="top__txt">
                  Наша платформа заставит ваши цифровые активы работать<br/>
                  на вас, получая хороший и стабильный ежедневный доход.<br/>
                  Минимальный депозит - 0.01 Eth
              </div>
              <div class="top__buttons">
                  <button class="btn btn_red top__buttons-itm js_modal-btn" onClick={startStacking}>
                      Начать стейкинг
                  </button>
                  <a href={etherscan + config.contract} target="_blank" class="btn btn_gray top__buttons-itm">
                      Смарт-контракт
                  </a>
              </div>
              <div class="top__audit">
                  <div class="font-16 top__audit-txt">
                      Проверенный смарт-контракт
                  </div>
                  <a href="" class="font-16 top__audit-lnk">
                      Посмотреть аудит
                  </a>
              </div>
          </div>
      </div>

      <div class="about" id="staking">
        <div class="container">
            <div class="about__cnt">
                <div class="about__l">
                    <img src="img/about.png" alt="" class="about__l-img"/>
                </div>
                <div class="about__r font-25">
                    Стейкинг - это процесс, позволяющий пользователям, которые владеют некоторыми криптоактивами, получать вознаграждение просто за их хранение. Мы выполняем процесс стейкинга от имени своих пользователей. Ежедневные вознаграждения зачисляется на личный счет стейкера в той же криптовалюте. Их можно вывести либо сразу, либо реинвестировать и получать больше доходности. Механизм подобен размещению депозита в банке и начислению процентов на остаток средств.
                </div>
            </div>
        </div>
    </div>

    <div class="advantages" id="advantages">
        <div class="container">
            <div class="advantages__cnt">
                <div class="advantages__l">
                    <div class="ttl advantages__l-ttl">
                        Премущества
                        стейкинга Ethereum
                    </div>
                    <div class="advantages__l-txt">
                        Ethereum — это программируемый блокчейн, который дает вам доступ к различным децентрализованным финансовым услугам, играм и приложениям через смарт-контракты.
                    </div>
                    <div class="btn advantages__l-btn js_modal-btn" onClick={switchContractModal}>
                        Что такое смарт-контракт?
                    </div>
                    <div class="advantages__l-audit">
                        <div class="font-16 advantages__l-audit-txt">
                            Проверенный смарт-контракт
                        </div>
                        <a href="" class="font-16 advantages__l-audit-lnk">
                            Посмотреть аудит
                        </a>
                    </div>
                </div>
                <div class="advantages__r">
                    <div class="advantages__r-ttl">
                        <img src="img/advantages-1.svg" class="advantages__r-ttl-img"/>
                        <div class="advantages__r-ttl-txt font-ttl-30">
                            Доход до {config.percents}% в день
                        </div>
                    </div>
                    <div class="advantages__r-txt">
                        Стейкинг Ethereum, за счет своей революционной технологии, может предложить хорошую доходность, не сравнимую с обычными финансовыми инструментами. Именно поэтому будущее за криптовалютами.
                    </div>
                    <div class="advantages__r-ttl">
                        <img src="img/advantages-2.svg" class="advantages__r-ttl-img"/>
                        <div class="advantages__r-ttl-txt font-ttl-30">
                            Помощь сообществу
                        </div>
                    </div>
                    <div class="advantages__r-txt">
                        Размещая свои активы Ethereum, вы помогаете защитить блокчейн и удостоверять транзакции. Вы являетесь частью успеха блокчейна Ethereum.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="trust">
        <div class="container">
            <div class="trust__cnt">
                <h2 class="ttl trust__ttl">
                    Почему стейкинг<br/>
                    можно доверить нам?
                </h2>
                <div class="trust__lst">
                  
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _1"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Высокая<br/>
                            безопасность
                        </div>
                        <div class="trust__lst-itm-txt">
                            Храните Ethreum на нашем смарт-контракте.
                            Вывести из смарт-контракта раньше необходимого срока невозможно.
                            Получатель - только вы.
                        </div>
                    </div>
                 
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _2"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Инвестиционная<br/>
                            доступность
                        </div>
                        <div class="trust__lst-itm-txt">
                            Вы можете инвестировать любую сумму Ethereum. Для этого не нужно владеть 32eth.
                            Все наши пользователи объединены в единый пул.
                        </div>
                    </div>
                 
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _3"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Простое<br/>
                            управление
                        </div>
                        <div class="trust__lst-itm-txt">
                            Мы разработали простой и удобный личный кабинет для управления вашими активами.
                            Доступно, удобно и прозрачно.
                        </div>
                    </div>
                    
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _4"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Круглосуточная<br/>
                            поддержка
                        </div>
                        <div class="trust__lst-itm-txt">
                            Мы работаем круглосуточно. Быстро отвечаем на любые вопросы о работе платформы. Оперативно решаем любые проблемы.
                        </div>
                    </div>
                  
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _5"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Реферальная<br/>
                            программа
                        </div>
                        <div class="trust__lst-itm-txt">
                            Увеличьте ваши доходы от стейкинга пригласив ваших друзей и знакомых с помощью нашей реферальной программы.
                        </div>
                    </div>
                  
                    <div class="trust__lst-itm">
                        <div class="trust__lst-itm-icon _6"></div>
                        <div class="trust__lst-itm-ttl font-ttl-30">
                            Страховой<br/>
                            пул
                        </div>
                        <div class="trust__lst-itm-txt">
                            Для большей надежности у нас предусмотрен отдельный смарт-контракт в качестве обеспечения гарантий.
                            Ваши средства полностью застрахованы.
                        </div>
                    </div>
                </div>
                <div class="trust__btm">
                    <div class="trust__btm-cnt">
                        <div class="trust__btm-ttl font-ttl-40">
                            Всё в одном месте
                        </div>
                        <div class="trust__btm-txt">
                            Вы можете управлять, стейкать и реинвестировать с помощью простого и удобного личного кабинета.<br/>
                            Всё, что вам нужно в одном клике.
                        </div>
                        <button class="btn btn_red trust__btm-btn js_modal-btn" onClick={startStacking}>
                            Начать стейкинг
                        </button>
                        <img src="{{ Vite::asset('resources/img/trust-btm.png') }}" alt="" class="trust__btm-img"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="steps" id="start">
        <div class="container">
            <div class="steps__cnt">
                <h2 class="ttl steps__ttl">
                    Получайте вознаграждения за стейкинг
                </h2>
                <div class="steps__txt">
                    Получайте до {config.percents}% в день пассивно. Пусть ваши активы работают на вас круглосуточно. Минимальный депозит - 0.01 Eth
                </div>
                <button class="btn btn_red steps__btn js_modal-btn" onClick={startStacking}>
                    Начать стейкинг
                </button>
                <div class="steps__main">
                    <div class="steps__main-top">
                        <div class="steps__main-top-itm">
                            <div class="steps__main-top-itm-num font-ttl-30">
                                1.
                            </div>
                            <div class="steps__main-top-itm-txt">
                                Заведите официальный
                                кошелек
                            </div>
                        </div>
                        <div class="steps__main-top-itm">
                            <div class="steps__main-top-itm-num font-ttl-30">
                                3.
                            </div>
                            <div class="steps__main-top-itm-txt">
                                Подключите
                                кошелек
                                к нашей платформе
                            </div>
                        </div>
                        <div class="steps__main-top-itm">
                            <div class="steps__main-top-itm-num font-ttl-30">
                                5.
                            </div>
                            <div class="steps__main-top-itm-txt">
                                Получайте ежедневные
                                вознаграждения
                            </div>
                        </div>
                    </div>
                    <div class="steps__main-btm">
                        <div class="steps__main-btm-itm">
                            <div class="steps__main-btm-itm-num font-ttl-30">
                                2.
                            </div>
                            <div class="steps__main-btm-itm-txt">
                                Купите Ethereum
                                за фиат или криптовалюту
                            </div>
                        </div>
                        <div class="steps__main-btm-itm">
                            <div class="steps__main-btm-itm-num font-ttl-30">
                                4.
                            </div>
                            <div class="steps__main-btm-itm-txt">
                                Разместите
                                Ethereum в нашем пуле
                            </div>
                        </div>
                        <div class="steps__main-btm-itm">
                            <div class="steps__main-btm-itm-num font-ttl-30">
                                6.
                            </div>
                            <div class="steps__main-btm-itm-txt">
                                Управляйте своими
                                инвестициями
                            </div>
                        </div>
                    </div>
                </div>
                <div class="steps__mobile">
                    <div class="steps__mobile-cnt">
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                1.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Заведите официальный кошелек
                            </div>
                        </div>
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                2.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Купите Ethereum<br/>
                                за фиат или криптовалюту
                            </div>
                        </div>
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                3.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Подключите кошелек<br/>
                                к нашей платформе
                            </div>
                        </div>
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                4.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Разместите<br/>
                                Ethereum в нашем пуле
                            </div>
                        </div>
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                5.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Получайте ежедневные<br/>
                                вознаграждения
                            </div>
                        </div>
                        <div class="steps__mobile-itm">
                            <div class="steps__mobile-itm-num">
                                6.
                            </div>
                            <div class="steps__mobile-itm-txt">
                                Получайте ежедневные<br/>
                                вознаграждения
                            </div>
                        </div>
                    </div>
                </div>
                <div class="steps__wallets">
                    <div class="steps__wallets-ttl font-ttl-30">
                        Поддерживаемые кошельки
                    </div>
                    <div class="steps__wallets-lst">
                        <img src="img/wallet-metamask.png" alt="" class="steps__wallets-lst-itm"/>
                        <img src="img/wallet-coinbase.png" alt="" class="steps__wallets-lst-itm"/>
                        <img src="img/wallet-walletconnect.png" alt="" class="steps__wallets-lst-itm"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

   <Faq></Faq>

    <div class="footer" id="contacts">
        <div class="container">
            <div class="footer__cnt">
                <div class="footer__note">
                    Для получения дополнительной информации о проекте, его особенностях, планах или сотрудничестве свяжитесь с нами любым из указанных ниже способов.
                </div>
                <div class="footer__contacts">
                    <a href="" class="footer__contacts-itm">
                        <div class="footer__contacts-itm-icon _1"></div>
                        <div class="footer__contacts-itm-ttl">
                            Telegram
                        </div>
                    </a>
                    <a href="" class="footer__contacts-itm">
                        <div class="footer__contacts-itm-icon _2"></div>
                        <div class="footer__contacts-itm-ttl">
                            Discord
                        </div>
                    </a>
                    <a href="" class="footer__contacts-itm">
                        <div class="footer__contacts-itm-icon _3"></div>
                        <div class="footer__contacts-itm-ttl">
                            E-mail
                        </div>
                    </a>
                </div>
                <a href="#top" class="footer__company js_anchor">
                    <img src="img/company.svg" alt="" class="footer__company-logo"/>
                    <div class="footer__company-name">
                        Bullstack
                    </div>
                </a>
                <div class="footer__rights">
                    All rights reserved
                </div>
            </div>
        </div>
    </div>

    </div>
  );
}

export default App;
