KNOWN_INTERFACES = {
  'cli-usage': ['Command Line (q2cli)', true],
  'galaxy-usage': ['Galaxy (q2galaxy)', true],
  'artifact-usage': ['Python 3 API (qiime2)', true],
  'raw-usage': ['View Source (qiime2.sdk)', false],
};

window.addEventListener('load', () => {
  showInterface(Object.keys(KNOWN_INTERFACES)[0]);

  const interfaceSelect = document.createElement('select');
  interfaceSelect.className = 'usage-sync';

  const interfaceOptGroup = document.createElement('optgroup');
  interfaceOptGroup.label = 'Interfaces';
  interfaceSelect.appendChild(interfaceOptGroup);

  const devOptGroup = document.createElement('optgroup');
  devOptGroup.label = 'For Developers';
  interfaceSelect.appendChild(devOptGroup);

  for (const [value, [text, is_interface]] of Object.entries(KNOWN_INTERFACES)) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    if (is_interface) {
      interfaceOptGroup.appendChild(opt);
    } else {
      devOptGroup.appendChild(opt);
    }
  };

  const anchorEls = document.querySelectorAll('span.usage-selector');
  if (anchorEls.length === 0) {
    const usageEls = document.querySelectorAll('.cli-usage, .artifact-usage, .galaxy-usage, .raw-usage');
    if (usageEls.length > 0) {
      const errorMsg = 'must include at least one `.. usage-selector::` directive';
      document.body.innerHTML = errorMsg;
    }
  }

  anchorEls.forEach((el) => {
    const selectNode = interfaceSelect.cloneNode(true);
    selectNode.addEventListener('change', (e) => showInterface(e.target.value));
    el.appendChild(selectNode);
  });

  const selectEls = document.querySelectorAll('span.usage-selector select');
  document.addEventListener('change', (e) => {
    const target = e.target;
    if (target.classList.contains('usage-sync')) {
      selectEls.forEach((sel) => sel.selectedIndex = target.selectedIndex);
    }
  });
});

function showInterface(interfaceName) {
  const knownInterfaceKeys = Object.keys(KNOWN_INTERFACES);
  if (!knownInterfaceKeys.includes(interfaceName)) { return };
  knownInterfaceKeys.forEach((el) => {
    const hidden = interfaceName !== el;
    document.querySelectorAll(`.${el}`).forEach((el) => el.hidden = hidden);
  });
}
