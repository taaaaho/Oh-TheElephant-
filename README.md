# Oh-TheElephant-

NFT mint site sandbox.

## Contract Deploy

```bash
yarn deploy:localhost
```

## Contract test

```bash
# Run console
npx hardhat console --network localhost

# Create contract instance by contract name adn address
const ContractFactory = await ethers.getContractFactory('SandboxERC721A')
const cont = await Sandbox1.attach('0xc5a5C42992dECbae36851359345FE25997F5C42d')

# Basic command
await cont.setPublicPrice(2)
await cont.seedWhitelist(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],[3])
await cont.setBaseURI('https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/')
```
