// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Horse {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function sleep() public pure returns (string memory) {
        return "Horse is sleeping";
    }

    function eat(string memory _food) public pure returns (string memory) {
        if (keccak256(bytes(_food)) == keccak256(bytes("plant"))) {
            return "Horse is eating plant";
        } else {
            return "Horse cannot eat this food";
        }
    }
}

contract Dog {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function sleep() public pure returns (string memory) {
        return "Dog is sleeping";
    }

    function eat(string memory _food) public pure returns (string memory) {
        if (
            keccak256(bytes(_food)) == keccak256(bytes("plant")) ||
            keccak256(bytes(_food)) == keccak256(bytes("meat")))
        {
            return "Dog is eating";
        } else {
            return "Dog cannot eat this food";
        }
    }
}

contract Farmer {
    function callHorse(Horse _horse) public view returns (string memory) {
        return _horse.name();
    }

    function feedHorse(Horse _horse, string memory _food) public pure returns (string memory) {
        return _horse.eat(_food);
    }

    function callDog(Dog _dog) public view returns (string memory) {
        return _dog.name();
    }

    function feedDog(Dog _dog, string memory _food) public pure returns (string memory) {
        return _dog.eat(_food);
    }
}
