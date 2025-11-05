import { requireAuth } from "@/lib/auth-utils";

interface CredentialIdPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}
const CredentialIdPage = async ({ params }: CredentialIdPageProps) => {
  await requireAuth();
  const { credentialId } = await params;
  return <div>Credential id: {credentialId}</div>;
};

export default CredentialIdPage;
