export type EmojiCategory =
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Component'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Travel & Places'
  | 'Activites'
  | 'Objects'
  | 'Symbols'
  | 'Flags';

type Emojis = Record<EmojiCategory, Record<string, string[]>>;

const emojis: Emojis = {
  'Smileys & Emotion': {
    'face-smiling': [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '🫠',
      '😉',
      '😊',
      '😇',
    ],
    'face-affection': ['🥰', '😍', '🤩', '😘', '😗', '☺', '😚', '😙', '🥲'],
    'face-tongue': ['😋', '😛', '😜', '🤪', '😝', '🤑'],
    'face-hand': ['🤗', '🤭', '🫢', '🫣', '🤫', '🤔', '🫡'],
    'face-neutral-skeptical': [
      '🤐',
      '🤨',
      '😐',
      '😑',
      '😶',
      '🫥',
      '😶‍🌫️',
      '😏',
      '😒',
      '🙄',
      '😬',
      '😮‍💨',
      '🤥',
    ],
    'face-sleepy': ['😌', '😔', '😪', '🤤', '😴'],
    'face-unwell': [
      '😷',
      '🤒',
      '🤕',
      '🤢',
      '🤮',
      '🤧',
      '🥵',
      '🥶',
      '🥴',
      '😵',
      '😵‍💫',
      '🤯',
    ],
    'face-hat': ['🤠', '🥳', '🥸'],
    'face-glasses': ['😎', '🤓', '🧐'],
    'face-concerned': [
      '😕',
      '🫤',
      '😟',
      '🙁',
      '☹',
      '😮',
      '😯',
      '😲',
      '😳',
      '🥺',
      '🥹',
      '😦',
      '😧',
      '😨',
      '😰',
      '😥',
      '😢',
      '😭',
      '😱',
      '😖',
      '😣',
      '😞',
      '😓',
      '😩',
      '😫',
      '🥱',
    ],
    'face-negative': ['😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠'],
    'face-costume': ['💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'],
    'cat-face': ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'],
    'monkey-face': ['🙈', '🙉', '🙊'],
    emotion: [
      '💋',
      '💌',
      '💘',
      '💝',
      '💖',
      '💗',
      '💓',
      '💞',
      '💕',
      '💟',
      '❣',
      '💔',
      '❤️‍🔥',
      '❤️‍🩹',
      '❤',
      '🧡',
      '💛',
      '💚',
      '💙',
      '💜',
      '🤎',
      '🖤',
      '🤍',
      '💯',
      '💢',
      '💥',
      '💫',
      '💦',
      '💨',
      '🕳',
      '💣',
      '💬',
      '👁️‍🗨️',
      '🗨',
      '🗯',
      '💭',
      '💤',
    ],
  },
  'People & Body': {
    'hand-fingers-open': ['👋', '🤚', '🖐', '✋', '🖖', '🫱', '🫲', '🫳', '🫴'],
    'hand-fingers-partial': [
      '👌',
      '🤌',
      '🤏',
      '✌',
      '🤞',
      '🫰',
      '🤟',
      '🤘',
      '🤙',
    ],
    'hand-single-finger': ['👈', '👉', '👆', '🖕', '👇', '☝', '🫵'],
    'hand-fingers-closed': ['👍', '👎', '✊', '👊', '🤛', '🤜'],
    hands: ['👏', '🙌', '🫶', '👐', '🤲', '🤝', '🙏'],
    'hand-prop': ['✍', '💅', '🤳'],
    'body-parts': [
      '💪',
      '🦾',
      '🦿',
      '🦵',
      '🦶',
      '👂',
      '🦻',
      '👃',
      '🧠',
      '🫀',
      '🫁',
      '🦷',
      '🦴',
      '👀',
      '👁',
      '👅',
      '👄',
      '🫦',
    ],
    person: [
      '👶',
      '🧒',
      '👦',
      '👧',
      '🧑',
      '👱',
      '👨',
      '🧔',
      '🧔‍♂️',
      '🧔‍♀️',
      '👨‍🦰',
      '👨‍🦱',
      '👨‍🦳',
      '👨‍🦲',
      '👩',
      '👩‍🦰',
      '🧑‍🦰',
      '👩‍🦱',
      '🧑‍🦱',
      '👩‍🦳',
      '🧑‍🦳',
      '👩‍🦲',
      '🧑‍🦲',
      '👱‍♀️',
      '👱‍♂️',
      '🧓',
      '👴',
      '👵',
    ],
    'person-gesture': [
      '🙍',
      '🙍‍♂️',
      '🙍‍♀️',
      '🙎',
      '🙎‍♂️',
      '🙎‍♀️',
      '🙅',
      '🙅‍♂️',
      '🙅‍♀️',
      '🙆',
      '🙆‍♂️',
      '🙆‍♀️',
      '💁',
      '💁‍♂️',
      '💁‍♀️',
      '🙋',
      '🙋‍♂️',
      '🙋‍♀️',
      '🧏',
      '🧏‍♂️',
    ],
    'person-role': [
      '🧑‍⚕️',
      '👨‍⚕️',
      '👩‍⚕️',
      '🧑‍🎓',
      '👨‍🎓',
      '👩‍🎓',
      '🧑‍🏫',
      '👨‍🏫',
      '👩‍🏫',
      '🧑‍⚖️',
      '👨‍⚖️',
      '👩‍⚖️',
      '🧑‍🌾',
      '👨‍🌾',
      '👩‍🌾',
      '🧑‍🍳',
      '👨‍🍳',
      '👩‍🍳',
      '🧑‍🔧',
      '👨‍🔧',
      '👩‍🔧',
      '🧑‍🏭',
      '👨‍🏭',
      '👩‍🏭',
      '🧑‍💼',
      '👨‍💼',
      '👩‍💼',
      '🧑‍🔬',
      '👨‍🔬',
      '👩‍🔬',
      '🧑‍💻',
      '👨‍💻',
      '👩‍💻',
      '🧑‍🎤',
      '👨‍🎤',
      '👩‍🎤',
      '🧑‍🎨',
      '👨‍🎨',
      '👩‍🎨',
      '🧑‍✈️',
      '👨‍✈️',
      '👩‍✈️',
      '🧑‍🚀',
      '👨‍🚀',
      '👩‍🚀',
      '🧑‍🚒',
      '👨‍🚒',
      '👩‍🚒',
      '👮',
      '👮‍♂️',
      '👮‍♀️',
      '🕵',
      '🕵️‍♂️',
      '🕵️‍♀️',
      '💂',
      '💂‍♂️',
      '💂‍♀️',
      '🥷',
      '👷',
      '👷‍♂️',
      '👷‍♀️',
      '🫅',
      '🤴',
      '👸',
      '👳',
      '👳‍♂️',
      '👳‍♀️',
      '👲',
      '🧕',
      '🤵',
      '🤵‍♂️',
      '🤵‍♀️',
      '👰',
      '👰‍♂️',
      '👰‍♀️',
      '🤰',
      '🫃',
      '🫄',
      '🤱',
      '👩‍🍼',
      '👨‍🍼',
      '🧑‍🍼',
    ],
    'person-fantasy': [
      '👼',
      '🎅',
      '🤶',
      '🧑‍🎄',
      '🦸',
      '🦸‍♂️',
      '🦸‍♀️',
      '🦹',
      '🦹‍♂️',
      '🦹‍♀️',
      '🧙',
      '🧙‍♂️',
      '🧙‍♀️',
      '🧚',
      '🧚‍♂️',
      '🧚‍♀️',
      '🧛',
      '🧛‍♂️',
      '🧛‍♀️',
      '🧜',
      '🧜‍♂️',
      '🧜‍♀️',
      '🧝',
      '🧝‍♂️',
      '🧝‍♀️',
      '🧞',
      '🧞‍♂️',
      '🧞‍♀️',
      '🧟',
      '🧟‍♂️',
      '🧟‍♀️',
      '🧌',
    ],
    'person-activity': [
      '💆',
      '💆‍♂️',
      '💆‍♀️',
      '💇',
      '💇‍♂️',
      '💇‍♀️',
      '🚶',
      '🚶‍♂️',
      '🚶‍♀️',
      '🧍',
      '🧍‍♂️',
      '🧍‍♀️',
      '🧎',
      '🧎‍♂️',
      '🧎‍♀️',
      '🧑‍🦯',
      '👨‍🦯',
      '👩‍🦯',
      '🧑‍🦼',
      '👨‍🦼',
      '👩‍🦼',
      '🧑‍🦽',
      '👨‍🦽',
      '👩‍🦽',
      '🏃',
      '🏃‍♂️',
      '🏃‍♀️',
      '💃',
      '🕺',
      '🕴',
      '👯',
      '👯‍♂️',
      '👯‍♀️',
      '🧖',
      '🧖‍♂️',
      '🧖‍♀️',
      '🧗',
      '🧗‍♂️',
      '🧗‍♀️',
    ],
    'person-sport': [
      '🤺',
      '🏇',
      '⛷',
      '🏂',
      '🏌',
      '🏌️‍♂️',
      '🏌️‍♀️',
      '🏄',
      '🏄‍♂️',
      '🏄‍♀️',
      '🚣',
      '🚣‍♂️',
      '🚣‍♀️',
      '🏊',
      '🏊‍♂️',
      '🏊‍♀️',
      '⛹',
      '⛹️‍♂️',
      '⛹️‍♀️',
      '🏋',
      '🏋️‍♂️',
      '🏋️‍♀️',
      '🚴',
      '🚴‍♂️',
      '🚴‍♀️',
      '🚵',
      '🚵‍♂️',
      '🚵‍♀️',
      '🤸',
      '🤸‍♂️',
      '🤸‍♀️',
      '🤼',
      '🤼‍♂️',
      '🤼‍♀️',
      '🤽',
      '🤽‍♂️',
      '🤽‍♀️',
      '🤾',
      '🤾‍♂️',
      '🤾‍♀️',
      '🤹',
      '🤹‍♂️',
      '🤹‍♀️',
    ],
    'person-resting': ['🧘', '🧘‍♂️', '🧘‍♀️', '🛀', '🛌'],
    family: [
      '🧑‍🤝‍🧑',
      '👭',
      '👫',
      '👬',
      '💏',
      '👩‍❤️‍💋‍👨',
      '👨‍❤️‍💋‍👨',
      '👩‍❤️‍💋‍👩',
      '💑',
      '👩‍❤️‍👨',
      '👨‍❤️‍👨',
      '👩‍❤️‍👩',
      '👪',
      '👨‍👩‍👦',
      '👨‍👩‍👧',
      '👨‍👩‍👧‍👦',
      '👨‍👩‍👦‍👦',
      '👨‍👩‍👧‍👧',
      '👨‍👨‍👦',
      '👨‍👨‍👧',
      '👨‍👨‍👧‍👦',
      '👨‍👨‍👦‍👦',
      '👨‍👨‍👧‍👧',
      '👩‍👩‍👦',
      '👩‍👩‍👧',
      '👩‍👩‍👧‍👦',
      '👩‍👩‍👦‍👦',
      '👩‍👩‍👧‍👧',
      '👨‍👦',
      '👨‍👦‍👦',
      '👨‍👧',
      '👨‍👧‍👦',
      '👨‍👧‍👧',
      '👩‍👦',
      '👩‍👦‍👦',
      '👩‍👧',
      '👩‍👧‍👦',
      '👩‍👧‍👧',
    ],
    'person-symbol': ['🗣', '👤', '👥', '🫂', '👣'],
  },
  Component: {
    'hair-style': ['🦰', '🦱', '🦳', '🦲'],
  },
  'Animals & Nature': {
    'animal-mammal': [
      '🐵',
      '🐒',
      '🦍',
      '🦧',
      '🐶',
      '🐕',
      '🦮',
      '🐕‍🦺',
      '🐩',
      '🐺',
      '🦊',
      '🦝',
      '🐱',
      '🐈',
      '🐈‍⬛',
      '🦁',
      '🐯',
      '🐅',
      '🐆',
      '🐴',
      '🐎',
      '🦄',
      '🦓',
      '🦌',
      '🦬',
      '🐮',
      '🐂',
      '🐃',
      '🐄',
      '🐷',
      '🐖',
      '🐗',
      '🐽',
      '🐏',
      '🐑',
      '🐐',
      '🐪',
      '🐫',
      '🦙',
      '🦒',
      'Browser',
      '🐘',
      '🦣',
      '🦏',
      '🦛',
      '🐭',
      '🐁',
      '🐀',
      '🐹',
      '🐰',
      '🐇',
      '🐿',
      '🦫',
      '🦔',
      '🦇',
      '🐻',
      '🐻‍❄️',
      '🐨',
      '🐼',
      '🦥',
      '🦦',
      '🦨',
      '🦘',
      '🦡',
      '🐾',
    ],
    'animal-bird': [
      '🦃',
      '🐔',
      '🐓',
      '🐣',
      '🐤',
      '🐥',
      '🐦',
      '🐧',
      '🕊',
      '🦅',
      '🦆',
      '🦢',
      '🦉',
      '🦤',
      '🪶',
      '🦩',
      '🦚',
      '🦜',
    ],
    'animal-amphibian': ['🐸'],
    'animal-reptile': ['🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖'],
    'animal-marine': [
      '🐳',
      '🐋',
      '🐬',
      '🦭',
      '🐟',
      '🐠',
      '🐡',
      '🦈',
      '🐙',
      '🐚',
      '🪸',
    ],
    'animal-bug': [
      '🐌',
      '🦋',
      '🐛',
      '🐜',
      '🐝',
      '🪲',
      '🐞',
      '🦗',
      '🪳',
      '🕷',
      '🕸',
      '🦂',
      '🦟',
      '🪰',
      '🪱',
      '🦠',
    ],
    'plant-flower': [
      '💐',
      '🌸',
      '💮',
      '🪷',
      '🏵',
      '🌹',
      '🥀',
      '🌺',
      '🌻',
      '🌼',
      '🌷',
    ],
    'plant-other': [
      '🌱',
      '🪴',
      '🌲',
      '🌳',
      '🌴',
      '🌵',
      '🌾',
      '🌿',
      '☘',
      '🍀',
      '🍁',
      '🍂',
      '🍃',
      '🪹',
      '🪺',
    ],
  },
  'Food & Drink': {
    'food-fruit': [
      '🍇',
      '🍈',
      '🍉',
      '🍊',
      '🍋',
      '🍌',
      '🍍',
      '🥭',
      '🍎',
      '🍏',
      '🍐',
      '🍑',
      '🍒',
      '🍓',
      '🫐',
      '🥝',
      '🍅',
      '🫒',
      '🥥',
    ],
    'food-vegetable': [
      '🥑',
      '🍆',
      '🥔',
      '🥕',
      '🌽',
      '🌶',
      '🫑',
      '🥒',
      '🥬',
      '🥦',
      '🧄',
      '🧅',
      '🍄',
      '🥜',
      '🫘',
      '🌰',
    ],
    'food-prepared': [
      '🍞',
      '🥐',
      '🥖',
      '🫓',
      '🥨',
      '🥯',
      '🥞',
      '🧇',
      '🧀',
      '🍖',
      '🍗',
      '🥩',
      '🥓',
      '🍔',
      '🍟',
      '🍕',
      '🌭',
      '🥪',
      '🌮',
      '🌯',
      '🫔',
      '🥙',
      '🧆',
      '🥚',
      '🍳',
      '🥘',
      '🍲',
      '🫕',
      '🥣',
      '🥗',
      '🍿',
      '🧈',
      '🧂',
      '🥫',
    ],
    'food-asian': [
      '🍱',
      '🍘',
      '🍙',
      '🍚',
      '🍛',
      '🍜',
      '🍝',
      '🍠',
      '🍢',
      '🍣',
      '🍤',
      '🍥',
      '🥮',
      '🍡',
      '🥟',
      '🥠',
      '🥡',
    ],
    'food-marine': ['🦀', '🦞', '🦐', '🦑', '🦪'],
    'food-sweet': [
      '🍦',
      '🍧',
      '🍨',
      '🍩',
      '🍪',
      '🎂',
      '🍰',
      '🧁',
      '🥧',
      '🍫',
      '🍬',
      '🍭',
      '🍮',
      '🍯',
    ],
    drink: [
      '🍼',
      '🥛',
      '☕',
      '🫖',
      '🍵',
      '🍶',
      '🍾',
      '🍷',
      '🍸',
      '🍹',
      '🍺',
      '🍻',
      '🥂',
      '🥃',
      '🫗',
      '🥤',
      '🧋',
      '🧃',
      '🧉',
      '🧊',
    ],
    dishware: ['🥢', '🍽', '🍴', '🥄', '🔪', '🫙', '🏺'],
  },
  'Travel & Places': {
    'place-map': ['🌍', '🌎', '🌏', '🌐', '🗺', '🗾', '🧭'],
    'place-geographic': ['🏔', '⛰', '🌋', '🗻', '🏕', '🏖', '🏜', '🏝', '🏞'],
    'place-building': [
      '🏟',
      '🏛',
      '🏗',
      '🧱',
      '🪨',
      '🪵',
      '🛖',
      '🏘',
      '🏚',
      '🏠',
      '🏡',
      '🏢',
      '🏣',
      '🏤',
      '🏥',
      '🏦',
      '🏨',
      '🏩',
      '🏪',
      '🏫',
      '🏬',
      '🏭',
      '🏯',
      '🏰',
      '💒',
      '🗼',
      '🗽',
    ],
    'place-religious': ['⛪', '🕌', '🛕', '🕍', '⛩', '🕋'],
    'place-other': [
      '⛲',
      '⛺',
      '🌁',
      '🌃',
      '🏙',
      '🌄',
      '🌅',
      '🌆',
      '🌇',
      '🌉',
      '♨',
      '🎠',
      '🛝',
      '🎡',
      '🎢',
      '💈',
      '🎪',
    ],
    'transport-ground': [
      '🚂',
      '🚃',
      '🚄',
      '🚅',
      '🚆',
      '🚇',
      '🚈',
      '🚉',
      '🚊',
      '🚝',
      '🚞',
      '🚋',
      '🚌',
      '🚍',
      '🚎',
      '🚐',
      '🚑',
      '🚒',
      '🚓',
      '🚔',
      '🚕',
      '🚖',
      '🚗',
      '🚘',
      '🚙',
      '🛻',
      '🚚',
      '🚛',
      '🚜',
      '🏎',
      '🏍',
      '🛵',
      '🦽',
      '🦼',
      '🛺',
      '🚲',
      '🛴',
      '🛹',
      '🛼',
      '🚏',
      '🛣',
      '🛤',
      '🛢',
      '⛽',
      '🛞',
      '🚨',
      '🚥',
      '🚦',
      '🛑',
      '🚧',
    ],
    'transport-water': ['⚓', '🛟', '⛵', '🛶', '🚤', '🛳', '⛴', '🛥', '🚢'],
    'transport-air': [
      '✈',
      '🛩',
      '🛫',
      '🛬',
      '🪂',
      '💺',
      '🚁',
      '🚟',
      '🚠',
      '🚡',
      '🛰',
      '🚀',
      '🛸',
    ],
    hotel: ['🛎', '🧳'],
    time: [
      '⌛',
      '⏳',
      '⌚',
      '⏰',
      '⏱',
      '⏲',
      '🕰',
      '🕛',
      '🕧',
      '🕐',
      '🕜',
      '🕑',
      '🕝',
      '🕒',
      '🕞',
      '🕓',
      '🕟',
      '🕔',
      '🕠',
      '🕕',
      '🕡',
      '🕖',
      '🕢',
      '🕗',
      '🕣',
      '🕘',
      '🕤',
      '🕙',
      '🕥',
      '🕚',
      '🕦',
    ],
    'sky & weather': [
      '🌑',
      '🌒',
      '🌓',
      '🌔',
      '🌕',
      '🌖',
      '🌗',
      '🌘',
      '🌙',
      '🌚',
      '🌛',
      '🌜',
      '🌡',
      '☀',
      '🌝',
      '🌞',
      '🪐',
      '⭐',
      '🌟',
      '🌠',
      '🌌',
      '☁',
      '⛅',
      '⛈',
      '🌤',
      '🌥',
      '🌦',
      '🌧',
      '🌨',
      '🌩',
      '🌪',
      '🌫',
      '🌬',
      '🌀',
      '🌈',
      '🌂',
      '☂',
      '☔',
      '⛱',
      '⚡',
      '❄',
      '☃',
      '⛄',
      '☄',
      '🔥',
      '💧',
      '🌊',
    ],
  },
  Activites: {
    event: [
      '🎃',
      '🎄',
      '🎆',
      '🎇',
      '🧨',
      '✨',
      '🎈',
      '🎉',
      '🎊',
      '🎋',
      '🎍',
      '🎎',
      '🎏',
      '🎐',
      '🎑',
      '🧧',
      '🎀',
      '🎁',
      '🎗',
      '🎟',
      '🎫',
    ],
    'award-medal': ['🎖', '🏆', '🏅', '🥇', '🥈', '🥉'],
    sport: [
      '⚽',
      '⚾',
      '🥎',
      '🏀',
      '🏐',
      '🏈',
      '🏉',
      '🎾',
      '🥏',
      '🎳',
      '🏏',
      '🏑',
      '🏒',
      '🥍',
      '🏓',
      '🏸',
      '🥊',
      '🥋',
      '🥅',
      '⛳',
      '⛸',
      '🎣',
      '🤿',
      '🎽',
      '🎿',
      '🛷',
      '🥌',
    ],
    game: [
      '🎯',
      '🪀',
      '🪁',
      '🎱',
      '🔮',
      '🪄',
      '🧿',
      '🪬',
      '🎮',
      '🕹',
      '🎰',
      '🎲',
      '🧩',
      '🧸',
      '🪅',
      '🪩',
      '🪆',
      '♠',
      '♥',
      '♦',
      '♣',
      '♟',
      '🃏',
      '🀄',
      '🎴',
    ],
    'arts & crafts': ['🎭', '🖼', '🎨', '🧵', '🪡', '🧶', '🪢'],
  },
  Objects: {
    clothing: [
      '👓',
      '🕶',
      '🥽',
      '🥼',
      '🦺',
      '👔',
      '👕',
      '👖',
      '🧣',
      '🧤',
      '🧥',
      '🧦',
      '👗',
      '👘',
      '🥻',
      '🩱',
      '🩲',
      '🩳',
      '👙',
      '👚',
      '👛',
      '👜',
      '👝',
      '🛍',
      '🎒',
      '🩴',
      '👞',
      '👟',
      '🥾',
      '🥿',
      '👠',
      '👡',
      '🩰',
      '👢',
      '👑',
      '👒',
      '🎩',
      '🎓',
      '🧢',
      '🪖',
      '⛑',
      '📿',
      '💄',
      '💍',
      '💎',
    ],
    sound: ['🔇', '🔈', '🔉', '🔊', '📢', '📣', '📯', '🔔', '🔕'],
    music: ['🎼', '🎵', '🎶', '🎙', '🎚', '🎛', '🎤', '🎧', '📻'],
    'musical-instrument': [
      '🎷',
      '🪗',
      '🎸',
      '🎹',
      '🎺',
      '🎻',
      '🪕',
      '🥁',
      '🪘',
    ],
    phone: ['📱', '📲', '☎', '📞', '📟', '📠'],
    computer: [
      '🔋',
      '🪫',
      '🔌',
      '💻',
      '🖥',
      '🖨',
      '⌨',
      '🖱',
      '🖲',
      '💽',
      '💾',
      '💿',
      '📀',
      '🧮',
    ],
    'light & video': [
      '🎥',
      '🎞',
      '📽',
      '🎬',
      '📺',
      '📷',
      '📸',
      '📹',
      '📼',
      '🔍',
      '🔎',
      '🕯',
      '💡',
      '🔦',
      '🏮',
      '🪔',
    ],
    'book-paper': [
      '📔',
      '📕',
      '📖',
      '📗',
      '📘',
      '📙',
      '📚',
      '📓',
      '📒',
      '📃',
      '📜',
      '📄',
      '📰',
      '🗞',
      '📑',
      '🔖',
      '🏷',
    ],
    money: ['💰', '🪙', '💴', '💵', '💶', '💷', '💸', '💳', '🧾', '💹'],
    mail: [
      '✉',
      '📧',
      '📨',
      '📩',
      '📤',
      '📥',
      '📦',
      '📫',
      '📪',
      '📬',
      '📭',
      '📮',
      '🗳',
    ],
    writing: ['✏', '✒', '🖋', '🖊', '🖌', '🖍', '📝'],
    office: [
      '💼',
      '📁',
      '📂',
      '🗂',
      '📅',
      '📆',
      '🗒',
      '🗓',
      '📇',
      '📈',
      '📉',
      '📊',
      '📋',
      '📌',
      '📍',
      '📎',
      '🖇',
      '📏',
      '📐',
      '✂',
      '🗃',
      '🗄',
      '🗑',
    ],
    lock: ['🔒', '🔓', '🔏', '🔐', '🔑', '🗝'],
    tool: [
      '🔨',
      '🪓',
      '⛏',
      '⚒',
      '🛠',
      '🗡',
      '⚔',
      '🔫',
      '🪃',
      '🏹',
      '🛡',
      '🪚',
      '🔧',
      '🪛',
      '🔩',
      '⚙',
      '🗜',
      '⚖',
      '🦯',
      '🔗',
      '⛓',
      '🪝',
      '🧰',
      '🧲',
      '🪜',
    ],
    science: ['⚗', '🧪', '🧫', '🧬', '🔬', '🔭', '📡'],
    medical: ['💉', '🩸', '💊', '🩹', '🩼', '🩺', '🩻'],
    household: [
      '🚪',
      '🛗',
      '🪞',
      '🪟',
      '🛏',
      '🛋',
      '🪑',
      '🚽',
      '🪠',
      '🚿',
      '🛁',
      '🪤',
      '🪒',
      '🧴',
      '🧷',
      '🧹',
      '🧺',
      '🧻',
      '🪣',
      '🧼',
      '🫧',
      '🪥',
      '🧽',
      '🧯',
      '🛒',
    ],
    'other-object': ['🚬', '⚰', '🪦', '⚱', '🗿', '🪧', '🪪'],
  },
  Symbols: {
    'transport-sign': [
      '🏧',
      '🚮',
      '🚰',
      '♿',
      '🚹',
      '🚺',
      '🚻',
      '🚼',
      '🚾',
      '🛂',
      '🛃',
      '🛄',
      '🛅',
    ],
    warning: [
      '⚠',
      '🚸',
      '⛔',
      '🚫',
      '🚳',
      '🚭',
      '🚯',
      '🚱',
      '🚷',
      '📵',
      '🔞',
      '☢',
      '☣',
    ],
    arrow: [
      '⬆',
      '↗',
      '➡',
      '↘',
      '⬇',
      '↙',
      '⬅',
      '↖',
      '↕',
      '↔',
      '↩',
      '↪',
      '⤴',
      '⤵',
      '🔃',
      '🔄',
      '🔙',
      '🔚',
      '🔛',
      '🔜',
      '🔝',
    ],
    religion: ['🛐', '⚛', '🕉', '✡', '☸', '☯', '✝', '☦', '☪', '☮', '🕎', '🔯'],
    zodiac: [
      '♈',
      '♉',
      '♊',
      '♋',
      '♌',
      '♍',
      '♎',
      '♏',
      '♐',
      '♑',
      '♒',
      '♓',
      '⛎',
    ],
    'av-symbol': [
      '🔀',
      '🔁',
      '🔂',
      '▶',
      '⏩',
      '⏭',
      '⏯',
      '◀',
      '⏪',
      '⏮',
      '🔼',
      '⏫',
      '🔽',
      '⏬',
      '⏸',
      '⏹',
      '⏺',
      '⏏',
      '🎦',
      '🔅',
      '🔆',
      '📶',
      '📳',
      '📴',
    ],
    gender: ['♀', '♂', '⚧'],
    math: ['✖', '➕', '➖', '➗', '🟰', '♾'],
    punctuation: ['‼', '⁉', '❓', '❔', '❕', '❗', '〰'],
    currency: ['💱', '💲'],
    'other-symbol': [
      '⚕',
      '♻',
      '⚜',
      '🔱',
      '📛',
      '🔰',
      '⭕',
      '✅',
      '☑',
      '✔',
      '❌',
      '❎',
      '➰',
      '➿',
      '〽',
      '✳',
      '✴',
      '❇',
      '©',
      '®',
      '™',
    ],
    keycap: [
      '#️⃣',
      '*️⃣',
      '0️⃣',
      '1️⃣',
      '2️⃣',
      '3️⃣',
      '4️⃣',
      '5️⃣',
      '6️⃣',
      '7️⃣',
      '8️⃣',
      '9️⃣',
      '🔟',
    ],
    alphanum: [
      '🔠',
      '🔡',
      '🔢',
      '🔣',
      '🔤',
      '🅰',
      '🆎',
      '🅱',
      '🆑',
      '🆒',
      '🆓',
      'ℹ',
      '🆔',
      'Ⓜ',
      '🆕',
      '🆖',
      '🅾',
      '🆗',
      '🅿',
      '🆘',
      '🆙',
      '🆚',
      '🈁',
      '🈂',
      '🈷',
      '🈶',
      '🈯',
      '🉐',
      '🈹',
      '🈚',
      '🈲',
      '🉑',
      '🈸',
      '🈴',
      '🈳',
      '㊗',
      '㊙',
      '🈺',
      '🈵',
    ],
    geometric: [
      '🔴',
      '🟠',
      '🟡',
      '🟢',
      '🔵',
      '🟣',
      '🟤',
      '⚫',
      '⚪',
      '🟥',
      '🟧',
      '🟨',
      '🟩',
      '🟦',
      '🟪',
      '🟫',
      '⬛',
      '⬜',
      '◼',
      '◻',
      '◾',
      '◽',
      '▪',
      '▫',
      '🔶',
      '🔷',
      '🔸',
      '🔹',
      '🔺',
      '🔻',
      '💠',
      '🔘',
      '🔳',
      '🔲',
    ],
  },
  Flags: {
    flag: ['🏁', '🚩', '🎌', '🏴', '🏳', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️'],
    'country-flag': [
      '🇦🇨',
      '🇦🇩',
      '🇦🇪',
      '🇦🇫',
      '🇦🇬',
      '🇦🇮',
      '🇦🇱',
      '🇦🇲',
      '🇦🇴',
      '🇦🇶',
      '🇦🇷',
      '🇦🇸',
      '🇦🇹',
      '🇦🇺',
      '🇦🇼',
      '🇦🇽',
      '🇦🇿',
      '🇧🇦',
      '🇧🇧',
      '🇧🇩',
      '🇧🇪',
      '🇧🇫',
      '🇧🇬',
      '🇧🇭',
      '🇧🇮',
      '🇧🇯',
      '🇧🇱',
      '🇧🇲',
      '🇧🇳',
      '🇧🇴',
      '🇧🇶',
      '🇧🇷',
      '🇧🇸',
      '🇧🇹',
      '🇧🇻',
      '🇧🇼',
      '🇧🇾',
      '🇧🇿',
      '🇨🇦',
      '🇨🇨',
      '🇨🇩',
      '🇨🇫',
      '🇨🇬',
      '🇨🇭',
      '🇨🇮',
      '🇨🇰',
      '🇨🇱',
      '🇨🇲',
      '🇨🇳',
      '🇨🇴',
      '🇨🇵',
      '🇨🇷',
      '🇨🇺',
      '🇨🇻',
      '🇨🇼',
      '🇨🇽',
      '🇨🇾',
      '🇨🇿',
      '🇩🇪',
      '🇩🇬',
      '🇩🇯',
      '🇩🇰',
      '🇩🇲',
      '🇩🇴',
      '🇩🇿',
      '🇪🇦',
      '🇪🇨',
      '🇪🇪',
      '🇪🇬',
      '🇪🇭',
      '🇪🇷',
      '🇪🇸',
      '🇪🇹',
      '🇪🇺',
      '🇫🇮',
      '🇫🇯',
      '🇫🇰',
      '🇫🇲',
      '🇫🇴',
      '🇫🇷',
      '🇬🇦',
      '🇬🇧',
      '🇬🇩',
      '🇬🇪',
      '🇬🇫',
      '🇬🇬',
      '🇬🇭',
      '🇬🇮',
      '🇬🇱',
      '🇬🇲',
      '🇬🇳',
      '🇬🇵',
      '🇬🇶',
      '🇬🇷',
      '🇬🇸',
      '🇬🇹',
      '🇬🇺',
      '🇬🇼',
      '🇬🇾',
      '🇭🇰',
      '🇭🇲',
      '🇭🇳',
      '🇭🇷',
      '🇭🇹',
      '🇭🇺',
      '🇮🇨',
      '🇮🇩',
      '🇮🇪',
      '🇮🇱',
      '🇮🇲',
      '🇮🇳',
      '🇮🇴',
      '🇮🇶',
      '🇮🇷',
      '🇮🇸',
      '🇮🇹',
      '🇯🇪',
      '🇯🇲',
      '🇯🇴',
      '🇯🇵',
      '🇰🇪',
      '🇰🇬',
      '🇰🇭',
      '🇰🇮',
      '🇰🇲',
      '🇰🇳',
      '🇰🇵',
      '🇰🇷',
      '🇰🇼',
      '🇰🇾',
      '🇰🇿',
      '🇱🇦',
      '🇱🇧',
      '🇱🇨',
      '🇱🇮',
      '🇱🇰',
      '🇱🇷',
      '🇱🇸',
      '🇱🇹',
      '🇱🇺',
      '🇱🇻',
      '🇱🇾',
      '🇲🇦',
      '🇲🇨',
      '🇲🇩',
      '🇲🇪',
      '🇲🇫',
      '🇲🇬',
      '🇲🇭',
      '🇲🇰',
      '🇲🇱',
      '🇲🇲',
      '🇲🇳',
      '🇲🇴',
      '🇲🇵',
      '🇲🇶',
      '🇲🇷',
      '🇲🇸',
      '🇲🇹',
      '🇲🇺',
      '🇲🇻',
      '🇲🇼',
      '🇲🇽',
      '🇲🇾',
      '🇲🇿',
      '🇳🇦',
      '🇳🇨',
      '🇳🇪',
      '🇳🇫',
      '🇳🇬',
      '🇳🇮',
      '🇳🇱',
      '🇳🇴',
      '🇳🇵',
      '🇳🇷',
      '🇳🇺',
      '🇳🇿',
      '🇴🇲',
      '🇵🇦',
      '🇵🇪',
      '🇵🇫',
      '🇵🇬',
      '🇵🇭',
      '🇵🇰',
      '🇵🇱',
      '🇵🇲',
      '🇵🇳',
      '🇵🇷',
      '🇵🇸',
      '🇵🇹',
      '🇵🇼',
      '🇵🇾',
      '🇶🇦',
      '🇷🇪',
      '🇷🇴',
      '🇷🇸',
      '🇷🇺',
      '🇷🇼',
      '🇸🇦',
      '🇸🇧',
      '🇸🇨',
      '🇸🇩',
      '🇸🇪',
      '🇸🇬',
      '🇸🇭',
      '🇸🇮',
      '🇸🇯',
      '🇸🇰',
      '🇸🇱',
      '🇸🇲',
      '🇸🇳',
      '🇸🇴',
      '🇸🇷',
      '🇸🇸',
      '🇸🇹',
      '🇸🇻',
      '🇸🇽',
      '🇸🇾',
      '🇸🇿',
      '🇹🇦',
      '🇹🇨',
      '🇹🇩',
      '🇹🇫',
      '🇹🇬',
      '🇹🇭',
      '🇹🇯',
      '🇹🇰',
      '🇹🇱',
      '🇹🇲',
      '🇹🇳',
      '🇹🇴',
      '🇹🇷',
      '🇹🇹',
      '🇹🇻',
      '🇹🇼',
      '🇹🇿',
      '🇺🇦',
      '🇺🇬',
      '🇺🇲',
      '🇺🇳',
      '🇺🇸',
      '🇺🇾',
      '🇺🇿',
      '🇻🇦',
      '🇻🇨',
      '🇻🇪',
      '🇻🇬',
      '🇻🇮',
      '🇻🇳',
      '🇻🇺',
      '🇼🇫',
      '🇼🇸',
      '🇽🇰',
      '🇾🇪',
      '🇾🇹',
      '🇿🇦',
      '🇿🇲',
      '🇿🇼',
    ],
    'subdivision-flag': ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🏴󠁧󠁢󠁷󠁬󠁳󠁿'],
  },
};

export function getRandomEmoji(categories: EmojiCategory[]): string {
  const random = (array: string[]): string =>
    array[~~(Math.random() * array.length)];

  let cat = categories[~~(Math.random() * categories.length)];

  if (!emojis[cat]) cat = random(Object.keys(emojis)) as EmojiCategory;

  const sub = random(Object.keys(emojis[cat]));

  return random(emojis[cat][sub]);
}
