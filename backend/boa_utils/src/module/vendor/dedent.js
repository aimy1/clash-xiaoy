/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/dedent@1.7.0/dist/dedent.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    ;(t &&
      (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable
      })),
      r.push.apply(r, n))
  }
  return r
}
function t(t) {
  for (var n = 1; n < arguments.length; n++) {
    var i = null != arguments[n] ? arguments[n] : {}
    n % 2
      ? e(Object(i), !0).forEach(function (e) {
          r(t, e, i[e])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
        : e(Object(i)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          })
  }
  return t
}
function r(e, t, r) {
  return (
    (t = (function (e) {
      var t = (function (e, t) {
        if ('object' != typeof e || null === e) return e
        var r = e[Symbol.toPrimitive]
        if (void 0 !== r) {
          var n = r.call(e, t || 'default')
          if ('object' != typeof n) return n
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return ('string' === t ? String : Number)(e)
      })(e, 'string')
      return 'symbol' == typeof t ? t : String(t)
    })(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
const n = (function e(r) {
  return ((n.withOptions = (n) => e(t(t({}, r), n))), n)
  function n(e, ...t) {
    const n = 'string' == typeof e ? [e] : e.raw,
      {
        alignValues: o = !1,
        escapeSpecialCharacters: c = Array.isArray(e),
        trimWhitespace: l = !0,
      } = r
    let a = ''
    for (let e = 0; e < n.length; e++) {
      let r = n[e]
      if (
        (c &&
          (r = r
            .replace(/\\\n[ \t]*/g, '')
            .replace(/\\`/g, '`')
            .replace(/\\\$/g, '$')
            .replace(/\\\{/g, '{')),
        (a += r),
        e < t.length)
      ) {
        a += o ? i(t[e], a) : t[e]
      }
    }
    const u = a.split('\n')
    let s = null
    for (const e of u) {
      const t = e.match(/^(\s+)\S+/)
      if (t) {
        const e = t[1].length
        s = s ? Math.min(s, e) : e
      }
    }
    if (null !== s) {
      const e = s
      a = u
        .map((t) => (' ' === t[0] || '\t' === t[0] ? t.slice(e) : t))
        .join('\n')
    }
    return (l && (a = a.trim()), c && (a = a.replace(/\\n/g, '\n')), a)
  }
})({})
function i(e, t) {
  if ('string' != typeof e || !e.includes('\n')) return e
  const r = t.slice(t.lastIndexOf('\n') + 1).match(/^(\s+)/)
  if (r) {
    const t = r[1]
    return e.replace(/\n/g, `\n${t}`)
  }
  return e
}
export { n as default }
//# sourceMappingURL=/sm/6469ed87c8c81f2f1f06cd0a7c14b7d53c9bbd51123156a138be8f52ce29a5aa.map
