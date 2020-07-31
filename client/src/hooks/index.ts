import { useQuery, useMutation, queryCache } from 'react-query';
import { getCheckIns, addCheckIn } from '../utils/apiroutes';

export const useCheckIns = () => useQuery('checkins', getCheckIns);

export const useAddCheckIn = () =>
  useMutation(addCheckIn, {
    onSuccess: () => {
      queryCache.invalidateQueries('checkins');
    },
  });
