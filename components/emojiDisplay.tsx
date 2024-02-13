import { Emoji } from "@/model/emoji";
import { Card } from "@mantine/core";
import React from "react";
import {Image} from "@mantine/core";

type props = {
  emoji: Emoji;
};

export const EmojiDisplay: React.FC<props> = ({ emoji }) => {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Image src={emoji.url} alt={emoji.shortcode} height={20} />
    </Card>
  );
};
