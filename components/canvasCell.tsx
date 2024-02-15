import React from "react";
import { Stack, Text, Card, HoverCard, Box, Center } from "@mantine/core";

type props = {
  onClick: () => void;
  onDelete: () => void;
  onSelect: () => void;
};

export const CanvasCell: React.FC<props> = ({
  onClick,
  onDelete,
  onSelect,
}) => {
  return (
    <Box h="32px" w="32px" bg="cyan" m="3px">
      <HoverCard>
        <HoverCard.Target>
          <Center>
            <Text>hi</Text>
          </Center>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>hi there</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
};
