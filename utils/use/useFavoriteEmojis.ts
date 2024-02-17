import { EmojiSetAlias } from "@/model/emoji/emojiSetAlias"
import { useEffect, useState } from "react"
import { getPubKey } from "../getPubKey"
import { EmojiSet } from "@/model/emoji/emojiSet"
import { usePool } from "./usePool"
import { delay } from "../delay"
import { getRelays } from "./useRelays"

export type useFavoriteEmojisResult = {
    data: EmojiSet[] | undefined;
    isLoading: boolean;
    error?: Error;
}

export const useFavoriteEmojis = (): useFavoriteEmojisResult => {
    const [data, setData] = useState<EmojiSet[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(undefined);
    const pool = usePool();

    useEffect(() => {
        (async () => {
            try {
                // nip-07を待つ
                await delay(1000);
                const pubkey = await getPubKey();

                const { readableRelays } = await getRelays(pool);

                const result = await pool.get(readableRelays, {
                    authors: [pubkey],
                    kinds: [10030],
                })

                if (!result) {
                    throw Error("failed to fetch 10030 event")
                }

                const emojiSetRefs = result.tags.map((elem) =>
                    EmojiSetAlias.fromATag(elem)
                );
                const emojiSetPromiseList = emojiSetRefs.map((elem) =>
                    elem.fetchEmojiSet(pool, readableRelays)
                );
                const emojiSetList = await Promise.all(emojiSetPromiseList);
                setData(emojiSetList);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e)
                } else {
                    setError(Error("unknown error"))
                }
                console.log(`error: ${e}`)
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { data, isLoading, error }
}
