'use client';

import { useContext } from 'react';
import { ResourceContext } from '@/context/resourceContext/resourceContext';
import { actionTypes } from '@/context/resourceContext/resourceReducer/resourceReducer';
import { Button, Card, Typography } from '@/components/ui';
import Resource from './Resource/Resource';

export default function ResourceControls() {
  const { state, dispatch } = useContext(ResourceContext);
  const { water, oxygen, energy } = state;

  const handleConsumeWater = () => {
    dispatch({
      type: actionTypes.CONSUME_WATER,
      payload: { amount: 10 },
    });
  };

  const handleConsumeWaterAndOxygen = () => {
    dispatch({
      type: actionTypes.CONSUME_WATER_AND_OXYGEN,
      payload: { waterAmount: 5, oxygenAmount: 5 },
    });
  };

  const handleGenerateOxygenConsumeEnergy = () => {
    dispatch({
      type: actionTypes.GENERATE_OXYGEN_AND_CONSUME_ENERGY,
      payload: { oxygenAmount: 8, energyCost: 6 },
    });
  };

  const handleResetResources = () => {
    dispatch({
      type: actionTypes.RESET_RESOURCES,
    });
  };

  return (
    // <Card className="p-6 m-4">
    //   <Typography variant="h4">Estado de Recursos</Typography>
    //   <Resource resourceName="Agua" resourceValue={water} color="bg-blue-500" />
    //   <Resource
    //     resourceName="Oxígeno"
    //     resourceValue={oxygen}
    //     color="bg-green-500"
    //   />
    //   <Resource
    //     resourceName="Energía"
    //     resourceValue={energy}
    //     color="bg-yellow-500"
    //   />

    //   {/* Botones de acciones */}
    //   <div className="flex flex-col gap-2 mt-4">
    //     <Button color="blue" onClick={handleConsumeWater}>
    //       Consumir Agua
    //     </Button>

    //     <Button
    //       color="blue"
    //       variant="outlined"
    //       onClick={handleConsumeWaterAndOxygen}
    //     >
    //       Consumir Agua y Oxígeno
    //     </Button>

    //     <Button color="green" onClick={handleGenerateOxygenConsumeEnergy}>
    //       Generar Oxígeno y Consumir Energía
    //     </Button>

    //     <Button color="red" onClick={handleResetResources}>
    //       Reset Recursos
    //     </Button>
    //   </div>
    // </Card>
    <div className="p-6 m-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl mb-4 text-blue-gray-800 font-bold">
        Estado de Recursos
      </h2>
      <Resource resourceName="Agua" resourceValue={water} color="bg-blue-500" />
      <Resource
        resourceName="Oxígeno"
        resourceValue={oxygen}
        color="bg-green-500"
      />
      <Resource
        resourceName="Energía"
        resourceValue={energy}
        color="bg-yellow-500"
      />

      {/* Botones de acciones */}
      <div className="flex flex-col gap-4 mt-4">
        <button
          className="bg-blue-700 p-2 rounded text-white font-semibold hover:bg-blue-900"
          role="button"
          onClick={handleConsumeWater}
        >
          Consumir Agua
        </button>

        <button
          className="bg-white p-2 border border-blue-700 rounded text-blue-700 font-semibold hover:bg-blue-900 hover:text-white"
          role="button"
          onClick={handleConsumeWaterAndOxygen}
        >
          Consumir Agua y Oxígeno
        </button>

        <button
          className="bg-green-600 p-2 rounded text-white font-semibold hover:bg-green-800"
          role="button"
          onClick={handleGenerateOxygenConsumeEnergy}
        >
          Generar Oxígeno y Consumir Energía
        </button>

        <button
          className="bg-red-500 p-2 rounded text-white font-semibold hover:bg-red-700"
          role="button"
          onClick={handleResetResources}
        >
          Reset Recursos
        </button>
      </div>
    </div>
  );
}
