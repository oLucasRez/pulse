import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  p.invite {
    font-size: 0.875rem;
    opacity: 0.75;
  }

  .players {
    display: flex;
    gap: 1.5rem;

    .loading {
      font-size: xx-large;
    }

    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      gap: 0.5rem;

      .avatar {
        font-size: 5rem;
        width: 6rem;
        height: 6rem;
        text-align: center;
        border-radius: 50rem;
      }

      .me {
        font-weight: 600;
      }
    }
  }

  button.start {
    font-size: 1.5rem;
  }
`;
