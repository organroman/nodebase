import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const SignupPage = async () => {
  await requireUnAuth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default SignupPage;
