import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  background-color: #0004;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    max-width: 20rem;

    header {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
      }
    }

    main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    footer {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 1rem;
    }
  }
`;
