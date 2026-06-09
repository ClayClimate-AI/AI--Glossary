export function buildCite(source) {
  let c = `${source.author} (${source.year}). <em>${source.title}</em>. ${source.publisher}.`
  if (source.url) {
    c += ` <a href="${source.url}" target="_blank" rel="noopener noreferrer" style="color:#00d4ff;word-break:break-all">${source.url}</a>`
  }
  return c
}
