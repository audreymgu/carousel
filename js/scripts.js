window.onload = function() {
  KeyBinder();
}

function KeyBinder() {

  // Invoking the command palette

  // Keyboard
  Mousetrap.bind('ctrl+space', function() {
    let launcher = document.querySelector('.launcher');
    launcher.innerHTML = "";
    launcher.classList.remove('filled');
    if (launcher.classList.contains('hidden')) {
      console.log('CTRL + SPACE - Accessed Application Launcher.');
    } else {
      console.log('CTRL + SPACE - Dismissed Application Launcher.');
    }
    launcher.classList.toggle('hidden');
    launcher.classList.add('kb');
  });

  // Trackpad LTR
  Mousetrap.bind('ctrl+1', function() {
    let launcher = document.querySelector('.launcher');
    let indicator = document.querySelector('.indicator-bar.left');
    launcher.innerHTML = "";
    launcher.classList.remove('filled', 'kb', 'ltr', 'rtl', 'ttb', 'btt');
    if (launcher.classList.contains('hidden')) {
      console.log('CTRL + 1 - Accessed Application Launcher.');
    } else {
      console.log('CTRL + 1 - Dismissed Application Launcher.');
    }
    launcher.classList.toggle('hidden');
    launcher.classList.add('ltr');
    indicator.classList.toggle('hidden');
  });

  // Trackpad RTL
  Mousetrap.bind('ctrl+2', function() {
    let launcher = document.querySelector('.launcher');
    let indicator = document.querySelector('.indicator-bar.right');
    launcher.innerHTML = "";
    launcher.classList.remove('filled', 'kb', 'ltr', 'rtl', 'ttb', 'btt');
    if (launcher.classList.contains('hidden')) {
      console.log('CTRL + 2 - Accessed Application Launcher.');
    } else {
      console.log('CTRL + 2 - Dismissed Application Launcher.');
    }
    launcher.classList.toggle('hidden');
    launcher.classList.add('rtl');
    indicator.classList.toggle('hidden');
  });

  // Trackpad TTB
  Mousetrap.bind('ctrl+3', function() {
    let launcher = document.querySelector('.launcher');
    let indicator = document.querySelector('.indicator-bar.top');
    launcher.innerHTML = "";
    launcher.classList.remove('filled', 'kb', 'ltr', 'rtl', 'ttb', 'btt');
    if (launcher.classList.contains('hidden')) {
      console.log('CTRL + 3 - Accessed Application Launcher.');
    } else {
      console.log('CTRL + 3 - Dismissed Application Launcher.');
    }
    launcher.classList.toggle('hidden');
    launcher.classList.add('ttb');
    indicator.classList.toggle('hidden');
  });

  // Trackpad BTT
  Mousetrap.bind('ctrl+4', function() {
    let launcher = document.querySelector('.launcher');
    let indicator = document.querySelector('.indicator-bar.bottom');
    launcher.innerHTML = "";
    launcher.classList.remove('filled', 'kb', 'ltr', 'rtl', 'ttb', 'btt');
    if (launcher.classList.contains('hidden')) {
      console.log('CTRL + 4 - Accessed Application Launcher.');
    } else {
      console.log('CTRL + 4 - Dismissed Application Launcher.');
    }
    launcher.classList.toggle('hidden');
    launcher.classList.add('btt');
    indicator.classList.toggle('hidden');
  });

  // Launching from the command palette
  Mousetrap.bind('enter', function() {
    let launcher = document.querySelector('.launcher');
    launcher.innerHTML = "";
    if (!launcher.classList.contains('hidden') && launcher.classList.contains('filled')) {
      if (launcher.classList.contains('kb')) {
        console.log('Spawn a new node here.')
      } else if (launcher.classList.contains('ltr')) {
        Tiler('left');
        let indicator = document.querySelector('.indicator-bar.left');
        indicator.classList.toggle('hidden');
        console.log('RETURN - Launched Application, Left Edge.');
      } else if (launcher.classList.contains('rtl')) {
        Tiler('right');
        let indicator = document.querySelector('.indicator-bar.right');
        indicator.classList.toggle('hidden');
        console.log('RETURN - Launched Application, Right Edge.');
      } else if (launcher.classList.contains('ttb')) {
        Tiler('top');
        let indicator = document.querySelector('.indicator-bar.top');
        indicator.classList.toggle('hidden');
        console.log('RETURN - Launched Application, Top Edge.');
      } else if (launcher.classList.contains('btt')) {
        Tiler('bottom');
        let indicator = document.querySelector('.indicator-bar.bottom');
        indicator.classList.toggle('hidden');
        console.log('RETURN - Launched Application, Bottom Edge.');
      }
    } else if (!launcher.classList.contains('hidden') && !launcher.classList.contains('filled')) {
      console.log('RETURN - Dismissed Launcher.');
    }

    launcher.classList.toggle('hidden');
  });


  Mousetrap.bind('ctrl+enter', function() {
    console.log('Opened Terminal window.');
  });

  // Simulated Text
  Mousetrap.bind('t', function() {
    console.log('t - Simulated Text Input.');
    let launcher = document.querySelector('.launcher');
    let simText = document.createTextNode('lorem ipsum ');
    let simWrapper = document.createElement('p');
    simWrapper.classList.add('launcher-text');
    simWrapper.appendChild(simText);
    launcher.appendChild(simWrapper);
    launcher.classList.add('filled');
  });

}

function Tiler(edge) {

  // Get current active tile, as well as its parent
  let active = document.querySelector('.tile-active');
  let activeParent = active.parentNode;

  // Turn off active state for original focused tile
  active.classList.remove('tile-active');

  // Spawn new tile
  let spawn = active.cloneNode(true);

  // Randomize icon
  let icon = spawn.childNodes[0];
  let seed = Math.floor(Math.random() * 3) + 1;
    icon.setAttribute('src', 'img/icon'+seed+'.svg');

  // Make new tile active
  spawn.classList.add('tile-active');

  // Generate containers to accomodate the new partition layout
  let activeContainer = document.createElement('div');
  let spawnContainer = document.createElement('div');

  // Edge logic
  if (edge === 'top') {
    // Format containers
    activeContainer.classList.add('splitv');
    spawnContainer.classList.add('splitv');

    // Append tiles to new respective containers
    activeContainer.appendChild(active);
    spawnContainer.appendChild(spawn);

    // Append containers to original parent
    activeParent.appendChild(spawnContainer);
    activeParent.appendChild(activeContainer);

  } else if (edge === 'bottom') {
    // Format containers
    activeContainer.classList.add('splitv');
    spawnContainer.classList.add('splitv');

    // Append tiles to new respective containers
    activeContainer.appendChild(active);
    spawnContainer.appendChild(spawn);

    // Append containers to original parent
    activeParent.appendChild(activeContainer);
    activeParent.appendChild(spawnContainer);

  } else if (edge === 'left') {
    // Format containers
    activeContainer.classList.add('splith');
    spawnContainer.classList.add('splith');

    // Append tiles to new respective containers
    activeContainer.appendChild(active);
    spawnContainer.appendChild(spawn);

    // Append containers to original parent
    activeParent.appendChild(spawnContainer);
    activeParent.appendChild(activeContainer);

  } else if (edge === 'right') {
    // Format containers
    activeContainer.classList.add('splith');
    spawnContainer.classList.add('splith');

    // Append tiles to new respective containers
    activeContainer.appendChild(active);
    spawnContainer.appendChild(spawn);

    // Append containers to original parent
    activeParent.appendChild(activeContainer);
    activeParent.appendChild(spawnContainer);

  }

}
