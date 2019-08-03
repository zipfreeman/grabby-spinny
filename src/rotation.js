const angleDegrees = (yDistance, xDistance) =>
  (Math.atan2(yDistance, xDistance) * 180) / Math.PI;

const calcAngle = (mousePos, center = [150, 150]) => {
  let xDistance = mousePos[0] - center[0];
  let yDistance = mousePos[1] - center[1];
  let angle = angleDegrees(yDistance, xDistance);
  return angle;
};

const calcRotation = (params, center = [150, 150]) => {
  const { skyStartAngle, dragStartAngle, mousePos } = params;
  let mouseAngle = calcAngle(mousePos, center);
  let finalRotation = mouseAngle - dragStartAngle + skyStartAngle;

  // console.log("skyStartAngle", skyStartAngle);
  // console.log("dragStartAngle", dragStartAngle);
  // console.log("mouseAngle", mouseAngle);
  // console.log("finalRotation", finalRotation);
  // console.log("\n");
  return finalRotation;
};

export { calcAngle, calcRotation };
