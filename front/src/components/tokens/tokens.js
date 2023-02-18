import React from "react";

let tokens = [
    {
        "symbol": "ETH",
        "name": "Ether",
        "img": "img/icons/tokens/eth.png"
    },
    {
        "symbol": "1INCH",
        "name": "1inch Network",
        "img": "img/icons/tokens/1inch.png"
    },
    {
        "symbol": "AAVE",
        "name": "AAVE",
        "img": "img/icons/tokens/aave.png"
    }
];

export default class Tokens extends React.Component{

    constructor(props){
        super(props);
        this.state = { text: ""};
        this.onTextChange = this.onTextChange.bind(this);
        this.onTokenClick = this.onTokenClick.bind(this);
    }

    onTextChange(e){
        this.setState({ text: e.target.value });
    }

    onTokenClick(e){
       let symbol = e.target.value;
       this.props.changeFromSymbol(symbol);
       window.$(".modal__close").click();
    }

    render(){

        let translator = this.props.translator;
        
        let data = tokens;
        if(this.state.text){
            data = tokens.filter((token)=>{ return token.symbol.toLocaleLowerCase().indexOf(this.state.text.toLocaleLowerCase()) > (-1)})
        }

        let list = data.map((token)=>{
            return(
                <div className="token__item" key={token.symbol}>
                    <div className="token__img">
                        <img src={ token.img } alt=""/>
                    </div>
                    <div className="token__text">
                        <div className="token__name">{ token.symbol}</div>
                        <div className="token__fullname">{ token.name }</div>
                    </div>
                    <button value={token.symbol} onClick={this.onTokenClick}></button>
                </div>
            )
        });

        return(
            <div className="modal modal__tokens" data-modal="token">
                <div className="modal__close">
                    <img className="img-svg" src="img/icons/close.svg" alt=""/>
                </div>
                <div className="small-title">{ translator.t('choose_token')}</div>
                <div className="subtitle small">{ translator.t('choose_desc')}</div>
                <div className="tokens__search">
                    <input className="tokens__search-input" type="text" onChange={this.onTextChange} value={this.state.value}/>
                    <button className="tokens__search-button">
                        <img className="img-svg" src="img/icons/search.svg" alt=""/>
                    </button>
                </div>
                <div className="tokens__box">
                    <div className="tokens__list">
        
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}

