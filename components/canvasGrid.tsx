import { GridModel } from "@/model/grid/grid";
import { ActionIcon, Box } from "@mantine/core";
import { CanvasRow, ColumnDeleteButton } from "./canvasRow";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdAddCircle } from "react-icons/io";

type props = {
  grid: GridModel;
  setGrid: Dispatch<SetStateAction<GridModel>>;
};

export const CanvasGrid: React.FC<props> = ({ grid, setGrid }) => {
  return (
    <Box>
      <ColumnDeleteButton grid={grid} setGrid={setGrid} />
      {grid.rows.map((_, index) => (
        <CanvasRow grid={grid} y={index} setGrid={setGrid} key={index} />
      ))}
      <ActionIcon
        mt={8}
        onClick={() => {
          setGrid(grid.addRow(grid.sizeY));
        }}
      >
        <IoMdAddCircle />
      </ActionIcon>
    </Box>
  );
};
