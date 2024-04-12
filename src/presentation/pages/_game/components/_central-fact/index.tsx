import { FC } from 'react';

import { P } from '@presentation/components';
import { useCentralFactUsecases } from '@presentation/contexts';

import { Landmark, useMapContext } from '..';

export const CentralFact: FC = () => {
  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { centralFact } = useCentralFactUsecases();

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
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // handle
            onClick={closeBakingPaper}
          >
            <div
              // style
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '30rem',
                lineHeight: 1.1,
                gap: '0.6rem',
              }}
              // handle
              onClick={(e) => e.stopPropagation()}
            >
              <P
                // style
                className='handwriting'
                style={{ color: '#757575', fontSize: '1.5rem' }}
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
