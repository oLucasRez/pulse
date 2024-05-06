import {
  FC,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';

import { Input } from '@presentation/components';
import {
  useAvailableColors,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useSubject,
} from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { getRandomEmoji } from '@presentation/utils';

import { useShowColorsSelector, useTipToast } from './hooks';

import { Container } from '../styles';
import {
  ColorButton,
  Colors,
  Content,
  Description,
  Icon,
  Label,
} from './styles';

const SubjectPage: FC = () => {
  const params = useParams();

  const newSubject = !params.subjectID;

  const { navigateToGame } = useNavigate();

  const { subjects, mySubject, createMySubject } = useSubject();
  const { players, myPlayer, isMyTurn } = usePlayer();
  const { currentGame } = useGame();

  const [state] = currentGame?.state ?? [];

  const subject = useMemo(
    () => subjects.find(({ id }) => id === params.subjectID) ?? null,
    [subjects, params.subjectID],
  );

  const author = useMemo(
    () => players.find(({ id }) => id === subject?.authorID),
    [players, subject?.authorID],
  );

  const firstNewSubjectColor = !myPlayer?.subjectID
    ? myPlayer?.color
    : undefined;

  const [s, set] = useStates({
    editing: false,
    loading: false,
    color: subject?.color ?? firstNewSubjectColor,
    icon:
      subject?.icon ??
      getRandomEmoji([
        'Smileys & Emotion',
        'People & Body',
        'Animals & Nature',
        'Food & Drink',
        'Travel & Places',
        'Activites',
        'Objects',
      ]),
    description: subject?.description ?? '',
  });

  const navigateBackToGame = () =>
    params.gameID && navigateToGame(params.gameID);

  useEffect(() => {
    if (params.subjectID && !subject) navigateBackToGame();
  }, [subject]);

  const descriptionRef = useRef<Input.Element>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  useTipToast();

  const showClorsSelector = useShowColorsSelector();

  const availableColors = useAvailableColors();

  const isCreatingMySubject = state === 'creating:subjects' && isMyTurn;

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    if (isCreatingMySubject) {
      if (!s.icon || !s.description) return;

      createMySubject({ icon: s.icon, description: s.description }).finally(
        navigateBackToGame,
      );
    }
  }

  function renderLabel() {
    let children: ReactNode = null;

    if (!params.subjectID || params.subjectID === mySubject?.id)
      children = (
        <>
          <em className={s.color}>Seu</em> Elemento
        </>
      );
    else if (author)
      children = (
        <>
          Elemento de <em className={author.color}>{author.name}</em>
        </>
      );

    return children && <Label htmlFor='description'>{children}</Label>;
  }

  return (
    <Container
      onClick={() => {
        if (isCreatingMySubject) return;

        navigateBackToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Icon
          disabled={!s.editing}
          onClick={set(
            'icon',
            getRandomEmoji([
              'Smileys & Emotion',
              'People & Body',
              'Animals & Nature',
              'Food & Drink',
              'Travel & Places',
              'Activites',
              'Objects',
            ]),
          )}
        >
          {s.icon}
        </Icon>
        {renderLabel()}
        <Description
          // style
          color={s.color}
          variant='baking-paper'
          placeholderOpacity={0.5}
          placeholderColor={getColor(s.color)}
          // params
          ref={descriptionRef}
          id='description'
          placeholder='Descreva...'
          disabled={!newSubject || s.loading}
          defaultValue={s.description}
          loading={s.loading}
          // handle
          onChange={set('description')}
          onKeyDown={handleInputKeyDown}
        />
        {showClorsSelector && (
          <Colors>
            {availableColors.map((color) => (
              <ColorButton
                key={color}
                value={color}
                selected={color === s.color}
              />
            ))}
          </Colors>
        )}
      </Content>
    </Container>
  );
};

export default SubjectPage;
