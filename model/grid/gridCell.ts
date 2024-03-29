import { Emoji } from "../emoji/emoji";

export class GridCellModel {
    // 絵文字がない場合はundefined
    currentEmoji?: Emoji

    get hasEmoji(): boolean {
        return this.currentEmoji !== undefined
    }

    setEmoji(emoji: Emoji) {
        this.currentEmoji = emoji
    }

    unsetEmoji() {
        this.currentEmoji = undefined
    }

    toShortCode(): string {
        return `:${this.currentEmoji?.shortcode ?? "empty"}:`
    }

    extractTagWithoutDuplicate(seenAlready: Set<String>): string[] | undefined {
        const shortcode = this.toShortCode()
        if (seenAlready.has(shortcode)) {
            return undefined
        }
        return this.currentEmoji?.toTag()
    }
}