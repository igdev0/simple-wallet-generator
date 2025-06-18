import {jest} from '@jest/globals';

// export * from "react-redux";
const mockUseSelector = jest.fn();
const mockUseAppDispatch = jest.fn(() => jest.fn());

export const useDispatch = jest.fn(() => mockUseAppDispatch());

(useDispatch as jest.MockedFunction<typeof useDispatch> & {
  withTypes: jest.Mock;
}).withTypes = jest.fn(() => useDispatch);

export const useSelector = jest.fn(() => mockUseSelector());
