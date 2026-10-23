"use strict";

/* 投資方式（依風險由低到高排列）
   types：該方式在台灣常見且合法的種類；r 為該種類的風險（1~5）；w 為常見買賣管道 */
const methods = [
  {
    id: "deposit", name: "存款", risk: 1, gain: 1,
    tagline: "把錢存在銀行或郵局，保本、隨時可用，是所有投資的起點。",
    threshold: "數百元即可開戶",
    how: "銀行依公告利率付息。金額越大、期限越長，利率通常越高。",
    danger: "利率常追不上物價漲幅，購買力會慢慢縮水；定存提前解約會被打折計息。",
    fit: "備用金、短期要用的錢、剛開始存第一桶金的人。",
    types: [
      { n: "活期存款", r: 1, w: "銀行、郵局", d: "隨存隨領，利率最低，適合放日常生活費與緊急預備金。" },
      { n: "定期存款", r: 1, w: "銀行、郵局", d: "約定期限（如 3、6、12 個月）不動用，利率較高。常見形式有整存整付、存本取息、零存整付。" },
      { n: "郵政儲金", r: 1, w: "郵局", d: "由中華郵政辦理，據點多、門檻低，許多人的第一個儲蓄帳戶。" },
      { n: "外幣存款", r: 2, w: "銀行", d: "以美元、日圓等外幣存放，有利息，但換回台幣時會有匯差。" }
    ],
    terms: [
      { n: "存款保險", d: "每位存款人在同一家要保機構，本金加利息合計最高保障新臺幣 300 萬元。" },
      { n: "固定利率與機動利率", d: "固定利率在期間內不變；機動利率會隨銀行牌告調整。" }
    ]
  },
  {
    id: "bond", name: "債券", risk: 2, gain: 2,
    tagline: "借錢給政府或公司，按期領利息，到期還本。",
    threshold: "債券 ETF、債券基金幾千元就能開始；直接買個別債券門檻較高，依種類而異",
    how: "固定時間領利息（票息），到期拿回本金；也可在到期前賣出，賺取價格變動的價差。",
    danger: "主要有三種：利率上升使債券價格下跌、發行人違約的信用風險，以及外幣債券的匯率風險。",
    fit: "想要比存款多一點報酬、又不想承受大波動的人。",
    types: [
      { n: "債券附買回交易（RP）", r: 1, w: "證券商、銀行", d: "向券商或銀行買入債券，並約定日期以約定利率賣回，適合短期停泊資金。不受存款保險保障。" },
      { n: "中央政府公債", r: 1, w: "證券商、銀行", d: "由財政部發行，以國家信用作保證，是台幣債券中信用風險最低的一類。固定票息，期限從數年到數十年。一般投資人可透過證券商以營業處所議價買賣，最小交易單位為面額 1 萬元。" },
      { n: "地方政府債券", r: 2, w: "證券商", d: "目前由直轄市政府（台北市、新北市、桃園市、台中市、台南市、高雄市）依法規發行，用來籌措地方建設經費。信用程度視各市財政狀況而定。" },
      { n: "金融債券", r: 2, w: "證券商、銀行", d: "銀行、金控發行，用來籌措資金。其中次順位金融債在公司倒閉時清償順位較後，利率較高、風險也較高；另有永續債等結構較複雜的商品。" },
      { n: "普通公司債", r: 2, w: "證券商、銀行", d: "公司向市場借錢，分有擔保與無擔保。信用評等越低，利息越高，違約風險也越高。" },
      { n: "債券 ETF", r: 2, w: "證券商", d: "在證交所或櫃買中心掛牌，追蹤美國公債、投資等級公司債等債券指數，像股票一樣隨時買賣，通常定期配息。" },
      { n: "債券型基金", r: 2, w: "銀行、基金平台", d: "由投信或境外基金公司集資買債券，分政府公債型、投資等級型、高收益型、新興市場型等，風險差異大，申購前要先看投資標的。" },
      { n: "可轉換公司債（CB）", r: 3, w: "證券商", d: "可在約定條件下轉換成公司股票。股價漲時可轉股獲利，股價跌時仍可領息並在到期拿回本金，但利息通常較低。在櫃買中心買賣，常見一張面額 10 萬元。" },
      { n: "附認股權／交換公司債", r: 3, w: "證券商", d: "附認股權公司債可再以約定價格認購公司股票；交換公司債則可換成其他公司的股票。結構較複雜，市場上較少見。" },
      { n: "國際債券", r: 3, w: "證券商、銀行", d: "國內外發行人在台灣募集發行、並在櫃買中心上櫃的外幣計價債券，例如美元計價。要承擔匯率風險，部分商品僅開放專業投資人購買。" },
      { n: "海外債券", r: 3, w: "證券商（複委託）、銀行（信託）", d: "美國公債、外國公司債、新興市場債等。選擇多，但要注意匯率與海外交易成本。" },
      { n: "資產證券化商品", r: 3, w: "證券商", d: "依《金融資產證券化條例》，把貸款等債權包裝成受益證券或資產基礎證券發行。結構複雜，多以機構與專業投資人為主。" }
    ],
    terms: [
      { n: "票面利率", d: "發行時就訂好的年利率，用來計算每期利息。" },
      { n: "到期殖利率", d: "考慮買進價格後，持有到期的年化報酬率。比較債券時，比票面利率更有參考價值。" },
      { n: "信用評等", d: "評等機構對發行人還款能力的評分。BBB- 以上稱投資等級，以下是高收益債（俗稱垃圾債）。" },
      { n: "存續期間", d: "衡量債券價格對利率的敏感度，數字越大，利率變動時價格波動越大。" }
    ]
  },
  {
    id: "gold", name: "黃金", risk: 3, gain: 2,
    tagline: "實體金條金幣，或不用保管實物的黃金存摺。",
    threshold: "黃金存摺可從 1 公克起買",
    how: "靠金價上漲賺價差，本身不會產生利息。",
    danger: "金價會隨國際情勢與匯率波動，長期持有沒有孳息。",
    fit: "想分散風險、對抗通膨與動盪的人。",
    types: [
      { n: "黃金存摺", r: 3, w: "銀行", d: "在銀行開戶，以公克記帳買賣，不用自己保管。需要時可換領實體金條。" },
      { n: "實體金條與金幣", r: 3, w: "銀行、銀樓", d: "拿在手上最踏實，但要自己保管，賣回時可能有手續費或工資的折價。" },
      { n: "黃金 ETF", r: 3, w: "證券商", d: "在證交所買賣，追蹤金價走勢。部分商品追蹤黃金期貨，與現貨金價可能有落差。" },
      { n: "黃金期貨與黃金礦業基金", r: 4, w: "期貨商、基金平台", d: "期貨有槓桿，風險高。礦業基金投資的是礦業公司股票，走勢和金價並不完全同步。" }
    ],
    terms: [
      { n: "買賣價差", d: "銀行買進與賣出價之間的差額，剛買進就賣出通常會小虧。" }
    ]
  },
  {
    id: "fund", name: "共同基金", risk: 3, gain: 3,
    tagline: "把錢交給基金經理人，集資後投資一籃子資產。",
    threshold: "單筆或定期定額都可，常見每月數千元起",
    how: "基金淨值上漲賺價差，部分基金會配息。",
    danger: "有申購費與經理費；風險依基金類型從低到高差很多。",
    fit: "沒時間研究個別標的、想讓專業團隊代操的人。",
    types: [
      { n: "貨幣市場基金", r: 1, w: "銀行、基金平台", d: "投資短期票券與存款，波動小，但不是保本商品。" },
      { n: "債券型基金", r: 2, w: "銀行、基金平台", d: "以債券為主要標的，種類與風險詳見「債券」。" },
      { n: "平衡型基金", r: 3, w: "銀行、基金平台", d: "同時投資股票與債券，比例由經理人調整，波動介於兩者之間。" },
      { n: "組合型基金", r: 3, w: "銀行、基金平台", d: "把錢投資在多檔基金上，進一步分散，但會多一層費用。" },
      { n: "境外基金", r: 3, w: "銀行、基金平台", d: "在海外註冊，經主管機關核准後由總代理人在台銷售，多以外幣計價，要留意匯率。" },
      { n: "股票型基金", r: 4, w: "銀行、基金平台", d: "主要投資股票，可再分全球、區域、單一國家或產業，報酬與波動都較大。" }
    ],
    terms: [
      { n: "淨值", d: "基金每單位的價值，每天計算一次。" },
      { n: "申購費與經理費", d: "買進時可能收申購費，持有期間每年收經理費，都會侵蝕報酬。" },
      { n: "定期定額", d: "每月固定日期扣款買進，可以平均買進成本。" }
    ]
  },
  {
    id: "etf", name: "ETF", risk: 3, gain: 3,
    tagline: "追蹤指數的基金，像股票一樣在交易所買賣。",
    threshold: "零股交易，幾百元到數千元即可",
    how: "指數上漲賺價差，成分股的股利也可能配發給投資人。",
    danger: "會跟著市場一起漲跌；也要留意費用率與追蹤誤差。",
    fit: "想長期分散投資、不想自己挑股票的人。",
    types: [
      { n: "債券 ETF", r: 2, w: "證券商", d: "追蹤債券指數，種類詳見「債券」。" },
      { n: "市值型 ETF", r: 3, w: "證券商", d: "追蹤大型股指數，例如台灣市值前 50 大公司，一次買進一籃子大公司。" },
      { n: "多資產 ETF", r: 3, w: "證券商", d: "標的同時包含股票與債券，買進單一 ETF 就能做到資產配置。" },
      { n: "跨境 ETF", r: 3, w: "證券商", d: "追蹤美國、日本等海外指數。可在台灣掛牌的商品買，也可透過複委託買海外掛牌的。" },
      { n: "主動式 ETF", r: 3, w: "證券商", d: "不追蹤特定指數，由經理人主動選股，經理費通常較高。" },
      { n: "高股息與主題型 ETF", r: 4, w: "證券商", d: "挑選高股息股票或特定主題（如半導體、AI），成分集中，波動比大盤更大。" },
      { n: "商品 ETF", r: 4, w: "證券商", d: "追蹤黃金、原油等商品期貨，報酬可能與現貨價格不同。" },
      { n: "槓桿與反向 ETF", r: 5, w: "證券商", d: "追求單日報酬的正 2 倍或反方向，長期持有的結果可能與預期差很大，不適合長期放著。" }
    ],
    terms: [
      { n: "費用率", d: "每年從基金資產扣除的管理成本，越低越好。" },
      { n: "追蹤誤差", d: "ETF 報酬與其追蹤指數的差距。" },
      { n: "折溢價", d: "市價與淨值的差距，買進前應先看市價是否偏離太多。" }
    ]
  },
  {
    id: "stock", name: "股票", risk: 4, gain: 4,
    tagline: "買下公司的一小部分股權，分享成長與獲利。",
    threshold: "零股從 1 股起，整股 1,000 股為一張",
    how: "股價上漲賺價差，公司獲利時可領股利。",
    danger: "個股可能大跌甚至下市；買賣還需負擔手續費與交易稅。",
    fit: "願意研究公司、能承受較大波動的人。",
    types: [
      { n: "特別股", r: 3, w: "證券商", d: "有約定的固定股息，分配順序優先於普通股，但通常沒有投票權，股價漲幅也較有限。" },
      { n: "上市股票", r: 4, w: "證券商", d: "在證交所掛牌，公司規模較大、審查條件較嚴，是最主流的買賣對象。" },
      { n: "上櫃股票", r: 4, w: "證券商", d: "在櫃買中心掛牌，中小型公司居多，成長性與波動通常都更大。" },
      { n: "台灣存託憑證（TDR）", r: 4, w: "證券商", d: "外國公司以憑證形式在台灣掛牌，可用台幣買賣，但仍有該公司的經營與匯率風險。" },
      { n: "海外股票", r: 4, w: "證券商（複委託）", d: "透過複委託買賣美股等海外市場，要考慮匯率、時差與較高的交易成本。" },
      { n: "興櫃股票", r: 5, w: "證券商", d: "尚未上市櫃，由券商議價買賣。流動性低、資訊較少，需先簽署風險預告書。" }
    ],
    terms: [
      { n: "本益比", d: "股價除以每股盈餘，用來判斷股價相對於獲利的高低。" },
      { n: "現金殖利率", d: "每股現金股利除以股價，衡量領股息的報酬率。" },
      { n: "除權息", d: "公司發放股利時，股價會依股利金額調整。" }
    ]
  },
  {
    id: "fx", name: "外匯", risk: 4, gain: 3,
    tagline: "買賣外幣，例如美元、日圓、歐元。",
    threshold: "外幣存款數千元即可；保證金交易門檻不一",
    how: "匯率上漲時換回台幣賺匯差，外幣存款另有利息。",
    danger: "匯率短期波動大；使用槓桿的保證金交易可能虧損超過本金。",
    fit: "有外幣需求，或想分散單一貨幣風險的人。",
    types: [
      { n: "外幣存款", r: 2, w: "銀行", d: "活存與定存皆有，詳見「存款」。" },
      { n: "外幣現鈔兌換", r: 2, w: "銀行", d: "多用於旅遊或出國需求，買賣匯差較大，不適合短線操作。" },
      { n: "外幣計價商品", r: 3, w: "銀行、證券商", d: "例如外幣債券、外幣基金，報酬會同時受標的資產與匯率影響。" },
      { n: "槓桿保證金交易", r: 5, w: "期貨商", d: "投入少量保證金就能操作較大金額，獲利與虧損都被放大，可能賠光本金甚至更多。" }
    ],
    terms: [
      { n: "匯差", d: "買進與賣出匯率的差距，是兌換的實際成本。" },
      { n: "保證金", d: "槓桿交易中需要預先存入的擔保款項，不足時會被追繳。" }
    ]
  },
  {
    id: "crypto", name: "加密貨幣", risk: 5, gain: 5,
    tagline: "以區塊鏈技術發行的數位資產，例如比特幣。",
    threshold: "多數交易所可小額買入",
    how: "幣價上漲賺價差，沒有公司獲利或利息作為支撐。",
    danger: "價格一天內大漲大跌很常見；在台灣並非法定貨幣，也沒有存款保險，還有詐騙與平台倒閉的風險。",
    fit: "能承受本金大幅虧損、只用一小部分資金嘗試的人。",
    types: [
      { n: "穩定幣", r: 4, w: "加密貨幣交易所", d: "價值錨定美元等法定貨幣，價格較穩，但要留意發行方的準備金與脫鉤風險。" },
      { n: "比特幣", r: 5, w: "加密貨幣交易所", d: "最早也是市值最大的加密貨幣，常被比喻為數位黃金，但價格波動仍然極大。" },
      { n: "以太幣與公鏈代幣", r: 5, w: "加密貨幣交易所", d: "支撐智能合約與各種應用的平台幣，價值取決於生態系的發展。" },
      { n: "山寨幣與迷因幣", r: 5, w: "加密貨幣交易所", d: "市值小、炒作成分高，價格可能一夕歸零。" }
    ],
    terms: [
      { n: "私鑰", d: "控制資產的密碼，遺失或外洩就拿不回幣，沒有客服可以重設。" },
      { n: "洗錢防制登記", d: "業者須先向金管會完成洗錢防制登記才能提供服務，未登記而營業會違法。開戶前可到金管會網站的 VASP 專區查名單。" }
    ]
  }
];

// 投資管道與可買到的投資方式
const channels = [
  { name: "銀行", note: "櫃檯與網銀、App。", has: ["deposit", "bond", "gold", "fund", "fx"] },
  { name: "郵局", note: "以儲金為主，適合存錢。", has: ["deposit"] },
  { name: "證券商", note: "開證券戶後，可用 App 下單買賣。", has: ["stock", "etf", "bond", "gold", "fund"] },
  { name: "基金平台／投信直營", note: "可定期定額申購基金。", has: ["fund"] },
  { name: "期貨商", note: "槓桿保證金交易，風險較高。", has: ["fx", "gold"] },
  { name: "加密貨幣交易所", note: "請選擇已完成洗錢防制登記的業者。", has: ["crypto"] }
];

// 官方介紹連結：櫃買中心債券頁與證交所 ETF 簡介為深層連結，其餘為各機構首頁
const TPEX_BOND = "https://www.tpex.org.tw/zh-tw/bond/service/introduction/";
const typeLinks = {
  "中央政府公債": { t: "櫃買中心：中央登錄公債及地方政府債券簡介", u: TPEX_BOND + "gov-bond.html" },
  "地方政府債券": { t: "櫃買中心：中央登錄公債及地方政府債券簡介", u: TPEX_BOND + "gov-bond.html" },
  "金融債券": { t: "櫃買中心：公司債及金融債簡介", u: TPEX_BOND + "co-bond.html" },
  "普通公司債": { t: "櫃買中心：公司債及金融債簡介", u: TPEX_BOND + "co-bond.html" },
  "國際債券": { t: "櫃買中心：國際債券簡介", u: TPEX_BOND + "int-bond.html" },
  "債券附買回交易（RP）": { t: "櫃買中心：債券市場簡介（英文，含 RP/RS）", u: "https://www.tpex.org.tw/web/bond/knowledge/system/baintro.php?l=en-us" }
};
const TWSE_ETF = { t: "證交所：ETF 簡介（定義、種類、風險）", u: "https://www.twse.com.tw/zh/products/securities/etf/overview/introduction.html" };
typeLinks["債券 ETF"] = TWSE_ETF;
typeLinks["商品 ETF"] = TWSE_ETF;
typeLinks["槓桿與反向 ETF"] = TWSE_ETF;
const TWSE = { t: "臺灣證券交易所（首頁）", u: "https://www.twse.com.tw/" };
const TPEX = { t: "證券櫃檯買賣中心（首頁）", u: "https://www.tpex.org.tw/" };
const methodLinks = {
  deposit: [{ t: "中央存款保險公司（首頁）", u: "https://www.cdic.gov.tw/" }, { t: "中華郵政（首頁）", u: "https://www.post.gov.tw/" }],
  bond: [TPEX],
  gold: [{ t: "臺灣銀行（首頁）", u: "https://www.bot.com.tw/" }, TWSE],
  fund: [{ t: "投信投顧公會（首頁）", u: "https://www.sitca.org.tw/" }],
  etf: [TWSE_ETF, TPEX],
  stock: [TWSE, TPEX, { t: "證券投資人及期貨交易人保護中心（首頁）", u: "https://www.sfipc.org.tw/" }],
  fx: [{ t: "中央銀行（首頁）", u: "https://www.cbc.gov.tw/" }, { t: "臺灣期貨交易所（首頁）", u: "https://www.taifex.com.tw/" }],
  crypto: [{ t: "金融監督管理委員會（首頁，內有 VASP 專區）", u: "https://www.fsc.gov.tw/" }]
};
const a = l => `<a href="${l.u}" target="_blank" rel="noopener noreferrer">${l.t} ↗</a>`;

const methodName = id => methods.find(m => m.id === id).name;
const riskLabels = ["", "很低", "低", "中", "高", "很高"];
const riskColors = ["", "var(--r1)", "var(--r2)", "var(--r3)", "var(--r4)", "var(--r5)"];

const ladder = document.getElementById("ladder");
const detail = document.getElementById("detail");
const channelBox = document.getElementById("channels");
const channelHint = document.getElementById("channel-hint");

let selected = null;

function dots(n, cls) {
  let html = `<span class="dots ${cls}" aria-hidden="true">`;
  for (let i = 1; i <= 5; i++) html += `<b class="${i <= n ? "on" : ""}"></b>`;
  return html + "</span>";
}

function renderLadder() {
  ladder.innerHTML = "";
  methods.forEach(m => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rung";
    btn.dataset.id = m.id;
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML =
      `<span class="name">${m.name}</span>` +
      `<span class="bar" aria-hidden="true"><i style="width:${m.risk * 20}%;background:${riskColors[m.risk]}"></i></span>` +
      `<span class="lv">風險：${riskLabels[m.risk]}</span>`;
    btn.addEventListener("click", () => select(m.id, true));
    li.appendChild(btn);
    ladder.appendChild(li);
  });
}

function renderDetail(m) {
  const types = m.types.map(t =>
    `<li style="--c:${riskColors[t.r]}">` +
      `<div class="t-head"><strong>${t.n}</strong><span class="t-lv">風險：${riskLabels[t.r]}</span></div>` +
      `<p>${t.d}</p>` +
      `<p class="t-where">管道：${t.w}</p>` +
      (typeLinks[t.n] ? `<p class="t-link">官方介紹：${a(typeLinks[t.n])}</p>` : "") +
    `</li>`).join("");
  const terms = m.terms.map(t => `<div><dt>${t.n}</dt><dd>${t.d}</dd></div>`).join("");

  detail.innerHTML =
    `<h3>${m.name}</h3>` +
    `<p class="tagline">${m.tagline}</p>` +
    `<div class="meter">` +
      `<div>風險${dots(m.risk, m.risk >= 4 ? "risk hi" : "risk")}</div>` +
      `<div>報酬潛力${dots(m.gain, "gain")}</div>` +
    `</div>` +
    `<dl>` +
      `<div><dt>入門門檻</dt><dd>${m.threshold}</dd></div>` +
      `<div><dt>怎麼賺錢</dt><dd>${m.how}</dd></div>` +
      `<div><dt>主要風險</dt><dd>${m.danger}</dd></div>` +
      `<div><dt>適合誰</dt><dd>${m.fit}</dd></div>` +
    `</dl>` +
    `<h4 class="sub">在台灣常見的種類（共 ${m.types.length} 種）</h4>` +
    `<ul class="types">${types}</ul>` +
    `<h4 class="sub">名詞小辭典</h4>` +
    `<dl class="terms">${terms}</dl>` +
    `<h4 class="sub">延伸閱讀（官方網站）</h4>` +
    `<ul class="links">${(methodLinks[m.id] || []).map(l => `<li>${a(l)}</li>`).join("")}</ul>`;
}

function renderChannels() {
  channelBox.innerHTML = "";
  channels.forEach(c => {
    const row = document.createElement("div");
    row.className = "channel";
    const chips = c.has
      .map(id => `<span class="chip" data-id="${id}">${methodName(id)}</span>`)
      .join("");
    row.innerHTML = `<div><h3>${c.name}</h3><p>${c.note}</p></div><div class="chips">${chips}</div>`;
    row.dataset.has = c.has.join(",");
    channelBox.appendChild(row);
  });
}

function markChannels() {
  channelBox.querySelectorAll(".channel").forEach(row => {
    const match = selected && row.dataset.has.split(",").includes(selected);
    row.classList.toggle("match", Boolean(match));
    row.classList.toggle("dim", Boolean(selected) && !match);
    row.querySelectorAll(".chip").forEach(chip => {
      chip.classList.toggle("hit", Boolean(selected) && chip.dataset.id === selected);
    });
  });
  const count = selected ? channels.filter(c => c.has.includes(selected)).length : 0;
  channelHint.textContent = selected
    ? `「${methodName(selected)}」可以在以下 ${count} 種管道買到，已用深色框標示。`
    : "目前顯示全部管道。選一種投資方式後，可買到該項目的管道會被標示出來。";
}

function select(id, scroll) {
  selected = id;
  const m = methods.find(x => x.id === id);
  ladder.querySelectorAll(".rung").forEach(btn =>
    btn.setAttribute("aria-pressed", String(btn.dataset.id === id))
  );
  renderDetail(m);
  markChannels();
  if (scroll && window.matchMedia("(max-width: 860px)").matches) {
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

renderLadder();
renderChannels();
select("bond", false);

/* ===== 全球主要指數 ===== */
const SPDJI = { t: "S&P Dow Jones Indices（首頁）", u: "https://www.spglobal.com/spdji/" };
const indices = [
  { n: "S&P 500", zh: "標普 500 指數", r: "美國", c: "美國約 500 家大型上市公司", w: "市值加權",
    f: "涵蓋美國股市的大部分市值，常被當作美股整體表現的代表。", s: SPDJI },
  { n: "道瓊工業指數", zh: "Dow Jones Industrial Average", r: "美國", c: "30 檔美國大型績優股", w: "價格加權",
    f: "歷史悠久。股價高的公司影響力大，與市值無關，因此代表性不如 S&P 500。", s: SPDJI },
  { n: "那斯達克 100", zh: "Nasdaq-100", r: "美國", c: "那斯達克交易所市值最大的 100 家非金融公司", w: "市值加權（經調整）",
    f: "科技股比重高，漲跌幅度通常比 S&P 500 更大。", s: { t: "那斯達克（首頁）", u: "https://www.nasdaq.com/" } },
  { n: "日經 225", zh: "Nikkei 225", r: "日本", c: "東京證券交易所的 225 家代表性公司", w: "價格加權",
    f: "日本最常被引用的股市指標，由日本經濟新聞社編製。", s: { t: "日經指數（首頁）", u: "https://indexes.nikkei.co.jp/" } },
  { n: "東證股價指數", zh: "TOPIX", r: "日本", c: "東京證券交易所上市的大量股票，範圍比日經 225 廣", w: "市值加權",
    f: "較能反映日本股市整體，常被機構投資人當作績效比較的基準。", s: { t: "日本交易所集團（首頁）", u: "https://www.jpx.co.jp/" } },
  { n: "英國富時 100", zh: "FTSE 100", r: "歐洲", c: "倫敦證券交易所市值最大的 100 家公司", w: "市值加權",
    f: "成分股多為跨國企業，海外營收占比高，不只反映英國本地經濟。", s: { t: "FTSE Russell（首頁）", u: "https://www.lseg.com/en/ftse-russell" } },
  { n: "德國 DAX", zh: "DAX 40", r: "歐洲", c: "法蘭克福證券交易所的 40 家大型公司", w: "市值加權（自由流通市值）",
    f: "德國經濟與出口的代表，製造業與工業類股比重較高。", s: { t: "德意志交易所（首頁）", u: "https://www.deutsche-boerse.com/" } },
  { n: "法國 CAC 40", zh: "CAC 40", r: "歐洲", c: "巴黎證券交易所的 40 家大型公司", w: "市值加權（自由流通市值）",
    f: "奢侈品、能源與消費品牌等跨國大型股占比高。", s: { t: "泛歐交易所（首頁）", u: "https://www.euronext.com/" } },
  { n: "歐洲 STOXX 50", zh: "EURO STOXX 50", r: "歐洲", c: "歐元區 50 家大型藍籌股", w: "市值加權（自由流通市值）",
    f: "橫跨歐元區多個國家，是歐洲股市最常見的指標之一。", s: { t: "STOXX（首頁）", u: "https://www.stoxx.com/" } },
  { n: "台灣加權指數", zh: "TAIEX", r: "台灣", c: "台灣證券交易所上市的股票", w: "市值加權",
    f: "台灣股市最主要的大盤指標，電子與半導體權重高，少數大型股對指數影響很大。", s: { t: "臺灣證券交易所（首頁）", u: "https://www.twse.com.tw/" } },
  { n: "臺灣 50 指數", zh: "FTSE TWSE Taiwan 50", r: "台灣", c: "台灣市值前 50 大的上市公司", w: "市值加權",
    f: "代表台灣大型股，不少台灣 ETF 以它作為追蹤標的。", s: { t: "臺灣指數公司（首頁）", u: "https://www.taiwanindex.com.tw/" } },
  { n: "韓國綜合股價指數", zh: "KOSPI", r: "其他亞太", c: "韓國交易所主板上市的股票", w: "市值加權",
    f: "半導體與電子大型股比重高，三星電子等權值股影響很大。", s: { t: "韓國交易所（首頁）", u: "https://www.krx.co.kr/" } },
  { n: "澳洲 S&P/ASX 200", zh: "S&P/ASX 200", r: "其他亞太", c: "澳洲證券交易所市值最大的 200 家公司", w: "市值加權（自由流通市值）",
    f: "金融與礦業、資源類股占比高，走勢與大宗商品價格關聯較深。", s: { t: "澳洲證券交易所（首頁）", u: "https://www.asx.com.au/" } },
  { n: "印度 Nifty 50", zh: "Nifty 50", r: "其他亞太", c: "印度國家證券交易所的 50 家大型公司", w: "市值加權（自由流通市值）",
    f: "印度股市最常被引用的指標，反映印度內需與經濟成長。", s: { t: "印度國家證券交易所（首頁）", u: "https://www.nseindia.com/" } },
  { n: "MSCI 世界指數", zh: "MSCI World", r: "全球", c: "多個已開發國家的大型與中型股", w: "市值加權（自由流通市值）",
    f: "全球股市常用的基準之一，美國占比最高。", s: { t: "MSCI（首頁）", u: "https://www.msci.com/" } }
];
const regions = ["全部", "美國", "日本", "歐洲", "台灣", "其他亞太", "全球"];

const indexBox = document.getElementById("indices");
const filterBox = document.getElementById("index-filters");

function renderIndices(region) {
  indexBox.innerHTML = indices
    .filter(i => region === "全部" || i.r === region)
    .map(i =>
      `<article class="idx">` +
        `<div class="idx-head"><h3>${i.n}</h3><span class="idx-en">${i.zh}</span><span class="idx-region">${i.r}</span></div>` +
        `<dl>` +
          `<div><dt>成分</dt><dd>${i.c}</dd></div>` +
          `<div><dt>計算方式</dt><dd>${i.w}</dd></div>` +
          `<div><dt>特色</dt><dd>${i.f}</dd></div>` +
        `</dl>` +
        `<p class="idx-src">編製機構：${a(i.s)}</p>` +
      `</article>`)
    .join("");
  filterBox.querySelectorAll(".pill").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.r === region)));
}

filterBox.innerHTML = regions
  .map(r => `<button type="button" class="pill" data-r="${r}" aria-pressed="false">${r}</button>`)
  .join("");
filterBox.addEventListener("click", e => {
  const b = e.target.closest(".pill");
  if (b) renderIndices(b.dataset.r);
});
renderIndices("全部");
