export class Emoji {
    constructor(shortcode: string, url: string) {
        this.shortcode = shortcode
        this.url = url
    }
    shortcode: string;
    url: string;
    containedSetId?: string;

    static fromEmojiTag(tag: string[], containedSetId?: string) {
        if (tag.length < 3) {
            throw Error("invalid emoji tag length")
        }
        const emoji = new Emoji(tag[1], tag[2])
        emoji.containedSetId = containedSetId
        return emoji
    }
}
