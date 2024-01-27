import styled from 'styled-components';

export const Container = styled.div`
  font-family: monospace;

  > ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > li {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      > span {
        border-radius: 50rem;
        display: inline-flex;
        width: max-content;
        padding: 0.125rem;
        color: white;
      }
    }
  }
`;
