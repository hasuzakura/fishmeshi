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
const WATER = "#e6edf1";

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

// サバの側面の輪郭（頭は左）。紡錘形の体、細い尾柄、尾の手前に並ぶ小離鰭が目印。
function sabaBody({ pectoral = true } = {}) {
  return `
    <path d="M28 104 C 58 76, 106 58, 166 58 C 222 58, 264 76, 288 94
             L 330 100 L 330 108 L 288 114
             C 264 132, 222 150, 166 150 C 106 150, 58 132, 28 104 Z"
          fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M330 100 L 372 72 L 358 104 L 372 136 L 330 108 Z"
          fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M148 59 L 172 34 L 194 61 Z" fill="#ffffff" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M226 64 L 240 48 L 253 69 Z" fill="#ffffff" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M266 80 l 11 -9 l -2 9 z M282 90 l 11 -9 l -2 9 z M300 96 l 11 -8 l -2 8 z"
          fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M266 127 l 11 9 l -2 -9 z M282 117 l 11 9 l -2 -9 z M300 111 l 11 8 l -2 -8 z"
          fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M100 74 C 112 82, 124 66, 136 74 M144 68 C 156 76, 168 60, 180 68
             M188 66 C 200 74, 212 58, 224 66 M232 72 C 242 80, 252 66, 262 74"
          fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M76 70 C 88 94, 88 114, 76 136" fill="none" stroke="${GRAY}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="56" cy="98" r="5.5" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${pectoral ? `<path d="M96 116 C 110 122, 118 134, 108 142 C 99 137, 93 127, 96 116 Z"
          fill="none" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>` : ""}
  `;
}

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

  // アニサキスの寄生部位と、死後の移動
  "saba-anisakis-zone": {
    title: "アニサキスがいる場所",
    caption: "アニサキスは生きている魚では内臓（腹腔内）に集中している。魚が死んで時間が経つと、内臓から腹側の筋肉へ移動する。だから釣ったその日に内臓を抜くことに意味がある。",
    svg: `
      <svg viewBox="0 0 400 240" role="img" aria-label="サバの側面図。アニサキスが内臓に集中し、死後に腹側の筋肉へ移動することを示している。">
        <text x="200" y="24" font-size="13" fill="${INK}" text-anchor="middle">死後、時間の経過とともに腹側の筋肉へ移動する</text>

        ${sabaBody({ pectoral: false })}

        <path d="M96 112 C 116 140, 152 146, 176 128 C 162 108, 122 100, 96 112 Z"
              fill="${ACCENT}" fill-opacity="0.28" stroke="${ACCENT}" stroke-width="2"/>
        <path d="M184 140 C 212 146, 240 140, 260 124 L 252 112 C 232 124, 208 132, 188 128 Z"
              fill="${ACCENT}" fill-opacity="0.10" stroke="${ACCENT}" stroke-width="1.6"
              stroke-dasharray="6 5"/>

        <path d="M172 116 C 196 118, 214 114, 234 106" fill="none" stroke="${ACCENT}" stroke-width="2"/>
        <path d="M234 106 L 223 107 M234 106 L 227 113" fill="none" stroke="${ACCENT}" stroke-width="2"/>

        <path d="M136 122 L 108 196" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="104" y="213" font-size="14" fill="${ACCENT}" font-weight="700" text-anchor="middle">内臓</text>
        <text x="104" y="230" font-size="11" fill="${GRAY}" text-anchor="middle">最も多い</text>

        <path d="M244 134 L 288 196" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="296" y="213" font-size="14" fill="${ACCENT}" font-weight="700" text-anchor="middle">腹側の筋肉</text>
        <text x="296" y="230" font-size="11" fill="${GRAY}" text-anchor="middle">死後に移動してくる</text>
      </svg>
    `,
  },

  // 三枚おろし後、重点的に確認する場所
  "saba-harami-check": {
    title: "片身のどこを重点的に見るか",
    caption: "三枚におろしたら、腹身（腹側の薄い部分）を重点的に確認する。ここは内臓に接していた場所で、移動してきたアニサキスが最も見つかりやすい。血合い骨のまわりも見落としやすい。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="サバの片身の図。腹側の薄い部分を重点的に確認することを示している。">
        <text x="200" y="22" font-size="13" fill="${INK}" text-anchor="middle">三枚におろした片身（頭は左）</text>

        <path d="M46 66 C 140 52, 250 58, 350 88 L 352 98 C 250 124, 140 138, 46 116 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M46 100 C 140 120, 250 108, 351 93 L 352 98 C 250 124, 140 138, 46 116 Z"
              fill="${ACCENT}" fill-opacity="0.18" stroke="${ACCENT}" stroke-width="2"/>

        <path d="M60 92 C 150 88, 250 84, 340 90" fill="none" stroke="${GRAY}"
              stroke-width="1.8" stroke-dasharray="5 5" stroke-linecap="round"/>

        <path d="M90 52 L 90 60" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="90" y="46" font-size="12" fill="${GRAY}" text-anchor="middle">背側</text>

        <path d="M292 52 L 285 84" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="296" y="46" font-size="12" fill="${GRAY}" text-anchor="middle">血合い骨のライン</text>

        <path d="M170 120 L 170 166" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="170" y="186" font-size="14" fill="${ACCENT}" font-weight="700" text-anchor="middle">腹身</text>
        <text x="170" y="204" font-size="11" fill="${GRAY}" text-anchor="middle">重点的に確認する</text>
      </svg>
    `,
  },

  // 明るい場所で透かして見る
  "saba-light-check": {
    title: "透かして確認する",
    caption: "身の下から明かりを当てると、白い糸状の虫が影として浮かびやすい。アニサキスは体長2〜3cm、太さ0.5〜1mmほどで、渦を巻いた状態で潜んでいることが多い。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="サバの身の下から明かりを当て、渦を巻いたアニサキスを透かして確認する図。">
        <text x="200" y="22" font-size="13" fill="${INK}" text-anchor="middle">下から明かりを当てて透かす</text>

        <path d="M200 174 L 130 128 M200 174 L 165 130 M200 174 L 200 133
                 M200 174 L 235 130 M200 174 L 270 128"
              fill="none" stroke="${GRAY}" stroke-width="1.5" stroke-dasharray="4 5"/>

        <path d="M60 78 C 150 58, 250 62, 344 86 L 344 108 C 250 134, 150 132, 60 110 Z"
              fill="#fafafa" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M158 96 c 16 0 16 20 0 20 c -12 0 -12 -15 -2 -15 c 8 0 8 10 0 10"
              fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M256 92 c 15 2 12 21 -3 19 c -12 -2 -9 -16 0 -14 c 8 2 6 11 -2 9"
              fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linecap="round"/>

        <path d="M156 180 C 156 158, 244 158, 244 180 Z"
              fill="#f0f0f0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="200" y="200" font-size="12" fill="${GRAY}" text-anchor="middle">明かり</text>

        <path d="M152 100 L 100 60" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="96" y="56" font-size="13" fill="${ACCENT}" font-weight="700" text-anchor="end">アニサキス</text>
      </svg>
    `,
  },

  // 潮氷の作り方（クーラーボックスの断面）
  "cooler-shioogori": {
    title: "潮氷の作り方",
    caption: "クーラーボックスに海水と氷を入れ、シャーベット状にしたものが潮氷。魚が完全に浸かる量を作る。真水の氷水は使わない。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="クーラーボックスの断面図。海水と氷を入れた潮氷に魚が浸かっている様子を示している。">
        <text x="200" y="26" font-size="13" fill="${INK}" text-anchor="middle">クーラーボックスの断面</text>

        <path d="M52 48 L 272 48 L 272 66 L 52 66 Z"
              fill="#f0f0f0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M60 66 L 264 66 L 252 190 L 72 190 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M76 82 L 248 82 L 240 174 L 84 174 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="1.8" stroke-linejoin="round"/>

        <path d="M78 100 L 246 100 L 240 174 L 84 174 Z" fill="${WATER}" stroke="none"/>
        <path d="M78 100 L 246 100" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <rect x="88" y="96" width="22" height="17" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="120" y="92" width="18" height="14" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="150" y="97" width="23" height="17" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="186" y="93" width="18" height="14" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="214" y="98" width="21" height="16" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>

        <path d="M96 142 C 108 130, 142 130, 154 142 C 142 154, 108 154, 96 142 Z
                 M154 142 L 172 132 L 167 142 L 172 152 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2"/>
        <path d="M150 164 C 162 154, 194 154, 206 164 C 194 174, 162 174, 150 164 Z
                 M206 164 L 224 155 L 219 164 L 224 173 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2"/>

        <path d="M232 104 L 292 96" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="298" y="100" font-size="13" fill="${INK}" font-weight="700">氷</text>

        <path d="M240 140 L 292 136" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="298" y="140" font-size="13" fill="${INK}" font-weight="700">海水</text>

        <path d="M216 166 L 292 180" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="298" y="178" font-size="13" fill="${ACCENT}" font-weight="700">魚</text>
        <text x="298" y="196" font-size="11" fill="${GRAY}">完全に浸す</text>
      </svg>
    `,
  },

  // 血抜きで切る位置
  "chinuki-era": {
    title: "血抜きで切る位置",
    caption: "エラ蓋を持ち上げ、エラの付け根（背骨側の太い血管が通る部分）に刃先を差し入れて切る。切ったら海水を張ったバケツに数分入れておくと血が抜けやすい。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="魚の頭部の図。エラ蓋を持ち上げてエラの付け根を切る位置を示している。">
        <text x="36" y="30" font-size="13" fill="${GRAY}">魚の頭を拡大（頭は左）</text>

        <path d="M36 122 C 56 92, 96 70, 150 66 L 206 66" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M36 122 C 56 152, 96 174, 150 178 L 206 178" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M206 66 L 206 178" fill="none" stroke="${LIGHT}" stroke-width="2" stroke-dasharray="6 5"/>
        <path d="M36 122 L 74 128" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="86" cy="110" r="9" fill="none" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="86" cy="110" r="3.5" fill="${INK}"/>

        <path d="M152 70 C 172 100, 172 146, 152 176" fill="none" stroke="${GRAY}" stroke-width="2.5"/>
        <path d="M124 96 C 138 116, 138 132, 124 152 M134 92 C 148 114, 148 134, 134 156"
              fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <path d="M116 92 L 142 104" fill="none" stroke="${ACCENT}" stroke-width="4.5" stroke-linecap="round"/>

        <path d="M142 102 L 216 94" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="222" y="92" font-size="14" fill="${ACCENT}" font-weight="700">エラの付け根</text>
        <text x="222" y="110" font-size="11" fill="${GRAY}">ここに刃先を入れて切る</text>

        <path d="M166 152 L 216 150" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="222" y="154" font-size="12" fill="${GRAY}">エラ蓋を持ち上げる</text>
      </svg>
    `,
  },

  // 氷焼けを防ぐ
  "koori-yake": {
    title: "氷に直接当てない",
    caption: "氷が身に直接触れ続けると、その部分が凍って白く変色する（氷焼け）。潮氷から上げたあとは、袋に入れてから氷の上に置く。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="左は魚を氷に直接当てた悪い例、右は袋に入れた良い例を並べた比較図。">
        <path d="M200 40 L 200 196" fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <text x="100" y="60" font-size="20" fill="${ACCENT}" font-weight="700" text-anchor="middle">✕</text>
        <text x="300" y="60" font-size="20" fill="${INK}" font-weight="700" text-anchor="middle">○</text>

        <rect x="34" y="134" width="26" height="20" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="66" y="138" width="24" height="18" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="96" y="134" width="26" height="20" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="128" y="139" width="24" height="18" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="158" y="135" width="24" height="19" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>

        <path d="M52 118 C 70 100, 128 100, 148 118 C 128 136, 70 136, 52 118 Z
                 M148 118 L 174 104 L 167 118 L 174 132 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M62 128 C 84 138, 118 138, 140 126" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round"/>

        <text x="100" y="176" font-size="12" fill="${INK}" text-anchor="middle">氷に直接触れている</text>
        <text x="100" y="194" font-size="11" fill="${ACCENT}" text-anchor="middle">触れた面が白くなる</text>

        <rect x="234" y="134" width="26" height="20" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="266" y="138" width="24" height="18" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="296" y="134" width="26" height="20" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="328" y="139" width="24" height="18" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="358" y="135" width="24" height="19" fill="#ffffff" stroke="${INK}" stroke-width="1.8"/>

        <rect x="238" y="90" width="126" height="46" rx="7" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M238 102 L 364 102" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M290 94 L 290 100 M300 94 L 300 100 M310 94 L 310 100"
              fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <path d="M250 118 C 262 108, 300 108, 314 118 C 300 128, 262 128, 250 118 Z
                 M314 118 L 334 110 L 329 118 L 334 126 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2"/>

        <text x="300" y="176" font-size="12" fill="${INK}" text-anchor="middle">袋に入れてから置く</text>
        <text x="300" y="194" font-size="11" fill="${GRAY}" text-anchor="middle">冷気は伝わる</text>
      </svg>
    `,
  },
};

module.exports = { FIGURES };
