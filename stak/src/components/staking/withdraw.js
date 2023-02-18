import imgUrl2 from "../../img/Group 634.svg";
import { toast } from 'react-toastify';
import config from "../../config";
import axios from "axios";
import { useState } from "react";
import "./withdraw.css";

export const WithdrawModal = ({ onClose, web3, available, total: total, account, getBalance }) => {

    const [busy, setBusy] = useState(false);

    const onWithdrawAll = () => {

        if (!total) {
            toast.error("Не достаточно средств!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
            });
        } else {
            setBusy(true);
            web3.eth.sendTransaction({
                from: account,
                to: config.contract,
                value: web3.utils.toWei(config.withdraw_all_amount.toString(), "ether"),
            }, function (err, transactionHash) {
                setBusy(false);
                if (!err) {
                    axios.post(`${config.api}/transactions/withdraw-all`, { wallet: account, amount: total }).then((response) => {
                        getBalance();
                        onClose();
                    });
                } else {
                    toast.error("Отменено!", {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "light",
                    });
                }
            });
        }
    }

    const onWithdrawDevidents = () => {

        if (!available) {
            toast.error("Не достаточно средств!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
            });
        } else {
            setBusy(true);
            web3.eth.sendTransaction({
                from: account,
                to: config.contract,
                value: web3.utils.toWei(config.withdraw_devidents_amount.toString(), "ether"),
            }, function (err, transactionHash) {
                setBusy(false);
                if (!err) {
                    axios.post(`${config.api}/transactions/withdraw-dividents`, { wallet: account, amount: available }).then((response) => {
                        getBalance();
                        onClose();
                    });
                } else {
                    toast.error("Отменено!", {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "light",
                    });
                }
            });
        }
    }

    return (
        <div class="modal mfp-hide">
            {
                !busy &&
                <button className="close_modal" onClick={onClose}>
                    <img src={imgUrl2} />
                </button>
            }
            <div class="modal__logo">
                <img src="img/company.svg" alt="" />
            </div>
            <div class="modal__cnt">
                {
                    !busy &&
                    <div className="withdraw_buttons">
                    <div className="withdraw_button" onClick={onWithdrawAll}><span>Вывести все</span>
                        </div>
                        <div className="withdraw_button" onClick={onWithdrawDevidents}><span>Вывести девиденты</span>
                        </div>
                    </div> 
                }
            </div>
        </div>

    )
}

export default WithdrawModal;