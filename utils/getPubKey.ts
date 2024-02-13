export async function getPubKey(): Promise<string> {
    if (!window.nostr) {
        throw Error("nip-07 is not installed.");
    }
    const pubkey = await window.nostr?.getPublicKey();
    if (!pubkey) {
        throw Error("pubkey was undefined.")
    }
    return pubkey;
}

