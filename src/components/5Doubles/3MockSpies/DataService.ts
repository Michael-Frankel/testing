import type { CommentType } from "./Model";

export async function getCommentsForPost(id: string): Promise<CommentType[]> {
    console.log(`getting comments for post ${id}`)
    const comments: CommentType[] = []
    comments.push({
        content: 'This is awesome!',
    })
    comments.push({
        content: 'Nice car!',
    })
    return comments;
}