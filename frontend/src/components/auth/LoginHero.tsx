import FinTrackLogo from "@/components/icons/FinTrackLogo";

const LoginHero = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl overflow-hidden p-8 flex flex-col">
      {/* Large decorative F */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative">
          <span className="text-[18rem] font-bold text-neutral-800 select-none leading-none">
            F
          </span>
        </div>
        
        {/* Diamond accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rotate-45 shadow-lg shadow-amber-500/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto">
        <FinTrackLogo variant="light" size="sm" className="mb-4" />
        
        <h2 className="text-2xl font-bold text-white mb-3">
          Welcome to FinTrack
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-2">
          FinTrack helps you build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today.
        </p>
        <p className="text-neutral-500 text-sm">
          More than 17k people joined us, it's your turn
        </p>

        {/* Feature card */}
        <div className="mt-6 bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-5 max-w-sm border border-neutral-700/50">
          <h3 className="text-white font-semibold text-lg mb-2">
            Get your right job and right place apply now
          </h3>
          <p className="text-neutral-400 text-sm mb-4">
            Be among the first founders to experience the easiest way to start run a business.
          </p>
          
          {/* Avatar group */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-800 flex items-center justify-center text-xs text-white font-medium">
                +2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-20 right-10 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rotate-45" />
      <div className="absolute bottom-16 right-6 w-24 h-px bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent rotate-45" />
    </div>
  );
};

export default LoginHero;
