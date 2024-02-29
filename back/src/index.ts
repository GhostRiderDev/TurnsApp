// import { IClient } from "./interface/Client";
// import { Role } from "./interface/Client";

// console.log(ClientIndex);

import server from "./server";
import { PORT } from "./config/envs";
server.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT}`);
});
