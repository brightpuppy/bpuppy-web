function BPuppyTweaks({ tweaks, setTweak }) {
  const t = useT();
  return /* @__PURE__ */ React.createElement(TweaksPanel, { title: "BPuppy Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "Aesthetic theme" }), /* @__PURE__ */ React.createElement(
    TweakRadio,
    {
      label: "Theme",
      value: tweaks.theme,
      options: ["familia", "pop", "boutique"],
      onChange: (v) => setTweak("theme", v)
    }
  ), /* @__PURE__ */ React.createElement(
    TweakColor,
    {
      label: "Brand color",
      value: tweaks.brandColor,
      options: ["#F58220", "#FF7A1A", "#DA6B14", "#E85D75", "#5B7CFA"],
      onChange: (v) => setTweak("brandColor", v)
    }
  ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Behavior" }), /* @__PURE__ */ React.createElement(
    TweakToggle,
    {
      label: "Paw cursor trail",
      value: tweaks.paws,
      onChange: (v) => setTweak("paws", v)
    }
  ), /* @__PURE__ */ React.createElement(
    TweakToggle,
    {
      label: "Auto-open chat",
      value: tweaks.autoChat,
      onChange: (v) => setTweak("autoChat", v)
    }
  ), /* @__PURE__ */ React.createElement(
    TweakRadio,
    {
      label: "Language",
      value: tweaks.lang,
      options: ["es", "en"],
      onChange: (v) => setTweak("lang", v)
    }
  ));
}
Object.assign(window, { BPuppyTweaks });
