export function calculateCost(
  filamentUsed: number,
  printTime: number
) {
  const costPerGram = 5;
  const machineRate = 120;
  const gstRate = 0.18;

  const filamentCost = filamentUsed * costPerGram;
  const machineCost = printTime * machineRate;
  const gst = (filamentCost + machineCost) * gstRate;

  return filamentCost + machineCost + gst;
}
