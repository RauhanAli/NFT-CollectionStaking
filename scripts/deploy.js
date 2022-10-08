// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy();
  await token.deployed();
  console.log("NFT Minting Token deployed to:", token.address);
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(token.address);
  await nft.deployed();
  console.log("NFT Contract deployed to:", nft.address);
  const Reward = await hre.ethers.getContractFactory("Reward");
  const reward = await Reward.deploy();
  await reward.deployed();
  console.log("Reward Token deployed at:", reward.address);
  const NFTStaking = await hre.ethers.getContractFactory("NFTStaking");
  const nftStaking = await NFTStaking.deploy(reward.address, nft.address);
  await nftStaking.deployed();
  console.log("NFT Staking Contract deployed at:", nftStaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
