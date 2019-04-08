const { succeed, repair, fail, get } = require("./enhancer.js");
// test away!

describe("enhancer.js", () => {
  describe("enhancer", () => {
    describe("repair()", () => {
      const hrunting = { name: "Hrunting", durability: 20, enhancement: 1 };
      it("should return a NEW item", () => {
        //can be run for all functions, but repetitive

        expect(repair(hrunting)).toEqual(hrunting);
        expect(repair(hrunting)).not.toBe(hrunting);
      });
      it("should return the item with durability reset to 100, regardless of current level", () => {
        expect(repair(hrunting).durability).toEqual(100);
      });
    });

    describe("succeed()", () => {
      const hrunting = { name: "Hrunting", durability: 20, enhancement: 1 };
      const glamdring = { name: "Glamdring", durability: 20, enhancement: 20 };
      it("should increment enhancement by 1 if previously under 20", () => {
        expect(succeed(hrunting).enhancement).toBe(2);
      });

      it("should return the item unchanged if enhancement already at 20", () => {
        expect(succeed(glamdring).enhancement).toBe(20);
      });
    });

    describe("fail()", () => {
      const hrunting = { name: "Hrunting", durability: 20, enhancement: 1 };
      const glamdring = { name: "Glamdring", durability: 20, enhancement: 20 };
      const sting = { name: "Sting", durability: 2, enhancement: 2 };
      const dawnbreaker = {
        name: "Dawnbreaker",
        durability: 2,
        enhancement: 20
      };
      it("should decrement the item's durability by 5 (floor of zero) if 5 < item.e < 15", () => {
        expect(fail(hrunting).durability).toBe(15);
        expect(fail(sting).durability).toBe(0);
      });
      it("should decrement the item's durability by 10 (floor of zero) if item.e > 15", () => {
        expect(fail(glamdring).durability).toBe(10);
        expect(fail(dawnbreaker).durability).toBe(0);
      });
      it("should decrement item.e if item.e > 16", () => {
        glamdring.enhancement = 20;
        expect(fail(hrunting).enhancement).toBe(1);
        expect(fail(glamdring).enhancement).toBe(19);
      });
    });

    describe("get()", () => {
      const glamdring = { name: "Glamdring", durability: 20, enhancement: 20 };
      const stormbreaker = {
        name: "[+20] Stormbreaker",
        durability: 100,
        enhancement: 20
      };
      it("modifies the item name by prepending [+ item.e] if item.e >0", () => {
        expect(get(glamdring).name).toBe("[+20] Glamdring");
      });
      it("does not further modify the name if it has already been name enhanced", () => {
        expect(get(stormbreaker).name).toBe("[+20] Stormbreaker");
      });
    });
  });
});
