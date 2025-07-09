import axios from "axios";
import type { CommentType } from "./Model";

export const APP_URL = 'http://localhost:4000'

export async function getCommentsForPostWithAxios(id: string): Promise<CommentType[]> {

    const response = await axios.get<CommentType[]>(`${APP_URL}/comments/` + id ,{
        params: {
            id: id
        }
    })
    return response.data
}