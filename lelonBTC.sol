// contracts/ERC20Mock.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract lelonBTC is ERC20 {
    using SafeERC20 for IERC20;

    address public owner;
    ERC20 public WBTC;

    constructor(address _owner, string memory name, string memory symbol) ERC20(name, symbol) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setWBTCAddress(address _WBTC) public onlyOwner {
        WBTC = ERC20(_WBTC);
    }

    function getWBTCAddress() public view returns (address) {
        return address(WBTC);
    }

    function mint(uint256 amount) public {
        WBTC.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        WBTC.transfer(msg.sender, amount);
    }
}
