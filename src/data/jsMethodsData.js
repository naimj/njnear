export const generalData = {
  fr: {
    heroTitle: "Méthodes JavaScript",
    heroSubtitle: "Toutes les méthodes de tableau que tu dois maîtriser.",
    heroDesc: "Définitions · Visuels · Exemples métier · Pièges · Questions d'entretien",
    stats: [
      { num: "22", label: "méthodes" },
      { num: "5", label: "catégories" },
      { num: "8", label: "live coding Q" },
      { num: "∞", label: "utilité" }
    ],
    categories: {
      manip: "Manipulation & Recherche",
      manipSub: "Immutable · Retourne nouveau tableau / valeur",
      transform: "Transformation",
      transformSub: "Puissant · Souvent demandé en entretien",
      modif: "Modification (mutables)",
      modifSub: "⚠ Mutent le tableau original",
      tri: "Tri",
      triSub: "⚠ Mutent le tableau · Comportement Unicode piégeux",
      other: "Fusion & Parcours",
      otherSub: "Immutable (concat) · Effets de bord (forEach)"
    },
    commonTraps: "⚠ Pièges fréquents",
    tableTitle: "Tableau récapitulatif",
    tableHeaders: ["Méthode", "Retourne quoi ?", "Modifie ?", "Utilisation principale"],
    tableYes: "Oui ⚠",
    tableNo: "Non",
    liveCodingTitle: "Questions de live coding fréquentes",
    liveCodingSub: "Souvent posées en entretien Senior",
    mustKnowTitle: "À connaître par cœur — Senior",
    mustKnowSub: "Les 8 incontournables",
    footerText: "// JavaScript Array Methods — Senior Front-End Interview Guide · ES2015–ES2023 · 22 méthodes · 8 live coding patterns"
  },
  en: {
    heroTitle: "JavaScript Array Methods",
    heroSubtitle: "All the array methods you must master for front-end interviews.",
    heroDesc: "Definitions · Visuals · Real-world examples · Traps · Interview questions",
    stats: [
      { num: "22", label: "methods" },
      { num: "5", label: "categories" },
      { num: "8", label: "live coding Q" },
      { num: "∞", label: "utility" }
    ],
    categories: {
      manip: "Manipulation & Search",
      manipSub: "Immutable · Returns a new array / value",
      transform: "Transformation",
      transformSub: "Powerful · Often asked in interviews",
      modif: "Modification (mutable)",
      modifSub: "⚠ Mutate the original array",
      tri: "Sorting",
      triSub: "⚠ Mutate the array · Tricky Unicode behavior",
      other: "Merge & Iteration",
      otherSub: "Immutable (concat) · Side effects (forEach)"
    },
    commonTraps: "⚠ Common traps",
    tableTitle: "Recap Table",
    tableHeaders: ["Method", "Returns what?", "Mutates?", "Main usage"],
    tableYes: "Yes ⚠",
    tableNo: "No",
    liveCodingTitle: "Common Live Coding Questions",
    liveCodingSub: "Often asked in Senior interviews",
    mustKnowTitle: "Must Know by Heart — Senior",
    mustKnowSub: "The 8 Essentials",
    footerText: "// JavaScript Array Methods — Senior Front-End Interview Guide · ES2015–ES2023 · 22 methods · 8 live coding patterns"
  }
};

export const methodsList = [
  // SECTION 1: MANIPULATION
  {
    id: "map",
    category: "manip",
    name: "map()",
    tag: "→ new Array",
    color: "yellow",
    visual: {
      label: { fr: "Avant → Après", en: "Before → After" },
      input: [1, 2, 3],
      process: "→ n×2 →",
      output: [2, 4, 6]
    },
    definition: {
      fr: "Transforme chaque élément et retourne un nouveau tableau de même longueur.",
      en: "Transforms each element and returns a new array of the same length."
    },
    examples: [
      {
        label: { fr: "Exemple simple", en: "Simple example" },
        code: `const numbers = [1, 2, 3]\nconst result = numbers.map(n => n * 2)`,
        result: "[2, 4, 6]"
      },
      {
        label: { fr: "Exemple métier — transformer réponse API", en: "Real-world example — transform API response" },
        code: `const users = [\n  { id: 1, name: 'Naim', role: 'admin' },\n  { id: 2, name: 'John', role: 'user'  }\n]\nconst labels = users.map(u => ({\n  value: u.id,\n  label: \`\${u.name} (\${u.role})\`\n}))`,
        result: "[{ value:1, label:'Naim (admin)' }, { value:2, label:'John (user)' }]"
      }
    ],
    traps: {
      fr: [
        "map() retourne toujours un array — ne pas l'utiliser si on n'utilise pas le résultat (→ forEach)",
        "Oublier le return dans une fonction non-fléchée à accolades",
        "Ne modifie pas le tableau original — penser à affecter le résultat"
      ],
      en: [
        "map() always returns an array — do not use it if you do not use the result (→ forEach)",
        "Forgetting the return in a non-arrow function with curly braces",
        "Does not modify the original array — remember to assign the result"
      ]
    },
    interview: {
      q: {
        fr: "Quand utiliser map() plutôt que forEach() ?",
        en: "When to use map() instead of forEach()?"
      },
      a: {
        fr: "map() quand on veut un nouveau tableau transformé. forEach() pour les effets de bord sans récupérer de valeur.",
        en: "map() when you want a new transformed array. forEach() for side effects without retrieving a value."
      }
    },
    recapUsage: {
      fr: "Transformer chaque élément",
      en: "Transform each element"
    },
    recapReturn: {
      fr: "Nouveau tableau (même longueur)",
      en: "New array (same length)"
    },
    mutates: false
  },
  {
    id: "filter",
    category: "manip",
    name: "filter()",
    tag: "→ new Array (subset)",
    color: "yellow",
    visual: {
      label: { fr: "Avant → Après (garde pair)", en: "Before → After (keep even)" },
      input: [1, 2, 3, 4, 5],
      process: "→ n%2=0 →",
      removed: [1, 3, 5],
      output: [2, 4]
    },
    definition: {
      fr: "Retourne un nouveau tableau avec seulement les éléments qui passent le test (retournent true).",
      en: "Returns a new array with only the elements that pass the test (return true)."
    },
    examples: [
      {
        label: { fr: "Exemple simple", en: "Simple example" },
        code: `const nums = [1, 2, 3, 4, 5]\nconst evens = nums.filter(n => n % 2 === 0)`,
        result: "[2, 4]"
      },
      {
        label: { fr: "Exemple métier — filtrer produits actifs en stock", en: "Real-world example — filter active products in stock" },
        code: `const products = [\n  { id: 1, active: true,  stock: 5  },\n  { id: 2, active: false, stock: 10 },\n  { id: 3, active: true,  stock: 0  }\n]\nconst available = products.filter(\n  p => p.active && p.stock > 0\n)`,
        result: "[{ id:1, active:true, stock:5 }]"
      }
    ],
    traps: {
      fr: [
        "filter(Boolean) filtre les valeurs falsy — comportement parfois surprenant avec 0",
        "Ne pas confondre avec find() qui retourne un seul élément, pas un tableau"
      ],
      en: [
        "filter(Boolean) filters falsy values — sometimes surprising behavior with 0",
        "Do not confuse with find() which returns a single element, not an array"
      ]
    },
    interview: {
      q: {
        fr: "Comment supprimer les doublons avec filter() ?",
        en: "How to remove duplicates with filter()?"
      },
      a: {
        fr: "arr.filter((v, i, a) => a.indexOf(v) === i) — ou plus moderne : [...new Set(arr)]",
        en: "arr.filter((v, i, a) => a.indexOf(v) === i) — or more modern: [...new Set(arr)]"
      }
    },
    recapUsage: {
      fr: "Conserver les éléments qui passent un test",
      en: "Keep elements that pass a test"
    },
    recapReturn: {
      fr: "Nouveau tableau (sous-ensemble)",
      en: "New array (subset)"
    },
    mutates: false
  },
  {
    id: "find",
    category: "manip",
    name: "find()",
    tag: "→ Element | undefined",
    color: "yellow",
    visual: {
      label: { fr: "S'arrête au premier match", en: "Stops at first match" },
      input: [3, 7, 12, 18],
      process: "→ >10 →",
      highlight: [12],
      output: [12],
      isSingle: true
    },
    definition: {
      fr: "Retourne le premier élément qui satisfait la condition, ou undefined si aucun.",
      en: "Returns the first element that satisfies the condition, or undefined if none."
    },
    examples: [
      {
        label: { fr: "Exemple simple", en: "Simple example" },
        code: `const arr = [3, 7, 12, 18]\nconst first = arr.find(n => n > 10)`,
        result: "12"
      },
      {
        label: { fr: "Exemple métier — récupérer un user par ID", en: "Real-world example — retrieve a user by ID" },
        code: `const getUser = (id) =>\n  users.find(u => u.id === id)\n\nconst current = getUser(42)`,
        result: "{ id: 42, name: '...', ... } ou undefined"
      }
    ],
    traps: {
      fr: [
        "Retourne undefined si aucun match — toujours gérer ce cas",
        "Ne retourne que le premier — utiliser filter() si plusieurs résultats attendus"
      ],
      en: [
        "Returns undefined if no match — always handle this case",
        "Only returns the first one — use filter() if multiple results are expected"
      ]
    },
    interview: {
      q: {
        fr: "Différence entre find() et filter() ?",
        en: "Difference between find() and filter()?"
      },
      a: {
        fr: "find() retourne le premier élément (ou undefined). filter() retourne un nouveau tableau avec tous les matches.",
        en: "find() returns the first element (or undefined). filter() returns a new array with all matches."
      }
    },
    recapUsage: {
      fr: "Premier élément correspondant",
      en: "First matching element"
    },
    recapReturn: {
      fr: "Élément | undefined",
      en: "Element | undefined"
    },
    mutates: false
  },
  {
    id: "findIndex",
    category: "manip",
    name: "findIndex()",
    tag: "→ number (-1 si absent)",
    color: "yellow",
    visual: {
      label: { fr: "Index du premier match", en: "Index of first match" },
      indexes: [0, 1, 2],
      input: [5, 12, 18],
      process: "→ >15 →",
      highlight: [18],
      output: [2],
      isSingle: true
    },
    definition: {
      fr: "Retourne l'index du premier élément qui passe le test, ou -1 si aucun.",
      en: "Returns the index of the first element that passes the test, or -1 if none."
    },
    examples: [
      {
        label: { fr: "Exemple métier — mise à jour en place dans un store", en: "Real-world example — in-place update in a store" },
        code: `const idx = cart.findIndex(item => item.id === productId)\nif (idx !== -1) {\n  cart[idx] = { ...cart[idx], quantity: newQty }\n}`,
        result: "index (number) ou -1"
      }
    ],
    traps: {
      fr: [
        "Toujours vérifier !== -1 avant d'accéder à l'index",
        "indexOf() compare par référence — findIndex() permet une comparaison custom"
      ],
      en: [
        "Always check !== -1 before accessing the index",
        "indexOf() compares by reference — findIndex() allows a custom comparison"
      ]
    },
    interview: {
      q: {
        fr: "Quand préférer findIndex() à indexOf() ?",
        en: "When to prefer findIndex() over indexOf()?"
      },
      a: {
        fr: "Pour des objets ou conditions complexes. indexOf() ne fonctionne qu'avec des primitives (comparaison stricte).",
        en: "For complex objects or conditions. indexOf() only works with primitives (strict comparison)."
      }
    },
    recapUsage: {
      fr: "Index du premier élément correspondant",
      en: "Index of first matching element"
    },
    recapReturn: {
      fr: "number (-1 si absent)",
      en: "number (-1 si absent)"
    },
    mutates: false
  },
  {
    id: "some",
    category: "manip",
    name: "some()",
    tag: "→ boolean",
    color: "yellow",
    visual: {
      label: { fr: "Au moins un > 10 ?", en: "At least one > 10?" },
      input: [2, 5, 15, 20],
      process: "→",
      highlight: [15],
      output: ["true"],
      isSingle: true
    },
    definition: {
      fr: "Retourne true si au moins un élément passe le test. Court-circuite dès le premier match.",
      en: "Returns true if at least one element passes the test. Short-circuits at the first match."
    },
    examples: [
      {
        label: { fr: "Exemple métier — vérifier si un panier contient des promos", en: "Real-world example — check if a cart contains discounts" },
        code: `const hasPromo = cart.some(item => item.discount > 0)\nif (hasPromo) showPromoBanner()`,
        result: "true | false"
      }
    ],
    traps: {
      fr: [
        "some([]) sur tableau vide retourne false — cas à gérer",
        "Ne pas confondre some() (au moins un) avec every() (tous)"
      ],
      en: [
        "some([]) on an empty array returns false — case to handle",
        "Do not confuse some() (at least one) with every() (all)"
      ]
    },
    interview: {
      q: {
        fr: "Différence entre some() et every() ?",
        en: "Difference between some() and every()?"
      },
      a: {
        fr: "some() = OU logique (au moins un true). every() = ET logique (tous true). Tous deux court-circuitent.",
        en: "some() = logical OR (at least one true). every() = logical AND (all true). Both short-circuit."
      }
    },
    recapUsage: {
      fr: "Au moins un élément passe le test",
      en: "At least one element passes the test"
    },
    recapReturn: {
      fr: "boolean",
      en: "boolean"
    },
    mutates: false
  },
  {
    id: "every",
    category: "manip",
    name: "every()",
    tag: "→ boolean",
    color: "yellow",
    visual: {
      label: { fr: "Tous positifs ?", en: "All positive?" },
      input: [2, 5, -1],
      process: "→ >0 →",
      highlight: [-1],
      output: ["false"],
      isSingle: true,
      hasError: true
    },
    definition: {
      fr: "Retourne true si tous les éléments passent le test. Retourne false au premier échec.",
      en: "Returns true if all elements pass the test. Returns false at the first failure."
    },
    examples: [
      {
        label: { fr: "Exemple métier — valider un formulaire multi-champs", en: "Real-world example — validate a multi-field form" },
        code: `const isFormValid = fields.every(\n  f => f.value.trim().length > 0 && !f.error\n)\nsubmitBtn.disabled = !isFormValid`,
        result: "true | false"
      }
    ],
    traps: {
      fr: [
        "every([]) sur tableau vide retourne true (vacuously true) — comportement contre-intuitif"
      ],
      en: [
        "every([]) on an empty array returns true (vacuously true) — counter-intuitive behavior"
      ]
    },
    interview: {
      q: {
        fr: "every([]) retourne quoi et pourquoi ?",
        en: "What does every([]) return and why?"
      },
      a: {
        fr: "true — 'vérité vacuouse' : si aucun élément ne contredit la condition, elle est considérée vraie.",
        en: "true — 'vacuous truth': if no element contradicts the condition, it is considered true."
      }
    },
    recapUsage: {
      fr: "Tous les éléments passent le test",
      en: "All elements pass the test"
    },
    recapReturn: {
      fr: "boolean",
      en: "boolean"
    },
    mutates: false
  },
  {
    id: "includes",
    category: "manip",
    name: "includes()",
    tag: "→ boolean",
    color: "yellow",
    visual: {
      label: { fr: "Contient 'admin' ?", en: "Contains 'admin'?" },
      input: ["user", "admin", "guest"],
      process: "→",
      highlight: ["admin"],
      output: ["true"],
      isSingle: true,
      isLargeCell: true
    },
    definition: {
      fr: "Vérifie si un tableau contient une valeur donnée (comparaison stricte SameValueZero).",
      en: "Checks if an array contains a given value (strict SameValueZero comparison)."
    },
    examples: [
      {
        label: { fr: "Exemple métier — contrôle d'accès par rôle", en: "Real-world example — role-based access control" },
        code: `const ALLOWED_ROLES = ['admin', 'editor']\nconst canEdit = ALLOWED_ROLES.includes(currentUser.role)\nif (!canEdit) redirectTo('/403')`,
        result: "true | false"
      }
    ],
    traps: {
      fr: [
        "Ne fonctionne pas avec des objets (comparaison par référence) — utiliser some() à la place",
        "includes(NaN) retourne true — contrairement à indexOf() qui utilise ==="
      ],
      en: [
        "Does not work with objects (comparison by reference) — use some() instead",
        "includes(NaN) returns true — unlike indexOf() which uses ==="
      ]
    },
    interview: {
      q: {
        fr: "Pourquoi includes(NaN) retourne true alors que indexOf(NaN) retourne -1 ?",
        en: "Why does includes(NaN) return true while indexOf(NaN) returns -1?"
      },
      a: {
        fr: "includes() utilise SameValueZero qui reconnaît NaN === NaN. indexOf() utilise === strict où NaN !== NaN.",
        en: "includes() uses SameValueZero which recognizes NaN === NaN. indexOf() uses strict === where NaN !== NaN."
      }
    },
    recapUsage: {
      fr: "Vérifier la présence d'une valeur",
      en: "Verify presence of a value"
    },
    recapReturn: {
      fr: "boolean",
      en: "boolean"
    },
    mutates: false
  },

  // SECTION 2: TRANSFORMATION
  {
    id: "reduce",
    category: "transform",
    name: "reduce()",
    tag: "→ any (accumulator)",
    color: "blue",
    visual: {
      label: { fr: "Accumulation gauche → droite", en: "Left → right accumulation" },
      rawText: {
        fr: "acc=0  +1→  acc=1  +2→  acc=3  +3→  6",
        en: "acc=0  +1→  acc=1  +2→  acc=3  +3→  6"
      }
    },
    definition: {
      fr: "Réduit le tableau à une seule valeur en accumulant les éléments un par un.",
      en: "Reduces the array to a single value by accumulating elements one by one."
    },
    examples: [
      {
        label: { fr: "Exemple simple — somme", en: "Simple example — sum" },
        code: `const sum = [1,2,3].reduce((acc, n) => acc + n, 0)`,
        result: "6"
      },
      {
        label: { fr: "Exemple métier — grouper des commandes par statut", en: "Real-world example — group orders by status" },
        code: `const grouped = orders.reduce((acc, order) => {\n  const key = order.status\n  if (!acc[key]) acc[key] = []\n  acc[key].push(order)\n  return acc\n}, {})`,
        result: "{ pending: [...], shipped: [...], delivered: [...] }"
      }
    ],
    traps: {
      fr: [
        "Oublier la valeur initiale (2e arg) — peut causer des bugs silencieux sur tableau vide",
        "Oublier le return acc à la fin de chaque itération",
        "Muter l'accumulateur directement au lieu de retourner une nouvelle valeur"
      ],
      en: [
        "Forgetting the initial value (2nd arg) — can cause silent bugs on empty arrays",
        "Forgetting the return acc at the end of each iteration",
        "Mutating the accumulator directly instead of returning a new value"
      ]
    },
    interview: {
      q: {
        fr: "Implémenter map() et filter() avec uniquement reduce()",
        en: "Implement map() and filter() using only reduce()"
      },
      a: {
        fr: "map: (arr,fn) => arr.reduce((a,v) => [...a, fn(v)], [])\nfilter: (arr,fn) => arr.reduce((a,v) => fn(v) ? [...a,v] : a, [])",
        en: "map: (arr,fn) => arr.reduce((a,v) => [...a, fn(v)], [])\nfilter: (arr,fn) => arr.reduce((a,v) => fn(v) ? [...a,v] : a, [])"
      }
    },
    recapUsage: {
      fr: "Agréger, grouper, transformer en tout",
      en: "Aggregate, group, transform into anything"
    },
    recapReturn: {
      fr: "Valeur quelconque (accumulateur)",
      en: "Any value (accumulator)"
    },
    mutates: false
  },
  {
    id: "flat",
    category: "transform",
    name: "flat()",
    tag: "→ new Array (aplati)",
    color: "blue",
    visual: {
      label: { fr: "Aplatissement depth=1", en: "Flattening depth=1" },
      rawText: {
        fr: "[1, [2, 3], [4, [5]]]  →  [1, 2, 3, 4, [5]]",
        en: "[1, [2, 3], [4, [5]]]  →  [1, 2, 3, 4, [5]]"
      }
    },
    definition: {
      fr: "Aplatit un tableau imbriqué jusqu'à la profondeur spécifiée (1 par défaut).",
      en: "Flattens a nested array up to the specified depth (default is 1)."
    },
    examples: [
      {
        label: { fr: "Exemple métier — aplatir des résultats paginés", en: "Real-world example — flatten paginated results" },
        code: `const pages = [[{id:1},{id:2}], [{id:3}]]\nconst allItems = pages.flat()\n// flat(Infinity) pour imbrication profonde`,
        result: "[{ id:1 }, { id:2 }, { id:3 }]"
      }
    ],
    traps: {
      fr: [
        "flat() n'aplatit qu'un seul niveau par défaut — passer Infinity pour tout aplatir",
        "Supprime les trous (holes) dans les tableaux épars"
      ],
      en: [
        "flat() only flattens one level by default — pass Infinity to flatten everything",
        "Removes holes in sparse arrays"
      ]
    },
    interview: {
      q: {
        fr: "Comment aplatir complètement un tableau profondément imbriqué ?",
        en: "How to completely flatten a deeply nested array?"
      },
      a: {
        fr: "arr.flat(Infinity) — ou récursivement avec reduce + concat si vieux environnement.",
        en: "arr.flat(Infinity) — or recursively with reduce + concat in older environments."
      }
    },
    recapUsage: {
      fr: "Aplatir tableau imbriqué",
      en: "Flatten nested array"
    },
    recapReturn: {
      fr: "Nouveau tableau aplati",
      en: "New flattened array"
    },
    mutates: false
  },
  {
    id: "flatMap",
    category: "transform",
    name: "flatMap()",
    tag: "→ map() + flat(1)",
    color: "blue",
    visual: {
      label: { fr: "map + flat en une fois", en: "map + flat in one pass" },
      rawText: {
        fr: "[1, 2, 3]  → n→[n,n*2] →  [1, 2, 2, 4, 3, 6]",
        en: "[1, 2, 3]  → n→[n,n*2] →  [1, 2, 2, 4, 3, 6]"
      }
    },
    definition: {
      fr: "Combine map() et flat(1) en une seule passe — plus performant que les deux chaînés.",
      en: "Combines map() and flat(1) in a single pass — more performant than chaining both."
    },
    examples: [
      {
        label: { fr: "Exemple métier — extraire tous les tags de posts", en: "Real-world example — extract all tags from posts" },
        code: `const posts = [\n  { title: 'A', tags: ['js', 'react'] },\n  { title: 'B', tags: ['node', 'js'] }\n]\nconst allTags = posts.flatMap(p => p.tags)`,
        result: "['js', 'react', 'node', 'js']"
      }
    ],
    traps: {
      fr: [
        "flatMap() n'aplatit que d'un niveau — pas équivalent à map().flat(Infinity)",
        "Pour filtrer ET transformer, retourner [] pour exclure : arr.flatMap(v => condition ? [result] : [])"
      ],
      en: [
        "flatMap() only flattens one level — not equivalent to map().flat(Infinity)",
        "To filter AND transform, return [] to exclude: arr.flatMap(v => condition ? [result] : [])"
      ]
    },
    interview: {
      q: {
        fr: "Quand utiliser flatMap() au lieu de map().flat() ?",
        en: "When to use flatMap() instead of map().flat()?"
      },
      a: {
        fr: "flatMap() est plus lisible et légèrement plus performant (un seul passage). Utiliser quand le callback retourne des tableaux.",
        en: "flatMap() is cleaner and slightly more performant (single pass). Use when the callback returns arrays."
      }
    },
    recapUsage: {
      fr: "Mapper + aplatir en une passe",
      en: "Map + flatten in one pass"
    },
    recapReturn: {
      fr: "Nouveau tableau (map + flat 1)",
      en: "New array (map + flat 1)"
    },
    mutates: false
  },

  // SECTION 3: MUTABLES (MODIFICATION)
  {
    id: "push",
    category: "modif",
    name: "push()",
    tag: "→ nouvelle longueur",
    color: "coral",
    visual: {
      label: { fr: "Ajout en fin", en: "Add to end" },
      input: ["A", "B"],
      process: "→ push(C) →",
      highlight: ["C"],
      output: ["A", "B", "C"]
    },
    definition: {
      fr: "Ajoute un ou plusieurs éléments à la fin du tableau. Retourne la nouvelle longueur.",
      en: "Adds one or more elements to the end of the array. Returns the new length."
    },
    examples: [
      {
        label: { fr: "Exemple métier — ajouter au panier", en: "Real-world example — add to cart" },
        code: `const cart = [...]\ncart.push({ id: productId, qty: 1 })\n// Dans React : setState([...cart, newItem]) — immuable!`,
        result: "Retourne la longueur (ex: 3). Mute le tableau."
      }
    ],
    traps: {
      fr: [
        "Mute le tableau — ne pas utiliser directement dans un state React/Redux",
        "push() retourne la longueur, pas le tableau — ne pas chaîner"
      ],
      en: [
        "Mutates the array — do not use directly in React/Redux state",
        "push() returns the length, not the array — do not chain"
      ]
    },
    interview: {
      q: {
        fr: "Comment ajouter en fin sans muter (immutable) ?",
        en: "How to add to the end without mutating (immutable)?"
      },
      a: {
        fr: "[...arr, newItem] ou arr.concat(newItem) — retourne un nouveau tableau.",
        en: "[...arr, newItem] or arr.concat(newItem) — returns a new array."
      }
    },
    recapUsage: {
      fr: "Ajouter en fin",
      en: "Add to end"
    },
    recapReturn: {
      fr: "Nouvelle longueur",
      en: "New length"
    },
    mutates: true
  },
  {
    id: "pop",
    category: "modif",
    name: "pop()",
    tag: "→ element retiré",
    color: "coral",
    visual: {
      label: { fr: "Suppression en fin", en: "Remove from end" },
      input: ["A", "B"],
      highlight: ["C"],
      process: "→ pop() →",
      output: ["A", "B"],
      rawText: { fr: "retourne C", en: "returns C" }
    },
    definition: {
      fr: "Supprime et retourne le dernier élément du tableau. Mute le tableau.",
      en: "Removes and returns the last element of the array. Mutates the array."
    },
    examples: [
      {
        label: { fr: "Exemple métier — undo / historique", en: "Real-world example — undo / history" },
        code: `const last = historyStack.pop()\nrevertTo(last)`,
        result: "L'élément retiré (undefined si tableau vide)"
      }
    ],
    traps: {
      fr: [
        "pop() sur tableau vide retourne undefined sans erreur",
        "Mute le tableau — utiliser slice(0, -1) pour l'immutabilité"
      ],
      en: [
        "pop() on an empty array returns undefined without throwing an error",
        "Mutates the array — use slice(0, -1) for immutability"
      ]
    },
    interview: {
      q: {
        fr: "Comment implémenter une pile (Stack) avec des array methods ?",
        en: "How to implement a Stack with array methods?"
      },
      a: {
        fr: "push() pour empiler, pop() pour dépiler. O(1) pour les deux opérations.",
        en: "push() to push, pop() to pop. O(1) for both operations."
      }
    },
    recapUsage: {
      fr: "Supprimer le dernier",
      en: "Remove last item"
    },
    recapReturn: {
      fr: "Élément retiré",
      en: "Removed element"
    },
    mutates: true
  },
  {
    id: "shift",
    category: "modif",
    name: "shift()",
    tag: "→ premier élément",
    color: "coral",
    visual: {
      label: { fr: "Suppression en tête — O(n)", en: "Remove from start — O(n)" },
      highlight: ["A"],
      input: ["B", "C"],
      process: "→ shift() →",
      output: ["B", "C"]
    },
    definition: {
      fr: "Supprime et retourne le premier élément. Tous les autres décalent d'un index vers la gauche.",
      en: "Removes and returns the first element. All other elements shift one index to the left."
    },
    examples: [
      {
        label: { fr: "Exemple métier — traiter une file de tâches (Queue)", en: "Real-world example — process a task queue" },
        code: `const queue = [task1, task2, task3]\nconst next = queue.shift()\nprocess(next)`,
        result: "Le premier élément retiré. undefined si vide."
      }
    ],
    traps: {
      fr: [
        "O(n) — réindexe tous les éléments. Éviter sur de grands tableaux en boucle"
      ],
      en: [
        "O(n) — reindexes all elements. Avoid in loops on large arrays"
      ]
    },
    interview: {
      q: {
        fr: "push + shift vs push + pop : quelle structure ?",
        en: "push + shift vs push + pop: which structure?"
      },
      a: {
        fr: "push + shift = Queue (FIFO). push + pop = Stack (LIFO).",
        en: "push + shift = Queue (FIFO). push + pop = Stack (LIFO)."
      }
    },
    recapUsage: {
      fr: "Supprimer le premier (Queue)",
      en: "Remove first item (Queue)"
    },
    recapReturn: {
      fr: "Premier élément retiré",
      en: "First removed element"
    },
    mutates: true
  },
  {
    id: "unshift",
    category: "modif",
    name: "unshift()",
    tag: "→ nouvelle longueur",
    color: "coral",
    visual: {
      label: { fr: "Ajout en tête — O(n)", en: "Add to start — O(n)" },
      input: ["B", "C"],
      process: "→ unshift(A) →",
      highlight: ["A"],
      output: ["A", "B", "C"]
    },
    definition: {
      fr: "Ajoute un ou plusieurs éléments au début du tableau. Retourne la nouvelle longueur.",
      en: "Adds one or more elements to the beginning of the array. Returns the new length."
    },
    examples: [
      {
        label: { fr: "Exemple métier — breadcrumb, ajouter en premier", en: "Real-world example — breadcrumb, prepend item" },
        code: `breadcrumbs.unshift({ label: 'Home', href: '/' })\n// Immuable : const updated = [home, ...breadcrumbs]`,
        result: "La nouvelle longueur du tableau."
      }
    ],
    traps: {
      fr: [
        "O(n) comme shift() — réindexe tout. Préférer [newItem, ...arr] en React"
      ],
      en: [
        "O(n) like shift() — reindexes everything. Prefer [newItem, ...arr] in React"
      ]
    },
    interview: {
      q: {
        fr: "Alternative immutable à unshift() ?",
        en: "Immutable alternative to unshift()?"
      },
      a: {
        fr: "[newElement, ...arr] via the spread operator — O(n) aussi mais crée un nouveau tableau.",
        en: "[newElement, ...arr] via the spread operator — also O(n) but creates a new array."
      }
    },
    recapUsage: {
      fr: "Ajouter en début",
      en: "Add to start"
    },
    recapReturn: {
      fr: "Nouvelle longueur",
      en: "New length"
    },
    mutates: true
  },
  {
    id: "splice",
    category: "modif",
    name: "splice()",
    tag: "→ éléments supprimés[]",
    color: "coral",
    visual: {
      label: { fr: "splice(1, 1, 'X') — remplace index 1", en: "splice(1, 1, 'X') — replace index 1" },
      input: ["A"],
      highlight: ["B"],
      input2: ["C"],
      process: "→",
      output: ["A"],
      highlight2: ["X"],
      output2: ["C"]
    },
    definition: {
      fr: "Ajoute, retire ou remplace des éléments à un index précis. Mute le tableau original.",
      en: "Adds, removes, or replaces elements at a specific index. Mutates the original array."
    },
    examples: [
      {
        label: { fr: "Exemple métier — supprimer un item d'une liste", en: "Real-world example — delete an item from a list" },
        code: `const idx = items.findIndex(i => i.id === targetId)\nif (idx !== -1) items.splice(idx, 1)\n// Immutable : items.filter(i => i.id !== targetId)`,
        result: "Tableau des éléments supprimés. Mute l'original."
      }
    ],
    traps: {
      fr: [
        "splice(start, 0, item) insère sans supprimer — le 2e argument est le count, pas l'end",
        "Mute le tableau — dangereux dans un state immutable (Redux, React)",
        "Ne pas confondre avec slice() qui est immutable"
      ],
      en: [
        "splice(start, 0, item) inserts without deleting — the 2nd argument is the count, not the end",
        "Mutates the array — dangerous in immutable states (Redux, React)",
        "Do not confuse with slice() which is immutable"
      ]
    },
    interview: {
      q: {
        fr: "splice() vs slice() — différence principale ?",
        en: "splice() vs slice() — main difference?"
      },
      a: {
        fr: "splice() mute le tableau (supprime/insère). slice() retourne une copie d'une portion sans muter.",
        en: "splice() mutates the array (deletes/inserts). slice() returns a copy of a section without mutating."
      }
    },
    recapUsage: {
      fr: "Insérer / supprimer à un index",
      en: "Insert / delete at index"
    },
    recapReturn: {
      fr: "Tableau des éléments supprimés",
      en: "Array of deleted elements"
    },
    mutates: true
  },
  {
    id: "slice",
    category: "modif",
    name: "slice()",
    tag: "→ new Array (copie)",
    color: "coral",
    visual: {
      label: { fr: "slice(1, 3) — indices 1 et 2", en: "slice(1, 3) — indices 1 and 2" },
      input: ["A"],
      highlight: ["B", "C"],
      input2: ["D"],
      process: "→",
      output: ["B", "C"]
    },
    definition: {
      fr: "Retourne une copie superficielle d'une portion du tableau sans modifier l'original.",
      en: "Returns a shallow copy of a portion of the array without modifying the original."
    },
    examples: [
      {
        label: { fr: "Exemple métier — pagination", en: "Real-world example — pagination" },
        code: `const paginate = (arr, page, size) =>\n  arr.slice((page - 1) * size, page * size)\n\npaginate(users, 2, 10) // users 10→19`,
        result: "Nouveau tableau. L'original est intact."
      }
    ],
    traps: {
      fr: [
        "slice(-1) retourne le dernier élément — pratique mais peut dérouter",
        "Copie superficielle (shallow) — les objets imbriqués sont partagés par référence"
      ],
      en: [
        "slice(-1) returns the last element — handy but can be confusing",
        "Shallow copy — nested objects are shared by reference"
      ]
    },
    interview: {
      q: {
        fr: "Comment cloner un tableau avec slice() ?",
        en: "How to clone an array with slice()?"
      },
      a: {
        fr: "arr.slice() ou arr.slice(0) — shallow copy. Pour deep copy : structuredClone(arr) ou JSON.parse(JSON.stringify(arr)).",
        en: "arr.slice() or arr.slice(0) — shallow copy. For deep copy: structuredClone(arr) or JSON.parse(JSON.stringify(arr))."
      }
    },
    recapUsage: {
      fr: "Extraire une plage (pagination, clone)",
      en: "Extract a range (pagination, clone)"
    },
    recapReturn: {
      fr: "Copie d'une portion",
      en: "Copy of a section"
    },
    mutates: false
  },
  {
    id: "fill",
    category: "modif",
    name: "fill()",
    tag: "→ tableau muté",
    color: "coral",
    visual: {
      label: { fr: "fill(0, 1, 3)", en: "fill(0, 1, 3)" },
      input: [1],
      highlight: [2, 3],
      input2: [4],
      process: "→",
      output: [1],
      highlight2: [0, 0],
      output2: [4]
    },
    definition: {
      fr: "Remplace tous les éléments (ou une plage) par une valeur statique. Mute et retourne le tableau.",
      en: "Fills elements with a static value. Mutates and returns the array."
    },
    examples: [
      {
        label: { fr: "Exemple métier — initialiser une grille", en: "Real-world example — initialize a grid" },
        code: `const grid = new Array(9).fill(null)\n// [null,null,null,null,null,null,null,null,null]\n// ⚠ new Array(3).fill({}) — même référence objet!`,
        result: "Le tableau modifié (référence identique)."
      }
    ],
    traps: {
      fr: [
        "fill({}) remplit avec la même référence objet — mutations partagées. Utiliser Array.from({length:n}, () => ({}))"
      ],
      en: [
        "fill({}) fills with the same object reference — shared mutations. Use Array.from({length:n}, () => ({}))"
      ]
    },
    interview: {
      q: {
        fr: "Comment initialiser un tableau de N objets distincts ?",
        en: "How to initialize an array of N distinct objects?"
      },
      a: {
        fr: "Array.from({ length: N }, () => ({ ... })) — chaque appel crée un nouvel objet.",
        en: "Array.from({ length: N }, () => ({ ... })) — each call creates a new object."
      }
    },
    recapUsage: {
      fr: "Initialiser avec une valeur",
      en: "Initialize with a value"
    },
    recapReturn: {
      fr: "Tableau muté",
      en: "Mutated array"
    },
    mutates: true
  },

  // SECTION 4: TRI
  {
    id: "sort",
    category: "tri",
    name: "sort()",
    tag: "→ tableau trié (muté)",
    color: "green",
    visual: {
      label: { fr: "Sans callback → conversion string !", en: "Without callback → string conversion!" },
      input: [10, 1, 9],
      process: "→ .sort() →",
      highlight: [1, 10, 9],
      output: [1, 10, 9],
      rawText: { fr: "⚠ Bug!", en: "⚠ Bug!" }
    },
    definition: {
      fr: "Trie le tableau en place selon une fonction de comparaison. Sans callback, compare les strings Unicode.",
      en: "Sorts the array in place according to a comparison function. Without a callback, compares Unicode strings."
    },
    examples: [
      {
        label: { fr: "Exemple métier — tri alphabétique avec localeCompare", en: "Real-world example — alphabetical sort with localeCompare" },
        code: `// ✓ Tri numérique correct\nprices.sort((a, b) => a - b)\n\n// ✓ Tri alphabétique insensible à la casse\nusers.sort((a, b) =>\n  a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })\n)\n\n// ✓ Immutable (ES2023)\nconst sorted = [...arr].sort(...) // ou arr.toSorted()`,
        result: "Tableau trié (même référence, muté)."
      }
    ],
    traps: {
      fr: [
        "[10, 1, 9].sort() → [1, 10, 9] car tri lexicographique par défaut",
        "Mute le tableau — toujours copier avant de trier ([...arr].sort())",
        "sort() n'est pas garanti stable avant ES2019 (Chrome 70+)"
      ],
      en: [
        "[10, 1, 9].sort() → [1, 10, 9] due to lexicographical sort by default",
        "Mutates the array — always copy before sorting ([...arr].sort())",
        "sort() is not guaranteed to be stable before ES2019 (Chrome 70+)"
      ]
    },
    interview: {
      q: {
        fr: "Pourquoi [1, 10, 9].sort() ne trie pas correctement ?",
        en: "Why does [1, 10, 9].sort() not sort correctly?"
      },
      a: {
        fr: "Sans callback, sort() convertit en string. '10' < '9' lexicographiquement car '1' < '9'. Toujours passer (a,b)=> a-b pour les nombres.",
        en: "Without a callback, sort() converts to string. '10' < '9' lexicographically because '1' < '9'. Always pass (a,b)=> a-b for numbers."
      }
    },
    recapUsage: {
      fr: "Trier (toujours avec comparaison custom)",
      en: "Sort (always with custom comparison)"
    },
    recapReturn: {
      fr: "Tableau trié (même référence)",
      en: "Sorted array (same reference)"
    },
    mutates: true
  },
  {
    id: "reverse",
    category: "tri",
    name: "reverse()",
    tag: "→ tableau inversé (muté)",
    color: "green",
    visual: {
      label: { fr: "Inversion en place", en: "Reverse in place" },
      input: ["A", "B", "C"],
      process: "→ reverse() →",
      output: ["C", "B", "A"]
    },
    definition: {
      fr: "Inverse l'ordre des éléments en place. Retourne le tableau muté (même référence).",
      en: "Reverses the order of elements in place. Returns the mutated array (same reference)."
    },
    examples: [
      {
        label: { fr: "Exemple métier — afficher un historique récent en premier", en: "Real-world example — display recent history first" },
        code: `const recent = [...activity].reverse()\n// ES2023 immutable :\nconst recent = activity.toReversed()`,
        result: "Tableau inversé (même référence)."
      }
    ],
    traps: {
      fr: [
        "Mute le tableau original — penser à copier d'abord avec [...arr]",
        "const arr = original.reverse() — arr ET original pointent vers le même tableau muté"
      ],
      en: [
        "Mutates the original array — remember to copy first with [...arr]",
        "const arr = original.reverse() — both arr and original point to the same mutated array"
      ]
    },
    interview: {
      q: {
        fr: "Comment inverser un tableau sans muter l'original ?",
        en: "How to reverse an array without mutating the original?"
      },
      a: {
        fr: "[...arr].reverse() ou arr.toReversed() (ES2023). toReversed() est la version moderne recommandée.",
        en: "[...arr].reverse() or arr.toReversed() (ES2023). toReversed() is the recommended modern version."
      }
    },
    recapUsage: {
      fr: "Inverser l'ordre",
      en: "Reverse order"
    },
    recapReturn: {
      fr: "Tableau inversé (même référence)",
      en: "Reversed array (same reference)"
    },
    mutates: true
  },

  // SECTION 5: FUSION & PARCOURS
  {
    id: "concat",
    category: "other",
    name: "concat()",
    tag: "→ new Array fusionné",
    color: "purple",
    visual: {
      label: { fr: "Fusion immutable", en: "Immutable merge" },
      input: ["A", "B"],
      process: "+",
      input2: ["C", "D"],
      process2: "→",
      output: ["A", "B", "C", "D"]
    },
    definition: {
      fr: "Fusionne deux tableaux ou plus et retourne un nouveau tableau sans modifier les originaux.",
      en: "Merges two or more arrays and returns a new array without modifying the originals."
    },
    examples: [
      {
        label: { fr: "Exemple métier — fusionner résultats de recherche", en: "Real-world example — merge search results" },
        code: `const results = localResults.concat(apiResults)\n// Modern spread équivalent :\nconst results = [...localResults, ...apiResults]`,
        result: "Nouveau tableau fusionné. Les originaux sont intacts."
      }
    ],
    traps: {
      fr: [
        "concat() n'aplatit qu'un niveau — concat([[1,2]]) donne [[1,2]] pas [1,2]",
        "Le spread [...a, ...b] est plus lisible et moderne, mais concat() est légèrement plus rapide sur de grands tableaux"
      ],
      en: [
        "concat() only flattens one level — concat([[1,2]]) results in [[1,2]], not [1,2]",
        "The spread [...a, ...b] is cleaner and more modern, but concat() is slightly faster on large arrays"
      ]
    },
    interview: {
      q: {
        fr: "concat() vs spread operator pour fusionner des tableaux ?",
        en: "concat() vs spread operator to merge arrays?"
      },
      a: {
        fr: "Les deux sont immutables. Spread est plus lisible et supporte n'importe quel itérable. concat() peut être plus performant sur de très grands tableaux.",
        en: "Both are immutable. Spread is cleaner and supports any iterable. concat() can be more performant on very large arrays."
      }
    },
    recapUsage: {
      fr: "Fusionner des tableaux",
      en: "Merge arrays"
    },
    recapReturn: {
      fr: "Nouveau tableau fusionné",
      en: "New merged array"
    },
    mutates: false
  },
  {
    id: "forEach",
    category: "other",
    name: "forEach()",
    tag: "→ undefined (void)",
    color: "purple",
    visual: {
      label: { fr: "Parcours sans retour", en: "Iteration without return" },
      input: [1, 2, 3],
      process: "→ fn() →",
      output: ["undefined"],
      isSingle: true
    },
    definition: {
      fr: "Exécute une fonction pour chaque élément. Ne retourne rien — uniquement pour les effets de bord.",
      en: "Executes a function for each element. Returns nothing — only for side effects."
    },
    examples: [
      {
        label: { fr: "Exemple métier — enregistrer des events analytics", en: "Real-world example — track analytics events" },
        code: `completedActions.forEach(action => {\n  analytics.track(action.type, {\n    userId: currentUser.id,\n    timestamp: action.timestamp\n  })\n})`,
        result: "undefined — toujours. Ne peut pas être chaîné."
      }
    ],
    traps: {
      fr: [
        "Impossible de break ou return pour sortir — utiliser for...of si besoin",
        "Ne pas utiliser async/await dans forEach — les promesses ne sont pas attendues",
        "forEach retourne undefined — ne jamais tenter de chaîner .filter() après"
      ],
      en: [
        "Cannot break or return to exit — use for...of if needed",
        "Do not use async/await inside forEach — promises are not awaited",
        "forEach returns undefined — never try to chain .filter() afterwards"
      ]
    },
    interview: {
      q: {
        fr: "Pourquoi await dans forEach ne fonctionne pas ?",
        en: "Why doesn't await work inside forEach?"
      },
      a: {
        fr: "forEach n'attend pas les promesses retournées par le callback. Utiliser for...of avec await, ou Promise.all(arr.map(async fn)).",
        en: "forEach does not wait for promises returned by the callback. Use for...of with await, or Promise.all(arr.map(async fn))."
      }
    },
    recapUsage: {
      fr: "Effets de bord sans retour",
      en: "Side effects without return"
    },
    recapReturn: {
      fr: "undefined (void)",
      en: "undefined (void)"
    },
    mutates: false
  }
];

export const liveCodingQuestions = [
  {
    title: { fr: "Recherche utilisateur", en: "User Search" },
    icon: "🔍",
    color: "yellow",
    comment: { fr: "// Recherche insensible à la casse, multi-champs", en: "// Case-insensitive, multi-field search" },
    code: `const searchUsers = (users, query) => {\n  const q = query.toLowerCase()\n  return users.filter(u =>\n    u.name.toLowerCase().includes(q) ||\n    u.email.toLowerCase().includes(q)\n  )\n}`
  },
  {
    title: { fr: "Filtrage multi-critères", en: "Multi-Criteria Filtering" },
    icon: "🔧",
    color: "blue",
    comment: { fr: "// Filtres actifs dynamiques", en: "// Dynamic active filters" },
    code: `const applyFilters = (items, filters) =>\n  items.filter(item =>\n    Object.entries(filters).every(\n      ([key, val]) => !val || item[key] === val\n    )\n  )`
  },
  {
    title: { fr: "Tri alphabétique (robuste)", en: "Alphabetical Sort (Robust)" },
    icon: "🔤",
    color: "green",
    comment: { fr: "// Gère accents, casse, locale", en: "// Handles accents, case, locale" },
    code: `const sortByName = (arr, field) =>\n  [...arr].sort((a, b) =>\n    a[field].localeCompare(\n      b[field], 'fr',\n      { sensitivity: 'base' }\n    )\n  )`
  },
  {
    title: { fr: "Pagination", en: "Pagination" },
    icon: "📄",
    color: "coral",
    comment: { fr: "// Retourne page + metadata", en: "// Returns page + metadata" },
    code: `const paginate = (data, page=1, size=10) => ({\n  items:  data.slice((page-1)*size, page*size),\n  total:  data.length,\n  pages:  Math.ceil(data.length / size),\n  page\n})`
  },
  {
    title: { fr: "CRUD immutable (React/Redux)", en: "Immutable CRUD (React/Redux)" },
    icon: "✏️",
    color: "purple",
    comment: { fr: "// Create / Update / Delete sans mutation", en: "// Create / Update / Delete without mutation" },
    code: `const add    = (s, item) => [...s, item]\nconst update = (s, id, data) =>\n  s.map(i => i.id===id ? {...i,...data} : i)\nconst remove = (s, id) =>\n  s.filter(i => i.id !== id)`
  },
  {
    title: { fr: "Agrégation avec reduce", en: "Aggregation with reduce" },
    icon: "∑",
    color: "blue",
    comment: { fr: "// Panier → total, count, moyenne", en: "// Cart → total, count, average" },
    code: `const stats = cart.reduce((acc, item) => ({\n  total: acc.total + item.price * item.qty,\n  count: acc.count + item.qty,\n}), { total: 0, count: 0 })`
  },
  {
    title: { fr: "Groupement avec reduce", en: "Grouping with reduce" },
    icon: "📦",
    color: "green",
    comment: { fr: "// Grouper par clé dynamique", en: "// Group by dynamic key" },
    code: `const groupBy = (arr, key) =>\n  arr.reduce((acc, item) => {\n    (acc[item[key]] ??= []).push(item)\n    return acc\n  }, {})\n\n// groupBy(users, 'department')`
  },
  {
    title: { fr: "Transformation API → UI", en: "API → UI Transformation" },
    icon: "🔄",
    color: "yellow",
    comment: { fr: "// Normaliser + enrichir des données API", en: "// Normalize + enrich API data" },
    code: `const toViewModel = (apiData) =>\n  apiData\n    .filter(d => d.active)\n    .map((d, i) => ({\n      id:    d._id,\n      label: d.fullName ?? d.username,\n      index: i + 1\n    }))\n    .sort((a,b) => a.label.localeCompare(b.label))`
  }
];

export const mustKnowEssentials = [
  { name: "map()", color: "yellow", desc: { fr: "La base de toute transformation de données. Présente dans 90% des composants React.", en: "The foundation of data transformation. Used in 90% of React components." }, tip: "arr.map(fn) → new[]" },
  { name: "filter()", color: "yellow", desc: { fr: "Indispensable pour les listes filtrables, recherches, masquage de données.", en: "Essential for filterable lists, searches, data filtering." }, tip: "arr.filter(fn) → subset[]" },
  { name: "reduce()", color: "blue", desc: { fr: "Méthode la plus puissante — peut implémenter toutes les autres. Agrégation, groupement, normalisation.", en: "Most powerful method — can implement all others. Aggregation, grouping, normalization." }, tip: "arr.reduce(fn, init) → any" },
  { name: "find()", color: "yellow", desc: { fr: "Récupérer un objet par ID est le cas d'usage le plus fréquent dans tout frontend.", en: "Retrieving an object by ID is the most common use case in frontends." }, tip: "arr.find(fn) → el | undefined" },
  { name: "some()", color: "yellow", desc: { fr: "Guards, validations, feature flags — vérifier qu'au moins une condition est vraie.", en: "Guards, validations, feature flags — verify at least one condition is true." }, tip: "arr.some(fn) → boolean" },
  { name: "every()", color: "yellow", desc: { fr: "Validation de formulaires, permissions — s'assurer que toutes les conditions sont remplies.", en: "Form validation, permissions — ensure all conditions are met." }, tip: "arr.every(fn) → boolean" },
  { name: "sort()", color: "green", desc: { fr: "Toujours demandé en live coding. Maîtriser le comparateur, les pièges Unicode, l'immutabilité.", en: "Always asked in live coding. Master sorting function, Unicode traps, immutability." }, tip: "[...arr].sort((a,b)=>a-b)" },
  { name: "includes()", color: "yellow", desc: { fr: "Contrôle d'accès, feature flags, vérification de présence — simple mais piégeux avec NaN et objets.", en: "Access control, feature flags, presence checking — simple but tricky with NaN/objects." }, tip: "arr.includes(val) → boolean" }
];
