export const initialResourceState = {
  water: 100,
  oxygen: 100,
  energy: 100,
};

// Tipus d'accions per tenir major claritat
export const actionTypes = {
  CONSUME_WATER: 'CONSUME_WATER',
  CONSUME_OXYGEN: 'CONSUME_OXYGEN',
  CONSUME_ENERGY: 'CONSUME_ENERGY',
  CONSUME_WATER_AND_OXYGEN: 'CONSUME_WATER_AND_OXYGEN',
  GENERATE_OXYGEN_AND_CONSUME_ENERGY: 'GENERATE_OXYGEN_AND_CONSUME_ENERGY',
  RESET_RESOURCES: 'RESET_RESOURCES',
};

function clamp(value, minVal, maxVal) {
  return Math.max(minVal, Math.min(maxVal, value));
}

export function resourceReducer(state, action) {
  switch (action.type) {
    case actionTypes.CONSUME_WATER: {
      const newWater = state.water - (action.payload?.amount || 10);
      return {
        ...state,
        water: clamp(newWater, 0, initialResourceState.water),
      };
    }

    case actionTypes.CONSUME_OXYGEN: {
      const newOxygen = state.oxygen - (action.payload?.amount || 5);
      return {
        ...state,
        oxygen: clamp(newOxygen, 0, initialResourceState.oxygen),
      };
    }

    case actionTypes.CONSUME_ENERGY: {
      const newEnergy = state.energy - (action.payload?.amount || 15);
      return {
        ...state,
        energy: clamp(newEnergy, 0, initialResourceState.energy),
      };
    }

    case actionTypes.CONSUME_WATER_AND_OXYGEN: {
      const newWater = state.water - (action.payload?.waterAmount || 5);
      const newOxygen = state.oxygen - (action.payload?.oxygenAmount || 5);
      return {
        ...state,
        water: clamp(newWater, 0, initialResourceState.water),
        oxygen: clamp(newOxygen, 0, initialResourceState.oxygen),
      };
    }

    case actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY: {
      const newOxygen = state.oxygen + (action.payload?.oxygenAmount || 10);
      const newEnergy = state.energy - (action.payload?.energyCost || 10);
      return {
        ...state,
        oxygen: clamp(newOxygen, 0, initialResourceState.oxygen),
        energy: clamp(newEnergy, 0, initialResourceState.energy),
      };
    }

    case actionTypes.RESET_RESOURCES:
      return initialResourceState;

    default:
      return state;
  }
}
