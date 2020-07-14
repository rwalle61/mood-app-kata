import app from './app';

import Logger from './utils/Logger';
import { port } from './config';

const log = new Logger(__filename);

app.listen(port, () => {
  log.info(`App running on port ${port}`);
});
