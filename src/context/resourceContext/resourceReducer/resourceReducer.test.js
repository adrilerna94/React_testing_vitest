// Importamos las funciones necesarias desde vitest: describe para agrupar tests, it para definir cada test, y expect para hacer las comprobaciones.
import { describe, it, expect } from 'vitest';

// Importamos el reducer, el estado inicial y los tipos de acción desde el archivo donde está definido tu reducer.
import {
  resourceReducer,
  initialResourceState,
  actionTypes,
} from './resourceReducer';
import { act } from 'react';

// Agrupamos todos los tests relacionados con el reducer en general
describe('resourceReducer', () => {
  
  // Agrupamos específicamente los tests que tienen que ver con la acción CONSUME_WATER
  describe('when an action CONSUME_WATER is dispatched', () => {

    // Primer test: comprueba que si no se pasa un payload, se consuma 10 unidades de agua por defecto
    it('should consume water with default amount of 10', () => {
      // Creamos una acción de tipo CONSUME_WATER sin payload
      const action = { type: actionTypes.CONSUME_WATER };
      
      // Ejecutamos el reducer con el estado inicial y la acción
      const newState = resourceReducer(initialResourceState, action);
      
      // Comprobamos que el agua ha bajado a 90 (100 - 10)
      expect(newState.water).toBe(90);

      // Comprobamos que los otros recursos no han cambiado
      expect(newState.oxygen).toBe(100);
      expect(newState.energy).toBe(100);
    });

    // Segundo test: comprueba que si se pasa un payload, se consuma la cantidad específica de agua
    it('should consume water with custom payload amount', () => {
      // Acción con payload: queremos consumir 30 unidades de agua
      const action = { type: actionTypes.CONSUME_WATER, payload: { amount: 30 } };
      
      // Ejecutamos el reducer
      const newState = resourceReducer(initialResourceState, action);
      
      // Comprobamos que el agua ha bajado a 70 (100 - 30)
      expect(newState.water).toBe(70);

      // Comprobamos que oxígeno y energía siguen igual
      expect(newState.oxygen).toBe(100);
      expect(newState.energy).toBe(100);
    });

    // Tercer test: comprueba que no se puede bajar de 0 aunque el payload sea muy grande
    it('should not go below 0 when payload is too large', () => {
      // Acción con un payload muy grande: intentamos consumir 150 de agua
      const action = { type: actionTypes.CONSUME_WATER, payload: { amount: 150 } };
      
      // Ejecutamos el reducer
      const newState = resourceReducer(initialResourceState, action);
      
      // Como el clamp lo limita a mínimo 0, comprobamos que el agua es 0
      expect(newState.water).toBe(0);

      // Y comprobamos que los demás recursos siguen igual
      expect(newState.oxygen).toBe(100);
      expect(newState.energy).toBe(100);
    });
  });

  describe('when an action CONSUME_OXYGEN is dispatched', () => {
    it('should consume oxygen with default amount of 5', () => {
      // Creamos un action de tipo CONSUME_OXYGEN sin payload
      const action = { type: actionTypes.CONSUME_OXYGEN };

      // Ejecutamos el reducer con el estado inicial y la action
      const newState = resourceReducer(initialResourceState, action);

      // Comprobamos que el oxygen ha bajado de 100 a 95
      expect(newState.oxygen).toBe(95);
    });

    it('should consume oxygen with custom payload amount', () => {
      // creamos un action con payload custom de 20
      const action = { type: actionTypes.CONSUME_OXYGEN, payload: {amount: 20}};

      // Ejecutamos el reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que el oxygen haya bajado la cantidad de -20
      expect(newState.oxygen).toBe(80);
    });

    it('should not go below 0 when payload is too large', () => {
      // Creamos un action con un payload superior al maximo
      const action = { type: actionTypes.CONSUME_OXYGEN, payload: {amount: 130}};

      // ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que la función clamp funciona y no baja de 0
      expect(newState.oxygen).toBe(0);
    });
  });

  describe('when an action CONSUME_ENERGY is dispatched', () => {
    it('should consume energy with default amount of 15', () => {
      // Creamos un action sin payload
      const action = {type: actionTypes.CONSUME_ENERGY};

      // ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que el nivel energy ha bajado la cantidad por defecto (-15)
      expect(newState.energy).toBe(85);
    });
      

    it('should consume energy with custom payload amount', () => {
      // Creamos un action con payload 50
      const action = {type: actionTypes.CONSUME_ENERGY, payload: {amount: 50}};

      // ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que el nivel energy ha bajado la cantidad especificada (-50))
      expect(newState.energy).toBe(50);
    });
      
    it('should not go below 0 when payload is too large', () => {
      // Creamos un action con un payload > 100
      const action = {type: actionTypes.CONSUME_ENERGY, payload: {amount: 160}};

      // ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que la function clamp funciona y no deja bajar el nivel de 0
      expect(newState.energy).toBe(0);
    });
  });

  describe('when an action CONSUME_WATER_AND_OXYGEN is dispatched', () => {
    it('should consume water and oxygen with default amounts (5,5)', () => {
      // action water and oxygen
      const action = {type: actionTypes.CONSUME_WATER_AND_OXYGEN};

      // Ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que ha bajado los valores por default de oxygen (-5) y water (-5)
      expect(newState.oxygen).toBe(95);
      expect(newState.water).toBe(95);
    });

    it('should consume water and oxygen with custom amounts (20, 15)', () => {
      // action water and oxygen
      const action = {type: actionTypes.CONSUME_WATER_AND_OXYGEN, payload: {waterAmount: 20, oxygenAmount: 15}};

      // Ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos niveles water (-20) y oxygen (-15)
      expect(newState.water).toBe(80);
      expect(newState.oxygen).toBe(85);
    });

    it('should clamp water and oxygen to 0 if payload is too large', () => {
      // action water and oxygen with > 100 payload
      const action = {type: actionTypes.CONSUME_WATER_AND_OXYGEN, payload: {waterAmount: 120, oxygenAmount: 115}};

      // Ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos niveles water y oxygen a minimo (0)
      expect(newState.water).toBe(0);
      expect(newState.oxygen).toBe(0);
    });
  });

  describe('when an action GENERATE_OXYGEN_AND_CONSUME_ENERGY is dispatched', () => {
    it('should increase oxygen (clamped to 100) and reduce energy with default amounts (+10, -10)', () => {
      // action GENERATE_OXYGEN_AND_CONSUME_ENERGY without payload
      const action = {type: actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY};

      // custom state oxygen: 70 y energy: 90
      const customState = {...initialResourceState, oxygen: 70, energy: 90};

      // Ejecutamos reducer
      const newState = resourceReducer(customState, action);

      // comprobamos niveles energy -10 y oxygen(maximo 100)
      expect(newState.energy).toBe(80);
      expect(newState.oxygen).toBe(80);
    });

    it('should clamp oxygen and clamp energy when payload is large', () => {
      // action GENERATE_OXYGEN_AND_CONSUME_ENERGY with payloads energy (150) and oxygen (140)
      const action = {type: actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY, payload: {oxygenAmount: 140 , energyCost: 150}};

      // Ejecutamos reducer
      const newState = resourceReducer(initialResourceState, action);

      // comprobamos que funciona clamp para limitar niveles (energy = 0) y (oxygen = 100)
      expect(newState.energy).toBe(0);
      expect(newState.oxygen).toBe(100);
    });
  });

  describe('when an action RESET_RESOURCES is dispatched', () => {
    it('should reset to the initialResourceState', () => {
      // action RESET_RESOURCES
      const action = {type: actionTypes.RESET_RESOURCES};

      // generamos state custom con valores de oxygen: 50 , water: 80 y energy: 5
      const customState = {...initialResourceState, oxygen: 50, water: 80, energy: 5};

      // Ejecutamos reducer
      const newState = resourceReducer(customState, action);

      // comprobamos que recuperamos valores iniciales oxygen, energy, water (100)
      expect(newState.energy).toBe(100);
      expect(newState.oxygen).toBe(100);
      expect(newState.water).toBe(100);
    });
  });

  describe('when an unknown action type is dispatched', () => {
    it('should return the current state unchanged', () => {
      // unknown action dispatched (CONSUME_LIFE)
      const action = {type: actionTypes.CONSUME_LIFE};

      // generamos state custom con valores de oxygen: 50 , water: 80 y energy: 5
      const customState = {...initialResourceState, oxygen: 50, water: 80, energy: 5};

      // Ejecutamos reducer
      const newState = resourceReducer(customState, action);

      // comprobamos que recuperamos devuelve el estado actual si la action es desconocida
      expect(newState.energy).toBe(5);
      expect(newState.oxygen).toBe(50);
      expect(newState.water).toBe(80);
    });
  });
});
