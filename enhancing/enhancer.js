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
  const i = name.indexOf("]");

  enhancement > 0 && i === -1
    ? (item.name = `[+${enhancement}] ${name}`)
    : enhancement > 0
    ? (item.name = `[+${enhancement}] ${name.slice(i + 2)}`)
    : null;

  return { ...item };
}
