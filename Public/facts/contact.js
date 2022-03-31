let btnRandom = document.querySelector("button");
let result = document.querySelector("h1");
let users = [
  "People who prefer twitter over facebook tend to have a higher iq but are also more likely to suffer from insomnia.",
  "Palm trees are not technically trees, they are grass.",
  "Avocados are berries.",
  "'go.' is the shortest complete sentence in the english language. ",
  "The most popular name for a pet in the United States is Max.",
  "Elephants can die of a broken heart if a mate dies. they refuse to eat and will lay down, shedding tears until they starve to death.",
  "Starfish have no brains",
  "Only one person in two billion will live to be 116 or older.",
  "If you blink one eye you move over 200 muscles.",
];
function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}
btnRandom.addEventListener("click", () => {
  let index = getRandomNumber(0, users.length - 1);
  result.innerText = users[index];
});
