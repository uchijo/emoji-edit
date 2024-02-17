import { ActionIcon, Flex } from "@mantine/core";
import { CanvasCell } from "./canvasCell";
import { GridModel } from "@/model/grid/grid";
import { Dispatch, SetStateAction } from "react";
import { MdDeleteOutline } from "react-icons/md";

type props = {
  grid: GridModel;
  setGrid: Dispatch<SetStateAction<GridModel>>;
  y: number; // 座標
};

export const CanvasRow: React.FC<props> = ({
  grid,
  setGrid,
  y,
}) => {
  const row = grid.rowAt(y);
  return (
    <Flex align="center">
      <ActionIcon
        mr={8}
        variant="outline"
        onClick={() => {
          setGrid(grid.removeRow(y));
        }}
      >
        <MdDeleteOutline />
      </ActionIcon>
      {row.cells.map((_, index) => (
        <CanvasCell grid={grid} x={index} y={y} setGrid={setGrid} key={index} />
      ))}
    </Flex>
  );
};
