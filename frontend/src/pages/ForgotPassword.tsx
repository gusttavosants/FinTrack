import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginHero from "@/components/auth/LoginHero";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
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
            <div className="w-full lg:w-1/2 flex items-center justify-center py-12">
                <ForgotPasswordForm />
            </div>

            {/* Right side - Hero */}
            <div className="hidden lg:block lg:w-1/2 p-4">
                <LoginHero />
            </div>
        </div>
    );
};

export default ForgotPassword;
