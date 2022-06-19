import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { expect } = require("chai");
// const provider = waffle.provider;
import {
  test_config,
  //   assertPublicMintSuccess,
  //   assertPreMint,
} from "./helper";
//@ts-ignore
import type { Sandbox1 } from "../typechain-types";
import type { BigNumber } from "ethers";
// const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");

describe(`${test_config.contract_name} contract`, function () {
  let owner: SignerWithAddress;
  let bob: SignerWithAddress;
  let alis: SignerWithAddress;
  let ad: Sandbox1;
  let addrs;

  const not_revealed_uri = test_config.notRevealedUri;

  beforeEach(async function () {
    // @ts-ignore
    [owner, bob, alis, ...addrs] = await ethers.getSigners();
    const contract = await ethers.getContractFactory(test_config.contract_name);
    ad = (await contract.deploy(
      test_config.contract_name,
      test_config.symbol,
      ethers.utils.parseUnits(test_config.public_price.toString()),
      test_config.max_supply
    )) as Sandbox1;
    await ad.deployed();

    // Ensure contract is paused/disabled on deployment
    expect(await ad.revealed()).to.equal(false);
  });

  describe("Basic checks", function () {
    it("check the owner", async function () {
      expect(await ad.owner()).to.equal(owner.address);
    });

    it("check default revealed is false", async function () {
      expect(await ad.revealed()).to.equal(false);
    });

    it("Confirm public price", async function () {
      const cost = ethers.utils.parseUnits(test_config.public_price.toString());
      expect(await ad.publicPrice()).to.equal(cost);
    });
  });

  describe("URI checks", function () {
    beforeEach(async function () {
      await ad.setReveal(false);
    });

    it("Token URI not available for non-minted token", async function () {
      expect(ad.tokenURI(1)).to.be.reverted;
    });

    it("Only whitelisted user can mint", async function () {
      expect(ad.mint()).to.be.revertedWith("not eligible for whitelist mint");
    });

    it("URI not visible before reveal", async function () {
      await ad.setPhase(false);
      expect(
        await ad.mint({
          value: ethers.utils.parseUnits(test_config.public_price.toString()),
        })
      ).to.be.ok;
      expect(await ad.tokenURI(1)).to.equal(not_revealed_uri);

      expect(
        await ad.mint({
          value: ethers.utils.parseUnits(test_config.public_price.toString()),
        })
      ).to.be.ok;
      expect(await ad.tokenURI(2)).to.equal(not_revealed_uri);
    });

    it("URI visible after reveal", async function () {
      expect(await ad.setPhase(false)).to.be.ok;
      expect(await ad.setReveal(true)).to.be.ok;
      expect(
        await ad.mint({
          value: ethers.utils.parseUnits(test_config.public_price.toString()),
        })
      ).to.be.ok;
      expect(await ad.tokenURI(1)).to.equal(
        "https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/1"
      );
      expect(
        await ad.mint({
          value: ethers.utils.parseUnits(test_config.public_price.toString()),
        })
      ).to.be.ok;
      expect(await ad.tokenURI(2)).to.equal(
        "https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/2"
      );

      expect(await ad.setReveal(false)).to.be.ok;
      expect(await ad.tokenURI(2)).to.equal(not_revealed_uri);
    });
  });

  describe("Mint check", function () {
    it("Mint cost is too high", async function () {
      const cost: BigNumber = ethers.utils.parseUnits("0.1");
      expect(await ad.setPhase(false)).to.be.ok;
      expect(ad.mint({ value: cost })).to.be.revertedWith("Mint cost is wrong");
    });
    it("Mint cost is too low", async function () {
      const cost: BigNumber = ethers.utils.parseUnits("0.0001");
      expect(await ad.setPhase(false)).to.be.ok;
      expect(ad.mint({ value: cost })).to.be.revertedWith("Mint cost is wrong");
    });

    it("Mint cost OK", async function () {
      const cost: BigNumber = ethers.utils.parseUnits("0.001");
      expect(await ad.setPhase(false)).to.be.ok;
      expect(await ad.mint({ value: cost })).to.be.ok;
    });
  });
});
