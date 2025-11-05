import { requireAuth } from "@/lib/auth-utils";
import React from "react";

const ExecutionsPage = async () => {
  await requireAuth();
  return <div>executions page</div>;
};

export default ExecutionsPage;
