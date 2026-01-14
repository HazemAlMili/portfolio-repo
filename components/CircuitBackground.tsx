'use client';

import React, { useEffect, useRef, useState } from 'react';
import '../styles/CircuitBackground.css';

interface Point {
  x: number;
  y: number;
}

interface CircuitPath {
  points: Point[];
  color: string;
  hasNodes: boolean;
}

interface DataPacket {
  pathIndex: number;
  progress: number;
  speed: number;
  intensity: number;
}

interface MouseInfluence {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathsRef = useRef<CircuitPath[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const mouseRef = useRef<MouseInfluence>({ x: -1000, y: -1000, radius: 180, strength: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isVisibleRef = useRef<boolean>(true);
  const lastFrameTimeRef = useRef<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to true, will fix on mount
  const [mounted, setMounted] = useState(false);

  // Performance settings based on device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  // Color palette based on theme
  const getColors = (isDark: boolean) => {
    if (isDark) {
      return {
        trace: '#4a6b8a',      // Light blue-gray for traces
        traceLight: '#6b8caf', // Lighter variant
        node: '#d4a574',       // Golden nodes
        nodeGlow: '#ffd700',   // Bright gold glow
        packet: '#ffa500',     // Orange-gold packets
      };
    } else {
      return {
        trace: '#5a7a9a',      // Darker blue-gray for traces in light mode
        traceLight: '#7a9abf', // Darker variant for light mode
        node: '#b48654',       // Darker golden nodes
        nodeGlow: '#c9a000',   // Darker gold glow
        packet: '#d08500',     // Darker orange-gold packets
      };
    }
  };

  const colors = getColors(isDarkMode);

  useEffect(() => {
    setIsClient(true);
    
    // Check theme immediately on mount
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    setMounted(true);
    
    // Watch for theme changes thereafter
    const observer = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(currentIsDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Better performance
      willReadFrequently: false,
    });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size with device pixel ratio for sharp rendering
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Generate Manhattan-style circuit paths (optimized for mobile)
    const generateManhattanPaths = () => {
      const paths: CircuitPath[] = [];
      const margin = 50;
      const spacing = isMobile ? 100 : 80; // Wider spacing on mobile
      const maxPaths = isMobile ? 15 : 30; // Fewer paths on mobile

      let pathCount = 0;

      // Generate horizontal paths
      const numHorizontalPaths = Math.min(
        Math.floor((height - 2 * margin) / spacing),
        Math.floor(maxPaths * 0.6)
      );

      for (let i = 0; i < numHorizontalPaths && pathCount < maxPaths; i++) {
        const y = margin + i * spacing + (Math.random() - 0.5) * 30;
        const points: Point[] = [];
        
        let x = margin + Math.random() * 100;
        const segments = isMobile ? 2 : 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < segments; j++) {
          points.push({ x, y });
          
          const horizontalLength = 100 + Math.random() * 200;
          x += horizontalLength;
          points.push({ x, y });
          
          if (j < segments - 1 && Math.random() > 0.3) {
            const verticalLength = (Math.random() - 0.5) * 100;
            const newY = y + verticalLength;
            points.push({ x, y: newY });
            
            const continueH = 50 + Math.random() * 100;
            x += continueH;
            points.push({ x, y: newY });
            points.push({ x, y });
          }
        }

        paths.push({
          points,
          color: Math.random() > 0.5 ? colors.trace : colors.traceLight,
          hasNodes: Math.random() > 0.3,
        });
        pathCount++;
      }

      // Generate vertical paths
      const numVerticalPaths = Math.min(
        Math.floor((width - 2 * margin) / (spacing * 1.5)),
        maxPaths - pathCount
      );

      for (let i = 0; i < numVerticalPaths && pathCount < maxPaths; i++) {
        const x = margin + i * spacing * 1.5 + (Math.random() - 0.5) * 40;
        const points: Point[] = [];
        
        let y = margin + Math.random() * 100;
        const segments = isMobile ? 2 : 2 + Math.floor(Math.random() * 2);
        
        for (let j = 0; j < segments; j++) {
          points.push({ x, y });
          
          const verticalLength = 100 + Math.random() * 200;
          y += verticalLength;
          points.push({ x, y });
          
          if (j < segments - 1 && Math.random() > 0.4) {
            const horizontalLength = (Math.random() - 0.5) * 120;
            const newX = x + horizontalLength;
            points.push({ x: newX, y });
            
            const continueV = 50 + Math.random() * 100;
            y += continueV;
            points.push({ x: newX, y });
            points.push({ x, y });
          }
        }

        paths.push({
          points,
          color: Math.random() > 0.5 ? colors.trace : colors.traceLight,
          hasNodes: Math.random() > 0.4,
        });
        pathCount++;
      }

      pathsRef.current = paths;
    };

    // Initialize data packets (fewer on mobile)
    const initializePackets = () => {
      const packets: DataPacket[] = [];
      const packetCount = isMobile ? 6 : 12;

      for (let i = 0; i < packetCount; i++) {
        packets.push({
          pathIndex: Math.floor(Math.random() * pathsRef.current.length),
          progress: Math.random(),
          speed: 0.0015 + Math.random() * 0.0025,
          intensity: 0.7 + Math.random() * 0.3,
        });
      }

      packetsRef.current = packets;
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        generateManhattanPaths();
        initializePackets();
      }, 150);
    };

    // Mouse handlers with passive listeners for better scroll performance
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.strength = 1;
    };

    const handleMouseLeave = () => {
      mouseRef.current.strength = 0;
    };

    // Visibility change handler to pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current && !animationFrameRef.current) {
        lastFrameTimeRef.current = performance.now();
        animate();
      }
    };

    // Optimized mouse influence calculation
    const getMouseInfluence = (x: number, y: number): number => {
      const mouse = mouseRef.current;
      if (mouse.strength < 0.01) return 0;

      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const distSquared = dx * dx + dy * dy;
      const radiusSquared = mouse.radius * mouse.radius;

      if (distSquared > radiusSquared) return 0;

      return (1 - Math.sqrt(distSquared) / mouse.radius) * mouse.strength;
    };

    // Get point on path (cached calculations)
    const pointCache = new Map<string, { point: Point; totalLength: number; segmentLengths: number[] }>();
    
    const getPointOnPath = (path: CircuitPath, progress: number): Point => {
      const points = path.points;
      if (points.length < 2) return points[0] || { x: 0, y: 0 };

      const cacheKey = points.map(p => `${p.x},${p.y}`).join('|');
      let cached = pointCache.get(cacheKey);

      if (!cached) {
        let totalLength = 0;
        const segmentLengths: number[] = [];
        
        for (let i = 0; i < points.length - 1; i++) {
          const dx = points[i + 1].x - points[i].x;
          const dy = points[i + 1].y - points[i].y;
          const length = Math.sqrt(dx * dx + dy * dy);
          segmentLengths.push(length);
          totalLength += length;
        }

        cached = { point: points[0], totalLength, segmentLengths };
        pointCache.set(cacheKey, cached);
      }

      const targetLength = progress * cached.totalLength;
      let currentLength = 0;

      for (let i = 0; i < cached.segmentLengths.length; i++) {
        if (currentLength + cached.segmentLengths[i] >= targetLength) {
          const segmentProgress = (targetLength - currentLength) / cached.segmentLengths[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          
          return {
            x: p1.x + (p2.x - p1.x) * segmentProgress,
            y: p1.y + (p2.y - p1.y) * segmentProgress,
          };
        }
        currentLength += cached.segmentLengths[i];
      }

      return points[points.length - 1];
    };

    // Optimized drawing functions
    const drawPath = (path: CircuitPath) => {
      const points = path.points;
      if (points.length < 2) return;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const midX = (p1.x + p2.x) * 0.5;
        const midY = (p1.y + p2.y) * 0.5;
        const influence = getMouseInfluence(midX, midY);

        const baseAlpha = 0.25;

        // Only draw glow if there's influence
        if (influence > 0.1) {
          ctx.strokeStyle = path.color;
          ctx.lineWidth = 2 + influence * 3;
          ctx.globalAlpha = influence * 0.12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Core line
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 0.8 + influence * 0.4;
        ctx.globalAlpha = baseAlpha + influence * 0.4;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw nodes (batch drawing for better performance)
      if (path.hasNodes) {
        ctx.fillStyle = colors.node;
        points.forEach((point) => {
          const influence = getMouseInfluence(point.x, point.y);
          
          // Only draw glow for nodes with significant influence
          if (influence > 0.2) {
            const nodeSize = 2 + influence * 2;
            const glowSize = 6 + influence * 8;

            const gradient = ctx.createRadialGradient(
              point.x, point.y, 0,
              point.x, point.y, glowSize
            );
            gradient.addColorStop(0, colors.nodeGlow);
            gradient.addColorStop(0.5, colors.node);
            gradient.addColorStop(1, 'rgba(212, 165, 116, 0)');

            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.3 + influence * 0.5;
            ctx.beginPath();
            ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = colors.node;
            ctx.globalAlpha = 0.6 + influence * 0.4;
            ctx.beginPath();
            ctx.arc(point.x, point.y, nodeSize, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Simple node without glow
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      ctx.globalAlpha = 1;
    };

    const drawPacket = (packet: DataPacket) => {
      const path = pathsRef.current[packet.pathIndex];
      if (!path) return;

      const point = getPointOnPath(path, packet.progress);
      const influence = getMouseInfluence(point.x, point.y);
      
      const size = 2.5 + influence * 2;
      const glowSize = 8 + influence * 10;
      const intensity = packet.intensity + influence * 0.3;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, glowSize
      );
      gradient.addColorStop(0, colors.nodeGlow);
      gradient.addColorStop(0.4, colors.packet);
      gradient.addColorStop(1, 'rgba(255, 165, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = intensity * 0.6;
      ctx.beginPath();
      ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = intensity * 0.9;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
    };

    // Animation loop with FPS throttling
    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = undefined;
        return;
      }

      const now = performance.now();
      const elapsed = now - lastFrameTimeRef.current;

      // Throttle to target FPS
      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = now - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);

      // Draw all paths
      pathsRef.current.forEach((path) => {
        drawPath(path);
      });

      // Update and draw packets
      packetsRef.current.forEach((packet) => {
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.pathIndex = Math.floor(Math.random() * pathsRef.current.length);
          packet.speed = 0.0015 + Math.random() * 0.0025;
        }

        drawPacket(packet);
      });

      // Fade mouse influence
      if (mouseRef.current.strength > 0) {
        mouseRef.current.strength *= 0.96;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    generateManhattanPaths();
    initializePackets();

    // Event listeners with proper options for performance
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    lastFrameTimeRef.current = performance.now();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      pointCache.clear();
    };
  }, [isClient, isMobile, isDarkMode, colors, frameInterval]);

  if (!isClient || !mounted) {
    return null;
  }

  return (
    <div className="circuit-background">
      <canvas ref={canvasRef} className="circuit-canvas" />
      <div className="circuit-overlay"></div>
    </div>
  );
};

export default CircuitBackground;
