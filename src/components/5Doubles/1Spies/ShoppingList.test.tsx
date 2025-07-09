import { render, screen, within } from "@testing-library/react";
import { ShoppingList } from "./ShoppingList";
import userEvent from "@testing-library/user-event";
import * as Utils from "./Utils";

const ingredients = ['Apples', 'Bananas', 'meat'];

describe('shop list test suit', () => {
    it('shop list - local spy', async () => {
        const someFunc = (item: string) => {
            // console.log(`some func selected item ${item}`);
        }

        const someFuncWrapper = {
            function: someFunc
        };
        const someFuncSpyOn = jest.spyOn(someFuncWrapper, 'function')

        render(<ShoppingList
            groceries={ingredients}
            selectItem={someFuncWrapper.function}
        />)

        const user = userEvent.setup();

        const shopList = screen.getByRole('list');
        expect(shopList).toBeInTheDocument();
        const ingridientItems = within(shopList).getAllByRole('listitem');
        expect(ingridientItems).toHaveLength(ingredients.length);
        const firstIngridient = ingridientItems[0];
        await user.click(firstIngridient);
        expect(someFuncSpyOn).toHaveBeenCalledTimes(1);
        expect(someFuncSpyOn).toHaveBeenCalledWith('Apples');
    });

    it('shop list - EXTERNAL UTILS', async () => {
        const selectItemSpyOn = jest.spyOn(Utils, 'onItemSelect');

        render(<ShoppingList
            groceries={ingredients}
            selectItem={Utils.onItemSelect}
        />)
        const user = userEvent.setup();

        const shopList = screen.getByRole('list');
        expect(shopList).toBeInTheDocument();
        const ingItem = within(shopList).getAllByRole('listitem');
        expect(ingItem).toHaveLength(3);
        const secItem = ingItem[2];
        // expect(secItem).toBe(/Bananas/)
        await user.click(secItem);

        expect(selectItemSpyOn).toHaveBeenCalledTimes(1);
        expect(selectItemSpyOn).toHaveBeenCalledWith('meat');
    });

    it('shop list ex with DATE', async () => {

        const selectItemTimeSpyOn = jest.spyOn(Utils, 'onItemSelectWithTime');
        const date = jest.spyOn(Date, 'now')

        render(<ShoppingList
            groceries={ingredients}
            selectItem={Utils.onItemSelectWithTime}
        />)
        const user = userEvent.setup();

        const list = screen.getByRole('list');
        const listItem = within(list).getAllByRole('listitem');
        expect(listItem).toHaveLength(3);
        await user.click(listItem[listItem.length -1]);
        expect(selectItemTimeSpyOn).toHaveBeenCalledWith('meat');
        expect(date).toHaveBeenCalled();
    });

    it('shop list MOCK - easy - just to see it is passed', async() => {
        const selectItemMock = jest.fn();

        render(<ShoppingList
            groceries={ingredients}
            selectItem={selectItemMock}
            />
        );

        const user = userEvent.setup();

        const list = screen.getByRole('list');
        const items = within(list).getAllByRole('listitem');
        expect(list).toBeInTheDocument();
        expect(items).toHaveLength(3);

        await user.click(items[0]);
        expect(selectItemMock).toHaveBeenCalledTimes(1);
        expect(selectItemMock).toHaveBeenCalledWith('Apples');
    })
})