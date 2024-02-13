import { EmojiSetAlias } from "@/model/emojiSetAlias"
import { SimplePool } from "nostr-tools"
import { useEffect, useState } from "react"
import { getPubKey } from "../getPubKey"
import { getRelays } from "../getRelays"
import { EmojiSet } from "@/model/emojiSet"

export type useFavoriteEmojisResult = {
    data: EmojiSet[] | undefined;
    isLoading: boolean;
    error?: Error;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useFavoriteEmojis = (): useFavoriteEmojisResult => {
    const [data, setData] = useState<EmojiSet[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                // nip-07を待つ
                await delay(1000);
                console.log('hogehoge~')
                const pubkey = await getPubKey();

                const { readableRelays } = await getRelays();

                const pool = new SimplePool()

                const result = await pool.querySync(readableRelays, {
                    authors: [pubkey],
                    kinds: [10030],
                });
                console.dir(result[0]);
                console.dir(result[0].tags);

                const emojiSetRefs = result[0].tags.map((elem) =>
                    EmojiSetAlias.fromATag(elem)
                );
                const emojiSetPromiseList = emojiSetRefs.map((elem) =>
                    elem.fetchEmojiSet(pool, readableRelays)
                );
                const emojiSetList = await Promise.all(emojiSetPromiseList);
                setData(emojiSetList);
                console.log('setData called.')
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
