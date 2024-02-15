import React from "react";
import {
  Stack,
  Text,
  Card,
  HoverCard,
  Box,
  Center,
  Image,
} from "@mantine/core";
import { GridCellModel } from "@/model/grid/gridCell";

type props = {
  cell: GridCellModel;
};

export const CanvasCell: React.FC<props> = ({ cell }) => {
  return (
    <Box h="32px" w="32px" bg="cyan" m="3px">
      <HoverCard>
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
          <Text>hi there</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
};
