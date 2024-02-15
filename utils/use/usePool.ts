import { SimplePool } from "nostr-tools";
import { useState } from "react";

export function usePool(): SimplePool {
    const [pool] = useState(new SimplePool());
    return pool
}
