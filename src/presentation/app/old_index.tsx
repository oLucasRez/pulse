// import { faker } from '@faker-js/faker';
// import { FC, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import { Color } from '@domain/enums';

// import { DiceModel, PlayerModel } from '@domain/models';

// import { ChangePlayerUsecase } from '@domain/usecases';

// import { useStates } from '@presentation/hooks';

// import { useDiceUsecases, usePlayerUsecases } from '@presentation/contexts';

// import { getColor } from '@presentation/styles/mixins';

// import { Container } from './styles';

// /**
//  * Ponto de partida da aplicação.
//  */
// const App: FC = () => {
//   const s = useStates({
//     players: [] as PlayerModel[],
//     editing: null as string | null,
//     dices: [] as DiceModel[],
//   });

//   const { watchPlayers, createPlayer, changePlayer, deletePlayer } =
//     usePlayerUsecases();

//   useEffect(() => {
//     const promise = watchPlayers.execute((players) => (s.players = players));

//     return () => {
//       promise
//         .then((unsubscribe) => unsubscribe())
//         .catch((e) => alert(e.message));
//     };
//   }, []);

//   const { watchDices } = useDiceUsecases();
//   useEffect(() => {
//     const promise = watchDices.execute(
//       (dices) => (s.dices = dices.filter((dice) => !dice.ownerID)),
//     );

//     return () => {
//       promise
//         .then((unsubscribe) => unsubscribe())
//         .catch((e) => alert(e.message));
//     };
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { isDirty },
//   } = useForm<ChangePlayerUsecase.Payload>({
//     mode: 'onChange',
//   });

//   function onSubmit(data: ChangePlayerUsecase.Payload): void {
//     if (!s.editing) return;

//     changePlayer.execute(s.editing, data).catch((e) => alert(e.message));

//     s.editing = null;
//   }

//   return (
//     <Container>
//       <button
//         disabled={!s.dices.length}
//         onClick={(): void => {
//           createPlayer
//             .execute({
//               name: faker.person.firstName(),
//               color: faker.helpers.enumValue(Color),
//               diceID: faker.helpers.arrayElement(s.dices).id,
//             })
//             .catch((e) => alert(e.message));
//         }}
//       >
//         ➕ player
//       </button>

//       <ul>
//         {s.players.map((player) => {
//           const editing = s.editing === player.id;

//           let handleLeftButtonClick = (): any => (s.editing = player.id);
//           if (editing) handleLeftButtonClick = handleSubmit(onSubmit);

//           let handleRightButtonClick = (): any =>
//             deletePlayer.execute(player.id);
//           if (editing) handleRightButtonClick = (): any => (s.editing = null);

//           return (
//             <li key={player.id}>
//               <span style={{ background: getColor(player.color) }} />
//               <input
//                 {...(editing ? register('name', { required: true }) : {})}
//                 defaultValue={player.name}
//                 disabled={!editing}
//                 style={{ border: `1px solid ${getColor(player.color)}` }}
//               />
//               <button
//                 disabled={editing && !isDirty}
//                 onClick={handleLeftButtonClick}
//               >
//                 {editing ? <>✔️</> : <>✏️</>}
//               </button>
//               <button onClick={handleRightButtonClick}>
//                 {editing ? <>✖️</> : <>🗑️</>}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </Container>
//   );
// };

// export { App };
