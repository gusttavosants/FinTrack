import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password recovery requested for:", email);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-md mx-auto px-8 animate-fade-in">
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Verifique seu email</h2>
                    <p className="text-muted-foreground mb-8">
                        Enviamos as instruções de recuperação de senha para <span className="font-medium text-foreground">{email}</span>
                    </p>

                    <Button asChild className="w-full" variant="outline">
                        <Link to="/login">
                            Voltar para o login
                        </Link>
                    </Button>

                    <p className="mt-6 text-sm text-muted-foreground">
                        Não recebeu o email?{" "}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-primary font-medium hover:underline focus:outline-none"
                        >
                            Tentar novamente
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto px-8">
            <div className="lg:hidden mb-8 animate-fade-in">
                <FinTrackLogo size="lg" />
            </div>

            <div className="animate-fade-in">
                <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Voltar para login
                </Link>
            </div>

            <h1
                className="text-3xl font-bold text-foreground mb-2 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
            >
                Recuperar senha
            </h1>
            <p
                className="text-muted-foreground mb-8 animate-fade-in"
                style={{ animationDelay: "0.15s" }}
            >
                Digite seu email para receber as instruções
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    className="space-y-2 animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                >
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                    </Label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-12 h-12 bg-muted/30 border-input transition-all focus:bg-muted/50 focus:scale-[1.01]"
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium group animate-fade-in"
                    style={{ animationDelay: "0.25s" }}
                >
                    Enviar instruções
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
