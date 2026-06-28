const FISH_LIST = [
  { name: "アジ",   emoji: "🐟" },
  { name: "サバ",   emoji: "🐠" },
  { name: "イワシ", emoji: "🐟" },
  { name: "タイ",   emoji: "🎏" },
  { name: "スズキ", emoji: "🐡" },
  { name: "ブリ",   emoji: "🐟" },
  { name: "カサゴ", emoji: "🦐" },
  { name: "メバル", emoji: "🐠" },
  { name: "ハマチ", emoji: "🐟" },
  { name: "キス",   emoji: "🐡" },
];

const PLACES = [
  { name: "家のキッチン", emoji: "🏠", desc: "調理設備が充実している" },
  { name: "キャンプ場",   emoji: "⛺", desc: "アウトドアで調理" },
  { name: "釣り場その場", emoji: "🎣", desc: "釣り場で即料理" },
];

const TOOLS = [
  { name: "なんでもある",   emoji: "✅", desc: "フライパン・包丁・オーブンなど全部OK" },
  { name: "フライパン",     emoji: "🍳", desc: "フライパンと火があれば" },
  { name: "グリル・網",     emoji: "🔥", desc: "炭火・ガス火・グリルで焼く" },
  { name: "包丁まな板あり", emoji: "🔪", desc: "刺身など生食系もOK" },
];

const SEASONINGS_LIST = [
  { name: "塩",     emoji: "🧂" },
  { name: "醤油",   emoji: "🍶" },
  { name: "みりん", emoji: "🍶" },
  { name: "料理酒", emoji: "🍶" },
  { name: "砂糖",   emoji: "🍬" },
  { name: "味噌",   emoji: "🫙" },
  { name: "酢",     emoji: "🫙" },
  { name: "バター", emoji: "🧈" },
  { name: "サラダ油", emoji: "🫙" },
  { name: "ごま油", emoji: "🫙" },
  { name: "にんにく", emoji: "🧄" },
  { name: "生姜",   emoji: "🌿" },
  { name: "薄力粉", emoji: "🌾" },
  { name: "片栗粉", emoji: "🌾" },
  { name: "ポン酢", emoji: "🍋" },
  { name: "わさび", emoji: "🌿" },
];

const AMAZON_BASE = "https://www.amazon.co.jp/s?k=";
// TODO: Amazonアソシエイト承認後に &tag=XXXX を追記する

const RECIPES = {
  "アジ": [
    {
      name: "アジの刺身",
      places: ["家のキッチン", "釣り場その場"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油", "わさび"],
      servings: "2人分", time: "15分",
      ingredients: ["アジ 2尾", "醤油 適量", "わさび 適量", "大葉・大根おろし（あれば）"],
      steps: [
        "アジのうろこ・エラ・内臓を取り除き、水で洗って水気を拭く。",
        "頭を落とし、三枚おろしにする。腹骨を削ぎ取る。",
        "皮を引き、食べやすい厚さ（約7mm）に切る。",
        "器に盛り、わさびと醤油を添えて完成。",
      ],
    },
    {
      name: "アジフライ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["塩", "薄力粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["アジ 2尾（三枚おろし）", "塩こしょう 少々", "薄力粉 大さじ3", "溶き卵 1個分", "パン粉 適量", "サラダ油 揚げ油"],
      steps: [
        "三枚おろしにしたアジに塩こしょうをして5分置く。",
        "薄力粉→溶き卵→パン粉の順にまぶす。",
        "180℃のサラダ油で3〜4分、こんがりきつね色になるまで揚げる。",
        "油を切り、タルタルソースやウスターソースを添えて完成。",
      ],
    },
    {
      name: "アジのなめろう",
      places: ["家のキッチン", "釣り場その場", "キャンプ場"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["味噌", "生姜"],
      servings: "2人分", time: "10分",
      ingredients: ["アジ 2尾（三枚おろし）", "味噌 大さじ1", "生姜 小さじ1（すりおろし）", "ねぎ（小口切り）適量", "大葉 3〜4枚"],
      steps: [
        "三枚おろしにしたアジから皮を引き、粗みじんに切る。",
        "まな板の上にアジ・味噌・生姜・ねぎ・大葉を乗せ、包丁でたたきながら混ぜ合わせる。",
        "好みの粘り気になったら器に盛り完成。ご飯や冷酒によく合う。",
      ],
    },
    {
      name: "アジの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["アジ 2尾", "塩 適量", "大根おろし（あれば）", "レモン（あれば）"],
      steps: [
        "アジのうろこ・エラ・内臓を取り除き、洗って水気を拭く。",
        "両面に塩をふり、15分置いて余分な水分を出す。",
        "グリルまたは網を中火で予熱し、アジを並べる。",
        "片面5分ずつ、こんがりと焼き色がつくまで焼いて完成。",
      ],
    },
    {
      name: "アジのムニエル",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "バター", "薄力粉"],
      servings: "2人分", time: "20分",
      ingredients: ["アジ 2尾（三枚おろし）", "塩こしょう 少々", "薄力粉 大さじ2", "バター 20g", "レモン（あれば）"],
      steps: [
        "三枚おろしのアジに塩こしょうをして5分置き、薄力粉を薄くまぶす。",
        "フライパンにバターを熱し、中火でアジの皮面から焼く。",
        "2〜3分で焼き色がついたら裏返し、さらに2分焼く。",
        "仕上げにバターをひとかけ足し、全体にからめてレモンを絞って完成。",
      ],
    },
    {
      name: "アジの南蛮漬け",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["酢", "醤油", "砂糖", "片栗粉", "サラダ油"],
      servings: "2人分", time: "30分",
      ingredients: ["アジ 2尾（三枚おろし）", "酢 大さじ3", "醤油 大さじ2", "砂糖 大さじ1", "水 大さじ2", "片栗粉 大さじ2", "サラダ油 揚げ油", "玉ねぎ・ピーマン（あれば）"],
      steps: [
        "酢・醤油・砂糖・水を混ぜてタレを作る。",
        "アジに塩こしょうして片栗粉をまぶし、180℃の油で揚げる。",
        "揚げたてのアジを熱いうちにタレに漬ける。",
        "薄切りにした玉ねぎ・ピーマンも一緒に漬けて、30分以上おいたら完成。",
      ],
    },
    {
      name: "アジのバター醤油焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["バター", "醤油"],
      servings: "2人分", time: "15分",
      ingredients: ["アジ 2尾（三枚おろし）", "バター 15g", "醤油 大さじ1", "塩こしょう 少々"],
      steps: [
        "アジに塩こしょうをして下味をつける。",
        "フライパンにバターを溶かし、中火でアジの皮面から焼く。",
        "焼き色がついたら裏返し、醤油を回しかけて全体にからめる。",
        "バターが香ばしく焦げたら完成。ご飯がすすむ一品。",
      ],
    },
    {
      name: "アジのたたき",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油", "生姜"],
      servings: "2人分", time: "15分",
      ingredients: ["アジ 2尾（三枚おろし）", "醤油 大さじ1.5", "生姜（すりおろし）小さじ1", "ねぎ（小口切り）適量", "みょうが（あれば）"],
      steps: [
        "三枚おろしのアジを皮目を上にして網の上に置き、バーナーまたは直火で皮面をさっと炙る。",
        "すぐに氷水に取り、水気をしっかり拭く。",
        "食べやすい大きさに切り、器に盛る。",
        "生姜・ねぎをのせ、醤油をかけて完成。",
      ],
    },
  ],

  "サバ": [
    {
      name: "サバの味噌煮",
      places: ["家のキッチン"],
      tools: ["なんでもある", "フライパン"],
      seasonings: ["味噌", "みりん", "砂糖", "料理酒", "生姜"],
      servings: "2人分", time: "25分",
      ingredients: ["サバ 半身2切れ", "味噌 大さじ2", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 大さじ2", "水 150ml", "生姜 1かけ（薄切り）"],
      steps: [
        "サバの皮に切り込みを入れ、熱湯をかけて霜降りにし、水気を拭く。",
        "鍋に水・料理酒・みりん・砂糖・生姜を入れて煮立てる。",
        "サバを皮面を上にして入れ、落し蓋をして中火で10分煮る。",
        "味噌を溶き入れ、さらに5分煮て煮汁が半量になったら完成。",
      ],
    },
    {
      name: "サバの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["サバ 2切れ", "塩 適量", "大根おろし（あれば）", "すだち（あれば）"],
      steps: [
        "サバに塩をふり、15分置いて臭みを除く。出てきた水分を拭き取る。",
        "グリル・網を中火で予熱する。",
        "皮面を下にして並べ、5〜6分焼く。",
        "裏返してさらに3〜4分焼き、こんがりしたら完成。",
      ],
    },
    {
      name: "しめサバ",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["塩", "酢", "砂糖"],
      servings: "2人分", time: "60分（漬け込み含む）",
      ingredients: ["サバ 半身2枚", "塩 大さじ2", "酢 100ml", "砂糖 大さじ1"],
      steps: [
        "サバを三枚おろしにして腹骨を取り、塩を全体にまぶして30分置く。",
        "塩を洗い流し、水気を拭く。",
        "酢と砂糖を混ぜた漬け酢にサバを浸し、20〜30分漬ける。",
        "酢から取り出して皮を引き、食べやすく切ったら完成。",
      ],
    },
    {
      name: "サバの竜田揚げ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "生姜", "片栗粉", "サラダ油"],
      servings: "2人分", time: "30分",
      ingredients: ["サバ 2切れ", "醤油 大さじ2", "みりん 大さじ1", "生姜（すりおろし）小さじ1", "片栗粉 大さじ3", "サラダ油 揚げ油"],
      steps: [
        "サバを一口大に切り、醤油・みりん・生姜で20分漬け込む。",
        "漬け汁を拭き取り、片栗粉をしっかりまぶす。",
        "180℃の油で3〜4分、カリッとするまで揚げる。",
        "油を切って盛り付け、レモンを絞って完成。",
      ],
    },
    {
      name: "サバのみそ焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "フライパン", "なんでもある"],
      seasonings: ["味噌", "みりん", "料理酒"],
      servings: "2人分", time: "25分",
      ingredients: ["サバ 2切れ", "味噌 大さじ2", "みりん 大さじ1", "料理酒 大さじ1"],
      steps: [
        "味噌・みりん・料理酒を混ぜてみそダレを作る。",
        "サバの両面にみそダレを塗り、15分置く。",
        "グリルまたはフライパンで中火で焼く。焦げやすいので火加減に注意。",
        "両面にきれいな焼き色がついたら完成。",
      ],
    },
    {
      name: "サバのアクアパッツァ",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "サラダ油", "にんにく"],
      servings: "2人分", time: "25分",
      ingredients: ["サバ 2切れ", "塩こしょう 少々", "にんにく 1かけ", "ミニトマト 8個", "アサリ（あれば）100g", "白ワイン（または料理酒）50ml", "水 100ml", "オリーブオイル（またはサラダ油）大さじ1", "パセリ（あれば）"],
      steps: [
        "サバに塩こしょうをする。にんにくは薄切りにする。",
        "フライパンにオイルとにんにくを入れて弱火で香りを出す。",
        "サバを皮面から入れ、中火で2分焼いて裏返す。",
        "ミニトマト・アサリ・白ワイン・水を加えて蓋をし、中火で8分蒸し煮にして完成。",
      ],
    },
  ],

  "イワシ": [
    {
      name: "イワシの蒲焼き",
      places: ["家のキッチン"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "20分",
      ingredients: ["イワシ 4尾（手開き）", "醤油 大さじ2", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 大さじ1", "薄力粉 少々", "サラダ油 少々"],
      steps: [
        "イワシを手開きにして内臓・骨を取り、水気を拭く。",
        "薄力粉を薄くまぶす。",
        "フライパンに油を熱し、イワシを皮面から中火で焼く。",
        "両面に焼き色がついたら醤油・みりん・砂糖・料理酒を合わせたタレを加え、絡めながら煮詰めて完成。",
      ],
    },
    {
      name: "イワシの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["イワシ 4尾", "塩 適量", "大根おろし（あれば）"],
      steps: [
        "イワシの内臓を取り除き、よく洗って水気を拭く。",
        "全体に塩をふり、10分置く。",
        "グリル・網で中火で両面をこんがり焼く（片面4〜5分）。",
        "大根おろしを添えて完成。",
      ],
    },
    {
      name: "イワシのつみれ汁",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["味噌", "生姜", "料理酒"],
      servings: "2〜3人分", time: "30分",
      ingredients: ["イワシ 4尾", "味噌 大さじ2〜3", "生姜（すりおろし）小さじ1", "料理酒 大さじ1", "だし汁 600ml", "ねぎ 少々"],
      steps: [
        "イワシを手開きにして皮と骨を取り除き、包丁でよく叩く。",
        "叩いたイワシに生姜・料理酒・片栗粉少々を加えてこね、小さく丸める。",
        "だし汁を沸かし、つみれを入れて3〜4分煮る。",
        "火を止めて味噌を溶き入れ、ねぎを散らして完成。",
      ],
    },
    {
      name: "イワシの梅煮",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒", "酢"],
      servings: "2人分", time: "30分",
      ingredients: ["イワシ 4尾", "梅干し 2個", "醤油 大さじ2", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 大さじ2", "水 100ml", "生姜 1かけ"],
      steps: [
        "イワシの内臓を取り除き、霜降りにして水気を拭く。",
        "鍋に水・料理酒・みりん・砂糖・醤油・梅干し・生姜を入れて煮立てる。",
        "イワシを入れ、落し蓋をして中火で15分煮る。",
        "煮汁が少なくなり、イワシに照りが出たら完成。",
      ],
    },
    {
      name: "イワシフライ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["塩", "薄力粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["イワシ 4尾（手開き）", "塩こしょう 少々", "薄力粉 大さじ3", "溶き卵 1個", "パン粉 適量", "サラダ油 揚げ油"],
      steps: [
        "イワシを手開きにして骨を取り、塩こしょうをする。",
        "薄力粉→溶き卵→パン粉の順に衣をつける。",
        "180℃の油で3分ほど揚げ、きつね色になったら完成。",
        "ウスターソースやタルタルソースで食べると絶品。",
      ],
    },
  ],

  "タイ": [
    {
      name: "タイの刺身",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油", "わさび"],
      servings: "2人分", time: "20分",
      ingredients: ["タイ 半身", "醤油 適量", "わさび 適量", "大根（つま用）", "大葉"],
      steps: [
        "タイを三枚おろしにして皮を引く。",
        "血合い骨をピンセットで抜く。",
        "繊維を断つよう斜めに包丁を入れ、5〜7mm幅に切る。",
        "器に大根のつまと大葉を敷き、並べてわさびと醤油を添えて完成。",
      ],
    },
    {
      name: "タイの塩焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "25分",
      ingredients: ["タイ 1尾（または切り身2切れ）", "塩 適量", "すだち（あれば）"],
      steps: [
        "タイのうろこ・内臓を取り、水洗いして水気を拭く。",
        "全体にたっぷり塩をふり、20分置く。",
        "グリルで中火、両面を各5〜7分こんがり焼く。",
        "すだちを添えて完成。ひれが焦げそうなら塩でコーティングしておく。",
      ],
    },
    {
      name: "タイめし",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "料理酒", "塩"],
      servings: "3〜4人分", time: "40分",
      ingredients: ["タイ 切り身2切れ", "米 2合", "醤油 大さじ2", "みりん 大さじ1", "料理酒 大さじ1", "塩 少々", "昆布 5cm", "ごま・三つ葉（あれば）"],
      steps: [
        "米を洗い、炊飯器に入れる。醤油・みりん・料理酒・塩を加え、2合の目盛りまで水を足す。",
        "タイを塩で下味をつけ、昆布と一緒に米の上に置く。",
        "通常モードで炊く。",
        "炊き上がったらタイの骨を取り除き、ほぐして混ぜ、ごまと三つ葉を散らして完成。",
      ],
    },
    {
      name: "タイのアクアパッツァ",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "サラダ油", "にんにく"],
      servings: "2人分", time: "25分",
      ingredients: ["タイ 切り身2切れ", "塩こしょう 少々", "にんにく 1かけ", "ミニトマト 8個", "アサリ（あれば）150g", "白ワイン（または料理酒）50ml", "水 100ml", "オリーブオイル（またはサラダ油）大さじ1"],
      steps: [
        "タイに塩こしょうをする。にんにくは薄切り。",
        "フライパンにオイルとにんにくを入れて弱火で香りを出す。",
        "タイを皮面から中火で2〜3分焼き、裏返す。",
        "ミニトマト・アサリ・白ワイン・水を加えて蓋をし、8分蒸し煮にして完成。",
      ],
    },
    {
      name: "タイの兜煮",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "30分",
      ingredients: ["タイの頭（兜）1個を半割り", "醤油 大さじ3", "みりん 大さじ3", "砂糖 大さじ1.5", "料理酒 50ml", "水 100ml", "生姜 1かけ"],
      steps: [
        "タイの兜に熱湯をかけて霜降りにし、水洗いして水気を拭く。",
        "鍋に水・料理酒・みりん・砂糖・醤油・生姜を入れて煮立てる。",
        "タイを入れて落し蓋をし、中火で15〜20分煮る。",
        "煮汁が半量になり照りが出たら完成。",
      ],
    },
    {
      name: "タイのカルパッチョ",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["塩", "サラダ油", "酢"],
      servings: "2人分", time: "15分",
      ingredients: ["タイ 半身（刺身用）", "塩こしょう 少々", "オリーブオイル（またはサラダ油）大さじ2", "レモン汁（または酢）大さじ1", "玉ねぎ（薄切り）少々", "ハーブ（あれば）"],
      steps: [
        "タイを薄く（3〜4mm）削ぎ切りにして皿に放射状に並べる。",
        "オイル・レモン汁・塩こしょうを混ぜてドレッシングを作る。",
        "タイの上に薄切り玉ねぎをのせ、ドレッシングをかける。",
        "冷蔵庫で10分冷やして完成。",
      ],
    },
  ],

  "スズキ": [
    {
      name: "スズキのムニエル",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "バター", "薄力粉"],
      servings: "2人分", time: "20分",
      ingredients: ["スズキ 切り身2切れ", "塩こしょう 少々", "薄力粉 大さじ2", "バター 20g", "レモン（あれば）", "パセリ（あれば）"],
      steps: [
        "スズキに塩こしょうをして5分置き、水気を拭いて薄力粉をまぶす。",
        "フライパンにバターを溶かし、中火でスズキを皮面から焼く。",
        "3分で焼き色がついたら裏返し、2分焼く。",
        "仕上げにバターをひとかけ加えてソースを作り、スズキにかけて完成。",
      ],
    },
    {
      name: "スズキの刺身",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油", "わさび"],
      servings: "2人分", time: "20分",
      ingredients: ["スズキ 半身", "醤油 適量", "わさび 適量", "大根（つま用）", "大葉"],
      steps: [
        "スズキを三枚おろしにして皮を引く。",
        "血合い骨をピンセットで抜く。",
        "斜めに包丁を入れて5〜7mm幅に切る。",
        "器に盛り、わさびと醤油を添えて完成。",
      ],
    },
    {
      name: "スズキのソテー",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "バター", "サラダ油"],
      servings: "2人分", time: "20分",
      ingredients: ["スズキ 切り身2切れ", "塩こしょう 少々", "バター 15g", "サラダ油 大さじ1", "にんにく（あれば）1かけ"],
      steps: [
        "スズキに塩こしょうをして水気を拭く。",
        "フライパンにサラダ油を熱し、皮面から中火で3分焼く。",
        "裏返してバターとにんにくを加え、バターを溶かしながら2分焼く。",
        "スプーンでバターをすくいながらかけて香ばしく仕上げて完成。",
      ],
    },
    {
      name: "スズキの塩焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["スズキ 切り身2切れ", "塩 適量", "すだち（あれば）"],
      steps: [
        "スズキに塩をふり、15分置いて水気を拭く。",
        "グリルを中火で予熱し、皮面を下にして並べる。",
        "5〜6分焼いて裏返し、3〜4分焼いて完成。",
      ],
    },
    {
      name: "スズキのアクアパッツァ",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "サラダ油", "にんにく"],
      servings: "2人分", time: "25分",
      ingredients: ["スズキ 切り身2切れ", "塩こしょう 少々", "にんにく 1かけ", "ミニトマト 8個", "オリーブ（あれば）", "白ワイン（または料理酒）50ml", "水 100ml", "サラダ油 大さじ1"],
      steps: [
        "スズキに塩こしょう。にんにくは薄切り。",
        "フライパンにオイルとにんにくを弱火で炒めて香りを出す。",
        "スズキを皮面から中火で2〜3分焼き、裏返す。",
        "トマト・白ワイン・水を加えて蓋をし、8分蒸し煮して完成。",
      ],
    },
    {
      name: "スズキのカルパッチョ",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["塩", "サラダ油", "酢"],
      servings: "2人分", time: "15分",
      ingredients: ["スズキ 刺身用半身", "塩こしょう 少々", "オリーブオイル（またはサラダ油）大さじ2", "レモン汁（または酢）大さじ1", "玉ねぎ 少々"],
      steps: [
        "スズキを薄く削ぎ切りにして皿に並べる。",
        "オイル・レモン汁・塩こしょうを混ぜてドレッシングを作る。",
        "薄切り玉ねぎをのせ、ドレッシングをかけて10分冷やして完成。",
      ],
    },
  ],

  "ブリ": [
    {
      name: "ブリの照り焼き",
      places: ["家のキッチン"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "20分",
      ingredients: ["ブリ 切り身2切れ", "醤油 大さじ2", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 大さじ1", "サラダ油 少々"],
      steps: [
        "ブリに塩をふって10分置き、水気を拭く。",
        "フライパンに油を熱し、中火でブリを両面焼いて取り出す。",
        "同じフライパンに醤油・みりん・砂糖・料理酒を入れて煮立てる。",
        "ブリを戻してタレにからめながら照りが出るまで焼いて完成。",
      ],
    },
    {
      name: "ブリ大根",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒", "生姜"],
      servings: "2〜3人分", time: "45分",
      ingredients: ["ブリ 切り身2切れ", "大根 1/2本", "醤油 大さじ3", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 50ml", "水 200ml", "生姜 1かけ"],
      steps: [
        "大根を2cm厚さの半月切りにして下茹でする。ブリは霜降りにして水気を拭く。",
        "鍋に水・料理酒・みりん・砂糖・醤油・生姜を煮立てる。",
        "大根を入れて中火で10分煮る。",
        "ブリを加えて落し蓋をし、さらに15分煮て完成。",
      ],
    },
    {
      name: "ブリの刺身",
      places: ["家のキッチン"],
      tools: ["包丨まな板あり", "なんでもある"],
      seasonings: ["醤油"],
      servings: "2人分", time: "15分",
      ingredients: ["ブリ 刺身用半身", "醤油 適量", "わさび（あれば）", "大葉"],
      steps: [
        "ブリを三枚おろしにして皮を引く。",
        "血合い骨を抜き、繊維を断つよう斜めに8mm厚に切る。",
        "器に大葉を敷いて並べ、わさびと醤油を添えて完成。",
      ],
    },
    {
      name: "ブリしゃぶ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["ポン酢", "ごま油"],
      servings: "2人分", time: "20分",
      ingredients: ["ブリ 刺身用半身（薄切り）", "昆布 10cm", "ポン酢 適量", "ごま油 少々", "ねぎ・もみじおろし（あれば）", "水菜・豆腐"],
      steps: [
        "昆布を水に30分浸してだし汁を作り、鍋で温める。",
        "ブリを刺身より薄めに切る。",
        "沸騰直前のだし汁にブリをさっとくぐらせ、色が変わったら取り出す。",
        "ポン酢とごま油を混ぜたタレで食べて完成。",
      ],
    },
    {
      name: "ブリのカマ焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩", "醤油"],
      servings: "2人分", time: "25分",
      ingredients: ["ブリのカマ 2個", "塩 適量", "醤油 少々（仕上げ用）", "大根おろし（あれば）"],
      steps: [
        "ブリのカマに塩をふり、20分置いて水気を拭く。",
        "グリルを強火で予熱し、カマを並べる。",
        "焦げないよう中火で両面を各5〜8分こんがり焼く。",
        "仕上げに醤油を少し垂らして香ばしさを出して完成。大根おろしを添える。",
      ],
    },
    {
      name: "ブリのアラ汁",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["味噌", "料理酒"],
      servings: "2〜3人分", time: "30分",
      ingredients: ["ブリのアラ 300g", "味噌 大さじ2〜3", "料理酒 大さじ2", "生姜 1かけ", "水 600ml", "ねぎ 少々"],
      steps: [
        "ブリのアラに塩をふって10分置き、熱湯で霜降りにして水洗いする。",
        "鍋に水・料理酒・生姜を入れ、アラを入れて中火で10分煮る。",
        "アクをこまめに取る。",
        "火を止めて味噌を溶き入れ、ねぎを散らして完成。",
      ],
    },
  ],

  "カサゴ": [
    {
      name: "カサゴの唐揚げ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "生姜", "片栗粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["カサゴ 2尾", "醤油 大さじ2", "生姜（すりおろし）小さじ1", "料理酒 大さじ1", "片栗粉 大さじ3", "サラダ油 揚げ油"],
      steps: [
        "カサゴのうろこ・内臓を取り除き、数か所切り込みを入れる。",
        "醤油・生姜・料理酒で20分漬け込む。",
        "水気を拭いて片栗粉をしっかりまぶす。",
        "170℃の油で5〜6分、カリッとするまで揚げて完成。",
      ],
    },
    {
      name: "カサゴの煮付け",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "25分",
      ingredients: ["カサゴ 2尾", "醤油 大さじ2.5", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 50ml", "水 100ml", "生姜 1かけ"],
      steps: [
        "カサゴのうろこ・内臓を取り、切り込みを入れて霜降りにする。",
        "鍋に水・料理酒・みりん・砂糖・醤油・生姜を入れて煮立てる。",
        "カサゴを入れて落し蓋をし、中火で10〜12分煮る。",
        "煮汁が半量になり照りが出たら完成。",
      ],
    },
    {
      name: "カサゴの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "25分",
      ingredients: ["カサゴ 2尾", "塩 適量", "すだち（あれば）"],
      steps: [
        "カサゴのうろこと内臓を取り、水洗いして水気を拭く。",
        "全体に塩をふり、20分置く。",
        "グリル・網で中火、両面こんがり焼く（片面6〜8分）。",
        "すだちを添えて完成。",
      ],
    },
    {
      name: "カサゴの味噌汁",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["なんでもある", "フライパン"],
      seasonings: ["味噌"],
      servings: "2〜3人分", time: "20分",
      ingredients: ["カサゴ 1〜2尾（ぶつ切り）", "味噌 大さじ2", "だし汁（または水＋昆布）600ml", "豆腐（あれば）", "ねぎ 少々"],
      steps: [
        "カサゴを下処理して食べやすくぶつ切りにし、霜降りにして水洗いする。",
        "だし汁を沸かし、カサゴを入れて中火で10分煮る。",
        "アクを取りながら豆腐を加え、さらに2〜3分煮る。",
        "火を止めて味噌を溶き入れ、ねぎを散らして完成。",
      ],
    },
    {
      name: "カサゴのアクアパッツァ",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "サラダ油", "にんにく"],
      servings: "2人分", time: "25分",
      ingredients: ["カサゴ 1〜2尾", "塩こしょう 少々", "にんにく 1かけ", "ミニトマト 8個", "アサリ（あれば）", "白ワイン（または料理酒）50ml", "水 100ml", "サラダ油 大さじ1"],
      steps: [
        "カサゴのうろこ・内臓を取り、塩こしょうをする。",
        "フライパンにオイルとにんにくを弱火で炒めて香りを出す。",
        "カサゴを入れて両面に焼き色をつける。",
        "トマト・アサリ・白ワイン・水を加えて蓋をし、10分蒸し煮して完成。",
      ],
    },
  ],

  "メバル": [
    {
      name: "メバルの煮付け",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "25分",
      ingredients: ["メバル 2尾", "醤油 大さじ2.5", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 50ml", "水 100ml", "生姜 1かけ"],
      steps: [
        "メバルのうろこ・内臓を取り、切り込みを入れて霜降りにする。",
        "鍋に水・料理酒・みりん・砂糖・醤油・生姜を入れて煮立てる。",
        "メバルを入れ、落し蓋をして中火で10分煮る。",
        "煮汁が少なくなり照りが出たら完成。",
      ],
    },
    {
      name: "メバルの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["メバル 2尾", "塩 適量"],
      steps: [
        "メバルのうろこと内臓を取り、水洗いして水気を拭く。",
        "全体に塩をふり、15分置く。",
        "グリル・網で中火で両面こんがり焼く（片面5〜6分）。",
        "すだちや大根おろしを添えて完成。",
      ],
    },
    {
      name: "メバルの唐揚げ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["醤油", "生姜", "片栗粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["メバル 2尾", "醤油 大さじ2", "生姜（すりおろし）小さじ1", "料理酒 大さじ1", "片栗粉 大さじ3", "サラダ油 揚げ油"],
      steps: [
        "メバルの下処理をして数か所切り込みを入れ、醤油・生姜・料理酒で20分漬ける。",
        "水気を拭いて片栗粉をまぶす。",
        "170℃の油で5〜6分揚げてカリッとさせて完成。",
      ],
    },
    {
      name: "メバルの刺身",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油"],
      servings: "2人分", time: "20分",
      ingredients: ["メバル 2尾", "醤油 適量", "わさび（あれば）", "大葉"],
      steps: [
        "メバルを三枚おろしにして皮を引く。",
        "骨を丁寧に取り除き、食べやすい厚さに切る。",
        "大葉を敷いた器に並べ、わさびと醤油を添えて完成。",
      ],
    },
    {
      name: "メバルのアクアパッツァ",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["塩", "サラダ油", "にんにく"],
      servings: "2人分", time: "25分",
      ingredients: ["メバル 2尾", "塩こしょう 少々", "にんにく 1かけ", "ミニトマト 6〜8個", "白ワイン（または料理酒）50ml", "水 100ml", "サラダ油 大さじ1"],
      steps: [
        "メバルのうろこ・内臓を取り、塩こしょう。にんにくは薄切り。",
        "フライパンにオイルとにんにくを弱火で炒め香りを出す。",
        "メバルを入れて両面に焼き色をつける。",
        "トマト・白ワイン・水を加えて蓋をし、10分蒸し煮して完成。",
      ],
    },
  ],

  "ハマチ": [
    {
      name: "ハマチの刺身",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["醤油"],
      servings: "2人分", time: "15分",
      ingredients: ["ハマチ 刺身用半身", "醤油 適量", "わさび（あれば）", "大葉"],
      steps: [
        "ハマチを三枚おろしにして皮を引く。",
        "血合い骨をピンセットで抜き、8mm幅に切る。",
        "器に大葉を敷いて並べ、わさびと醤油を添えて完成。",
      ],
    },
    {
      name: "ハマチの照り焼き",
      places: ["家のキッチン"],
      tools: ["フライパン", "なんでもある"],
      seasonings: ["醤油", "みりん", "砂糖", "料理酒"],
      servings: "2人分", time: "20分",
      ingredients: ["ハマチ 切り身2切れ", "醤油 大さじ2", "みりん 大さじ2", "砂糖 大さじ1", "料理酒 大さじ1", "サラダ油 少々"],
      steps: [
        "ハマチに塩をふって10分置き、水気を拭く。",
        "フライパンに油を熱し、両面を中火で焼いて取り出す。",
        "醤油・みりん・砂糖・料理酒を加えて煮立てる。",
        "ハマチを戻してタレをからめ、照りが出たら完成。",
      ],
    },
    {
      name: "ハマチのカルパッチョ",
      places: ["家のキッチン"],
      tools: ["包丁まな板あり", "なんでもある"],
      seasonings: ["塩", "サラダ油", "酢"],
      servings: "2人分", time: "15分",
      ingredients: ["ハマチ 刺身用半身", "塩こしょう 少々", "オリーブオイル（またはサラダ油）大さじ2", "レモン汁（または酢）大さじ1", "玉ねぎ 少々"],
      steps: [
        "ハマチを薄く削ぎ切りにして皿に並べる。",
        "オイル・レモン汁・塩こしょうを混ぜてドレッシングを作る。",
        "薄切り玉ねぎをのせ、ドレッシングをかけて冷やして完成。",
      ],
    },
    {
      name: "ハマチのアラ汁",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["味噌"],
      servings: "2〜3人分", time: "25分",
      ingredients: ["ハマチのアラ 300g", "味噌 大さじ2", "料理酒 大さじ2", "生姜 1かけ", "水 600ml", "ねぎ 少々"],
      steps: [
        "アラに塩をふって10分置き、霜降りにして水洗いする。",
        "鍋に水・料理酒・生姜を入れアラを中火で10分煮る。",
        "アクを取り除く。",
        "火を止めて味噌を溶き、ねぎを散らして完成。",
      ],
    },
    {
      name: "ハマチの塩焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["ハマチ 切り身2切れ", "塩 適量", "すだち（あれば）"],
      steps: [
        "ハマチに塩をふり、15分置いて水気を拭く。",
        "グリル・網で中火で両面こんがり焼く（片面5〜6分）。",
        "すだちを添えて完成。",
      ],
    },
  ],

  "キス": [
    {
      name: "キスの天ぷら",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["塩", "薄力粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["キス 4尾（手開き）", "薄力粉 大さじ3", "冷水 50ml", "卵 1/2個", "サラダ油 揚げ油", "塩 少々（天塩用）"],
      steps: [
        "キスを手開きにして骨を取り除く。水気をよく拭く。",
        "卵と冷水を混ぜ、薄力粉を加えてさっくり混ぜる（少しダマがあってOK）。",
        "キスに薄力粉をまぶしてから衣にくぐらせ、180℃の油で2〜3分揚げる。",
        "油を切り、天塩またはだし塩で食べて完成。",
      ],
    },
    {
      name: "キスの塩焼き",
      places: ["家のキッチン", "キャンプ場", "釣り場その場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "20分",
      ingredients: ["キス 4尾", "塩 適量", "すだち（あれば）"],
      steps: [
        "キスのうろこ・内臓を取り除き、水洗いして水気を拭く。",
        "全体に塩をふり、10分置く。",
        "グリル・網で中火で両面焼く（片面3〜4分）。",
        "すだちを絞って完成。",
      ],
    },
    {
      name: "キスのフライ",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["塩", "薄力粉", "サラダ油"],
      servings: "2人分", time: "25分",
      ingredients: ["キス 4尾（手開き）", "塩こしょう 少々", "薄力粉 大さじ3", "溶き卵 1個", "パン粉 適量", "サラダ油 揚げ油"],
      steps: [
        "キスを手開きにして骨を取り、塩こしょうをする。",
        "薄力粉→溶き卵→パン粉の順に衣をつける。",
        "180℃の油で2〜3分、きつね色になるまで揚げる。",
        "タルタルソースやウスターソースを添えて完成。",
      ],
    },
    {
      name: "キスの南蛮漬け",
      places: ["家のキッチン"],
      tools: ["なんでもある"],
      seasonings: ["酢", "醤油", "砂糖", "片栗粉", "サラダ油"],
      servings: "2人分", time: "30分",
      ingredients: ["キス 4尾", "酢 大さじ3", "醤油 大さじ2", "砂糖 大さじ1", "水 大さじ2", "片栗粉 大さじ2", "サラダ油 揚げ油", "玉ねぎ・ピーマン（あれば）"],
      steps: [
        "酢・醤油・砂糖・水を合わせてタレを作る。",
        "キスに塩をふって片栗粉をまぶし、180℃で揚げる。",
        "揚げたてをすぐにタレに漬ける。",
        "薄切り野菜も一緒に漬けて30分以上おいて完成。",
      ],
    },
    {
      name: "キスの干物焼き",
      places: ["家のキッチン", "キャンプ場"],
      tools: ["グリル・網", "なんでもある"],
      seasonings: ["塩"],
      servings: "2人分", time: "30分（干し時間含む）",
      ingredients: ["キス 4尾", "塩水（水100ml・塩大さじ1）"],
      steps: [
        "キスのうろこ・内臓を取り、手開きにする。",
        "塩水に10〜15分浸し、水気を拭いて風に当てる。",
        "表面が乾いたらグリル・網で中火で両面焼く（片面3〜4分）。",
        "皮がパリッとしたら完成。",
      ],
    },
  ],
};

let selectedFish = null;
let selectedPlace = null;
let selectedTool = null;
let selectedSeasonings = new Set();

function init() {
  renderFishGrid();
  renderPlaceGrid();
  renderToolGrid();
  renderSeasoningGrid();
  document.getElementById("reset-btn").addEventListener("click", reset);
}

function renderFishGrid() {
  document.getElementById("fish-grid").innerHTML = FISH_LIST.map(f => `
    <button class="fish-btn" data-fish="${f.name}" onclick="selectFish('${f.name}')">
      <span class="fish-emoji">${f.emoji}</span>
      <span>${f.name}</span>
    </button>
  `).join("");
}

function renderPlaceGrid() {
  document.getElementById("place-grid").innerHTML = PLACES.map(p => `
    <button class="option-btn" data-place="${p.name}" onclick="selectPlace('${p.name}')">
      <span class="option-emoji">${p.emoji}</span>
      <span class="option-label">
        <span>${p.name}</span>
        <span class="option-desc">${p.desc}</span>
      </span>
    </button>
  `).join("");
}

function renderToolGrid() {
  document.getElementById("tool-grid").innerHTML = TOOLS.map(t => `
    <button class="option-btn" data-tool="${t.name}" onclick="selectTool('${t.name}')">
      <span class="option-emoji">${t.emoji}</span>
      <span class="option-label">
        <span>${t.name}</span>
        <span class="option-desc">${t.desc}</span>
      </span>
    </button>
  `).join("");
}

function renderSeasoningGrid() {
  document.getElementById("seasoning-grid").innerHTML = SEASONINGS_LIST.map(s => `
    <button class="seasoning-btn" data-seasoning="${s.name}" onclick="toggleSeasoning('${s.name}')">
      <span class="seasoning-emoji">${s.emoji}</span>
      <span>${s.name}</span>
    </button>
  `).join("");
}

function selectFish(name) {
  selectedFish = name;
  selectedPlace = null;
  selectedTool = null;
  selectedSeasonings.clear();

  document.querySelectorAll(".fish-btn").forEach(b => b.classList.toggle("selected", b.dataset.fish === name));
  document.querySelectorAll(".option-btn[data-place]").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.remove("selected"));

  document.getElementById("step-2").classList.remove("hidden");
  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("step-4").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-2").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectPlace(name) {
  selectedPlace = name;
  selectedTool = null;

  document.querySelectorAll(".option-btn[data-place]").forEach(b => b.classList.toggle("selected", b.dataset.place === name));
  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.remove("selected"));

  document.getElementById("step-3").classList.remove("hidden");
  document.getElementById("step-4").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-3").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectTool(name) {
  selectedTool = name;

  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.toggle("selected", b.dataset.tool === name));

  document.getElementById("step-4").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-4").scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleSeasoning(name) {
  if (selectedSeasonings.has(name)) {
    selectedSeasonings.delete(name);
  } else {
    selectedSeasonings.add(name);
  }
  document.querySelectorAll(".seasoning-btn").forEach(b => {
    b.classList.toggle("selected", selectedSeasonings.has(b.dataset.seasoning));
  });
}

function selectAllSeasonings() {
  SEASONINGS_LIST.forEach(s => selectedSeasonings.add(s.name));
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.add("selected"));
}

function clearSeasonings() {
  selectedSeasonings.clear();
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.remove("selected"));
}

function showResults() {
  const recipes = (RECIPES[selectedFish] || []).filter(r =>
    r.places.includes(selectedPlace) && r.tools.includes(selectedTool)
  );

  const canCook = recipes.filter(r => r.seasonings.every(s => selectedSeasonings.has(s)));
  const almost  = recipes.filter(r => !r.seasonings.every(s => selectedSeasonings.has(s)));

  document.getElementById("results-subtitle").textContent =
    `${selectedFish} × ${selectedPlace} × ${selectedTool}`;

  // 今すぐ作れる
  const canCookSection = document.getElementById("can-cook-section");
  if (canCook.length > 0) {
    document.getElementById("can-cook-count").textContent = `${canCook.length}件`;
    document.getElementById("can-cook-list").innerHTML = canCook.map(r => buildRecipeCard(r)).join("");
    canCookSection.classList.remove("hidden");
  } else {
    canCookSection.classList.add("hidden");
  }

  // あと少しで作れる
  const almostSection = document.getElementById("almost-section");
  if (almost.length > 0) {
    document.getElementById("almost-count").textContent = `${almost.length}件`;
    document.getElementById("almost-list").innerHTML = almost.map(r => buildAlmostCard(r)).join("");
    almostSection.classList.remove("hidden");
  } else {
    almostSection.classList.add("hidden");
  }

  // 結果なし
  const noResults = document.getElementById("no-results");
  noResults.classList.toggle("hidden", canCook.length + almost.length > 0);

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildRecipeCard(recipe) {
  const id = recipe.name.replace(/\s/g, "_");
  return `
    <div class="recipe-card" id="card-${id}">
      <div class="recipe-card-header" onclick="toggleCard('${id}')">
        <div>
          <div class="recipe-title">${recipe.name}</div>
          <div class="recipe-meta">${recipe.servings}｜調理時間 ${recipe.time}</div>
        </div>
        <span class="toggle-icon">▼</span>
      </div>
      <div class="recipe-body">
        <div class="recipe-section">
          <h4>材料</h4>
          <ul class="ingredients-list">
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div class="recipe-section">
          <h4>作り方</h4>
          <ol class="steps-list">
            ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;
}

function buildAlmostCard(recipe) {
  const missing = recipe.seasonings.filter(s => !selectedSeasonings.has(s));
  const amazonLinks = missing.map(s =>
    `<a class="amazon-btn" href="${AMAZON_BASE}${encodeURIComponent(s + " 料理")}" target="_blank" rel="noopener noreferrer">🛒 ${s}</a>`
  ).join("");

  return `
    <div class="almost-card">
      <div class="almost-title">${recipe.name}</div>
      <div class="missing-label">足りない調味料：</div>
      <div class="amazon-links">${amazonLinks}</div>
    </div>
  `;
}

function toggleCard(id) {
  const card = document.getElementById("card-" + id);
  card.classList.toggle("open");
}

function reset() {
  selectedFish = null;
  selectedPlace = null;
  selectedTool = null;
  selectedSeasonings.clear();

  document.querySelectorAll(".fish-btn, .option-btn, .seasoning-btn").forEach(b => b.classList.remove("selected"));
  ["step-2", "step-3", "step-4", "results"].forEach(id => document.getElementById(id).classList.add("hidden"));

  document.getElementById("step-1").scrollIntoView({ behavior: "smooth", block: "start" });
}

init();
