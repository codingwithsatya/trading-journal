// ============================================================
// TRADEFLOW PLAYBOOK — Powered by Saty Mahajan Indicator Suite
// Saty Pivot Ribbon Pro (8, 13, 21, 48, 200 EMAs)
// Saty ATR Levels (ADR1/ADR2 Upper/Lower, Central Pivot, PDL/PDH)
// Saty Phase Oscillator (Divergence detection)
// ============================================================

export const PLAYBOOK_SETUPS = [
  {
    name: "10 Min ORB",
    tag: "BREAKOUT",
    tagType: "breakout",
    desc: "Mark High/Low of first 10min candle at open (9:30–9:40am EST). Entry on Break & Retest of OR High/Low. Risk to midpoint.",
    entry: "Break and Retest of OR High or Low at 9:40am",
    risk: "Midpoint of the 10min Open Range candle",
    target: "Next Saty ATR Level (ADR1/ADR2) / PDH / PDL / S/R / Ribbon",
    condition: "Any — mark OR levels at exactly 9:40am EST",
    indicators:
      "Saty ATR Levels for targets | Saty Pivot Ribbon for bias confirmation",
    rules: [
      "Marked the exact High AND Low of the 9:30–9:40am candle?",
      "Waiting for a CONFIRMED break of OR level — candle closed beyond it?",
      "Entry only on the RETEST of OR level — not on the initial break candle?",
      "Stop set at the MIDPOINT of the Open Range — not below the full candle?",
      "Target is a clearly defined Saty ATR Level (ADR1 Upper/Lower or S/R)?",
      "Ribbon color confirms bias direction of the trade (Green/Blue = Long, Red/Orange = Short)?",
    ],
  },
  {
    name: "Vomy",
    tag: "TRANSITION",
    tagType: "transition",
    desc: "Saty Pivot Ribbon transitions. A candle closes on the OTHER side of the ribbon — ribbon begins folding/changing color. Enter on the retest of the ribbon.",
    entry:
      "Price retests ribbon (13 or 21 EMA) after the transition candle closes",
    risk: "Other side of the FULL ribbon (beyond the 8 EMA for shorts / below 21 EMA for longs)",
    target:
      "Next Saty ATR Level (ADR1/ADR2 Upper or Lower) / Central Pivot / VWAP",
    condition:
      "Transition — ribbon folding, color changing from Green/Blue to Red/Orange or vice versa",
    indicators:
      "Saty Pivot Ribbon Pro — watch for ribbon fold + color change | Saty ATR Levels for targets",
    rules: [
      "A candle CLOSED on the other side of the ribbon (not just wicked through)?",
      "Ribbon is folding / changing color — confirming the transition?",
      "Waiting for price to RETEST the ribbon — NOT entering on the transition candle itself?",
      "Entry anticipated near the 13 EMA on the retest — ribbon acting as resistance or support?",
      "Stop placed on the OTHER side of the FULL ribbon (e.g. above 8 EMA for a short)?",
      "Target set to the next Saty ATR Level visible on chart (ADR1/ADR2 Upper or Lower)?",
    ],
  },
  {
    name: "iVomy",
    tag: "TRANSITION",
    tagType: "transition",
    desc: "Inverse Vomy. Exact same ribbon transition rules but in the opposite direction. Ribbon folds from bearish (Red/Orange) back to bullish (Green/Blue).",
    entry:
      "Price retests ribbon (13 or 21 EMA) after inverse transition candle closes",
    risk: "Other side of the FULL ribbon (below 21 EMA for longs / above 8 EMA for shorts)",
    target:
      "Next Saty ATR Level (ADR1/ADR2 Upper or Lower) / Central Pivot / VWAP",
    condition:
      "Transition — ribbon folding from Red/Orange back to Green/Blue (bearish to bullish)",
    indicators:
      "Saty Pivot Ribbon Pro — watch for ribbon fold back + color shift | Saty ATR Levels for targets",
    rules: [
      "A candle CLOSED on the other side of the ribbon in the INVERSE direction?",
      "Ribbon is folding back — color shifting from Red/Orange toward Green/Blue?",
      "Waiting for price to RETEST the ribbon — NOT entering on the transition candle?",
      "Entry anticipated near the 13 EMA on the retest — ribbon now acting as support?",
      "Stop placed on the OTHER side of the FULL ribbon (below 21 EMA for a long)?",
      "Target set to the next Saty ATR Level visible on chart (ADR1/ADR2 Upper or Lower)?",
    ],
  },
  {
    name: "Flag Into Ribbon",
    tag: "TREND",
    tagType: "trend",
    desc: "Ribbon is fully expanded and trending (all EMAs stacked same color). Price pulls back into the ribbon which acts as dynamic support/resistance. Enter at 13 or 21 EMA.",
    entry:
      "Anticipate pullback to 13 EMA or 21 EMA — enter as price touches the ribbon",
    risk: "Other side of the FULL ribbon (ribbon acts as the floor/ceiling)",
    target:
      "Next Saty ATR Level in trend direction (ADR1/ADR2) / prior swing high or low",
    condition:
      "Trending — Ribbon fully stacked same color, EMAs not crossing, price above (bull) or below (bear) ribbon",
    indicators:
      "Saty Pivot Ribbon Pro — ribbon must be fully expanded + same color | Saty ATR Levels for targets",
    rules: [
      "Ribbon is FULLY stacked same color (all Green/Blue OR all Red/Orange) — confirmed trend?",
      "EMAs are NOT crossing — ribbon is not folding — this is a pullback not a reversal?",
      "Price pulling back INTO ribbon, not breaking THROUGH and closing below/above it?",
      "Entry anticipated at the 13 EMA (first ribbon touch) or 21 EMA (deeper pullback)?",
      "Stop placed on the OTHER side of the full ribbon — if it closes through, trend is broken?",
      "Target set to next Saty ATR Level in the direction of the trend (ADR1/ADR2 Upper or Lower)?",
    ],
  },
  {
    name: "Divergence From Extreme",
    tag: "REVERSAL",
    tagType: "reversal",
    desc: "Range condition. Price makes a swing high or low at an extreme. Saty Phase Oscillator shows divergence — price makes a new high/low but oscillator does not. Entry on swing candle close.",
    entry:
      "Confirmed divergence on the swing candle CLOSE — oscillator diverging while price at extreme",
    risk: "Above the swing HIGH (for shorts) or Below the swing LOW (for longs)",
    target: "Mean reversion to 21 EMA then Ribbon then next Saty ATR Level",
    condition:
      "Range — price oscillating between levels, Phase Oscillator at extreme showing divergence",
    indicators:
      "Saty Phase Oscillator — divergence at extreme is the trigger | Saty ATR Levels for context | Ribbon for mean reversion target",
    rules: [
      "Market is in a RANGE condition — ribbon is compressed or choppy, not trending?",
      "Price has made a clear swing HIGH or LOW at an ATR extreme level?",
      "Saty Phase Oscillator shows CLEAR divergence — price new extreme, oscillator lower/higher?",
      "Waiting for the swing CANDLE to CLOSE before entering — no anticipation on this one?",
      "Stop placed ABOVE the swing High (short) or BELOW the swing Low (long)?",
      "First target is the 21 EMA mean reversion — not trying to catch the full reversal initially?",
    ],
  },
  {
    name: "1Min EOD Divergence",
    tag: "REVERSAL",
    tagType: "reversal",
    desc: "End of day 1min reversal setup. 3:00-4:00pm EST only. Saty Phase Oscillator is near the MIDDLE (not at extreme) — anticipate divergence when price makes a new High or Low. Volume confirmation required.",
    entry:
      "Divergence confirmed on swing candle CLOSE + look for Volume spike confirmation",
    risk: "Above swing HIGH (short) or Below swing LOW (long)",
    target:
      "Mean reversion to 21 EMA then Ribbon then ATR Level on the way back",
    condition:
      "End of Day 3-4pm EST only — Phase Oscillator near middle, not at extreme",
    indicators:
      "Saty Phase Oscillator — must be near MIDDLE for divergence to form | Volume confirmation | Ribbon for target",
    rules: [
      "Time is between 3:00pm-4:00pm EST — this setup is ONLY valid end of day?",
      "Saty Phase Oscillator is near the MIDDLE — not already at an extreme?",
      "Price is making a new High or Low that could trigger a divergence?",
      "Divergence confirmed on the swing candle CLOSE — NOT before close?",
      "Volume spike present on the confirmation candle?",
      "Stop placed correctly above swing High (short) or below swing Low (long)?",
    ],
  },
  {
    name: "Tweezer Bottom",
    tag: "REVERSAL",
    tagType: "reversal",
    desc: "Wicky Wicky. Two consecutive candles with MATCHING bottom wicks at the same price — typically at a key Saty ATR Level (ADR Lower, PDL, Central Pivot). Both candles closed above their wicks. Enter on 50% reclaim of the down candle.",
    entry:
      "Price reclaims 50% of the DOWN (red) candle body — enter on that cross",
    risk: "Below BOTH wicks — the matched low IS the floor, if it breaks the setup is invalid",
    target:
      "21 EMA first (mean reversion) then Ribbon then next Saty ATR Level up",
    condition:
      "Price at a key Saty ATR Level — ADR1/ADR2 Lower, PDL, or Central Pivot acting as support",
    indicators:
      "Saty ATR Levels — tweezer should form AT or NEAR a key level | Ribbon = mean reversion target | 21 EMA = first exit",
    rules: [
      "Two consecutive candles with MATCHING or near-identical bottom wicks at same price?",
      "Both candles CLOSED above their wicks — confirming rejection of lows?",
      "Tweezer is forming AT or NEAR a key Saty ATR Level (ADR Lower, PDL, Central Pivot)?",
      "Entry triggered on price reclaiming 50% of the DOWN candle body — measured precisely?",
      "Initial stop set BELOW both wicks — the wick low is the invalidation level?",
      "First target is the 21 EMA mean reversion — managing stop to below candle bodies once working?",
    ],
  },
];

export const SETUPS_NAMES = PLAYBOOK_SETUPS.map((s) => s.name);

export const ATR_LEVELS = [
  "ADR2 Upper",
  "ADR1 Upper",
  "Prior Day High (PDH)",
  "Central Pivot",
  "Prior Day Low (PDL)",
  "ADR1 Lower",
  "ADR2 Lower",
  "VWAP",
];

export const RIBBON_EMAS = {
  fast: "8 EMA",
  entry: "13 EMA",
  mean: "21 EMA",
  trend: "48 EMA",
  macro: "200 EMA",
  bullish: "Green + Blue candles / ribbon",
  bearish: "Red + Orange candles / ribbon",
  transition: "Ribbon folding — EMAs crossing",
};

export const MISTAKES_LIST = [
  "Early Entry — before candle close confirmation",
  "Entered on Cross Candle — not the retest",
  "Moved Stop — gave it more room than planned",
  "Ignored Stop — let it run past stop level",
  "Chased Entry — price already moved, FOMO in",
  "Wrong Setup — forced a trade that had no clear setup",
  "Early Exit — left R on the table, no reason to exit",
  "Oversized — position too large for the risk level",
  "No Setup — pure emotional / revenge trade",
  "Traded Lunch Hour — 12:30-3pm window ignored",
  "Revenge Trade — entered immediately after a loss",
  "FOMO — entered because of fear of missing the move",
  "No ATR Target — entered without defining the target level",
  "Ignored Ribbon Color — traded against the ribbon bias",
];

export const MINDSET_OPTIONS = [
  "Focused 🎯",
  "Calm 😌",
  "Anxious 😰",
  "Confident 💪",
  "Distracted 😵",
  "Tired 😴",
  "Revenge Mode 😤",
  "Overconfident 🤩",
  "Fearful 😨",
  "Patient 🧘",
  "Rushed ⚡",
];

export const TRADE_MINDSET = [
  "Disciplined",
  "Patient",
  "Rushed",
  "Hesitant",
  "Emotional",
  "Confident",
  "FOMO",
  "Revenge",
  "Calm",
  "Impulsive",
];

export const GRADE_ORDER = { "A+": 6, A: 5, B: 4, C: 3, D: 2, F: 1 };
export const GRADE_REVERSE = {
  6: "A+",
  5: "A",
  4: "B",
  3: "C",
  2: "D",
  1: "F",
};

export function gradeColor(g) {
  if (!g) return "var(--text3)";
  if (g === "A+" || g === "A") return "var(--green)";
  if (g === "B") return "var(--accent2)";
  if (g === "C") return "var(--yellow)";
  if (g === "D") return "var(--orange)";
  return "var(--red)";
}

export function calcAvgGrade(tradeList) {
  const graded = tradeList.filter((t) => t.grade);
  if (!graded.length) return "—";
  const avg = Math.round(
    graded.reduce((s, t) => s + (GRADE_ORDER[t.grade] || 0), 0) / graded.length,
  );
  return GRADE_REVERSE[avg] || "—";
}

export const GRADE_DESCRIPTIONS = {
  "A+": "Perfect execution. Every rule followed, entry precise, held to target. This is the standard.",
  A: "Excellent trade. Minor imperfection but fully within playbook. Repeat this.",
  B: "Good trade. Followed most rules. One thing to tighten up — review what was partial.",
  C: "Average. You saw the setup but execution had clear issues. You left R on the table or bent a rule.",
  D: "Poor execution. Multiple rule violations. Win or loss is irrelevant — this was not your playbook.",
  F: "No setup. Emotional trade. Revenge, FOMO, or random. Do not count this as a real trade.",
};
