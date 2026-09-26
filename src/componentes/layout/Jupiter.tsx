import { useId } from 'react';

interface JupiterProps {
  /** Tamanho do planeta em pixels (diâmetro do corpo, sem contar o halo) */
  tamanho?: number;
  /** Classe extra do Tailwind, ex: posicionamento absolute/top/right */
  className?: string;
}

export function Jupiter({ tamanho = 220, className = '' }: JupiterProps) {
  // useId garante gradientes únicos mesmo com múltiplos Júpiteres na mesma página
  const id = useId();
  const baseId = `jupiter-base-${id}`;
  const haloId = `jupiter-halo-${id}`;
  const sombraId = `jupiter-sombra-${id}`;
  const manchaId = `jupiter-mancha-${id}`;
  const clipId = `jupiter-clip-${id}`;

  // viewBox com folga (1.6x) para caber o halo sem cortar
  const viewBox = tamanho * 1.6;
  const centro = viewBox / 2;
  const raio = tamanho / 2;
  // fator de escala para as bandas/mancha, desenhadas originalmente numa esfera de raio 100
  const escala = raio / 100;
  const offset = centro - 100 * escala;

  // Bandas horizontais
  const bandas = [
    { y: 68, altura: 14, cor: '#B9754A', opacidade: 0.65 },
    { y: 90, altura: 12, cor: '#D9A876', opacidade: 0.55 },
    { y: 108, altura: 20, cor: '#8A5230', opacidade: 0.7 },
    { y: 132, altura: 16, cor: '#E8C79A', opacidade: 0.5 },
    { y: 150, altura: 22, cor: '#A9673E', opacidade: 0.75 },
    { y: 176, altura: 16, cor: '#D9A876', opacidade: 0.5 },
    { y: 196, altura: 16, cor: '#8A5230', opacidade: 0.6 },
    { y: 216, altura: 16, cor: '#C9925A', opacidade: 0.5 },
  ];

  return (
    <svg
      width={viewBox}
      height={viewBox}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Cor base */}
        <linearGradient id={baseId} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#E8C79A" />
          <stop offset="50%" stopColor="#C9925A" />
          <stop offset="100%" stopColor="#8A5A34" />
        </linearGradient>

        {/* Halo dourado/bege ao redor do planeta */}
        <radialGradient id={haloId}>
          <stop offset="55%" stopColor="#E8B87A" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#E8B87A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#E8B87A" stopOpacity="0" />
        </radialGradient>

        {/* Sombra sutil no canto inferior direito */}
        <radialGradient id={sombraId} cx="65%" cy="65%">
          <stop offset="45%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>

        {/* Grande Mancha Vermelha */}
        <radialGradient id={manchaId} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#E8654A" />
          <stop offset="100%" stopColor="#A83A2C" />
        </radialGradient>

        {/* Recorte circular para as bandas/mancha não vazarem para fora da esfera */}
        <clipPath id={clipId}>
          <circle cx={centro} cy={centro} r={raio} />
        </clipPath>
      </defs>

      {/* Halo (camada mais externa, atrás de tudo) */}
      <circle cx={centro} cy={centro} r={raio * 1.6} fill={`url(#${haloId})`} />

      {/* Corpo base do planeta */}
      <circle cx={centro} cy={centro} r={raio} fill={`url(#${baseId})`} />

      {/* Bandas horizontais e Grande Mancha Vermelha, recortadas para dentro da esfera */}
      <g clipPath={`url(#${clipId})`}>
        {bandas.map((banda, index) => {
          const y = offset + banda.y * escala;
          const altura = banda.altura * escala;
          const largura = 220 * escala;
          const xInicio = centro - largura / 2;
          // leve curvatura tipo "onda" em cada banda, imitando turbulência atmosférica
          const curva = 6 * escala;
          return (
            <path
              key={index}
              d={`M ${xInicio} ${y + curva}
                  Q ${centro} ${y}, ${xInicio + largura} ${y + curva}
                  L ${xInicio + largura} ${y + curva + altura}
                  Q ${centro} ${y + altura}, ${xInicio} ${y + curva + altura}
                  Z`}
              fill={banda.cor}
              opacity={banda.opacidade}
            />
          );
        })}

        {/* Grande Mancha Vermelha */}
        <ellipse
          cx={offset + 185 * escala}
          cy={offset + 160 * escala}
          rx={30 * escala}
          ry={16 * escala}
          fill={`url(#${manchaId})`}
          opacity="0.9"
          transform={`rotate(-6 ${offset + 185 * escala} ${offset + 160 * escala})`}
        />
        <ellipse
          cx={offset + 185 * escala}
          cy={offset + 160 * escala}
          rx={30 * escala}
          ry={16 * escala}
          fill="none"
          stroke="#7A2E22"
          strokeWidth={1.5 * escala}
          opacity="0.5"
          transform={`rotate(-6 ${offset + 185 * escala} ${offset + 160 * escala})`}
        />
      </g>

      {/* Sombra + borda cinza translúcida, por cima de tudo */}
      <circle cx={centro} cy={centro} r={raio} fill={`url(#${sombraId})`} />
      <circle
        cx={centro}
        cy={centro}
        r={raio}
        fill="none"
        stroke="#9CA3AF"
        strokeOpacity="0.25"
        strokeWidth={tamanho * 0.05}
      />
    </svg>
  );
}
