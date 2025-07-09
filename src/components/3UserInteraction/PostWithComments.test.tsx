import { render, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { PostWithComment } from "./PostWithComments";
import { screen } from "@testing-library/react";

console.log("🍊 Post");

describe('Post With Comments test suit', () => {
    describe('User Interactions', () => {
        beforeEach(() => {
            render(
                <PostWithComment
                    user={"MIKE"}
                    content={"kcfjfhfg"}
                />
            )
        });

        test('User can comment', async () => {
            const user = userEvent.setup();
            const commInput = screen.getByTestId('comment-input');
            const commContent = 'Miki the Kiki';
            await user.type(commInput, commContent);
            expect(commInput).toHaveValue(commContent);
        })

        test('User click comment and clears text-area', async () => {
            const user = userEvent.setup();
            const commContainer = screen.getByTestId('comment-container');
            const commInput = screen.getByTestId('comment-input');
            const btn = within(commContainer).getByRole('button');
            await user.click(btn);
            // expect(commInput).toHaveValue('');
            expect(commInput).toBeEmptyDOMElement();
        })

        test('User adds comment in the screen', async () => {
            const user = userEvent.setup();
            const commInput = screen.getByTestId('comment-input');
            const commContent = 'Miki the Kiki';
            await user.type(commInput, commContent);

            // const commPost = screen.getByTestId('post-comment-container');
            // const postParagraph = within(commPost).getAllByRole('paragraph');
            // expect(commInput).toHaveValue('');
            // expect(postParagraph).toBe(1);

            const btn = screen.getByRole('button');
            await user.click(btn);

            expect(screen.getByText(commContent)).toBeInTheDocument();
        })

        //this is the same thing as previous one
        //just to show that the paragraph is created only after the user click the
        test('Comment is added on screen', async () => {
            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentContent = 'You are awesome!'
            await user.type(commentInput, commentContent);

            const commentButton = screen.getByRole('button')
            await user.click(commentButton)

            const commentsContainer = screen.getByTestId('post-comment-container')
            const comments = within(commentsContainer).getAllByRole('paragraph')
            expect(comments.length).toBe(1)
            expect(comments[0]).toHaveTextContent(commentContent)
        })

        test('Multi Comments are added on screen', async () => {
            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentContent = 'You are awesome!'
            const secondContent = 'kiki bar kiki';
            await user.type(commentInput, commentContent);

            const commentButton = screen.getByRole('button')
            await user.click(commentButton);

            await user.type(commentInput, secondContent);
            await user.click(commentButton);

            const commentsContainer = screen.getByTestId('post-comment-container')
            const comments = within(commentsContainer).getAllByRole('paragraph')
            expect(comments.length).toBe(2)
            expect(comments[1]).toHaveTextContent(secondContent);
        })
    })
})


describe('JAM With Comments test suit', () => {
  describe('User Interactions', () => {
    test('Multiple comments are added on screen', async () => {
      // 1. Render the component
      render(<PostWithComment content="This is a test post" user="TestUser" />);

      // 2. Setup userEvent
      const user = userEvent.setup();

      // 3. Get necessary elements once
      const commentInput = screen.getByTestId('comment-input');
      const commentButton = screen.getByRole('button', { name: /comment/i }); // More robust selector
      const commentsContainer = screen.getByTestId('post-comment-container');

      // 4. Define your test comments in an array
      const testComments = [
        'You are awesome!',
        'kiki bar kiki',
        'Another great comment!', // You can easily add more here
      ];

      // 5. Iterate and perform actions
      for (const commentText of testComments) {
        await user.type(commentInput, commentText);
        await user.click(commentButton);
        // Optional: Assert input clears after each submission
        expect(commentInput).toHaveValue('');
      }

      // 6. Assertions after all comments are added
      const paragraphs = within(commentsContainer).getAllByRole('paragraph');

      // Expect the total number of comments to match the array length
      expect(paragraphs.length).toBe(testComments.length);

      // Verify each comment's content and order
      testComments.forEach((commentText, index) => {
        expect(paragraphs[index]).toHaveTextContent(commentText);
      });

      // You can still assert specific comments if needed, e.g., the last one
      expect(paragraphs[testComments.length - 1]).toHaveTextContent(testComments[testComments.length - 1]);
    });
  });
});