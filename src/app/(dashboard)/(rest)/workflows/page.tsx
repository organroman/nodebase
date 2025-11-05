import { requireAuth } from "@/lib/auth-utils";
import React from "react";

const WorkflowPage = async () => {
  await requireAuth();
  
  return <div>workflow page</div>;
};

export default WorkflowPage;
