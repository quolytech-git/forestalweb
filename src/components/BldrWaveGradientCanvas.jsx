import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `#version 300 es
in vec2 position;
out vec2 v_uv;
void main() {
    v_uv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
precision highp int;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;
uniform float u_waveSpeed;
uniform float u_waveFreqX;
uniform float u_waveFreqY;
uniform float u_waveAngle;
uniform float u_waveAmplitude;
uniform float u_maskSoftness;
uniform float u_blendAmount;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
    float s = u_seed;
    vec2 k1 = vec2(2127.1 + s * 13.37, 81.17 + s * 7.31);
    vec2 k2 = vec2(1269.5 + s * 11.13, 283.37 + s * 5.79);
    p = vec2(dot(p, k1), dot(p, k2));
    return fract(sin(p) * (43758.5453 + s * 1.618));
}

float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float n = mix(
        mix(dot(-1.0 + 2.0 * hash(i), f),
            dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y
    );
    return 0.5 + 0.5 * n;
}

float seedF(float base) {
    return base * (1.0 + 0.5 * sin(u_seed * 3.17 + base));
}

vec2 warpUV(vec2 uv) {
    float t = u_time * u_waveSpeed;

    float angleOffset = sin(u_seed * 2.73) * 30.0;
    mat2 dirRot = Rot(radians(u_waveAngle + angleOffset));
    vec2 ruv = dirRot * uv;

    float fxMod = seedF(u_waveFreqX);
    float fyMod = seedF(u_waveFreqY);

    float phaseX = fract(sin(u_seed * 7.19) * 437.58) * 6.2832;
    float phaseY = fract(cos(u_seed * 3.41) * 291.37) * 6.2832;

    float harmonic = sin(u_seed * 1.23) * 0.5;
    float a = fyMod * ruv.y - sin(ruv.x * fxMod + ruv.y - t + phaseX);
    a += harmonic * sin(ruv.x * fxMod * 2.0 + ruv.y * 0.5 + t * 0.7 + phaseY);

    a = smoothstep(
        cos(a) * u_maskSoftness,
        sin(a) * u_maskSoftness + 3.0,
        cos(a - fyMod * ruv.y) - sin(a - fxMod * ruv.x)
    );

    a *= u_waveAmplitude;

    uv = cos(a) * uv + sin(a) * vec2(-uv.y, uv.x);
    return uv;
}

void main() {
    vec2 fragCoord = v_uv * u_resolution;
    vec2 uv = fragCoord / u_resolution.xy;
    float ratio = u_resolution.x / u_resolution.y;
    float t = u_time * u_waveSpeed;

    vec2 tuv = uv - 0.5;

    vec2 seedShift = vec2(sin(u_seed * 4.37), cos(u_seed * 5.91)) * 100.0;
    float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) + seedShift);
    tuv.y *= 1.0 / ratio;
    tuv *= Rot(radians((degree - 0.5) * 720.0 + 180.0));
    tuv.y *= ratio;

    vec2 uv2 = (fragCoord * 2.0 - u_resolution.xy) / (u_resolution.x + u_resolution.y) * 2.0;
    float preRotAngle = fract(sin(u_seed * 5.63) * 173.29) * 6.2832;
    uv2 *= Rot(preRotAngle);
    vec2 warped = warpUV(uv2) * 0.5 + 0.5;

    vec2 blendUV = mix(warped - 0.5, tuv, u_blendAmount);
    float layerRot1 = 25.0 + sin(u_seed * 1.83) * 20.0;
    float layerRot2 = -35.0 + cos(u_seed * 2.41) * 20.0;

    float mX1 = S(-0.35, 0.35, (blendUV * Rot(radians(layerRot1))).x);
    float mX2 = S(-0.35, 0.35, (blendUV * Rot(radians(layerRot2))).x);
    float mY = 1.0 - S(-0.35, 0.35, blendUV.y);

    vec3 layer1 = mix(u_color0, u_color2, mX1);
    vec3 layer2 = mix(u_color3, u_color1, mX2);
    vec3 col = mix(layer1, layer2, mY);

    col = clamp(col, 0.0, 1.0);
    col = mix(col, col * col + 0.5 * sqrt(max(col, vec3(0.0))), 0.25);

    fragColor = vec4(col, 1.0);
}
`;

export default function BldrWaveGradientCanvas({
  seed = 32,
  waveSpeed = 0.9,
  waveFreqX = 1.2,
  waveFreqY = 2.8,
  waveAngle = 105,
  waveAmplitude = 2.1,
  maskSoftness = 0.74,
  blendAmount = 0.54,
  // Forestal Architectural Color Palette:
  // Charcoal #141412, Rich bronze #2e281e, Architectural sand #ead9be, Warm cream #efebe3
  colors = [
    [0.078, 0.078, 0.070], // Obsidian charcoal #141412
    [0.17, 0.155, 0.135],  // Deep architectural bronze
    [0.85, 0.76, 0.63],    // Luminous warm sand #ead9be
    [0.32, 0.28, 0.22],    // Warm earthy bronze
  ],
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('WebGL2 not supported');
      return;
    }

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const frag = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // WebGL 2 requires a Vertex Array Object (VAO)
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_seed: gl.getUniformLocation(program, 'u_seed'),
      u_waveSpeed: gl.getUniformLocation(program, 'u_waveSpeed'),
      u_waveFreqX: gl.getUniformLocation(program, 'u_waveFreqX'),
      u_waveFreqY: gl.getUniformLocation(program, 'u_waveFreqY'),
      u_waveAngle: gl.getUniformLocation(program, 'u_waveAngle'),
      u_waveAmplitude: gl.getUniformLocation(program, 'u_waveAmplitude'),
      u_maskSoftness: gl.getUniformLocation(program, 'u_maskSoftness'),
      u_blendAmount: gl.getUniformLocation(program, 'u_blendAmount'),
      u_color0: gl.getUniformLocation(program, 'u_color0'),
      u_color1: gl.getUniformLocation(program, 'u_color1'),
      u_color2: gl.getUniformLocation(program, 'u_color2'),
      u_color3: gl.getUniformLocation(program, 'u_color3'),
    };

    gl.uniform1f(locs.u_seed, seed);
    gl.uniform1f(locs.u_waveSpeed, waveSpeed);
    gl.uniform1f(locs.u_waveFreqX, waveFreqX);
    gl.uniform1f(locs.u_waveFreqY, waveFreqY);
    gl.uniform1f(locs.u_waveAngle, waveAngle);
    gl.uniform1f(locs.u_waveAmplitude, waveAmplitude);
    gl.uniform1f(locs.u_maskSoftness, maskSoftness);
    gl.uniform1f(locs.u_blendAmount, blendAmount);

    gl.uniform3f(locs.u_color0, colors[0][0], colors[0][1], colors[0][2]);
    gl.uniform3f(locs.u_color1, colors[1][0], colors[1][1], colors[1][2]);
    gl.uniform3f(locs.u_color2, colors[2][0], colors[2][1], colors[2][2]);
    gl.uniform3f(locs.u_color3, colors[3][0], colors[3][1], colors[3][2]);

    const startTime = performance.now();
    let animationFrameId;

    let currentAngle = waveAngle;
    let targetAngle = waveAngle;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        targetAngle = waveAngle + normX * 30.0;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth || 1000;
      const height = canvas.clientHeight || 500;
      const dw = Math.floor(width * dpr);
      const dh = Math.floor(height * dpr);

      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        gl.viewport(0, 0, dw, dh);
        gl.useProgram(program);
        gl.uniform2f(locs.u_resolution, dw, dh);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;
      currentAngle += (targetAngle - currentAngle) * 0.05;
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(locs.u_time, elapsed);
      gl.uniform1f(locs.u_waveAngle, currentAngle);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        gl.deleteBuffer(positionBuffer);
        gl.deleteVertexArray(vao);
      }
    };
  }, [seed, waveSpeed, waveFreqX, waveFreqY, waveAngle, waveAmplitude, maskSoftness, blendAmount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`bldr-wave-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
