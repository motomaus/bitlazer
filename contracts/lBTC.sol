// contracts/ERC20Mock.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract ZBTC is ReentrancyGuardUpgradeable, AccessControlUpgradeable, ERC20Upgradeable {
    using SafeERC20 for IERC20;

    bool public paused;
    bool public pausedExtraHolderBalance;

    IERC20 public sZBTC;
    IERC20 public WBTC;

    function initialize(string memory name, string memory symbol, address _owner) public initializer {
        require(_owner != address(0), "Owner cannot be 0 address");
        __ERC20_init(name, symbol);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        __ReentrancyGuard_init();
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// *** Modifiers ***
    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only owner can call this function");
        _;
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    function setWBTCAddress(address _WBTC) public onlyOwner {
        WBTC = IERC20(_WBTC);
    }

    function pauseExtraHolderBalance() public onlyOwner {
        pausedExtraHolderBalance = true;
    }

    function unpauseExtraHolderBalance() public onlyOwner {
        pausedExtraHolderBalance = false;
    }

    function setSZBTCAddress(address _sZBTC) public onlyOwner {
        sZBTC = IERC20(_sZBTC);
    }

    function getWBTCAddress() public view returns (address) {
        return address(WBTC);
    }

    function mint(uint256 amount) public nonReentrant {
        require(!paused, "Contract paused");
        _mint(msg.sender, amount);
        WBTC.safeTransferFrom(msg.sender, address(this), amount);
    }

    // If sufficient balance of sZBTC is not available, this function will fail
    // Otherwise, add the extra balance to the holder's balance in order to allow the extra stake accumulated to l3 withdrawals
    function addExtraHolderBalance(address _holder, uint256 amount) public nonReentrant {
        require(!pausedExtraHolderBalance, "Extra holder balance paused");
        uint256 sZBTCBalance = sZBTC.balanceOf(_holder);
        require(sZBTCBalance >= amount, "Insufficient sZBTC balance");
        // Verify _WBTC is a supported wrapper
        // Burn the sZBTC
        sZBTC.safeTransferFrom(_holder, address(0x000000000000000000000000000000000000dEaD), amount);
        // Mint the lBTC to the holder
        _mint(_holder, amount);
    }

    function burn(uint256 amount) public nonReentrant {
        require(!paused, "Contract paused");
        _burn(msg.sender, amount);
        WBTC.transfer(msg.sender, amount);
    }
}
