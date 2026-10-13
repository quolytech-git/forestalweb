import React, { useEffect, useRef } from 'react';

// WebGL 2 Fragment Shader for BLDR 3D Topographic Mesh / Wireframe Terrain
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
uniform float u_speed;
uniform float u_seed;
uniform float u_tilt;
uniform float u_zoom;
uniform float u_cameraHeight;
uniform float u_amplitude;
uniform float u_lineWidth;
uniform float u_pixelRatio;
uniform float u_lineBlur;
uniform float u_lightIntensity;
uniform vec4 u_backgroundColor;
uniform vec4 u_lineColor;

// === PCG hash from BLDR ===
uvec3 hash3(uvec3 v) {
    v = v * 1664525u + 1013904223u;
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    v ^= v >> 16u;
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    return v;
}

vec3 seedRandom(float seedVal) {
    uvec3 s = uvec3(
        floatBitsToUint(seedVal),
        floatBitsToUint(seedVal * 1.5 + 7.31),
        floatBitsToUint(seedVal * 2.7 + 13.37)
    );
    s = hash3(s);
    return vec3(s) / float(0xFFFFFFFFu);
}

void main() {
    vec2 r = u_resolution;
    vec2 I = gl_FragCoord.xy;
    float t = u_time * u_speed;
    vec3 w, p;
    vec4 o = vec4(0.0);

    vec3 seedA = seedRandom(u_seed);
    vec3 seedB = seedRandom(u_seed + 100.0);

    float seedAngle = seedA.x * 6.2831;
    mat2 seedRot = mat2(cos(seedAngle), -sin(seedAngle), sin(seedAngle), cos(seedAngle));

    vec3 seedPhase = seedB * 6.2831;

    float a = radians(u_tilt);
    mat3 rot = mat3(
        1.0, 0.0, 0.0,
        0.0, cos(a), sin(a),
        0.0, -sin(a), cos(a)
    );

    float z = 0.0;
    float d = 0.1;
    vec4 offset = vec4(0.0);

    for (float i = 0.0; i < 30.0; i++) {
        vec3 rd = (vec3(I, 0.0) * 2.0 - r.xyy) / r.y * u_zoom;
        p = z * (rot * rd) + vec3(1.0, u_cameraHeight, 1.0);
        w = p;

        vec3 nw = w;
        nw.xz = seedRot * nw.xz;

        float f;
        for (f = 2.0; f <= 3.0; f++)
            nw += sin(nw.zxy * f + t + seedPhase) / f;

        w = mix(p, nw, 1.0);

        d = 0.1 * (p.y + 3.0);
        z += d;

        vec4 surface = mix(p, w, u_amplitude).y + offset;
        vec4 fw = max(fwidth(surface), 0.0001);
        vec4 pixelDist = abs(surface) / fw;
        float lw = u_lineWidth * u_pixelRatio;
        vec4 acc = smoothstep(lw + u_lineBlur, lw, pixelDist) * u_lightIntensity * d;
        o += acc;
    }

    vec4 raw = tanh(o);

    // Boost line visibility and luminous glow in Forestal sand #ead9be
    float lineIntensity = clamp(raw.r * 1.75, 0.0, 1.0);
    vec3 col = mix(u_backgroundColor.rgb, u_lineColor.rgb, lineIntensity * u_lineColor.a);
    fragColor = vec4(col, 1.0);
}
`;

export default function BldrMeshCanvas({
  speed = 0.45,
  seed = 200,
  tilt = -32,
  zoom = 0.35,
  cameraHeight = 2.0,
  amplitude = 0.22,
  lineWidth = 0.25,
  lineBlur = 1.6,
  lightIntensity = 3.2,
  // Forestal Architectural Palette: Obsidian charcoal base with luminous sand lines
  backgroundColor = [0.078, 0.078, 0.070, 0.85], // #141412
  lineColor = [0.918, 0.851, 0.745, 0.95],       // #ead9be
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Attempt WebGL2 context
    let gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn('WebGL2 not supported, falling back to 2D gradient mesh');
      return;
    }

    // Compile Shader helper
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

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (covering clip space -1 to 1)
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

    // Get Uniform Locations
    const locs = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_speed: gl.getUniformLocation(program, 'u_speed'),
      u_seed: gl.getUniformLocation(program, 'u_seed'),
      u_tilt: gl.getUniformLocation(program, 'u_tilt'),
      u_zoom: gl.getUniformLocation(program, 'u_zoom'),
      u_cameraHeight: gl.getUniformLocation(program, 'u_cameraHeight'),
      u_amplitude: gl.getUniformLocation(program, 'u_amplitude'),
      u_lineWidth: gl.getUniformLocation(program, 'u_lineWidth'),
      u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
      u_lineBlur: gl.getUniformLocation(program, 'u_lineBlur'),
      u_lightIntensity: gl.getUniformLocation(program, 'u_lightIntensity'),
      u_backgroundColor: gl.getUniformLocation(program, 'u_backgroundColor'),
      u_lineColor: gl.getUniformLocation(program, 'u_lineColor'),
    };

    // Set static uniforms
    gl.uniform1f(locs.u_speed, speed);
    gl.uniform1f(locs.u_seed, seed);
    gl.uniform1f(locs.u_tilt, tilt);
    gl.uniform1f(locs.u_zoom, zoom);
    gl.uniform1f(locs.u_cameraHeight, cameraHeight);
    gl.uniform1f(locs.u_amplitude, amplitude);
    gl.uniform1f(locs.u_lineWidth, lineWidth);
    gl.uniform1f(locs.u_lineBlur, lineBlur);
    gl.uniform1f(locs.u_lightIntensity, lightIntensity);
    gl.uniform4fv(locs.u_backgroundColor, backgroundColor);
    gl.uniform4fv(locs.u_lineColor, lineColor);

    let animationFrameId;
    let startTime = performance.now();
    let currentTilt = tilt;
    let currentCamHeight = cameraHeight;
    let targetTilt = tilt;
    let targetCamHeight = cameraHeight;

    // Resize handling with DPR capping for buttery performance
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || 500;
      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform2f(locs.u_resolution, displayWidth, displayHeight);
        gl.uniform1f(locs.u_pixelRatio, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Subtle interactive mouse parallax
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetTilt = tilt + normY * 4.0;
        targetCamHeight = cameraHeight - normX * 0.25;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;

      // Smooth lerp for mouse interaction
      currentTilt += (targetTilt - currentTilt) * 0.05;
      currentCamHeight += (targetCamHeight - currentCamHeight) * 0.05;

      gl.uniform1f(locs.u_time, elapsed);
      gl.uniform1f(locs.u_tilt, currentTilt);
      gl.uniform1f(locs.u_cameraHeight, currentCamHeight);

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
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [speed, seed, tilt, zoom, cameraHeight, amplitude, lineWidth, lineBlur, lightIntensity, backgroundColor, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`bldr-mesh-canvas ${className}`}
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
