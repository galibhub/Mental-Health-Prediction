export function getSignal(score) {
  if (score < 4) {
    return {
      key: "attention",
      label: "Needs attention",
      title: "There are a few areas worth looking at.",
      context:
        "Your current response pattern falls in a lower model-score range. Small, sustainable changes to your daily routine may be worth considering.",
    };
  }

  if (score < 7) {
    return {
      key: "balanced",
      label: "Balanced",
      title: "Your current pattern looks fairly steady.",
      context:
        "Your responses fall in a relatively balanced model-score range, with some room to improve consistency, recovery, or daily balance.",
    };
  }

  return {
    key: "supported",
    label: "Well supported",
    title: "Your current pattern looks well supported.",
    context:
      "Your responses fall in a higher model-score range, suggesting several supportive habits in the pattern captured by this model.",
  };
}