import type {
  BilingualText,
  Language,
  RehabStageId,
} from "../types/game";

export interface LiStageStory {
  id: RehabStageId;
  order: number;
  title: BilingualText;
  story: BilingualText;
  focus: BilingualText;
  assessment: BilingualText[];
  support: BilingualText[];
  strategy: BilingualText;
}

export const liCaseStory = {
  participant: {
    name: {
      en: "Mr Li",
      "zh-Hant": "李生",
    },
    background: {
      en:
        "Mr Li is a delivery driver who had a stroke. He hopes to gradually return to driving and work.",
      "zh-Hant":
        "李生是一名送貨司機，曾經中風。他希望循序漸進地重返駕駛及送貨工作。",
    },
    note: {
      en:
        "This is a fictional educational scenario. Every person's abilities and rehabilitation needs are different.",
      "zh-Hant":
        "這是一個虛構的教育情境。每個人的能力及復康需要都不同。",
    },
  },

  introduction: {
    title: {
      en: "Mr Li's return-to-driving journey",
      "zh-Hant": "李生的重返駕駛旅程",
    },
    story: {
      en:
        "After his stroke, Mr Li wants to return to driving. An occupational therapist helps him explore how his abilities, the vehicle, the environment and work demands fit together.",
      "zh-Hant":
        "中風後，李生希望重返駕駛。職業治療師會協助他了解個人能力、車輛、環境及工作要求之間的配合。",
    },
    focus: {
      en:
        "OT rehabilitation is not only about deciding whether someone can drive. It also includes assessment, strategy training, graded practice and planning for safe participation.",
      "zh-Hant":
        "職業治療復康不只是判斷一個人能否駕駛，也包括功能評估、策略訓練、分級練習，以及計劃如何安全地參與生活及工作。",
    },
  },

  closing: {
    title: {
      en: "What did we learn about OT rehabilitation?",
      "zh-Hant": "我們從職業治療復康中學到甚麼？",
    },
    story: {
      en:
        "OTs consider the person, vehicle, environment and occupation together. They may provide strategies, graded practice, vehicle setup advice and alternative mobility planning.",
      "zh-Hant":
        "職業治療師會一併考慮個人、車輛、環境及職業要求，並可能提供安全策略、分級練習、車輛設定建議及其他社區流動方案。",
    },
  },
};

export const liStageStories: Record<
  RehabStageId,
  LiStageStory
> = {
  vehicleSetup: {
    id: "vehicleSetup",
    order: 1,
    title: {
      en: "Preparing Mr Li and the vehicle",
      "zh-Hant": "準備李生及車輛",
    },
    story: {
      en:
        "Before driving practice begins, the OT helps Mr Li check whether the seat, mirrors, steering wheel and controls are suitable for him.",
      "zh-Hant":
        "開始駕駛練習前，職業治療師先協助李生檢查座椅、後視鏡、方向盤及控制裝置是否適合他。",
    },
    focus: {
      en:
        "Can Mr Li see clearly, maintain a stable posture and operate the vehicle comfortably?",
      "zh-Hant":
        "李生能否清楚觀察環境、保持穩定坐姿，並舒適地操作車輛？",
    },
    assessment: [
      {
        en: "Seating posture and stability",
        "zh-Hant": "坐姿及身體穩定性",
      },
      {
        en: "Ability to see the mirrors and road ahead",
        "zh-Hant": "能否看清後視鏡及前方道路",
      },
      {
        en: "Ability to reach and operate vehicle controls",
        "zh-Hant": "能否觸及及操作車輛控制裝置",
      },
    ],
    support: [
      {
        en: "Practise adjusting the seat and mirrors",
        "zh-Hant": "練習調整座椅及後視鏡",
      },
      {
        en: "Use a quiet area for graded practice",
        "zh-Hant": "先在安靜環境進行分級練習",
      },
      {
        en: "Consider further vehicle adaptation assessment if needed",
        "zh-Hant": "如有需要，考慮進一步車輛輔助設備評估",
      },
    ],
    strategy: {
      en:
        "Before moving, check posture, mirrors, controls and seatbelt.",
      "zh-Hant":
        "開始行駛前，先檢查坐姿、後視鏡、控制裝置及安全帶。",
    },
  },

  mirrorPositionPark: {
    id: "mirrorPositionPark",
    order: 2,
    title: {
      en: "Mirror, position and park",
      "zh-Hant": "後視鏡、車輛位置及泊車",
    },
    story: {
      en:
        "Mr Li now practises low-speed vehicle control in a quiet parking area. He needs to scan the surroundings before moving and stop when a hazard appears.",
      "zh-Hant":
        "李生現在在較安靜的停車場練習低速控制車輛。他需要在移動前觀察周圍，並在危險出現時停車。",
    },
    focus: {
      en:
        "Can Mr Li use a systematic scanning routine while controlling the vehicle?",
      "zh-Hant":
        "李生能否一邊控制車輛，一邊使用有系統的觀察程序？",
    },
    assessment: [
      {
        en: "Visual scanning and blind-spot checking",
        "zh-Hant": "視覺掃描及盲點檢查",
      },
      {
        en: "Vehicle position and spatial awareness",
        "zh-Hant": "車輛位置及空間覺察",
      },
      {
        en: "Ability to stop safely when a hazard appears",
        "zh-Hant": "危險出現時能否安全停車",
      },
    ],
    support: [
      {
        en: "Practise mirror-side-blind-spot scanning",
        "zh-Hant": "練習後視鏡、側面及盲點掃描",
      },
      {
        en: "Begin in an open area before adding obstacles",
        "zh-Hant": "先在空曠地方練習，再逐步加入障礙物",
      },
      {
        en: "Repeat the same routine until it becomes familiar",
        "zh-Hant": "重複練習相同程序，建立熟悉感",
      },
    ],
    strategy: {
      en:
        "Scan first, move slowly, keep checking and stop when unsure.",
      "zh-Hant":
        "先觀察、慢速移動、持續檢查；如不確定，先停車。",
    },
  },

  safeFollowingDistance: {
    id: "safeFollowingDistance",
    order: 3,
    title: {
      en: "Keeping a safe following distance",
      "zh-Hant": "保持安全車距",
    },
    story: {
      en:
        "Mr Li begins practising on a simple road. He needs to notice changes in the vehicle ahead and adjust his speed early.",
      "zh-Hant":
        "李生開始在較簡單的道路上練習。他需要留意前方車輛的變化，並及早調節車速。",
    },
    focus: {
      en:
        "Can Mr Li maintain enough space and time to observe, decide and brake?",
      "zh-Hant":
        "李生能否保持足夠距離及時間，以便觀察、判斷及煞車？",
    },
    assessment: [
      {
        en: "Distance judgement",
        "zh-Hant": "距離判斷",
      },
      {
        en: "Speed adjustment",
        "zh-Hant": "速度調節",
      },
      {
        en: "Early detection of changes in traffic",
        "zh-Hant": "及早察覺交通情況變化",
      },
    ],
    support: [
      {
        en: "Use the vehicle ahead as a visual reference",
        "zh-Hant": "以前方車輛作為視覺參考",
      },
      {
        en: "Practise reducing speed before the gap becomes too small",
        "zh-Hant": "練習在車距過近前及早減速",
      },
      {
        en: "Use pacing and planned rest breaks when fatigue appears",
        "zh-Hant": "感到疲倦時使用節奏控制及預先安排休息",
      },
    ],
    strategy: {
      en:
        "Look further ahead, keep space and avoid waiting until the last moment.",
      "zh-Hant":
        "看遠一點、保持車距，不要等到最後一刻才作出反應。",
    },
  },

  roadworksDetour: {
    id: "roadworksDetour",
    order: 4,
    title: {
      en: "Managing a roadworks detour",
      "zh-Hant": "處理道路工程及改道",
    },
    story: {
      en:
        "The familiar road to Mr Li's delivery location is closed. He needs to choose a suitable alternative route without making a rushed decision.",
      "zh-Hant":
        "李生前往送貨地點的熟悉道路突然封閉。他需要選擇合適的替代路線，而不是匆忙作出決定。",
    },
    focus: {
      en:
        "Can Mr Li process new information, plan a route and respond safely to change?",
      "zh-Hant":
        "李生能否處理新資訊、規劃路線，並安全地應對環境變化？",
    },
    assessment: [
      {
        en: "Route planning and problem solving",
        "zh-Hant": "路線規劃及問題解決",
      },
      {
        en: "Attention shifting between signs and traffic",
        "zh-Hant": "在路牌及交通情況之間轉移注意力",
      },
      {
        en: "Decision making under pressure",
        "zh-Hant": "在壓力下作出決定",
      },
    ],
    support: [
      {
        en: "Plan unfamiliar routes before starting",
        "zh-Hant": "出發前預先規劃不熟悉的路線",
      },
      {
        en: "Use voice navigation where appropriate",
        "zh-Hant": "在合適情況下使用語音導航",
      },
      {
        en: "Stop in a safe place when the route is unclear",
        "zh-Hant": "路線不清楚時，在安全位置停車",
      },
    ],
    strategy: {
      en:
        "The shortest route is not always the safest or most suitable route.",
      "zh-Hant":
        "最短路線不一定是最安全或最適合的路線。",
    },
  },

  driverDistraction: {
    id: "driverDistraction",
    order: 5,
    title: {
      en: "Managing distraction while driving",
      "zh-Hant": "駕駛時處理分心情況",
    },
    story: {
      en:
        "During the journey, the navigation system changes and Mr Li receives a phone notification. He needs to decide how to stay focused.",
      "zh-Hant":
        "駕駛途中，導航系統需要重新規劃，而李生亦收到手機通知。他需要決定如何保持專注。",
    },
    focus: {
      en:
        "Can Mr Li recognise distraction and choose a safer way to manage it?",
      "zh-Hant":
        "李生能否察覺分心情況，並選擇較安全的處理方法？",
    },
    assessment: [
      {
        en: "Attention management",
        "zh-Hant": "注意力管理",
      },
      {
        en: "Ability to suppress unsafe responses",
        "zh-Hant": "抑制不安全反應的能力",
      },
      {
        en: "Fatigue awareness and self-monitoring",
        "zh-Hant": "疲勞覺察及自我監察",
      },
    ],
    support: [
      {
        en: "Set up navigation before starting",
        "zh-Hant": "出發前先設定導航",
      },
      {
        en: "Ask a passenger to help when appropriate",
        "zh-Hant": "在合適情況下請乘客協助",
      },
      {
        en: "Stop safely before dealing with a phone or route change",
        "zh-Hant": "處理手機或路線變化前，先在安全位置停車",
      },
    ],
    strategy: {
      en:
        "Safe driving may mean doing less, asking for help or stopping first.",
      "zh-Hant":
        "安全駕駛有時代表減少同時處理的事情、請人協助，或先停車。",
    },
  },

  communityMobility: {
    id: "communityMobility",
    order: 6,
    title: {
      en: "Planning safe community mobility",
      "zh-Hant": "規劃安全社區流動",
    },
    story: {
      en:
        "Mr Li feels tired and the road conditions are difficult today. The OT discusses whether driving is the best option for this particular journey.",
      "zh-Hant":
        "李生今天感到疲倦，而道路情況亦較複雜。職業治療師與他討論，今次行程是否適合自行駕駛。",
    },
    focus: {
      en:
        "Can Mr Li choose a safe way to remain involved in daily life and work?",
      "zh-Hant":
        "李生能否選擇安全的方式，繼續參與日常生活及工作？",
    },
    assessment: [
      {
        en: "Ability to recognise personal limits",
        "zh-Hant": "察覺個人能力限制",
      },
      {
        en: "Planning of daily and work activities",
        "zh-Hant": "日常及工作活動規劃",
      },
      {
        en: "Use of alternative transport options",
        "zh-Hant": "使用其他交通選項",
      },
    ],
    support: [
      {
        en: "Plan graded return to driving and work",
        "zh-Hant": "規劃分階段重返駕駛及工作",
      },
      {
        en: "Use public transport, family support or other options when needed",
        "zh-Hant": "有需要時使用公共交通、家人支援或其他方案",
      },
      {
        en: "Maintain community participation even when driving is not suitable",
        "zh-Hant": "即使暫時不適合駕駛，也維持社區參與",
      },
    ],
    strategy: {
      en:
        "Not driving today can be a safe and responsible decision, not a failure.",
      "zh-Hant":
        "今天不駕駛可以是一個安全及負責任的決定，並不代表失敗。",
    },
  },
};

export function getLocalizedText(
  text: BilingualText,
  language: Language
): string {
  return text[language];
}
