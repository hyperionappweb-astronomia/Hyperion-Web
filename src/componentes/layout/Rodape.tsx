import type { ReactNode } from 'react';
import estilos from './Rodape.module.css';

interface RodapeProps {
  /** Conteúdo a ser renderizado dentro da área azul do rodapé (colunas de links, logo, copyright etc) */
  children?: ReactNode;
}

const BOLHAS = [
  { cx: 0, r: 27.1 },
  { cx: 20.6, r: 36.2 },
  { cx: 47.0, r: 33.0 },
  { cx: 74.9, r: 19.6 },
  { cx: 92.6, r: 19.0 },
  { cx: 109.3, r: 20.0 },
  { cx: 124.0, r: 29.9 },
  { cx: 154.8, r: 21.5 },
  { cx: 171.7, r: 35.6 },
  { cx: 210.1, r: 34.2 },
  { cx: 239.4, r: 45.3 },
  { cx: 272.0, r: 42.0 },
  { cx: 306.3, r: 22.0 },
  { cx: 322.8, r: 26.6 },
  { cx: 350.1, r: 23.1 },
  { cx: 371.6, r: 35.9 },
  { cx: 402.1, r: 33.3 },
  { cx: 426.3, r: 19.7 },
  { cx: 441.7, r: 37.1 },
  { cx: 473.9, r: 26.8 },
  { cx: 499.0, r: 30.7 },
  { cx: 524.1, r: 40.2 },
  { cx: 563.5, r: 24.8 },
  { cx: 586.6, r: 32.7 },
  { cx: 621.0, r: 38.4 },
  { cx: 652.3, r: 45.4 },
  { cx: 686.3, r: 29.7 },
  { cx: 716.0, r: 22.3 },
  { cx: 736.0, r: 19.1 },
  { cx: 754.5, r: 39.4 },
  { cx: 791.1, r: 42.5 },
  { cx: 826.2, r: 37.5 },
  { cx: 861.3, r: 34.2 },
  { cx: 891.5, r: 41.5 },
  { cx: 936.3, r: 31.3 },
  { cx: 966.5, r: 19.7 },
  { cx: 985.8, r: 36.1 },
  { cx: 1025.4, r: 41.0 },
  { cx: 1058.8, r: 28.8 },
  { cx: 1086.7, r: 18.6 },
  { cx: 1103.1, r: 22.7 },
  { cx: 1120.1, r: 19.7 },
  { cx: 1139.9, r: 21.6 },
  { cx: 1157.2, r: 28.9 },
  { cx: 1187.5, r: 20.3 },
  { cx: 1205.3, r: 33.4 },
  { cx: 1240.5, r: 40.9 },
  { cx: 1283.3, r: 25.8 },
  { cx: 1305.7, r: 28.0 },
  { cx: 1335.2, r: 44.8 },
  { cx: 1369.3, r: 22.9 },
  { cx: 1387.5, r: 24.5 },
  { cx: 1409.4, r: 34.5 },
  { cx: 1437.2, r: 18.1 },
  { cx: 1452.9, r: 28.3 },
  { cx: 1479.1, r: 44.7 },
];

const VIEWBOX_LARGURA = 1440;
const VIEWBOX_ALTURA = 140;
const LINHA_BASE = 70; // altura (no viewBox) onde as bolhas encostam no retângulo sólido

export function Rodape({ children }: RodapeProps) {
  return (
    <footer className={estilos.rodape}>
      {/* Topo em formato de bolhas/nuvens */}
      <div className={estilos.ondas}>
        <svg
          viewBox={`0 0 ${VIEWBOX_LARGURA} ${VIEWBOX_ALTURA}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className={estilos.corBolhas}>
            {BOLHAS.map((bolha, index) => (
              <circle key={index} cx={bolha.cx} cy={LINHA_BASE} r={bolha.r} />
            ))}
            <rect x={0} y={LINHA_BASE} width={VIEWBOX_LARGURA} height={VIEWBOX_ALTURA - LINHA_BASE} />
          </g>
        </svg>
      </div>

      {/* Área de conteúdo, mesma cor das bolhas, para continuar sem emenda */}
      <div className={estilos.conteudo}>
        {children ?? (
          <p className={estilos.copyrightPadrao}>
            © {new Date().getFullYear()} Hyperion. Todos os direitos reservados.
          </p>
        )}
      </div>
    </footer>
  );
}