
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from "./Home";
import Staking from "./components/staking/staking";
import Security from "./components/staking/security";
import History from "./components/staking/history";
import Support from "./components/staking/support";
import config from "./config";
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Root = ()=>{

    const navigate = useNavigate();
    const [web3, setWeb3] = useState();
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState("");
    const [rate, setRate] = useState(0);

    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then((data)=>{
            setRate(data.data.USD);
        });
    },[]);

    const updateBalance = ()=>{
        web3.eth.getBalance(account).then((b)=>{
            setBalance(web3.utils.fromWei(b));
        });
    }

    const init = async (web3, _new)=>{
        if(web3){
            web3.eth.getAccounts().then(e =>{
                let account = e[0];
                setAccount(account);
                web3.eth.getBalance(account).then((b)=>{
                    setBalance(web3.utils.fromWei(b));
                    if(_new){
                        axios.post(`${config.api}/logs/create`, { type: 'Вход в систему', wallet: account }).then((data)=>{
                            navigate('/staking');
                        });
                    }
                });
            });
        }
    }

    const connectMetamaskCore = async (_new)=>{
        const provider = window.ethereum;
        let metamask =  new Web3(provider);
        await window.ethereum.enable();
        init(metamask, _new);
        localStorage.setItem('wallet', 'metamask');
        setWeb3(metamask);
    }
    
    const connectWalletCore = async (_new)=>{
        const provider = await new WalletConnectProvider({
          rpc: {
            1: config.infura
          },
        });
        provider.updateRpcUrl(1)
        await provider.enable();
        provider.updateRpcUrl(1)
        const walletconnect = await new Web3(provider);
        init(walletconnect, _new);
        localStorage.setItem('wallet', 'walletconect');
        setWeb3(walletconnect);
    }
    
    const connectCoinbaseCore = async (_new)=>{
      const DEFAULT_ETH_JSONRPC_URL = config.infura;
      const DEFAULT_CHAIN_ID = 1
      const walletLink = new WalletLink({
        darkMode: false
      });
      const provider = walletLink.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
      await provider.enable();
      const coinbase = new Web3(provider);
      init(coinbase, _new);
      localStorage.setItem('wallet', 'coinbase');
      setWeb3(coinbase);
    }
    
    const onCoinbaseConnect=()=>{
      connectCoinbaseCore(true);
    }
    
    const onConnectMetamask = ()=>{   
        if (window.ethereum){
            connectMetamaskCore(true);
        }else{
            toast.error("Установите расширение!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    
    const onWalletConnect = ()=>{
        connectWalletCore(true);
    }
    
    useEffect(()=>{
        async function init(){
          if(localStorage.getItem('wallet')){
            let type = localStorage.getItem('wallet');
            if(type === 'metamask'){
              connectMetamaskCore();
            }else if(type === 'walletconect'){
              connectWalletCore();
            }else if(type === 'coinbase'){
              connectCoinbaseCore();
            }
         }
        }
        init();
    },[]);

    return (
    
            <Routes>
                <Route exact path="/" element={<Home setWeb3={setWeb3} web3={web3}  onConnectMetamask={onConnectMetamask} onWalletConnect={onWalletConnect} onCoinbaseConnect={onCoinbaseConnect}/>}/>
                <Route exact path="/staking" element={<Staking updateBalance={updateBalance} web3={web3} account={account} balance={balance} rate={rate}/>}/>
                <Route exact path="/security" element={<Security account={account} balance={balance} rate={rate}/>}/>
                <Route exact path="/history" element={<History account={account} balance={balance} rate={rate}/>}/>
                <Route exact path="/support" element={<Support account={account} balance={balance} rate={rate}/>}/>
            </Routes>
       
    )
}

export const App = ()=>{
  
    return(
        <Router>
            <Root/>
            <ToastContainer/>
        </Router>
    )

}

export default App;