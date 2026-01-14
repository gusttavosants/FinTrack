import { Suspense } from "react";
import FinTrackLogo from "@/components/icons/FinTrackLogo";
import FloatingShapes from "@/components/3d/FloatingShapes";
import { TrendingUp, Shield, Zap } from "lucide-react";

const SignupHero = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-neutral-900/20 dark:shadow-white/10 ring-1 ring-neutral-900/5 dark:ring-white/10">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col p-8">
        {/* Logo */}
        <div className="animate-fade-in">
          <FinTrackLogo variant="light" size="sm" />
        </div>

        {/* Main text */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full mb-6 border border-amber-500/30">
              ✨ Nova experiência financeira
            </span>
          </div>

          <h2
            className="text-5xl font-bold text-white mb-4 leading-tight animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Finanças
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              simplificadas
            </span>
          </h2>

          <p
            className="text-neutral-400 text-lg leading-relaxed max-w-sm animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Controle total sobre seus gastos, investimentos e metas financeiras em uma interface intuitiva.
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 mb-6 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50k+</div>
            <div className="text-xs text-neutral-500">Usuários</div>
          </div>
          <div className="text-center border-x border-neutral-800">
            <div className="text-2xl font-bold text-white">R$2M+</div>
            <div className="text-xs text-neutral-500">Gerenciados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9★</div>
            <div className="text-xs text-neutral-500">Avaliação</div>
          </div>
        </div>

        {/* Features */}
        <div
          className="flex gap-3 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-full border border-neutral-700/50">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-neutral-300">Analytics</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-full border border-neutral-700/50">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-neutral-300">Seguro</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-full border border-neutral-700/50">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-neutral-300">Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupHero;
