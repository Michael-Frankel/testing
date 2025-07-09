import { render, screen, within } from "@testing-library/react"
import { SimplePost } from "./SimplePost"


console.log('🧪 Running SimplePost.test.tsx');


describe('SimplePost test suit', () => {
    it('should be rendered in doc - no likes', () => {
        const userName = "mike";
        const content = 'Some content'
        // const likeArray = ["kdjd", "jfvcd"];

        render(<SimplePost
            user={userName}
            content={content}
        // likesBy={likeArray}
        />)
        // screen.debug();

        const postContainer = screen.getByTestId('post-container');
        expect(postContainer).toBeInTheDocument();

        const header = screen.getByRole('heading');
        expect(header).toHaveTextContent(userName);

        const paragraph = screen.getByRole('paragraph');
        expect(paragraph).toHaveTextContent(content);

        const likeList = screen.queryByRole('list');
        expect(likeList).not.toBeInTheDocument();
    });

    it('🌶️ should be rendered in doc - likes', () => {
        const userName = "mike";
        const content = 'Some content'
        const likeArray = ["kdj", "hsdsd"]
        // const likeArray = ["kdjd", "jfvcd"];

        render(<SimplePost
            user={userName}
            content={content}
            likesBy={likeArray}
        />)
        // screen.debug();

        const container = screen.getByTestId('likes-container');
        expect(container).toBeInTheDocument();

        // expect(within(container).getAllByRole('listitem'))
        const listItem = within(container).getAllByRole('listitem');
        expect(listItem).toHaveLength(2);
        expect(listItem[1]).toHaveTextContent(likeArray[1]);
        expect(listItem[1]).toHaveTextContent('hsdsd');

    });

});



