import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./components/NavBar/NavBar";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import P2P from "./pages/P2P/P2P";
import Explore from "./pages/Explore/Explore";

export default function App() {
  return (
    <BrowserRouter>
      <AppNavBar></AppNavBar>
      <Routes>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<Create />} />
        <Route path="p2p" element={<P2P />} />
      </Routes>
    </BrowserRouter>
  );
}

// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';

// import { Address, Wallet } from "fuels";
// import { callAdmin } from "./calls/adminCall";
// import { callSetAdmin } from "./calls/setAdminCall";
// import { callListNFT } from "./calls/listNFTCall";
// import { callBuyNFT } from "./calls/buyNFTCall";
// import { callDelistNFT } from "./calls/delistNFTCall";
// import { callChangeNFTPrice } from "./calls/changeNFTPriceCall";
// import { callIsNFTListed } from "./calls/isNFTListedCall";
// import { callGetNFTData } from "./calls/getNFTDataCall";

// import {NFTAbi__factory} from "./contracts/nft";
// import {NftMarketplaceAbi__factory} from "./contracts/marketplace";
// import { log } from 'console';

// function App() {
//   const [name, setName] = useState("");
//   const [symbol, setSymbol] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState<any[]>([]);
//   const [allDescription, setAllDescription] = useState<any[]>([]);
//   const [nftData, setNftData] = useState<string[]>([]);

//   type TokenMetaData = {
//     name: string;
//     symbol: string;
//     token_uri: string;
// }

// const md1: TokenMetaData = {
//   name: "Booty Demons #1",
//   symbol: "BD #1",
//   token_uri: "QmYy65NTTXqM9PFwvs9rBBaYbG8xbHaaZDGN9QyRbkEERo",
// }

// const md2: TokenMetaData = {
//   name: "Booty Demons #2",
//   symbol: "BD #2",
//   token_uri: "Qmbi5ennNe3bsvGmqREfMhyRCsiPmNjP8RfmtBDMf56T4G",
// }

// const mintData: any = [md1, md2];

// const admin = "0x6b63804cfbf9856e68e5b6e7aef238dc8311ec55bec04df774003a2c96e0418e";
// const wallet = new Wallet(
//   "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
//   );

//   const contractId =
//   "0xac7f6d88fa08d8c33ba714bb1bd59c5a17b1cfce4df02f29226681f44b259a06";

//   const NFTContractId =
//   "0x3245f0b770312e4463024cec93ae0944ec876c3a6adc93a4402f18fa4f6d12a6";

//     const marketplaceContract = NftMarketplaceAbi__factory.connect(
//       contractId,
//       wallet
//     );

//     const NFTContract = NFTAbi__factory.connect(
//       NFTContractId,
//       wallet
//     );

//   const callAdminResp = async () => {
//     const callAdminResp = await callAdmin(marketplaceContract);
//     console.log("some2", callAdminResp);
//     const callSetAdminResp = await callSetAdmin(marketplaceContract, "0x54944e5b8189827e470e5a8bacfc6c3667397dc4e1eef7ef3519d16d6d6c6610");
//     console.log("some1", callSetAdminResp);
//   };

//   const callAdminResp2 = async () => {
//     // const callSetAdminResp = await callSetAdmin(contractId, wallet, "0x54944e5b8189827e470e5a8bacfc6c3667397dc4e1eef7ef3519d16d6d6c6610");
//     // console.log("some1", callSetAdminResp);
//     const callAdminRespTwo = await callAdmin(marketplaceContract);
//     console.log("some2", callAdminRespTwo);
//   };

//   const callConstructorResp = async () => {
//     const consttructor = await NFTContract.functions.constructor(true, { Address: { value: admin } }, 100).call();
//     console.log("some1", consttructor);

//   };

//   const mint = async () => {
//     // const NFTAdmin = await NFTContract.functions.admin().get();
//     // console.log("NFTAdmin", NFTAdmin);
//     const mintedNFT = await NFTContract.functions.mint(mintData.length, {Address: { value: admin}}, mintData).call();
//     console.log("mintedNFT", mintedNFT);

//   };

//   const getNFT = async () => {
//     const base = "https://ipfs.io/ipfs/";
//     const metaData = await NFTContract.functions.meta_data(1).get();
//     setName(metaData.value.name);
//     setSymbol(metaData.value.symbol);
//     const uri = base + metaData.value.token_uri;
//     console.log(metaData);

//     fetch(uri)
//       .then(res => res.json())
//       .then(res => {
//         const url = base + res.image.split("//")[1];
//         console.log("uri", res.attributes);
//         console.log("type", typeof(res.attributes));
//         setDescription(res.attributes);
//         setImage(url);

//     });
//     console.log(metaData.value);
//   };

// const all_meta_data = async () => {
//     const base = "https://ipfs.io/ipfs/";
//     let data: any = [];
//     const metaData1 = await (await NFTContract.functions.all_meta_data().get()).value;
//     console.log(metaData1);
//     for (let index = 0; index < metaData1.length; index++) {
//       const metaData = metaData1[index];
//       setName(metaData.name);
//       setSymbol(metaData.symbol);
//       const uri = base + metaData.token_uri;

//       fetch(uri)
//         .then(res => res.json())
//         .then(res => {
//           const url = base + res.image.split("//")[1];
//           // console.log("uri", url);
//           // setDescription(res.attributes);
//           setImage(url);
//           let nftObj = {
//             name: metaData.name,
//             symbol: metaData.symbol,
//             image: url,
//           }
//           data.push(nftObj);
//           setNftData([...data]);
//         });
//       }
//     console.log("data", data);
//   };

//   const owner_of = async () => {
//     const owner_of = await NFTContract.functions.owner_of(0).get();
//     console.log("owner_of", owner_of);
//   };

//   const approveNFT = async () => {
//     const approve_nft = await NFTContract.functions.approve({ContractId : { value: contractId }}, 0).call();
//     console.log("approve_nft", approve_nft);
//   };

//   const transferFrom = async () => {
//     const transfer_from = await NFTContract.functions.transfer_from({ Address: { value: admin } }, {ContractId : { value: contractId }}, 0).call();
//     console.log("transfer_from", transfer_from);
//   };

//   const transferFromOwner = async () => {
//     const transfer_from_owner = await NFTContract.functions.transfer_from({ContractId : { value: contractId }}, { Address: { value: admin } }, 0).call();
//     console.log("transfer_from_owner", transfer_from_owner);
//   };

//   const listNFT = async () => {
//     // const transfer_from = await NFTContract.functions.transfer_from({ Address: { value: admin } }, {ContractId : { value: contractId }}, 0).call();
//     // console.log("transfer_from", transfer_from);
//     const list_nft = await marketplaceContract.functions.list_nft({ value: NFTContractId }, 1, 12).call();
//     console.log("list_nft", list_nft);
//   };

//   const delist_nft = async () => {
//     // const transfer_from_owner = await NFTContract.functions.transfer_from({ContractId : { value: contractId }}, { Address: { value: admin } }, 0).call();
//     // console.log("transfer_from_owner", transfer_from_owner);
//     const delist_nft = await marketplaceContract.functions.delist_nft({ value: NFTContractId }, 0).call();
//     console.log("delist_nft", delist_nft);
//   };

//   const buy_nft = async () => {
//     // const transfer_from_owner = await NFTContract.functions.transfer_from({ContractId : { value: contractId }}, { Address: { value: admin } }, 0).call();
//     // console.log("transfer_from_owner", transfer_from_owner);
//     const buy_nft = await marketplaceContract.functions.buy_nft({ value: NFTContractId }, 1).call();
//     console.log("buy_nft", buy_nft);
//   };

//   const get_nft_data = async () => {
//     const get_nft_data = await marketplaceContract.functions.get_nft_data({ value: NFTContractId }, 0).get();
//     console.log("get_nft_data", get_nft_data);
//   };

//   const change_nft_price = async () => {
//     const change_nft_price = await marketplaceContract.functions.change_nft_price({ value: NFTContractId }, 0, 8).call();
//     console.log("change_nft_price", change_nft_price);
//   };

//   return (
//     <div className="App">
//       <div>
//         <button
//           onClick={callConstructorResp}
//         >
//           callConstructorResp
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={mint}
//         >
//           mint
//         </button>
//       <div>
//         <button
//           onClick={getNFT}
//           >
//           getNFT
//         </button>
//         { name ? (
//            <>
//           <div>
//             name: {name},
//             <br></br>
//             symbol: {symbol},
//             <br></br>
//             <img
//               height={100}
//               width={100}
//             src={image} alt="" />
//             {/* description: {description}, */}
//             { description.map((data) => (
//               <div key={data.trait_type}>
//                 name : {data.trait_type},
//                 value : {data.value}
//               </div>
//             ))}

//           </div>
//            </>
//         ): (
//           <></>
//         )}
//         </div>
//       </div>
//       <button
//           onClick={all_meta_data}
//           >
//           all_meta_data
//         </button>
//       <div>
//         <button
//           onClick={owner_of}
//         >
//           owner_of
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={approveNFT}
//         >
//           approveNFT
//         </button>
//       </div>
//       {/* <div>
//         <button
//           onClick={transferFrom}
//         >
//           transferFrom to contract
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={transferFromOwner}
//         >
//           transferFrom to owner
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={listNFT}
//         >
//           listNFT
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={delist_nft}
//         >
//           delist_nft
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={buy_nft}
//         >
//           buy_nft
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={change_nft_price}
//         >
//           change_nft_price
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={get_nft_data}
//         >
//           get_nft_data
//         </button>
//       </div>
//       <button
//         onClick={callAdminResp}
//       >
//         call 1
//       </button>
//       <button
//         onClick={callAdminResp2}
//       >
//         call 2
//       </button> */}
//     </div>
//   );
// }

// export default App;
