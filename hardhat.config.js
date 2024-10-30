require("@chainlink/env-enc").config()
require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")
require("./tasks")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */

const SOPELIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const LOCALHOST_URL = process.env.LOCALHOST_URL
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY
// console.log(COINMARKET_API_KEY)
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + SOPELIA_RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 11155111,
    },
    localhost: {
      url: LOCALHOST_URL,
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketCap: COINMARKET_API_KEY,
    token: "MATIC"
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    }
  },

}
