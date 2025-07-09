import { render, screen } from '@testing-library/react';
import { TextEncoder } from 'util';
import { AppWithRoutes } from './AppWithRoutes';
import { MemoryRouter } from 'react-router';

// global.TextEncoder = TextEncoder;

Object.assign(global, { TextEncoder, TextDecoder });


jest.mock('./Routes/Home',()=> ({
    home: () => <div data-testid="HomeMock">Hello HomeTest</div>
}))


describe('appRoutes test suit', () => {
    it('should always load the navbar', () => {
        render(
            <AppWithRoutes />
        );
        const NavBar = screen.getByTestId('NavBar')
        expect(NavBar).toBeInTheDocument();
    })
});