import { ActionIcon, Flex } from "@mantine/core";
import { CanvasCell } from "./canvasCell";
import { GridModel } from "@/model/grid/grid";
import { Dispatch, SetStateAction } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

type canvasRowProps = {
  grid: GridModel;
  setGrid: Dispatch<SetStateAction<GridModel>>;
  y: number; // 座標
};

export const CanvasRow: React.FC<canvasRowProps> = ({ grid, setGrid, y }) => {
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

type columnDeleteButtonProps = {
  grid: GridModel;
  setGrid: Dispatch<SetStateAction<GridModel>>;
};

export const ColumnDeleteButton: React.FC<columnDeleteButtonProps> = ({
  grid,
  setGrid,
}) => {
  return (
    <Flex ml={36}>
      {Array.from({ length: grid.sizeX }, (_, index) => (
        <ActionIcon
          mx={5}
          mb={8}
          key={index}
          variant="outline"
          onClick={() => {
            setGrid(grid.removeColumn(index));
          }}
        >
          <MdDeleteOutline />
        </ActionIcon>
      ))}
      <ActionIcon
        ml={8}
        onClick={() => {
          setGrid(grid.addColumn(grid.sizeX));
        }}
      >
        <IoMdAddCircle />
      </ActionIcon>
    </Flex>
  );
};
