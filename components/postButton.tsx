import { GridModel } from "@/model/grid/grid";
import { getPubKey } from "@/utils/getPubKey";
import { usePool } from "@/utils/use/usePool";
import { getRelays } from "@/utils/use/useRelays";
import { Button } from "@mantine/core";

type props = {
  grid: GridModel;
};

export const PostButton: React.FC<props> = ({ grid }) => {
  const sanitized = grid.toSanitizedGrid();
  const pool = usePool();
  if (!sanitized) {
    return <></>;
  }
  sanitized.removeEmptyToRight();

  return (
    <Button
      my={10}
      onClick={async () => {
        const pubkey = await getPubKey();
        const relays = await getRelays(pool);
        const toBeSigned = {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: sanitized.toTags(),
          content: sanitized.toShortCode(),
          pubkey: pubkey,
        };
        const signed = await window.nostr?.signEvent(toBeSigned);
        if (!signed) {
          return;
        }
        pool.publish(relays.writableRelays, signed);
      }}
    >
      kind1で投稿する
    </Button>
  );
};
