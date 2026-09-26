# CLAUDE.md

Contexto inicial para trabalhar neste repositório: versão **online e multiplayer** do jogo de mesa narrativo **PULSE** (Vinicius "Encho" Chagas, CC BY-SA 3.0 BR). As regras originais (versão física, "Fast Play" v1.4) estão em `regras.pdf` e resumidas no final deste arquivo.

Idioma: o código (identificadores, commits) é em **inglês**; os textos de UI e toasts são em **português**; comentários são raros.

---

## Comandos

```bash
yarn start        # webpack-dev-server (usa .env.development)
yarn build        # build de produção em dist/ (usa .env.production)
yarn lint         # eslint
yarn format       # prettier (com ordenação de imports)
yarn test         # jest (configurado, mas não há testes em src/ hoje)
npx tsc --noEmit --skipLibCheck   # typecheck (sem --skipLibCheck falha por @types/react-router-dom v5 vs RR v6)
```

- Env: `.env.development` / `.env.production` contêm `FIREBASE_CONFIG='{...json...}'` (ver `.env.example`). Sem ela o app lança `RequiredError` ao carregar (`src/data/constants/_env/firebase-config.ts`).
- Deploy: GitHub Actions → Firebase Hosting (projeto `pulse-45215`). Push na `main` publica em produção; PR gera preview channel. Hosting serve `dist/` com rewrite SPA.
- Pastas ignoradas/legadas: `bkp/` (versão antiga, excluída do tsconfig), `web/` (config Firebase antiga), `dist/`. `src/presentation/pages/_home/index copy.tsx` e `styles copy.ts` são sobras não usadas.

## Stack

React 18 + TypeScript (strict) + Webpack 5 (ts-loader) · styled-components 5 · TanStack React Query 5 · react-router-dom 6 (`createBrowserRouter`) · react-hook-form · react-toastify · react-icons · Firebase 10 (Auth, Realtime Database, Firestore) · `@faker-js/faker` (nome de usuário anônimo).

---

## Arquitetura (Clean Architecture em 4 camadas)

Aliases (`tsconfig.json` + `webpack.config.js`): `@domain/*`, `@data/*`, `@main/*`, `@presentation/*`.

| Camada | Papel | Conteúdo |
|---|---|---|
| `src/domain` | Regras puras, sem dependências de infra | `models` (entidades + `DTO`), `usecases` (**só interfaces** `IXxxUsecase`), `errors`, `enums` (`Color`), `types`, `utils` (`Vector`, `VectorSpace`, `Matrix`, `Circle`, etc.) |
| `src/data` | Implementação dos usecases e contratos de infra | `usecases` (classes `XxxUsecase implements IXxxUsecase`), `dao` (interfaces `IXxxDAO`), `hydration` (interfaces `IXxxHydrator`), `protocols` (`DatabaseProtocol`, `SocketProtocol`, `Auth*Protocol`, `CacheProtocol`), `services` (init do Firebase), `constants` (env) |
| `src/main` | Composição / infraestrutura concreta | `dao` (implementações com cache), `hydration` (DTO → Model), `adapters/protocols` (Firebase realtime/firestore/auth, memory, localStorage), `factories` (DI manual: `makeXxx()` para adapters, DAOs, hydrators, usecases, contexts, pages, routes, app) |
| `src/presentation` | UI React | `pages`, `components`, `hooks` (contexts por entidade), `proxies` (guards de rota), `styles` (tema, mixins), `utils` |

Fluxo de uma ação: componente → hook de contexto (`useDice().rollCurrentDice`) → `useUsecase` (wrap em `useMutation`) → `XxxUsecase.execute` (data) → `IXxxDAO` (main) → `DatabaseProtocol` (Firebase). Atualizações chegam de volta via `watch` (socket) → `queryClient.setQueryData` no contexto.

### Convenções de código

- **Uma unidade por pasta**: `_nome-em-kebab/index.ts(x)` (+ `types.ts`, `styles.ts`), com prefixo `_`. Cada nível tem `index.ts` que faz `export * from './_xxx'`. Importe sempre pelos barrels (`@domain/models`, `@data/usecases`, `@main/factories`, `@presentation/hooks`).
- **Namespaces para tipos auxiliares**: `XxxModel.DTO`, `IXxxUsecase.Payload`, `IXxxDAO.CreatePayload/UpdatePayload`, `XxxError.Metadata`, `makeDatabase.Option`.
- Usecases: classe com dependências `private readonly` recebidas via objeto `Deps` no construtor (tipo `Deps` declarado no final do arquivo); um único método `public async execute(...)`.
- Erros: sempre subclasses de `DomainError` (`NotFoundError`, `ForbiddenError`, `OutOfBoundError`, `RequiredError`, `InvalidDataError`, `AlreadyExistsError`, `NotIntegerError`, `FailedError`, `UnknownError`) com `metadata` (`entity`, `prop`, `value`, `tried`...).
- ESLint: aspas simples, `camelcase`, `explicit-member-accessibility` (use `public`/`private`), return type explícito em `.ts` (exceto `styles.ts`). Prettier ordena imports pelos grupos definidos em `.prettierrc` (third-party → @domain → @data → @presentation → @main → relativos).
- Factories de DAO são **singletons** (variável de módulo); factories de usecase criam instância nova a cada chamada.

### Checklist para adicionar um usecase

1. Interface em `src/domain/usecases/_<entidade>/_<acao>/index.ts` + export no barrel.
2. Implementação em `src/data/usecases/_<entidade>/_<acao>/index.ts` + barrel.
3. Factory `makeXxxUsecase` em `src/main/factories/usecases/...` + barrel.
4. Expor no contexto: props em `src/presentation/hooks/_use-<entidade>/types.ts`, `useUsecase(props.xxx)` no provider, e passar a factory em `src/main/factories/contexts/_<entidade>/index.tsx`.
5. Se a ação avança o jogo, chamar `nextGameState.execute()` no fim do usecase (padrão atual).

---

## Persistência (Firebase)

- **Realtime Database** (`makeDatabase('multiple users read/write same data')` + `RealtimeSocket` com `onValue`) para tudo que é compartilhado no jogo.
- **Firestore** (`'only 1 user read/write each data'`) apenas para `users`.
- Caminhos: `games` (nó raiz de cada jogo) e subcoleções aninhadas `games/{gameID}/{players|dices|rounds|subjects|centralFacts|questions|answers|centralPulses|subjectPulses|lightSpots}`.
- IDs gerados no client (`uuid v4`); `createdAt`/`updatedAt` são `Date.now()` no DTO e viram `Date` no Model.
- O Realtime DB não guarda `null`, `[]` nem `{}`: `FirebaseRealtimeDBHelper.encodeData/decodeData` substitui por strings sentinela. `update` faz `get` + `deepMerge` + `update`; chaves com `undefined` são descartadas (então `undefined` num payload de update = "não altera").
- **DAOs em `src/main/dao`** mantêm cache em memória (`Map` por id/order/uid), resolvem o `currentGameID` pelo usuário logado (`userDAO.getByUID(uid).currentGameID`) e usam `Asyncleton.run(key, fn)` para deduplicar fetches concorrentes. O jogo "atual" do usuário é o `users.currentGameID` (setado por `SetCurrentGameUsecase` ao abrir `/game/:gameID`).
- Regras de segurança são permissivas (`database.rules.json`, `firestore.rules`) — não há validação server-side; toda regra de jogo roda no client.

---

## Entidades (glossário regra ↔ código)

| Regra física | Código | Observações |
|---|---|---|
| Partida | `GameModel` | `uid` = host; `config {maxPlayers 3–5, withLightSpot, dicesMode}`; `state` (tupla, ver máquina de estados); `roundID`, `lightSpotRoundID`, `centralPulseID` |
| Jogador | `PlayerModel` | `order` (0..n-1, ordem de entrada) é a **chave de ligação** com dado e elemento; `color` única entre não banidos; `avatar` (emoji); `banned` (host pode banir) |
| Usuário | `UserModel` | conta Firebase (anônima, e-mail/senha, Google, GitHub); `currentGameID` |
| Dado (D4…D12) | `DiceModel` | criados 5 no `StartGame`: `order` 0..4 → `sides` 4,6,8,10,12. `value` (última rolagem), `position`, `overloadCount`, `overloaded`. `ownerID`/`color` derivados do player com mesmo `order` |
| Elemento principal / Ponto de Luz | `SubjectModel` (um `LandmarkModel`) | `description`, `icon` (emoji), `color`, `position`. Todos os subjects de um mesmo `order` pertencem ao mesmo jogador; o **mais antigo** é o Elemento principal (`getOldestSubject`), os demais são Pontos de Luz criados por ele |
| Fato Central | `CentralFactModel` | landmark fixo em (0,0) com `description` editável |
| Pulsos pretos do Fato Central | `CentralPulseModel` | origem (0,0), `gap = 1`, `amount` = maior rolagem feita na fase do Fato Central (só cresce) |
| Pulsos de um Elemento | `SubjectPulseModel` | `origin` (posição do dado), `gap` (intervalo escolhido pelo jogador), `amount` (= valor do dado), `landmarkID` (subject) |
| Pulso do Ponto de Luz | `LightSpotModel` | 1 círculo centrado em (0,0) com `gap` = distância do ponto onde o dado caiu; `landmarkID` preenchido quando o subject do Ponto de Luz é criado |
| Pergunta (Investigação) | `QuestionModel` | `position` = posição do subject do autor ao perguntar; `votes: Record<playerID, {answerID, upToDate}>`; `factID` derivado |
| Resposta (Conjectura) / Fato | `AnswerModel` | `authorID`, `questionID`. Vira **Fato** quando todos os jogadores não banidos votam nela com `upToDate` |
| Rodada / vez | `RoundModel` | `i` = `order` do jogador da vez (ou `null`), `clockwise` (`'clockwise'`/`'counterclockwise'`), `finished` |

### Campos derivados nos hydrators (`src/main/hydration`)

- `PlayerModel.diceID/overloaded` ← dado de mesmo `order`; `subjectID` ← subject mais antigo do `order`.
- `DiceModel.position` ← `dto.position` **ou**, se nulo, a posição do Elemento principal do dono. Ou seja, na prática **a posição do dado do jogador = `position` do seu subject principal**; mover o dado é `ChangeMySubjectPositionUsecase`.
- `SubjectModel.overloaded` ← dado do autor; `pulseIDs` ← subjectPulses + lightSpot do subject, mais recente primeiro (`pulseIDs[0]` = último pulso).
- `SubjectPulse/LightSpot.overloaded` ← dado do dono do subject (pulsos sobrecarregados são ignorados no cálculo de interseções).
- `QuestionModel.color/authorID` ← player com `order` da pergunta; `factID` ← unanimidade de votos atualizados.
- `GameModel.stateProgress` ← índice do sub-estado / nº de sub-estados.

---

## Máquina de estados do jogo

`GameModel.state` é uma tupla `[fase, subfase?]`. **Toda transição passa por `NextGameStateUsecase`** (`src/data/usecases/_game/_next-game-state`), chamado ao final dos usecases de ação. A UI apenas renderiza o componente de `src/presentation/pages/_game/states/` correspondente à fase e habilita a ação se `isMyTurn` e a subfase batem.

```
initial:state                         (lobby; host clica "Começar" → StartGameUsecase:
                                       cria CentralPulse+CentralFact, 2 Rounds, 5 dados)
  → creating:subjects                 horário, 1 por jogador: cria Elemento principal (CreateMySubject)
  → creating:centralFact              anti-horário, por jogador:
       change:centralFact               edita a descrição do Fato Central (ChangeCentralFact)
       roll:dice                        rola o dado (RollCurrentDice; aumenta CentralPulse.amount)
       update:dice:position             posiciona o dado no círculo de raio = valor (ChangeMySubjectPosition)
  → creating:questions                horário, por jogador não sobrecarregado (INVESTIGAÇÃO):
       roll:dice                        RollCurrentDice
       create:subjectPulse              desenha N=valor pulsos a partir da posição; jogador escolhe o gap
                                        com o mouse; só é aceito se houver interseção (CreateSubjectPulse)
       update:dice:position             escolhe uma interseção do último pulso com pulsos de outros
                                        (ChangeMySubjectPosition)
       create:question                  escreve a pergunta no ponto (CreateQuestion)
  → creating:answers                  anti-horário, por jogador (CONJECTURAS):
       create:answer                    responde qualquer pergunta (CreateAnswer: expira votos da
                                        pergunta e já vota na própria resposta)
       vote:answer                      todos votam (VoteQuestionFact); quando todos os votos ficam
                                        upToDate, avança. Unanimidade → a resposta vira Fato
  → creating:lightSpot                1 jogador por rodada, na ordem D4, D6, ... (PONTO DE LUZ):
       roll:dice                        "arremessa" o dado no mapa (DiceRoller com física) →
                                        RollCurrentLightSpotDice(position) cria o LightSpot
       create:subject                   cria o Elemento secundário com cor própria
                                        (CreateLightSpotSubject → VerifyDicesOverload)
  → volta a creating:questions ...
  → final:state                       quando a rodada de Ponto de Luz termina (todos já criaram)
```

### Rodadas (`PassRoundTurnUsecase`)

- `round.i` avança para o próximo `order` no sentido informado (horário = order crescente, anti-horário = decrescente); ao passar do último, `finished = true` e `i = null`. Com `i = null`, a próxima chamada recomeça da ponta do sentido informado (horário a partir do menor `order`, anti-horário a partir do maior) — é assim que cada fase reinicia a rodada.
- Jogadores com `overloaded` são **pulados** e têm a sobrecarga zerada ao serem pulados (`ResetDiceOverload`) — equivale a "perde a próxima Investigação".
- `lightSpotRound` é uma segunda rodada, independente, que avança 1 jogador por ciclo (`PassLightSpotRoundTurnUsecase`) e define quando o jogo acaba.

### Sobrecarga

`VerifyDicesOverload` (chamado só em `CreateLightSpotSubject`, i.e. uma vez por ciclo) soma `dice.value` a `overloadCount` de cada dado não sobrecarregado; se `overloadCount >= sides`, `overloaded = true`.

### Geometria do mapa

- Unidade do mundo = 1 intervalo dos pulsos centrais. Fato Central em (0,0). Mais longe do centro = mais no passado.
- `Map` (`src/presentation/pages/_game/components/_map`) é um SVG; `mapSpace: VectorSpace` converte mundo ↔ pixels (translação para o centro + escala). Limite do mapa = maior `sides` entre dados com dono + 1. Eventos de mouse (`onMouseMove/onClick/...`) são expostos via `useMapContext` já convertidos para coordenadas do mundo.
- `Crossings` calcula interseções círculo-círculo entre o círculo alvo e todos os círculos de pulsos não sobrecarregados; seleciona a mais próxima do mouse (raio < 1).
- `useGetSubjectsByCrossing` descobre quais Elementos passam por um ponto (tolerância 0.01).

---

## Presentation

- **Rotas** (`src/main/factories/routes`): `/` (home: lista/cria jogos), `/login`, `/register`, `/logout`, `/game/:gameID` com filhas `player[/:playerID]`, `subject[/:subjectID]`, `central-fact`, `investigation[/:questionID]` (renderizadas via `<Outlet>` como folhas "papel manteiga" sobre o mapa).
- **Página do jogo** (`makeGamePage`): `AuthProxy` (login inline + `setCurrentGame(gameID)`) → pilha de Context Providers (Game → Round → Player → Dice → Subject → CentralPulse → CentralFact → SubjectPulse → Question → Answer → LightSpot) → `GameExistsProxy` → `CreatePlayerProxy` (manda para `/player` se ainda não tem jogador) → `GamePage` (lazy).
- **Contexts** (`src/presentation/hooks/_use-<entidade>`): cada um faz `useQuery({ queryKey: [gameID, '<entidade>'] })`, assina `watch` via `useWatch` e, ao receber snapshot, faz `setQueryData` + `invalidateQueries` das entidades cujos campos derivados dependem dela. Ações são expostas via `useUsecase`.
- `usePlayer` expõe `myPlayer`, `currentPlayer`, `currentLightSpotPlayer`, `isMyTurn`, `isMyLightSpotTurn` e `turnIsSafe` (evita navegação automática com estado antigo logo ao montar).
- Estados navegam automaticamente para a sub-rota adequada quando é a vez do jogador (ex.: `creating:subjects` → `/subject`, `create:question` → `/investigation`).
- Hooks utilitários: `useStates` (estado via Proxy: `s.x = v` dispara setState; `set('x')`/`set('x', v)` retornam callbacks), `useEvent`, `useInterval`, `useToast` (`fire/success/error/dismiss`), `useNavigate` (`navigateToGame/Subject/Investigation/...`). Cada estado tem hooks `use...Toast` com dicas contextuais.
- Estilo: styled-components com tema claro (`src/presentation/styles/themes/light.ts`), `theme.color(Color)` → `{light, normal, dark, contrast}`; props transientes com `$`.

---

## Divergências e pontos de atenção (código × regras)

- `config.dicesMode` (`'equal'` = todos D8, `'growing'` = D4..D12) e `config.withLightSpot` são salvos/editáveis nas Settings, **mas não são respeitados**: `StartGame` sempre cria D4..D12 e a fase de Ponto de Luz sempre ocorre.
- A fase **Resumo da História** (2.5) não existe no app; nem o encerramento por **decisão de grupo** — o jogo só termina após todos criarem seu Ponto de Luz.
- Sobrecarga é verificada apenas dentro da criação do Ponto de Luz; o reset acontece quando o jogador é pulado em `PassRoundTurn` (em qualquer fase que use a rodada principal).
- Na UI, uma pergunta que já tem Fato não aceita novas respostas (nas regras é permitido responder de novo acrescentando informações sem contradizer o Fato).
- Validações de fase/vez estão parcialmente nos usecases (ex.: `CreateQuestion`, `CreateMySubject` checam estado) e parcialmente só na UI (ex.: `CreateAnswer` não checa estado).
- Não há testes em `src/`; jest + ts-jest estão configurados com os aliases.

---

## Regras do PULSE (resumo da versão física)

**Conceito.** Jogo cooperativo de contar histórias, sem vencedor, para 3–5 jogadores (1–2h). Os jogadores constroem juntos um enredo desenhando **Pulsos** (círculos concêntricos) num papel grande, o **Mapa de Pulsos**. Onde pulsos de Elementos diferentes se cruzam, os jogadores fazem perguntas e definem como esses Elementos se relacionam. **Distância do centro = tempo**: o centro (Fato Central) é o momento mais recente/o final da história; quanto mais longe, mais no passado. A escala (segundos, anos, eras) é descoberta durante o jogo.

**Material.** Uma cor de caneta por Elemento + caneta preta (Fato Central e anotações de sobrecarga); dados D4, D6, D8, D10, D12; papel grande.

**Preparação.** Cada jogador recebe uma cor e um dado diferente, em ordem crescente ao redor da mesa: 1º D4, 2º D6, 3º D8, 4º D10, 5º D12 (3 jogadores → maior é D8; 4 → D10; 5 → D12). Ordem e dado são fixos a partida toda. Horário = do menor para o maior dado.

### 1. Início de Jogo
- **1.1 Criação de Elementos** (horário, a partir do D4): cada jogador cria seu Elemento principal.
  - Elemento = algo **físico**, visível numa cena (pessoa, animal, lugar, objeto). Descrição curta e específica (1–2 palavras, uma característica: uma ação ou um adjetivo). Ex.: "uma estação espacial", "um carro sem rodas", "Jarvis o mordomo". Não precisam combinar entre si (épocas diferentes são ok).
- **1.2 Criação do Fato Central** (anti-horário, a partir do maior dado): cada jogador insere seu Elemento na cena central, dizendo o que acontece com ele ligando-o a pelo menos outro Elemento. O que é declarado é imutável (o implícito pode ser reinterpretado). Depois rola seu dado: conta esse número de **pulsos pretos** a partir do centro e coloca o dado em qualquer ponto desse círculo — é seu ponto de partida.

**Desenhando Pulsos.** Círculos concêntricos com intervalo constante (o 1º raio define o intervalo: 2cm → 4cm → 6cm...). Sempre de dentro para fora. Na Investigação o centro é a posição atual do dado. No Ponto de Luz é um único círculo centrado no Fato Central.

### 2. Desenvolvimento (cada rodada)
- **2.1 Investigação** (horário, a partir do D4; um por vez): rola o dado e desenha esse número de Pulsos ao redor da posição atual do dado. Escolhe um ponto no **último** Pulso desenhado, move o dado para lá e faz **uma pergunta** sobre os Elementos presentes naquele ponto (interseção com Pulsos de outros Elementos; com mais Elementos cruzando, pode envolver todos). Os dados nunca saem do mapa.
- **2.2 Conjecturas** (anti-horário, a partir do maior dado): cada jogador responde **qualquer** pergunta do mapa (inclusive já respondidas ou feitas por ele). Escreve a resposta; os demais aprovam ou vetam — qualquer um pode vetar (unanimidade). Aprovada, vira **Fato** (circulada, imutável). Responder de novo uma pergunta com Fato exige acrescentar informação sem contradizê-lo.
- **2.3 Ponto de Luz** (apenas **um** jogador por rodada: 1ª rodada o D4, depois o D6, etc.): rola o dado sobre o mapa; onde cair, cria um novo Elemento (secundário) com uma cor exclusiva e desenha **um único** Pulso dessa cor centrado no Fato Central com raio igual à distância até o ponto. Qualquer jogador que cruzar esse círculo pode perguntar sobre ele.
- **2.4 Verificar Sobrecarga** (só jogadores não sobrecarregados nesta rodada): anota-se o valor atual de cada dado; se a soma acumulada do jogador atingir o valor máximo do seu dado (D4→4, D6→6...), seu Elemento fica **sobrecarregado**: o jogador não joga a próxima Investigação e seus Elementos não podem ser citados em Investigações. Ao perder a vez, a sobrecarga some e o contador zera.
- **2.5 Resumo da História**: todos recontam os acontecimentos em ordem cronológica (de fora para o centro), discutem o que falta investigar e como concluir. Podem decidir encerrar antecipadamente.

### 3. Conclusão
- **Padrão**: quando uma rodada chega ao Ponto de Luz e todos os jogadores já criaram o seu, o jogo termina (aproveitar a última rodada para fechar ganchos).
- **Decisão de grupo**: consenso de que a história está completa.
- No final, os jogadores chegam a um veredito sobre o que realmente aconteceu no Fato Central.

### Regras opcionais (livro)
- **Dados fixos**: todos usam D8 (mais equilibrado) **ou** a cada rodada os dados passam para a direita (mantendo a cor do Elemento). → corresponde ao `dicesMode: 'equal'` do app.
- **Pontos de Luz**: remover a fase **ou** criar Eventos em vez de Elementos. → corresponde ao `withLightSpot`.
- **Sem sobrecarga** (bom com crianças).
- **Cenários**: fixar uma ambientação antes de começar.
