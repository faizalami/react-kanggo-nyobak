import { setupServer } from 'msw/node';
import { rest } from 'msw';
import axios from './axios';

test('axios request works with correct configs', async () => {
  const sendPayload = { sent: 'hello' };
  const respPayload = { response: 'hi' };

  let reqHeader = null;
  let reqBody = null;
  const server = setupServer(
    rest.post(`${process.env.REACT_APP_API_BASE_URL}/test`, (req, res, ctx) => {
      reqHeader = req.headers.get('Content-Type');
      reqBody = req.body;
      return res(ctx.json({ ...respPayload }));
    }),
  );
  server.listen();

  const { data } = await axios.post('/test', { ...sendPayload });

  expect(reqHeader).toBe('application/json');
  expect(reqBody).toEqual(sendPayload);
  expect(data).toEqual(respPayload);

  server.close();
});
