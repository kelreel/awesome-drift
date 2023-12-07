import { createServer } from "./bootstrap";
import { CONFIG } from "./config";
import { connectPrisma } from "./prisma";

connectPrisma();

createServer().then(({ app }) => {
  app.listen(CONFIG.PORT);
  console.log(`Server started on PORT: ${CONFIG.PORT}`);
});
