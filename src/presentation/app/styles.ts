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
        min-width: 1rem;
        height: 1rem;
        border-radius: 50rem;
        display: inline-flex;
        width: max-content;
        color: white;
      }

      > input {
        border-radius: 0.25rem;
      }
    }
  }
`;
