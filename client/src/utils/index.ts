export const insertIfUnique = <T>(array: T[], element: T) =>
  array.some((e) => e === element) ? array : [...array, element];

export const arrayToString = (array: string[]) => array.join(', ');

const sumArray = (array: number[]) =>
  array.reduce((subTotal, element) => subTotal + element);

export const averageArray = (array: number[]) => sumArray(array) / array.length;

const deepClone = (array: any[]) => JSON.parse(JSON.stringify(array));

export const reverseArray = (array: any[]) => {
  const arrayClone = deepClone(array);
  arrayClone.reverse();
  return arrayClone;
};
