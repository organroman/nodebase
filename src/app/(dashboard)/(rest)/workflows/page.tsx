import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/worfloflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";

import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
};

const WorkflowPage = async ({ searchParams }: Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}></ErrorBoundary>
        <Suspense fallback={<WorkflowsLoading />}>
          <WorkflowsList />
        </Suspense>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default WorkflowPage;
