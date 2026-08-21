// tweaks.jsx — Tweaks panel for theme + cursor + language

function BPuppyTweaks({ tweaks, setTweak }) {
  const t = useT();
  return (
    <TweaksPanel title="BPuppy Tweaks">
      <TweakSection label="Aesthetic theme" />
      <TweakRadio
        label="Theme"
        value={tweaks.theme}
        options={['familia', 'pop', 'boutique']}
        onChange={(v) => setTweak('theme', v)}
      />
      <TweakColor
        label="Brand color"
        value={tweaks.brandColor}
        options={['#F58220', '#FF7A1A', '#DA6B14', '#E85D75', '#5B7CFA']}
        onChange={(v) => setTweak('brandColor', v)}
      />
      <TweakSection label="Behavior" />
      <TweakToggle
        label="Paw cursor trail"
        value={tweaks.paws}
        onChange={(v) => setTweak('paws', v)}
      />
      <TweakToggle
        label="Auto-open chat"
        value={tweaks.autoChat}
        onChange={(v) => setTweak('autoChat', v)}
      />
      <TweakRadio
        label="Language"
        value={tweaks.lang}
        options={['es', 'en']}
        onChange={(v) => setTweak('lang', v)}
      />
    </TweaksPanel>
  );
}

Object.assign(window, { BPuppyTweaks });
