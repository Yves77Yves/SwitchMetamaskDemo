import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  },
  ethereum: {
    chainId: `0x${Number(1).toString(16)}`
  },
  ropsten: {
    chainId: `0x${Number(3).toString(16)}`
  },
  rinkeby: {
    chainId: `0x${Number(4).toString(16)}`
  },
  goerli: {
    chainId: `0x${Number(5).toString(16)}`
  }
};

const changeDefault = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    console.log({
      ...networks[networkName]
    });
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ ...networks[networkName] }]
    });
  } catch (err) {
    setError(err.message);
  }
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const handleDefaultSwitch = async (networkName) => {
    setError();
    await changeDefault({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Switch to Default Metamask networks
          </h1>
          <div className="mt-4">
            <button
              onClick={() => handleDefaultSwitch("ethereum")}
              className="mt-2 mb-2 bg-info border-info btn submit-button focus:ring focus:outline-none w-full"
            >
              Switch to Ethereum Mainnet
            </button>

            <button
              onClick={() => handleDefaultSwitch("ropsten")}
              className="mt-2 mb-2 bg-info border-info btn submit-button focus:ring focus:outline-none w-full"
            >
              Switch to Ropsten Testnet
            </button>
            <button
              onClick={() => handleDefaultSwitch("rinkeby")}
              className="mt-2 mb-2 bg-info border-info btn submit-button focus:ring focus:outline-none w-full"
            >
              Switch to Rinkeby Testnet
            </button>
            <button
              onClick={() => handleDefaultSwitch("goerli")}
              className="mt-2 mb-2 bg-info border-info btn submit-button focus:ring focus:outline-none w-full"
            >
              Switch to Goerli Testnet
            </button>
            <ErrorMessage message={error} />
          </div>
        </main>
      </div>
      <li></li> <li></li> <li></li> <li></li> <li></li>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Switch to other networks
          </h1>
          <div className="mt-4">
            <button
              onClick={() => handleNetworkSwitch("polygon")}
              className="mt-2 mb-2 btn bg-primary border-primary submit-button focus:ring focus:outline-none w-full"
            >
              Switch to Polygon Mainnet
            </button>
            <button
              onClick={() => handleNetworkSwitch("bsc")}
              className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
            >
              Switch to BSC Mainnet
            </button>
            <ErrorMessage message={error} />
          </div>
        </main>
      </div>
    </div>
  );
}
