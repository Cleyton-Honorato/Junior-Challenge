enum EBearer {
  elves = 1,
  dwarves = 2,
  men = 3,
  saurs = 4,
}

const EBearerDict: Record<EBearer, string> = {
  [EBearer.elves]: 'Elfos',
  [EBearer.dwarves]: 'Anões',
  [EBearer.men]: 'Homens',
  [EBearer.saurs]: 'Sauros',
};

export { EBearer, EBearerDict };
