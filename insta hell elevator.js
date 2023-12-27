
/* DISCORD
@notswaglord
@luanchoeyul
*/

/*
He made a base of what he wanted, I took it, put some things so that it is much better and playable, of course
*/

const Main = new NativeClass('Terraria', 'Main');
const HitTile = new NativeClass('Terraria', 'HitTile');
const WorldGen = new NativeClass('Terraria', 'WorldGen');

const KillTile = WorldGen.KillTile;
const KillWall = WorldGen.KillWall;
const PlaceTile = WorldGen.PlaceTile;
const PlaceWall = WorldGen.PlaceWall;

let Item = new NativeClass("Terraria", "Item");
let SetDefaults = Item["void SetDefaults(int Type, bool noMatCheck, ItemVariant variant)"];

class TileClearer {
    static ClearArea(x, y) {
        const underworldLayerY = Main.UnderworldLayer;
        const width = 8;

        for (let dy = y; dy <= underworldLayerY; dy++) {
            for (let dx = x; dx < x + width; dx++) {
				let xOffset = dx - x;
                KillTile(dx, dy, false, false, false);
				KillWall(dx, dy, false);

				// below is extra decor for the hellevator
				PlaceWall(dx, dy, 5, false); // gray brick wall
					
				if(xOffset === 0 || xOffset === width - 1) {
					PlaceTile(dx, dy, 38, false, false, -1, 0); // gray brick
				}
					
				else if((xOffset === 1 || xOffset === width - 2) && dy % 35 === 0) {
					PlaceTile(dx, dy, 4, false, false, -1, 5); // white torch
				}

				else if(xOffset === 2 || xOffset === width - 3) {
					PlaceTile(dx, dy, 214, false, false, -1, 0); // iron chain
				}

				else if(xOffset === 3 || xOffset === width - 4) {
					PlaceTile(dx, dy, 561, false, false, -1, 0); // marble column
				}
            }
        }
    }
}

HitTile.AddDamage.hook((original, self, tileId, damageAmount, updateAmount) => {
    let damage = original(self, tileId, damageAmount, updateAmount);

    if (damage >= 100 && Main.LocalPlayer.HeldItem.type == 4909) {

        const hitTileObjectData = self.HitTileObjectData;
        const objectIndex = tileId * 7;

        TileClearer.ClearArea(hitTileObjectData[objectIndex + 0], hitTileObjectData[objectIndex + 1]);
    }

    return damage;
});

SetDefaults.hook((original, self, Type, noMatCheck, variant) => {
    original(self, Type, noMatCheck, variant);

    if (Type === 4909) {
        self.ownIgnore = -1;
        self.holdStyle = 1;
        self.useStyle = 2;
        self.useAnimation = 2;
        self.useTime = 2;
        self.pick = 666;
        self.shoot = -1;
    }
});

/*
Give all credit if you use the code
*/