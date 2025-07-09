import { render } from "@testing-library/react";
import { ShoppingList1 } from "./ShoppingList1";

describe("Error handling shopping list 1 suit", () => {
    test('throw error on duplicate', () => {
        const groce = ['bamba', 'bisli', 'beifgale', 'beifgale'];

        expect(() => {
            render(
                <ShoppingList1
                    groceries={groce}
                    selectItem={() => { }}
                />
            )
        }).toThrow("Duplicate items found in groceries array")
    })

    test('throw error on duplicate - generic message', () => {
        const groce = ['bamba', 'bisli', 'beifgale', 'beifgale'];
        const regExp = /duplicate/i;

        expect(() => {
            render(
                <ShoppingList1
                    groceries={groce}
                    selectItem={() => { }}
                />
            )
        }).toThrow(regExp)
    })
})