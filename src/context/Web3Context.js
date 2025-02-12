import { providers } from "ethers";
import React, { useEffect, useState } from "react";

export const Web3Context = React.createContext(null);

const validNetworkOptions = {
	chainId: "0x16d",
	chainName: "Theta Testnet",
	nativeCurrency: { name: "Theta Fuel", symbol: "TFUEL", decimals: 18 },
	rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
	blockExplorerUrls: ["https://testnet-explorer.thetatoken.org/"],
};

export function Web3ContextProvider({ children }) {
	const [OngoingTx, setOngoingTx] = useState(null);
	const [transactionLink, setTransactionLink] = useState(null);

	const [metamaskInstalled, setMetamaskInstalled] = useState(false);
	const [wallet, setWallet] = useState(null);
	const [account, setAccount] = useState(null);
	const [connectingAccount, setConnectingAccount] = useState(false);
	const [provider, setProvider] = useState(null);
	const [chainId, setChainId] = useState(null);

	useEffect(() => {
		console.log(window.ethereum);
		if (window.ethereum !== undefined) {
			setMetamaskInstalled(true);
			const provider = new providers.JsonRpcProvider(
				"https://eth-rpc-api-testnet.thetatoken.org/rpc"
			);
			setProvider(provider);
			setWallet(new providers.Web3Provider(window.ethereum));
			setChainId(window.ethereum.chainId);
			window.ethereum.on("chainChanged", (chainId) => {
				window.location.reload();
			});

			window.ethereum.on("accountsChanged", (accounts) => {
				window.location.reload();
			});
		} else {
			setMetamaskInstalled(false);
		}
	}, []);

	useEffect(() => {
		if (window.ethereum.chainId !== null) {
			setChainId(window.ethereum.chainId);
		}
	}, [window.ethereum.chainId]);

	async function connectWallet() {
		setConnectingAccount(true);

		window.ethereum
			.request({
				method: "eth_requestAccounts",
			})
			.then((accounts) => {
				setConnectingAccount(false);
				setAccount(accounts[0]);
			})
			.catch((error) => {});
	}

	async function requestNetworkChange() {
		window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [validNetworkOptions],
		});
	}

	return (
		<Web3Context.Provider
			value={{
				OngoingTx,
				metamaskInstalled,
				provider,
				chainId,
				connectingAccount,
				account,
				wallet,
				transactionLink,
				setTransactionLink,
				setOngoingTx,
				connectWallet,
				requestNetworkChange,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
}
