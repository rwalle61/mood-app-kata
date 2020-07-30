import axios from 'axios';
import { CheckIn } from './../types';

const serverBaseURL = 'http://localhost:9100/api/v1';
const serverURL = `${serverBaseURL}/checkins`;

export const getCheckIns = async () => (await axios.get(serverURL)).data;
export const addCheckIn = async (checkIn: CheckIn) =>
  (await axios.post(serverURL, checkIn)).data;
