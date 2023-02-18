import ObjectID from "bson-objectid";
import CryptoJS from "crypto-js";

function Payment(){

    const onPay = ()=>{

        const wayforpay = new window.Wayforpay();
        const paymentId = ObjectID().str;
        const merchantAccount = 'test_merch_n1';//"builder4d_site";
        const merchantDomainName = "http://testcoin.ru";
        const orderReference = paymentId;
        const orderDate = new Date().getTime();
        const amount = 0.1;
        const currency = "USD";
        const productName = "gic";
        const productPrice = "1$";
        const productCount = 1;

        const key = 'flk3409refn54t54t*FNJRET';

        const str = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productName};${productCount};${productPrice}`;

        const merchantSignature = CryptoJS.HmacMD5(str, key).toString();

        wayforpay.run({ 				
            merchantAccount : merchantAccount, 				
            merchantDomainName : merchantDomainName, 							
            merchantSignature : merchantSignature, 				
            orderReference : orderReference, 				
            orderDate : orderDate, 				
            amount : amount, 				
            currency : currency, 				
            productName : productName, 				
            productPrice : productPrice, 				
            productCount : productCount			
        },(response)=>{

        })
    }

    return(
        <div>
            <button onClick={onPay}>Pay</button>
        </div>
    )
}

export default Payment;