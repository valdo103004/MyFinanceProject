import { App } from './app.js';
import { Env } from './lib/env.js';

App.listen(Env.PORT, () => {
  console.log(`MyFinance API berjalan di http://localhost:${Env.PORT}`);
});
