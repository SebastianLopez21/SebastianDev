import React, { useState, useMemo } from 'react';

interface ProyectoTipo {
  id: string;
  nombre: string;
  descripcion: string;
  precioBaseMin: number;
  precioBaseMax: number;
  semanasBase: number;
  icono: string;
}

interface Caracteristica {
  id: string;
  nombre: string;
  costoMin: number;
  costoMax: number;
  diasExtra: number;
}

interface Props {
  whatsappNumero?: string;
  moneda?: string;
}

const PROYECTOS_DEFAULT: ProyectoTipo[] = [
  {
    id: 'landing',
    nombre: 'Landing Page de Alta Conversión',
    descripcion: 'Astro 5 + React, 100 Lighthouse, responsive, animaciones fluidas y captura directa.',
    precioBaseMin: 350,
    precioBaseMax: 650,
    semanasBase: 1,
    icono: '⚡',
  },
  {
    id: 'api',
    nombre: 'API / Microservicio Clean Architecture',
    descripcion: '.NET o FastAPI modular con Neon PostgreSQL, JWT, Swagger y tests unitarios.',
    precioBaseMin: 700,
    precioBaseMax: 1400,
    semanasBase: 2,
    icono: '⚙️',
  },
  {
    id: 'fullstack',
    nombre: 'Sistema Fullstack a la Medida',
    descripcion: 'API REST + Dashboard Angular 22 con Signals + Base de Datos + Docker Compose.',
    precioBaseMin: 1400,
    precioBaseMax: 2800,
    semanasBase: 3,
    icono: '🚀',
  },
  {
    id: 'saas',
    nombre: 'Adaptación de Producto / SaaS',
    descripcion: 'Personalización de sistema pre-construido para tu negocio con despliegue en la nube.',
    precioBaseMin: 1600,
    precioBaseMax: 3500,
    semanasBase: 4,
    icono: '💎',
  },
];

const CARACTERISTICAS_DEFAULT: Caracteristica[] = [
  { id: 'auth', nombre: 'Autenticación JWT & Roles RBAC', costoMin: 200, costoMax: 350, diasExtra: 3 },
  { id: 'pagos', nombre: 'Pasarela de Pagos (Stripe / Wompi)', costoMin: 300, costoMax: 500, diasExtra: 4 },
  { id: 'redis', nombre: 'Caché de Alta Velocidad (Redis con TTL)', costoMin: 150, costoMax: 250, diasExtra: 2 },
  { id: 'stress', nombre: 'Pruebas de Estrés & Benchmarking SLA', costoMin: 200, costoMax: 300, diasExtra: 2 },
  { id: 'docker', nombre: 'Containerización Docker & CI/CD', costoMin: 200, costoMax: 350, diasExtra: 3 },
  { id: 'cloud', nombre: 'Despliegue Cloud (OCI / Producción)', costoMin: 150, costoMax: 250, diasExtra: 2 },
];

export const CotizadorSoftware: React.FC<Props> = ({ whatsappNumero = "+573000000000", moneda = 'USD' }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<string>('fullstack');
  const [caracteristicasActivas, setCaracteristicasActivas] = useState<string[]>([
    'auth',
    'docker',
  ]);

  const proyectoActual = useMemo(
    () => PROYECTOS_DEFAULT.find((p) => p.id === proyectoSeleccionado) || PROYECTOS_DEFAULT[0],
    [proyectoSeleccionado]
  );

  const toggleCaracteristica = (id: string) => {
    setCaracteristicasActivas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculo = useMemo(() => {
    let min = proyectoActual.precioBaseMin;
    let max = proyectoActual.precioBaseMax;
    let diasExtra = 0;

    caracteristicasActivas.forEach((cId) => {
      const c = CARACTERISTICAS_DEFAULT.find((item) => item.id === cId);
      if (c) {
        min += c.costoMin;
        max += c.costoMax;
        diasExtra += c.diasExtra;
      }
    });

    const semanasTotal = proyectoActual.semanasBase + Math.ceil(diasExtra / 5);

    return { min, max, semanasTotal };
  }, [proyectoActual, caracteristicasActivas]);

  const whatsappUrl = useMemo(() => {
    const caracteristicasNombres = caracteristicasActivas
      .map((id) => CARACTERISTICAS_DEFAULT.find((c) => c.id === id)?.nombre)
      .filter(Boolean)
      .join(', ');

    const mensaje = [
      `¡Hola Sebastian! Estuve cotizando un proyecto en tu plataforma web:`,
      ``,
      `📌 *Tipo de Proyecto:* ${proyectoActual.nombre}`,
      `✨ *Funcionalidades:* ${caracteristicasNombres || 'Básicas del paquete'}`,
      `⏱️ *Tiempo Estimado:* ~${calculo.semanasTotal} semanas`,
      `💰 *Presupuesto Estimado:* $${calculo.min} - $${calculo.max} ${moneda}`,
      ``,
      `Me gustaría coordinar una llamada corta para conversar los detalles técnicos.`,
    ].join('\n');

    return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
  }, [proyectoActual, caracteristicasActivas, calculo, whatsappNumero, moneda]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#0F121C] border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 text-slate-100 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-500/30 mb-3">
          Calculadora Transparente
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Cotiza tu Próximo Proyecto de Software
        </h3>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Selecciona la arquitectura y los módulos que necesitas para obtener una estimación de
          tiempo y presupuesto en tiempo real.
        </p>
      </div>

      {/* 1. Selector de Tipo de Proyecto */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
          1. Selecciona el Tipo de Solución
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROYECTOS_DEFAULT.map((p) => {
            const isSelected = p.id === proyectoSeleccionado;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setProyectoSeleccionado(p.id)}
                className={`btn-tactile p-4 rounded-2xl text-left border flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-900/30 ring-1 ring-cyan-400'
                    : 'border-white/[0.08] bg-[#141824]/60 hover:border-white/[0.16] hover:bg-[#141824]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{p.icono}</span>
                    <span className="font-semibold text-white text-sm sm:text-base">{p.nombre}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{p.descripcion}</p>
                </div>
                <div className="mt-3 text-xs font-mono text-cyan-400">
                  Desde ${p.precioBaseMin} {moneda}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selector de Módulos */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
          2. Características y Servicios Adicionales
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CARACTERISTICAS_DEFAULT.map((c) => {
            const isChecked = caracteristicasActivas.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCaracteristica(c.id)}
                className={`btn-tactile p-3 rounded-xl border text-left flex items-center justify-between text-xs ${
                  isChecked
                    ? 'border-cyan-500/60 bg-cyan-950/40 text-white'
                    : 'border-white/[0.08] bg-[#141824]/40 text-slate-400 hover:border-white/[0.14]'
                }`}
              >
                <span>{c.nombre}</span>
                <span
                  className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ml-2 ${
                    isChecked
                      ? 'bg-cyan-500 border-cyan-400 text-black font-bold'
                      : 'border-slate-700'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Resumen y Cierre WhatsApp */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#141824] to-[#0F121C] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Estimación Preliminar
          </span>
          <div className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            ${calculo.min} - ${calculo.max}{' '}
            <span className="text-base font-normal text-slate-400 font-mono">{moneda}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>⏱️ Tiempo estimado: ~{calculo.semanasTotal} semanas</span>
            <span>•</span>
            <span className="text-emerald-400">Arquitectura garantizada</span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide text-center shadow-lg shadow-emerald-500/20 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <span>💬 Conversar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default CotizadorSoftware;
