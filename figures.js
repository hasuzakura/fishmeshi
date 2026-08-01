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

  // 手開き①：頭を折ってワタごと引き抜く
  "iwashi-atama": {
    title: "頭を折る位置",
    caption: "胸びれの後ろで頭を折り、そのまま下へ引く。うまくいくと内臓が頭についてまとめて出てくる。包丁は使わない。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="イワシの側面図。胸びれの後ろで頭を折る位置と、下に引く方向を示している。">
        <text x="30" y="28" font-size="13" fill="${INK}" font-weight="700">① 頭とワタを取る</text>

        <path d="M30 108 C 52 84, 90 68, 140 66 C 196 64, 250 78, 286 96
                 L 286 116 C 250 134, 196 148, 140 146 C 90 144, 52 128, 30 108 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M286 96 L 352 70 L 338 106 L 352 142 L 286 116 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M156 67 L 178 48 L 198 66 Z" fill="#ffffff" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M76 76 C 88 96, 88 116, 76 136" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <circle cx="54" cy="100" r="6" fill="none" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="108" cy="87" r="3.5" fill="${INK}"/>
        <circle cx="132" cy="86" r="3.5" fill="${INK}"/>
        <circle cx="156" cy="86" r="3.5" fill="${INK}"/>
        <circle cx="180" cy="87" r="3.5" fill="${INK}"/>
        <circle cx="204" cy="89" r="3.5" fill="${INK}"/>
        <path d="M90 114 C 102 120, 108 129, 100 136 C 92 131, 87 123, 90 114 Z"
              fill="none" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>

        <path d="M100 72 L 106 142" fill="none" stroke="${ACCENT}" stroke-width="3"
              stroke-dasharray="8 6" stroke-linecap="round"/>

        <path d="M78 152 C 72 172, 64 182, 50 188" fill="none" stroke="${ACCENT}" stroke-width="2"/>
        <path d="M50 188 L 60 184 M50 188 L 56 178" fill="none" stroke="${ACCENT}" stroke-width="2"/>

        <path d="M103 70 L 150 42" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="156" y="40" font-size="13" fill="${ACCENT}" font-weight="700">ここで折る</text>

        <text x="200" y="206" font-size="12" fill="${GRAY}" text-anchor="middle">下へ引くと内臓も一緒に出てくる</text>
      </svg>
    `,
  },

  // 手開き②：親指を背骨に沿わせて開く
  "iwashi-hiraku": {
    title: "親指を滑らせて開く",
    caption: "腹側から背骨の上に両親指を差し入れ、背骨に沿わせて尾のほうへ滑らせる。力を入れず、骨の感触をなぞるように動かすと身が割れにくい。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="開いたイワシを上から見た図。背骨に沿って親指を尾へ滑らせる方向と、身が左右に開く様子を示している。">
        <text x="30" y="28" font-size="13" fill="${INK}" font-weight="700">② 親指で開く</text>

        <path d="M300 88 L 346 72 L 336 110 L 346 148 L 300 132 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M46 66 C 130 54, 230 62, 300 84 L 304 110 L 46 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M46 154 C 130 166, 230 158, 300 136 L 304 110 L 46 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M72 110 L 288 110" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>
        <path d="M288 110 L 274 103 M288 110 L 274 117" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>

        <path d="M168 96 L 168 74" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M168 74 L 163 82 M168 74 L 173 82" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M168 124 L 168 146" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M168 146 L 163 138 M168 146 L 173 138" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <text x="200" y="206" font-size="12" fill="${GRAY}" text-anchor="middle">背骨をなぞりながら尾へ。身は左右に開いていく</text>
      </svg>
    `,
  },

  // 手開き③：背骨を外す
  "iwashi-hone": {
    title: "背骨の外し方",
    caption: "開いたら背骨の頭側の端をつまみ、尾に向かってゆっくり引き剥がす。尾の付け根まで来たら、そこで背骨を折って取る。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="開いたイワシから背骨を頭側から尾へ引き剥がす様子を示した図。">
        <text x="30" y="28" font-size="13" fill="${INK}" font-weight="700">③ 背骨を外す</text>

        <path d="M300 88 L 346 72 L 336 110 L 346 148 L 300 132 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M46 66 C 130 54, 230 62, 300 84 L 304 110 L 46 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M46 154 C 130 166, 230 158, 300 136 L 304 110 L 46 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M52 88 C 120 96, 220 104, 296 108 L 296 116 C 220 112, 120 104, 52 96 Z"
              fill="#f0f0f0" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M92 95 L 92 103 M132 99 L 132 107 M172 102 L 172 110
                 M212 105 L 212 112 M252 107 L 252 114"
              fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        <path d="M104 76 C 172 68, 240 74, 282 86" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
        <path d="M282 86 L 269 84 M282 86 L 273 94" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
        <text x="190" y="56" font-size="12" fill="${ACCENT}" font-weight="700" text-anchor="middle">頭側からつまんで尾へ</text>

        <path d="M298 116 L 298 132" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>
        <path d="M300 132 L 328 162" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="334" y="168" font-size="12" fill="${ACCENT}" font-weight="700" text-anchor="end">尾の付け根で折る</text>

        <text x="30" y="206" font-size="12" fill="${GRAY}">腹骨と背びれは最後に指でつまんで取る</text>
      </svg>
    `,
  },

  // 冷凍するときの包み方
  "reitou-tsutsumi": {
    title: "冷凍するときの包み方",
    caption: "水気を拭き、1回分ずつラップでぴったり包み、保存袋に入れて空気を抜く。この3手間で冷凍焼けと臭い移りがかなり防げる。",
    svg: `
      <svg viewBox="0 0 400 200" role="img" aria-label="冷凍の手順を3段階で示した図。水気を拭く、ラップで包む、保存袋に入れて空気を抜く。">
        <rect x="26" y="72" width="88" height="44" rx="4" fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-dasharray="5 5"/>
        <path d="M38 94 C 52 82, 88 82, 102 94 C 88 106, 52 106, 38 94 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <text x="70" y="140" font-size="12" fill="${INK}" text-anchor="middle">① 水気を拭く</text>
        <text x="70" y="158" font-size="11" fill="${GRAY}" text-anchor="middle">ここを省かない</text>

        <path d="M126 94 L 152 94" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M152 94 L 144 89 M152 94 L 144 99" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <rect x="160" y="74" width="84" height="40" rx="5" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M176 77 L 163 94 M198 77 L 163 108 M220 77 L 178 111 M241 84 L 208 111"
              fill="none" stroke="${LIGHT}" stroke-width="1.5"/>
        <path d="M172 94 C 184 84, 216 84, 230 94 C 216 104, 184 104, 172 94 Z"
              fill="none" stroke="${GRAY}" stroke-width="2"/>
        <text x="202" y="140" font-size="12" fill="${INK}" text-anchor="middle">② ラップで包む</text>
        <text x="202" y="158" font-size="11" fill="${GRAY}" text-anchor="middle">1回分ずつ</text>

        <path d="M256 94 L 282 94" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M282 94 L 274 89 M282 94 L 274 99" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <rect x="290" y="70" width="86" height="48" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M290 82 L 376 82" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M302 100 C 314 90, 346 90, 358 100 C 346 110, 314 110, 302 100 Z"
              fill="none" stroke="${GRAY}" stroke-width="2"/>
        <text x="333" y="140" font-size="12" fill="${INK}" text-anchor="middle">③ 保存袋へ</text>
        <text x="333" y="158" font-size="11" fill="${ACCENT}" text-anchor="middle">空気を抜く</text>
      </svg>
    `,
  },

  // 空気を抜くかどうかの違い
  "reitou-kuuki": {
    title: "空気を残さない",
    caption: "袋に空気が残っていると、その水分が霜になり、身の表面が乾いてパサつく（冷凍焼け）。袋の口を少し開けたまま水に沈めると、水圧で空気が押し出せる。",
    svg: `
      <svg viewBox="0 0 400 210" role="img" aria-label="左は袋に空気が残った悪い例、右は空気を抜いた良い例の比較図。">
        <path d="M200 40 L 200 186" fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <text x="100" y="60" font-size="20" fill="${ACCENT}" font-weight="700" text-anchor="middle">✕</text>
        <text x="300" y="60" font-size="20" fill="${INK}" font-weight="700" text-anchor="middle">○</text>

        <rect x="34" y="82" width="132" height="62" rx="7" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M34 94 L 166 94" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M62 120 C 76 108, 124 108, 138 120 C 124 132, 76 132, 62 120 Z"
              fill="none" stroke="${GRAY}" stroke-width="2"/>
        <circle cx="52" cy="106" r="2.5" fill="${ACCENT}"/>
        <circle cx="150" cy="108" r="2.5" fill="${ACCENT}"/>
        <circle cx="58" cy="134" r="2.5" fill="${ACCENT}"/>
        <circle cx="146" cy="134" r="2.5" fill="${ACCENT}"/>
        <circle cx="100" cy="102" r="2.5" fill="${ACCENT}"/>
        <text x="100" y="166" font-size="12" fill="${INK}" text-anchor="middle">空気が残っている</text>
        <text x="100" y="184" font-size="11" fill="${ACCENT}" text-anchor="middle">霜がつき、身が乾く</text>

        <rect x="240" y="92" width="120" height="42" rx="7" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M240 102 L 360 102" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M252 116 C 266 106, 334 106, 348 116 C 334 126, 266 126, 252 116 Z"
              fill="none" stroke="${GRAY}" stroke-width="2"/>
        <text x="300" y="166" font-size="12" fill="${INK}" text-anchor="middle">空気を抜いて密着</text>
        <text x="300" y="184" font-size="11" fill="${GRAY}" text-anchor="middle">霜がつきにくい</text>
      </svg>
    `,
  },

  // 淡水魚を真水に浸けてはいけない理由
  "kanri-shinto": {
    title: "淡水魚は真水に浸けない",
    caption: "身より塩分の薄い真水に浸けると、魚は水を吸って水っぽくなる。海水魚を海水の潮氷で冷やすのは、濃度が近くこの移動が起きにくいからだ。",
    svg: `
      <svg viewBox="0 0 400 230" role="img" aria-label="左は淡水魚を真水の氷水に浸けた悪い例、右は海水魚を海水の潮氷に入れた良い例の比較図。">
        <path d="M200 46 L 200 186" fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <text x="100" y="40" font-size="20" fill="${ACCENT}" font-weight="700" text-anchor="middle">✕</text>
        <text x="300" y="40" font-size="20" fill="${INK}" font-weight="700" text-anchor="middle">○</text>

        <path d="M34 60 L 166 60 L 154 178 L 46 178 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M40 88 L 160 88 L 154 178 L 46 178 Z" fill="${WATER}" stroke="none"/>
        <path d="M40 88 L 160 88" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <rect x="50" y="84" width="20" height="15" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="80" y="81" width="17" height="13" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="107" y="85" width="20" height="15" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="135" y="82" width="17" height="13" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>

        <path d="M58 136 C 74 124, 108 124, 122 136 C 108 148, 74 148, 58 136 Z
                 M122 136 L 140 127 L 135 136 L 140 145 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>

        <path d="M90 108 L 90 118" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
        <path d="M90 122 L 85 112 M90 122 L 95 112" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M90 164 L 90 154" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
        <path d="M90 150 L 85 160 M90 150 L 95 160" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linecap="round"/>

        <text x="100" y="200" font-size="13" fill="${INK}" text-anchor="middle">真水の氷水（塩分0%）</text>
        <text x="100" y="219" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">身が水を吸う</text>

        <path d="M234 60 L 366 60 L 354 178 L 246 178 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M240 88 L 360 88 L 354 178 L 246 178 Z" fill="${WATER}" stroke="none"/>
        <path d="M240 88 L 360 88" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <rect x="250" y="84" width="20" height="15" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="280" y="81" width="17" height="13" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="307" y="85" width="20" height="15" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
        <rect x="335" y="82" width="17" height="13" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>

        <path d="M258 136 C 274 124, 308 124, 322 136 C 308 148, 274 148, 258 136 Z
                 M322 136 L 340 127 L 335 136 L 340 145 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>

        <text x="300" y="200" font-size="13" fill="${INK}" text-anchor="middle">海水の潮氷（約3%）</text>
        <text x="300" y="219" font-size="12" fill="${GRAY}" text-anchor="middle">濃度が近く吸わない</text>
      </svg>
    `,
  },

  // 保冷剤で挟んで冷やす
  "kanri-hoshitsu": {
    title: "袋に入れてから保冷剤で挟む",
    caption: "淡水魚は水に浸けずに冷やす。水気を拭いて袋に入れ、保冷剤で上下から挟む。袋越しでも冷気は十分に伝わり、氷焼けも防げる。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="クーラーボックスの断面図。袋に入れた魚を保冷剤で上下から挟んでいる様子。">
        <text x="150" y="30" font-size="13" fill="${GRAY}" text-anchor="middle">クーラーボックスの断面</text>

        <path d="M52 48 L 272 48 L 272 66 L 52 66 Z"
              fill="#f0f0f0" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M60 66 L 264 66 L 252 190 L 72 190 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M76 82 L 248 82 L 240 174 L 84 174 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="1.8" stroke-linejoin="round"/>

        <rect x="96" y="90" width="58" height="18" rx="3" fill="${WATER}" stroke="${INK}" stroke-width="1.8"/>
        <rect x="162" y="90" width="54" height="18" rx="3" fill="${WATER}" stroke="${INK}" stroke-width="1.8"/>

        <rect x="92" y="116" width="132" height="36" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M92 123 L 224 123" fill="none" stroke="${GRAY}" stroke-width="1.6"/>
        <path d="M108 136 C 122 126, 164 126, 178 136 C 164 146, 122 146, 108 136 Z
                 M178 136 L 196 128 L 191 136 L 196 144 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2"/>

        <rect x="96" y="156" width="58" height="16" rx="3" fill="${WATER}" stroke="${INK}" stroke-width="1.8"/>
        <rect x="162" y="156" width="54" height="16" rx="3" fill="${WATER}" stroke="${INK}" stroke-width="1.8"/>

        <path d="M216 98 L 288 92" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="294" y="96" font-size="13" fill="${INK}" font-weight="700">保冷剤</text>

        <path d="M224 136 L 288 134" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="294" y="131" font-size="13" fill="${ACCENT}" font-weight="700">袋に入れた魚</text>
        <text x="294" y="149" font-size="11" fill="${GRAY}">水に浸けない</text>

        <path d="M216 164 L 288 176" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="294" y="180" font-size="13" fill="${INK}" font-weight="700">保冷剤</text>
      </svg>
    `,
  },

  // 立て塩の濃度と時間
  "himono-tatejio": {
    title: "立て塩の濃度と漬け時間",
    caption: "水1リットルに塩80〜100gが基本。20cm前後のアジやイワシなら30〜40分。迷ったら短めにする。薄い塩は食べるときに足せるが、入れすぎた塩は抜けない。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="ボウルに張った塩水に開いた魚を漬けている図。塩水の濃度と漬け時間の目安を示している。">
        <text x="200" y="30" font-size="14" fill="${INK}" text-anchor="middle" font-weight="700">塩水 8〜10%</text>
        <text x="200" y="50" font-size="12" fill="${GRAY}" text-anchor="middle">水1L ＋ 塩80〜100g</text>

        <path d="M84 74 L 316 74 L 286 178 L 114 178 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M94 96 L 306 96 L 284 176 L 116 176 Z" fill="${WATER}" stroke="none"/>
        <path d="M94 96 L 306 96" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <path d="M237 129 L 256 122 L 252 138 L 256 154 L 237 147 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M110 138 C 114 128, 122 122, 130 120 C 165 115, 207 118, 237 127 L 238 138 L 110 138 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M110 138 C 114 148, 122 154, 130 156 C 165 162, 207 158, 237 149 L 238 138 L 110 138 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="128" cy="130" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <circle cx="128" cy="146" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        <circle cx="112" cy="108" r="2" fill="${GRAY}"/>
        <circle cx="140" cy="106" r="2" fill="${GRAY}"/>
        <circle cx="262" cy="112" r="2" fill="${GRAY}"/>
        <circle cx="276" cy="140" r="2" fill="${GRAY}"/>
        <circle cx="250" cy="164" r="2" fill="${GRAY}"/>
        <circle cx="150" cy="166" r="2" fill="${GRAY}"/>

        <text x="200" y="202" font-size="13" fill="${ACCENT}" text-anchor="middle" font-weight="700">20cm前後のアジ・イワシなら30〜40分</text>
      </svg>
    `,
  },

  // 干し網への並べ方
  "himono-hoshiami": {
    title: "干し網への並べ方",
    caption: "身を上（皮を下）にして、重ならないよう間隔をあけて並べる。触れている面は乾かない。直射日光は避け、風通しのよい日陰に吊るす。",
    svg: `
      <svg viewBox="0 0 400 215" role="img" aria-label="干し網を上から見た図。開いた魚を身を上にして間隔をあけて2枚並べ、左から風が当たっている。">
        <path d="M200 26 L 200 46" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M188 26 C 188 18, 212 18, 212 26" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <rect x="74" y="46" width="252" height="126" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
        <path d="M98 46 L 98 172 M130 46 L 130 172 M162 46 L 162 172 M194 46 L 194 172
                 M226 46 L 226 172 M258 46 L 258 172 M290 46 L 290 172"
              fill="none" stroke="${LIGHT}" stroke-width="1.2"/>
        <path d="M74 72 L 326 72 M74 98 L 326 98 M74 124 L 326 124 M74 150 L 326 150"
              fill="none" stroke="${LIGHT}" stroke-width="1.2"/>

        <path d="M231 69 L 250 62 L 246 78 L 250 94 L 231 87 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M104 78 C 108 68, 116 62, 124 60 C 159 55, 201 58, 231 67 L 232 78 L 104 78 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M104 78 C 108 88, 116 94, 124 96 C 159 102, 201 98, 231 89 L 232 78 L 104 78 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="122" cy="70" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <circle cx="122" cy="86" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        <path d="M231 133 L 250 126 L 246 142 L 250 158 L 231 151 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M104 142 C 108 132, 116 126, 124 124 C 159 119, 201 122, 231 131 L 232 142 L 104 142 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M104 142 C 108 152, 116 158, 124 160 C 159 166, 201 162, 231 153 L 232 142 L 104 142 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="122" cy="134" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <circle cx="122" cy="150" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        <path d="M286 98 L 286 122" fill="none" stroke="${ACCENT}" stroke-width="2"/>
        <path d="M286 98 L 281 106 M286 98 L 291 106 M286 122 L 281 114 M286 122 L 291 114"
              fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <path d="M294 110 L 328 110" fill="none" stroke="${GRAY}" stroke-width="1.2"/>
        <text x="332" y="114" font-size="11" fill="${ACCENT}" font-weight="700">重ねない</text>

        <text x="16" y="66" font-size="12" fill="${GRAY}">風</text>
        <path d="M16 88 L 62 88 M16 112 L 62 112 M16 136 L 62 136" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M62 88 L 54 83 M62 88 L 54 93 M62 112 L 54 107 M62 112 L 54 117
                 M62 136 L 54 131 M62 136 L 54 141"
              fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linecap="round"/>

        <text x="200" y="198" font-size="13" fill="${INK}" text-anchor="middle">身を上（皮を下）にして並べる</text>
      </svg>
    `,
  },

  // カサゴの棘の位置
  "kasago-toge": {
    title: "カサゴの棘の位置",
    caption: "背びれ・腹びれ・尻びれ・エラ蓋に鋭い棘がある。毒はないとされるが深く刺さり、傷口から細菌が入ることがある。素手でつかまず、捌く前にハサミで切り落とす。",
    svg: `
      <svg viewBox="0 0 400 250" role="img" aria-label="カサゴの側面図。背びれ・腹びれ・尻びれに鋭い棘があることを示している。">
        <path d="M30 150 C 38 124, 52 106, 78 98 C 110 88, 150 92, 190 104 C 230 116, 262 126, 282 134
                 L 282 146
                 C 262 154, 230 166, 190 176 C 150 186, 110 190, 78 182 C 52 174, 38 164, 30 156 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M282 134 L 326 112 L 316 139 L 326 166 L 282 146 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M92 96 L 100 66 L 110 90 L 120 62 L 130 88 L 140 60 L 150 88 L 160 62 L 170 92 L 180 66 L 190 96 L 196 80 L 204 106 Z"
              fill="#ffffff" stroke="${ACCENT}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M206 108 C 226 86, 254 94, 264 128 C 244 122, 222 114, 206 108 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>

        <path d="M110 160 C 134 166, 148 184, 134 198 C 118 190, 108 176, 110 160 Z"
              fill="none" stroke="${GRAY}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M84 172 L 88 200 L 104 186 Z"
              fill="#ffffff" stroke="${ACCENT}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M170 178 L 176 204 L 186 184 L 194 202 L 202 182 L 210 198 L 216 174 Z"
              fill="#ffffff" stroke="${ACCENT}" stroke-width="2.2" stroke-linejoin="round"/>

        <path d="M84 106 C 96 130, 96 156, 84 178" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M32 148 C 46 154, 62 158, 74 160" fill="none" stroke="${GRAY}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="62" cy="126" r="9" fill="none" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="62" cy="126" r="4" fill="${INK}"/>

        <path d="M150 58 L 150 40" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="150" y="34" font-size="13" fill="${ACCENT}" text-anchor="middle" font-weight="700">背びれの棘（最も鋭い）</text>

        <path d="M90 200 L 84 224" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="78" y="240" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">腹びれ</text>

        <path d="M198 202 L 226 224" fill="none" stroke="${GRAY}" stroke-width="1.5"/>
        <text x="246" y="240" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">尻びれ</text>

        <text x="342" y="46" font-size="12" fill="${ACCENT}" text-anchor="end" font-weight="700">素手でつかまない</text>
      </svg>
    `,
  },

  // 煮付け前の霜降り
  "kasago-shimofuri": {
    title: "煮付け前の霜降り",
    caption: "熱湯を回しかけて表面が白くなったら、すぐ冷水に取る。指でこすってぬめりと残ったウロコを落とすと、煮汁が濁らず味が澄む。",
    svg: `
      <svg viewBox="0 0 400 200" role="img" aria-label="霜降りの3手順を示した図。熱湯をかける、冷水に取る、こすって洗う。">
        <path d="M48 50 L 46 72 M68 50 L 66 72 M88 50 L 86 72" fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linecap="round"/>
        <text x="68" y="42" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">熱湯</text>
        <rect x="26" y="80" width="86" height="34" rx="3" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M40 98 C 52 88, 82 88, 94 98 C 82 108, 52 108, 40 98 Z
                 M94 98 L 108 91 L 104 98 L 108 105 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2"/>
        <text x="68" y="142" font-size="12" fill="${INK}" text-anchor="middle">① 熱湯をかける</text>
        <text x="68" y="160" font-size="11" fill="${GRAY}" text-anchor="middle">表面が白くなるまで</text>

        <path d="M124 98 L 148 98" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M148 98 L 140 93 M148 98 L 140 103" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M160 72 L 250 72 L 238 118 L 172 118 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M166 86 L 244 86 L 236 116 L 174 116 Z" fill="${WATER}" stroke="none"/>
        <path d="M166 86 L 244 86" fill="none" stroke="${GRAY}" stroke-width="1.6"/>
        <path d="M180 100 C 192 90, 218 90, 230 100 C 218 110, 192 110, 180 100 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2"/>
        <text x="205" y="142" font-size="12" fill="${INK}" text-anchor="middle">② すぐ冷水へ</text>
        <text x="205" y="160" font-size="11" fill="${ACCENT}" text-anchor="middle">火を入れすぎない</text>

        <path d="M262 98 L 286 98" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M286 98 L 278 93 M286 98 L 278 103" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M300 100 C 314 88, 348 88, 362 100 C 348 112, 314 112, 300 100 Z
                 M362 100 L 378 92 L 373 100 L 378 108 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M306 76 C 322 68, 350 68, 366 76" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <path d="M366 76 L 357 73 M366 76 L 359 81" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <path d="M306 76 L 315 73 M306 76 L 313 81" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <text x="336" y="142" font-size="12" fill="${INK}" text-anchor="middle">③ こすって洗う</text>
        <text x="336" y="160" font-size="11" fill="${GRAY}" text-anchor="middle">ぬめり・ウロコを落とす</text>
      </svg>
    `,
  },

  // キスの背開き
  "kisu-segaki": {
    title: "背開きの切り込み",
    caption: "頭を落としたら、背側から中骨の上に沿って尾まで開く。腹側の皮は切り離さず、観音開きのようにつなげたまま広げる。",
    svg: `
      <svg viewBox="0 0 400 210" role="img" aria-label="キスの側面図。頭を落とす位置と、背側から中骨の上を尾まで切り開く線を示している。">
        <path d="M40 110 C 62 98, 102 90, 152 88 C 212 86, 268 92, 306 102
                 L 306 116
                 C 268 126, 212 132, 152 130 C 102 128, 62 120, 40 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M306 102 L 348 84 L 338 109 L 348 134 L 306 116 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="58" cy="106" r="4.5" fill="none" stroke="${INK}" stroke-width="2"/>
        <path d="M76 94 C 84 102, 84 116, 76 126" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M88 82 L 96 138" fill="none" stroke="${GRAY}" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="70" y="164" font-size="12" fill="${GRAY}" text-anchor="middle">① 頭を落とす</text>
        <path d="M84 150 L 90 138" fill="none" stroke="${GRAY}" stroke-width="1.3"/>

        <path d="M110 98 C 170 94, 240 98, 296 106" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M296 106 L 284 100 M296 106 L 285 111" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M180 96 L 180 62" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="180" y="54" font-size="13" fill="${ACCENT}" text-anchor="middle" font-weight="700">② 中骨の上に沿って尾まで</text>
        <text x="180" y="34" font-size="11" fill="${GRAY}" text-anchor="middle">浅い切り込みを3回繰り返す</text>

        <path d="M112 122 C 172 126, 240 124, 292 118" fill="none" stroke="${GRAY}" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M220 128 L 240 158" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="266" y="168" font-size="12" fill="${INK}" text-anchor="middle">腹側は切り離さない</text>
        <text x="266" y="186" font-size="11" fill="${GRAY}" text-anchor="middle">つなげたまま開く</text>
      </svg>
    `,
  },

  // キスの中骨の外し方
  "kisu-nakabone": {
    title: "中骨の外し方",
    caption: "開いた身を広げ、中骨の下に包丁を寝かせて差し入れる。骨に沿って尾のほうへ滑らせ、尾の手前で中骨を切り離す。",
    svg: `
      <svg viewBox="0 0 400 210" role="img" aria-label="開いたキスを上から見た図。中骨の下に包丁を入れ、尾へ向かって滑らせる方向を示している。">
        <path d="M240 110 L 278 94 L 268 120 L 278 146 L 240 130 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M70 108 C 120 96, 190 100, 240 110 L 242 120 L 70 120 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M70 132 C 120 144, 190 140, 240 130 L 242 120 L 70 120 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>

        <path d="M74 119 L 238 120" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>
        <path d="M96 120 L 92 112 M120 120 L 116 112 M144 121 L 140 113 M168 121 L 164 113 M192 121 L 188 113"
              fill="none" stroke="${ACCENT}" stroke-width="1.4" stroke-linecap="round"/>

        <path d="M52 92 L 74 114" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="46" y="86" font-size="13" fill="${ACCENT}" text-anchor="middle" font-weight="700">中骨</text>

        <path d="M84 162 L 226 158" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M226 158 L 214 153 M226 158 L 215 164" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="150" y="186" font-size="12" fill="${INK}" text-anchor="middle">包丁を寝かせて尾へ滑らせる</text>

        <path d="M232 96 L 232 146" fill="none" stroke="${GRAY}" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M236 150 L 268 172" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="300" y="182" font-size="12" fill="${GRAY}" text-anchor="middle">尾の手前で切り離す</text>
      </svg>
    `,
  },

  // タイのウロコの飛散対策
  "tai-uroko": {
    title: "ウロコを飛び散らせない",
    caption: "タイのウロコは硬く、勢いよく飛ぶ。大きめのポリ袋に魚を入れ、袋の中に手を入れて取ると飛散が止まる。新聞紙を敷くだけでは防げない。",
    svg: `
      <svg viewBox="0 0 400 230" role="img" aria-label="左はそのままウロコを取ってウロコが飛び散る悪い例、右はポリ袋の中で取る良い例の比較図。">
        <path d="M200 40 L 200 170 " fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <text x="100" y="40" font-size="20" fill="${ACCENT}" font-weight="700" text-anchor="middle">✕</text>
        <text x="300" y="40" font-size="20" fill="${INK}" font-weight="700" text-anchor="middle">○</text>

        <path d="M46 118 C 64 100, 118 100, 138 118 C 118 136, 64 136, 46 118 Z
                 M138 118 L 162 105 L 155 118 L 162 131 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <circle cx="60" cy="114" r="2.5" fill="none" stroke="${INK}" stroke-width="1.5"/>

        <path d="M56 92 l 7 -6 l 3 8 Z M92 80 l 8 -4 l 1 8 Z M128 86 l 8 -5 l 2 8 Z
                 M40 146 l 8 4 l -1 -8 Z M84 156 l 8 3 l 0 -8 Z M126 150 l 8 4 l -1 -8 Z
                 M26 106 l -8 -3 l 1 8 Z M158 92 l 7 -6 l 3 8 Z"
              fill="#ffffff" stroke="${ACCENT}" stroke-width="1.8" stroke-linejoin="round"/>

        <text x="100" y="196" font-size="13" fill="${INK}" text-anchor="middle">そのまま取る</text>
        <text x="100" y="216" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">壁や床まで飛ぶ</text>

        <rect x="228" y="76" width="146" height="88" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
        <path d="M228 90 L 374 90" fill="none" stroke="${GRAY}" stroke-width="1.8"/>
        <path d="M290 80 L 290 88 M300 80 L 300 88 M310 80 L 310 88" fill="none" stroke="${LIGHT}" stroke-width="1.5"/>

        <path d="M248 124 C 264 108, 312 108, 330 124 C 312 140, 264 140, 248 124 Z
                 M330 124 L 352 112 L 346 124 L 352 136 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="2"/>
        <circle cx="260" cy="120" r="2.5" fill="none" stroke="${GRAY}" stroke-width="1.5"/>

        <path d="M256 102 l 7 -5 l 2 7 Z M298 100 l 7 -4 l 1 7 Z M336 104 l 7 -5 l 2 7 Z
                 M252 148 l 7 4 l -1 -7 Z M300 152 l 7 3 l 0 -7 Z M342 146 l 7 4 l -1 -7 Z"
              fill="#ffffff" stroke="${GRAY}" stroke-width="1.6" stroke-linejoin="round"/>

        <text x="300" y="196" font-size="13" fill="${INK}" text-anchor="middle">ポリ袋の中で取る</text>
        <text x="300" y="216" font-size="12" fill="${GRAY}" text-anchor="middle">飛散が袋で止まる</text>
      </svg>
    `,
  },

  // 兜割りの刃を入れる位置
  "tai-kabutowari": {
    title: "兜割りで刃を入れる位置",
    caption: "頭を立てて置き、上あごの中心（前歯の間）に出刃の刃元を当てる。包丁の背を叩いて少しずつ押し進め、硬いところで止まったら位置を変えて入れ直す。",
    svg: `
      <svg viewBox="0 0 400 240" role="img" aria-label="タイの頭を口が上になるよう立てて置き、上あごの中心に出刃を当てて上から割る位置を示した図。">
        <text x="200" y="20" font-size="12" fill="${GRAY}" text-anchor="middle">頭を立てて置く（口が上）</text>

        <path d="M200 12 L 200 26" fill="none" stroke="${ACCENT}" stroke-width="2"/>
        <path d="M200 30 L 195 20 M200 30 L 205 20" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>

        <rect x="192" y="36" width="16" height="30" rx="2" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
        <path d="M192 66 L 200 78 L 208 66 Z" fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M216 48 L 248 48" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="254" y="52" font-size="12" fill="${INK}">出刃の刃元を当てる</text>

        <path d="M200 78 C 174 92, 152 120, 146 152 C 142 180, 145 200, 149 210
                 L 253 210
                 C 257 198, 259 174, 253 146 C 246 110, 224 90, 200 78 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

        <path d="M190 84 C 194 80, 206 80, 210 84" fill="none" stroke="${GRAY}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="176" cy="142" r="11" fill="none" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="176" cy="142" r="4.5" fill="${INK}"/>
        <path d="M156 182 C 180 194, 222 194, 246 182" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M200 72 L 200 216" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="7 5"/>

        <path d="M112 210 L 292 210" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <text x="316" y="214" font-size="11" fill="${GRAY}">まな板</text>

        <path d="M212 88 L 276 104" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="282" y="108" font-size="12" fill="${ACCENT}" font-weight="700">上あごの中心</text>
        <text x="282" y="126" font-size="11" fill="${GRAY}">前歯の間から入れる</text>

        <text x="66" y="108" font-size="12" fill="${INK}" text-anchor="middle">背を叩いて</text>
        <text x="66" y="126" font-size="12" fill="${INK}" text-anchor="middle">押し進める</text>
        <text x="66" y="150" font-size="11" fill="${ACCENT}" text-anchor="middle">力任せに叩かない</text>
      </svg>
    `,
  },

  // ブリの部位の分け方
  "buri-bui": {
    title: "部位の分け方",
    caption: "背身は脂が控えめで刺身向き、腹身は脂が多く焼き物向き。カマは頭を落とすときに頭側へ付けておくと分けやすい。中骨と頭はアラとして汁物に使う。",
    svg: `
      <svg viewBox="0 0 400 230" role="img" aria-label="ブリの側面図。頭・カマ・背身・腹身・中骨に分ける位置を示している。">
        <path d="M40 110 C 60 84, 100 66, 150 62 C 210 58, 270 70, 310 92
                 L 310 128
                 C 270 150, 210 162, 150 158 C 100 154, 60 136, 40 110 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M310 92 L 356 68 L 344 110 L 356 152 L 310 128 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="62" cy="104" r="5.5" fill="none" stroke="${INK}" stroke-width="2.2"/>

        <path d="M94 72 L 100 150" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M120 66 L 126 156" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M126 110 C 190 106, 250 110, 306 112" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4"/>

        <path d="M56 46 L 70 92" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="48" y="40" font-size="12" fill="${INK}" text-anchor="middle" font-weight="700">頭</text>

        <path d="M104 196 L 110 152" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="100" y="212" font-size="12" fill="${INK}" text-anchor="middle" font-weight="700">カマ</text>

        <path d="M215 46 L 215 84" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="215" y="40" font-size="13" fill="${INK}" text-anchor="middle" font-weight="700">背身（刺身向き）</text>

        <path d="M215 190 L 215 140" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="215" y="206" font-size="13" fill="${INK}" text-anchor="middle" font-weight="700">腹身（焼き物向き）</text>

        <path d="M330 46 L 256 108" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="344" y="40" font-size="12" fill="${GRAY}" text-anchor="middle">中骨（アラ）</text>
      </svg>
    `,
  },

  // ブリ糸状虫とアニサキスの違い
  "buri-shijouchuu": {
    title: "ブリ糸状虫とアニサキスの違い",
    caption: "赤くて細長いのがブリ糸状虫で、人には寄生せず食べても害はない。白く不透明で渦を巻いているのがアニサキスで、こちらは症状を起こす。見分けは色と形でつく。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="左はブリ糸状虫、右はアニサキスの見え方を切り身の図で比較している。">
        <rect x="30" y="60" width="140" height="88" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
        <rect x="30" y="96" width="140" height="18" fill="${LIGHT}" stroke="none"/>
        <path d="M30 96 L 170 96 M30 114 L 170 114" fill="none" stroke="${GRAY}" stroke-width="1.2"/>
        <path d="M30 138 L 170 138" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <path d="M44 108 C 66 88, 84 122, 106 100 C 124 82, 140 116, 158 104"
              fill="none" stroke="${ACCENT}" stroke-width="2.8" stroke-linecap="round"/>

        <text x="100" y="176" font-size="13" fill="${INK}" text-anchor="middle" font-weight="700">ブリ糸状虫</text>
        <text x="100" y="196" font-size="12" fill="${GRAY}" text-anchor="middle">赤い糸状・血合い付近</text>
        <text x="100" y="214" font-size="12" fill="${GRAY}" text-anchor="middle">食べても害はない</text>

        <rect x="230" y="60" width="140" height="88" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
        <rect x="230" y="96" width="140" height="18" fill="${LIGHT}" stroke="none"/>
        <path d="M230 96 L 370 96 M230 114 L 370 114" fill="none" stroke="${GRAY}" stroke-width="1.2"/>
        <path d="M230 138 L 370 138" fill="none" stroke="${GRAY}" stroke-width="1.8"/>

        <path d="M300 76 C 322 76, 332 92, 332 104 C 332 118, 318 126, 306 126
                 C 294 126, 288 118, 288 110 C 288 102, 296 98, 302 100"
              fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
        <path d="M300 76 C 322 76, 332 92, 332 104 C 332 118, 318 126, 306 126
                 C 294 126, 288 118, 288 110 C 288 102, 296 98, 302 100"
              fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>

        <text x="300" y="176" font-size="13" fill="${INK}" text-anchor="middle" font-weight="700">アニサキス</text>
        <text x="300" y="196" font-size="12" fill="${GRAY}" text-anchor="middle">白く不透明・渦を巻く</text>
        <text x="300" y="214" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">症状を起こす</text>
      </svg>
    `,
  },

  // 皮の引き方
  "suzuki-kawahiki": {
    title: "皮の引き方",
    caption: "包丁は寝かせてまな板に押しつけ、ほとんど動かさない。動かすのは左手で持った皮のほう。刃を上に向けると身を削ってしまう。",
    svg: `
      <svg viewBox="0 0 400 220" role="img" aria-label="柵の皮を引く図。包丁を寝かせて固定し、皮を左手で引っぱる方向を示している。">
        <path d="M46 144 L 344 144" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <text x="352" y="148" font-size="11" fill="${GRAY}">まな板</text>

        <path d="M120 100 C 180 92, 262 94, 322 102 L 322 126 L 120 126 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="170" y="88" font-size="12" fill="${INK}" text-anchor="middle">身</text>

        <path d="M124 128 L 266 122 L 266 133 L 128 135 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <rect x="266" y="120" width="48" height="15" rx="3" fill="#f0f0f0" stroke="${INK}" stroke-width="2"/>
        <path d="M300 118 L 322 76" fill="none" stroke="${GRAY}" stroke-width="1.3"/>
        <text x="348" y="60" font-size="12" fill="${INK}" text-anchor="end">包丁は寝かせて固定</text>
        <text x="348" y="78" font-size="11" fill="${GRAY}" text-anchor="end">刃はまな板へ向ける</text>

        <path d="M128 135 C 104 138, 80 140, 56 142" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M56 142 L 68 137 M56 142 L 68 147" fill="none" stroke="${ACCENT}" stroke-width="3.5" stroke-linecap="round"/>
        <text x="76" y="176" font-size="12" fill="${ACCENT}" text-anchor="middle" font-weight="700">皮を左手で引く</text>
        <text x="76" y="194" font-size="11" fill="${GRAY}" text-anchor="middle">動かすのはこちら</text>
      </svg>
    `,
  },

  // ぬめりを塩で落とす
  "nijimasu-numeri": {
    title: "ぬめりは塩で落とす",
    caption: "ニジマスの臭みの大半は体表のぬめり。粗塩をふって手でこすると、ぬめりが白く浮いてくる。これを流水で洗い流す。水で流すだけでは取り切れない。",
    svg: `
      <svg viewBox="0 0 400 200" role="img" aria-label="ぬめりを落とす3手順の図。塩をふる、手でこする、流水で洗い流す。">
        <path d="M40 62 l 4 -6 l 3 6 Z M62 56 l 4 -6 l 3 6 Z M84 60 l 4 -6 l 3 6 Z M106 54 l 4 -6 l 3 6 Z"
              fill="${INK}" stroke="none"/>
        <text x="76" y="42" font-size="12" fill="${INK}" text-anchor="middle" font-weight="700">粗塩</text>
        <path d="M42 84 C 58 70, 96 70, 112 84 C 96 98, 58 98, 42 84 Z
                 M112 84 L 130 74 L 125 84 L 130 94 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <text x="76" y="140" font-size="12" fill="${INK}" text-anchor="middle">① 塩をふる</text>
        <text x="76" y="158" font-size="11" fill="${GRAY}" text-anchor="middle">全体にまんべんなく</text>

        <path d="M146 84 L 168 84" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M168 84 L 160 79 M168 84 L 160 89" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M182 84 C 198 70, 236 70, 252 84 C 236 98, 198 98, 182 84 Z
                 M252 84 L 270 74 L 265 84 L 270 94 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <path d="M188 62 C 206 54, 232 54, 248 62" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <path d="M248 62 L 239 59 M248 62 L 241 67" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <path d="M188 62 L 197 59 M188 62 L 195 67" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
        <text x="216" y="140" font-size="12" fill="${INK}" text-anchor="middle">② 手でこする</text>
        <text x="216" y="158" font-size="11" fill="${ACCENT}" text-anchor="middle">白く浮いてくる</text>

        <path d="M286 84 L 308 84" fill="none" stroke="${GRAY}" stroke-width="2"/>
        <path d="M308 84 L 300 79 M308 84 L 300 89" fill="none" stroke="${GRAY}" stroke-width="2"/>

        <path d="M330 48 L 328 68 M344 48 L 342 68 M358 48 L 356 68"
              fill="none" stroke="${GRAY}" stroke-width="1.8" stroke-linecap="round"/>
        <text x="344" y="42" font-size="11" fill="${GRAY}" text-anchor="middle">流水</text>
        <path d="M310 90 C 324 78, 354 78, 366 90 C 354 102, 324 102, 310 90 Z
                 M366 90 L 384 81 L 379 90 L 384 99 Z"
              fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
        <text x="344" y="140" font-size="12" fill="${INK}" text-anchor="middle">③ 洗い流す</text>
        <text x="344" y="158" font-size="11" fill="${GRAY}" text-anchor="middle">ざらつきが残れば再度</text>
      </svg>
    `,
  },
};

module.exports = { FIGURES };
