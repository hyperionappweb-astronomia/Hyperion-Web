import { useId } from 'react';

interface FogueteProps {
  /** Largura de referência do componente em pixels (o SVG usa viewBox fixo 220x320) */
  tamanho?: number;
  /** Ângulo de inclinação do foguete inteiro, em graus */
  rotacao?: number;
  /** Classe extra do Tailwind, ex: posicionamento absolute/top/right */
  className?: string;
}

export function Foguete({ tamanho = 220, rotacao = 0, className = '' }: FogueteProps) {
  // useId garante gradientes únicos mesmo com múltiplas instâncias na mesma página
  const id = useId();
  const corpoId = `foguete-normal-corpo-${id}`;
  const narizId = `foguete-normal-nariz-${id}`;
  const aletaId = `foguete-normal-aleta-${id}`;
  const vidroId = `foguete-normal-vidro-${id}`;
  const chamaId = `foguete-normal-chama-${id}`;
  const haloId = `foguete-normal-halo-${id}`;

  const altura = (tamanho / 220) * 320;

  return (
    <svg
      width={tamanho}
      height={altura}
      viewBox="0 0 220 320"
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Corpo cilíndrico: branco/prata com leve sombreado nas laterais */}
        <linearGradient id={corpoId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8CDD6" />
          <stop offset="50%" stopColor="#F5F7FA" />
          <stop offset="100%" stopColor="#C8CDD6" />
        </linearGradient>

        {/* Nariz cônico vermelho */}
        <linearGradient id={narizId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D42B2B" />
          <stop offset="50%" stopColor="#F04A4A" />
          <stop offset="100%" stopColor="#B01F1F" />
        </linearGradient>

        {/* Aletas vermelhas */}
        <linearGradient id={aletaId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F04A4A" />
          <stop offset="100%" stopColor="#B01F1F" />
        </linearGradient>

        {/* Janela: vidro azul com reflexo */}
        <radialGradient id={vidroId} cx="35%" cy="30%">
          <stop offset="0%" stopColor="#9ED8F5" />
          <stop offset="45%" stopColor="#2E86C1" />
          <stop offset="100%" stopColor="#154360" />
        </radialGradient>

        {/* Chama do propulsor: amarelo -> laranja */}
        <linearGradient id={chamaId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="45%" stopColor="#FFA23F" />
          <stop offset="100%" stopColor="#E8541C" />
        </linearGradient>

        {/* Halo suave ao redor do foguete */}
        <radialGradient id={haloId}>
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform={`rotate(${rotacao} 110 160)`}>
        {/* Halo atrás de tudo */}
        <ellipse cx="110" cy="150" rx="80" ry="120" fill={`url(#${haloId})`} />


        {/* Corpo cilíndrico */}
        <path
          d="M 90 90 L 90 235 C 90 240, 130 240, 130 235 L 130 90 Z"
          fill={`url(#${corpoId})`}
        />

        {/* Faixa vermelha central */}
        <rect x="90" y="150" width="40" height="14" fill="#D42B2B" />

        {/* Nariz cônico */}
        <path d="M 110 20 L 90 90 L 130 90 Z" fill={`url(#${narizId})`} />

        {/* Janela com reflexo */}
        <circle cx="110" cy="118" r="20" fill="#1B2631" />
        <circle cx="110" cy="118" r="16" fill={`url(#${vidroId})`} />
        <circle cx="103" cy="111" r="4.5" fill="#FFFFFF" opacity="0.6" />

        {/* Base/bocal do propulsor */}
        <path d="M 92 235 L 128 235 L 122 250 L 98 250 Z" fill="#8A8F99" />

        {/* Chama do propulsor */}
        <path
          d="M 98 250
             C 92 268, 88 285, 96 305
             C 102 288, 106 275, 110 262
             C 114 275, 118 288, 124 305
             C 132 285, 128 268, 122 250
             Z"
          fill={`url(#${chamaId})`}
        />
      </g>
    </svg>
  );
}
