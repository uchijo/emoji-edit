import { GridCellModel } from "@/model/grid/gridCell";
import { GridRowModel } from "@/model/grid/gridRow";
import { Flex, Group } from "@mantine/core";
import { CanvasCell } from "./canvasCell";

type props = {
  row: GridRowModel;
};

export const CanvasRow: React.FC<props> = ({ row }) => {
  return (
    <Flex>
      {row.cells.map((elem, index) => (
        <CanvasCell cell={elem} key={index} />
      ))}
    </Flex>
  );
};
