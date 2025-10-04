// Basic physics model for the coaster
// Handles gravity, slopes, and energy calculations

const g = 9.8; // acceleration due to gravity (m/s²)
const mass = 1.0; // mass of coaster (arbitrary unit)

export function calculatePhysics(position, velocity, trackData, dt) {
  if (!trackData || trackData.length < 2) {
    return {
      newPosition: position,
      newVelocity: velocity,
      newEnergy: { potential: 0, kinetic: 0, total: 0 },
    };
  }

  // Get points along the track
  const index = Math.floor(position);
  const nextIndex = Math.min(index + 1, trackData.length - 1);

  const current = trackData[index];
  const next = trackData[nextIndex];

  // Calculate slope angle (radians)
  const dx = next.x - current.x;
  const dy = next.y - current.y;
  const slopeAngle = Math.atan2(-dy, dx); // negative because y increases downward

  // Acceleration from gravity component
  const acceleration = g * Math.sin(slopeAngle);

  // Update velocity and position
  let newVelocity = velocity + acceleration * dt;
  let newPosition = position + newVelocity * dt * 10; // scaled for visualization

  // Keep within bounds
  if (newPosition >= trackData.length - 1) {
    newPosition = trackData.length - 1;
    newVelocity = 0;
  }
  if (newPosition < 0) {
    newPosition = 0;
    newVelocity = 0;
  }

  // Energy calculations
  const height = current.y;
  const potential = mass * g * (400 - height); // relative to canvas bottom
  const kinetic = 0.5 * mass * newVelocity ** 2;
  const total = potential + kinetic;

  return {
    newPosition,
    newVelocity,
    newEnergy: { potential, kinetic, total },
  };
}
