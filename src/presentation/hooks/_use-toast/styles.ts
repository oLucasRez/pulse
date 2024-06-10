import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > .Button {
    width: fit-content;
    margin-left: auto;
  }
`;

export const IconContainer = styled.div`
  font-size: 2.5rem;
  line-height: 1;
`;

export const TitleContainer = styled.div.attrs({ className: 'sans-serif' })`
  font-weight: 500;
  line-height: 1.2;
  font-size: 1rem;

  em {
    font-weight: 700;
  }
`;

export const DescriptionContainer = styled.div.attrs({
  className: 'sans-serif',
})`
  line-height: 1.3;
  font-size: 0.75rem;
  opacity: 0.75;
  gap: 0.5rem;
  display: grid;

  em {
    font-weight: 600;
  }
`;
