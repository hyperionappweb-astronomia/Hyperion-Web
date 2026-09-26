import { useId } from 'react';

interface PlanetaProps {
  /** Tamanho do planeta em pixels (diâmetro do corpo, sem contar o halo/anel) */
  tamanho?: number;
  /** Ângulo de inclinação do anel, em graus */
  inclinacaoAnel?: number;
  /** Cor inicial do gradiente do corpo (topo) */
  corInicio?: string;
  /** Cor final do gradiente do corpo (base) */
  corFim?: string;
  /** Cor do anel */
  corAnel?: string;
  /** Classe extra do Tailwind, ex: posicionamento absolute/top/right */
  className?: string;
}

export function Planeta({
  tamanho = 280,
  inclinacaoAnel = -20,
  corInicio = '#6C63FF',
  corFim = '#8B3FA0',
  corAnel = '#7B7BFF',
  className = '',
}: PlanetaProps) {
  // useId garante gradientes/filtros únicos mesmo com múltiplos planetas na mesma página
  const id = useId();
  const gradienteId = `planeta-gradiente-${id}`;
  const haloId = `planeta-halo-${id}`;

  // O viewBox tem folga extra (1.8x o tamanho) para caber o halo e os anéis sem cortar
  const viewBox = tamanho * 1.8;
  const centro = viewBox / 2;
  const raioCorpo = tamanho / 2;

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
        {/* Gradiente diagonal do corpo do planeta: azul-arroxeado no topo, magenta na base */}
        <linearGradient id={gradienteId} x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor={corInicio} />
          <stop offset="100%" stopColor={corFim} />
        </linearGradient>

        {/* Halo de brilho suave ao redor do planeta */}
        <radialGradient id={haloId}>
          <stop offset="55%" stopColor={corInicio} stopOpacity="0.18" />
          <stop offset="75%" stopColor={corInicio} stopOpacity="0.08" />
          <stop offset="100%" stopColor={corInicio} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo (camada mais externa, atrás de tudo) */}
      <circle cx={centro} cy={centro} r={raioCorpo * 1.7} fill={`url(#${haloId})`} />

      {/* Borda cinza translúcida (o "anel de contorno" visto na referência) */}
      <circle
        cx={centro}
        cy={centro}
        r={raioCorpo * 1.15}
        fill="none"
        stroke="#9CA3AF"
        strokeOpacity="0.35"
        strokeWidth={tamanho * 0.045}
      />

      {/* Anel elíptico do planeta, desenhado atrás do corpo */}
      <g transform={`rotate(${inclinacaoAnel} ${centro} ${centro})`}>
        <ellipse
          cx={centro}
          cy={centro}
          rx={raioCorpo * 1.9}
          ry={raioCorpo * 0.45}
          fill="none"
          stroke={corAnel}
          strokeOpacity="0.55"
          strokeWidth={tamanho * 0.012}
        />
        <ellipse
          cx={centro}
          cy={centro}
          rx={raioCorpo * 1.75}
          ry={raioCorpo * 0.4}
          fill="none"
          stroke={corAnel}
          strokeOpacity="0.3"
          strokeWidth={tamanho * 0.008}
        />
      </g>

      {/* Corpo do planeta (por cima do anel, cobrindo a parte de trás dele) */}
      <circle cx={centro} cy={centro} r={raioCorpo} fill={`url(#${gradienteId})`} />

      {/* Metade frontal do anel, por cima do corpo, para dar sensação de profundidade 3D */}
      <g transform={`rotate(${inclinacaoAnel} ${centro} ${centro})`}>
        <path
          d={`M ${centro - raioCorpo * 1.9} ${centro}
              A ${raioCorpo * 1.9} ${raioCorpo * 0.45} 0 0 0 ${centro + raioCorpo * 1.9} ${centro}`}
          fill="none"
          stroke={corAnel}
          strokeOpacity="0.7"
          strokeWidth={tamanho * 0.012}
        />
      </g>
    </svg>
  );
}
