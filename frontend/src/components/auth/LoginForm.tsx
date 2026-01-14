import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="lg:hidden mb-8 animate-fade-in">
        <FinTrackLogo size="lg" />
      </div>

      <div className="animate-fade-in">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full mb-4">
          Bem-vindo de volta
        </span>
      </div>

      <h1
        className="text-4xl font-bold text-foreground mb-2 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        Acessar conta
      </h1>
      <p
        className="text-muted-foreground mb-8 animate-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        Preencha seus dados para entrar
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
            />
          </div>
        </div>

        <div
          className="space-y-2 animate-fade-in"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </Label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline transition-colors">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 h-12 bg-muted/30 border-input transition-all focus:bg-muted/50 focus:scale-[1.01]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className="flex items-center space-x-2 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Lembrar de mim
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium group animate-fade-in"
          style={{ animationDelay: "0.35s" }}
        >
          Entrar
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <div
        className="mt-6 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button className="flex-1 h-11 rounded-lg border border-input bg-background flex items-center justify-center gap-2 hover:bg-muted transition-all hover:scale-[1.02]">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex-1 h-11 rounded-lg border border-input bg-background flex items-center justify-center gap-2 hover:bg-muted transition-all hover:scale-[1.02]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>
      </div>

      <p
        className="mt-6 text-sm text-center text-muted-foreground animate-fade-in"
        style={{ animationDelay: "0.45s" }}
      >
        Não tem uma conta?{" "}
        <Link to="/signup" className="text-foreground font-medium hover:underline transition-colors">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
