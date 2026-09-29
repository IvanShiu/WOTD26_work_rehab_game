import { useCallback, useReducer } from "react";
import {
  assessmentStages,
  type AssessmentStage,
  type DomainScores,
  type GameState,
  type Language,
  type StageId,
} from "../types/game";

const initialState: GameState = {
  currentStage: "welcome",
  completedStages: [],
  domainScores: {},
  language: "zh-Hant",
};

type GameAction =
  | {
      type: "START_GAME";
    }
  | {
      type: "COMPLETE_STAGE";
      stage: AssessmentStage;
      scores: DomainScores;
    }
  | {
      type: "SET_LANGUAGE";
      language: Language;
    }
  | {
      type: "RESET_GAME";
    };

function gameReducer(
  state: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        currentStage: assessmentStages[0],
        completedStages: [],
        domainScores: {},
      };

    case "COMPLETE_STAGE": {
      const currentIndex = assessmentStages.indexOf(action.stage);
      const nextStage: StageId =
        currentIndex >= 0 &&
        currentIndex < assessmentStages.length - 1
          ? assessmentStages[currentIndex + 1]
          : "result";

      const alreadyCompleted = state.completedStages.includes(
        action.stage
      );

      return {
        ...state,
        currentStage: nextStage,
        completedStages: alreadyCompleted
          ? state.completedStages
          : [...state.completedStages, action.stage],
        domainScores: {
          ...state.domainScores,
          ...action.scores,
        },
      };
    }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      };

    case "RESET_GAME":
      return {
        ...initialState,
        language: state.language,
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const startGame = useCallback(() => {
    dispatch({ type: "START_GAME" });
  }, []);

  const completeStage = useCallback(
    (stage: AssessmentStage, scores: DomainScores) => {
      dispatch({
        type: "COMPLETE_STAGE",
        stage,
        scores,
      });
    },
    []
  );

  const setLanguage = useCallback((language: Language) => {
    dispatch({
      type: "SET_LANGUAGE",
      language,
    });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  return {
    state,
    startGame,
    completeStage,
    setLanguage,
    resetGame,
  };
}
