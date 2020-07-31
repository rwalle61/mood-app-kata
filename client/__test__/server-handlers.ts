import { rest } from 'msw';
import { CheckIn, CheckIns } from '../src/types';
import { serverURL } from '../src/utils/apiroutes';

const checkIns: CheckIns = [];

const handlers = [
  rest.get(serverURL, async (req, res, ctx) => {
    return res(ctx.json(checkIns));
  }),
  rest.post(serverURL, async (req, res, ctx) => {
    const newCheckIn = req.body;
    console.log('newCheckIn', newCheckIn);
    checkIns.push(newCheckIn as CheckIn);
    return res(ctx.status(201));
  }),
];

export { handlers };
