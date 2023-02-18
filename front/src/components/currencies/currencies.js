export function Currencies({ onChangeCurrency, translator }){
    return(
        <div className="modal modal__tokens" data-modal="fiat">
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt=""/>
            </div>
            <div className="small-title">{translator.t('select_currency')}</div>
            <div className="tokens__box">
                <div className="tokens__list">
                    <div className="token__item" onClick={()=>{ onChangeCurrency("USD")}}>
                        <div className="token__text">
                            <div className="token__name">USD</div>
                            <div className="token__fullname">Dollar</div>
                        </div>
                    </div>
                    <div className="token__item" onClick={()=>{ onChangeCurrency("RUB")}}>
                        <div className="token__text">
                            <div className="token__name">RUB</div>
                            <div className="token__fullname">Ruble</div>
                        </div>
                    </div>
                    <div className="token__item" onClick={()=>{ onChangeCurrency("EUR")}}>
                        <div className="token__text">
                              <div className="token__name">EUR</div>
                              <div className="token__fullname">Euro</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
};

export default Currencies;