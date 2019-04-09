const { succeed, repair, fail, get } = require("./enhancer.js");

//declared single globale object to be reused, which is reset before each unit test
//means a little more work in individual test by spreading in sting and modifying each relevant property depending on the test, but much more clean and concise
//especially compared to when using 5-6 different weapons...
let sting = {};

beforeEach(() => {
  sting = { name: "Sting", durability: 2, enhancement: 2 };
});

describe("enhancer.js", () => {
  describe("enhancer", () => {
    describe("repair()", () => {
      it("should return a NEW item", () => {
        //can be run for all functions, but repetitive
        expect(repair(sting)).toEqual(sting);
        expect(repair(sting)).not.toBe(sting);
      });
      it("should return the item with durability reset to 100, regardless of current level", () => {
        expect(repair(sting).durability).toEqual(100);
      });
    });

    describe("succeed()", () => {
      it("should increment enhancement by 1 if previously under 20", () => {
        expect(succeed(sting).enhancement).toBe(3);
      });

      it("should return the item unchanged if enhancement already at 20", () => {
        expect(succeed({ ...sting, enhancement: 20 }).enhancement).toBe(20);
      });
    });

    describe("fail()", () => {
      it("should decrement the item's durability by 5 (floor of zero) if item.e < 15", () => {
        sting.durability = 7;
        expect(fail(sting).durability).toBe(2);
        expect(fail(sting).durability).toBe(0);
      });
      it("should decrement the item's durability by 10 (floor of zero) if item.e > 15", () => {
        expect(
          fail({ ...sting, durability: 17, enhancement: 18 }).durability
        ).toBe(7);
        expect(fail(sting).durability).toBe(0);
      });
      it("should decrement item.e if item.e > 16", () => {
        expect(fail({ ...sting, enhancement: 17 }).enhancement).toBe(16);
      });
    });

    describe("get()", () => {
      it("modifies the item name by prepending [+ item.e] if item.e >0", () => {
        expect(get({ ...sting, enhancement: 0 }).name).toBe("Sting");
        expect(get({ ...sting, enhancement: 20 }).name).toBe("[+20] Sting");
      });
      it("does not further modify the name if it has already been name enhanced", () => {
        expect(get({ ...sting, name: "[+2] Sting" }).name).toBe("[+2] Sting");
      });
    });
  });
});
