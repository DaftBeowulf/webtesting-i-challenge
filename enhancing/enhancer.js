module.exports = {
  succeed,
  fail,
  repair,
  get
};

function succeed(item) {
  let { enhancement } = item;
  enhancement < 20 && item.enhancement++;
  return { ...item };
}

function fail(item) {
  const { enhancement } = item;
  enhancement < 15 ? (item.durability -= 5) : (item.durability -= 10);
  enhancement > 16 && item.enhancement--;
  item.durability < 0 && (item.durability = 0);

  return { ...item };
}

function repair(item) {
  item.durability = 100;
  return { ...item };
}

function get(item) {
  const { name, enhancement } = item;
  enhancement > 0 &&
    !name.includes("[+") &&
    (item.name = `[+${enhancement}] ${name}`);
  return { ...item };
}
