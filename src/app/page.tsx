"use client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  console.log("🚀 ~ data:", data);

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Ai job queued");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );

  return (
    <div className="">
      protected server component
      {JSON.stringify(data)}
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test ai
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
    </div>
  );
}
``;
