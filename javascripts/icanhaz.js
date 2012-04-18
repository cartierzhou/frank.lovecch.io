(function () {
  var m = function () {
      var f = function () {};
      f.prototype = {
        otag: "{{",
        ctag: "}}",
        pragmas: {},
        buffer: [],
        pragmas_implemented: {
          "IMPLICIT-ITERATOR": true
        },
        context: {},
        render: function (a, b, c, d) {
          if (!d) {
            this.context = b;
            this.buffer = []
          }
          if (!this.includes("", a)) if (d) return a;
          else {
            this.send(a);
            return
          }
          a = this.render_pragmas(a);
          a = this.render_section(a, b, c);
          if (d) return this.render_tags(a, b, c, d);
          this.render_tags(a, b, c, d)
        },
        send: function (a) {
          a != "" && this.buffer.push(a)
        },
        render_pragmas: function (a) {
          if (!this.includes("%", a)) return a;
          var b = this;
          return a.replace(RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag), function (c, d, e) {
            if (!b.pragmas_implemented[d]) throw {
              message: "This implementation of mustache doesn't understand the '" + d + "' pragma"
            };
            b.pragmas[d] = {};
            if (e) {
              c = e.split("=");
              b.pragmas[d][c[0]] = c[1]
            }
            return ""
          })
        },
        render_partial: function (a, b, c) {
          a = this.trim(a);
          if (!c || c[a] === undefined) throw {
            message: "unknown_partial '" + a + "'"
          };
          if (typeof b[a] != "object") return this.render(c[a], b, c, true);
          return this.render(c[a], b[a], c, true)
        },
        render_section: function (a, b, c) {
          if (!this.includes("#", a) && !this.includes("^", a)) return a;
          var d = this;
          return a.replace(RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg"), function (e, i, j, h) {
            e = d.find(j, b);
            if (i == "^") return !e || d.is_array(e) && e.length === 0 ? d.render(h, b, c, true) : "";
            else if (i == "#") return d.is_array(e) ? d.map(e, function (g) {
              return d.render(h, d.create_context(g), c, true)
            }).join("") : d.is_object(e) ? d.render(h, d.create_context(e), c, true) : typeof e === "function" ? e.call(b, h, function (g) {
              return d.render(g, b, c, true)
            }) : e ? d.render(h, b, c, true) : ""
          })
        },
        render_tags: function (a, b, c, d) {
          var e = this,
            i = function () {
              return RegExp(e.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + e.ctag + "+", "g")
            },
            j = i(),
            h = function (n, l, k) {
              switch (l) {
              case "!":
                return "";
              case "=":
                e.set_delimiters(k);
                j = i();
                return "";
              case ">":
                return e.render_partial(k, b, c);
              case "{":
                return e.find(k, b);
              default:
                return e.escape(e.find(k, b))
              }
            };
          a = a.split("\n");
          for (var g = 0; g < a.length; g++) {
            a[g] = a[g].replace(j, h, this);
            d || this.send(a[g])
          }
          if (d) return a.join("\n")
        },
        set_delimiters: function (a) {
          a = a.split(" ");
          this.otag = this.escape_regex(a[0]);
          this.ctag = this.escape_regex(a[1])
        },
        escape_regex: function (a) {
          if (!arguments.callee.sRE) arguments.callee.sRE = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g");
          return a.replace(arguments.callee.sRE, "\\$1")
        },
        find: function (a, b) {
          a = this.trim(a);
          var c;
          if (b[a] === false || b[a] === 0 || b[a]) c = b[a];
          else if (this.context[a] === false || this.context[a] === 0 || this.context[a]) c = this.context[a];
          if (typeof c === "function") return c.apply(b);
          if (c !== undefined) return c;
          return ""
        },
        includes: function (a, b) {
          return b.indexOf(this.otag + a) != -1
        },
        escape: function (a) {
          return String(a === null ? "" : a).replace(/&(?!\w+;)|["<>\\]/g, function (b) {
            switch (b) {
            case "&":
              return "&amp;";
            case "\\":
              return "\\\\";
            case '"':
              return '"';
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            default:
              return b
            }
          })
        },
        create_context: function (a) {
          if (this.is_object(a)) return a;
          else {
            var b = ".";
            if (this.pragmas["IMPLICIT-ITERATOR"]) b = this.pragmas["IMPLICIT-ITERATOR"].iterator;
            var c = {};
            c[b] = a;
            return c
          }
        },
        is_object: function (a) {
          return a && typeof a == "object"
        },
        is_array: function (a) {
          return Object.prototype.toString.call(a) === "[object Array]"
        },
        trim: function (a) {
          return a.replace(/^\s*|\s*$/g, "")
        },
        map: function (a, b) {
          if (typeof a.map == "function") return a.map(b);
          else {
            for (var c = [], d = a.length, e = 0; e < d; e++) c.push(b(a[e]));
            return c
          }
        }
      };
      return {
        name: "mustache.js",
        version: "0.3.0",
        to_html: function (a, b, c, d) {
          var e = new f;
          if (d) e.send = d;
          e.render(a, b, c);
          if (!d) return e.buffer.join("\n")
        }
      }
    }();
  (function () {
    var f = {
      VERSION: "0.9",
      templates: {},
      $: typeof window !== "undefined" ? window.jQuery || window.Zepto || null : null,
      addTemplate: function (a, b) {
        if (f[a]) throw "Invalid name: " + a + ".";
        if (f.templates[a]) throw 'Template " + name + " exists';
        f.templates[a] = b;
        f[a] = function (c, d) {
          c = c || {};
          var e = m.to_html(f.templates[a], c, f.templates);
          return f.$ && !d ? f.$(e) : e
        }
      },
      clearAll: function () {
        for (var a in f.templates) delete f[a];
        f.templates = {}
      },
      refresh: function () {
        f.clearAll();
        f.grabTemplates()
      },
      grabTemplates: function () {
        var a, b = document.getElementsByTagName("script"),
          c = b !== undefined ? b.length : 0,
          d, e = [];
        for (a = 0; a < c; a++) if ((d = b[a]) && d.innerHTML && d.id && (d.type === "text/html" || d.type === "text/x-icanhaz")) {
          f.addTemplate(d.id, "".trim ? d.innerHTML.trim() : s.replace(/^\s+/, "").replace(/\s+$/, ""));
          e.unshift(d)
        }
        a = 0;
        for (c = e.length; a < c; a++) e[a].parentNode.removeChild(e[a])
      }
    };
    if (typeof require !== "undefined") module.exports = f;
    else window.ich = f;
    if (typeof document !== "undefined") f.$ ? f.$(function () {
      f.grabTemplates()
    }) : document.addEventListener("DOMContentLoaded", function () {
      f.grabTemplates()
    }, false)
  })()
})();