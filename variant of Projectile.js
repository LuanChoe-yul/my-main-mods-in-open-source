/* Inspired by Kaynan's code
created by choe yul / 


/* this was the first code created today i have a little better code */

const Player = new NativeClass('Terraria', 'Player');
const Item = new NativeClass('Terraria', 'Item');
const PrefixID = new NativeClass('Terraria.ID', 'PrefixID');
const Main = new NativeClass('Terraria', 'Main');const SetDefaults = Item['void SetDefaults(int Type)'];
const prefixCount = () => PrefixID.Count;
const random = (max) => Math.floor(Math.random() * max);
let ShootDubble1 = [];

for (let i = 0; i < 50; i++) {
  ShootDubble1.push(Main.GameUpdateCount);
}

Player.Update.hook((original, self, i) => {
  original(self, i);
  
  for (let slot = 0; slot < 50; slot++) {
    const item = self.inventory[slot];
    
if (item.type === 1 && Main.GameUpdateCount - ShootDubble1[slot] > 1) {
    ShootDubble1[slot] = Main.GameUpdateCount;

    if (item.shoot === 1) {
        item.shoot = 2;
        item.shootSecond = 1;
    } else {
        item.shoot = 1;
        item.shootSecond = 2;
    }
    item.shootSpeed = 10.0;
}
if (item.type === 2 && Main.GameUpdateCount - ShootDubble1[slot] > 1) {
    ShootDubble1[slot] = Main.GameUpdateCount;
    
    if (item.shoot === 1) {
        item.shoot = 2;
        item.shootSecond = 1;
    } else {
        item.shoot = 1;
        item.shootSecond = 2;
    }
    item.shootSpeed = 10.0;
} 
 }
  });

/* if you use my credits choe yul */
