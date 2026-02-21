/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/yaml@2.8.1/browser/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const e = Symbol.for('yaml.alias'),
  t = Symbol.for('yaml.document'),
  n = Symbol.for('yaml.map'),
  s = Symbol.for('yaml.pair'),
  i = Symbol.for('yaml.scalar'),
  o = Symbol.for('yaml.seq'),
  r = Symbol.for('yaml.node.type'),
  a = (t) => !!t && 'object' == typeof t && t[r] === e,
  c = (e) => !!e && 'object' == typeof e && e[r] === t,
  l = (e) => !!e && 'object' == typeof e && e[r] === n,
  u = (e) => !!e && 'object' == typeof e && e[r] === s,
  f = (e) => !!e && 'object' == typeof e && e[r] === i,
  h = (e) => !!e && 'object' == typeof e && e[r] === o
function d(e) {
  if (e && 'object' == typeof e)
    switch (e[r]) {
      case n:
      case o:
        return !0
    }
  return !1
}
function p(t) {
  if (t && 'object' == typeof t)
    switch (t[r]) {
      case e:
      case n:
      case i:
      case o:
        return !0
    }
  return !1
}
const m = (e) => (f(e) || d(e)) && !!e.anchor,
  y = Symbol('break visit'),
  g = Symbol('skip children'),
  b = Symbol('remove node')
function k(e, t) {
  const n = E(t)
  if (c(e)) {
    w(null, e.contents, n, Object.freeze([e])) === b && (e.contents = null)
  } else w(null, e, n, Object.freeze([]))
}
function w(e, t, n, s) {
  const i = N(e, t, n, s)
  if (p(i) || u(i)) return (O(e, s, i), w(e, i, n, s))
  if ('symbol' != typeof i)
    if (d(t)) {
      s = Object.freeze(s.concat(t))
      for (let e = 0; e < t.items.length; ++e) {
        const i = w(e, t.items[e], n, s)
        if ('number' == typeof i) e = i - 1
        else {
          if (i === y) return y
          i === b && (t.items.splice(e, 1), (e -= 1))
        }
      }
    } else if (u(t)) {
      s = Object.freeze(s.concat(t))
      const e = w('key', t.key, n, s)
      if (e === y) return y
      e === b && (t.key = null)
      const i = w('value', t.value, n, s)
      if (i === y) return y
      i === b && (t.value = null)
    }
  return i
}
async function v(e, t) {
  const n = E(t)
  if (c(e)) {
    ;(await S(null, e.contents, n, Object.freeze([e]))) === b &&
      (e.contents = null)
  } else await S(null, e, n, Object.freeze([]))
}
async function S(e, t, n, s) {
  const i = await N(e, t, n, s)
  if (p(i) || u(i)) return (O(e, s, i), S(e, i, n, s))
  if ('symbol' != typeof i)
    if (d(t)) {
      s = Object.freeze(s.concat(t))
      for (let e = 0; e < t.items.length; ++e) {
        const i = await S(e, t.items[e], n, s)
        if ('number' == typeof i) e = i - 1
        else {
          if (i === y) return y
          i === b && (t.items.splice(e, 1), (e -= 1))
        }
      }
    } else if (u(t)) {
      s = Object.freeze(s.concat(t))
      const e = await S('key', t.key, n, s)
      if (e === y) return y
      e === b && (t.key = null)
      const i = await S('value', t.value, n, s)
      if (i === y) return y
      i === b && (t.value = null)
    }
  return i
}
function E(e) {
  return 'object' == typeof e && (e.Collection || e.Node || e.Value)
    ? Object.assign(
        { Alias: e.Node, Map: e.Node, Scalar: e.Node, Seq: e.Node },
        e.Value && { Map: e.Value, Scalar: e.Value, Seq: e.Value },
        e.Collection && { Map: e.Collection, Seq: e.Collection },
        e,
      )
    : e
}
function N(e, t, n, s) {
  return 'function' == typeof n
    ? n(e, t, s)
    : l(t)
      ? n.Map?.(e, t, s)
      : h(t)
        ? n.Seq?.(e, t, s)
        : u(t)
          ? n.Pair?.(e, t, s)
          : f(t)
            ? n.Scalar?.(e, t, s)
            : a(t)
              ? n.Alias?.(e, t, s)
              : void 0
}
function O(e, t, n) {
  const s = t[t.length - 1]
  if (d(s)) s.items[e] = n
  else if (u(s)) 'key' === e ? (s.key = n) : (s.value = n)
  else {
    if (!c(s)) {
      const e = a(s) ? 'alias' : 'scalar'
      throw new Error(`Cannot replace node with ${e} parent`)
    }
    s.contents = n
  }
}
;((k.BREAK = y),
  (k.SKIP = g),
  (k.REMOVE = b),
  (v.BREAK = y),
  (v.SKIP = g),
  (v.REMOVE = b))
const A = {
  '!': '%21',
  ',': '%2C',
  '[': '%5B',
  ']': '%5D',
  '{': '%7B',
  '}': '%7D',
}
class I {
  constructor(e, t) {
    ;((this.docStart = null),
      (this.docEnd = !1),
      (this.yaml = Object.assign({}, I.defaultYaml, e)),
      (this.tags = Object.assign({}, I.defaultTags, t)))
  }
  clone() {
    const e = new I(this.yaml, this.tags)
    return ((e.docStart = this.docStart), e)
  }
  atDocument() {
    const e = new I(this.yaml, this.tags)
    switch (this.yaml.version) {
      case '1.1':
        this.atNextDocument = !0
        break
      case '1.2':
        ;((this.atNextDocument = !1),
          (this.yaml = { explicit: I.defaultYaml.explicit, version: '1.2' }),
          (this.tags = Object.assign({}, I.defaultTags)))
    }
    return e
  }
  add(e, t) {
    this.atNextDocument &&
      ((this.yaml = { explicit: I.defaultYaml.explicit, version: '1.1' }),
      (this.tags = Object.assign({}, I.defaultTags)),
      (this.atNextDocument = !1))
    const n = e.trim().split(/[ \t]+/),
      s = n.shift()
    switch (s) {
      case '%TAG': {
        if (
          2 !== n.length &&
          (t(0, '%TAG directive should contain exactly two parts'),
          n.length < 2)
        )
          return !1
        const [e, s] = n
        return ((this.tags[e] = s), !0)
      }
      case '%YAML': {
        if (((this.yaml.explicit = !0), 1 !== n.length))
          return (t(0, '%YAML directive should contain exactly one part'), !1)
        const [e] = n
        if ('1.1' === e || '1.2' === e) return ((this.yaml.version = e), !0)
        return (t(6, `Unsupported YAML version ${e}`, /^\d+\.\d+$/.test(e)), !1)
      }
      default:
        return (t(0, `Unknown directive ${s}`, !0), !1)
    }
  }
  tagName(e, t) {
    if ('!' === e) return '!'
    if ('!' !== e[0]) return (t(`Not a valid tag: ${e}`), null)
    if ('<' === e[1]) {
      const n = e.slice(2, -1)
      return '!' === n || '!!' === n
        ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null)
        : ('>' !== e[e.length - 1] && t('Verbatim tags must end with a >'), n)
    }
    const [, n, s] = e.match(/^(.*!)([^!]*)$/s)
    s || t(`The ${e} tag has no suffix`)
    const i = this.tags[n]
    if (i)
      try {
        return i + decodeURIComponent(s)
      } catch (e) {
        return (t(String(e)), null)
      }
    return '!' === n ? e : (t(`Could not resolve tag: ${e}`), null)
  }
  tagString(e) {
    for (const [t, n] of Object.entries(this.tags))
      if (e.startsWith(n))
        return t + e.substring(n.length).replace(/[!,[\]{}]/g, (e) => A[e])
    return '!' === e[0] ? e : `!<${e}>`
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || '1.2'}`] : [],
      n = Object.entries(this.tags)
    let s
    if (e && n.length > 0 && p(e.contents)) {
      const t = {}
      ;(k(e.contents, (e, n) => {
        p(n) && n.tag && (t[n.tag] = !0)
      }),
        (s = Object.keys(t)))
    } else s = []
    for (const [i, o] of n)
      ('!!' === i && 'tag:yaml.org,2002:' === o) ||
        (e && !s.some((e) => e.startsWith(o))) ||
        t.push(`%TAG ${i} ${o}`)
    return t.join('\n')
  }
}
function T(e) {
  if (/[\x00-\x19\s,[\]{}]/.test(e)) {
    const t = JSON.stringify(e)
    throw new Error(
      `Anchor must not contain whitespace or control characters: ${t}`,
    )
  }
  return !0
}
function L(e) {
  const t = new Set()
  return (
    k(e, {
      Value(e, n) {
        n.anchor && t.add(n.anchor)
      },
    }),
    t
  )
}
function x(e, t) {
  for (let n = 1; ; ++n) {
    const s = `${e}${n}`
    if (!t.has(s)) return s
  }
}
function $(e, t, n, s) {
  if (s && 'object' == typeof s)
    if (Array.isArray(s))
      for (let t = 0, n = s.length; t < n; ++t) {
        const n = s[t],
          i = $(e, s, String(t), n)
        void 0 === i ? delete s[t] : i !== n && (s[t] = i)
      }
    else if (s instanceof Map)
      for (const t of Array.from(s.keys())) {
        const n = s.get(t),
          i = $(e, s, t, n)
        void 0 === i ? s.delete(t) : i !== n && s.set(t, i)
      }
    else if (s instanceof Set)
      for (const t of Array.from(s)) {
        const n = $(e, s, t, t)
        void 0 === n ? s.delete(t) : n !== t && (s.delete(t), s.add(n))
      }
    else
      for (const [t, n] of Object.entries(s)) {
        const i = $(e, s, t, n)
        void 0 === i ? delete s[t] : i !== n && (s[t] = i)
      }
  return e.call(t, n, s)
}
function C(e, t, n) {
  if (Array.isArray(e)) return e.map((e, t) => C(e, String(t), n))
  if (e && 'function' == typeof e.toJSON) {
    if (!n || !m(e)) return e.toJSON(t, n)
    const s = { aliasCount: 0, count: 1, res: void 0 }
    ;(n.anchors.set(e, s),
      (n.onCreate = (e) => {
        ;((s.res = e), delete n.onCreate)
      }))
    const i = e.toJSON(t, n)
    return (n.onCreate && n.onCreate(i), i)
  }
  return 'bigint' != typeof e || n?.keep ? e : Number(e)
}
;((I.defaultYaml = { explicit: !1, version: '1.2' }),
  (I.defaultTags = { '!!': 'tag:yaml.org,2002:' }))
class _ {
  constructor(e) {
    Object.defineProperty(this, r, { value: e })
  }
  clone() {
    const e = Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this),
    )
    return (this.range && (e.range = this.range.slice()), e)
  }
  toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: s, reviver: i } = {}) {
    if (!c(e)) throw new TypeError('A document argument is required')
    const o = {
        anchors: new Map(),
        doc: e,
        keep: !0,
        mapAsMap: !0 === t,
        mapKeyWarned: !1,
        maxAliasCount: 'number' == typeof n ? n : 100,
      },
      r = C(this, '', o)
    if ('function' == typeof s)
      for (const { count: e, res: t } of o.anchors.values()) s(t, e)
    return 'function' == typeof i ? $(i, { '': r }, '', r) : r
  }
}
class K extends _ {
  constructor(t) {
    ;(super(e),
      (this.source = t),
      Object.defineProperty(this, 'tag', {
        set() {
          throw new Error('Alias nodes cannot have tags')
        },
      }))
  }
  resolve(e, t) {
    let n, s
    t?.aliasResolveCache
      ? (n = t.aliasResolveCache)
      : ((n = []),
        k(e, {
          Node: (e, t) => {
            ;(a(t) || m(t)) && n.push(t)
          },
        }),
        t && (t.aliasResolveCache = n))
    for (const e of n) {
      if (e === this) break
      e.anchor === this.source && (s = e)
    }
    return s
  }
  toJSON(e, t) {
    if (!t) return { source: this.source }
    const { anchors: n, doc: s, maxAliasCount: i } = t,
      o = this.resolve(s, t)
    if (!o) {
      const e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
      throw new ReferenceError(e)
    }
    let r = n.get(o)
    if ((r || (C(o, null, t), (r = n.get(o))), !r || void 0 === r.res)) {
      throw new ReferenceError(
        'This should not happen: Alias anchor was not resolved?',
      )
    }
    if (
      i >= 0 &&
      ((r.count += 1),
      0 === r.aliasCount && (r.aliasCount = B(s, o, n)),
      r.count * r.aliasCount > i)
    ) {
      throw new ReferenceError(
        'Excessive alias count indicates a resource exhaustion attack',
      )
    }
    return r.res
  }
  toString(e, t, n) {
    const s = `*${this.source}`
    if (e) {
      if (
        (T(this.source),
        e.options.verifyAliasOrder && !e.anchors.has(this.source))
      ) {
        const e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
        throw new Error(e)
      }
      if (e.implicitKey) return `${s} `
    }
    return s
  }
}
function B(e, t, n) {
  if (a(t)) {
    const s = t.resolve(e),
      i = n && s && n.get(s)
    return i ? i.count * i.aliasCount : 0
  }
  if (d(t)) {
    let s = 0
    for (const i of t.items) {
      const t = B(e, i, n)
      t > s && (s = t)
    }
    return s
  }
  if (u(t)) {
    const s = B(e, t.key, n),
      i = B(e, t.value, n)
    return Math.max(s, i)
  }
  return 1
}
const j = (e) => !e || ('function' != typeof e && 'object' != typeof e)
class M extends _ {
  constructor(e) {
    ;(super(i), (this.value = e))
  }
  toJSON(e, t) {
    return t?.keep ? this.value : C(this.value, e, t)
  }
  toString() {
    return String(this.value)
  }
}
;((M.BLOCK_FOLDED = 'BLOCK_FOLDED'),
  (M.BLOCK_LITERAL = 'BLOCK_LITERAL'),
  (M.PLAIN = 'PLAIN'),
  (M.QUOTE_DOUBLE = 'QUOTE_DOUBLE'),
  (M.QUOTE_SINGLE = 'QUOTE_SINGLE'))
function D(e, t, s) {
  if ((c(e) && (e = e.contents), p(e))) return e
  if (u(e)) {
    const t = s.schema[n].createNode?.(s.schema, null, s)
    return (t.items.push(e), t)
  }
  ;(e instanceof String ||
    e instanceof Number ||
    e instanceof Boolean ||
    ('undefined' != typeof BigInt && e instanceof BigInt)) &&
    (e = e.valueOf())
  const {
    aliasDuplicateObjects: i,
    onAnchor: r,
    onTagObj: a,
    schema: l,
    sourceObjects: f,
  } = s
  let h
  if (i && e && 'object' == typeof e) {
    if (((h = f.get(e)), h))
      return (h.anchor ?? (h.anchor = r(e)), new K(h.anchor))
    ;((h = { anchor: null, node: null }), f.set(e, h))
  }
  t?.startsWith('!!') && (t = 'tag:yaml.org,2002:' + t.slice(2))
  let d = (function (e, t, n) {
    if (t) {
      const e = n.filter((e) => e.tag === t),
        s = e.find((e) => !e.format) ?? e[0]
      if (!s) throw new Error(`Tag ${t} not found`)
      return s
    }
    return n.find((t) => t.identify?.(e) && !t.format)
  })(e, t, l.tags)
  if (!d) {
    if (
      (e && 'function' == typeof e.toJSON && (e = e.toJSON()),
      !e || 'object' != typeof e)
    ) {
      const t = new M(e)
      return (h && (h.node = t), t)
    }
    d = e instanceof Map ? l[n] : Symbol.iterator in Object(e) ? l[o] : l[n]
  }
  a && (a(d), delete s.onTagObj)
  const m = d?.createNode
    ? d.createNode(s.schema, e, s)
    : 'function' == typeof d?.nodeClass?.from
      ? d.nodeClass.from(s.schema, e, s)
      : new M(e)
  return (t ? (m.tag = t) : d.default || (m.tag = d.tag), h && (h.node = m), m)
}
function q(e, t, n) {
  let s = n
  for (let e = t.length - 1; e >= 0; --e) {
    const n = t[e]
    if ('number' == typeof n && Number.isInteger(n) && n >= 0) {
      const e = []
      ;((e[n] = s), (s = e))
    } else s = new Map([[n, s]])
  }
  return D(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error('This should not happen, please report a bug.')
    },
    schema: e,
    sourceObjects: new Map(),
  })
}
const P = (e) =>
  null == e || ('object' == typeof e && !!e[Symbol.iterator]().next().done)
class U extends _ {
  constructor(e, t) {
    ;(super(e),
      Object.defineProperty(this, 'schema', {
        value: t,
        configurable: !0,
        enumerable: !1,
        writable: !0,
      }))
  }
  clone(e) {
    const t = Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this),
    )
    return (
      e && (t.schema = e),
      (t.items = t.items.map((t) => (p(t) || u(t) ? t.clone(e) : t))),
      this.range && (t.range = this.range.slice()),
      t
    )
  }
  addIn(e, t) {
    if (P(e)) this.add(t)
    else {
      const [n, ...s] = e,
        i = this.get(n, !0)
      if (d(i)) i.addIn(s, t)
      else {
        if (void 0 !== i || !this.schema)
          throw new Error(
            `Expected YAML collection at ${n}. Remaining path: ${s}`,
          )
        this.set(n, q(this.schema, s, t))
      }
    }
  }
  deleteIn(e) {
    const [t, ...n] = e
    if (0 === n.length) return this.delete(t)
    const s = this.get(t, !0)
    if (d(s)) return s.deleteIn(n)
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)
  }
  getIn(e, t) {
    const [n, ...s] = e,
      i = this.get(n, !0)
    return 0 === s.length
      ? !t && f(i)
        ? i.value
        : i
      : d(i)
        ? i.getIn(s, t)
        : void 0
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!u(t)) return !1
      const n = t.value
      return (
        null == n ||
        (e &&
          f(n) &&
          null == n.value &&
          !n.commentBefore &&
          !n.comment &&
          !n.tag)
      )
    })
  }
  hasIn(e) {
    const [t, ...n] = e
    if (0 === n.length) return this.has(t)
    const s = this.get(t, !0)
    return !!d(s) && s.hasIn(n)
  }
  setIn(e, t) {
    const [n, ...s] = e
    if (0 === s.length) this.set(n, t)
    else {
      const e = this.get(n, !0)
      if (d(e)) e.setIn(s, t)
      else {
        if (void 0 !== e || !this.schema)
          throw new Error(
            `Expected YAML collection at ${n}. Remaining path: ${s}`,
          )
        this.set(n, q(this.schema, s, t))
      }
    }
  }
}
const R = (e) => e.replace(/^(?!$)(?: $)?/gm, '#')
function F(e, t) {
  return /^\n+$/.test(e) ? e.substring(1) : t ? e.replace(/^(?! *$)/gm, t) : e
}
const V = (e, t, n) =>
    e.endsWith('\n')
      ? F(n, t)
      : n.includes('\n')
        ? '\n' + F(n, t)
        : (e.endsWith(' ') ? '' : ' ') + n,
  J = 'flow',
  Y = 'block',
  W = 'quoted'
function G(
  e,
  t,
  n = 'flow',
  {
    indentAtStart: s,
    lineWidth: i = 80,
    minContentWidth: o = 20,
    onFold: r,
    onOverflow: a,
  } = {},
) {
  if (!i || i < 0) return e
  i < o && (o = 0)
  const c = Math.max(1 + o, 1 + i - t.length)
  if (e.length <= c) return e
  const l = [],
    u = {}
  let f,
    h,
    d = i - t.length
  'number' == typeof s && (s > i - Math.max(2, o) ? l.push(0) : (d = i - s))
  let p = !1,
    m = -1,
    y = -1,
    g = -1
  n === Y && ((m = Q(e, m, t.length)), -1 !== m && (d = m + c))
  for (let s; (s = e[(m += 1)]); ) {
    if (n === W && '\\' === s) {
      switch (((y = m), e[m + 1])) {
        case 'x':
          m += 3
          break
        case 'u':
          m += 5
          break
        case 'U':
          m += 9
          break
        default:
          m += 1
      }
      g = m
    }
    if ('\n' === s)
      (n === Y && (m = Q(e, m, t.length)), (d = m + t.length + c), (f = void 0))
    else {
      if (' ' === s && h && ' ' !== h && '\n' !== h && '\t' !== h) {
        const t = e[m + 1]
        t && ' ' !== t && '\n' !== t && '\t' !== t && (f = m)
      }
      if (m >= d)
        if (f) (l.push(f), (d = f + c), (f = void 0))
        else if (n === W) {
          for (; ' ' === h || '\t' === h; )
            ((h = s), (s = e[(m += 1)]), (p = !0))
          const t = m > g + 1 ? m - 2 : y - 1
          if (u[t]) return e
          ;(l.push(t), (u[t] = !0), (d = t + c), (f = void 0))
        } else p = !0
    }
    h = s
  }
  if ((p && a && a(), 0 === l.length)) return e
  r && r()
  let b = e.slice(0, l[0])
  for (let s = 0; s < l.length; ++s) {
    const i = l[s],
      o = l[s + 1] || e.length
    0 === i
      ? (b = `\n${t}${e.slice(0, o)}`)
      : (n === W && u[i] && (b += `${e[i]}\\`),
        (b += `\n${t}${e.slice(i + 1, o)}`))
  }
  return b
}
function Q(e, t, n) {
  let s = t,
    i = t + 1,
    o = e[i]
  for (; ' ' === o || '\t' === o; )
    if (t < i + n) o = e[++t]
    else {
      do {
        o = e[++t]
      } while (o && '\n' !== o)
      ;((s = t), (i = t + 1), (o = e[i]))
    }
  return s
}
const H = (e, t) => ({
    indentAtStart: t ? e.indent.length : e.indentAtStart,
    lineWidth: e.options.lineWidth,
    minContentWidth: e.options.minContentWidth,
  }),
  X = (e) => /^(%|---|\.\.\.)/m.test(e)
function z(e, t) {
  const n = JSON.stringify(e)
  if (t.options.doubleQuotedAsJSON) return n
  const { implicitKey: s } = t,
    i = t.options.doubleQuotedMinMultiLineLength,
    o = t.indent || (X(e) ? '  ' : '')
  let r = '',
    a = 0
  for (let e = 0, t = n[e]; t; t = n[++e])
    if (
      (' ' === t &&
        '\\' === n[e + 1] &&
        'n' === n[e + 2] &&
        ((r += n.slice(a, e) + '\\ '), (e += 1), (a = e), (t = '\\')),
      '\\' === t)
    )
      switch (n[e + 1]) {
        case 'u':
          {
            r += n.slice(a, e)
            const t = n.substr(e + 2, 4)
            switch (t) {
              case '0000':
                r += '\\0'
                break
              case '0007':
                r += '\\a'
                break
              case '000b':
                r += '\\v'
                break
              case '001b':
                r += '\\e'
                break
              case '0085':
                r += '\\N'
                break
              case '00a0':
                r += '\\_'
                break
              case '2028':
                r += '\\L'
                break
              case '2029':
                r += '\\P'
                break
              default:
                '00' === t.substr(0, 2)
                  ? (r += '\\x' + t.substr(2))
                  : (r += n.substr(e, 6))
            }
            ;((e += 5), (a = e + 1))
          }
          break
        case 'n':
          if (s || '"' === n[e + 2] || n.length < i) e += 1
          else {
            for (
              r += n.slice(a, e) + '\n\n';
              '\\' === n[e + 2] && 'n' === n[e + 3] && '"' !== n[e + 4];
            )
              ((r += '\n'), (e += 2))
            ;((r += o), ' ' === n[e + 2] && (r += '\\'), (e += 1), (a = e + 1))
          }
          break
        default:
          e += 1
      }
  return ((r = a ? r + n.slice(a) : n), s ? r : G(r, o, W, H(t, !1)))
}
function Z(e, t) {
  if (
    !1 === t.options.singleQuote ||
    (t.implicitKey && e.includes('\n')) ||
    /[ \t]\n|\n[ \t]/.test(e)
  )
    return z(e, t)
  const n = t.indent || (X(e) ? '  ' : ''),
    s = "'" + e.replace(/'/g, "''").replace(/\n+/g, `$&\n${n}`) + "'"
  return t.implicitKey ? s : G(s, n, J, H(t, !1))
}
function ee(e, t) {
  const { singleQuote: n } = t.options
  let s
  if (!1 === n) s = z
  else {
    const t = e.includes('"'),
      i = e.includes("'")
    s = t && !i ? Z : i && !t ? z : n ? Z : z
  }
  return s(e, t)
}
let te
try {
  te = new RegExp('(^|(?<!\n))\n+(?!\n|$)', 'g')
} catch {
  te = /\n+(?!\n|$)/g
}
function ne({ comment: e, type: t, value: n }, s, i, o) {
  const { blockQuote: r, commentString: a, lineWidth: c } = s.options
  if (!r || /\n[\t ]+$/.test(n)) return ee(n, s)
  const l = s.indent || (s.forceBlockIndent || X(n) ? '  ' : ''),
    u =
      'literal' === r ||
      ('folded' !== r &&
        t !== M.BLOCK_FOLDED &&
        (t === M.BLOCK_LITERAL ||
          !(function (e, t, n) {
            if (!t || t < 0) return !1
            const s = t - n,
              i = e.length
            if (i <= s) return !1
            for (let t = 0, n = 0; t < i; ++t)
              if ('\n' === e[t]) {
                if (t - n > s) return !0
                if (((n = t + 1), i - n <= s)) return !1
              }
            return !0
          })(n, c, l.length)))
  if (!n) return u ? '|\n' : '>\n'
  let f, h
  for (h = n.length; h > 0; --h) {
    const e = n[h - 1]
    if ('\n' !== e && '\t' !== e && ' ' !== e) break
  }
  let d = n.substring(h)
  const p = d.indexOf('\n')
  ;(-1 === p
    ? (f = '-')
    : n === d || p !== d.length - 1
      ? ((f = '+'), o && o())
      : (f = ''),
    d &&
      ((n = n.slice(0, -d.length)),
      '\n' === d[d.length - 1] && (d = d.slice(0, -1)),
      (d = d.replace(te, `$&${l}`))))
  let m,
    y = !1,
    g = -1
  for (m = 0; m < n.length; ++m) {
    const e = n[m]
    if (' ' === e) y = !0
    else {
      if ('\n' !== e) break
      g = m
    }
  }
  let b = n.substring(0, g < m ? g + 1 : m)
  b && ((n = n.substring(b.length)), (b = b.replace(/\n+/g, `$&${l}`)))
  let k = (y ? (l ? '2' : '1') : '') + f
  if ((e && ((k += ' ' + a(e.replace(/ ?[\r\n]+/g, ' '))), i && i()), !u)) {
    const e = n
      .replace(/\n+/g, '\n$&')
      .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2')
      .replace(/\n+/g, `$&${l}`)
    let i = !1
    const o = H(s, !0)
    'folded' !== r &&
      t !== M.BLOCK_FOLDED &&
      (o.onOverflow = () => {
        i = !0
      })
    const a = G(`${b}${e}${d}`, l, Y, o)
    if (!i) return `>${k}\n${l}${a}`
  }
  return `|${k}\n${l}${b}${(n = n.replace(/\n+/g, `$&${l}`))}${d}`
}
function se(e, t, n, s) {
  const { implicitKey: i, inFlow: o } = t,
    r =
      'string' == typeof e.value
        ? e
        : Object.assign({}, e, { value: String(e.value) })
  let { type: a } = e
  a !== M.QUOTE_DOUBLE &&
    /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value) &&
    (a = M.QUOTE_DOUBLE)
  const c = (e) => {
    switch (e) {
      case M.BLOCK_FOLDED:
      case M.BLOCK_LITERAL:
        return i || o ? ee(r.value, t) : ne(r, t, n, s)
      case M.QUOTE_DOUBLE:
        return z(r.value, t)
      case M.QUOTE_SINGLE:
        return Z(r.value, t)
      case M.PLAIN:
        return (function (e, t, n, s) {
          const { type: i, value: o } = e,
            {
              actualString: r,
              implicitKey: a,
              indent: c,
              indentStep: l,
              inFlow: u,
            } = t
          if ((a && o.includes('\n')) || (u && /[[\]{},]/.test(o)))
            return ee(o, t)
          if (
            /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(
              o,
            )
          )
            return a || u || !o.includes('\n') ? ee(o, t) : ne(e, t, n, s)
          if (!a && !u && i !== M.PLAIN && o.includes('\n'))
            return ne(e, t, n, s)
          if (X(o)) {
            if ('' === c) return ((t.forceBlockIndent = !0), ne(e, t, n, s))
            if (a && c === l) return ee(o, t)
          }
          const f = o.replace(/\n+/g, `$&\n${c}`)
          if (r) {
            const e = (e) =>
                e.default &&
                'tag:yaml.org,2002:str' !== e.tag &&
                e.test?.test(f),
              { compat: n, tags: s } = t.doc.schema
            if (s.some(e) || n?.some(e)) return ee(o, t)
          }
          return a ? f : G(f, c, J, H(t, !1))
        })(r, t, n, s)
      default:
        return null
    }
  }
  let l = c(a)
  if (null === l) {
    const { defaultKeyType: e, defaultStringType: n } = t.options,
      s = (i && e) || n
    if (((l = c(s)), null === l))
      throw new Error(`Unsupported default string type ${s}`)
  }
  return l
}
function ie(e, t) {
  const n = Object.assign(
    {
      blockQuote: !0,
      commentString: R,
      defaultKeyType: null,
      defaultStringType: 'PLAIN',
      directives: null,
      doubleQuotedAsJSON: !1,
      doubleQuotedMinMultiLineLength: 40,
      falseStr: 'false',
      flowCollectionPadding: !0,
      indentSeq: !0,
      lineWidth: 80,
      minContentWidth: 20,
      nullStr: 'null',
      simpleKeys: !1,
      singleQuote: null,
      trueStr: 'true',
      verifyAliasOrder: !0,
    },
    e.schema.toStringOptions,
    t,
  )
  let s
  switch (n.collectionStyle) {
    case 'block':
      s = !1
      break
    case 'flow':
      s = !0
      break
    default:
      s = null
  }
  return {
    anchors: new Set(),
    doc: e,
    flowCollectionPadding: n.flowCollectionPadding ? ' ' : '',
    indent: '',
    indentStep: 'number' == typeof n.indent ? ' '.repeat(n.indent) : '  ',
    inFlow: s,
    options: n,
  }
}
function oe(e, t, n, s) {
  if (u(e)) return e.toString(t, n, s)
  if (a(e)) {
    if (t.doc.directives) return e.toString(t)
    if (t.resolvedAliases?.has(e))
      throw new TypeError(
        'Cannot stringify circular structure without alias nodes',
      )
    ;(t.resolvedAliases
      ? t.resolvedAliases.add(e)
      : (t.resolvedAliases = new Set([e])),
      (e = e.resolve(t.doc)))
  }
  let i
  const o = p(e) ? e : t.doc.createNode(e, { onTagObj: (e) => (i = e) })
  i ??
    (i = (function (e, t) {
      if (t.tag) {
        const n = e.filter((e) => e.tag === t.tag)
        if (n.length > 0) return n.find((e) => e.format === t.format) ?? n[0]
      }
      let n, s
      if (f(t)) {
        s = t.value
        let i = e.filter((e) => e.identify?.(s))
        if (i.length > 1) {
          const e = i.filter((e) => e.test)
          e.length > 0 && (i = e)
        }
        n = i.find((e) => e.format === t.format) ?? i.find((e) => !e.format)
      } else
        ((s = t), (n = e.find((e) => e.nodeClass && s instanceof e.nodeClass)))
      if (!n)
        throw new Error(
          `Tag not resolved for ${s?.constructor?.name ?? (null === s ? 'null' : typeof s)} value`,
        )
      return n
    })(t.doc.schema.tags, o))
  const r = (function (e, t, { anchors: n, doc: s }) {
    if (!s.directives) return ''
    const i = [],
      o = (f(e) || d(e)) && e.anchor
    o && T(o) && (n.add(o), i.push(`&${o}`))
    const r = e.tag ?? (t.default ? null : t.tag)
    return (r && i.push(s.directives.tagString(r)), i.join(' '))
  })(o, i, t)
  r.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + r.length + 1)
  const c =
    'function' == typeof i.stringify
      ? i.stringify(o, t, n, s)
      : f(o)
        ? se(o, t, n, s)
        : o.toString(t, n, s)
  return r
    ? f(o) || '{' === c[0] || '[' === c[0]
      ? `${r} ${c}`
      : `${r}\n${t.indent}${c}`
    : c
}
function re(e, t) {
  ;('debug' !== e && 'warn' !== e) || console.warn(t)
}
const ae = '<<',
  ce = {
    identify: (e) => e === ae || ('symbol' == typeof e && e.description === ae),
    default: 'key',
    tag: 'tag:yaml.org,2002:merge',
    test: /^<<$/,
    resolve: () => Object.assign(new M(Symbol(ae)), { addToJSMap: le }),
    stringify: () => ae,
  }
function le(e, t, n) {
  if (((n = e && a(n) ? n.resolve(e.doc) : n), h(n)))
    for (const s of n.items) ue(e, t, s)
  else if (Array.isArray(n)) for (const s of n) ue(e, t, s)
  else ue(e, t, n)
}
function ue(e, t, n) {
  const s = e && a(n) ? n.resolve(e.doc) : n
  if (!l(s)) throw new Error('Merge sources must be maps or map aliases')
  const i = s.toJSON(null, e, Map)
  for (const [e, n] of i)
    t instanceof Map
      ? t.has(e) || t.set(e, n)
      : t instanceof Set
        ? t.add(e)
        : Object.prototype.hasOwnProperty.call(t, e) ||
          Object.defineProperty(t, e, {
            value: n,
            writable: !0,
            enumerable: !0,
            configurable: !0,
          })
  return t
}
function fe(e, t, { key: n, value: s }) {
  if (p(n) && n.addToJSMap) n.addToJSMap(e, t, s)
  else if (
    ((e, t) =>
      (ce.identify(t) ||
        (f(t) && (!t.type || t.type === M.PLAIN) && ce.identify(t.value))) &&
      e?.doc.schema.tags.some((e) => e.tag === ce.tag && e.default))(e, n)
  )
    le(e, t, s)
  else {
    const i = C(n, '', e)
    if (t instanceof Map) t.set(i, C(s, i, e))
    else if (t instanceof Set) t.add(i)
    else {
      const o = (function (e, t, n) {
          if (null === t) return ''
          if ('object' != typeof t) return String(t)
          if (p(e) && n?.doc) {
            const t = ie(n.doc, {})
            t.anchors = new Set()
            for (const e of n.anchors.keys()) t.anchors.add(e.anchor)
            ;((t.inFlow = !0), (t.inStringifyKey = !0))
            const s = e.toString(t)
            if (!n.mapKeyWarned) {
              let e = JSON.stringify(s)
              ;(e.length > 40 && (e = e.substring(0, 36) + '..."'),
                re(
                  n.doc.options.logLevel,
                  `Keys with collection values will be stringified due to JS Object restrictions: ${e}. Set mapAsMap: true to use object keys.`,
                ),
                (n.mapKeyWarned = !0))
            }
            return s
          }
          return JSON.stringify(t)
        })(n, i, e),
        r = C(s, o, e)
      o in t
        ? Object.defineProperty(t, o, {
            value: r,
            writable: !0,
            enumerable: !0,
            configurable: !0,
          })
        : (t[o] = r)
    }
  }
  return t
}
function he(e, t, n) {
  const s = D(e, void 0, n),
    i = D(t, void 0, n)
  return new de(s, i)
}
class de {
  constructor(e, t = null) {
    ;(Object.defineProperty(this, r, { value: s }),
      (this.key = e),
      (this.value = t))
  }
  clone(e) {
    let { key: t, value: n } = this
    return (p(t) && (t = t.clone(e)), p(n) && (n = n.clone(e)), new de(t, n))
  }
  toJSON(e, t) {
    return fe(t, t?.mapAsMap ? new Map() : {}, this)
  }
  toString(e, t, n) {
    return e?.doc
      ? (function ({ key: e, value: t }, n, s, i) {
          const {
            allNullValues: o,
            doc: r,
            indent: a,
            indentStep: c,
            options: { commentString: l, indentSeq: u, simpleKeys: m },
          } = n
          let y = (p(e) && e.comment) || null
          if (m) {
            if (y)
              throw new Error(
                'With simple keys, key nodes cannot have comments',
              )
            if (d(e) || (!p(e) && 'object' == typeof e))
              throw new Error(
                'With simple keys, collection cannot be used as a key value',
              )
          }
          let g =
            !m &&
            (!e ||
              (y && null == t && !n.inFlow) ||
              d(e) ||
              (f(e)
                ? e.type === M.BLOCK_FOLDED || e.type === M.BLOCK_LITERAL
                : 'object' == typeof e))
          n = Object.assign({}, n, {
            allNullValues: !1,
            implicitKey: !g && (m || !o),
            indent: a + c,
          })
          let b,
            k,
            w,
            v = !1,
            S = !1,
            E = oe(
              e,
              n,
              () => (v = !0),
              () => (S = !0),
            )
          if (!g && !n.inFlow && E.length > 1024) {
            if (m)
              throw new Error(
                'With simple keys, single line scalar must not span more than 1024 characters',
              )
            g = !0
          }
          if (n.inFlow) {
            if (o || null == t)
              return (v && s && s(), '' === E ? '?' : g ? `? ${E}` : E)
          } else if ((o && !m) || (null == t && g))
            return (
              (E = `? ${E}`),
              y && !v ? (E += V(E, n.indent, l(y))) : S && i && i(),
              E
            )
          ;(v && (y = null),
            g
              ? (y && (E += V(E, n.indent, l(y))), (E = `? ${E}\n${a}:`))
              : ((E = `${E}:`), y && (E += V(E, n.indent, l(y)))),
            p(t)
              ? ((b = !!t.spaceBefore), (k = t.commentBefore), (w = t.comment))
              : ((b = !1),
                (k = null),
                (w = null),
                t && 'object' == typeof t && (t = r.createNode(t))),
            (n.implicitKey = !1),
            g || y || !f(t) || (n.indentAtStart = E.length + 1),
            (S = !1),
            u ||
              !(c.length >= 2) ||
              n.inFlow ||
              g ||
              !h(t) ||
              t.flow ||
              t.tag ||
              t.anchor ||
              (n.indent = n.indent.substring(2)))
          let N = !1
          const O = oe(
            t,
            n,
            () => (N = !0),
            () => (S = !0),
          )
          let A = ' '
          if (y || b || k)
            ((A = b ? '\n' : ''),
              k && (A += `\n${F(l(k), n.indent)}`),
              '' !== O || n.inFlow
                ? (A += `\n${n.indent}`)
                : '\n' === A && (A = '\n\n'))
          else if (!g && d(t)) {
            const e = O[0],
              s = O.indexOf('\n'),
              i = -1 !== s,
              o = n.inFlow ?? t.flow ?? 0 === t.items.length
            if (i || !o) {
              let t = !1
              if (i && ('&' === e || '!' === e)) {
                let n = O.indexOf(' ')
                ;('&' === e &&
                  -1 !== n &&
                  n < s &&
                  '!' === O[n + 1] &&
                  (n = O.indexOf(' ', n + 1)),
                  (-1 === n || s < n) && (t = !0))
              }
              t || (A = `\n${n.indent}`)
            }
          } else ('' !== O && '\n' !== O[0]) || (A = '')
          return (
            (E += A + O),
            n.inFlow
              ? N && s && s()
              : w && !N
                ? (E += V(E, n.indent, l(w)))
                : S && i && i(),
            E
          )
        })(this, e, t, n)
      : JSON.stringify(this)
  }
}
function pe(e, t, n) {
  return ((t.inFlow ?? e.flow) ? ye : me)(e, t, n)
}
function me(
  { comment: e, items: t },
  n,
  {
    blockItemPrefix: s,
    flowChars: i,
    itemIndent: o,
    onChompKeep: r,
    onComment: a,
  },
) {
  const {
      indent: c,
      options: { commentString: l },
    } = n,
    f = Object.assign({}, n, { indent: o, type: null })
  let h = !1
  const d = []
  for (let e = 0; e < t.length; ++e) {
    const i = t[e]
    let r = null
    if (p(i))
      (!h && i.spaceBefore && d.push(''),
        ge(n, d, i.commentBefore, h),
        i.comment && (r = i.comment))
    else if (u(i)) {
      const e = p(i.key) ? i.key : null
      e && (!h && e.spaceBefore && d.push(''), ge(n, d, e.commentBefore, h))
    }
    h = !1
    let a = oe(
      i,
      f,
      () => (r = null),
      () => (h = !0),
    )
    ;(r && (a += V(a, o, l(r))), h && r && (h = !1), d.push(s + a))
  }
  let m
  if (0 === d.length) m = i.start + i.end
  else {
    m = d[0]
    for (let e = 1; e < d.length; ++e) {
      const t = d[e]
      m += t ? `\n${c}${t}` : '\n'
    }
  }
  return (e ? ((m += '\n' + F(l(e), c)), a && a()) : h && r && r(), m)
}
function ye({ items: e }, t, { flowChars: n, itemIndent: s }) {
  const {
    indent: i,
    indentStep: o,
    flowCollectionPadding: r,
    options: { commentString: a },
  } = t
  s += o
  const c = Object.assign({}, t, { indent: s, inFlow: !0, type: null })
  let l = !1,
    f = 0
  const h = []
  for (let n = 0; n < e.length; ++n) {
    const i = e[n]
    let o = null
    if (p(i))
      (i.spaceBefore && h.push(''),
        ge(t, h, i.commentBefore, !1),
        i.comment && (o = i.comment))
    else if (u(i)) {
      const e = p(i.key) ? i.key : null
      e &&
        (e.spaceBefore && h.push(''),
        ge(t, h, e.commentBefore, !1),
        e.comment && (l = !0))
      const n = p(i.value) ? i.value : null
      n
        ? (n.comment && (o = n.comment), n.commentBefore && (l = !0))
        : null == i.value && e?.comment && (o = e.comment)
    }
    o && (l = !0)
    let r = oe(i, c, () => (o = null))
    ;(n < e.length - 1 && (r += ','),
      o && (r += V(r, s, a(o))),
      !l && (h.length > f || r.includes('\n')) && (l = !0),
      h.push(r),
      (f = h.length))
  }
  const { start: d, end: m } = n
  if (0 === h.length) return d + m
  if (!l) {
    const e = h.reduce((e, t) => e + t.length + 2, 2)
    l = t.options.lineWidth > 0 && e > t.options.lineWidth
  }
  if (l) {
    let e = d
    for (const t of h) e += t ? `\n${o}${i}${t}` : '\n'
    return `${e}\n${i}${m}`
  }
  return `${d}${r}${h.join(' ')}${r}${m}`
}
function ge({ indent: e, options: { commentString: t } }, n, s, i) {
  if ((s && i && (s = s.replace(/^\n+/, '')), s)) {
    const i = F(t(s), e)
    n.push(i.trimStart())
  }
}
function be(e, t) {
  const n = f(t) ? t.value : t
  for (const s of e)
    if (u(s)) {
      if (s.key === t || s.key === n) return s
      if (f(s.key) && s.key.value === n) return s
    }
}
class ke extends U {
  static get tagName() {
    return 'tag:yaml.org,2002:map'
  }
  constructor(e) {
    ;(super(n, e), (this.items = []))
  }
  static from(e, t, n) {
    const { keepUndefined: s, replacer: i } = n,
      o = new this(e),
      r = (e, r) => {
        if ('function' == typeof i) r = i.call(t, e, r)
        else if (Array.isArray(i) && !i.includes(e)) return
        ;(void 0 !== r || s) && o.items.push(he(e, r, n))
      }
    if (t instanceof Map) for (const [e, n] of t) r(e, n)
    else if (t && 'object' == typeof t)
      for (const e of Object.keys(t)) r(e, t[e])
    return (
      'function' == typeof e.sortMapEntries && o.items.sort(e.sortMapEntries),
      o
    )
  }
  add(e, t) {
    let n
    n = u(e)
      ? e
      : e && 'object' == typeof e && 'key' in e
        ? new de(e.key, e.value)
        : new de(e, e?.value)
    const s = be(this.items, n.key),
      i = this.schema?.sortMapEntries
    if (s) {
      if (!t) throw new Error(`Key ${n.key} already set`)
      f(s.value) && j(n.value) ? (s.value.value = n.value) : (s.value = n.value)
    } else if (i) {
      const e = this.items.findIndex((e) => i(n, e) < 0)
      ;-1 === e ? this.items.push(n) : this.items.splice(e, 0, n)
    } else this.items.push(n)
  }
  delete(e) {
    const t = be(this.items, e)
    if (!t) return !1
    return this.items.splice(this.items.indexOf(t), 1).length > 0
  }
  get(e, t) {
    const n = be(this.items, e),
      s = n?.value
    return (!t && f(s) ? s.value : s) ?? void 0
  }
  has(e) {
    return !!be(this.items, e)
  }
  set(e, t) {
    this.add(new de(e, t), !0)
  }
  toJSON(e, t, n) {
    const s = n ? new n() : t?.mapAsMap ? new Map() : {}
    t?.onCreate && t.onCreate(s)
    for (const e of this.items) fe(t, s, e)
    return s
  }
  toString(e, t, n) {
    if (!e) return JSON.stringify(this)
    for (const e of this.items)
      if (!u(e))
        throw new Error(
          `Map items must all be pairs; found ${JSON.stringify(e)} instead`,
        )
    return (
      !e.allNullValues &&
        this.hasAllNullValues(!1) &&
        (e = Object.assign({}, e, { allNullValues: !0 })),
      pe(this, e, {
        blockItemPrefix: '',
        flowChars: { start: '{', end: '}' },
        itemIndent: e.indent || '',
        onChompKeep: n,
        onComment: t,
      })
    )
  }
}
const we = {
  collection: 'map',
  default: !0,
  nodeClass: ke,
  tag: 'tag:yaml.org,2002:map',
  resolve: (e, t) => (l(e) || t('Expected a mapping for this tag'), e),
  createNode: (e, t, n) => ke.from(e, t, n),
}
class ve extends U {
  static get tagName() {
    return 'tag:yaml.org,2002:seq'
  }
  constructor(e) {
    ;(super(o, e), (this.items = []))
  }
  add(e) {
    this.items.push(e)
  }
  delete(e) {
    const t = Se(e)
    if ('number' != typeof t) return !1
    return this.items.splice(t, 1).length > 0
  }
  get(e, t) {
    const n = Se(e)
    if ('number' != typeof n) return
    const s = this.items[n]
    return !t && f(s) ? s.value : s
  }
  has(e) {
    const t = Se(e)
    return 'number' == typeof t && t < this.items.length
  }
  set(e, t) {
    const n = Se(e)
    if ('number' != typeof n)
      throw new Error(`Expected a valid index, not ${e}.`)
    const s = this.items[n]
    f(s) && j(t) ? (s.value = t) : (this.items[n] = t)
  }
  toJSON(e, t) {
    const n = []
    t?.onCreate && t.onCreate(n)
    let s = 0
    for (const e of this.items) n.push(C(e, String(s++), t))
    return n
  }
  toString(e, t, n) {
    return e
      ? pe(this, e, {
          blockItemPrefix: '- ',
          flowChars: { start: '[', end: ']' },
          itemIndent: (e.indent || '') + '  ',
          onChompKeep: n,
          onComment: t,
        })
      : JSON.stringify(this)
  }
  static from(e, t, n) {
    const { replacer: s } = n,
      i = new this(e)
    if (t && Symbol.iterator in Object(t)) {
      let e = 0
      for (let o of t) {
        if ('function' == typeof s) {
          const n = t instanceof Set ? o : String(e++)
          o = s.call(t, n, o)
        }
        i.items.push(D(o, void 0, n))
      }
    }
    return i
  }
}
function Se(e) {
  let t = f(e) ? e.value : e
  return (
    t && 'string' == typeof t && (t = Number(t)),
    'number' == typeof t && Number.isInteger(t) && t >= 0 ? t : null
  )
}
const Ee = {
    collection: 'seq',
    default: !0,
    nodeClass: ve,
    tag: 'tag:yaml.org,2002:seq',
    resolve: (e, t) => (h(e) || t('Expected a sequence for this tag'), e),
    createNode: (e, t, n) => ve.from(e, t, n),
  },
  Ne = {
    identify: (e) => 'string' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:str',
    resolve: (e) => e,
    stringify: (e, t, n, s) =>
      se(e, (t = Object.assign({ actualString: !0 }, t)), n, s),
  },
  Oe = {
    identify: (e) => null == e,
    createNode: () => new M(null),
    default: !0,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new M(null),
    stringify: ({ source: e }, t) =>
      'string' == typeof e && Oe.test.test(e) ? e : t.options.nullStr,
  },
  Ae = {
    identify: (e) => 'boolean' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: (e) => new M('t' === e[0] || 'T' === e[0]),
    stringify({ source: e, value: t }, n) {
      if (e && Ae.test.test(e)) {
        if (t === ('t' === e[0] || 'T' === e[0])) return e
      }
      return t ? n.options.trueStr : n.options.falseStr
    },
  }
function Ie({ format: e, minFractionDigits: t, tag: n, value: s }) {
  if ('bigint' == typeof s) return String(s)
  const i = 'number' == typeof s ? s : Number(s)
  if (!isFinite(i)) return isNaN(i) ? '.nan' : i < 0 ? '-.inf' : '.inf'
  let o = JSON.stringify(s)
  if (!e && t && (!n || 'tag:yaml.org,2002:float' === n) && /^\d/.test(o)) {
    let e = o.indexOf('.')
    e < 0 && ((e = o.length), (o += '.'))
    let n = t - (o.length - e - 1)
    for (; n-- > 0; ) o += '0'
  }
  return o
}
const Te = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (e) =>
      'nan' === e.slice(-3).toLowerCase()
        ? NaN
        : '-' === e[0]
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: Ie,
  },
  Le = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: (e) => parseFloat(e),
    stringify(e) {
      const t = Number(e.value)
      return isFinite(t) ? t.toExponential() : Ie(e)
    },
  },
  xe = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(e) {
      const t = new M(parseFloat(e)),
        n = e.indexOf('.')
      return (
        -1 !== n &&
          '0' === e[e.length - 1] &&
          (t.minFractionDigits = e.length - n - 1),
        t
      )
    },
    stringify: Ie,
  },
  $e = (e) => 'bigint' == typeof e || Number.isInteger(e),
  Ce = (e, t, n, { intAsBigInt: s }) =>
    s ? BigInt(e) : parseInt(e.substring(t), n)
function _e(e, t, n) {
  const { value: s } = e
  return $e(s) && s >= 0 ? n + s.toString(t) : Ie(e)
}
const Ke = {
    identify: (e) => $e(e) && e >= 0,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^0o[0-7]+$/,
    resolve: (e, t, n) => Ce(e, 2, 8, n),
    stringify: (e) => _e(e, 8, '0o'),
  },
  Be = {
    identify: $e,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9]+$/,
    resolve: (e, t, n) => Ce(e, 0, 10, n),
    stringify: Ie,
  },
  je = {
    identify: (e) => $e(e) && e >= 0,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (e, t, n) => Ce(e, 2, 16, n),
    stringify: (e) => _e(e, 16, '0x'),
  },
  Me = [we, Ee, Ne, Oe, Ae, Ke, Be, je, Te, Le, xe]
function De(e) {
  return 'bigint' == typeof e || Number.isInteger(e)
}
const qe = ({ value: e }) => JSON.stringify(e),
  Pe = [we, Ee].concat(
    [
      {
        identify: (e) => 'string' == typeof e,
        default: !0,
        tag: 'tag:yaml.org,2002:str',
        resolve: (e) => e,
        stringify: qe,
      },
      {
        identify: (e) => null == e,
        createNode: () => new M(null),
        default: !0,
        tag: 'tag:yaml.org,2002:null',
        test: /^null$/,
        resolve: () => null,
        stringify: qe,
      },
      {
        identify: (e) => 'boolean' == typeof e,
        default: !0,
        tag: 'tag:yaml.org,2002:bool',
        test: /^true$|^false$/,
        resolve: (e) => 'true' === e,
        stringify: qe,
      },
      {
        identify: De,
        default: !0,
        tag: 'tag:yaml.org,2002:int',
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (e, t, { intAsBigInt: n }) =>
          n ? BigInt(e) : parseInt(e, 10),
        stringify: ({ value: e }) => (De(e) ? e.toString() : JSON.stringify(e)),
      },
      {
        identify: (e) => 'number' == typeof e,
        default: !0,
        tag: 'tag:yaml.org,2002:float',
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (e) => parseFloat(e),
        stringify: qe,
      },
    ],
    {
      default: !0,
      tag: '',
      test: /^/,
      resolve: (e, t) => (t(`Unresolved plain scalar ${JSON.stringify(e)}`), e),
    },
  ),
  Ue = {
    identify: (e) => e instanceof Uint8Array,
    default: !1,
    tag: 'tag:yaml.org,2002:binary',
    resolve(e, t) {
      if ('function' == typeof atob) {
        const t = atob(e.replace(/[\n\r]/g, '')),
          n = new Uint8Array(t.length)
        for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e)
        return n
      }
      return (
        t(
          'This environment does not support reading binary tags; either Buffer or atob is required',
        ),
        e
      )
    },
    stringify({ comment: e, type: t, value: n }, s, i, o) {
      if (!n) return ''
      const r = n
      let a
      if ('function' != typeof btoa)
        throw new Error(
          'This environment does not support writing binary tags; either Buffer or btoa is required',
        )
      {
        let e = ''
        for (let t = 0; t < r.length; ++t) e += String.fromCharCode(r[t])
        a = btoa(e)
      }
      if ((t ?? (t = M.BLOCK_LITERAL), t !== M.QUOTE_DOUBLE)) {
        const e = Math.max(
            s.options.lineWidth - s.indent.length,
            s.options.minContentWidth,
          ),
          n = Math.ceil(a.length / e),
          i = new Array(n)
        for (let t = 0, s = 0; t < n; ++t, s += e) i[t] = a.substr(s, e)
        a = i.join(t === M.BLOCK_LITERAL ? '\n' : ' ')
      }
      return se({ comment: e, type: t, value: a }, s, i, o)
    },
  }
function Re(e, t) {
  if (h(e))
    for (let n = 0; n < e.items.length; ++n) {
      let s = e.items[n]
      if (!u(s)) {
        if (l(s)) {
          s.items.length > 1 &&
            t('Each pair must have its own sequence indicator')
          const e = s.items[0] || new de(new M(null))
          if (
            (s.commentBefore &&
              (e.key.commentBefore = e.key.commentBefore
                ? `${s.commentBefore}\n${e.key.commentBefore}`
                : s.commentBefore),
            s.comment)
          ) {
            const t = e.value ?? e.key
            t.comment = t.comment ? `${s.comment}\n${t.comment}` : s.comment
          }
          s = e
        }
        e.items[n] = u(s) ? s : new de(s)
      }
    }
  else t('Expected a sequence for this tag')
  return e
}
function Fe(e, t, n) {
  const { replacer: s } = n,
    i = new ve(e)
  i.tag = 'tag:yaml.org,2002:pairs'
  let o = 0
  if (t && Symbol.iterator in Object(t))
    for (let e of t) {
      let r, a
      if (
        ('function' == typeof s && (e = s.call(t, String(o++), e)),
        Array.isArray(e))
      ) {
        if (2 !== e.length)
          throw new TypeError(`Expected [key, value] tuple: ${e}`)
        ;((r = e[0]), (a = e[1]))
      } else if (e && e instanceof Object) {
        const t = Object.keys(e)
        if (1 !== t.length)
          throw new TypeError(
            `Expected tuple with one key, not ${t.length} keys`,
          )
        ;((r = t[0]), (a = e[r]))
      } else r = e
      i.items.push(he(r, a, n))
    }
  return i
}
const Ve = {
  collection: 'seq',
  default: !1,
  tag: 'tag:yaml.org,2002:pairs',
  resolve: Re,
  createNode: Fe,
}
class Je extends ve {
  constructor() {
    ;(super(),
      (this.add = ke.prototype.add.bind(this)),
      (this.delete = ke.prototype.delete.bind(this)),
      (this.get = ke.prototype.get.bind(this)),
      (this.has = ke.prototype.has.bind(this)),
      (this.set = ke.prototype.set.bind(this)),
      (this.tag = Je.tag))
  }
  toJSON(e, t) {
    if (!t) return super.toJSON(e)
    const n = new Map()
    t?.onCreate && t.onCreate(n)
    for (const e of this.items) {
      let s, i
      if (
        (u(e)
          ? ((s = C(e.key, '', t)), (i = C(e.value, s, t)))
          : (s = C(e, '', t)),
        n.has(s))
      )
        throw new Error('Ordered maps must not include duplicate keys')
      n.set(s, i)
    }
    return n
  }
  static from(e, t, n) {
    const s = Fe(e, t, n),
      i = new this()
    return ((i.items = s.items), i)
  }
}
Je.tag = 'tag:yaml.org,2002:omap'
const Ye = {
  collection: 'seq',
  identify: (e) => e instanceof Map,
  nodeClass: Je,
  default: !1,
  tag: 'tag:yaml.org,2002:omap',
  resolve(e, t) {
    const n = Re(e, t),
      s = []
    for (const { key: e } of n.items)
      f(e) &&
        (s.includes(e.value)
          ? t(`Ordered maps must not include duplicate keys: ${e.value}`)
          : s.push(e.value))
    return Object.assign(new Je(), n)
  },
  createNode: (e, t, n) => Je.from(e, t, n),
}
function We({ value: e, source: t }, n) {
  return t && (e ? Ge : Qe).test.test(t)
    ? t
    : e
      ? n.options.trueStr
      : n.options.falseStr
}
const Ge = {
    identify: (e) => !0 === e,
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new M(!0),
    stringify: We,
  },
  Qe = {
    identify: (e) => !1 === e,
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new M(!1),
    stringify: We,
  },
  He = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (e) =>
      'nan' === e.slice(-3).toLowerCase()
        ? NaN
        : '-' === e[0]
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: Ie,
  },
  Xe = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (e) => parseFloat(e.replace(/_/g, '')),
    stringify(e) {
      const t = Number(e.value)
      return isFinite(t) ? t.toExponential() : Ie(e)
    },
  },
  ze = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(e) {
      const t = new M(parseFloat(e.replace(/_/g, ''))),
        n = e.indexOf('.')
      if (-1 !== n) {
        const s = e.substring(n + 1).replace(/_/g, '')
        '0' === s[s.length - 1] && (t.minFractionDigits = s.length)
      }
      return t
    },
    stringify: Ie,
  },
  Ze = (e) => 'bigint' == typeof e || Number.isInteger(e)
function et(e, t, n, { intAsBigInt: s }) {
  const i = e[0]
  if (
    (('-' !== i && '+' !== i) || (t += 1),
    (e = e.substring(t).replace(/_/g, '')),
    s)
  ) {
    switch (n) {
      case 2:
        e = `0b${e}`
        break
      case 8:
        e = `0o${e}`
        break
      case 16:
        e = `0x${e}`
    }
    const t = BigInt(e)
    return '-' === i ? BigInt(-1) * t : t
  }
  const o = parseInt(e, n)
  return '-' === i ? -1 * o : o
}
function tt(e, t, n) {
  const { value: s } = e
  if (Ze(s)) {
    const e = s.toString(t)
    return s < 0 ? '-' + n + e.substr(1) : n + e
  }
  return Ie(e)
}
const nt = {
    identify: Ze,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'BIN',
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (e, t, n) => et(e, 2, 2, n),
    stringify: (e) => tt(e, 2, '0b'),
  },
  st = {
    identify: Ze,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^[-+]?0[0-7_]+$/,
    resolve: (e, t, n) => et(e, 1, 8, n),
    stringify: (e) => tt(e, 8, '0'),
  },
  it = {
    identify: Ze,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (e, t, n) => et(e, 0, 10, n),
    stringify: Ie,
  },
  ot = {
    identify: Ze,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (e, t, n) => et(e, 2, 16, n),
    stringify: (e) => tt(e, 16, '0x'),
  }
class rt extends ke {
  constructor(e) {
    ;(super(e), (this.tag = rt.tag))
  }
  add(e) {
    let t
    t = u(e)
      ? e
      : e &&
          'object' == typeof e &&
          'key' in e &&
          'value' in e &&
          null === e.value
        ? new de(e.key, null)
        : new de(e, null)
    be(this.items, t.key) || this.items.push(t)
  }
  get(e, t) {
    const n = be(this.items, e)
    return !t && u(n) ? (f(n.key) ? n.key.value : n.key) : n
  }
  set(e, t) {
    if ('boolean' != typeof t)
      throw new Error(
        'Expected boolean value for set(key, value) in a YAML set, not ' +
          typeof t,
      )
    const n = be(this.items, e)
    n && !t
      ? this.items.splice(this.items.indexOf(n), 1)
      : !n && t && this.items.push(new de(e))
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set)
  }
  toString(e, t, n) {
    if (!e) return JSON.stringify(this)
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, n)
    throw new Error('Set items must all have null values')
  }
  static from(e, t, n) {
    const { replacer: s } = n,
      i = new this(e)
    if (t && Symbol.iterator in Object(t))
      for (let e of t)
        ('function' == typeof s && (e = s.call(t, e, e)),
          i.items.push(he(e, null, n)))
    return i
  }
}
rt.tag = 'tag:yaml.org,2002:set'
const at = {
  collection: 'map',
  identify: (e) => e instanceof Set,
  nodeClass: rt,
  default: !1,
  tag: 'tag:yaml.org,2002:set',
  createNode: (e, t, n) => rt.from(e, t, n),
  resolve(e, t) {
    if (l(e)) {
      if (e.hasAllNullValues(!0)) return Object.assign(new rt(), e)
      t('Set items must all have null values')
    } else t('Expected a mapping for this tag')
    return e
  },
}
function ct(e, t) {
  const n = e[0],
    s = '-' === n || '+' === n ? e.substring(1) : e,
    i = (e) => (t ? BigInt(e) : Number(e)),
    o = s
      .replace(/_/g, '')
      .split(':')
      .reduce((e, t) => e * i(60) + i(t), i(0))
  return '-' === n ? i(-1) * o : o
}
function lt(e) {
  let { value: t } = e,
    n = (e) => e
  if ('bigint' == typeof t) n = (e) => BigInt(e)
  else if (isNaN(t) || !isFinite(t)) return Ie(e)
  let s = ''
  t < 0 && ((s = '-'), (t *= n(-1)))
  const i = n(60),
    o = [t % i]
  return (
    t < 60
      ? o.unshift(0)
      : ((t = (t - o[0]) / i),
        o.unshift(t % i),
        t >= 60 && ((t = (t - o[0]) / i), o.unshift(t))),
    s +
      o
        .map((e) => String(e).padStart(2, '0'))
        .join(':')
        .replace(/000000\d*$/, '')
  )
}
const ut = {
    identify: (e) => 'bigint' == typeof e || Number.isInteger(e),
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (e, t, { intAsBigInt: n }) => ct(e, n),
    stringify: lt,
  },
  ft = {
    identify: (e) => 'number' == typeof e,
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: (e) => ct(e, !1),
    stringify: lt,
  },
  ht = {
    identify: (e) => e instanceof Date,
    default: !0,
    tag: 'tag:yaml.org,2002:timestamp',
    test: RegExp(
      '^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$',
    ),
    resolve(e) {
      const t = e.match(ht.test)
      if (!t)
        throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd')
      const [, n, s, i, o, r, a] = t.map(Number),
        c = t[7] ? Number((t[7] + '00').substr(1, 3)) : 0
      let l = Date.UTC(n, s - 1, i, o || 0, r || 0, a || 0, c)
      const u = t[8]
      if (u && 'Z' !== u) {
        let e = ct(u, !1)
        ;(Math.abs(e) < 30 && (e *= 60), (l -= 6e4 * e))
      }
      return new Date(l)
    },
    stringify: ({ value: e }) =>
      e?.toISOString().replace(/(T00:00:00)?\.000Z$/, '') ?? '',
  },
  dt = [
    we,
    Ee,
    Ne,
    Oe,
    Ge,
    Qe,
    nt,
    st,
    it,
    ot,
    He,
    Xe,
    ze,
    Ue,
    ce,
    Ye,
    Ve,
    at,
    ut,
    ft,
    ht,
  ],
  pt = new Map([
    ['core', Me],
    ['failsafe', [we, Ee, Ne]],
    ['json', Pe],
    ['yaml11', dt],
    ['yaml-1.1', dt],
  ]),
  mt = {
    binary: Ue,
    bool: Ae,
    float: xe,
    floatExp: Le,
    floatNaN: Te,
    floatTime: ft,
    int: Be,
    intHex: je,
    intOct: Ke,
    intTime: ut,
    map: we,
    merge: ce,
    null: Oe,
    omap: Ye,
    pairs: Ve,
    seq: Ee,
    set: at,
    timestamp: ht,
  },
  yt = {
    'tag:yaml.org,2002:binary': Ue,
    'tag:yaml.org,2002:merge': ce,
    'tag:yaml.org,2002:omap': Ye,
    'tag:yaml.org,2002:pairs': Ve,
    'tag:yaml.org,2002:set': at,
    'tag:yaml.org,2002:timestamp': ht,
  }
function gt(e, t, n) {
  const s = pt.get(t)
  if (s && !e) return n && !s.includes(ce) ? s.concat(ce) : s.slice()
  let i = s
  if (!i) {
    if (!Array.isArray(e)) {
      const e = Array.from(pt.keys())
        .filter((e) => 'yaml11' !== e)
        .map((e) => JSON.stringify(e))
        .join(', ')
      throw new Error(
        `Unknown schema "${t}"; use one of ${e} or define customTags array`,
      )
    }
    i = []
  }
  if (Array.isArray(e)) for (const t of e) i = i.concat(t)
  else 'function' == typeof e && (i = e(i.slice()))
  return (
    n && (i = i.concat(ce)),
    i.reduce((e, t) => {
      const n = 'string' == typeof t ? mt[t] : t
      if (!n) {
        const e = JSON.stringify(t),
          n = Object.keys(mt)
            .map((e) => JSON.stringify(e))
            .join(', ')
        throw new Error(`Unknown custom tag ${e}; use one of ${n}`)
      }
      return (e.includes(n) || e.push(n), e)
    }, [])
  )
}
const bt = (e, t) => (e.key < t.key ? -1 : e.key > t.key ? 1 : 0)
class kt {
  constructor({
    compat: e,
    customTags: t,
    merge: s,
    resolveKnownTags: r,
    schema: a,
    sortMapEntries: c,
    toStringDefaults: l,
  }) {
    ;((this.compat = Array.isArray(e)
      ? gt(e, 'compat')
      : e
        ? gt(null, e)
        : null),
      (this.name = ('string' == typeof a && a) || 'core'),
      (this.knownTags = r ? yt : {}),
      (this.tags = gt(t, this.name, s)),
      (this.toStringOptions = l ?? null),
      Object.defineProperty(this, n, { value: we }),
      Object.defineProperty(this, i, { value: Ne }),
      Object.defineProperty(this, o, { value: Ee }),
      (this.sortMapEntries = 'function' == typeof c ? c : !0 === c ? bt : null))
  }
  clone() {
    const e = Object.create(
      kt.prototype,
      Object.getOwnPropertyDescriptors(this),
    )
    return ((e.tags = this.tags.slice()), e)
  }
}
class wt {
  constructor(e, n, s) {
    ;((this.commentBefore = null),
      (this.comment = null),
      (this.errors = []),
      (this.warnings = []),
      Object.defineProperty(this, r, { value: t }))
    let i = null
    'function' == typeof n || Array.isArray(n)
      ? (i = n)
      : void 0 === s && n && ((s = n), (n = void 0))
    const o = Object.assign(
      {
        intAsBigInt: !1,
        keepSourceTokens: !1,
        logLevel: 'warn',
        prettyErrors: !0,
        strict: !0,
        stringKeys: !1,
        uniqueKeys: !0,
        version: '1.2',
      },
      s,
    )
    this.options = o
    let { version: a } = o
    ;(s?._directives
      ? ((this.directives = s._directives.atDocument()),
        this.directives.yaml.explicit && (a = this.directives.yaml.version))
      : (this.directives = new I({ version: a })),
      this.setSchema(a, s),
      (this.contents = void 0 === e ? null : this.createNode(e, i, s)))
  }
  clone() {
    const e = Object.create(wt.prototype, { [r]: { value: t } })
    return (
      (e.commentBefore = this.commentBefore),
      (e.comment = this.comment),
      (e.errors = this.errors.slice()),
      (e.warnings = this.warnings.slice()),
      (e.options = Object.assign({}, this.options)),
      this.directives && (e.directives = this.directives.clone()),
      (e.schema = this.schema.clone()),
      (e.contents = p(this.contents)
        ? this.contents.clone(e.schema)
        : this.contents),
      this.range && (e.range = this.range.slice()),
      e
    )
  }
  add(e) {
    vt(this.contents) && this.contents.add(e)
  }
  addIn(e, t) {
    vt(this.contents) && this.contents.addIn(e, t)
  }
  createAlias(e, t) {
    if (!e.anchor) {
      const n = L(this)
      e.anchor = !t || n.has(t) ? x(t || 'a', n) : t
    }
    return new K(e.anchor)
  }
  createNode(e, t, n) {
    let s
    if ('function' == typeof t) ((e = t.call({ '': e }, '', e)), (s = t))
    else if (Array.isArray(t)) {
      const e = (e) =>
          'number' == typeof e || e instanceof String || e instanceof Number,
        n = t.filter(e).map(String)
      ;(n.length > 0 && (t = t.concat(n)), (s = t))
    } else void 0 === n && t && ((n = t), (t = void 0))
    const {
        aliasDuplicateObjects: i,
        anchorPrefix: o,
        flow: r,
        keepUndefined: a,
        onTagObj: c,
        tag: l,
      } = n ?? {},
      {
        onAnchor: u,
        setAnchors: h,
        sourceObjects: p,
      } = (function (e, t) {
        const n = [],
          s = new Map()
        let i = null
        return {
          onAnchor: (s) => {
            ;(n.push(s), i ?? (i = L(e)))
            const o = x(t, i)
            return (i.add(o), o)
          },
          setAnchors: () => {
            for (const e of n) {
              const t = s.get(e)
              if (
                'object' != typeof t ||
                !t.anchor ||
                (!f(t.node) && !d(t.node))
              ) {
                const t = new Error(
                  'Failed to resolve repeated object (this should not happen)',
                )
                throw ((t.source = e), t)
              }
              t.node.anchor = t.anchor
            }
          },
          sourceObjects: s,
        }
      })(this, o || 'a'),
      m = D(e, l, {
        aliasDuplicateObjects: i ?? !0,
        keepUndefined: a ?? !1,
        onAnchor: u,
        onTagObj: c,
        replacer: s,
        schema: this.schema,
        sourceObjects: p,
      })
    return (r && d(m) && (m.flow = !0), h(), m)
  }
  createPair(e, t, n = {}) {
    const s = this.createNode(e, null, n),
      i = this.createNode(t, null, n)
    return new de(s, i)
  }
  delete(e) {
    return !!vt(this.contents) && this.contents.delete(e)
  }
  deleteIn(e) {
    return P(e)
      ? null != this.contents && ((this.contents = null), !0)
      : !!vt(this.contents) && this.contents.deleteIn(e)
  }
  get(e, t) {
    return d(this.contents) ? this.contents.get(e, t) : void 0
  }
  getIn(e, t) {
    return P(e)
      ? !t && f(this.contents)
        ? this.contents.value
        : this.contents
      : d(this.contents)
        ? this.contents.getIn(e, t)
        : void 0
  }
  has(e) {
    return !!d(this.contents) && this.contents.has(e)
  }
  hasIn(e) {
    return P(e)
      ? void 0 !== this.contents
      : !!d(this.contents) && this.contents.hasIn(e)
  }
  set(e, t) {
    null == this.contents
      ? (this.contents = q(this.schema, [e], t))
      : vt(this.contents) && this.contents.set(e, t)
  }
  setIn(e, t) {
    P(e)
      ? (this.contents = t)
      : null == this.contents
        ? (this.contents = q(this.schema, Array.from(e), t))
        : vt(this.contents) && this.contents.setIn(e, t)
  }
  setSchema(e, t = {}) {
    let n
    switch (('number' == typeof e && (e = String(e)), e)) {
      case '1.1':
        ;(this.directives
          ? (this.directives.yaml.version = '1.1')
          : (this.directives = new I({ version: '1.1' })),
          (n = { resolveKnownTags: !1, schema: 'yaml-1.1' }))
        break
      case '1.2':
      case 'next':
        ;(this.directives
          ? (this.directives.yaml.version = e)
          : (this.directives = new I({ version: e })),
          (n = { resolveKnownTags: !0, schema: 'core' }))
        break
      case null:
        ;(this.directives && delete this.directives, (n = null))
        break
      default: {
        const t = JSON.stringify(e)
        throw new Error(
          `Expected '1.1', '1.2' or null as first argument, but found: ${t}`,
        )
      }
    }
    if (t.schema instanceof Object) this.schema = t.schema
    else {
      if (!n)
        throw new Error(
          'With a null YAML version, the { schema: Schema } option is required',
        )
      this.schema = new kt(Object.assign(n, t))
    }
  }
  toJS({
    json: e,
    jsonArg: t,
    mapAsMap: n,
    maxAliasCount: s,
    onAnchor: i,
    reviver: o,
  } = {}) {
    const r = {
        anchors: new Map(),
        doc: this,
        keep: !e,
        mapAsMap: !0 === n,
        mapKeyWarned: !1,
        maxAliasCount: 'number' == typeof s ? s : 100,
      },
      a = C(this.contents, t ?? '', r)
    if ('function' == typeof i)
      for (const { count: e, res: t } of r.anchors.values()) i(t, e)
    return 'function' == typeof o ? $(o, { '': a }, '', a) : a
  }
  toJSON(e, t) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t })
  }
  toString(e = {}) {
    if (this.errors.length > 0)
      throw new Error('Document with errors cannot be stringified')
    if (
      'indent' in e &&
      (!Number.isInteger(e.indent) || Number(e.indent) <= 0)
    ) {
      const t = JSON.stringify(e.indent)
      throw new Error(`"indent" option must be a positive integer, not ${t}`)
    }
    return (function (e, t) {
      const n = []
      let s = !0 === t.directives
      if (!1 !== t.directives && e.directives) {
        const t = e.directives.toString(e)
        t ? (n.push(t), (s = !0)) : e.directives.docStart && (s = !0)
      }
      s && n.push('---')
      const i = ie(e, t),
        { commentString: o } = i.options
      if (e.commentBefore) {
        1 !== n.length && n.unshift('')
        const t = o(e.commentBefore)
        n.unshift(F(t, ''))
      }
      let r = !1,
        a = null
      if (e.contents) {
        if (p(e.contents)) {
          if (
            (e.contents.spaceBefore && s && n.push(''),
            e.contents.commentBefore)
          ) {
            const t = o(e.contents.commentBefore)
            n.push(F(t, ''))
          }
          ;((i.forceBlockIndent = !!e.comment), (a = e.contents.comment))
        }
        const t = a ? void 0 : () => (r = !0)
        let c = oe(e.contents, i, () => (a = null), t)
        ;(a && (c += V(c, '', o(a))),
          ('|' !== c[0] && '>' !== c[0]) || '---' !== n[n.length - 1]
            ? n.push(c)
            : (n[n.length - 1] = `--- ${c}`))
      } else n.push(oe(e.contents, i))
      if (e.directives?.docEnd)
        if (e.comment) {
          const t = o(e.comment)
          t.includes('\n')
            ? (n.push('...'), n.push(F(t, '')))
            : n.push(`... ${t}`)
        } else n.push('...')
      else {
        let t = e.comment
        ;(t && r && (t = t.replace(/^\n+/, '')),
          t &&
            ((r && !a) || '' === n[n.length - 1] || n.push(''),
            n.push(F(o(t), ''))))
      }
      return n.join('\n') + '\n'
    })(this, e)
  }
}
function vt(e) {
  if (d(e)) return !0
  throw new Error('Expected a YAML collection as document contents')
}
class St extends Error {
  constructor(e, t, n, s) {
    ;(super(),
      (this.name = e),
      (this.code = n),
      (this.message = s),
      (this.pos = t))
  }
}
class Et extends St {
  constructor(e, t, n) {
    super('YAMLParseError', e, t, n)
  }
}
class Nt extends St {
  constructor(e, t, n) {
    super('YAMLWarning', e, t, n)
  }
}
const Ot = (e, t) => (n) => {
  if (-1 === n.pos[0]) return
  n.linePos = n.pos.map((e) => t.linePos(e))
  const { line: s, col: i } = n.linePos[0]
  n.message += ` at line ${s}, column ${i}`
  let o = i - 1,
    r = e
      .substring(t.lineStarts[s - 1], t.lineStarts[s])
      .replace(/[\n\r]+$/, '')
  if (o >= 60 && r.length > 80) {
    const e = Math.min(o - 39, r.length - 79)
    ;((r = '…' + r.substring(e)), (o -= e - 1))
  }
  if (
    (r.length > 80 && (r = r.substring(0, 79) + '…'),
    s > 1 && /^ *$/.test(r.substring(0, o)))
  ) {
    let n = e.substring(t.lineStarts[s - 2], t.lineStarts[s - 1])
    ;(n.length > 80 && (n = n.substring(0, 79) + '…\n'), (r = n + r))
  }
  if (/[^ ]/.test(r)) {
    let e = 1
    const t = n.linePos[1]
    t &&
      t.line === s &&
      t.col > i &&
      (e = Math.max(1, Math.min(t.col - i, 80 - o)))
    const a = ' '.repeat(o) + '^'.repeat(e)
    n.message += `:\n\n${r}\n${a}\n`
  }
}
function At(
  e,
  {
    flow: t,
    indicator: n,
    next: s,
    offset: i,
    onError: o,
    parentIndent: r,
    startOnNewline: a,
  },
) {
  let c = !1,
    l = a,
    u = a,
    f = '',
    h = '',
    d = !1,
    p = !1,
    m = null,
    y = null,
    g = null,
    b = null,
    k = null,
    w = null,
    v = null
  for (const i of e)
    switch (
      (p &&
        ('space' !== i.type &&
          'newline' !== i.type &&
          'comma' !== i.type &&
          o(
            i.offset,
            'MISSING_CHAR',
            'Tags and anchors must be separated from the next token by white space',
          ),
        (p = !1)),
      m &&
        (l &&
          'comment' !== i.type &&
          'newline' !== i.type &&
          o(m, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'),
        (m = null)),
      i.type)
    ) {
      case 'space':
        ;(t ||
          ('doc-start' === n && 'flow-collection' === s?.type) ||
          !i.source.includes('\t') ||
          (m = i),
          (u = !0))
        break
      case 'comment': {
        u ||
          o(
            i,
            'MISSING_CHAR',
            'Comments must be separated from other tokens by white space characters',
          )
        const e = i.source.substring(1) || ' '
        ;(f ? (f += h + e) : (f = e), (h = ''), (l = !1))
        break
      }
      case 'newline':
        ;(l
          ? f
            ? (f += i.source)
            : (w && 'seq-item-ind' === n) || (c = !0)
          : (h += i.source),
          (l = !0),
          (d = !0),
          (y || g) && (b = i),
          (u = !0))
        break
      case 'anchor':
        ;(y && o(i, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor'),
          i.source.endsWith(':') &&
            o(
              i.offset + i.source.length - 1,
              'BAD_ALIAS',
              'Anchor ending in : is ambiguous',
              !0,
            ),
          (y = i),
          v ?? (v = i.offset),
          (l = !1),
          (u = !1),
          (p = !0))
        break
      case 'tag':
        ;(g && o(i, 'MULTIPLE_TAGS', 'A node can have at most one tag'),
          (g = i),
          v ?? (v = i.offset),
          (l = !1),
          (u = !1),
          (p = !0))
        break
      case n:
        ;((y || g) &&
          o(
            i,
            'BAD_PROP_ORDER',
            `Anchors and tags must be after the ${i.source} indicator`,
          ),
          w &&
            o(
              i,
              'UNEXPECTED_TOKEN',
              `Unexpected ${i.source} in ${t ?? 'collection'}`,
            ),
          (w = i),
          (l = 'seq-item-ind' === n || 'explicit-key-ind' === n),
          (u = !1))
        break
      case 'comma':
        if (t) {
          ;(k && o(i, 'UNEXPECTED_TOKEN', `Unexpected , in ${t}`),
            (k = i),
            (l = !1),
            (u = !1))
          break
        }
      default:
        ;(o(i, 'UNEXPECTED_TOKEN', `Unexpected ${i.type} token`),
          (l = !1),
          (u = !1))
    }
  const S = e[e.length - 1],
    E = S ? S.offset + S.source.length : i
  return (
    p &&
      s &&
      'space' !== s.type &&
      'newline' !== s.type &&
      'comma' !== s.type &&
      ('scalar' !== s.type || '' !== s.source) &&
      o(
        s.offset,
        'MISSING_CHAR',
        'Tags and anchors must be separated from the next token by white space',
      ),
    m &&
      ((l && m.indent <= r) ||
        'block-map' === s?.type ||
        'block-seq' === s?.type) &&
      o(m, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'),
    {
      comma: k,
      found: w,
      spaceBefore: c,
      comment: f,
      hasNewline: d,
      anchor: y,
      tag: g,
      newlineAfterProp: b,
      end: E,
      start: v ?? E,
    }
  )
}
function It(e) {
  if (!e) return null
  switch (e.type) {
    case 'alias':
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      if (e.source.includes('\n')) return !0
      if (e.end) for (const t of e.end) if ('newline' === t.type) return !0
      return !1
    case 'flow-collection':
      for (const t of e.items) {
        for (const e of t.start) if ('newline' === e.type) return !0
        if (t.sep) for (const e of t.sep) if ('newline' === e.type) return !0
        if (It(t.key) || It(t.value)) return !0
      }
      return !1
    default:
      return !0
  }
}
function Tt(e, t, n) {
  if ('flow-collection' === t?.type) {
    const s = t.end[0]
    if (s.indent === e && (']' === s.source || '}' === s.source) && It(t)) {
      n(
        s,
        'BAD_INDENT',
        'Flow end indicator should be more indented than parent',
        !0,
      )
    }
  }
}
function Lt(e, t, n) {
  const { uniqueKeys: s } = e.options
  if (!1 === s) return !1
  const i =
    'function' == typeof s
      ? s
      : (e, t) => e === t || (f(e) && f(t) && e.value === t.value)
  return t.some((e) => i(e.key, n))
}
const xt = 'All mapping items must start at the same column'
function $t(e, t, n, s) {
  let i = ''
  if (e) {
    let o = !1,
      r = ''
    for (const a of e) {
      const { source: e, type: c } = a
      switch (c) {
        case 'space':
          o = !0
          break
        case 'comment': {
          n &&
            !o &&
            s(
              a,
              'MISSING_CHAR',
              'Comments must be separated from other tokens by white space characters',
            )
          const t = e.substring(1) || ' '
          ;(i ? (i += r + t) : (i = t), (r = ''))
          break
        }
        case 'newline':
          ;(i && (r += e), (o = !0))
          break
        default:
          s(a, 'UNEXPECTED_TOKEN', `Unexpected ${c} at node end`)
      }
      t += e.length
    }
  }
  return { comment: i, offset: t }
}
const Ct = 'Block collections are not allowed within flow collections',
  _t = (e) => e && ('block-map' === e.type || 'block-seq' === e.type)
function Kt(e, t, n, s, i, o) {
  const r =
      'block-map' === n.type
        ? (function ({ composeNode: e, composeEmptyNode: t }, n, s, i, o) {
            const r = new (o?.nodeClass ?? ke)(n.schema)
            n.atRoot && (n.atRoot = !1)
            let a = s.offset,
              c = null
            for (const o of s.items) {
              const { start: l, key: u, sep: f, value: h } = o,
                d = At(l, {
                  indicator: 'explicit-key-ind',
                  next: u ?? f?.[0],
                  offset: a,
                  onError: i,
                  parentIndent: s.indent,
                  startOnNewline: !0,
                }),
                p = !d.found
              if (p) {
                if (
                  (u &&
                    ('block-seq' === u.type
                      ? i(
                          a,
                          'BLOCK_AS_IMPLICIT_KEY',
                          'A block sequence may not be used as an implicit map key',
                        )
                      : 'indent' in u &&
                        u.indent !== s.indent &&
                        i(a, 'BAD_INDENT', xt)),
                  !d.anchor && !d.tag && !f)
                ) {
                  ;((c = d.end),
                    d.comment &&
                      (r.comment
                        ? (r.comment += '\n' + d.comment)
                        : (r.comment = d.comment)))
                  continue
                }
                ;(d.newlineAfterProp || It(u)) &&
                  i(
                    u ?? l[l.length - 1],
                    'MULTILINE_IMPLICIT_KEY',
                    'Implicit keys need to be on a single line',
                  )
              } else d.found?.indent !== s.indent && i(a, 'BAD_INDENT', xt)
              n.atKey = !0
              const m = d.end,
                y = u ? e(n, u, d, i) : t(n, m, l, null, d, i)
              ;(n.schema.compat && Tt(s.indent, u, i),
                (n.atKey = !1),
                Lt(n, r.items, y) &&
                  i(m, 'DUPLICATE_KEY', 'Map keys must be unique'))
              const g = At(f ?? [], {
                indicator: 'map-value-ind',
                next: h,
                offset: y.range[2],
                onError: i,
                parentIndent: s.indent,
                startOnNewline: !u || 'block-scalar' === u.type,
              })
              if (((a = g.end), g.found)) {
                p &&
                  ('block-map' !== h?.type ||
                    g.hasNewline ||
                    i(
                      a,
                      'BLOCK_AS_IMPLICIT_KEY',
                      'Nested mappings are not allowed in compact mappings',
                    ),
                  n.options.strict &&
                    d.start < g.found.offset - 1024 &&
                    i(
                      y.range,
                      'KEY_OVER_1024_CHARS',
                      'The : indicator must be at most 1024 chars after the start of an implicit block mapping key',
                    ))
                const c = h ? e(n, h, g, i) : t(n, a, f, null, g, i)
                ;(n.schema.compat && Tt(s.indent, h, i), (a = c.range[2]))
                const l = new de(y, c)
                ;(n.options.keepSourceTokens && (l.srcToken = o),
                  r.items.push(l))
              } else {
                ;(p &&
                  i(
                    y.range,
                    'MISSING_CHAR',
                    'Implicit map keys need to be followed by map values',
                  ),
                  g.comment &&
                    (y.comment
                      ? (y.comment += '\n' + g.comment)
                      : (y.comment = g.comment)))
                const e = new de(y)
                ;(n.options.keepSourceTokens && (e.srcToken = o),
                  r.items.push(e))
              }
            }
            return (
              c &&
                c < a &&
                i(c, 'IMPOSSIBLE', 'Map comment with trailing content'),
              (r.range = [s.offset, a, c ?? a]),
              r
            )
          })(e, t, n, s, o)
        : 'block-seq' === n.type
          ? (function ({ composeNode: e, composeEmptyNode: t }, n, s, i, o) {
              const r = new (o?.nodeClass ?? ve)(n.schema)
              ;(n.atRoot && (n.atRoot = !1), n.atKey && (n.atKey = !1))
              let a = s.offset,
                c = null
              for (const { start: o, value: l } of s.items) {
                const u = At(o, {
                  indicator: 'seq-item-ind',
                  next: l,
                  offset: a,
                  onError: i,
                  parentIndent: s.indent,
                  startOnNewline: !0,
                })
                if (!u.found) {
                  if (!(u.anchor || u.tag || l)) {
                    ;((c = u.end), u.comment && (r.comment = u.comment))
                    continue
                  }
                  l && 'block-seq' === l.type
                    ? i(
                        u.end,
                        'BAD_INDENT',
                        'All sequence items must start at the same column',
                      )
                    : i(a, 'MISSING_CHAR', 'Sequence item without - indicator')
                }
                const f = l ? e(n, l, u, i) : t(n, u.end, o, null, u, i)
                ;(n.schema.compat && Tt(s.indent, l, i),
                  (a = f.range[2]),
                  r.items.push(f))
              }
              return ((r.range = [s.offset, a, c ?? a]), r)
            })(e, t, n, s, o)
          : (function ({ composeNode: e, composeEmptyNode: t }, n, s, i, o) {
              const r = '{' === s.start.source,
                a = r ? 'flow map' : 'flow sequence',
                c = new (o?.nodeClass ?? (r ? ke : ve))(n.schema)
              c.flow = !0
              const l = n.atRoot
              ;(l && (n.atRoot = !1), n.atKey && (n.atKey = !1))
              let f = s.offset + s.start.source.length
              for (let o = 0; o < s.items.length; ++o) {
                const l = s.items[o],
                  { start: h, key: d, sep: p, value: m } = l,
                  y = At(h, {
                    flow: a,
                    indicator: 'explicit-key-ind',
                    next: d ?? p?.[0],
                    offset: f,
                    onError: i,
                    parentIndent: s.indent,
                    startOnNewline: !1,
                  })
                if (!y.found) {
                  if (!(y.anchor || y.tag || p || m)) {
                    ;(0 === o && y.comma
                      ? i(y.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${a}`)
                      : o < s.items.length - 1 &&
                        i(
                          y.start,
                          'UNEXPECTED_TOKEN',
                          `Unexpected empty item in ${a}`,
                        ),
                      y.comment &&
                        (c.comment
                          ? (c.comment += '\n' + y.comment)
                          : (c.comment = y.comment)),
                      (f = y.end))
                    continue
                  }
                  !r &&
                    n.options.strict &&
                    It(d) &&
                    i(
                      d,
                      'MULTILINE_IMPLICIT_KEY',
                      'Implicit keys of flow sequence pairs need to be on a single line',
                    )
                }
                if (0 === o)
                  y.comma &&
                    i(y.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${a}`)
                else if (
                  (y.comma ||
                    i(y.start, 'MISSING_CHAR', `Missing , between ${a} items`),
                  y.comment)
                ) {
                  let e = ''
                  e: for (const t of h)
                    switch (t.type) {
                      case 'comma':
                      case 'space':
                        break
                      case 'comment':
                        e = t.source.substring(1)
                        break e
                      default:
                        break e
                    }
                  if (e) {
                    let t = c.items[c.items.length - 1]
                    ;(u(t) && (t = t.value ?? t.key),
                      t.comment ? (t.comment += '\n' + e) : (t.comment = e),
                      (y.comment = y.comment.substring(e.length + 1)))
                  }
                }
                if (r || p || y.found) {
                  n.atKey = !0
                  const o = y.end,
                    u = d ? e(n, d, y, i) : t(n, o, h, null, y, i)
                  ;(_t(d) && i(u.range, 'BLOCK_IN_FLOW', Ct), (n.atKey = !1))
                  const g = At(p ?? [], {
                    flow: a,
                    indicator: 'map-value-ind',
                    next: m,
                    offset: u.range[2],
                    onError: i,
                    parentIndent: s.indent,
                    startOnNewline: !1,
                  })
                  if (g.found) {
                    if (!r && !y.found && n.options.strict) {
                      if (p)
                        for (const e of p) {
                          if (e === g.found) break
                          if ('newline' === e.type) {
                            i(
                              e,
                              'MULTILINE_IMPLICIT_KEY',
                              'Implicit keys of flow sequence pairs need to be on a single line',
                            )
                            break
                          }
                        }
                      y.start < g.found.offset - 1024 &&
                        i(
                          g.found,
                          'KEY_OVER_1024_CHARS',
                          'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key',
                        )
                    }
                  } else
                    m &&
                      ('source' in m && m.source && ':' === m.source[0]
                        ? i(m, 'MISSING_CHAR', `Missing space after : in ${a}`)
                        : i(
                            g.start,
                            'MISSING_CHAR',
                            `Missing , or : between ${a} items`,
                          ))
                  const b = m
                    ? e(n, m, g, i)
                    : g.found
                      ? t(n, g.end, p, null, g, i)
                      : null
                  b
                    ? _t(m) && i(b.range, 'BLOCK_IN_FLOW', Ct)
                    : g.comment &&
                      (u.comment
                        ? (u.comment += '\n' + g.comment)
                        : (u.comment = g.comment))
                  const k = new de(u, b)
                  if ((n.options.keepSourceTokens && (k.srcToken = l), r)) {
                    const e = c
                    ;(Lt(n, e.items, u) &&
                      i(o, 'DUPLICATE_KEY', 'Map keys must be unique'),
                      e.items.push(k))
                  } else {
                    const e = new ke(n.schema)
                    ;((e.flow = !0), e.items.push(k))
                    const t = (b ?? u).range
                    ;((e.range = [u.range[0], t[1], t[2]]), c.items.push(e))
                  }
                  f = b ? b.range[2] : g.end
                } else {
                  const s = m ? e(n, m, y, i) : t(n, y.end, p, null, y, i)
                  ;(c.items.push(s),
                    (f = s.range[2]),
                    _t(m) && i(s.range, 'BLOCK_IN_FLOW', Ct))
                }
              }
              const h = r ? '}' : ']',
                [d, ...p] = s.end
              let m = f
              if (d && d.source === h) m = d.offset + d.source.length
              else {
                const e = a[0].toUpperCase() + a.substring(1)
                ;(i(
                  f,
                  l ? 'MISSING_CHAR' : 'BAD_INDENT',
                  l
                    ? `${e} must end with a ${h}`
                    : `${e} in block collection must be sufficiently indented and end with a ${h}`,
                ),
                  d && 1 !== d.source.length && p.unshift(d))
              }
              if (p.length > 0) {
                const e = $t(p, m, n.options.strict, i)
                ;(e.comment &&
                  (c.comment
                    ? (c.comment += '\n' + e.comment)
                    : (c.comment = e.comment)),
                  (c.range = [s.offset, m, e.offset]))
              } else c.range = [s.offset, m, m]
              return c
            })(e, t, n, s, o),
    a = r.constructor
  return '!' === i || i === a.tagName
    ? ((r.tag = a.tagName), r)
    : (i && (r.tag = i), r)
}
function Bt(e, t, n) {
  const s = t.offset,
    i = (function ({ offset: e, props: t }, n, s) {
      if ('block-scalar-header' !== t[0].type)
        return (s(t[0], 'IMPOSSIBLE', 'Block scalar header not found'), null)
      const { source: i } = t[0],
        o = i[0]
      let r = 0,
        a = '',
        c = -1
      for (let t = 1; t < i.length; ++t) {
        const n = i[t]
        if (a || ('-' !== n && '+' !== n)) {
          const s = Number(n)
          !r && s ? (r = s) : -1 === c && (c = e + t)
        } else a = n
      }
      ;-1 !== c &&
        s(
          c,
          'UNEXPECTED_TOKEN',
          `Block scalar header includes extra characters: ${i}`,
        )
      let l = !1,
        u = '',
        f = i.length
      for (let e = 1; e < t.length; ++e) {
        const i = t[e]
        switch (i.type) {
          case 'space':
            l = !0
          case 'newline':
            f += i.source.length
            break
          case 'comment':
            if (n && !l) {
              s(
                i,
                'MISSING_CHAR',
                'Comments must be separated from other tokens by white space characters',
              )
            }
            ;((f += i.source.length), (u = i.source.substring(1)))
            break
          case 'error':
            ;(s(i, 'UNEXPECTED_TOKEN', i.message), (f += i.source.length))
            break
          default: {
            s(
              i,
              'UNEXPECTED_TOKEN',
              `Unexpected token in block scalar header: ${i.type}`,
            )
            const e = i.source
            e && 'string' == typeof e && (f += e.length)
          }
        }
      }
      return { mode: o, indent: r, chomp: a, comment: u, length: f }
    })(t, e.options.strict, n)
  if (!i) return { value: '', type: null, comment: '', range: [s, s, s] }
  const o = '>' === i.mode ? M.BLOCK_FOLDED : M.BLOCK_LITERAL,
    r = t.source
      ? (function (e) {
          const t = e.split(/\n( *)/),
            n = t[0],
            s = n.match(/^( *)/),
            i = [s?.[1] ? [s[1], n.slice(s[1].length)] : ['', n]]
          for (let e = 1; e < t.length; e += 2) i.push([t[e], t[e + 1]])
          return i
        })(t.source)
      : []
  let a = r.length
  for (let e = r.length - 1; e >= 0; --e) {
    const t = r[e][1]
    if ('' !== t && '\r' !== t) break
    a = e
  }
  if (0 === a) {
    const e =
      '+' === i.chomp && r.length > 0
        ? '\n'.repeat(Math.max(1, r.length - 1))
        : ''
    let n = s + i.length
    return (
      t.source && (n += t.source.length),
      { value: e, type: o, comment: i.comment, range: [s, n, n] }
    )
  }
  let c = t.indent + i.indent,
    l = t.offset + i.length,
    u = 0
  for (let t = 0; t < a; ++t) {
    const [s, o] = r[t]
    if ('' !== o && '\r' !== o) {
      if (s.length < c) {
        const e =
          'Block scalars with more-indented leading empty lines must use an explicit indentation indicator'
        n(l + s.length, 'MISSING_CHAR', e)
      }
      if ((0 === i.indent && (c = s.length), (u = t), 0 === c && !e.atRoot)) {
        n(
          l,
          'BAD_INDENT',
          'Block scalar values in collections must be indented',
        )
      }
      break
    }
    ;(0 === i.indent && s.length > c && (c = s.length),
      (l += s.length + o.length + 1))
  }
  for (let e = r.length - 1; e >= a; --e) r[e][0].length > c && (a = e + 1)
  let f = '',
    h = '',
    d = !1
  for (let e = 0; e < u; ++e) f += r[e][0].slice(c) + '\n'
  for (let e = u; e < a; ++e) {
    let [t, s] = r[e]
    l += t.length + s.length + 1
    const a = '\r' === s[s.length - 1]
    if ((a && (s = s.slice(0, -1)), s && t.length < c)) {
      const e = `Block scalar lines must not be less indented than their ${i.indent ? 'explicit indentation indicator' : 'first line'}`
      ;(n(l - s.length - (a ? 2 : 1), 'BAD_INDENT', e), (t = ''))
    }
    o === M.BLOCK_LITERAL
      ? ((f += h + t.slice(c) + s), (h = '\n'))
      : t.length > c || '\t' === s[0]
        ? (' ' === h ? (h = '\n') : d || '\n' !== h || (h = '\n\n'),
          (f += h + t.slice(c) + s),
          (h = '\n'),
          (d = !0))
        : '' === s
          ? '\n' === h
            ? (f += '\n')
            : (h = '\n')
          : ((f += h + s), (h = ' '), (d = !1))
  }
  switch (i.chomp) {
    case '-':
      break
    case '+':
      for (let e = a; e < r.length; ++e) f += '\n' + r[e][0].slice(c)
      '\n' !== f[f.length - 1] && (f += '\n')
      break
    default:
      f += '\n'
  }
  const p = s + i.length + t.source.length
  return { value: f, type: o, comment: i.comment, range: [s, p, p] }
}
function jt(e, t, n) {
  const { offset: s, type: i, source: o, end: r } = e
  let a, c
  const l = (e, t, i) => n(s + e, t, i)
  switch (i) {
    case 'scalar':
      ;((a = M.PLAIN),
        (c = (function (e, t) {
          let n = ''
          switch (e[0]) {
            case '\t':
              n = 'a tab character'
              break
            case ',':
              n = 'flow indicator character ,'
              break
            case '%':
              n = 'directive indicator character %'
              break
            case '|':
            case '>':
              n = `block scalar indicator ${e[0]}`
              break
            case '@':
            case '`':
              n = `reserved character ${e[0]}`
          }
          n && t(0, 'BAD_SCALAR_START', `Plain value cannot start with ${n}`)
          return Mt(e)
        })(o, l)))
      break
    case 'single-quoted-scalar':
      ;((a = M.QUOTE_SINGLE),
        (c = (function (e, t) {
          ;("'" === e[e.length - 1] && 1 !== e.length) ||
            t(e.length, 'MISSING_CHAR', "Missing closing 'quote")
          return Mt(e.slice(1, -1)).replace(/''/g, "'")
        })(o, l)))
      break
    case 'double-quoted-scalar':
      ;((a = M.QUOTE_DOUBLE),
        (c = (function (e, t) {
          let n = ''
          for (let s = 1; s < e.length - 1; ++s) {
            const i = e[s]
            if ('\r' !== i || '\n' !== e[s + 1])
              if ('\n' === i) {
                const { fold: t, offset: i } = Dt(e, s)
                ;((n += t), (s = i))
              } else if ('\\' === i) {
                let i = e[++s]
                const o = qt[i]
                if (o) n += o
                else if ('\n' === i)
                  for (i = e[s + 1]; ' ' === i || '\t' === i; ) i = e[1 + ++s]
                else if ('\r' === i && '\n' === e[s + 1])
                  for (i = e[1 + ++s]; ' ' === i || '\t' === i; ) i = e[1 + ++s]
                else if ('x' === i || 'u' === i || 'U' === i) {
                  const o = { x: 2, u: 4, U: 8 }[i]
                  ;((n += Pt(e, s + 1, o, t)), (s += o))
                } else {
                  const i = e.substr(s - 1, 2)
                  ;(t(s - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${i}`),
                    (n += i))
                }
              } else if (' ' === i || '\t' === i) {
                const t = s
                let o = e[s + 1]
                for (; ' ' === o || '\t' === o; ) o = e[1 + ++s]
                '\n' === o ||
                  ('\r' === o && '\n' === e[s + 2]) ||
                  (n += s > t ? e.slice(t, s + 1) : i)
              } else n += i
          }
          ;('"' === e[e.length - 1] && 1 !== e.length) ||
            t(e.length, 'MISSING_CHAR', 'Missing closing "quote')
          return n
        })(o, l)))
      break
    default:
      return (
        n(
          e,
          'UNEXPECTED_TOKEN',
          `Expected a flow scalar value, but found: ${i}`,
        ),
        {
          value: '',
          type: null,
          comment: '',
          range: [s, s + o.length, s + o.length],
        }
      )
  }
  const u = s + o.length,
    f = $t(r, u, t, n)
  return { value: c, type: a, comment: f.comment, range: [s, u, f.offset] }
}
function Mt(e) {
  let t, n
  try {
    ;((t = new RegExp('(.*?)(?<![ \t])[ \t]*\r?\n', 'sy')),
      (n = new RegExp('[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\r?\n', 'sy')))
  } catch {
    ;((t = /(.*?)[ \t]*\r?\n/sy), (n = /[ \t]*(.*?)[ \t]*\r?\n/sy))
  }
  let s = t.exec(e)
  if (!s) return e
  let i = s[1],
    o = ' ',
    r = t.lastIndex
  for (n.lastIndex = r; (s = n.exec(e)); )
    ('' === s[1]
      ? '\n' === o
        ? (i += o)
        : (o = '\n')
      : ((i += o + s[1]), (o = ' ')),
      (r = n.lastIndex))
  const a = /[ \t]*(.*)/sy
  return ((a.lastIndex = r), (s = a.exec(e)), i + o + (s?.[1] ?? ''))
}
function Dt(e, t) {
  let n = '',
    s = e[t + 1]
  for (
    ;
    !(
      (' ' !== s && '\t' !== s && '\n' !== s && '\r' !== s) ||
      ('\r' === s && '\n' !== e[t + 2])
    );
  )
    ('\n' === s && (n += '\n'), (s = e[(t += 1) + 1]))
  return (n || (n = ' '), { fold: n, offset: t })
}
const qt = {
  0: '\0',
  a: '',
  b: '\b',
  e: '',
  f: '\f',
  n: '\n',
  r: '\r',
  t: '\t',
  v: '\v',
  N: '',
  _: ' ',
  L: '\u2028',
  P: '\u2029',
  ' ': ' ',
  '"': '"',
  '/': '/',
  '\\': '\\',
  '\t': '\t',
}
function Pt(e, t, n, s) {
  const i = e.substr(t, n),
    o = i.length === n && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN
  if (isNaN(o)) {
    const i = e.substr(t - 2, n + 2)
    return (s(t - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${i}`), i)
  }
  return String.fromCodePoint(o)
}
function Ut(e, t, n, s) {
  const {
      value: o,
      type: r,
      comment: a,
      range: c,
    } = 'block-scalar' === t.type ? Bt(e, t, s) : jt(t, e.options.strict, s),
    l = n
      ? e.directives.tagName(n.source, (e) => s(n, 'TAG_RESOLVE_FAILED', e))
      : null
  let u, h
  u =
    e.options.stringKeys && e.atKey
      ? e.schema[i]
      : l
        ? (function (e, t, n, s, o) {
            if ('!' === n) return e[i]
            const r = []
            for (const t of e.tags)
              if (!t.collection && t.tag === n) {
                if (!t.default || !t.test) return t
                r.push(t)
              }
            for (const e of r) if (e.test?.test(t)) return e
            const a = e.knownTags[n]
            if (a && !a.collection)
              return (
                e.tags.push(
                  Object.assign({}, a, { default: !1, test: void 0 }),
                ),
                a
              )
            return (
              o(
                s,
                'TAG_RESOLVE_FAILED',
                `Unresolved tag: ${n}`,
                'tag:yaml.org,2002:str' !== n,
              ),
              e[i]
            )
          })(e.schema, o, l, n, s)
        : 'scalar' === t.type
          ? (function ({ atKey: e, directives: t, schema: n }, s, o, r) {
              const a =
                n.tags.find(
                  (t) =>
                    (!0 === t.default || (e && 'key' === t.default)) &&
                    t.test?.test(s),
                ) || n[i]
              if (n.compat) {
                const e =
                  n.compat.find((e) => e.default && e.test?.test(s)) ?? n[i]
                if (a.tag !== e.tag) {
                  r(
                    o,
                    'TAG_RESOLVE_FAILED',
                    `Value may be parsed as either ${t.tagString(a.tag)} or ${t.tagString(e.tag)}`,
                    !0,
                  )
                }
              }
              return a
            })(e, o, t, s)
          : e.schema[i]
  try {
    const i = u.resolve(o, (e) => s(n ?? t, 'TAG_RESOLVE_FAILED', e), e.options)
    h = f(i) ? i : new M(i)
  } catch (e) {
    const i = e instanceof Error ? e.message : String(e)
    ;(s(n ?? t, 'TAG_RESOLVE_FAILED', i), (h = new M(o)))
  }
  return (
    (h.range = c),
    (h.source = o),
    r && (h.type = r),
    l && (h.tag = l),
    u.format && (h.format = u.format),
    a && (h.comment = a),
    h
  )
}
function Rt(e, t, n) {
  if (t) {
    n ?? (n = t.length)
    for (let s = n - 1; s >= 0; --s) {
      let n = t[s]
      switch (n.type) {
        case 'space':
        case 'comment':
        case 'newline':
          e -= n.source.length
          continue
      }
      for (n = t[++s]; 'space' === n?.type; )
        ((e += n.source.length), (n = t[++s]))
      break
    }
  }
  return e
}
const Ft = { composeNode: Vt, composeEmptyNode: Jt }
function Vt(e, t, n, s) {
  const i = e.atKey,
    { spaceBefore: o, comment: r, anchor: a, tag: c } = n
  let l,
    u = !0
  switch (t.type) {
    case 'alias':
      ;((l = (function ({ options: e }, { offset: t, source: n, end: s }, i) {
        const o = new K(n.substring(1))
        '' === o.source && i(t, 'BAD_ALIAS', 'Alias cannot be an empty string')
        o.source.endsWith(':') &&
          i(t + n.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', !0)
        const r = t + n.length,
          a = $t(s, r, e.strict, i)
        ;((o.range = [t, r, a.offset]), a.comment && (o.comment = a.comment))
        return o
      })(e, t, s)),
        (a || c) &&
          s(t, 'ALIAS_PROPS', 'An alias node must not specify any properties'))
      break
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'block-scalar':
      ;((l = Ut(e, t, c, s)), a && (l.anchor = a.source.substring(1)))
      break
    case 'block-map':
    case 'block-seq':
    case 'flow-collection':
      ;((l = (function (e, t, n, s, i) {
        const o = s.tag,
          r = o
            ? t.directives.tagName(o.source, (e) =>
                i(o, 'TAG_RESOLVE_FAILED', e),
              )
            : null
        if ('block-seq' === n.type) {
          const { anchor: e, newlineAfterProp: t } = s,
            n = e && o ? (e.offset > o.offset ? e : o) : (e ?? o)
          n &&
            (!t || t.offset < n.offset) &&
            i(n, 'MISSING_CHAR', 'Missing newline after block sequence props')
        }
        const a =
          'block-map' === n.type
            ? 'map'
            : 'block-seq' === n.type
              ? 'seq'
              : '{' === n.start.source
                ? 'map'
                : 'seq'
        if (
          !o ||
          !r ||
          '!' === r ||
          (r === ke.tagName && 'map' === a) ||
          (r === ve.tagName && 'seq' === a)
        )
          return Kt(e, t, n, i, r)
        let c = t.schema.tags.find((e) => e.tag === r && e.collection === a)
        if (!c) {
          const s = t.schema.knownTags[r]
          if (!s || s.collection !== a)
            return (
              s
                ? i(
                    o,
                    'BAD_COLLECTION_TYPE',
                    `${s.tag} used for ${a} collection, but expects ${s.collection ?? 'scalar'}`,
                    !0,
                  )
                : i(o, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${r}`, !0),
              Kt(e, t, n, i, r)
            )
          ;(t.schema.tags.push(Object.assign({}, s, { default: !1 })), (c = s))
        }
        const l = Kt(e, t, n, i, r, c),
          u =
            c.resolve?.(l, (e) => i(o, 'TAG_RESOLVE_FAILED', e), t.options) ??
            l,
          f = p(u) ? u : new M(u)
        return (
          (f.range = l.range),
          (f.tag = r),
          c?.format && (f.format = c.format),
          f
        )
      })(Ft, e, t, n, s)),
        a && (l.anchor = a.source.substring(1)))
      break
    default:
      ;(s(
        t,
        'UNEXPECTED_TOKEN',
        'error' === t.type ? t.message : `Unsupported token (type: ${t.type})`,
      ),
        (l = Jt(e, t.offset, void 0, null, n, s)),
        (u = !1))
  }
  if (
    (a &&
      '' === l.anchor &&
      s(a, 'BAD_ALIAS', 'Anchor cannot be an empty string'),
    i &&
      e.options.stringKeys &&
      (!f(l) ||
        'string' != typeof l.value ||
        (l.tag && 'tag:yaml.org,2002:str' !== l.tag)))
  ) {
    s(c ?? t, 'NON_STRING_KEY', 'With stringKeys, all keys must be strings')
  }
  return (
    o && (l.spaceBefore = !0),
    r &&
      ('scalar' === t.type && '' === t.source
        ? (l.comment = r)
        : (l.commentBefore = r)),
    e.options.keepSourceTokens && u && (l.srcToken = t),
    l
  )
}
function Jt(
  e,
  t,
  n,
  s,
  { spaceBefore: i, comment: o, anchor: r, tag: a, end: c },
  l,
) {
  const u = Ut(
    e,
    { type: 'scalar', offset: Rt(t, n, s), indent: -1, source: '' },
    a,
    l,
  )
  return (
    r &&
      ((u.anchor = r.source.substring(1)),
      '' === u.anchor && l(r, 'BAD_ALIAS', 'Anchor cannot be an empty string')),
    i && (u.spaceBefore = !0),
    o && ((u.comment = o), (u.range[2] = c)),
    u
  )
}
function Yt(e) {
  if ('number' == typeof e) return [e, e + 1]
  if (Array.isArray(e)) return 2 === e.length ? e : [e[0], e[1]]
  const { offset: t, source: n } = e
  return [t, t + ('string' == typeof n ? n.length : 1)]
}
function Wt(e) {
  let t = '',
    n = !1,
    s = !1
  for (let i = 0; i < e.length; ++i) {
    const o = e[i]
    switch (o[0]) {
      case '#':
        ;((t += ('' === t ? '' : s ? '\n\n' : '\n') + (o.substring(1) || ' ')),
          (n = !0),
          (s = !1))
        break
      case '%':
        ;('#' !== e[i + 1]?.[0] && (i += 1), (n = !1))
        break
      default:
        ;(n || (s = !0), (n = !1))
    }
  }
  return { comment: t, afterEmptyLine: s }
}
class Gt {
  constructor(e = {}) {
    ;((this.doc = null),
      (this.atDirectives = !1),
      (this.prelude = []),
      (this.errors = []),
      (this.warnings = []),
      (this.onError = (e, t, n, s) => {
        const i = Yt(e)
        s
          ? this.warnings.push(new Nt(i, t, n))
          : this.errors.push(new Et(i, t, n))
      }),
      (this.directives = new I({ version: e.version || '1.2' })),
      (this.options = e))
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: s } = Wt(this.prelude)
    if (n) {
      const i = e.contents
      if (t) e.comment = e.comment ? `${e.comment}\n${n}` : n
      else if (s || e.directives.docStart || !i) e.commentBefore = n
      else if (d(i) && !i.flow && i.items.length > 0) {
        let e = i.items[0]
        u(e) && (e = e.key)
        const t = e.commentBefore
        e.commentBefore = t ? `${n}\n${t}` : n
      } else {
        const e = i.commentBefore
        i.commentBefore = e ? `${n}\n${e}` : n
      }
    }
    ;(t
      ? (Array.prototype.push.apply(e.errors, this.errors),
        Array.prototype.push.apply(e.warnings, this.warnings))
      : ((e.errors = this.errors), (e.warnings = this.warnings)),
      (this.prelude = []),
      (this.errors = []),
      (this.warnings = []))
  }
  streamInfo() {
    return {
      comment: Wt(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings,
    }
  }
  *compose(e, t = !1, n = -1) {
    for (const t of e) yield* this.next(t)
    yield* this.end(t, n)
  }
  *next(e) {
    switch (e.type) {
      case 'directive':
        ;(this.directives.add(e.source, (t, n, s) => {
          const i = Yt(e)
          ;((i[0] += t), this.onError(i, 'BAD_DIRECTIVE', n, s))
        }),
          this.prelude.push(e.source),
          (this.atDirectives = !0))
        break
      case 'document': {
        const t = (function (
          e,
          t,
          { offset: n, start: s, value: i, end: o },
          r,
        ) {
          const a = Object.assign({ _directives: t }, e),
            c = new wt(void 0, a),
            l = {
              atKey: !1,
              atRoot: !0,
              directives: c.directives,
              options: c.options,
              schema: c.schema,
            },
            u = At(s, {
              indicator: 'doc-start',
              next: i ?? o?.[0],
              offset: n,
              onError: r,
              parentIndent: 0,
              startOnNewline: !0,
            })
          ;(u.found &&
            ((c.directives.docStart = !0),
            !i ||
              ('block-map' !== i.type && 'block-seq' !== i.type) ||
              u.hasNewline ||
              r(
                u.end,
                'MISSING_CHAR',
                'Block collection cannot start on same line with directives-end marker',
              )),
            (c.contents = i ? Vt(l, i, u, r) : Jt(l, u.end, s, null, u, r)))
          const f = c.contents.range[2],
            h = $t(o, f, !1, r)
          return (
            h.comment && (c.comment = h.comment),
            (c.range = [n, f, h.offset]),
            c
          )
        })(this.options, this.directives, e, this.onError)
        ;(this.atDirectives &&
          !t.directives.docStart &&
          this.onError(
            e,
            'MISSING_CHAR',
            'Missing directives-end/doc-start indicator line',
          ),
          this.decorate(t, !1),
          this.doc && (yield this.doc),
          (this.doc = t),
          (this.atDirectives = !1))
        break
      }
      case 'byte-order-mark':
      case 'space':
        break
      case 'comment':
      case 'newline':
        this.prelude.push(e.source)
        break
      case 'error': {
        const t = e.source
            ? `${e.message}: ${JSON.stringify(e.source)}`
            : e.message,
          n = new Et(Yt(e), 'UNEXPECTED_TOKEN', t)
        this.atDirectives || !this.doc
          ? this.errors.push(n)
          : this.doc.errors.push(n)
        break
      }
      case 'doc-end': {
        if (!this.doc) {
          const t = 'Unexpected doc-end without preceding document'
          this.errors.push(new Et(Yt(e), 'UNEXPECTED_TOKEN', t))
          break
        }
        this.doc.directives.docEnd = !0
        const t = $t(
          e.end,
          e.offset + e.source.length,
          this.doc.options.strict,
          this.onError,
        )
        if ((this.decorate(this.doc, !0), t.comment)) {
          const e = this.doc.comment
          this.doc.comment = e ? `${e}\n${t.comment}` : t.comment
        }
        this.doc.range[2] = t.offset
        break
      }
      default:
        this.errors.push(
          new Et(Yt(e), 'UNEXPECTED_TOKEN', `Unsupported token ${e.type}`),
        )
    }
  }
  *end(e = !1, t = -1) {
    if (this.doc)
      (this.decorate(this.doc, !0), yield this.doc, (this.doc = null))
    else if (e) {
      const e = Object.assign({ _directives: this.directives }, this.options),
        n = new wt(void 0, e)
      ;(this.atDirectives &&
        this.onError(
          t,
          'MISSING_CHAR',
          'Missing directives-end indicator line',
        ),
        (n.range = [0, t, t]),
        this.decorate(n, !1),
        yield n)
    }
  }
}
function Qt(e, t) {
  if (t)
    for (const n of t)
      switch (n.type) {
        case 'space':
        case 'comment':
          e.push(n)
          break
        case 'newline':
          return (e.push(n), !0)
      }
  return !1
}
function Ht(e, t, n) {
  switch (e.type) {
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      ;((e.type = n), (e.source = t))
      break
    case 'block-scalar': {
      const s = e.props.slice(1)
      let i = t.length
      'block-scalar-header' === e.props[0].type &&
        (i -= e.props[0].source.length)
      for (const e of s) e.offset += i
      ;(delete e.props, Object.assign(e, { type: n, source: t, end: s }))
      break
    }
    case 'block-map':
    case 'block-seq': {
      const s = {
        type: 'newline',
        offset: e.offset + t.length,
        indent: e.indent,
        source: '\n',
      }
      ;(delete e.items, Object.assign(e, { type: n, source: t, end: [s] }))
      break
    }
    default: {
      const s = 'indent' in e ? e.indent : -1,
        i =
          'end' in e && Array.isArray(e.end)
            ? e.end.filter(
                (e) =>
                  'space' === e.type ||
                  'comment' === e.type ||
                  'newline' === e.type,
              )
            : []
      for (const t of Object.keys(e))
        'type' !== t && 'offset' !== t && delete e[t]
      Object.assign(e, { type: n, indent: s, source: t, end: i })
    }
  }
}
function Xt(e) {
  switch (e.type) {
    case 'block-scalar': {
      let t = ''
      for (const n of e.props) t += Xt(n)
      return t + e.source
    }
    case 'block-map':
    case 'block-seq': {
      let t = ''
      for (const n of e.items) t += zt(n)
      return t
    }
    case 'flow-collection': {
      let t = e.start.source
      for (const n of e.items) t += zt(n)
      for (const n of e.end) t += n.source
      return t
    }
    case 'document': {
      let t = zt(e)
      if (e.end) for (const n of e.end) t += n.source
      return t
    }
    default: {
      let t = e.source
      if ('end' in e && e.end) for (const n of e.end) t += n.source
      return t
    }
  }
}
function zt({ start: e, key: t, sep: n, value: s }) {
  let i = ''
  for (const t of e) i += t.source
  if ((t && (i += Xt(t)), n)) for (const e of n) i += e.source
  return (s && (i += Xt(s)), i)
}
const Zt = Symbol('break visit'),
  en = Symbol('skip children'),
  tn = Symbol('remove item')
function nn(e, t) {
  ;('type' in e &&
    'document' === e.type &&
    (e = { start: e.start, value: e.value }),
    sn(Object.freeze([]), e, t))
}
function sn(e, t, n) {
  let s = n(t, e)
  if ('symbol' == typeof s) return s
  for (const i of ['key', 'value']) {
    const o = t[i]
    if (o && 'items' in o) {
      for (let t = 0; t < o.items.length; ++t) {
        const s = sn(Object.freeze(e.concat([[i, t]])), o.items[t], n)
        if ('number' == typeof s) t = s - 1
        else {
          if (s === Zt) return Zt
          s === tn && (o.items.splice(t, 1), (t -= 1))
        }
      }
      'function' == typeof s && 'key' === i && (s = s(t, e))
    }
  }
  return 'function' == typeof s ? s(t, e) : s
}
;((nn.BREAK = Zt),
  (nn.SKIP = en),
  (nn.REMOVE = tn),
  (nn.itemAtPath = (e, t) => {
    let n = e
    for (const [e, s] of t) {
      const t = n?.[e]
      if (!t || !('items' in t)) return
      n = t.items[s]
    }
    return n
  }),
  (nn.parentCollection = (e, t) => {
    const n = nn.itemAtPath(e, t.slice(0, -1)),
      s = t[t.length - 1][0],
      i = n?.[s]
    if (i && 'items' in i) return i
    throw new Error('Parent collection not found')
  }))
const on = '\ufeff',
  rn = '',
  an = '',
  cn = ''
function ln(e) {
  switch (e) {
    case on:
      return 'byte-order-mark'
    case rn:
      return 'doc-mode'
    case an:
      return 'flow-error-end'
    case cn:
      return 'scalar'
    case '---':
      return 'doc-start'
    case '...':
      return 'doc-end'
    case '':
    case '\n':
    case '\r\n':
      return 'newline'
    case '-':
      return 'seq-item-ind'
    case '?':
      return 'explicit-key-ind'
    case ':':
      return 'map-value-ind'
    case '{':
      return 'flow-map-start'
    case '}':
      return 'flow-map-end'
    case '[':
      return 'flow-seq-start'
    case ']':
      return 'flow-seq-end'
    case ',':
      return 'comma'
  }
  switch (e[0]) {
    case ' ':
    case '\t':
      return 'space'
    case '#':
      return 'comment'
    case '%':
      return 'directive-line'
    case '*':
      return 'alias'
    case '&':
      return 'anchor'
    case '!':
      return 'tag'
    case "'":
      return 'single-quoted-scalar'
    case '"':
      return 'double-quoted-scalar'
    case '|':
    case '>':
      return 'block-scalar-header'
  }
  return null
}
var un = Object.freeze({
  __proto__: null,
  BOM: on,
  DOCUMENT: rn,
  FLOW_END: an,
  SCALAR: cn,
  isCollection: (e) => !!e && 'items' in e,
  isScalar: (e) =>
    !!e &&
    ('scalar' === e.type ||
      'single-quoted-scalar' === e.type ||
      'double-quoted-scalar' === e.type ||
      'block-scalar' === e.type),
  prettyToken: function (e) {
    switch (e) {
      case on:
        return '<BOM>'
      case rn:
        return '<DOC>'
      case an:
        return '<FLOW_END>'
      case cn:
        return '<SCALAR>'
      default:
        return JSON.stringify(e)
    }
  },
  tokenType: ln,
  createScalarToken: function (e, t) {
    const {
        implicitKey: n = !1,
        indent: s,
        inFlow: i = !1,
        offset: o = -1,
        type: r = 'PLAIN',
      } = t,
      a = se(
        { type: r, value: e },
        {
          implicitKey: n,
          indent: s > 0 ? ' '.repeat(s) : '',
          inFlow: i,
          options: { blockQuote: !0, lineWidth: -1 },
        },
      ),
      c = t.end ?? [{ type: 'newline', offset: -1, indent: s, source: '\n' }]
    switch (a[0]) {
      case '|':
      case '>': {
        const e = a.indexOf('\n'),
          t = a.substring(0, e),
          n = a.substring(e + 1) + '\n',
          i = [{ type: 'block-scalar-header', offset: o, indent: s, source: t }]
        return (
          Qt(i, c) ||
            i.push({ type: 'newline', offset: -1, indent: s, source: '\n' }),
          { type: 'block-scalar', offset: o, indent: s, props: i, source: n }
        )
      }
      case '"':
        return {
          type: 'double-quoted-scalar',
          offset: o,
          indent: s,
          source: a,
          end: c,
        }
      case "'":
        return {
          type: 'single-quoted-scalar',
          offset: o,
          indent: s,
          source: a,
          end: c,
        }
      default:
        return { type: 'scalar', offset: o, indent: s, source: a, end: c }
    }
  },
  resolveAsScalar: function (e, t = !0, n) {
    if (e) {
      const s = (e, t, s) => {
        const i = 'number' == typeof e ? e : Array.isArray(e) ? e[0] : e.offset
        if (!n) throw new Et([i, i + 1], t, s)
        n(i, t, s)
      }
      switch (e.type) {
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
          return jt(e, t, s)
        case 'block-scalar':
          return Bt({ options: { strict: t } }, e, s)
      }
    }
    return null
  },
  setScalarValue: function (e, t, n = {}) {
    let { afterKey: s = !1, implicitKey: i = !1, inFlow: o = !1, type: r } = n,
      a = 'indent' in e ? e.indent : null
    if ((s && 'number' == typeof a && (a += 2), !r))
      switch (e.type) {
        case 'single-quoted-scalar':
          r = 'QUOTE_SINGLE'
          break
        case 'double-quoted-scalar':
          r = 'QUOTE_DOUBLE'
          break
        case 'block-scalar': {
          const t = e.props[0]
          if ('block-scalar-header' !== t.type)
            throw new Error('Invalid block scalar header')
          r = '>' === t.source[0] ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL'
          break
        }
        default:
          r = 'PLAIN'
      }
    const c = se(
      { type: r, value: t },
      {
        implicitKey: i || null === a,
        indent: null !== a && a > 0 ? ' '.repeat(a) : '',
        inFlow: o,
        options: { blockQuote: !0, lineWidth: -1 },
      },
    )
    switch (c[0]) {
      case '|':
      case '>':
        !(function (e, t) {
          const n = t.indexOf('\n'),
            s = t.substring(0, n),
            i = t.substring(n + 1) + '\n'
          if ('block-scalar' === e.type) {
            const t = e.props[0]
            if ('block-scalar-header' !== t.type)
              throw new Error('Invalid block scalar header')
            ;((t.source = s), (e.source = i))
          } else {
            const { offset: t } = e,
              n = 'indent' in e ? e.indent : -1,
              o = [
                {
                  type: 'block-scalar-header',
                  offset: t,
                  indent: n,
                  source: s,
                },
              ]
            Qt(o, 'end' in e ? e.end : void 0) ||
              o.push({ type: 'newline', offset: -1, indent: n, source: '\n' })
            for (const t of Object.keys(e))
              'type' !== t && 'offset' !== t && delete e[t]
            Object.assign(e, {
              type: 'block-scalar',
              indent: n,
              props: o,
              source: i,
            })
          }
        })(e, c)
        break
      case '"':
        Ht(e, c, 'double-quoted-scalar')
        break
      case "'":
        Ht(e, c, 'single-quoted-scalar')
        break
      default:
        Ht(e, c, 'scalar')
    }
  },
  stringify: (e) => ('type' in e ? Xt(e) : zt(e)),
  visit: nn,
})
function fn(e) {
  switch (e) {
    case void 0:
    case ' ':
    case '\n':
    case '\r':
    case '\t':
      return !0
    default:
      return !1
  }
}
const hn = new Set('0123456789ABCDEFabcdef'),
  dn = new Set(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()",
  ),
  pn = new Set(',[]{}'),
  mn = new Set(' ,[]{}\n\r\t'),
  yn = (e) => !e || mn.has(e)
class gn {
  constructor() {
    ;((this.atEnd = !1),
      (this.blockScalarIndent = -1),
      (this.blockScalarKeep = !1),
      (this.buffer = ''),
      (this.flowKey = !1),
      (this.flowLevel = 0),
      (this.indentNext = 0),
      (this.indentValue = 0),
      (this.lineEndPos = null),
      (this.next = null),
      (this.pos = 0))
  }
  *lex(e, t = !1) {
    if (e) {
      if ('string' != typeof e) throw TypeError('source is not a string')
      ;((this.buffer = this.buffer ? this.buffer + e : e),
        (this.lineEndPos = null))
    }
    this.atEnd = !t
    let n = this.next ?? 'stream'
    for (; n && (t || this.hasChars(1)); ) n = yield* this.parseNext(n)
  }
  atLineEnd() {
    let e = this.pos,
      t = this.buffer[e]
    for (; ' ' === t || '\t' === t; ) t = this.buffer[++e]
    return (
      !t ||
      '#' === t ||
      '\n' === t ||
      ('\r' === t && '\n' === this.buffer[e + 1])
    )
  }
  charAt(e) {
    return this.buffer[this.pos + e]
  }
  continueScalar(e) {
    let t = this.buffer[e]
    if (this.indentNext > 0) {
      let n = 0
      for (; ' ' === t; ) t = this.buffer[++n + e]
      if ('\r' === t) {
        const t = this.buffer[n + e + 1]
        if ('\n' === t || (!t && !this.atEnd)) return e + n + 1
      }
      return '\n' === t || n >= this.indentNext || (!t && !this.atEnd)
        ? e + n
        : -1
    }
    if ('-' === t || '.' === t) {
      const t = this.buffer.substr(e, 3)
      if (('---' === t || '...' === t) && fn(this.buffer[e + 3])) return -1
    }
    return e
  }
  getLine() {
    let e = this.lineEndPos
    return (
      ('number' != typeof e || (-1 !== e && e < this.pos)) &&
        ((e = this.buffer.indexOf('\n', this.pos)), (this.lineEndPos = e)),
      -1 === e
        ? this.atEnd
          ? this.buffer.substring(this.pos)
          : null
        : ('\r' === this.buffer[e - 1] && (e -= 1),
          this.buffer.substring(this.pos, e))
    )
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length
  }
  setNext(e) {
    return (
      (this.buffer = this.buffer.substring(this.pos)),
      (this.pos = 0),
      (this.lineEndPos = null),
      (this.next = e),
      null
    )
  }
  peek(e) {
    return this.buffer.substr(this.pos, e)
  }
  *parseNext(e) {
    switch (e) {
      case 'stream':
        return yield* this.parseStream()
      case 'line-start':
        return yield* this.parseLineStart()
      case 'block-start':
        return yield* this.parseBlockStart()
      case 'doc':
        return yield* this.parseDocument()
      case 'flow':
        return yield* this.parseFlowCollection()
      case 'quoted-scalar':
        return yield* this.parseQuotedScalar()
      case 'block-scalar':
        return yield* this.parseBlockScalar()
      case 'plain-scalar':
        return yield* this.parsePlainScalar()
    }
  }
  *parseStream() {
    let e = this.getLine()
    if (null === e) return this.setNext('stream')
    if (
      (e[0] === on && (yield* this.pushCount(1), (e = e.substring(1))),
      '%' === e[0])
    ) {
      let t = e.length,
        n = e.indexOf('#')
      for (; -1 !== n; ) {
        const s = e[n - 1]
        if (' ' === s || '\t' === s) {
          t = n - 1
          break
        }
        n = e.indexOf('#', n + 1)
      }
      for (;;) {
        const n = e[t - 1]
        if (' ' !== n && '\t' !== n) break
        t -= 1
      }
      const s = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0))
      return (yield* this.pushCount(e.length - s), this.pushNewline(), 'stream')
    }
    if (this.atLineEnd()) {
      const t = yield* this.pushSpaces(!0)
      return (
        yield* this.pushCount(e.length - t),
        yield* this.pushNewline(),
        'stream'
      )
    }
    return (yield rn, yield* this.parseLineStart())
  }
  *parseLineStart() {
    const e = this.charAt(0)
    if (!e && !this.atEnd) return this.setNext('line-start')
    if ('-' === e || '.' === e) {
      if (!this.atEnd && !this.hasChars(4)) return this.setNext('line-start')
      const e = this.peek(3)
      if (('---' === e || '...' === e) && fn(this.charAt(3)))
        return (
          yield* this.pushCount(3),
          (this.indentValue = 0),
          (this.indentNext = 0),
          '---' === e ? 'doc' : 'stream'
        )
    }
    return (
      (this.indentValue = yield* this.pushSpaces(!1)),
      this.indentNext > this.indentValue &&
        !fn(this.charAt(1)) &&
        (this.indentNext = this.indentValue),
      yield* this.parseBlockStart()
    )
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2)
    if (!t && !this.atEnd) return this.setNext('block-start')
    if (('-' === e || '?' === e || ':' === e) && fn(t)) {
      const e = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0))
      return (
        (this.indentNext = this.indentValue + 1),
        (this.indentValue += e),
        yield* this.parseBlockStart()
      )
    }
    return 'doc'
  }
  *parseDocument() {
    yield* this.pushSpaces(!0)
    const e = this.getLine()
    if (null === e) return this.setNext('doc')
    let t = yield* this.pushIndicators()
    switch (e[t]) {
      case '#':
        yield* this.pushCount(e.length - t)
      case void 0:
        return (yield* this.pushNewline(), yield* this.parseLineStart())
      case '{':
      case '[':
        return (
          yield* this.pushCount(1),
          (this.flowKey = !1),
          (this.flowLevel = 1),
          'flow'
        )
      case '}':
      case ']':
        return (yield* this.pushCount(1), 'doc')
      case '*':
        return (yield* this.pushUntil(yn), 'doc')
      case '"':
      case "'":
        return yield* this.parseQuotedScalar()
      case '|':
      case '>':
        return (
          (t += yield* this.parseBlockScalarHeader()),
          (t += yield* this.pushSpaces(!0)),
          yield* this.pushCount(e.length - t),
          yield* this.pushNewline(),
          yield* this.parseBlockScalar()
        )
      default:
        return yield* this.parsePlainScalar()
    }
  }
  *parseFlowCollection() {
    let e,
      t,
      n = -1
    do {
      ;((e = yield* this.pushNewline()),
        e > 0
          ? ((t = yield* this.pushSpaces(!1)), (this.indentValue = n = t))
          : (t = 0),
        (t += yield* this.pushSpaces(!0)))
    } while (e + t > 0)
    const s = this.getLine()
    if (null === s) return this.setNext('flow')
    if (
      (-1 !== n && n < this.indentNext && '#' !== s[0]) ||
      (0 === n && (s.startsWith('---') || s.startsWith('...')) && fn(s[3]))
    ) {
      if (
        !(
          n === this.indentNext - 1 &&
          1 === this.flowLevel &&
          (']' === s[0] || '}' === s[0])
        )
      )
        return ((this.flowLevel = 0), yield an, yield* this.parseLineStart())
    }
    let i = 0
    for (; ',' === s[i]; )
      ((i += yield* this.pushCount(1)),
        (i += yield* this.pushSpaces(!0)),
        (this.flowKey = !1))
    switch (((i += yield* this.pushIndicators()), s[i])) {
      case void 0:
        return 'flow'
      case '#':
        return (yield* this.pushCount(s.length - i), 'flow')
      case '{':
      case '[':
        return (
          yield* this.pushCount(1),
          (this.flowKey = !1),
          (this.flowLevel += 1),
          'flow'
        )
      case '}':
      case ']':
        return (
          yield* this.pushCount(1),
          (this.flowKey = !0),
          (this.flowLevel -= 1),
          this.flowLevel ? 'flow' : 'doc'
        )
      case '*':
        return (yield* this.pushUntil(yn), 'flow')
      case '"':
      case "'":
        return ((this.flowKey = !0), yield* this.parseQuotedScalar())
      case ':': {
        const e = this.charAt(1)
        if (this.flowKey || fn(e) || ',' === e)
          return (
            (this.flowKey = !1),
            yield* this.pushCount(1),
            yield* this.pushSpaces(!0),
            'flow'
          )
      }
      default:
        return ((this.flowKey = !1), yield* this.parsePlainScalar())
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0)
    let t = this.buffer.indexOf(e, this.pos + 1)
    if ("'" === e)
      for (; -1 !== t && "'" === this.buffer[t + 1]; )
        t = this.buffer.indexOf("'", t + 2)
    else
      for (; -1 !== t; ) {
        let e = 0
        for (; '\\' === this.buffer[t - 1 - e]; ) e += 1
        if (e % 2 == 0) break
        t = this.buffer.indexOf('"', t + 1)
      }
    const n = this.buffer.substring(0, t)
    let s = n.indexOf('\n', this.pos)
    if (-1 !== s) {
      for (; -1 !== s; ) {
        const e = this.continueScalar(s + 1)
        if (-1 === e) break
        s = n.indexOf('\n', e)
      }
      ;-1 !== s && (t = s - ('\r' === n[s - 1] ? 2 : 1))
    }
    if (-1 === t) {
      if (!this.atEnd) return this.setNext('quoted-scalar')
      t = this.buffer.length
    }
    return (yield* this.pushToIndex(t + 1, !1), this.flowLevel ? 'flow' : 'doc')
  }
  *parseBlockScalarHeader() {
    ;((this.blockScalarIndent = -1), (this.blockScalarKeep = !1))
    let e = this.pos
    for (;;) {
      const t = this.buffer[++e]
      if ('+' === t) this.blockScalarKeep = !0
      else if (t > '0' && t <= '9') this.blockScalarIndent = Number(t) - 1
      else if ('-' !== t) break
    }
    return yield* this.pushUntil((e) => fn(e) || '#' === e)
  }
  *parseBlockScalar() {
    let e,
      t = this.pos - 1,
      n = 0
    e: for (let s = this.pos; (e = this.buffer[s]); ++s)
      switch (e) {
        case ' ':
          n += 1
          break
        case '\n':
          ;((t = s), (n = 0))
          break
        case '\r': {
          const e = this.buffer[s + 1]
          if (!e && !this.atEnd) return this.setNext('block-scalar')
          if ('\n' === e) break
        }
        default:
          break e
      }
    if (!e && !this.atEnd) return this.setNext('block-scalar')
    if (n >= this.indentNext) {
      ;-1 === this.blockScalarIndent
        ? (this.indentNext = n)
        : (this.indentNext =
            this.blockScalarIndent +
            (0 === this.indentNext ? 1 : this.indentNext))
      do {
        const e = this.continueScalar(t + 1)
        if (-1 === e) break
        t = this.buffer.indexOf('\n', e)
      } while (-1 !== t)
      if (-1 === t) {
        if (!this.atEnd) return this.setNext('block-scalar')
        t = this.buffer.length
      }
    }
    let s = t + 1
    for (e = this.buffer[s]; ' ' === e; ) e = this.buffer[++s]
    if ('\t' === e) {
      for (; '\t' === e || ' ' === e || '\r' === e || '\n' === e; )
        e = this.buffer[++s]
      t = s - 1
    } else if (!this.blockScalarKeep)
      for (;;) {
        let e = t - 1,
          s = this.buffer[e]
        '\r' === s && (s = this.buffer[--e])
        const i = e
        for (; ' ' === s; ) s = this.buffer[--e]
        if (!('\n' === s && e >= this.pos && e + 1 + n > i)) break
        t = e
      }
    return (
      yield cn,
      yield* this.pushToIndex(t + 1, !0),
      yield* this.parseLineStart()
    )
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0
    let t,
      n = this.pos - 1,
      s = this.pos - 1
    for (; (t = this.buffer[++s]); )
      if (':' === t) {
        const t = this.buffer[s + 1]
        if (fn(t) || (e && pn.has(t))) break
        n = s
      } else if (fn(t)) {
        let i = this.buffer[s + 1]
        if (
          ('\r' === t &&
            ('\n' === i
              ? ((s += 1), (t = '\n'), (i = this.buffer[s + 1]))
              : (n = s)),
          '#' === i || (e && pn.has(i)))
        )
          break
        if ('\n' === t) {
          const e = this.continueScalar(s + 1)
          if (-1 === e) break
          s = Math.max(s, e - 2)
        }
      } else {
        if (e && pn.has(t)) break
        n = s
      }
    return t || this.atEnd
      ? (yield cn, yield* this.pushToIndex(n + 1, !0), e ? 'flow' : 'doc')
      : this.setNext('plain-scalar')
  }
  *pushCount(e) {
    return e > 0
      ? (yield this.buffer.substr(this.pos, e), (this.pos += e), e)
      : 0
  }
  *pushToIndex(e, t) {
    const n = this.buffer.slice(this.pos, e)
    return n
      ? (yield n, (this.pos += n.length), n.length)
      : (t && (yield ''), 0)
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case '!':
        return (
          (yield* this.pushTag()) +
          (yield* this.pushSpaces(!0)) +
          (yield* this.pushIndicators())
        )
      case '&':
        return (
          (yield* this.pushUntil(yn)) +
          (yield* this.pushSpaces(!0)) +
          (yield* this.pushIndicators())
        )
      case '-':
      case '?':
      case ':': {
        const e = this.flowLevel > 0,
          t = this.charAt(1)
        if (fn(t) || (e && pn.has(t)))
          return (
            e
              ? this.flowKey && (this.flowKey = !1)
              : (this.indentNext = this.indentValue + 1),
            (yield* this.pushCount(1)) +
              (yield* this.pushSpaces(!0)) +
              (yield* this.pushIndicators())
          )
      }
    }
    return 0
  }
  *pushTag() {
    if ('<' === this.charAt(1)) {
      let e = this.pos + 2,
        t = this.buffer[e]
      for (; !fn(t) && '>' !== t; ) t = this.buffer[++e]
      return yield* this.pushToIndex('>' === t ? e + 1 : e, !1)
    }
    {
      let e = this.pos + 1,
        t = this.buffer[e]
      for (; t; )
        if (dn.has(t)) t = this.buffer[++e]
        else {
          if (
            '%' !== t ||
            !hn.has(this.buffer[e + 1]) ||
            !hn.has(this.buffer[e + 2])
          )
            break
          t = this.buffer[(e += 3)]
        }
      return yield* this.pushToIndex(e, !1)
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos]
    return '\n' === e
      ? yield* this.pushCount(1)
      : '\r' === e && '\n' === this.charAt(1)
        ? yield* this.pushCount(2)
        : 0
  }
  *pushSpaces(e) {
    let t,
      n = this.pos - 1
    do {
      t = this.buffer[++n]
    } while (' ' === t || (e && '\t' === t))
    const s = n - this.pos
    return (s > 0 && (yield this.buffer.substr(this.pos, s), (this.pos = n)), s)
  }
  *pushUntil(e) {
    let t = this.pos,
      n = this.buffer[t]
    for (; !e(n); ) n = this.buffer[++t]
    return yield* this.pushToIndex(t, !1)
  }
}
class bn {
  constructor() {
    ;((this.lineStarts = []),
      (this.addNewLine = (e) => this.lineStarts.push(e)),
      (this.linePos = (e) => {
        let t = 0,
          n = this.lineStarts.length
        for (; t < n; ) {
          const s = (t + n) >> 1
          this.lineStarts[s] < e ? (t = s + 1) : (n = s)
        }
        if (this.lineStarts[t] === e) return { line: t + 1, col: 1 }
        if (0 === t) return { line: 0, col: e }
        return { line: t, col: e - this.lineStarts[t - 1] + 1 }
      }))
  }
}
function kn(e, t) {
  for (let n = 0; n < e.length; ++n) if (e[n].type === t) return !0
  return !1
}
function wn(e) {
  for (let t = 0; t < e.length; ++t)
    switch (e[t].type) {
      case 'space':
      case 'comment':
      case 'newline':
        break
      default:
        return t
    }
  return -1
}
function vn(e) {
  switch (e?.type) {
    case 'alias':
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'flow-collection':
      return !0
    default:
      return !1
  }
}
function Sn(e) {
  switch (e.type) {
    case 'document':
      return e.start
    case 'block-map': {
      const t = e.items[e.items.length - 1]
      return t.sep ?? t.start
    }
    case 'block-seq':
      return e.items[e.items.length - 1].start
    default:
      return []
  }
}
function En(e) {
  if (0 === e.length) return []
  let t = e.length
  e: for (; --t >= 0; )
    switch (e[t].type) {
      case 'doc-start':
      case 'explicit-key-ind':
      case 'map-value-ind':
      case 'seq-item-ind':
      case 'newline':
        break e
    }
  for (; 'space' === e[++t]?.type; );
  return e.splice(t, e.length)
}
function Nn(e) {
  if ('flow-seq-start' === e.start.type)
    for (const t of e.items)
      !t.sep ||
        t.value ||
        kn(t.start, 'explicit-key-ind') ||
        kn(t.sep, 'map-value-ind') ||
        (t.key && (t.value = t.key),
        delete t.key,
        vn(t.value)
          ? t.value.end
            ? Array.prototype.push.apply(t.value.end, t.sep)
            : (t.value.end = t.sep)
          : Array.prototype.push.apply(t.start, t.sep),
        delete t.sep)
}
class On {
  constructor(e) {
    ;((this.atNewLine = !0),
      (this.atScalar = !1),
      (this.indent = 0),
      (this.offset = 0),
      (this.onKeyLine = !1),
      (this.stack = []),
      (this.source = ''),
      (this.type = ''),
      (this.lexer = new gn()),
      (this.onNewLine = e))
  }
  *parse(e, t = !1) {
    this.onNewLine && 0 === this.offset && this.onNewLine(0)
    for (const n of this.lexer.lex(e, t)) yield* this.next(n)
    t || (yield* this.end())
  }
  *next(e) {
    if (((this.source = e), this.atScalar))
      return (
        (this.atScalar = !1),
        yield* this.step(),
        void (this.offset += e.length)
      )
    const t = ln(e)
    if (t)
      if ('scalar' === t)
        ((this.atNewLine = !1), (this.atScalar = !0), (this.type = 'scalar'))
      else {
        switch (((this.type = t), yield* this.step(), t)) {
          case 'newline':
            ;((this.atNewLine = !0),
              (this.indent = 0),
              this.onNewLine && this.onNewLine(this.offset + e.length))
            break
          case 'space':
            this.atNewLine && ' ' === e[0] && (this.indent += e.length)
            break
          case 'explicit-key-ind':
          case 'map-value-ind':
          case 'seq-item-ind':
            this.atNewLine && (this.indent += e.length)
            break
          case 'doc-mode':
          case 'flow-error-end':
            return
          default:
            this.atNewLine = !1
        }
        this.offset += e.length
      }
    else {
      const t = `Not a YAML token: ${e}`
      ;(yield* this.pop({
        type: 'error',
        offset: this.offset,
        message: t,
        source: e,
      }),
        (this.offset += e.length))
    }
  }
  *end() {
    for (; this.stack.length > 0; ) yield* this.pop()
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source,
    }
  }
  *step() {
    const e = this.peek(1)
    if ('doc-end' !== this.type || (e && 'doc-end' === e.type)) {
      if (!e) return yield* this.stream()
      switch (e.type) {
        case 'document':
          return yield* this.document(e)
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
          return yield* this.scalar(e)
        case 'block-scalar':
          return yield* this.blockScalar(e)
        case 'block-map':
          return yield* this.blockMap(e)
        case 'block-seq':
          return yield* this.blockSequence(e)
        case 'flow-collection':
          return yield* this.flowCollection(e)
        case 'doc-end':
          return yield* this.documentEnd(e)
      }
      yield* this.pop()
    } else {
      for (; this.stack.length > 0; ) yield* this.pop()
      this.stack.push({
        type: 'doc-end',
        offset: this.offset,
        source: this.source,
      })
    }
  }
  peek(e) {
    return this.stack[this.stack.length - e]
  }
  *pop(e) {
    const t = e ?? this.stack.pop()
    if (t)
      if (0 === this.stack.length) yield t
      else {
        const e = this.peek(1)
        switch (
          ('block-scalar' === t.type
            ? (t.indent = 'indent' in e ? e.indent : 0)
            : 'flow-collection' === t.type &&
              'document' === e.type &&
              (t.indent = 0),
          'flow-collection' === t.type && Nn(t),
          e.type)
        ) {
          case 'document':
            e.value = t
            break
          case 'block-scalar':
            e.props.push(t)
            break
          case 'block-map': {
            const n = e.items[e.items.length - 1]
            if (n.value)
              return (
                e.items.push({ start: [], key: t, sep: [] }),
                void (this.onKeyLine = !0)
              )
            if (!n.sep)
              return (
                Object.assign(n, { key: t, sep: [] }),
                void (this.onKeyLine = !n.explicitKey)
              )
            n.value = t
            break
          }
          case 'block-seq': {
            const n = e.items[e.items.length - 1]
            n.value ? e.items.push({ start: [], value: t }) : (n.value = t)
            break
          }
          case 'flow-collection': {
            const n = e.items[e.items.length - 1]
            return void (!n || n.value
              ? e.items.push({ start: [], key: t, sep: [] })
              : n.sep
                ? (n.value = t)
                : Object.assign(n, { key: t, sep: [] }))
          }
          default:
            ;(yield* this.pop(), yield* this.pop(t))
        }
        if (
          !(
            ('document' !== e.type &&
              'block-map' !== e.type &&
              'block-seq' !== e.type) ||
            ('block-map' !== t.type && 'block-seq' !== t.type)
          )
        ) {
          const n = t.items[t.items.length - 1]
          n &&
            !n.sep &&
            !n.value &&
            n.start.length > 0 &&
            -1 === wn(n.start) &&
            (0 === t.indent ||
              n.start.every(
                (e) => 'comment' !== e.type || e.indent < t.indent,
              )) &&
            ('document' === e.type
              ? (e.end = n.start)
              : e.items.push({ start: n.start }),
            t.items.splice(-1, 1))
        }
      }
    else {
      const e = 'Tried to pop an empty stack'
      yield { type: 'error', offset: this.offset, source: '', message: e }
    }
  }
  *stream() {
    switch (this.type) {
      case 'directive-line':
        return void (yield {
          type: 'directive',
          offset: this.offset,
          source: this.source,
        })
      case 'byte-order-mark':
      case 'space':
      case 'comment':
      case 'newline':
        return void (yield this.sourceToken)
      case 'doc-mode':
      case 'doc-start': {
        const e = { type: 'document', offset: this.offset, start: [] }
        return (
          'doc-start' === this.type && e.start.push(this.sourceToken),
          void this.stack.push(e)
        )
      }
    }
    yield {
      type: 'error',
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source,
    }
  }
  *document(e) {
    if (e.value) return yield* this.lineEnd(e)
    switch (this.type) {
      case 'doc-start':
        return void (-1 !== wn(e.start)
          ? (yield* this.pop(), yield* this.step())
          : e.start.push(this.sourceToken))
      case 'anchor':
      case 'tag':
      case 'space':
      case 'comment':
      case 'newline':
        return void e.start.push(this.sourceToken)
    }
    const t = this.startBlockValue(e)
    t
      ? this.stack.push(t)
      : yield {
          type: 'error',
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML document`,
          source: this.source,
        }
  }
  *scalar(e) {
    if ('map-value-ind' === this.type) {
      const t = En(Sn(this.peek(2)))
      let n
      e.end
        ? ((n = e.end), n.push(this.sourceToken), delete e.end)
        : (n = [this.sourceToken])
      const s = {
        type: 'block-map',
        offset: e.offset,
        indent: e.indent,
        items: [{ start: t, key: e, sep: n }],
      }
      ;((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = s))
    } else yield* this.lineEnd(e)
  }
  *blockScalar(e) {
    switch (this.type) {
      case 'space':
      case 'comment':
      case 'newline':
        return void e.props.push(this.sourceToken)
      case 'scalar':
        if (
          ((e.source = this.source),
          (this.atNewLine = !0),
          (this.indent = 0),
          this.onNewLine)
        ) {
          let e = this.source.indexOf('\n') + 1
          for (; 0 !== e; )
            (this.onNewLine(this.offset + e),
              (e = this.source.indexOf('\n', e) + 1))
        }
        yield* this.pop()
        break
      default:
        ;(yield* this.pop(), yield* this.step())
    }
  }
  *blockMap(e) {
    const t = e.items[e.items.length - 1]
    switch (this.type) {
      case 'newline':
        if (((this.onKeyLine = !1), t.value)) {
          const n = 'end' in t.value ? t.value.end : void 0,
            s = Array.isArray(n) ? n[n.length - 1] : void 0
          'comment' === s?.type
            ? n?.push(this.sourceToken)
            : e.items.push({ start: [this.sourceToken] })
        } else
          t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken)
        return
      case 'space':
      case 'comment':
        if (t.value) e.items.push({ start: [this.sourceToken] })
        else if (t.sep) t.sep.push(this.sourceToken)
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const n = e.items[e.items.length - 2],
              s = n?.value?.end
            if (Array.isArray(s))
              return (
                Array.prototype.push.apply(s, t.start),
                s.push(this.sourceToken),
                void e.items.pop()
              )
          }
          t.start.push(this.sourceToken)
        }
        return
    }
    if (this.indent >= e.indent) {
      const n = !this.onKeyLine && this.indent === e.indent,
        s = n && (t.sep || t.explicitKey) && 'seq-item-ind' !== this.type
      let i = []
      if (s && t.sep && !t.value) {
        const n = []
        for (let s = 0; s < t.sep.length; ++s) {
          const i = t.sep[s]
          switch (i.type) {
            case 'newline':
              n.push(s)
              break
            case 'space':
              break
            case 'comment':
              i.indent > e.indent && (n.length = 0)
              break
            default:
              n.length = 0
          }
        }
        n.length >= 2 && (i = t.sep.splice(n[1]))
      }
      switch (this.type) {
        case 'anchor':
        case 'tag':
          return void (s || t.value
            ? (i.push(this.sourceToken),
              e.items.push({ start: i }),
              (this.onKeyLine = !0))
            : t.sep
              ? t.sep.push(this.sourceToken)
              : t.start.push(this.sourceToken))
        case 'explicit-key-ind':
          return (
            t.sep || t.explicitKey
              ? s || t.value
                ? (i.push(this.sourceToken),
                  e.items.push({ start: i, explicitKey: !0 }))
                : this.stack.push({
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [this.sourceToken], explicitKey: !0 }],
                  })
              : (t.start.push(this.sourceToken), (t.explicitKey = !0)),
            void (this.onKeyLine = !0)
          )
        case 'map-value-ind':
          if (t.explicitKey)
            if (t.sep)
              if (t.value)
                e.items.push({ start: [], key: null, sep: [this.sourceToken] })
              else if (kn(t.sep, 'map-value-ind'))
                this.stack.push({
                  type: 'block-map',
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: i, key: null, sep: [this.sourceToken] }],
                })
              else if (vn(t.key) && !kn(t.sep, 'newline')) {
                const e = En(t.start),
                  n = t.key,
                  s = t.sep
                ;(s.push(this.sourceToken),
                  delete t.key,
                  delete t.sep,
                  this.stack.push({
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: e, key: n, sep: s }],
                  }))
              } else
                i.length > 0
                  ? (t.sep = t.sep.concat(i, this.sourceToken))
                  : t.sep.push(this.sourceToken)
            else if (kn(t.start, 'newline'))
              Object.assign(t, { key: null, sep: [this.sourceToken] })
            else {
              const e = En(t.start)
              this.stack.push({
                type: 'block-map',
                offset: this.offset,
                indent: this.indent,
                items: [{ start: e, key: null, sep: [this.sourceToken] }],
              })
            }
          else
            t.sep
              ? t.value || s
                ? e.items.push({ start: i, key: null, sep: [this.sourceToken] })
                : kn(t.sep, 'map-value-ind')
                  ? this.stack.push({
                      type: 'block-map',
                      offset: this.offset,
                      indent: this.indent,
                      items: [
                        { start: [], key: null, sep: [this.sourceToken] },
                      ],
                    })
                  : t.sep.push(this.sourceToken)
              : Object.assign(t, { key: null, sep: [this.sourceToken] })
          return void (this.onKeyLine = !0)
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar': {
          const n = this.flowScalar(this.type)
          return void (s || t.value
            ? (e.items.push({ start: i, key: n, sep: [] }),
              (this.onKeyLine = !0))
            : t.sep
              ? this.stack.push(n)
              : (Object.assign(t, { key: n, sep: [] }), (this.onKeyLine = !0)))
        }
        default: {
          const s = this.startBlockValue(e)
          if (s) {
            if ('block-seq' === s.type) {
              if (!t.explicitKey && t.sep && !kn(t.sep, 'newline'))
                return void (yield* this.pop({
                  type: 'error',
                  offset: this.offset,
                  message: 'Unexpected block-seq-ind on same line with key',
                  source: this.source,
                }))
            } else n && e.items.push({ start: i })
            return void this.stack.push(s)
          }
        }
      }
    }
    ;(yield* this.pop(), yield* this.step())
  }
  *blockSequence(e) {
    const t = e.items[e.items.length - 1]
    switch (this.type) {
      case 'newline':
        if (t.value) {
          const n = 'end' in t.value ? t.value.end : void 0,
            s = Array.isArray(n) ? n[n.length - 1] : void 0
          'comment' === s?.type
            ? n?.push(this.sourceToken)
            : e.items.push({ start: [this.sourceToken] })
        } else t.start.push(this.sourceToken)
        return
      case 'space':
      case 'comment':
        if (t.value) e.items.push({ start: [this.sourceToken] })
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const n = e.items[e.items.length - 2],
              s = n?.value?.end
            if (Array.isArray(s))
              return (
                Array.prototype.push.apply(s, t.start),
                s.push(this.sourceToken),
                void e.items.pop()
              )
          }
          t.start.push(this.sourceToken)
        }
        return
      case 'anchor':
      case 'tag':
        if (t.value || this.indent <= e.indent) break
        return void t.start.push(this.sourceToken)
      case 'seq-item-ind':
        if (this.indent !== e.indent) break
        return void (t.value || kn(t.start, 'seq-item-ind')
          ? e.items.push({ start: [this.sourceToken] })
          : t.start.push(this.sourceToken))
    }
    if (this.indent > e.indent) {
      const t = this.startBlockValue(e)
      if (t) return void this.stack.push(t)
    }
    ;(yield* this.pop(), yield* this.step())
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1]
    if ('flow-error-end' === this.type) {
      let e
      do {
        ;(yield* this.pop(), (e = this.peek(1)))
      } while (e && 'flow-collection' === e.type)
    } else if (0 === e.end.length) {
      switch (this.type) {
        case 'comma':
        case 'explicit-key-ind':
          return void (!t || t.sep
            ? e.items.push({ start: [this.sourceToken] })
            : t.start.push(this.sourceToken))
        case 'map-value-ind':
          return void (!t || t.value
            ? e.items.push({ start: [], key: null, sep: [this.sourceToken] })
            : t.sep
              ? t.sep.push(this.sourceToken)
              : Object.assign(t, { key: null, sep: [this.sourceToken] }))
        case 'space':
        case 'comment':
        case 'newline':
        case 'anchor':
        case 'tag':
          return void (!t || t.value
            ? e.items.push({ start: [this.sourceToken] })
            : t.sep
              ? t.sep.push(this.sourceToken)
              : t.start.push(this.sourceToken))
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar': {
          const n = this.flowScalar(this.type)
          return void (!t || t.value
            ? e.items.push({ start: [], key: n, sep: [] })
            : t.sep
              ? this.stack.push(n)
              : Object.assign(t, { key: n, sep: [] }))
        }
        case 'flow-map-end':
        case 'flow-seq-end':
          return void e.end.push(this.sourceToken)
      }
      const n = this.startBlockValue(e)
      n ? this.stack.push(n) : (yield* this.pop(), yield* this.step())
    } else {
      const t = this.peek(2)
      if (
        'block-map' === t.type &&
        (('map-value-ind' === this.type && t.indent === e.indent) ||
          ('newline' === this.type && !t.items[t.items.length - 1].sep))
      )
        (yield* this.pop(), yield* this.step())
      else if ('map-value-ind' === this.type && 'flow-collection' !== t.type) {
        const n = En(Sn(t))
        Nn(e)
        const s = e.end.splice(1, e.end.length)
        s.push(this.sourceToken)
        const i = {
          type: 'block-map',
          offset: e.offset,
          indent: e.indent,
          items: [{ start: n, key: e, sep: s }],
        }
        ;((this.onKeyLine = !0), (this.stack[this.stack.length - 1] = i))
      } else yield* this.lineEnd(e)
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let e = this.source.indexOf('\n') + 1
      for (; 0 !== e; )
        (this.onNewLine(this.offset + e),
          (e = this.source.indexOf('\n', e) + 1))
    }
    return {
      type: e,
      offset: this.offset,
      indent: this.indent,
      source: this.source,
    }
  }
  startBlockValue(e) {
    switch (this.type) {
      case 'alias':
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return this.flowScalar(this.type)
      case 'block-scalar-header':
        return {
          type: 'block-scalar',
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: '',
        }
      case 'flow-map-start':
      case 'flow-seq-start':
        return {
          type: 'flow-collection',
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: [],
        }
      case 'seq-item-ind':
        return {
          type: 'block-seq',
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }],
        }
      case 'explicit-key-ind': {
        this.onKeyLine = !0
        const t = En(Sn(e))
        return (
          t.push(this.sourceToken),
          {
            type: 'block-map',
            offset: this.offset,
            indent: this.indent,
            items: [{ start: t, explicitKey: !0 }],
          }
        )
      }
      case 'map-value-ind': {
        this.onKeyLine = !0
        const t = En(Sn(e))
        return {
          type: 'block-map',
          offset: this.offset,
          indent: this.indent,
          items: [{ start: t, key: null, sep: [this.sourceToken] }],
        }
      }
    }
    return null
  }
  atIndentedComment(e, t) {
    return (
      'comment' === this.type &&
      !(this.indent <= t) &&
      e.every((e) => 'newline' === e.type || 'space' === e.type)
    )
  }
  *documentEnd(e) {
    'doc-mode' !== this.type &&
      (e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
      'newline' === this.type && (yield* this.pop()))
  }
  *lineEnd(e) {
    switch (this.type) {
      case 'comma':
      case 'doc-start':
      case 'doc-end':
      case 'flow-seq-end':
      case 'flow-map-end':
      case 'map-value-ind':
        ;(yield* this.pop(), yield* this.step())
        break
      case 'newline':
        this.onKeyLine = !1
      default:
        ;(e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
          'newline' === this.type && (yield* this.pop()))
    }
  }
}
function An(e) {
  const t = !1 !== e.prettyErrors
  return {
    lineCounter: e.lineCounter || (t && new bn()) || null,
    prettyErrors: t,
  }
}
function In(e, t = {}) {
  const { lineCounter: n, prettyErrors: s } = An(t),
    i = new On(n?.addNewLine),
    o = new Gt(t),
    r = Array.from(o.compose(i.parse(e)))
  if (s && n)
    for (const t of r)
      (t.errors.forEach(Ot(e, n)), t.warnings.forEach(Ot(e, n)))
  return r.length > 0 ? r : Object.assign([], { empty: !0 }, o.streamInfo())
}
function Tn(e, t = {}) {
  const { lineCounter: n, prettyErrors: s } = An(t),
    i = new On(n?.addNewLine),
    o = new Gt(t)
  let r = null
  for (const t of o.compose(i.parse(e), !0, e.length))
    if (r) {
      if ('silent' !== r.options.logLevel) {
        r.errors.push(
          new Et(
            t.range.slice(0, 2),
            'MULTIPLE_DOCS',
            'Source contains multiple documents; please use YAML.parseAllDocuments()',
          ),
        )
        break
      }
    } else r = t
  return (
    s && n && (r.errors.forEach(Ot(e, n)), r.warnings.forEach(Ot(e, n))),
    r
  )
}
function Ln(e, t, n) {
  let s
  'function' == typeof t
    ? (s = t)
    : void 0 === n && t && 'object' == typeof t && (n = t)
  const i = Tn(e, n)
  if (!i) return null
  if (
    (i.warnings.forEach((e) => re(i.options.logLevel, e)), i.errors.length > 0)
  ) {
    if ('silent' !== i.options.logLevel) throw i.errors[0]
    i.errors = []
  }
  return i.toJS(Object.assign({ reviver: s }, n))
}
function xn(e, t, n) {
  let s = null
  if (
    ('function' == typeof t || Array.isArray(t)
      ? (s = t)
      : void 0 === n && t && (n = t),
    'string' == typeof n && (n = n.length),
    'number' == typeof n)
  ) {
    const e = Math.round(n)
    n = e < 1 ? void 0 : e > 8 ? { indent: 8 } : { indent: e }
  }
  if (void 0 === e) {
    const { keepUndefined: e } = n ?? t ?? {}
    if (!e) return
  }
  return c(e) && !s ? e.toString(n) : new wt(e, s, n).toString(n)
}
var $n = Object.freeze({
  __proto__: null,
  CST: un,
  Composer: Gt,
  Document: wt,
  Schema: kt,
  YAMLError: St,
  YAMLParseError: Et,
  YAMLWarning: Nt,
  Alias: K,
  isAlias: a,
  isCollection: d,
  isDocument: c,
  isMap: l,
  isNode: p,
  isPair: u,
  isScalar: f,
  isSeq: h,
  Pair: de,
  Scalar: M,
  YAMLMap: ke,
  YAMLSeq: ve,
  Lexer: gn,
  LineCounter: bn,
  Parser: On,
  parse: Ln,
  parseAllDocuments: In,
  parseDocument: Tn,
  stringify: xn,
  visit: k,
  visitAsync: v,
})
export {
  K as Alias,
  un as CST,
  Gt as Composer,
  wt as Document,
  gn as Lexer,
  bn as LineCounter,
  de as Pair,
  On as Parser,
  M as Scalar,
  kt as Schema,
  St as YAMLError,
  ke as YAMLMap,
  Et as YAMLParseError,
  ve as YAMLSeq,
  Nt as YAMLWarning,
  $n as default,
  a as isAlias,
  d as isCollection,
  c as isDocument,
  l as isMap,
  p as isNode,
  u as isPair,
  f as isScalar,
  h as isSeq,
  Ln as parse,
  In as parseAllDocuments,
  Tn as parseDocument,
  xn as stringify,
  k as visit,
  v as visitAsync,
}
//# sourceMappingURL=/sm/2143116c8be5cf68d08e663bdcef7298912012f981ad285f7a98861a6557bc5d.map
