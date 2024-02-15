import React, { Dispatch, SetStateAction } from "react";
import { Text, HoverCard, Box, Center, Image, Button } from "@mantine/core";
import { GridModel } from "@/model/grid/grid";

type props = {
  grid: GridModel;
  x: number;
  y: number;
  setGrid: Dispatch<SetStateAction<GridModel>>;
};

export const CanvasCell: React.FC<props> = ({ grid, x, y, setGrid }) => {
  const cell = grid.cellAt(x, y);
  const focused = grid.currentFocus?.sameFromCoord(x, y) ?? false;

  return (
    <Box
      h="32px"
      w="32px"
      bg={focused ? "cyan" : ""}
      m="3px"
      style={{ border: "solid 1px" }}
      onClick={() => {
        setGrid(grid.setFocus(x, y));
      }}
    >
      <HoverCard closeDelay={0}>
        <HoverCard.Target>
          <Center>
            {cell.hasEmoji ? (
              <Image
                src={cell.currentEmoji?.url}
                alt={`:${cell.currentEmoji?.shortcode ?? ""}:`}
              />
            ) : (
              <Text>e</Text>
            )}
          </Center>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Button
            color="gray"
            onClick={() => {
              setGrid(grid.unsetAt(x, y));
            }}
          >
            空白に戻す
          </Button>
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
};
