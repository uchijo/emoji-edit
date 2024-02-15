import { GridModel } from "@/model/grid/grid";
import { Box } from "@mantine/core";
import { CanvasRow } from "./canvasRow";

type props = {
  grid: GridModel;
};

export const CanvasGrid: React.FC<props> = ({ grid }) => {
  return (
    <Box>
      {grid.rows.map((elem, index) => (
        <CanvasRow row={elem} key={index} />
      ))}
    </Box>
  );
};
