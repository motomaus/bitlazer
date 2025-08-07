const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("lzrBTC Contract", function () {
  let lzrBTC;
  let sZBTC;
  let WBTC;
  let owner, addr1, addr2, dustCollector;
  let ownerSigner, addr1Signer, addr2Signer;

  const oneOn8Decimals = ethers.utils.parseUnits("1", 8);

  beforeEach(async function () {
    // Get signers
    [ownerSigner, addr1Signer, addr2Signer] = await ethers.getSigners();
    owner = ownerSigner.address;
    addr1 = addr1Signer.address;
    addr2 = addr2Signer.address;

    // Generate random dust collector address
    dustCollector = ethers.Wallet.createRandom().address;

    // Deploy the contract WBTC - base token for mint/burn into lzrBTC
    const WBTCContract = await ethers.getContractFactory("WBTC");
    WBTC = await WBTCContract.deploy(owner, "WBTC", "WBTC");

    // Deploy the contract
    const lBTCContract = await ethers.getContractFactory("lzrBTC");

    // Deploy via proxy initialization
    lzrBTC = await upgrades.deployProxy(
      lBTCContract,
      ["lzrBTC", "lzrBTC", owner],
      {
        initializer: "initialize",
      },
    );

    const sZBTCContract = await ethers.getContractFactory("SZBTC");
    sZBTC = await sZBTCContract.deploy(owner, lzrBTC.address, "sZBTC", "sZBTC");

    await lzrBTC.setDustCollector(dustCollector);
    await lzrBTC.apply8To18DecimalsConversion();

    // Mint 1 WBTC for the owner
    const mintAmount = oneOn8Decimals;
    await WBTC.mint(addr1, mintAmount);

    // Set WBTC as the minting base to lzrBTC
    await lzrBTC.setWBTCAddress(WBTC.address);

    expect(await WBTC.balanceOf(addr1)).to.equal(mintAmount);
    expect(await lzrBTC.WBTC()).to.equal(WBTC.address);

    expect(await lzrBTC.setSZBTCAddress(sZBTC.address)).to.be.ok;
    expect(await lzrBTC.sZBTC()).to.equal(sZBTC.address);
  });

  it("should allow to transfer ownership over lzrBTC to a new wallet and back", async function () {
    const newOwner = addr1;
    expect(await lzrBTC.owner()).to.equal(owner);
    expect(await lzrBTC.transferOwnership(newOwner)).to.be.ok;
    expect(await lzrBTC.owner()).to.equal(newOwner);
    expect(await lzrBTC.connect(addr1Signer).transferOwnership(owner)).to.be.ok;
    expect(await lzrBTC.owner()).to.equal(owner);
  });

  it("Should allow the holder to mint & burn lzrBTC", async function () {
    const mintAmount = ethers.utils.parseUnits("0.5", 8);
    const mintAmount18Decimals = ethers.utils.parseUnits("0.5", 18);
    expect(await lzrBTC.balanceOf(addr1)).to.equal("0");
    expect(await WBTC.balanceOf(addr1)).to.equal(oneOn8Decimals);

    // Set the allowance for the contract to spend the WBTC
    await WBTC.connect(addr1Signer).approve(lzrBTC.address, mintAmount);

    expect(await lzrBTC.connect(addr1Signer).mint(mintAmount))
      .to.emit(lzrBTC, "Transfer")
      .withArgs(ethers.constants.AddressZero, owner, mintAmount);

    expect(await lzrBTC.balanceOf(addr1)).to.equal(mintAmount18Decimals);
    expect(await WBTC.balanceOf(addr1)).to.equal(mintAmount);

    // Try to burn the lzrBTC and expect the same amount of WBTC back in the wallet
    const burnAmount18Decimals = ethers.utils.parseUnits("0.25", 18);
    const burnAmount8Decimals = ethers.utils.parseUnits("0.25", 8);

    await lzrBTC
      .connect(addr1Signer)
      .approve(lzrBTC.address, burnAmount18Decimals);

    const burnTx = await lzrBTC.connect(addr1Signer).burn(burnAmount18Decimals);
    const _burnReceipt = await burnTx.wait();

    expect(burnTx)
      .to.emit(lzrBTC, "Transfer")
      .withArgs(owner, ethers.constants.AddressZero, burnAmount18Decimals)
      .to.emit(lzrBTC, "DustCollected")
      .withArgs(dustCollector, 0);

    expect(await lzrBTC.balanceOf(addr1)).to.equal(burnAmount18Decimals);
    expect(await lzrBTC.balanceOf(dustCollector)).to.equal(0);
    expect(await WBTC.balanceOf(addr1)).to.equal(
      oneOn8Decimals.sub(burnAmount8Decimals),
    );
  });

  it("Should allow the holder to mint & burn lzrBTC & collect dust", async function () {
    const mintAmount = ethers.utils.parseUnits("0.5", 8);
    const mintAmount18Decimals = ethers.utils.parseUnits("0.5", 18);
    expect(await lzrBTC.balanceOf(addr1)).to.equal("0");
    expect(await WBTC.balanceOf(addr1)).to.equal(oneOn8Decimals);

    // Set the allowance for the contract to spend the WBTC
    await WBTC.connect(addr1Signer).approve(lzrBTC.address, mintAmount);

    expect(await lzrBTC.connect(addr1Signer).mint(mintAmount))
      .to.emit(lzrBTC, "Transfer")
      .withArgs(ethers.constants.AddressZero, owner, mintAmount);

    expect(await lzrBTC.balanceOf(addr1)).to.equal(mintAmount18Decimals);
    expect(await WBTC.balanceOf(addr1)).to.equal(mintAmount);

    // Try to burn the lzrBTC and expect the same amount of WBTC back in the wallet
    const burnAmount18Decimals = ethers.utils.parseUnits("0.2500000001", 18);
    const burnAmount18DecimalsNoDust = ethers.utils.parseUnits("0.25", 18);
    const burnAmount8Decimals = ethers.utils.parseUnits("0.25", 8);
    const dustAmount = ethers.utils.parseUnits("0.0000000001", 18);

    await lzrBTC
      .connect(addr1Signer)
      .approve(lzrBTC.address, burnAmount18Decimals);

    const burnTx = await lzrBTC.connect(addr1Signer).burn(burnAmount18Decimals);
    const _burnReceipt = await burnTx.wait();

    expect(burnTx)
      .to.emit(lzrBTC, "Transfer")
      .withArgs(owner, ethers.constants.AddressZero, burnAmount18Decimals)
      .to.emit(lzrBTC, "DustCollected")
      .withArgs(dustCollector, dustAmount);

    expect(await lzrBTC.balanceOf(addr1)).to.equal(
      burnAmount18DecimalsNoDust.sub(dustAmount),
    );
    expect(await lzrBTC.balanceOf(dustCollector)).to.equal(dustAmount);
    expect(await WBTC.balanceOf(addr1)).to.equal(
      oneOn8Decimals.sub(burnAmount8Decimals),
    );
  });

  it("Should allow the holder to mint & burn lzrBTC with extra sZBTC stake rewards", async function () {
    const mintAmount18Decimals = ethers.utils.parseUnits("0.5", 18);
    const mintAmount8Decimals = ethers.utils.parseUnits("0.5", 8);
    const mintExtraAmount = ethers.utils.parseUnits("0.1", 18);
    const mintExtraAmount8Decimals = ethers.utils.parseUnits("0.1", 8);

    expect(await lzrBTC.balanceOf(addr1)).to.equal("0");
    expect(await WBTC.balanceOf(addr1)).to.equal(oneOn8Decimals);

    // Set the allowance for the contract to spend the WBTC
    await WBTC.connect(addr1Signer).approve(
      lzrBTC.address,
      mintAmount8Decimals,
    );

    expect(await lzrBTC.connect(addr1Signer).mint(mintAmount8Decimals))
      .to.emit(lzrBTC, "Transfer")
      .withArgs(ethers.constants.AddressZero, owner, mintAmount18Decimals);

    expect(await lzrBTC.balanceOf(addr1)).to.equal(mintAmount18Decimals);
    expect(await WBTC.balanceOf(addr1)).to.equal(mintAmount8Decimals);

    // Utilize sZBTC rewards to allow extra withdrawal of WBTC
    // Mint extra sZBTC for the addr1
    await sZBTC.mint(addr1, mintExtraAmount);
    await WBTC.mint(addr1, mintExtraAmount);
    // Transfer mintExtraAmount of WBTC to the contract
    await WBTC.connect(addr1Signer).transfer(lzrBTC.address, mintExtraAmount);
    expect(await sZBTC.balanceOf(addr1)).to.equal("100000000000000000");
    expect(await WBTC.balanceOf(addr1)).to.equal(mintAmount8Decimals);

    // Set the allowance for the contract to spend the sZBTC
    await sZBTC.connect(addr1Signer).approve(lzrBTC.address, mintExtraAmount);
    expect(
      await lzrBTC.connect(addr1Signer).addExtraHolderBalance(mintExtraAmount),
    ).to.be.ok;

    // Try to burn the lzrBTC and expect the same amount of WBTC back in the wallet
    const burnAmount = ethers.utils.parseUnits("0.6", 18);
    await lzrBTC.connect(addr1Signer).approve(lzrBTC.address, burnAmount);
    expect(await lzrBTC.connect(addr1Signer).burn(burnAmount))
      .to.emit(lzrBTC, "Transfer")
      .withArgs(owner, ethers.constants.AddressZero, burnAmount);

    expect(await lzrBTC.balanceOf(addr1)).to.equal("0");
    expect(await lzrBTC.balanceOf(addr1)).to.equal("0");
    expect(await WBTC.balanceOf(addr1)).to.equal(
      oneOn8Decimals.add(mintExtraAmount8Decimals),
    );
  });
});
