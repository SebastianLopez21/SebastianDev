import React, { useState, useRef, useEffect } from 'react';

interface OutputLine {
  id: string;
  type: 'command' | 'system' | 'success' | 'error' | 'table';
  content: string | React.ReactNode;
}

export const CyberCommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cli' | 'benchmark' | 'arch'>('cli');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'Sebastian Architecture CLI [Version 2.4.0-release]'
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Escribe un comando o haz clic en los accesos rápidos:'
    }
  ]);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBenchmarking]);

  const executeCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory: OutputLine[] = [
      ...history,
      { id: `cmd-${Date.now()}`, type: 'command', content: `❯ ${cmdStr}` }
    ];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'table',
          content: (
            <div className="space-y-1 text-slate-300">
              <div>Comandos disponibles:</div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div><span className="text-cyan-400 font-bold">benchmark</span> : Ejecutar prueba de carga y latencia</div>
                <div><span className="text-cyan-400 font-bold">stack</span> : Arsenal de tecnologías y patrones</div>
                <div><span className="text-cyan-400 font-bold">proyectos</span> : Ver catálogo de productos adaptables</div>
                <div><span className="text-cyan-400 font-bold">cotizar</span> : Ir al cotizador de presupuesto</div>
                <div><span className="text-cyan-400 font-bold">whatsapp</span> : Abrir canal directo a WhatsApp</div>
                <div><span className="text-cyan-400 font-bold">clear</span> : Limpiar pantalla de consola</div>
              </div>
            </div>
          )
        });
        setHistory(newHistory);
        break;

      case 'benchmark':
        setHistory(newHistory);
        runBenchmarkTest();
        break;

      case 'stack':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'table',
          content: (
            <div className="space-y-2 text-xs">
              <div className="text-cyan-400 font-bold">⚡ STACK Y ARQUITECTURA VERIFICADA:</div>
              <div className="space-y-1 text-slate-300">
                <div>• <strong className="text-white">.NET 9 Clean Arch:</strong> Dominio puro, Casos de uso atómicos, MediatR</div>
                <div>• <strong className="text-white">Angular 22 Signals:</strong> ChangeDetection OnPush, reactividad sin zone.js</div>
                <div>• <strong className="text-white">Astro 5 + React 19:</strong> Islas estáticas, 100/100 Lighthouse score</div>
                <div>• <strong className="text-white">Neon PostgreSQL:</strong> Schemas 3FN, índices en claves foráneas, cero N+1</div>
                <div>• <strong className="text-white">Docker Multi-Stage:</strong> Contenedores ultraligeros &lt;35MB en Oracle Cloud</div>
              </div>
            </div>
          )
        });
        setHistory(newHistory);
        break;

      case 'proyectos':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'table',
          content: (
            <div className="space-y-2 text-xs">
              <div className="text-emerald-400 font-bold">📦 PRODUCTOS A LA MEDIDA DISPONIBLES:</div>
              <div className="space-y-1 text-slate-300">
                <div>1. <strong className="text-cyan-300">MyLife:</strong> SaaS de productividad y hábitos (.NET 9 + Angular 22 Signals)</div>
                <div>2. <strong className="text-cyan-300">PARCHA2:</strong> Microservicios para eventos masivos (Django + Express + OCI)</div>
                <div>3. <strong className="text-cyan-300">EcoRed:</strong> Trazabilidad e impacto sustentable (Clean Arch + Redis)</div>
                <div>4. <strong className="text-cyan-300">Landing Kit:</strong> Motor Astro 5 de ultra-conversión (Entrega en 48h)</div>
              </div>
              <div className="text-slate-400 text-[11px] pt-1">
                Escribe <span className="text-cyan-400 font-mono">cotizar</span> para calcular tu inversión personalizada.
              </div>
            </div>
          )
        });
        setHistory(newHistory);
        break;

      case 'cotizar':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: 'Desplazando al Cotizador Interactivo de Software...'
        });
        setHistory(newHistory);
        setTimeout(() => {
          document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;

      case 'whatsapp':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: 'Conectando con Sebastian vía WhatsApp...'
        });
        setHistory(newHistory);
        window.open('https://wa.me/573000000000?text=Hola%20Sebastian,%20prob%C3%A9%20tu%20terminal%20interactiva%20y%20quiero%20conversar%20sobre%20un%20proyecto', '_blank');
        break;

      case 'clear':
        setHistory([]);
        break;

      default:
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'error',
          content: `Comando no reconocido: '${cmdStr}'. Escribe 'help' para ver las opciones disponibles.`
        });
        setHistory(newHistory);
        break;
    }

    setInputVal('');
  };

  const runBenchmarkTest = () => {
    setIsBenchmarking(true);
    setBenchmarkProgress(10);

    const step1 = setTimeout(() => {
      setBenchmarkProgress(45);
    }, 400);

    const step2 = setTimeout(() => {
      setBenchmarkProgress(85);
    }, 900);

    const step3 = setTimeout(() => {
      setBenchmarkProgress(100);
      setIsBenchmarking(false);
      setHistory((prev) => [
        ...prev,
        {
          id: `bm-${Date.now()}`,
          type: 'table',
          content: (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-1.5 font-mono">
              <div className="text-cyan-300 font-bold flex items-center justify-between">
                <span>✔ BENCHMARK HTTP CONCURRENTE COMPLETADO</span>
                <span className="text-emerald-400">10,000 req / 0% errores</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-slate-300 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 block">Latencia p50:</span>
                  <span className="text-emerald-400 font-bold text-sm">18.4 ms</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 block">Latencia p95:</span>
                  <span className="text-cyan-300 font-bold text-sm">41.8 ms</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 block">Tasa de Error:</span>
                  <span className="text-emerald-400 font-bold text-sm">0.00%</span>
                </div>
              </div>
            </div>
          )
        }
      ]);
    }, 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="spotlight-card rounded-3xl p-5 sm:p-7 shadow-2xl relative border border-white/10 flex flex-col h-[520px]"
    >
      {/* Barra de Ventana macOS / Terminal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
        {/* Controles de semáforo */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
          <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
            sebastian@architect:~ (zsh)
          </span>
        </div>

        {/* Pestañas de Vista */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-mono">
          <button
            onClick={() => setActiveTab('cli')}
            className={`btn-tactile px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'cli'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal CLI
          </button>
          <button
            onClick={() => {
              setActiveTab('benchmark');
              runBenchmarkTest();
            }}
            className={`btn-tactile px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'benchmark'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SLA Test
          </button>
          <button
            onClick={() => setActiveTab('arch')}
            className={`btn-tactile px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'arch'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Capas 3D
          </button>
        </div>

        {/* Status SLA */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ONLINE: 99.99%</span>
        </div>
      </div>

      {/* Barra de Acceso Rápido a Comandos (Chips Táctiles) */}
      <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-white/[0.04]">
        <span className="text-[10px] font-mono uppercase text-slate-500">Ejecutar:</span>
        <button
          onClick={() => executeCommand('benchmark')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/60"
        >
          ⚡ benchmark
        </button>
        <button
          onClick={() => executeCommand('stack')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08]"
        >
          🛠️ stack
        </button>
        <button
          onClick={() => executeCommand('proyectos')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08]"
        >
          💼 proyectos
        </button>
        <button
          onClick={() => executeCommand('cotizar')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60"
        >
          💰 cotizar
        </button>
        <button
          onClick={() => executeCommand('whatsapp')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08]"
        >
          💬 whatsapp
        </button>
        <button
          onClick={() => executeCommand('clear')}
          className="btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.02] text-slate-500 hover:text-slate-300 ml-auto"
        >
          clear
        </button>
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'cli' && (
        <div className="flex-1 overflow-y-auto font-mono text-xs space-y-3 pr-2 scrollbar-thin">
          {history.map((line) => (
            <div key={line.id} className="leading-relaxed">
              {line.type === 'command' && (
                <span className="text-cyan-400 font-bold">{line.content}</span>
              )}
              {line.type === 'system' && (
                <span className="text-slate-400">{line.content}</span>
              )}
              {line.type === 'success' && (
                <span className="text-emerald-400 font-medium">{line.content}</span>
              )}
              {line.type === 'error' && (
                <span className="text-rose-400 font-medium">{line.content}</span>
              )}
              {line.type === 'table' && line.content}
            </div>
          ))}

          {isBenchmarking && (
            <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex justify-between text-[11px] text-cyan-300">
                <span>Inyectando carga HTTP concurrente...</span>
                <span>{benchmarkProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${benchmarkProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>
      )}

      {activeTab === 'benchmark' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
          <div className="text-5xl font-black font-mono text-emerald-400 tracking-tight">
            &lt; 42ms
          </div>
          <div className="text-sm text-slate-300 font-medium">
            Latencia p95 bajo 10,000 conexiones concurrentes
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-slate-400 text-[10px]">THROUGHPUT</div>
              <div className="text-white font-bold text-sm">4,850 RPS</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-slate-400 text-[10px]">HTTP 500</div>
              <div className="text-emerald-400 font-bold text-sm">0.00%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-slate-400 text-[10px]">CACHE HIT</div>
              <div className="text-cyan-300 font-bold text-sm">98.4%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-slate-400 text-[10px]">MEMORY LEAK</div>
              <div className="text-emerald-400 font-bold text-sm">0.0 MB</div>
            </div>
          </div>
          <button
            onClick={runBenchmarkTest}
            className="btn-tactile px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Re-ejecutar Test Concurrente
          </button>
        </div>
      )}

      {activeTab === 'arch' && (
        <div className="flex-1 flex flex-col justify-center space-y-3 p-4 font-mono text-xs">
          <div className="text-cyan-300 font-bold text-center mb-1">
            ARQUITECTURA DE CAPAS PURA (CLEAN ARCHITECTURE)
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
            <span className="text-cyan-400 font-bold">1. Capa Dominio (Domain Core):</span>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Entidades y reglas de negocio puras. Cero frameworks, cero ORMs, cero dependencias web.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
            <span className="text-indigo-400 font-bold">2. Capa Aplicación (Use Cases):</span>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Commands / Queries desacoplados, DTOs de minimización de datos y validadores FluentValidation.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-emerald-400 font-bold">3. Infraestructura & API:</span>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Neon PostgreSQL con índices FK, Redis TTL, endpoints REST tipados OpenAPI y Docker multi-stage.
            </p>
          </div>
        </div>
      )}

      {/* Input de comandos (Prompt interactivo estilo ZSH) */}
      <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center gap-2 font-mono text-xs">
        <span className="text-cyan-400 font-bold">❯</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe 'help', 'benchmark', 'stack'..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none font-mono text-xs"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="btn-tactile px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs"
        >
          Ejecutar
        </button>
      </div>
    </div>
  );
};

export default CyberCommandCenter;
