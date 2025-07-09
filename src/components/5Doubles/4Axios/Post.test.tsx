import { Post } from "./Post"
import { render, screen, within, act } from "@testing-library/react"
import axios from 'axios'
import type { CommentType } from "./Model";
import { APP_URL } from "./DataService";

describe('Post tests with mocks', () => {
    const someUserName = 'Alex';
    const someContent = 'Some content'
    const someId = '123'
    const someComments: CommentType[] = [
        {
            content: 'Cool!'
        },
        {
            content: 'Yes!'
        }
    ]

    it('should load received comments', async () => {
        const axiosSpyOn = jest.spyOn(axios, 'get');
        axiosSpyOn.mockResolvedValueOnce({
            data: someComments
        })

        await act(async () => {
            render(<Post
                user={someUserName}
                content={someContent}
                id={someId}
            ></Post>)
        })

        const commentsContainer = screen.getByTestId('post-comment-container')
        const comments = within(commentsContainer).getAllByRole('paragraph')
        expect(comments.length).toBe(2)
        expect(comments[0]).toHaveTextContent('Cool')
        expect(comments[1]).toHaveTextContent(someComments[1].content)
    })

    it('should call service to load comments', async () => {
        const getAxiosSpyOn = jest.spyOn(axios, 'get');
        getAxiosSpyOn.mockResolvedValueOnce({
            data: someComments
        })

        await act(async () => {
            render(
                <Post
                    user={someUserName}
                    content={someContent}
                    id={someId}
                />
            )
        })

        expect(getAxiosSpyOn).toHaveBeenCalledTimes(1);
        const args = getAxiosSpyOn.mock.calls;
        console.log(args);
        const urlArg = getAxiosSpyOn.mock.calls[0][0];
        expect(urlArg.endsWith(someId)).toBe(true);
        expect(urlArg.startsWith(APP_URL)).toBe(true);

        const idParamArg = getAxiosSpyOn.mock.calls[0][1]?.params?.id;
        expect(idParamArg).toBe('123');


    })

    it('Network call throws error', async () => {
        const axiosGetSpyOn = jest.spyOn(axios, 'get');
        axiosGetSpyOn.mockRejectedValueOnce(new Error('BE error'))

        await act(async () => {
            render(
                <Post
                    user={someUserName}
                    content={someContent}
                    id={someId}
                />
            )
        });

        const errorLabel = screen.getByTestId('error-label');
        expect(errorLabel).not.toBeEmptyDOMElement();



    })
})