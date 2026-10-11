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
      en: "Mr Lee",
      "zh-Hant": "李生",
    },
    background: {
      en:
        "Mr Lee is a delivery driver who had a stroke. He hopes to gradually return to driving and work.",
      "zh-Hant":
        "李生是一名送貨司機，曾經中風。他希望循序漸進地重返駕駛及送貨工作。",
    },
    note: {
      en:
        "This is a fictional educational scenario. Every person's abilities and rehabilitation needs are different.",
      "zh-Hant":
        "此為虛構的教育情境。每個人的能力及復康需要都不同。",
    },
  },

  introduction: {
    title: {
      en: "Mr Lee's return-to-driving journey",
      "zh-Hant": "李生的重返駕駛旅程",
    },
    story: {
      en:
        "Following a stroke, Mr Lee hopes to return to driving and eventually return to work. An occupational therapist helps assess how his physical, cognitive and perceptual abilities interact with vehicle demands, environmental conditions and work requirements.",
      "zh-Hant":
        "中風後，李生希望重返駕駛，並逐步返回工作崗位。職業治療師會評估其身體功能、認知及感知能力如何配合車輛操作要求、環境條件及工作需求，並制定合適的復康計劃。",
    },
    focus: {
      en:
        "Driving rehabilitation is not only about determining fitness to drive. It also involves assessment, skill development, graded practice and planning for a safe return to driving and community participation.",
      "zh-Hant":
        "駕駛復康並不只是評估駕駛適能，更包括能力評估、技巧訓練、分級練習，以及規劃安全重返駕駛及社區參與。",
    },
  },

  closing: {
    title: {
      en: "What did we learn about OT rehabilitation?",
      "zh-Hant": "我們從職業治療復康中學到甚麼？",
    },
    story: {
      en:
        "Occupational therapists consider the interaction between the person, vehicle, environment and occupational demands when supporting a return to driving.",
      "zh-Hant":
        "職業治療師會考慮其個人能力、車輛特性、環境因素及職業要求之間的互動，以協助個案安全重返駕駛。",
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
      en: "Preparing for Safe Driving",
      "zh-Hant": "駕駛前準備",
    },
    story: {
      en:
        "Before driving practice begins, the OT helps Mr Lee check whether the seat, mirrors, steering wheel and controls are suitable for him.",
      "zh-Hant":
        "開始駕駛練習前，職業治療師先協助李生檢查座椅、後視鏡、方向盤及控制裝置是否適合他。",
    },
    focus: {
      en:
        "Can Mr Lee see clearly, maintain a stable posture and operate the vehicle comfortably?",
      "zh-Hant":
        "李生能否清楚觀察環境、保持穩定坐姿，並舒適地操作車輛？",
    },
    assessment: [
      {
        en: "Postural control and sitting stability",
        "zh-Hant": "姿勢控制及坐姿穩定性",
      },
      {
        en: "Visual access to mirrors and the driving environment",
        "zh-Hant": "觀察後視鏡及道路環境的能力",
      },
      {
        en: "Ability to reach and operate vehicle controls safely",
        "zh-Hant": "安全伸手接觸及操作車內各項控制裝置的能力",
      },
    ],
    support: [
      {
        en: "Train vehicle setup and pre-driving safety checks",
        "zh-Hant": "訓練車輛之設置及駕駛前安全檢查",
      },
      {
        en: "Provide graded, progressive training according to the individual's ability level.",
        "zh-Hant": "按能力水平進行循序漸進的分級訓練",
      },
      {
        en: "Consider vehicle adaptation and assistive equipment assessment when required",
        "zh-Hant": "如有需要，轉介進行車輛改裝及輔助設備評估",
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
        "Mr Lee now practises low-speed vehicle control in a quiet parking area. He needs to scan the surroundings before moving and stop when a hazard appears.",
      "zh-Hant":
        "李生現在在較安靜的停車場練習低速控制車輛。他需要在移動前觀察周圍，並在危險出現時停車。",
    },
    focus: {
      en:
        "Can Mr Lee control the vehicle while monitoring his surroundings?",
      "zh-Hant":
        "李生能否一邊控制車輛，一邊觀察周邊環境？",
    },
    assessment: [
      {
        en: "Visual scanning and blind-spot checking",
        "zh-Hant": "視覺掃描及盲點檢查",
      },
      {
        en: "Spatial awareness and vehicle positioning",
        "zh-Hant": "空間知覺及車輛定位能力",
      },
      {
        en: "Hazard recognition and safe response",
        "zh-Hant": "危險辨識及安全反應能力",
      },
    ],
    support: [
      {
        en: "Train systematic visual scanning strategies",
        "zh-Hant": "訓練視覺掃描策略",
      },
      {
        en: "Progress from simple to more complex driving environments",
        "zh-Hant": "由簡單環境逐步過渡至較複雜的駕駛情境",
      },
      {
        en: "Develop safe driving routines through repeated practice",
        "zh-Hant": "透過重複練習建立安全駕駛習慣",
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
        "Mr Lee begins practising on a simple road. He needs to notice changes in the vehicle ahead and adjust his speed early.",
      "zh-Hant":
        "李生開始在較簡單的道路上練習。他需要留意前方車輛的變化，並及早調節車速。",
    },
    focus: {
      en:
        "Can Mr Lee maintain enough space and time to observe, decide and brake?",
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
        en: "Plan driving and rest breaks appropriately, and stop to rest when fatigue develops.",
        "zh-Hant": "感到疲倦時及早休息，並適當安排駕駛及休息時間。",
      },
    ],
    strategy: {
      en:
        "Look further ahead, keep space and avoid waiting until the last moment.",
      "zh-Hant":
        "看遠一點、保持車距，不要等到最後一刻才作出反應。",
    },
  },

    braking: {
    id: "braking",
    order: 4,
    title: {
      en: "Quick-stop braking practice",
      "zh-Hant": "快速煞車體驗",
    },
    story: {
      en:
        "After practising safe following distance, Mr Lee practises responding to a sudden hazard in a controlled environment.",
      "zh-Hant":
        "練習安全車距後，李生在受控環境中練習應對突然出現的危險。",
    },
    focus: {
      en:
        "Can Mr Lee notice a hazard and respond by braking appropriately?",
      "zh-Hant":
        "李生能否察覺危險，並 煞車反應？",
    },
    assessment: [
      {
        en: "Reaction to unexpected hazards",
        "zh-Hant": "對突發危險的反應能力",
      },
      {
        en: "Ability to coordinate seeing and braking",
        "zh-Hant": "視覺與煞車動作的協調能力",
      },
      {
        en: "Understanding braking and reaction distance",
        "zh-Hant": "對反應距離及煞車距離的理解",
      },
    ],
    support: [
      {
        en: "Practise in a controlled and predictable environment",
        "zh-Hant": "先在受控及可預測的環境中練習",
      },
      {
        en: "Look further ahead and anticipate possible hazards",
        "zh-Hant": "看遠一點，預測可能出現的危險",
      },
      {
        en: "Allow enough space and time before braking",
        "zh-Hant": "煞車前保留足夠距離及時間",
      },
    ],
    strategy: {
      en:
        "Safe driving is not only about reacting quickly. It also involves noticing hazards early and keeping enough space.",
      "zh-Hant":
        "安全駕駛不只是反應快，也包括及早察覺危險，以及保持足夠的距離。",
    },
  },


  roadworksDetour: {
    id: "roadworksDetour",
    order: 5,
    title: {
      en: "Managing a roadworks detour",
      "zh-Hant": "處理道路工程及改道",
    },
    story: {
      en:
        "The familiar road to Mr Lee's delivery location is closed. He needs to choose a suitable alternative route without making a rushed decision.",
      "zh-Hant":
        "李生前往送貨地點的熟悉道路突然封閉。他需要選擇合適的替代路線，而不是匆忙作出決定。",
    },
    focus: {
      en:
        "Can Mr Lee process new information, plan a route and respond safely to change?",
      "zh-Hant":
        "李生能否處理新資訊、規劃路線，並安全地應對環境變化？",
    },
    assessment: [
      {
        en: "Route planning and problem-solving",
        "zh-Hant": "路線規劃及問題解決能力",
      },
      {
        en: "Maintain  attention in complex traffic situations",
        "zh-Hant": "在複雜路況下保持注意力",
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
    order: 6,
    title: {
      en: "Managing distraction while driving",
      "zh-Hant": "駕駛時處理分心情況",
    },
    story: {
      en:
        "During the journey, the navigation system changes and Mr Lee receives a phone notification. He needs to decide how to stay focused.",
      "zh-Hant":
        "駕駛途中，導航系統需要重新規劃，而李生亦收到手機通知。他需要決定如何保持專注。",
    },
    focus: {
      en:
        "Can Mr Lee recognise distraction and choose a safer way to manage it?",
      "zh-Hant":
        "李生能否察覺分心情況，並選擇較安全的處理方法？",
    },
    assessment: [
      {
        en: "Attention management and divided attention",
        "zh-Hant": "注意力管理及分配注意能力",
      },
      {
        en: "Ability to respond safely",
        "zh-Hant": "作出安全反應的能力",
      },
      {
        en: "Fatigue awareness and self-monitoring",
        "zh-Hant": "疲勞覺察及自我監察能力",
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
    order: 7,
    title: {
      en: "Planning safe community mobility",
      "zh-Hant": "規劃安全社區流動",
    },
    story: {
      en:
        "Mr Lee feels tired and the road conditions are difficult today. The OT discusses whether driving is the best option for this particular journey.",
      "zh-Hant":
        "李生今天感到疲倦，而道路情況亦較複雜。職業治療師與他討論，今次行程是否適合自行駕駛。",
    },
    focus: {
      en:
        "Can Mr Lee choose a safe way to remain involved in daily life and work?",
      "zh-Hant":
        "李生能否選擇安全的方式，繼續參與日常生活及工作？",
    },
    assessment: [
      {
        en: "Ability to recognise personal limits",
        "zh-Hant": "察覺其個人能力限制",
      },
      {
        en: "Planning of daily and work activities",
        "zh-Hant": "日常及工作活動規劃",
      },
      {
        en: "Use of alternative transport options",
        "zh-Hant": "運用替代其他交通的能力",
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
