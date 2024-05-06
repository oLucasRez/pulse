import { FC, useMemo } from 'react';

import { P } from '@presentation/components';
import { useNavigate, usePlayer, useSubject } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { SubjectProps } from './types';

import { Landmark, useMapContext } from '..';

export const Subject: FC<SubjectProps> = ({ icon, ...props }) => {
  // const { mySubject } = useSubject();
  // const { players } = usePlayer();

  // const author = useMemo(
  //   () => players.find(({ id }) => id === props.authorID),
  //   [players, props.authorID],
  // );

  // const { openBakingPaper, closeBakingPaper } = useMapContext();

  const { navigateToSubject } = useNavigate();

  // const label = author ? (
  //   props.id === mySubject?.id ? (
  //     <>
  //       <em className={author.color}>Seu</em> Elemento
  //     </>
  //   ) : (
  //     <>
  //       Elemento de <em className={author.color}>{author.name}</em>
  //     </>
  //   )
  // ) : (
  //   'Elemento'
  // );

  return (
    <Landmark
      symbol={icon}
      {...props}
      onClick={() => navigateToSubject(props.id)}
      // onClick={() =>
      //   openBakingPaper(
      //     <div
      //       // style
      //       style={{
      //         width: '100%',
      //         height: '100%',
      //         display: 'flex',
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         padding: '3rem',
      //         gap: '1rem',
      //       }}
      //       // handle
      //       onClick={closeBakingPaper}
      //     >
      //       <div
      //         style={{
      //           width: '3rem',
      //           height: '3rem',
      //           borderRadius: '50rem',
      //           display: 'flex',
      //           alignItems: 'center',
      //           justifyContent: 'center',
      //           fontSize: '1.5rem',
      //           background: getColor(props.color),
      //         }}
      //       >
      //         {icon}
      //       </div>

      //       <div>
      //         <label
      //           className='handwriting'
      //           style={{
      //             maxWidth: '30rem',
      //             marginBottom: '0.5rem',
      //           }}
      //         >
      //           {label}
      //         </label>

      //         <div
      //           // style
      //           style={{
      //             display: 'flex',
      //             flexDirection: 'column',
      //             maxWidth: '30rem',
      //             lineHeight: 1.2,
      //           }}
      //           // handle
      //           onClick={(e) => e.stopPropagation()}
      //         >
      //           <P
      //             // style
      //             className='handwriting'
      //             style={{ color: getColor(props.color), fontSize: '1.5rem' }}
      //           >
      //             {props.description}
      //           </P>
      //         </div>
      //       </div>
      //     </div>,
      //   )
      // }
    />
  );
};

export const Subjects: FC = () => {
  const { subjects } = useSubject();

  return (
    <>
      {subjects.map((subject) => (
        <Subject key={subject.id} {...subject} />
      ))}
    </>
  );
};
