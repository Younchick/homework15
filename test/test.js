const { expect } = require("chai");

describe("Horse, Dog, and Farmer Contracts", function () {
  let Horse;
  let Dog;
  let Farmer;
  let horse;
  let dog;
  let farmer;

  beforeEach(async function () {
    Horse = await ethers.getContractFactory("Horse");
    Dog = await ethers.getContractFactory("Dog");
    Farmer = await ethers.getContractFactory("Farmer");

    horse = await Horse.deploy("Horse");
    dog = await Dog.deploy("Dog");
    farmer = await Farmer.deploy();
  });

  describe("Horse and Farmer", function () {
    it("Horse should have the correct name", async function () {
      expect(await horse.name()).to.equal("Horse");
    });

    it("Horse can sleep", async function () {
      expect(await horse.sleep()).to.equal("Horse is sleeping");
    });

    it("Horse can eat 'plant'", async function () {
      expect(await horse.eat("plant")).to.equal("Horse is eating plant");
    });

    it("Horse cannot eat 'meat', 'not-food', 'plastic'", async function () {
      expect(await horse.eat("meat")).to.equal("Horse cannot eat this food");
      expect(await horse.eat("not-food")).to.equal("Horse cannot eat this food");
      expect(await horse.eat("plastic")).to.equal("Horse cannot eat this food");
    });

    it("Farmer can call Horse and Horse responds correctly", async function () {
      expect(await farmer.callHorse(horse)).to.equal("Horse");
    });

    it("Farmer can feed Horse with plant", async function () {
      expect(await farmer.feedHorse(horse, "plant")).to.equal("Horse is eating plant");
    });

    it("Farmer cannot feed Horse with anything else", async function () {
      expect(await farmer.feedHorse(horse, "meat")).to.equal("Horse cannot eat this food");
      expect(await farmer.feedHorse(horse, "not-food")).to.equal("Horse cannot eat this food");
      expect(await farmer.feedHorse(horse, "plastic")).to.equal("Horse cannot eat this food");
    });
  });

  describe("Dog and Farmer", function () {
    it("Dog should have the correct name", async function () {
      expect(await dog.name()).to.equal("Dog");
    });

    it("Dog can sleep", async function () {
      expect(await dog.sleep()).to.equal("Dog is sleeping");
    });

    it("Dog can eat 'plant'", async function () {
      expect(await dog.eat("plant")).to.equal("Dog is eating");
    });

    it("Dog can eat 'meat'", async function () {
      expect(await dog.eat("meat")).to.equal("Dog is eating");
    });

    it("Dog cannot eat 'not-food', 'plastic', 'chocolate'", async function () {
      expect(await dog.eat("not-food")).to.equal("Dog cannot eat this food");
      expect(await dog.eat("plastic")).to.equal("Dog cannot eat this food");
      expect(await dog.eat("chocolate")).to.equal("Dog cannot eat this food");
    });

    it("Farmer can call Dog and Dog responds correctly", async function () {
      expect(await farmer.callDog(dog)).to.equal("Dog");
    });

    it("Farmer can feed Dog with 'meat', 'plant'", async function () {
      expect(await farmer.feedDog(dog, "meat")).to.equal("Dog is eating");
      expect(await farmer.feedDog(dog, "plant")).to.equal("Dog is eating");
    });

    it("Farmer cannot feed Dog with 'not-food', 'plastic', and anything else", async function () {
      expect(await farmer.feedDog(dog, "not-food")).to.equal("Dog cannot eat this food");
      expect(await farmer.feedDog(dog, "plastic")).to.equal("Dog cannot eat this food");
      expect(await farmer.feedDog(dog, "chocolate")).to.equal("Dog cannot eat this food");
    });
  });
});
