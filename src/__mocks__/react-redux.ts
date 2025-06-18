const mockUseSelector = jest.fn();
const mockUseAppDispatch = jest.fn();
export * from "react-redux";

export const useDispatch = () => mockUseAppDispatch();
export const useSelector = (selector: any) => mockUseSelector(selector);