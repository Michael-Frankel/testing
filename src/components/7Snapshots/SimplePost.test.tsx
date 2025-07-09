import { SimplePost } from './SimplePost'
import { render } from '@testing-library/react'

describe('Simple post snapshot tests', () => {
    it('initial test', () => {
        const rendered = render(
            <SimplePost
                content='Simple content'
                user='Alexei'
            />
        );
        expect(rendered.asFragment()).toMatchSnapshot();
    })
})