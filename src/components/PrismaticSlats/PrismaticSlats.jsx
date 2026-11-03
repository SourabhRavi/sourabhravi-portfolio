import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_active;
uniform float u_time;
uniform vec3 u_primary;
uniform vec3 u_secondary;
uniform float u_angle;
uniform float u_flutes;
uniform float u_refraction;
uniform float u_aberration;
uniform float u_softness;
uniform float u_wave;
uniform float u_wave_frequency;
uniform float u_drift;
uniform float u_highlight;
uniform float u_highlight_softness;
uniform float u_light_angle;
uniform float u_intensity;
uniform float u_grain;
uniform float u_speed;
uniform float u_autoplay;
uniform float u_interactive;
uniform float u_paused;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv * 2.0 - 1.0);
  p.x *= aspect;

  float time = u_time * u_speed * (1.0 - u_paused);
  float angle = radians(u_angle);
  vec2 axis = vec2(cos(angle), sin(angle));
  vec2 crossAxis = vec2(-axis.y, axis.x);
  vec2 q = vec2(dot(p, axis), dot(p, crossAxis));

  vec2 autoPoint = vec2(
    sin(time * 0.19) * aspect * 0.58,
    cos(time * 0.14 + 1.1) * 0.55
  );
  float autoGlow = exp(-length(p - autoPoint) * 2.6) * u_autoplay;
  float pointerGlow = exp(-length(p - u_pointer) * 3.3) * u_pointer_active * u_interactive;
  float pour = max(autoGlow * 0.48, pointerGlow);

  float fluidA = sin(q.x * 2.1 + time * 0.22 + sin(q.y * 2.4 - time * 0.13));
  float fluidB = cos(q.y * 3.3 - time * 0.17 + sin(q.x * 2.8 + time * 0.1));
  float fluidC = noise(q * 2.1 + vec2(time * 0.045, -time * 0.035));
  float fluid = fluidA * 0.34 + fluidB * 0.24 + (fluidC - 0.5) * 0.72;
  fluid += pour * 1.55;

  float wave = sin(
    q.y * u_wave_frequency * 3.0
    + time * 0.28
    + sin(q.y * 1.45 + time * 0.11)
  ) * u_wave;
  float fluteX = (q.x + wave + u_drift * time * 0.025) * u_flutes * 3.4;
  float flute = sin(fluteX);
  float fluteCurve = mix(abs(flute), pow(abs(flute), 0.65), u_softness);
  float seams = pow(max(0.0, 1.0 - fluteCurve), mix(22.0, 7.0, u_softness));
  float broadRidge = pow(max(0.0, fluteCurve), 5.0);
  float light = radians(u_light_angle);
  float specular = pow(max(0.0, cos(fluteX + light)), mix(34.0, 8.0, u_highlight_softness));

  float refracted = sin(fluteX + fluid * u_refraction * 0.18);
  float chroma = u_aberration * (0.012 + seams * 0.06);
  vec3 liquid = mix(u_primary, u_secondary, smoothstep(-0.65, 0.78, fluid));
  liquid = mix(liquid, u_secondary, smoothstep(0.25, 1.2, pour) * 0.32);

  float caustic = 0.5 + 0.5 * sin(q.y * 4.0 + refracted * 2.3 + time * 0.16);
  float shimmer = broadRidge * (0.035 + caustic * 0.055);
  float edgeLight = seams * (0.075 + caustic * 0.1);
  float reflected = specular * u_highlight * 0.4;

  vec3 color = liquid * (0.10 + shimmer + pour * 0.14);
  color += vec3(0.42, 0.55, 0.72) * edgeLight;
  color += vec3(0.64, 0.77, 1.0) * reflected;
  color += vec3(chroma, 0.012, chroma * 0.82) * (seams + broadRidge * 0.12);
  color *= 0.72 + 0.28 * smoothstep(-0.8, 1.0, fluid);

  float grain = (hash(gl_FragCoord.xy + u_time) - 0.5) * u_grain;
  color += grain;

  float alpha = u_intensity * (
    0.045
    + edgeLight * 0.62
    + reflected * 0.54
    + shimmer * 0.7
    + pour * 0.075
  );
  alpha = clamp(alpha, 0.0, 0.26);
  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function colorToRgb(color) {
  const value = color.replace("#", "").trim();
  const normalized = value.length === 3
    ? value.split("").map((part) => part + part).join("")
    : value;
  const parsed = Number.parseInt(normalized, 16);
  if (!Number.isFinite(parsed)) return [1, 1, 1];
  return [
    ((parsed >> 16) & 255) / 255,
    ((parsed >> 8) & 255) / 255,
    (parsed & 255) / 255,
  ];
}

/**
 * A lightweight WebGL interpretation of prismatic fluted glass.
 * Kept as a transparent overlay so the portfolio's existing backgrounds show through.
 */
export default function PrismaticSlats({
  colors = ["#c7ff4a", "#a58bff"],
  angle = 28,
  flutes = 9,
  refraction = 4,
  aberration = 0.42,
  softness = 0.55,
  wave = 0.055,
  waveFrequency = 1.5,
  drift = 0.035,
  highlight = 0.16,
  highlightSoftness = 0.42,
  lightAngle = -90,
  intensity = 0.78,
  grain = 0.018,
  speed = 0.62,
  autoplay = true,
  interactive = true,
  paused = false,
  dpr = 1.35,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
    });

    if (!gl) return undefined;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      resolution: uniform("u_resolution"),
      pointer: uniform("u_pointer"),
      pointerActive: uniform("u_pointer_active"),
      time: uniform("u_time"),
      primary: uniform("u_primary"),
      secondary: uniform("u_secondary"),
      angle: uniform("u_angle"),
      flutes: uniform("u_flutes"),
      refraction: uniform("u_refraction"),
      aberration: uniform("u_aberration"),
      softness: uniform("u_softness"),
      wave: uniform("u_wave"),
      waveFrequency: uniform("u_wave_frequency"),
      drift: uniform("u_drift"),
      highlight: uniform("u_highlight"),
      highlightSoftness: uniform("u_highlight_softness"),
      lightAngle: uniform("u_light_angle"),
      intensity: uniform("u_intensity"),
      grain: uniform("u_grain"),
      speed: uniform("u_speed"),
      autoplay: uniform("u_autoplay"),
      interactive: uniform("u_interactive"),
      paused: uniform("u_paused"),
    };

    const primary = colorToRgb(colors[0]);
    const secondary = colorToRgb(colors[1]);
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: 0 };
    let frame = 0;
    let start = performance.now();
    let lastFrame = 0;
    let width = 0;
    let height = 0;

    const setUniforms = (time) => {
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.pointerActive, pointer.active);
      gl.uniform1f(uniforms.time, time);
      gl.uniform3fv(uniforms.primary, primary);
      gl.uniform3fv(uniforms.secondary, secondary);
      gl.uniform1f(uniforms.angle, angle);
      gl.uniform1f(uniforms.flutes, flutes);
      gl.uniform1f(uniforms.refraction, refraction);
      gl.uniform1f(uniforms.aberration, aberration);
      gl.uniform1f(uniforms.softness, softness);
      gl.uniform1f(uniforms.wave, wave);
      gl.uniform1f(uniforms.waveFrequency, waveFrequency);
      gl.uniform1f(uniforms.drift, drift);
      gl.uniform1f(uniforms.highlight, highlight);
      gl.uniform1f(uniforms.highlightSoftness, highlightSoftness);
      gl.uniform1f(uniforms.lightAngle, lightAngle);
      gl.uniform1f(uniforms.intensity, intensity);
      gl.uniform1f(uniforms.grain, grain);
      gl.uniform1f(uniforms.speed, reducedMotion ? 0 : speed);
      gl.uniform1f(uniforms.autoplay, autoplay && !reducedMotion ? 1 : 0);
      gl.uniform1f(uniforms.interactive, interactive && !reducedMotion ? 1 : 0);
      gl.uniform1f(uniforms.paused, paused || reducedMotion ? 1 : 0);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, dpr);
      width = Math.max(1, Math.round(bounds.width * ratio));
      height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom
      ) {
        pointer.active = 0;
        return;
      }
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.targetY = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
      pointer.active = 1;
    };

    const onPointerLeave = () => {
      pointer.active = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    const render = (now) => {
      frame = requestAnimationFrame(render);
      if (document.visibilityState === "hidden") return;
      if (now - lastFrame < 28) return;
      lastFrame = now;

      pointer.x += (pointer.targetX - pointer.x) * 0.075;
      pointer.y += (pointer.targetY - pointer.y) * 0.075;
      if (!pointer.active) {
        pointer.targetX *= 0.985;
        pointer.targetY *= 0.985;
      }

      const elapsed = reducedMotion ? 0 : (now - start) / 1000;
      setUniforms(elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [
    colors,
    angle,
    flutes,
    refraction,
    aberration,
    softness,
    wave,
    waveFrequency,
    drift,
    highlight,
    highlightSoftness,
    lightAngle,
    intensity,
    grain,
    speed,
    autoplay,
    interactive,
    paused,
    dpr,
  ]);

  return (
    <div className={`prismatic-slats-layer ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="prismatic-slats-canvas" />
    </div>
  );
}
