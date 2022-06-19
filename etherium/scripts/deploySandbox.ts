import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Sandbox1");
  let contract = await factory.deploy(1, 3);
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
