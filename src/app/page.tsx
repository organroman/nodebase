import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers();
  return (
    <div className="">
      protected server component
      {JSON.stringify(data)}
      <Button>Click me</Button>
    </div>
  );
}
