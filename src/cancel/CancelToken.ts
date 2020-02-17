import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    const self = this

    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    const cancel: Canceler = function(message) {
      if (self.reason) {
        return
      }
      self.reason = new Cancel(message)
      resolvePromise(self.reason)
    }

    executor(cancel)
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
