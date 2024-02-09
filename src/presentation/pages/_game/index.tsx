import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { GameModel, PlayerModel, UserModel } from '@domain/models';

import { GamePageParams } from './types';

import { useCreatePlayerModal, useStates } from '@presentation/hooks';

import {
  useAuthUsecases,
  useGameUsecases,
  usePlayerUsecases,
} from '@presentation/contexts';

import { getColor } from '@presentation/styles/mixins';

import { alertError, logError } from '@presentation/utils';

import { Container, Main } from './styles';

export const Component: FC = () => {
  const { id } = useParams<GamePageParams>();

  const s = useStates({
    players: [] as PlayerModel[],
    watchingPlayers: false,
    game: undefined as GameModel | undefined,
    deselectingGame: false,
    fetchCurrentGame: Date.now(),
  });

  const me: UserModel | null = useLoaderData() as any;

  const { getCurrentGame } = useGameUsecases();

  useEffect(() => {
    getCurrentGame
      .execute()
      .then((game) => {
        if (!game) {
          // entrou pela primeira vez, deve pedir permissão pro host?
          return;
        }

        if (game.id === id) s.game = game;
        else {
          // o game atual do usuário é outro, avisar pra salvar o progresso?
        }
      })
      .catch(logError);
  }, []);

  const fetchCurrentGame = (): any => (s.fetchCurrentGame = Date.now());

  const deselectingGame = (): any => (s.deselectingGame = true);
  const deselectedGame = (): any => (s.deselectingGame = false);

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const { openCreatePlayerModal, renderCreatePlayerModal } =
    useCreatePlayerModal();

  const { watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    watchPlayers
      .execute((players) => (s.players = players))
      .then(watchedPlayers)
      .catch(logError);
  }, []);

  const avatars = useMemo(() => {
    const value: Record<string, string> = {};

    s.players.map(
      (player) =>
        (value[player.id] = faker.helpers.arrayElement([
          ...['🧒🏻', '👧🏻', '👦🏻', '🧑🏻', '👩🏻', '👨🏻', '🧑🏻‍🦱', '👩🏻‍🦱', '👨🏻‍🦱'],
          ...['🧑🏻‍🦰', '👩🏻‍🦰', '👨🏻‍🦰', '👱🏻', '👱🏻‍♀️', '👱🏻‍♂️', '🧑🏻‍🦳', '👩🏻‍🦳', '👨🏻‍🦳'],
          ...['🧑🏻‍🦲', '👩🏻‍🦲', '👨🏻‍🦲', '🧔🏻', '🧔🏻‍♀️', '🧔🏻‍♂️', '🧓🏻', '👵🏻', '👴🏻'],
          ...['🧒🏻', '👧🏻', '👦🏻', '🧑🏻', '👩🏻', '👨🏻', '🧑🏻‍🦱', '👩🏻‍🦱', '👨🏻‍🦱'],
          ...['🧑🏻‍🦰', '👩🏻‍🦰', '👨🏻‍🦰', '👱🏻', '👱🏻‍♀️', '👱🏻‍♂️', '🧑🏻‍🦳', '👩🏻‍🦳', '👨🏻‍🦳'],
          ...['🧑🏻‍🦲', '👩🏻‍🦲', '👨🏻‍🦲', '🧔🏻', '🧔🏻‍♀️', '🧔🏻‍♂️', '🧓🏻', '👵🏻', '👴🏻'],
          ...['🧒🏽', '👧🏽', '👦🏽', '🧑🏽', '👩🏽', '👨🏽', '🧑🏽‍🦱', '👩🏽‍🦱', '👨🏽‍🦱'],
          ...['🧑🏽‍🦰', '👩🏽‍🦰', '👨🏽‍🦰', '👱🏽', '👱🏽‍♀️', '👱🏽‍♂️', '🧑🏽‍🦳', '👩🏽‍🦳', '👨🏽‍🦳'],
          ...['🧑🏽‍🦲', '👩🏽‍🦲', '👨🏽‍🦲', '🧔🏽', '🧔🏽‍♀️', '🧔🏽‍♂️', '🧓🏽', '👵🏽', '👴🏽'],
          ...['🧒🏽', '👧🏽', '👦🏽', '🧑🏽', '👩🏽', '👨🏽', '🧑🏽‍🦱', '👩🏽‍🦱', '👨🏽‍🦱'],
          ...['🧑🏽‍🦰', '👩🏽‍🦰', '👨🏽‍🦰', '👱🏽', '👱🏽‍♀️', '👱🏽‍♂️', '🧑🏽‍🦳', '👩🏽‍🦳', '👨🏽‍🦳'],
          ...['🧑🏽‍🦲', '👩🏽‍🦲', '👨🏽‍🦲', '🧔🏽', '🧔🏽‍♀️', '🧔🏽‍♂️', '🧓🏽', '👵🏽', '👴🏽'],
          ...['🧒🏿', '👧🏿', '👦🏿', '🧑🏿', '👩🏿', '👨🏿', '🧑🏿‍🦱', '👩🏿‍🦱', '👨🏿‍🦱'],
          ...['🧑🏿‍🦰', '👩🏿‍🦰', '👨🏿‍🦰', '👱🏿', '👱🏿‍♀️', '👱🏿‍♂️', '🧑🏿‍🦳', '👩🏿‍🦳', '👨🏿‍🦳'],
          ...['🧑🏿‍🦲', '👩🏿‍🦲', '👨🏿‍🦲', '🧔🏿', '🧔🏿‍♀️', '🧔🏿‍♂️', '🧓🏿', '👵🏿', '👴🏿'],
        ])),
    );

    return value;
  }, [s.players]);

  const myPlayer = s.players.find((player) => player.userID === me?.id);

  const { changeUser } = useAuthUsecases();

  const navigate = useNavigate();

  function handleBackButtonClick(): any {
    deselectingGame();

    navigate('/');

    changeUser
      .execute({ currentGameID: null })
      .then(deselectedGame)
      .then(fetchCurrentGame)
      .catch(alertError);
  }

  function renderPlayers(): ReactNode {
    if (s.watchingPlayers)
      return (
        <div className='players'>
          <span className='loading'>⏳</span>
        </div>
      );

    return (
      <>
        {!myPlayer && <button onClick={openCreatePlayerModal}>Join</button>}

        <div className='players'>
          {s.players.map((player) => {
            const styledColor = getColor(player.color);

            return (
              <div key={player.id} className='player'>
                <div className='avatar' style={{ background: styledColor }}>
                  {avatars[player.id]}
                </div>
                <span
                  className={`name${player.id === myPlayer?.id ? ' me' : ''}`}
                >
                  {player.name}
                </span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <Container>
        <header>
          <button onClick={handleBackButtonClick} disabled={s.deselectingGame}>
            {s.deselectingGame ? <span className='loading'>⏳</span> : '🔙'}
          </button>

          {s.game && (
            <h2>
              <b>{s.game.title}</b>
            </h2>
          )}

          <span className='greetings'>
            🧔🏻‍♂️ Hello, <b>{me?.name}</b>!
          </span>
          <button
            onClick={(): any => {
              localStorage.removeItem('session');
              navigate('/login');
            }}
          >
            🚪
          </button>
        </header>

        <Main>
          <p className='invite'>Invite your friends to join the game!</p>

          {renderPlayers()}

          <button className='start'>Start</button>
        </Main>
      </Container>

      {renderCreatePlayerModal()}
    </>
  );
};

Component.displayName = 'GamePage';
