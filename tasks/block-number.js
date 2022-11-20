const { task } = require("hardhat/config")

task("blocknumber", "Prints the current blocknumber").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(blockNumber)
  }
)
