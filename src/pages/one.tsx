import React from "react";
import { prisma } from "../server/db/client";
import type { Home, Admin } from "@prisma/client";

// type Home = Prisma.Home

interface IHome extends Home {
  admin: Admin;
}

export async function getServerSideProps() {
  // Get all homes
  const homes = await prisma.home.findMany({
    include: {
      admin: true,
    },
  });
  // Pass the data to the Home page
  console.log("homes", homes);
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}

export default function One({ homes }: { homes: IHome[] }) {
  if (homes.length === 0) return <div>loading...</div>;
  return (
    <div>
      {homes.map((home) => (
        <div key={home.id}>
          {home.title} + {home.admin.username}
        </div>
      ))}
    </div>
  );
}
