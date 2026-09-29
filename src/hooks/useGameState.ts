import { useCallback, useReducer } from "react";
import {
  rehabStages,
  type Language,
  type RehabGameState,
  type RehabScreenId,
  type StageResult,
} from "../types/game";

const initialState: RehabGameState = {
  currentStage: "welcome",
  completedStages: [],
  results: {},
  language: "zh-Hant",
};

type GameAction =
  | {
      type: "START_JOURNEY";
    }
  | {
      type: "COMPLETE_STAGE";
      result: StageResult;
    }
  | {
      type: "SET_LANGUAGE";
      language: Language;
    }
  | {
      type: "RESET_JOURNEY";
    };

function gameReducer(
  state: RehabGameState,
  action: GameAction
): RehabGameState {
  switch (action.type) {
    case "START_JOURNEY":
      return {
        ...state,
        currentStage: rehabStages[0],
        completedStages: [],
        results: {},
      };

    case "COMPLETE_STAGE": {
      const { result } = action;

      const currentIndex = rehabStages.indexOf(
        result.stage
      );

      if (currentIndex === -1) {
        return state;
      }

      const alreadyCompleted =
        state.completedStages.includes(result.stage);

      const nextStage: RehabScreenId =
        currentIndex < rehabStages.length - 1
          ? rehabStages[currentIndex + 1]
          : "result";

      return {
        ...state,
        currentStage: nextStage,
        completedStages: alreadyCompleted
          ? state.completedStages
          : [
              ...state.completedStages,
              result.stage,
            ],
        results: {
          ...state.results,
          [result.stage]: result,
        },
      };
    }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      };

    case "RESET_JOURNEY":
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

  const startJourney = useCallback(() => {
    dispatch({
      type: "START_JOURNEY",
    });
  }, []);

  const completeStage = useCallback(
    (result: StageResult) => {
      dispatch({
        type: "COMPLETE_STAGE",
        result,
      });
    },
    []
  );

  const setLanguage = useCallback(
    (language: Language) => {
      dispatch({
        type: "SET_LANGUAGE",
        language,
      });
    },
    []
  );

  const resetJourney = useCallback(() => {
    dispatch({
      type: "RESET_JOURNEY",
    });
  }, []);

  return {
    state,
    startJourney,
    completeStage,
    setLanguage,
    resetJourney,
  };
}
