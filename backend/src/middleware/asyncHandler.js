/**
 * Wraps async route handlers so Express catches rejected promises.
 * Avoids try/catch in every route.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
