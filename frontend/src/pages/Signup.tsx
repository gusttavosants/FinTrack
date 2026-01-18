import SignupForm from "@/components/auth/SignupForm";
import SignupHero from "@/components/auth/SignupHero";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background flex relative">
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-50">
        <Link to="/">
          <Button variant="ghost" className="gap-2 pl-2 hover:bg-muted/50">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

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
