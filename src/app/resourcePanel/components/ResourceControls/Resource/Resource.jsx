import { Typography } from '@/components/ui';

export default function Resource({ resourceName, resourceValue, color }) {
  const getProgressPercent = (value) => {
    return `${(value / 100) * 100}%`;
  };

  return (
    <div className="mb-4">
      {/* <Typography className="my-2 flex items-center justify-between">
        <span>{resourceName}</span>
        <span>{resourceValue}</span>
      </Typography> */}
      <p className="my-2 flex items-center justify-between text-gray-700">
        <span>{resourceName}</span>
        <span>{resourceValue}</span>
      </p>
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-300`}
          style={{ width: getProgressPercent(resourceValue) }}
          role="progressbar"
        />
      </div>
    </div>
  );
}
