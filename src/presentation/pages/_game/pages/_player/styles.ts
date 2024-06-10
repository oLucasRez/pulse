import styled from 'styled-components';

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'avatar name    menu'
    'color  buttons menu';
  gap: 0.5rem 0.75rem;
  place-items: center;
  padding: 3rem;

  > .Input {
    grid-area: name;
    font-size: 1.5rem;
    margin-top: 1rem;
    justify-self: stretch;
  }

  > .ColorSelector {
    grid-area: color;
  }

  > .IconButton {
    grid-area: menu;
    align-self: flex-start;
  }

  > .AvatarSelector {
    grid-area: avatar;
  }
`;

export const Buttons = styled.div`
  grid-area: buttons;
  justify-self: end;
  display: flex;
  gap: 0.5rem;
`;

export const PopoverContent = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const OptionItem = styled.li`
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.325rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.1s;
  display: flex;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.background.normal};
  }

  > .Icon {
    font-size: 0.875rem;
  }
`;
