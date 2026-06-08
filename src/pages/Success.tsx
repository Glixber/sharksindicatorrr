export default function Success() {
  return (
    <div className="min-h-screen bg-obsidian text-titanium overflow-x-hidden flex items-center justify-center px-6">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="space-y-16">
          {/* Main Heading */}
          <div className="space-y-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-[300] leading-[0.95] tracking-tight">
              <span className="text-white">¡ACCESO</span>
              <br />
              <span className="text-[#6B7DB5]">ACTIVADO!</span>
            </h1>

            <p className="text-base md:text-lg text-titanium/70 leading-relaxed max-w-xl">
              Gracias por tu compra. Tu indicador{' '}
              <span className="text-white font-medium">Sharks-5m</span>{' '}
              estará disponible en tu cuenta de TradingView<br />en unos momentos.
            </p>
          </div>

          {/* Support Box */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 max-w-xl">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-titanium/60">
                SOPORTE TÉCNICO DIRECTO
              </p>

              <p className="text-3xl md:text-4xl font-mono text-white tracking-wide">
                +57 300 000 0000
              </p>

              <p className="text-sm text-titanium/60 leading-relaxed">
                Si en las próximas 5 horas no ves el indicador en tu cuenta,
                nuestro equipo de soporte está listo para asistirte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
