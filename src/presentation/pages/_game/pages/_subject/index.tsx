import {
  FC,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';

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

import { useTipToast } from './hooks';

import { SubjectExistsProxy } from './proxies';

import { Container } from '../styles';
import {
  ColorButton,
  Colors,
  Content,
  Description,
  Icon,
  Label,
} from './styles';

const SubjectPage: FC<SubjectExistsProxy.ChildrenProps> = ({ subject }) => {
  const newSubject = !subject;

  const { navigateToGame } = useNavigate();

  const { mySubject, createMySubject, createLightSpotSubject } = useSubject();
  const { players, myPlayer, isMyTurn, isMyLightSpotTurn } = usePlayer();
  const { currentGame } = useGame();

  const [state, subState] = currentGame?.state ?? [];

  const author = useMemo(
    () => players.find(({ id }) => id === subject?.authorID),
    [players, subject?.authorID],
  );

  const firstNewSubjectColor = !myPlayer?.subjectID
    ? myPlayer?.color
    : undefined;

  const [s, set] = useStates({
    editing: newSubject,
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

  const descriptionRef = useRef<Input.Element>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  useTipToast();

  const isNotMyMainSubject = subject?.id !== mySubject?.id;

  const showColorsSelector = isNotMyMainSubject && s.editing;

  const availableColors = useAvailableColors();

  const isCreatingMySubject = state === 'creating:subjects' && isMyTurn;
  const isCreatingLightSpot =
    state === 'creating:lightSpot' &&
    subState === 'create:subject' &&
    isMyLightSpotTurn;

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    if (isCreatingMySubject) {
      if (!s.icon || !s.description) return;

      createMySubject({ icon: s.icon, description: s.description }).finally(
        navigateToGame,
      );
    }

    if (isCreatingLightSpot) {
      if (!s.icon || !s.color || !s.description) return;

      createLightSpotSubject({
        icon: s.icon,
        color: s.color,
        description: s.description,
      }).finally(navigateToGame);
    }
  }

  function renderLabel() {
    let children: ReactNode = null;

    if (isCreatingLightSpot)
      children = (
        <>
          <em className={s.color}>Seu</em> Elemento
        </>
      );
    else if (!subject?.id || subject.id === mySubject?.id)
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
        if (isCreatingLightSpot) return;

        navigateToGame();
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
          $loading={s.loading}
          // handle
          onChange={set('description')}
          onKeyDown={handleInputKeyDown}
        />
        {showColorsSelector && (
          <Colors>
            {availableColors.map((color) => (
              <ColorButton
                key={color}
                value={color}
                selected={!s.color || color === s.color}
                onClick={set('color', s.color !== color ? color : undefined)}
              />
            ))}
          </Colors>
        )}
      </Content>
    </Container>
  );
};

export default SubjectPage;
