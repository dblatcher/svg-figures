import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FunnyFaceLibProps {}

const StyledFunnyFaceLib = styled.div`
  color: blue;
`;

export function FunnyFaceLib(props: FunnyFaceLibProps) {
  return (
    <StyledFunnyFaceLib>
      <h1>Welcome to FunnyFaceLib!</h1>
    </StyledFunnyFaceLib>
  );
}

export default FunnyFaceLib;
