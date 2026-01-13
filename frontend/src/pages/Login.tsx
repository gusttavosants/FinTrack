import LoginForm from "@/components/auth/LoginForm";
import LoginHero from "@/components/auth/LoginHero";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12">
        <LoginForm />
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:block lg:w-1/2 p-4">
        <LoginHero />
      </div>
    </div>
  );
};

export default Login;
