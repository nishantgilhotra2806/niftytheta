require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
			gas: 12000000,
			blockGasLimit: 0x1fffffffffffff,
			allowUnlimitedContractSize: true,
		},
		theta: {
			url: "https://eth-rpc-api-testnet.thetatoken.org/rpc",
			chainId: 365,
			accounts: [process.env.WALLET_PRIVATE_KEY],
		},
	},
};
