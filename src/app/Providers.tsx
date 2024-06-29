import { FC, ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({
  children,
}: ProvidersProps): JSX.Element => (
  <>
    <Toaster position="top-center" richColors />
    {children}
  </>
);

export default Providers;
