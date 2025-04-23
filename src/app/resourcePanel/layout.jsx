// import { Typography } from '@/components/ui';
import { ResourceProvider } from '@/context/resourceContext/resourceContext';

export default function ResourceLayout({ children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
        {/* <Typography className="text-2xl font-bold">Recursos</Typography> */}
        <h1 className="text-4xl font-bold">Recursos</h1>
        <div className="flex gap-2">
          <ResourceProvider>{children}</ResourceProvider>
        </div>
      </div>
    </div>
  );
}
