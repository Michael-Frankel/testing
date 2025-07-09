import { act, render, screen, within } from "@testing-library/react";
import { Post } from "./Post";
import * as DataService from './DataService';

describe('Post test suit with mocks', () => {
    it("should load initial comments", async () => {

        const getCommentsForPostSpyOn = jest.spyOn(DataService, 'getCommentsForPost');
        getCommentsForPostSpyOn.mockResolvedValueOnce([{//very strong to see logic and what's returned
            content: 'cool1'
        },
        {
            content: 'cool2'
        }]);

        console.log("should load initial comments");
        await act(async () => {//because i have api in use effect or useQuery
            render(
                <Post
                    content="The moon is bright"
                    id="456"
                    user="Mike"
                />
            )

        })

        const container = screen.getByTestId('post-comment-container');
        const ps = within(container).getAllByRole('paragraph');
        expect(ps.length).toBe(2);
        expect(ps[1]).toHaveTextContent('cool2');

        expect(getCommentsForPostSpyOn).toHaveBeenCalledTimes(1);
        expect(getCommentsForPostSpyOn).toHaveBeenLastCalledWith('456');

    })
})