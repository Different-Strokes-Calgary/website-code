const { emitWarning } = process

process.emitWarning = (warning, ...args) => {
  if (
    args[0] &&
    (args[0] === 'ExperimentalWarning' ||
      (typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning'))
  ) {
    return
  }

  return emitWarning(warning, ...(<[string]>args))
}
