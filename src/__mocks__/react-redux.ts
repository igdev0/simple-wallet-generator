const mockUseSelector = jest.fn();
const mockUseAppDispatch = jest.fn();

const reactRedux = {
  useSelector: (selector: any) => mockUseSelector(selector), // Mock and capture selector calls
  useDispatch: () => mockUseAppDispatch(),
};

export default reactRedux;