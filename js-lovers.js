// PROBLEM 2. MU ONLINE
const input = "cat 10|potion 30|orc 10|chest 10|snake 25|chest 110";
//const input = "rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000";

const user = {
  hp: parseInt(100), //all works unless user.hp is more than 100
  bitcoins: parseInt(0),
};

function printMessages(input) {
  const roomsArray = input.split("|");
  const instructionsArray = roomsArray.map((i) => i.split(" "));

  instructionsArray.map((r) => {
    const command = r[0];
    const amount = parseInt(r[1]);
    const room = instructionsArray.indexOf(r) + 1;

    if (user.hp <= 0) return;

    switch (command) {
      case "potion":
        const originalHealth = user.hp;
        const health = (user.hp += amount);

        user.hp = health > 100 ? 100 : health;

        originalHealth + amount >= 100
          ? console.log(`You healed for ${100 - originalHealth} hp.`)
          : console.log(`You healed for ${amount} hp.`);

        health > 100
          ? console.log(`current health: 100 hp`)
          : console.log(`current health: ${health} hp.`);
        break;

      case "chest":
        const totalBitcoins = (user.bitcoins += amount);
        console.log(`You found ${amount} bitcoins.`);
        user.bitcoins = totalBitcoins;
        break;

      default:
        const monster = command;
        const attack = amount;
        const healthFight = user.hp - attack;

        healthFight > 0
          ? console.log(`You slayed ${monster}.`)
          : youDead(monster, room);

        user.hp = healthFight;
        break;
    }

    if (user.hp > 0 && room === roomsArray.length) greatSuccess();

    function greatSuccess() {
      console.log(`You've made it`);
      console.log(`Bitcoins: ${user.bitcoins}`);
      console.log(`Health: ${user.hp}`);
    }

    function youDead(monster, room) {
      console.log(`You died! Killed by ${monster}.`);
      console.log(`best room ${room}`);
    }
  });
}

printMessages(input);
