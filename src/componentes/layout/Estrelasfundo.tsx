// EstrelasFundo.tsx
import { useEffect, useRef } from 'react';

interface Estrela {
  x: number;
  y: number;
  raio: number;
  velocidade: number;
  fase: number;
}

export function EstrelasFundo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animationId: number;
    let estrelas: Estrela[] = [];

    function criarEstrelas() {
      const quantidade = Math.floor((canvas!.width * canvas!.height) / 8000);
      estrelas = Array.from({ length: quantidade }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        raio: Math.random() * 1.5 + 0.5,
        velocidade: Math.random() * 0.8 + 0.3, // era 0.05 + 0.01
        fase: Math.random() * Math.PI * 2,
      }));
    }

    function redimensionar() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      criarEstrelas();
    }

    function animar() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      estrelas.forEach((estrela) => {
        estrela.fase += 0.02;
        const brilho = (Math.sin(estrela.fase) + 1) / 2; // efeito de "piscar"

        estrela.y += estrela.velocidade; // deslocamento lento pra baixo
        if (estrela.y > canvas!.height) {
          estrela.y = 0;
          estrela.x = Math.random() * canvas!.width;
        }

        ctx!.beginPath();
        ctx!.arc(estrela.x, estrela.y, estrela.raio, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${0.3 + brilho * 0.7})`;
        ctx!.fill();
      });

      animationId = requestAnimationFrame(animar);
    }

    redimensionar();
    window.addEventListener('resize', redimensionar);
    animar();

    return () => {
      window.removeEventListener('resize', redimensionar);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}