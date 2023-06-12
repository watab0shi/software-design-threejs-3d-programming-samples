uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z = sin((pos.x - pos.y) * 10.0 + uTime) * uHover * 100.0;// ①
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}