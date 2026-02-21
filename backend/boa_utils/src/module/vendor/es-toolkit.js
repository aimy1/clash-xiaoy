/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/es-toolkit@1.39.10/dist/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function t(t, e) {
  const n = new Array(e.length),
    r = t.length
  for (let o = 0; o < e.length; o++) {
    let i = e[o]
    ;((i = Number.isInteger(i) ? i : Math.trunc(i) || 0),
      i < 0 && (i += r),
      (n[o] = t[i]))
  }
  return n
}
function e(t, e) {
  if (!Number.isInteger(e) || e <= 0)
    throw new Error('Size must be an integer greater than zero.')
  const n = Math.ceil(t.length / e),
    r = Array(n)
  for (let o = 0; o < n; o++) {
    const n = o * e,
      i = n + e
    r[o] = t.slice(n, i)
  }
  return r
}
function n(t) {
  const e = []
  for (let n = 0; n < t.length; n++) {
    const r = t[n]
    r && e.push(r)
  }
  return e
}
function r(t, e) {
  const n = {}
  for (let r = 0; r < t.length; r++) {
    const o = e(t[r])
    n[o] = (n[o] ?? 0) + 1
  }
  return n
}
function o(t, e) {
  const n = new Set(e)
  return t.filter((t) => !n.has(t))
}
function i(t, e, n) {
  const r = new Set(e.map((t) => n(t)))
  return t.filter((t) => !r.has(n(t)))
}
function u(t, e, n) {
  return t.filter((t) => e.every((e) => !n(t, e)))
}
function s(t, e) {
  return ((e = Math.max(e, 0)), t.slice(e))
}
function f(t, e) {
  return 0 === (e = Math.min(-e, 0)) ? t.slice() : t.slice(0, e)
}
function c(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (!e(t[n], n, t)) return t.slice(0, n + 1)
  return []
}
function a(t, e) {
  const n = t.findIndex((t, n, r) => !e(t, n, r))
  return -1 === n ? [] : t.slice(n)
}
function l(t, e, n = 0, r = t.length) {
  const o = t.length,
    i = Math.max(n >= 0 ? n : o + n, 0),
    u = Math.min(r >= 0 ? r : o + r, o)
  for (let n = i; n < u; n++) t[n] = e
  return t
}
function h(t, e = 1) {
  const n = [],
    r = Math.floor(e),
    o = (t, e) => {
      for (let i = 0; i < t.length; i++) {
        const u = t[i]
        Array.isArray(u) && e < r ? o(u, e + 1) : n.push(u)
      }
    }
  return (o(t, 0), n)
}
function p(t, e, n = 1) {
  return h(
    t.map((t) => e(t)),
    n,
  )
}
function g(t) {
  return h(t, 1 / 0)
}
function y(t, e) {
  return g(t.map((t) => e(t)))
}
function w(t, e) {
  for (let n = t.length - 1; n >= 0; n--) {
    e(t[n], n, t)
  }
}
function d(t, e) {
  const n = {}
  for (let r = 0; r < t.length; r++) {
    const o = t[r],
      i = e(o)
    ;(Object.hasOwn(n, i) || (n[i] = []), n[i].push(o))
  }
  return n
}
function b(t) {
  return t[0]
}
function m(t) {
  return t.slice(0, -1)
}
function v(t, e) {
  const n = new Set(e)
  return t.filter((t) => n.has(t))
}
function A(t, e, n) {
  const r = new Set(e.map(n))
  return t.filter((t) => r.has(n(t)))
}
function E(t, e, n) {
  return t.filter((t) => e.some((e) => n(t, e)))
}
function O(t, e) {
  return 0 === o(e, t).length
}
function j(t, e, n) {
  return 0 === u(e, t, n).length
}
function T(t, e) {
  const n = {}
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    n[e(o)] = o
  }
  return n
}
function R(t) {
  return t[t.length - 1]
}
function S(t, e) {
  if (0 === t.length) return
  let n = t[0],
    r = e(n)
  for (let o = 1; o < t.length; o++) {
    const i = t[o],
      u = e(i)
    u > r && ((r = u), (n = i))
  }
  return n
}
function P(t, e) {
  if (0 === t.length) return
  let n = t[0],
    r = e(n)
  for (let o = 1; o < t.length; o++) {
    const i = t[o],
      u = e(i)
    u < r && ((r = u), (n = i))
  }
  return n
}
function _(t, e, n) {
  return t < e ? ('asc' === n ? -1 : 1) : t > e ? ('asc' === n ? 1 : -1) : 0
}
function M(t, e, n) {
  return t.slice().sort((t, r) => {
    const o = n.length
    for (let i = 0; i < e.length; i++) {
      const u = o > i ? n[i] : n[o - 1],
        s = e[i],
        f = 'function' == typeof s,
        c = _(f ? s(t) : t[s], f ? s(r) : r[s], u)
      if (0 !== c) return c
    }
    return 0
  })
}
function U(t, e) {
  const n = [],
    r = []
  for (let o = 0; o < t.length; o++) {
    const i = t[o]
    e(i) ? n.push(i) : r.push(i)
  }
  return [n, r]
}
function B(t, e) {
  const n = new Set(e)
  let r = 0
  for (let e = 0; e < t.length; e++)
    n.has(t[e]) || (Object.hasOwn(t, e) ? (t[r++] = t[e]) : delete t[r++])
  return ((t.length = r), t)
}
function I(e, n) {
  const r = t(e, n),
    o = new Set(n.slice().sort((t, e) => e - t))
  for (const t of o) e.splice(t, 1)
  return r
}
function L(t, e) {
  const n = t.slice(),
    r = []
  let o = 0
  for (let i = 0; i < t.length; i++)
    e(t[i], i, n)
      ? r.push(t[i])
      : Object.hasOwn(t, i)
        ? (t[o++] = t[i])
        : delete t[o++]
  return ((t.length = o), r)
}
function x(t) {
  return t[Math.floor(Math.random() * t.length)]
}
function N(t, e) {
  if ((null == e && ((e = t), (t = 0)), t >= e))
    throw new Error(
      'Invalid input: The maximum value must be greater than the minimum value.',
    )
  return Math.random() * (e - t) + t
}
function D(t, e) {
  return Math.floor(N(t, e))
}
function k(t, e) {
  if (e > t.length)
    throw new Error('Size must be less than or equal to the length of array.')
  const n = new Array(e),
    r = new Set()
  for (let o = t.length - e, i = 0; o < t.length; o++, i++) {
    let e = D(0, o + 1)
    ;(r.has(e) && (e = o), r.add(e), (n[i] = t[e]))
  }
  return n
}
function C(t) {
  const e = t.slice()
  for (let t = e.length - 1; t >= 1; t--) {
    const n = Math.floor(Math.random() * (t + 1))
    ;[e[t], e[n]] = [e[n], e[t]]
  }
  return e
}
function Y(t, e) {
  return M(t, e, ['asc'])
}
function z(t) {
  return t.slice(1)
}
function F(t) {
  return (function (t) {
    return 'symbol' == typeof t || t instanceof Symbol
  })(t)
    ? NaN
    : Number(t)
}
function V(t) {
  const e = (function (t) {
      if (!t) return 0 === t ? t : 0
      if ((t = F(t)) === 1 / 0 || t === -1 / 0)
        return (t < 0 ? -1 : 1) * Number.MAX_VALUE
      return t == t ? t : 0
    })(t),
    n = e % 1
  return n ? e - n : e
}
function q(t, e, n) {
  return ((e = n || void 0 === e ? 1 : V(e)), t.slice(0, e))
}
function $(t, e = 1, n) {
  return (e = n || void 0 === e ? 1 : V(e)) <= 0 || null == t || 0 === t.length
    ? []
    : t.slice(-e)
}
function J(t, e) {
  for (let n = t.length - 1; n >= 0; n--) if (!e(t[n])) return t.slice(n + 1)
  return t.slice()
}
function W(t, e) {
  const n = []
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    if (!e(o)) break
    n.push(o)
  }
  return n
}
function K(t, e, n = 0, r = t.length) {
  const o = t.length,
    i = Math.max(n >= 0 ? n : o + n, 0),
    u = Math.min(r >= 0 ? r : o + r, o),
    s = t.slice()
  for (let t = i; t < u; t++) s[t] = e
  return s
}
function H(t) {
  return Array.from(new Set(t))
}
function X(t, e) {
  return H(t.concat(e))
}
function Z(t, e) {
  const n = new Map()
  for (let r = 0; r < t.length; r++) {
    const o = t[r],
      i = e(o)
    n.has(i) || n.set(i, o)
  }
  return Array.from(n.values())
}
function G(t, e, n) {
  return Z(t.concat(e), n)
}
function Q(t, e) {
  const n = []
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    n.every((t) => !e(t, o)) && n.push(o)
  }
  return n
}
function tt(t, e, n) {
  return Q(t.concat(e), n)
}
function et(t) {
  let e = 0
  for (let n = 0; n < t.length; n++) t[n].length > e && (e = t[n].length)
  const n = new Array(e)
  for (let r = 0; r < e; r++) {
    n[r] = new Array(t.length)
    for (let e = 0; e < t.length; e++) n[r][e] = t[e][r]
  }
  return n
}
function nt(t, e) {
  const n = Math.max(...t.map((t) => t.length)),
    r = new Array(n)
  for (let o = 0; o < n; o++) {
    const n = new Array(t.length)
    for (let e = 0; e < t.length; e++) n[e] = t[e][o]
    r[o] = e(...n)
  }
  return r
}
function rt(t, e, n = 1, { partialWindows: r = !1 } = {}) {
  if (e <= 0 || !Number.isInteger(e))
    throw new Error('Size must be a positive integer.')
  if (n <= 0 || !Number.isInteger(n))
    throw new Error('Step must be a positive integer.')
  const o = [],
    i = r ? t.length : t.length - e + 1
  for (let r = 0; r < i; r += n) o.push(t.slice(r, r + e))
  return o
}
function ot(t, ...e) {
  return o(t, e)
}
function it(t, e) {
  return o(X(t, e), v(t, e))
}
function ut(t, e, n) {
  return i(G(t, e, n), A(t, e, n), n)
}
function st(t, e, n) {
  return u(tt(t, e, n), E(t, e, n), n)
}
function ft(...t) {
  let e = 0
  for (let n = 0; n < t.length; n++) t[n].length > e && (e = t[n].length)
  const n = t.length,
    r = Array(e)
  for (let o = 0; o < e; ++o) {
    const e = Array(n)
    for (let r = 0; r < n; ++r) e[r] = t[r][o]
    r[o] = e
  }
  return r
}
function ct(t, e) {
  const n = {}
  for (let r = 0; r < t.length; r++) n[t[r]] = e[r]
  return n
}
function at(t, ...e) {
  const n = [t, ...e.slice(0, -1)],
    r = e[e.length - 1],
    o = Math.max(...n.map((t) => t.length)),
    i = Array(o)
  for (let t = 0; t < o; t++) {
    const e = n.map((e) => e[t])
    i[t] = r(...e)
  }
  return i
}
class lt extends Error {
  constructor(t = 'The operation was aborted') {
    ;(super(t), (this.name = 'AbortError'))
  }
}
class ht extends Error {
  constructor(t = 'The operation was timed out') {
    ;(super(t), (this.name = 'TimeoutError'))
  }
}
function pt(t, e) {
  if (!Number.isInteger(t) || t < 0)
    throw new Error('n must be a non-negative integer.')
  let n = 0
  return (...r) => {
    if (++n >= t) return e(...r)
  }
}
function gt(t, e) {
  return function (...n) {
    return t.apply(this, n.slice(0, e))
  }
}
async function yt() {}
function wt(t, e) {
  if (!Number.isInteger(t) || t < 0)
    throw new Error('n must be a non-negative integer.')
  let n = 0
  return (...r) => {
    if (++n < t) return e(...r)
  }
}
function dt(t) {
  return 0 === t.length || 1 === t.length
    ? t
    : function (e) {
        return bt(t, t.length, [e])
      }
}
function bt(t, e, n) {
  if (n.length === e) return t(...n)
  return function (r) {
    return bt(t, e, [...n, r])
  }
}
function mt(t) {
  return 0 === t.length || 1 === t.length
    ? t
    : function (e) {
        return vt(t, t.length, [e])
      }
}
function vt(t, e, n) {
  if (n.length === e) return t(...n)
  return function (r) {
    return vt(t, e, [r, ...n])
  }
}
function At(t, e, { signal: n, edges: r } = {}) {
  let o,
    i = null
  const u = null != r && r.includes('leading'),
    s = null == r || r.includes('trailing'),
    f = () => {
      null !== i && (t.apply(o, i), (o = void 0), (i = null))
    }
  let c = null
  const a = () => {
      ;(null != c && clearTimeout(c),
        (c = setTimeout(() => {
          ;((c = null), s && f(), l())
        }, e)))
    },
    l = () => {
      ;(null !== c && (clearTimeout(c), (c = null)), (o = void 0), (i = null))
    },
    h = function (...t) {
      if (n?.aborted) return
      ;((o = this), (i = t))
      const e = null == c
      ;(a(), u && e && f())
    }
  return (
    (h.schedule = a),
    (h.cancel = l),
    (h.flush = () => {
      f()
    }),
    n?.addEventListener('abort', l, { once: !0 }),
    h
  )
}
function Et(...t) {
  return function (...e) {
    let n = t.length ? t[0].apply(this, e) : e[0]
    for (let e = 1; e < t.length; e++) n = t[e].call(this, n)
    return n
  }
}
function Ot(...t) {
  return Et(...t.reverse())
}
function jt(t) {
  return t
}
function Tt(t, e = {}) {
  const { cache: n = new Map(), getCacheKey: r } = e,
    o = function (e) {
      const o = r ? r(e) : e
      if (n.has(o)) return n.get(o)
      const i = t.call(this, e)
      return (n.set(o, i), i)
    }
  return ((o.cache = n), o)
}
function Rt(t) {
  return (...e) => !t(...e)
}
function St() {}
function Pt(t) {
  let e,
    n = !1
  return function (...r) {
    return (n || ((n = !0), (e = t(...r))), e)
  }
}
function _t(t, ...e) {
  return (function (t, e, ...n) {
    const r = function (...r) {
      let o = 0
      const i = n.slice().map((t) => (t === e ? r[o++] : t)),
        u = r.slice(o)
      return t.apply(this, i.concat(u))
    }
    t.prototype && (r.prototype = Object.create(t.prototype))
    return r
  })(t, Mt, ...e)
}
const Mt = Symbol('partial.placeholder')
function Ut(t, ...e) {
  return (function (t, e, ...n) {
    const r = function (...r) {
      const o = n.filter((t) => t === e).length,
        i = Math.max(r.length - o, 0),
        u = r.slice(0, i)
      let s = i
      const f = n.slice().map((t) => (t === e ? r[s++] : t))
      return t.apply(this, u.concat(f))
    }
    t.prototype && (r.prototype = Object.create(t.prototype))
    return r
  })(t, Bt, ...e)
}
_t.placeholder = Mt
const Bt = Symbol('partialRight.placeholder')
function It(t, e = t.length - 1) {
  return function (...n) {
    const r = n.slice(e),
      o = n.slice(0, e)
    for (; o.length < e; ) o.push(void 0)
    return t.apply(this, [...o, r])
  }
}
function Lt(t, { signal: e } = {}) {
  return new Promise((n, r) => {
    const o = () => {
        r(new lt())
      },
      i = () => {
        ;(clearTimeout(u), o())
      }
    if (e?.aborted) return o()
    const u = setTimeout(() => {
      ;(e?.removeEventListener('abort', i), n())
    }, t)
    e?.addEventListener('abort', i, { once: !0 })
  })
}
Ut.placeholder = Bt
const xt = Number.POSITIVE_INFINITY
async function Nt(t, e) {
  let n, r, o, i
  'number' == typeof e
    ? ((n = 0), (r = e), (o = void 0))
    : ((n = e?.delay ?? 0), (r = e?.retries ?? xt), (o = e?.signal))
  for (let e = 0; e < r; e++) {
    if (o?.aborted)
      throw (
        i ??
        new Error('The retry operation was aborted due to an abort signal.')
      )
    try {
      return await t()
    } catch (t) {
      i = t
      const r = 'function' == typeof n ? n(e) : n
      await Lt(r)
    }
  }
  throw i
}
function Dt(t) {
  return function (e) {
    return t.apply(this, e)
  }
}
function kt(t, e, { signal: n, edges: r = ['leading', 'trailing'] } = {}) {
  let o = null
  const i = At(t, e, { signal: n, edges: r }),
    u = function (...t) {
      ;(null == o
        ? (o = Date.now())
        : Date.now() - o >= e && ((o = Date.now()), i.cancel()),
        i(...t))
    }
  return ((u.cancel = i.cancel), (u.flush = i.flush), u)
}
function Ct(t) {
  return gt(t, 1)
}
function Yt(t, e, n) {
  return null == n ? Math.min(t, e) : Math.min(Math.max(t, e), n)
}
function zt(t, e, n) {
  if ((null == n && ((n = e), (e = 0)), e >= n))
    throw new Error('The maximum value must be greater than the minimum value.')
  return e <= t && t < n
}
function Ft(t) {
  let e = 0
  for (let n = 0; n < t.length; n++) e += t[n]
  return e
}
function Vt(t) {
  return Ft(t) / t.length
}
function qt(t, e) {
  return Vt(t.map((t) => e(t)))
}
function $t(t) {
  if (0 === t.length) return NaN
  const e = t.slice().sort((t, e) => t - e),
    n = Math.floor(e.length / 2)
  return e.length % 2 == 0 ? (e[n - 1] + e[n]) / 2 : e[n]
}
function Jt(t, e) {
  return $t(t.map((t) => e(t)))
}
function Wt(t, e, n = 1) {
  if ((null == e && ((e = t), (t = 0)), !Number.isInteger(n) || 0 === n))
    throw new Error('The step value must be a non-zero integer.')
  const r = Math.max(Math.ceil((e - t) / n), 0),
    o = new Array(r)
  for (let e = 0; e < r; e++) o[e] = t + e * n
  return o
}
function Kt(t, e, n = 1) {
  if ((null == e && ((e = t), (t = 0)), !Number.isInteger(n) || 0 === n))
    throw new Error('The step value must be a non-zero integer.')
  const r = Math.max(Math.ceil((e - t) / n), 0),
    o = new Array(r)
  for (let e = 0; e < r; e++) o[e] = t + (r - e - 1) * n
  return o
}
function Ht(t, e = 0) {
  if (!Number.isInteger(e)) throw new Error('Precision must be an integer.')
  const n = Math.pow(10, e)
  return Math.round(t * n) / n
}
function Xt(t, e) {
  let n = 0
  for (let r = 0; r < t.length; r++) n += e(t[r])
  return n
}
function Zt(t) {
  return null == t || ('object' != typeof t && 'function' != typeof t)
}
function Gt(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView)
}
function Qt(t) {
  if (Zt(t)) return t
  if (
    Array.isArray(t) ||
    Gt(t) ||
    t instanceof ArrayBuffer ||
    ('undefined' != typeof SharedArrayBuffer && t instanceof SharedArrayBuffer)
  )
    return t.slice(0)
  const e = Object.getPrototypeOf(t),
    n = e.constructor
  if (t instanceof Date || t instanceof Map || t instanceof Set) return new n(t)
  if (t instanceof RegExp) {
    const e = new n(t)
    return ((e.lastIndex = t.lastIndex), e)
  }
  if (t instanceof DataView) return new n(t.buffer.slice(0))
  if (t instanceof Error) {
    const e = new n(t.message)
    return ((e.stack = t.stack), (e.name = t.name), (e.cause = t.cause), e)
  }
  if ('undefined' != typeof File && t instanceof File) {
    return new n([t], t.name, { type: t.type, lastModified: t.lastModified })
  }
  if ('object' == typeof t) {
    const n = Object.create(e)
    return Object.assign(n, t)
  }
  return t
}
var te =
    'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
          ? window
          : {},
  ee = [],
  ne = [],
  re = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
  oe = !1
function ie() {
  oe = !0
  for (
    var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      e = 0;
    e < 64;
    ++e
  )
    ((ee[e] = t[e]), (ne[t.charCodeAt(e)] = e))
  ;((ne['-'.charCodeAt(0)] = 62), (ne['_'.charCodeAt(0)] = 63))
}
function ue(t, e, n) {
  for (var r, o, i = [], u = e; u < n; u += 3)
    ((r = (t[u] << 16) + (t[u + 1] << 8) + t[u + 2]),
      i.push(
        ee[((o = r) >> 18) & 63] +
          ee[(o >> 12) & 63] +
          ee[(o >> 6) & 63] +
          ee[63 & o],
      ))
  return i.join('')
}
function se(t) {
  var e
  oe || ie()
  for (
    var n = t.length, r = n % 3, o = '', i = [], u = 16383, s = 0, f = n - r;
    s < f;
    s += u
  )
    i.push(ue(t, s, s + u > f ? f : s + u))
  return (
    1 === r
      ? ((e = t[n - 1]),
        (o += ee[e >> 2]),
        (o += ee[(e << 4) & 63]),
        (o += '=='))
      : 2 === r &&
        ((e = (t[n - 2] << 8) + t[n - 1]),
        (o += ee[e >> 10]),
        (o += ee[(e >> 4) & 63]),
        (o += ee[(e << 2) & 63]),
        (o += '=')),
    i.push(o),
    i.join('')
  )
}
function fe(t, e, n, r, o) {
  var i,
    u,
    s = 8 * o - r - 1,
    f = (1 << s) - 1,
    c = f >> 1,
    a = -7,
    l = n ? o - 1 : 0,
    h = n ? -1 : 1,
    p = t[e + l]
  for (
    l += h, i = p & ((1 << -a) - 1), p >>= -a, a += s;
    a > 0;
    i = 256 * i + t[e + l], l += h, a -= 8
  );
  for (
    u = i & ((1 << -a) - 1), i >>= -a, a += r;
    a > 0;
    u = 256 * u + t[e + l], l += h, a -= 8
  );
  if (0 === i) i = 1 - c
  else {
    if (i === f) return u ? NaN : (1 / 0) * (p ? -1 : 1)
    ;((u += Math.pow(2, r)), (i -= c))
  }
  return (p ? -1 : 1) * u * Math.pow(2, i - r)
}
function ce(t, e, n, r, o, i) {
  var u,
    s,
    f,
    c = 8 * i - o - 1,
    a = (1 << c) - 1,
    l = a >> 1,
    h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    p = r ? 0 : i - 1,
    g = r ? 1 : -1,
    y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0
  for (
    e = Math.abs(e),
      isNaN(e) || e === 1 / 0
        ? ((s = isNaN(e) ? 1 : 0), (u = a))
        : ((u = Math.floor(Math.log(e) / Math.LN2)),
          e * (f = Math.pow(2, -u)) < 1 && (u--, (f *= 2)),
          (e += u + l >= 1 ? h / f : h * Math.pow(2, 1 - l)) * f >= 2 &&
            (u++, (f /= 2)),
          u + l >= a
            ? ((s = 0), (u = a))
            : u + l >= 1
              ? ((s = (e * f - 1) * Math.pow(2, o)), (u += l))
              : ((s = e * Math.pow(2, l - 1) * Math.pow(2, o)), (u = 0)));
    o >= 8;
    t[n + p] = 255 & s, p += g, s /= 256, o -= 8
  );
  for (
    u = (u << o) | s, c += o;
    c > 0;
    t[n + p] = 255 & u, p += g, u /= 256, c -= 8
  );
  t[n + p - g] |= 128 * y
}
var ae = {}.toString,
  le =
    Array.isArray ||
    function (t) {
      return '[object Array]' == ae.call(t)
    }
function he() {
  return ge.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
}
function pe(t, e) {
  if (he() < e) throw new RangeError('Invalid typed array length')
  return (
    ge.TYPED_ARRAY_SUPPORT
      ? ((t = new Uint8Array(e)).__proto__ = ge.prototype)
      : (null === t && (t = new ge(e)), (t.length = e)),
    t
  )
}
function ge(t, e, n) {
  if (!(ge.TYPED_ARRAY_SUPPORT || this instanceof ge)) return new ge(t, e, n)
  if ('number' == typeof t) {
    if ('string' == typeof e)
      throw new Error(
        'If encoding is specified then the first argument must be a string',
      )
    return de(this, t)
  }
  return ye(this, t, e, n)
}
function ye(t, e, n, r) {
  if ('number' == typeof e)
    throw new TypeError('"value" argument must not be a number')
  return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
    ? (function (t, e, n, r) {
        if ((e.byteLength, n < 0 || e.byteLength < n))
          throw new RangeError("'offset' is out of bounds")
        if (e.byteLength < n + (r || 0))
          throw new RangeError("'length' is out of bounds")
        e =
          void 0 === n && void 0 === r
            ? new Uint8Array(e)
            : void 0 === r
              ? new Uint8Array(e, n)
              : new Uint8Array(e, n, r)
        ge.TYPED_ARRAY_SUPPORT
          ? ((t = e).__proto__ = ge.prototype)
          : (t = be(t, e))
        return t
      })(t, e, n, r)
    : 'string' == typeof e
      ? (function (t, e, n) {
          ;('string' == typeof n && '' !== n) || (n = 'utf8')
          if (!ge.isEncoding(n))
            throw new TypeError('"encoding" must be a valid string encoding')
          var r = 0 | Ae(e, n)
          t = pe(t, r)
          var o = t.write(e, n)
          o !== r && (t = t.slice(0, o))
          return t
        })(t, e, n)
      : (function (t, e) {
          if (ve(e)) {
            var n = 0 | me(e.length)
            return (0 === (t = pe(t, n)).length || e.copy(t, 0, 0, n), t)
          }
          if (e) {
            if (
              ('undefined' != typeof ArrayBuffer &&
                e.buffer instanceof ArrayBuffer) ||
              'length' in e
            )
              return 'number' != typeof e.length || (r = e.length) != r
                ? pe(t, 0)
                : be(t, e)
            if ('Buffer' === e.type && le(e.data)) return be(t, e.data)
          }
          var r
          throw new TypeError(
            'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
          )
        })(t, e)
}
function we(t) {
  if ('number' != typeof t)
    throw new TypeError('"size" argument must be a number')
  if (t < 0) throw new RangeError('"size" argument must not be negative')
}
function de(t, e) {
  if ((we(e), (t = pe(t, e < 0 ? 0 : 0 | me(e))), !ge.TYPED_ARRAY_SUPPORT))
    for (var n = 0; n < e; ++n) t[n] = 0
  return t
}
function be(t, e) {
  var n = e.length < 0 ? 0 : 0 | me(e.length)
  t = pe(t, n)
  for (var r = 0; r < n; r += 1) t[r] = 255 & e[r]
  return t
}
function me(t) {
  if (t >= he())
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        he().toString(16) +
        ' bytes',
    )
  return 0 | t
}
function ve(t) {
  return !(null == t || !t._isBuffer)
}
function Ae(t, e) {
  if (ve(t)) return t.length
  if (
    'undefined' != typeof ArrayBuffer &&
    'function' == typeof ArrayBuffer.isView &&
    (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
  )
    return t.byteLength
  'string' != typeof t && (t = '' + t)
  var n = t.length
  if (0 === n) return 0
  for (var r = !1; ; )
    switch (e) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return n
      case 'utf8':
      case 'utf-8':
      case void 0:
        return Ke(t).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 2 * n
      case 'hex':
        return n >>> 1
      case 'base64':
        return He(t).length
      default:
        if (r) return Ke(t).length
        ;((e = ('' + e).toLowerCase()), (r = !0))
    }
}
function Ee(t, e, n) {
  var r = !1
  if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return ''
  if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
    return ''
  if ((n >>>= 0) <= (e >>>= 0)) return ''
  for (t || (t = 'utf8'); ; )
    switch (t) {
      case 'hex':
        return De(this, e, n)
      case 'utf8':
      case 'utf-8':
        return Ie(this, e, n)
      case 'ascii':
        return xe(this, e, n)
      case 'latin1':
      case 'binary':
        return Ne(this, e, n)
      case 'base64':
        return Be(this, e, n)
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ke(this, e, n)
      default:
        if (r) throw new TypeError('Unknown encoding: ' + t)
        ;((t = (t + '').toLowerCase()), (r = !0))
    }
}
function Oe(t, e, n) {
  var r = t[e]
  ;((t[e] = t[n]), (t[n] = r))
}
function je(t, e, n, r, o) {
  if (0 === t.length) return -1
  if (
    ('string' == typeof n
      ? ((r = n), (n = 0))
      : n > 2147483647
        ? (n = 2147483647)
        : n < -2147483648 && (n = -2147483648),
    (n = +n),
    isNaN(n) && (n = o ? 0 : t.length - 1),
    n < 0 && (n = t.length + n),
    n >= t.length)
  ) {
    if (o) return -1
    n = t.length - 1
  } else if (n < 0) {
    if (!o) return -1
    n = 0
  }
  if (('string' == typeof e && (e = ge.from(e, r)), ve(e)))
    return 0 === e.length ? -1 : Te(t, e, n, r, o)
  if ('number' == typeof e)
    return (
      (e &= 255),
      ge.TYPED_ARRAY_SUPPORT &&
      'function' == typeof Uint8Array.prototype.indexOf
        ? o
          ? Uint8Array.prototype.indexOf.call(t, e, n)
          : Uint8Array.prototype.lastIndexOf.call(t, e, n)
        : Te(t, [e], n, r, o)
    )
  throw new TypeError('val must be string, number or Buffer')
}
function Te(t, e, n, r, o) {
  var i,
    u = 1,
    s = t.length,
    f = e.length
  if (
    void 0 !== r &&
    ('ucs2' === (r = String(r).toLowerCase()) ||
      'ucs-2' === r ||
      'utf16le' === r ||
      'utf-16le' === r)
  ) {
    if (t.length < 2 || e.length < 2) return -1
    ;((u = 2), (s /= 2), (f /= 2), (n /= 2))
  }
  function c(t, e) {
    return 1 === u ? t[e] : t.readUInt16BE(e * u)
  }
  if (o) {
    var a = -1
    for (i = n; i < s; i++)
      if (c(t, i) === c(e, -1 === a ? 0 : i - a)) {
        if ((-1 === a && (a = i), i - a + 1 === f)) return a * u
      } else (-1 !== a && (i -= i - a), (a = -1))
  } else
    for (n + f > s && (n = s - f), i = n; i >= 0; i--) {
      for (var l = !0, h = 0; h < f; h++)
        if (c(t, i + h) !== c(e, h)) {
          l = !1
          break
        }
      if (l) return i
    }
  return -1
}
function Re(t, e, n, r) {
  n = Number(n) || 0
  var o = t.length - n
  r ? (r = Number(r)) > o && (r = o) : (r = o)
  var i = e.length
  if (i % 2 != 0) throw new TypeError('Invalid hex string')
  r > i / 2 && (r = i / 2)
  for (var u = 0; u < r; ++u) {
    var s = parseInt(e.substr(2 * u, 2), 16)
    if (isNaN(s)) return u
    t[n + u] = s
  }
  return u
}
function Se(t, e, n, r) {
  return Xe(Ke(e, t.length - n), t, n, r)
}
function Pe(t, e, n, r) {
  return Xe(
    (function (t) {
      for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n))
      return e
    })(e),
    t,
    n,
    r,
  )
}
function _e(t, e, n, r) {
  return Pe(t, e, n, r)
}
function Me(t, e, n, r) {
  return Xe(He(e), t, n, r)
}
function Ue(t, e, n, r) {
  return Xe(
    (function (t, e) {
      for (var n, r, o, i = [], u = 0; u < t.length && !((e -= 2) < 0); ++u)
        ((r = (n = t.charCodeAt(u)) >> 8), (o = n % 256), i.push(o), i.push(r))
      return i
    })(e, t.length - n),
    t,
    n,
    r,
  )
}
function Be(t, e, n) {
  return 0 === e && n === t.length ? se(t) : se(t.slice(e, n))
}
function Ie(t, e, n) {
  n = Math.min(t.length, n)
  for (var r = [], o = e; o < n; ) {
    var i,
      u,
      s,
      f,
      c = t[o],
      a = null,
      l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1
    if (o + l <= n)
      switch (l) {
        case 1:
          c < 128 && (a = c)
          break
        case 2:
          128 == (192 & (i = t[o + 1])) &&
            (f = ((31 & c) << 6) | (63 & i)) > 127 &&
            (a = f)
          break
        case 3:
          ;((i = t[o + 1]),
            (u = t[o + 2]),
            128 == (192 & i) &&
              128 == (192 & u) &&
              (f = ((15 & c) << 12) | ((63 & i) << 6) | (63 & u)) > 2047 &&
              (f < 55296 || f > 57343) &&
              (a = f))
          break
        case 4:
          ;((i = t[o + 1]),
            (u = t[o + 2]),
            (s = t[o + 3]),
            128 == (192 & i) &&
              128 == (192 & u) &&
              128 == (192 & s) &&
              (f =
                ((15 & c) << 18) |
                ((63 & i) << 12) |
                ((63 & u) << 6) |
                (63 & s)) > 65535 &&
              f < 1114112 &&
              (a = f))
      }
    ;(null === a
      ? ((a = 65533), (l = 1))
      : a > 65535 &&
        ((a -= 65536),
        r.push(((a >>> 10) & 1023) | 55296),
        (a = 56320 | (1023 & a))),
      r.push(a),
      (o += l))
  }
  return (function (t) {
    var e = t.length
    if (e <= Le) return String.fromCharCode.apply(String, t)
    var n = '',
      r = 0
    for (; r < e; )
      n += String.fromCharCode.apply(String, t.slice(r, (r += Le)))
    return n
  })(r)
}
;((ge.TYPED_ARRAY_SUPPORT =
  void 0 === te.TYPED_ARRAY_SUPPORT || te.TYPED_ARRAY_SUPPORT),
  he(),
  (ge.poolSize = 8192),
  (ge._augment = function (t) {
    return ((t.__proto__ = ge.prototype), t)
  }),
  (ge.from = function (t, e, n) {
    return ye(null, t, e, n)
  }),
  ge.TYPED_ARRAY_SUPPORT &&
    ((ge.prototype.__proto__ = Uint8Array.prototype),
    (ge.__proto__ = Uint8Array),
    'undefined' != typeof Symbol && Symbol.species && ge[Symbol.species]),
  (ge.alloc = function (t, e, n) {
    return (function (t, e, n, r) {
      return (
        we(e),
        e <= 0
          ? pe(t, e)
          : void 0 !== n
            ? 'string' == typeof r
              ? pe(t, e).fill(n, r)
              : pe(t, e).fill(n)
            : pe(t, e)
      )
    })(null, t, e, n)
  }),
  (ge.allocUnsafe = function (t) {
    return de(null, t)
  }),
  (ge.allocUnsafeSlow = function (t) {
    return de(null, t)
  }),
  (ge.isBuffer = function (t) {
    return (
      null != t &&
      (!!t._isBuffer ||
        Ze(t) ||
        (function (t) {
          return (
            'function' == typeof t.readFloatLE &&
            'function' == typeof t.slice &&
            Ze(t.slice(0, 0))
          )
        })(t))
    )
  }),
  (ge.compare = function (t, e) {
    if (!ve(t) || !ve(e)) throw new TypeError('Arguments must be Buffers')
    if (t === e) return 0
    for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
      if (t[o] !== e[o]) {
        ;((n = t[o]), (r = e[o]))
        break
      }
    return n < r ? -1 : r < n ? 1 : 0
  }),
  (ge.isEncoding = function (t) {
    switch (String(t).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return !0
      default:
        return !1
    }
  }),
  (ge.concat = function (t, e) {
    if (!le(t))
      throw new TypeError('"list" argument must be an Array of Buffers')
    if (0 === t.length) return ge.alloc(0)
    var n
    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length
    var r = ge.allocUnsafe(e),
      o = 0
    for (n = 0; n < t.length; ++n) {
      var i = t[n]
      if (!ve(i))
        throw new TypeError('"list" argument must be an Array of Buffers')
      ;(i.copy(r, o), (o += i.length))
    }
    return r
  }),
  (ge.byteLength = Ae),
  (ge.prototype._isBuffer = !0),
  (ge.prototype.swap16 = function () {
    var t = this.length
    if (t % 2 != 0)
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    for (var e = 0; e < t; e += 2) Oe(this, e, e + 1)
    return this
  }),
  (ge.prototype.swap32 = function () {
    var t = this.length
    if (t % 4 != 0)
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    for (var e = 0; e < t; e += 4) (Oe(this, e, e + 3), Oe(this, e + 1, e + 2))
    return this
  }),
  (ge.prototype.swap64 = function () {
    var t = this.length
    if (t % 8 != 0)
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    for (var e = 0; e < t; e += 8)
      (Oe(this, e, e + 7),
        Oe(this, e + 1, e + 6),
        Oe(this, e + 2, e + 5),
        Oe(this, e + 3, e + 4))
    return this
  }),
  (ge.prototype.toString = function () {
    var t = 0 | this.length
    return 0 === t
      ? ''
      : 0 === arguments.length
        ? Ie(this, 0, t)
        : Ee.apply(this, arguments)
  }),
  (ge.prototype.equals = function (t) {
    if (!ve(t)) throw new TypeError('Argument must be a Buffer')
    return this === t || 0 === ge.compare(this, t)
  }),
  (ge.prototype.inspect = function () {
    var t = ''
    return (
      this.length > 0 &&
        ((t = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
        this.length > 50 && (t += ' ... ')),
      '<Buffer ' + t + '>'
    )
  }),
  (ge.prototype.compare = function (t, e, n, r, o) {
    if (!ve(t)) throw new TypeError('Argument must be a Buffer')
    if (
      (void 0 === e && (e = 0),
      void 0 === n && (n = t ? t.length : 0),
      void 0 === r && (r = 0),
      void 0 === o && (o = this.length),
      e < 0 || n > t.length || r < 0 || o > this.length)
    )
      throw new RangeError('out of range index')
    if (r >= o && e >= n) return 0
    if (r >= o) return -1
    if (e >= n) return 1
    if (this === t) return 0
    for (
      var i = (o >>>= 0) - (r >>>= 0),
        u = (n >>>= 0) - (e >>>= 0),
        s = Math.min(i, u),
        f = this.slice(r, o),
        c = t.slice(e, n),
        a = 0;
      a < s;
      ++a
    )
      if (f[a] !== c[a]) {
        ;((i = f[a]), (u = c[a]))
        break
      }
    return i < u ? -1 : u < i ? 1 : 0
  }),
  (ge.prototype.includes = function (t, e, n) {
    return -1 !== this.indexOf(t, e, n)
  }),
  (ge.prototype.indexOf = function (t, e, n) {
    return je(this, t, e, n, !0)
  }),
  (ge.prototype.lastIndexOf = function (t, e, n) {
    return je(this, t, e, n, !1)
  }),
  (ge.prototype.write = function (t, e, n, r) {
    if (void 0 === e) ((r = 'utf8'), (n = this.length), (e = 0))
    else if (void 0 === n && 'string' == typeof e)
      ((r = e), (n = this.length), (e = 0))
    else {
      if (!isFinite(e))
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported',
        )
      ;((e |= 0),
        isFinite(n)
          ? ((n |= 0), void 0 === r && (r = 'utf8'))
          : ((r = n), (n = void 0)))
    }
    var o = this.length - e
    if (
      ((void 0 === n || n > o) && (n = o),
      (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
    )
      throw new RangeError('Attempt to write outside buffer bounds')
    r || (r = 'utf8')
    for (var i = !1; ; )
      switch (r) {
        case 'hex':
          return Re(this, t, e, n)
        case 'utf8':
        case 'utf-8':
          return Se(this, t, e, n)
        case 'ascii':
          return Pe(this, t, e, n)
        case 'latin1':
        case 'binary':
          return _e(this, t, e, n)
        case 'base64':
          return Me(this, t, e, n)
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return Ue(this, t, e, n)
        default:
          if (i) throw new TypeError('Unknown encoding: ' + r)
          ;((r = ('' + r).toLowerCase()), (i = !0))
      }
  }),
  (ge.prototype.toJSON = function () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0),
    }
  }))
var Le = 4096
function xe(t, e, n) {
  var r = ''
  n = Math.min(t.length, n)
  for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o])
  return r
}
function Ne(t, e, n) {
  var r = ''
  n = Math.min(t.length, n)
  for (var o = e; o < n; ++o) r += String.fromCharCode(t[o])
  return r
}
function De(t, e, n) {
  var r = t.length
  ;((!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r))
  for (var o = '', i = e; i < n; ++i) o += We(t[i])
  return o
}
function ke(t, e, n) {
  for (var r = t.slice(e, n), o = '', i = 0; i < r.length; i += 2)
    o += String.fromCharCode(r[i] + 256 * r[i + 1])
  return o
}
function Ce(t, e, n) {
  if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
  if (t + e > n) throw new RangeError('Trying to access beyond buffer length')
}
function Ye(t, e, n, r, o, i) {
  if (!ve(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (e > o || e < i) throw new RangeError('"value" argument is out of bounds')
  if (n + r > t.length) throw new RangeError('Index out of range')
}
function ze(t, e, n, r) {
  e < 0 && (e = 65535 + e + 1)
  for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o)
    t[n + o] = (e & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o))
}
function Fe(t, e, n, r) {
  e < 0 && (e = 4294967295 + e + 1)
  for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o)
    t[n + o] = (e >>> (8 * (r ? o : 3 - o))) & 255
}
function Ve(t, e, n, r, o, i) {
  if (n + r > t.length) throw new RangeError('Index out of range')
  if (n < 0) throw new RangeError('Index out of range')
}
function qe(t, e, n, r, o) {
  return (o || Ve(t, 0, n, 4), ce(t, e, n, r, 23, 4), n + 4)
}
function $e(t, e, n, r, o) {
  return (o || Ve(t, 0, n, 8), ce(t, e, n, r, 52, 8), n + 8)
}
;((ge.prototype.slice = function (t, e) {
  var n,
    r = this.length
  if (
    ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
    (e = void 0 === e ? r : ~~e) < 0
      ? (e += r) < 0 && (e = 0)
      : e > r && (e = r),
    e < t && (e = t),
    ge.TYPED_ARRAY_SUPPORT)
  )
    (n = this.subarray(t, e)).__proto__ = ge.prototype
  else {
    var o = e - t
    n = new ge(o, void 0)
    for (var i = 0; i < o; ++i) n[i] = this[i + t]
  }
  return n
}),
  (ge.prototype.readUIntLE = function (t, e, n) {
    ;((t |= 0), (e |= 0), n || Ce(t, e, this.length))
    for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
      r += this[t + i] * o
    return r
  }),
  (ge.prototype.readUIntBE = function (t, e, n) {
    ;((t |= 0), (e |= 0), n || Ce(t, e, this.length))
    for (var r = this[t + --e], o = 1; e > 0 && (o *= 256); )
      r += this[t + --e] * o
    return r
  }),
  (ge.prototype.readUInt8 = function (t, e) {
    return (e || Ce(t, 1, this.length), this[t])
  }),
  (ge.prototype.readUInt16LE = function (t, e) {
    return (e || Ce(t, 2, this.length), this[t] | (this[t + 1] << 8))
  }),
  (ge.prototype.readUInt16BE = function (t, e) {
    return (e || Ce(t, 2, this.length), (this[t] << 8) | this[t + 1])
  }),
  (ge.prototype.readUInt32LE = function (t, e) {
    return (
      e || Ce(t, 4, this.length),
      (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
        16777216 * this[t + 3]
    )
  }),
  (ge.prototype.readUInt32BE = function (t, e) {
    return (
      e || Ce(t, 4, this.length),
      16777216 * this[t] +
        ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
    )
  }),
  (ge.prototype.readIntLE = function (t, e, n) {
    ;((t |= 0), (e |= 0), n || Ce(t, e, this.length))
    for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
      r += this[t + i] * o
    return (r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r)
  }),
  (ge.prototype.readIntBE = function (t, e, n) {
    ;((t |= 0), (e |= 0), n || Ce(t, e, this.length))
    for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256); )
      i += this[t + --r] * o
    return (i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i)
  }),
  (ge.prototype.readInt8 = function (t, e) {
    return (
      e || Ce(t, 1, this.length),
      128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    )
  }),
  (ge.prototype.readInt16LE = function (t, e) {
    e || Ce(t, 2, this.length)
    var n = this[t] | (this[t + 1] << 8)
    return 32768 & n ? 4294901760 | n : n
  }),
  (ge.prototype.readInt16BE = function (t, e) {
    e || Ce(t, 2, this.length)
    var n = this[t + 1] | (this[t] << 8)
    return 32768 & n ? 4294901760 | n : n
  }),
  (ge.prototype.readInt32LE = function (t, e) {
    return (
      e || Ce(t, 4, this.length),
      this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
    )
  }),
  (ge.prototype.readInt32BE = function (t, e) {
    return (
      e || Ce(t, 4, this.length),
      (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
    )
  }),
  (ge.prototype.readFloatLE = function (t, e) {
    return (e || Ce(t, 4, this.length), fe(this, t, !0, 23, 4))
  }),
  (ge.prototype.readFloatBE = function (t, e) {
    return (e || Ce(t, 4, this.length), fe(this, t, !1, 23, 4))
  }),
  (ge.prototype.readDoubleLE = function (t, e) {
    return (e || Ce(t, 8, this.length), fe(this, t, !0, 52, 8))
  }),
  (ge.prototype.readDoubleBE = function (t, e) {
    return (e || Ce(t, 8, this.length), fe(this, t, !1, 52, 8))
  }),
  (ge.prototype.writeUIntLE = function (t, e, n, r) {
    ;((t = +t), (e |= 0), (n |= 0), r) ||
      Ye(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
    var o = 1,
      i = 0
    for (this[e] = 255 & t; ++i < n && (o *= 256); ) this[e + i] = (t / o) & 255
    return e + n
  }),
  (ge.prototype.writeUIntBE = function (t, e, n, r) {
    ;((t = +t), (e |= 0), (n |= 0), r) ||
      Ye(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
    var o = n - 1,
      i = 1
    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
      this[e + o] = (t / i) & 255
    return e + n
  }),
  (ge.prototype.writeUInt8 = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 1, 255, 0),
      ge.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
      (this[e] = 255 & t),
      e + 1
    )
  }),
  (ge.prototype.writeUInt16LE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 2, 65535, 0),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
        : ze(this, t, e, !0),
      e + 2
    )
  }),
  (ge.prototype.writeUInt16BE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 2, 65535, 0),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
        : ze(this, t, e, !1),
      e + 2
    )
  }),
  (ge.prototype.writeUInt32LE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 4, 4294967295, 0),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e + 3] = t >>> 24),
          (this[e + 2] = t >>> 16),
          (this[e + 1] = t >>> 8),
          (this[e] = 255 & t))
        : Fe(this, t, e, !0),
      e + 4
    )
  }),
  (ge.prototype.writeUInt32BE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 4, 4294967295, 0),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = t >>> 24),
          (this[e + 1] = t >>> 16),
          (this[e + 2] = t >>> 8),
          (this[e + 3] = 255 & t))
        : Fe(this, t, e, !1),
      e + 4
    )
  }),
  (ge.prototype.writeIntLE = function (t, e, n, r) {
    if (((t = +t), (e |= 0), !r)) {
      var o = Math.pow(2, 8 * n - 1)
      Ye(this, t, e, n, o - 1, -o)
    }
    var i = 0,
      u = 1,
      s = 0
    for (this[e] = 255 & t; ++i < n && (u *= 256); )
      (t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
        (this[e + i] = (((t / u) | 0) - s) & 255))
    return e + n
  }),
  (ge.prototype.writeIntBE = function (t, e, n, r) {
    if (((t = +t), (e |= 0), !r)) {
      var o = Math.pow(2, 8 * n - 1)
      Ye(this, t, e, n, o - 1, -o)
    }
    var i = n - 1,
      u = 1,
      s = 0
    for (this[e + i] = 255 & t; --i >= 0 && (u *= 256); )
      (t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
        (this[e + i] = (((t / u) | 0) - s) & 255))
    return e + n
  }),
  (ge.prototype.writeInt8 = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 1, 127, -128),
      ge.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
      t < 0 && (t = 255 + t + 1),
      (this[e] = 255 & t),
      e + 1
    )
  }),
  (ge.prototype.writeInt16LE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 2, 32767, -32768),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
        : ze(this, t, e, !0),
      e + 2
    )
  }),
  (ge.prototype.writeInt16BE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 2, 32767, -32768),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
        : ze(this, t, e, !1),
      e + 2
    )
  }),
  (ge.prototype.writeInt32LE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 4, 2147483647, -2147483648),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = 255 & t),
          (this[e + 1] = t >>> 8),
          (this[e + 2] = t >>> 16),
          (this[e + 3] = t >>> 24))
        : Fe(this, t, e, !0),
      e + 4
    )
  }),
  (ge.prototype.writeInt32BE = function (t, e, n) {
    return (
      (t = +t),
      (e |= 0),
      n || Ye(this, t, e, 4, 2147483647, -2147483648),
      t < 0 && (t = 4294967295 + t + 1),
      ge.TYPED_ARRAY_SUPPORT
        ? ((this[e] = t >>> 24),
          (this[e + 1] = t >>> 16),
          (this[e + 2] = t >>> 8),
          (this[e + 3] = 255 & t))
        : Fe(this, t, e, !1),
      e + 4
    )
  }),
  (ge.prototype.writeFloatLE = function (t, e, n) {
    return qe(this, t, e, !0, n)
  }),
  (ge.prototype.writeFloatBE = function (t, e, n) {
    return qe(this, t, e, !1, n)
  }),
  (ge.prototype.writeDoubleLE = function (t, e, n) {
    return $e(this, t, e, !0, n)
  }),
  (ge.prototype.writeDoubleBE = function (t, e, n) {
    return $e(this, t, e, !1, n)
  }),
  (ge.prototype.copy = function (t, e, n, r) {
    if (
      (n || (n = 0),
      r || 0 === r || (r = this.length),
      e >= t.length && (e = t.length),
      e || (e = 0),
      r > 0 && r < n && (r = n),
      r === n)
    )
      return 0
    if (0 === t.length || 0 === this.length) return 0
    if (e < 0) throw new RangeError('targetStart out of bounds')
    if (n < 0 || n >= this.length)
      throw new RangeError('sourceStart out of bounds')
    if (r < 0) throw new RangeError('sourceEnd out of bounds')
    ;(r > this.length && (r = this.length),
      t.length - e < r - n && (r = t.length - e + n))
    var o,
      i = r - n
    if (this === t && n < e && e < r)
      for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n]
    else if (i < 1e3 || !ge.TYPED_ARRAY_SUPPORT)
      for (o = 0; o < i; ++o) t[o + e] = this[o + n]
    else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e)
    return i
  }),
  (ge.prototype.fill = function (t, e, n, r) {
    if ('string' == typeof t) {
      if (
        ('string' == typeof e
          ? ((r = e), (e = 0), (n = this.length))
          : 'string' == typeof n && ((r = n), (n = this.length)),
        1 === t.length)
      ) {
        var o = t.charCodeAt(0)
        o < 256 && (t = o)
      }
      if (void 0 !== r && 'string' != typeof r)
        throw new TypeError('encoding must be a string')
      if ('string' == typeof r && !ge.isEncoding(r))
        throw new TypeError('Unknown encoding: ' + r)
    } else 'number' == typeof t && (t &= 255)
    if (e < 0 || this.length < e || this.length < n)
      throw new RangeError('Out of range index')
    if (n <= e) return this
    var i
    if (
      ((e >>>= 0),
      (n = void 0 === n ? this.length : n >>> 0),
      t || (t = 0),
      'number' == typeof t)
    )
      for (i = e; i < n; ++i) this[i] = t
    else {
      var u = ve(t) ? t : Ke(new ge(t, r).toString()),
        s = u.length
      for (i = 0; i < n - e; ++i) this[i + e] = u[i % s]
    }
    return this
  }))
var Je = /[^+\/0-9A-Za-z-_]/g
function We(t) {
  return t < 16 ? '0' + t.toString(16) : t.toString(16)
}
function Ke(t, e) {
  var n
  e = e || 1 / 0
  for (var r = t.length, o = null, i = [], u = 0; u < r; ++u) {
    if ((n = t.charCodeAt(u)) > 55295 && n < 57344) {
      if (!o) {
        if (n > 56319) {
          ;(e -= 3) > -1 && i.push(239, 191, 189)
          continue
        }
        if (u + 1 === r) {
          ;(e -= 3) > -1 && i.push(239, 191, 189)
          continue
        }
        o = n
        continue
      }
      if (n < 56320) {
        ;((e -= 3) > -1 && i.push(239, 191, 189), (o = n))
        continue
      }
      n = 65536 + (((o - 55296) << 10) | (n - 56320))
    } else o && (e -= 3) > -1 && i.push(239, 191, 189)
    if (((o = null), n < 128)) {
      if ((e -= 1) < 0) break
      i.push(n)
    } else if (n < 2048) {
      if ((e -= 2) < 0) break
      i.push((n >> 6) | 192, (63 & n) | 128)
    } else if (n < 65536) {
      if ((e -= 3) < 0) break
      i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128)
    } else {
      if (!(n < 1114112)) throw new Error('Invalid code point')
      if ((e -= 4) < 0) break
      i.push(
        (n >> 18) | 240,
        ((n >> 12) & 63) | 128,
        ((n >> 6) & 63) | 128,
        (63 & n) | 128,
      )
    }
  }
  return i
}
function He(t) {
  return (function (t) {
    var e, n, r, o, i, u
    oe || ie()
    var s = t.length
    if (s % 4 > 0)
      throw new Error('Invalid string. Length must be a multiple of 4')
    ;((i = '=' === t[s - 2] ? 2 : '=' === t[s - 1] ? 1 : 0),
      (u = new re((3 * s) / 4 - i)),
      (r = i > 0 ? s - 4 : s))
    var f = 0
    for (e = 0, n = 0; e < r; e += 4, n += 3)
      ((o =
        (ne[t.charCodeAt(e)] << 18) |
        (ne[t.charCodeAt(e + 1)] << 12) |
        (ne[t.charCodeAt(e + 2)] << 6) |
        ne[t.charCodeAt(e + 3)]),
        (u[f++] = (o >> 16) & 255),
        (u[f++] = (o >> 8) & 255),
        (u[f++] = 255 & o))
    return (
      2 === i
        ? ((o = (ne[t.charCodeAt(e)] << 2) | (ne[t.charCodeAt(e + 1)] >> 4)),
          (u[f++] = 255 & o))
        : 1 === i &&
          ((o =
            (ne[t.charCodeAt(e)] << 10) |
            (ne[t.charCodeAt(e + 1)] << 4) |
            (ne[t.charCodeAt(e + 2)] >> 2)),
          (u[f++] = (o >> 8) & 255),
          (u[f++] = 255 & o)),
      u
    )
  })(
    (function (t) {
      if (
        (t = (function (t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
        })(t).replace(Je, '')).length < 2
      )
        return ''
      for (; t.length % 4 != 0; ) t += '='
      return t
    })(t),
  )
}
function Xe(t, e, n, r) {
  for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o)
    e[o + n] = t[o]
  return o
}
function Ze(t) {
  return (
    !!t.constructor &&
    'function' == typeof t.constructor.isBuffer &&
    t.constructor.isBuffer(t)
  )
}
function Ge(t) {
  return Object.getOwnPropertySymbols(t).filter((e) =>
    Object.prototype.propertyIsEnumerable.call(t, e),
  )
}
function Qe(t) {
  return null == t
    ? void 0 === t
      ? '[object Undefined]'
      : '[object Null]'
    : Object.prototype.toString.call(t)
}
const tn = '[object RegExp]',
  en = '[object String]',
  nn = '[object Number]',
  rn = '[object Boolean]',
  on = '[object Arguments]',
  un = '[object Symbol]',
  sn = '[object Date]',
  fn = '[object Map]',
  cn = '[object Set]',
  an = '[object Array]',
  ln = '[object ArrayBuffer]',
  hn = '[object Object]',
  pn = '[object DataView]',
  gn = '[object Uint8Array]',
  yn = '[object Uint8ClampedArray]',
  wn = '[object Uint16Array]',
  dn = '[object Uint32Array]',
  bn = '[object Int8Array]',
  mn = '[object Int16Array]',
  vn = '[object Int32Array]',
  An = '[object Float32Array]',
  En = '[object Float64Array]'
function On(t, e) {
  return jn(t, void 0, t, new Map(), e)
}
function jn(t, e, n, r = new Map(), o = void 0) {
  const i = o?.(t, e, n, r)
  if (void 0 !== i) return i
  if (Zt(t)) return t
  if (r.has(t)) return r.get(t)
  if (Array.isArray(t)) {
    const e = new Array(t.length)
    r.set(t, e)
    for (let i = 0; i < t.length; i++) e[i] = jn(t[i], i, n, r, o)
    return (
      Object.hasOwn(t, 'index') && (e.index = t.index),
      Object.hasOwn(t, 'input') && (e.input = t.input),
      e
    )
  }
  if (t instanceof Date) return new Date(t.getTime())
  if (t instanceof RegExp) {
    const e = new RegExp(t.source, t.flags)
    return ((e.lastIndex = t.lastIndex), e)
  }
  if (t instanceof Map) {
    const e = new Map()
    r.set(t, e)
    for (const [i, u] of t) e.set(i, jn(u, i, n, r, o))
    return e
  }
  if (t instanceof Set) {
    const e = new Set()
    r.set(t, e)
    for (const i of t) e.add(jn(i, void 0, n, r, o))
    return e
  }
  if (void 0 !== ge && ge.isBuffer(t)) return t.subarray()
  if (Gt(t)) {
    const e = new (Object.getPrototypeOf(t).constructor)(t.length)
    r.set(t, e)
    for (let i = 0; i < t.length; i++) e[i] = jn(t[i], i, n, r, o)
    return e
  }
  if (
    t instanceof ArrayBuffer ||
    ('undefined' != typeof SharedArrayBuffer && t instanceof SharedArrayBuffer)
  )
    return t.slice(0)
  if (t instanceof DataView) {
    const e = new DataView(t.buffer.slice(0), t.byteOffset, t.byteLength)
    return (r.set(t, e), Tn(e, t, n, r, o), e)
  }
  if ('undefined' != typeof File && t instanceof File) {
    const e = new File([t], t.name, { type: t.type })
    return (r.set(t, e), Tn(e, t, n, r, o), e)
  }
  if (t instanceof Blob) {
    const e = new Blob([t], { type: t.type })
    return (r.set(t, e), Tn(e, t, n, r, o), e)
  }
  if (t instanceof Error) {
    const e = new t.constructor()
    return (
      r.set(t, e),
      (e.message = t.message),
      (e.name = t.name),
      (e.stack = t.stack),
      (e.cause = t.cause),
      Tn(e, t, n, r, o),
      e
    )
  }
  if (
    'object' == typeof t &&
    (function (t) {
      switch (Qe(t)) {
        case on:
        case an:
        case ln:
        case pn:
        case rn:
        case sn:
        case An:
        case En:
        case bn:
        case mn:
        case vn:
        case fn:
        case nn:
        case hn:
        case tn:
        case cn:
        case en:
        case un:
        case gn:
        case yn:
        case wn:
        case dn:
          return !0
        default:
          return !1
      }
    })(t)
  ) {
    const e = Object.create(Object.getPrototypeOf(t))
    return (r.set(t, e), Tn(e, t, n, r, o), e)
  }
  return t
}
function Tn(t, e, n = t, r, o) {
  const i = [...Object.keys(e), ...Ge(e)]
  for (let u = 0; u < i.length; u++) {
    const s = i[u],
      f = Object.getOwnPropertyDescriptor(t, s)
    ;(null == f || f.writable) && (t[s] = jn(e[s], s, n, r, o))
  }
}
function Rn(t) {
  return jn(t, void 0, t, new Map(), void 0)
}
function Sn(t, e) {
  return Object.keys(t).find((n) => e(t[n], n, t))
}
function Pn(t) {
  if (!t || 'object' != typeof t) return !1
  const e = Object.getPrototypeOf(t)
  return (
    !(
      null !== e &&
      e !== Object.prototype &&
      null !== Object.getPrototypeOf(e)
    ) && '[object Object]' === Object.prototype.toString.call(t)
  )
}
function _n(t, { delimiter: e = '.' } = {}) {
  return Mn(t, '', e)
}
function Mn(t, e = '', n = '.') {
  const r = {},
    o = Object.keys(t)
  for (let i = 0; i < o.length; i++) {
    const u = o[i],
      s = t[u],
      f = e ? `${e}${n}${u}` : u
    Pn(s) && Object.keys(s).length > 0
      ? Object.assign(r, Mn(s, f, n))
      : Array.isArray(s)
        ? Object.assign(r, Mn(s, f, n))
        : (r[f] = s)
  }
  return r
}
function Un(t) {
  const e = {},
    n = Object.keys(t)
  for (let r = 0; r < n.length; r++) {
    const o = n[r]
    e[t[o]] = o
  }
  return e
}
function Bn(t, e) {
  const n = {},
    r = Object.keys(t)
  for (let o = 0; o < r.length; o++) {
    const i = r[o],
      u = t[i]
    n[e(u, i, t)] = u
  }
  return n
}
function In(t, e) {
  const n = {},
    r = Object.keys(t)
  for (let o = 0; o < r.length; o++) {
    const i = r[o],
      u = t[i]
    n[i] = e(u, i, t)
  }
  return n
}
function Ln(t) {
  return '__proto__' === t
}
function xn(t, e) {
  const n = Object.keys(e)
  for (let r = 0; r < n.length; r++) {
    const o = n[r]
    if (Ln(o)) continue
    const i = e[o],
      u = t[o]
    Array.isArray(i)
      ? Array.isArray(u)
        ? (t[o] = xn(u, i))
        : (t[o] = xn([], i))
      : Pn(i)
        ? Pn(u)
          ? (t[o] = xn(u, i))
          : (t[o] = xn({}, i))
        : (void 0 !== u && void 0 === i) || (t[o] = i)
  }
  return t
}
function Nn(t) {
  return 'object' == typeof t && null !== t
}
function Dn(t, e, n) {
  const r = Object.keys(e)
  for (let o = 0; o < r.length; o++) {
    const i = r[o]
    if (Ln(i)) continue
    const u = e[i],
      s = t[i],
      f = n(s, u, i, t, e)
    void 0 !== f
      ? (t[i] = f)
      : Array.isArray(u)
        ? (t[i] = Dn(s ?? [], u, n))
        : Nn(s) && Nn(u)
          ? (t[i] = Dn(s ?? {}, u, n))
          : (void 0 !== s && void 0 === u) || (t[i] = u)
  }
  return t
}
function kn(t, e) {
  const n = { ...t }
  for (let t = 0; t < e.length; t++) {
    delete n[e[t]]
  }
  return n
}
function Cn(t, e) {
  const n = {},
    r = Object.keys(t)
  for (let o = 0; o < r.length; o++) {
    const i = r[o],
      u = t[i]
    e(u, i) || (n[i] = u)
  }
  return n
}
function Yn(t, e) {
  const n = {}
  for (let r = 0; r < e.length; r++) {
    const o = e[r]
    Object.hasOwn(t, o) && (n[o] = t[o])
  }
  return n
}
function zn(t, e) {
  const n = {},
    r = Object.keys(t)
  for (let o = 0; o < r.length; o++) {
    const i = r[o],
      u = t[i]
    e(u, i) && (n[i] = u)
  }
  return n
}
function Fn(t) {
  return Array.isArray(t)
}
function Vn(t) {
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
}
const qn =
  /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu
function $n(t) {
  return Array.from(t.match(qn) ?? [])
}
function Jn(t) {
  const e = $n(t)
  if (0 === e.length) return ''
  const [n, ...r] = e
  return `${n.toLowerCase()}${r.map((t) => Vn(t)).join('')}`
}
function Wn(t) {
  if (Fn(t)) return t.map((t) => Wn(t))
  if (Pn(t)) {
    const e = {},
      n = Object.keys(t)
    for (let r = 0; r < n.length; r++) {
      const o = n[r],
        i = Jn(o),
        u = Wn(t[o])
      e[i] = u
    }
    return e
  }
  return t
}
function Kn(t, e) {
  return xn(Rn(t), e)
}
function Hn(t) {
  return $n(t)
    .map((t) => t.toLowerCase())
    .join('_')
}
function Xn(t) {
  if (Fn(t)) return t.map((t) => Xn(t))
  if (
    (function (t) {
      if ('object' != typeof t) return !1
      if (null == t) return !1
      if (null === Object.getPrototypeOf(t)) return !0
      if ('[object Object]' !== Object.prototype.toString.call(t)) {
        const e = t[Symbol.toStringTag]
        return (
          null != e &&
          !!Object.getOwnPropertyDescriptor(t, Symbol.toStringTag)?.writable &&
          t.toString() === `[object ${e}]`
        )
      }
      let e = t
      for (; null !== Object.getPrototypeOf(e); ) e = Object.getPrototypeOf(e)
      return Object.getPrototypeOf(t) === e
    })(t)
  ) {
    const e = {},
      n = Object.keys(t)
    for (let r = 0; r < n.length; r++) {
      const o = n[r],
        i = Hn(o),
        u = Xn(t[o])
      e[i] = u
    }
    return e
  }
  return t
}
function Zn(t) {
  return t instanceof ArrayBuffer
}
function Gn(t) {
  return 'undefined' != typeof Blob && t instanceof Blob
}
function Qn(t) {
  return 'boolean' == typeof t
}
function tr() {
  return 'undefined' != typeof window && null != window?.document
}
function er(t) {
  return void 0 !== ge && ge.isBuffer(t)
}
function nr(t) {
  return t instanceof Date
}
function rr(t, e, n) {
  return or(t, e, void 0, void 0, void 0, void 0, n)
}
function or(t, e, n, r, o, i, u) {
  const s = u(t, e, n, r, o, i)
  if (void 0 !== s) return s
  if (typeof t == typeof e)
    switch (typeof t) {
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'symbol':
      case 'undefined':
      case 'function':
        return t === e
      case 'number':
        return t === e || Object.is(t, e)
      case 'object':
        return ir(t, e, i, u)
    }
  return ir(t, e, i, u)
}
function ir(t, e, n, r) {
  if (Object.is(t, e)) return !0
  let o = Qe(t),
    i = Qe(e)
  if ((o === on && (o = hn), i === on && (i = hn), o !== i)) return !1
  switch (o) {
    case en:
      return t.toString() === e.toString()
    case nn: {
      const n = t.valueOf(),
        r = e.valueOf()
      return (u = n) === (s = r) || (Number.isNaN(u) && Number.isNaN(s))
    }
    case rn:
    case sn:
    case un:
      return Object.is(t.valueOf(), e.valueOf())
    case tn:
      return t.source === e.source && t.flags === e.flags
    case '[object Function]':
      return t === e
  }
  var u, s
  const f = (n = n ?? new Map()).get(t),
    c = n.get(e)
  if (null != f && null != c) return f === e
  ;(n.set(t, e), n.set(e, t))
  try {
    switch (o) {
      case fn:
        if (t.size !== e.size) return !1
        for (const [o, i] of t.entries())
          if (!e.has(o) || !or(i, e.get(o), o, t, e, n, r)) return !1
        return !0
      case cn: {
        if (t.size !== e.size) return !1
        const o = Array.from(t.values()),
          i = Array.from(e.values())
        for (let u = 0; u < o.length; u++) {
          const s = o[u],
            f = i.findIndex((o) => or(s, o, void 0, t, e, n, r))
          if (-1 === f) return !1
          i.splice(f, 1)
        }
        return !0
      }
      case an:
      case gn:
      case yn:
      case wn:
      case dn:
      case '[object BigUint64Array]':
      case bn:
      case mn:
      case vn:
      case '[object BigInt64Array]':
      case An:
      case En:
        if (void 0 !== ge && ge.isBuffer(t) !== ge.isBuffer(e)) return !1
        if (t.length !== e.length) return !1
        for (let o = 0; o < t.length; o++)
          if (!or(t[o], e[o], o, t, e, n, r)) return !1
        return !0
      case ln:
        return (
          t.byteLength === e.byteLength &&
          ir(new Uint8Array(t), new Uint8Array(e), n, r)
        )
      case pn:
        return (
          t.byteLength === e.byteLength &&
          t.byteOffset === e.byteOffset &&
          ir(new Uint8Array(t), new Uint8Array(e), n, r)
        )
      case '[object Error]':
        return t.name === e.name && t.message === e.message
      case hn: {
        if (!(ir(t.constructor, e.constructor, n, r) || (Pn(t) && Pn(e))))
          return !1
        const o = [...Object.keys(t), ...Ge(t)],
          i = [...Object.keys(e), ...Ge(e)]
        if (o.length !== i.length) return !1
        for (let i = 0; i < o.length; i++) {
          const u = o[i],
            s = t[u]
          if (!Object.hasOwn(e, u)) return !1
          if (!or(s, e[u], u, t, e, n, r)) return !1
        }
        return !0
      }
      default:
        return !1
    }
  } finally {
    ;(n.delete(t), n.delete(e))
  }
}
function ur(t, e) {
  return rr(t, e, St)
}
function sr(t) {
  return t instanceof Error
}
function fr(t) {
  return 'undefined' != typeof File && Gn(t) && t instanceof File
}
function cr(t) {
  return 'function' == typeof t
}
function ar(t) {
  if ('string' != typeof t) return !1
  try {
    return (JSON.parse(t), !0)
  } catch {
    return !1
  }
}
function lr(t) {
  switch (typeof t) {
    case 'object':
      return null === t || hr(t) || pr(t)
    case 'string':
    case 'number':
    case 'boolean':
      return !0
    default:
      return !1
  }
}
function hr(t) {
  return !!Array.isArray(t) && t.every((t) => lr(t))
}
function pr(t) {
  if (!Pn(t)) return !1
  const e = Reflect.ownKeys(t)
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      o = t[r]
    if ('string' != typeof r) return !1
    if (!lr(o)) return !1
  }
  return !0
}
function gr(t) {
  return Number.isSafeInteger(t) && t >= 0
}
function yr(t) {
  return t instanceof Map
}
function wr(t) {
  return null == t
}
function dr() {
  throw new Error('setTimeout has not been defined')
}
function br() {
  throw new Error('clearTimeout has not been defined')
}
var mr = dr,
  vr = br
function Ar(t) {
  if (mr === setTimeout) return setTimeout(t, 0)
  if ((mr === dr || !mr) && setTimeout)
    return ((mr = setTimeout), setTimeout(t, 0))
  try {
    return mr(t, 0)
  } catch (e) {
    try {
      return mr.call(null, t, 0)
    } catch (e) {
      return mr.call(this, t, 0)
    }
  }
}
;('function' == typeof te.setTimeout && (mr = setTimeout),
  'function' == typeof te.clearTimeout && (vr = clearTimeout))
var Er,
  Or = [],
  jr = !1,
  Tr = -1
function Rr() {
  jr &&
    Er &&
    ((jr = !1), Er.length ? (Or = Er.concat(Or)) : (Tr = -1), Or.length && Sr())
}
function Sr() {
  if (!jr) {
    var t = Ar(Rr)
    jr = !0
    for (var e = Or.length; e; ) {
      for (Er = Or, Or = []; ++Tr < e; ) Er && Er[Tr].run()
      ;((Tr = -1), (e = Or.length))
    }
    ;((Er = null),
      (jr = !1),
      (function (t) {
        if (vr === clearTimeout) return clearTimeout(t)
        if ((vr === br || !vr) && clearTimeout)
          return ((vr = clearTimeout), clearTimeout(t))
        try {
          return vr(t)
        } catch (e) {
          try {
            return vr.call(null, t)
          } catch (e) {
            return vr.call(this, t)
          }
        }
      })(t))
  }
}
function Pr(t, e) {
  ;((this.fun = t), (this.array = e))
}
Pr.prototype.run = function () {
  this.fun.apply(null, this.array)
}
function _r() {}
var Mr = _r,
  Ur = _r,
  Br = _r,
  Ir = _r,
  Lr = _r,
  xr = _r,
  Nr = _r
var Dr = te.performance || {},
  kr =
    Dr.now ||
    Dr.mozNow ||
    Dr.msNow ||
    Dr.oNow ||
    Dr.webkitNow ||
    function () {
      return new Date().getTime()
    }
var Cr = new Date()
var Yr = {
  nextTick: function (t) {
    var e = new Array(arguments.length - 1)
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
    ;(Or.push(new Pr(t, e)), 1 !== Or.length || jr || Ar(Sr))
  },
  title: 'browser',
  browser: !0,
  env: {},
  argv: [],
  version: '',
  versions: {},
  on: Mr,
  addListener: Ur,
  once: Br,
  off: Ir,
  removeListener: Lr,
  removeAllListeners: xr,
  emit: Nr,
  binding: function (t) {
    throw new Error('process.binding is not supported')
  },
  cwd: function () {
    return '/'
  },
  chdir: function (t) {
    throw new Error('process.chdir is not supported')
  },
  umask: function () {
    return 0
  },
  hrtime: function (t) {
    var e = 0.001 * kr.call(Dr),
      n = Math.floor(e),
      r = Math.floor((e % 1) * 1e9)
    return (t && ((n -= t[0]), (r -= t[1]) < 0 && (n--, (r += 1e9))), [n, r])
  },
  platform: 'browser',
  release: {},
  config: {},
  uptime: function () {
    return (new Date() - Cr) / 1e3
  },
}
function zr() {
  return null != Yr?.versions?.node
}
function Fr(t) {
  return null != t
}
function Vr(t) {
  return null === t
}
function qr(t) {
  return t instanceof Promise
}
function $r(t) {
  return t instanceof RegExp
}
function Jr(t) {
  return t instanceof Set
}
function Wr(t) {
  return 'string' == typeof t
}
function Kr(t) {
  return 'symbol' == typeof t
}
function Hr(t) {
  return void 0 === t
}
function Xr(t) {
  return t instanceof WeakMap
}
function Zr(t) {
  return t instanceof WeakSet
}
class Gr {
  capacity
  available
  deferredTasks = []
  constructor(t) {
    ;((this.capacity = t), (this.available = t))
  }
  async acquire() {
    if (!(this.available > 0))
      return new Promise((t) => {
        this.deferredTasks.push(t)
      })
    this.available--
  }
  release() {
    const t = this.deferredTasks.shift()
    null == t ? this.available < this.capacity && this.available++ : t()
  }
}
class Qr {
  semaphore = new Gr(1)
  get isLocked() {
    return 0 === this.semaphore.available
  }
  async acquire() {
    return this.semaphore.acquire()
  }
  release() {
    this.semaphore.release()
  }
}
async function to(t) {
  throw (await Lt(t), new ht())
}
async function eo(t, e) {
  return Promise.race([t(), to(e)])
}
function no(t) {
  return $n(t)
    .map((t) => t.toUpperCase())
    .join('_')
}
const ro = new Map(
  Object.entries({
    Æ: 'Ae',
    Ð: 'D',
    Ø: 'O',
    Þ: 'Th',
    ß: 'ss',
    æ: 'ae',
    ð: 'd',
    ø: 'o',
    þ: 'th',
    Đ: 'D',
    đ: 'd',
    Ħ: 'H',
    ħ: 'h',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    ĸ: 'k',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'L',
    ł: 'l',
    ŉ: "'n",
    Ŋ: 'N',
    ŋ: 'n',
    Œ: 'Oe',
    œ: 'oe',
    Ŧ: 'T',
    ŧ: 't',
    ſ: 's',
  }),
)
function oo(t) {
  t = t.normalize('NFD')
  let e = ''
  for (let n = 0; n < t.length; n++) {
    const r = t[n]
    ;(r >= '̀' && r <= 'ͯ') || (r >= '︠' && r <= '︣') || (e += ro.get(r) ?? r)
  }
  return e
}
const io = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}
function uo(t) {
  return t.replace(/[&<>"']/g, (t) => io[t])
}
function so(t) {
  return t.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
}
function fo(t) {
  return $n(t)
    .map((t) => t.toLowerCase())
    .join('-')
}
function co(t) {
  return $n(t)
    .map((t) => t.toLowerCase())
    .join(' ')
}
function ao(t) {
  return t.substring(0, 1).toLowerCase() + t.substring(1)
}
function lo(t, e, n = ' ') {
  return t.padStart(Math.floor((e - t.length) / 2) + t.length, n).padEnd(e, n)
}
function ho(t) {
  return $n(t)
    .map((t) => Vn(t))
    .join('')
}
function po(t) {
  return [...t].reverse().join('')
}
function go(t) {
  const e = $n(t.trim())
  let n = ''
  for (let t = 0; t < e.length; t++) {
    const r = e[t]
    ;(n && (n += ' '), (n += r[0].toUpperCase() + r.slice(1).toLowerCase()))
  }
  return n
}
function yo(t, e) {
  if (void 0 === e) return t.trimEnd()
  let n = t.length
  switch (typeof e) {
    case 'string':
      if (1 !== e.length)
        throw new Error(
          "The 'chars' parameter should be a single character string.",
        )
      for (; n > 0 && t[n - 1] === e; ) n--
      break
    case 'object':
      for (; n > 0 && e.includes(t[n - 1]); ) n--
  }
  return t.substring(0, n)
}
function wo(t, e) {
  if (void 0 === e) return t.trimStart()
  let n = 0
  switch (typeof e) {
    case 'string':
      for (; n < t.length && t[n] === e; ) n++
      break
    case 'object':
      for (; n < t.length && e.includes(t[n]); ) n++
  }
  return t.substring(n)
}
function bo(t, e) {
  return void 0 === e ? t.trim() : wo(yo(t, e), e)
}
const mo = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
}
function vo(t) {
  return t.replace(/&(?:amp|lt|gt|quot|#(0+)?39);/g, (t) => mo[t] || "'")
}
function Ao(t) {
  const e = $n(t)
  let n = ''
  for (let t = 0; t < e.length; t++)
    ((n += e[t].toUpperCase()), t < e.length - 1 && (n += ' '))
  return n
}
function Eo(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1)
}
function Oo(t) {
  try {
    return [null, t()]
  } catch (t) {
    return [t, null]
  }
}
async function jo(t) {
  try {
    return [null, await t()]
  } catch (t) {
    return [t, null]
  }
}
function To(t, e) {
  if (!t) {
    if ('string' == typeof e) throw new Error(e)
    throw e
  }
}
export {
  lt as AbortError,
  Qr as Mutex,
  Gr as Semaphore,
  ht as TimeoutError,
  pt as after,
  gt as ary,
  To as assert,
  yt as asyncNoop,
  t as at,
  Oo as attempt,
  jo as attemptAsync,
  wt as before,
  Jn as camelCase,
  Vn as capitalize,
  e as chunk,
  Yt as clamp,
  Qt as clone,
  Rn as cloneDeep,
  On as cloneDeepWith,
  n as compact,
  no as constantCase,
  r as countBy,
  dt as curry,
  mt as curryRight,
  At as debounce,
  oo as deburr,
  Lt as delay,
  o as difference,
  i as differenceBy,
  u as differenceWith,
  s as drop,
  f as dropRight,
  c as dropRightWhile,
  a as dropWhile,
  uo as escape,
  so as escapeRegExp,
  l as fill,
  Sn as findKey,
  p as flatMap,
  y as flatMapDeep,
  h as flatten,
  g as flattenDeep,
  _n as flattenObject,
  Et as flow,
  Ot as flowRight,
  w as forEachRight,
  d as groupBy,
  b as head,
  jt as identity,
  zt as inRange,
  m as initial,
  v as intersection,
  A as intersectionBy,
  E as intersectionWith,
  To as invariant,
  Un as invert,
  Zn as isArrayBuffer,
  Gn as isBlob,
  Qn as isBoolean,
  tr as isBrowser,
  er as isBuffer,
  nr as isDate,
  ur as isEqual,
  rr as isEqualWith,
  sr as isError,
  fr as isFile,
  cr as isFunction,
  ar as isJSON,
  hr as isJSONArray,
  pr as isJSONObject,
  lr as isJSONValue,
  gr as isLength,
  yr as isMap,
  wr as isNil,
  zr as isNode,
  Fr as isNotNil,
  Vr as isNull,
  Pn as isPlainObject,
  Zt as isPrimitive,
  qr as isPromise,
  $r as isRegExp,
  Jr as isSet,
  Wr as isString,
  O as isSubset,
  j as isSubsetWith,
  Kr as isSymbol,
  Gt as isTypedArray,
  Hr as isUndefined,
  Xr as isWeakMap,
  Zr as isWeakSet,
  fo as kebabCase,
  T as keyBy,
  R as last,
  co as lowerCase,
  ao as lowerFirst,
  Bn as mapKeys,
  In as mapValues,
  S as maxBy,
  Vt as mean,
  qt as meanBy,
  $t as median,
  Jt as medianBy,
  Tt as memoize,
  xn as merge,
  Dn as mergeWith,
  P as minBy,
  Rt as negate,
  St as noop,
  kn as omit,
  Cn as omitBy,
  Pt as once,
  M as orderBy,
  lo as pad,
  _t as partial,
  Ut as partialRight,
  U as partition,
  ho as pascalCase,
  Yn as pick,
  zn as pickBy,
  B as pull,
  I as pullAt,
  N as random,
  D as randomInt,
  Wt as range,
  Kt as rangeRight,
  L as remove,
  It as rest,
  Nt as retry,
  po as reverseString,
  Ht as round,
  x as sample,
  k as sampleSize,
  C as shuffle,
  Hn as snakeCase,
  Y as sortBy,
  Dt as spread,
  go as startCase,
  Ft as sum,
  Xt as sumBy,
  z as tail,
  q as take,
  $ as takeRight,
  J as takeRightWhile,
  W as takeWhile,
  kt as throttle,
  to as timeout,
  Wn as toCamelCaseKeys,
  K as toFilled,
  Kn as toMerged,
  Xn as toSnakeCaseKeys,
  bo as trim,
  yo as trimEnd,
  wo as trimStart,
  Ct as unary,
  vo as unescape,
  X as union,
  G as unionBy,
  tt as unionWith,
  H as uniq,
  Z as uniqBy,
  Q as uniqWith,
  et as unzip,
  nt as unzipWith,
  Ao as upperCase,
  Eo as upperFirst,
  rt as windowed,
  eo as withTimeout,
  ot as without,
  $n as words,
  it as xor,
  ut as xorBy,
  st as xorWith,
  ft as zip,
  ct as zipObject,
  at as zipWith,
}
export default null
//# sourceMappingURL=/sm/1cf6e3c3c14b61a588d32aa0697c737847fc38973f23bae8c20a323a02b738c9.map
