export function getSignal(score) {
  if (score < 5.1) {
    return {
      key: "lower",
      label: "Lower range",
      title: "Your score falls in the lower model-score range.",
      context:
        "This prediction is below the 25th percentile of the training target distribution used by the model.",
    };
  }

  if (score <= 7.0) {
    return {
      key: "middle",
      label: "Middle range",
      title: "Your score falls in the middle model-score range.",
      context:
        "This prediction falls between the 25th and 75th percentiles of the training target distribution used by the model.",
    };
  }

  return {
    key: "higher",
    label: "Higher range",
    title: "Your score falls in the higher model-score range.",
    context:
      "This prediction is above the 75th percentile of the training target distribution used by the model.",
  };
}