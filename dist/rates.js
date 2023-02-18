// import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk';
// export const GetRates =()=>{
//     return new Promise((resolve, reject)=>{
//         const OVP = new Token(ChainId.MAINNET, '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', 18);
//         const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
//         Fetcher.fetchPairData(DAI, WETH[DAI.chainId]).then((DAIWETHPair)=>{
//             const route1 = new Route([DAIWETHPair],  WETH[DAI.chainId]);
//             const ethPrice = parseFloat(route1.midPrice.toSignificant(18));
//             Fetcher.fetchPairData(OVP, WETH[OVP.chainId]).then((OVPWETHPair)=>{
//                 const route2 = new Route([OVPWETHPair],  WETH[DAI.chainId]);
//                 const ovpPrice = parseFloat( route2.midPrice.toSignificant(18));
//                 resolve({
//                     ovpUsd: ethPrice / ovpPrice,
//                     ovpEth: ovpPrice
//                 });
//             }).catch((err)=>{
//                 reject(err);
//             });
//         }).catch((err)=>{
//             reject(err);
//         })
//     });
// }
//# sourceMappingURL=rates.js.map