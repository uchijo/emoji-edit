import { GridModel } from "@/model/grid/grid";
import { getPubKey } from "@/utils/getPubKey";
import { getRelays } from "@/utils/getRelays";
import { Button } from "@mantine/core";
import { SimplePool } from "nostr-tools";

type props = {
  grid: GridModel;
  pool: SimplePool;
};

export const PostButton: React.FC<props> = ({ grid, pool }) => {
  const sanitized = grid.toSanitizedGrid();
  if (!sanitized) {
    return <></>;
  }
  sanitized.removeEmptyToRight();

  return (
    <Button
      my={10}
      // onClick={async () => {
      //   const pubkey = await getPubKey();
      //   const relays = await getRelays();
      //   const toBeSigned = {
      //     kind: 1,
      //     created_at: Math.floor(Date.now() / 1000),
      //     tags: sanitized.toTags(),
      //     content: sanitized.toShortCode(),
      //   };
      //   const signed = await window.nostr?.signEvent(toBeSigned);
      //   if (!signed) {
      //     return;
      //   }
      //   pool.publish(relays.writableRelays, signed);
      // }}
    >
      kind1で投稿する
    </Button>
  );
};
