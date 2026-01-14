import LandingNavbar from "@/components/layout/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, BarChart3, CreditCard } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
            <LandingNavbar />

            <main className="relative pt-32 pb-20">

                {/* Hero Section Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">

                    <div className="animate-fade-in inline-block mb-6">
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold tracking-wide uppercase border border-border">
                            Novidade
                        </span>
                    </div>

                    <h1 className="animate-fade-in text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1] max-w-4xl mx-auto">
                        Potencialize <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-lg transform -rotate-2 shadow-xl">suas</span> <br />
                        Finanças com <span className="text-foreground underline decoration-4 decoration-primary/30 underline-offset-4">FinTrack</span>
                    </h1>

                    <p className="animate-fade-in text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed delay-100">
                        Movimentar dinheiro nunca deveria levar mais do que alguns toques. Transferências são sempre gratuitas entre amigos.
                    </p>

                    <div className="animate-fade-in flex items-center justify-center gap-4 delay-200">
                        <Link to="/signup">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 px-8 text-base font-medium shadow-xl shadow-primary/20 transition-all hover:scale-105">
                                Começar Agora
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="animate-fade-in mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-4xl border-t border-border pt-12 delay-300">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Usuários Satisfeitos</div>
                            <div className="text-4xl font-extrabold text-foreground">75K+</div>
                        </div>

                        {/* Partner Logos Placeholder */}
                        <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="font-bold text-xl flex items-center gap-2"><Zap className="w-5 h-5" /> Raycast</div>
                            <div className="font-bold text-xl flex items-center gap-2"><CreditCard className="w-5 h-5" /> ramp</div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Retorno</div>
                            <div className="text-4xl font-extrabold text-foreground">92%</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features / Value Props Section to match reference layout */}
            <section className="bg-card py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-xs font-bold uppercase mb-6">
                            Nossos Valores
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            A escolha estratégica
                        </h2>
                        <p className="text-lg text-muted-foreground mb-12">
                            Nossa missão é trazer transparência para as finanças e mostrar tudo para você antecipadamente.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Segurança Avançada</h3>
                                    <p className="text-muted-foreground leading-relaxed">Equipes de segurança trabalham para manter seu dinheiro seguro com criptografia avançada.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground shrink-0">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Análise em Tempo Real</h3>
                                    <p className="text-muted-foreground leading-relaxed">Veja para onde seu dinheiro vai com relatórios diários detalhados.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side purple card graphic */}
                    <div className="relative h-[500px] bg-secondary/50 rounded-3xl overflow-hidden flex items-center justify-center">
                        <div className="absolute w-[80%] h-[120%] bg-secondary rounded-full blur-3xl" />
                        {/* Abstract representation of the card/app from reference */}
                        <div className="relative w-64 h-96 bg-[#171717] rounded-2xl shadow-2xl transform rotate-[-12deg] flex flex-col p-6 text-white border-t border-white/20">
                            <div className="flex justify-between items-start mb-12">
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                                <div className="w-12 h-8 rounded bg-white/20" />
                            </div>
                            <div className="mt-auto">
                                <div className="text-2xl font-mono tracking-widest mb-4">•••• ••••</div>
                                <div className="flex justify-between text-sm opacity-60">
                                    <span>IAGO LIMA</span>
                                    <span>12/28</span>
                                </div>
                            </div>
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
