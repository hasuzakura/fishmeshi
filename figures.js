// 解説記事で使う図解（インラインSVG）。写真の代わりに使う自作の線図。
// data.js の GUIDES 内で { svg: "aji-zeigo" } のように名前で参照する。
//
// レイアウトの決まりごと：
//   viewBox は 0 0 400 220 を基本とし、魚の本体は y=50〜160 に収める。
//   ラベルは本体と重ならないよう、上（y<45）か下（y>175）の余白に置く。
const INK = "#111111";
const GRAY = "#888888";
const LIGHT = "#dddddd";
const ACCENT = "#b00020";

// アジの側面の輪郭（頭は左）。各図で使い回す。
function ajiBody({ pectoral = true } = {}) {
  return `
    <path d="M30 105 C 55 78, 95 58, 150 56 C 210 54, 262 72, 298 92
             L 298 116
             C 262 138, 210 156, 150 154 C 95 152, 55 132, 30 105 Z"
          fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M298 92 L 366 62 L 350 104 L 366 148 L 298 116 Z"
          fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M150 56 C 180 42, 218 42, 246 52" fill="none" stroke="${GRAY}" stroke-width="2" stroke-linecap="round"/>
    <path d="M80 70 C 92 96, 91 116, 79 138" fill="none" stroke="${GRAY}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="60" cy="98" r="5.5" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${pectoral ? `<path d="M104 114 C 118 120, 126 132, 116 141 C 107 136, 101 125, 104 114 Z"
          fill="none" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>` : ""}
  `;
}

// 側線。ゼイゴはこの線の後半に並ぶ。
const LATERAL_FRONT = "M88 98 C 130 92, 172 98, 210 106";
const LATERAL_REAR = "M210 106 C 245 112, 275 112, 298 112";

const FIGURES = {
  // ゼイゴの位置
  "aji-zeigo": {
    title: "アジのゼイゴの位置",
    caption: "ゼイゴは尾の付け根から体の中ほどにかけて、側線上に並ぶ硬いトゲ状のウロコ。赤で示した範囲を、尾側から頭に向かって削ぎ取る。両面にある。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="アジの側面図。尾の付け根から体の中ほどにかけての側線上にゼイゴがあることを示している。">
        <text x="200" y="26" font-size="13" fill="${INK}" text-anchor="middle">尾側から頭に向かって削ぐ</text>
        <path d="M300 40 L 214 40" fill="none" stroke="${INK}" stroke-width="1.5"/>
        <path d="M214 40 L 224 35 M214 40 L 224 45" fill="none" stroke="${INK}" stroke-width="1.5"/>

        ${ajiBody({ pectoral: false })}
        <path d="${LATERAL_FRONT}" fill="none" stroke="${LIGHT}" stroke-width="4" stroke-linecap="round"/>
        <path d="${LATERAL_REAR}" fill="none" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>

        <path d="M252 111 L 252 184" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="252" y="203" font-size="14" fill="${ACCENT}" font-weight="700" text-anchor="middle">ゼイゴ</text>
      </svg>
    `,
  },

  // 頭を落とす位置
  "aji-head-cut": {
    title: "頭を落とす位置",
    caption: "胸びれの後ろから、頭のほうへ斜めに包丁を入れる。裏返して同じ角度で入れると、可食部を無駄にせず頭が落とせる。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="アジの側面図。胸びれの後ろから頭のほうへ斜めに包丁を入れる位置を示している。">
        <text x="200" y="26" font-size="13" fill="${ACCENT}" font-weight="700" text-anchor="middle">この線に沿って包丁を入れる</text>
        <path d="M166 34 L 152 50" fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        ${ajiBody()}
        <path d="M150 54 L 118 152" fill="none" stroke="${ACCENT}" stroke-width="3"
              stroke-dasharray="8 6" stroke-linecap="round"/>

        <path d="M112 130 L 150 190" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="156" y="196" font-size="13" fill="${GRAY}">胸びれ</text>
      </svg>
    `,
  },

  // 三枚おろしの切り込み
  "aji-sanmai": {
    title: "三枚おろしの切り込み",
    caption: "背側から背骨に沿って浅く切り込みを入れ、同じ線を数回なぞって深くしていく。一度で切り離そうとしないのが失敗しないコツ。",
    svg: `
      <svg viewBox="0 0 400 210" role="img" aria-label="頭と内臓を取ったアジの断面図。背骨に沿って包丁を入れる位置と、上身・中骨・下身の関係を示している。">
        <text x="30" y="30" font-size="13" fill="${ACCENT}" font-weight="700">背骨に沿って包丁を入れる</text>

        <path d="M40 62 C 110 44, 210 46, 296 66 L 296 82 C 210 66, 110 64, 40 80 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M40 80 C 110 64, 210 66, 296 82 L 296 104 C 210 92, 110 90, 40 100 Z"
              fill="#f0f0f0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M40 100 C 110 90, 210 92, 296 104 L 296 124 C 210 116, 110 114, 40 120 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M36 72 C 108 54, 208 56, 300 76"
              fill="none" stroke="${ACCENT}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
        <path d="M36 110 C 108 98, 208 100, 300 112"
              fill="none" stroke="${ACCENT}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>

        <text x="308" y="70" font-size="13" fill="${INK}" font-weight="700">上身</text>
        <text x="308" y="96" font-size="13" fill="${GRAY}" font-weight="700">中骨</text>
        <text x="308" y="120" font-size="13" fill="${INK}" font-weight="700">下身</text>

        <text x="30" y="168" font-size="12" fill="${GRAY}">浅い切り込みを数回に分けて深くしていく</text>
        <text x="30" y="192" font-size="12" fill="${GRAY}">※ 頭と内臓を取り除いた状態の断面</text>
      </svg>
    `,
  },
};

module.exports = { FIGURES };
