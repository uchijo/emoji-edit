import { EmojiSetAlias } from "@/model/emoji/emojiSetAlias"
import { useEffect, useState } from "react"
import { getPubKey } from "../getPubKey"
import { EmojiSet } from "@/model/emoji/emojiSet"
import { usePool } from "./usePool"
import { delay } from "../delay"
import { getRelays } from "./useRelays"
import { Emoji } from "@/model/emoji/emoji"

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

                // aタグではなくemojiタグが入っていた場合に拾う用
                const emojiTags: Emoji[] = []
                const emojiSetRefs = result.tags.map((elem) => {
                    if (elem[0] == "a") {
                        return EmojiSetAlias.fromATag(elem)
                    }
                    if (elem[0] == "emoji") {
                        const emoji = Emoji.fromEmojiTag(elem)
                        emojiTags.push(emoji)
                    }
                    return undefined
                }).filter((elem): elem is EmojiSetAlias => elem !== undefined);
                const emojiSetPromiseList = emojiSetRefs.map((elem) =>
                    elem.fetchEmojiSet(pool, readableRelays)
                );

                const emojiSetList = await Promise.all(emojiSetPromiseList);

                // 生のemojiタグを集めたものをEmojiSetとして登録
                emojiSetList.push(new EmojiSet(emojiTags, 'thisEmojiSetDoesNotHaveAuthor', 'raw emoji tags'))
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
