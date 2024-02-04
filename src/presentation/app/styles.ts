import styled from 'styled-components';

const headerHeight = '3.5rem';

export const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #778;
  font-weight: 500;
  min-height: 100vh;

  b {
    font-weight: 600;
  }

  button {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    border: none;
    border-bottom: 2px solid lightgray;
    color: #667;
    cursor: pointer;

    :hover {
      filter: brightness(0.95);
      transition: 0.1s;
    }

    :disabled {
      pointer-events: none;
      cursor: default;
      filter: grayscale(1);
    }
  }

  .emoji {
    font-size: 0.75em;
    vertical-align: middle;
  }

  header {
    left: 0;
    top: 0;
    right: 0;
    min-height: ${headerHeight};
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    position: fixed;
    border-bottom: 1px solid lightgray;
    background: white;
  }

  aside {
    width: 18rem;
    padding: 1rem;
    padding-top: calc(1rem + ${headerHeight});
    border-right: 1px solid lightgray;
    min-height: 100vh;

    h3 {
      font-weight: 600;
      line-height: 2;
      margin-bottom: 0.5rem;
    }

    ul.games {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      li {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-right: auto;
        }

        p.empty {
          font-size: 0.75rem;
          opacity: 0.75;
        }

        button.create {
          margin-top: 0.5rem;
        }
      }
    }
  }
`;
