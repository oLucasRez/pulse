import { FC, useEffect } from 'react';
import styled from 'styled-components';

const scale = 1;

const LETTER_BOX_UNIT = scale * 25 + 'px';
const PULSE_LETTER_SPACING = scale * 5 + 'px';
const ONLINE_LETTER_SPACING = scale + 'px';

const Container = styled.div`
  display: flex;
  gap: ${PULSE_LETTER_SPACING};
  position: relative;
  color: #6a6a75;

  svg {
    overflow: visible;
  }

  svg.p,
  svg.u,
  svg.s,
  svg.e {
    width: calc(${LETTER_BOX_UNIT} * 2);
  }
  svg.l {
    width: calc(${LETTER_BOX_UNIT} * 1);
  }

  svg.p,
  svg.l {
    height: calc(${LETTER_BOX_UNIT} * 3);
  }
  svg.u,
  svg.s,
  svg.e {
    margin-top: auto;
    height: calc(${LETTER_BOX_UNIT} * 2);
  }

  path.letter {
    stroke: #6a6a75;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }

  span.online {
    position: absolute;
    top: 0;
    right: 0;
    font-size: calc(${LETTER_BOX_UNIT} - ${PULSE_LETTER_SPACING});
    line-height: 1;
    letter-spacing: ${ONLINE_LETTER_SPACING};
    transform: translateX(${ONLINE_LETTER_SPACING});
    color: #ffa110;
  }
`;

const strokeWidth = 2.5;

export const PulseLogo: FC = () => {
  useEffect(() => {
    const pLetter = document.getElementById('p');
    if (pLetter) {
      pLetter.setAttribute(
        'd',
        `M${strokeWidth / 2} ${30 - strokeWidth / 2} v-10 h${
          10 - strokeWidth / 2
        } a${10 - strokeWidth} ${10 - strokeWidth} 0 0 0 0 -${
          20 - strokeWidth
        } h-${10 - strokeWidth / 2}`,
      );
      pLetter.style.strokeWidth = strokeWidth + '';
    }

    const uLetter = document.getElementById('u');
    if (uLetter) {
      uLetter.setAttribute(
        'd',
        `M${strokeWidth / 2} ${strokeWidth / 2} v${10 - strokeWidth / 2} a${
          10 - strokeWidth / 2
        } ${10 - strokeWidth / 2} 0 0 0 ${20 - strokeWidth} 0 v-${
          10 - strokeWidth / 2
        }`,
      );
      uLetter.style.strokeWidth = strokeWidth + '';
    }

    const lLetter = document.getElementById('l');
    if (lLetter) {
      lLetter.setAttribute(
        'd',
        `M${strokeWidth / 2} ${strokeWidth / 2} v20 a${10 - strokeWidth} ${
          10 - strokeWidth
        } 0 0 0 ${10 - strokeWidth} ${10 - strokeWidth}`,
      );
      lLetter.style.strokeWidth = strokeWidth + '';
    }

    const sLetter = document.getElementById('s');
    if (sLetter) {
      sLetter.setAttribute(
        'd',
        `M${strokeWidth / 2} ${20 - strokeWidth / 2} h${
          15 - strokeWidth
        } a5 5 0 0 0 0 -10 h-${10 - strokeWidth / 2} a${
          5 - strokeWidth || 1e-8
        } ${5 - strokeWidth || 1e-8} 0 0 1 0 -${10 - strokeWidth} h${
          10 - strokeWidth / 2
        }`,
      );
      sLetter.style.strokeWidth = strokeWidth + '';
    }

    const eLetter = document.getElementById('e');
    if (eLetter) {
      eLetter.setAttribute(
        'd',
        `M${15 - strokeWidth / 2} ${20 - strokeWidth / 2} h-${
          5 - strokeWidth / 2
        } a${10 - strokeWidth / 2} ${10 - strokeWidth / 2} 0 1 1 ${
          10 - strokeWidth / 2
        } -${10 - strokeWidth / 2} h-${10 - strokeWidth / 2}`,
      );
      eLetter.style.strokeWidth = strokeWidth + '';
    }
  }, []);

  return (
    <Container className='PulseLogo'>
      <svg
        className='p'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 20 30'
      >
        <path id='p' className='letter' />
      </svg>
      <svg
        className='u'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
      >
        <path id='u' className='letter' />
      </svg>
      <svg
        className='l'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 10 30'
      >
        <path id='l' className='letter' />
      </svg>
      <svg
        className='s'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
      >
        <path id='s' className='letter' />
      </svg>
      <svg
        className='e'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
      >
        <path id='e' className='letter' />
      </svg>
      <span className='online handwriting'>Online</span>
    </Container>
  );
};
