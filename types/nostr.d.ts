// This code is Public domain (Creative Commons Zero CC0-1.0)
// https://creativecommons.org/publicdomain/zero/1.0/deed.ja

// from nostr-tools (Public domains)
export type NostrEvent = {
    id?: string;
    kind: number;
    tags: string[][];
    pubkey: string;
    content: string;
    created_at: number;
};

export type SignedNostrEvent = {
    id: string;
    kind: number;
    tags: string[][];
    pubkey: string;
    content: string;
    created_at: number;
    sig: string;
};

type NostrAPI = {
    /** returns a public key as hex */
    getPublicKey(): Promise<string>;
    /** takes an event object, adds `id`, `pubkey` and `sig` and returns it */
    signEvent(event: NostrEvent): Promise<SignedNostrEvent>;

    // Optional

    /** returns a basic map of relay urls to relay policies */
    getRelays?(): Promise<{ [url: string]: { read: boolean; write: boolean } }>;

    /** NIP-04: Encrypted Direct Messages */
    nip04?: {
        /** returns ciphertext and iv as specified in nip-04 */
        encrypt(pubkey: string, plaintext: string): Promise<string>;
        /** takes ciphertext and iv as specified in nip-04 */
        decrypt(pubkey: string, ciphertext: string): Promise<string>;
    };
};

declare global {
    interface Window {
        nostr?: NostrAPI;
    }
}