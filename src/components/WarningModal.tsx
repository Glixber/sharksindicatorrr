import { X, AlertTriangle } from 'lucide-react';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WarningModal({ isOpen, onClose, onConfirm }: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#05070A] border border-[#991B1B] rounded-[4px] p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#475569] hover:text-[#E2E8F0] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <AlertTriangle size={28} className="text-[#991B1B]" strokeWidth={1.5} />

          <h2 className="font-display text-[22px] text-[#E2E8F0] text-tracking-wide">
            Antes de continuar
          </h2>

          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Después de pagar serás redirigido a una página única para activar tu acceso.{' '}
            <span className="text-[#E2E8F0]">No la cierres ni la recargues</span>{' '}
            hasta completar el proceso — si lo haces, deberás contactarnos para recuperarlo.
          </p>

          <button
            onClick={onConfirm}
            className="w-full bg-[#991B1B] text-[#E2E8F0] font-mono text-[13px] uppercase tracking-[0.2em] py-4 rounded-[4px] border border-[#991B1B] hover:border-[#DC2626] transition-colors"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
