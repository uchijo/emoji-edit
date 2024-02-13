import { Event } from "nostr-tools"
import { Emoji } from "./emoji"

export class EmojiSet {
    constructor(emojiList: Emoji[], author: string, identifier: string) {
        this.emojiList = emojiList
        this.author = author
        this.identifier = identifier
    }
    emojiList: Emoji[];
    author: string;
    identifier: string;
    title?: string;

    static from30030(event: Event) {
        if (event.kind !== 30030) {
            throw Error(`expecting 30030 event, not ${event.kind}`)
        }

        const possibleIdentifierList = event.tags.filter((elem) => {
            if (elem.length <= 1) {
                return false
            }
            return elem[0] === 'd';
        })
        if (possibleIdentifierList.length < 1) {
            throw Error(`identifier not found.`)
        }
        const identifier = possibleIdentifierList[0][1]

        const possibleTitleList = event.tags.filter((elem) => {
            if (elem.length <= 1) {
                return false
            }
            return elem[0] === 'title';
        })
        const title = (possibleTitleList.length >= 1) ? possibleIdentifierList[0][1] : undefined;

        const emojiTags = event.tags.filter((elem) => {
            if (elem.length <= 2) {
                return false
            }
            return elem[0] === 'emoji';
        })
        const emojiList = emojiTags.map((elem) => {
            return Emoji.fromEmojiTag(elem, identifier)
        })

        const emojiSet = new EmojiSet(emojiList, event.pubkey, identifier)
        emojiSet.title = title
        return emojiSet
    }
}
