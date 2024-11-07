const { network, ethers } = require("hardhat");
const { external } = require("../hardhat.config");
const { verify } = require("../utils/verify");

const _env = process.env;
const provider = new ethers.providers.JsonRpcProvider(_env.RPC_URL);

module.exports = async ({ getNamedAccounts, deployments }) => {
  let WETH;
  const { deploy, log } = deployments;

  const accounts = await ethers.getSigners();
  const { deployers } = accounts[0];
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let owner, name, symbol, initialSupply;
  if (chainId == 31337) {
    name = "";
    symbol = "";
    initialSupply = ethers.utils.parseEther("");
    owner = deployer;
  } else {
    name = "";
    symbol = "";
    initialSupply = ethers.utils.parseEther("");
    owner = deployer;
  }

  args = [name, symbol, initialSupply, owner];
  // DN404 Token
  const token = await deploy("[contractName]", {
    contract: "[contractName]",
    from: deployer,
    log: true,
    args: args
    // gasLimit: 1605000
  });

  // // To uncomment to verify the contract in ase of final deployment
  // // if (!developmentChains.includes(network.name)) {
  // log("Verifying...");
  await verify(token.address, args);
  // }
};

module.exports.tags = ["all", "token"];
