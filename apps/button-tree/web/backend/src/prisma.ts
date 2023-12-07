import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

prisma.$on("query", (e) => {
  // console.log("Query: " + e.query);
  // console.log("Params: " + e.params + ";", " Duration: " + e.duration + "ms");
});

export const connectPrisma = () => {
  prisma
    .$connect()
    .then(() => console.log("Prisma connected"))
    .catch((e: any) => {
      console.log("Prisma connection error");
      console.log(e);
    });
};
