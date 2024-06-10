import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.background.normal};

  > .PulseLogo {
    margin-top: 2rem;
    transform: scale(0.7);
  }
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.foreground.normal};
  margin-bottom: 1rem;
`;
