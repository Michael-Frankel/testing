import { render, screen } from "@testing-library/react"
import { ShoppingList2 } from "./ShoppingList2"

describe('Error handling shoppList2', () => {
    test('error <p> on duplicate', () => {
        const groce = ['kkvk', 'hjdhg', 'kkvk'];

        render(
            <ShoppingList2
                groceries={groce}
                selectItem={() => { }}
            />
        )

        const errorP = screen.getByRole('paragraph');
        expect(errorP).toHaveTextContent(/duplicate/);
    })
})