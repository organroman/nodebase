import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="text-red-500">
      {JSON.stringify(users)}
      <Button>Click me</Button>
    </div>
  );
}
