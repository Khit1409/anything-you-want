interface Variant {
  sku: string;
  extraPrice: number;
  stock: number;
  options: {
    [key: string]: string;
  };
  img?: string;
}
type Variants = Array<Variant>;
const classifications = [
  {
    name: 'color',
    values: [
      {
        name: 'White',
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        stock: 40,
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
];

function createProductVaritants() {
  const first = classifications[0];
  // color-white-39 ->index đầu map với các index khác.
  return classifications
    .filter((_, index) => index != 0)
    .reduce((variants: Variants, classification) => {
      classification.values.forEach((classificationValue) => {
        let count = 1;
        first.values.forEach((firstValue) => {
          variants.push({
            sku: `ST-${firstValue.name}-${classificationValue.name}-${count}`, //ST-WHITE-39,
            extraPrice: firstValue.extraPrice + classificationValue.extraPrice,
            options: {
              [first.name]: firstValue.name,
              [classification.name]: classificationValue.name,
            },
            stock: 10,
            img: '',
          });
          count++;
        });
      });
      return variants;
    }, []);
}

console.log(createProductVaritants());
