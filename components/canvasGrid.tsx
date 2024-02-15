import { GridModel } from "@/model/grid/grid";
import { Box } from "@mantine/core";
import { CanvasRow } from "./canvasRow";
import { Dispatch, SetStateAction } from "react";

type props = {
  grid: GridModel;
  setGrid: Dispatch<SetStateAction<GridModel>>;
};

export const CanvasGrid: React.FC<props> = ({ grid, setGrid }) => {
  return (
    <Box>
      {grid.rows.map((_, index) => (
        <CanvasRow grid={grid} y={index} setGrid={setGrid} key={index} />
      ))}
    </Box>
  );
};
