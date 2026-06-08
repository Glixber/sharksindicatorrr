import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Hexagon, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type PageState = 'loading' | 'form' | 'error' | 'already-used' | 'processing';

export default function Claim() {
  const { session_id } = useParams<{ session_id: string }>();
  const navigate = useNavigate();

  const [pageState, setPageState] = useState<PageState>('loading');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [randomValue, setRandomValue] = useState('VAL_001');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    const valueInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 999);
      setRandomValue(`VAL_${randomNum.toString().padStart(3, '0')}`);
    }, 200);

    const timer = setTimeout(() => {
      verifyPurchase();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(valueInterval);
    };
  }, []);

  const verifyPurchase = async (attempt = 1) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('session_id', session_id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        if (attempt < 3) {
          setTimeout(() => verifyPurchase(attempt + 1), 3000);
        } else {
          setPageState('error');
        }
        return;
      }

      if (data.used) {
        setPageState('already-used');
      } else {
        setPageState('form');
      }
    } catch (error) {
      console.error('Error verifying purchase:', error);
      if (attempt < 3) {
        setTimeout(() => verifyPurchase(attempt + 1), 3000);
      } else {
        setPageState('error');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Por favor ingresa tu usuario de TradingView');
      return;
    }

    setPageState('processing');

    try {
      const controller1 = new AbortController();
      const timeout1 = setTimeout(() => controller1.abort(), 10000);

      const verifyResponse = await fetch(
        'https://sswebhook.glixberai.site/webhook/48e5b419-e179-4bb9-a2a9-4160f4685e4c',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim() }),
          signal: controller1.signal,
        }
      );
      clearTimeout(timeout1);

      const verifyData = await verifyResponse.json();

      if (!verifyData.exists && verifyData.exists !== undefined) {
        setErrorMessage('Usuario no encontrado en TradingView. Verifica que esté escrito correctamente.');
        setPageState('form');
        return;
      }

      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 10000);

      await fetch(
        'https://sswebhook.glixberai.site/webhook/1c111877-f678-4d7e-8a61-7214c8454482',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username.trim(),
            session_id: session_id,
          }),
          signal: controller2.signal,
        }
      );
      clearTimeout(timeout2);

      const { error } = await supabase
        .from('purchases')
        .update({
          tradingview_username: username.trim(),
          used: true,
          access_granted: true,
        })
        .eq('session_id', session_id);

      if (error) throw error;

      navigate(`/claim/${session_id}/success`);
    } catch (error) {
      console.error('Error activating access:', error);
      setErrorMessage('Hubo un error al activar tu acceso. Por favor intenta nuevamente.');
      setPageState('form');
    }
  };

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-obsidian text-titanium overflow-x-hidden">
        {/* Background Grid */}
        <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            {/* Blue Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent-blue/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative mb-16">
              <div
                className="w-[140px] h-[140px] border border-accent-blue/30 transform rotate-45"
                style={{
                  boxShadow: '0 0 60px rgba(75, 89, 157, 0.2), inset 0 0 40px rgba(75, 89, 157, 0.1)',
                  animation: 'pulse 2.5s ease-in-out infinite',
                }}
              />
            </div>

            <p className="font-serif text-2xl text-platinum mb-2 tracking-tight">Por favor espera un momento...</p>
            <p className="font-sans text-sm text-titanium/60">Verificando tu pago</p>
          </div>

          {/* Warning Footer */}
          <div className="relative z-10 w-full border-t border-white/10 px-8 py-6 bg-obsidian/80 backdrop-blur-sm">
            <p className="text-sm text-platinum text-center font-light">
              No cierres esta página hasta completar el proceso
            </p>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% {
                opacity: 0.6;
                transform: rotate(45deg) scale(1);
              }
              50% {
                opacity: 1;
                transform: rotate(45deg) scale(1.05);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-obsidian text-titanium overflow-x-hidden">
        <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
          <div className="text-center max-w-md space-y-6">
            <h2 className="font-serif text-4xl text-platinum font-light leading-tight">
              No pudimos verificar tu pago
            </h2>
            <p className="text-sm text-titanium leading-relaxed">
              Contáctanos al{' '}
              <span className="text-accent-blue font-medium">+57 300 000 0000</span>{' '}
              indicando el email con que pagaste.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'already-used') {
    return (
      <div className="min-h-screen bg-obsidian text-titanium overflow-x-hidden">
        <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
          <div className="text-center max-w-md space-y-6">
            <h2 className="font-serif text-4xl text-platinum font-light leading-tight">
              Este acceso ya fue activado
            </h2>
            <p className="text-sm text-titanium leading-relaxed">
              Si crees que es un error, contáctanos al{' '}
              <span className="text-accent-blue font-medium">+57 300 000 0000</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-titanium overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-12">
        <div className="w-full max-w-[480px] space-y-12">
          {/* Blue Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative text-center space-y-4">
            <div className="flex justify-center mb-8">
              <Hexagon
                size={64}
                strokeWidth={1}
                className="text-accent-blue/40"
              />
            </div>

            <h1 className="font-serif text-5xl md:text-6xl text-platinum font-light leading-tight tracking-tight">
              ACTIVA TU ACCESO
            </h1>
            <p className="text-sm text-titanium/60 max-w-md mx-auto leading-relaxed">
              Ingresa tu nombre de usuario de TradingView para recibir acceso al indicador
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-3">
              <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-titanium/50 block">
                USUARIO DE TRADINGVIEW
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Jhon123"
                disabled={pageState === 'processing'}
                className="w-full bg-white/5 border border-white/10 text-titanium text-base py-4 px-5 focus:border-accent-blue focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
              />
              {errorMessage && (
                <p className="text-sm text-red-400 mt-2">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pageState === 'processing'}
              className="w-full bg-accent-blue/80 hover:bg-accent-blue text-white font-sans text-xs font-bold uppercase tracking-[0.25em] py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {pageState === 'processing' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  VINCULANDO...
                </>
              ) : (
                'ACTIVAR ACCESO'
              )}
            </button>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowTutorial(!showTutorial)}
                className="flex items-center gap-2 text-sm text-titanium/60 hover:text-titanium transition-colors w-full"
              >
                ¿Dónde encuentro mi usuario?
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${showTutorial ? 'rotate-180' : ''}`}
                />
              </button>

              {showTutorial && (
                <div className="mt-4 text-sm text-titanium/70 leading-relaxed space-y-2 pl-4 border-l border-white/10">
                  <p>1. Abre TradingView en tu navegador</p>
                  <p>2. Haz click en tu foto de perfil (esquina superior derecha)</p>
                  <p>3. Tu usuario aparece debajo de tu nombre como @usuario</p>
                  <p className="text-xs text-titanium/50">Ingresa solo el texto sin el símbolo @</p>
                </div>
              )}
            </div>
          </form>

          <p className="text-sm text-titanium/50 text-center">
            ¿Problemas? Escríbenos al{' '}
            <span className="text-accent-blue font-medium">+57 300 000 0000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
