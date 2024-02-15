import { GridModel } from "@/model/grid/grid";
import { Button } from "@mantine/core";

type props = {
  grid: GridModel;
};

export const CopyShortCodeButton: React.FC<props> = ({ grid }) => {
  return (
    <Button
      my="sm"
      onClick={() => {
        const sanitized = grid.toSanitizedGrid();
        sanitized?.removeEmptyToRight();
        navigator.clipboard
          .writeText(sanitized?.toShortCode() ?? "")
          .then(() => alert("copied"));
      }}
    >
      shortcodeをコピー
    </Button>
  );
};
