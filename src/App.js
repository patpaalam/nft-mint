import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import axios from "axios";
import React, { Component } from "react";

//ABI from Remix
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseExtension",
        type: "string",
      },
    ],
    name: "setBaseExtension",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newmaxMintAmount",
        type: "uint256",
      },
    ],
    name: "setmaxMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var account = null;
var contract = null;

// const data = [
//   {
//     id: "1",
//     img: "https://ipfs.io/ipfs/QmT8ar3kmGxUt5o6CJbZqDVAbgdC1qEMk98VjH1ai1g54z/1.png",
//     title: "pxNFT #1",
//     buttontext: "Buy Now",
//   },
//   {
//     id: "2",
//     img: "https://ipfs.io/ipfs/QmT8ar3kmGxUt5o6CJbZqDVAbgdC1qEMk98VjH1ai1g54z/2.png",
//     title: "pxNFT #2",
//     buttontext: "Buy Now",
//   },
//   {
//     id: "4",
//     img: "https://ipfs.io/ipfs/QmT8ar3kmGxUt5o6CJbZqDVAbgdC1qEMk98VjH1ai1g54z/4.jpg",
//     title: "pxNFT #4",
//     buttontext: "Buy Now",
//   },
//   {
//     id: "5",
//     img: "https://ipfs.io/ipfs/QmT8ar3kmGxUt5o6CJbZqDVAbgdC1qEMk98VjH1ai1g54z/5.jpg",
//     title: "pxNFT #5",
//     buttontext: "Buy Now",
//   },
// ];

//API key from etherscan
const apikey = "FTY8XDV8DCR6Z65PI1Z7SB3M15XB9RVVBC";

// Wallet Address. Calls Metamask
const ADDRESS = "0x52752cc2F4e55090a0D254C7dfc201D8E7e6E50e";

//API from Ether test net GOERLI FAUCET
const endpoint = "https://api-goerli.etherscan.io/api";

// This updates the NFT listings dynamically. We do not have to manually input everytime theres a new listing or new owner of an NFT.
const nftpng =
  "https://ipfs.io/ipfs/QmT8ar3kmGxUt5o6CJbZqDVAbgdC1qEMk98VjH1ai1g54z/";

//This connects to the wallet. This makes the code web3
async function connectwallet() {
  if (window.ethereum) {
    var web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet-address").textContent = account;
    contract = new web3.eth.Contract(ABI, ADDRESS);
  }
}

// Function mints an NFT
async function mint() {
  if (window.ethereum) {
    var _mintAmount = Number(document.querySelector("[name=amount").value);
    var mintRate = Number(await contract.methods.cost().call());
    var totalAmount = mintRate * _mintAmount;
    contract.methods
      .mint(account, _mintAmount)
      .send({ from: account, value: String(totalAmount) });
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      nftdata: [],
    };
  }

  //Using Axios
  async componentDidMount() {
    await axios
      .get(
        endpoint +
          `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`
      )
      .then((outputa) => {
        this.setState({
          balance: outputa.data,
        });
        console.log(outputa.data);
      });

    await axios
      .get(
        endpoint +
          `?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`
      )
      .then((outputb) => {
        const { result } = outputb.data;
        this.setState({
          nftdata: result,
        });
        console.log(outputb.data);
      });
  }

  render() {
    const { balance } = this.state;
    const { nftdata } = this.state;

    return (
      <div className="App">
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row">
            <form
              class="gradient col-lg-5 mt-5"
              style={{
                borderRadius: "25px",
                boxShadow: "1px 1px 15px #000000",
              }}
            >
              <h4 style={{ color: "#FFFFFF", marginTop: "6px" }}>
                Mint Portal (Goerli Ethereum Testnet)
              </h4>
              <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>
              <Button
                onClick={connectwallet}
                style={{ marginBottom: "5px", color: "#FFFFFF" }}
              >
                Connect Wallet
              </Button>
              <div
                className="card"
                id="wallet-address"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <label for="floatingInput">Wallet Address</label>
              </div>
              <div
                className="card"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <input
                  type="number"
                  name="amount"
                  defautValue="1"
                  placeholder="Please select the amount of NFTs to mint."
                  min="1"
                  max="9"
                  style={{ margin: "3px 11px 3px 11px" }}
                />
                <Button onClick={mint}>Mint/Buy</Button>
              </div>
              <label style={{ color: "#FFFFFF" }}>
                Price 0.05 ETH each mint.
              </label>

              <h5 style={{ color: "white" }}>
                Tokens Minted so far= {balance.result} /1000
              </h5>
            </form>
            <div className="row items mt-3">
              <div
                className="ml-3 mr-3"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(4, 5fr)",
                  columnGap: "10px",
                }}
              >
                {nftdata.map((result) => {
                  return (
                    <div className="card d-flex justify-content-center mt-3">
                      <div className="image-over">
                        <img
                          className="card-img-top"
                          src={nftpng + result.tokenID + ".png"}
                          alt=""
                        />
                      </div>
                      <div calssName="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0">pxNFT #{result.tokenID}</h5>
                          <h5 className="mb-0 mt-2">
                            Owner Wallet:
                            <p
                              style={{
                                color: "#39FF14",
                                fontSize: "10px",
                                fontWeight: "bold",
                                textShadow: "1px 1px 2px #000000",
                              }}
                            >
                              {result.to}
                            </p>
                          </h5>
                          <div className="card-bottom d-flex justify-content-between">
                            <Button
                              onClick={mint}
                              className="btn btn-bordered-white btn-smaller mt-3"
                            >
                              <i className="mr-2" />
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
