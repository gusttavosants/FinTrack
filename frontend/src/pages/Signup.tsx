import SignupForm from "@/components/auth/SignupForm";
import SignupHero from "@/components/auth/SignupHero";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <SignupForm />
      </div>

      {/* Right side - Hero with 3D (hidden on mobile) */}
      <div className="hidden lg:block lg:flex-1 p-4">
        <SignupHero />
      </div>
    </div>
  );
};

export default Signup;
