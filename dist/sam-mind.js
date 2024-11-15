var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function array(x5) {
  return x5 == null ? [] : Array.isArray(x5) ? x5 : Array.from(x5);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next2) {
    return this._parent.insertBefore(child, next2);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function constant_default(x5) {
  return function() {
    return x5;
  };
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data3) {
  var i = 0, node, groupLength = group.length, dataLength = data3.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data3[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data3[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data3, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data3.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data3[i], i, data3) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data3[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data3[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data3 = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data3.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data3, key);
    for (var i0 = 0, i1 = 0, previous, next2; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next2 = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next2 || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data3) {
  return typeof data3 === "object" && "length" in data3 ? data3 : Array.from(data3);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next2 = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next2 && node.compareDocumentPosition(next2) ^ 4) next2.parentNode.insertBefore(node, next2);
        next2 = node;
      }
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size3 = 0;
  for (const node of this) ++size3;
  return size3;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names2) {
  var list = classList(node), i = -1, n = names2.length;
  while (++i < n) list.add(names2[i]);
}
function classedRemove(node, names2) {
  var list = classList(node), i = -1, n = names2.length;
  while (++i < n) list.remove(names2[i]);
}
function classedTrue(names2) {
  return function() {
    classedAdd(this, names2);
  };
}
function classedFalse(names2) {
  return function() {
    classedRemove(this, names2);
  };
}
function classedFunction(names2, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names2);
  };
}
function classed_default(name, value) {
  var names2 = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names2.length;
    while (++i < n) if (!list.contains(names2[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names2, value));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create3 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create3.apply(this, arguments));
  });
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before2) {
  var create3 = typeof name === "function" ? name : creator_default(name), select = before2 == null ? constantNull : typeof before2 === "function" ? before2 : selector_default(before2);
  return this.select(function() {
    return this.insertBefore(create3.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on2 = this.__on;
    if (!on2) return;
    for (var j = 0, i = -1, m = on2.length, o; j < m; ++j) {
      if (o = on2[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on2[++i] = o;
      }
    }
    if (++i) on2.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on2 = this.__on, o, listener = contextListener(value);
    if (on2) for (var j = 0, m = on2.length; j < m; ++j) {
      if ((o = on2[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on2) this.__on = [o];
    else on2.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on2 = this.node().__on;
    if (on2) for (var j = 0, m = on2.length, o; j < m; ++j) {
      for (i = 0, o = on2[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on2 = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on2(typenames[i], value, options));
  return this;
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x5) => () => x5;

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y5) {
  return a = Math.pow(a, y5), b = Math.pow(b, y5) - a, y5 = 1 / y5, function(t) {
    return Math.pow(a + t * b, y5);
  };
}
function gamma(y5) {
  return (y5 = +y5) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y5) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y5) {
  var color2 = gamma(y5);
  function rgb3(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb3.gamma = rgbGamma;
  return rgb3;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on2 = schedule.on;
    if (on2 !== on0) (on1 = (on0 = on2).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on2 = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on2 !== on0 || listener0 !== listener) (on1 = (on0 = on2).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size3 = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size3 === 0) resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on2 = schedule.on;
      if (on2 !== on0) {
        on1 = (on0 = on2).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size3 === 0) resolve();
  });
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x5, e) {
    return x5 == null ? null : [[+x5[0], e[0][1]], [+x5[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y5, e) {
    return y5 == null ? null : [[e[0][0], +y5[0]], [e[1][0], +y5[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k, x5, y5) {
  this.k = k;
  this.x = x5;
  this.y = y5;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x5, y5) {
    return x5 === 0 & y5 === 0 ? this : new Transform(this.k, this.x + this.k * x5, this.y + this.k * y5);
  },
  apply: function(point2) {
    return [point2[0] * this.k + this.x, point2[1] * this.k + this.y];
  },
  applyX: function(x5) {
    return x5 * this.k + this.x;
  },
  applyY: function(y5) {
    return y5 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x5) {
    return (x5 - this.x) / this.k;
  },
  invertY: function(y5) {
    return (y5 - this.y) / this.k;
  },
  rescaleX: function(x5) {
    return x5.copy().domain(x5.range().map(this.invertX, this).map(x5.invert, x5));
  },
  rescaleY: function(y5) {
    return y5.copy().domain(y5.range().map(this.invertY, this).map(y5.invert, y5));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity2 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity2;
  return node.__zoom;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/utils/methods.js
var methods = {};
var names = [];
function registerMethods(name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m);
    }
    return;
  }
  if (typeof name === "object") {
    for (const _name in name) {
      registerMethods(_name, name[_name]);
    }
    return;
  }
  addMethodNames(Object.getOwnPropertyNames(m));
  methods[name] = Object.assign(methods[name] || {}, m);
}
function getMethodsFor(name) {
  return methods[name] || {};
}
function getMethodNames() {
  return [...new Set(names)];
}
function addMethodNames(_names) {
  names.push(..._names);
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/utils/utils.js
function map(array3, block) {
  let i;
  const il = array3.length;
  const result = [];
  for (i = 0; i < il; i++) {
    result.push(block(array3[i]));
  }
  return result;
}
function filter2(array3, block) {
  let i;
  const il = array3.length;
  const result = [];
  for (i = 0; i < il; i++) {
    if (block(array3[i])) {
      result.push(array3[i]);
    }
  }
  return result;
}
function radians(d) {
  return d % 360 * Math.PI / 180;
}
function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function(m, g) {
    return "-" + g.toLowerCase();
  });
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function proportionalSize(element, width4, height4, box) {
  if (width4 == null || height4 == null) {
    box = box || element.bbox();
    if (width4 == null) {
      width4 = box.width / box.height * height4;
    } else if (height4 == null) {
      height4 = box.height / box.width * width4;
    }
  }
  return {
    width: width4,
    height: height4
  };
}
function getOrigin(o, element) {
  const origin = o.origin;
  let ox = o.ox != null ? o.ox : o.originX != null ? o.originX : "center";
  let oy = o.oy != null ? o.oy : o.originY != null ? o.originY : "center";
  if (origin != null) {
    ;
    [ox, oy] = Array.isArray(origin) ? origin : typeof origin === "object" ? [origin.x, origin.y] : [origin, origin];
  }
  const condX = typeof ox === "string";
  const condY = typeof oy === "string";
  if (condX || condY) {
    const { height: height4, width: width4, x: x5, y: y5 } = element.bbox();
    if (condX) {
      ox = ox.includes("left") ? x5 : ox.includes("right") ? x5 + width4 : x5 + width4 / 2;
    }
    if (condY) {
      oy = oy.includes("top") ? y5 : oy.includes("bottom") ? y5 + height4 : y5 + height4 / 2;
    }
  }
  return [ox, oy];
}
var descriptiveElements = /* @__PURE__ */ new Set(["desc", "metadata", "title"]);
var isDescriptive = (element) => descriptiveElements.has(element.nodeName);
var writeDataToDom = (element, data3, defaults = {}) => {
  const cloned = { ...data3 };
  for (const key in cloned) {
    if (cloned[key].valueOf() === defaults[key]) {
      delete cloned[key];
    }
  }
  if (Object.keys(cloned).length) {
    element.node.setAttribute("data-svgjs", JSON.stringify(cloned));
  } else {
    element.node.removeAttribute("data-svgjs");
    element.node.removeAttribute("svgjs:data");
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js
var svg = "http://www.w3.org/2000/svg";
var html = "http://www.w3.org/1999/xhtml";
var xmlns = "http://www.w3.org/2000/xmlns/";
var xlink = "http://www.w3.org/1999/xlink";

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/utils/window.js
var globals = {
  window: typeof window === "undefined" ? null : window,
  document: typeof document === "undefined" ? null : document
};
function getWindow() {
  return globals.window;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/Base.js
var Base = class {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/utils/adopter.js
var elements = {};
var root2 = "___SYMBOL___ROOT___";
function create2(name, ns = svg) {
  return globals.document.createElementNS(ns, name);
}
function makeInstance(element, isHTML = false) {
  if (element instanceof Base) return element;
  if (typeof element === "object") {
    return adopter(element);
  }
  if (element == null) {
    return new elements[root2]();
  }
  if (typeof element === "string" && element.charAt(0) !== "<") {
    return adopter(globals.document.querySelector(element));
  }
  const wrapper = isHTML ? globals.document.createElement("div") : create2("svg");
  wrapper.innerHTML = element;
  element = adopter(wrapper.firstChild);
  wrapper.removeChild(wrapper.firstChild);
  return element;
}
function nodeOrNew(name, node) {
  return node && (node instanceof globals.window.Node || node.ownerDocument && node instanceof node.ownerDocument.defaultView.Node) ? node : create2(name);
}
function adopt(node) {
  if (!node) return null;
  if (node.instance instanceof Base) return node.instance;
  if (node.nodeName === "#document-fragment") {
    return new elements.Fragment(node);
  }
  let className = capitalize(node.nodeName || "Dom");
  if (className === "LinearGradient" || className === "RadialGradient") {
    className = "Gradient";
  } else if (!elements[className]) {
    className = "Dom";
  }
  return new elements[className](node);
}
var adopter = adopt;
function register(element, name = element.name, asRoot = false) {
  elements[name] = element;
  if (asRoot) elements[root2] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}
function getClass(name) {
  return elements[name];
}
var did = 1e3;
function eid(name) {
  return "Svgjs" + capitalize(name) + did++;
}
function assignNewId(node) {
  for (let i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }
  if (node.id) {
    node.id = eid(node.nodeName);
    return node;
  }
  return node;
}
function extend2(modules, methods3) {
  let key, i;
  modules = Array.isArray(modules) ? modules : [modules];
  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods3) {
      modules[i].prototype[key] = methods3[key];
    }
  }
}
function wrapWithAttrCheck(fn) {
  return function(...args) {
    const o = args[args.length - 1];
    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js
function siblings() {
  return this.parent().children();
}
function position() {
  return this.parent().index(this);
}
function next() {
  return this.siblings()[this.position() + 1];
}
function prev() {
  return this.siblings()[this.position() - 1];
}
function forward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i + 1);
  return this;
}
function backward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i ? i - 1 : 0);
  return this;
}
function front() {
  const p = this.parent();
  p.add(this.remove());
  return this;
}
function back() {
  const p = this.parent();
  p.add(this.remove(), 0);
  return this;
}
function before(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i);
  return this;
}
function after(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i + 1);
  return this;
}
function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}
function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}
registerMethods("Dom", {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/regex.js
var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i;
var hex2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
var rgb2 = /rgb\((\d+),(\d+),(\d+)\)/;
var reference = /(#[a-z_][a-z0-9\-_]*)/i;
var transforms = /\)\s*,?\s*/;
var whitespace = /\s/g;
var isHex = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i;
var isRgb = /^rgb\(/;
var isBlank = /^(\s+)?$/;
var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i;
var delimiter = /[\s,]+/;
var isPathLetter = /[MLHVCSQTAZ]/i;

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/class.js
function classes() {
  const attr2 = this.attr("class");
  return attr2 == null ? [] : attr2.trim().split(delimiter);
}
function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
}
function addClass(name) {
  if (!this.hasClass(name)) {
    const array3 = this.classes();
    array3.push(name);
    this.attr("class", array3.join(" "));
  }
  return this;
}
function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr(
      "class",
      this.classes().filter(function(c) {
        return c !== name;
      }).join(" ")
    );
  }
  return this;
}
function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}
registerMethods("Dom", {
  classes,
  hasClass,
  addClass,
  removeClass,
  toggleClass
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/css.js
function css(style, val) {
  const ret = {};
  if (arguments.length === 0) {
    this.node.style.cssText.split(/\s*;\s*/).filter(function(el) {
      return !!el.length;
    }).forEach(function(el) {
      const t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }
  if (arguments.length < 2) {
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = name;
        ret[name] = this.node.style.getPropertyValue(cased);
      }
      return ret;
    }
    if (typeof style === "string") {
      return this.node.style.getPropertyValue(style);
    }
    if (typeof style === "object") {
      for (const name in style) {
        this.node.style.setProperty(
          name,
          style[name] == null || isBlank.test(style[name]) ? "" : style[name]
        );
      }
    }
  }
  if (arguments.length === 2) {
    this.node.style.setProperty(
      style,
      val == null || isBlank.test(val) ? "" : val
    );
  }
  return this;
}
function show() {
  return this.css("display", "");
}
function hide() {
  return this.css("display", "none");
}
function visible() {
  return this.css("display") !== "none";
}
registerMethods("Dom", {
  css,
  show,
  hide,
  visible
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/data.js
function data(a, v, r) {
  if (a == null) {
    return this.data(
      map(
        filter2(
          this.node.attributes,
          (el) => el.nodeName.indexOf("data-") === 0
        ),
        (el) => el.nodeName.slice(5)
      )
    );
  } else if (a instanceof Array) {
    const data3 = {};
    for (const key of a) {
      data3[key] = this.data(key);
    }
    return data3;
  } else if (typeof a === "object") {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr("data-" + a));
    } catch (e) {
      return this.attr("data-" + a);
    }
  } else {
    this.attr(
      "data-" + a,
      v === null ? null : r === true || typeof v === "string" || typeof v === "number" ? v : JSON.stringify(v)
    );
  }
  return this;
}
registerMethods("Dom", { data });

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js
function remember(k, v) {
  if (typeof arguments[0] === "object") {
    for (const key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    return this.memory()[k];
  } else {
    this.memory()[k] = v;
  }
  return this;
}
function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (let i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }
  return this;
}
function memory() {
  return this._memory = this._memory || {};
}
registerMethods("Dom", { remember, forget, memory });

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/Color.js
function sixDigitHex(hex3) {
  return hex3.length === 4 ? [
    "#",
    hex3.substring(1, 2),
    hex3.substring(1, 2),
    hex3.substring(2, 3),
    hex3.substring(2, 3),
    hex3.substring(3, 4),
    hex3.substring(3, 4)
  ].join("") : hex3;
}
function componentHex(component) {
  const integer = Math.round(component);
  const bounded = Math.max(0, Math.min(255, integer));
  const hex3 = bounded.toString(16);
  return hex3.length === 1 ? "0" + hex3 : hex3;
}
function is(object, space) {
  for (let i = space.length; i--; ) {
    if (object[space[i]] == null) {
      return false;
    }
  }
  return true;
}
function getParameters(a, b) {
  const params = is(a, "rgb") ? { _a: a.r, _b: a.g, _c: a.b, _d: 0, space: "rgb" } : is(a, "xyz") ? { _a: a.x, _b: a.y, _c: a.z, _d: 0, space: "xyz" } : is(a, "hsl") ? { _a: a.h, _b: a.s, _c: a.l, _d: 0, space: "hsl" } : is(a, "lab") ? { _a: a.l, _b: a.a, _c: a.b, _d: 0, space: "lab" } : is(a, "lch") ? { _a: a.l, _b: a.c, _c: a.h, _d: 0, space: "lch" } : is(a, "cmyk") ? { _a: a.c, _b: a.m, _c: a.y, _d: a.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  params.space = b || params.space;
  return params;
}
function cieSpace(space) {
  if (space === "lab" || space === "xyz" || space === "lch") {
    return true;
  } else {
    return false;
  }
}
function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
var Color2 = class _Color {
  constructor(...inputs) {
    this.init(...inputs);
  }
  // Test if given value is a color
  static isColor(color2) {
    return color2 && (color2 instanceof _Color || this.isRgb(color2) || this.test(color2));
  }
  // Test if given value is an rgb object
  static isRgb(color2) {
    return color2 && typeof color2.r === "number" && typeof color2.g === "number" && typeof color2.b === "number";
  }
  /*
  Generating random colors
  */
  static random(mode = "vibrant", t) {
    const { random, round, sin, PI: pi } = Math;
    if (mode === "vibrant") {
      const l = (81 - 57) * random() + 57;
      const c = (83 - 45) * random() + 45;
      const h = 360 * random();
      const color2 = new _Color(l, c, h, "lch");
      return color2;
    } else if (mode === "sine") {
      t = t == null ? random() : t;
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
      const color2 = new _Color(r, g, b);
      return color2;
    } else if (mode === "pastel") {
      const l = (94 - 86) * random() + 86;
      const c = (26 - 9) * random() + 9;
      const h = 360 * random();
      const color2 = new _Color(l, c, h, "lch");
      return color2;
    } else if (mode === "dark") {
      const l = 10 + 10 * random();
      const c = (125 - 75) * random() + 86;
      const h = 360 * random();
      const color2 = new _Color(l, c, h, "lch");
      return color2;
    } else if (mode === "rgb") {
      const r = 255 * random();
      const g = 255 * random();
      const b = 255 * random();
      const color2 = new _Color(r, g, b);
      return color2;
    } else if (mode === "lab") {
      const l = 100 * random();
      const a = 256 * random() - 128;
      const b = 256 * random() - 128;
      const color2 = new _Color(l, a, b, "lab");
      return color2;
    } else if (mode === "grey") {
      const grey = 255 * random();
      const color2 = new _Color(grey, grey, grey);
      return color2;
    } else {
      throw new Error("Unsupported random color mode");
    }
  }
  // Test if given value is a color string
  static test(color2) {
    return typeof color2 === "string" && (isHex.test(color2) || isRgb.test(color2));
  }
  cmyk() {
    const { _a, _b, _c } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255);
    const k = Math.min(1 - r, 1 - g, 1 - b);
    if (k === 1) {
      return new _Color(0, 0, 0, 1, "cmyk");
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y5 = (1 - b - k) / (1 - k);
    const color2 = new _Color(c, m, y5, k, "cmyk");
    return color2;
  }
  hsl() {
    const { _a, _b, _c } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255);
    const max2 = Math.max(r, g, b);
    const min2 = Math.min(r, g, b);
    const l = (max2 + min2) / 2;
    const isGrey = max2 === min2;
    const delta = max2 - min2;
    const s = isGrey ? 0 : l > 0.5 ? delta / (2 - max2 - min2) : delta / (max2 + min2);
    const h = isGrey ? 0 : max2 === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max2 === g ? ((b - r) / delta + 2) / 6 : max2 === b ? ((r - g) / delta + 4) / 6 : 0;
    const color2 = new _Color(360 * h, 100 * s, 100 * l, "hsl");
    return color2;
  }
  init(a = 0, b = 0, c = 0, d = 0, space = "rgb") {
    a = !a ? 0 : a;
    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]];
      }
    }
    if (typeof a === "number") {
      space = typeof d === "string" ? d : space;
      d = typeof d === "string" ? 0 : d;
      Object.assign(this, { _a: a, _b: b, _c: c, _d: d, space });
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === "string" ? a[3] : a[4]) || "rgb";
      Object.assign(this, { _a: a[0], _b: a[1], _c: a[2], _d: a[3] || 0 });
    } else if (a instanceof Object) {
      const values = getParameters(a, b);
      Object.assign(this, values);
    } else if (typeof a === "string") {
      if (isRgb.test(a)) {
        const noWhitespace = a.replace(whitespace, "");
        const [_a2, _b2, _c2] = rgb2.exec(noWhitespace).slice(1, 4).map((v) => parseInt(v));
        Object.assign(this, { _a: _a2, _b: _b2, _c: _c2, _d: 0, space: "rgb" });
      } else if (isHex.test(a)) {
        const hexParse = (v) => parseInt(v, 16);
        const [, _a2, _b2, _c2] = hex2.exec(sixDigitHex(a)).map(hexParse);
        Object.assign(this, { _a: _a2, _b: _b2, _c: _c2, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    }
    const { _a, _b, _c, _d } = this;
    const components = this.space === "rgb" ? { r: _a, g: _b, b: _c } : this.space === "xyz" ? { x: _a, y: _b, z: _c } : this.space === "hsl" ? { h: _a, s: _b, l: _c } : this.space === "lab" ? { l: _a, a: _b, b: _c } : this.space === "lch" ? { l: _a, c: _b, h: _c } : this.space === "cmyk" ? { c: _a, m: _b, y: _c, k: _d } : {};
    Object.assign(this, components);
  }
  lab() {
    const { x: x5, y: y5, z } = this.xyz();
    const l = 116 * y5 - 16;
    const a = 500 * (x5 - y5);
    const b = 200 * (y5 - z);
    const color2 = new _Color(l, a, b, "lab");
    return color2;
  }
  lch() {
    const { l, a, b } = this.lab();
    const c = Math.sqrt(a ** 2 + b ** 2);
    let h = 180 * Math.atan2(b, a) / Math.PI;
    if (h < 0) {
      h *= -1;
      h = 360 - h;
    }
    const color2 = new _Color(l, c, h, "lch");
    return color2;
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb") {
      return this;
    } else if (cieSpace(this.space)) {
      let { x: x5, y: y5, z } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l, a, b: b2 } = this;
        if (this.space === "lch") {
          const { c, h } = this;
          const dToR = Math.PI / 180;
          a = c * Math.cos(dToR * h);
          b2 = c * Math.sin(dToR * h);
        }
        const yL = (l + 16) / 116;
        const xL = a / 500 + yL;
        const zL = yL - b2 / 200;
        const ct = 16 / 116;
        const mx = 8856e-6;
        const nm = 7.787;
        x5 = 0.95047 * (xL ** 3 > mx ? xL ** 3 : (xL - ct) / nm);
        y5 = 1 * (yL ** 3 > mx ? yL ** 3 : (yL - ct) / nm);
        z = 1.08883 * (zL ** 3 > mx ? zL ** 3 : (zL - ct) / nm);
      }
      const rU = x5 * 3.2406 + y5 * -1.5372 + z * -0.4986;
      const gU = x5 * -0.9689 + y5 * 1.8758 + z * 0.0415;
      const bU = x5 * 0.0557 + y5 * -0.204 + z * 1.057;
      const pow = Math.pow;
      const bd = 31308e-7;
      const r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
      const g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
      const b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU;
      const color2 = new _Color(255 * r, 255 * g, 255 * b);
      return color2;
    } else if (this.space === "hsl") {
      let { h, s, l } = this;
      h /= 360;
      s /= 100;
      l /= 100;
      if (s === 0) {
        l *= 255;
        const color3 = new _Color(l, l, l);
        return color3;
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const r = 255 * hueToRgb(p, q, h + 1 / 3);
      const g = 255 * hueToRgb(p, q, h);
      const b = 255 * hueToRgb(p, q, h - 1 / 3);
      const color2 = new _Color(r, g, b);
      return color2;
    } else if (this.space === "cmyk") {
      const { c, m, y: y5, k } = this;
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
      const b = 255 * (1 - Math.min(1, y5 * (1 - k) + k));
      const color2 = new _Color(r, g, b);
      return color2;
    } else {
      return this;
    }
  }
  toArray() {
    const { _a, _b, _c, _d, space } = this;
    return [_a, _b, _c, _d, space];
  }
  toHex() {
    const [r, g, b] = this._clamped().map(componentHex);
    return `#${r}${g}${b}`;
  }
  toRgb() {
    const [rV, gV, bV] = this._clamped();
    const string = `rgb(${rV},${gV},${bV})`;
    return string;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const { _a: r255, _b: g255, _c: b255 } = this.rgb();
    const [r, g, b] = [r255, g255, b255].map((v) => v / 255);
    const rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1;
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883;
    const x5 = xU > 8856e-6 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
    const y5 = yU > 8856e-6 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
    const z = zU > 8856e-6 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116;
    const color2 = new _Color(x5, y5, z, "xyz");
    return color2;
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a, _b, _c } = this.rgb();
    const { max: max2, min: min2, round } = Math;
    const format = (v) => max2(0, min2(round(v), 255));
    return [_a, _b, _c].map(format);
  }
  /*
  Constructing colors
  */
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/Point.js
var Point = class _Point {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }
  // Clone point
  clone() {
    return new _Point(this);
  }
  init(x5, y5) {
    const base = { x: 0, y: 0 };
    const source = Array.isArray(x5) ? { x: x5[0], y: x5[1] } : typeof x5 === "object" ? { x: x5.x, y: x5.y } : { x: x5, y: y5 };
    this.x = source.x == null ? base.x : source.x;
    this.y = source.y == null ? base.y : source.y;
    return this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(m) {
    return this.clone().transformO(m);
  }
  // Transform point with matrix
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    const { x: x5, y: y5 } = this;
    this.x = m.a * x5 + m.c * y5 + m.e;
    this.y = m.b * x5 + m.d * y5 + m.f;
    return this;
  }
};
function point(x5, y5) {
  return new Point(x5, y5).transformO(this.screenCTM().inverseO());
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/Matrix.js
function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6);
}
var Matrix = class _Matrix {
  constructor(...args) {
    this.init(...args);
  }
  static formatTransforms(o) {
    const flipBoth = o.flip === "both" || o.flip === true;
    const flipX = o.flip && (flipBoth || o.flip === "x") ? -1 : 1;
    const flipY = o.flip && (flipBoth || o.flip === "y") ? -1 : 1;
    const skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
    const skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
    const scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
    const scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
    const shear = o.shear || 0;
    const theta = o.rotate || o.theta || 0;
    const origin = new Point(
      o.origin || o.around || o.ox || o.originX,
      o.oy || o.originY
    );
    const ox = origin.x;
    const oy = origin.y;
    const position2 = new Point(
      o.position || o.px || o.positionX || NaN,
      o.py || o.positionY || NaN
    );
    const px = position2.x;
    const py = position2.y;
    const translate = new Point(
      o.translate || o.tx || o.translateX,
      o.ty || o.translateY
    );
    const tx = translate.x;
    const ty = translate.y;
    const relative = new Point(
      o.relative || o.rx || o.relativeX,
      o.ry || o.relativeY
    );
    const rx2 = relative.x;
    const ry2 = relative.y;
    return {
      scaleX,
      scaleY,
      skewX,
      skewY,
      shear,
      theta,
      rx: rx2,
      ry: ry2,
      tx,
      ty,
      ox,
      oy,
      px,
      py
    };
  }
  static fromArray(a) {
    return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] };
  }
  static isMatrixLike(o) {
    return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
  }
  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(l, r, o) {
    const a = l.a * r.a + l.c * r.b;
    const b = l.b * r.a + l.d * r.b;
    const c = l.a * r.c + l.c * r.d;
    const d = l.b * r.c + l.d * r.d;
    const e = l.e + l.a * r.e + l.c * r.f;
    const f = l.f + l.b * r.e + l.d * r.f;
    o.a = a;
    o.b = b;
    o.c = c;
    o.d = d;
    o.e = e;
    o.f = f;
    return o;
  }
  around(cx3, cy3, matrix) {
    return this.clone().aroundO(cx3, cy3, matrix);
  }
  // Transform around a center point
  aroundO(cx3, cy3, matrix) {
    const dx2 = cx3 || 0;
    const dy2 = cy3 || 0;
    return this.translateO(-dx2, -dy2).lmultiplyO(matrix).translateO(dx2, dy2);
  }
  // Clones this matrix
  clone() {
    return new _Matrix(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(cx3 = 0, cy3 = 0) {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;
    const determinant = a * d - b * c;
    const ccw = determinant > 0 ? 1 : -1;
    const sx = ccw * Math.sqrt(a * a + b * b);
    const thetaRad = Math.atan2(ccw * b, ccw * a);
    const theta = 180 / Math.PI * thetaRad;
    const ct = Math.cos(thetaRad);
    const st = Math.sin(thetaRad);
    const lam = (a * c + b * d) / determinant;
    const sy = c * sx / (lam * a - b) || d * sx / (lam * b + a);
    const tx = e - cx3 + cx3 * ct * sx + cy3 * (lam * ct * sx - st * sy);
    const ty = f - cy3 + cx3 * st * sx + cy3 * (lam * st * sx + ct * sy);
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx3,
      originY: cy3,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
  // Check if two matrices are equal
  equals(other) {
    if (other === this) return true;
    const comp = new _Matrix(other);
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
  }
  // Flip matrix on x or y, at a given offset
  flip(axis, around) {
    return this.clone().flipO(axis, around);
  }
  flipO(axis, around) {
    return axis === "x" ? this.scaleO(-1, 1, around, 0) : axis === "y" ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis);
  }
  // Initialize
  init(source) {
    const base = _Matrix.fromArray([1, 0, 0, 1, 0, 0]);
    source = source instanceof Element ? source.matrixify() : typeof source === "string" ? _Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? _Matrix.fromArray(source) : typeof source === "object" && _Matrix.isMatrixLike(source) ? source : typeof source === "object" ? new _Matrix().transform(source) : arguments.length === 6 ? _Matrix.fromArray([].slice.call(arguments)) : base;
    this.a = source.a != null ? source.a : base.a;
    this.b = source.b != null ? source.b : base.b;
    this.c = source.c != null ? source.c : base.c;
    this.d = source.d != null ? source.d : base.d;
    this.e = source.e != null ? source.e : base.e;
    this.f = source.f != null ? source.f : base.f;
    return this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;
    const det = a * d - b * c;
    if (!det) throw new Error("Cannot invert " + this);
    const na = d / det;
    const nb = -b / det;
    const nc = -c / det;
    const nd = a / det;
    const ne = -(na * e + nc * f);
    const nf = -(nb * e + nd * f);
    this.a = na;
    this.b = nb;
    this.c = nc;
    this.d = nd;
    this.e = ne;
    this.f = nf;
    return this;
  }
  lmultiply(matrix) {
    return this.clone().lmultiplyO(matrix);
  }
  lmultiplyO(matrix) {
    const r = this;
    const l = matrix instanceof _Matrix ? matrix : new _Matrix(matrix);
    return _Matrix.matrixMultiply(l, r, this);
  }
  // Left multiplies by the given matrix
  multiply(matrix) {
    return this.clone().multiplyO(matrix);
  }
  multiplyO(matrix) {
    const l = this;
    const r = matrix instanceof _Matrix ? matrix : new _Matrix(matrix);
    return _Matrix.matrixMultiply(l, r, this);
  }
  // Rotate matrix
  rotate(r, cx3, cy3) {
    return this.clone().rotateO(r, cx3, cy3);
  }
  rotateO(r, cx3 = 0, cy3 = 0) {
    r = radians(r);
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    const { a, b, c, d, e, f } = this;
    this.a = a * cos - b * sin;
    this.b = b * cos + a * sin;
    this.c = c * cos - d * sin;
    this.d = d * cos + c * sin;
    this.e = e * cos - f * sin + cy3 * sin - cx3 * cos + cx3;
    this.f = f * cos + e * sin - cx3 * sin - cy3 * cos + cy3;
    return this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(x5, y5 = x5, cx3 = 0, cy3 = 0) {
    if (arguments.length === 3) {
      cy3 = cx3;
      cx3 = y5;
      y5 = x5;
    }
    const { a, b, c, d, e, f } = this;
    this.a = a * x5;
    this.b = b * y5;
    this.c = c * x5;
    this.d = d * y5;
    this.e = e * x5 - cx3 * x5 + cx3;
    this.f = f * y5 - cy3 * y5 + cy3;
    return this;
  }
  // Shear matrix
  shear(a, cx3, cy3) {
    return this.clone().shearO(a, cx3, cy3);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(lx, cx3 = 0, cy3 = 0) {
    const { a, b, c, d, e, f } = this;
    this.a = a + b * lx;
    this.c = c + d * lx;
    this.e = e + f * lx - cy3 * lx;
    return this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(x5, y5 = x5, cx3 = 0, cy3 = 0) {
    if (arguments.length === 3) {
      cy3 = cx3;
      cx3 = y5;
      y5 = x5;
    }
    x5 = radians(x5);
    y5 = radians(y5);
    const lx = Math.tan(x5);
    const ly = Math.tan(y5);
    const { a, b, c, d, e, f } = this;
    this.a = a + b * lx;
    this.b = b + a * ly;
    this.c = c + d * lx;
    this.d = d + c * ly;
    this.e = e + f * lx - cy3 * lx;
    this.f = f + e * ly - cx3 * ly;
    return this;
  }
  // SkewX
  skewX(x5, cx3, cy3) {
    return this.skew(x5, 0, cx3, cy3);
  }
  // SkewY
  skewY(y5, cx3, cy3) {
    return this.skew(0, y5, cx3, cy3);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
  // Convert matrix to string
  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }
  // Transform a matrix into another matrix by manipulating the space
  transform(o) {
    if (_Matrix.isMatrixLike(o)) {
      const matrix = new _Matrix(o);
      return matrix.multiplyO(this);
    }
    const t = _Matrix.formatTransforms(o);
    const current = this;
    const { x: ox, y: oy } = new Point(t.ox, t.oy).transform(current);
    const transformer = new _Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy);
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new Point(ox, oy).transform(transformer);
      const dx2 = isFinite(t.px) ? t.px - origin.x : 0;
      const dy2 = isFinite(t.py) ? t.py - origin.y : 0;
      transformer.translateO(dx2, dy2);
    }
    transformer.translateO(t.tx, t.ty);
    return transformer;
  }
  // Translate matrix
  translate(x5, y5) {
    return this.clone().translateO(x5, y5);
  }
  translateO(x5, y5) {
    this.e += x5 || 0;
    this.f += y5 || 0;
    return this;
  }
  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
};
function ctm() {
  return new Matrix(this.node.getCTM());
}
function screenCTM() {
  try {
    if (typeof this.isRoot === "function" && !this.isRoot()) {
      const rect = this.rect(1, 1);
      const m = rect.node.getScreenCTM();
      rect.remove();
      return new Matrix(m);
    }
    return new Matrix(this.node.getScreenCTM());
  } catch (e) {
    console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    );
    return new Matrix();
  }
}
register(Matrix, "Matrix");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/parser.js
function parser() {
  if (!parser.nodes) {
    const svg3 = makeInstance().size(2, 0);
    svg3.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";");
    svg3.attr("focusable", "false");
    svg3.attr("aria-hidden", "true");
    const path = svg3.path().node;
    parser.nodes = { svg: svg3, path };
  }
  if (!parser.nodes.svg.node.parentNode) {
    const b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }
  return parser.nodes;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/Box.js
function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}
function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function(node2) {
    while (node2.parentNode) {
      node2 = node2.parentNode;
    }
    return node2 === globals.document;
  }).call(globals.document.documentElement, node);
}
var Box = class _Box {
  constructor(...args) {
    this.init(...args);
  }
  addOffset() {
    this.x += globals.window.pageXOffset;
    this.y += globals.window.pageYOffset;
    return new _Box(this);
  }
  init(source) {
    const base = [0, 0, 0, 0];
    source = typeof source === "string" ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : typeof source === "object" ? [
      source.left != null ? source.left : source.x,
      source.top != null ? source.top : source.y,
      source.width,
      source.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : base;
    this.x = source[0] || 0;
    this.y = source[1] || 0;
    this.width = this.w = source[2] || 0;
    this.height = this.h = source[3] || 0;
    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;
    return this;
  }
  isNulled() {
    return isNulledBox(this);
  }
  // Merge rect box with another, return a new instance
  merge(box) {
    const x5 = Math.min(this.x, box.x);
    const y5 = Math.min(this.y, box.y);
    const width4 = Math.max(this.x + this.width, box.x + box.width) - x5;
    const height4 = Math.max(this.y + this.height, box.y + box.height) - y5;
    return new _Box(x5, y5, width4, height4);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(m) {
    if (!(m instanceof Matrix)) {
      m = new Matrix(m);
    }
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    const pts = [
      new Point(this.x, this.y),
      new Point(this.x2, this.y),
      new Point(this.x, this.y2),
      new Point(this.x2, this.y2)
    ];
    pts.forEach(function(p) {
      p = p.transform(m);
      xMin = Math.min(xMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMin = Math.min(yMin, p.y);
      yMax = Math.max(yMax, p.y);
    });
    return new _Box(xMin, yMin, xMax - xMin, yMax - yMin);
  }
};
function getBox(el, getBBoxFn, retry) {
  let box;
  try {
    box = getBBoxFn(el.node);
    if (isNulledBox(box) && !domContains(el.node)) {
      throw new Error("Element not in the dom");
    }
  } catch (e) {
    box = retry(el);
  }
  return box;
}
function bbox() {
  const getBBox = (node) => node.getBBox();
  const retry = (el) => {
    try {
      const clone = el.clone().addTo(parser().svg).show();
      const box2 = clone.node.getBBox();
      clone.remove();
      return box2;
    } catch (e) {
      throw new Error(
        `Getting bbox of element "${el.node.nodeName}" is not possible: ${e.toString()}`
      );
    }
  };
  const box = getBox(this, getBBox, retry);
  const bbox2 = new Box(box);
  return bbox2;
}
function rbox(el) {
  const getRBox = (node) => node.getBoundingClientRect();
  const retry = (el2) => {
    throw new Error(
      `Getting rbox of element "${el2.node.nodeName}" is not possible`
    );
  };
  const box = getBox(this, getRBox, retry);
  const rbox2 = new Box(box);
  if (el) {
    return rbox2.transform(el.screenCTM().inverseO());
  }
  return rbox2.addOffset();
}
function inside(x5, y5) {
  const box = this.bbox();
  return x5 > box.x && y5 > box.y && x5 < box.x + box.width && y5 < box.y + box.height;
}
registerMethods({
  viewbox: {
    viewbox(x5, y5, width4, height4) {
      if (x5 == null) return new Box(this.attr("viewBox"));
      return this.attr("viewBox", new Box(x5, y5, width4, height4));
    },
    zoom(level, point2) {
      let { width: width4, height: height4 } = this.attr(["width", "height"]);
      if (!width4 && !height4 || typeof width4 === "string" || typeof height4 === "string") {
        width4 = this.node.clientWidth;
        height4 = this.node.clientHeight;
      }
      if (!width4 || !height4) {
        throw new Error(
          "Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element"
        );
      }
      const v = this.viewbox();
      const zoomX = width4 / v.width;
      const zoomY = height4 / v.height;
      const zoom = Math.min(zoomX, zoomY);
      if (level == null) {
        return zoom;
      }
      let zoomAmount = zoom / level;
      if (zoomAmount === Infinity) zoomAmount = Number.MAX_SAFE_INTEGER / 100;
      point2 = point2 || new Point(width4 / 2 / zoomX + v.x, height4 / 2 / zoomY + v.y);
      const box = new Box(v).transform(
        new Matrix({ scale: zoomAmount, origin: point2 })
      );
      return this.viewbox(box);
    }
  }
});
register(Box, "Box");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/List.js
var List = class extends Array {
  constructor(arr = [], ...args) {
    super(arr, ...args);
    if (typeof arr === "number") return this;
    this.length = 0;
    this.push(...arr);
  }
};
var List_default = List;
extend2([List], {
  each(fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === "function") {
      return this.map((el, i, arr) => {
        return fnOrMethodName.call(el, el, i, arr);
      });
    } else {
      return this.map((el) => {
        return el[fnOrMethodName](...args);
      });
    }
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
var reserved = ["toArray", "constructor", "each"];
List.extend = function(methods3) {
  methods3 = methods3.reduce((obj, name) => {
    if (reserved.includes(name)) return obj;
    if (name[0] === "_") return obj;
    if (name in Array.prototype) {
      obj["$" + name] = Array.prototype[name];
    }
    obj[name] = function(...attrs2) {
      return this.each(name, ...attrs2);
    };
    return obj;
  }, {});
  extend2([List], methods3);
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/selector.js
function baseFind(query, parent) {
  return new List_default(
    map((parent || globals.document).querySelectorAll(query), function(node) {
      return adopt(node);
    })
  );
}
function find2(query) {
  return baseFind(query, this.node);
}
function findOne(query) {
  return adopt(this.node.querySelector(query));
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/event.js
var listenerId = 0;
var windowEvents = {};
function getEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events;
}
function getEventTarget(instance) {
  return instance.getEventTarget();
}
function clearEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window) n = windowEvents;
  if (n.events) n.events = {};
}
function on(node, events, listener, binding, options) {
  const l = listener.bind(binding || node);
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);
  events = Array.isArray(events) ? events : events.split(delimiter);
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }
  events.forEach(function(event) {
    const ev = event.split(".")[0];
    const ns = event.split(".")[1] || "*";
    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {};
    bag[ev][ns][listener._svgjsListenerId] = l;
    n.addEventListener(ev, l, options || false);
  });
}
function off(node, events, listener, options) {
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);
  if (typeof listener === "function") {
    listener = listener._svgjsListenerId;
    if (!listener) return;
  }
  events = Array.isArray(events) ? events : (events || "").split(delimiter);
  events.forEach(function(event) {
    const ev = event && event.split(".")[0];
    const ns = event && event.split(".")[1];
    let namespace, l;
    if (listener) {
      if (bag[ev] && bag[ev][ns || "*"]) {
        n.removeEventListener(
          ev,
          bag[ev][ns || "*"][listener],
          options || false
        );
        delete bag[ev][ns || "*"][listener];
      }
    } else if (ev && ns) {
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join("."), l);
        }
        delete bag[ev][ns];
      }
    } else if (ns) {
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join("."));
          }
        }
      }
    } else if (ev) {
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join("."));
        }
        delete bag[ev];
      }
    } else {
      for (event in bag) {
        off(n, event);
      }
      clearEvents(instance);
    }
  });
}
function dispatch2(node, event, data3, options) {
  const n = getEventTarget(node);
  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data3,
      cancelable: true,
      ...options
    });
    n.dispatchEvent(event);
  }
  return event;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/EventTarget.js
var EventTarget = class extends Base {
  addEventListener() {
  }
  dispatch(event, data3, options) {
    return dispatch2(this, event, data3, options);
  }
  dispatchEvent(event) {
    const bag = this.getEventHolder().events;
    if (!bag) return true;
    const events = bag[event.type];
    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event);
      }
    }
    return !event.defaultPrevented;
  }
  // Fire given event
  fire(event, data3, options) {
    this.dispatch(event, data3, options);
    return this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(event, listener, options) {
    off(this, event, listener, options);
    return this;
  }
  // Bind given event to listener
  on(event, listener, binding, options) {
    on(this, event, listener, binding, options);
    return this;
  }
  removeEventListener() {
  }
};
register(EventTarget, "EventTarget");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js
function noop2() {
}
var timeline = {
  duration: 400,
  ease: ">",
  delay: 0
};
var attrs = {
  // fill and stroke
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  // text
  "text-anchor": "start"
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/SVGArray.js
var SVGArray = class extends Array {
  constructor(...args) {
    super(...args);
    this.init(...args);
  }
  clone() {
    return new this.constructor(this);
  }
  init(arr) {
    if (typeof arr === "number") return this;
    this.length = 0;
    this.push(...this.parse(arr));
    return this;
  }
  // Parse whitespace separated string
  parse(array3 = []) {
    if (array3 instanceof Array) return array3;
    return array3.trim().split(delimiter).map(parseFloat);
  }
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
  toSet() {
    return new Set(this);
  }
  toString() {
    return this.join(" ");
  }
  // Flattens the array if needed
  valueOf() {
    const ret = [];
    ret.push(...this);
    return ret;
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js
var SVGNumber = class _SVGNumber {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }
  convert(unit) {
    return new _SVGNumber(this.value, unit);
  }
  // Divide number
  divide(number) {
    number = new _SVGNumber(number);
    return new _SVGNumber(this / number, this.unit || number.unit);
  }
  init(value, unit) {
    unit = Array.isArray(value) ? value[1] : unit;
    value = Array.isArray(value) ? value[0] : value;
    this.value = 0;
    this.unit = unit || "";
    if (typeof value === "number") {
      this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -34e37 : 34e37 : value;
    } else if (typeof value === "string") {
      unit = value.match(numberAndUnit);
      if (unit) {
        this.value = parseFloat(unit[1]);
        if (unit[5] === "%") {
          this.value /= 100;
        } else if (unit[5] === "s") {
          this.value *= 1e3;
        }
        this.unit = unit[5];
      }
    } else {
      if (value instanceof _SVGNumber) {
        this.value = value.valueOf();
        this.unit = value.unit;
      }
    }
    return this;
  }
  // Subtract number
  minus(number) {
    number = new _SVGNumber(number);
    return new _SVGNumber(this - number, this.unit || number.unit);
  }
  // Add number
  plus(number) {
    number = new _SVGNumber(number);
    return new _SVGNumber(this + number, this.unit || number.unit);
  }
  // Multiply number
  times(number) {
    number = new _SVGNumber(number);
    return new _SVGNumber(this * number, this.unit || number.unit);
  }
  toArray() {
    return [this.value, this.unit];
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (this.unit === "%" ? ~~(this.value * 1e8) / 1e6 : this.unit === "s" ? this.value / 1e3 : this.value) + this.unit;
  }
  valueOf() {
    return this.value;
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/attr.js
var colorAttributes = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]);
var hooks = [];
function registerAttrHook(fn) {
  hooks.push(fn);
}
function attr(attr2, val, ns) {
  if (attr2 == null) {
    attr2 = {};
    val = this.node.attributes;
    for (const node of val) {
      attr2[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
    }
    return attr2;
  } else if (attr2 instanceof Array) {
    return attr2.reduce((last, curr) => {
      last[curr] = this.attr(curr);
      return last;
    }, {});
  } else if (typeof attr2 === "object" && attr2.constructor === Object) {
    for (val in attr2) this.attr(val, attr2[val]);
  } else if (val === null) {
    this.node.removeAttribute(attr2);
  } else if (val == null) {
    val = this.node.getAttribute(attr2);
    return val == null ? attrs[attr2] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    val = hooks.reduce((_val, hook) => {
      return hook(attr2, _val, this);
    }, val);
    if (typeof val === "number") {
      val = new SVGNumber(val);
    } else if (colorAttributes.has(attr2) && Color2.isColor(val)) {
      val = new Color2(val);
    } else if (val.constructor === Array) {
      val = new SVGArray(val);
    }
    if (attr2 === "leading") {
      if (this.leading) {
        this.leading(val);
      }
    } else {
      typeof ns === "string" ? this.node.setAttributeNS(ns, attr2, val.toString()) : this.node.setAttribute(attr2, val.toString());
    }
    if (this.rebuild && (attr2 === "font-size" || attr2 === "x")) {
      this.rebuild();
    }
  }
  return this;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Dom.js
var Dom = class _Dom extends EventTarget {
  constructor(node, attrs2) {
    super();
    this.node = node;
    this.type = node.nodeName;
    if (attrs2 && node !== attrs2) {
      this.attr(attrs2);
    }
  }
  // Add given element at a position
  add(element, i) {
    element = makeInstance(element);
    if (element.removeNamespace && this.node instanceof globals.window.SVGElement) {
      element.removeNamespace();
    }
    if (i == null) {
      this.node.appendChild(element.node);
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i]);
    }
    return this;
  }
  // Add element to given container and return self
  addTo(parent, i) {
    return makeInstance(parent).put(this, i);
  }
  // Returns all child elements
  children() {
    return new List_default(
      map(this.node.children, function(node) {
        return adopt(node);
      })
    );
  }
  // Remove all elements in this container
  clear() {
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }
    return this;
  }
  // Clone element
  clone(deep = true, assignNewIds = true) {
    this.writeDataToDom();
    let nodeClone = this.node.cloneNode(deep);
    if (assignNewIds) {
      nodeClone = assignNewId(nodeClone);
    }
    return new this.constructor(nodeClone);
  }
  // Iterates over all children and invokes a given block
  each(block, deep) {
    const children2 = this.children();
    let i, il;
    for (i = 0, il = children2.length; i < il; i++) {
      block.apply(children2[i], [i, children2]);
      if (deep) {
        children2[i].each(block, deep);
      }
    }
    return this;
  }
  element(nodeName, attrs2) {
    return this.put(new _Dom(create2(nodeName), attrs2));
  }
  // Get first child
  first() {
    return adopt(this.node.firstChild);
  }
  // Get a element at the given index
  get(i) {
    return adopt(this.node.childNodes[i]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }
  // Checks if the given element is a child
  has(element) {
    return this.index(element) >= 0;
  }
  html(htmlOrFn, outerHTML) {
    return this.xml(htmlOrFn, outerHTML, html);
  }
  // Get / set id
  id(id2) {
    if (typeof id2 === "undefined" && !this.node.id) {
      this.node.id = eid(this.type);
    }
    return this.attr("id", id2);
  }
  // Gets index of given element
  index(element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node);
  }
  // Get the last child
  last() {
    return adopt(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(selector) {
    const el = this.node;
    const matcher = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector || null;
    return matcher && matcher.call(el, selector);
  }
  // Returns the parent element instance
  parent(type2) {
    let parent = this;
    if (!parent.node.parentNode) return null;
    parent = adopt(parent.node.parentNode);
    if (!type2) return parent;
    do {
      if (typeof type2 === "string" ? parent.matches(type2) : parent instanceof type2)
        return parent;
    } while (parent = adopt(parent.node.parentNode));
    return parent;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(element, i) {
    element = makeInstance(element);
    this.add(element, i);
    return element;
  }
  // Add element to given container and return container
  putIn(parent, i) {
    return makeInstance(parent).add(this, i);
  }
  // Remove element
  remove() {
    if (this.parent()) {
      this.parent().removeElement(this);
    }
    return this;
  }
  // Remove a given child
  removeElement(element) {
    this.node.removeChild(element.node);
    return this;
  }
  // Replace this with element
  replace(element) {
    element = makeInstance(element);
    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(element.node, this.node);
    }
    return element;
  }
  round(precision = 2, map2 = null) {
    const factor = 10 ** precision;
    const attrs2 = this.attr(map2);
    for (const i in attrs2) {
      if (typeof attrs2[i] === "number") {
        attrs2[i] = Math.round(attrs2[i] * factor) / factor;
      }
    }
    this.attr(attrs2);
    return this;
  }
  // Import / Export raw svg
  svg(svgOrFn, outerSVG) {
    return this.xml(svgOrFn, outerSVG, svg);
  }
  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(text) {
    this.node.textContent = text;
    return this;
  }
  wrap(node) {
    const parent = this.parent();
    if (!parent) {
      return this.addTo(node);
    }
    const position2 = parent.index(this);
    return parent.put(node, position2).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    this.each(function() {
      this.writeDataToDom();
    });
    return this;
  }
  // Import / Export raw svg
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === "boolean") {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }
    if (xmlOrFn == null || typeof xmlOrFn === "function") {
      outerXML = outerXML == null ? true : outerXML;
      this.writeDataToDom();
      let current = this;
      if (xmlOrFn != null) {
        current = adopt(current.node.cloneNode(true));
        if (outerXML) {
          const result = xmlOrFn(current);
          current = result || current;
          if (result === false) return "";
        }
        current.each(function() {
          const result = xmlOrFn(this);
          const _this = result || this;
          if (result === false) {
            this.remove();
          } else if (result && this !== _this) {
            this.replace(_this);
          }
        }, true);
      }
      return outerXML ? current.node.outerHTML : current.node.innerHTML;
    }
    outerXML = outerXML == null ? false : outerXML;
    const well = create2("wrapper", ns);
    const fragment = globals.document.createDocumentFragment();
    well.innerHTML = xmlOrFn;
    for (let len = well.children.length; len--; ) {
      fragment.appendChild(well.firstElementChild);
    }
    const parent = this.parent();
    return outerXML ? this.replace(fragment) && parent : this.add(fragment);
  }
};
extend2(Dom, { attr, find: find2, findOne });
register(Dom, "Dom");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Element.js
var Element = class extends Dom {
  constructor(node, attrs2) {
    super(node, attrs2);
    this.dom = {};
    this.node.instance = this;
    if (node.hasAttribute("data-svgjs") || node.hasAttribute("svgjs:data")) {
      this.setData(
        JSON.parse(node.getAttribute("data-svgjs")) ?? JSON.parse(node.getAttribute("svgjs:data")) ?? {}
      );
    }
  }
  // Move element by its center
  center(x5, y5) {
    return this.cx(x5).cy(y5);
  }
  // Move by center over x-axis
  cx(x5) {
    return x5 == null ? this.x() + this.width() / 2 : this.x(x5 - this.width() / 2);
  }
  // Move by center over y-axis
  cy(y5) {
    return y5 == null ? this.y() + this.height() / 2 : this.y(y5 - this.height() / 2);
  }
  // Get defs
  defs() {
    const root3 = this.root();
    return root3 && root3.defs();
  }
  // Relative move over x and y axes
  dmove(x5, y5) {
    return this.dx(x5).dy(y5);
  }
  // Relative move over x axis
  dx(x5 = 0) {
    return this.x(new SVGNumber(x5).plus(this.x()));
  }
  // Relative move over y axis
  dy(y5 = 0) {
    return this.y(new SVGNumber(y5).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }
  // Set height of element
  height(height4) {
    return this.attr("height", height4);
  }
  // Move element to given x and y values
  move(x5, y5) {
    return this.x(x5).y(y5);
  }
  // return array of all ancestors of given type up to the root svg
  parents(until = this.root()) {
    const isSelector = typeof until === "string";
    if (!isSelector) {
      until = makeInstance(until);
    }
    const parents = new List_default();
    let parent = this;
    while ((parent = parent.parent()) && parent.node !== globals.document && parent.nodeName !== "#document-fragment") {
      parents.push(parent);
      if (!isSelector && parent.node === until.node) {
        break;
      }
      if (isSelector && parent.matches(until)) {
        break;
      }
      if (parent.node === this.root().node) {
        return null;
      }
    }
    return parents;
  }
  // Get referenced element form attribute value
  reference(attr2) {
    attr2 = this.attr(attr2);
    if (!attr2) return null;
    const m = (attr2 + "").match(reference);
    return m ? makeInstance(m[1]) : null;
  }
  // Get parent document
  root() {
    const p = this.parent(getClass(root2));
    return p && p.root();
  }
  // set given data to the elements data property
  setData(o) {
    this.dom = o;
    return this;
  }
  // Set element size to given width and height
  size(width4, height4) {
    const p = proportionalSize(this, width4, height4);
    return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
  }
  // Set width of element
  width(width4) {
    return this.attr("width", width4);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    writeDataToDom(this, this.dom);
    return super.writeDataToDom();
  }
  // Move over x-axis
  x(x5) {
    return this.attr("x", x5);
  }
  // Move over y-axis
  y(y5) {
    return this.attr("y", y5);
  }
};
extend2(Element, {
  bbox,
  rbox,
  inside,
  point,
  ctm,
  screenCTM
});
register(Element, "Element");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js
var sugar = {
  stroke: [
    "color",
    "width",
    "opacity",
    "linecap",
    "linejoin",
    "miterlimit",
    "dasharray",
    "dashoffset"
  ],
  fill: ["color", "opacity", "rule"],
  prefix: function(t, a) {
    return a === "color" ? t : t + "-" + a;
  }
};
["fill", "stroke"].forEach(function(m) {
  const extension = {};
  let i;
  extension[m] = function(o) {
    if (typeof o === "undefined") {
      return this.attr(m);
    }
    if (typeof o === "string" || o instanceof Color2 || Color2.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }
    return this;
  };
  registerMethods(["Element", "Runner"], extension);
});
registerMethods(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(mat, b, c, d, e, f) {
    if (mat == null) {
      return new Matrix(this);
    }
    return this.attr("transform", new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function(angle, cx3, cy3) {
    return this.transform({ rotate: angle, ox: cx3, oy: cy3 }, true);
  },
  // Map skew to transform
  skew: function(x5, y5, cx3, cy3) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ skew: x5, ox: y5, oy: cx3 }, true) : this.transform({ skew: [x5, y5], ox: cx3, oy: cy3 }, true);
  },
  shear: function(lam, cx3, cy3) {
    return this.transform({ shear: lam, ox: cx3, oy: cy3 }, true);
  },
  // Map scale to transform
  scale: function(x5, y5, cx3, cy3) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ scale: x5, ox: y5, oy: cx3 }, true) : this.transform({ scale: [x5, y5], ox: cx3, oy: cy3 }, true);
  },
  // Map translate to transform
  translate: function(x5, y5) {
    return this.transform({ translate: [x5, y5] }, true);
  },
  // Map relative translations to transform
  relative: function(x5, y5) {
    return this.transform({ relative: [x5, y5] }, true);
  },
  // Map flip to transform
  flip: function(direction = "both", origin = "center") {
    if ("xybothtrue".indexOf(direction) === -1) {
      origin = direction;
      direction = "both";
    }
    return this.transform({ flip: direction, origin }, true);
  },
  // Opacity
  opacity: function(value) {
    return this.attr("opacity", value);
  }
});
registerMethods("radius", {
  // Add x and y radius
  radius: function(x5, y5 = x5) {
    const type2 = (this._element || this).type;
    return type2 === "radialGradient" ? this.attr("r", new SVGNumber(x5)) : this.rx(x5).ry(y5);
  }
});
registerMethods("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(length2) {
    return new Point(this.node.getPointAtLength(length2));
  }
});
registerMethods(["Element", "Runner"], {
  // Set font
  font: function(a, v) {
    if (typeof a === "object") {
      for (v in a) this.font(v, a[v]);
      return this;
    }
    return a === "leading" ? this.leading(v) : a === "anchor" ? this.attr("text-anchor", v) : a === "size" || a === "family" || a === "weight" || a === "stretch" || a === "variant" || a === "style" ? this.attr("font-" + a, v) : this.attr(a, v);
  }
});
var methods2 = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseover",
  "mouseout",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "touchstart",
  "touchmove",
  "touchleave",
  "touchend",
  "touchcancel",
  "contextmenu",
  "wheel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel"
].reduce(function(last, event) {
  const fn = function(f) {
    if (f === null) {
      this.off(event);
    } else {
      this.on(event, f);
    }
    return this;
  };
  last[event] = fn;
  return last;
}, {});
registerMethods("Element", methods2);

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js
function untransform() {
  return this.attr("transform", null);
}
function matrixify() {
  const matrix = (this.attr("transform") || "").split(transforms).slice(0, -1).map(function(str) {
    const kv = str.trim().split("(");
    return [
      kv[0],
      kv[1].split(delimiter).map(function(str2) {
        return parseFloat(str2);
      })
    ];
  }).reverse().reduce(function(matrix2, transform3) {
    if (transform3[0] === "matrix") {
      return matrix2.lmultiply(Matrix.fromArray(transform3[1]));
    }
    return matrix2[transform3[0]].apply(matrix2, transform3[1]);
  }, new Matrix());
  return matrix;
}
function toParent(parent, i) {
  if (this === parent) return this;
  if (isDescriptive(this.node)) return this.addTo(parent, i);
  const ctm2 = this.screenCTM();
  const pCtm = parent.screenCTM().inverse();
  this.addTo(parent, i).untransform().transform(pCtm.multiply(ctm2));
  return this;
}
function toRoot(i) {
  return this.toParent(this.root(), i);
}
function transform2(o, relative) {
  if (o == null || typeof o === "string") {
    const decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }
  if (!Matrix.isMatrixLike(o)) {
    o = { ...o, origin: getOrigin(o, this) };
  }
  const cleanRelative = relative === true ? this : relative || false;
  const result = new Matrix(cleanRelative).transform(o);
  return this.attr("transform", result);
}
registerMethods("Element", {
  untransform,
  matrixify,
  toParent,
  toRoot,
  transform: transform2
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Container.js
var Container = class _Container extends Element {
  flatten() {
    this.each(function() {
      if (this instanceof _Container) {
        return this.flatten().ungroup();
      }
    });
    return this;
  }
  ungroup(parent = this.parent(), index = parent.index(this)) {
    index = index === -1 ? parent.children().length : index;
    this.each(function(i, children2) {
      return children2[children2.length - i - 1].toParent(parent, index);
    });
    return this.remove();
  }
};
register(Container, "Container");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Defs.js
var Defs = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("defs", node), attrs2);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
};
register(Defs, "Defs");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Shape.js
var Shape = class extends Element {
};
register(Shape, "Shape");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/circled.js
var circled_exports = {};
__export(circled_exports, {
  cx: () => cx,
  cy: () => cy,
  height: () => height,
  rx: () => rx,
  ry: () => ry,
  width: () => width,
  x: () => x,
  y: () => y
});
function rx(rx2) {
  return this.attr("rx", rx2);
}
function ry(ry2) {
  return this.attr("ry", ry2);
}
function x(x5) {
  return x5 == null ? this.cx() - this.rx() : this.cx(x5 + this.rx());
}
function y(y5) {
  return y5 == null ? this.cy() - this.ry() : this.cy(y5 + this.ry());
}
function cx(x5) {
  return this.attr("cx", x5);
}
function cy(y5) {
  return this.attr("cy", y5);
}
function width(width4) {
  return width4 == null ? this.rx() * 2 : this.rx(new SVGNumber(width4).divide(2));
}
function height(height4) {
  return height4 == null ? this.ry() * 2 : this.ry(new SVGNumber(height4).divide(2));
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js
var Ellipse = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("ellipse", node), attrs2);
  }
  size(width4, height4) {
    const p = proportionalSize(this, width4, height4);
    return this.rx(new SVGNumber(p.width).divide(2)).ry(
      new SVGNumber(p.height).divide(2)
    );
  }
};
extend2(Ellipse, circled_exports);
registerMethods("Container", {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function(width4 = 0, height4 = width4) {
    return this.put(new Ellipse()).size(width4, height4).move(0, 0);
  })
});
register(Ellipse, "Ellipse");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Fragment.js
var Fragment = class extends Dom {
  constructor(node = globals.document.createDocumentFragment()) {
    super(node);
  }
  // Import / Export raw xml
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === "boolean") {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }
    if (xmlOrFn == null || typeof xmlOrFn === "function") {
      const wrapper = new Dom(create2("wrapper", ns));
      wrapper.add(this.node.cloneNode(true));
      return wrapper.xml(false, ns);
    }
    return super.xml(xmlOrFn, false, ns);
  }
};
register(Fragment, "Fragment");
var Fragment_default = Fragment;

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js
var gradiented_exports = {};
__export(gradiented_exports, {
  from: () => from,
  to: () => to
});
function from(x5, y5) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new SVGNumber(x5), fy: new SVGNumber(y5) }) : this.attr({ x1: new SVGNumber(x5), y1: new SVGNumber(y5) });
}
function to(x5, y5) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new SVGNumber(x5), cy: new SVGNumber(y5) }) : this.attr({ x2: new SVGNumber(x5), y2: new SVGNumber(y5) });
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Gradient.js
var Gradient = class extends Container {
  constructor(type2, attrs2) {
    super(
      nodeOrNew(type2 + "Gradient", typeof type2 === "string" ? null : type2),
      attrs2
    );
  }
  // custom attr to handle transform
  attr(a, b, c) {
    if (a === "transform") a = "gradientTransform";
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update gradient
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
};
extend2(Gradient, gradiented_exports);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient(...args) {
      return this.defs().gradient(...args);
    }
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function(type2, block) {
      return this.put(new Gradient(type2)).update(block);
    })
  }
});
register(Gradient, "Gradient");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Pattern.js
var Pattern = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("pattern", node), attrs2);
  }
  // custom attr to handle transform
  attr(a, b, c) {
    if (a === "transform") a = "patternTransform";
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update pattern by rebuilding
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
};
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern(...args) {
      return this.defs().pattern(...args);
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function(width4, height4, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width4,
        height: height4,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
register(Pattern, "Pattern");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Image.js
var Image = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("image", node), attrs2);
  }
  // (re)load image
  load(url, callback) {
    if (!url) return this;
    const img = new globals.window.Image();
    on(
      img,
      "load",
      function(e) {
        const p = this.parent(Pattern);
        if (this.width() === 0 && this.height() === 0) {
          this.size(img.width, img.height);
        }
        if (p instanceof Pattern) {
          if (p.width() === 0 && p.height() === 0) {
            p.size(this.width(), this.height());
          }
        }
        if (typeof callback === "function") {
          callback.call(this, e);
        }
      },
      this
    );
    on(img, "load error", function() {
      off(img);
    });
    return this.attr("href", img.src = url, xlink);
  }
};
registerAttrHook(function(attr2, val, _this) {
  if (attr2 === "fill" || attr2 === "stroke") {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }
  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, (pattern) => {
      pattern.add(val);
    });
  }
  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function(source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback);
    })
  }
});
register(Image, "Image");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/PointArray.js
var PointArray = class extends SVGArray {
  // Get bounding box of points
  bbox() {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    this.forEach(function(el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return new Box(minX, minY, maxX - minX, maxY - minY);
  }
  // Move point string
  move(x5, y5) {
    const box = this.bbox();
    x5 -= box.x;
    y5 -= box.y;
    if (!isNaN(x5) && !isNaN(y5)) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x5, this[i][1] + y5];
      }
    }
    return this;
  }
  // Parse point string and flat array
  parse(array3 = [0, 0]) {
    const points = [];
    if (array3 instanceof Array) {
      array3 = Array.prototype.concat.apply([], array3);
    } else {
      array3 = array3.trim().split(delimiter).map(parseFloat);
    }
    if (array3.length % 2 !== 0) array3.pop();
    for (let i = 0, len = array3.length; i < len; i = i + 2) {
      points.push([array3[i], array3[i + 1]]);
    }
    return points;
  }
  // Resize poly string
  size(width4, height4) {
    let i;
    const box = this.bbox();
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width)
        this[i][0] = (this[i][0] - box.x) * width4 / box.width + box.x;
      if (box.height)
        this[i][1] = (this[i][1] - box.y) * height4 / box.height + box.y;
    }
    return this;
  }
  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }
  // Convert array to string
  toString() {
    const array3 = [];
    for (let i = 0, il = this.length; i < il; i++) {
      array3.push(this[i].join(","));
    }
    return array3.join(" ");
  }
  transform(m) {
    return this.clone().transformO(m);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    for (let i = this.length; i--; ) {
      const [x5, y5] = this[i];
      this[i][0] = m.a * x5 + m.c * y5 + m.e;
      this[i][1] = m.b * x5 + m.d * y5 + m.f;
    }
    return this;
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js
var pointed_exports = {};
__export(pointed_exports, {
  MorphArray: () => MorphArray,
  height: () => height2,
  width: () => width2,
  x: () => x2,
  y: () => y2
});
var MorphArray = PointArray;
function x2(x5) {
  return x5 == null ? this.bbox().x : this.move(x5, this.bbox().y);
}
function y2(y5) {
  return y5 == null ? this.bbox().y : this.move(this.bbox().x, y5);
}
function width2(width4) {
  const b = this.bbox();
  return width4 == null ? b.width : this.size(width4, b.height);
}
function height2(height4) {
  const b = this.bbox();
  return height4 == null ? b.height : this.size(b.width, height4);
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Line.js
var Line = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("line", node), attrs2);
  }
  // Get array
  array() {
    return new PointArray([
      [this.attr("x1"), this.attr("y1")],
      [this.attr("x2"), this.attr("y2")]
    ]);
  }
  // Move by left top corner
  move(x5, y5) {
    return this.attr(this.array().move(x5, y5).toLine());
  }
  // Overwrite native plot() method
  plot(x1, y1, x22, y22) {
    if (x1 == null) {
      return this.array();
    } else if (typeof y1 !== "undefined") {
      x1 = { x1, y1, x2: x22, y2: y22 };
    } else {
      x1 = new PointArray(x1).toLine();
    }
    return this.attr(x1);
  }
  // Set element size to given width and height
  size(width4, height4) {
    const p = proportionalSize(this, width4, height4);
    return this.attr(this.array().size(p.width, p.height).toLine());
  }
};
extend2(Line, pointed_exports);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function(...args) {
      return Line.prototype.plot.apply(
        this.put(new Line()),
        args[0] != null ? args : [0, 0, 0, 0]
      );
    })
  }
});
register(Line, "Line");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Marker.js
var Marker = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("marker", node), attrs2);
  }
  // Set height of element
  height(height4) {
    return this.attr("markerHeight", height4);
  }
  orient(orient) {
    return this.attr("orient", orient);
  }
  // Set marker refX and refY
  ref(x5, y5) {
    return this.attr("refX", x5).attr("refY", y5);
  }
  // Return the fill id
  toString() {
    return "url(#" + this.id() + ")";
  }
  // Update marker
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Set width of element
  width(width4) {
    return this.attr("markerWidth", width4);
  }
};
registerMethods({
  Container: {
    marker(...args) {
      return this.defs().marker(...args);
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function(width4, height4, block) {
      return this.put(new Marker()).size(width4, height4).ref(width4 / 2, height4 / 2).viewbox(0, 0, width4, height4).attr("orient", "auto").update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker(marker, width4, height4, block) {
      let attr2 = ["marker"];
      if (marker !== "all") attr2.push(marker);
      attr2 = attr2.join("-");
      marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width4, height4, block);
      return this.attr(attr2, marker);
    }
  }
});
register(Marker, "Marker");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Controller.js
function makeSetterGetter(k, f) {
  return function(v) {
    if (v == null) return this[k];
    this[k] = v;
    if (f) f.call(this);
    return this;
  };
}
var easing = {
  "-": function(pos) {
    return pos;
  },
  "<>": function(pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  ">": function(pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  "<": function(pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function(x1, y1, x22, y22) {
    return function(t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x22 > 0) {
          return y22 / x22 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x22 < 1) {
          return (1 - y22) / (1 - x22) * t + (y22 - x22) / (1 - x22);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y22 + t ** 3;
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(steps, stepPosition = "end") {
    stepPosition = stepPosition.split("-").reverse()[0];
    let jumps = steps;
    if (stepPosition === "none") {
      --jumps;
    } else if (stepPosition === "both") {
      ++jumps;
    }
    return (t, beforeFlag = false) => {
      let step = Math.floor(t * steps);
      const jumping = t * step % 1 === 0;
      if (stepPosition === "start" || stepPosition === "both") {
        ++step;
      }
      if (beforeFlag && jumping) {
        --step;
      }
      if (t >= 0 && step < 0) {
        step = 0;
      }
      if (t <= 1 && step > jumps) {
        step = jumps;
      }
      return step / jumps;
    };
  }
};
var Stepper = class {
  done() {
    return false;
  }
};
var Ease = class extends Stepper {
  constructor(fn = timeline.ease) {
    super();
    this.ease = easing[fn] || fn;
  }
  step(from2, to2, pos) {
    if (typeof from2 !== "number") {
      return pos < 1 ? from2 : to2;
    }
    return from2 + (to2 - from2) * this.ease(pos);
  }
};
var Controller = class extends Stepper {
  constructor(fn) {
    super();
    this.stepper = fn;
  }
  done(c) {
    return c.done;
  }
  step(current, target, dt, c) {
    return this.stepper(current, target, dt, c);
  }
};
function recalculate() {
  const duration = (this._duration || 500) / 1e3;
  const overshoot = this._overshoot || 0;
  const eps = 1e-10;
  const pi = Math.PI;
  const os = Math.log(overshoot / 100 + eps);
  const zeta = -os / Math.sqrt(pi * pi + os * os);
  const wn = 3.9 / (zeta * duration);
  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}
var Spring = class extends Controller {
  constructor(duration = 500, overshoot = 0) {
    super();
    this.duration(duration).overshoot(overshoot);
  }
  step(current, target, dt, c) {
    if (typeof current === "string") return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    if (dt > 100) dt = 16;
    dt /= 1e3;
    const velocity = c.velocity || 0;
    const acceleration = -this.d * velocity - this.k * (current - target);
    const newPosition = current + velocity * dt + acceleration * dt * dt / 2;
    c.velocity = velocity + acceleration * dt;
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 2e-3;
    return c.done ? target : newPosition;
  }
};
extend2(Spring, {
  duration: makeSetterGetter("_duration", recalculate),
  overshoot: makeSetterGetter("_overshoot", recalculate)
});
var PID = class extends Controller {
  constructor(p = 0.1, i = 0.01, d = 0, windup = 1e3) {
    super();
    this.p(p).i(i).d(d).windup(windup);
  }
  step(current, target, dt, c) {
    if (typeof current === "string") return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    const p = target - current;
    let i = (c.integral || 0) + p * dt;
    const d = (p - (c.error || 0)) / dt;
    const windup = this._windup;
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup));
    }
    c.error = p;
    c.integral = i;
    c.done = Math.abs(p) < 1e-3;
    return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
  }
};
extend2(PID, {
  windup: makeSetterGetter("_windup"),
  p: makeSetterGetter("P"),
  i: makeSetterGetter("I"),
  d: makeSetterGetter("D")
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/utils/pathParser.js
var segmentParameters = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
var pathHandlers = {
  M: function(c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ["M", p.x, p.y];
  },
  L: function(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ["L", c[0], c[1]];
  },
  H: function(c, p) {
    p.x = c[0];
    return ["H", c[0]];
  },
  V: function(c, p) {
    p.y = c[0];
    return ["V", c[0]];
  },
  C: function(c, p) {
    p.x = c[4];
    p.y = c[5];
    return ["C", c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ["S", c[0], c[1], c[2], c[3]];
  },
  Q: function(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ["Q", c[0], c[1], c[2], c[3]];
  },
  T: function(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ["T", c[0], c[1]];
  },
  Z: function(c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ["Z"];
  },
  A: function(c, p) {
    p.x = c[5];
    p.y = c[6];
    return ["A", c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
var mlhvqtcsaz = "mlhvqtcsaz".split("");
for (let i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = /* @__PURE__ */ function(i2) {
    return function(c, p, p0) {
      if (i2 === "H") c[0] = c[0] + p.x;
      else if (i2 === "V") c[0] = c[0] + p.y;
      else if (i2 === "A") {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i2](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}
function makeAbsolut(parser2) {
  const command = parser2.segment[0];
  return pathHandlers[command](parser2.segment.slice(1), parser2.p, parser2.p0);
}
function segmentComplete(parser2) {
  return parser2.segment.length && parser2.segment.length - 1 === segmentParameters[parser2.segment[0].toUpperCase()];
}
function startNewSegment(parser2, token) {
  parser2.inNumber && finalizeNumber(parser2, false);
  const pathLetter = isPathLetter.test(token);
  if (pathLetter) {
    parser2.segment = [token];
  } else {
    const lastCommand = parser2.lastCommand;
    const small = lastCommand.toLowerCase();
    const isSmall = lastCommand === small;
    parser2.segment = [small === "m" ? isSmall ? "l" : "L" : lastCommand];
  }
  parser2.inSegment = true;
  parser2.lastCommand = parser2.segment[0];
  return pathLetter;
}
function finalizeNumber(parser2, inNumber) {
  if (!parser2.inNumber) throw new Error("Parser Error");
  parser2.number && parser2.segment.push(parseFloat(parser2.number));
  parser2.inNumber = inNumber;
  parser2.number = "";
  parser2.pointSeen = false;
  parser2.hasExponent = false;
  if (segmentComplete(parser2)) {
    finalizeSegment(parser2);
  }
}
function finalizeSegment(parser2) {
  parser2.inSegment = false;
  if (parser2.absolute) {
    parser2.segment = makeAbsolut(parser2);
  }
  parser2.segments.push(parser2.segment);
}
function isArcFlag(parser2) {
  if (!parser2.segment.length) return false;
  const isArc = parser2.segment[0].toUpperCase() === "A";
  const length2 = parser2.segment.length;
  return isArc && (length2 === 4 || length2 === 5);
}
function isExponential(parser2) {
  return parser2.lastToken.toUpperCase() === "E";
}
var pathDelimiters = /* @__PURE__ */ new Set([" ", ",", "	", "\n", "\r", "\f"]);
function pathParser(d, toAbsolute = true) {
  let index = 0;
  let token = "";
  const parser2 = {
    segment: [],
    inNumber: false,
    number: "",
    lastToken: "",
    inSegment: false,
    segments: [],
    pointSeen: false,
    hasExponent: false,
    absolute: toAbsolute,
    p0: new Point(),
    p: new Point()
  };
  while (parser2.lastToken = token, token = d.charAt(index++)) {
    if (!parser2.inSegment) {
      if (startNewSegment(parser2, token)) {
        continue;
      }
    }
    if (token === ".") {
      if (parser2.pointSeen || parser2.hasExponent) {
        finalizeNumber(parser2, false);
        --index;
        continue;
      }
      parser2.inNumber = true;
      parser2.pointSeen = true;
      parser2.number += token;
      continue;
    }
    if (!isNaN(parseInt(token))) {
      if (parser2.number === "0" || isArcFlag(parser2)) {
        parser2.inNumber = true;
        parser2.number = token;
        finalizeNumber(parser2, true);
        continue;
      }
      parser2.inNumber = true;
      parser2.number += token;
      continue;
    }
    if (pathDelimiters.has(token)) {
      if (parser2.inNumber) {
        finalizeNumber(parser2, false);
      }
      continue;
    }
    if (token === "-" || token === "+") {
      if (parser2.inNumber && !isExponential(parser2)) {
        finalizeNumber(parser2, false);
        --index;
        continue;
      }
      parser2.number += token;
      parser2.inNumber = true;
      continue;
    }
    if (token.toUpperCase() === "E") {
      parser2.number += token;
      parser2.hasExponent = true;
      continue;
    }
    if (isPathLetter.test(token)) {
      if (parser2.inNumber) {
        finalizeNumber(parser2, false);
      } else if (!segmentComplete(parser2)) {
        throw new Error("parser Error");
      } else {
        finalizeSegment(parser2);
      }
      --index;
    }
  }
  if (parser2.inNumber) {
    finalizeNumber(parser2, false);
  }
  if (parser2.inSegment && segmentComplete(parser2)) {
    finalizeSegment(parser2);
  }
  return parser2.segments;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/types/PathArray.js
function arrayToString(a) {
  let s = "";
  for (let i = 0, il = a.length; i < il; i++) {
    s += a[i][0];
    if (a[i][1] != null) {
      s += a[i][1];
      if (a[i][2] != null) {
        s += " ";
        s += a[i][2];
        if (a[i][3] != null) {
          s += " ";
          s += a[i][3];
          s += " ";
          s += a[i][4];
          if (a[i][5] != null) {
            s += " ";
            s += a[i][5];
            s += " ";
            s += a[i][6];
            if (a[i][7] != null) {
              s += " ";
              s += a[i][7];
            }
          }
        }
      }
    }
  }
  return s + " ";
}
var PathArray = class extends SVGArray {
  // Get bounding box of path
  bbox() {
    parser().path.setAttribute("d", this.toString());
    return new Box(parser.nodes.path.getBBox());
  }
  // Move path string
  move(x5, y5) {
    const box = this.bbox();
    x5 -= box.x;
    y5 -= box.y;
    if (!isNaN(x5) && !isNaN(y5)) {
      for (let l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];
        if (l === "M" || l === "L" || l === "T") {
          this[i][1] += x5;
          this[i][2] += y5;
        } else if (l === "H") {
          this[i][1] += x5;
        } else if (l === "V") {
          this[i][1] += y5;
        } else if (l === "C" || l === "S" || l === "Q") {
          this[i][1] += x5;
          this[i][2] += y5;
          this[i][3] += x5;
          this[i][4] += y5;
          if (l === "C") {
            this[i][5] += x5;
            this[i][6] += y5;
          }
        } else if (l === "A") {
          this[i][6] += x5;
          this[i][7] += y5;
        }
      }
    }
    return this;
  }
  // Absolutize and parse path to array
  parse(d = "M0 0") {
    if (Array.isArray(d)) {
      d = Array.prototype.concat.apply([], d).toString();
    }
    return pathParser(d);
  }
  // Resize path string
  size(width4, height4) {
    const box = this.bbox();
    let i, l;
    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height;
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];
      if (l === "M" || l === "L" || l === "T") {
        this[i][1] = (this[i][1] - box.x) * width4 / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height4 / box.height + box.y;
      } else if (l === "H") {
        this[i][1] = (this[i][1] - box.x) * width4 / box.width + box.x;
      } else if (l === "V") {
        this[i][1] = (this[i][1] - box.y) * height4 / box.height + box.y;
      } else if (l === "C" || l === "S" || l === "Q") {
        this[i][1] = (this[i][1] - box.x) * width4 / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height4 / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width4 / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height4 / box.height + box.y;
        if (l === "C") {
          this[i][5] = (this[i][5] - box.x) * width4 / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height4 / box.height + box.y;
        }
      } else if (l === "A") {
        this[i][1] = this[i][1] * width4 / box.width;
        this[i][2] = this[i][2] * height4 / box.height;
        this[i][6] = (this[i][6] - box.x) * width4 / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height4 / box.height + box.y;
      }
    }
    return this;
  }
  // Convert array to string
  toString() {
    return arrayToString(this);
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Morphable.js
var getClassForType = (value) => {
  const type2 = typeof value;
  if (type2 === "number") {
    return SVGNumber;
  } else if (type2 === "string") {
    if (Color2.isColor(value)) {
      return Color2;
    } else if (delimiter.test(value)) {
      return isPathLetter.test(value) ? PathArray : SVGArray;
    } else if (numberAndUnit.test(value)) {
      return SVGNumber;
    } else {
      return NonMorphable;
    }
  } else if (morphableTypes.indexOf(value.constructor) > -1) {
    return value.constructor;
  } else if (Array.isArray(value)) {
    return SVGArray;
  } else if (type2 === "object") {
    return ObjectBag;
  } else {
    return NonMorphable;
  }
};
var Morphable = class {
  constructor(stepper) {
    this._stepper = stepper || new Ease("-");
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }
  at(pos) {
    return this._morphObj.morph(
      this._from,
      this._to,
      pos,
      this._stepper,
      this._context
    );
  }
  done() {
    const complete = this._context.map(this._stepper.done).reduce(function(last, curr) {
      return last && curr;
    }, true);
    return complete;
  }
  from(val) {
    if (val == null) {
      return this._from;
    }
    this._from = this._set(val);
    return this;
  }
  stepper(stepper) {
    if (stepper == null) return this._stepper;
    this._stepper = stepper;
    return this;
  }
  to(val) {
    if (val == null) {
      return this._to;
    }
    this._to = this._set(val);
    return this;
  }
  type(type2) {
    if (type2 == null) {
      return this._type;
    }
    this._type = type2;
    return this;
  }
  _set(value) {
    if (!this._type) {
      this.type(getClassForType(value));
    }
    let result = new this._type(value);
    if (this._type === Color2) {
      result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
    }
    if (this._type === ObjectBag) {
      result = this._to ? result.align(this._to) : this._from ? result.align(this._from) : result;
    }
    result = result.toConsumable();
    this._morphObj = this._morphObj || new this._type();
    this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function(o) {
      o.done = true;
      return o;
    });
    return result;
  }
};
var NonMorphable = class {
  constructor(...args) {
    this.init(...args);
  }
  init(val) {
    val = Array.isArray(val) ? val[0] : val;
    this.value = val;
    return this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
};
var TransformBag = class _TransformBag {
  constructor(...args) {
    this.init(...args);
  }
  init(obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      };
    }
    Object.assign(this, _TransformBag.defaults, obj);
    return this;
  }
  toArray() {
    const v = this;
    return [
      v.scaleX,
      v.scaleY,
      v.shear,
      v.rotate,
      v.translateX,
      v.translateY,
      v.originX,
      v.originY
    ];
  }
};
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
var sortByKey = (a, b) => {
  return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
};
var ObjectBag = class {
  constructor(...args) {
    this.init(...args);
  }
  align(other) {
    const values = this.values;
    for (let i = 0, il = values.length; i < il; ++i) {
      if (values[i + 1] === other[i + 1]) {
        if (values[i + 1] === Color2 && other[i + 7] !== values[i + 7]) {
          const space = other[i + 7];
          const color2 = new Color2(this.values.splice(i + 3, 5))[space]().toArray();
          this.values.splice(i + 3, 0, ...color2);
        }
        i += values[i + 2] + 2;
        continue;
      }
      if (!other[i + 1]) {
        return this;
      }
      const defaultObject = new other[i + 1]().toArray();
      const toDelete = values[i + 2] + 3;
      values.splice(
        i,
        toDelete,
        other[i],
        other[i + 1],
        other[i + 2],
        ...defaultObject
      );
      i += values[i + 2] + 2;
    }
    return this;
  }
  init(objOrArr) {
    this.values = [];
    if (Array.isArray(objOrArr)) {
      this.values = objOrArr.slice();
      return;
    }
    objOrArr = objOrArr || {};
    const entries = [];
    for (const i in objOrArr) {
      const Type = getClassForType(objOrArr[i]);
      const val = new Type(objOrArr[i]).toArray();
      entries.push([i, Type, val.length, ...val]);
    }
    entries.sort(sortByKey);
    this.values = entries.reduce((last, curr) => last.concat(curr), []);
    return this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const obj = {};
    const arr = this.values;
    while (arr.length) {
      const key = arr.shift();
      const Type = arr.shift();
      const num = arr.shift();
      const values = arr.splice(0, num);
      obj[key] = new Type(values);
    }
    return obj;
  }
};
var morphableTypes = [NonMorphable, TransformBag, ObjectBag];
function registerMorphableType(type2 = []) {
  morphableTypes.push(...[].concat(type2));
}
function makeMorphable() {
  extend2(morphableTypes, {
    to(val) {
      return new Morphable().type(this.constructor).from(this.toArray()).to(val);
    },
    fromArray(arr) {
      this.init(arr);
      return this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(from2, to2, pos, stepper, context) {
      const mapper = function(i, index) {
        return stepper.step(i, to2[index], pos, context[index], context);
      };
      return this.fromArray(from2.map(mapper));
    }
  });
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Path.js
var Path = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("path", node), attrs2);
  }
  // Get array
  array() {
    return this._array || (this._array = new PathArray(this.attr("d")));
  }
  // Clear array cache
  clear() {
    delete this._array;
    return this;
  }
  // Set height of element
  height(height4) {
    return height4 == null ? this.bbox().height : this.size(this.bbox().width, height4);
  }
  // Move by left top corner
  move(x5, y5) {
    return this.attr("d", this.array().move(x5, y5));
  }
  // Plot new path
  plot(d) {
    return d == null ? this.array() : this.clear().attr(
      "d",
      typeof d === "string" ? d : this._array = new PathArray(d)
    );
  }
  // Set element size to given width and height
  size(width4, height4) {
    const p = proportionalSize(this, width4, height4);
    return this.attr("d", this.array().size(p.width, p.height));
  }
  // Set width of element
  width(width4) {
    return width4 == null ? this.bbox().width : this.size(width4, this.bbox().height);
  }
  // Move by left top corner over x-axis
  x(x5) {
    return x5 == null ? this.bbox().x : this.move(x5, this.bbox().y);
  }
  // Move by left top corner over y-axis
  y(y5) {
    return y5 == null ? this.bbox().y : this.move(this.bbox().x, y5);
  }
};
Path.prototype.MorphArray = PathArray;
registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function(d) {
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, "Path");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/poly.js
var poly_exports = {};
__export(poly_exports, {
  array: () => array2,
  clear: () => clear,
  move: () => move,
  plot: () => plot,
  size: () => size
});
function array2() {
  return this._array || (this._array = new PointArray(this.attr("points")));
}
function clear() {
  delete this._array;
  return this;
}
function move(x5, y5) {
  return this.attr("points", this.array().move(x5, y5));
}
function plot(p) {
  return p == null ? this.array() : this.clear().attr(
    "points",
    typeof p === "string" ? p : this._array = new PointArray(p)
  );
}
function size(width4, height4) {
  const p = proportionalSize(this, width4, height4);
  return this.attr("points", this.array().size(p.width, p.height));
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Polygon.js
var Polygon = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("polygon", node), attrs2);
  }
};
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function(p) {
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend2(Polygon, pointed_exports);
extend2(Polygon, poly_exports);
register(Polygon, "Polygon");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Polyline.js
var Polyline = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("polyline", node), attrs2);
  }
};
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function(p) {
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend2(Polyline, pointed_exports);
extend2(Polyline, poly_exports);
register(Polyline, "Polyline");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Rect.js
var Rect = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("rect", node), attrs2);
  }
};
extend2(Rect, { rx, ry });
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function(width4, height4) {
      return this.put(new Rect()).size(width4, height4);
    })
  }
});
register(Rect, "Rect");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Queue.js
var Queue = class {
  constructor() {
    this._first = null;
    this._last = null;
  }
  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }
  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(value) {
    const item = typeof value.next !== "undefined" ? value : { value, next: null, prev: null };
    if (this._last) {
      item.prev = this._last;
      this._last.next = item;
      this._last = item;
    } else {
      this._last = item;
      this._first = item;
    }
    return item;
  }
  // Removes the item that was returned from the push
  remove(item) {
    if (item.prev) item.prev.next = item.next;
    if (item.next) item.next.prev = item.prev;
    if (item === this._last) this._last = item.prev;
    if (item === this._first) this._first = item.next;
    item.prev = null;
    item.next = null;
  }
  shift() {
    const remove2 = this._first;
    if (!remove2) return null;
    this._first = remove2.next;
    if (this._first) this._first.prev = null;
    this._last = this._first ? this._last : null;
    return remove2.value;
  }
};

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Animator.js
var Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: () => globals.window.performance || globals.window.Date,
  transforms: [],
  frame(fn) {
    const node = Animator.frames.push({ run: fn });
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  timeout(fn, delay) {
    delay = delay || 0;
    const time = Animator.timer().now() + delay;
    const node = Animator.timeouts.push({ run: fn, time });
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  immediate(fn) {
    const node = Animator.immediates.push(fn);
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },
  clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },
  cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },
  _draw(now2) {
    let nextTimeout = null;
    const lastTimeout = Animator.timeouts.last();
    while (nextTimeout = Animator.timeouts.shift()) {
      if (now2 >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      }
      if (nextTimeout === lastTimeout) break;
    }
    let nextFrame = null;
    const lastFrame = Animator.frames.last();
    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now2);
    }
    let nextImmediate = null;
    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    }
    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }
};
var Animator_default = Animator;

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Timeline.js
var makeSchedule = function(runnerInfo) {
  const start2 = runnerInfo.start;
  const duration = runnerInfo.runner.duration();
  const end = start2 + duration;
  return {
    start: start2,
    duration,
    end,
    runner: runnerInfo.runner
  };
};
var defaultSource = function() {
  const w = globals.window;
  return (w.performance || w.Date).now();
};
var Timeline = class extends EventTarget {
  // Construct a new timeline on the given element
  constructor(timeSource = defaultSource) {
    super();
    this._timeSource = timeSource;
    this.terminate();
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    this.time(this.getEndTimeOfTimeline() + 1);
    return this.pause();
  }
  // Calculates the end of the timeline
  getEndTime() {
    const lastRunnerInfo = this.getLastRunnerInfo();
    const lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
    const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
    return lastStartTime + lastDuration;
  }
  getEndTimeOfTimeline() {
    const endTimes = this._runners.map((i) => i.start + i.runner.duration());
    return Math.max(0, ...endTimes);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(id2) {
    return this._runners[this._runnerIds.indexOf(id2)] || null;
  }
  pause() {
    this._paused = true;
    return this._continue();
  }
  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  play() {
    this._paused = false;
    return this.updateTime()._continue();
  }
  reverse(yes) {
    const currentSpeed = this.speed();
    if (yes == null) return this.speed(-currentSpeed);
    const positive = Math.abs(currentSpeed);
    return this.speed(yes ? -positive : positive);
  }
  // schedules a runner on the timeline
  schedule(runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule);
    }
    let absoluteStartTime = 0;
    const endTime = this.getEndTime();
    delay = delay || 0;
    if (when == null || when === "last" || when === "after") {
      absoluteStartTime = endTime;
    } else if (when === "absolute" || when === "start") {
      absoluteStartTime = delay;
      delay = 0;
    } else if (when === "now") {
      absoluteStartTime = this._time;
    } else if (when === "relative") {
      const runnerInfo2 = this.getRunnerInfoById(runner.id);
      if (runnerInfo2) {
        absoluteStartTime = runnerInfo2.start + delay;
        delay = 0;
      }
    } else if (when === "with-last") {
      const lastRunnerInfo = this.getLastRunnerInfo();
      const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
      absoluteStartTime = lastStartTime;
    } else {
      throw new Error('Invalid value for the "when" parameter');
    }
    runner.unschedule();
    runner.timeline(this);
    const persist = runner.persist();
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    };
    this._lastRunnerId = runner.id;
    this._runners.push(runnerInfo);
    this._runners.sort((a, b) => a.start - b.start);
    this._runnerIds = this._runners.map((info) => info.runner.id);
    this.updateTime()._continue();
    return this;
  }
  seek(dt) {
    return this.time(this._time + dt);
  }
  source(fn) {
    if (fn == null) return this._timeSource;
    this._timeSource = fn;
    return this;
  }
  speed(speed) {
    if (speed == null) return this._speed;
    this._speed = speed;
    return this;
  }
  stop() {
    this.time(0);
    return this.pause();
  }
  time(time) {
    if (time == null) return this._time;
    this._time = time;
    return this._continue(true);
  }
  // Remove the runner from this timeline
  unschedule(runner) {
    const index = this._runnerIds.indexOf(runner.id);
    if (index < 0) return this;
    this._runners.splice(index, 1);
    this._runnerIds.splice(index, 1);
    runner.timeline(null);
    return this;
  }
  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource();
    }
    return this;
  }
  // Checks if we are running and continues the animation
  _continue(immediateStep = false) {
    Animator_default.cancelFrame(this._nextFrame);
    this._nextFrame = null;
    if (immediateStep) return this._stepImmediate();
    if (this._paused) return this;
    this._nextFrame = Animator_default.frame(this._step);
    return this;
  }
  _stepFn(immediateStep = false) {
    const time = this._timeSource();
    let dtSource = time - this._lastSourceTime;
    if (immediateStep) dtSource = 0;
    const dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
    this._lastSourceTime = time;
    if (!immediateStep) {
      this._time += dtTime;
      this._time = this._time < 0 ? 0 : this._time;
    }
    this._lastStepTime = this._time;
    this.fire("time", this._time);
    for (let k = this._runners.length; k--; ) {
      const runnerInfo = this._runners[k];
      const runner = runnerInfo.runner;
      const dtToStart = this._time - runnerInfo.start;
      if (dtToStart <= 0) {
        runner.reset();
      }
    }
    let runnersLeft = false;
    for (let i = 0, len = this._runners.length; i < len; i++) {
      const runnerInfo = this._runners[i];
      const runner = runnerInfo.runner;
      let dt = dtTime;
      const dtToStart = this._time - runnerInfo.start;
      if (dtToStart <= 0) {
        runnersLeft = true;
        continue;
      } else if (dtToStart < dt) {
        dt = dtToStart;
      }
      if (!runner.active()) continue;
      const finished = runner.step(dt).done;
      if (!finished) {
        runnersLeft = true;
      } else if (runnerInfo.persist !== true) {
        const endTime = runner.duration() - runner.time() + this._time;
        if (endTime + runnerInfo.persist < this._time) {
          runner.unschedule();
          --i;
          --len;
        }
      }
    }
    if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
      this._continue();
    } else {
      this.pause();
      this.fire("finished");
    }
    return this;
  }
  terminate() {
    this._startTime = 0;
    this._speed = 1;
    this._persist = 0;
    this._nextFrame = null;
    this._paused = true;
    this._runners = [];
    this._runnerIds = [];
    this._lastRunnerId = -1;
    this._time = 0;
    this._lastSourceTime = 0;
    this._lastStepTime = 0;
    this._step = this._stepFn.bind(this, false);
    this._stepImmediate = this._stepFn.bind(this, true);
  }
};
registerMethods({
  Element: {
    timeline: function(timeline2) {
      if (timeline2 == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = timeline2;
        return this;
      }
    }
  }
});

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/animation/Runner.js
var Runner = class _Runner extends EventTarget {
  constructor(options) {
    super();
    this.id = _Runner.id++;
    options = options == null ? timeline.duration : options;
    options = typeof options === "function" ? new Controller(options) : options;
    this._element = null;
    this._timeline = null;
    this.done = false;
    this._queue = [];
    this._duration = typeof options === "number" && options;
    this._isDeclarative = options instanceof Controller;
    this._stepper = this._isDeclarative ? options : new Ease();
    this._history = {};
    this.enabled = true;
    this._time = 0;
    this._lastTime = 0;
    this._reseted = true;
    this.transforms = new Matrix();
    this.transformId = 1;
    this._haveReversed = false;
    this._reverse = false;
    this._loopsDone = 0;
    this._swing = false;
    this._wait = 0;
    this._times = 1;
    this._frameId = null;
    this._persist = this._isDeclarative ? true : null;
  }
  static sanitise(duration, delay, when) {
    let times = 1;
    let swing = false;
    let wait = 0;
    duration = duration ?? timeline.duration;
    delay = delay ?? timeline.delay;
    when = when || "last";
    if (typeof duration === "object" && !(duration instanceof Stepper)) {
      delay = duration.delay ?? delay;
      when = duration.when ?? when;
      swing = duration.swing || swing;
      times = duration.times ?? times;
      wait = duration.wait ?? wait;
      duration = duration.duration ?? timeline.duration;
    }
    return {
      duration,
      delay,
      swing,
      times,
      wait,
      when
    };
  }
  active(enabled) {
    if (enabled == null) return this.enabled;
    this.enabled = enabled;
    return this;
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(transform3) {
    this.transforms.lmultiplyO(transform3);
    return this;
  }
  after(fn) {
    return this.on("finished", fn);
  }
  animate(duration, delay, when) {
    const o = _Runner.sanitise(duration, delay, when);
    const runner = new _Runner(o.duration);
    if (this._timeline) runner.timeline(this._timeline);
    if (this._element) runner.element(this._element);
    return runner.loop(o).schedule(o.delay, o.when);
  }
  clearTransform() {
    this.transforms = new Matrix();
    return this;
  }
  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter((item) => {
        return !item.isTransform;
      });
    }
  }
  delay(delay) {
    return this.animate(0, delay);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(fn) {
    return this.queue(null, fn);
  }
  ease(fn) {
    this._stepper = new Ease(fn);
    return this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */
  element(element) {
    if (element == null) return this._element;
    this._element = element;
    element._prepareRunner();
    return this;
  }
  finish() {
    return this.step(Infinity);
  }
  loop(times, swing, wait) {
    if (typeof times === "object") {
      swing = times.swing;
      wait = times.wait;
      times = times.times;
    }
    this._times = times || Infinity;
    this._swing = swing || false;
    this._wait = wait || 0;
    if (this._times === true) {
      this._times = Infinity;
    }
    return this;
  }
  loops(p) {
    const loopDuration = this._duration + this._wait;
    if (p == null) {
      const loopsDone = Math.floor(this._time / loopDuration);
      const relativeTime = this._time - loopsDone * loopDuration;
      const position2 = relativeTime / this._duration;
      return Math.min(loopsDone + position2, this._times);
    }
    const whole = Math.floor(p);
    const partial = p % 1;
    const time = loopDuration * whole + this._duration * partial;
    return this.time(time);
  }
  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  position(p) {
    const x5 = this._time;
    const d = this._duration;
    const w = this._wait;
    const t = this._times;
    const s = this._swing;
    const r = this._reverse;
    let position2;
    if (p == null) {
      const f = function(x6) {
        const swinging = s * Math.floor(x6 % (2 * (w + d)) / (w + d));
        const backwards = swinging && !r || !swinging && r;
        const uncliped = Math.pow(-1, backwards) * (x6 % (w + d)) / d + backwards;
        const clipped = Math.max(Math.min(uncliped, 1), 0);
        return clipped;
      };
      const endTime = t * (w + d) - w;
      position2 = x5 <= 0 ? Math.round(f(1e-5)) : x5 < endTime ? f(x5) : Math.round(f(endTime - 1e-5));
      return position2;
    }
    const loopsDone = Math.floor(this.loops());
    const swingForward = s && loopsDone % 2 === 0;
    const forwards = swingForward && !r || r && swingForward;
    position2 = loopsDone + (forwards ? p : 1 - p);
    return this.loops(position2);
  }
  progress(p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration());
    }
    return this.time(p * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || noop2,
      runner: runFn || noop2,
      retarget: retargetFn,
      isTransform,
      initialised: false,
      finished: false
    });
    const timeline2 = this.timeline();
    timeline2 && this.timeline()._continue();
    return this;
  }
  reset() {
    if (this._reseted) return this;
    this.time(0);
    this._reseted = true;
    return this;
  }
  reverse(reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse;
    return this;
  }
  schedule(timeline2, delay, when) {
    if (!(timeline2 instanceof Timeline)) {
      when = delay;
      delay = timeline2;
      timeline2 = this.timeline();
    }
    if (!timeline2) {
      throw Error("Runner cannot be scheduled without timeline");
    }
    timeline2.schedule(this, delay, when);
    return this;
  }
  step(dt) {
    if (!this.enabled) return this;
    dt = dt == null ? 16 : dt;
    this._time += dt;
    const position2 = this.position();
    const running = this._lastPosition !== position2 && this._time >= 0;
    this._lastPosition = position2;
    const duration = this.duration();
    const justStarted = this._lastTime <= 0 && this._time > 0;
    const justFinished = this._lastTime < duration && this._time >= duration;
    this._lastTime = this._time;
    if (justStarted) {
      this.fire("start", this);
    }
    const declarative = this._isDeclarative;
    this.done = !declarative && !justFinished && this._time >= duration;
    this._reseted = false;
    let converged = false;
    if (running || declarative) {
      this._initialise(running);
      this.transforms = new Matrix();
      converged = this._run(declarative ? dt : position2);
      this.fire("step", this);
    }
    this.done = this.done || converged && declarative;
    if (justFinished) {
      this.fire("finished", this);
    }
    return this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(time) {
    if (time == null) {
      return this._time;
    }
    const dt = time - this._time;
    this.step(dt);
    return this;
  }
  timeline(timeline2) {
    if (typeof timeline2 === "undefined") return this._timeline;
    this._timeline = timeline2;
    return this;
  }
  unschedule() {
    const timeline2 = this.timeline();
    timeline2 && timeline2.unschedule(this);
    return this;
  }
  // Run each initialise function in the runner if required
  _initialise(running) {
    if (!running && !this._isDeclarative) return;
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      const current = this._queue[i];
      const needsIt = this._isDeclarative || !current.initialised && running;
      running = !current.finished;
      if (needsIt && running) {
        current.initialiser.call(this);
        current.initialised = true;
      }
    }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(method, morpher) {
    this._history[method] = {
      morpher,
      caller: this._queue[this._queue.length - 1]
    };
    if (this._isDeclarative) {
      const timeline2 = this.timeline();
      timeline2 && timeline2.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(positionOrDt) {
    let allfinished = true;
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      const current = this._queue[i];
      const converged = current.runner.call(this, positionOrDt);
      current.finished = current.finished || converged === true;
      allfinished = allfinished && current.finished;
    }
    return allfinished;
  }
  // do nothing and return false
  _tryRetarget(method, target, extra) {
    if (this._history[method]) {
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller);
        this._queue.splice(index, 1);
        return false;
      }
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget.call(this, target, extra);
      } else {
        this._history[method].morpher.to(target);
      }
      this._history[method].caller.finished = false;
      const timeline2 = this.timeline();
      timeline2 && timeline2.play();
      return true;
    }
    return false;
  }
};
Runner.id = 0;
var FakeRunner = class {
  constructor(transforms2 = new Matrix(), id2 = -1, done = true) {
    this.transforms = transforms2;
    this.id = id2;
    this.done = done;
  }
  clearTransformsFromQueue() {
  }
};
extend2([Runner, FakeRunner], {
  mergeWith(runner) {
    return new FakeRunner(
      runner.transforms.lmultiply(this.transforms),
      runner.id
    );
  }
});
var lmultiply = (last, curr) => last.lmultiplyO(curr);
var getRunnerTransform = (runner) => runner.transforms;
function mergeTransforms() {
  const runners = this._transformationRunners.runners;
  const netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);
  this._transformationRunners.merge();
  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}
var RunnerArray = class {
  constructor() {
    this.runners = [];
    this.ids = [];
  }
  add(runner) {
    if (this.runners.includes(runner)) return;
    const id2 = runner.id + 1;
    this.runners.push(runner);
    this.ids.push(id2);
    return this;
  }
  clearBefore(id2) {
    const deleteCnt = this.ids.indexOf(id2 + 1) || 1;
    this.ids.splice(0, deleteCnt, 0);
    this.runners.splice(0, deleteCnt, new FakeRunner()).forEach((r) => r.clearTransformsFromQueue());
    return this;
  }
  edit(id2, newRunner) {
    const index = this.ids.indexOf(id2 + 1);
    this.ids.splice(index, 1, id2 + 1);
    this.runners.splice(index, 1, newRunner);
    return this;
  }
  getByID(id2) {
    return this.runners[this.ids.indexOf(id2 + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let lastRunner = null;
    for (let i = 0; i < this.runners.length; ++i) {
      const runner = this.runners[i];
      const condition = lastRunner && runner.done && lastRunner.done && // don't merge runner when persisted on timeline
      (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));
      if (condition) {
        this.remove(runner.id);
        const newRunner = runner.mergeWith(lastRunner);
        this.edit(lastRunner.id, newRunner);
        lastRunner = newRunner;
        --i;
      } else {
        lastRunner = runner;
      }
    }
    return this;
  }
  remove(id2) {
    const index = this.ids.indexOf(id2 + 1);
    this.ids.splice(index, 1);
    this.runners.splice(index, 1);
    return this;
  }
};
registerMethods({
  Element: {
    animate(duration, delay, when) {
      const o = Runner.sanitise(duration, delay, when);
      const timeline2 = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline2.play()).schedule(o.delay, o.when);
    },
    delay(by, when) {
      return this.animate(0, by, when);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },
    _currentTransform(current) {
      return this._transformationRunners.runners.filter((runner) => runner.id <= current.id).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },
    _addRunner(runner) {
      this._transformationRunners.add(runner);
      Animator_default.cancelImmediate(this._frameId);
      this._frameId = Animator_default.immediate(mergeTransforms.bind(this));
    },
    _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(
          new FakeRunner(new Matrix(this))
        );
      }
    }
  }
});
var difference = (a, b) => a.filter((x5) => !b.includes(x5));
extend2(Runner, {
  attr(a, v) {
    return this.styleAttr("attr", a, v);
  },
  // Add animatable styles
  css(s, v) {
    return this.styleAttr("css", s, v);
  },
  styleAttr(type2, nameOrAttrs, val) {
    if (typeof nameOrAttrs === "string") {
      return this.styleAttr(type2, { [nameOrAttrs]: val });
    }
    let attrs2 = nameOrAttrs;
    if (this._tryRetarget(type2, attrs2)) return this;
    let morpher = new Morphable(this._stepper).to(attrs2);
    let keys = Object.keys(attrs2);
    this.queue(
      function() {
        morpher = morpher.from(this.element()[type2](keys));
      },
      function(pos) {
        this.element()[type2](morpher.at(pos).valueOf());
        return morpher.done();
      },
      function(newToAttrs) {
        const newKeys = Object.keys(newToAttrs);
        const differences = difference(newKeys, keys);
        if (differences.length) {
          const addedFromAttrs = this.element()[type2](differences);
          const oldFromAttrs = new ObjectBag(morpher.from()).valueOf();
          Object.assign(oldFromAttrs, addedFromAttrs);
          morpher.from(oldFromAttrs);
        }
        const oldToAttrs = new ObjectBag(morpher.to()).valueOf();
        Object.assign(oldToAttrs, newToAttrs);
        morpher.to(oldToAttrs);
        keys = newKeys;
        attrs2 = newToAttrs;
      }
    );
    this._rememberMorpher(type2, morpher);
    return this;
  },
  zoom(level, point2) {
    if (this._tryRetarget("zoom", level, point2)) return this;
    let morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(
      function() {
        morpher = morpher.from(this.element().zoom());
      },
      function(pos) {
        this.element().zoom(morpher.at(pos), point2);
        return morpher.done();
      },
      function(newLevel, newPoint) {
        point2 = newPoint;
        morpher.to(newLevel);
      }
    );
    this._rememberMorpher("zoom", morpher);
    return this;
  },
  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(transforms2, relative, affine) {
    relative = transforms2.relative || relative;
    if (this._isDeclarative && !relative && this._tryRetarget("transform", transforms2)) {
      return this;
    }
    const isMatrix = Matrix.isMatrixLike(transforms2);
    affine = transforms2.affine != null ? transforms2.affine : affine != null ? affine : !isMatrix;
    const morpher = new Morphable(this._stepper).type(
      affine ? TransformBag : Matrix
    );
    let origin;
    let element;
    let current;
    let currentAngle;
    let startTransform;
    function setup() {
      element = element || this.element();
      origin = origin || getOrigin(transforms2, element);
      startTransform = new Matrix(relative ? void 0 : element);
      element._addRunner(this);
      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }
    function run(pos) {
      if (!relative) this.clearTransform();
      const { x: x5, y: y5 } = new Point(origin).transform(
        element._currentTransform(this)
      );
      let target = new Matrix({ ...transforms2, origin: [x5, y5] });
      let start2 = this._isDeclarative && current ? current : startTransform;
      if (affine) {
        target = target.decompose(x5, y5);
        start2 = start2.decompose(x5, y5);
        const rTarget = target.rotate;
        const rCurrent = start2.rotate;
        const possibilities = [rTarget - 360, rTarget, rTarget + 360];
        const distances = possibilities.map((a) => Math.abs(a - rCurrent));
        const shortest = Math.min(...distances);
        const index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }
      if (relative) {
        if (!isMatrix) {
          target.rotate = transforms2.rotate || 0;
        }
        if (this._isDeclarative && currentAngle) {
          start2.rotate = currentAngle;
        }
      }
      morpher.from(start2);
      morpher.to(target);
      const affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);
      element._addRunner(this);
      return morpher.done();
    }
    function retarget(newTransforms) {
      if ((newTransforms.origin || "center").toString() !== (transforms2.origin || "center").toString()) {
        origin = getOrigin(newTransforms, element);
      }
      transforms2 = { ...newTransforms, origin };
    }
    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher("transform", morpher);
    return this;
  },
  // Animatable x-axis
  x(x5) {
    return this._queueNumber("x", x5);
  },
  // Animatable y-axis
  y(y5) {
    return this._queueNumber("y", y5);
  },
  ax(x5) {
    return this._queueNumber("ax", x5);
  },
  ay(y5) {
    return this._queueNumber("ay", y5);
  },
  dx(x5 = 0) {
    return this._queueNumberDelta("x", x5);
  },
  dy(y5 = 0) {
    return this._queueNumberDelta("y", y5);
  },
  dmove(x5, y5) {
    return this.dx(x5).dy(y5);
  },
  _queueNumberDelta(method, to2) {
    to2 = new SVGNumber(to2);
    if (this._tryRetarget(method, to2)) return this;
    const morpher = new Morphable(this._stepper).to(to2);
    let from2 = null;
    this.queue(
      function() {
        from2 = this.element()[method]();
        morpher.from(from2);
        morpher.to(from2 + to2);
      },
      function(pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done();
      },
      function(newTo) {
        morpher.to(from2 + new SVGNumber(newTo));
      }
    );
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueObject(method, to2) {
    if (this._tryRetarget(method, to2)) return this;
    const morpher = new Morphable(this._stepper).to(to2);
    this.queue(
      function() {
        morpher.from(this.element()[method]());
      },
      function(pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done();
      }
    );
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },
  // Animatable center x-axis
  cx(x5) {
    return this._queueNumber("cx", x5);
  },
  // Animatable center y-axis
  cy(y5) {
    return this._queueNumber("cy", y5);
  },
  // Add animatable move
  move(x5, y5) {
    return this.x(x5).y(y5);
  },
  amove(x5, y5) {
    return this.ax(x5).ay(y5);
  },
  // Add animatable center
  center(x5, y5) {
    return this.cx(x5).cy(y5);
  },
  // Add animatable size
  size(width4, height4) {
    let box;
    if (!width4 || !height4) {
      box = this._element.bbox();
    }
    if (!width4) {
      width4 = box.width / box.height * height4;
    }
    if (!height4) {
      height4 = box.height / box.width * width4;
    }
    return this.width(width4).height(height4);
  },
  // Add animatable width
  width(width4) {
    return this._queueNumber("width", width4);
  },
  // Add animatable height
  height(height4) {
    return this._queueNumber("height", height4);
  },
  // Add animatable plot
  plot(a, b, c, d) {
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }
    if (this._tryRetarget("plot", a)) return this;
    const morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(
      function() {
        morpher.from(this._element.array());
      },
      function(pos) {
        this._element.plot(morpher.at(pos));
        return morpher.done();
      }
    );
    this._rememberMorpher("plot", morpher);
    return this;
  },
  // Add leading method
  leading(value) {
    return this._queueNumber("leading", value);
  },
  // Add animatable viewbox
  viewbox(x5, y5, width4, height4) {
    return this._queueObject("viewbox", new Box(x5, y5, width4, height4));
  },
  update(o) {
    if (typeof o !== "object") {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }
    if (o.opacity != null) this.attr("stop-opacity", o.opacity);
    if (o.color != null) this.attr("stop-color", o.color);
    if (o.offset != null) this.attr("offset", o.offset);
    return this;
  }
});
extend2(Runner, { rx, ry, from, to });
register(Runner, "Runner");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Svg.js
var Svg = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("svg", node), attrs2);
    this.namespace();
  }
  // Creates and returns defs element
  defs() {
    if (!this.isRoot()) return this.root().defs();
    return adopt(this.node.querySelector("defs")) || this.put(new Defs());
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    if (!this.isRoot()) return this.root().namespace();
    return this.attr({ xmlns: svg, version: "1.1" }).attr(
      "xmlns:xlink",
      xlink,
      xmlns
    );
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, xmlns).attr("xmlns:svgjs", null, xmlns);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    if (this.isRoot()) return this;
    return super.root();
  }
};
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function() {
      return this.put(new Svg());
    })
  }
});
register(Svg, "Svg", true);

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Symbol.js
var Symbol2 = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("symbol", node), attrs2);
  }
};
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function() {
      return this.put(new Symbol2());
    })
  }
});
register(Symbol2, "Symbol");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/textable.js
var textable_exports = {};
__export(textable_exports, {
  amove: () => amove,
  ax: () => ax,
  ay: () => ay,
  build: () => build,
  center: () => center,
  cx: () => cx2,
  cy: () => cy2,
  length: () => length,
  move: () => move2,
  plain: () => plain,
  x: () => x3,
  y: () => y3
});
function plain(text) {
  if (this._build === false) {
    this.clear();
  }
  this.node.appendChild(globals.document.createTextNode(text));
  return this;
}
function length() {
  return this.node.getComputedTextLength();
}
function x3(x5, box = this.bbox()) {
  if (x5 == null) {
    return box.x;
  }
  return this.attr("x", this.attr("x") + x5 - box.x);
}
function y3(y5, box = this.bbox()) {
  if (y5 == null) {
    return box.y;
  }
  return this.attr("y", this.attr("y") + y5 - box.y);
}
function move2(x5, y5, box = this.bbox()) {
  return this.x(x5, box).y(y5, box);
}
function cx2(x5, box = this.bbox()) {
  if (x5 == null) {
    return box.cx;
  }
  return this.attr("x", this.attr("x") + x5 - box.cx);
}
function cy2(y5, box = this.bbox()) {
  if (y5 == null) {
    return box.cy;
  }
  return this.attr("y", this.attr("y") + y5 - box.cy);
}
function center(x5, y5, box = this.bbox()) {
  return this.cx(x5, box).cy(y5, box);
}
function ax(x5) {
  return this.attr("x", x5);
}
function ay(y5) {
  return this.attr("y", y5);
}
function amove(x5, y5) {
  return this.ax(x5).ay(y5);
}
function build(build2) {
  this._build = !!build2;
  return this;
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Text.js
var Text = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("text", node), attrs2);
    this.dom.leading = this.dom.leading ?? new SVGNumber(1.3);
    this._rebuild = true;
    this._build = false;
  }
  // Set / get leading
  leading(value) {
    if (value == null) {
      return this.dom.leading;
    }
    this.dom.leading = new SVGNumber(value);
    return this.rebuild();
  }
  // Rebuild appearance type
  rebuild(rebuild) {
    if (typeof rebuild === "boolean") {
      this._rebuild = rebuild;
    }
    if (this._rebuild) {
      const self = this;
      let blankLineOffset = 0;
      const leading = this.dom.leading;
      this.each(function(i) {
        if (isDescriptive(this.node)) return;
        const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue("font-size");
        const dy2 = leading * new SVGNumber(fontSize);
        if (this.dom.newLined) {
          this.attr("x", self.attr("x"));
          if (this.text() === "\n") {
            blankLineOffset += dy2;
          } else {
            this.attr("dy", i ? dy2 + blankLineOffset : 0);
            blankLineOffset = 0;
          }
        }
      });
      this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(o) {
    this.dom = o;
    this.dom.leading = new SVGNumber(o.leading || 1.3);
    return this;
  }
  writeDataToDom() {
    writeDataToDom(this, this.dom, { leading: 1.3 });
    return this;
  }
  // Set the text content
  text(text) {
    if (text === void 0) {
      const children2 = this.node.childNodes;
      let firstLine = 0;
      text = "";
      for (let i = 0, len = children2.length; i < len; ++i) {
        if (children2[i].nodeName === "textPath" || isDescriptive(children2[i])) {
          if (i === 0) firstLine = i + 1;
          continue;
        }
        if (i !== firstLine && children2[i].nodeType !== 3 && adopt(children2[i]).dom.newLined === true) {
          text += "\n";
        }
        text += children2[i].textContent;
      }
      return text;
    }
    this.clear().build(true);
    if (typeof text === "function") {
      text.call(this, this);
    } else {
      text = (text + "").split("\n");
      for (let j = 0, jl = text.length; j < jl; j++) {
        this.newLine(text[j]);
      }
    }
    return this.build(false).rebuild();
  }
};
extend2(Text, textable_exports);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function(text = "") {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function(text = "") {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, "Text");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Tspan.js
var Tspan = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("tspan", node), attrs2);
    this._build = false;
  }
  // Shortcut dx
  dx(dx2) {
    return this.attr("dx", dx2);
  }
  // Shortcut dy
  dy(dy2) {
    return this.attr("dy", dy2);
  }
  // Create new line
  newLine() {
    this.dom.newLined = true;
    const text = this.parent();
    if (!(text instanceof Text)) {
      return this;
    }
    const i = text.index(this);
    const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue("font-size");
    const dy2 = text.dom.leading * new SVGNumber(fontSize);
    return this.dy(i ? dy2 : 0).attr("x", text.x());
  }
  // Set text content
  text(text) {
    if (text == null)
      return this.node.textContent + (this.dom.newLined ? "\n" : "");
    if (typeof text === "function") {
      this.clear().build(true);
      text.call(this, this);
      this.build(false);
    } else {
      this.plain(text);
    }
    return this;
  }
};
extend2(Tspan, textable_exports);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function(text = "") {
      const tspan = new Tspan();
      if (!this._build) {
        this.clear();
      }
      return this.put(tspan).text(text);
    })
  },
  Text: {
    newLine: function(text = "") {
      return this.tspan(text).newLine();
    }
  }
});
register(Tspan, "Tspan");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Circle.js
var Circle = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("circle", node), attrs2);
  }
  radius(r) {
    return this.attr("r", r);
  }
  // Radius x value
  rx(rx2) {
    return this.attr("r", rx2);
  }
  // Alias radius x value
  ry(ry2) {
    return this.rx(ry2);
  }
  size(size3) {
    return this.radius(new SVGNumber(size3).divide(2));
  }
};
extend2(Circle, { x, y, cx, cy, width, height });
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function(size3 = 0) {
      return this.put(new Circle()).size(size3).move(0, 0);
    })
  }
});
register(Circle, "Circle");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js
var ClipPath = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("clipPath", node), attrs2);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    this.targets().forEach(function(el) {
      el.unclip();
    });
    return super.remove();
  }
  targets() {
    return baseFind("svg [clip-path*=" + this.id() + "]");
  }
};
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function() {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(element) {
      const clipper = element instanceof ClipPath ? element : this.parent().clip().add(element);
      return this.attr("clip-path", "url(#" + clipper.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
register(ClipPath, "ClipPath");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js
var ForeignObject = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("foreignObject", node), attrs2);
  }
};
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function(width4, height4) {
      return this.put(new ForeignObject()).size(width4, height4);
    })
  }
});
register(ForeignObject, "ForeignObject");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js
var containerGeometry_exports = {};
__export(containerGeometry_exports, {
  dmove: () => dmove,
  dx: () => dx,
  dy: () => dy,
  height: () => height3,
  move: () => move3,
  size: () => size2,
  width: () => width3,
  x: () => x4,
  y: () => y4
});
function dmove(dx2, dy2) {
  this.children().forEach((child) => {
    let bbox2;
    try {
      bbox2 = child.node instanceof getWindow().SVGSVGElement ? new Box(child.attr(["x", "y", "width", "height"])) : child.bbox();
    } catch (e) {
      return;
    }
    const m = new Matrix(child);
    const matrix = m.translate(dx2, dy2).transform(m.inverse());
    const p = new Point(bbox2.x, bbox2.y).transform(matrix);
    child.move(p.x, p.y);
  });
  return this;
}
function dx(dx2) {
  return this.dmove(dx2, 0);
}
function dy(dy2) {
  return this.dmove(0, dy2);
}
function height3(height4, box = this.bbox()) {
  if (height4 == null) return box.height;
  return this.size(box.width, height4, box);
}
function move3(x5 = 0, y5 = 0, box = this.bbox()) {
  const dx2 = x5 - box.x;
  const dy2 = y5 - box.y;
  return this.dmove(dx2, dy2);
}
function size2(width4, height4, box = this.bbox()) {
  const p = proportionalSize(this, width4, height4, box);
  const scaleX = p.width / box.width;
  const scaleY = p.height / box.height;
  this.children().forEach((child) => {
    const o = new Point(box).transform(new Matrix(child).inverse());
    child.scale(scaleX, scaleY, o.x, o.y);
  });
  return this;
}
function width3(width4, box = this.bbox()) {
  if (width4 == null) return box.width;
  return this.size(width4, box.height, box);
}
function x4(x5, box = this.bbox()) {
  if (x5 == null) return box.x;
  return this.move(x5, box.y, box);
}
function y4(y5, box = this.bbox()) {
  if (y5 == null) return box.y;
  return this.move(box.x, y5, box);
}

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/G.js
var G = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("g", node), attrs2);
  }
};
extend2(G, containerGeometry_exports);
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function() {
      return this.put(new G());
    })
  }
});
register(G, "G");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/A.js
var A = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("a", node), attrs2);
  }
  // Link target attribute
  target(target) {
    return this.attr("target", target);
  }
  // Link url
  to(url) {
    return this.attr("href", url, xlink);
  }
};
extend2(A, containerGeometry_exports);
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function(url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    unlink() {
      const link = this.linker();
      if (!link) return this;
      const parent = link.parent();
      if (!parent) {
        return this.remove();
      }
      const index = parent.index(link);
      parent.add(this, index);
      link.remove();
      return this;
    },
    linkTo(url) {
      let link = this.linker();
      if (!link) {
        link = new A();
        this.wrap(link);
      }
      if (typeof url === "function") {
        url.call(link, link);
      } else {
        link.to(url);
      }
      return this;
    },
    linker() {
      const link = this.parent();
      if (link && link.node.nodeName.toLowerCase() === "a") {
        return link;
      }
      return null;
    }
  }
});
register(A, "A");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Mask.js
var Mask = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("mask", node), attrs2);
  }
  // Unmask all masked elements and remove itself
  remove() {
    this.targets().forEach(function(el) {
      el.unmask();
    });
    return super.remove();
  }
  targets() {
    return baseFind("svg [mask*=" + this.id() + "]");
  }
};
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function() {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(element) {
      const masker = element instanceof Mask ? element : this.parent().mask().add(element);
      return this.attr("mask", "url(#" + masker.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
register(Mask, "Mask");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Stop.js
var Stop = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("stop", node), attrs2);
  }
  // add color stops
  update(o) {
    if (typeof o === "number" || o instanceof SVGNumber) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      };
    }
    if (o.opacity != null) this.attr("stop-opacity", o.opacity);
    if (o.color != null) this.attr("stop-color", o.color);
    if (o.offset != null) this.attr("offset", new SVGNumber(o.offset));
    return this;
  }
};
registerMethods({
  Gradient: {
    // Add a color stop
    stop: function(offset, color2, opacity) {
      return this.put(new Stop()).update(offset, color2, opacity);
    }
  }
});
register(Stop, "Stop");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Style.js
function cssRule(selector, rule) {
  if (!selector) return "";
  if (!rule) return selector;
  let ret = selector + "{";
  for (const i in rule) {
    ret += unCamelCase(i) + ":" + rule[i] + ";";
  }
  ret += "}";
  return ret;
}
var Style = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("style", node), attrs2);
  }
  addText(w = "") {
    this.node.textContent += w;
    return this;
  }
  font(name, src, params = {}) {
    return this.rule("@font-face", {
      fontFamily: name,
      src,
      ...params
    });
  }
  rule(selector, obj) {
    return this.addText(cssRule(selector, obj));
  }
};
registerMethods("Dom", {
  style(selector, obj) {
    return this.put(new Style()).rule(selector, obj);
  },
  fontface(name, src, params) {
    return this.put(new Style()).font(name, src, params);
  }
});
register(Style, "Style");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/TextPath.js
var TextPath = class extends Text {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("textPath", node), attrs2);
  }
  // return the array of the path track element
  array() {
    const track = this.track();
    return track ? track.array() : null;
  }
  // Plot path if any
  plot(d) {
    const track = this.track();
    let pathArray = null;
    if (track) {
      pathArray = track.plot(d);
    }
    return d == null ? pathArray : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
};
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function(text, path) {
      if (!(text instanceof Text)) {
        text = this.text(text);
      }
      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function(track, importNodes = true) {
      const textPath = new TextPath();
      if (!(track instanceof Path)) {
        track = this.defs().path(track);
      }
      textPath.attr("href", "#" + track, xlink);
      let node;
      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      }
      return this.put(textPath);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function(text) {
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      }
      return text.path(this);
    }),
    targets() {
      return baseFind("svg textPath").filter((node) => {
        return (node.attr("href") || "").includes(this.id());
      });
    }
  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, "TextPath");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/elements/Use.js
var Use = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("use", node), attrs2);
  }
  // Use element as a reference
  use(element, file) {
    return this.attr("href", (file || "") + "#" + element, xlink);
  }
};
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function(element, file) {
      return this.put(new Use()).use(element, file);
    })
  }
});
register(Use, "Use");

// node_modules/.pnpm/@svgdotjs+svg.js@3.2.4/node_modules/@svgdotjs/svg.js/src/main.js
extend2([Svg, Symbol2, Image, Pattern, Marker], getMethodsFor("viewbox"));
extend2([Line, Polyline, Polygon, Path], getMethodsFor("marker"));
extend2(Text, getMethodsFor("Text"));
extend2(Path, getMethodsFor("Path"));
extend2(Defs, getMethodsFor("Defs"));
extend2([Text, Tspan], getMethodsFor("Tspan"));
extend2([Rect, Ellipse, Gradient, Runner], getMethodsFor("radius"));
extend2(EventTarget, getMethodsFor("EventTarget"));
extend2(Dom, getMethodsFor("Dom"));
extend2(Element, getMethodsFor("Element"));
extend2(Shape, getMethodsFor("Shape"));
extend2([Container, Fragment_default], getMethodsFor("Container"));
extend2(Gradient, getMethodsFor("Gradient"));
extend2(Runner, getMethodsFor("Runner"));
List_default.extend(getMethodNames());
registerMorphableType([
  SVGNumber,
  Color2,
  Box,
  Matrix,
  SVGArray,
  PointArray,
  PathArray,
  Point
]);
makeMorphable();

// src/draw.ts
function drawNode(container2, nodeData) {
  const data3 = getWidthAndHeight(nodeData);
  const nodeContainer = container2.append("g").attr("class", "node-container").attr("transform", `translate(100, 100)`);
  const foreignObject = nodeContainer.append("foreignObject").attr("width", Math.round(data3.width) + 20).attr("height", Math.round(data3.height) + 20).attr("x", 20).attr("y", 20).attr("fill", "pink");
  const div = foreignObject.append("xhtml:div").attr("xmlns", "http://www.w3.org/1999/xhtml").text(nodeData.title).style("width", "calc(100% - 20px)").style("height", "100%").style("line-height", Math.round(data3.height) + 20 + "px").style("padding", "0 10px").style("font-weight", nodeData.fontWeight).style("font-family", nodeData.fontFamily).style("font-size", nodeData.fontSize).style("color", "red");
  setTimeout(() => {
    drawContainer(nodeContainer, drawNode);
  }, 0);
}
function getWidthAndHeight(data3) {
  if (!data3.title) {
    return { width: 0, height: 0 };
  }
  const node = new Text().text(data3.title).font({
    size: data3.fontSize || "16px",
    weight: data3.fontWeight || "normal",
    family: data3.fontFamily || "\u5FAE\u8F6F\u96C5\u9ED1, 'Microsoft YaHei'"
  });
  const { width: width4, height: height4 } = node.bbox();
  return {
    width: width4,
    height: height4
  };
}
function drawContainer(container2, nodeData) {
  const rect = container2.node().getBoundingClientRect();
  const offset = nodeData.offset || 20;
  const borderRadius = nodeData.borderRadius || 10;
  const pathData = `
  M ${offset}, ${offset / 2}
  h ${rect.width + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius}
  v ${rect.height + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},${borderRadius}
  h -${rect.width + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},-${borderRadius}
  v -${rect.height + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius}
  z
`;
  container2.append("path").attr("d", pathData).attr("fill", "none").attr("stroke", "blue").attr("stroke-width", 2);
}

// src/index.ts
var container = null;
var containerWidth = null;
var containerHeight = null;
var svg2 = null;
var middleContainer = null;
var SamMind = class {
  constructor(option) {
    setCursorStyle(option.containerId);
    initMind(option.containerId);
  }
};
function setCursorStyle(containerId) {
  const cursorArea = document.getElementById(containerId);
}
var data2 = {
  width: 0,
  height: 0,
  fontWeight: "bolder",
  fontSize: "22px",
  title: "\u4FDD\u6301\u5361\u540E\u6765\u53D1\u89C9"
};
function initMind(containerId) {
  container = document.getElementById(containerId);
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  svg2 = select_default2(container).append("svg").attr("id", "sam-mind-svg").attr("width", containerWidth).attr("height", containerHeight).attr("xmlns", "http://www.w3.org/2000/svg").attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
  middleContainer = svg2.append("g").attr("class", "map-outter-container");
  drawNode(middleContainer, data2);
}
export {
  container,
  containerHeight,
  containerWidth,
  SamMind as default,
  middleContainer,
  svg2 as svg
};
//# sourceMappingURL=sam-mind.js.map
