import { useEffect, useState } from "react";
import { usePool } from "./usePool";
import { japaneseRelays, popularRelays } from "../const";
import { delay } from "../delay";
import { SimplePool } from "nostr-tools";

type getRelaysResult = {
    readableRelays: string[];
    writableRelays: string[];
}

type UseRelaysResult = {
    isLoading: boolean;
    relays?: getRelaysResult;
}

export const getRelays = async (pool: SimplePool): Promise<getRelaysResult> => {
    const readableRelays: string[] = [];
    const writableRelays: string[] = [];
    const pubkey = await window.nostr?.getPublicKey();

    // 何もなかった場合
    if (!pubkey) {
        const defaultRelays = [...japaneseRelays, ...popularRelays];
        return { readableRelays: defaultRelays, writableRelays: defaultRelays };
    }

    // nip-07からリレーを取れる場合
    if (window.nostr?.getRelays) {
        const result = await window.nostr?.getRelays();
        for (let relayName in result) {
            if (result[relayName].read) {
                readableRelays.push(relayName);
            }
            if (result[relayName].write) {
                writableRelays.push(relayName);
            }
        }
        return { readableRelays, writableRelays };
    }

    // kind 10002経由
    const fetchResult = await pool.get([...popularRelays, ...japaneseRelays], {
        authors: [pubkey],
        kinds: [10002],
        limit: 1,
    });
    if (fetchResult) {
        for (let tag of fetchResult.tags) {
            switch (tag.length) {
                case 2:
                    readableRelays.push(tag[2]);
                    writableRelays.push(tag[2]);
                    break;
                case 3:
                    if (tag[2].toLowerCase() === "write") {
                        writableRelays.push(tag[2])
                    }
                    if (tag[2].toLowerCase() === "read") {
                        readableRelays.push(tag[2])
                    }

                default:
                    // do nothing
                    break;
            }
        }
        return { readableRelays, writableRelays };
    }

    // 上のどれにも該当しない場合
    const defaultRelays = [...japaneseRelays, ...popularRelays];
    return { readableRelays: defaultRelays, writableRelays: defaultRelays };
}

export const useRelays = (): UseRelaysResult => {
    const [isLoading, setIsLoading] = useState(true)
    const [relays, setRelays] = useState<getRelaysResult | undefined>(undefined)

    const pool = usePool();

    useEffect(() => {
        (async () => {
            await delay(100);
            const result = await getRelays(pool);
            setRelays({ readableRelays: result.readableRelays, writableRelays: result.writableRelays });
            setIsLoading(false);
            return;
        })()
    }, [])

    return { isLoading, relays }
}