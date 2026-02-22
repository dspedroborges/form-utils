function initMasks() {
  document.querySelectorAll('input[mask]').forEach(input => {
    const pattern = input.getAttribute('mask');
    input.addEventListener('input', e => {
      const raw = e.target.value;
      let result = '', valueIndex = 0;
      for (let i = 0; i < pattern.length && valueIndex < raw.length; i++) {
        const p = pattern[i], c = raw[valueIndex];
        if (p === '9') { if (/\d/.test(c)) result += c; else i--; valueIndex++; }
        else if (p === 'A') { if (/[a-zA-Z]/.test(c)) result += c; else i--; valueIndex++; }
        else if (p === '*') { result += c; valueIndex++; }
        else { result += p; if (c === p) valueIndex++; }
      }
      e.target.value = result;
    });
  });
}

function initCaseTransform() {
  const transforms = {
    lowercase: v => v.toLowerCase(),
    uppercase: v => v.toUpperCase(),
    capitalize: v => v.replace(/\b\w/g, c => c.toUpperCase()),
  };
  Object.entries(transforms).forEach(([attr, fn]) => {
    document.querySelectorAll(`input[${attr}],textarea[${attr}]`).forEach(el => {
      el.addEventListener('input', () => { el.value = fn(el.value); });
    });
  });
}

function initFilePreviews() {
  document.querySelectorAll('input[type="file"]').forEach(input => {
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.style.marginTop = '4px';
    const wrapper = document.createElement('div');
    wrapper.style.marginTop = '4px';
    wrapper.appendChild(preview);
    input.parentNode.insertBefore(wrapper, input.nextSibling);

    input.addEventListener('change', () => {
      preview.innerHTML = '';
      Array.from(input.files).forEach(file => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        if (!isImage && !isVideo) return;
        const el = document.createElement(isImage ? 'img' : 'video');
        el.src = URL.createObjectURL(file);
        el.style.cssText = `max-width:${isImage ? 200 : 300}px;max-height:200px;margin-top:4px`;
        if (isVideo) el.controls = true;
        el[isImage ? 'onload' : 'onloadeddata'] = () => URL.revokeObjectURL(el.src);
        preview.appendChild(el);
      });
    });
  });
}

function initFloatFields() {
  document.querySelectorAll('input[float]:not([data-float-initialized])').forEach(el => {
    const min = el.hasAttribute('min') ? parseFloat(el.getAttribute('min')) : null;
    const max = el.hasAttribute('max') ? parseFloat(el.getAttribute('max')) : null;
    const fmt = n => n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    el.type = 'text';
    el.addEventListener('input', e => {
      const v = e.target.value.replace(/\D/g, '');
      if (!v) { e.target.value = ''; return; }
      let num = parseFloat(v) / 100;
      if (max !== null && num > max) num = max;
      e.target.value = fmt(num);
    });
    el.addEventListener('blur', e => {
      if (!e.target.value) return;
      const val = parseFloat(e.target.value.replace(/\./g, '').replace(',', '.')) || 0;
      if (min !== null && val < min) e.target.value = fmt(min);
    });
    el.dataset.floatInitialized = "true";
  });
}

function initCopyableFields() {
  document.querySelectorAll('input[copyable]:not([data-copyable-initialized]),textarea[copyable]:not([data-copyable-initialized])').forEach(el => {
    const [defaultText, copiedText = 'Copied!'] = (el.getAttribute('copyable-text') || 'Copy;Copied!').split(';');
    const btn = Object.assign(document.createElement('button'), { type: 'button', textContent: defaultText });
    applyMutedStyle(btn);
    getOrCreateActionBar(el).appendChild(btn);
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(el.value);
        btn.textContent = copiedText;
        setTimeout(() => { btn.textContent = defaultText; }, 1000);
      } catch(e) { console.error('Copy failed', e); }
    });
    el.dataset.copyableInitialized = "true";
  });
}

function initPasswordHelpers() {
  document.querySelectorAll('input[type="password"]:not([data-password-initialized])').forEach(el => {
    const [showText, hideText = 'Hide'] = (el.getAttribute('password-text') || 'Show;Hide').split(';');
    const btn = Object.assign(document.createElement('button'), { type: 'button', textContent: showText });
    applyMutedStyle(btn);
    const bar = getOrCreateActionBar(el);
    bar.appendChild(btn);
    let visible = false;
    btn.addEventListener('click', () => {
      visible = !visible;
      el.type = visible ? 'text' : 'password';
      btn.textContent = visible ? hideText : showText;
    });
    if (el.hasAttribute('strength')) {
      const messages = (el.getAttribute('strength-messages') || 'Weak;Medium;Strong;Very Strong').split(';').map(s => s.trim());
      const colors = ['#dc3545', '#ffc107', '#17a2b8', '#28a745'];
      const msg = Object.assign(document.createElement('span'), { style: 'font-size:0.75rem' });
      applyMutedStyle(msg);
      bar.appendChild(msg);
      el.addEventListener('input', () => {
        const v = el.value;
        const idx = (v.length >= 8 && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v)) ? 3
          : (v.length >= 6 && ((/[A-Z]/.test(v) && /\d/.test(v)) || (/[A-Z]/.test(v) && /[^A-Za-z0-9]/.test(v)))) ? 2
          : v.length >= 6 ? 1 : 0;
        msg.textContent = messages[idx];
        msg.style.color = colors[idx];
      });
    }
    el.dataset.passwordInitialized = "true";
  });
}

function initAutoTrim() {
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('blur', () => { el.value = el.value.trim(); });
  });
}

initMasks();
initCaseTransform();
initFilePreviews();
initFloatFields();
initCopyableFields();
initPasswordHelpers();
initAutoTrim();