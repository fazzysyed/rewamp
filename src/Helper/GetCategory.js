export const GetCategory = (array, id) => {
  let newValue = array.filter((item) => item.id === id);

  console.log(newValue, "TESSFSGSDGRGSRGS");
  if (newValue[0]) {
    return newValue[0].name;
  } else {
    return "No name";
  }
};
