export type getRelaysResult = {
    readableRelays: string[];
    writableRelays: string[];
}

export async function getRelays(): Promise<getRelaysResult> {
    if (!window.nostr?.getRelays) {
        throw Error("relays are not set in nip-07 extension");
    }
    const relays = await window.nostr!.getRelays!();
    const readableRelays: string[] = [];
    const writableRelays: string[] = [];
    for (let relayName in relays) {
        if (relays[relayName].read) {
            readableRelays.push(relayName);
        }
        if (relays[relayName].write) {
            writableRelays.push(relayName);
        }
    }
    return { readableRelays, writableRelays }
}