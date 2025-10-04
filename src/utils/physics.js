export const GRAVITY = 9.81; // m/s²

// Calculate potential energy: PE = m * g * h
export function potentialEnergy(mass, height) {
  return mass * GRAVITY * height;
}

// Calculate kinetic energy: KE = 0.5 * m * v²
export function kineticEnergy(mass, velocity) {
  return 0.5 * mass * velocity * velocity;
}

// Simple energy conservation model: total energy = PE + KE
export function totalEnergy(mass, height, velocity) {
  return potentialEnergy(mass, height) + kineticEnergy(mass, velocity);
}

// Basic simulation step for roller coaster motion
export function simulateStep(position, velocity, slope, deltaTime) {
  // Slope affects acceleration
  const acceleration = GRAVITY * Math.sin(slope);
  const newVelocity = velocity + acceleration * deltaTime;
  const newPosition = position + newVelocity * deltaTime;
  return { newPosition, newVelocity };
}
