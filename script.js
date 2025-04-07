const convertType = document.getElementById('convert-type');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const input = document.getElementById('input');
const output = document.getElementById('output');

const unitOptions = {
  length: ['meters', 'feet'],
  weight: ['kilograms', 'pounds'],
  temperature: ['celsius', 'fahrenheit'],
};

function updateUnitOptions(type) {
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  unitOptions[type].forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit;
    option1.textContent = unit;
    fromUnit.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = unit;
    option2.textContent = unit;
    toUnit.appendChild(option2);
  });
  fromUnit.value = unitOptions[type][0];
  toUnit.value = unitOptions[type][1];
}

function convert() {
  const val = parseFloat(input.value);
  if (isNaN(val)) {
    output.value = '';
    return;
  }

  let result = 0;
  const from = fromUnit.value;
  const to = toUnit.value;

  switch (convertType.value) {
    case 'length':
      if (from === to) result = val;
      else if (from === 'meters') result = val * 3.28084;
      else result = val / 3.28084;
      break;

    case 'weight':
      if (from === to) result = val;
      else if (from === 'kilograms') result = val * 2.20462;
      else result = val / 2.20462;
      break;

    case 'temperature':
      if (from === to) result = val;
      else if (from === 'celsius') result = (val * 9/5) + 32;
      else result = (val - 32) * 5/9;
      break;
  }

  output.value = result.toFixed(2);
}

// Events
convertType.addEventListener('change', () => {
  updateUnitOptions(convertType.value);
  convert();
});

input.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);

// Init
updateUnitOptions(convertType.value);
