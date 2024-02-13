import { EmojiSet } from "./emojiSet";
import { SimplePool } from "nostr-tools";

export class EmojiSetAlias {
    constructor(kind: number, author: string, identifier: string) {
        this.kind = kind;
        this.author = author;
        this.identifier = identifier;
    }
    kind: number;
    author: string;
    // represents d tag name
    identifier: string;
    savedRelayUrl?: string;

    static fromATag(tag: string[]) {
        const isLengthOk = (tag.length === 2 || tag.length === 3)
        if (!isLengthOk) {
            throw Error(`expected tag length is 2 or 3, but got ${tag.length}`)
        }
        if (tag[0] !== "a") {
            throw Error(`expected a tag, but got ${tag[0]} tag`)
        }

        const splitted = tag[1].split(":");
        const kind = parseInt(splitted[0]);
        // fixme: emojiのやつに対応
        if (kind != 30030) {
            throw Error("only kind 30030 is supported for now")
        }
        const author = splitted[1];
        const dTagName = splitted[2];
        const relayUrl = (tag.length === 3) ? tag[2] : undefined;

        const emojiSetAlias = new EmojiSetAlias(kind, author, dTagName);
        emojiSetAlias.savedRelayUrl = relayUrl;

        return emojiSetAlias;
    }

    async fetchEmojiSet(pool: SimplePool, defaultRelays: string[]): Promise<EmojiSet> {
        const relays = this.savedRelayUrl !== undefined ? [this.savedRelayUrl!] : defaultRelays;
        const emojiSetEvents = await pool.querySync(relays, { kinds: [this.kind], authors: [this.author] })
        const targetEvent = emojiSetEvents.find((elem) => {
            const dTag = elem.tags.find((tag) => tag[0] == "d");
            if (!dTag) {
                return false;
            }
            return dTag[1] == this.identifier
        })
        if (!targetEvent) {
            throw Error(`queried for ${this.identifier}, but could not find one`)
        }
        return EmojiSet.from30030(targetEvent)
    }
}