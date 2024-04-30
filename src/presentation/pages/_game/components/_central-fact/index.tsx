import { FC } from 'react';

import { P } from '@presentation/components';
import { useCentralFact } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { Landmark, useMapContext } from '..';

export const CentralFact: FC = () => {
  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { centralFact } = useCentralFact();

  if (!centralFact) return null;

  return (
    <Landmark
      {...centralFact}
      symbol='#'
      onClick={() =>
        openBakingPaper(
          <div
            // style
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
            }}
            // handle
            onClick={closeBakingPaper}
          >
            <label
              className='handwriting'
              style={{
                width: '100%',
                maxWidth: '30rem',
                marginBottom: '0.5rem',
              }}
            >
              Fato Central
            </label>

            <div
              // style
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '30rem',
                lineHeight: 1.2,
              }}
              // handle
              onClick={(e) => e.stopPropagation()}
            >
              <P
                // style
                className='handwriting'
                style={{ color: getColor(), fontSize: '1.5rem' }}
              >
                {centralFact.description}
              </P>
            </div>
          </div>,
        )
      }
    />
  );
};
