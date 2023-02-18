import { isAutorized } from "./auth";
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink'
import Swap from "./components/swap/swap";
import Reset from "./components/reset/reset";
import NotFound from "./components/notFound/notFound";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import ConnectWallet from "./components/connectWallet/connectWallet";
import ResetPassword from "./components/resetPassword/resetPassword";
import Balance from "./components/balance/balance";
import Wallet from "./components/wallet/wallet";
import Personal from "./components/personal/personal";
import Security from "./components/security/security";
import Support from "./components/support/support";
import History from "./components/history/history";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home";
import PaySuccess from "./components/paySuccess/paySuccess";
import PayError from "./components/payError/payError";
import Users from "./components/users/users";
import User from "./components/user/user";
import Transaction from "./components/transaction/transaction";
import Purchases from "./components/purchases/purchases";
import Ticket from "./components/ticket/ticket";
import TicketAdmin from "./components/ticketAdmin/ticketAdmin";
import Tickets from "./components/tickets/tickets";
import History2 from "./components/history2/history2";
import Chart from "./components/chart/chart";
import { ProtectedRoute } from "./protectedRoute";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Translator from "./translator/translator";
import { headers } from "./auth";
import axios from "axios";
import config from './config';
import 'react-toastify/dist/ReactToastify.css';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status) {
    const status = error.response.status;
    if (status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      window.location.href = '/'
    }
  }
  return Promise.reject(error);
});

const translator = new Translator();

function App() {

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [ovpPrice, setOvpPrice] = useState(0);
  const [ovpEth, setOvpEth] = useState(0);

  let auth = isAutorized();

  const getBalance = ()=>{
    axios.get(`${config.api}/wallets/balance`, headers).then(res => {
      if(res.data){
        setBalance(res.data.balance);
      }
    });
  }

  const getRates = ()=>{
    axios.get(`${config.api}/wallets/rates`, headers).then(res => {
      if(res.data){
        let rates = res.data;
        setOvpPrice(rates.ovpUsd);
        setOvpEth(rates.ovpEth);
      }
    });
  }

  useEffect(()=>{
    getRates();
    if(auth){
      getBalance();
    }
  },[]);


  const onDisconnect = ()=>{
    setWeb3(null);
    setAccount(null);
    localStorage.removeItem('wallet');
  }

  const connectMetamaskCore = async ()=>{
      const provider = window.ethereum;
      let metamask =  new Web3(provider);
      await window.ethereum.enable();
      localStorage.setItem('wallet', 'metamask');
      setWeb3(metamask);
  }

  const connectWalletCore = async ()=>{
      const provider = await new WalletConnectProvider({
        rpc: {
          1: config.infura
        },
      });
      provider.updateRpcUrl(1)
      await provider.enable();
      provider.updateRpcUrl(1)
      const walletconnect = await new Web3(provider);
      localStorage.setItem('wallet', 'walletconect');
      setWeb3(walletconnect);
  }

  const connectCoinbaseCore = async ()=>{
    const DEFAULT_ETH_JSONRPC_URL = config.infura
    const DEFAULT_CHAIN_ID = 1
    const walletLink = new WalletLink({
      darkMode: false
    });
    const provider = walletLink.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
    await provider.enable();
    const coinbase = new Web3(provider);
    localStorage.setItem('wallet', 'coinbase');
    setWeb3(coinbase);
  }

  const hidePopup = ()=>{
     window.$(".modal__close").click();
  }

  const onCoinbaseConnect=()=>{
    hidePopup();
    connectCoinbaseCore();
  }

  const onConnectMetamask = ()=>{   
       hidePopup()
      if (window.ethereum){
          connectMetamaskCore();
      }else{
        toast.error(translator.t('install_metamask'), {
          position: toast.POSITION.TOP_CENTER
        });
      }
  }

  const onWalletConnect = ()=>{
       hidePopup();
       connectWalletCore();
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

  if(web3){
      web3.eth.getAccounts().then(e =>{
        let account = e[0];
        setAccount(account);
      });
  }

   let root = window.location.pathname === '/';

   return (
       <Router>
         {
           !root &&
           <Header account={account} ovpPrice={ovpPrice} translator={translator} onDisconnect={onDisconnect} balance={balance}></Header>
         }
         <Routes>
          <Route exact path="/" element={<Home translator={translator}/>}/>
          <Route exact path="/swap" element={<Swap ovpEth={ovpEth} ovpPrice={ovpPrice} auth={auth} translator={translator} web3={web3} account={account} balance={balance}/>}/>
          <Route
            path="/balance"
            element={
              <ProtectedRoute>
                <Balance rate={ovpPrice} translator={translator} balance={balance} getBalance={getBalance}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet  rate={ovpPrice}  translator={translator}/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <Personal  translator={translator}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Security  translator={translator}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History  translator={translator}/>
              </ProtectedRoute>
            }
          />
          <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support  translator={translator}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute>
              <Ticket  translator={translator}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket2/:id/:user"
          element={
            <ProtectedRoute>
              <TicketAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute path="tickets">
              <Tickets/>
            </ProtectedRoute>
          }
        />
        <Route exact path="/reset/:id" element={<Reset translator={translator}/>}/>
        <Route exact path="/success" element={<PaySuccess/>}/>
        <Route exact path="/error" element={<PayError/>}/>
        <Route exact path="/users" element={<Users/>}/>
        <Route
          path="/users"
          element={
            <ProtectedRoute path="users">
              <Users/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute path="transaction">
              <Transaction/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute path="user">
              <User/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history2/:id"
          element={
            <ProtectedRoute path="history2">
              <History2/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedRoute path="purchases">
              <Purchases/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/chart"
          element={
            <ProtectedRoute path="chart">
              <Chart/>
            </ProtectedRoute>
          }
        />
        <Route exact path="*" element={<NotFound/>}/>
        </Routes>
        <ConnectWallet onConnectMetamask={onConnectMetamask} onWalletConnect={onWalletConnect} translator={translator} onCoinbaseConnect={onCoinbaseConnect}></ConnectWallet>
        <Login translator={translator}></Login>
        <Register translator={translator}></Register>
        <ResetPassword translator={translator}></ResetPassword>
        <div className="overlay"></div>
        {
           !root &&
           <Footer></Footer>
        }
        <ToastContainer></ToastContainer>
       </Router>

   );
}

export default App;