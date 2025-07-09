import { renderHook, act } from "@testing-library/react"
import { useArray } from "./UseArray"


describe('UseArray test suits', () => {
    describe('UseArray with numbers', () => {
        it('UseArray initial value', () => {
            const initialValue = [1, 2, 3, 4, 5, 6]
            const renderRes = renderHook(() => useArray(initialValue));
            expect(renderRes.result.current.array).toEqual(initialValue);
        });

        it('Push method', () => {
            const initialValue = [1, 2, 3, 4, 5, 6]
            const renderRes = renderHook(() => useArray(initialValue));
            const current = renderRes.result.current;//not a good practice, since the ref is stale
            act(() => {
                renderRes.result.current.push(9);
            })
            expect(renderRes.result.current.array).toHaveLength(7);
            expect(renderRes.result.current.array).toEqual([...initialValue, 9]);
            expect(renderRes.result.current.array[current.array.length]).toEqual(9);
        });

        it('Update method', () => {
            const initialValue = [1, 2, 3, 4, 5, 6]
            const renderRes = renderHook(() => useArray(initialValue));
            act(() => {
                renderRes.result.current.update(0, 9);
            })
            expect(renderRes.result.current.array[0]).toEqual(9);
        });

        it('Remove method', () => {
            const initialValue = [1, 2, 3, 4, 5, 6]
            const { result } = renderHook(() => useArray(initialValue));
            act(() => {
                result.current.remove(0)
            })
            expect(result.current.array).not.toContain(1);
        });

        it('Filter method', () => {
            const initialValue = [1, 2, 3, 4, 5, 6]
            const { result } = renderHook(() => useArray(initialValue));
            act(() => {
                result.current.filter(item => item < 6)
            })
            expect(result.current.array).toEqual([1, 2, 3, 4, 5]);
            expect(result.current.array).toEqual(initialValue?.slice(0, result.current.array.length));
        });
    })
    it.todo('should remove elements of array - elements that do not start with UpperCase');


    describe('UseArray with strings', () => {
        it('homework', () => {
                    const initialArray = ['A', 'B', 'apple', 'Map']
        const { result } = renderHook(() => useArray(initialArray));
        act(() => {
            result.current.filter(str => /^[A-Z]/.test(str));
        })
        expect(result.current.array).toEqual(['A', 'B', 'Map'])

        })

        
    })

})