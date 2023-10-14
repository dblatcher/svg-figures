import { render } from '@testing-library/react';

import FunnyFaceLib2 from './funny-face-lib-2';

describe('FunnyFaceLib2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FunnyFaceLib2 />);
    expect(baseElement).toBeTruthy();
  });
});
