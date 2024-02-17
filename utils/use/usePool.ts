import { SimplePool } from "nostr-tools";

const pool = new SimplePool()

export function usePool(): SimplePool {
    return pool
}
