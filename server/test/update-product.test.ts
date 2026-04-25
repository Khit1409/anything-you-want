const oldClassifcations = [
  {
    name: 'color',
    values: [
      {
        name: 'White',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
      {
        name: 'Yellow',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
      {
        name: 'Red',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
    ],
  },
  {
    name: 'size',
    values: [
      {
        name: '39',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '40',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '41',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
    ],
  },
  {
    name: 'height',
    values: [
      {
        name: '139',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '140',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '141',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
    ],
  },
];

const updateClassification = [
  {
    name: 'weight',
    values: [
      {
        name: '10kg',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
      {
        name: '20kg',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
      {
        name: '30kg',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 50,
        extraPrice: 10000,
      },
    ],
  },
  {
    name: 'size',
    values: [
      {
        name: '42',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '40',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '41',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
      {
        name: '43',
        extraPrice: 10000,
        img: '',
        stock: 50,
      },
    ],
  },
];

const isNew = updateClassification.filter(
  (ft) => !oldClassifcations.find((flm) => flm.name === ft.name),
);

const updated = oldClassifcations.map((classifi) => {
  let result = { ...classifi };
  updateClassification.forEach((updateClassifi) => {
    if (result.name === updateClassifi.name) {
      result = { ...result, ...updateClassifi };
    }
  });
  return result;
});

const lastUpdate = updated.concat(isNew);

console.table(lastUpdate.map((last) => last.name));
