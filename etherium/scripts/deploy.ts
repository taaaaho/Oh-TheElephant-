import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("NFT");
  let contract = await factory.deploy({ gasPrice: 50000000000 }); // 50gwei
  console.log("Contract Address is ", contract.address);

  console.log(contract.deployTransaction.hash);
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
