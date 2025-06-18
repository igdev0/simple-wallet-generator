import {jest} from '@jest/globals';
import {mockState} from './store';

const mockUseSelector = jest.fn(() => mockState);
export const mockedDispatch = jest.fn();

const mockUseAppDispatch = jest.fn(() => mockedDispatch);

export const useDispatch = jest.fn(() => mockUseAppDispatch());

(useDispatch as jest.MockedFunction<typeof useDispatch> & {
  withTypes: jest.Mock;
}).withTypes = jest.fn(() => useDispatch);

export const useSelector = jest.fn(() => mockUseSelector());
