import styled from 'styled-components';

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'description edit'
    'buttons     edit';
  gap: 0.5rem 0.75rem;
  padding: 3rem;
  max-width: 40rem;

  > .Input {
    font-size: 1.5rem;
  }

  > .IconButton.edit {
    grid-area: edit;
  }
`;

export const Buttons = styled.div`
  grid-area: buttons;
  justify-self: end;
  display: flex;
  gap: 0.5rem;
`;
