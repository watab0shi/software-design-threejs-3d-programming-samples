varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;

void main() {
  vec2 uv = vUv;
  uv.x += sin(vUv.y * 5.0 + uTime) * uHover * 0.1;// ①
  uv.y += cos(vUv.x * 5.0 + uTime) * uHover * 0.1;// ②
  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}