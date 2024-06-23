import { FC } from "react";
import StudioMain from "./components/studioMain";

export const revalidate = 60;

const StudioPage: FC = () => {
  return (
    <StudioMain />
  )
}

export default StudioPage
