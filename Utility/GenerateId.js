const GenerateId = () => {
  const dateNow = Date.now();
  const constantNumber = Date.now() + Date.now();
  const randomNumber1 = parseInt(Math.random());
  const randomNumber2 = parseInt(Math.random());
  const randomNumber3 = parseInt(Math.random());

  return (
    dateNow +
    randomNumber1 +
    constantNumber +
    dateNow +
    randomNumber2 +
    constantNumber -
    (randomNumber3 + Date.now()) * randomNumber1
  );
};

module.exports = GenerateId;
