import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;

  > li {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    > .avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    > p {
      font-size: 0.75rem;
      line-height: 1;
      font-weight: 400;
      font-style: italic;
      color: darkgray;

      > em {
        font-size: 1rem;
        font-weight: 500;
        font-style: normal;
        opacity: 1;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;

        > .icon {
          font-size: 0.75rem;
        }
      }
    }
  }
`;
