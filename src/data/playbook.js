export const PLAYBOOK_SETUPS = [
  {
    name: '10 Min ORB',
    tag: 'BREAKOUT',
    tagType: 'breakout',
    desc: 'Mark High/Low of first 10min candle at open. Entry on Break & Retest of OR High/Low.',
    entry: 'Break and Retest of OR High or Low',
    risk: 'Midpoint of Open Range',
    target: 'Next S/R / ATR level / Change in Momentum / bigger EMA',
    condition: 'Any — mark levels at 9:40am EST',
    rules: [
      'Marked OR High and Low at 9:40am?',
      'Waiting for confirmed break (not anticipating)?',
      'Entry on retest — not on the initial break?',
      'Stop set at midpoint of OR?',
      'Target is clearly defined S/R or ATR level?',
      'Trading between 9:40–12:30 or 3–4pm only?'
    ]
  },
  {
    name: 'Vomy',
    tag: 'TRANSITION',
    tagType: 'transition',
    desc: 'Price crosses the ribbon and closes on the other side. Entry on retest of ribbon.',
    entry: 'Price retests the ribbon after crossing',
    risk: 'Other side of Ribbon',
    target: 'Next S/R / ATR / VWAP / bigger EMA',
    condition: 'Transition — price changes sides of ribbon',
    rules: [
      'Price closed on the other side of ribbon (confirmed transition)?',
      'Entering on retest — not on the cross candle?',
      'Stop placed on other side of ribbon?',
      'Target is clearly defined?',
      'Market condition is transitioning (not already trending)?',
      'Was patient waiting for the retest?'
    ]
  },
  {
    name: 'iVomy',
    tag: 'TRANSITION',
    tagType: 'transition',
    desc: 'Inverse Vomy. Same rules but in the opposite direction. Anticipate and enter on retest.',
    entry: 'Price retests the ribbon after crossing (inverse)',
    risk: 'Other side of Ribbon',
    target: 'Next S/R / ATR / VWAP / bigger EMA',
    condition: 'Transition — inverse direction',
    rules: [
      'Price closed on the other side of ribbon (confirmed)?',
      'Entering on retest — not on the cross candle?',
      'Stop placed on other side of ribbon?',
      'Target is clearly defined?',
      'Market condition is transitioning (not trending)?',
      'Was patient waiting for the retest?'
    ]
  },
  {
    name: 'Flag Into Ribbon',
    tag: 'TREND',
    tagType: 'trend',
    desc: 'Trending market. Price pulls back into the ribbon (support). Entry at 13 or 21 EMA.',
    entry: '13 or 21 EMA on anticipated pullback',
    risk: 'Other side of Ribbon',
    target: 'Next S/R / ATR / VWAP / bigger EMA',
    condition: 'Trending — ribbon acts as support',
    rules: [
      'Market is clearly in a trend (not ranging)?',
      'Price is pulling back — not breaking through ribbon?',
      'Entry anticipated at 13 or 21 EMA level?',
      'Stop placed on other side of ribbon?',
      'Target clearly defined with momentum context?',
      'Ribbon acting as clear support?'
    ]
  },
  {
    name: 'Divergence From Extreme',
    tag: 'REVERSAL',
    tagType: 'reversal',
    desc: 'Range condition. Phase Oscillator divergence from extreme. Entry on swing candle close.',
    entry: 'Divergence confirmation on swing candle close',
    risk: 'Above/Below swing High/Low',
    target: 'Mean Reversion → 21 EMA → Ribbon → S/R',
    condition: 'Range — price at extreme with oscillator divergence',
    rules: [
      'Market is in a range condition?',
      'Price has made a clear swing high or low?',
      'Phase Oscillator shows clear divergence from extreme?',
      'Waiting for swing candle close confirmation?',
      'Stop placed above/below swing high/low?',
      'First target set to 21 EMA mean reversion?'
    ]
  },
  {
    name: '1Min EOD Divergence',
    tag: 'REVERSAL',
    tagType: 'reversal',
    desc: 'End of day 1min reversal. Phase oscillator close to middle — anticipate divergence on new H/L.',
    entry: 'Divergence confirmation + Volume on swing candle close',
    risk: 'Above/Below swing High/Low',
    target: 'Mean Reversion → 21 EMA → Ribbon',
    condition: 'End of Day (3–4pm) — oscillator near middle',
    rules: [
      'Trading between 3:00–4:00pm EST?',
      'Phase oscillator is close to middle (not extreme)?',
      'New High or Low being formed to trigger divergence?',
      'Confirmed by volume on swing candle close?',
      'Entry only on candle close confirmation?',
      'Stop placed correctly above/below swing H/L?'
    ]
  },
  {
    name: 'Tweezer Bottom',
    tag: 'REVERSAL',
    tagType: 'reversal',
    desc: 'Wicky Wicky. Two parallel candles with matching bottom wicks. Reclaim 50% of down candle.',
    entry: 'Reclaim 50% of the down candle',
    risk: 'Below tweezer wicks',
    target: 'Mean Reversion → 21 EMA → Ribbon',
    condition: 'Any — two parallel candles with matching wicks',
    rules: [
      'Two clearly parallel candles with matching bottom wicks?',
      'Entry triggered on reclaim of 50% of down candle?',
      'Initial stop set below tweezer wicks?',
      'Moving stop to below candle body lows once working?',
      'Moving stop below structure once in profit?',
      'First target set to 21 EMA mean reversion?'
    ]
  }
];

export const SETUPS_NAMES = PLAYBOOK_SETUPS.map(s => s.name);

export const MISTAKES_LIST = [
  'Early Entry',
  'Moved Stop',
  'Ignored Stop',
  'Chased Entry',
  'Wrong Setup',
  'Early Exit',
  'Oversized',
  'No Clear Setup',
  'Traded Lunch Hour',
  'Revenge Trade',
  'FOMO',
  'No Confirmation'
];

export const MINDSET_OPTIONS = [
  'Focused 🎯', 'Calm 😌', 'Anxious 😰', 'Confident 💪',
  'Distracted 😵', 'Tired 😴', 'Revenge Mode 😤', 'Overconfident 🤩', 'Fearful 😨'
];

export const TRADE_MINDSET = [
  'Disciplined', 'Patient', 'Rushed', 'Hesitant',
  'Emotional', 'Confident', 'FOMO', 'Revenge'
];

export const GRADE_ORDER = { 'A+': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
export const GRADE_REVERSE = { 6: 'A+', 5: 'A', 4: 'B', 3: 'C', 2: 'D', 1: 'F' };

export function gradeColor(g) {
  if (!g) return 'var(--text3)';
  if (g === 'A+' || g === 'A') return 'var(--green)';
  if (g === 'B') return 'var(--accent2)';
  if (g === 'C') return 'var(--yellow)';
  if (g === 'D') return 'var(--orange)';
  return 'var(--red)';
}

export function calcAvgGrade(tradeList) {
  const graded = tradeList.filter(t => t.grade);
  if (!graded.length) return '—';
  const avg = Math.round(graded.reduce((s, t) => s + (GRADE_ORDER[t.grade] || 0), 0) / graded.length);
  return GRADE_REVERSE[avg] || '—';
}
