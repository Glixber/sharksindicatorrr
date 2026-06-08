interface AnimatedDiamondProps {
  size?: number;
  glowColor?: 'purple' | 'cyan';
}

export default function AnimatedDiamond({ size = 120, glowColor = 'purple' }: AnimatedDiamondProps) {
  const glowClass = glowColor === 'purple' ? 'glow-accent' : 'glow-cyan';

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative ${glowClass}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animation: 'float 6s ease-in-out infinite, rotate 20s linear infinite'
        }}
      >
        <div className="absolute inset-0 glassmorphism border border-white/10 transform rotate-45"
          style={{
            boxShadow: glowColor === 'purple'
              ? 'inset 0 0 30px rgba(139, 92, 246, 0.1)'
              : 'inset 0 0 30px rgba(34, 211, 238, 0.1)'
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
