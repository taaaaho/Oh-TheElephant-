import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.9", settings: {} }],
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: `${process.env.INFURA_RINKEBY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    ropsten: {
      url: `${process.env.INFURA_ROPSTEN}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
export default config;
