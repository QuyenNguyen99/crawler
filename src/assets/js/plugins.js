! function(t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";

    function i(t, e, i) {
        e = e || rt;
        var n, o = e.createElement("script");
        if (o.text = t, i)
            for (n in wt) i[n] && (o[n] = i[n]);
        e.head.appendChild(o).parentNode.removeChild(o)
    }

    function n(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ht[pt.call(t)] || "object" : typeof t
    }

    function o(t) {
        var e = !!t && "length" in t && t.length,
            i = n(t);
        return !yt(t) && !bt(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }

    function s(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
    }

    function r(t, e, i) {
        return yt(e) ? Tt.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        }) : e.nodeType ? Tt.grep(t, function(t) {
            return t === e !== i
        }) : "string" != typeof e ? Tt.grep(t, function(t) {
            return dt.call(e, t) > -1 !== i
        }) : Tt.filter(e, t, i)
    }

    function a(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }

    function l(t) {
        var e = {};
        return Tt.each(t.match(Mt) || [], function(t, i) {
            e[i] = !0
        }), e
    }

    function c(t) {
        return t
    }

    function u(t) {
        throw t
    }

    function d(t, e, i, n) {
        var o;
        try {
            t && yt(o = t.promise) ? o.call(t).done(e).fail(i) : t && yt(o = t.then) ? o.call(t, e, i) : e.apply(void 0, [t].slice(n))
        } catch (t) {
            i.apply(void 0, [t])
        }
    }

    function h() {
        rt.removeEventListener("DOMContentLoaded", h), t.removeEventListener("load", h), Tt.ready()
    }

    function p(t, e) {
        return e.toUpperCase()
    }

    function f(t) {
        return t.replace($t, "ms-").replace(Ft, p)
    }

    function g() {
        this.expando = Tt.expando + g.uid++
    }

    function m(t) {
        return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Ut.test(t) ? JSON.parse(t) : t)
    }

    function v(t, e, i) {
        var n;
        if (void 0 === i && 1 === t.nodeType)
            if (n = "data-" + e.replace(Wt, "-$&").toLowerCase(), "string" == typeof(i = t.getAttribute(n))) {
                try {
                    i = m(i)
                } catch (t) {}
                jt.set(t, e, i)
            } else i = void 0;
        return i
    }

    function y(t, e, i, n) {
        var o, s, r = 20,
            a = n ? function() {
                return n.cur()
            } : function() {
                return Tt.css(t, e, "")
            },
            l = a(),
            c = i && i[3] || (Tt.cssNumber[e] ? "" : "px"),
            u = (Tt.cssNumber[e] || "px" !== c && +l) && zt.exec(Tt.css(t, e));
        if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; r--;) Tt.style(t, e, u + c), (1 - s) * (1 - (s = a() / l || .5)) <= 0 && (r = 0), u /= s;
            u *= 2, Tt.style(t, e, u + c), i = i || []
        }
        return i && (u = +u || +l || 0, o = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = u, n.end = o)), o
    }

    function b(t) {
        var e, i = t.ownerDocument,
            n = t.nodeName,
            o = Xt[n];
        return o || (e = i.body.appendChild(i.createElement(n)), o = Tt.css(e, "display"), e.parentNode.removeChild(e), "none" === o && (o = "block"), Xt[n] = o, o)
    }

    function w(t, e) {
        for (var i, n, o = [], s = 0, r = t.length; s < r; s++) n = t[s], n.style && (i = n.style.display, e ? ("none" === i && (o[s] = Rt.get(n, "display") || null, o[s] || (n.style.display = "")), "" === n.style.display && Bt(n) && (o[s] = b(n))) : "none" !== i && (o[s] = "none", Rt.set(n, "display", i)));
        for (s = 0; s < r; s++) null != o[s] && (t[s].style.display = o[s]);
        return t
    }

    function T(t, e) {
        var i;
        return i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && s(t, e) ? Tt.merge([t], i) : i
    }

    function C(t, e) {
        for (var i = 0, n = t.length; i < n; i++) Rt.set(t[i], "globalEval", !e || Rt.get(e[i], "globalEval"))
    }

    function _(t, e, i, o, s) {
        for (var r, a, l, c, u, d, h = e.createDocumentFragment(), p = [], f = 0, g = t.length; f < g; f++)
            if ((r = t[f]) || 0 === r)
                if ("object" === n(r)) Tt.merge(p, r.nodeType ? [r] : r);
                else if (Jt.test(r)) {
            for (a = a || h.appendChild(e.createElement("div")), l = (Kt.exec(r) || ["", ""])[1].toLowerCase(), c = Zt[l] || Zt._default, a.innerHTML = c[1] + Tt.htmlPrefilter(r) + c[2], d = c[0]; d--;) a = a.lastChild;
            Tt.merge(p, a.childNodes), a = h.firstChild, a.textContent = ""
        } else p.push(e.createTextNode(r));
        for (h.textContent = "", f = 0; r = p[f++];)
            if (o && Tt.inArray(r, o) > -1) s && s.push(r);
            else if (u = Tt.contains(r.ownerDocument, r), a = T(h.appendChild(r), "script"), u && C(a), i)
            for (d = 0; r = a[d++];) Qt.test(r.type || "") && i.push(r);
        return h
    }

    function x() {
        return !0
    }

    function E() {
        return !1
    }

    function k() {
        try {
            return rt.activeElement
        } catch (t) {}
    }

    function S(t, e, i, n, o, s) {
        var r, a;
        if ("object" == typeof e) {
            "string" != typeof i && (n = n || i, i = void 0);
            for (a in e) S(t, a, i, n, e[a], s);
            return t
        }
        if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = E;
        else if (!o) return t;
        return 1 === s && (r = o, o = function(t) {
            return Tt().off(t), r.apply(this, arguments)
        }, o.guid = r.guid || (r.guid = Tt.guid++)), t.each(function() {
            Tt.event.add(this, e, o, n, i)
        })
    }

    function D(t, e) {
        return s(t, "table") && s(11 !== e.nodeType ? e : e.firstChild, "tr") ? Tt(t).children("tbody")[0] || t : t
    }

    function A(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function O(t) {
        return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
    }

    function I(t, e) {
        var i, n, o, s, r, a, l, c;
        if (1 === e.nodeType) {
            if (Rt.hasData(t) && (s = Rt.access(t), r = Rt.set(e, s), c = s.events)) {
                delete r.handle, r.events = {};
                for (o in c)
                    for (i = 0, n = c[o].length; i < n; i++) Tt.event.add(e, o, c[o][i])
            }
            jt.hasData(t) && (a = jt.access(t), l = Tt.extend({}, a), jt.set(e, l))
        }
    }

    function M(t, e) {
        var i = e.nodeName.toLowerCase();
        "input" === i && Gt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
    }

    function P(t, e, n, o) {
        e = ct.apply([], e);
        var s, r, a, l, c, u, d = 0,
            h = t.length,
            p = h - 1,
            f = e[0],
            g = yt(f);
        if (g || h > 1 && "string" == typeof f && !vt.checkClone && re.test(f)) return t.each(function(i) {
            var s = t.eq(i);
            g && (e[0] = f.call(this, i, s.html())), P(s, e, n, o)
        });
        if (h && (s = _(e, t[0].ownerDocument, !1, t, o), r = s.firstChild, 1 === s.childNodes.length && (s = r), r || o)) {
            for (a = Tt.map(T(s, "script"), A), l = a.length; d < h; d++) c = s, d !== p && (c = Tt.clone(c, !0, !0), l && Tt.merge(a, T(c, "script"))), n.call(t[d], c, d);
            if (l)
                for (u = a[a.length - 1].ownerDocument, Tt.map(a, O), d = 0; d < l; d++) c = a[d], Qt.test(c.type || "") && !Rt.access(c, "globalEval") && Tt.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? Tt._evalUrl && Tt._evalUrl(c.src) : i(c.textContent.replace(ae, ""), u, c))
        }
        return t
    }

    function L(t, e, i) {
        for (var n, o = e ? Tt.filter(e, t) : t, s = 0; null != (n = o[s]); s++) i || 1 !== n.nodeType || Tt.cleanData(T(n)), n.parentNode && (i && Tt.contains(n.ownerDocument, n) && C(T(n, "script")), n.parentNode.removeChild(n));
        return t
    }

    function N(t, e, i) {
        var n, o, s, r, a = t.style;
        return i = i || ce(t), i && (r = i.getPropertyValue(e) || i[e], "" !== r || Tt.contains(t.ownerDocument, t) || (r = Tt.style(t, e)), !vt.pixelBoxStyles() && le.test(r) && ue.test(e) && (n = a.width, o = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = o, a.maxWidth = s)), void 0 !== r ? r + "" : r
    }

    function $(t, e) {
        return {
            get: function() {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function F(t) {
        if (t in me) return t;
        for (var e = t[0].toUpperCase() + t.slice(1), i = ge.length; i--;)
            if ((t = ge[i] + e) in me) return t
    }

    function H(t) {
        var e = Tt.cssProps[t];
        return e || (e = Tt.cssProps[t] = F(t) || t), e
    }

    function R(t, e, i) {
        var n = zt.exec(e);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
    }

    function j(t, e, i, n, o, s) {
        var r = "width" === e ? 1 : 0,
            a = 0,
            l = 0;
        if (i === (n ? "border" : "content")) return 0;
        for (; r < 4; r += 2) "margin" === i && (l += Tt.css(t, i + qt[r], !0, o)), n ? ("content" === i && (l -= Tt.css(t, "padding" + qt[r], !0, o)), "margin" !== i && (l -= Tt.css(t, "border" + qt[r] + "Width", !0, o))) : (l += Tt.css(t, "padding" + qt[r], !0, o), "padding" !== i ? l += Tt.css(t, "border" + qt[r] + "Width", !0, o) : a += Tt.css(t, "border" + qt[r] + "Width", !0, o));
        return !n && s >= 0 && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - s - l - a - .5))), l
    }

    function U(t, e, i) {
        var n = ce(t),
            o = N(t, e, n),
            s = "border-box" === Tt.css(t, "boxSizing", !1, n),
            r = s;
        if (le.test(o)) {
            if (!i) return o;
            o = "auto"
        }
        return r = r && (vt.boxSizingReliable() || o === t.style[e]), ("auto" === o || !parseFloat(o) && "inline" === Tt.css(t, "display", !1, n)) && (o = t["offset" + e[0].toUpperCase() + e.slice(1)], r = !0), (o = parseFloat(o) || 0) + j(t, e, i || (s ? "border" : "content"), r, n, o) + "px"
    }

    function W(t, e, i, n, o) {
        return new W.prototype.init(t, e, i, n, o)
    }

    function V() {
        ye && (!1 === rt.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(V) : t.setTimeout(V, Tt.fx.interval), Tt.fx.tick())
    }

    function z() {
        return t.setTimeout(function() {
            ve = void 0
        }), ve = Date.now()
    }

    function q(t, e) {
        var i, n = 0,
            o = {
                height: t
            };
        for (e = e ? 1 : 0; n < 4; n += 2 - e) i = qt[n], o["margin" + i] = o["padding" + i] = t;
        return e && (o.opacity = o.width = t), o
    }

    function B(t, e, i) {
        for (var n, o = (G.tweeners[e] || []).concat(G.tweeners["*"]), s = 0, r = o.length; s < r; s++)
            if (n = o[s].call(i, e, t)) return n
    }

    function Y(t, e, i) {
        var n, o, s, r, a, l, c, u, d = "width" in e || "height" in e,
            h = this,
            p = {},
            f = t.style,
            g = t.nodeType && Bt(t),
            m = Rt.get(t, "fxshow");
        i.queue || (r = Tt._queueHooks(t, "fx"), null == r.unqueued && (r.unqueued = 0, a = r.empty.fire, r.empty.fire = function() {
            r.unqueued || a()
        }), r.unqueued++, h.always(function() {
            h.always(function() {
                r.unqueued--, Tt.queue(t, "fx").length || r.empty.fire()
            })
        }));
        for (n in e)
            if (o = e[n], be.test(o)) {
                if (delete e[n], s = s || "toggle" === o, o === (g ? "hide" : "show")) {
                    if ("show" !== o || !m || void 0 === m[n]) continue;
                    g = !0
                }
                p[n] = m && m[n] || Tt.style(t, n)
            } if ((l = !Tt.isEmptyObject(e)) || !Tt.isEmptyObject(p)) {
            d && 1 === t.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], c = m && m.display, null == c && (c = Rt.get(t, "display")), u = Tt.css(t, "display"), "none" === u && (c ? u = c : (w([t], !0), c = t.style.display || c, u = Tt.css(t, "display"), w([t]))), ("inline" === u || "inline-block" === u && null != c) && "none" === Tt.css(t, "float") && (l || (h.done(function() {
                f.display = c
            }), null == c && (u = f.display, c = "none" === u ? "" : u)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", h.always(function() {
                f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
            })), l = !1;
            for (n in p) l || (m ? "hidden" in m && (g = m.hidden) : m = Rt.access(t, "fxshow", {
                display: c
            }), s && (m.hidden = !g), g && w([t], !0), h.done(function() {
                g || w([t]), Rt.remove(t, "fxshow");
                for (n in p) Tt.style(t, n, p[n])
            })), l = B(g ? m[n] : 0, n, h), n in m || (m[n] = l.start, g && (l.end = l.start, l.start = 0))
        }
    }

    function X(t, e) {
        var i, n, o, s, r;
        for (i in t)
            if (n = f(i), o = e[n], s = t[i], Array.isArray(s) && (o = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), (r = Tt.cssHooks[n]) && "expand" in r) {
                s = r.expand(s), delete t[n];
                for (i in s) i in t || (t[i] = s[i], e[i] = o)
            } else e[n] = o
    }

    function G(t, e, i) {
        var n, o, s = 0,
            r = G.prefilters.length,
            a = Tt.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var e = ve || z(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, s = 1 - n, r = 0, l = c.tweens.length; r < l; r++) c.tweens[r].run(s);
                return a.notifyWith(t, [c, s, i]), s < 1 && l ? i : (l || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1)
            },
            c = a.promise({
                elem: t,
                props: Tt.extend({}, e),
                opts: Tt.extend(!0, {
                    specialEasing: {},
                    easing: Tt.easing._default
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: ve || z(),
                duration: i.duration,
                tweens: [],
                createTween: function(e, i) {
                    var n = Tt.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                stop: function(e) {
                    var i = 0,
                        n = e ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i < n; i++) c.tweens[i].run(1);
                    return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this
                }
            }),
            u = c.props;
        for (X(u, c.opts.specialEasing); s < r; s++)
            if (n = G.prefilters[s].call(c, t, u, c.opts)) return yt(n.stop) && (Tt._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n;
        return Tt.map(u, B, c), yt(c.opts.start) && c.opts.start.call(t, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), Tt.fx.timer(Tt.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c
    }

    function K(t) {
        return (t.match(Mt) || []).join(" ")
    }

    function Q(t) {
        return t.getAttribute && t.getAttribute("class") || ""
    }

    function Z(t) {
        return Array.isArray(t) ? t : "string" == typeof t ? t.match(Mt) || [] : []
    }

    function J(t, e, i, o) {
        var s;
        if (Array.isArray(e)) Tt.each(e, function(e, n) {
            i || Ie.test(t) ? o(t, n) : J(t + "[" + ("object" == typeof n && null != n ? e : "") + "]", n, i, o)
        });
        else if (i || "object" !== n(e)) o(t, e);
        else
            for (s in e) J(t + "[" + s + "]", e[s], i, o)
    }

    function tt(t) {
        return function(e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, o = 0,
                s = e.toLowerCase().match(Mt) || [];
            if (yt(i))
                for (; n = s[o++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function et(t, e, i, n) {
        function o(a) {
            var l;
            return s[a] = !0, Tt.each(t[a] || [], function(t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || r || s[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var s = {},
            r = t === Ve;
        return o(e.dataTypes[0]) || !s["*"] && o("*")
    }

    function it(t, e) {
        var i, n, o = Tt.ajaxSettings.flatOptions || {};
        for (i in e) void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && Tt.extend(!0, t, n), t
    }

    function nt(t, e, i) {
        for (var n, o, s, r, a = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
        if (n)
            for (o in a)
                if (a[o] && a[o].test(n)) {
                    l.unshift(o);
                    break
                } if (l[0] in i) s = l[0];
        else {
            for (o in i) {
                if (!l[0] || t.converters[o + " " + l[0]]) {
                    s = o;
                    break
                }
                r || (r = o)
            }
            s = s || r
        }
        if (s) return s !== l[0] && l.unshift(s), i[s]
    }

    function ot(t, e, i, n) {
        var o, s, r, a, l, c = {},
            u = t.dataTypes.slice();
        if (u[1])
            for (r in t.converters) c[r.toLowerCase()] = t.converters[r];
        for (s = u.shift(); s;)
            if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = u.shift())
                if ("*" === s) s = l;
                else if ("*" !== l && l !== s) {
            if (!(r = c[l + " " + s] || c["* " + s]))
                for (o in c)
                    if (a = o.split(" "), a[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                        !0 === r ? r = c[o] : !0 !== c[o] && (s = a[0], u.unshift(a[1]));
                        break
                    } if (!0 !== r)
                if (r && t.throws) e = r(e);
                else try {
                    e = r(e)
                } catch (t) {
                    return {
                        state: "parsererror",
                        error: r ? t : "No conversion from " + l + " to " + s
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }
    var st = [],
        rt = t.document,
        at = Object.getPrototypeOf,
        lt = st.slice,
        ct = st.concat,
        ut = st.push,
        dt = st.indexOf,
        ht = {},
        pt = ht.toString,
        ft = ht.hasOwnProperty,
        gt = ft.toString,
        mt = gt.call(Object),
        vt = {},
        yt = function(t) {
            return "function" == typeof t && "number" != typeof t.nodeType
        },
        bt = function(t) {
            return null != t && t === t.window
        },
        wt = {
            type: !0,
            src: !0,
            noModule: !0
        },
        Tt = function(t, e) {
            return new Tt.fn.init(t, e)
        },
        Ct = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    Tt.fn = Tt.prototype = {
        jquery: "3.3.1",
        constructor: Tt,
        length: 0,
        toArray: function() {
            return lt.call(this)
        },
        get: function(t) {
            return null == t ? lt.call(this) : t < 0 ? this[t + this.length] : this[t]
        },
        pushStack: function(t) {
            var e = Tt.merge(this.constructor(), t);
            return e.prevObject = this, e
        },
        each: function(t) {
            return Tt.each(this, t)
        },
        map: function(t) {
            return this.pushStack(Tt.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(lt.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                i = +t + (t < 0 ? e : 0);
            return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ut,
        sort: st.sort,
        splice: st.splice
    }, Tt.extend = Tt.fn.extend = function() {
        var t, e, i, n, o, s, r = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || yt(r) || (r = {}), a === l && (r = this, a--); a < l; a++)
            if (null != (t = arguments[a]))
                for (e in t) i = r[e], n = t[e], r !== n && (c && n && (Tt.isPlainObject(n) || (o = Array.isArray(n))) ? (o ? (o = !1, s = i && Array.isArray(i) ? i : []) : s = i && Tt.isPlainObject(i) ? i : {}, r[e] = Tt.extend(c, s, n)) : void 0 !== n && (r[e] = n));
        return r
    }, Tt.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isPlainObject: function(t) {
            var e, i;
            return !(!t || "[object Object]" !== pt.call(t)) && (!(e = at(t)) || "function" == typeof(i = ft.call(e, "constructor") && e.constructor) && gt.call(i) === mt)
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        globalEval: function(t) {
            i(t)
        },
        each: function(t, e) {
            var i, n = 0;
            if (o(t))
                for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
            else
                for (n in t)
                    if (!1 === e.call(t[n], n, t[n])) break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(Ct, "")
        },
        makeArray: function(t, e) {
            var i = e || [];
            return null != t && (o(Object(t)) ? Tt.merge(i, "string" == typeof t ? [t] : t) : ut.call(i, t)), i
        },
        inArray: function(t, e, i) {
            return null == e ? -1 : dt.call(e, t, i)
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, o = t.length; n < i; n++) t[o++] = e[n];
            return t.length = o, t
        },
        grep: function(t, e, i) {
            for (var n = [], o = 0, s = t.length, r = !i; o < s; o++) !e(t[o], o) !== r && n.push(t[o]);
            return n
        },
        map: function(t, e, i) {
            var n, s, r = 0,
                a = [];
            if (o(t))
                for (n = t.length; r < n; r++) null != (s = e(t[r], r, i)) && a.push(s);
            else
                for (r in t) null != (s = e(t[r], r, i)) && a.push(s);
            return ct.apply([], a)
        },
        guid: 1,
        support: vt
    }), "function" == typeof Symbol && (Tt.fn[Symbol.iterator] = st[Symbol.iterator]), Tt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        ht["[object " + e + "]"] = e.toLowerCase()
    });
    var _t = function(t) {
        function e(t, e, i, n) {
            var o, s, r, a, l, u, h, p = e && e.ownerDocument,
                f = e ? e.nodeType : 9;
            if (i = i || [], "string" != typeof t || !t || 1 !== f && 9 !== f && 11 !== f) return i;
            if (!n && ((e ? e.ownerDocument || e : R) !== I && O(e), e = e || I, P)) {
                if (11 !== f && (l = gt.exec(t)))
                    if (o = l[1]) {
                        if (9 === f) {
                            if (!(r = e.getElementById(o))) return i;
                            if (r.id === o) return i.push(r), i
                        } else if (p && (r = p.getElementById(o)) && F(e, r) && r.id === o) return i.push(r), i
                    } else {
                        if (l[2]) return K.apply(i, e.getElementsByTagName(t)), i;
                        if ((o = l[3]) && w.getElementsByClassName && e.getElementsByClassName) return K.apply(i, e.getElementsByClassName(o)), i
                    } if (w.qsa && !z[t + " "] && (!L || !L.test(t))) {
                    if (1 !== f) p = e, h = t;
                    else if ("object" !== e.nodeName.toLowerCase()) {
                        for ((a = e.getAttribute("id")) ? a = a.replace(bt, wt) : e.setAttribute("id", a = H), u = x(t), s = u.length; s--;) u[s] = "#" + a + " " + d(u[s]);
                        h = u.join(","), p = mt.test(t) && c(e.parentNode) || e
                    }
                    if (h) try {
                        return K.apply(i, p.querySelectorAll(h)), i
                    } catch (t) {} finally {
                        a === H && e.removeAttribute("id")
                    }
                }
            }
            return k(t.replace(st, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > T.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[H] = !0, t
        }

        function o(t) {
            var e = I.createElement("fieldset");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t, e) {
            for (var i = t.split("|"), n = i.length; n--;) T.attrHandle[i[n]] = e
        }

        function r(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function a(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && Ct(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function l(t) {
            return n(function(e) {
                return e = +e, n(function(i, n) {
                    for (var o, s = t([], i.length, e), r = s.length; r--;) i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                })
            })
        }

        function c(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }

        function u() {}

        function d(t) {
            for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
            return n
        }

        function h(t, e, i) {
            var n = e.dir,
                o = e.next,
                s = o || n,
                r = i && "parentNode" === s,
                a = U++;
            return e.first ? function(e, i, o) {
                for (; e = e[n];)
                    if (1 === e.nodeType || r) return t(e, i, o);
                return !1
            } : function(e, i, l) {
                var c, u, d, h = [j, a];
                if (l) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || r) && t(e, i, l)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || r)
                            if (d = e[H] || (e[H] = {}), u = d[e.uniqueID] || (d[e.uniqueID] = {}), o && o === e.nodeName.toLowerCase()) e = e[n] || e;
                            else {
                                if ((c = u[s]) && c[0] === j && c[1] === a) return h[2] = c[2];
                                if (u[s] = h, h[2] = t(e, i, l)) return !0
                            } return !1
            }
        }

        function p(t) {
            return t.length > 1 ? function(e, i, n) {
                for (var o = t.length; o--;)
                    if (!t[o](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function f(t, i, n) {
            for (var o = 0, s = i.length; o < s; o++) e(t, i[o], n);
            return n
        }

        function g(t, e, i, n, o) {
            for (var s, r = [], a = 0, l = t.length, c = null != e; a < l; a++)(s = t[a]) && (i && !i(s, n, o) || (r.push(s), c && e.push(a)));
            return r
        }

        function m(t, e, i, o, s, r) {
            return o && !o[H] && (o = m(o)), s && !s[H] && (s = m(s, r)), n(function(n, r, a, l) {
                var c, u, d, h = [],
                    p = [],
                    m = r.length,
                    v = n || f(e || "*", a.nodeType ? [a] : a, []),
                    y = !t || !n && e ? v : g(v, h, t, a, l),
                    b = i ? s || (n ? t : m || o) ? [] : r : y;
                if (i && i(y, b, a, l), o)
                    for (c = g(b, p), o(c, [], a, l), u = c.length; u--;)(d = c[u]) && (b[p[u]] = !(y[p[u]] = d));
                if (n) {
                    if (s || t) {
                        if (s) {
                            for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                            s(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(d = b[u]) && (c = s ? Z(n, d) : h[u]) > -1 && (n[c] = !(r[c] = d))
                    }
                } else b = g(b === r ? b.splice(m, b.length) : b), s ? s(null, r, b, l) : K.apply(r, b)
            })
        }

        function v(t) {
            for (var e, i, n, o = t.length, s = T.relative[t[0].type], r = s || T.relative[" "], a = s ? 1 : 0, l = h(function(t) {
                    return t === e
                }, r, !0), c = h(function(t) {
                    return Z(e, t) > -1
                }, r, !0), u = [function(t, i, n) {
                    var o = !s && (n || i !== S) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n));
                    return e = null, o
                }]; a < o; a++)
                if (i = T.relative[t[a].type]) u = [h(p(u), i)];
                else {
                    if (i = T.filter[t[a].type].apply(null, t[a].matches), i[H]) {
                        for (n = ++a; n < o && !T.relative[t[n].type]; n++);
                        return m(a > 1 && p(u), a > 1 && d(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(st, "$1"), i, a < n && v(t.slice(a, n)), n < o && v(t = t.slice(n)), n < o && d(t))
                    }
                    u.push(i)
                } return p(u)
        }

        function y(t, i) {
            var o = i.length > 0,
                s = t.length > 0,
                r = function(n, r, a, l, c) {
                    var u, d, h, p = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        y = S,
                        b = n || s && T.find.TAG("*", c),
                        w = j += null == y ? 1 : Math.random() || .1,
                        C = b.length;
                    for (c && (S = r === I || r || c); f !== C && null != (u = b[f]); f++) {
                        if (s && u) {
                            for (d = 0, r || u.ownerDocument === I || (O(u), a = !P); h = t[d++];)
                                if (h(u, r || I, a)) {
                                    l.push(u);
                                    break
                                } c && (j = w)
                        }
                        o && ((u = !h && u) && p--, n && m.push(u))
                    }
                    if (p += f, o && f !== p) {
                        for (d = 0; h = i[d++];) h(m, v, r, a);
                        if (n) {
                            if (p > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = X.call(l));
                            v = g(v)
                        }
                        K.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                    }
                    return c && (j = w, S = y), m
                };
            return o ? n(r) : r
        }
        var b, w, T, C, _, x, E, k, S, D, A, O, I, M, P, L, N, $, F, H = "sizzle" + 1 * new Date,
            R = t.document,
            j = 0,
            U = 0,
            W = i(),
            V = i(),
            z = i(),
            q = function(t, e) {
                return t === e && (A = !0), 0
            },
            B = {}.hasOwnProperty,
            Y = [],
            X = Y.pop,
            G = Y.push,
            K = Y.push,
            Q = Y.slice,
            Z = function(t, e) {
                for (var i = 0, n = t.length; i < n; i++)
                    if (t[i] === e) return i;
                return -1
            },
            J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            tt = "[\\x20\\t\\r\\n\\f]",
            et = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            it = "\\[" + tt + "*(" + et + ")(?:" + tt + "*([*^$|!~]?=)" + tt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + et + "))|)" + tt + "*\\]",
            nt = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
            ot = new RegExp(tt + "+", "g"),
            st = new RegExp("^" + tt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + tt + "+$", "g"),
            rt = new RegExp("^" + tt + "*," + tt + "*"),
            at = new RegExp("^" + tt + "*([>+~]|" + tt + ")" + tt + "*"),
            lt = new RegExp("=" + tt + "*([^\\]'\"]*?)" + tt + "*\\]", "g"),
            ct = new RegExp(nt),
            ut = new RegExp("^" + et + "$"),
            dt = {
                ID: new RegExp("^#(" + et + ")"),
                CLASS: new RegExp("^\\.(" + et + ")"),
                TAG: new RegExp("^(" + et + "|[*])"),
                ATTR: new RegExp("^" + it),
                PSEUDO: new RegExp("^" + nt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + tt + "*(even|odd|(([+-]|)(\\d*)n|)" + tt + "*(?:([+-]|)" + tt + "*(\\d+)|))" + tt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + J + ")$", "i"),
                needsContext: new RegExp("^" + tt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + tt + "*((?:-\\d)?\\d*)" + tt + "*\\)|)(?=[^-]|$)", "i")
            },
            ht = /^(?:input|select|textarea|button)$/i,
            pt = /^h\d$/i,
            ft = /^[^{]+\{\s*\[native \w/,
            gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            mt = /[+~]/,
            vt = new RegExp("\\\\([\\da-f]{1,6}" + tt + "?|(" + tt + ")|.)", "ig"),
            yt = function(t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            },
            bt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            wt = function(t, e) {
                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            },
            Tt = function() {
                O()
            },
            Ct = h(function(t) {
                return !0 === t.disabled && ("form" in t || "label" in t)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            K.apply(Y = Q.call(R.childNodes), R.childNodes), Y[R.childNodes.length].nodeType
        } catch (t) {
            K = {
                apply: Y.length ? function(t, e) {
                    G.apply(t, Q.call(e))
                } : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        w = e.support = {}, _ = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return !!e && "HTML" !== e.nodeName
        }, O = e.setDocument = function(t) {
            var e, i, n = t ? t.ownerDocument || t : R;
            return n !== I && 9 === n.nodeType && n.documentElement ? (I = n, M = I.documentElement, P = !_(I), R !== I && (i = I.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", Tt, !1) : i.attachEvent && i.attachEvent("onunload", Tt)), w.attributes = o(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), w.getElementsByTagName = o(function(t) {
                return t.appendChild(I.createComment("")), !t.getElementsByTagName("*").length
            }), w.getElementsByClassName = ft.test(I.getElementsByClassName), w.getById = o(function(t) {
                return M.appendChild(t).id = H, !I.getElementsByName || !I.getElementsByName(H).length
            }), w.getById ? (T.filter.ID = function(t) {
                var e = t.replace(vt, yt);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }, T.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && P) {
                    var i = e.getElementById(t);
                    return i ? [i] : []
                }
            }) : (T.filter.ID = function(t) {
                var e = t.replace(vt, yt);
                return function(t) {
                    var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }, T.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && P) {
                    var i, n, o, s = e.getElementById(t);
                    if (s) {
                        if ((i = s.getAttributeNode("id")) && i.value === t) return [s];
                        for (o = e.getElementsByName(t), n = 0; s = o[n++];)
                            if ((i = s.getAttributeNode("id")) && i.value === t) return [s]
                    }
                    return []
                }
            }), T.find.TAG = w.getElementsByTagName ? function(t, e) {
                return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : w.qsa ? e.querySelectorAll(t) : void 0
            } : function(t, e) {
                var i, n = [],
                    o = 0,
                    s = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = s[o++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, T.find.CLASS = w.getElementsByClassName && function(t, e) {
                if (void 0 !== e.getElementsByClassName && P) return e.getElementsByClassName(t)
            }, N = [], L = [], (w.qsa = ft.test(I.querySelectorAll)) && (o(function(t) {
                M.appendChild(t).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + tt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || L.push("\\[" + tt + "*(?:value|" + J + ")"), t.querySelectorAll("[id~=" + H + "-]").length || L.push("~="), t.querySelectorAll(":checked").length || L.push(":checked"), t.querySelectorAll("a#" + H + "+*").length || L.push(".#.+[+~]")
            }), o(function(t) {
                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var e = I.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && L.push("name" + tt + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && L.push(":enabled", ":disabled"), M.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && L.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), L.push(",.*:")
            })), (w.matchesSelector = ft.test($ = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && o(function(t) {
                w.disconnectedMatch = $.call(t, "*"), $.call(t, "[s!='']:x"), N.push("!=", nt)
            }), L = L.length && new RegExp(L.join("|")), N = N.length && new RegExp(N.join("|")), e = ft.test(M.compareDocumentPosition), F = e || ft.test(M.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, q = e ? function(t, e) {
                if (t === e) return A = !0, 0;
                var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return i || (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !w.sortDetached && e.compareDocumentPosition(t) === i ? t === I || t.ownerDocument === R && F(R, t) ? -1 : e === I || e.ownerDocument === R && F(R, e) ? 1 : D ? Z(D, t) - Z(D, e) : 0 : 4 & i ? -1 : 1)
            } : function(t, e) {
                if (t === e) return A = !0, 0;
                var i, n = 0,
                    o = t.parentNode,
                    s = e.parentNode,
                    a = [t],
                    l = [e];
                if (!o || !s) return t === I ? -1 : e === I ? 1 : o ? -1 : s ? 1 : D ? Z(D, t) - Z(D, e) : 0;
                if (o === s) return r(t, e);
                for (i = t; i = i.parentNode;) a.unshift(i);
                for (i = e; i = i.parentNode;) l.unshift(i);
                for (; a[n] === l[n];) n++;
                return n ? r(a[n], l[n]) : a[n] === R ? -1 : l[n] === R ? 1 : 0
            }, I) : I
        }, e.matches = function(t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function(t, i) {
            if ((t.ownerDocument || t) !== I && O(t), i = i.replace(lt, "='$1']"), w.matchesSelector && P && !z[i + " "] && (!N || !N.test(i)) && (!L || !L.test(i))) try {
                var n = $.call(t, i);
                if (n || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (t) {}
            return e(i, I, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== I && O(t), F(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== I && O(t);
            var i = T.attrHandle[e.toLowerCase()],
                n = i && B.call(T.attrHandle, e.toLowerCase()) ? i(t, e, !P) : void 0;
            return void 0 !== n ? n : w.attributes || !P ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.escape = function(t) {
            return (t + "").replace(bt, wt)
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, i = [],
                n = 0,
                o = 0;
            if (A = !w.detectDuplicates, D = !w.sortStable && t.slice(0), t.sort(q), A) {
                for (; e = t[o++];) e === t[o] && (n = i.push(o));
                for (; n--;) t.splice(i[n], 1)
            }
            return D = null, t
        }, C = e.getText = function(t) {
            var e, i = "",
                n = 0,
                o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += C(t)
                } else if (3 === o || 4 === o) return t.nodeValue
            } else
                for (; e = t[n++];) i += C(e);
            return i
        }, T = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: dt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(vt, yt), t[3] = (t[3] || t[4] || t[5] || "").replace(vt, yt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return dt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ct.test(i) && (e = x(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(vt, yt).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = W[t + " "];
                    return e || (e = new RegExp("(^|" + tt + ")" + t + "(" + tt + "|$)")) && W(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, i, n) {
                    return function(o) {
                        var s = e.attr(o, t);
                        return null == s ? "!=" === i : !i || (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s.replace(ot, " ") + " ").indexOf(n) > -1 : "|=" === i && (s === n || s.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(t, e, i, n, o) {
                    var s = "nth" !== t.slice(0, 3),
                        r = "last" !== t.slice(-4),
                        a = "of-type" === e;
                    return 1 === n && 0 === o ? function(t) {
                        return !!t.parentNode
                    } : function(e, i, l) {
                        var c, u, d, h, p, f, g = s !== r ? "nextSibling" : "previousSibling",
                            m = e.parentNode,
                            v = a && e.nodeName.toLowerCase(),
                            y = !l && !a,
                            b = !1;
                        if (m) {
                            if (s) {
                                for (; g;) {
                                    for (h = e; h = h[g];)
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                    f = g = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? m.firstChild : m.lastChild], r && y) {
                                for (h = m, d = h[H] || (h[H] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), c = u[t] || [], p = c[0] === j && c[1], b = p && c[2], h = p && m.childNodes[p]; h = ++p && h && h[g] || (b = p = 0) || f.pop();)
                                    if (1 === h.nodeType && ++b && h === e) {
                                        u[t] = [j, p, b];
                                        break
                                    }
                            } else if (y && (h = e, d = h[H] || (h[H] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), c = u[t] || [], p = c[0] === j && c[1], b = p), !1 === b)
                                for (;
                                    (h = ++p && h && h[g] || (b = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (d = h[H] || (h[H] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), u[t] = [j, b]), h !== e)););
                            return (b -= o) === n || b % n == 0 && b / n >= 0
                        }
                    }
                },
                PSEUDO: function(t, i) {
                    var o, s = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return s[H] ? s(i) : s.length > 1 ? (o = [t, t, "", i], T.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                        for (var n, o = s(t, i), r = o.length; r--;) n = Z(t, o[r]), t[n] = !(e[n] = o[r])
                    }) : function(t) {
                        return s(t, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: n(function(t) {
                    var e = [],
                        i = [],
                        o = E(t.replace(st, "$1"));
                    return o[H] ? n(function(t, e, i, n) {
                        for (var s, r = o(t, null, n, []), a = t.length; a--;)(s = r[a]) && (t[a] = !(e[a] = s))
                    }) : function(t, n, s) {
                        return e[0] = t, o(e, null, s, i), e[0] = null, !i.pop()
                    }
                }),
                has: n(function(t) {
                    return function(i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function(t) {
                    return t = t.replace(vt, yt),
                        function(e) {
                            return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                        }
                }),
                lang: n(function(t) {
                    return ut.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(vt, yt).toLowerCase(),
                        function(e) {
                            var i;
                            do {
                                if (i = P ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === M
                },
                focus: function(t) {
                    return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: a(!1),
                disabled: a(!0),
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !T.pseudos.empty(t)
                },
                header: function(t) {
                    return pt.test(t.nodeName)
                },
                input: function(t) {
                    return ht.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(t, e) {
                    return [e - 1]
                }),
                eq: l(function(t, e, i) {
                    return [i < 0 ? i + e : i]
                }),
                even: l(function(t, e) {
                    for (var i = 0; i < e; i += 2) t.push(i);
                    return t
                }),
                odd: l(function(t, e) {
                    for (var i = 1; i < e; i += 2) t.push(i);
                    return t
                }),
                lt: l(function(t, e, i) {
                    for (var n = i < 0 ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: l(function(t, e, i) {
                    for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, T.pseudos.nth = T.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) T.pseudos[b] = function(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }(b);
        for (b in {
                submit: !0,
                reset: !0
            }) T.pseudos[b] = function(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }(b);
        return u.prototype = T.filters = T.pseudos, T.setFilters = new u, x = e.tokenize = function(t, i) {
            var n, o, s, r, a, l, c, u = V[t + " "];
            if (u) return i ? 0 : u.slice(0);
            for (a = t, l = [], c = T.preFilter; a;) {
                n && !(o = rt.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(s = [])), n = !1, (o = at.exec(a)) && (n = o.shift(), s.push({
                    value: n,
                    type: o[0].replace(st, " ")
                }), a = a.slice(n.length));
                for (r in T.filter) !(o = dt[r].exec(a)) || c[r] && !(o = c[r](o)) || (n = o.shift(), s.push({
                    value: n,
                    type: r,
                    matches: o
                }), a = a.slice(n.length));
                if (!n) break
            }
            return i ? a.length : a ? e.error(t) : V(t, l).slice(0)
        }, E = e.compile = function(t, e) {
            var i, n = [],
                o = [],
                s = z[t + " "];
            if (!s) {
                for (e || (e = x(t)), i = e.length; i--;) s = v(e[i]), s[H] ? n.push(s) : o.push(s);
                s = z(t, y(o, n)), s.selector = t
            }
            return s
        }, k = e.select = function(t, e, i, n) {
            var o, s, r, a, l, u = "function" == typeof t && t,
                h = !n && x(t = u.selector || t);
            if (i = i || [], 1 === h.length) {
                if (s = h[0] = h[0].slice(0), s.length > 2 && "ID" === (r = s[0]).type && 9 === e.nodeType && P && T.relative[s[1].type]) {
                    if (!(e = (T.find.ID(r.matches[0].replace(vt, yt), e) || [])[0])) return i;
                    u && (e = e.parentNode), t = t.slice(s.shift().value.length)
                }
                for (o = dt.needsContext.test(t) ? 0 : s.length; o-- && (r = s[o], !T.relative[a = r.type]);)
                    if ((l = T.find[a]) && (n = l(r.matches[0].replace(vt, yt), mt.test(s[0].type) && c(e.parentNode) || e))) {
                        if (s.splice(o, 1), !(t = n.length && d(s))) return K.apply(i, n), i;
                        break
                    }
            }
            return (u || E(t, h))(n, e, !P, i, !e || mt.test(t) && c(e.parentNode) || e), i
        }, w.sortStable = H.split("").sort(q).join("") === H, w.detectDuplicates = !!A, O(), w.sortDetached = o(function(t) {
            return 1 & t.compareDocumentPosition(I.createElement("fieldset"))
        }), o(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function(t, e, i) {
            if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), w.attributes && o(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || s("value", function(t, e, i) {
            if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
        }), o(function(t) {
            return null == t.getAttribute("disabled")
        }) || s(J, function(t, e, i) {
            var n;
            if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    Tt.find = _t, Tt.expr = _t.selectors, Tt.expr[":"] = Tt.expr.pseudos, Tt.uniqueSort = Tt.unique = _t.uniqueSort, Tt.text = _t.getText, Tt.isXMLDoc = _t.isXML, Tt.contains = _t.contains, Tt.escapeSelector = _t.escape;
    var xt = function(t, e, i) {
            for (var n = [], o = void 0 !== i;
                (t = t[e]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (o && Tt(t).is(i)) break;
                    n.push(t)
                } return n
        },
        Et = function(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        },
        kt = Tt.expr.match.needsContext,
        St = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    Tt.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? Tt.find.matchesSelector(n, t) ? [n] : [] : Tt.find.matches(t, Tt.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, Tt.fn.extend({
        find: function(t) {
            var e, i, n = this.length,
                o = this;
            if ("string" != typeof t) return this.pushStack(Tt(t).filter(function() {
                for (e = 0; e < n; e++)
                    if (Tt.contains(o[e], this)) return !0
            }));
            for (i = this.pushStack([]), e = 0; e < n; e++) Tt.find(t, o[e], i);
            return n > 1 ? Tt.uniqueSort(i) : i
        },
        filter: function(t) {
            return this.pushStack(r(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(r(this, t || [], !0))
        },
        is: function(t) {
            return !!r(this, "string" == typeof t && kt.test(t) ? Tt(t) : t || [], !1).length
        }
    });
    var Dt, At = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (Tt.fn.init = function(t, e, i) {
        var n, o;
        if (!t) return this;
        if (i = i || Dt, "string" == typeof t) {
            if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : At.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (e = e instanceof Tt ? e[0] : e, Tt.merge(this, Tt.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : rt, !0)), St.test(n[1]) && Tt.isPlainObject(e))
                    for (n in e) yt(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this
            }
            return o = rt.getElementById(n[2]), o && (this[0] = o, this.length = 1), this
        }
        return t.nodeType ? (this[0] = t, this.length = 1, this) : yt(t) ? void 0 !== i.ready ? i.ready(t) : t(Tt) : Tt.makeArray(t, this)
    }).prototype = Tt.fn, Dt = Tt(rt);
    var Ot = /^(?:parents|prev(?:Until|All))/,
        It = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Tt.fn.extend({
        has: function(t) {
            var e = Tt(t, this),
                i = e.length;
            return this.filter(function() {
                for (var t = 0; t < i; t++)
                    if (Tt.contains(this, e[t])) return !0
            })
        },
        closest: function(t, e) {
            var i, n = 0,
                o = this.length,
                s = [],
                r = "string" != typeof t && Tt(t);
            if (!kt.test(t))
                for (; n < o; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && Tt.find.matchesSelector(i, t))) {
                            s.push(i);
                            break
                        } return this.pushStack(s.length > 1 ? Tt.uniqueSort(s) : s)
        },
        index: function(t) {
            return t ? "string" == typeof t ? dt.call(Tt(t), this[0]) : dt.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(Tt.uniqueSort(Tt.merge(this.get(), Tt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), Tt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return xt(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return xt(t, "parentNode", i)
        },
        next: function(t) {
            return a(t, "nextSibling")
        },
        prev: function(t) {
            return a(t, "previousSibling")
        },
        nextAll: function(t) {
            return xt(t, "nextSibling")
        },
        prevAll: function(t) {
            return xt(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return xt(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return xt(t, "previousSibling", i)
        },
        siblings: function(t) {
            return Et((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return Et(t.firstChild)
        },
        contents: function(t) {
            return s(t, "iframe") ? t.contentDocument : (s(t, "template") && (t = t.content || t), Tt.merge([], t.childNodes))
        }
    }, function(t, e) {
        Tt.fn[t] = function(i, n) {
            var o = Tt.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (o = Tt.filter(n, o)), this.length > 1 && (It[t] || Tt.uniqueSort(o), Ot.test(t) && o.reverse()), this.pushStack(o)
        }
    });
    var Mt = /[^\x20\t\r\n\f]+/g;
    Tt.Callbacks = function(t) {
        t = "string" == typeof t ? l(t) : Tt.extend({}, t);
        var e, i, o, s, r = [],
            a = [],
            c = -1,
            u = function() {
                for (s = s || t.once, o = e = !0; a.length; c = -1)
                    for (i = a.shift(); ++c < r.length;) !1 === r[c].apply(i[0], i[1]) && t.stopOnFalse && (c = r.length, i = !1);
                t.memory || (i = !1), e = !1, s && (r = i ? [] : "")
            },
            d = {
                add: function() {
                    return r && (i && !e && (c = r.length - 1, a.push(i)), function e(i) {
                        Tt.each(i, function(i, o) {
                            yt(o) ? t.unique && d.has(o) || r.push(o) : o && o.length && "string" !== n(o) && e(o)
                        })
                    }(arguments), i && !e && u()), this
                },
                remove: function() {
                    return Tt.each(arguments, function(t, e) {
                        for (var i;
                            (i = Tt.inArray(e, r, i)) > -1;) r.splice(i, 1), i <= c && c--
                    }), this
                },
                has: function(t) {
                    return t ? Tt.inArray(t, r) > -1 : r.length > 0
                },
                empty: function() {
                    return r && (r = []), this
                },
                disable: function() {
                    return s = a = [], r = i = "", this
                },
                disabled: function() {
                    return !r
                },
                lock: function() {
                    return s = a = [], i || e || (r = i = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(t, i) {
                    return s || (i = i || [], i = [t, i.slice ? i.slice() : i], a.push(i), e || u()), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return d
    }, Tt.extend({
        Deferred: function(e) {
            var i = [
                    ["notify", "progress", Tt.Callbacks("memory"), Tt.Callbacks("memory"), 2],
                    ["resolve", "done", Tt.Callbacks("once memory"), Tt.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", Tt.Callbacks("once memory"), Tt.Callbacks("once memory"), 1, "rejected"]
                ],
                n = "pending",
                o = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    catch: function(t) {
                        return o.then(null, t)
                    },
                    pipe: function() {
                        var t = arguments;
                        return Tt.Deferred(function(e) {
                            Tt.each(i, function(i, n) {
                                var o = yt(t[n[4]]) && t[n[4]];
                                s[n[1]](function() {
                                    var t = o && o.apply(this, arguments);
                                    t && yt(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, o ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    then: function(e, n, o) {
                        function s(e, i, n, o) {
                            return function() {
                                var a = this,
                                    l = arguments,
                                    d = function() {
                                        var t, d;
                                        if (!(e < r)) {
                                            if ((t = n.apply(a, l)) === i.promise()) throw new TypeError("Thenable self-resolution");
                                            d = t && ("object" == typeof t || "function" == typeof t) && t.then, yt(d) ? o ? d.call(t, s(r, i, c, o), s(r, i, u, o)) : (r++, d.call(t, s(r, i, c, o), s(r, i, u, o), s(r, i, c, i.notifyWith))) : (n !== c && (a = void 0, l = [t]), (o || i.resolveWith)(a, l))
                                        }
                                    },
                                    h = o ? d : function() {
                                        try {
                                            d()
                                        } catch (t) {
                                            Tt.Deferred.exceptionHook && Tt.Deferred.exceptionHook(t, h.stackTrace), e + 1 >= r && (n !== u && (a = void 0, l = [t]), i.rejectWith(a, l))
                                        }
                                    };
                                e ? h() : (Tt.Deferred.getStackHook && (h.stackTrace = Tt.Deferred.getStackHook()), t.setTimeout(h))
                            }
                        }
                        var r = 0;
                        return Tt.Deferred(function(t) {
                            i[0][3].add(s(0, t, yt(o) ? o : c, t.notifyWith)), i[1][3].add(s(0, t, yt(e) ? e : c)), i[2][3].add(s(0, t, yt(n) ? n : u))
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? Tt.extend(t, o) : o
                    }
                },
                s = {};
            return Tt.each(i, function(t, e) {
                var r = e[2],
                    a = e[5];
                o[e[1]] = r.add, a && r.add(function() {
                    n = a
                }, i[3 - t][2].disable, i[3 - t][3].disable, i[0][2].lock, i[0][3].lock), r.add(e[3].fire), s[e[0]] = function() {
                    return s[e[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[e[0] + "With"] = r.fireWith
            }), o.promise(s), e && e.call(s, s), s
        },
        when: function(t) {
            var e = arguments.length,
                i = e,
                n = Array(i),
                o = lt.call(arguments),
                s = Tt.Deferred(),
                r = function(t) {
                    return function(i) {
                        n[t] = this, o[t] = arguments.length > 1 ? lt.call(arguments) : i, --e || s.resolveWith(n, o)
                    }
                };
            if (e <= 1 && (d(t, s.done(r(i)).resolve, s.reject, !e), "pending" === s.state() || yt(o[i] && o[i].then))) return s.then();
            for (; i--;) d(o[i], r(i), s.reject);
            return s.promise()
        }
    });
    var Pt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    Tt.Deferred.exceptionHook = function(e, i) {
        t.console && t.console.warn && e && Pt.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
    }, Tt.readyException = function(e) {
        t.setTimeout(function() {
            throw e
        })
    };
    var Lt = Tt.Deferred();
    Tt.fn.ready = function(t) {
        return Lt.then(t).catch(function(t) {
            Tt.readyException(t)
        }), this
    }, Tt.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(t) {
            (!0 === t ? --Tt.readyWait : Tt.isReady) || (Tt.isReady = !0, !0 !== t && --Tt.readyWait > 0 || Lt.resolveWith(rt, [Tt]))
        }
    }), Tt.ready.then = Lt.then, "complete" === rt.readyState || "loading" !== rt.readyState && !rt.documentElement.doScroll ? t.setTimeout(Tt.ready) : (rt.addEventListener("DOMContentLoaded", h), t.addEventListener("load", h));
    var Nt = function(t, e, i, o, s, r, a) {
            var l = 0,
                c = t.length,
                u = null == i;
            if ("object" === n(i)) {
                s = !0;
                for (l in i) Nt(t, e, l, i[l], !0, r, a)
            } else if (void 0 !== o && (s = !0, yt(o) || (a = !0), u && (a ? (e.call(t, o), e = null) : (u = e, e = function(t, e, i) {
                    return u.call(Tt(t), i)
                })), e))
                for (; l < c; l++) e(t[l], i, a ? o : o.call(t[l], l, e(t[l], i)));
            return s ? t : u ? e.call(t) : c ? e(t[0], i) : r
        },
        $t = /^-ms-/,
        Ft = /-([a-z])/g,
        Ht = function(t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
        };
    g.uid = 1, g.prototype = {
        cache: function(t) {
            var e = t[this.expando];
            return e || (e = {}, Ht(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                value: e,
                configurable: !0
            }))), e
        },
        set: function(t, e, i) {
            var n, o = this.cache(t);
            if ("string" == typeof e) o[f(e)] = i;
            else
                for (n in e) o[f(n)] = e[n];
            return o
        },
        get: function(t, e) {
            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][f(e)]
        },
        access: function(t, e, i) {
            return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e)
        },
        remove: function(t, e) {
            var i, n = t[this.expando];
            if (void 0 !== n) {
                if (void 0 !== e) {
                    Array.isArray(e) ? e = e.map(f) : (e = f(e), e = e in n ? [e] : e.match(Mt) || []), i = e.length;
                    for (; i--;) delete n[e[i]]
                }(void 0 === e || Tt.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
            }
        },
        hasData: function(t) {
            var e = t[this.expando];
            return void 0 !== e && !Tt.isEmptyObject(e)
        }
    };
    var Rt = new g,
        jt = new g,
        Ut = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Wt = /[A-Z]/g;
    Tt.extend({
        hasData: function(t) {
            return jt.hasData(t) || Rt.hasData(t)
        },
        data: function(t, e, i) {
            return jt.access(t, e, i)
        },
        removeData: function(t, e) {
            jt.remove(t, e)
        },
        _data: function(t, e, i) {
            return Rt.access(t, e, i)
        },
        _removeData: function(t, e) {
            Rt.remove(t, e)
        }
    }), Tt.fn.extend({
        data: function(t, e) {
            var i, n, o, s = this[0],
                r = s && s.attributes;
            if (void 0 === t) {
                if (this.length && (o = jt.get(s), 1 === s.nodeType && !Rt.get(s, "hasDataAttrs"))) {
                    for (i = r.length; i--;) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = f(n.slice(5)), v(s, n, o[n])));
                    Rt.set(s, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                jt.set(this, t)
            }) : Nt(this, function(e) {
                var i;
                if (s && void 0 === e) {
                    if (void 0 !== (i = jt.get(s, t))) return i;
                    if (void 0 !== (i = v(s, t))) return i
                } else this.each(function() {
                    jt.set(this, t, e)
                })
            }, null, e, arguments.length > 1, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                jt.remove(this, t)
            })
        }
    }), Tt.extend({
        queue: function(t, e, i) {
            var n;
            if (t) return e = (e || "fx") + "queue", n = Rt.get(t, e), i && (!n || Array.isArray(i) ? n = Rt.access(t, e, Tt.makeArray(i)) : n.push(i)), n || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = Tt.queue(t, e),
                n = i.length,
                o = i.shift(),
                s = Tt._queueHooks(t, e),
                r = function() {
                    Tt.dequeue(t, e)
                };
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete s.stop, o.call(t, r, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return Rt.get(t, i) || Rt.access(t, i, {
                empty: Tt.Callbacks("once memory").add(function() {
                    Rt.remove(t, [e + "queue", i])
                })
            })
        }
    }), Tt.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? Tt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var i = Tt.queue(this, t, e);
                Tt._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && Tt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                Tt.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1,
                o = Tt.Deferred(),
                s = this,
                r = this.length,
                a = function() {
                    --n || o.resolveWith(s, [s])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;)(i = Rt.get(s[r], t + "queueHooks")) && i.empty && (n++, i.empty.add(a));
            return a(), o.promise(e)
        }
    });
    var Vt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        zt = new RegExp("^(?:([+-])=|)(" + Vt + ")([a-z%]*)$", "i"),
        qt = ["Top", "Right", "Bottom", "Left"],
        Bt = function(t, e) {
            return t = e || t, "none" === t.style.display || "" === t.style.display && Tt.contains(t.ownerDocument, t) && "none" === Tt.css(t, "display")
        },
        Yt = function(t, e, i, n) {
            var o, s, r = {};
            for (s in e) r[s] = t.style[s], t.style[s] = e[s];
            o = i.apply(t, n || []);
            for (s in e) t.style[s] = r[s];
            return o
        },
        Xt = {};
    Tt.fn.extend({
        show: function() {
            return w(this, !0)
        },
        hide: function() {
            return w(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Bt(this) ? Tt(this).show() : Tt(this).hide()
            })
        }
    });
    var Gt = /^(?:checkbox|radio)$/i,
        Kt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Qt = /^$|^module$|\/(?:java|ecma)script/i,
        Zt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Zt.optgroup = Zt.option, Zt.tbody = Zt.tfoot = Zt.colgroup = Zt.caption = Zt.thead, Zt.th = Zt.td;
    var Jt = /<|&#?\w+;/;
    ! function() {
        var t = rt.createDocumentFragment(),
            e = t.appendChild(rt.createElement("div")),
            i = rt.createElement("input");
        i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), e.appendChild(i), vt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", vt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var te = rt.documentElement,
        ee = /^key/,
        ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ne = /^([^.]*)(?:\.(.+)|)/;
    Tt.event = {
        global: {},
        add: function(t, e, i, n, o) {
            var s, r, a, l, c, u, d, h, p, f, g, m = Rt.get(t);
            if (m)
                for (i.handler && (s = i, i = s.handler, o = s.selector), o && Tt.find.matchesSelector(te, o), i.guid || (i.guid = Tt.guid++), (l = m.events) || (l = m.events = {}), (r = m.handle) || (r = m.handle = function(e) {
                        return void 0 !== Tt && Tt.event.triggered !== e.type ? Tt.event.dispatch.apply(t, arguments) : void 0
                    }), e = (e || "").match(Mt) || [""], c = e.length; c--;) a = ne.exec(e[c]) || [], p = g = a[1], f = (a[2] || "").split(".").sort(), p && (d = Tt.event.special[p] || {}, p = (o ? d.delegateType : d.bindType) || p, d = Tt.event.special[p] || {}, u = Tt.extend({
                    type: p,
                    origType: g,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && Tt.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                }, s), (h = l[p]) || (h = l[p] = [], h.delegateCount = 0, d.setup && !1 !== d.setup.call(t, n, f, r) || t.addEventListener && t.addEventListener(p, r)), d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), o ? h.splice(h.delegateCount++, 0, u) : h.push(u), Tt.event.global[p] = !0)
        },
        remove: function(t, e, i, n, o) {
            var s, r, a, l, c, u, d, h, p, f, g, m = Rt.hasData(t) && Rt.get(t);
            if (m && (l = m.events)) {
                for (e = (e || "").match(Mt) || [""], c = e.length; c--;)
                    if (a = ne.exec(e[c]) || [], p = g = a[1], f = (a[2] || "").split(".").sort(), p) {
                        for (d = Tt.event.special[p] || {}, p = (n ? d.delegateType : d.bindType) || p, h = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = s = h.length; s--;) u = h[s], !o && g !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (h.splice(s, 1), u.selector && h.delegateCount--, d.remove && d.remove.call(t, u));
                        r && !h.length && (d.teardown && !1 !== d.teardown.call(t, f, m.handle) || Tt.removeEvent(t, p, m.handle), delete l[p])
                    } else
                        for (p in l) Tt.event.remove(t, p + e[c], i, n, !0);
                Tt.isEmptyObject(l) && Rt.remove(t, "handle events")
            }
        },
        dispatch: function(t) {
            var e, i, n, o, s, r, a = Tt.event.fix(t),
                l = new Array(arguments.length),
                c = (Rt.get(this, "events") || {})[a.type] || [],
                u = Tt.event.special[a.type] || {};
            for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
            if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                for (r = Tt.event.handlers.call(this, a, c), e = 0;
                    (o = r[e++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = o.elem, i = 0;
                        (s = o.handlers[i++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(s.namespace) || (a.handleObj = s, a.data = s.data, void 0 !== (n = ((Tt.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(t, e) {
            var i, n, o, s, r, a = [],
                l = e.delegateCount,
                c = t.target;
            if (l && c.nodeType && !("click" === t.type && t.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
                        for (s = [], r = {}, i = 0; i < l; i++) n = e[i], o = n.selector + " ", void 0 === r[o] && (r[o] = n.needsContext ? Tt(o, this).index(c) > -1 : Tt.find(o, this, null, [c]).length), r[o] && s.push(n);
                        s.length && a.push({
                            elem: c,
                            handlers: s
                        })
                    } return c = this, l < e.length && a.push({
                elem: c,
                handlers: e.slice(l)
            }), a
        },
        addProp: function(t, e) {
            Object.defineProperty(Tt.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: yt(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(t) {
            return t[Tt.expando] ? t : new Tt.Event(t)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== k() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === k() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && s(this, "input")) return this.click(), !1
                },
                _default: function(t) {
                    return s(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        }
    }, Tt.removeEvent = function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i)
    }, Tt.Event = function(t, e) {
        if (!(this instanceof Tt.Event)) return new Tt.Event(t, e);
        t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? x : E, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && Tt.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[Tt.expando] = !0
    }, Tt.Event.prototype = {
        constructor: Tt.Event,
        isDefaultPrevented: E,
        isPropagationStopped: E,
        isImmediatePropagationStopped: E,
        isSimulated: !1,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = x, t && !this.isSimulated && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = x, t && !this.isSimulated && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = x, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, Tt.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(t) {
            var e = t.button;
            return null == t.which && ee.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && ie.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
        }
    }, Tt.event.addProp), Tt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        Tt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = this,
                    o = t.relatedTarget,
                    s = t.handleObj;
                return o && (o === n || Tt.contains(n, o)) || (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), Tt.fn.extend({
        on: function(t, e, i, n) {
            return S(this, t, e, i, n)
        },
        one: function(t, e, i, n) {
            return S(this, t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, Tt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (i = e, e = void 0), !1 === i && (i = E), this.each(function() {
                Tt.event.remove(this, t, i, e)
            })
        }
    });
    var oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        se = /<script|<style|<link/i,
        re = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ae = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    Tt.extend({
        htmlPrefilter: function(t) {
            return t.replace(oe, "<$1></$2>")
        },
        clone: function(t, e, i) {
            var n, o, s, r, a = t.cloneNode(!0),
                l = Tt.contains(t.ownerDocument, t);
            if (!(vt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || Tt.isXMLDoc(t)))
                for (r = T(a), s = T(t), n = 0, o = s.length; n < o; n++) M(s[n], r[n]);
            if (e)
                if (i)
                    for (s = s || T(t), r = r || T(a), n = 0, o = s.length; n < o; n++) I(s[n], r[n]);
                else I(t, a);
            return r = T(a, "script"), r.length > 0 && C(r, !l && T(t, "script")), a
        },
        cleanData: function(t) {
            for (var e, i, n, o = Tt.event.special, s = 0; void 0 !== (i = t[s]); s++)
                if (Ht(i)) {
                    if (e = i[Rt.expando]) {
                        if (e.events)
                            for (n in e.events) o[n] ? Tt.event.remove(i, n) : Tt.removeEvent(i, n, e.handle);
                        i[Rt.expando] = void 0
                    }
                    i[jt.expando] && (i[jt.expando] = void 0)
                }
        }
    }), Tt.fn.extend({
        detach: function(t) {
            return L(this, t, !0)
        },
        remove: function(t) {
            return L(this, t)
        },
        text: function(t) {
            return Nt(this, function(t) {
                return void 0 === t ? Tt.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                })
            }, null, t, arguments.length)
        },
        append: function() {
            return P(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    D(this, t).appendChild(t)
                }
            })
        },
        prepend: function() {
            return P(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = D(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return P(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return P(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (Tt.cleanData(T(t, !1)), t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return Tt.clone(this, t, e)
            })
        },
        html: function(t) {
            return Nt(this, function(t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                if ("string" == typeof t && !se.test(t) && !Zt[(Kt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = Tt.htmlPrefilter(t);
                    try {
                        for (; i < n; i++) e = this[i] || {}, 1 === e.nodeType && (Tt.cleanData(T(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = [];
            return P(this, arguments, function(e) {
                var i = this.parentNode;
                Tt.inArray(this, t) < 0 && (Tt.cleanData(T(this)), i && i.replaceChild(e, this))
            }, t)
        }
    }), Tt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        Tt.fn[t] = function(t) {
            for (var i, n = [], o = Tt(t), s = o.length - 1, r = 0; r <= s; r++) i = r === s ? this : this.clone(!0), Tt(o[r])[e](i), ut.apply(n, i.get());
            return this.pushStack(n)
        }
    });
    var le = new RegExp("^(" + Vt + ")(?!px)[a-z%]+$", "i"),
        ce = function(e) {
            var i = e.ownerDocument.defaultView;
            return i && i.opener || (i = t), i.getComputedStyle(e)
        },
        ue = new RegExp(qt.join("|"), "i");
    ! function() {
        function e() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", te.appendChild(l).appendChild(c);
                var e = t.getComputedStyle(c);
                n = "1%" !== e.top, a = 12 === i(e.marginLeft), c.style.right = "60%", r = 36 === i(e.right), o = 36 === i(e.width), c.style.position = "absolute", s = 36 === c.offsetWidth || "absolute", te.removeChild(l), c = null
            }
        }

        function i(t) {
            return Math.round(parseFloat(t))
        }
        var n, o, s, r, a, l = rt.createElement("div"),
            c = rt.createElement("div");
        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", vt.clearCloneStyle = "content-box" === c.style.backgroundClip, Tt.extend(vt, {
            boxSizingReliable: function() {
                return e(), o
            },
            pixelBoxStyles: function() {
                return e(), r
            },
            pixelPosition: function() {
                return e(), n
            },
            reliableMarginLeft: function() {
                return e(), a
            },
            scrollboxSize: function() {
                return e(), s
            }
        }))
    }();
    var de = /^(none|table(?!-c[ea]).+)/,
        he = /^--/,
        pe = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        fe = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ge = ["Webkit", "Moz", "ms"],
        me = rt.createElement("div").style;
    Tt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = N(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, s, r, a = f(e),
                    l = he.test(e),
                    c = t.style;
                if (l || (e = H(a)), r = Tt.cssHooks[e] || Tt.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (o = r.get(t, !1, n)) ? o : c[e];
                s = typeof i, "string" === s && (o = zt.exec(i)) && o[1] && (i = y(t, e, o), s = "number"), null != i && i === i && ("number" === s && (i += o && o[3] || (Tt.cssNumber[a] ? "" : "px")), vt.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (c[e] = "inherit"), r && "set" in r && void 0 === (i = r.set(t, i, n)) || (l ? c.setProperty(e, i) : c[e] = i))
            }
        },
        css: function(t, e, i, n) {
            var o, s, r, a = f(e);
            return he.test(e) || (e = H(a)), r = Tt.cssHooks[e] || Tt.cssHooks[a], r && "get" in r && (o = r.get(t, !0, i)), void 0 === o && (o = N(t, e, n)), "normal" === o && e in fe && (o = fe[e]), "" === i || i ? (s = parseFloat(o), !0 === i || isFinite(s) ? s || 0 : o) : o
        }
    }), Tt.each(["height", "width"], function(t, e) {
        Tt.cssHooks[e] = {
            get: function(t, i, n) {
                if (i) return !de.test(Tt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? U(t, e, n) : Yt(t, pe, function() {
                    return U(t, e, n)
                })
            },
            set: function(t, i, n) {
                var o, s = ce(t),
                    r = "border-box" === Tt.css(t, "boxSizing", !1, s),
                    a = n && j(t, e, n, r, s);
                return r && vt.scrollboxSize() === s.position && (a -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(s[e]) - j(t, e, "border", !1, s) - .5)), a && (o = zt.exec(i)) && "px" !== (o[3] || "px") && (t.style[e] = i, i = Tt.css(t, e)), R(t, i, a)
            }
        }
    }), Tt.cssHooks.marginLeft = $(vt.reliableMarginLeft, function(t, e) {
        if (e) return (parseFloat(N(t, "marginLeft")) || t.getBoundingClientRect().left - Yt(t, {
            marginLeft: 0
        }, function() {
            return t.getBoundingClientRect().left
        })) + "px"
    }), Tt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        Tt.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) o[t + qt[n] + e] = s[n] || s[n - 2] || s[0];
                return o
            }
        }, "margin" !== t && (Tt.cssHooks[t + e].set = R)
    }), Tt.fn.extend({
        css: function(t, e) {
            return Nt(this, function(t, e, i) {
                var n, o, s = {},
                    r = 0;
                if (Array.isArray(e)) {
                    for (n = ce(t), o = e.length; r < o; r++) s[e[r]] = Tt.css(t, e[r], !1, n);
                    return s
                }
                return void 0 !== i ? Tt.style(t, e, i) : Tt.css(t, e)
            }, t, e, arguments.length > 1)
        }
    }), Tt.Tween = W, W.prototype = {
        constructor: W,
        init: function(t, e, i, n, o, s) {
            this.elem = t, this.prop = i, this.easing = o || Tt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (Tt.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = W.propHooks[this.prop];
            return t && t.get ? t.get(this) : W.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = W.propHooks[this.prop];
            return this.options.duration ? this.pos = e = Tt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : W.propHooks._default.set(this), this
        }
    }, W.prototype.init.prototype = W.prototype, W.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = Tt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
            },
            set: function(t) {
                Tt.fx.step[t.prop] ? Tt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[Tt.cssProps[t.prop]] && !Tt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : Tt.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }, W.propHooks.scrollTop = W.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, Tt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    }, Tt.fx = W.prototype.init, Tt.fx.step = {};
    var ve, ye, be = /^(?:toggle|show|hide)$/,
        we = /queueHooks$/;
    Tt.Animation = Tt.extend(G, {
            tweeners: {
                "*": [function(t, e) {
                    var i = this.createTween(t, e);
                    return y(i.elem, t, zt.exec(e), i), i
                }]
            },
            tweener: function(t, e) {
                yt(t) ? (e = t, t = ["*"]) : t = t.match(Mt);
                for (var i, n = 0, o = t.length; n < o; n++) i = t[n], G.tweeners[i] = G.tweeners[i] || [], G.tweeners[i].unshift(e)
            },
            prefilters: [Y],
            prefilter: function(t, e) {
                e ? G.prefilters.unshift(t) : G.prefilters.push(t)
            }
        }), Tt.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? Tt.extend({}, t) : {
                complete: i || !i && e || yt(t) && t,
                duration: t,
                easing: i && e || e && !yt(e) && e
            };
            return Tt.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in Tt.fx.speeds ? n.duration = Tt.fx.speeds[n.duration] : n.duration = Tt.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                yt(n.old) && n.old.call(this), n.queue && Tt.dequeue(this, n.queue)
            }, n
        }, Tt.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(Bt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var o = Tt.isEmptyObject(t),
                    s = Tt.speed(e, i, n),
                    r = function() {
                        var e = G(this, Tt.extend({}, t), s);
                        (o || Rt.get(this, "finish")) && e.stop(!0)
                    };
                return r.finish = r, o || !1 === s.queue ? this.each(r) : this.queue(s.queue, r)
            },
            stop: function(t, e, i) {
                var n = function(t) {
                    var e = t.stop;
                    delete t.stop, e(i)
                };
                return "string" != typeof t && (i = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        o = null != t && t + "queueHooks",
                        s = Tt.timers,
                        r = Rt.get(this);
                    if (o) r[o] && r[o].stop && n(r[o]);
                    else
                        for (o in r) r[o] && r[o].stop && we.test(o) && n(r[o]);
                    for (o = s.length; o--;) s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(i), e = !1, s.splice(o, 1));
                    !e && i || Tt.dequeue(this, t)
                })
            },
            finish: function(t) {
                return !1 !== t && (t = t || "fx"), this.each(function() {
                    var e, i = Rt.get(this),
                        n = i[t + "queue"],
                        o = i[t + "queueHooks"],
                        s = Tt.timers,
                        r = n ? n.length : 0;
                    for (i.finish = !0, Tt.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                    for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), Tt.each(["toggle", "show", "hide"], function(t, e) {
            var i = Tt.fn[e];
            Tt.fn[e] = function(t, n, o) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(q(e, !0), t, n, o)
            }
        }), Tt.each({
            slideDown: q("show"),
            slideUp: q("hide"),
            slideToggle: q("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            Tt.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), Tt.timers = [], Tt.fx.tick = function() {
            var t, e = 0,
                i = Tt.timers;
            for (ve = Date.now(); e < i.length; e++)(t = i[e])() || i[e] !== t || i.splice(e--, 1);
            i.length || Tt.fx.stop(), ve = void 0
        }, Tt.fx.timer = function(t) {
            Tt.timers.push(t), Tt.fx.start()
        }, Tt.fx.interval = 13, Tt.fx.start = function() {
            ye || (ye = !0, V())
        }, Tt.fx.stop = function() {
            ye = null
        }, Tt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, Tt.fn.delay = function(e, i) {
            return e = Tt.fx ? Tt.fx.speeds[e] || e : e, i = i || "fx", this.queue(i, function(i, n) {
                var o = t.setTimeout(i, e);
                n.stop = function() {
                    t.clearTimeout(o)
                }
            })
        },
        function() {
            var t = rt.createElement("input"),
                e = rt.createElement("select"),
                i = e.appendChild(rt.createElement("option"));
            t.type = "checkbox", vt.checkOn = "" !== t.value, vt.optSelected = i.selected, t = rt.createElement("input"), t.value = "t", t.type = "radio", vt.radioValue = "t" === t.value
        }();
    var Te, Ce = Tt.expr.attrHandle;
    Tt.fn.extend({
        attr: function(t, e) {
            return Nt(this, Tt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                Tt.removeAttr(this, t)
            })
        }
    }), Tt.extend({
        attr: function(t, e, i) {
            var n, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return void 0 === t.getAttribute ? Tt.prop(t, e, i) : (1 === s && Tt.isXMLDoc(t) || (o = Tt.attrHooks[e.toLowerCase()] || (Tt.expr.match.bool.test(e) ? Te : void 0)), void 0 !== i ? null === i ? void Tt.removeAttr(t, e) : o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : (t.setAttribute(e, i + ""), i) : o && "get" in o && null !== (n = o.get(t, e)) ? n : (n = Tt.find.attr(t, e), null == n ? void 0 : n))
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!vt.radioValue && "radio" === e && s(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var i, n = 0,
                o = e && e.match(Mt);
            if (o && 1 === t.nodeType)
                for (; i = o[n++];) t.removeAttribute(i)
        }
    }), Te = {
        set: function(t, e, i) {
            return !1 === e ? Tt.removeAttr(t, i) : t.setAttribute(i, i), i
        }
    }, Tt.each(Tt.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = Ce[e] || Tt.find.attr;
        Ce[e] = function(t, e, n) {
            var o, s, r = e.toLowerCase();
            return n || (s = Ce[r], Ce[r] = o, o = null != i(t, e, n) ? r : null, Ce[r] = s), o
        }
    });
    var _e = /^(?:input|select|textarea|button)$/i,
        xe = /^(?:a|area)$/i;
    Tt.fn.extend({
        prop: function(t, e) {
            return Nt(this, Tt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[Tt.propFix[t] || t]
            })
        }
    }), Tt.extend({
        prop: function(t, e, i) {
            var n, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return 1 === s && Tt.isXMLDoc(t) || (e = Tt.propFix[e] || e, o = Tt.propHooks[e]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = Tt.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : _e.test(t.nodeName) || xe.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), vt.optSelected || (Tt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), Tt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        Tt.propFix[this.toLowerCase()] = this
    }), Tt.fn.extend({
        addClass: function(t) {
            var e, i, n, o, s, r, a, l = 0;
            if (yt(t)) return this.each(function(e) {
                Tt(this).addClass(t.call(this, e, Q(this)))
            });
            if (e = Z(t), e.length)
                for (; i = this[l++];)
                    if (o = Q(i), n = 1 === i.nodeType && " " + K(o) + " ") {
                        for (r = 0; s = e[r++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                        a = K(n), o !== a && i.setAttribute("class", a)
                    } return this
        },
        removeClass: function(t) {
            var e, i, n, o, s, r, a, l = 0;
            if (yt(t)) return this.each(function(e) {
                Tt(this).removeClass(t.call(this, e, Q(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if (e = Z(t), e.length)
                for (; i = this[l++];)
                    if (o = Q(i), n = 1 === i.nodeType && " " + K(o) + " ") {
                        for (r = 0; s = e[r++];)
                            for (; n.indexOf(" " + s + " ") > -1;) n = n.replace(" " + s + " ", " ");
                        a = K(n), o !== a && i.setAttribute("class", a)
                    } return this
        },
        toggleClass: function(t, e) {
            var i = typeof t,
                n = "string" === i || Array.isArray(t);
            return "boolean" == typeof e && n ? e ? this.addClass(t) : this.removeClass(t) : yt(t) ? this.each(function(i) {
                Tt(this).toggleClass(t.call(this, i, Q(this), e), e)
            }) : this.each(function() {
                var e, o, s, r;
                if (n)
                    for (o = 0, s = Tt(this), r = Z(t); e = r[o++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                else void 0 !== t && "boolean" !== i || (e = Q(this), e && Rt.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Rt.get(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, i, n = 0;
            for (e = " " + t + " "; i = this[n++];)
                if (1 === i.nodeType && (" " + K(Q(i)) + " ").indexOf(e) > -1) return !0;
            return !1
        }
    });
    var Ee = /\r/g;
    Tt.fn.extend({
        val: function(t) {
            var e, i, n, o = this[0]; {
                if (arguments.length) return n = yt(t), this.each(function(i) {
                    var o;
                    1 === this.nodeType && (o = n ? t.call(this, i, Tt(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = Tt.map(o, function(t) {
                        return null == t ? "" : t + ""
                    })), (e = Tt.valHooks[this.type] || Tt.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                });
                if (o) return (e = Tt.valHooks[o.type] || Tt.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (i = e.get(o, "value")) ? i : (i = o.value, "string" == typeof i ? i.replace(Ee, "") : null == i ? "" : i)
            }
        }
    }), Tt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = Tt.find.attr(t, "value");
                    return null != e ? e : K(Tt.text(t))
                }
            },
            select: {
                get: function(t) {
                    var e, i, n, o = t.options,
                        r = t.selectedIndex,
                        a = "select-one" === t.type,
                        l = a ? null : [],
                        c = a ? r + 1 : o.length;
                    for (n = r < 0 ? c : a ? r : 0; n < c; n++)
                        if (i = o[n], (i.selected || n === r) && !i.disabled && (!i.parentNode.disabled || !s(i.parentNode, "optgroup"))) {
                            if (e = Tt(i).val(), a) return e;
                            l.push(e)
                        } return l
                },
                set: function(t, e) {
                    for (var i, n, o = t.options, s = Tt.makeArray(e), r = o.length; r--;) n = o[r], (n.selected = Tt.inArray(Tt.valHooks.option.get(n), s) > -1) && (i = !0);
                    return i || (t.selectedIndex = -1), s
                }
            }
        }
    }), Tt.each(["radio", "checkbox"], function() {
        Tt.valHooks[this] = {
            set: function(t, e) {
                if (Array.isArray(e)) return t.checked = Tt.inArray(Tt(t).val(), e) > -1
            }
        }, vt.checkOn || (Tt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    }), vt.focusin = "onfocusin" in t;
    var ke = /^(?:focusinfocus|focusoutblur)$/,
        Se = function(t) {
            t.stopPropagation()
        };
    Tt.extend(Tt.event, {
        trigger: function(e, i, n, o) {
            var s, r, a, l, c, u, d, h, p = [n || rt],
                f = ft.call(e, "type") ? e.type : e,
                g = ft.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = h = a = n = n || rt, 3 !== n.nodeType && 8 !== n.nodeType && !ke.test(f + Tt.event.triggered) && (f.indexOf(".") > -1 && (g = f.split("."), f = g.shift(), g.sort()), c = f.indexOf(":") < 0 && "on" + f, e = e[Tt.expando] ? e : new Tt.Event(f, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = g.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : Tt.makeArray(i, [e]), d = Tt.event.special[f] || {}, o || !d.trigger || !1 !== d.trigger.apply(n, i))) {
                if (!o && !d.noBubble && !bt(n)) {
                    for (l = d.delegateType || f, ke.test(l + f) || (r = r.parentNode); r; r = r.parentNode) p.push(r), a = r;
                    a === (n.ownerDocument || rt) && p.push(a.defaultView || a.parentWindow || t)
                }
                for (s = 0;
                    (r = p[s++]) && !e.isPropagationStopped();) h = r, e.type = s > 1 ? l : d.bindType || f, u = (Rt.get(r, "events") || {})[e.type] && Rt.get(r, "handle"), u && u.apply(r, i), (u = c && r[c]) && u.apply && Ht(r) && (e.result = u.apply(r, i), !1 === e.result && e.preventDefault());
                return e.type = f, o || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(p.pop(), i) || !Ht(n) || c && yt(n[f]) && !bt(n) && (a = n[c], a && (n[c] = null), Tt.event.triggered = f, e.isPropagationStopped() && h.addEventListener(f, Se), n[f](), e.isPropagationStopped() && h.removeEventListener(f, Se), Tt.event.triggered = void 0, a && (n[c] = a)), e.result
            }
        },
        simulate: function(t, e, i) {
            var n = Tt.extend(new Tt.Event, i, {
                type: t,
                isSimulated: !0
            });
            Tt.event.trigger(n, null, e)
        }
    }), Tt.fn.extend({
        trigger: function(t, e) {
            return this.each(function() {
                Tt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            if (i) return Tt.event.trigger(t, e, i, !0)
        }
    }), vt.focusin || Tt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            Tt.event.simulate(e, t.target, Tt.event.fix(t))
        };
        Tt.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    o = Rt.access(n, e);
                o || n.addEventListener(t, i, !0), Rt.access(n, e, (o || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    o = Rt.access(n, e) - 1;
                o ? Rt.access(n, e, o) : (n.removeEventListener(t, i, !0), Rt.remove(n, e))
            }
        }
    });
    var De = t.location,
        Ae = Date.now(),
        Oe = /\?/;
    Tt.parseXML = function(e) {
        var i;
        if (!e || "string" != typeof e) return null;
        try {
            i = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (t) {
            i = void 0
        }
        return i && !i.getElementsByTagName("parsererror").length || Tt.error("Invalid XML: " + e), i
    };
    var Ie = /\[\]$/,
        Me = /\r?\n/g,
        Pe = /^(?:submit|button|image|reset|file)$/i,
        Le = /^(?:input|select|textarea|keygen)/i;
    Tt.param = function(t, e) {
        var i, n = [],
            o = function(t, e) {
                var i = yt(e) ? e() : e;
                n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
            };
        if (Array.isArray(t) || t.jquery && !Tt.isPlainObject(t)) Tt.each(t, function() {
            o(this.name, this.value)
        });
        else
            for (i in t) J(i, t[i], e, o);
        return n.join("&")
    }, Tt.fn.extend({
        serialize: function() {
            return Tt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = Tt.prop(this, "elements");
                return t ? Tt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !Tt(this).is(":disabled") && Le.test(this.nodeName) && !Pe.test(t) && (this.checked || !Gt.test(t))
            }).map(function(t, e) {
                var i = Tt(this).val();
                return null == i ? null : Array.isArray(i) ? Tt.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Me, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Me, "\r\n")
                }
            }).get()
        }
    });
    var Ne = /%20/g,
        $e = /#.*$/,
        Fe = /([?&])_=[^&]*/,
        He = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Re = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        je = /^(?:GET|HEAD)$/,
        Ue = /^\/\//,
        We = {},
        Ve = {},
        ze = "*/".concat("*"),
        qe = rt.createElement("a");
    qe.href = De.href, Tt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: De.href,
            type: "GET",
            isLocal: Re.test(De.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ze,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": Tt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? it(it(t, Tt.ajaxSettings), e) : it(Tt.ajaxSettings, t)
        },
        ajaxPrefilter: tt(We),
        ajaxTransport: tt(Ve),
        ajax: function(e, i) {
            function n(e, i, n, a) {
                var c, h, p, w, T, C = i;
                u || (u = !0, l && t.clearTimeout(l), o = void 0, r = a || "", _.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, n && (w = nt(f, _, n)), w = ot(f, w, _, c), c ? (f.ifModified && (T = _.getResponseHeader("Last-Modified"), T && (Tt.lastModified[s] = T), (T = _.getResponseHeader("etag")) && (Tt.etag[s] = T)), 204 === e || "HEAD" === f.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = w.state, h = w.data, p = w.error, c = !p)) : (p = C, !e && C || (C = "error", e < 0 && (e = 0))), _.status = e, _.statusText = (i || C) + "", c ? v.resolveWith(g, [h, C, _]) : v.rejectWith(g, [_, C, p]), _.statusCode(b), b = void 0, d && m.trigger(c ? "ajaxSuccess" : "ajaxError", [_, f, c ? h : p]), y.fireWith(g, [_, C]), d && (m.trigger("ajaxComplete", [_, f]), --Tt.active || Tt.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (i = e, e = void 0), i = i || {};
            var o, s, r, a, l, c, u, d, h, p, f = Tt.ajaxSetup({}, i),
                g = f.context || f,
                m = f.context && (g.nodeType || g.jquery) ? Tt(g) : Tt.event,
                v = Tt.Deferred(),
                y = Tt.Callbacks("once memory"),
                b = f.statusCode || {},
                w = {},
                T = {},
                C = "canceled",
                _ = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (u) {
                            if (!a)
                                for (a = {}; e = He.exec(r);) a[e[1].toLowerCase()] = e[2];
                            e = a[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return u ? r : null
                    },
                    setRequestHeader: function(t, e) {
                        return null == u && (t = T[t.toLowerCase()] = T[t.toLowerCase()] || t, w[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return null == u && (f.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (u) _.always(t[_.status]);
                            else
                                for (e in t) b[e] = [b[e], t[e]];
                        return this
                    },
                    abort: function(t) {
                        var e = t || C;
                        return o && o.abort(e), n(0, e), this
                    }
                };
            if (v.promise(_), f.url = ((e || f.url || De.href) + "").replace(Ue, De.protocol + "//"), f.type = i.method || i.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(Mt) || [""], null == f.crossDomain) {
                c = rt.createElement("a");
                try {
                    c.href = f.url, c.href = c.href, f.crossDomain = qe.protocol + "//" + qe.host != c.protocol + "//" + c.host
                } catch (t) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = Tt.param(f.data, f.traditional)), et(We, f, i, _), u) return _;
            d = Tt.event && f.global, d && 0 == Tt.active++ && Tt.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !je.test(f.type), s = f.url.replace($e, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Ne, "+")) : (p = f.url.slice(s.length), f.data && (f.processData || "string" == typeof f.data) && (s += (Oe.test(s) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (s = s.replace(Fe, "$1"), p = (Oe.test(s) ? "&" : "?") + "_=" + Ae++ + p), f.url = s + p), f.ifModified && (Tt.lastModified[s] && _.setRequestHeader("If-Modified-Since", Tt.lastModified[s]), Tt.etag[s] && _.setRequestHeader("If-None-Match", Tt.etag[s])), (f.data && f.hasContent && !1 !== f.contentType || i.contentType) && _.setRequestHeader("Content-Type", f.contentType), _.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + ze + "; q=0.01" : "") : f.accepts["*"]);
            for (h in f.headers) _.setRequestHeader(h, f.headers[h]);
            if (f.beforeSend && (!1 === f.beforeSend.call(g, _, f) || u)) return _.abort();
            if (C = "abort", y.add(f.complete), _.done(f.success), _.fail(f.error), o = et(Ve, f, i, _)) {
                if (_.readyState = 1, d && m.trigger("ajaxSend", [_, f]), u) return _;
                f.async && f.timeout > 0 && (l = t.setTimeout(function() {
                    _.abort("timeout")
                }, f.timeout));
                try {
                    u = !1, o.send(w, n)
                } catch (t) {
                    if (u) throw t;
                    n(-1, t)
                }
            } else n(-1, "No Transport");
            return _
        },
        getJSON: function(t, e, i) {
            return Tt.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return Tt.get(t, void 0, e, "script")
        }
    }), Tt.each(["get", "post"], function(t, e) {
        Tt[e] = function(t, i, n, o) {
            return yt(i) && (o = o || n, n = i, i = void 0), Tt.ajax(Tt.extend({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
            }, Tt.isPlainObject(t) && t))
        }
    }), Tt._evalUrl = function(t) {
        return Tt.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, Tt.fn.extend({
        wrapAll: function(t) {
            var e;
            return this[0] && (yt(t) && (t = t.call(this[0])), e = Tt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                return t
            }).append(this)), this
        },
        wrapInner: function(t) {
            return yt(t) ? this.each(function(e) {
                Tt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = Tt(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = yt(t);
            return this.each(function(i) {
                Tt(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function(t) {
            return this.parent(t).not("body").each(function() {
                Tt(this).replaceWith(this.childNodes)
            }), this
        }
    }), Tt.expr.pseudos.hidden = function(t) {
        return !Tt.expr.pseudos.visible(t)
    }, Tt.expr.pseudos.visible = function(t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
    }, Tt.ajaxSettings.xhr = function() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    };
    var Be = {
            0: 200,
            1223: 204
        },
        Ye = Tt.ajaxSettings.xhr();
    vt.cors = !!Ye && "withCredentials" in Ye, vt.ajax = Ye = !!Ye, Tt.ajaxTransport(function(e) {
        var i, n;
        if (vt.cors || Ye && !e.crossDomain) return {
            send: function(o, s) {
                var r, a = e.xhr();
                if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (r in e.xhrFields) a[r] = e.xhrFields[r];
                e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                for (r in o) a.setRequestHeader(r, o[r]);
                i = function(t) {
                    return function() {
                        i && (i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(Be[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = i(), n = a.onerror = a.ontimeout = i("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                    4 === a.readyState && t.setTimeout(function() {
                        i && n()
                    })
                }, i = i("abort");
                try {
                    a.send(e.hasContent && e.data || null)
                } catch (t) {
                    if (i) throw t
                }
            },
            abort: function() {
                i && i()
            }
        }
    }), Tt.ajaxPrefilter(function(t) {
        t.crossDomain && (t.contents.script = !1)
    }), Tt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return Tt.globalEval(t), t
            }
        }
    }), Tt.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), Tt.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, i;
            return {
                send: function(n, o) {
                    e = Tt("<script>").prop({
                        charset: t.scriptCharset,
                        src: t.url
                    }).on("load error", i = function(t) {
                        e.remove(), i = null, t && o("error" === t.type ? 404 : 200, t.type)
                    }), rt.head.appendChild(e[0])
                },
                abort: function() {
                    i && i()
                }
            }
        }
    });
    var Xe = [],
        Ge = /(=)\?(?=&|$)|\?\?/;
    Tt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Xe.pop() || Tt.expando + "_" + Ae++;
            return this[t] = !0, t
        }
    }), Tt.ajaxPrefilter("json jsonp", function(e, i, n) {
        var o, s, r, a = !1 !== e.jsonp && (Ge.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ge.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = yt(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ge, "$1" + o) : !1 !== e.jsonp && (e.url += (Oe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
            return r || Tt.error(o + " was not called"), r[0]
        }, e.dataTypes[0] = "json", s = t[o], t[o] = function() {
            r = arguments
        }, n.always(function() {
            void 0 === s ? Tt(t).removeProp(o) : t[o] = s, e[o] && (e.jsonpCallback = i.jsonpCallback, Xe.push(o)), r && yt(s) && s(r[0]), r = s = void 0
        }), "script"
    }), vt.createHTMLDocument = function() {
        var t = rt.implementation.createHTMLDocument("").body;
        return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length
    }(), Tt.parseHTML = function(t, e, i) {
        if ("string" != typeof t) return [];
        "boolean" == typeof e && (i = e, e = !1);
        var n, o, s;
        return e || (vt.createHTMLDocument ? (e = rt.implementation.createHTMLDocument(""), n = e.createElement("base"), n.href = rt.location.href, e.head.appendChild(n)) : e = rt), o = St.exec(t), s = !i && [], o ? [e.createElement(o[1])] : (o = _([t], e, s), s && s.length && Tt(s).remove(), Tt.merge([], o.childNodes))
    }, Tt.fn.load = function(t, e, i) {
        var n, o, s, r = this,
            a = t.indexOf(" ");
        return a > -1 && (n = K(t.slice(a)), t = t.slice(0, a)), yt(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), r.length > 0 && Tt.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            s = arguments, r.html(n ? Tt("<div>").append(Tt.parseHTML(t)).find(n) : t)
        }).always(i && function(t, e) {
            r.each(function() {
                i.apply(this, s || [t.responseText, e, t])
            })
        }), this
    }, Tt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        Tt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), Tt.expr.pseudos.animated = function(t) {
        return Tt.grep(Tt.timers, function(e) {
            return t === e.elem
        }).length
    }, Tt.offset = {
        setOffset: function(t, e, i) {
            var n, o, s, r, a, l, c, u = Tt.css(t, "position"),
                d = Tt(t),
                h = {};
            "static" === u && (t.style.position = "relative"), a = d.offset(), s = Tt.css(t, "top"), l = Tt.css(t, "left"), c = ("absolute" === u || "fixed" === u) && (s + l).indexOf("auto") > -1, c ? (n = d.position(), r = n.top, o = n.left) : (r = parseFloat(s) || 0, o = parseFloat(l) || 0), yt(e) && (e = e.call(t, i, Tt.extend({}, a))), null != e.top && (h.top = e.top - a.top + r), null != e.left && (h.left = e.left - a.left + o), "using" in e ? e.using.call(t, h) : d.css(h)
        }
    }, Tt.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                Tt.offset.setOffset(this, t, e)
            });
            var e, i, n = this[0];
            if (n) return n.getClientRects().length ? (e = n.getBoundingClientRect(), i = n.ownerDocument.defaultView, {
                top: e.top + i.pageYOffset,
                left: e.left + i.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var t, e, i, n = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === Tt.css(n, "position")) e = n.getBoundingClientRect();
                else {
                    for (e = this.offset(), i = n.ownerDocument, t = n.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && "static" === Tt.css(t, "position");) t = t.parentNode;
                    t && t !== n && 1 === t.nodeType && (o = Tt(t).offset(), o.top += Tt.css(t, "borderTopWidth", !0), o.left += Tt.css(t, "borderLeftWidth", !0))
                }
                return {
                    top: e.top - o.top - Tt.css(n, "marginTop", !0),
                    left: e.left - o.left - Tt.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && "static" === Tt.css(t, "position");) t = t.offsetParent;
                return t || te
            })
        }
    }), Tt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = "pageYOffset" === e;
        Tt.fn[t] = function(n) {
            return Nt(this, function(t, n, o) {
                var s;
                if (bt(t) ? s = t : 9 === t.nodeType && (s = t.defaultView), void 0 === o) return s ? s[e] : t[n];
                s ? s.scrollTo(i ? s.pageXOffset : o, i ? o : s.pageYOffset) : t[n] = o
            }, t, n, arguments.length)
        }
    }), Tt.each(["top", "left"], function(t, e) {
        Tt.cssHooks[e] = $(vt.pixelPosition, function(t, i) {
            if (i) return i = N(t, e), le.test(i) ? Tt(t).position()[e] + "px" : i
        })
    }), Tt.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        Tt.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            Tt.fn[n] = function(o, s) {
                var r = arguments.length && (i || "boolean" != typeof o),
                    a = i || (!0 === o || !0 === s ? "margin" : "border");
                return Nt(this, function(e, i, o) {
                    var s;
                    return bt(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === o ? Tt.css(e, i, a) : Tt.style(e, i, o, a)
                }, e, r ? o : void 0, r)
            }
        })
    }), Tt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
        Tt.fn[e] = function(t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), Tt.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    }), Tt.fn.extend({
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    }), Tt.proxy = function(t, e) {
        var i, n, o;
        if ("string" == typeof e && (i = t[e], e = t, t = i), yt(t)) return n = lt.call(arguments, 2), o = function() {
            return t.apply(e || this, n.concat(lt.call(arguments)))
        }, o.guid = t.guid = t.guid || Tt.guid++, o
    }, Tt.holdReady = function(t) {
        t ? Tt.readyWait++ : Tt.ready(!0)
    }, Tt.isArray = Array.isArray, Tt.parseJSON = JSON.parse, Tt.nodeName = s, Tt.isFunction = yt, Tt.isWindow = bt, Tt.camelCase = f, Tt.type = n, Tt.now = Date.now, Tt.isNumeric = function(t) {
        var e = Tt.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return Tt
    });
    var Ke = t.jQuery,
        Qe = t.$;
    return Tt.noConflict = function(e) {
        return t.$ === Tt && (t.$ = Qe), e && t.jQuery === Tt && (t.jQuery = Ke), Tt
    }, e || (t.jQuery = t.$ = Tt), Tt
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
    "use strict";

    function t(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function e(t, e) {
        if (1 !== t.nodeType) return [];
        var i = getComputedStyle(t, null);
        return e ? i[e] : i
    }

    function i(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function n(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var o = e(t),
            s = o.overflow,
            r = o.overflowX;
        return /(auto|scroll|overlay)/.test(s + o.overflowY + r) ? t : n(i(t))
    }

    function o(t) {
        return 11 === t ? st : 10 === t ? rt : st || rt
    }

    function s(t) {
        if (!t) return document.documentElement;
        for (var i = o(10) ? document.body : null, n = t.offsetParent; n === i && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
        var r = n && n.nodeName;
        return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) && "static" === e(n, "position") ? s(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function r(t) {
        var e = t.nodeName;
        return "BODY" !== e && ("HTML" === e || s(t.firstElementChild) === t)
    }

    function a(t) {
        return null === t.parentNode ? t : a(t.parentNode)
    }

    function l(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = i ? t : e,
            o = i ? e : t,
            c = document.createRange();
        c.setStart(n, 0), c.setEnd(o, 0);
        var u = c.commonAncestorContainer;
        if (t !== u && e !== u || n.contains(o)) return r(u) ? u : s(u);
        var d = a(t);
        return d.host ? l(d.host, e) : l(t, a(e).host)
    }

    function c(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            i = "top" === e ? "scrollTop" : "scrollLeft",
            n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var o = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || o)[i]
        }
        return t[i]
    }

    function u(t, e) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = c(e, "top"),
            o = c(e, "left"),
            s = i ? -1 : 1;
        return t.top += n * s, t.bottom += n * s, t.left += o * s, t.right += o * s, t
    }

    function d(t, e) {
        var i = "x" === e ? "Left" : "Top",
            n = "Left" == i ? "Right" : "Bottom";
        return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10)
    }

    function h(t, e, i, n) {
        return Z(e["offset" + t], e["scroll" + t], i["client" + t], i["offset" + t], i["scroll" + t], o(10) ? parseInt(i["offset" + t]) + parseInt(n["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function p(t) {
        var e = t.body,
            i = t.documentElement,
            n = o(10) && getComputedStyle(i);
        return {
            height: h("Height", e, i, n),
            width: h("Width", e, i, n)
        }
    }

    function f(t) {
        return ut({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function g(t) {
        var i = {};
        try {
            if (o(10)) {
                i = t.getBoundingClientRect();
                var n = c(t, "top"),
                    s = c(t, "left");
                i.top += n, i.left += s, i.bottom += n, i.right += s
            } else i = t.getBoundingClientRect()
        } catch (t) {}
        var r = {
                left: i.left,
                top: i.top,
                width: i.right - i.left,
                height: i.bottom - i.top
            },
            a = "HTML" === t.nodeName ? p(t.ownerDocument) : {},
            l = a.width || t.clientWidth || r.right - r.left,
            u = a.height || t.clientHeight || r.bottom - r.top,
            h = t.offsetWidth - l,
            g = t.offsetHeight - u;
        if (h || g) {
            var m = e(t);
            h -= d(m, "x"), g -= d(m, "y"), r.width -= h, r.height -= g
        }
        return f(r)
    }

    function m(t, i) {
        var s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            r = o(10),
            a = "HTML" === i.nodeName,
            l = g(t),
            c = g(i),
            d = n(t),
            h = e(i),
            p = parseFloat(h.borderTopWidth, 10),
            m = parseFloat(h.borderLeftWidth, 10);
        s && a && (c.top = Z(c.top, 0), c.left = Z(c.left, 0));
        var v = f({
            top: l.top - c.top - p,
            left: l.left - c.left - m,
            width: l.width,
            height: l.height
        });
        if (v.marginTop = 0, v.marginLeft = 0, !r && a) {
            var y = parseFloat(h.marginTop, 10),
                b = parseFloat(h.marginLeft, 10);
            v.top -= p - y, v.bottom -= p - y, v.left -= m - b, v.right -= m - b, v.marginTop = y, v.marginLeft = b
        }
        return (r && !s ? i.contains(d) : i === d && "BODY" !== d.nodeName) && (v = u(v, i)), v
    }

    function v(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            i = t.ownerDocument.documentElement,
            n = m(t, i),
            o = Z(i.clientWidth, window.innerWidth || 0),
            s = Z(i.clientHeight, window.innerHeight || 0),
            r = e ? 0 : c(i),
            a = e ? 0 : c(i, "left");
        return f({
            top: r - n.top + n.marginTop,
            left: a - n.left + n.marginLeft,
            width: o,
            height: s
        })
    }

    function y(t) {
        var n = t.nodeName;
        return "BODY" !== n && "HTML" !== n && ("fixed" === e(t, "position") || y(i(t)))
    }

    function b(t) {
        if (!t || !t.parentElement || o()) return document.documentElement;
        for (var i = t.parentElement; i && "none" === e(i, "transform");) i = i.parentElement;
        return i || document.documentElement
    }

    function w(t, e, o, s) {
        var r = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            a = {
                top: 0,
                left: 0
            },
            c = r ? b(t) : l(t, e);
        if ("viewport" === s) a = v(c, r);
        else {
            var u;
            "scrollParent" === s ? (u = n(i(e)), "BODY" === u.nodeName && (u = t.ownerDocument.documentElement)) : u = "window" === s ? t.ownerDocument.documentElement : s;
            var d = m(u, c, r);
            if ("HTML" !== u.nodeName || y(c)) a = d;
            else {
                var h = p(t.ownerDocument),
                    f = h.height,
                    g = h.width;
                a.top += d.top - d.marginTop, a.bottom = f + d.top, a.left += d.left - d.marginLeft, a.right = g + d.left
            }
        }
        o = o || 0;
        var w = "number" == typeof o;
        return a.left += w ? o : o.left || 0, a.top += w ? o : o.top || 0, a.right -= w ? o : o.right || 0, a.bottom -= w ? o : o.bottom || 0, a
    }

    function T(t) {
        return t.width * t.height
    }

    function C(t, e, i, n, o) {
        var s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var r = w(i, n, s, o),
            a = {
                top: {
                    width: r.width,
                    height: e.top - r.top
                },
                right: {
                    width: r.right - e.right,
                    height: r.height
                },
                bottom: {
                    width: r.width,
                    height: r.bottom - e.bottom
                },
                left: {
                    width: e.left - r.left,
                    height: r.height
                }
            },
            l = Object.keys(a).map(function(t) {
                return ut({
                    key: t
                }, a[t], {
                    area: T(a[t])
                })
            }).sort(function(t, e) {
                return e.area - t.area
            }),
            c = l.filter(function(t) {
                var e = t.width,
                    n = t.height;
                return e >= i.clientWidth && n >= i.clientHeight
            }),
            u = 0 < c.length ? c[0].key : l[0].key,
            d = t.split("-")[1];
        return u + (d ? "-" + d : "")
    }

    function _(t, e, i) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return m(i, n ? b(e) : l(e, i), n)
    }

    function x(t) {
        var e = getComputedStyle(t),
            i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
        return {
            width: t.offsetWidth + n,
            height: t.offsetHeight + i
        }
    }

    function E(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }

    function k(t, e, i) {
        i = i.split("-")[0];
        var n = x(t),
            o = {
                width: n.width,
                height: n.height
            },
            s = -1 !== ["right", "left"].indexOf(i),
            r = s ? "top" : "left",
            a = s ? "left" : "top",
            l = s ? "height" : "width",
            c = s ? "width" : "height";
        return o[r] = e[r] + e[l] / 2 - n[l] / 2, o[a] = i === a ? e[a] - n[c] : e[E(a)], o
    }

    function S(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function D(t, e, i) {
        if (Array.prototype.findIndex) return t.findIndex(function(t) {
            return t[e] === i
        });
        var n = S(t, function(t) {
            return t[e] === i
        });
        return t.indexOf(n)
    }

    function A(e, i, n) {
        return (void 0 === n ? e : e.slice(0, D(e, "name", n))).forEach(function(e) {
            e.function;
            var n = e.function || e.fn;
            e.enabled && t(n) && (i.offsets.popper = f(i.offsets.popper), i.offsets.reference = f(i.offsets.reference), i = n(i, e))
        }), i
    }

    function O() {
        if (!this.state.isDestroyed) {
            var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            t.offsets.reference = _(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = C(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = k(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = A(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
        }
    }

    function I(t, e) {
        return t.some(function(t) {
            var i = t.name;
            return t.enabled && i === e
        })
    }

    function M(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length; n++) {
            var o = e[n],
                s = o ? "" + o + i : t;
            if (void 0 !== document.body.style[s]) return s
        }
        return null
    }

    function P() {
        return this.state.isDestroyed = !0, I(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[M("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function L(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function N(t, e, i, o) {
        var s = "BODY" === t.nodeName,
            r = s ? t.ownerDocument.defaultView : t;
        r.addEventListener(e, i, {
            passive: !0
        }), s || N(n(r.parentNode), e, i, o), o.push(r)
    }

    function $(t, e, i, o) {
        i.updateBound = o, L(t).addEventListener("resize", i.updateBound, {
            passive: !0
        });
        var s = n(t);
        return N(s, "scroll", i.updateBound, i.scrollParents), i.scrollElement = s, i.eventsEnabled = !0, i
    }

    function F() {
        this.state.eventsEnabled || (this.state = $(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function H(t, e) {
        return L(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e
    }

    function R() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = H(this.reference, this.state))
    }

    function j(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function U(t, e) {
        Object.keys(e).forEach(function(i) {
            var n = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && j(e[i]) && (n = "px"), t.style[i] = e[i] + n
        })
    }

    function W(t, e) {
        Object.keys(e).forEach(function(i) {
            !1 === e[i] ? t.removeAttribute(i) : t.setAttribute(i, e[i])
        })
    }

    function V(t, e, i) {
        var n = S(t, function(t) {
                return t.name === e
            }),
            o = !!n && t.some(function(t) {
                return t.name === i && t.enabled && t.order < n.order
            });
        if (!o);
        return o
    }

    function z(t) {
        return "end" === t ? "start" : "start" === t ? "end" : t
    }

    function q(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            i = ht.indexOf(t),
            n = ht.slice(i + 1).concat(ht.slice(0, i));
        return e ? n.reverse() : n
    }

    function B(t, e, i, n) {
        var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            s = +o[1],
            r = o[2];
        if (!s) return t;
        if (0 === r.indexOf("%")) {
            var a;
            switch (r) {
                case "%p":
                    a = i;
                    break;
                case "%":
                case "%r":
                default:
                    a = n
            }
            return f(a)[e] / 100 * s
        }
        if ("vh" === r || "vw" === r) {
            return ("vh" === r ? Z(document.documentElement.clientHeight, window.innerHeight || 0) : Z(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s
        }
        return s
    }

    function Y(t, e, i, n) {
        var o = [0, 0],
            s = -1 !== ["right", "left"].indexOf(n),
            r = t.split(/(\+|\-)/).map(function(t) {
                return t.trim()
            }),
            a = r.indexOf(S(r, function(t) {
                return -1 !== t.search(/,|\s/)
            }));
        r[a] && r[a].indexOf(",");
        var l = /\s*,\s*|\s+/,
            c = -1 === a ? [r] : [r.slice(0, a).concat([r[a].split(l)[0]]), [r[a].split(l)[1]].concat(r.slice(a + 1))];
        return c = c.map(function(t, n) {
            var o = (1 === n ? !s : s) ? "height" : "width",
                r = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, r = !0, t) : r ? (t[t.length - 1] += e, r = !1, t) : t.concat(e)
            }, []).map(function(t) {
                return B(t, o, e, i)
            })
        }), c.forEach(function(t, e) {
            t.forEach(function(i, n) {
                j(i) && (o[e] += i * ("-" === t[n - 1] ? -1 : 1))
            })
        }), o
    }

    function X(t, e) {
        var i, n = e.offset,
            o = t.placement,
            s = t.offsets,
            r = s.popper,
            a = s.reference,
            l = o.split("-")[0];
        return i = j(+n) ? [+n, 0] : Y(n, r, a, l), "left" === l ? (r.top += i[0], r.left -= i[1]) : "right" === l ? (r.top += i[0], r.left += i[1]) : "top" === l ? (r.left += i[0], r.top -= i[1]) : "bottom" === l && (r.left += i[0], r.top += i[1]), t.popper = r, t
    }
    for (var G = Math.min, K = Math.round, Q = Math.floor, Z = Math.max, J = "undefined" != typeof window && "undefined" != typeof document, tt = ["Edge", "Trident", "Firefox"], et = 0, it = 0; it < tt.length; it += 1)
        if (J && 0 <= navigator.userAgent.indexOf(tt[it])) {
            et = 1;
            break
        } var nt = J && window.Promise,
        ot = nt ? function(t) {
            var e = !1;
            return function() {
                e || (e = !0, window.Promise.resolve().then(function() {
                    e = !1, t()
                }))
            }
        } : function(t) {
            var e = !1;
            return function() {
                e || (e = !0, setTimeout(function() {
                    e = !1, t()
                }, et))
            }
        },
        st = J && !(!window.MSInputMethodContext || !document.documentMode),
        rt = J && /MSIE 10/.test(navigator.userAgent),
        at = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        lt = function() {
            function t(t, e) {
                for (var i, n = 0; n < e.length; n++) i = e[n], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        ct = function(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        },
        ut = Object.assign || function(t) {
            for (var e, i = 1; i < arguments.length; i++)
                for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t
        },
        dt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        ht = dt.slice(3),
        pt = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        ft = function() {
            function e(i, n) {
                var o = this,
                    s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                at(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(o.update)
                }, this.update = ot(this.update.bind(this)), this.options = ut({}, e.Defaults, s), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = i && i.jquery ? i[0] : i, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(ut({}, e.Defaults.modifiers, s.modifiers)).forEach(function(t) {
                    o.options.modifiers[t] = ut({}, e.Defaults.modifiers[t] || {}, s.modifiers ? s.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return ut({
                        name: t
                    }, o.options.modifiers[t])
                }).sort(function(t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && t(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return lt(e, [{
                key: "update",
                value: function() {
                    return O.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return P.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return F.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return R.call(this)
                }
            }]), e
        }();
    return ft.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ft.placements = dt, ft.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var e = t.placement,
                        i = e.split("-")[0],
                        n = e.split("-")[1];
                    if (n) {
                        var o = t.offsets,
                            s = o.reference,
                            r = o.popper,
                            a = -1 !== ["bottom", "top"].indexOf(i),
                            l = a ? "left" : "top",
                            c = a ? "width" : "height",
                            u = {
                                start: ct({}, l, s[l]),
                                end: ct({}, l, s[l] + s[c] - r[c])
                            };
                        t.offsets.popper = ut({}, r, u[n])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: X,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, e) {
                    var i = e.boundariesElement || s(t.instance.popper);
                    t.instance.reference === i && (i = s(i));
                    var n = M("transform"),
                        o = t.instance.popper.style,
                        r = o.top,
                        a = o.left,
                        l = o[n];
                    o.top = "", o.left = "", o[n] = "";
                    var c = w(t.instance.popper, t.instance.reference, e.padding, i, t.positionFixed);
                    o.top = r, o.left = a, o[n] = l, e.boundaries = c;
                    var u = e.priority,
                        d = t.offsets.popper,
                        h = {
                            primary: function(t) {
                                var i = d[t];
                                return d[t] < c[t] && !e.escapeWithReference && (i = Z(d[t], c[t])), ct({}, t, i)
                            },
                            secondary: function(t) {
                                var i = "right" === t ? "left" : "top",
                                    n = d[i];
                                return d[t] > c[t] && !e.escapeWithReference && (n = G(d[i], c[t] - ("right" === t ? d.width : d.height))), ct({}, i, n)
                            }
                        };
                    return u.forEach(function(t) {
                        var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        d = ut({}, d, h[e](t))
                    }), t.offsets.popper = d, t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(t) {
                    var e = t.offsets,
                        i = e.popper,
                        n = e.reference,
                        o = t.placement.split("-")[0],
                        s = Q,
                        r = -1 !== ["top", "bottom"].indexOf(o),
                        a = r ? "right" : "bottom",
                        l = r ? "left" : "top",
                        c = r ? "width" : "height";
                    return i[a] < s(n[l]) && (t.offsets.popper[l] = s(n[l]) - i[c]), i[l] > s(n[a]) && (t.offsets.popper[l] = s(n[a])), t
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(t, i) {
                    var n;
                    if (!V(t.instance.modifiers, "arrow", "keepTogether")) return t;
                    var o = i.element;
                    if ("string" == typeof o) {
                        if (!(o = t.instance.popper.querySelector(o))) return t
                    } else if (!t.instance.popper.contains(o)) return t;
                    var s = t.placement.split("-")[0],
                        r = t.offsets,
                        a = r.popper,
                        l = r.reference,
                        c = -1 !== ["left", "right"].indexOf(s),
                        u = c ? "height" : "width",
                        d = c ? "Top" : "Left",
                        h = d.toLowerCase(),
                        p = c ? "left" : "top",
                        g = c ? "bottom" : "right",
                        m = x(o)[u];
                    l[g] - m < a[h] && (t.offsets.popper[h] -= a[h] - (l[g] - m)), l[h] + m > a[g] && (t.offsets.popper[h] += l[h] + m - a[g]), t.offsets.popper = f(t.offsets.popper);
                    var v = l[h] + l[u] / 2 - m / 2,
                        y = e(t.instance.popper),
                        b = parseFloat(y["margin" + d], 10),
                        w = parseFloat(y["border" + d + "Width"], 10),
                        T = v - t.offsets.popper[h] - b - w;
                    return T = Z(G(a[u] - m, T), 0), t.arrowElement = o, t.offsets.arrow = (n = {}, ct(n, h, K(T)), ct(n, p, ""), n), t
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, e) {
                    if (I(t.instance.modifiers, "inner")) return t;
                    if (t.flipped && t.placement === t.originalPlacement) return t;
                    var i = w(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                        n = t.placement.split("-")[0],
                        o = E(n),
                        s = t.placement.split("-")[1] || "",
                        r = [];
                    switch (e.behavior) {
                        case pt.FLIP:
                            r = [n, o];
                            break;
                        case pt.CLOCKWISE:
                            r = q(n);
                            break;
                        case pt.COUNTERCLOCKWISE:
                            r = q(n, !0);
                            break;
                        default:
                            r = e.behavior
                    }
                    return r.forEach(function(a, l) {
                        if (n !== a || r.length === l + 1) return t;
                        n = t.placement.split("-")[0], o = E(n);
                        var c = t.offsets.popper,
                            u = t.offsets.reference,
                            d = Q,
                            h = "left" === n && d(c.right) > d(u.left) || "right" === n && d(c.left) < d(u.right) || "top" === n && d(c.bottom) > d(u.top) || "bottom" === n && d(c.top) < d(u.bottom),
                            p = d(c.left) < d(i.left),
                            f = d(c.right) > d(i.right),
                            g = d(c.top) < d(i.top),
                            m = d(c.bottom) > d(i.bottom),
                            v = "left" === n && p || "right" === n && f || "top" === n && g || "bottom" === n && m,
                            y = -1 !== ["top", "bottom"].indexOf(n),
                            b = !!e.flipVariations && (y && "start" === s && p || y && "end" === s && f || !y && "start" === s && g || !y && "end" === s && m);
                        (h || v || b) && (t.flipped = !0, (h || v) && (n = r[l + 1]), b && (s = z(s)), t.placement = n + (s ? "-" + s : ""), t.offsets.popper = ut({}, t.offsets.popper, k(t.instance.popper, t.offsets.reference, t.placement)), t = A(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(t) {
                    var e = t.placement,
                        i = e.split("-")[0],
                        n = t.offsets,
                        o = n.popper,
                        s = n.reference,
                        r = -1 !== ["left", "right"].indexOf(i),
                        a = -1 === ["top", "left"].indexOf(i);
                    return o[r ? "left" : "top"] = s[i] - (a ? o[r ? "width" : "height"] : 0), t.placement = E(e), t.offsets.popper = f(o), t
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(t) {
                    if (!V(t.instance.modifiers, "hide", "preventOverflow")) return t;
                    var e = t.offsets.reference,
                        i = S(t.instance.modifiers, function(t) {
                            return "preventOverflow" === t.name
                        }).boundaries;
                    if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                        if (!0 === t.hide) return t;
                        t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === t.hide) return t;
                        t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                    }
                    return t
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, e) {
                    var i, n, o = e.x,
                        r = e.y,
                        a = t.offsets.popper,
                        l = S(t.instance.modifiers, function(t) {
                            return "applyStyle" === t.name
                        }).gpuAcceleration,
                        c = void 0 === l ? e.gpuAcceleration : l,
                        u = s(t.instance.popper),
                        d = g(u),
                        h = {
                            position: a.position
                        },
                        p = {
                            left: Q(a.left),
                            top: K(a.top),
                            bottom: K(a.bottom),
                            right: Q(a.right)
                        },
                        f = "bottom" === o ? "top" : "bottom",
                        m = "right" === r ? "left" : "right",
                        v = M("transform");
                    if (n = "bottom" == f ? "HTML" === u.nodeName ? -u.clientHeight + p.bottom : -d.height + p.bottom : p.top, i = "right" == m ? "HTML" === u.nodeName ? -u.clientWidth + p.right : -d.width + p.right : p.left, c && v) h[v] = "translate3d(" + i + "px, " + n + "px, 0)", h[f] = 0, h[m] = 0, h.willChange = "transform";
                    else {
                        var y = "bottom" == f ? -1 : 1,
                            b = "right" == m ? -1 : 1;
                        h[f] = n * y, h[m] = i * b, h.willChange = f + ", " + m
                    }
                    var w = {
                        "x-placement": t.placement
                    };
                    return t.attributes = ut({}, w, t.attributes), t.styles = ut({}, h, t.styles), t.arrowStyles = ut({}, t.offsets.arrow, t.arrowStyles), t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(t) {
                    return U(t.instance.popper, t.styles), W(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && U(t.arrowElement, t.arrowStyles), t
                },
                onLoad: function(t, e, i, n, o) {
                    var s = _(o, e, t, i.positionFixed),
                        r = C(i.placement, s, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return e.setAttribute("x-placement", r), U(e, {
                        position: i.positionFixed ? "fixed" : "absolute"
                    }), i
                },
                gpuAcceleration: void 0
            }
        }
    }, ft
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, i) {
    "use strict";

    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function o(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t
    }

    function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }

    function r(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {},
                n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                return Object.getOwnPropertyDescriptor(i, t).enumerable
            }))), n.forEach(function(e) {
                s(t, e, i[e])
            })
        }
        return t
    }

    function a(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, i = i && i.hasOwnProperty("default") ? i.default : i;
    var l = function(t) {
            function e(t) {
                return {}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
            }

            function i() {
                return {
                    bindType: o,
                    delegateType: o,
                    handle: function(e) {
                        if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                    }
                }
            }

            function n(e) {
                var i = this,
                    n = !1;
                return t(this).one(s.TRANSITION_END, function() {
                    n = !0
                }), setTimeout(function() {
                    n || s.triggerTransitionEnd(i)
                }, e), this
            }
            var o = "transitionend",
                s = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(t) {
                        do {
                            t += ~~(1e6 * Math.random())
                        } while (document.getElementById(t));
                        return t
                    },
                    getSelectorFromElement: function(e) {
                        var i = e.getAttribute("data-target");
                        i && "#" !== i || (i = e.getAttribute("href") || "");
                        try {
                            return t(document).find(i).length > 0 ? i : null
                        } catch (t) {
                            return null
                        }
                    },
                    getTransitionDurationFromElement: function(e) {
                        if (!e) return 0;
                        var i = t(e).css("transition-duration");
                        return parseFloat(i) ? (i = i.split(",")[0], 1e3 * parseFloat(i)) : 0
                    },
                    reflow: function(t) {
                        return t.offsetHeight
                    },
                    triggerTransitionEnd: function(e) {
                        t(e).trigger(o)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(o)
                    },
                    isElement: function(t) {
                        return (t[0] || t).nodeType
                    },
                    typeCheckConfig: function(t, i, n) {
                        for (var o in n)
                            if (Object.prototype.hasOwnProperty.call(n, o)) {
                                var r = n[o],
                                    a = i[o],
                                    l = a && s.isElement(a) ? "element" : e(a);
                                if (!new RegExp(r).test(l)) throw new Error(t.toUpperCase() + ': Option "' + o + '" provided type "' + l + '" but expected type "' + r + '".')
                            }
                    }
                };
            return function() {
                t.fn.emulateTransitionEnd = n, t.event.special[s.TRANSITION_END] = i()
            }(), s
        }(e),
        c = function(t) {
            var e = "alert",
                i = t.fn[e],
                n = {
                    DISMISS: '[data-dismiss="alert"]'
                },
                s = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                r = {
                    ALERT: "alert",
                    FADE: "fade",
                    SHOW: "show"
                },
                a = function() {
                    function e(t) {
                        this._element = t
                    }
                    var i = e.prototype;
                    return i.close = function(t) {
                        var e = this._element;
                        t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                    }, i.dispose = function() {
                        t.removeData(this._element, "bs.alert"), this._element = null
                    }, i._getRootElement = function(e) {
                        var i = l.getSelectorFromElement(e),
                            n = !1;
                        return i && (n = t(i)[0]), n || (n = t(e).closest("." + r.ALERT)[0]), n
                    }, i._triggerCloseEvent = function(e) {
                        var i = t.Event(s.CLOSE);
                        return t(e).trigger(i), i
                    }, i._removeElement = function(e) {
                        var i = this;
                        if (t(e).removeClass(r.SHOW), !t(e).hasClass(r.FADE)) return void this._destroyElement(e);
                        var n = l.getTransitionDurationFromElement(e);
                        t(e).one(l.TRANSITION_END, function(t) {
                            return i._destroyElement(e, t)
                        }).emulateTransitionEnd(n)
                    }, i._destroyElement = function(e) {
                        t(e).detach().trigger(s.CLOSED).remove()
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this),
                                o = n.data("bs.alert");
                            o || (o = new e(this), n.data("bs.alert", o)), "close" === i && o[i](this)
                        })
                    }, e._handleDismiss = function(t) {
                        return function(e) {
                            e && e.preventDefault(), t.close(this)
                        }
                    }, o(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }]), e
                }();
            return t(document).on(s.CLICK_DATA_API, n.DISMISS, a._handleDismiss(new a)), t.fn[e] = a._jQueryInterface, t.fn[e].Constructor = a, t.fn[e].noConflict = function() {
                return t.fn[e] = i, a._jQueryInterface
            }, a
        }(e),
        u = function(t) {
            var e = "button",
                i = t.fn[e],
                n = {
                    ACTIVE: "active",
                    BUTTON: "btn",
                    FOCUS: "focus"
                },
                s = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: "input",
                    ACTIVE: ".active",
                    BUTTON: ".btn"
                },
                r = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                a = function() {
                    function e(t) {
                        this._element = t
                    }
                    var i = e.prototype;
                    return i.toggle = function() {
                        var e = !0,
                            i = !0,
                            o = t(this._element).closest(s.DATA_TOGGLE)[0];
                        if (o) {
                            var r = t(this._element).find(s.INPUT)[0];
                            if (r) {
                                if ("radio" === r.type)
                                    if (r.checked && t(this._element).hasClass(n.ACTIVE)) e = !1;
                                    else {
                                        var a = t(o).find(s.ACTIVE)[0];
                                        a && t(a).removeClass(n.ACTIVE)
                                    } if (e) {
                                    if (r.hasAttribute("disabled") || o.hasAttribute("disabled") || r.classList.contains("disabled") || o.classList.contains("disabled")) return;
                                    r.checked = !t(this._element).hasClass(n.ACTIVE), t(r).trigger("change")
                                }
                                r.focus(), i = !1
                            }
                        }
                        i && this._element.setAttribute("aria-pressed", !t(this._element).hasClass(n.ACTIVE)), e && t(this._element).toggleClass(n.ACTIVE)
                    }, i.dispose = function() {
                        t.removeData(this._element, "bs.button"), this._element = null
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this).data("bs.button");
                            n || (n = new e(this), t(this).data("bs.button", n)), "toggle" === i && n[i]()
                        })
                    }, o(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }]), e
                }();
            return t(document).on(r.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function(e) {
                e.preventDefault();
                var i = e.target;
                t(i).hasClass(n.BUTTON) || (i = t(i).closest(s.BUTTON)), a._jQueryInterface.call(t(i), "toggle")
            }).on(r.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function(e) {
                var i = t(e.target).closest(s.BUTTON)[0];
                t(i).toggleClass(n.FOCUS, /^focus(in)?$/.test(e.type))
            }), t.fn[e] = a._jQueryInterface, t.fn[e].Constructor = a, t.fn[e].noConflict = function() {
                return t.fn[e] = i, a._jQueryInterface
            }, a
        }(e),
        d = function(t) {
            var e = "carousel",
                i = "bs.carousel",
                n = "." + i,
                s = t.fn[e],
                a = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                c = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                u = {
                    NEXT: "next",
                    PREV: "prev",
                    LEFT: "left",
                    RIGHT: "right"
                },
                d = {
                    SLIDE: "slide" + n,
                    SLID: "slid" + n,
                    KEYDOWN: "keydown" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n,
                    TOUCHEND: "touchend" + n,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                h = {
                    CAROUSEL: "carousel",
                    ACTIVE: "active",
                    SLIDE: "slide",
                    RIGHT: "carousel-item-right",
                    LEFT: "carousel-item-left",
                    NEXT: "carousel-item-next",
                    PREV: "carousel-item-prev",
                    ITEM: "carousel-item"
                },
                p = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                f = function() {
                    function s(e, i) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(p.INDICATORS)[0], this._addEventListeners()
                    }
                    var f = s.prototype;
                    return f.next = function() {
                        this._isSliding || this._slide(u.NEXT)
                    }, f.nextWhenVisible = function() {
                        !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                    }, f.prev = function() {
                        this._isSliding || this._slide(u.PREV)
                    }, f.pause = function(e) {
                        e || (this._isPaused = !0), t(this._element).find(p.NEXT_PREV)[0] && (l.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, f.cycle = function(t) {
                        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, f.to = function(e) {
                        var i = this;
                        this._activeElement = t(this._element).find(p.ACTIVE_ITEM)[0];
                        var n = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0)) {
                            if (this._isSliding) return void t(this._element).one(d.SLID, function() {
                                return i.to(e)
                            });
                            if (n === e) return this.pause(), void this.cycle();
                            var o = e > n ? u.NEXT : u.PREV;
                            this._slide(o, this._items[e])
                        }
                    }, f.dispose = function() {
                        t(this._element).off(n), t.removeData(this._element, i), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, f._getConfig = function(t) {
                        return t = r({}, a, t), l.typeCheckConfig(e, t, c), t
                    }, f._addEventListeners = function() {
                        var e = this;
                        this._config.keyboard && t(this._element).on(d.KEYDOWN, function(t) {
                            return e._keydown(t)
                        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function(t) {
                            return e.pause(t)
                        }).on(d.MOUSELEAVE, function(t) {
                            return e.cycle(t)
                        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function() {
                            e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                                return e.cycle(t)
                            }, 500 + e._config.interval)
                        }))
                    }, f._keydown = function(t) {
                        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next()
                        }
                    }, f._getItemIndex = function(e) {
                        return this._items = t.makeArray(t(e).parent().find(p.ITEM)), this._items.indexOf(e)
                    }, f._getItemByDirection = function(t, e) {
                        var i = t === u.NEXT,
                            n = t === u.PREV,
                            o = this._getItemIndex(e),
                            s = this._items.length - 1;
                        if ((n && 0 === o || i && o === s) && !this._config.wrap) return e;
                        var r = t === u.PREV ? -1 : 1,
                            a = (o + r) % this._items.length;
                        return -1 === a ? this._items[this._items.length - 1] : this._items[a]
                    }, f._triggerSlideEvent = function(e, i) {
                        var n = this._getItemIndex(e),
                            o = this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),
                            s = t.Event(d.SLIDE, {
                                relatedTarget: e,
                                direction: i,
                                from: o,
                                to: n
                            });
                        return t(this._element).trigger(s), s
                    }, f._setActiveIndicatorElement = function(e) {
                        if (this._indicatorsElement) {
                            t(this._indicatorsElement).find(p.ACTIVE).removeClass(h.ACTIVE);
                            var i = this._indicatorsElement.children[this._getItemIndex(e)];
                            i && t(i).addClass(h.ACTIVE)
                        }
                    }, f._slide = function(e, i) {
                        var n, o, s, r = this,
                            a = t(this._element).find(p.ACTIVE_ITEM)[0],
                            c = this._getItemIndex(a),
                            f = i || a && this._getItemByDirection(e, a),
                            g = this._getItemIndex(f),
                            m = Boolean(this._interval);
                        if (e === u.NEXT ? (n = h.LEFT, o = h.NEXT, s = u.LEFT) : (n = h.RIGHT, o = h.PREV, s = u.RIGHT), f && t(f).hasClass(h.ACTIVE)) return void(this._isSliding = !1);
                        if (!this._triggerSlideEvent(f, s).isDefaultPrevented() && a && f) {
                            this._isSliding = !0, m && this.pause(), this._setActiveIndicatorElement(f);
                            var v = t.Event(d.SLID, {
                                relatedTarget: f,
                                direction: s,
                                from: c,
                                to: g
                            });
                            if (t(this._element).hasClass(h.SLIDE)) {
                                t(f).addClass(o), l.reflow(f), t(a).addClass(n), t(f).addClass(n);
                                var y = l.getTransitionDurationFromElement(a);
                                t(a).one(l.TRANSITION_END, function() {
                                    t(f).removeClass(n + " " + o).addClass(h.ACTIVE), t(a).removeClass(h.ACTIVE + " " + o + " " + n), r._isSliding = !1, setTimeout(function() {
                                        return t(r._element).trigger(v)
                                    }, 0)
                                }).emulateTransitionEnd(y)
                            } else t(a).removeClass(h.ACTIVE), t(f).addClass(h.ACTIVE), this._isSliding = !1, t(this._element).trigger(v);
                            m && this.cycle()
                        }
                    }, s._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data(i),
                                o = r({}, a, t(this).data());
                            "object" == typeof e && (o = r({}, o, e));
                            var l = "string" == typeof e ? e : o.slide;
                            if (n || (n = new s(this, o), t(this).data(i, n)), "number" == typeof e) n.to(e);
                            else if ("string" == typeof l) {
                                if (void 0 === n[l]) throw new TypeError('No method named "' + l + '"');
                                n[l]()
                            } else o.interval && (n.pause(), n.cycle())
                        })
                    }, s._dataApiClickHandler = function(e) {
                        var n = l.getSelectorFromElement(this);
                        if (n) {
                            var o = t(n)[0];
                            if (o && t(o).hasClass(h.CAROUSEL)) {
                                var a = r({}, t(o).data(), t(this).data()),
                                    c = this.getAttribute("data-slide-to");
                                c && (a.interval = !1), s._jQueryInterface.call(t(o), a), c && t(o).data(i).to(c), e.preventDefault()
                            }
                        }
                    }, o(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), s
                }();
            return t(document).on(d.CLICK_DATA_API, p.DATA_SLIDE, f._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function() {
                t(p.DATA_RIDE).each(function() {
                    var e = t(this);
                    f._jQueryInterface.call(e, e.data())
                })
            }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function() {
                return t.fn[e] = s, f._jQueryInterface
            }, f
        }(e),
        h = function(t) {
            var e = "collapse",
                i = "bs.collapse",
                n = t.fn[e],
                s = {
                    toggle: !0,
                    parent: ""
                },
                a = {
                    toggle: "boolean",
                    parent: "(string|element)"
                },
                c = {
                    SHOW: "show.bs.collapse",
                    SHOWN: "shown.bs.collapse",
                    HIDE: "hide.bs.collapse",
                    HIDDEN: "hidden.bs.collapse",
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                u = {
                    SHOW: "show",
                    COLLAPSE: "collapse",
                    COLLAPSING: "collapsing",
                    COLLAPSED: "collapsed"
                },
                d = {
                    WIDTH: "width",
                    HEIGHT: "height"
                },
                h = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                p = function() {
                    function n(e, i) {
                        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                        for (var n = t(h.DATA_TOGGLE), o = 0; o < n.length; o++) {
                            var s = n[o],
                                r = l.getSelectorFromElement(s);
                            null !== r && t(r).filter(e).length > 0 && (this._selector = r, this._triggerArray.push(s))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var p = n.prototype;
                    return p.toggle = function() {
                        t(this._element).hasClass(u.SHOW) ? this.hide() : this.show()
                    }, p.show = function() {
                        var e = this;
                        if (!this._isTransitioning && !t(this._element).hasClass(u.SHOW)) {
                            var o, s;
                            if (this._parent && (o = t.makeArray(t(this._parent).find(h.ACTIVES).filter('[data-parent="' + this._config.parent + '"]')), 0 === o.length && (o = null)), !(o && (s = t(o).not(this._selector).data(i)) && s._isTransitioning)) {
                                var r = t.Event(c.SHOW);
                                if (t(this._element).trigger(r), !r.isDefaultPrevented()) {
                                    o && (n._jQueryInterface.call(t(o).not(this._selector), "hide"), s || t(o).data(i, null));
                                    var a = this._getDimension();
                                    t(this._element).removeClass(u.COLLAPSE).addClass(u.COLLAPSING), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(u.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var d = function() {
                                            t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).addClass(u.SHOW), e._element.style[a] = "", e.setTransitioning(!1), t(e._element).trigger(c.SHOWN)
                                        },
                                        p = a[0].toUpperCase() + a.slice(1),
                                        f = "scroll" + p,
                                        g = l.getTransitionDurationFromElement(this._element);
                                    t(this._element).one(l.TRANSITION_END, d).emulateTransitionEnd(g), this._element.style[a] = this._element[f] + "px"
                                }
                            }
                        }
                    }, p.hide = function() {
                        var e = this;
                        if (!this._isTransitioning && t(this._element).hasClass(u.SHOW)) {
                            var i = t.Event(c.HIDE);
                            if (t(this._element).trigger(i), !i.isDefaultPrevented()) {
                                var n = this._getDimension();
                                if (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", l.reflow(this._element), t(this._element).addClass(u.COLLAPSING).removeClass(u.COLLAPSE).removeClass(u.SHOW), this._triggerArray.length > 0)
                                    for (var o = 0; o < this._triggerArray.length; o++) {
                                        var s = this._triggerArray[o],
                                            r = l.getSelectorFromElement(s);
                                        if (null !== r) {
                                            var a = t(r);
                                            a.hasClass(u.SHOW) || t(s).addClass(u.COLLAPSED).attr("aria-expanded", !1)
                                        }
                                    }
                                this.setTransitioning(!0);
                                var d = function() {
                                    e.setTransitioning(!1), t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).trigger(c.HIDDEN)
                                };
                                this._element.style[n] = "";
                                var h = l.getTransitionDurationFromElement(this._element);
                                t(this._element).one(l.TRANSITION_END, d).emulateTransitionEnd(h)
                            }
                        }
                    }, p.setTransitioning = function(t) {
                        this._isTransitioning = t
                    }, p.dispose = function() {
                        t.removeData(this._element, i), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, p._getConfig = function(t) {
                        return t = r({}, s, t), t.toggle = Boolean(t.toggle), l.typeCheckConfig(e, t, a), t
                    }, p._getDimension = function() {
                        return t(this._element).hasClass(d.WIDTH) ? d.WIDTH : d.HEIGHT
                    }, p._getParent = function() {
                        var e = this,
                            i = null;
                        l.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = t(this._config.parent)[0];
                        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return t(i).find(o).each(function(t, i) {
                            e._addAriaAndCollapsedClass(n._getTargetFromElement(i), [i])
                        }), i
                    }, p._addAriaAndCollapsedClass = function(e, i) {
                        if (e) {
                            var n = t(e).hasClass(u.SHOW);
                            i.length > 0 && t(i).toggleClass(u.COLLAPSED, !n).attr("aria-expanded", n)
                        }
                    }, n._getTargetFromElement = function(e) {
                        var i = l.getSelectorFromElement(e);
                        return i ? t(i)[0] : null
                    }, n._jQueryInterface = function(e) {
                        return this.each(function() {
                            var o = t(this),
                                a = o.data(i),
                                l = r({}, s, o.data(), "object" == typeof e && e ? e : {});
                            if (!a && l.toggle && /show|hide/.test(e) && (l.toggle = !1), a || (a = new n(this, l), o.data(i, a)), "string" == typeof e) {
                                if (void 0 === a[e]) throw new TypeError('No method named "' + e + '"');
                                a[e]()
                            }
                        })
                    }, o(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return s
                        }
                    }]), n
                }();
            return t(document).on(c.CLICK_DATA_API, h.DATA_TOGGLE, function(e) {
                "A" === e.currentTarget.tagName && e.preventDefault();
                var n = t(this),
                    o = l.getSelectorFromElement(this);
                t(o).each(function() {
                    var e = t(this),
                        o = e.data(i),
                        s = o ? "toggle" : n.data();
                    p._jQueryInterface.call(e, s)
                })
            }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function() {
                return t.fn[e] = n, p._jQueryInterface
            }, p
        }(e),
        p = function(t) {
            var e = "dropdown",
                n = "bs.dropdown",
                s = "." + n,
                a = t.fn[e],
                c = new RegExp("38|40|27"),
                u = {
                    HIDE: "hide" + s,
                    HIDDEN: "hidden" + s,
                    SHOW: "show" + s,
                    SHOWN: "shown" + s,
                    CLICK: "click" + s,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
                    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
                },
                d = {
                    DISABLED: "disabled",
                    SHOW: "show",
                    DROPUP: "dropup",
                    DROPRIGHT: "dropright",
                    DROPLEFT: "dropleft",
                    MENURIGHT: "dropdown-menu-right",
                    MENULEFT: "dropdown-menu-left",
                    POSITION_STATIC: "position-static"
                },
                h = {
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: ".dropdown form",
                    MENU: ".dropdown-menu",
                    NAVBAR_NAV: ".navbar-nav",
                    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                },
                p = {
                    TOP: "top-start",
                    TOPEND: "top-end",
                    BOTTOM: "bottom-start",
                    BOTTOMEND: "bottom-end",
                    RIGHT: "right-start",
                    RIGHTEND: "right-end",
                    LEFT: "left-start",
                    LEFTEND: "left-end"
                },
                f = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent",
                    reference: "toggle",
                    display: "dynamic"
                },
                g = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)",
                    reference: "(string|element)",
                    display: "string"
                },
                m = function() {
                    function a(t, e) {
                        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var m = a.prototype;
                    return m.toggle = function() {
                        if (!this._element.disabled && !t(this._element).hasClass(d.DISABLED)) {
                            var e = a._getParentFromElement(this._element),
                                n = t(this._menu).hasClass(d.SHOW);
                            if (a._clearMenus(), !n) {
                                var o = {
                                        relatedTarget: this._element
                                    },
                                    s = t.Event(u.SHOW, o);
                                if (t(e).trigger(s), !s.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if (void 0 === i) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var r = this._element;
                                        "parent" === this._config.reference ? r = e : l.isElement(this._config.reference) && (r = this._config.reference, void 0 !== this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && t(e).addClass(d.POSITION_STATIC), this._popper = new i(r, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === t(e).closest(h.NAVBAR_NAV).length && t(document.body).children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(d.SHOW), t(e).toggleClass(d.SHOW).trigger(t.Event(u.SHOWN, o))
                                }
                            }
                        }
                    }, m.dispose = function() {
                        t.removeData(this._element, n), t(this._element).off(s), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, m.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, m._addEventListeners = function() {
                        var e = this;
                        t(this._element).on(u.CLICK, function(t) {
                            t.preventDefault(), t.stopPropagation(), e.toggle()
                        })
                    }, m._getConfig = function(i) {
                        return i = r({}, this.constructor.Default, t(this._element).data(), i), l.typeCheckConfig(e, i, this.constructor.DefaultType), i
                    }, m._getMenuElement = function() {
                        if (!this._menu) {
                            var e = a._getParentFromElement(this._element);
                            this._menu = t(e).find(h.MENU)[0]
                        }
                        return this._menu
                    }, m._getPlacement = function() {
                        var e = t(this._element).parent(),
                            i = p.BOTTOM;
                        return e.hasClass(d.DROPUP) ? (i = p.TOP, t(this._menu).hasClass(d.MENURIGHT) && (i = p.TOPEND)) : e.hasClass(d.DROPRIGHT) ? i = p.RIGHT : e.hasClass(d.DROPLEFT) ? i = p.LEFT : t(this._menu).hasClass(d.MENURIGHT) && (i = p.BOTTOMEND), i
                    }, m._detectNavbar = function() {
                        return t(this._element).closest(".navbar").length > 0
                    }, m._getPopperConfig = function() {
                        var t = this,
                            e = {};
                        "function" == typeof this._config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
                        } : e.offset = this._config.offset;
                        var i = {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: e,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        };
                        return "static" === this._config.display && (i.modifiers.applyStyle = {
                            enabled: !1
                        }), i
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                o = "object" == typeof e ? e : null;
                            if (i || (i = new a(this, o), t(this).data(n, i)), "string" == typeof e) {
                                if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, a._clearMenus = function(e) {
                        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                            for (var i = t.makeArray(t(h.DATA_TOGGLE)), o = 0; o < i.length; o++) {
                                var s = a._getParentFromElement(i[o]),
                                    r = t(i[o]).data(n),
                                    l = {
                                        relatedTarget: i[o]
                                    };
                                if (r) {
                                    var c = r._menu;
                                    if (t(s).hasClass(d.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(s, e.target))) {
                                        var p = t.Event(u.HIDE, l);
                                        t(s).trigger(p), p.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), i[o].setAttribute("aria-expanded", "false"), t(c).removeClass(d.SHOW), t(s).removeClass(d.SHOW).trigger(t.Event(u.HIDDEN, l)))
                                    }
                                }
                            }
                    }, a._getParentFromElement = function(e) {
                        var i, n = l.getSelectorFromElement(e);
                        return n && (i = t(n)[0]), i || e.parentNode
                    }, a._dataApiKeydownHandler = function(e) {
                        if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(h.MENU).length)) : c.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(d.DISABLED))) {
                            var i = a._getParentFromElement(this),
                                n = t(i).hasClass(d.SHOW);
                            if (!n && (27 !== e.which || 32 !== e.which) || n && (27 === e.which || 32 === e.which)) {
                                if (27 === e.which) {
                                    var o = t(i).find(h.DATA_TOGGLE)[0];
                                    t(o).trigger("focus")
                                }
                                return void t(this).trigger("click")
                            }
                            var s = t(i).find(h.VISIBLE_ITEMS).get();
                            if (0 !== s.length) {
                                var r = s.indexOf(e.target);
                                38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
                            }
                        }
                    }, o(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return f
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return g
                        }
                    }]), a
                }();
            return t(document).on(u.KEYDOWN_DATA_API, h.DATA_TOGGLE, m._dataApiKeydownHandler).on(u.KEYDOWN_DATA_API, h.MENU, m._dataApiKeydownHandler).on(u.CLICK_DATA_API + " " + u.KEYUP_DATA_API, m._clearMenus).on(u.CLICK_DATA_API, h.DATA_TOGGLE, function(e) {
                e.preventDefault(), e.stopPropagation(), m._jQueryInterface.call(t(this), "toggle")
            }).on(u.CLICK_DATA_API, h.FORM_CHILD, function(t) {
                t.stopPropagation()
            }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function() {
                return t.fn[e] = a, m._jQueryInterface
            }, m
        }(e),
        f = function(t) {
            var e = "modal",
                i = ".bs.modal",
                n = t.fn[e],
                s = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                a = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                c = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                u = {
                    SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                    BACKDROP: "modal-backdrop",
                    OPEN: "modal-open",
                    FADE: "fade",
                    SHOW: "show"
                },
                d = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    STICKY_CONTENT: ".sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                h = function() {
                    function n(e, i) {
                        this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(d.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
                    }
                    var h = n.prototype;
                    return h.toggle = function(t) {
                        return this._isShown ? this.hide() : this.show(t)
                    }, h.show = function(e) {
                        var i = this;
                        if (!this._isTransitioning && !this._isShown) {
                            t(this._element).hasClass(u.FADE) && (this._isTransitioning = !0);
                            var n = t.Event(c.SHOW, {
                                relatedTarget: e
                            });
                            t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(u.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(c.CLICK_DISMISS, d.DATA_DISMISS, function(t) {
                                return i.hide(t)
                            }), t(this._dialog).on(c.MOUSEDOWN_DISMISS, function() {
                                t(i._element).one(c.MOUSEUP_DISMISS, function(e) {
                                    t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return i._showElement(e)
                            }))
                        }
                    }, h.hide = function(e) {
                        var i = this;
                        if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                            var n = t.Event(c.HIDE);
                            if (t(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                                this._isShown = !1;
                                var o = t(this._element).hasClass(u.FADE);
                                if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(c.FOCUSIN), t(this._element).removeClass(u.SHOW), t(this._element).off(c.CLICK_DISMISS), t(this._dialog).off(c.MOUSEDOWN_DISMISS), o) {
                                    var s = l.getTransitionDurationFromElement(this._element);
                                    t(this._element).one(l.TRANSITION_END, function(t) {
                                        return i._hideModal(t)
                                    }).emulateTransitionEnd(s)
                                } else this._hideModal()
                            }
                        }
                    }, h.dispose = function() {
                        t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, h.handleUpdate = function() {
                        this._adjustDialog()
                    }, h._getConfig = function(t) {
                        return t = r({}, s, t), l.typeCheckConfig(e, t, a), t
                    }, h._showElement = function(e) {
                        var i = this,
                            n = t(this._element).hasClass(u.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && l.reflow(this._element), t(this._element).addClass(u.SHOW), this._config.focus && this._enforceFocus();
                        var o = t.Event(c.SHOWN, {
                                relatedTarget: e
                            }),
                            s = function() {
                                i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(o)
                            };
                        if (n) {
                            var r = l.getTransitionDurationFromElement(this._element);
                            t(this._dialog).one(l.TRANSITION_END, s).emulateTransitionEnd(r)
                        } else s()
                    }, h._enforceFocus = function() {
                        var e = this;
                        t(document).off(c.FOCUSIN).on(c.FOCUSIN, function(i) {
                            document !== i.target && e._element !== i.target && 0 === t(e._element).has(i.target).length && e._element.focus()
                        })
                    }, h._setEscapeEvent = function() {
                        var e = this;
                        this._isShown && this._config.keyboard ? t(this._element).on(c.KEYDOWN_DISMISS, function(t) {
                            27 === t.which && (t.preventDefault(), e.hide())
                        }) : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS)
                    }, h._setResizeEvent = function() {
                        var e = this;
                        this._isShown ? t(window).on(c.RESIZE, function(t) {
                            return e.handleUpdate(t)
                        }) : t(window).off(c.RESIZE)
                    }, h._hideModal = function() {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            t(document.body).removeClass(u.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(c.HIDDEN)
                        })
                    }, h._removeBackdrop = function() {
                        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                    }, h._showBackdrop = function(e) {
                        var i = this,
                            n = t(this._element).hasClass(u.FADE) ? u.FADE : "";
                        if (this._isShown && this._config.backdrop) {
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = u.BACKDROP, n && t(this._backdrop).addClass(n), t(this._backdrop).appendTo(document.body), t(this._element).on(c.CLICK_DISMISS, function(t) {
                                    if (i._ignoreBackdropClick) return void(i._ignoreBackdropClick = !1);
                                    t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                                }), n && l.reflow(this._backdrop), t(this._backdrop).addClass(u.SHOW), !e) return;
                            if (!n) return void e();
                            var o = l.getTransitionDurationFromElement(this._backdrop);
                            t(this._backdrop).one(l.TRANSITION_END, e).emulateTransitionEnd(o)
                        } else if (!this._isShown && this._backdrop) {
                            t(this._backdrop).removeClass(u.SHOW);
                            var s = function() {
                                i._removeBackdrop(), e && e()
                            };
                            if (t(this._element).hasClass(u.FADE)) {
                                var r = l.getTransitionDurationFromElement(this._backdrop);
                                t(this._backdrop).one(l.TRANSITION_END, s).emulateTransitionEnd(r)
                            } else s()
                        } else e && e()
                    }, h._adjustDialog = function() {
                        var t = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, h._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, h._checkScrollbar = function() {
                        var t = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, h._setScrollbar = function() {
                        var e = this;
                        if (this._isBodyOverflowing) {
                            t(d.FIXED_CONTENT).each(function(i, n) {
                                var o = t(n)[0].style.paddingRight,
                                    s = t(n).css("padding-right");
                                t(n).data("padding-right", o).css("padding-right", parseFloat(s) + e._scrollbarWidth + "px")
                            }), t(d.STICKY_CONTENT).each(function(i, n) {
                                var o = t(n)[0].style.marginRight,
                                    s = t(n).css("margin-right");
                                t(n).data("margin-right", o).css("margin-right", parseFloat(s) - e._scrollbarWidth + "px")
                            }), t(d.NAVBAR_TOGGLER).each(function(i, n) {
                                var o = t(n)[0].style.marginRight,
                                    s = t(n).css("margin-right");
                                t(n).data("margin-right", o).css("margin-right", parseFloat(s) + e._scrollbarWidth + "px")
                            });
                            var i = document.body.style.paddingRight,
                                n = t(document.body).css("padding-right");
                            t(document.body).data("padding-right", i).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")
                        }
                    }, h._resetScrollbar = function() {
                        t(d.FIXED_CONTENT).each(function(e, i) {
                            var n = t(i).data("padding-right");
                            void 0 !== n && t(i).css("padding-right", n).removeData("padding-right")
                        }), t(d.STICKY_CONTENT + ", " + d.NAVBAR_TOGGLER).each(function(e, i) {
                            var n = t(i).data("margin-right");
                            void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
                        });
                        var e = t(document.body).data("padding-right");
                        void 0 !== e && t(document.body).css("padding-right", e).removeData("padding-right")
                    }, h._getScrollbarWidth = function() {
                        var t = document.createElement("div");
                        t.className = u.SCROLLBAR_MEASURER, document.body.appendChild(t);
                        var e = t.getBoundingClientRect().width - t.clientWidth;
                        return document.body.removeChild(t), e
                    }, n._jQueryInterface = function(e, i) {
                        return this.each(function() {
                            var o = t(this).data("bs.modal"),
                                a = r({}, s, t(this).data(), "object" == typeof e && e ? e : {});
                            if (o || (o = new n(this, a), t(this).data("bs.modal", o)), "string" == typeof e) {
                                if (void 0 === o[e]) throw new TypeError('No method named "' + e + '"');
                                o[e](i)
                            } else a.show && o.show(i)
                        })
                    }, o(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return s
                        }
                    }]), n
                }();
            return t(document).on(c.CLICK_DATA_API, d.DATA_TOGGLE, function(e) {
                var i, n = this,
                    o = l.getSelectorFromElement(this);
                o && (i = t(o)[0]);
                var s = t(i).data("bs.modal") ? "toggle" : r({}, t(i).data(), t(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var a = t(i).one(c.SHOW, function(e) {
                    e.isDefaultPrevented() || a.one(c.HIDDEN, function() {
                        t(n).is(":visible") && n.focus()
                    })
                });
                h._jQueryInterface.call(t(i), s, this)
            }), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function() {
                return t.fn[e] = n, h._jQueryInterface
            }, h
        }(e),
        g = function(t) {
            var e = "tooltip",
                n = ".bs.tooltip",
                s = t.fn[e],
                a = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                c = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                },
                u = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                d = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip",
                    boundary: "scrollParent"
                },
                h = {
                    SHOW: "show",
                    OUT: "out"
                },
                p = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    INSERTED: "inserted" + n,
                    CLICK: "click" + n,
                    FOCUSIN: "focusin" + n,
                    FOCUSOUT: "focusout" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n
                },
                f = {
                    FADE: "fade",
                    SHOW: "show"
                },
                g = {
                    TOOLTIP: ".tooltip",
                    TOOLTIP_INNER: ".tooltip-inner",
                    ARROW: ".arrow"
                },
                m = {
                    HOVER: "hover",
                    FOCUS: "focus",
                    CLICK: "click",
                    MANUAL: "manual"
                },
                v = function() {
                    function s(t, e) {
                        if (void 0 === i) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                    }
                    var v = s.prototype;
                    return v.enable = function() {
                        this._isEnabled = !0
                    }, v.disable = function() {
                        this._isEnabled = !1
                    }, v.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, v.toggle = function(e) {
                        if (this._isEnabled)
                            if (e) {
                                var i = this.constructor.DATA_KEY,
                                    n = t(e.currentTarget).data(i);
                                n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                            } else {
                                if (t(this.getTipElement()).hasClass(f.SHOW)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, v.dispose = function() {
                        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, v.show = function() {
                        var e = this;
                        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var n = t.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            t(this.element).trigger(n);
                            var o = t.contains(this.element.ownerDocument.documentElement, this.element);
                            if (n.isDefaultPrevented() || !o) return;
                            var s = this.getTipElement(),
                                r = l.getUID(this.constructor.NAME);
                            s.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && t(s).addClass(f.FADE);
                            var a = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                                c = this._getAttachment(a);
                            this.addAttachmentClass(c);
                            var u = !1 === this.config.container ? document.body : t(this.config.container);
                            t(s).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(s).appendTo(u), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new i(this.element, s, {
                                placement: c,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: g.ARROW
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(t) {
                                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                },
                                onUpdate: function(t) {
                                    e._handlePopperPlacementChange(t)
                                }
                            }), t(s).addClass(f.SHOW), "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
                            var d = function() {
                                e.config.animation && e._fixTransition();
                                var i = e._hoverState;
                                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), i === h.OUT && e._leave(null, e)
                            };
                            if (t(this.tip).hasClass(f.FADE)) {
                                var p = l.getTransitionDurationFromElement(this.tip);
                                t(this.tip).one(l.TRANSITION_END, d).emulateTransitionEnd(p)
                            } else d()
                        }
                    }, v.hide = function(e) {
                        var i = this,
                            n = this.getTipElement(),
                            o = t.Event(this.constructor.Event.HIDE),
                            s = function() {
                                i._hoverState !== h.SHOW && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e()
                            };
                        if (t(this.element).trigger(o), !o.isDefaultPrevented()) {
                            if (t(n).removeClass(f.SHOW), "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), this._activeTrigger[m.CLICK] = !1, this._activeTrigger[m.FOCUS] = !1, this._activeTrigger[m.HOVER] = !1, t(this.tip).hasClass(f.FADE)) {
                                var r = l.getTransitionDurationFromElement(n);
                                t(n).one(l.TRANSITION_END, s).emulateTransitionEnd(r)
                            } else s();
                            this._hoverState = ""
                        }
                    }, v.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, v.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, v.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-tooltip-" + e)
                    }, v.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, v.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(g.TOOLTIP_INNER), this.getTitle()), e.removeClass(f.FADE + " " + f.SHOW)
                    }, v.setElementContent = function(e, i) {
                        var n = this.config.html;
                        "object" == typeof i && (i.nodeType || i.jquery) ? n ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text()) : e[n ? "html" : "text"](i)
                    }, v.getTitle = function() {
                        var t = this.element.getAttribute("data-original-title");
                        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                    }, v._getAttachment = function(t) {
                        return u[t.toUpperCase()]
                    }, v._setListeners = function() {
                        var e = this;
                        this.config.trigger.split(" ").forEach(function(i) {
                            if ("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                return e.toggle(t)
                            });
                            else if (i !== m.MANUAL) {
                                var n = i === m.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                    o = i === m.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                t(e.element).on(n, e.config.selector, function(t) {
                                    return e._enter(t)
                                }).on(o, e.config.selector, function(t) {
                                    return e._leave(t)
                                })
                            }
                            t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                return e.hide()
                            })
                        }), this.config.selector ? this.config = r({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, v._fixTitle = function() {
                        var t = typeof this.element.getAttribute("data-original-title");
                        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, v._enter = function(e, i) {
                        var n = this.constructor.DATA_KEY;
                        return i = i || t(e.currentTarget).data(n), i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? m.FOCUS : m.HOVER] = !0), t(i.getTipElement()).hasClass(f.SHOW) || i._hoverState === h.SHOW ? void(i._hoverState = h.SHOW) : (clearTimeout(i._timeout), i._hoverState = h.SHOW, i.config.delay && i.config.delay.show ? void(i._timeout = setTimeout(function() {
                            i._hoverState === h.SHOW && i.show()
                        }, i.config.delay.show)) : void i.show())
                    }, v._leave = function(e, i) {
                        var n = this.constructor.DATA_KEY;
                        if (i = i || t(e.currentTarget).data(n), i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? m.FOCUS : m.HOVER] = !1), !i._isWithActiveTrigger()) {
                            if (clearTimeout(i._timeout), i._hoverState = h.OUT, !i.config.delay || !i.config.delay.hide) return void i.hide();
                            i._timeout = setTimeout(function() {
                                i._hoverState === h.OUT && i.hide()
                            }, i.config.delay.hide)
                        }
                    }, v._isWithActiveTrigger = function() {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1
                    }, v._getConfig = function(i) {
                        return i = r({}, this.constructor.Default, t(this.element).data(), "object" == typeof i && i ? i : {}), "number" == typeof i.delay && (i.delay = {
                            show: i.delay,
                            hide: i.delay
                        }), "number" == typeof i.title && (i.title = i.title.toString()), "number" == typeof i.content && (i.content = i.content.toString()), l.typeCheckConfig(e, i, this.constructor.DefaultType), i
                    }, v._getDelegateConfig = function() {
                        var t = {};
                        if (this.config)
                            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                        return t
                    }, v._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            i = e.attr("class").match(a);
                        null !== i && i.length > 0 && e.removeClass(i.join(""))
                    }, v._handlePopperPlacementChange = function(t) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                    }, v._fixTransition = function() {
                        var e = this.getTipElement(),
                            i = this.config.animation;
                        null === e.getAttribute("x-placement") && (t(e).removeClass(f.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
                    }, s._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data("bs.tooltip"),
                                n = "object" == typeof e && e;
                            if ((i || !/dispose|hide/.test(e)) && (i || (i = new s(this, n), t(this).data("bs.tooltip", i)), "string" == typeof e)) {
                                if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, o(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return d
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return p
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return c
                        }
                    }]), s
                }();
            return t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function() {
                return t.fn[e] = s, v._jQueryInterface
            }, v
        }(e),
        m = function(t) {
            var e = "popover",
                i = ".bs.popover",
                n = t.fn[e],
                s = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                l = r({}, g.Default, {
                    placement: "right",
                    trigger: "click",
                    content: "",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                c = r({}, g.DefaultType, {
                    content: "(string|element|function)"
                }),
                u = {
                    FADE: "fade",
                    SHOW: "show"
                },
                d = {
                    TITLE: ".popover-header",
                    CONTENT: ".popover-body"
                },
                h = {
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    INSERTED: "inserted" + i,
                    CLICK: "click" + i,
                    FOCUSIN: "focusin" + i,
                    FOCUSOUT: "focusout" + i,
                    MOUSEENTER: "mouseenter" + i,
                    MOUSELEAVE: "mouseleave" + i
                },
                p = function(n) {
                    function r() {
                        return n.apply(this, arguments) || this
                    }
                    a(r, n);
                    var p = r.prototype;
                    return p.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, p.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-popover-" + e)
                    }, p.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, p.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(d.TITLE), this.getTitle());
                        var i = this._getContent();
                        "function" == typeof i && (i = i.call(this.element)), this.setElementContent(e.find(d.CONTENT), i), e.removeClass(u.FADE + " " + u.SHOW)
                    }, p._getContent = function() {
                        return this.element.getAttribute("data-content") || this.config.content
                    }, p._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            i = e.attr("class").match(s);
                        null !== i && i.length > 0 && e.removeClass(i.join(""))
                    }, r._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data("bs.popover"),
                                n = "object" == typeof e ? e : null;
                            if ((i || !/destroy|hide/.test(e)) && (i || (i = new r(this, n), t(this).data("bs.popover", i)), "string" == typeof e)) {
                                if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, o(r, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.popover"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return h
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return i
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return c
                        }
                    }]), r
                }(g);
            return t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function() {
                return t.fn[e] = n, p._jQueryInterface
            }, p
        }(e),
        v = function(t) {
            var e = "scrollspy",
                i = t.fn[e],
                n = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                s = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                a = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                c = {
                    DROPDOWN_ITEM: "dropdown-item",
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active"
                },
                u = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    NAV_ITEMS: ".nav-item",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                d = {
                    OFFSET: "offset",
                    POSITION: "position"
                },
                h = function() {
                    function i(e, i) {
                        var n = this;
                        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + u.NAV_LINKS + "," + this._config.target + " " + u.LIST_ITEMS + "," + this._config.target + " " + u.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(a.SCROLL, function(t) {
                            return n._process(t)
                        }), this.refresh(), this._process()
                    }
                    var h = i.prototype;
                    return h.refresh = function() {
                        var e = this,
                            i = this._scrollElement === this._scrollElement.window ? d.OFFSET : d.POSITION,
                            n = "auto" === this._config.method ? i : this._config.method,
                            o = n === d.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                            var i, s = l.getSelectorFromElement(e);
                            if (s && (i = t(s)[0]), i) {
                                var r = i.getBoundingClientRect();
                                if (r.width || r.height) return [t(i)[n]().top + o, s]
                            }
                            return null
                        }).filter(function(t) {
                            return t
                        }).sort(function(t, e) {
                            return t[0] - e[0]
                        }).forEach(function(t) {
                            e._offsets.push(t[0]), e._targets.push(t[1])
                        })
                    }, h.dispose = function() {
                        t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, h._getConfig = function(i) {
                        if (i = r({}, n, "object" == typeof i && i ? i : {}), "string" != typeof i.target) {
                            var o = t(i.target).attr("id");
                            o || (o = l.getUID(e), t(i.target).attr("id", o)), i.target = "#" + o
                        }
                        return l.typeCheckConfig(e, i, s), i
                    }, h._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, h._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, h._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, h._process = function() {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            i = this._config.offset + e - this._getOffsetHeight();
                        if (this._scrollHeight !== e && this.refresh(), t >= i) {
                            var n = this._targets[this._targets.length - 1];
                            return void(this._activeTarget !== n && this._activate(n))
                        }
                        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                        for (var o = this._offsets.length; o--;) {
                            this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                        }
                    }, h._activate = function(e) {
                        this._activeTarget = e, this._clear();
                        var i = this._selector.split(",");
                        i = i.map(function(t) {
                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                        });
                        var n = t(i.join(","));
                        n.hasClass(c.DROPDOWN_ITEM) ? (n.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(c.ACTIVE), n.addClass(c.ACTIVE)) : (n.addClass(c.ACTIVE), n.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS + ", " + u.LIST_ITEMS).addClass(c.ACTIVE), n.parents(u.NAV_LIST_GROUP).prev(u.NAV_ITEMS).children(u.NAV_LINKS).addClass(c.ACTIVE)), t(this._scrollElement).trigger(a.ACTIVATE, {
                            relatedTarget: e
                        })
                    }, h._clear = function() {
                        t(this._selector).filter(u.ACTIVE).removeClass(c.ACTIVE)
                    }, i._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data("bs.scrollspy"),
                                o = "object" == typeof e && e;
                            if (n || (n = new i(this, o), t(this).data("bs.scrollspy", n)), "string" == typeof e) {
                                if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, o(i, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return n
                        }
                    }]), i
                }();
            return t(window).on(a.LOAD_DATA_API, function() {
                for (var e = t.makeArray(t(u.DATA_SPY)), i = e.length; i--;) {
                    var n = t(e[i]);
                    h._jQueryInterface.call(n, n.data())
                }
            }), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function() {
                return t.fn[e] = i, h._jQueryInterface
            }, h
        }(e),
        y = function(t) {
            var e = t.fn.tab,
                i = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                n = {
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active",
                    DISABLED: "disabled",
                    FADE: "fade",
                    SHOW: "show"
                },
                s = {
                    DROPDOWN: ".dropdown",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    ACTIVE: ".active",
                    ACTIVE_UL: "> li > .active",
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    DROPDOWN_TOGGLE: ".dropdown-toggle",
                    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
                },
                r = function() {
                    function e(t) {
                        this._element = t
                    }
                    var r = e.prototype;
                    return r.show = function() {
                        var e = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(n.ACTIVE) || t(this._element).hasClass(n.DISABLED))) {
                            var o, r, a = t(this._element).closest(s.NAV_LIST_GROUP)[0],
                                c = l.getSelectorFromElement(this._element);
                            if (a) {
                                var u = "UL" === a.nodeName ? s.ACTIVE_UL : s.ACTIVE;
                                r = t.makeArray(t(a).find(u)), r = r[r.length - 1]
                            }
                            var d = t.Event(i.HIDE, {
                                    relatedTarget: this._element
                                }),
                                h = t.Event(i.SHOW, {
                                    relatedTarget: r
                                });
                            if (r && t(r).trigger(d), t(this._element).trigger(h), !h.isDefaultPrevented() && !d.isDefaultPrevented()) {
                                c && (o = t(c)[0]), this._activate(this._element, a);
                                var p = function() {
                                    var n = t.Event(i.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                        o = t.Event(i.SHOWN, {
                                            relatedTarget: r
                                        });
                                    t(r).trigger(n), t(e._element).trigger(o)
                                };
                                o ? this._activate(o, o.parentNode, p) : p()
                            }
                        }
                    }, r.dispose = function() {
                        t.removeData(this._element, "bs.tab"), this._element = null
                    }, r._activate = function(e, i, o) {
                        var r, a = this;
                        r = "UL" === i.nodeName ? t(i).find(s.ACTIVE_UL) : t(i).children(s.ACTIVE);
                        var c = r[0],
                            u = o && c && t(c).hasClass(n.FADE),
                            d = function() {
                                return a._transitionComplete(e, c, o)
                            };
                        if (c && u) {
                            var h = l.getTransitionDurationFromElement(c);
                            t(c).one(l.TRANSITION_END, d).emulateTransitionEnd(h)
                        } else d()
                    }, r._transitionComplete = function(e, i, o) {
                        if (i) {
                            t(i).removeClass(n.SHOW + " " + n.ACTIVE);
                            var r = t(i.parentNode).find(s.DROPDOWN_ACTIVE_CHILD)[0];
                            r && t(r).removeClass(n.ACTIVE), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
                        }
                        if (t(e).addClass(n.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), l.reflow(e), t(e).addClass(n.SHOW), e.parentNode && t(e.parentNode).hasClass(n.DROPDOWN_MENU)) {
                            var a = t(e).closest(s.DROPDOWN)[0];
                            a && t(a).find(s.DROPDOWN_TOGGLE).addClass(n.ACTIVE), e.setAttribute("aria-expanded", !0)
                        }
                        o && o()
                    }, e._jQueryInterface = function(i) {
                        return this.each(function() {
                            var n = t(this),
                                o = n.data("bs.tab");
                            if (o || (o = new e(this), n.data("bs.tab", o)), "string" == typeof i) {
                                if (void 0 === o[i]) throw new TypeError('No method named "' + i + '"');
                                o[i]()
                            }
                        })
                    }, o(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.1.1"
                        }
                    }]), e
                }();
            return t(document).on(i.CLICK_DATA_API, s.DATA_TOGGLE, function(e) {
                e.preventDefault(), r._jQueryInterface.call(t(this), "show")
            }), t.fn.tab = r._jQueryInterface, t.fn.tab.Constructor = r, t.fn.tab.noConflict = function() {
                return t.fn.tab = e, r._jQueryInterface
            }, r
        }(e);
    ! function(t) {
        if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = l, t.Alert = c, t.Button = u, t.Carousel = d, t.Collapse = h, t.Dropdown = p, t.Modal = f, t.Popover = m, t.Scrollspy = v, t.Tab = y, t.Tooltip = g, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, n) {
            var o, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, i) {
                    return t('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, o = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, n, o), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }
        var i = 0;
        return e
    }(), e.prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, n) {
        var o = this;
        if ("boolean" == typeof i) n = i, i = null;
        else if (i < 0 || i >= o.slideCount) return !1;
        o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : !0 === n ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.animateHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({
                height: e
            }, t.options.speed)
        }
    }, e.prototype.animateSlide = function(e, i) {
        var n = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: e
        }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
            top: e
        }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({
            animStart: o.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(t) {
                t = Math.ceil(t), !1 === o.options.vertical ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? n[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function() {
            o.disableTransition(), i.call()
        }, o.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            i = e.options.asNavFor;
        return i && null !== i && (i = t(i).not(e.$slider)), i
    }, e.prototype.asNavFor = function(e) {
        var i = this,
            n = i.getNavTarget();
        null !== n && "object" == typeof n && n.each(function() {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var t = this,
            e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, i, n = this;
        if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
            for (n.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(n.options.dotsClass), e = 0; e <= n.getDotCount(); e += 1) i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
            n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var t, e, i, n, o, s, r, a = this;
        if (n = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 0) {
            for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(s.length / r), t = 0; t < o; t++) {
                var l = document.createElement("div");
                for (e = 0; e < a.options.rows; e++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var u = t * r + (e * a.options.slidesPerRow + i);
                        s.get(u) && c.appendChild(s.get(u))
                    }
                    l.appendChild(c)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, i) {
        var n, o, s, r = this,
            a = !1,
            l = r.$slider.width(),
            c = window.innerWidth || t(window).width();
        if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            o = null;
            for (n in r.breakpoints) r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
            null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = o), e || !1 === a || r.$slider.trigger("breakpoint", [r, a])
        }
    }, e.prototype.changeSlide = function(e, i) {
        var n, o, s, r = this,
            a = t(e.currentTarget);
        switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll != 0, n = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                break;
            case "next":
                o = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                break;
            case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(t) {
        var e, i, n = this;
        if (e = n.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
        else
            for (var o in e) {
                if (t < e[o]) {
                    t = i;
                    break
                }
                i = e[o]
            }
        return t
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var t, e = this;
        e.options.rows > 0 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
    }, e.prototype.clickHandler = function(t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function(e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function(t) {
        var e = this,
            i = {};
        i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function(t, e) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function(t) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var n = t(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = n.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var t = this,
            e = 0,
            i = 0,
            n = 0;
        if (!0 === t.options.infinite)
            if (t.slideCount <= t.options.slidesToShow) ++n;
            else
                for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (!0 === t.options.centerMode) n = t.slideCount;
        else if (t.options.asNavFor)
            for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return n - 1
    }, e.prototype.getLeft = function(t) {
        var e, i, n, o, s = this,
            r = 0;
        return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, o = -1, !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? o = -1.5 : 1 === s.options.slidesToShow && (o = -2)), r = i * s.options.slidesToShow * o), s.slideCount % s.options.slidesToScroll != 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1, r = (s.options.slidesToShow - (t - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, r = s.slideCount % s.options.slidesToScroll * i * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth, r = (t + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, r = 0), !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = !1 === s.options.vertical ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + r, !0 === s.options.variableWidth && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow), e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === s.options.centerMode && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1), e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, e += (s.$list.width() - n.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
        return this.options[t]
    }, e.prototype.getNavigableIndexes = function() {
        var t, e = this,
            i = 0,
            n = 0,
            o = [];
        for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) o.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return o
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(o, s) {
            if (s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * n.swipeLeft) return e = s, !1
        }), Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            i = Math.ceil(e.slideCount / e.options.slidesToShow),
            n = e.getNavigableIndexes().filter(function(t) {
                return t >= 0 && t < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
            var o = n.indexOf(i);
            if (t(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + i,
                    tabindex: -1
                }), -1 !== o) {
                var s = "slick-slide-control" + e.instanceUid + o;
                t("#" + s).length && t(this).attr({
                    "aria-describedby": s
                })
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function(o) {
            var s = n[o];
            t(this).attr({
                role: "presentation"
            }), t(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + o,
                "aria-controls": "slick-slide" + e.instanceUid + s,
                "aria-label": o + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = e.currentSlide, s = o + e.options.slidesToShow; o < s; o++) e.options.focusOnChange ? e.$slides.eq(o).attr({
            tabindex: "0"
        }) : e.$slides.eq(o).removeAttr("tabindex");
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (t("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
    }, e.prototype.initUI = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
    }, e.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            t("img[data-lazy]", e).each(function() {
                var e = t(this),
                    i = t(this).attr("data-lazy"),
                    n = t(this).attr("data-srcset"),
                    o = t(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (e.attr("srcset", n), o && e.attr("sizes", o)), e.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, i])
                    })
                }, s.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, i])
                }, s.src = i
            })
        }
        var i, n, o, s, r = this;
        if (!0 === r.options.centerMode ? !0 === r.options.infinite ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = Math.ceil(o + r.options.slidesToShow), !0 === r.options.fade && (o > 0 && o--, s <= r.slideCount && s++)), i = r.$slider.find(".slick-slide").slice(o, s), "anticipated" === r.options.lazyLoad)
            for (var a = o - 1, l = s, c = r.$slider.find(".slick-slide"), u = 0; u < r.options.slidesToScroll; u++) a < 0 && (a = r.slideCount - 1), i = i.add(c.eq(a)), i = i.add(c.eq(l)), a--, l++;
        e(i), r.slideCount <= r.options.slidesToShow ? (n = r.$slider.find(".slick-slide"), e(n)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (n = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(n)) : 0 === r.currentSlide && (n = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(n))
    }, e.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var i = this;
        if (!i.unslicked && (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange))) {
            t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()
        }
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var i, n, o, s, r, a = this,
            l = t("img[data-lazy]", a.$slider);
        l.length ? (i = l.first(), n = i.attr("data-lazy"), o = i.attr("data-srcset"), s = i.attr("data-sizes") || a.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function() {
            o && (i.attr("srcset", o), s && i.attr("sizes", s)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, n]), a.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                a.progressiveLazyLoad(e + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, n]), a.progressiveLazyLoad())
        }, r.src = n) : a.$slider.trigger("allImagesLoaded", [a])
    }, e.prototype.refresh = function(e) {
        var i, n, o = this;
        n = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > n && (o.currentSlide = n), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {
            currentSlide: i
        }), o.init(), e || o.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, i, n, o = this,
            s = o.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            o.respondTo = o.options.respondTo || "window";
            for (e in s)
                if (n = o.breakpoints.length - 1, s.hasOwnProperty(e)) {
                    for (i = s[e].breakpoint; n >= 0;) o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1), n--;
                    o.breakpoints.push(i), o.breakpointSettings[i] = s[e].settings
                } o.breakpoints.sort(function(t, e) {
                return o.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
        var n = this;
        if ("boolean" == typeof t ? (e = t, t = !0 === e ? 0 : n.slideCount - 1) : t = !0 === e ? --t : t, n.slideCount < 1 || t < 0 || t > n.slideCount - 1) return !1;
        n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
    }, e.prototype.setCSS = function(t) {
        var e, i, n = this,
            o = {};
        !0 === n.options.rtl && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", o[n.positionProp] = t, !1 === n.transformsEnabled ? n.$slideTrack.css(o) : (o = {}, !1 === n.cssTransitions ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
    }, e.prototype.setDimensions = function() {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(n, o) {
            e = i.slideWidth * n * -1, !0 === i.options.rtl ? t(o).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(o).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, i, n, o, s, r = this,
            a = !1;
        if ("object" === t.type(arguments[0]) ? (n = arguments[0], a = arguments[1], s = "multiple") : "string" === t.type(arguments[0]) && (n = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) r.options[n] = o;
        else if ("multiple" === s) t.each(n, function(t, e) {
            r.options[t] = e
        });
        else if ("responsive" === s)
            for (i in o)
                if ("array" !== t.type(r.options.responsive)) r.options.responsive = [o[i]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === o[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(o[i])
                } a && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function() {
        var t = this,
            e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
    }, e.prototype.setSlideClasses = function(t) {
        var e, i, n, o, s = this;
        if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), !0 === s.options.centerMode) {
            var r = s.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e + r, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t, i.slice(n - e + 1 + r, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")
        } else t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, n = !0 === s.options.infinite ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, i, n, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (i = null, o.slideCount > o.options.slidesToShow)) {
            for (n = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < n + o.slideCount; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(t) {
        var e = this;
        t || e.autoPlay(), e.interrupted = t
    }, e.prototype.selectHandler = function(e) {
        var i = this,
            n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            o = parseInt(n.attr("data-slick-index"));
        if (o || (o = 0), i.slideCount <= i.options.slidesToShow) return void i.slideHandler(o, !1, !0);
        i.slideHandler(o)
    }, e.prototype.slideHandler = function(t, e, i) {
        var n, o, s, r, a, l = null,
            c = this;
        if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t)) {
            if (!1 === e && c.asNavFor(t), n = t, l = c.getLeft(n), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) return void(!1 === c.options.fade && (n = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(r, function() {
                c.postSlide(n)
            }) : c.postSlide(n)));
            if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) return void(!1 === c.options.fade && (n = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(r, function() {
                c.postSlide(n)
            }) : c.postSlide(n)));
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), s = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = c.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide)), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(s), c.fadeSlide(o, function() {
                c.postSlide(o)
            })) : c.postSlide(o), void c.animateHeight();
            !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(l, function() {
                c.postSlide(o)
            }) : c.postSlide(o)
        }
    }, e.prototype.startLoad = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var t, e, i, n, o = this;
        return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === o.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === o.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(t) {
        var e, i, n = this;
        if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
        if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(e), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, e.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function(t) {
        var e, i, n, o, s, r, a = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || a.scrolling || s && 1 !== s.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, t.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + n * o : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, e.prototype.swipeStart = function(t) {
        var e, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
        void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var t = this;
        Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var t = this;
        t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
    }, t.fn.slick = function() {
        var t, i, n = this,
            o = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            r = n.length;
        for (t = 0; t < r; t++)
            if ("object" == typeof o || void 0 === o ? n[t].slick = new e(n[t], o) : i = n[t].slick[o].apply(n[t].slick, s), void 0 !== i) return i;
        return n
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return void(e && e.debug && window.console);
            var i = t.data(this[0], "validator");
            return i || (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(e) {
                i.submitButton = e.currentTarget, t(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function(e) {
                function n() {
                    var n, o;
                    return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), !i.settings.submitHandler || (o = i.settings.submitHandler.call(i, i.currentForm, e), n && n.remove(), void 0 !== o && o)
                }
                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var e, i, n;
            return t(this[0]).is("form") ? e = this.validate().form() : (n = [], e = !0, i = t(this[0].form).validate(), this.each(function() {
                (e = i.element(this) && e) || (n = n.concat(i.errorList))
            }), i.errorList = n), e
        },
        rules: function(e, i) {
            var n, o, s, r, a, l, c = this[0];
            if (null != c && (!c.form && c.hasAttribute("contenteditable") && (c.form = this.closest("form")[0], c.name = this.attr("name")), null != c.form)) {
                if (e) switch (n = t.data(c.form, "validator").settings, o = n.rules, s = t.validator.staticRules(c), e) {
                    case "add":
                        t.extend(s, t.validator.normalizeRule(i)), delete s.messages, o[c.name] = s, i.messages && (n.messages[c.name] = t.extend(n.messages[c.name], i.messages));
                        break;
                    case "remove":
                        return i ? (l = {}, t.each(i.split(/\s/), function(t, e) {
                            l[e] = s[e], delete s[e]
                        }), l) : (delete o[c.name], s)
                }
                return r = t.validator.normalizeRules(t.extend({}, t.validator.classRules(c), t.validator.attributeRules(c), t.validator.dataRules(c), t.validator.staticRules(c)), c), r.required && (a = r.required, delete r.required, r = t.extend({
                    required: a
                }, r)), r.remote && (a = r.remote, delete r.remote, r = t.extend(r, {
                    remote: a
                })), r
            }
        }
    }), t.extend(t.expr.pseudos || t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            var i = t(e).val();
            return null !== i && !!t.trim("" + i)
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
        return 1 === arguments.length ? function() {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : void 0 === i ? e : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            },
            onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function(e, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(e) || -1 !== t.inArray(i.keyCode, n) || (e.name in this.submitted || e.name in this.invalid) && this.element(e)
            },
            onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function(e, i, n) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
            },
            unhighlight: function(e, i, n) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}."),
            step: t.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = t(this).closest("form")[0], this.name = t(this).attr("name"));
                    var i = t.data(this.form, "validator"),
                        n = "on" + e.type.replace(/^validate/, ""),
                        o = i.settings;
                    o[n] && !t(this).is(o.ignore) && o[n].call(i, this, e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, n = this.groups = {};
                t.each(this.settings.groups, function(e, i) {
                    "string" == typeof i && (i = i.split(/\s/)), t.each(i, function(t, i) {
                        n[i] = e
                    })
                }), i = this.settings.rules, t.each(i, function(e, n) {
                    i[e] = t.validator.normalizeRule(n)
                }), t(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e), this.settings.invalidHandler && t(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                var i, n, o = this.clean(e),
                    s = this.validationTargetFor(o),
                    r = this,
                    a = !0;
                return void 0 === s ? delete this.invalid[o.name] : (this.prepareElement(s), this.currentElements = t(s), n = this.groups[s.name], n && t.each(this.groups, function(t, e) {
                    e === n && t !== s.name && (o = r.validationTargetFor(r.clean(r.findByName(t)))) && o.name in r.invalid && (r.currentElements.push(o), a = r.check(o) && a)
                }), i = !1 !== this.check(s), a = a && i, this.invalid[s.name] = !i, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), t(e).attr("aria-invalid", !i)), a
            },
            showErrors: function(e) {
                if (e) {
                    var i = this;
                    t.extend(this.errorMap, e), this.errorList = t.map(this.errorMap, function(t, e) {
                        return {
                            message: t,
                            element: i.findByName(e)[0]
                        }
                    }), this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var e = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(e)
            },
            resetElements: function(t) {
                var e;
                if (this.settings.unhighlight)
                    for (e = 0; t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, ""), this.findByName(t[e].name).removeClass(this.settings.validClass);
                else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e, i = 0;
                for (e in t) void 0 !== t[e] && null !== t[e] && !1 !== t[e] && i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(t) {
                t.not(this.containers).text(""), this.addWrapper(t).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            },
            elements: function() {
                var e = this,
                    i = {};
                return t(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var n = this.name || t(this).attr("name");
                    return !n && e.settings.debug && window.console, this.hasAttribute("contenteditable") && (this.form = t(this).closest("form")[0], this.name = n), !(n in i || !e.objectLength(t(this).rules())) && (i[n] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function(e) {
                var i, n, o = t(e),
                    s = e.type;
                return "radio" === s || "checkbox" === s ? this.findByName(e.name).filter(":checked").val() : "number" === s && void 0 !== e.validity ? e.validity.badInput ? "NaN" : o.val() : (i = e.hasAttribute("contenteditable") ? o.text() : o.val(), "file" === s ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (n = i.lastIndexOf("/")) >= 0 ? i.substr(n + 1) : (n = i.lastIndexOf("\\"), n >= 0 ? i.substr(n + 1) : i) : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, n, o, s, r = t(e).rules(),
                    a = t.map(r, function(t, e) {
                        return e
                    }).length,
                    l = !1,
                    c = this.elementValue(e);
                if ("function" == typeof r.normalizer ? s = r.normalizer : "function" == typeof this.settings.normalizer && (s = this.settings.normalizer), s) {
                    if ("string" != typeof(c = s.call(e, c))) throw new TypeError("The normalizer should return a string value.");
                    delete r.normalizer
                }
                for (n in r) {
                    o = {
                        method: n,
                        parameters: r[n]
                    };
                    try {
                        if ("dependency-mismatch" === (i = t.validator.methods[n].call(this, c, e, o.parameters)) && 1 === a) {
                            l = !0;
                            continue
                        }
                        if (l = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!i) return this.formatAndAdd(e, o), !1
                    } catch (t) {
                        throw this.settings.debug && window.console, t instanceof TypeError && (t.message += ".  Exception occurred when checking element " + e.id + ", check the '" + o.method + "' method."), t
                    }
                }
                if (!l) return this.objectLength(r) && this.successList.push(e), !0
            },
            customDataMessage: function(e, i) {
                return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            },
            customMessage: function(t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            },
            findDefined: function() {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t]
            },
            defaultMessage: function(e, i) {
                "string" == typeof i && (i = {
                    method: i
                });
                var n = this.findDefined(this.customMessage(e.name, i.method), this.customDataMessage(e, i.method), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i.method], "<strong>Warning: No message defined for " + e.name + "</strong>"),
                    o = /\$?\{(\d+)\}/g;
                return "function" == typeof n ? n = n.call(this, i.parameters, e) : o.test(n) && (n = t.validator.format(n.replace(o, "{$1}"), i.parameters)), n
            },
            formatAndAdd: function(t, e) {
                var i = this.defaultMessage(t, e);
                this.errorList.push({
                    message: i,
                    element: t,
                    method: e.method
                }), this.errorMap[t.name] = i, this.submitted[t.name] = i
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e, i;
                for (t = 0; this.errorList[t]; t++) i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, i) {
                var n, o, s, r, a = this.errorsFor(e),
                    l = this.idOrName(e),
                    c = t(e).attr("aria-describedby");
                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(i)) : (a = t("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""), n = a, this.settings.wrapper && (n = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, n, t(e)) : n.insertAfter(e), a.is("label") ? a.attr("for", l) : 0 === a.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (s = a.attr("id"), c ? c.match(new RegExp("\\b" + this.escapeCssMeta(s) + "\\b")) || (c += " " + s) : c = s, t(e).attr("aria-describedby", c), (o = this.groups[e.name]) && (r = this, t.each(r.groups, function(e, i) {
                    i === o && t("[name='" + r.escapeCssMeta(e) + "']", r.currentForm).attr("aria-describedby", a.attr("id"))
                })))), !i && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, e)), this.toShow = this.toShow.add(a)
            },
            errorsFor: function(e) {
                var i = this.escapeCssMeta(this.idOrName(e)),
                    n = t(e).attr("aria-describedby"),
                    o = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (o = o + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(o)
            },
            escapeCssMeta: function(t) {
                return t.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + this.escapeCssMeta(e) + "']")
            },
            getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
            },
            dependTypes: {
                boolean: function(t) {
                    return t
                },
                string: function(e, i) {
                    return !!t(e, i.form).length
                },
                function: function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            },
            startRequest: function(e) {
                this.pending[e.name] || (this.pendingRequest++, t(e).addClass(this.settings.pendingClass), this.pending[e.name] = !0)
            },
            stopRequest: function(e, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], t(e).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.submitButton && t("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e, i) {
                return i = "string" == typeof i && i || "remote", t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, {
                        method: i
                    })
                })
            },
            destroy: function() {
                this.resetForm(), t(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var i = {},
                n = t(e).attr("class");
            return n && t.each(n.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function(t, e, i, n) {
            /min|max|step/.test(i) && (null === e || /number|range|text/.test(e)) && (n = Number(n), isNaN(n) && (n = void 0)), n || 0 === n ? t[i] = n : e === i && "range" !== e && (t[i] = !0)
        },
        attributeRules: function(e) {
            var i, n, o = {},
                s = t(e),
                r = e.getAttribute("type");
            for (i in t.validator.methods) "required" === i ? (n = e.getAttribute(i), "" === n && (n = !0), n = !!n) : n = s.attr(i), this.normalizeAttributeRule(o, r, i, n);
            return o.maxlength && /-1|2147483647|524288/.test(o.maxlength) && delete o.maxlength, o
        },
        dataRules: function(e) {
            var i, n, o = {},
                s = t(e),
                r = e.getAttribute("type");
            for (i in t.validator.methods) n = s.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(o, r, i, n);
            return o
        },
        staticRules: function(e) {
            var i = {},
                n = t.data(e.form, "validator");
            return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function(e, i) {
            return t.each(e, function(n, o) {
                if (!1 === o) return void delete e[n];
                if (o.param || o.depends) {
                    var s = !0;
                    switch (typeof o.depends) {
                        case "string":
                            s = !!t(o.depends, i.form).length;
                            break;
                        case "function":
                            s = o.depends.call(i, i)
                    }
                    s ? e[n] = void 0 === o.param || o.param : (t.data(i.form, "validator").resetElements(t(i)), delete e[n])
                }
            }), t.each(e, function(n, o) {
                e[n] = t.isFunction(o) && "normalizer" !== n ? o(i) : o
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function(e, i, n) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, i, n) {
                if (!this.depend(n, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var o = t(i).val();
                    return o && o.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : e.length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            minlength: function(e, i, n) {
                var o = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || o >= n
            },
            maxlength: function(e, i, n) {
                var o = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || o <= n
            },
            rangelength: function(e, i, n) {
                var o = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || o >= n[0] && o <= n[1]
            },
            min: function(t, e, i) {
                return this.optional(e) || t >= i
            },
            max: function(t, e, i) {
                return this.optional(e) || t <= i
            },
            range: function(t, e, i) {
                return this.optional(e) || t >= i[0] && t <= i[1]
            },
            step: function(e, i, n) {
                var o, s = t(i).attr("type"),
                    r = "Step attribute on input type " + s + " is not supported.",
                    a = ["text", "number", "range"],
                    l = new RegExp("\\b" + s + "\\b"),
                    c = s && !l.test(a.join()),
                    u = function(t) {
                        var e = ("" + t).match(/(?:\.(\d+))?$/);
                        return e && e[1] ? e[1].length : 0
                    },
                    d = function(t) {
                        return Math.round(t * Math.pow(10, o))
                    },
                    h = !0;
                if (c) throw new Error(r);
                return o = u(n), (u(e) > o || d(e) % d(n) != 0) && (h = !1), this.optional(i) || h
            },
            equalTo: function(e, i, n) {
                var o = t(n);
                return this.settings.onfocusout && o.not(".validate-equalTo-blur").length && o.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    t(i).valid()
                }), e === o.val()
            },
            remote: function(e, i, n, o) {
                if (this.optional(i)) return "dependency-mismatch";
                o = "string" == typeof o && o || "remote";
                var s, r, a, l = this.previousValue(i, o);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][o], this.settings.messages[i.name][o] = l.message, n = "string" == typeof n && {
                        url: n
                    } || n,
                    a = t.param(t.extend({
                        data: e
                    }, n.data)), l.old === a ? l.valid : (l.old = a, s = this, this.startRequest(i), r = {}, r[i.name] = e, t.ajax(t.extend(!0, {
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: r,
                        context: s.currentForm,
                        success: function(t) {
                            var n, r, a, c = !0 === t || "true" === t;
                            s.settings.messages[i.name][o] = l.originalMessage, c ? (a = s.formSubmitted, s.resetInternals(), s.toHide = s.errorsFor(i), s.formSubmitted = a, s.successList.push(i), s.invalid[i.name] = !1, s.showErrors()) : (n = {}, r = t || s.defaultMessage(i, {
                                method: o,
                                parameters: e
                            }), n[i.name] = l.message = r, s.invalid[i.name] = !0, s.showErrors(n)), l.valid = c, s.stopRequest(i, c)
                        }
                    }, n)), "pending")
            }
        }
    });
    var e, i = {};
    return t.ajaxPrefilter ? t.ajaxPrefilter(function(t, e, n) {
        var o = t.port;
        "abort" === t.mode && (i[o] && i[o].abort(), i[o] = n)
    }) : (e = t.ajax, t.ajax = function(n) {
        var o = ("mode" in n ? n : t.ajaxSettings).mode,
            s = ("port" in n ? n : t.ajaxSettings).port;
        return "abort" === o ? (i[s] && i[s].abort(), i[s] = e.apply(this, arguments), i[s]) : e.apply(this, arguments)
    }), t
}),
function(t, e, i, n) {
    "use strict";

    function o(t, e, i) {
        return setTimeout(c(t, i), e)
    }

    function s(t, e, i) {
        return !!Array.isArray(t) && (r(t, i[e], i), !0)
    }

    function r(t, e, i) {
        var o;
        if (t)
            if (t.forEach) t.forEach(e, i);
            else if (t.length !== n)
            for (o = 0; o < t.length;) e.call(i, t[o], o, t), o++;
        else
            for (o in t) t.hasOwnProperty(o) && e.call(i, t[o], o, t)
    }

    function a(e, i, n) {
        var o = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
        return function() {
            var i = new Error("get-stack-trace"),
                n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                s = t.console && (t.console.warn || t.console.log);
            return s && s.call(t.console, o, n), e.apply(this, arguments)
        }
    }

    function l(t, e, i) {
        var n, o = e.prototype;
        n = t.prototype = Object.create(o), n.constructor = t, n._super = o, i && ut(n, i)
    }

    function c(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function u(t, e) {
        return typeof t == pt ? t.apply(e ? e[0] || n : n, e) : t
    }

    function d(t, e) {
        return t === n ? e : t
    }

    function h(t, e, i) {
        r(m(e), function(e) {
            t.addEventListener(e, i, !1)
        })
    }

    function p(t, e, i) {
        r(m(e), function(e) {
            t.removeEventListener(e, i, !1)
        })
    }

    function f(t, e) {
        for (; t;) {
            if (t == e) return !0;
            t = t.parentNode
        }
        return !1
    }

    function g(t, e) {
        return t.indexOf(e) > -1
    }

    function m(t) {
        return t.trim().split(/\s+/g)
    }

    function v(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);
        for (var n = 0; n < t.length;) {
            if (i && t[n][i] == e || !i && t[n] === e) return n;
            n++
        }
        return -1
    }

    function y(t) {
        return Array.prototype.slice.call(t, 0)
    }

    function b(t, e, i) {
        for (var n = [], o = [], s = 0; s < t.length;) {
            var r = e ? t[s][e] : t[s];
            v(o, r) < 0 && n.push(t[s]), o[s] = r, s++
        }
        return i && (n = e ? n.sort(function(t, i) {
            return t[e] > i[e]
        }) : n.sort()), n
    }

    function w(t, e) {
        for (var i, o, s = e[0].toUpperCase() + e.slice(1), r = 0; r < dt.length;) {
            if (i = dt[r], (o = i ? i + s : e) in t) return o;
            r++
        }
        return n
    }

    function T() {
        return bt++
    }

    function C(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t
    }

    function _(t, e) {
        var i = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
            u(t.options.enable, [t]) && i.handler(e)
        }, this.init()
    }

    function x(t) {
        var e = t.options.inputClass;
        return new(e || (Ct ? H : _t ? U : Tt ? V : F))(t, E)
    }

    function E(t, e, i) {
        var n = i.pointers.length,
            o = i.changedPointers.length,
            s = e & Et && n - o == 0,
            r = e & (St | Dt) && n - o == 0;
        i.isFirst = !!s, i.isFinal = !!r, s && (t.session = {}), i.eventType = e, k(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
    }

    function k(t, e) {
        var i = t.session,
            n = e.pointers,
            o = n.length;
        i.firstInput || (i.firstInput = A(e)), o > 1 && !i.firstMultiple ? i.firstMultiple = A(e) : 1 === o && (i.firstMultiple = !1);
        var s = i.firstInput,
            r = i.firstMultiple,
            a = r ? r.center : s.center,
            l = e.center = O(n);
        e.timeStamp = mt(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = L(a, l), e.distance = P(a, l), S(i, e), e.offsetDirection = M(e.deltaX, e.deltaY);
        var c = I(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = c.x, e.overallVelocityY = c.y, e.overallVelocity = gt(c.x) > gt(c.y) ? c.x : c.y, e.scale = r ? $(r.pointers, n) : 1, e.rotation = r ? N(r.pointers, n) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length, D(i, e);
        var u = t.element;
        f(e.srcEvent.target, u) && (u = e.srcEvent.target), e.target = u
    }

    function S(t, e) {
        var i = e.center,
            n = t.offsetDelta || {},
            o = t.prevDelta || {},
            s = t.prevInput || {};
        e.eventType !== Et && s.eventType !== St || (o = t.prevDelta = {
            x: s.deltaX || 0,
            y: s.deltaY || 0
        }, n = t.offsetDelta = {
            x: i.x,
            y: i.y
        }), e.deltaX = o.x + (i.x - n.x), e.deltaY = o.y + (i.y - n.y)
    }

    function D(t, e) {
        var i, o, s, r, a = t.lastInterval || e,
            l = e.timeStamp - a.timeStamp;
        if (e.eventType != Dt && (l > xt || a.velocity === n)) {
            var c = e.deltaX - a.deltaX,
                u = e.deltaY - a.deltaY,
                d = I(l, c, u);
            o = d.x, s = d.y, i = gt(d.x) > gt(d.y) ? d.x : d.y, r = M(c, u), t.lastInterval = e
        } else i = a.velocity, o = a.velocityX, s = a.velocityY, r = a.direction;
        e.velocity = i, e.velocityX = o, e.velocityY = s, e.direction = r
    }

    function A(t) {
        for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
            clientX: ft(t.pointers[i].clientX),
            clientY: ft(t.pointers[i].clientY)
        }, i++;
        return {
            timeStamp: mt(),
            pointers: e,
            center: O(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }

    function O(t) {
        var e = t.length;
        if (1 === e) return {
            x: ft(t[0].clientX),
            y: ft(t[0].clientY)
        };
        for (var i = 0, n = 0, o = 0; o < e;) i += t[o].clientX, n += t[o].clientY, o++;
        return {
            x: ft(i / e),
            y: ft(n / e)
        }
    }

    function I(t, e, i) {
        return {
            x: e / t || 0,
            y: i / t || 0
        }
    }

    function M(t, e) {
        return t === e ? At : gt(t) >= gt(e) ? t < 0 ? Ot : It : e < 0 ? Mt : Pt
    }

    function P(t, e, i) {
        i || (i = Ft);
        var n = e[i[0]] - t[i[0]],
            o = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + o * o)
    }

    function L(t, e, i) {
        i || (i = Ft);
        var n = e[i[0]] - t[i[0]],
            o = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(o, n) / Math.PI
    }

    function N(t, e) {
        return L(e[1], e[0], Ht) + L(t[1], t[0], Ht)
    }

    function $(t, e) {
        return P(e[0], e[1], Ht) / P(t[0], t[1], Ht)
    }

    function F() {
        this.evEl = jt, this.evWin = Ut, this.pressed = !1, _.apply(this, arguments)
    }

    function H() {
        this.evEl = zt, this.evWin = qt, _.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function R() {
        this.evTarget = Yt, this.evWin = Xt, this.started = !1, _.apply(this, arguments)
    }

    function j(t, e) {
        var i = y(t.touches),
            n = y(t.changedTouches);
        return e & (St | Dt) && (i = b(i.concat(n), "identifier", !0)), [i, n]
    }

    function U() {
        this.evTarget = Kt, this.targetIds = {}, _.apply(this, arguments)
    }

    function W(t, e) {
        var i = y(t.touches),
            n = this.targetIds;
        if (e & (Et | kt) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
        var o, s, r = y(t.changedTouches),
            a = [],
            l = this.target;
        if (s = i.filter(function(t) {
                return f(t.target, l)
            }), e === Et)
            for (o = 0; o < s.length;) n[s[o].identifier] = !0, o++;
        for (o = 0; o < r.length;) n[r[o].identifier] && a.push(r[o]), e & (St | Dt) && delete n[r[o].identifier], o++;
        return a.length ? [b(s.concat(a), "identifier", !0), a] : void 0
    }

    function V() {
        _.apply(this, arguments);
        var t = c(this.handler, this);
        this.touch = new U(this.manager, t), this.mouse = new F(this.manager, t), this.primaryTouch = null, this.lastTouches = []
    }

    function z(t, e) {
        t & Et ? (this.primaryTouch = e.changedPointers[0].identifier, q.call(this, e)) : t & (St | Dt) && q.call(this, e)
    }

    function q(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var i = {
                x: e.clientX,
                y: e.clientY
            };
            this.lastTouches.push(i);
            var n = this.lastTouches,
                o = function() {
                    var t = n.indexOf(i);
                    t > -1 && n.splice(t, 1)
                };
            setTimeout(o, Qt)
        }
    }

    function B(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
            var o = this.lastTouches[n],
                s = Math.abs(e - o.x),
                r = Math.abs(i - o.y);
            if (s <= Zt && r <= Zt) return !0
        }
        return !1
    }

    function Y(t, e) {
        this.manager = t, this.set(e)
    }

    function X(t) {
        if (g(t, ne)) return ne;
        var e = g(t, oe),
            i = g(t, se);
        return e && i ? ne : e || i ? e ? oe : se : g(t, ie) ? ie : ee
    }

    function G(t) {
        this.options = ut({}, this.defaults, t || {}), this.id = T(), this.manager = null, this.options.enable = d(this.options.enable, !0), this.state = ae, this.simultaneous = {}, this.requireFail = []
    }

    function K(t) {
        return t & he ? "cancel" : t & ue ? "end" : t & ce ? "move" : t & le ? "start" : ""
    }

    function Q(t) {
        return t == Pt ? "down" : t == Mt ? "up" : t == Ot ? "left" : t == It ? "right" : ""
    }

    function Z(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }

    function J() {
        G.apply(this, arguments)
    }

    function tt() {
        J.apply(this, arguments), this.pX = null, this.pY = null
    }

    function et() {
        J.apply(this, arguments)
    }

    function it() {
        G.apply(this, arguments), this._timer = null, this._input = null
    }

    function nt() {
        J.apply(this, arguments)
    }

    function ot() {
        J.apply(this, arguments)
    }

    function st() {
        G.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function rt(t, e) {
        return e = e || {}, e.recognizers = d(e.recognizers, rt.defaults.preset), new at(t, e)
    }

    function at(t, e) {
        this.options = ut({}, rt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = x(this), this.touchAction = new Y(this, this.options.touchAction), lt(this, !0), r(this.options.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }

    function lt(t, e) {
        var i = t.element;
        if (i.style) {
            var n;
            r(t.options.cssProps, function(o, s) {
                n = w(i.style, s), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = o) : i.style[n] = t.oldCssProps[n] || ""
            }), e || (t.oldCssProps = {})
        }
    }

    function ct(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
    }
    var ut, dt = ["", "webkit", "Moz", "MS", "ms", "o"],
        ht = e.createElement("div"),
        pt = "function",
        ft = Math.round,
        gt = Math.abs,
        mt = Date.now;
    ut = "function" != typeof Object.assign ? function(t) {
        if (t === n || null === t) throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (o !== n && null !== o)
                for (var s in o) o.hasOwnProperty(s) && (e[s] = o[s])
        }
        return e
    } : Object.assign;
    var vt = a(function(t, e, i) {
            for (var o = Object.keys(e), s = 0; s < o.length;)(!i || i && t[o[s]] === n) && (t[o[s]] = e[o[s]]), s++;
            return t
        }, "extend", "Use `assign`."),
        yt = a(function(t, e) {
            return vt(t, e, !0)
        }, "merge", "Use `assign`."),
        bt = 1,
        wt = /mobile|tablet|ip(ad|hone|od)|android/i,
        Tt = "ontouchstart" in t,
        Ct = w(t, "PointerEvent") !== n,
        _t = Tt && wt.test(navigator.userAgent),
        xt = 25,
        Et = 1,
        kt = 2,
        St = 4,
        Dt = 8,
        At = 1,
        Ot = 2,
        It = 4,
        Mt = 8,
        Pt = 16,
        Lt = Ot | It,
        Nt = Mt | Pt,
        $t = Lt | Nt,
        Ft = ["x", "y"],
        Ht = ["clientX", "clientY"];
    _.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(C(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(C(this.element), this.evWin, this.domHandler)
        }
    };
    var Rt = {
            mousedown: Et,
            mousemove: kt,
            mouseup: St
        },
        jt = "mousedown",
        Ut = "mousemove mouseup";
    l(F, _, {
        handler: function(t) {
            var e = Rt[t.type];
            e & Et && 0 === t.button && (this.pressed = !0), e & kt && 1 !== t.which && (e = St), this.pressed && (e & St && (this.pressed = !1), this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: "mouse",
                srcEvent: t
            }))
        }
    });
    var Wt = {
            pointerdown: Et,
            pointermove: kt,
            pointerup: St,
            pointercancel: Dt,
            pointerout: Dt
        },
        Vt = {
            2: "touch",
            3: "pen",
            4: "mouse",
            5: "kinect"
        },
        zt = "pointerdown",
        qt = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (zt = "MSPointerDown", qt = "MSPointerMove MSPointerUp MSPointerCancel"), l(H, _, {
        handler: function(t) {
            var e = this.store,
                i = !1,
                n = t.type.toLowerCase().replace("ms", ""),
                o = Wt[n],
                s = Vt[t.pointerType] || t.pointerType,
                r = "touch" == s,
                a = v(e, t.pointerId, "pointerId");
            o & Et && (0 === t.button || r) ? a < 0 && (e.push(t), a = e.length - 1) : o & (St | Dt) && (i = !0), a < 0 || (e[a] = t, this.callback(this.manager, o, {
                pointers: e,
                changedPointers: [t],
                pointerType: s,
                srcEvent: t
            }), i && e.splice(a, 1))
        }
    });
    var Bt = {
            touchstart: Et,
            touchmove: kt,
            touchend: St,
            touchcancel: Dt
        },
        Yt = "touchstart",
        Xt = "touchstart touchmove touchend touchcancel";
    l(R, _, {
        handler: function(t) {
            var e = Bt[t.type];
            if (e === Et && (this.started = !0), this.started) {
                var i = j.call(this, t, e);
                e & (St | Dt) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: "touch",
                    srcEvent: t
                })
            }
        }
    });
    var Gt = {
            touchstart: Et,
            touchmove: kt,
            touchend: St,
            touchcancel: Dt
        },
        Kt = "touchstart touchmove touchend touchcancel";
    l(U, _, {
        handler: function(t) {
            var e = Gt[t.type],
                i = W.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: "touch",
                srcEvent: t
            })
        }
    });
    var Qt = 2500,
        Zt = 25;
    l(V, _, {
        handler: function(t, e, i) {
            var n = "touch" == i.pointerType,
                o = "mouse" == i.pointerType;
            if (!(o && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                if (n) z.call(this, e, i);
                else if (o && B.call(this, i)) return;
                this.callback(t, e, i)
            }
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Jt = w(ht.style, "touchAction"),
        te = Jt !== n,
        ee = "auto",
        ie = "manipulation",
        ne = "none",
        oe = "pan-x",
        se = "pan-y",
        re = function() {
            if (!te) return !1;
            var e = {},
                i = t.CSS && t.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
                e[n] = !i || t.CSS.supports("touch-action", n)
            }), e
        }();
    Y.prototype = {
        set: function(t) {
            "compute" == t && (t = this.compute()), te && this.manager.element.style && re[t] && (this.manager.element.style[Jt] = t), this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var t = [];
            return r(this.manager.recognizers, function(e) {
                u(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }), X(t.join(" "))
        },
        preventDefaults: function(t) {
            var e = t.srcEvent,
                i = t.offsetDirection;
            if (this.manager.session.prevented) return void e.preventDefault();
            var n = this.actions,
                o = g(n, ne) && !re[ne],
                s = g(n, se) && !re[se],
                r = g(n, oe) && !re[oe];
            if (o) {
                var a = 1 === t.pointers.length,
                    l = t.distance < 2,
                    c = t.deltaTime < 250;
                if (a && l && c) return
            }
            return r && s ? void 0 : o || s && i & Lt || r && i & Nt ? this.preventSrc(e) : void 0
        },
        preventSrc: function(t) {
            this.manager.session.prevented = !0, t.preventDefault()
        }
    };
    var ae = 1,
        le = 2,
        ce = 4,
        ue = 8,
        de = ue,
        he = 16;
    G.prototype = {
        defaults: {},
        set: function(t) {
            return ut(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(t) {
            if (s(t, "recognizeWith", this)) return this;
            var e = this.simultaneous;
            return t = Z(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },
        dropRecognizeWith: function(t) {
            return s(t, "dropRecognizeWith", this) ? this : (t = Z(t, this), delete this.simultaneous[t.id], this)
        },
        requireFailure: function(t) {
            if (s(t, "requireFailure", this)) return this;
            var e = this.requireFail;
            return t = Z(t, this), -1 === v(e, t) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function(t) {
            if (s(t, "dropRequireFailure", this)) return this;
            t = Z(t, this);
            var e = v(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(t) {
            function e(e) {
                i.manager.emit(e, t)
            }
            var i = this,
                n = this.state;
            n < ue && e(i.options.event + K(n)), e(i.options.event), t.additionalEvent && e(t.additionalEvent), n >= ue && e(i.options.event + K(n))
        },
        tryEmit: function(t) {
            if (this.canEmit()) return this.emit(t);
            this.state = 32
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (32 | ae))) return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = ut({}, t);
            if (!u(this.options.enable, [this, e])) return this.reset(), void(this.state = 32);
            this.state & (de | he | 32) && (this.state = ae), this.state = this.process(e), this.state & (le | ce | ue | he) && this.tryEmit(e)
        },
        process: function(t) {},
        getTouchAction: function() {},
        reset: function() {}
    }, l(J, G, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state,
                i = t.eventType,
                n = e & (le | ce),
                o = this.attrTest(t);
            return n && (i & Dt || !o) ? e | he : n || o ? i & St ? e | ue : e & le ? e | ce : le : 32
        }
    }), l(tt, J, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: $t
        },
        getTouchAction: function() {
            var t = this.options.direction,
                e = [];
            return t & Lt && e.push(se), t & Nt && e.push(oe), e
        },
        directionTest: function(t) {
            var e = this.options,
                i = !0,
                n = t.distance,
                o = t.direction,
                s = t.deltaX,
                r = t.deltaY;
            return o & e.direction || (e.direction & Lt ? (o = 0 === s ? At : s < 0 ? Ot : It, i = s != this.pX, n = Math.abs(t.deltaX)) : (o = 0 === r ? At : r < 0 ? Mt : Pt, i = r != this.pY, n = Math.abs(t.deltaY))), t.direction = o, i && n > e.threshold && o & e.direction
        },
        attrTest: function(t) {
            return J.prototype.attrTest.call(this, t) && (this.state & le || !(this.state & le) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = Q(t.direction);
            e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
        }
    }), l(et, J, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ne]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & le)
        },
        emit: function(t) {
            if (1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
        }
    }), l(it, G, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [ee]
        },
        process: function(t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                n = t.distance < e.threshold,
                s = t.deltaTime > e.time;
            if (this._input = t, !n || !i || t.eventType & (St | Dt) && !s) this.reset();
            else if (t.eventType & Et) this.reset(), this._timer = o(function() {
                this.state = de, this.tryEmit()
            }, e.time, this);
            else if (t.eventType & St) return de;
            return 32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === de && (t && t.eventType & St ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = mt(), this.manager.emit(this.options.event, this._input)))
        }
    }), l(nt, J, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ne]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & le)
        }
    }), l(ot, J, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Lt | Nt,
            pointers: 1
        },
        getTouchAction: function() {
            return tt.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var e, i = this.options.direction;
            return i & (Lt | Nt) ? e = t.overallVelocity : i & Lt ? e = t.overallVelocityX : i & Nt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && gt(e) > this.options.velocity && t.eventType & St
        },
        emit: function(t) {
            var e = Q(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
    }), l(st, G, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ie]
        },
        process: function(t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                n = t.distance < e.threshold,
                s = t.deltaTime < e.time;
            if (this.reset(), t.eventType & Et && 0 === this.count) return this.failTimeout();
            if (n && s && i) {
                if (t.eventType != St) return this.failTimeout();
                var r = !this.pTime || t.timeStamp - this.pTime < e.interval,
                    a = !this.pCenter || P(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp, this.pCenter = t.center, a && r ? this.count += 1 : this.count = 1, this._input = t;
                if (0 === this.count % e.taps) return this.hasRequireFailures() ? (this._timer = o(function() {
                    this.state = de, this.tryEmit()
                }, e.interval, this), le) : de
            }
            return 32
        },
        failTimeout: function() {
            return this._timer = o(function() {
                this.state = 32
            }, this.options.interval, this), 32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == de && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), rt.VERSION = "2.0.7", rt.defaults = {
        domEvents: !1,
        touchAction: "compute",
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [nt, {
                enable: !1
            }],
            [et, {
                    enable: !1
                },
                ["rotate"]
            ],
            [ot, {
                direction: Lt
            }],
            [tt, {
                    direction: Lt
                },
                ["swipe"]
            ],
            [st],
            [st, {
                    event: "doubletap",
                    taps: 2
                },
                ["tap"]
            ],
            [it]
        ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    at.prototype = {
        set: function(t) {
            return ut(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function(t) {
            this.session.stopped = t ? 2 : 1
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, n = this.recognizers,
                    o = e.curRecognizer;
                (!o || o && o.state & de) && (o = e.curRecognizer = null);
                for (var s = 0; s < n.length;) i = n[s], 2 === e.stopped || o && i != o && !i.canRecognizeWith(o) ? i.reset() : i.recognize(t), !o && i.state & (le | ce | ue) && (o = e.curRecognizer = i), s++
            }
        },
        get: function(t) {
            if (t instanceof G) return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t) return e[i];
            return null
        },
        add: function(t) {
            if (s(t, "add", this)) return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },
        remove: function(t) {
            if (s(t, "remove", this)) return this;
            if (t = this.get(t)) {
                var e = this.recognizers,
                    i = v(e, t); - 1 !== i && (e.splice(i, 1), this.touchAction.update())
            }
            return this
        },
        on: function(t, e) {
            if (t !== n && e !== n) {
                var i = this.handlers;
                return r(m(t), function(t) {
                    i[t] = i[t] || [], i[t].push(e)
                }), this
            }
        },
        off: function(t, e) {
            if (t !== n) {
                var i = this.handlers;
                return r(m(t), function(t) {
                    e ? i[t] && i[t].splice(v(i[t], e), 1) : delete i[t]
                }), this
            }
        },
        emit: function(t, e) {
            this.options.domEvents && ct(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                e.type = t, e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                };
                for (var n = 0; n < i.length;) i[n](e), n++
            }
        },
        destroy: function() {
            this.element && lt(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, ut(rt, {
        INPUT_START: Et,
        INPUT_MOVE: kt,
        INPUT_END: St,
        INPUT_CANCEL: Dt,
        STATE_POSSIBLE: ae,
        STATE_BEGAN: le,
        STATE_CHANGED: ce,
        STATE_ENDED: ue,
        STATE_RECOGNIZED: de,
        STATE_CANCELLED: he,
        STATE_FAILED: 32,
        DIRECTION_NONE: At,
        DIRECTION_LEFT: Ot,
        DIRECTION_RIGHT: It,
        DIRECTION_UP: Mt,
        DIRECTION_DOWN: Pt,
        DIRECTION_HORIZONTAL: Lt,
        DIRECTION_VERTICAL: Nt,
        DIRECTION_ALL: $t,
        Manager: at,
        Input: _,
        TouchAction: Y,
        TouchInput: U,
        MouseInput: F,
        PointerEventInput: H,
        TouchMouseInput: V,
        SingleTouchInput: R,
        Recognizer: G,
        AttrRecognizer: J,
        Tap: st,
        Pan: tt,
        Swipe: ot,
        Pinch: et,
        Rotate: nt,
        Press: it,
        on: h,
        off: p,
        each: r,
        merge: yt,
        extend: vt,
        assign: ut,
        inherit: l,
        bindFn: c,
        prefixed: w
    }), (void 0 !== t ? t : "undefined" != typeof self ? self : {}).Hammer = rt, "function" == typeof define && define.amd ? define(function() {
        return rt
    }) : "undefined" != typeof module && module.exports ? module.exports = rt : t.Hammer = rt
}(window, document),
function(t, e) {
    "use strict";

    function i(i, n, s, a, l) {
        function c() {
            x = t.devicePixelRatio > 1, s = u(s), n.delay >= 0 && setTimeout(function() {
                d(!0)
            }, n.delay), (n.delay < 0 || n.combined) && (a.e = y(n.throttle, function(t) {
                "resize" === t.type && (C = _ = -1), d(t.all)
            }), a.a = function(t) {
                t = u(t), s.push.apply(s, t)
            }, a.g = function() {
                return s = o(s).filter(function() {
                    return !o(this).data(n.loadedName)
                })
            }, a.f = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = s.filter(function() {
                        return this === t[e]
                    });
                    i.length && d(!1, i)
                }
            }, d(), o(n.appendScroll).on("scroll." + l + " resize." + l, a.e))
        }

        function u(t) {
            var s = n.defaultImage,
                r = n.placeholder,
                a = n.imageBase,
                l = n.srcsetAttribute,
                c = n.loaderAttribute,
                u = n._f || {};
            t = o(t).filter(function() {
                var t = o(this),
                    i = m(this);
                return !t.data(n.handledName) && (t.attr(n.attribute) || t.attr(l) || t.attr(c) || u[i] !== e)
            }).data("plugin_" + n.name, i);
            for (var d = 0, h = t.length; d < h; d++) {
                var p = o(t[d]),
                    f = m(t[d]),
                    g = p.attr(n.imageBaseAttribute) || a;
                f === D && g && p.attr(l) && p.attr(l, v(p.attr(l), g)), u[f] === e || p.attr(c) || p.attr(c, u[f]), f === D && s && !p.attr(A) ? p.attr(A, s) : f === D || !r || p.css(M) && "none" !== p.css(M) || p.css(M, "url('" + r + "')")
            }
            return t
        }

        function d(t, e) {
            if (!s.length) return void(n.autoDestroy && i.destroy());
            for (var r = e || s, a = !1, l = n.imageBase || "", c = n.srcsetAttribute, u = n.handledName, d = 0; d < r.length; d++)
                if (t || e || p(r[d])) {
                    var f = o(r[d]),
                        g = m(r[d]),
                        v = f.attr(n.attribute),
                        y = f.attr(n.imageBaseAttribute) || l,
                        b = f.attr(n.loaderAttribute);
                    f.data(u) || n.visibleOnly && !f.is(":visible") || !((v || f.attr(c)) && (g === D && (y + v !== f.attr(A) || f.attr(c) !== f.attr(O)) || g !== D && y + v !== f.css(M)) || b) || (a = !0, f.data(u, !0), h(f, g, y, b))
                } a && (s = o(s).filter(function() {
                return !o(this).data(u)
            }))
        }

        function h(t, e, i, s) {
            ++T;
            var r = function() {
                w("onError", t), b(), r = o.noop
            };
            w("beforeLoad", t);
            var a = n.attribute,
                l = n.srcsetAttribute,
                c = n.sizesAttribute,
                u = n.retinaAttribute,
                d = n.removeAttribute,
                h = n.loadedName,
                p = t.attr(u);
            if (s) {
                var f = function() {
                    d && t.removeAttr(n.loaderAttribute), t.data(h, !0), w(E, t), setTimeout(b, 1), f = o.noop
                };
                t.off(S).one(S, r).one(k, f), w(s, t, function(e) {
                    e ? (t.off(k), f()) : (t.off(S), r())
                }) || t.trigger(S)
            } else {
                var g = o(new Image);
                g.one(S, r).one(k, function() {
                    t.hide(), e === D ? t.attr(I, g.attr(I)).attr(O, g.attr(O)).attr(A, g.attr(A)) : t.css(M, "url('" + g.attr(A) + "')"), t[n.effect](n.effectTime), d && (t.removeAttr(a + " " + l + " " + u + " " + n.imageBaseAttribute), c !== I && t.removeAttr(c)), t.data(h, !0), w(E, t), g.remove(), b()
                });
                var m = (x && p ? p : t.attr(a)) || "";
                g.attr(I, t.attr(c)).attr(O, t.attr(l)).attr(A, m ? i + m : null), g.complete && g.trigger(k)
            }
        }

        function p(t) {
            var e = t.getBoundingClientRect(),
                i = n.scrollDirection,
                o = n.threshold,
                s = g() + o > e.top && -o < e.bottom,
                r = f() + o > e.left && -o < e.right;
            return "vertical" === i ? s : "horizontal" === i ? r : s && r
        }

        function f() {
            return C >= 0 ? C : C = o(t).width()
        }

        function g() {
            return _ >= 0 ? _ : _ = o(t).height()
        }

        function m(t) {
            return t.tagName.toLowerCase()
        }

        function v(t, e) {
            if (e) {
                var i = t.split(",");
                t = "";
                for (var n = 0, o = i.length; n < o; n++) t += e + i[n].trim() + (n !== o - 1 ? "," : "")
            }
            return t
        }

        function y(t, e) {
            var o, s = 0;
            return function(r, a) {
                function l() {
                    s = +new Date, e.call(i, r)
                }
                var c = +new Date - s;
                o && clearTimeout(o), c > t || !n.enableThrottle || a ? l() : o = setTimeout(l, t - c)
            }
        }

        function b() {
            --T, s.length || T || w("onFinishedAll")
        }

        function w(t, e, o) {
            return !!(t = n[t]) && (t.apply(i, [].slice.call(arguments, 1)), !0)
        }
        var T = 0,
            C = -1,
            _ = -1,
            x = !1,
            E = "afterLoad",
            k = "load",
            S = "error",
            D = "img",
            A = "src",
            O = "srcset",
            I = "sizes",
            M = "background-image";
        "event" === n.bind || r ? c() : o(t).on(k + "." + l, c)
    }

    function n(n, r) {
        var a = this,
            l = o.extend({}, a.config, r),
            c = {},
            u = l.name + "-" + ++s;
        return a.config = function(t, i) {
            return i === e ? l[t] : (l[t] = i, a)
        }, a.addItems = function(t) {
            return c.a && c.a("string" === o.type(t) ? o(t) : t), a
        }, a.getItems = function() {
            return c.g ? c.g() : {}
        }, a.update = function(t) {
            return c.e && c.e({}, !t), a
        }, a.force = function(t) {
            return c.f && c.f("string" === o.type(t) ? o(t) : t), a
        }, a.loadAll = function() {
            return c.e && c.e({
                all: !0
            }, !0), a
        }, a.destroy = function() {
            return o(l.appendScroll).off("." + u, c.e), o(t).off("." + u), c = {}, e
        }, i(a, l, n, c, u), l.chainable ? n : a
    }
    var o = t.jQuery || t.Zepto,
        s = 0,
        r = !1;
    o.fn.Lazy = o.fn.lazy = function(t) {
        return new n(this, t)
    }, o.Lazy = o.lazy = function(t, i, s) {
        if (o.isFunction(i) && (s = i, i = []), o.isFunction(s)) {
            t = o.isArray(t) ? t : [t], i = o.isArray(i) ? i : [i];
            for (var r = n.prototype.config, a = r._f || (r._f = {}), l = 0, c = t.length; l < c; l++)(r[t[l]] === e || o.isFunction(r[t[l]])) && (r[t[l]] = s);
            for (var u = 0, d = i.length; u < d; u++) a[i[u]] = t[0]
        }
    }, n.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: t,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: e,
        afterLoad: e,
        onError: e,
        onFinishedAll: e
    }, o(t).on("load", function() {
        r = !0
    })
}(window),
function(t, e, i, n) {
    "use strict";

    function o(t, e) {
        var n, o, s = [],
            r = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = t && t.data ? t.data.options : e || {}, n = e.$target || i(t.currentTarget), o = n.attr("data-fancybox") || "", o ? (s = e.selector ? i(e.selector) : t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + o + '"]') : i('[data-fancybox="' + o + '"]'), (r = s.index(n)) < 0 && (r = 0)) : s = [n], i.fancybox.open(s, e, r))
    }
    if (t.console = t.console || {
            info: function(t) {}
        }, i) {
        if (i.fn.fancybox) return;
        var s = {
                loop: !1,
                gutter: 50,
                keyboard: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                    smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
                    arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',
                    arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>'
                },
                parentEl: "body",
                autoFocus: !1,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 4e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop,
                onActivate: i.noop,
                onDeactivate: i.noop,
                clickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    idleTime: !1,
                    clickContent: function(t, e) {
                        return "image" === t.type && "toggleControls"
                    },
                    clickSlide: function(t, e) {
                        return "image" === t.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(t, e) {
                        return "image" === t.type && "zoom"
                    },
                    dblclickSlide: function(t, e) {
                        return "image" === t.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schliessen",
                        NEXT: "Weiter",
                        PREV: "Zurück",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Maßstab"
                    }
                }
            },
            r = i(t),
            a = i(e),
            l = 0,
            c = function(t) {
                return t && t.hasOwnProperty && t instanceof i
            },
            u = function() {
                return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                    return t.setTimeout(e, 1e3 / 60)
                }
            }(),
            d = function() {
                var t, i = e.createElement("fakeelement"),
                    o = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (t in o)
                    if (i.style[t] !== n) return o[t];
                return "transitionend"
            }(),
            h = function(t) {
                return t && t.length && t[0].offsetHeight
            },
            p = function(t, e) {
                var n = i.extend(!0, {}, t, e);
                return i.each(e, function(t, e) {
                    i.isArray(e) && (n[t] = e)
                }), n
            },
            f = function(t, n, o) {
                var s = this;
                s.opts = p({
                    index: o
                }, i.fancybox.defaults), i.isPlainObject(n) && (s.opts = p(s.opts, n)), i.fancybox.isMobile && (s.opts = p(s.opts, s.opts.mobile)), s.id = s.opts.id || ++l, s.currIndex = parseInt(s.opts.index, 10) || 0, s.prevIndex = null, s.prevPos = null, s.currPos = 0, s.firstRun = !0, s.group = [], s.slides = {}, s.addContent(t), s.group.length && (s.$lastFocus = i(e.activeElement).trigger("blur"), s.init())
            };
        i.extend(f.prototype, {
            init: function() {
                var o, s, r, a = this,
                    l = a.group[a.currIndex],
                    c = l.opts,
                    u = i.fancybox.scrollbarWidth;
                i.fancybox.getInstance() || !1 === c.hideScrollbar || (i("body").addClass("fancybox-active"),
                    !i.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (u === n && (o = i('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body"), u = i.fancybox.scrollbarWidth = o[0].offsetWidth - o[0].clientWidth, o.remove()), i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + u + "px; }</style>"), i("body").addClass("compensate-for-scrollbar"))), r = "", i.each(c.buttons, function(t, e) {
                    r += c.btnTpl[e] || ""
                }), s = i(a.translate(a, c.baseTpl.replace("{{buttons}}", r).replace("{{arrows}}", c.btnTpl.arrowLeft + c.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass("fancybox-is-hidden").addClass(c.baseClass).data("FancyBox", a).appendTo(c.parentEl), a.$refs = {
                    container: s
                }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                    a.$refs[t] = s.find(".fancybox-" + t)
                }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
            },
            translate: function(t, e) {
                var i = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                    var o = i[e];
                    return o === n ? t : o
                })
            },
            addContent: function(t) {
                var e, o = this,
                    s = i.makeArray(t);
                i.each(s, function(t, e) {
                    var s, r, a, l, c, u = {},
                        d = {};
                    i.isPlainObject(e) ? (u = e, d = e.opts || e) : "object" === i.type(e) && i(e).length ? (s = i(e), d = s.data() || {}, d = i.extend(!0, {}, d, d.options), d.$orig = s, u.src = o.opts.src || d.src || s.attr("href"), u.type || u.src || (u.type = "inline", u.src = e)) : u = {
                        type: "html",
                        src: e + ""
                    }, u.opts = i.extend(!0, {}, o.opts, d), i.isArray(d.buttons) && (u.opts.buttons = d.buttons), r = u.type || u.opts.type, l = u.src || "", !r && l && ((a = l.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (r = "video", u.opts.videoFormat || (u.opts.videoFormat = "video/" + ("ogv" === a[1] ? "ogg" : a[1]))) : l.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? r = "image" : l.match(/\.(pdf)((\?|#).*)?$/i) ? r = "iframe" : "#" === l.charAt(0) && (r = "inline")), r ? u.type = r : o.trigger("objectNeedsType", u), u.contentType || (u.contentType = i.inArray(u.type, ["html", "inline", "ajax"]) > -1 ? "html" : u.type), u.index = o.group.length, "auto" == u.opts.smallBtn && (u.opts.smallBtn = i.inArray(u.type, ["html", "inline", "ajax"]) > -1), "auto" === u.opts.toolbar && (u.opts.toolbar = !u.opts.smallBtn), u.opts.$trigger && u.index === o.opts.index && (u.opts.$thumb = u.opts.$trigger.find("img:first")), u.opts.$thumb && u.opts.$thumb.length || !u.opts.$orig || (u.opts.$thumb = u.opts.$orig.find("img:first")), "function" === i.type(u.opts.caption) && (u.opts.caption = u.opts.caption.apply(e, [o, u])), "function" === i.type(o.opts.caption) && (u.opts.caption = o.opts.caption.apply(e, [o, u])), u.opts.caption instanceof i || (u.opts.caption = u.opts.caption === n ? "" : u.opts.caption + ""), "ajax" === u.type && (c = l.split(/\s+/, 2), c.length > 1 && (u.src = c.shift(), u.opts.filter = c.shift())), u.opts.modal && (u.opts = i.extend(!0, u.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), o.group.push(u)
                }), Object.keys(o.slides).length && (o.updateControls(), (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
            },
            addEvents: function() {
                var n = this;
                n.removeEvents(), n.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                    t.stopPropagation(), t.preventDefault(), n.close(t)
                }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
                    t.stopPropagation(), t.preventDefault(), n.previous()
                }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
                    t.stopPropagation(), t.preventDefault(), n.next()
                }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                    n[n.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }), r.on("orientationchange.fb resize.fb", function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? u(function() {
                        n.update()
                    }) : (n.$refs.stage.hide(), setTimeout(function() {
                        n.$refs.stage.show(), n.update()
                    }, i.fancybox.isMobile ? 600 : 250))
                }), a.on("focusin.fb", function(t) {
                    var n = i.fancybox ? i.fancybox.getInstance() : null;
                    n.isClosing || !n.current || !n.current.opts.trapFocus || i(t.target).hasClass("fancybox-container") || i(t.target).is(e) || n && "fixed" !== i(t.target).css("position") && !n.$refs.container.has(t.target).length && (t.stopPropagation(), n.focus())
                }), a.on("keydown.fb", function(t) {
                    var e = n.current,
                        o = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !(t.ctrlKey || t.altKey || t.shiftKey || i(t.target).is("input") || i(t.target).is("textarea"))) return 8 === o || 27 === o ? (t.preventDefault(), void n.close(t)) : 37 === o || 38 === o ? (t.preventDefault(), void n.previous()) : 39 === o || 40 === o ? (t.preventDefault(), void n.next()) : void n.trigger("afterKeydown", t, o)
                }), n.group[n.currIndex].opts.idleTime && (n.idleSecondsCounter = 0, a.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                    n.idleSecondsCounter = 0, n.isIdle && n.showControls(), n.isIdle = !1
                }), n.idleInterval = t.setInterval(function() {
                    ++n.idleSecondsCounter >= n.group[n.currIndex].opts.idleTime && !n.isDragging && (n.isIdle = !0, n.idleSecondsCounter = 0, n.hideControls())
                }, 1e3))
            },
            removeEvents: function() {
                var e = this;
                r.off("orientationchange.fb resize.fb"), a.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t)
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t)
            },
            jumpTo: function(t, e) {
                var o, s, r, a, l, c, u, d = this,
                    p = d.group.length;
                if (!(d.isDragging || d.isClosing || d.isAnimating && d.firstRun)) {
                    if (t = parseInt(t, 10), !(s = d.current ? d.current.opts.loop : d.opts.loop) && (t < 0 || t >= p)) return !1;
                    if (o = d.firstRun = !Object.keys(d.slides).length, !(p < 2 && !o && d.isDragging)) {
                        if (a = d.current, d.prevIndex = d.currIndex, d.prevPos = d.currPos, r = d.createSlide(t), p > 1 && ((s || r.index > 0) && d.createSlide(t - 1), (s || r.index < p - 1) && d.createSlide(t + 1)), d.current = r, d.currIndex = r.index, d.currPos = r.pos, d.trigger("beforeShow", o), d.updateControls(), c = i.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== c.left || 0 !== c.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = n, i.isNumeric(e) ? r.forcedDuration = e : e = r.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), o) return r.opts.animationEffect && e && d.$refs.container.css("transition-duration", e + "ms"), d.$refs.container.removeClass("fancybox-is-hidden"), h(d.$refs.container), d.$refs.container.addClass("fancybox-is-open"), h(d.$refs.container), r.$slide.addClass("fancybox-slide--previous"), d.loadSlide(r), r.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current"), void d.preload("image");
                        i.each(d.slides, function(t, e) {
                            i.fancybox.stop(e.$slide)
                        }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), i.each(d.slides, function(t, n) {
                            var o = n.pos - r.pos;
                            i.fancybox.animate(n.$slide, {
                                top: 0,
                                left: o * l + o * n.opts.gutter
                            }, e, function() {
                                n.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), n.pos === d.currPos && (r.isMoved = !1, d.complete())
                            })
                        })) : d.$refs.stage.children().removeAttr("style"), r.isLoaded ? d.revealContent(r) : d.loadSlide(r), d.preload("image"), a.pos !== r.pos && (u = "fancybox-slide--" + (a.pos > r.pos ? "next" : "previous"), a.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), a.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? a.$slide.addClass(u) : (u = "fancybox-animated " + u + " fancybox-fx-" + r.opts.transitionEffect, i.fancybox.animate(a.$slide, u, e, function() {
                            a.$slide.removeClass(u).removeAttr("style")
                        }))))
                    }
                }
            },
            createSlide: function(t) {
                var e, n, o = this;
                return n = t % o.group.length, n = n < 0 ? o.group.length + n : n, !o.slides[t] && o.group[n] && (e = i('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage), o.slides[t] = i.extend(!0, {}, o.group[n], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), o.updateSlide(o.slides[t])), o.slides[t]
            },
            scaleToActual: function(t, e, o) {
                var s, r, a, l, c, u = this,
                    d = u.current,
                    h = d.$content,
                    p = i.fancybox.getTranslate(d.$slide).width,
                    f = i.fancybox.getTranslate(d.$slide).height,
                    g = d.width,
                    m = d.height;
                !u.isAnimating && h && "image" == d.type && d.isLoaded && !d.hasError && (i.fancybox.stop(h), u.isAnimating = !0, t = t === n ? .5 * p : t, e = e === n ? .5 * f : e, s = i.fancybox.getTranslate(h), s.top -= i.fancybox.getTranslate(d.$slide).top, s.left -= i.fancybox.getTranslate(d.$slide).left, l = g / s.width, c = m / s.height, r = .5 * p - .5 * g, a = .5 * f - .5 * m, g > p && (r = s.left * l - (t * l - t), r > 0 && (r = 0), r < p - g && (r = p - g)), m > f && (a = s.top * c - (e * c - e), a > 0 && (a = 0), a < f - m && (a = f - m)), u.updateCursor(g, m), i.fancybox.animate(h, {
                    top: a,
                    left: r,
                    scaleX: l,
                    scaleY: c
                }, o || 330, function() {
                    u.isAnimating = !1
                }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
            },
            scaleToFit: function(t) {
                var e, n = this,
                    o = n.current,
                    s = o.$content;
                !n.isAnimating && s && "image" == o.type && o.isLoaded && !o.hasError && (i.fancybox.stop(s), n.isAnimating = !0, e = n.getFitPos(o), n.updateCursor(e.width, e.height), i.fancybox.animate(s, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / s.width(),
                    scaleY: e.height / s.height()
                }, t || 330, function() {
                    n.isAnimating = !1
                }))
            },
            getFitPos: function(t) {
                var e, i, n, o, s, r = this,
                    a = t.$content,
                    l = t.width || t.opts.width,
                    c = t.height || t.opts.height,
                    u = {};
                return !!(t.isLoaded && a && a.length) && (o = {
                    top: parseInt(t.$slide.css("paddingTop"), 10),
                    right: parseInt(t.$slide.css("paddingRight"), 10),
                    bottom: parseInt(t.$slide.css("paddingBottom"), 10),
                    left: parseInt(t.$slide.css("paddingLeft"), 10)
                }, e = parseInt(r.$refs.stage.width(), 10) - (o.left + o.right), i = parseInt(r.$refs.stage.height(), 10) - (o.top + o.bottom), l && c || (l = e, c = i), n = Math.min(1, e / l, i / c), l = Math.floor(n * l), c = Math.floor(n * c), "image" === t.type ? (u.top = Math.floor(.5 * (i - c)) + o.top, u.left = Math.floor(.5 * (e - l)) + o.left) : "video" === t.contentType && (s = t.opts.width && t.opts.height ? l / c : t.opts.ratio || 16 / 9, c > l / s ? c = l / s : l > c * s && (l = c * s)), u.width = l, u.height = c, u)
            },
            update: function() {
                var t = this;
                i.each(t.slides, function(e, i) {
                    t.updateSlide(i)
                })
            },
            updateSlide: function(t, e) {
                var n = this,
                    o = t && t.$content,
                    s = t.width || t.opts.width,
                    r = t.height || t.opts.height;
                o && (s || r || "video" === t.contentType) && !t.hasError && (i.fancybox.stop(o), i.fancybox.setTranslate(o, n.getFitPos(t)), t.pos === n.currPos && (n.isAnimating = !1, n.updateCursor())), t.$slide.trigger("refresh"), n.$refs.toolbar.toggleClass("compensate-for-scrollbar", t.$slide.get(0).scrollHeight > t.$slide.get(0).clientHeight), n.trigger("onUpdate", t)
            },
            centerSlide: function(t, e) {
                var o, s, r = this;
                r.current && (o = Math.round(t.$slide.width()), s = t.pos - r.current.pos, i.fancybox.animate(t.$slide, {
                    top: 0,
                    left: s * o + s * t.opts.gutter,
                    opacity: 1
                }, e === n ? 0 : e, null, !1))
            },
            updateCursor: function(t, e) {
                var n, o = this,
                    s = o.current,
                    r = o.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                s && !o.isClosing && (n = o.isZoomable(), r.toggleClass("fancybox-is-zoomable", n), i("[data-fancybox-zoom]").prop("disabled", !n), n && ("zoom" === s.opts.clickContent || i.isFunction(s.opts.clickContent) && "zoom" === s.opts.clickContent(s)) ? o.isScaledDown(t, e) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch ? r.addClass("fancybox-can-drag") : r.addClass("fancybox-can-zoomOut") : s.opts.touch && "video" !== s.contentType && r.addClass("fancybox-can-drag"))
            },
            isZoomable: function() {
                var t, e = this,
                    i = e.current;
                if (i && !e.isClosing && "image" === i.type && !i.hasError) {
                    if (!i.isLoaded) return !0;
                    if (t = e.getFitPos(i), i.width > t.width || i.height > t.height) return !0
                }
                return !1
            },
            isScaledDown: function(t, e) {
                var o = this,
                    s = !1,
                    r = o.current,
                    a = r.$content;
                return t !== n && e !== n ? s = t < r.width && e < r.height : a && (s = i.fancybox.getTranslate(a), s = s.width < r.width && s.height < r.height), s
            },
            canPan: function() {
                var t, e = this,
                    i = !1,
                    n = e.current;
                return "image" === n.type && (t = n.$content) && !n.hasError && (i = e.getFitPos(n), i = Math.abs(t.width() - i.width) > 1 || Math.abs(t.height() - i.height) > 1), i
            },
            loadSlide: function(t) {
                var e, n, o, s = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, s.trigger("beforeLoad", t), e = t.type, n = t.$slide, n.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
                        case "image":
                            s.setImage(t);
                            break;
                        case "iframe":
                            s.setIframe(t);
                            break;
                        case "html":
                            s.setContent(t, t.src || t.content);
                            break;
                        case "video":
                            s.setContent(t, '<video class="fancybox-video" controls controlsList="nodownload"><source src="' + t.src + '" type="' + t.opts.videoFormat + "\">Your browser doesn't support HTML5 video</video");
                            break;
                        case "inline":
                            i(t.src).length ? s.setContent(t, i(t.src)) : s.setError(t);
                            break;
                        case "ajax":
                            s.showLoading(t), o = i.ajax(i.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function(e, i) {
                                    "success" === i && s.setContent(t, e)
                                },
                                error: function(e, i) {
                                    e && "abort" !== i && s.setError(t)
                                }
                            })), n.one("onReset", function() {
                                o.abort()
                            });
                            break;
                        default:
                            s.setError(t)
                    }
                    return !0
                }
            },
            setImage: function(e) {
                var n, o, s, r, a, l = this,
                    c = e.opts.srcset || e.opts.image.srcset;
                if (e.timouts = setTimeout(function() {
                        var t = e.$image;
                        !e.isLoading || t && t[0].complete || e.hasError || l.showLoading(e)
                    }, 350), c) {
                    r = t.devicePixelRatio || 1, a = t.innerWidth * r, s = c.split(",").map(function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function(t, i) {
                            var n = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === i ? e.url = t : void(n && (e.value = n, e.postfix = t[t.length - 1]))
                        }), e
                    }), s.sort(function(t, e) {
                        return t.value - e.value
                    });
                    for (var u = 0; u < s.length; u++) {
                        var d = s[u];
                        if ("w" === d.postfix && d.value >= a || "x" === d.postfix && d.value >= r) {
                            o = d;
                            break
                        }
                    }!o && s.length && (o = s[s.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value), e.opts.srcset = c)
                }
                e.$content = i('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), n = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), !1 !== e.opts.preload && e.opts.width && e.opts.height && n && (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = i("<img />").one("error", function() {
                    i(this).remove(), e.$ghost = null
                }).one("load", function() {
                    l.afterLoad(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", n)), l.setBigImage(e)
            },
            setBigImage: function(t) {
                var e = this,
                    n = i("<img />");
                t.$image = n.one("error", function() {
                    e.setError(t)
                }).one("load", function() {
                    var i;
                    t.$ghost || (e.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), e.afterLoad(t)), t.timouts && (clearTimeout(t.timouts), t.timouts = null), e.isClosing || (t.opts.srcset && (i = t.opts.sizes, i && "auto" !== i || (i = (t.width / t.height > 1 && r.width() / r.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), n.attr("sizes", i).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function() {
                        t.$ghost && !e.isClosing && t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))), e.hideLoading(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (n[0].complete || "complete" == n[0].readyState) && n[0].naturalWidth && n[0].naturalHeight ? n.trigger("load") : n[0].error && n.trigger("error")
            },
            resolveImageSlideSize: function(t, e, i) {
                var n = parseInt(t.opts.width, 10),
                    o = parseInt(t.opts.height, 10);
                t.width = e, t.height = i, n > 0 && (t.width = n, t.height = Math.floor(n * i / e)), o > 0 && (t.width = Math.floor(o * e / i), t.height = o)
            },
            setIframe: function(t) {
                var e, o = this,
                    s = t.opts.iframe,
                    r = t.$slide;
                t.$content = i('<div class="fancybox-content' + (s.preload ? " fancybox-is-hidden" : "") + '"></div>').css(s.css).appendTo(r), r.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = i(s.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(s.attr).appendTo(t.$content), s.preload ? (o.showLoading(t), e.on("load.fb error.fb", function(e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
                }), r.on("refresh.fb", function() {
                    var i, o, r = t.$content,
                        a = s.css.width,
                        l = s.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            i = e.contents(), o = i.find("body")
                        } catch (t) {}
                        o && o.length && o.children().length && (r.css({
                            width: "",
                            height: ""
                        }), a === n && (a = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))), a && r.width(a), l === n && (l = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))), l && r.height(l)), r.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), r.one("onReset", function() {
                    try {
                        i(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (t) {}
                    i(this).off("refresh.fb").empty(), t.isLoaded = !1
                })
            },
            setContent: function(t, e) {
                var n = this;
                n.isClosing || (n.hideLoading(t), t.$content && i.fancybox.stop(t.$content), t.$slide.empty(), c(e) && e.parent().length ? (e.parent().parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = i("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === i.type(e) && (e = i("<div>").append(i.trim(e)).contents(), 3 === e[0].nodeType && (e = i("<div>").html(e))), t.opts.filter && (e = i("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
                    i(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (i(this).empty(), t.isLoaded = !1)
                }), i(e).appendTo(t.$slide), i(e).is("video,audio") && (i(e).addClass("fancybox-video"), i(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || i(e).attr("width"), t.opts.height = t.opts.height || i(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio").first().addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
            },
            setError: function(t) {
                t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
            },
            showLoading: function(t) {
                var e = this;
                (t = t || e.current) && !t.$spinner && (t.$spinner = i(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide))
            },
            hideLoading: function(t) {
                var e = this;
                (t = t || e.current) && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.pos === e.currPos && e.updateCursor(), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = i(e.translate(t, t.opts.btnTpl.smallBtn)).prependTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && i('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            },
            revealContent: function(t) {
                var e, o, s, r, a = this,
                    l = t.$slide,
                    c = !1,
                    u = !1;
                return e = t.opts[a.firstRun ? "animationEffect" : "transitionEffect"], s = t.opts[a.firstRun ? "animationDuration" : "transitionDuration"], s = parseInt(t.forcedDuration === n ? s : t.forcedDuration, 10), t.pos === a.currPos && (t.isComplete ? e = !1 : a.isAnimating = !0), !t.isMoved && t.pos === a.currPos && s || (e = !1), "zoom" === e && (t.pos === a.currPos && s && "image" === t.type && !t.hasError && (u = a.getThumbPos(t)) ? c = a.getFitPos(t) : e = "fade"), "zoom" === e ? (c.scaleX = c.width / u.width, c.scaleY = c.height / u.height, r = t.opts.zoomOpacity, "auto" == r && (r = Math.abs(t.width / t.height - u.width / u.height) > .1), r && (u.opacity = .1, c.opacity = 1), i.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), h(t.$content), void i.fancybox.animate(t.$content, c, s, function() {
                    a.isAnimating = !1, a.complete()
                })) : (a.updateSlide(t), e ? (i.fancybox.stop(l), o = "fancybox-animated fancybox-slide--" + (t.pos >= a.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(o), t.$content.removeClass("fancybox-is-hidden"), h(l), void i.fancybox.animate(l, "fancybox-slide--current", s, function(e) {
                    l.removeClass(o).removeAttr("style"), t.pos === a.currPos && a.complete()
                }, !0)) : (h(l), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === a.currPos && a.complete())))
            },
            getThumbPos: function(n) {
                var o, s = this,
                    r = !1,
                    a = n.opts.$thumb,
                    l = a && a.length && a[0].ownerDocument === e ? a.offset() : 0;
                return l && function(e) {
                    for (var n = e[0], o = n.getBoundingClientRect(), s = []; null !== n.parentElement;) "hidden" !== i(n.parentElement).css("overflow") && "auto" !== i(n.parentElement).css("overflow") || s.push(n.parentElement.getBoundingClientRect()), n = n.parentElement;
                    return s.every(function(t) {
                        var e = Math.min(o.right, t.right) - Math.max(o.left, t.left),
                            i = Math.min(o.bottom, t.bottom) - Math.max(o.top, t.top);
                        return e > 0 && i > 0
                    }) && o.bottom > 0 && o.right > 0 && o.left < i(t).width() && o.top < i(t).height()
                }(a) && (o = s.$refs.stage.offset(), r = {
                    top: l.top - o.top + parseFloat(a.css("border-top-width") || 0),
                    left: l.left - o.left + parseFloat(a.css("border-left-width") || 0),
                    width: a.width(),
                    height: a.height(),
                    scaleX: 1,
                    scaleY: 1
                }), r
            },
            complete: function() {
                var t = this,
                    n = t.current,
                    o = {};
                !n.isMoved && n.isLoaded && (n.isComplete || (n.isComplete = !0, n.$slide.siblings().trigger("onReset"), t.preload("inline"), h(n.$slide), n.$slide.addClass("fancybox-slide--complete"), i.each(t.slides, function(e, n) {
                    n.pos >= t.currPos - 1 && n.pos <= t.currPos + 1 ? o[n.pos] = n : n && (i.fancybox.stop(n.$slide), n.$slide.off().remove())
                }), t.slides = o), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"), n.$slide.find("video,audio").filter(":visible:first").trigger("play"), (i(e.activeElement).is("[disabled]") || n.opts.autoFocus && "image" != n.type && "iframe" !== n.type) && t.focus())
            },
            preload: function(t) {
                var e = this,
                    i = e.slides[e.currPos + 1],
                    n = e.slides[e.currPos - 1];
                i && i.type === t && e.loadSlide(i), n && n.type === t && e.loadSlide(n)
            },
            focus: function() {
                var t, e = this.current;
                this.isClosing || e && e.isComplete && e.$content && (t = e.$content.find("input[autofocus]:enabled:visible:first"), t.length || (t = e.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first")), t = t && t.length ? t : e.$content, t.trigger("focus"))
            },
            activate: function() {
                var t = this;
                i(".fancybox-container").each(function() {
                    var e = i(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
            },
            close: function(t, e) {
                var n, o, s, r, a, l, c, p = this,
                    f = p.current,
                    g = function() {
                        p.cleanUp(t)
                    };
                return !(p.isClosing || (p.isClosing = !0, !1 === p.trigger("beforeClose", t) ? (p.isClosing = !1, u(function() {
                    p.update()
                }), 1) : (p.removeEvents(), f.timouts && clearTimeout(f.timouts), s = f.$content, n = f.opts.animationEffect, o = i.isNumeric(e) ? e : n ? f.opts.animationDuration : 0, f.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), f.$slide.siblings().trigger("onReset").remove(), o && p.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), p.hideLoading(f), p.hideControls(), p.updateCursor(), "zoom" !== n || !0 !== t && s && o && "image" === f.type && !f.hasError && (c = p.getThumbPos(f)) || (n = "fade"), "zoom" === n ? (i.fancybox.stop(s), r = i.fancybox.getTranslate(s), l = {
                    top: r.top,
                    left: r.left,
                    scaleX: r.width / c.width,
                    scaleY: r.height / c.height,
                    width: c.width,
                    height: c.height
                }, a = f.opts.zoomOpacity, "auto" == a && (a = Math.abs(f.width / f.height - c.width / c.height) > .1), a && (c.opacity = 0), i.fancybox.setTranslate(s, l), h(s), i.fancybox.animate(s, c, o, g), 0) : (n && o ? !0 === t ? setTimeout(g, o) : i.fancybox.animate(f.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + n, o, g) : g(), 0))))
            },
            cleanUp: function(t) {
                var e, n = this,
                    o = i("body");
                n.current.$slide.trigger("onReset"), n.$refs.container.empty().remove(), n.trigger("afterClose", t), n.$lastFocus && n.current.opts.backFocus && n.$lastFocus.trigger("focus"), n.current = null, e = i.fancybox.getInstance(), e ? e.activate() : (o.removeClass("fancybox-active compensate-for-scrollbar"), i("#fancybox-style-noscroll").remove())
            },
            trigger: function(t, e) {
                var n, o = Array.prototype.slice.call(arguments, 1),
                    s = this,
                    r = e && e.opts ? e : s.current;
                return r ? o.unshift(r) : r = s, o.unshift(s), i.isFunction(r.opts[t]) && (n = r.opts[t].apply(r, o)), !1 === n ? n : void("afterClose" !== t && s.$refs ? s.$refs.container.trigger(t + ".fb", o) : a.trigger(t + ".fb", o))
            },
            updateControls: function(t) {
                var e = this,
                    i = e.current,
                    n = i.index,
                    o = i.opts.caption,
                    s = e.$refs.container,
                    r = e.$refs.caption;
                i.$slide.trigger("refresh"), e.$caption = o && o.length ? r.html(o) : null, e.isHiddenControls || e.isIdle || e.showControls(), s.find("[data-fancybox-count]").html(e.group.length), s.find("[data-fancybox-index]").html(n + 1), s.find("[data-fancybox-prev]").toggleClass("disabled", !i.opts.loop && n <= 0), s.find("[data-fancybox-next]").toggleClass("disabled", !i.opts.loop && n >= e.group.length - 1), "image" === i.type ? s.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", i.opts.image.src || i.src).show() : i.opts.toolbar && s.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
            },
            hideControls: function() {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            },
            showControls: function() {
                var t = this,
                    e = t.current ? t.current.opts : t.opts,
                    i = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, i.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? i.addClass("fancybox-show-caption ") : i.removeClass("fancybox-show-caption")
            },
            toggleControls: function() {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), i.fancybox = {
            version: "3.3.5",
            defaults: s,
            getInstance: function(t) {
                var e = i('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    n = Array.prototype.slice.call(arguments, 1);
                return e instanceof f && ("string" === i.type(t) ? e[t].apply(e, n) : "function" === i.type(t) && t.apply(e, n), e)
            },
            open: function(t, e, i) {
                return new f(t, e, i)
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(), !0 === t && this.close())
            },
            destroy: function() {
                this.close(!0), a.add("body").off("click.fb-start", "**")
            },
            isMobile: e.createTouch !== n && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function() {
                var i = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(i) && t.getComputedStyle(i).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function(t) {
                var e;
                return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
                    top: e.top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity"))
                })
            },
            setTranslate: function(t, e) {
                var i = "",
                    o = {};
                if (t && e) return e.left === n && e.top === n || (i = (e.left === n ? t.position().left : e.left) + "px, " + (e.top === n ? t.position().top : e.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), e.scaleX !== n && e.scaleY !== n && (i = (i.length ? i + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), i.length && (o.transform = i), e.opacity !== n && (o.opacity = e.opacity), e.width !== n && (o.width = e.width), e.height !== n && (o.height = e.height), t.css(o)
            },
            animate: function(t, e, o, s, r) {
                var a = !1;
                i.isFunction(o) && (s = o, o = null), i.isPlainObject(e) || t.removeAttr("style"), i.fancybox.stop(t), t.on(d, function(n) {
                    (!n || !n.originalEvent || t.is(n.originalEvent.target) && "z-index" != n.originalEvent.propertyName) && (i.fancybox.stop(t), a && i.fancybox.setTranslate(t, a), i.isPlainObject(e) ? !1 === r && t.removeAttr("style") : !0 !== r && t.removeClass(e), i.isFunction(s) && s(n))
                }), i.isNumeric(o) && t.css("transition-duration", o + "ms"), i.isPlainObject(e) ? (e.scaleX !== n && e.scaleY !== n && (a = i.extend({}, e, {
                    width: t.width() * e.scaleX,
                    height: t.height() * e.scaleY,
                    scaleX: 1,
                    scaleY: 1
                }), delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), i.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function() {
                    t.trigger("transitionend")
                }, o + 16))
            },
            stop: function(t) {
                t && t.length && (clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
            }
        }, i.fn.fancybox = function(t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? i("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, o) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, o), this
        }, a.on("click.fb-start", "[data-fancybox]", o), a.on("click.fb-start", "[data-trigger]", function(t) {
            o(t, {
                $target: i('[data-fancybox="' + i(t.currentTarget).attr("data-trigger") + '"]').eq(i(t.currentTarget).attr("data-index") || 0),
                $trigger: i(this)
            })
        })
    }
}(window, document, window.jQuery || jQuery),
function(t) {
    "use strict";
    var e = function(e, i, n) {
            if (e) return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function(t, i) {
                e = e.replace("$" + t, i || "")
            }), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
        },
        i = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "//www.youtube.com/embed/$4",
                thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1,
                    api: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        };
    t(document).on("objectNeedsType.fb", function(n, o, s) {
        var r, a, l, c, u, d, h, p = s.src || "",
            f = !1;
        r = t.extend(!0, {}, i, s.opts.media), t.each(r, function(i, n) {
            if (l = p.match(n.matcher)) {
                if (f = n.type, h = i, d = {}, n.paramPlace && l[n.paramPlace]) {
                    u = l[n.paramPlace], "?" == u[0] && (u = u.substring(1)), u = u.split("&");
                    for (var o = 0; o < u.length; ++o) {
                        var r = u[o].split("=", 2);
                        2 == r.length && (d[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")))
                    }
                }
                return c = t.extend(!0, {}, n.params, s.opts[i], d), p = "function" === t.type(n.url) ? n.url.call(this, l, c, s) : e(n.url, l, c), a = "function" === t.type(n.thumb) ? n.thumb.call(this, l, c, s) : e(n.thumb, l), "youtube" === i ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, i, n) {
                    return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(n, 10))
                }) : "vimeo" === i && (p = p.replace("&%23", "#")), !1
            }
        }), f ? (s.opts.thumb || s.opts.$thumb && s.opts.$thumb.length || (s.opts.thumb = a), "iframe" === f && (s.opts = t.extend(!0, s.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), t.extend(s, {
            type: f,
            src: p,
            origSrc: s.src,
            contentSource: h,
            contentType: "image" === f ? "image" : "gmap_place" == h || "gmap_search" == h ? "map" : "video"
        })) : p && (s.type = s.opts.defaultType)
    })
}(window.jQuery || jQuery),
function(t, e, i) {
    "use strict";
    var n = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(),
        o = function() {
            return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                t.clearTimeout(e)
            }
        }(),
        s = function(e) {
            var i = [];
            e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
            for (var n in e) e[n].pageX ? i.push({
                x: e[n].pageX,
                y: e[n].pageY
            }) : e[n].clientX && i.push({
                x: e[n].clientX,
                y: e[n].clientY
            });
            return i
        },
        r = function(t, e, i) {
            return e && t ? "x" === i ? t.x - e.x : "y" === i ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
        },
        a = function(t) {
            if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || i.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
            for (var e = 0, n = t[0].attributes, o = n.length; e < o; e++)
                if ("data-fancybox-" === n[e].nodeName.substr(0, 14)) return !0;
            return !1
        },
        l = function(e) {
            var i = t.getComputedStyle(e)["overflow-y"],
                n = t.getComputedStyle(e)["overflow-x"],
                o = ("scroll" === i || "auto" === i) && e.scrollHeight > e.clientHeight,
                s = ("scroll" === n || "auto" === n) && e.scrollWidth > e.clientWidth;
            return o || s
        },
        c = function(t) {
            for (var e = !1; !(e = l(t.get(0))) && (t = t.parent(), t.length && !t.hasClass("fancybox-stage") && !t.is("body")););
            return e
        },
        u = function(t) {
            var e = this;
            e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(e, "ontouchstart"))
        };
    u.prototype.destroy = function() {
        this.$container.off(".fb.touch")
    }, u.prototype.ontouchstart = function(n) {
        var o = this,
            l = i(n.target),
            u = o.instance,
            d = u.current,
            h = d.$content,
            p = "touchstart" == n.type;
        if (p && o.$container.off("mousedown.fb.touch"),
            (!n.originalEvent || 2 != n.originalEvent.button) && l.length && !a(l) && !a(l.parent()) && (l.is("img") || !(n.originalEvent.clientX > l[0].clientWidth + l.offset().left))) {
            if (!d || u.isAnimating || u.isClosing) return n.stopPropagation(), void n.preventDefault();
            if (o.realPoints = o.startPoints = s(n), o.startPoints.length) {
                if (n.stopPropagation(), o.startEvent = n, o.canTap = !0, o.$target = l, o.$content = h, o.opts = d.opts.touch, o.isPanning = !1, o.isSwiping = !1, o.isZooming = !1, o.isScrolling = !1, o.startTime = (new Date).getTime(), o.distanceX = o.distanceY = o.distance = 0, o.canvasWidth = Math.round(d.$slide[0].clientWidth), o.canvasHeight = Math.round(d.$slide[0].clientHeight), o.contentLastPos = null, o.contentStartPos = i.fancybox.getTranslate(o.$content) || {
                        top: 0,
                        left: 0
                    }, o.sliderStartPos = o.sliderLastPos || i.fancybox.getTranslate(d.$slide), o.stagePos = i.fancybox.getTranslate(u.$refs.stage), o.sliderStartPos.top -= o.stagePos.top, o.sliderStartPos.left -= o.stagePos.left, o.contentStartPos.top -= o.stagePos.top, o.contentStartPos.left -= o.stagePos.left, i(e).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(o, "ontouchend")).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(o, "ontouchmove")), i.fancybox.isMobile && e.addEventListener("scroll", o.onscroll, !0), !o.opts && !u.canPan() || !l.is(o.$stage) && !o.$stage.find(l).length) return void(l.is(".fancybox-image") && n.preventDefault());
                i.fancybox.isMobile && (c(l) || c(l.parent())) || n.preventDefault(), (1 === o.startPoints.length || d.hasError) && (o.instance.canPan() ? (i.fancybox.stop(o.$content), o.$content.css("transition-duration", ""), o.isPanning = !0) : o.isSwiping = !0, o.$container.addClass("fancybox-controls--isGrabbing")), 2 === o.startPoints.length && "image" === d.type && (d.isLoaded || d.$ghost) && (o.canTap = !1, o.isSwiping = !1, o.isPanning = !1, o.isZooming = !0, i.fancybox.stop(o.$content), o.$content.css("transition-duration", ""), o.centerPointStartX = .5 * (o.startPoints[0].x + o.startPoints[1].x) - i(t).scrollLeft(), o.centerPointStartY = .5 * (o.startPoints[0].y + o.startPoints[1].y) - i(t).scrollTop(), o.percentageOfImageAtPinchPointX = (o.centerPointStartX - o.contentStartPos.left) / o.contentStartPos.width, o.percentageOfImageAtPinchPointY = (o.centerPointStartY - o.contentStartPos.top) / o.contentStartPos.height, o.startDistanceBetweenFingers = r(o.startPoints[0], o.startPoints[1]))
            }
        }
    }, u.prototype.onscroll = function(t) {
        var i = this;
        i.isScrolling = !0, e.removeEventListener("scroll", i.onscroll, !0)
    }, u.prototype.ontouchmove = function(t) {
        var e = this,
            n = i(t.target);
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling || !n.is(e.$stage) && !e.$stage.find(n).length ? void(e.canTap = !1) : (e.newPoints = s(t), void((e.opts || e.instance.canPan()) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = r(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = r(e.newPoints[0], e.startPoints[0], "y"), e.distance = r(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, u.prototype.onSwipe = function(e) {
        var s, r = this,
            a = r.isSwiping,
            l = r.sliderStartPos.left || 0;
        if (!0 !== a) "x" == a && (r.distanceX > 0 && (r.instance.group.length < 2 || 0 === r.instance.current.index && !r.instance.current.opts.loop) ? l += Math.pow(r.distanceX, .8) : r.distanceX < 0 && (r.instance.group.length < 2 || r.instance.current.index === r.instance.group.length - 1 && !r.instance.current.opts.loop) ? l -= Math.pow(-r.distanceX, .8) : l += r.distanceX), r.sliderLastPos = {
            top: "x" == a ? 0 : r.sliderStartPos.top + r.distanceY,
            left: l
        }, r.requestId && (o(r.requestId), r.requestId = null), r.requestId = n(function() {
            r.sliderLastPos && (i.each(r.instance.slides, function(t, e) {
                var n = e.pos - r.instance.currPos;
                i.fancybox.setTranslate(e.$slide, {
                    top: r.sliderLastPos.top,
                    left: r.sliderLastPos.left + n * r.canvasWidth + n * e.opts.gutter
                })
            }), r.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(r.distance) > 10) {
            if (r.canTap = !1, r.instance.group.length < 2 && r.opts.vertical ? r.isSwiping = "y" : r.instance.isDragging || !1 === r.opts.vertical || "auto" === r.opts.vertical && i(t).width() > 800 ? r.isSwiping = "x" : (s = Math.abs(180 * Math.atan2(r.distanceY, r.distanceX) / Math.PI), r.isSwiping = s > 45 && s < 135 ? "y" : "x"), r.canTap = !1, "y" === r.isSwiping && i.fancybox.isMobile && (c(r.$target) || c(r.$target.parent()))) return void(r.isScrolling = !0);
            r.instance.isDragging = r.isSwiping, r.startPoints = r.newPoints, i.each(r.instance.slides, function(t, e) {
                i.fancybox.stop(e.$slide), e.$slide.css("transition-duration", ""), e.inTransition = !1, e.pos === r.instance.current.pos && (r.sliderStartPos.left = i.fancybox.getTranslate(e.$slide).left - i.fancybox.getTranslate(r.instance.$refs.stage).left)
            }), r.instance.SlideShow && r.instance.SlideShow.isActive && r.instance.SlideShow.stop()
        }
    }, u.prototype.onPan = function() {
        var t = this;
        return r(t.newPoints[0], t.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5) ? void(t.startPoints = t.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (o(t.requestId), t.requestId = null), void(t.requestId = n(function() {
            i.fancybox.setTranslate(t.$content, t.contentLastPos)
        })))
    }, u.prototype.limitMovement = function() {
        var t, e, i, n, o, s, r = this,
            a = r.canvasWidth,
            l = r.canvasHeight,
            c = r.distanceX,
            u = r.distanceY,
            d = r.contentStartPos,
            h = d.left,
            p = d.top,
            f = d.width,
            g = d.height;
        return o = f > a ? h + c : h, s = p + u, t = Math.max(0, .5 * a - .5 * f), e = Math.max(0, .5 * l - .5 * g), i = Math.min(a - f, .5 * a - .5 * f), n = Math.min(l - g, .5 * l - .5 * g), c > 0 && o > t && (o = t - 1 + Math.pow(-t + h + c, .8) || 0), c < 0 && o < i && (o = i + 1 - Math.pow(i - h - c, .8) || 0), u > 0 && s > e && (s = e - 1 + Math.pow(-e + p + u, .8) || 0), u < 0 && s < n && (s = n + 1 - Math.pow(n - p - u, .8) || 0), {
            top: s,
            left: o
        }
    }, u.prototype.limitPosition = function(t, e, i, n) {
        var o = this,
            s = o.canvasWidth,
            r = o.canvasHeight;
        return i > s ? (t = t > 0 ? 0 : t, t = t < s - i ? s - i : t) : t = Math.max(0, s / 2 - i / 2), n > r ? (e = e > 0 ? 0 : e, e = e < r - n ? r - n : e) : e = Math.max(0, r / 2 - n / 2), {
            top: e,
            left: t
        }
    }, u.prototype.onZoom = function() {
        var e = this,
            s = e.contentStartPos,
            a = s.width,
            l = s.height,
            c = s.left,
            u = s.top,
            d = r(e.newPoints[0], e.newPoints[1]),
            h = d / e.startDistanceBetweenFingers,
            p = Math.floor(a * h),
            f = Math.floor(l * h),
            g = (a - p) * e.percentageOfImageAtPinchPointX,
            m = (l - f) * e.percentageOfImageAtPinchPointY,
            v = (e.newPoints[0].x + e.newPoints[1].x) / 2 - i(t).scrollLeft(),
            y = (e.newPoints[0].y + e.newPoints[1].y) / 2 - i(t).scrollTop(),
            b = v - e.centerPointStartX,
            w = y - e.centerPointStartY,
            T = c + (g + b),
            C = u + (m + w),
            _ = {
                top: C,
                left: T,
                scaleX: h,
                scaleY: h
            };
        e.canTap = !1, e.newWidth = p, e.newHeight = f, e.contentLastPos = _, e.requestId && (o(e.requestId), e.requestId = null), e.requestId = n(function() {
            i.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, u.prototype.ontouchend = function(t) {
        var n = this,
            r = Math.max((new Date).getTime() - n.startTime, 1),
            a = n.isSwiping,
            l = n.isPanning,
            c = n.isZooming,
            u = n.isScrolling;
        return n.endPoints = s(t), n.$container.removeClass("fancybox-controls--isGrabbing"), i(e).off(".fb.touch"), e.removeEventListener("scroll", n.onscroll, !0), n.requestId && (o(n.requestId), n.requestId = null), n.isSwiping = !1, n.isPanning = !1, n.isZooming = !1, n.isScrolling = !1, n.instance.isDragging = !1, n.canTap ? n.onTap(t) : (n.speed = 366, n.velocityX = n.distanceX / r * .5, n.velocityY = n.distanceY / r * .5, n.speedX = Math.max(.5 * n.speed, Math.min(1.5 * n.speed, 1 / Math.abs(n.velocityX) * n.speed)), void(l ? n.endPanning() : c ? n.endZooming() : n.endSwiping(a, u)))
    }, u.prototype.endSwiping = function(t, e) {
        var n = this,
            o = !1,
            s = n.instance.group.length;
        n.sliderLastPos = null, "y" == t && !e && Math.abs(n.distanceY) > 50 ? (i.fancybox.animate(n.instance.current.$slide, {
            top: n.sliderStartPos.top + n.distanceY + 150 * n.velocityY,
            opacity: 0
        }, 200), o = n.instance.close(!0, 200)) : "x" == t && n.distanceX > 50 && s > 1 ? o = n.instance.previous(n.speedX) : "x" == t && n.distanceX < -50 && s > 1 && (o = n.instance.next(n.speedX)), !1 !== o || "x" != t && "y" != t || (e || s < 2 ? n.instance.centerSlide(n.instance.current, 150) : n.instance.jumpTo(n.instance.current.index)), n.$container.removeClass("fancybox-is-sliding")
    }, u.prototype.endPanning = function() {
        var t, e, n, o = this;
        o.contentLastPos && (!1 === o.opts.momentum ? (t = o.contentLastPos.left, e = o.contentLastPos.top) : (t = o.contentLastPos.left + o.velocityX * o.speed, e = o.contentLastPos.top + o.velocityY * o.speed), n = o.limitPosition(t, e, o.contentStartPos.width, o.contentStartPos.height), n.width = o.contentStartPos.width, n.height = o.contentStartPos.height, i.fancybox.animate(o.$content, n, 330))
    }, u.prototype.endZooming = function() {
        var t, e, n, o, s = this,
            r = s.instance.current,
            a = s.newWidth,
            l = s.newHeight;
        s.contentLastPos && (t = s.contentLastPos.left, e = s.contentLastPos.top, o = {
            top: e,
            left: t,
            width: a,
            height: l,
            scaleX: 1,
            scaleY: 1
        }, i.fancybox.setTranslate(s.$content, o), a < s.canvasWidth && l < s.canvasHeight ? s.instance.scaleToFit(150) : a > r.width || l > r.height ? s.instance.scaleToActual(s.centerPointStartX, s.centerPointStartY, 150) : (n = s.limitPosition(t, e, a, l), i.fancybox.setTranslate(s.$content, i.fancybox.getTranslate(s.$content)), i.fancybox.animate(s.$content, n, 150)))
    }, u.prototype.onTap = function(e) {
        var n, o = this,
            r = i(e.target),
            a = o.instance,
            l = a.current,
            c = e && s(e) || o.startPoints,
            u = c[0] ? c[0].x - i(t).scrollLeft() - o.stagePos.left : 0,
            d = c[0] ? c[0].y - i(t).scrollTop() - o.stagePos.top : 0,
            h = function(t) {
                var n = l.opts[t];
                if (i.isFunction(n) && (n = n.apply(a, [l, e])), n) switch (n) {
                    case "close":
                        a.close(o.startEvent);
                        break;
                    case "toggleControls":
                        a.toggleControls(!0);
                        break;
                    case "next":
                        a.next();
                        break;
                    case "nextOrClose":
                        a.group.length > 1 ? a.next() : a.close(o.startEvent);
                        break;
                    case "zoom":
                        "image" == l.type && (l.isLoaded || l.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(u, d) : a.group.length < 2 && a.close(o.startEvent))
                }
            };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (r.is("img") || !(u > r[0].clientWidth + r.offset().left))) {
            if (r.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) n = "Outside";
            else if (r.is(".fancybox-slide")) n = "Slide";
            else {
                if (!a.current.$content || !a.current.$content.find(r).addBack().filter(r).length) return;
                n = "Content"
            }
            if (o.tapped) {
                if (clearTimeout(o.tapped), o.tapped = null, Math.abs(u - o.tapX) > 50 || Math.abs(d - o.tapY) > 50) return this;
                h("dblclick" + n)
            } else o.tapX = u, o.tapY = d, l.opts["dblclick" + n] && l.opts["dblclick" + n] !== l.opts["click" + n] ? o.tapped = setTimeout(function() {
                o.tapped = null, h("click" + n)
            }, 500) : h("click" + n);
            return this
        }
    }, i(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new u(e))
    })
}(window, document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3
        }
    });
    var i = function(t) {
        this.instance = t, this.init()
    };
    e.extend(i.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        },
        set: function(t) {
            var e = this;
            e.instance && e.instance.current && (!0 === t || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function() {
                e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length)
            }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer), t.timer = null
        },
        start: function() {
            var t = this,
                e = t.instance.current;
            e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
        },
        stop: function() {
            var t = this,
                e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new i(e))
        },
        "beforeShow.fb": function(t, e, i, n) {
            var o = e && e.SlideShow;
            n ? o && i.opts.slideShow.autoStart && o.start() : o && o.isActive && o.clear()
        },
        "afterShow.fb": function(t, e, i) {
            var n = e && e.SlideShow;
            n && n.isActive && n.set()
        },
        "afterKeydown.fb": function(i, n, o, s, r) {
            var a = n && n.SlideShow;
            !a || !o.opts.slideShow || 80 !== r && 32 !== r || e(t.activeElement).is("button,a,input") || (s.preventDefault(), a.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var i = e && e.SlideShow;
            i && i.stop()
        }
    }), e(t).on("visibilitychange", function() {
        var i = e.fancybox.getInstance(),
            n = i && i.SlideShow;
        n && n.isActive && (t.hidden ? n.clear() : n.set())
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var i = function() {
        for (var e = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], i = {}, n = 0; n < e.length; n++) {
            var o = e[n];
            if (o && o[1] in t) {
                for (var s = 0; s < o.length; s++) i[e[0][s]] = o[s];
                return i
            }
        }
        return !1
    }();
    if (!i) return void(e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
    var n = {
        request: function(e) {
            e = e || t.documentElement, e[i.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        },
        exit: function() {
            t[i.exitFullscreen]()
        },
        toggle: function(e) {
            e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
        },
        isFullscreen: function() {
            return Boolean(t[i.fullscreenElement])
        },
        enabled: function() {
            return Boolean(t[i.fullscreenEnabled])
        }
    };
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>'
        },
        fullScreen: {
            autoStart: !1
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var i;
            e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(), t.preventDefault(), n.toggle()
            }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && n.request(), e.FullScreen = n) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(t, e, i, n, o) {
            e && e.FullScreen && 70 === o && (n.preventDefault(), e.FullScreen.toggle())
        },
        "beforeClose.fb": function(t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && n.exit()
        }
    }), e(t).on(i.fullscreenchange, function() {
        var t = n.isFullscreen(),
            i = e.fancybox.getInstance();
        i && (i.current && "image" === i.current.type && i.isAnimating && (i.current.$content.css("transition", "none"), i.isAnimating = !1, i.update(!0, !0, 0)), i.trigger("onFullscreenChange", t), i.$refs.container.toggleClass("fancybox-is-fullscreen", t))
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var i = "fancybox-thumbs",
        n = i + "-active";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var o = function(t) {
        this.init(t)
    };
    e.extend(o.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e, i, n = this;
            n.instance = t, t.Thumbs = n, n.opts = t.group[t.currIndex].opts.thumbs, e = t.group[0], e = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), t.group.length > 1 && (i = t.group[1], i = i.opts.thumb || !(!i.opts.$thumb || !i.opts.$thumb.length) && i.opts.$thumb.attr("src")), n.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), n.opts && e && i && e && i ? (n.$button.show().on("click", function() {
                n.toggle()
            }), n.isActive = !0) : n.$button.hide()
        },
        create: function() {
            var t, n = this,
                o = n.instance,
                s = n.opts.parentEl,
                r = [];
            n.$grid || (n.$grid = e('<div class="' + i + " " + i + "-" + n.opts.axis + '"></div>').appendTo(o.$refs.container.find(s).addBack().filter(s)), n.$grid.on("click", "li", function() {
                o.jumpTo(e(this).attr("data-index"))
            })), n.$list || (n.$list = e("<ul>").appendTo(n.$grid)), e.each(o.group, function(e, i) {
                t = i.opts.thumb || (i.opts.$thumb ? i.opts.$thumb.attr("src") : null), t || "image" !== i.type || (t = i.src), r.push('<li data-index="' + e + '" tabindex="0" class="fancybox-thumbs-loading"' + (t && t.length ? ' style="background-image:url(' + t + ')" />' : "") + "></li>")
            }), n.$list[0].innerHTML = r.join(""), "x" === n.opts.axis && n.$list.width(parseInt(n.$grid.css("padding-right"), 10) + o.group.length * n.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, i, o = this,
                s = o.$list,
                r = o.$grid;
            o.instance.current && (e = s.children().removeClass(n).filter('[data-index="' + o.instance.current.index + '"]').addClass(n), i = e.position(), "y" === o.opts.axis && (i.top < 0 || i.top > s.height() - e.outerHeight()) ? s.stop().animate({
                scrollTop: s.scrollTop() + i.top
            }, t) : "x" === o.opts.axis && (i.left < r.scrollLeft() || i.left > r.scrollLeft() + (r.width() - e.outerWidth())) && s.parent().stop().animate({
                scrollLeft: i.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var i;
            e && !e.Thumbs && (i = new o(e), i.isActive && !0 === i.opts.autoStart && i.show())
        },
        "beforeShow.fb": function(t, e, i, n) {
            var o = e && e.Thumbs;
            o && o.isVisible && o.focus(n ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, i, n, o) {
            var s = e && e.Thumbs;
            s && s.isActive && 71 === o && (n.preventDefault(), s.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var i = e && e.Thumbs;
            i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
        }
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";

    function i(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t]
        })
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function() {
        var t, n, o = e.fancybox.getInstance(),
            s = o.current || null;
        s && ("function" === e.type(s.opts.share.url) && (t = s.opts.share.url.apply(s, [o, s])), n = s.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === s.type ? encodeURIComponent(s.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, i(t)).replace(/\{\{descr\}\}/g, o.$caption ? encodeURIComponent(o.$caption.text()) : ""), e.fancybox.open({
            src: o.translate(o, n),
            type: "html",
            opts: {
                animationEffect: !1,
                afterLoad: function(t, e) {
                    o.$refs.container.one("beforeClose.fb", function() {
                        t.close(null, 0)
                    }), e.$content.find(".fancybox-share__links a").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                }
            }
        }))
    })
}(document, window.jQuery || jQuery),
function(t, e, i) {
    "use strict";

    function n() {
        var t = e.location.hash.substr(1),
            i = t.split("-"),
            n = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) ? parseInt(i.pop(-1), 10) || 1 : 1,
            o = i.join("-");
        return {
            hash: t,
            index: n < 1 ? 1 : n,
            gallery: o
        }
    }

    function o(t) {
        "" !== t.gallery && i("[data-fancybox='" + i.escapeSelector(t.gallery) + "']").eq(t.index - 1).trigger("click.fb-start")
    }

    function s(t) {
        var e, i;
        return !!t && (e = t.current ? t.current.opts : t.opts, "" !== (i = e.hash || (e.$orig ? e.$orig.data("fancybox") : "")) && i)
    }
    i.escapeSelector || (i.escapeSelector = function(t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        })
    }), i(function() {
        !1 !== i.fancybox.defaults.hash && (i(t).on({
            "onInit.fb": function(t, e) {
                var i, o;
                !1 !== e.group[e.currIndex].opts.hash && (i = n(), (o = s(e)) && i.gallery && o == i.gallery && (e.currIndex = i.index - 1))
            },
            "beforeShow.fb": function(i, n, o, r) {
                var a;
                o && !1 !== o.opts.hash && (a = s(n)) && (n.currentHash = a + (n.group.length > 1 ? "-" + (o.index + 1) : ""), e.location.hash !== "#" + n.currentHash && (n.origHash || (n.origHash = e.location.hash), n.hashTimer && clearTimeout(n.hashTimer), n.hashTimer = setTimeout(function() {
                    "replaceState" in e.history ? (e.history[r ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + n.currentHash), r && (n.hasCreatedHistory = !0)) : e.location.hash = n.currentHash, n.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(i, n, o) {
                !1 !== o.opts.hash && (s(n), n.currentHash && n.hasCreatedHistory ? e.history.back() : n.currentHash && ("replaceState" in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (n.origHash || "")) : e.location.hash = n.origHash), n.currentHash = null, clearTimeout(n.hashTimer))
            }
        }), i(e).on("hashchange.fb", function() {
            var t, e = n();
            i.each(i(".fancybox-container").get().reverse(), function(e, n) {
                var o = i(n).data("FancyBox");
                if (o.currentHash) return t = o, !1
            }), t ? !t.currentHash || t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e.gallery && o(e)
        }), setTimeout(function() {
            i.fancybox.getInstance() || o(n())
        }, 50))
    })
}(document, window, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var i = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, n) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
                var n = e.current,
                    o = (new Date).getTime();
                e.group.length < 2 || !1 === n.opts.wheel || "auto" === n.opts.wheel && "image" !== n.type || (t.preventDefault(), t.stopPropagation(), n.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, o - i < 250 || (i = o, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, window.jQuery || jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function n() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }

    function o(t, e) {
        return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
    }

    function s(i, n) {
        return function() {
            return n !== e && t.fn.datepicker.deprecated(n), this[i].apply(this, arguments)
        }
    }

    function r(t) {
        return t && !isNaN(t.getTime())
    }

    function a(e, i) {
        function n(t, e) {
            return e.toLowerCase()
        }
        var o, s = t(e).data(),
            r = {},
            a = new RegExp("^" + i.toLowerCase() + "([A-Z])");
        i = new RegExp("^" + i.toLowerCase());
        for (var l in s) i.test(l) && (o = l.replace(a, n), r[o] = s[l]);
        return r
    }

    function l(e) {
        var i = {};
        if (m[e] || (e = e.split("-")[0], m[e])) {
            var n = m[e];
            return t.each(g, function(t, e) {
                e in n && (i[e] = n[e])
            }), i
        }
    }
    var c = function() {
            var e = {
                get: function(t) {
                    return this.slice(t)[0]
                },
                contains: function(t) {
                    for (var e = t && t.valueOf(), i = 0, n = this.length; i < n; i++)
                        if (0 <= this[i].valueOf() - e && this[i].valueOf() - e < 864e5) return i;
                    return -1
                },
                remove: function(t) {
                    this.splice(t, 1)
                },
                replace: function(e) {
                    e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                },
                clear: function() {
                    this.length = 0
                },
                copy: function() {
                    var t = new c;
                    return t.replace(this), t
                }
            };
            return function() {
                var i = [];
                return i.push.apply(i, arguments), t.extend(i, e), i
            }
        }(),
        u = function(e, i) {
            t.data(e, "datepicker", this), this._process_options(i), this.dates = new c, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = t(e), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = t(v.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
                return Number(e) + 1
            }), this._process_options({
                startDate: this._o.startDate,
                endDate: this._o.endDate,
                daysOfWeekDisabled: this.o.daysOfWeekDisabled,
                daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
                datesDisabled: this.o.datesDisabled
            }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show()
        };
    u.prototype = {
        constructor: u,
        _resolveViewName: function(e) {
            return t.each(v.viewModes, function(i, n) {
                if (e === i || -1 !== t.inArray(e, n.names)) return e = i, !1
            }), e
        },
        _resolveDaysOfWeek: function(e) {
            return t.isArray(e) || (e = e.split(/[,\s]*/)), t.map(e, Number)
        },
        _check_template: function(i) {
            try {
                if (i === e || "" === i) return !1;
                if ((i.match(/[<>]/g) || []).length <= 0) return !0;
                return t(i).length > 0
            } catch (t) {
                return !1
            }
        },
        _process_options: function(e) {
            this._o = t.extend({}, this._o, e);
            var o = this.o = t.extend({}, this._o),
                s = o.language;
            m[s] || (s = s.split("-")[0], m[s] || (s = f.language)), o.language = s, o.startView = this._resolveViewName(o.startView), o.minViewMode = this._resolveViewName(o.minViewMode), o.maxViewMode = this._resolveViewName(o.maxViewMode), o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView)), !0 !== o.multidate && (o.multidate = Number(o.multidate) || !1, !1 !== o.multidate && (o.multidate = Math.max(0, o.multidate))), o.multidateSeparator = String(o.multidateSeparator), o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
            var r = v.parseFormat(o.format);
            o.startDate !== -1 / 0 && (o.startDate ? o.startDate instanceof Date ? o.startDate = this._local_to_utc(this._zero_time(o.startDate)) : o.startDate = v.parseDate(o.startDate, r, o.language, o.assumeNearbyYear) : o.startDate = -1 / 0), o.endDate !== 1 / 0 && (o.endDate ? o.endDate instanceof Date ? o.endDate = this._local_to_utc(this._zero_time(o.endDate)) : o.endDate = v.parseDate(o.endDate, r, o.language, o.assumeNearbyYear) : o.endDate = 1 / 0), o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled || []), o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted || []), o.datesDisabled = o.datesDisabled || [], t.isArray(o.datesDisabled) || (o.datesDisabled = o.datesDisabled.split(",")), o.datesDisabled = t.map(o.datesDisabled, function(t) {
                return v.parseDate(t, r, o.language, o.assumeNearbyYear)
            });
            var a = String(o.orientation).toLowerCase().split(/\s+/g),
                l = o.orientation.toLowerCase();
            if (a = t.grep(a, function(t) {
                    return /^auto|left|right|top|bottom$/.test(t)
                }), o.orientation = {
                    x: "auto",
                    y: "auto"
                }, l && "auto" !== l)
                if (1 === a.length) switch (a[0]) {
                    case "top":
                    case "bottom":
                        o.orientation.y = a[0];
                        break;
                    case "left":
                    case "right":
                        o.orientation.x = a[0]
                } else l = t.grep(a, function(t) {
                    return /^left|right$/.test(t)
                }), o.orientation.x = l[0] || "auto", l = t.grep(a, function(t) {
                    return /^top|bottom$/.test(t)
                }), o.orientation.y = l[0] || "auto";
                else;
            if (o.defaultViewDate instanceof Date || "string" == typeof o.defaultViewDate) o.defaultViewDate = v.parseDate(o.defaultViewDate, r, o.language, o.assumeNearbyYear);
            else if (o.defaultViewDate) {
                var c = o.defaultViewDate.year || (new Date).getFullYear(),
                    u = o.defaultViewDate.month || 0,
                    d = o.defaultViewDate.day || 1;
                o.defaultViewDate = i(c, u, d)
            } else o.defaultViewDate = n()
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, n, o, s = 0; s < t.length; s++) i = t[s][0], 2 === t[s].length ? (n = e, o = t[s][1]) : 3 === t[s].length && (n = t[s][1], o = t[s][2]), i.on(o, n)
        },
        _unapplyEvents: function(t) {
            for (var i, n, o, s = 0; s < t.length; s++) i = t[s][0], 2 === t[s].length ? (o = e, n = t[s][1]) : 3 === t[s].length && (o = t[s][1], n = t[s][2]), i.off(n, o)
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy(function(e) {
                    -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: t.proxy(this.keydown, this),
                paste: t.proxy(this.paste, this)
            };
            !0 === this.o.showOnFocus && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [
                [this.element, e]
            ] : this.component && this.inputField.length ? this._events = [
                [this.inputField, e],
                [this.component, {
                    click: t.proxy(this.show, this)
                }]
            ] : this._events = [
                [this.element, {
                    click: t.proxy(this.show, this),
                    keydown: t.proxy(this.keydown, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }], [this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }]), this.o.immediateUpdates && this._events.push([this.element, {
                "changeYear changeMonth": t.proxy(function(t) {
                    this.update(t.date)
                }, this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: t.proxy(this.click, this)
                }],
                [this.picker, ".prev, .next", {
                    click: t.proxy(this.navArrowsClick, this)
                }],
                [this.picker, ".day:not(.disabled)", {
                    click: t.proxy(this.dayCellClick, this)
                }],
                [t(window), {
                    resize: t.proxy(this.place, this)
                }],
                [t(document), {
                    "mousedown touchstart": t.proxy(function(t) {
                        this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.isInline || this.hide()
                    }, this)
                }]
            ]
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var n = i || this.dates.get(-1),
                o = this._utc_to_local(n);
            this.element.trigger({
                type: e,
                date: o,
                viewMode: this.viewMode,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                    var i = this.dates.get(t);
                    return v.formatDate(i, e, this.o.language)
                }, this)
            })
        },
        show: function() {
            if (!(this.inputField.prop("disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), this
        },
        hide: function() {
            return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(),
                this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this)
        },
        destroy: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
        },
        paste: function(e) {
            var i;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== t.inArray("text/plain", e.originalEvent.clipboardData.types)) i = e.originalEvent.clipboardData.getData("text/plain");
            else {
                if (!window.clipboardData) return;
                i = window.clipboardData.getData("Text")
            }
            this.setDate(i), this.update(), e.preventDefault()
        },
        _utc_to_local: function(t) {
            if (!t) return t;
            var e = new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
            return e.getTimezoneOffset() !== t.getTimezoneOffset() && (e = new Date(t.getTime() + 6e4 * e.getTimezoneOffset())), e
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && i(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            return t !== e ? new Date(t) : null
        },
        clearDates: function() {
            this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), this
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.setDates.apply(this, t.map(e, this._utc_to_local)), this
        },
        setDate: s("setDates"),
        setUTCDate: s("setUTCDates"),
        remove: s("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        setValue: function() {
            var t = this.getFormattedDate();
            return this.inputField.val(t), this
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var n = this.o.language;
            return t.map(this.dates, function(t) {
                return v.formatDate(t, i, n)
            }).join(this.o.multidateSeparator)
        },
        getStartDate: function() {
            return this.o.startDate
        },
        setStartDate: function(t) {
            return this._process_options({
                startDate: t
            }), this.update(), this.updateNavArrows(), this
        },
        getEndDate: function() {
            return this.o.endDate
        },
        setEndDate: function(t) {
            return this._process_options({
                endDate: t
            }), this.update(), this.updateNavArrows(), this
        },
        setDaysOfWeekDisabled: function(t) {
            return this._process_options({
                daysOfWeekDisabled: t
            }), this.update(), this
        },
        setDaysOfWeekHighlighted: function(t) {
            return this._process_options({
                daysOfWeekHighlighted: t
            }), this.update(), this
        },
        setDatesDisabled: function(t) {
            return this._process_options({
                datesDisabled: t
            }), this.update(), this
        },
        place: function() {
            if (this.isInline) return this;
            var e = this.picker.outerWidth(),
                i = this.picker.outerHeight(),
                n = t(this.o.container),
                o = n.width(),
                s = "body" === this.o.container ? t(document).scrollTop() : n.scrollTop(),
                r = n.offset(),
                a = [0];
            this.element.parents().each(function() {
                var e = t(this).css("z-index");
                "auto" !== e && 0 !== Number(e) && a.push(Number(e))
            });
            var l = Math.max.apply(Math, a) + this.o.zIndexOffset,
                c = this.component ? this.component.parent().offset() : this.element.offset(),
                u = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                d = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                h = c.left - r.left,
                p = c.top - r.top;
            "body" !== this.o.container && (p += s), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (h -= e - d)) : c.left < 0 ? (this.picker.addClass("datepicker-orient-left"), h -= c.left - 10) : h + e > o ? (this.picker.addClass("datepicker-orient-right"), h += d - e) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
            var f, g = this.o.orientation.y;
            if ("auto" === g && (f = -s + p - i, g = f < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + g), "top" === g ? p -= i + parseInt(this.picker.css("padding-top")) : p += u, this.o.rtl) {
                var m = o - (h + d);
                this.picker.css({
                    top: p,
                    right: m,
                    zIndex: l
                })
            } else this.picker.css({
                top: p,
                left: h,
                zIndex: l
            });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var e = this.dates.copy(),
                i = [],
                n = !1;
            return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
            }, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
                return v.parseDate(t, this.o.format, this.o.language, this.o.assumeNearbyYear)
            }, this)), i = t.grep(i, t.proxy(function(t) {
                return !this.dateWithinRange(t) || !t
            }, this), !0), this.dates.replace(i), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), n ? (this.setValue(), this.element.change()) : this.dates.length && String(e) !== String(this.dates) && n && (this._trigger("changeDate"), this.element.change()), !this.dates.length && e.length && (this._trigger("clearDate"), this.element.change()), this.fill(), this
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var e = this.o.weekStart,
                    i = "<tr>";
                for (this.o.calendarWeeks && (i += '<th class="cw">&#160;</th>'); e < this.o.weekStart + 7;) i += '<th class="dow', -1 !== t.inArray(e, this.o.daysOfWeekDisabled) && (i += " disabled"), i += '">' + m[this.o.language].daysMin[e++ % 7] + "</th>";
                i += "</tr>", this.picker.find(".datepicker-days thead").append(i)
            }
        },
        fillMonths: function() {
            for (var t, e = this._utc_to_local(this.viewDate), i = "", n = 0; n < 12; n++) t = e && e.getMonth() === n ? " focused" : "", i += '<span class="month' + t + '">' + m[this.o.language].monthsShort[n] + "</span>";
            this.picker.find(".datepicker-months td").html(i)
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf()
            }) : delete this.range, this.fill()
        },
        getClassNames: function(e) {
            var i = [],
                s = this.viewDate.getUTCFullYear(),
                r = this.viewDate.getUTCMonth(),
                a = n();
            return e.getUTCFullYear() < s || e.getUTCFullYear() === s && e.getUTCMonth() < r ? i.push("old") : (e.getUTCFullYear() > s || e.getUTCFullYear() === s && e.getUTCMonth() > r) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && o(e, a) && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), this.dateWithinRange(e) || i.push("disabled"), this.dateIsDisabled(e) && i.push("disabled", "disabled-date"), -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) && i.push("highlighted"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected"), e.valueOf() === this.range[0] && i.push("range-start"), e.valueOf() === this.range[this.range.length - 1] && i.push("range-end")), i
        },
        _fill_yearsView: function(i, n, o, s, r, a, l) {
            for (var c, u, d, h = "", p = o / 10, f = this.picker.find(i), g = Math.floor(s / o) * o, m = g + 9 * p, v = Math.floor(this.viewDate.getFullYear() / p) * p, y = t.map(this.dates, function(t) {
                    return Math.floor(t.getUTCFullYear() / p) * p
                }), b = g - p; b <= m + p; b += p) c = [n], u = null, b === g - p ? c.push("old") : b === m + p && c.push("new"), -1 !== t.inArray(b, y) && c.push("active"), (b < r || b > a) && c.push("disabled"), b === v && c.push("focused"), l !== t.noop && (d = l(new Date(b, 0, 1)), d === e ? d = {} : "boolean" == typeof d ? d = {
                enabled: d
            } : "string" == typeof d && (d = {
                classes: d
            }), !1 === d.enabled && c.push("disabled"), d.classes && (c = c.concat(d.classes.split(/\s+/))), d.tooltip && (u = d.tooltip)), h += '<span class="' + c.join(" ") + '"' + (u ? ' title="' + u + '"' : "") + ">" + b + "</span>";
            f.find(".datepicker-switch").text(g + "-" + m), f.find("td").html(h)
        },
        fill: function() {
            var n, o, s = new Date(this.viewDate),
                r = s.getUTCFullYear(),
                a = s.getUTCMonth(),
                l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                c = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                u = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                h = m[this.o.language].today || m.en.today || "",
                p = m[this.o.language].clear || m.en.clear || "",
                f = m[this.o.language].titleFormat || m.en.titleFormat;
            if (!isNaN(r) && !isNaN(a)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(v.formatDate(s, f, this.o.language)), this.picker.find("tfoot .today").text(h).css("display", !0 === this.o.todayBtn || "linked" === this.o.todayBtn ? "table-cell" : "none"), this.picker.find("tfoot .clear").text(p).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), this.updateNavArrows(), this.fillMonths();
                var g = i(r, a, 0),
                    y = g.getUTCDate();
                g.setUTCDate(y - (g.getUTCDay() - this.o.weekStart + 7) % 7);
                var b = new Date(g);
                g.getUTCFullYear() < 100 && b.setUTCFullYear(g.getUTCFullYear()), b.setUTCDate(b.getUTCDate() + 42), b = b.valueOf();
                for (var w, T, C = []; g.valueOf() < b;) {
                    if ((w = g.getUTCDay()) === this.o.weekStart && (C.push("<tr>"), this.o.calendarWeeks)) {
                        var _ = new Date(+g + (this.o.weekStart - w - 7) % 7 * 864e5),
                            x = new Date(Number(_) + (11 - _.getUTCDay()) % 7 * 864e5),
                            E = new Date(Number(E = i(x.getUTCFullYear(), 0, 1)) + (11 - E.getUTCDay()) % 7 * 864e5),
                            k = (x - E) / 864e5 / 7 + 1;
                        C.push('<td class="cw">' + k + "</td>")
                    }
                    T = this.getClassNames(g), T.push("day");
                    var S = g.getUTCDate();
                    this.o.beforeShowDay !== t.noop && (o = this.o.beforeShowDay(this._utc_to_local(g)), o === e ? o = {} : "boolean" == typeof o ? o = {
                        enabled: o
                    } : "string" == typeof o && (o = {
                        classes: o
                    }), !1 === o.enabled && T.push("disabled"), o.classes && (T = T.concat(o.classes.split(/\s+/))), o.tooltip && (n = o.tooltip), o.content && (S = o.content)), T = t.isFunction(t.uniqueSort) ? t.uniqueSort(T) : t.unique(T), C.push('<td class="' + T.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ' data-date="' + g.getTime().toString() + '">' + S + "</td>"), n = null, w === this.o.weekEnd && C.push("</tr>"), g.setUTCDate(g.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").html(C.join(""));
                var D = m[this.o.language].monthsTitle || m.en.monthsTitle || "Months",
                    A = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? D : r).end().find("tbody span").removeClass("active");
                if (t.each(this.dates, function(t, e) {
                        e.getUTCFullYear() === r && A.eq(e.getUTCMonth()).addClass("active")
                    }), (r < l || r > u) && A.addClass("disabled"), r === l && A.slice(0, c).addClass("disabled"), r === u && A.slice(d + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                    var O = this;
                    t.each(A, function(i, n) {
                        var o = new Date(r, i, 1),
                            s = O.o.beforeShowMonth(o);
                        s === e ? s = {} : "boolean" == typeof s ? s = {
                            enabled: s
                        } : "string" == typeof s && (s = {
                            classes: s
                        }), !1 !== s.enabled || t(n).hasClass("disabled") || t(n).addClass("disabled"), s.classes && t(n).addClass(s.classes), s.tooltip && t(n).prop("title", s.tooltip)
                    })
                }
                this._fill_yearsView(".datepicker-years", "year", 10, r, l, u, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, r, l, u, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, r, l, u, this.o.beforeShowCentury)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t, e, i = new Date(this.viewDate),
                    n = i.getUTCFullYear(),
                    o = i.getUTCMonth(),
                    s = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    a = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    c = 1;
                switch (this.viewMode) {
                    case 4:
                        c *= 10;
                    case 3:
                        c *= 10;
                    case 2:
                        c *= 10;
                    case 1:
                        t = Math.floor(n / c) * c < s, e = Math.floor(n / c) * c + c > a;
                        break;
                    case 0:
                        t = n <= s && o < r, e = n >= a && o > l
                }
                this.picker.find(".prev").toggleClass("disabled", t), this.picker.find(".next").toggleClass("disabled", e)
            }
        },
        click: function(e) {
            e.preventDefault(), e.stopPropagation();
            var o, s, r, a;
            o = t(e.target), o.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), o.hasClass("today") && !o.hasClass("day") && (this.setViewMode(0), this._setDate(n(), "linked" === this.o.todayBtn ? null : "view")), o.hasClass("clear") && this.clearDates(), o.hasClass("disabled") || (o.hasClass("month") || o.hasClass("year") || o.hasClass("decade") || o.hasClass("century")) && (this.viewDate.setUTCDate(1), s = 1, 1 === this.viewMode ? (a = o.parent().find("span").index(o), r = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(a)) : (a = 0, r = Number(o.text()), this.viewDate.setUTCFullYear(r)), this._trigger(v.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(i(r, a, s)) : (this.setViewMode(this.viewMode - 1), this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), delete this._focused_from
        },
        dayCellClick: function(e) {
            var i = t(e.currentTarget),
                n = i.data("date"),
                o = new Date(n);
            this.o.updateViewDate && (o.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), o.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), this._setDate(o)
        },
        navArrowsClick: function(e) {
            var i = t(e.currentTarget),
                n = i.hasClass("prev") ? -1 : 1;
            0 !== this.viewMode && (n *= 12 * v.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, n), this._trigger(v.viewModes[this.viewMode].e, this.viewDate), this.fill()
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(), -1 !== e ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(t)) : this.dates.push(t), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(t, e) {
            e && "date" !== e || this._toggle_multidate(t && new Date(t)), (!e && this.o.updateViewDate || "view" === e) && (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate"), this.inputField.trigger("change"), !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveDay: function(t, e) {
            var i = new Date(t);
            return i.setUTCDate(t.getUTCDate() + e), i
        },
        moveWeek: function(t, e) {
            return this.moveDay(t, 7 * e)
        },
        moveMonth: function(t, e) {
            if (!r(t)) return this.o.defaultViewDate;
            if (!e) return t;
            var i, n, o = new Date(t.valueOf()),
                s = o.getUTCDate(),
                a = o.getUTCMonth(),
                l = Math.abs(e);
            if (e = e > 0 ? 1 : -1, 1 === l) n = -1 === e ? function() {
                return o.getUTCMonth() === a
            } : function() {
                return o.getUTCMonth() !== i
            }, i = a + e, o.setUTCMonth(i), i = (i + 12) % 12;
            else {
                for (var c = 0; c < l; c++) o = this.moveMonth(o, e);
                i = o.getUTCMonth(), o.setUTCDate(s), n = function() {
                    return i !== o.getUTCMonth()
                }
            }
            for (; n();) o.setUTCDate(--s), o.setUTCMonth(i);
            return o
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        moveAvailableDate: function(t, e, i) {
            do {
                if (t = this[i](t, e), !this.dateWithinRange(t)) return !1;
                i = "moveDay"
            } while (this.dateIsDisabled(t));
            return t
        },
        weekOfDateIsDisabled: function(e) {
            return -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)
        },
        dateIsDisabled: function(e) {
            return this.weekOfDateIsDisabled(e) || t.grep(this.o.datesDisabled, function(t) {
                return o(e, t)
            }).length > 0
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (!this.picker.is(":visible")) return void(40 !== t.keyCode && 27 !== t.keyCode || (this.show(), t.stopPropagation()));
            var e, i, n = !1,
                o = this.focusDate || this.viewDate;
            switch (t.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault(), t.stopPropagation();
                    break;
                case 37:
                case 38:
                case 39:
                case 40:
                    if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                    e = 37 === t.keyCode || 38 === t.keyCode ? -1 : 1, 0 === this.viewMode ? t.ctrlKey ? (i = this.moveAvailableDate(o, e, "moveYear")) && this._trigger("changeYear", this.viewDate) : t.shiftKey ? (i = this.moveAvailableDate(o, e, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === t.keyCode || 39 === t.keyCode ? i = this.moveAvailableDate(o, e, "moveDay") : this.weekOfDateIsDisabled(o) || (i = this.moveAvailableDate(o, e, "moveWeek")) : 1 === this.viewMode ? (38 !== t.keyCode && 40 !== t.keyCode || (e *= 4), i = this.moveAvailableDate(o, e, "moveMonth")) : 2 === this.viewMode && (38 !== t.keyCode && 40 !== t.keyCode || (e *= 4), i = this.moveAvailableDate(o, e, "moveYear")), i && (this.focusDate = this.viewDate = i, this.setValue(), this.fill(), t.preventDefault());
                    break;
                case 13:
                    if (!this.o.forceParse) break;
                    o = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(o), n = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), t.stopPropagation(), this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
            }
            n && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change"))
        },
        setViewMode: function(t) {
            this.viewMode = t, this.picker.children("div").hide().filter(".datepicker-" + v.viewModes[this.viewMode].clsName).show(), this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate))
        }
    };
    var d = function(e, i) {
        t.data(e, "datepicker", this), this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t
        }), delete i.inputs, this.keepEmptyValues = i.keepEmptyValues, delete i.keepEmptyValues, p.call(t(this.inputs), i).on("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
            return t.data(e, "datepicker")
        }), this.updateDates()
    };
    d.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate()
            }), this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf()
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e)
            })
        },
        clearDates: function() {
            t.each(this.pickers, function(t, e) {
                e.clearDates()
            })
        },
        dateUpdated: function(i) {
            if (!this.updating) {
                this.updating = !0;
                var n = t.data(i.target, "datepicker");
                if (n !== e) {
                    var o = n.getUTCDate(),
                        s = this.keepEmptyValues,
                        r = t.inArray(i.target, this.inputs),
                        a = r - 1,
                        l = r + 1,
                        c = this.inputs.length;
                    if (-1 !== r) {
                        if (t.each(this.pickers, function(t, e) {
                                e.getUTCDate() || e !== n && s || e.setUTCDate(o)
                            }), o < this.dates[a])
                            for (; a >= 0 && o < this.dates[a];) this.pickers[a--].setUTCDate(o);
                        else if (o > this.dates[l])
                            for (; l < c && o > this.dates[l];) this.pickers[l++].setUTCDate(o);
                        this.updateDates(), delete this.updating
                    }
                }
            }
        },
        destroy: function() {
            t.map(this.pickers, function(t) {
                t.destroy()
            }), t(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker
        },
        remove: s("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
    };
    var h = t.fn.datepicker,
        p = function(i) {
            var n = Array.apply(null, arguments);
            n.shift();
            var o;
            if (this.each(function() {
                    var e = t(this),
                        s = e.data("datepicker"),
                        r = "object" == typeof i && i;
                    if (!s) {
                        var c = a(this, "date"),
                            h = t.extend({}, f, c, r),
                            p = l(h.language),
                            g = t.extend({}, f, p, c, r);
                        e.hasClass("input-daterange") || g.inputs ? (t.extend(g, {
                            inputs: g.inputs || e.find("input").toArray()
                        }), s = new d(this, g)) : s = new u(this, g), e.data("datepicker", s)
                    }
                    "string" == typeof i && "function" == typeof s[i] && (o = s[i].apply(s, n))
                }), o === e || o instanceof u || o instanceof d) return this;
            if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
            return o
        };
    t.fn.datepicker = p;
    var f = t.fn.datepicker.defaults = {
            assumeNearbyYear: !1,
            autoclose: !1,
            beforeShowDay: t.noop,
            beforeShowMonth: t.noop,
            beforeShowYear: t.noop,
            beforeShowDecade: t.noop,
            beforeShowCentury: t.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keepEmptyValues: !1,
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            maxViewMode: 4,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1 / 0,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            updateViewDate: !0,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            showOnFocus: !0,
            zIndexOffset: 10,
            container: "body",
            immediateUpdates: !1,
            title: "",
            templates: {
                leftArrow: "&#x00AB;",
                rightArrow: "&#x00BB;"
            },
            showWeekDays: !0
        },
        g = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = u;
    var m = t.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                titleFormat: "MM yyyy"
            }
        },
        v = {
            viewModes: [{
                names: ["days", "month"],
                clsName: "days",
                e: "changeMonth"
            }, {
                names: ["months", "year"],
                clsName: "months",
                e: "changeYear",
                navStep: 1
            }, {
                names: ["years", "decade"],
                clsName: "years",
                e: "changeDecade",
                navStep: 10
            }, {
                names: ["decades", "century"],
                clsName: "decades",
                e: "changeCentury",
                navStep: 100
            }, {
                names: ["centuries", "millennium"],
                clsName: "centuries",
                e: "changeMillennium",
                navStep: 1e3
            }],
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
            parseFormat: function(t) {
                if ("function" == typeof t.toValue && "function" == typeof t.toDisplay) return t;
                var e = t.replace(this.validParts, "\0").split("\0"),
                    i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {
                    separators: e,
                    parts: i
                }
            },
            parseDate: function(i, o, s, r) {
                function a(t, e) {
                    return !0 === e && (e = 10), t < 100 && (t += 2e3) > (new Date).getFullYear() + e && (t -= 100), t
                }

                function l() {
                    var t = this.slice(0, c[p].length),
                        e = c[p].slice(0, t.length);
                    return t.toLowerCase() === e.toLowerCase()
                }
                if (!i) return e;
                if (i instanceof Date) return i;
                if ("string" == typeof o && (o = v.parseFormat(o)), o.toValue) return o.toValue(i, o, s);
                var c, d, h, p, f, g = {
                        d: "moveDay",
                        m: "moveMonth",
                        w: "moveWeek",
                        y: "moveYear"
                    },
                    y = {
                        yesterday: "-1d",
                        today: "+0d",
                        tomorrow: "+1d"
                    };
                if (i in y && (i = y[i]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(i)) {
                    for (c = i.match(/([\-+]\d+)([dmwy])/gi), i = new Date, p = 0; p < c.length; p++) d = c[p].match(/([\-+]\d+)([dmwy])/i), h = Number(d[1]), f = g[d[2].toLowerCase()], i = u.prototype[f](i, h);
                    return u.prototype._zero_utc_time(i)
                }
                c = i && i.match(this.nonpunctuation) || [];
                var b, w, T = {},
                    C = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    _ = {
                        yyyy: function(t, e) {
                            return t.setUTCFullYear(r ? a(e, r) : e)
                        },
                        m: function(t, e) {
                            if (isNaN(t)) return t;
                            for (e -= 1; e < 0;) e += 12;
                            for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                            return t
                        },
                        d: function(t, e) {
                            return t.setUTCDate(e)
                        }
                    };
                _.yy = _.yyyy, _.M = _.MM = _.mm = _.m, _.dd = _.d, i = n();
                var x = o.parts.slice();
                if (c.length !== x.length && (x = t(x).filter(function(e, i) {
                        return -1 !== t.inArray(i, C)
                    }).toArray()), c.length === x.length) {
                    var E;
                    for (p = 0, E = x.length; p < E; p++) {
                        if (b = parseInt(c[p], 10), d = x[p], isNaN(b)) switch (d) {
                            case "MM":
                                w = t(m[s].months).filter(l), b = t.inArray(w[0], m[s].months) + 1;
                                break;
                            case "M":
                                w = t(m[s].monthsShort).filter(l), b = t.inArray(w[0], m[s].monthsShort) + 1
                        }
                        T[d] = b
                    }
                    var k, S;
                    for (p = 0; p < C.length; p++)(S = C[p]) in T && !isNaN(T[S]) && (k = new Date(i), _[S](k, T[S]), isNaN(k) || (i = k))
                }
                return i
            },
            formatDate: function(e, i, n) {
                if (!e) return "";
                if ("string" == typeof i && (i = v.parseFormat(i)), i.toDisplay) return i.toDisplay(e, i, n);
                var o = {
                    d: e.getUTCDate(),
                    D: m[n].daysShort[e.getUTCDay()],
                    DD: m[n].days[e.getUTCDay()],
                    m: e.getUTCMonth() + 1,
                    M: m[n].monthsShort[e.getUTCMonth()],
                    MM: m[n].months[e.getUTCMonth()],
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear()
                };
                o.dd = (o.d < 10 ? "0" : "") + o.d, o.mm = (o.m < 10 ? "0" : "") + o.m, e = [];
                for (var s = t.extend([], i.separators), r = 0, a = i.parts.length; r <= a; r++) s.length && e.push(s.shift()), e.push(o[i.parts[r]]);
                return e.join("")
            },
            headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + f.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + f.templates.rightArrow + "</th></tr></thead>",
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    v.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + v.headTemplate + "<tbody></tbody>" + v.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = v, t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = h, this
    }, t.fn.datepicker.version = "1.8.0", t.fn.datepicker.deprecated = function(t) {
        var e = window.console;
        e && e.warn && e.warn("DEPRECATED: " + t)
    }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(), p.call(i, "show"))
    }), t(function() {
        p.call(t('[data-provide="datepicker-inline"]'))
    })
}),
function(t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = {
            bgVertical: function(t, e) {
                return t.css({
                    "background-position": "center " + -e + "px"
                })
            },
            bgHorizontal: function(t, e) {
                return t.css({
                    "background-position": -e + "px center"
                })
            },
            vertical: function(t, e, i) {
                return "none" !== i || (i = ""), t.css({
                    "-webkit-transform": "translateY(" + e + "px)" + i,
                    "-moz-transform": "translateY(" + e + "px)" + i,
                    transform: "translateY(" + e + "px)" + i,
                    transition: "transform linear",
                    "will-change": "transform"
                })
            },
            horizontal: function(t, e, i) {
                return "none" !== i || (i = ""), t.css({
                    "-webkit-transform": "translateX(" + e + "px)" + i,
                    "-moz-transform": "translateX(" + e + "px)" + i,
                    transform: "translateX(" + e + "px)" + i,
                    transition: "transform linear",
                    "will-change": "transform"
                })
            }
        },
        i = {
            factor: function(t, e, i) {
                var n = t.data("paroller-factor"),
                    o = n || i.factor;
                if (e < 576) {
                    var s = t.data("paroller-factor-xs"),
                        r = s || i.factorXs;
                    return r || o
                }
                if (e <= 768) {
                    var a = t.data("paroller-factor-sm"),
                        l = a || i.factorSm;
                    return l || o
                }
                if (e <= 1024) {
                    var c = t.data("paroller-factor-md"),
                        u = c || i.factorMd;
                    return u || o
                }
                if (e <= 1200) {
                    var d = t.data("paroller-factor-lg"),
                        h = d || i.factorLg;
                    return h || o
                }
                if (e <= 1920) {
                    var p = t.data("paroller-factor-xl"),
                        f = p || i.factorXl;
                    return f || o
                }
                return o
            },
            bgOffset: function(t, e) {
                return Math.round(t * e)
            },
            transform: function(t, e, i, n) {
                return Math.round((t - i / 2 + n) * e)
            }
        },
        n = {
            background: function(t) {
                return t.css({
                    "background-position": "unset"
                })
            },
            foreground: function(t) {
                return t.css({
                    transform: "unset",
                    transition: "unset"
                })
            }
        };
    t.fn.paroller = function(o) {
        var s = t(window).height(),
            r = t(document).height(),
            o = t.extend({
                factor: 0,
                factorXs: 0,
                factorSm: 0,
                factorMd: 0,
                factorLg: 0,
                factorXl: 0,
                type: "background",
                direction: "vertical"
            }, o);
        return this.each(function() {
            var a = t(this),
                l = t(window).width(),
                c = a.offset().top,
                u = a.outerHeight(),
                d = a.data("paroller-type"),
                h = a.data("paroller-direction"),
                p = a.css("transform"),
                f = d || o.type,
                g = h || o.direction,
                m = i.factor(a, l, o),
                v = i.bgOffset(c, m),
                y = i.transform(c, m, s, u);
            "background" === f ? "vertical" === g ? e.bgVertical(a, v) : "horizontal" === g && e.bgHorizontal(a, v) : "foreground" === f && ("vertical" === g ? e.vertical(a, y, p) : "horizontal" === g && e.horizontal(a, y, p)), t(window).on("resize", function() {
                var d = t(this).scrollTop();
                l = t(window).width(), c = a.offset().top, u = a.outerHeight(), m = i.factor(a, l, o), v = Math.round(c * m), y = Math.round((c - s / 2 + u) * m), "background" === f ? (n.background(a), "vertical" === g ? e.bgVertical(a, v) : "horizontal" === g && e.bgHorizontal(a, v)) : "foreground" === f && d <= r && (n.foreground(a), "vertical" === g ? e.vertical(a, y) : "horizontal" === g && e.horizontal(a, y))
            }), t(window).on("scroll", function() {
                var i = t(this).scrollTop();
                r = t(document).height(), v = Math.round((c - i) * m), y = Math.round((c - s / 2 + u - i) * m), "background" === f ? "vertical" === g ? e.bgVertical(a, v) : "horizontal" === g && e.bgHorizontal(a, v) : "foreground" === f && i <= r && ("vertical" === g ? e.vertical(a, y, p) : "horizontal" === g && e.horizontal(a, y, p))
            })
        })
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(0, function(t) {
    ! function(t, e) {
        "use strict";

        function i(e) {
            e && "custom" === e.errorMessagePosition && "function" == typeof e.errorMessageCustom && (t.formUtils.warn("Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead"), e.submitErrorMessageCallback = function(t, i) {
                e.errorMessageCustom(t, e.language.errorTitle, i, e)
            })
        }

        function n(e) {
            if (e.errorMessagePosition && "object" == typeof e.errorMessagePosition) {
                t.formUtils.warn("Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead");
                var i = e.errorMessagePosition;
                e.errorMessagePosition = "top", e.submitErrorMessageCallback = function() {
                    return i
                }
            }
        }

        function o(e) {
            var i = e.find("[data-validation-if-checked]");
            i.length && t.formUtils.warn('Detected use of attribute "data-validation-if-checked" which is deprecated. Use "data-validation-depends-on" provided by module "logic"'), i.on("beforeValidation", function() {
                var i = t(this),
                    n = i.valAttr("if-checked"),
                    o = t('input[name="' + n + '"]', e),
                    s = o.is(":checked"),
                    r = (t.formUtils.getValue(o) || "").toString(),
                    a = i.valAttr("if-checked-value");
                (!s || a && a !== r) && i.valAttr("skipped", !0)
            })
        }
        t.fn.validateForm = function(e, i) {
            return t.formUtils.warn("Use of deprecated function $.validateForm, use $.isValid instead"), this.isValid(e, i, !0)
        }, t(window).on("validatorsLoaded formValidationSetup", function(e, s, r) {
            s || (s = t("form")), i(r), n(r), o(s)
        })
    }(t),
    function(t) {
        "use strict";
        var e = {
            resolveErrorMessage: function(t, e, i, n, o) {
                var s = n.validationErrorMsgAttribute + "-" + i.replace("validate_", ""),
                    r = t.attr(s);
                return r || (r = t.attr(n.validationErrorMsgAttribute)) || (r = "function" != typeof e.errorMessageKey ? o[e.errorMessageKey] : o[e.errorMessageKey(n)]) || (r = e.errorMessage), r
            },
            getParentContainer: function(e) {
                if (e.valAttr("error-msg-container")) return t(e.valAttr("error-msg-container"));
                var i = e.parent();
                if (!i.hasClass("form-group") && !i.closest("form").hasClass("form-horizontal")) {
                    var n = i.closest(".form-group");
                    if (n.length) return n.eq(0)
                }
                return i
            },
            applyInputErrorStyling: function(t, e) {
                t.addClass(e.errorElementClass).removeClass("valid"), this.getParentContainer(t).addClass(e.inputParentClassOnError).removeClass(e.inputParentClassOnSuccess), "" !== e.borderColorOnError && t.css("border-color", e.borderColorOnError)
            },
            applyInputSuccessStyling: function(t, e) {
                t.addClass("valid"), this.getParentContainer(t).addClass(e.inputParentClassOnSuccess)
            },
            removeInputStylingAndMessage: function(t, i) {
                t.removeClass("valid").removeClass(i.errorElementClass).css("border-color", "");
                var n = e.getParentContainer(t);
                if (n.removeClass(i.inputParentClassOnError).removeClass(i.inputParentClassOnSuccess), "function" == typeof i.inlineErrorMessageCallback) {
                    var o = i.inlineErrorMessageCallback(t, !1, i);
                    o && o.html("")
                } else n.find("." + i.errorMessageClass).remove()
            },
            removeAllMessagesAndStyling: function(i, n) {
                if ("function" == typeof n.submitErrorMessageCallback) {
                    var o = n.submitErrorMessageCallback(i, n);
                    o && o.html("")
                } else i.find("." + n.errorMessageClass + ".alert").remove();
                i.find("." + n.errorElementClass + ",.valid").each(function() {
                    e.removeInputStylingAndMessage(t(this), n)
                })
            },
            setInlineMessage: function(e, i, n) {
                this.applyInputErrorStyling(e, n);
                var o, s = document.getElementById(e.attr("name") + "_err_msg"),
                    r = !1,
                    a = function(n) {
                        t.formUtils.$win.trigger("validationErrorDisplay", [e, n]), n.html(i)
                    },
                    l = function() {
                        var s = !1;
                        r.find("." + n.errorMessageClass).each(function() {
                            return this.inputReferer === e[0] ? (s = t(this), !1) : void 0
                        }), s ? i ? a(s) : s.remove() : "" !== i && (o = t('<div class="' + n.errorMessageClass + ' alert"></div>'), a(o), o[0].inputReferer = e[0], r.prepend(o))
                    };
                if (s) t.formUtils.warn("Using deprecated element reference " + s.id), r = t(s), l();
                else if ("function" == typeof n.inlineErrorMessageCallback) {
                    if (!(r = n.inlineErrorMessageCallback(e, i, n))) return;
                    l()
                } else {
                    var c = this.getParentContainer(e);
                    o = c.find("." + n.errorMessageClass + ".help-block"), 0 === o.length && (o = t("<span></span>").addClass("help-block").addClass(n.errorMessageClass), o.appendTo(c)), a(o)
                }
            },
            setMessageInTopOfForm: function(e, i, n, o) {
                var s = '<div class="{errorMessageClass} alert alert-danger"><strong>{errorTitle}</strong><ul>{fields}</ul></div>',
                    r = !1;
                if ("function" != typeof n.submitErrorMessageCallback || (r = n.submitErrorMessageCallback(e, i, n))) {
                    var a = {
                        errorTitle: o.errorTitle,
                        fields: "",
                        errorMessageClass: n.errorMessageClass
                    };
                    t.each(i, function(t, e) {
                        a.fields += "<li>" + e + "</li>"
                    }), t.each(a, function(t, e) {
                        s = s.replace("{" + t + "}", e)
                    }), r ? r.html(s) : e.children().eq(0).before(t(s))
                }
            }
        };
        t.formUtils = t.extend(t.formUtils || {}, {
            dialogs: e
        })
    }(t),
    function(t, e, i) {
        "use strict";
        var n = 0;
        t.fn.validateOnBlur = function(e, i) {
            var n = this,
                o = this.find("*[data-validation]");
            return o.each(function() {
                var o = t(this);
                if (o.is("[type=radio]")) {
                    var s = n.find('[type=radio][name="' + o.attr("name") + '"]');
                    s.bind("blur.validation", function() {
                        o.validateInputOnBlur(e, i, !0, "blur")
                    }), i.validateCheckboxRadioOnClick && s.bind("click.validation", function() {
                        o.validateInputOnBlur(e, i, !0, "click")
                    })
                }
            }), o.bind("blur.validation", function() {
                t(this).validateInputOnBlur(e, i, !0, "blur")
            }), i.validateCheckboxRadioOnClick && this.find("input[type=checkbox][data-validation],input[type=radio][data-validation]").bind("click.validation", function() {
                t(this).validateInputOnBlur(e, i, !0, "click")
            }), this
        }, t.fn.validateOnEvent = function(e, i) {
            return ("FORM" === this[0].nodeName ? this.find("*[data-validation-event]") : this).each(function() {
                var n = t(this),
                    o = n.valAttr("event");
                o && n.unbind(o + ".validation").bind(o + ".validation", function(n) {
                    9 !== (n || {}).keyCode && t(this).validateInputOnBlur(e, i, !0, o)
                })
            }), this
        }, t.fn.showHelpOnFocus = function(e) {
            return e || (e = "data-validation-help"), this.find(".has-help-txt").valAttr("has-keyup-event", !1).removeClass("has-help-txt"), this.find("textarea,input").each(function() {
                var i = t(this),
                    o = "jquery_form_help_" + ++n,
                    s = i.attr(e);
                s && i.addClass("has-help-txt").unbind("focus.help").bind("focus.help", function() {
                    var e = i.parent().find("." + o);
                    0 === e.length && (e = t("<span />").addClass(o).addClass("help").addClass("help-block").text(s).hide(), i.after(e)), e.fadeIn()
                }).unbind("blur.help").bind("blur.help", function() {
                    t(this).parent().find("." + o).fadeOut("slow")
                })
            }), this
        }, t.fn.validate = function(e, i, n) {
            var o = t.extend({}, t.formUtils.LANG, n || {});
            this.each(function() {
                var n = t(this),
                    s = n.closest("form").get(0).validationConfig || {};
                n.one("validation", function(t, i) {
                    "function" == typeof e && e(i, this, t)
                }), n.validateInputOnBlur(o, t.extend({}, s, i || {}), !0)
            })
        }, t.fn.willPostponeValidation = function() {
            return (this.valAttr("suggestion-nr") || this.valAttr("postpone") || this.hasClass("hasDatepicker")) && !e.postponedValidation
        }, t.fn.validateInputOnBlur = function(i, n, o, s) {
            if (t.formUtils.eventType = s, this.willPostponeValidation()) {
                var r = this,
                    a = this.valAttr("postpone") || 200;
                return e.postponedValidation = function() {
                    r.validateInputOnBlur(i, n, o, s), e.postponedValidation = !1
                }, setTimeout(function() {
                    e.postponedValidation && e.postponedValidation()
                }, a), this
            }
            i = t.extend({}, t.formUtils.LANG, i || {}), t.formUtils.dialogs.removeInputStylingAndMessage(this, n);
            var l = this,
                c = l.closest("form"),
                u = t.formUtils.validateInput(l, i, n, c, s);
            return o && l.unbind("keyup.validation"), u.shouldChangeDisplay && (u.isValid ? t.formUtils.dialogs.applyInputSuccessStyling(l, n) : t.formUtils.dialogs.setInlineMessage(l, u.errorMsg, n)), !u.isValid && o && l.bind("keyup.validation", function(e) {
                9 !== e.keyCode && t(this).validateInputOnBlur(i, n, !1, "keyup")
            }), this
        }, t.fn.valAttr = function(t, e) {
            return void 0 === e ? this.attr("data-validation-" + t) : !1 === e || null === e ? this.removeAttr("data-validation-" + t) : (t = t.length > 0 ? "-" + t : "", this.attr("data-validation" + t, e))
        }, t.fn.isValid = function(e, i, n) {
            if (t.formUtils.isLoadingModules) {
                var o = this;
                return setTimeout(function() {
                    o.isValid(e, i, n)
                }, 200), null
            }
            i = t.extend({}, t.formUtils.defaultConfig(), i || {}), e = t.extend({}, t.formUtils.LANG, e || {}), n = !1 !== n, t.formUtils.errorDisplayPreventedWhenHalted && (delete t.formUtils.errorDisplayPreventedWhenHalted, n = !1), t.formUtils.isValidatingEntireForm = !0, t.formUtils.haltValidation = !1;
            var s = function(e, o) {
                    t.inArray(e, a) < 0 && a.push(e), l.push(o), o.attr("current-error", e), n && t.formUtils.dialogs.applyInputErrorStyling(o, i)
                },
                r = [],
                a = [],
                l = [],
                c = this,
                u = function(e, n) {
                    return "submit" === n || "button" === n || "reset" === n || t.inArray(e, i.ignore || []) > -1
                };
            if (n && t.formUtils.dialogs.removeAllMessagesAndStyling(c, i), c.find("input,textarea,select").filter(':not([type="submit"],[type="button"])').each(function() {
                    var n = t(this),
                        o = n.attr("type"),
                        a = "radio" === o || "checkbox" === o,
                        l = n.attr("name");
                    if (!u(l, o) && (!a || t.inArray(l, r) < 0)) {
                        a && r.push(l);
                        var d = t.formUtils.validateInput(n, e, i, c, "submit");
                        d.isValid ? d.isValid && d.shouldChangeDisplay && (n.valAttr("current-error", !1), t.formUtils.dialogs.applyInputSuccessStyling(n, i)) : s(d.errorMsg, n)
                    }
                }), "function" == typeof i.onValidate) {
                var d = i.onValidate(c);
                t.isArray(d) ? t.each(d, function(t, e) {
                    s(e.message, e.element)
                }) : d && d.element && d.message && s(d.message, d.element)
            }
            return t.formUtils.isValidatingEntireForm = !1, !t.formUtils.haltValidation && l.length > 0 ? (n && ("top" === i.errorMessagePosition ? t.formUtils.dialogs.setMessageInTopOfForm(c, a, i, e) : t.each(l, function(e, n) {
                t.formUtils.dialogs.setInlineMessage(n, n.attr("current-error"), i)
            }), i.scrollToTopOnError && t.formUtils.$win.scrollTop(c.offset().top - 20)), !1) : (!n && t.formUtils.haltValidation && (t.formUtils.errorDisplayPreventedWhenHalted = !0), !t.formUtils.haltValidation)
        }, t.fn.restrictLength = function(e) {
            return new t.formUtils.lengthRestriction(this, e), this
        }, t.fn.addSuggestions = function(e) {
            var i = !1;
            return this.find("input").each(function() {
                var n = t(this);
                i = t.split(n.attr("data-suggestions")), i.length > 0 && !n.hasClass("has-suggestions") && (t.formUtils.suggest(n, i, e), n.addClass("has-suggestions"))
            }), this
        }
    }(t, window),
    function(t) {
        "use strict";
        t.formUtils = t.extend(t.formUtils || {}, {
            isLoadingModules: !1,
            loadedModules: {},
            loadModules: function(e, i, n) {
                if (t.formUtils.isLoadingModules) return void setTimeout(function() {
                    t.formUtils.loadModules(e, i, n)
                }, 10);
                var o = !1,
                    s = function(e, i) {
                        var s = t.split(e),
                            r = s.length,
                            a = function() {
                                0 === --r && (t.formUtils.isLoadingModules = !1, n && o && "function" == typeof n && n())
                            };
                        r > 0 && (t.formUtils.isLoadingModules = !0);
                        var l = "?_=" + (new Date).getTime(),
                            c = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0];
                        t.each(s, function(e, n) {
                            if (n = t.trim(n), 0 === n.length) a();
                            else {
                                var s = i + n + (".js" === n.slice(-3) ? "" : ".js"),
                                    r = document.createElement("SCRIPT");
                                s in t.formUtils.loadedModules ? a() : (t.formUtils.loadedModules[s] = 1, o = !0, r.type = "text/javascript", r.onload = a, r.src = s + (".dev.js" === s.slice(-7) ? l : ""), r.onerror = function() {
                                    t.formUtils.warn("Unable to load form validation module " + s)
                                }, r.onreadystatechange = function() {
                                    "complete" !== this.readyState && "loaded" !== this.readyState || (a(), this.onload = null, this.onreadystatechange = null)
                                }, c.appendChild(r))
                            }
                        })
                    };
                if (i) s(e, i);
                else {
                    var r = function() {
                        var i = !1;
                        return t('script[src*="form-validator"]').each(function() {
                            return i = this.src.substr(0, this.src.lastIndexOf("/")) + "/", "/" === i && (i = ""), !1
                        }), !1 !== i && (s(e, i), !0)
                    };
                    r() || t(r)
                }
            }
        })
    }(t),
    function(t) {
        "use strict";
        t.split = function(e, i) {
            if ("function" != typeof i) {
                if (!e) return [];
                var n = [];
                return t.each(e.split(i || /[,|\-\s]\s*/g), function(e, i) {
                    i = t.trim(i), i.length && n.push(i)
                }), n
            }
            e && t.each(e.split(/[,|\-\s]\s*/g), function(e, n) {
                return n = t.trim(n), n.length ? i(n, e) : void 0
            })
        }, t.validate = function(e) {
            var i = t.extend(t.formUtils.defaultConfig(), {
                form: "form",
                validateOnEvent: !1,
                validateOnBlur: !0,
                validateCheckboxRadioOnClick: !0,
                showHelpOnFocus: !0,
                addSuggestions: !0,
                modules: "",
                onModulesLoaded: null,
                language: !1,
                onSuccess: !1,
                onError: !1,
                onElementValidate: !1
            });
            if (e = t.extend(i, e || {}), e.lang && "en" !== e.lang) {
                var n = "lang/" + e.lang + ".js";
                e.modules += e.modules.length ? "," + n : n
            }
            t(e.form).each(function(i, n) {
                n.validationConfig = e;
                var o = t(n);
                o.trigger("formValidationSetup", [o, e]), o.find(".has-help-txt").unbind("focus.validation").unbind("blur.validation"), o.removeClass("has-validation-callback").unbind("submit.validation").unbind("reset.validation").find("input[data-validation],textarea[data-validation]").unbind("blur.validation"), o.bind("submit.validation", function(i) {
                    var n = t(this),
                        o = function() {
                            return i.stopImmediatePropagation(), !1
                        };
                    if (t.formUtils.haltValidation) return o();
                    if (t.formUtils.isLoadingModules) return setTimeout(function() {
                        n.trigger("submit.validation")
                    }, 200), o();
                    var s = n.isValid(e.language, e);
                    return t.formUtils.haltValidation ? o() : s && "function" == typeof e.onSuccess ? !1 === e.onSuccess(n) ? o() : void 0 : s || "function" != typeof e.onError ? !!s || o() : (e.onError(n), o())
                }).bind("reset.validation", function() {
                    t.formUtils.dialogs.removeAllMessagesAndStyling(o, e)
                }).addClass("has-validation-callback"), e.showHelpOnFocus && o.showHelpOnFocus(), e.addSuggestions && o.addSuggestions(), e.validateOnBlur && (o.validateOnBlur(e.language, e), o.bind("html5ValidationAttrsFound", function() {
                    o.validateOnBlur(e.language, e)
                })), e.validateOnEvent && o.validateOnEvent(e.language, e)
            }), "" !== e.modules && t.formUtils.loadModules(e.modules, !1, function() {
                "function" == typeof e.onModulesLoaded && e.onModulesLoaded();
                var i = "string" == typeof e.form ? t(e.form) : e.form;
                t.formUtils.$win.trigger("validatorsLoaded", [i, e])
            })
        }
    }(t),
    function(t, e) {
        "use strict";
        var i = t(e);
        t.formUtils = t.extend(t.formUtils || {}, {
            $win: i,
            defaultConfig: function() {
                return {
                    ignore: [],
                    errorElementClass: "error",
                    borderColorOnError: "#b94a48",
                    errorMessageClass: "form-error",
                    validationRuleAttribute: "data-validation",
                    validationErrorMsgAttribute: "data-validation-error-msg",
                    errorMessagePosition: "inline",
                    errorMessageTemplate: {
                        container: '<div class="{errorMessageClass} alert alert-danger">{messages}</div>',
                        messages: "<strong>{errorTitle}</strong><ul>{fields}</ul>",
                        field: "<li>{msg}</li>"
                    },
                    scrollToTopOnError: !0,
                    dateFormat: "yyyy-mm-dd",
                    addValidClassOnAll: !1,
                    decimalSeparator: ".",
                    inputParentClassOnError: "has-error",
                    inputParentClassOnSuccess: "has-success",
                    validateHiddenInputs: !1,
                    inlineErrorMessageCallback: !1,
                    submitErrorMessageCallback: !1
                }
            },
            validators: {},
            _events: {
                load: [],
                valid: [],
                invalid: []
            },
            haltValidation: !1,
            isValidatingEntireForm: !1,
            addValidator: function(t) {
                var e = 0 === t.name.indexOf("validate_") ? t.name : "validate_" + t.name;
                void 0 === t.validateOnKeyUp && (t.validateOnKeyUp = !0), this.validators[e] = t
            },
            warn: function(t) {
                "console" in e ? "function" == typeof e.console.warn ? e.console.warn(t) : "function" == typeof e.console.log && e.console.log(t) : alert(t)
            },
            getValue: function(t, e) {
                var i = e ? e.find(t) : t;
                if (i.length > 0) {
                    var n = i.eq(0).attr("type");
                    return "radio" === n || "checkbox" === n ? i.filter(":checked").val() : i.val()
                }
                return !1
            },
            validateInput: function(e, i, n, o, s) {
                n = n || t.formUtils.defaultConfig(), i = i || t.formUtils.LANG;
                var r = this.getValue(e);
                e.valAttr("skipped", !1).one("beforeValidation", function() {
                    (e.attr("disabled") || !e.is(":visible") && !n.validateHiddenInputs) && e.valAttr("skipped", 1)
                }).trigger("beforeValidation", [r, n, i]);
                var a = "true" === e.valAttr("optional"),
                    l = !r && a,
                    c = e.attr(n.validationRuleAttribute),
                    u = !0,
                    d = "",
                    h = {
                        isValid: !0,
                        shouldChangeDisplay: !0,
                        errorMsg: ""
                    };
                if (!c || l || e.valAttr("skipped")) return h.shouldChangeDisplay = n.addValidClassOnAll, h;
                var p = e.valAttr("ignore");
                return p && t.each(p.split(""), function(t, e) {
                    r = r.replace(new RegExp("\\" + e), "")
                }), t.split(c, function(a) {
                    0 !== a.indexOf("validate_") && (a = "validate_" + a);
                    var l = t.formUtils.validators[a];
                    if (!l) throw new Error('Using undefined validator "' + a + '". Maybe you have forgotten to load the module that "' + a + '" belongs to?');
                    return "validate_checkbox_group" === a && (e = o.find('[name="' + e.attr("name") + '"]:eq(0)')), ("keyup" !== s || l.validateOnKeyUp) && (u = l.validatorFunction(r, e, n, i, o)), u ? void 0 : (d = t.formUtils.dialogs.resolveErrorMessage(e, l, a, n, i), !1)
                }, " "), !1 === u ? (e.trigger("validation", !1), h.errorMsg = d, h.isValid = !1, h.shouldChangeDisplay = !0) : null === u ? h.shouldChangeDisplay = !1 : (e.trigger("validation", !0), h.shouldChangeDisplay = !0), "function" == typeof n.onElementValidate && null !== d && n.onElementValidate(h.isValid, e, o, d), e.trigger("afterValidation", [h, s]), h
            },
            parseDate: function(e, i, n) {
                var o, s, r, a, l = i.replace(/[a-zA-Z]/gi, "").substring(0, 1),
                    c = "^",
                    u = i.split(l || null);
                if (t.each(u, function(t, e) {
                        c += (t > 0 ? "\\" + l : "") + "(\\d{" + e.length + "})"
                    }), c += "$", n) {
                    var d = [];
                    t.each(e.split(l), function(t, e) {
                        1 === e.length && (e = "0" + e), d.push(e)
                    }), e = d.join(l)
                }
                if (null === (o = e.match(new RegExp(c)))) return !1;
                var h = function(e, i, n) {
                    for (var o = 0; o < i.length; o++)
                        if (i[o].substring(0, 1) === e) return t.formUtils.parseDateInt(n[o + 1]);
                    return -1
                };
                return r = h("m", u, o), s = h("d", u, o), a = h("y", u, o), !(2 === r && s > 28 && (a % 4 != 0 || a % 100 == 0 && a % 400 != 0) || 2 === r && s > 29 && (a % 4 == 0 || a % 100 != 0 && a % 400 == 0) || r > 12 || 0 === r) && (!(this.isShortMonth(r) && s > 30 || !this.isShortMonth(r) && s > 31 || 0 === s) && [a, r, s])
            },
            parseDateInt: function(t) {
                return 0 === t.indexOf("0") && (t = t.replace("0", "")), parseInt(t, 10)
            },
            isShortMonth: function(t) {
                return t % 2 == 0 && 7 > t || t % 2 != 0 && t > 7
            },
            lengthRestriction: function(e, i) {
                var n = parseInt(i.text(), 10),
                    o = 0,
                    s = function() {
                        var t = e.val().length;
                        if (t > n) {
                            var s = e.scrollTop();
                            e.val(e.val().substring(0, n)), e.scrollTop(s)
                        }
                        o = n - t, 0 > o && (o = 0), i.text(o)
                    };
                t(e).bind("keydown keyup keypress focus blur", s).bind("cut paste", function() {
                    setTimeout(s, 100)
                }), t(document).bind("ready", s)
            },
            numericRangeCheck: function(e, i) {
                var n = t.split(i),
                    o = parseInt(i.substr(3), 10);
                return 1 === n.length && -1 === i.indexOf("min") && -1 === i.indexOf("max") && (n = [i, i]), 2 === n.length && (e < parseInt(n[0], 10) || e > parseInt(n[1], 10)) ? ["out", n[0], n[1]] : 0 === i.indexOf("min") && o > e ? ["min", o] : 0 === i.indexOf("max") && e > o ? ["max", o] : ["ok"]
            },
            _numSuggestionElements: 0,
            _selectedSuggestion: null,
            _previousTypedVal: null,
            suggest: function(e, n, o) {
                var s = {
                        css: {
                            maxHeight: "150px",
                            background: "#FFF",
                            lineHeight: "150%",
                            textDecoration: "underline",
                            overflowX: "hidden",
                            overflowY: "auto",
                            border: "#CCC solid 1px",
                            borderTop: "none",
                            cursor: "pointer"
                        },
                        activeSuggestionCSS: {
                            background: "#E9E9E9"
                        }
                    },
                    r = function(t, e) {
                        var i = e.offset();
                        t.css({
                            width: e.outerWidth(),
                            left: i.left + "px",
                            top: i.top + e.outerHeight() + "px"
                        })
                    };
                o && t.extend(s, o), s.css.position = "absolute", s.css["z-index"] = 9999, e.attr("autocomplete", "off"), 0 === this._numSuggestionElements && i.bind("resize", function() {
                    t(".jquery-form-suggestions").each(function() {
                        var e = t(this),
                            i = e.attr("data-suggest-container");
                        r(e, t(".suggestions-" + i).eq(0))
                    })
                }), this._numSuggestionElements++;
                var a = function(e) {
                    var i = e.valAttr("suggestion-nr");
                    t.formUtils._selectedSuggestion = null, t.formUtils._previousTypedVal = null, t(".jquery-form-suggestion-" + i).fadeOut("fast")
                };
                return e.data("suggestions", n).valAttr("suggestion-nr", this._numSuggestionElements).unbind("focus.suggest").bind("focus.suggest", function() {
                    t(this).trigger("keyup"), t.formUtils._selectedSuggestion = null
                }).unbind("keyup.suggest").bind("keyup.suggest", function() {
                    var i = t(this),
                        n = [],
                        o = t.trim(i.val()).toLocaleLowerCase();
                    if (o !== t.formUtils._previousTypedVal) {
                        t.formUtils._previousTypedVal = o;
                        var l = !1,
                            c = i.valAttr("suggestion-nr"),
                            u = t(".jquery-form-suggestion-" + c);
                        if (u.scrollTop(0), "" !== o) {
                            var d = o.length > 2;
                            t.each(i.data("suggestions"), function(t, e) {
                                var i = e.toLocaleLowerCase();
                                return i === o ? (n.push("<strong>" + e + "</strong>"), l = !0, !1) : void((0 === i.indexOf(o) || d && i.indexOf(o) > -1) && n.push(e.replace(new RegExp(o, "gi"), "<strong>$&</strong>")))
                            })
                        }
                        l || 0 === n.length && u.length > 0 ? u.hide() : n.length > 0 && 0 === u.length ? (u = t("<div></div>").css(s.css).appendTo("body"), e.addClass("suggestions-" + c), u.attr("data-suggest-container", c).addClass("jquery-form-suggestions").addClass("jquery-form-suggestion-" + c)) : n.length > 0 && !u.is(":visible") && u.show(), n.length > 0 && o.length !== n[0].length && (r(u, i), u.html(""), t.each(n, function(e, n) {
                            t("<div></div>").append(n).css({
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                padding: "5px"
                            }).addClass("form-suggest-element").appendTo(u).click(function() {
                                i.focus(), i.val(t(this).text()), i.trigger("change"), a(i)
                            })
                        }))
                    }
                }).unbind("keydown.validation").bind("keydown.validation", function(e) {
                    var i, n, o = e.keyCode ? e.keyCode : e.which,
                        r = t(this);
                    if (13 === o && null !== t.formUtils._selectedSuggestion) {
                        if (i = r.valAttr("suggestion-nr"), n = t(".jquery-form-suggestion-" + i), n.length > 0) {
                            var l = n.find("div").eq(t.formUtils._selectedSuggestion).text();
                            r.val(l), r.trigger("change"), a(r), e.preventDefault()
                        }
                    } else {
                        i = r.valAttr("suggestion-nr"), n = t(".jquery-form-suggestion-" + i);
                        var c = n.children();
                        if (c.length > 0 && t.inArray(o, [38, 40]) > -1) {
                            38 === o ? (null === t.formUtils._selectedSuggestion ? t.formUtils._selectedSuggestion = c.length - 1 : t.formUtils._selectedSuggestion--, t.formUtils._selectedSuggestion < 0 && (t.formUtils._selectedSuggestion = c.length - 1)) : 40 === o && (null === t.formUtils._selectedSuggestion ? t.formUtils._selectedSuggestion = 0 : t.formUtils._selectedSuggestion++, t.formUtils._selectedSuggestion > c.length - 1 && (t.formUtils._selectedSuggestion = 0));
                            var u = n.innerHeight(),
                                d = n.scrollTop(),
                                h = n.children().eq(0).outerHeight(),
                                p = h * t.formUtils._selectedSuggestion;
                            return (d > p || p > d + u) && n.scrollTop(p), c.removeClass("active-suggestion").css("background", "none").eq(t.formUtils._selectedSuggestion).addClass("active-suggestion").css(s.activeSuggestionCSS), e.preventDefault(), !1
                        }
                    }
                }).unbind("blur.suggest").bind("blur.suggest", function() {
                    a(t(this))
                }), e
            },
            LANG: {
                errorTitle: "Form submission failed!",
                requiredField: "This is a required field",
                requiredFields: "You have not answered all required fields",
                badTime: "You have not given a correct time",
                badEmail: "You have not given a correct e-mail address",
                badTelephone: "You have not given a correct phone number",
                badSecurityAnswer: "You have not given a correct answer to the security question",
                badDate: "You have not given a correct date",
                lengthBadStart: "The input value must be between ",
                lengthBadEnd: " characters",
                lengthTooLongStart: "The input value is longer than ",
                lengthTooShortStart: "The input value is shorter than ",
                notConfirmed: "Input values could not be confirmed",
                badDomain: "Incorrect domain value",
                badUrl: "The input value is not a correct URL",
                badCustomVal: "The input value is incorrect",
                andSpaces: " and spaces ",
                badInt: "The input value was not a correct number",
                badSecurityNumber: "Your social security number was incorrect",
                badUKVatAnswer: "Incorrect UK VAT Number",
                badUKNin: "Incorrect UK NIN",
                badUKUtr: "Incorrect UK UTR Number",
                badStrength: "The password isn't strong enough",
                badNumberOfSelectedOptionsStart: "You have to choose at least ",
                badNumberOfSelectedOptionsEnd: " answers",
                badAlphaNumeric: "The input value can only contain alphanumeric characters ",
                badAlphaNumericExtra: " and ",
                wrongFileSize: "The file you are trying to upload is too large (max %s)",
                wrongFileType: "Only files of type %s is allowed",
                groupCheckedRangeStart: "Please choose between ",
                groupCheckedTooFewStart: "Please choose at least ",
                groupCheckedTooManyStart: "Please choose a maximum of ",
                groupCheckedEnd: " item(s)",
                badCreditCard: "The credit card number is not correct",
                badCVV: "The CVV number was not correct",
                wrongFileDim: "Incorrect image dimensions,",
                imageTooTall: "the image can not be taller than",
                imageTooWide: "the image can not be wider than",
                imageTooSmall: "the image was too small",
                min: "min",
                max: "max",
                imageRatioNotAccepted: "Image ratio is not be accepted",
                badBrazilTelephoneAnswer: "The phone number entered is invalid",
                badBrazilCEPAnswer: "The CEP entered is invalid",
                badBrazilCPFAnswer: "The CPF entered is invalid",
                badPlPesel: "The PESEL entered is invalid",
                badPlNip: "The NIP entered is invalid",
                badPlRegon: "The REGON entered is invalid",
                badreCaptcha: "Please confirm that you are not a bot"
            }
        })
    }(t, window),
    function(t) {
        t.formUtils.addValidator({
            name: "email",
            validatorFunction: function(e) {
                var i = e.toLowerCase().split("@"),
                    n = i[0],
                    o = i[1];
                if (n && o) {
                    if (0 === n.indexOf('"')) {
                        var s = n.length;
                        if (n = n.replace(/\"/g, ""), n.length !== s - 2) return !1
                    }
                    return t.formUtils.validators.validate_domain.validatorFunction(i[1]) && 0 !== n.indexOf(".") && "." !== n.substring(n.length - 1, n.length) && -1 === n.indexOf("..") && !/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(n)
                }
                return !1
            },
            errorMessage: "",
            errorMessageKey: "badEmail"
        }), t.formUtils.addValidator({
            name: "domain",
            validatorFunction: function(t) {
                return t.length > 0 && t.length <= 253 && !/[^a-zA-Z0-9]/.test(t.slice(-2)) && !/[^a-zA-Z0-9]/.test(t.substr(0, 1)) && !/[^a-zA-Z0-9\.\-]/.test(t) && 1 === t.split("..").length && t.split(".").length > 1
            },
            errorMessage: "",
            errorMessageKey: "badDomain"
        }), t.formUtils.addValidator({
            name: "required",
            validatorFunction: function(e, i, n, o, s) {
                switch (i.attr("type")) {
                    case "checkbox":
                        return i.is(":checked");
                    case "radio":
                        return s.find('input[name="' + i.attr("name") + '"]').filter(":checked").length > 0;
                    default:
                        return "" !== t.trim(e)
                }
            },
            errorMessage: "",
            errorMessageKey: function(t) {
                return "top" === t.errorMessagePosition || "function" == typeof t.errorMessagePosition ? "requiredFields" : "requiredField"
            }
        }), t.formUtils.addValidator({
            name: "length",
            validatorFunction: function(e, i, n, o) {
                var s = i.valAttr("length"),
                    r = i.attr("type");
                if (void 0 === s) return alert('Please add attribute "data-validation-length" to ' + i[0].nodeName + " named " + i.attr("name")), !0;
                var a, l = "file" === r && void 0 !== i.get(0).files ? i.get(0).files.length : e.length,
                    c = t.formUtils.numericRangeCheck(l, s);
                switch (c[0]) {
                    case "out":
                        this.errorMessage = o.lengthBadStart + s + o.lengthBadEnd, a = !1;
                        break;
                    case "min":
                        this.errorMessage = o.lengthTooShortStart + c[1] + o.lengthBadEnd, a = !1;
                        break;
                    case "max":
                        this.errorMessage = o.lengthTooLongStart + c[1] + o.lengthBadEnd, a = !1;
                        break;
                    default:
                        a = !0
                }
                return a
            },
            errorMessage: "",
            errorMessageKey: ""
        }), t.formUtils.addValidator({
            name: "url",
            validatorFunction: function(e) {
                if (/^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)) {
                    var i = e.split("://")[1],
                        n = i.indexOf("/");
                    return n > -1 && (i = i.substr(0, n)), t.formUtils.validators.validate_domain.validatorFunction(i)
                }
                return !1
            },
            errorMessage: "",
            errorMessageKey: "badUrl"
        }), t.formUtils.addValidator({
            name: "number",
            validatorFunction: function(t, e, i) {
                if ("" !== t) {
                    var n, o, s = e.valAttr("allowing") || "",
                        r = e.valAttr("decimal-separator") || i.decimalSeparator,
                        a = !1,
                        l = e.valAttr("step") || "",
                        c = !1;
                    if ((e.attr("data-sanitize") || "").match(/(^|[\s])numberFormat([\s]|$)/i)) {
                        if (!window.numeral) throw new ReferenceError("The data-sanitize value numberFormat cannot be used without the numeral library. Please see Data Validation in http://www.formvalidator.net for more information.");
                        t.length && (t = String(numeral().unformat(t)))
                    }
                    if (-1 === s.indexOf("number") && (s += ",number"), -1 === s.indexOf("negative") && 0 === t.indexOf("-")) return !1;
                    if (s.indexOf("range") > -1 && (n = parseFloat(s.substring(s.indexOf("[") + 1, s.indexOf(";"))), o = parseFloat(s.substring(s.indexOf(";") + 1, s.indexOf("]"))), a = !0), "" !== l && (c = !0), "," === r) {
                        if (t.indexOf(".") > -1) return !1;
                        t = t.replace(",", ".")
                    }
                    if ("" === t.replace(/[0-9-]/g, "") && (!a || t >= n && o >= t) && (!c || t % l == 0)) return !0;
                    if (s.indexOf("float") > -1 && null !== t.match(new RegExp("^([0-9-]+)\\.([0-9]+)$")) && (!a || t >= n && o >= t) && (!c || t % l == 0)) return !0
                }
                return !1
            },
            errorMessage: "",
            errorMessageKey: "badInt"
        }), t.formUtils.addValidator({
            name: "alphanumeric",
            validatorFunction: function(e, i, n, o) {
                var s = "^([a-zA-Z0-9",
                    r = "]+)$",
                    a = i.valAttr("allowing"),
                    l = "";
                if (a) {
                    l = s + a + r;
                    var c = a.replace(/\\/g, "");
                    c.indexOf(" ") > -1 && (c = c.replace(" ", ""), c += o.andSpaces || t.formUtils.LANG.andSpaces), this.errorMessage = o.badAlphaNumeric + o.badAlphaNumericExtra + c
                } else l = s + r, this.errorMessage = o.badAlphaNumeric;
                return new RegExp(l).test(e)
            },
            errorMessage: "",
            errorMessageKey: ""
        }), t.formUtils.addValidator({
            name: "custom",
            validatorFunction: function(t, e) {
                return new RegExp(e.valAttr("regexp")).test(t)
            },
            errorMessage: "",
            errorMessageKey: "badCustomVal"
        }), t.formUtils.addValidator({
            name: "date",
            validatorFunction: function(e, i, n) {
                var o = i.valAttr("format") || n.dateFormat || "yyyy-mm-dd",
                    s = "false" === i.valAttr("require-leading-zero");
                return !1 !== t.formUtils.parseDate(e, o, s)
            },
            errorMessage: "",
            errorMessageKey: "badDate"
        }), t.formUtils.addValidator({
            name: "checkbox_group",
            validatorFunction: function(e, i, n, o, s) {
                var r = !0,
                    a = i.attr("name"),
                    l = t('input[type=checkbox][name^="' + a + '"]', s),
                    c = l.filter(":checked").length,
                    u = i.valAttr("qty");
                if (void 0 === u) {
                    var d = i.get(0).nodeName;
                    alert('Attribute "data-validation-qty" is missing from ' + d + " named " + i.attr("name"))
                }
                var h = t.formUtils.numericRangeCheck(c, u);
                switch (h[0]) {
                    case "out":
                        this.errorMessage = o.groupCheckedRangeStart + u + o.groupCheckedEnd, r = !1;
                        break;
                    case "min":
                        this.errorMessage = o.groupCheckedTooFewStart + h[1] + o.groupCheckedEnd, r = !1;
                        break;
                    case "max":
                        this.errorMessage = o.groupCheckedTooManyStart + h[1] + o.groupCheckedEnd, r = !1;
                        break;
                    default:
                        r = !0
                }
                if (!r) {
                    var p = function() {
                        l.unbind("click", p), l.filter("*[data-validation]").validateInputOnBlur(o, n, !1, "blur")
                    };
                    l.bind("click", p)
                }
                return r
            }
        })
    }(t)
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    },
    windowIsDefined = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window));
! function(t) {
    if ("function" == typeof define && define.amd) define(["jquery"], t);
    else if ("object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports) {
        var e;
        try {
            e = require("jquery")
        } catch (t) {
            e = null
        }
        module.exports = t(e)
    } else window && (window.Slider = t(window.jQuery))
}(function(t) {
    var e = "slider",
        i = "bootstrapSlider";
    windowIsDefined && !window.console && (window.console = {}), windowIsDefined && !window.console.log && (window.console.log = function() {}), windowIsDefined && !window.console.warn && (window.console.warn = function() {});
    var n;
    return function(t) {
            function e() {}
            var i = Array.prototype.slice;
            ! function(t) {
                function n(e) {
                    e.prototype.option || (e.prototype.option = function(e) {
                        t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                    })
                }

                function o(e, n) {
                    t.fn[e] = function(o) {
                        if ("string" == typeof o) {
                            for (var r = i.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                                var c = this[a],
                                    u = t.data(c, e);
                                if (u)
                                    if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                                        var d = u[o].apply(u, r);
                                        if (void 0 !== d && d !== u) return d
                                    } else s("no such method '" + o + "' for " + e + " instance");
                                else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                            }
                            return this
                        }
                        var h = this.map(function() {
                            var i = t.data(this, e);
                            return i ? (i.option(o), i._init()) : (i = new n(this, o), t.data(this, e, i)), t(this)
                        });
                        return !h || h.length > 1 ? h : h[0]
                    }
                }
                if (t) {
                    var s = "undefined" == typeof console ? e : function(t) {};
                    t.bridget = function(t, e) {
                        n(e), o(t, e)
                    }, t.bridget
                }
            }(t)
        }(t),
        function(t) {
            function o(e, i) {
                this._state = {
                    value: null,
                    enabled: null,
                    offset: null,
                    size: null,
                    percentage: null,
                    inDrag: !1,
                    over: !1
                }, this.ticksCallbackMap = {}, this.handleCallbackMap = {}, "string" == typeof e ? this.element = document.querySelector(e) : e instanceof HTMLElement && (this.element = e), i = i || {};
                for (var n = Object.keys(this.defaultOptions), o = 0; o < n.length; o++) {
                    var s = n[o],
                        a = i[s];
                    a = void 0 !== a ? a : function(t, e) {
                        var i = "data-slider-" + e.replace(/_/g, "-"),
                            n = t.getAttribute(i);
                        try {
                            return JSON.parse(n)
                        } catch (t) {
                            return n
                        }
                    }(this.element, s), a = null !== a ? a : this.defaultOptions[s], this.options || (this.options = {}), this.options[s] = a
                }
                "auto" === this.options.rtl && (this.options.rtl = "rtl" === window.getComputedStyle(this.element).direction), "vertical" !== this.options.orientation || "top" !== this.options.tooltip_position && "bottom" !== this.options.tooltip_position ? "horizontal" !== this.options.orientation || "left" !== this.options.tooltip_position && "right" !== this.options.tooltip_position || (this.options.tooltip_position = "top") : this.options.rtl ? this.options.tooltip_position = "left" : this.options.tooltip_position = "right";
                var l, c, u, d, h, p = this.element.style.width,
                    f = !1,
                    g = this.element.parentNode;
                if (this.sliderElem) f = !0;
                else {
                    this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                    var m = document.createElement("div");
                    m.className = "slider-track", c = document.createElement("div"), c.className = "slider-track-low", l = document.createElement("div"), l.className = "slider-selection", u = document.createElement("div"), u.className = "slider-track-high", d = document.createElement("div"), d.className = "slider-handle min-slider-handle", d.setAttribute("role", "slider"), d.setAttribute("aria-valuemin", this.options.min), d.setAttribute("aria-valuemax", this.options.max), h = document.createElement("div"), h.className = "slider-handle max-slider-handle", h.setAttribute("role", "slider"), h.setAttribute("aria-valuemin", this.options.min), h.setAttribute("aria-valuemax", this.options.max), m.appendChild(c), m.appendChild(l), m.appendChild(u), this.rangeHighlightElements = [];
                    var v = this.options.rangeHighlights;
                    if (Array.isArray(v) && v.length > 0)
                        for (var y = 0; y < v.length; y++) {
                            var b = document.createElement("div"),
                                w = v[y].class || "";
                            b.className = "slider-rangeHighlight slider-selection " + w, this.rangeHighlightElements.push(b), m.appendChild(b)
                        }
                    var T = Array.isArray(this.options.labelledby);
                    if (T && this.options.labelledby[0] && d.setAttribute("aria-labelledby", this.options.labelledby[0]), T && this.options.labelledby[1] && h.setAttribute("aria-labelledby", this.options.labelledby[1]), !T && this.options.labelledby && (d.setAttribute("aria-labelledby", this.options.labelledby), h.setAttribute("aria-labelledby", this.options.labelledby)), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        for (this.ticksContainer = document.createElement("div"), this.ticksContainer.className = "slider-tick-container", o = 0; o < this.options.ticks.length; o++) {
                            var C = document.createElement("div");
                            if (C.className = "slider-tick", this.options.ticks_tooltip) {
                                var _ = this._addTickListener(),
                                    x = _.addMouseEnter(this, C, o),
                                    E = _.addMouseLeave(this, C);
                                this.ticksCallbackMap[o] = {
                                    mouseEnter: x,
                                    mouseLeave: E
                                }
                            }
                            this.ticks.push(C), this.ticksContainer.appendChild(C)
                        }
                        l.className += " tick-slider-selection"
                    }
                    if (this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)
                        for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", o = 0; o < this.options.ticks_labels.length; o++) {
                            var k = document.createElement("div"),
                                S = 0 === this.options.ticks_positions.length,
                                D = this.options.reversed && S ? this.options.ticks_labels.length - (o + 1) : o;
                            k.className = "slider-tick-label", k.innerHTML = this.options.ticks_labels[D], this.tickLabels.push(k), this.tickLabelContainer.appendChild(k)
                        }
                    var A = function(t) {
                            var e = document.createElement("div");
                            e.className = "tooltip-arrow";
                            var i = document.createElement("div");
                            i.className = "tooltip-inner", t.appendChild(e), t.appendChild(i)
                        },
                        O = document.createElement("div");
                    O.className = "tooltip tooltip-main", O.setAttribute("role", "presentation"), A(O);
                    var I = document.createElement("div");
                    I.className = "tooltip tooltip-min", I.setAttribute("role", "presentation"), A(I);
                    var M = document.createElement("div");
                    M.className = "tooltip tooltip-max", M.setAttribute("role", "presentation"), A(M), this.sliderElem.appendChild(m), this.sliderElem.appendChild(O), this.sliderElem.appendChild(I), this.sliderElem.appendChild(M), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), this.ticksContainer && this.sliderElem.appendChild(this.ticksContainer), this.sliderElem.appendChild(d), this.sliderElem.appendChild(h), g.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
                }
                if (t && (this.$element = t(this.element), this.$sliderElem = t(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.touchX = 0, this.touchY = 0, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"),
                    this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), r[this.options.scale] && (this.options.scale = r[this.options.scale]), !0 === f && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.sliderElem, "slider-rtl"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "right", "top", "width", "height"].forEach(function(t) {
                        this._removeProperty(this.trackLow, t), this._removeProperty(this.trackSelection, t), this._removeProperty(this.trackHigh, t)
                    }, this), [this.handle1, this.handle2].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top")
                    }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top"), this._removeClass(t, "right"), this._removeClass(t, "left"), this._removeClass(t, "top")
                    }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = p, this.options.orientation = "horizontal", this.options.rtl ? this.stylePos = "right" : this.stylePos = "left", this.mousePos = "clientX", this.sizePos = "offsetWidth"), this.options.rtl && this._addClass(this.sliderElem, "slider-rtl"), this._setTooltipPosition(), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? (this.options.range = !0, this._state.value = this.options.value) : this.options.range ? this._state.value = [this.options.value, this.options.max] : this._state.value = this.options.value, this.trackLow = c || this.trackLow, this.trackSelection = l || this.trackSelection, this.trackHigh = u || this.trackHigh, "none" === this.options.selection ? (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")) : ("after" === this.options.selection || "before" === this.options.selection) && (this._removeClass(this.trackLow, "hide"), this._removeClass(this.trackSelection, "hide"), this._removeClass(this.trackHigh, "hide")), this.handle1 = d || this.handle1, this.handle2 = h || this.handle2, !0 === f)
                    for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), o = 0; o < this.ticks.length; o++) this._removeClass(this.ticks[o], "round triangle hide");
                if (-1 !== ["round", "triangle", "custom"].indexOf(this.options.handle))
                    for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), o = 0; o < this.ticks.length; o++) this._addClass(this.ticks[o], this.options.handle);
                if (this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this.setValue(this._state.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchstart = this._touchstart.bind(this), this.touchmove = this._touchmove.bind(this), this.touchCapable) {
                    var P = !1;
                    try {
                        var L = Object.defineProperty({}, "passive", {
                            get: function() {
                                P = !0
                            }
                        });
                        window.addEventListener("test", null, L)
                    } catch (t) {}
                    var N = !!P && {
                        passive: !0
                    };
                    this.sliderElem.addEventListener("touchstart", this.touchstart, N), this.sliderElem.addEventListener("touchmove", this.touchmove, N)
                }
                if (this.sliderElem.addEventListener("mousedown", this.mousedown, !1), this.resize = this._resize.bind(this), window.addEventListener("resize", this.resize, !1), "hide" === this.options.tooltip) this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide");
                else if ("always" === this.options.tooltip) this._showTooltip(), this._alwaysShowTooltip = !0;
                else {
                    if (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.options.ticks_tooltip) {
                        var $ = this._addTickListener(),
                            F = $.addMouseEnter(this, this.handle1),
                            H = $.addMouseLeave(this, this.handle1);
                        this.handleCallbackMap.handle1 = {
                            mouseEnter: F,
                            mouseLeave: H
                        }, F = $.addMouseEnter(this, this.handle2), H = $.addMouseLeave(this, this.handle2), this.handleCallbackMap.handle2 = {
                            mouseEnter: F,
                            mouseLeave: H
                        }
                    } else this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1);
                    this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)
                }
                this.options.enabled ? this.enable() : this.disable()
            }
            var s = {
                    formatInvalidInputErrorMsg: function(t) {
                        return "Invalid input value '" + t + "' passed in"
                    },
                    callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
                },
                r = {
                    linear: {
                        toValue: function(t) {
                            var e = t / 100 * (this.options.max - this.options.min),
                                i = !0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var n, o, s, r = 0, a = 1; a < this.options.ticks_positions.length; a++)
                                    if (t <= this.options.ticks_positions[a]) {
                                        n = this.options.ticks[a - 1], s = this.options.ticks_positions[a - 1], o = this.options.ticks[a], r = this.options.ticks_positions[a];
                                        break
                                    } e = n + (t - s) / (r - s) * (o - n), i = !1
                            }
                            var l = i ? this.options.min : 0,
                                c = l + Math.round(e / this.options.step) * this.options.step;
                            return c < this.options.min ? this.options.min : c > this.options.max ? this.options.max : c
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var e, i, n, o = 0, s = 0; s < this.options.ticks.length; s++)
                                    if (t <= this.options.ticks[s]) {
                                        e = s > 0 ? this.options.ticks[s - 1] : 0, n = s > 0 ? this.options.ticks_positions[s - 1] : 0, i = this.options.ticks[s], o = this.options.ticks_positions[s];
                                        break
                                    } if (s > 0) {
                                    return n + (t - e) / (i - e) * (o - n)
                                }
                            }
                            return 100 * (t - this.options.min) / (this.options.max - this.options.min)
                        }
                    },
                    logarithmic: {
                        toValue: function(t) {
                            var e = 1 - this.options.min,
                                i = Math.log(this.options.min + e),
                                n = Math.log(this.options.max + e),
                                o = Math.exp(i + (n - i) * t / 100) - e;
                            return Math.round(o) === n ? n : (o = this.options.min + Math.round((o - this.options.min) / this.options.step) * this.options.step, o < this.options.min ? this.options.min : o > this.options.max ? this.options.max : o)
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            var e = 1 - this.options.min,
                                i = Math.log(this.options.max + e),
                                n = Math.log(this.options.min + e);
                            return 100 * (Math.log(t + e) - n) / (i - n)
                        }
                    }
                };
            if (n = function(t, e) {
                    return o.call(this, t, e), this
                }, n.prototype = {
                    _init: function() {},
                    constructor: n,
                    defaultOptions: {
                        id: "",
                        min: 0,
                        max: 10,
                        step: 1,
                        precision: 0,
                        orientation: "horizontal",
                        value: 5,
                        range: !1,
                        selection: "before",
                        tooltip: "show",
                        tooltip_split: !1,
                        handle: "round",
                        reversed: !1,
                        rtl: "auto",
                        enabled: !0,
                        formatter: function(t) {
                            return Array.isArray(t) ? " từ " + t[0] + " đến " + t[1] : t
                        },
                        natural_arrow_keys: !1,
                        ticks: [],
                        ticks_positions: [],
                        ticks_labels: [],
                        ticks_snap_bounds: 0,
                        ticks_tooltip: !1,
                        scale: "linear",
                        focus: !1,
                        tooltip_position: null,
                        labelledby: null,
                        rangeHighlights: []
                    },
                    getElement: function() {
                        return this.sliderElem
                    },
                    getValue: function() {
                        return this.options.range ? this._state.value : this._state.value[0]
                    },
                    setValue: function(t, e, i) {
                        t || (t = 0);
                        var n = this.getValue();
                        this._state.value = this._validateInputValue(t);
                        var o = this._applyPrecision.bind(this);
                        this.options.range ? (this._state.value[0] = o(this._state.value[0]), this._state.value[1] = o(this._state.value[1]), this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0])), this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))) : (this._state.value = o(this._state.value), this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))], this._addClass(this.handle2, "hide"), "after" === this.options.selection ? this._state.value[1] = this.options.max : this._state.value[1] = this.options.min), this.options.max > this.options.min ? this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : this._state.percentage = [0, 0, 100], this._layout();
                        var s = this.options.range ? this._state.value : this._state.value[0];
                        return this._setDataVal(s), !0 === e && this._trigger("slide", s), n !== s && !0 === i && this._trigger("change", {
                            oldValue: n,
                            newValue: s
                        }), this
                    },
                    destroy: function() {
                        this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), t && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                    },
                    disable: function() {
                        return this._state.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                    },
                    enable: function() {
                        return this._state.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                    },
                    toggle: function() {
                        return this._state.enabled ? this.disable() : this.enable(), this
                    },
                    isEnabled: function() {
                        return this._state.enabled
                    },
                    on: function(t, e) {
                        return this._bindNonQueryEventHandler(t, e), this
                    },
                    off: function(e, i) {
                        t ? (this.$element.off(e, i), this.$sliderElem.off(e, i)) : this._unbindNonQueryEventHandler(e, i)
                    },
                    getAttribute: function(t) {
                        return t ? this.options[t] : this.options
                    },
                    setAttribute: function(t, e) {
                        return this.options[t] = e, this
                    },
                    refresh: function() {
                        return this._removeSliderEventHandlers(), o.call(this, this.element, this.options), t && t.data(this.element, "slider", this), this
                    },
                    relayout: function() {
                        return this._resize(), this._layout(), this
                    },
                    _removeSliderEventHandlers: function() {
                        if (this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.options.ticks_tooltip) {
                            for (var t = this.ticksContainer.getElementsByClassName("slider-tick"), e = 0; e < t.length; e++) t[e].removeEventListener("mouseenter", this.ticksCallbackMap[e].mouseEnter, !1), t[e].removeEventListener("mouseleave", this.ticksCallbackMap[e].mouseLeave, !1);
                            this.handle1.removeEventListener("mouseenter", this.handleCallbackMap.handle1.mouseEnter, !1), this.handle2.removeEventListener("mouseenter", this.handleCallbackMap.handle2.mouseEnter, !1), this.handle1.removeEventListener("mouseleave", this.handleCallbackMap.handle1.mouseLeave, !1), this.handle2.removeEventListener("mouseleave", this.handleCallbackMap.handle2.mouseLeave, !1)
                        }
                        this.handleCallbackMap = null, this.ticksCallbackMap = null, this.showTooltip && (this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle2.removeEventListener("focus", this.showTooltip, !1)), this.hideTooltip && (this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("blur", this.hideTooltip, !1)), this.showTooltip && this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.hideTooltip && this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.touchstart, !1), this.sliderElem.removeEventListener("touchmove", this.touchmove, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1), window.removeEventListener("resize", this.resize, !1)
                    },
                    _bindNonQueryEventHandler: function(t, e) {
                        void 0 === this.eventToCallbackMap[t] && (this.eventToCallbackMap[t] = []), this.eventToCallbackMap[t].push(e)
                    },
                    _unbindNonQueryEventHandler: function(t, e) {
                        var i = this.eventToCallbackMap[t];
                        if (void 0 !== i)
                            for (var n = 0; n < i.length; n++)
                                if (i[n] === e) {
                                    i.splice(n, 1);
                                    break
                                }
                    },
                    _cleanUpEventCallbacksMap: function() {
                        for (var t = Object.keys(this.eventToCallbackMap), e = 0; e < t.length; e++) {
                            var i = t[e];
                            delete this.eventToCallbackMap[i]
                        }
                    },
                    _showTooltip: function() {
                        !1 === this.options.tooltip_split ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this._state.over = !0
                    },
                    _hideTooltip: function() {
                        !1 === this._state.inDrag && !0 !== this.alwaysShowTooltip && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this._state.over = !1
                    },
                    _setToolTipOnMouseOver: function(t) {
                        function e(t, e) {
                            return e ? [100 - t.percentage[0], this.options.range ? 100 - t.percentage[1] : t.percentage[1]] : [t.percentage[0], t.percentage[1]]
                        }
                        var i = this.options.formatter(t ? t.value[0] : this._state.value[0]),
                            n = t ? e(t, this.options.reversed) : e(this._state, this.options.reversed);
                        this._setText(this.tooltipInner, i), this.tooltip.style[this.stylePos] = n[0] + "%"
                    },
                    _addTickListener: function() {
                        return {
                            addMouseEnter: function(t, e, i) {
                                var n = function() {
                                    var e = t._state,
                                        n = i >= 0 ? i : this.attributes["aria-valuenow"].value,
                                        o = parseInt(n, 10);
                                    e.value[0] = o, e.percentage[0] = t.options.ticks_positions[o], t._setToolTipOnMouseOver(e), t._showTooltip()
                                };
                                return e.addEventListener("mouseenter", n, !1), n
                            },
                            addMouseLeave: function(t, e) {
                                var i = function() {
                                    t._hideTooltip()
                                };
                                return e.addEventListener("mouseleave", i, !1), i
                            }
                        }
                    },
                    _layout: function() {
                        var t;
                        if (t = this.options.reversed ? [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]] : [this._state.percentage[0], this._state.percentage[1]], this.handle1.style[this.stylePos] = t[0] + "%", this.handle1.setAttribute("aria-valuenow", this._state.value[0]), isNaN(this.options.formatter(this._state.value[0])) && this.handle1.setAttribute("aria-valuetext", this.options.formatter(this._state.value[0])), this.handle2.style[this.stylePos] = t[1] + "%", this.handle2.setAttribute("aria-valuenow", this._state.value[1]), isNaN(this.options.formatter(this._state.value[1])) && this.handle2.setAttribute("aria-valuetext", this.options.formatter(this._state.value[1])), this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0)
                            for (var e = 0; e < this.options.rangeHighlights.length; e++) {
                                var i = this._toPercentage(this.options.rangeHighlights[e].start),
                                    n = this._toPercentage(this.options.rangeHighlights[e].end);
                                if (this.options.reversed) {
                                    var o = 100 - n;
                                    n = 100 - i, i = o
                                }
                                var s = this._createHighlightRange(i, n);
                                s ? "vertical" === this.options.orientation ? (this.rangeHighlightElements[e].style.top = s.start + "%", this.rangeHighlightElements[e].style.height = s.size + "%") : (this.options.rtl ? this.rangeHighlightElements[e].style.right = s.start + "%" : this.rangeHighlightElements[e].style.left = s.start + "%", this.rangeHighlightElements[e].style.width = s.size + "%") : this.rangeHighlightElements[e].style.display = "none"
                            }
                        if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                            var r, a = "vertical" === this.options.orientation ? "height" : "width";
                            r = "vertical" === this.options.orientation ? "marginTop" : this.options.rtl ? "marginRight" : "marginLeft";
                            var l = this._state.size / (this.options.ticks.length - 1);
                            if (this.tickLabelContainer) {
                                var c = 0;
                                if (0 === this.options.ticks_positions.length) "vertical" !== this.options.orientation && (this.tickLabelContainer.style[r] = -l / 2 + "px"), c = this.tickLabelContainer.offsetHeight;
                                else
                                    for (u = 0; u < this.tickLabelContainer.childNodes.length; u++) this.tickLabelContainer.childNodes[u].offsetHeight > c && (c = this.tickLabelContainer.childNodes[u].offsetHeight);
                                "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = c + "px")
                            }
                            for (var u = 0; u < this.options.ticks.length; u++) {
                                var d = this.options.ticks_positions[u] || this._toPercentage(this.options.ticks[u]);
                                this.options.reversed && (d = 100 - d), this.ticks[u].style[this.stylePos] = d + "%", this._removeClass(this.ticks[u], "in-selection"), this.options.range ? d >= t[0] && d <= t[1] && this._addClass(this.ticks[u], "in-selection") : "after" === this.options.selection && d >= t[0] ? this._addClass(this.ticks[u], "in-selection") : "before" === this.options.selection && d <= t[0] && this._addClass(this.ticks[u], "in-selection"), this.tickLabels[u] && (this.tickLabels[u].style[a] = l + "px", "vertical" !== this.options.orientation && void 0 !== this.options.ticks_positions[u] ? (this.tickLabels[u].style.position = "absolute", this.tickLabels[u].style[this.stylePos] = d + "%", this.tickLabels[u].style[r] = -l / 2 + "px") : "vertical" === this.options.orientation && (this.options.rtl ? this.tickLabels[u].style.marginRight = this.sliderElem.offsetWidth + "px" : this.tickLabels[u].style.marginLeft = this.sliderElem.offsetWidth + "px", this.tickLabelContainer.style[r] = this.sliderElem.offsetWidth / 2 * -1 + "px"))
                            }
                        }
                        var h;
                        if (this.options.range) {
                            h = this.options.formatter(this._state.value), this._setText(this.tooltipInner, h), this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%";
                            var p = this.options.formatter(this._state.value[0]);
                            this._setText(this.tooltipInner_min, p);
                            var f = this.options.formatter(this._state.value[1]);
                            this._setText(this.tooltipInner_max, f), this.tooltip_min.style[this.stylePos] = t[0] + "%", this.tooltip_max.style[this.stylePos] = t[1] + "%"
                        } else h = this.options.formatter(this._state.value[0]), this._setText(this.tooltipInner, h), this.tooltip.style[this.stylePos] = t[0] + "%";
                        if ("vertical" === this.options.orientation) this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(t[0], t[1]) + "%", this.trackSelection.style.top = Math.min(t[0], t[1]) + "%", this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                        else {
                            "right" === this.stylePos ? this.trackLow.style.right = "0" : this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(t[0], t[1]) + "%", "right" === this.stylePos ? this.trackSelection.style.right = Math.min(t[0], t[1]) + "%" : this.trackSelection.style.left = Math.min(t[0], t[1]) + "%", this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%", "right" === this.stylePos ? this.trackHigh.style.left = "0" : this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                            var g = this.tooltip_min.getBoundingClientRect(),
                                m = this.tooltip_max.getBoundingClientRect();
                            "bottom" === this.options.tooltip_position ? g.right > m.left ? (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "", this.tooltip_max.style.bottom = "22px") : (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = this.tooltip_min.style.top, this.tooltip_max.style.bottom = "") : g.right > m.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                        }
                    },
                    _createHighlightRange: function(t, e) {
                        return this._isHighlightRange(t, e) ? t > e ? {
                            start: e,
                            size: t - e
                        } : {
                            start: t,
                            size: e - t
                        } : null
                    },
                    _isHighlightRange: function(t, e) {
                        return t >= 0 && 100 >= t && e >= 0 && 100 >= e
                    },
                    _resize: function(t) {
                        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this._layout()
                    },
                    _removeProperty: function(t, e) {
                        t.style.removeProperty ? t.style.removeProperty(e) : t.style.removeAttribute(e)
                    },
                    _mousedown: function(t) {
                        if (!this._state.enabled) return !1;
                        t.preventDefault && t.preventDefault(), this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos];
                        var e = this._getPercentage(t);
                        if (this.options.range) {
                            var i = Math.abs(this._state.percentage[0] - e),
                                n = Math.abs(this._state.percentage[1] - e);
                            this._state.dragged = n > i ? 0 : 1, this._adjustPercentageForRangeSliders(e)
                        } else this._state.dragged = 0;
                        this._state.percentage[this._state.dragged] = e, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !0;
                        var o = this._calculateValue();
                        return this._trigger("slideStart", o), this._setDataVal(o), this.setValue(o, !1, !0), t.returnValue = !1, this.options.focus && this._triggerFocusOnHandle(this._state.dragged), !0
                    },
                    _touchstart: function(t) {
                        if (void 0 === t.changedTouches) return void this._mousedown(t);
                        var e = t.changedTouches[0];
                        this.touchX = e.pageX, this.touchY = e.pageY
                    },
                    _triggerFocusOnHandle: function(t) {
                        0 === t && this.handle1.focus(), 1 === t && this.handle2.focus()
                    },
                    _keydown: function(t, e) {
                        if (!this._state.enabled) return !1;
                        var i;
                        switch (e.keyCode) {
                            case 37:
                            case 40:
                                i = -1;
                                break;
                            case 39:
                            case 38:
                                i = 1
                        }
                        if (i) {
                            if (this.options.natural_arrow_keys) {
                                var n = "vertical" === this.options.orientation && !this.options.reversed,
                                    o = "horizontal" === this.options.orientation && this.options.reversed;
                                (n || o) && (i = -i)
                            }
                            var s = this._state.value[t] + i * this.options.step,
                                r = s / this.options.max * 100;
                            if (this._state.keyCtrl = t, this.options.range) {
                                this._adjustPercentageForRangeSliders(r);
                                s = [this._state.keyCtrl ? this._state.value[0] : s, this._state.keyCtrl ? s : this._state.value[1]]
                            }
                            return this._trigger("slideStart", s), this._setDataVal(s), this.setValue(s, !0, !0), this._setDataVal(s), this._trigger("slideStop", s), this._layout(), this._pauseEvent(e), delete this._state.keyCtrl, !1
                        }
                    },
                    _pauseEvent: function(t) {
                        t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1
                    },
                    _mousemove: function(t) {
                        if (!this._state.enabled) return !1;
                        var e = this._getPercentage(t);
                        this._adjustPercentageForRangeSliders(e), this._state.percentage[this._state.dragged] = e, this._layout();
                        var i = this._calculateValue(!0);
                        return this.setValue(i, !0, !0), !1
                    },
                    _touchmove: function(t) {
                        if (void 0 !== t.changedTouches) {
                            var e = t.changedTouches[0],
                                i = e.pageX - this.touchX,
                                n = e.pageY - this.touchY;
                            this._state.inDrag || ("vertical" === this.options.orientation && 5 >= i && i >= -5 && (n >= 15 || -15 >= n) ? this._mousedown(t) : 5 >= n && n >= -5 && (i >= 15 || -15 >= i) && this._mousedown(t))
                        }
                    },
                    _adjustPercentageForRangeSliders: function(t) {
                        if (this.options.range) {
                            var e = this._getNumDigitsAfterDecimalPlace(t);
                            e = e ? e - 1 : 0;
                            var i = this._applyToFixedAndParseFloat(t, e);
                            0 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[1], e) < i ? (this._state.percentage[0] = this._state.percentage[1], this._state.dragged = 1) : 1 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[0], e) > i ? (this._state.percentage[1] = this._state.percentage[0], this._state.dragged = 0) : 0 === this._state.keyCtrl && this._state.value[1] / this.options.max * 100 < t ? (this._state.percentage[0] = this._state.percentage[1], this._state.keyCtrl = 1, this.handle2.focus()) : 1 === this._state.keyCtrl && this._state.value[0] / this.options.max * 100 > t && (this._state.percentage[1] = this._state.percentage[0], this._state.keyCtrl = 0, this.handle1.focus())
                        }
                    },
                    _mouseup: function() {
                        if (!this._state.enabled) return !1;
                        this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !1, !1 === this._state.over && this._hideTooltip();
                        var t = this._calculateValue(!0);
                        return this._layout(), this._setDataVal(t), this._trigger("slideStop", t), !1
                    },
                    _calculateValue: function(t) {
                        var e;
                        if (this.options.range ? (e = [this.options.min, this.options.max], 0 !== this._state.percentage[0] && (e[0] = this._toValue(this._state.percentage[0]), e[0] = this._applyPrecision(e[0])), 100 !== this._state.percentage[1] && (e[1] = this._toValue(this._state.percentage[1]), e[1] = this._applyPrecision(e[1]))) : (e = this._toValue(this._state.percentage[0]), e = parseFloat(e), e = this._applyPrecision(e)), t) {
                            for (var i = [e, 1 / 0], n = 0; n < this.options.ticks.length; n++) {
                                var o = Math.abs(this.options.ticks[n] - e);
                                o <= i[1] && (i = [this.options.ticks[n], o])
                            }
                            if (i[1] <= this.options.ticks_snap_bounds) return i[0]
                        }
                        return e
                    },
                    _applyPrecision: function(t) {
                        var e = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                        return this._applyToFixedAndParseFloat(t, e)
                    },
                    _getNumDigitsAfterDecimalPlace: function(t) {
                        var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
                    },
                    _applyToFixedAndParseFloat: function(t, e) {
                        var i = t.toFixed(e);
                        return parseFloat(i)
                    },
                    _getPercentage: function(t) {
                        !this.touchCapable || "touchstart" !== t.type && "touchmove" !== t.type || (t = t.touches[0]);
                        var e = t[this.mousePos],
                            i = this._state.offset[this.stylePos],
                            n = e - i;
                        "right" === this.stylePos && (n = -n);
                        var o = n / this._state.size * 100;
                        return o = Math.round(o / this._state.percentage[2]) * this._state.percentage[2], this.options.reversed && (o = 100 - o), Math.max(0, Math.min(100, o))
                    },
                    _validateInputValue: function(t) {
                        if (isNaN(+t)) {
                            if (Array.isArray(t)) return this._validateArray(t), t;
                            throw new Error(s.formatInvalidInputErrorMsg(t))
                        }
                        return +t
                    },
                    _validateArray: function(t) {
                        for (var e = 0; e < t.length; e++) {
                            var i = t[e];
                            if ("number" != typeof i) throw new Error(s.formatInvalidInputErrorMsg(i))
                        }
                    },
                    _setDataVal: function(t) {
                        this.element.setAttribute("data-value", t), this.element.setAttribute("value", t), this.element.value = t
                    },
                    _trigger: function(e, i) {
                        i = i || 0 === i ? i : void 0;
                        var n = this.eventToCallbackMap[e];
                        if (n && n.length)
                            for (var o = 0; o < n.length; o++) {
                                var s = n[o];
                                s(i)
                            }
                        t && this._triggerJQueryEvent(e, i)
                    },
                    _triggerJQueryEvent: function(t, e) {
                        var i = {
                            type: t,
                            value: e
                        };
                        this.$element.trigger(i), this.$sliderElem.trigger(i)
                    },
                    _unbindJQueryEventHandlers: function() {
                        this.$element.off(), this.$sliderElem.off()
                    },
                    _setText: function(t, e) {
                        void 0 !== t.textContent ? t.textContent = e : void 0 !== t.innerText && (t.innerText = e)
                    },
                    _removeClass: function(t, e) {
                        for (var i = e.split(" "), n = t.className, o = 0; o < i.length; o++) {
                            var s = i[o],
                                r = new RegExp("(?:\\s|^)" + s + "(?:\\s|$)");
                            n = n.replace(r, " ")
                        }
                        t.className = n.trim()
                    },
                    _addClass: function(t, e) {
                        for (var i = e.split(" "), n = t.className, o = 0; o < i.length; o++) {
                            var s = i[o];
                            new RegExp("(?:\\s|^)" + s + "(?:\\s|$)").test(n) || (n += " " + s)
                        }
                        t.className = n.trim()
                    },
                    _offsetLeft: function(t) {
                        return t.getBoundingClientRect().left
                    },
                    _offsetRight: function(t) {
                        return t.getBoundingClientRect().right
                    },
                    _offsetTop: function(t) {
                        for (var e = t.offsetTop;
                            (t = t.offsetParent) && !isNaN(t.offsetTop);) e += t.offsetTop, "BODY" !== t.tagName && (e -= t.scrollTop);
                        return e
                    },
                    _offset: function(t) {
                        return {
                            left: this._offsetLeft(t),
                            right: this._offsetRight(t),
                            top: this._offsetTop(t)
                        }
                    },
                    _css: function(e, i, n) {
                        if (t) t.style(e, i, n);
                        else {
                            var o = i.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(t, e) {
                                return e.toUpperCase()
                            });
                            e.style[o] = n
                        }
                    },
                    _toValue: function(t) {
                        return this.options.scale.toValue.apply(this, [t])
                    },
                    _toPercentage: function(t) {
                        return this.options.scale.toPercentage.apply(this, [t])
                    },
                    _setTooltipPosition: function() {
                        var t = [this.tooltip, this.tooltip_min, this.tooltip_max];
                        if ("vertical" === this.options.orientation) {
                            var e;
                            e = this.options.tooltip_position ? this.options.tooltip_position : this.options.rtl ? "left" : "right";
                            var i = "left" === e ? "right" : "left";
                            t.forEach(function(t) {
                                this._addClass(t, e), t.style[i] = "100%"
                            }.bind(this))
                        } else "bottom" === this.options.tooltip_position ? t.forEach(function(t) {
                            this._addClass(t, "bottom"), t.style.top = "22px"
                        }.bind(this)) : t.forEach(function(t) {
                            this._addClass(t, "top"), t.style.top = -this.tooltip.outerHeight - 14 + "px"
                        }.bind(this))
                    }
                }, t && t.fn) {
                var a = void 0;
                t.fn.slider ? (windowIsDefined && window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead."), a = i) : (t.bridget(e, n), a = e), t.bridget(i, n), t(function() {
                    t("input[data-provide=slider]")[a]()
                })
            }
        }(t), n
});