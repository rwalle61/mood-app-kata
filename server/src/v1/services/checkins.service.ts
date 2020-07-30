let checkIns = [];

export const getCheckIns = (): object[] => checkIns;

export const addCheckIn = (newCheckIn: object): void => {
  checkIns = [...checkIns, newCheckIn];
};
