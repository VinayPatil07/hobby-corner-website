export const PhotoGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-12 gap-4 h-[600px]">
        <div className="col-span-8 bg-muted-cerulean relative overflow-hidden group">
          <div className="absolute inset-0 bg-navy-base/20 group-hover:bg-transparent transition-all duration-500" />
          <div className="absolute bottom-8 left-8 z-10">
            <span className="bg-tangerine-accent text-navy-base px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Model Kits
            </span>
          </div>
          <div className="w-full h-full border-4 border-navy-base flex items-center justify-center text-soft-gray-blue font-serif italic">
            [Macro Image: 1/48 Scale Jet Details]
          </div>
        </div>

        <div className="col-span-4 grid grid-rows-2 gap-4">
          <div className="bg-white border-4 border-navy-base relative -ml-12 mt-12 z-20 shadow-2xl flex items-center justify-center text-muted-cerulean font-serif italic p-4 text-center">
            [Action Shot: BattleTech Session]
          </div>
          <div className="bg-navy-base relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-warm-coral font-serif italic">
              [Macro Image: RC Chassis Wiring]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};