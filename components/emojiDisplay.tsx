import { Emoji } from "@/model/emoji";
import { Stack, Text, Card, HoverCard } from "@mantine/core";
import React from "react";
import { Image } from "@mantine/core";

type props = {
  emoji: Emoji;
  onClick?: () => void;
};

export const EmojiDisplay: React.FC<props> = ({ emoji, onClick }) => {
  return (
    <div onClick={onClick}>
      <HoverCard closeDelay={0}>
        <HoverCard.Target>
          <Card shadow="sm" padding="sm" radius="md" withBorder>
            <Image src={emoji.url} alt={emoji.shortcode} height={20} />
          </Card>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack align="center">
            <Image src={emoji.url} alt={emoji.shortcode} height={30} />
            <Text>:{emoji.shortcode}:</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};
