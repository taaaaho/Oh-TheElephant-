import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Sandbox1");
  let contract = await factory.deploy(
    "Oh! The Elephant!",
    "ABEKO",
    ethers.utils.parseUnits("0.001"),
    40
  );
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
