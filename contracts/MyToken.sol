// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract MyToken is  ERC20, ERC20Burnable, Ownable{
    mapping(address => bool) controllers;

    constructor() ERC20("RAToken","RAT"){
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    function burnFrom(address account, uint256 amount)public override{
        if(controllers[msg.sender]){
            _burn(account, amount);
        }
        else{
            super.burnFrom(account,amount);
        }
    }
}
