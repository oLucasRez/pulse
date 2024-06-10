import styled from 'styled-components';

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto auto;
  grid-template-areas:
    'question edit'
    'buttons  edit'
    'answer   empty'
    'button   button'
    'answers  answers';
  gap: 0.5rem 0.75rem;
  align-items: center;
  padding: 3rem;
  max-width: 40rem;

  > .Input {
    justify-self: stretch;

    &.question-description {
      grid-area: question;
      font-size: 1.5rem;
    }

    &.answer-description {
      margin-top: 1rem;
      grid-area: answer;
      font-size: 1.25rem;
    }
  }

  > .IconButton {
    grid-area: edit;
    align-self: flex-start;
    justify-self: end;
  }

  > .Button.answer-submit {
    grid-area: button;
    justify-self: end;
  }
`;

export const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
  gap: 0.5rem;
  justify-content: end;
`;

export const Label = styled.label.attrs({ className: 'handwriting' })`
  opacity: 0.75;
  width: max-content;
`;
