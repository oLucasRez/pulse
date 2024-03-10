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

      .avatar {
        font-size: 5rem;
        width: 6rem;
        height: 6rem;
        text-align: center;
        border-radius: 50rem;
        margin: 0 auto;
        cursor: pointer;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        position: relative;
        line-height: 1.3;
      }

      input.name {
        height: 2rem;
      }

      .colors {
        margin-right: -0.5rem;
        margin-bottom: -0.5rem;

        .color {
          width: 2rem;
          height: 2rem;
          border-radius: 50rem;
          margin-left: 0.5rem;
          margin-top: 0.5rem;
          transform: translate(-0.5rem, -0.5rem);
          border-bottom-width: 3px;
          position: relative;

          div {
            background: white;
            border-radius: 50rem;
            width: 1rem;
            height: 1rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    footer {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 1rem;
    }
  }
`;
