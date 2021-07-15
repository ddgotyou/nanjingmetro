
export function getId(hyperTextObj) {
  if (hyperTextObj._links.self.href) {
    const segments = hyperTextObj._links.self.href.split('/')
    return segments.pop()
  }
}
