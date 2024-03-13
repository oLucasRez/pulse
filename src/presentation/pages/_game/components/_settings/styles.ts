import styled from 'styled-components';

export const Container = styled.aside`
  border-right: 1px solid lightgray;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  background: white;

  > h2 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
    flex: 1;

    > div.maxPlayers {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      > input {
        flex: 1;
      }
    }

    > input#withLightSpot {
      width: 1.5rem;
    }

    > div.dicesMode {
      display: flex;
      gap: 0.5rem;

      > input {
        width: 1.5rem;
      }
    }

    > button[type='submit'] {
      margin-top: auto;
    }
  }
`;
