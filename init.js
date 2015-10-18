define("widgets/storage", [], function() {
        var t, e, n, i, r;
        return t = function() {
            var t, e, n;
            try {
                return e = "localStorage" in window && null !== window.localStorage, n = {
                    k: "test key",
                    v: "test value"
                }, e && (localStorage.setItem(n.k, n.v), e = n.v === localStorage.getItem(n.k)), e
            } catch (i) {
                return t = i, !1
            }
        }(), i = function(t) {
            return _.isString(t) || (t = JSON.stringify(t)), encodeURIComponent(t)
        }, r = function(t) {
            if (!_.isString(t) || "" === t) throw new TypeError("Cookie name must be a non-empty string")
        }, n = t ? localStorage : {
            setItem: function(t, e) {
                var n;
                return r(t), n = new Date(+new Date + 864e5), _.isArray(e) && (e = e[0], n = new Date(parseInt(e[1], 10))), t = i(t), e = i(e), document.cookie = t + "=" + e + "; expires=" + n.toGMTString()
            },
            getItem: function(t) {
                var e, n, o, a;
                return r(t), t = i(t) + "=", a = null, e = document.cookie, o = e.indexOf(t), o > -1 && (n = e.indexOf(";", o), -1 === n && (n = e.length), a = decodeURIComponent(e.substring(o + t.length, n))), a
            }
        }, e = "BMWA:", {
            isSupportLocalStorage: t,
            set: function(t, i, r) {
                return _.isNumber(r) && (r = +new Date + r, i = [i, r]), n.setItem(e + t, JSON.stringify(i))
            },
            get: function(t) {
                var i, r;
                return (r = JSON.parse(n.getItem(e + t))) ? _.isArray(r) ? (i = parseInt(r[1], 10), +new Date < i ? r[0] : void this.remove(t)) : r : void 0
            },
            remove: function(t) {
                return n.removeItem(e + t)
            }
        }
    }), define("util-coffee", [], function() {
        var t;
        return t = function() {
            var t, e;
            return e = win.androidVersion, t = e ? e.substring(0, 3) : 0, +t > 4.4 || 4.4 === +t && e.length > 3 && "4.4.0" !== e ? !0 : !1
        }, {
            callable: t,
            autoPlay: function(t) {
                var e;
                return e = _.utils.queryString(), "true" === e.autoplay ? $(window).one("scroll", _.once(function() {
                    return $(t).eq(0).trigger("click")
                })) : void 0
            },
            initLoadMore: function(t, e, n, i) {
                var r;
                return r = {
                    el: t[0],
                    url: "/loadmore/" + e + "/",
                    data: n,
                    filter: i
                }, require(["mod/base/loadmore"], function(t) {
                    return new t(r)
                })
            },
            initDownloadSongs: function(e, n) {
                var i, r;
                return i = window.multiDownloadRandom || (window.multiDownloadRandom = (3 * Math.random() + 87).toFixed(1)), r = "(" + i + "%çš„ç”¨æˆ·å·²å®‰è£…)", require(["widgets/panel", "widgets/mp-openapp"], function(i, o) {
                    var a, s, u, l;
                    return $.os.ios ? (l = _.map(e, function(t) {
                        return '"' + $(t).data("sid") + '"'
                    }), l.length || retuen(!1), u = {
                        title: "æ‰¹é‡ä¸‹è½½",
                        type: "downloadsongsios",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: window.cfg.iospiliangxiazaiLink,
                            log: {
                                page: "panel",
                                pos: "openapp",
                                sub: "multi_down"
                            },
                            btntext: "æ‰“å¼€å®¢æˆ·ç«¯ä¸‹è½½",
                            recText: r,
                            unsuclog: {
                                act: "down_multi",
                                page: n,
                                type: "callapp",
                                issuc: 0
                            },
                            extra: {
                                nativeUrl: 'baidumusicnew://hybrid?info={"fr":"musicwebapp","action":"download", "args":[' + l.join(",") + '], "callback":""}',
                                specialClass: "smile"
                            }
                        }
                    }, i.show(u), _.utils.log({
                        expoitem: "panel_mult",
                        page: n,
                        type: "exposure"
                    })) : (l = _.map(e, function(t) {
                        return $(t).data("sid")
                    }), l.length || retuen(!1), u = {
                        title: "æ‰¹é‡ä¸‹è½½",
                        type: "sharedownload",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: window.cfg.androidPLDownloadLink,
                            log: {
                                page: n,
                                pos: "openapp",
                                sub: "fcd",
                                caldl: 0
                            },
                            btntext: "ç«‹å³æ‰¹é‡ä¸‹è½½",
                            recText: r,
                            extra: {
                                specialClass: "smile"
                            }
                        }
                    }, s = function() {
                        return t() ? o.openAndroid({
                            type: "downloadNew",
                            data: {
                                songid: _.utils.getNumericSongids(l).join(",")
                            },
                            callback: {
                                success: function() {
                                    return _.utils.log({
                                        page: n,
                                        pos: "openapp",
                                        sub: "multi_down",
                                        caldl: 1
                                    })
                                },
                                error: function() {
                                    return _.utils.log({
                                        page: n,
                                        pos: "openapp",
                                        sub: "multi_down",
                                        caldl: 2
                                    }), i.show(u)
                                }
                            }
                        }) : (_.utils.log({
                            page: n,
                            pos: "openapp",
                            sub: "multi_down",
                            caldl: 2
                        }), i.show(u))
                    }, a = function() {
                        return _.utils.log({
                            page: n,
                            pos: "openapp",
                            sub: "multi_down",
                            caldl: 2
                        }), i.show(u)
                    }, _.utils.checkNative(s, a))
                })
            },
            initDownloadSongHQ: function(e, n) {
                var i, r;
                return i = window.multiDownloadRandom || (window.multiDownloadRandom = (3 * Math.random() + 87).toFixed(1)), r = "(" + i + "%çš„ç”¨æˆ·å·²å®‰è£…)", require(["widgets/panel", "widgets/mp-openapp"], function(i, o) {
                    var a, s, u, l, c;
                    return $.os.ios ? (c = ['"' + e.songId + '"'], c.length || retuen(!1), l = {
                        title: "ä¸‹è½½",
                        type: "downloadsongsios",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: window.cfg.iospiliangxiazaiLink,
                            log: {
                                page: "panel",
                                pos: "openapp",
                                sub: "down"
                            },
                            btntext: "æ‰“å¼€å®¢æˆ·ç«¯ä¸‹è½½",
                            recText: r,
                            unsuclog: {
                                act: "down",
                                page: n,
                                type: "callapp",
                                issuc: 0
                            },
                            extra: {
                                nativeUrl: 'baidumusicnew://hybrid?info={"fr":"musicwebapp","action":"download", "args":[' + c.join(",") + '], "callback":""}',
                                specialClass: "smile"
                            }
                        }
                    }, i.show(l)) : (c = [e.songId], c.length || retuen(!1), a = window.cfg.androidDQDownloadLink, "song" === n && (a = window.cfg.androidSPDownloadLink), l = {
                        title: "ä¸‹è½½",
                        type: "sharedownload",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: a,
                            log: {
                                page: n,
                                pos: "sdl",
                                sub: "fcd",
                                caldl: 0
                            },
                            btntext: "ç«‹å³ä¸‹è½½",
                            recText: r,
                            extra: {
                                specialClass: "smile"
                            }
                        }
                    }, u = function() {
                        return t() ? o.openAndroid({
                            type: "downloadNew",
                            data: {
                                songid: _.utils.getNumericSongids(c).join(",")
                            },
                            callback: {
                                success: function() {
                                    return _.utils.log({
                                        page: n,
                                        pos: "sdl",
                                        caldl: 1
                                    })
                                },
                                error: function() {
                                    return _.utils.log({
                                        page: n,
                                        pos: "sdl",
                                        caldl: 2
                                    }), i.show(l)
                                }
                            }
                        }) : (_.utils.log({
                            page: n,
                            pos: "sdl",
                            caldl: 2
                        }), i.show(l))
                    }, s = function() {
                        return _.utils.log({
                            page: n,
                            pos: "sdl",
                            caldl: 2
                        }), i.show(l)
                    }, _.utils.checkNative(u, s))
                })
            },
            initPlaySongCut: function(e, n) {
                var i, r;
                return i = window.multiDownloadRandom || (window.multiDownloadRandom = (3 * Math.random() + 87).toFixed(1)), r = "(" + i + "%çš„ç”¨æˆ·å·²å®‰è£…)", require(["widgets/panel", "widgets/mp-openapp"], function(i, o) {
                    var a, s, u, l;
                    return $.os.ios ? (l = ['"' + e.songId + '"'], l.length || retuen(!1), u = {
                        title: "è¯•å¬",
                        type: "downloadsongsios",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: window.cfg.iosPlaySongsLink,
                            log: {},
                            btntext: "æ‰“å¼€å®¢æˆ·ç«¯æ’­æ”¾",
                            recText: r,
                            unsuclog: {},
                            extra: {
                                nativeUrl: 'baidumusicnew://hybrid?info={"fr":"musicwebapp","action":"play", "args":{"list":[' + l.join(",") + '], "cur":0}, "callback":""}',
                                specialClass: "smile"
                            }
                        }
                    }, i.show(u), _.utils.log({
                        page: n,
                        type: "callapp",
                        issuc: 0,
                        act: "45auto"
                    })) : (l = [e.songId], l.length || retuen(!1), u = {
                        title: "è¯•å¬",
                        type: "sharedownload",
                        data: {
                            title: "éœ€è¦ç™¾åº¦éŸ³ä¹å®¢æˆ·ç«¯æ”¯æŒ",
                            content: !1,
                            link: window.cfg.androidPlaySongsLink,
                            log: {},
                            btntext: "ç«‹å³ä¸‹è½½",
                            recText: r,
                            extra: {
                                specialClass: "smile"
                            }
                        }
                    }, s = function() {
                        return t() ? o.openAndroid({
                            type: "songNew",
                            data: {
                                songid: _.utils.getNumericSongids(l).join(",")
                            },
                            callback: {
                                success: function() {
                                    return _.utils.log({
                                        page: n,
                                        type: "callapp",
                                        issuc: 1
                                    }), this
                                },
                                error: function() {
                                    return _.utils.log({
                                        page: n,
                                        type: "callapp",
                                        issuc: 0,
                                        act: "45auto"
                                    }), i.show(u)
                                }
                            }
                        }) : (_.utils.log({
                            page: n,
                            type: "callapp",
                            issuc: 0,
                            act: "45auto"
                        }), i.show(u))
                    }, a = function() {
                        return _.utils.log({
                            page: n,
                            type: "callapp",
                            issuc: 0,
                            act: "45auto"
                        }), i.show(u)
                    }, _.utils.checkNative(s, a), _.utils.log({
                        page: n,
                        expoitem: "appdownload"
                    }))
                })
            }
        }
    }), define("utils", ["widgets/storage", "util-coffee"], function(t, e) {
        var n, i, r, o, a, s, u, l, c, p, d;
        return window.storage = t, s = function() {
            var t, e, n, i, r, o;
            for (i = {}, t = location.search.replace(/^\?/, "").split("&"), r = 0, o = t.length; o > r; r++) e = t[r], n = e.split("="), i[n[0]] = n[1] || "";
            return i
        }, a = function(t) {
            return t.os.iphone ? "iphone" : t.os.android ? "android" : "other"
        }($), i = function() {
            return "webapp_" + a + "_" + $.os.version
        }(), u = function(t, e, n) {
            var i, r, o, a;
            null == n && (n = {}), _.isObject(t) && (e = t.data, t = t.method), r = $.Deferred(), i = cfg.apiCode, a = function(t) {
                return cfg.api.replace("{{method}}", t)
            }, o = function(e) {
                return console.error(e, t, " request error @utils.js fn: api"), r.reject(e)
            };
            var s = t.replace("baidu.ting.", "").replace(/\./g, "_");
            return -1 != ["baidu.ting.adv.showlist", "baidu.ting.song.getRecommandSongList", "baidu.ting.search.catalogSug", "baidu.ting.song.lry"].indexOf(t) && (s += "_" + +new Date), "baidu.ting.song.play" === t && (s += "_" + (e.songid || +new Date)), $.ajaxJSONP({
                url: a(t),
                data: e,
                jsonpCallback: s,
                success: function(t) {
                    var e;
                    return e = t.error_code, e ? -1 !== [i.SUCCESS, i.USER_IP_LIMIT, i.SONG_WITHOUT_LINK, i.USER_NOT_LOGIN, i.FAILED, i.USER_NO_ACCESS, i.USER_ACCESS].indexOf(e) ? r.resolve(t) : n.handleError && n.handleError(t) : r.resolve(t)
                },
                error: function(t) {
                    return o.apply(null, t)
                }
            }), r.promise()
        }, l = function() {
            var t, e, n, i;
            return e = $.Deferred(), t = [].concat.apply([], arguments), n = function() {
                var e, n, r;
                for (r = [], e = 0, n = t.length; n > e; e++) i = t[e], r.push(u(i));
                return r
            }(), $.when.apply(null, n).done(function() {
                return e.resolve.apply(e, arguments)
            }), e.promise()
        }, n = function(t) {
            var e;
            return _.isArray(t) ? (e = t, l(e)) : u.apply(null, arguments)
        }, r = function() {
            var t, e;
            return t = $.Deferred(), _.isEmpty(window.__USERINFO) ? (e = function(t) {
                return _.utils.api("baidu.ting.user.getUserBaseInfo", {
                    _r: +new Date
                }).done(function(e) {
                    return _.utils.log({
                        type: "login",
                        level: e.level
                    }), e.errno === cfg.apiCode.SUCCESS ? (window.__USERINFO = e, void t.resolve(!0, e)) : (window.__USERINFO = {}, t.resolve(!1, e))
                })
            }, e(t), t.promise()) : (t.resolve(!0, window.__USERINFO), t.promise())
        }, o = function(t, e) {
            e || (e = "nsclick");
            var n = {
                    nsclick: "http://nsclick.baidu.com/v.gif",
                    pvlog: "http://music.baidu.com/cms/mobile.gif",
                    playlog: "http://log.music.baidu.com/r.gif"
                },
                i = +new Date + parseInt(1e3 * Math.random()),
                r = function(t) {
                    var e = [];
                    for (var n in t) e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                    return e.join("&")
                },
                o = window["img_" + i] = new Image;
            t = _.extend({
                pid: cfg.pid,
                type: "click",
                ref: "webapp",
                os: a,
                v: cfg.version,
                r: i,
                page: app.curRoute,
                page_url: location.href,
                page_refer: document.referrer || "",
                channel: s().fr || ""
            }, t), o.onload = o.onerror = o.onabort = function() {
                o.onload = o.onerror = o.onabort = null, window["img_" + i] = null
            }, o.src = n[e] + "?" + r(t)
        }, add2desk = function() {
            require(["gmu/add2desktop"], function() {
                var e = 864e5;
                return win.navigator.standalone ? void _.utils.log({
                    type: "a2d_start"
                }) : void($.os.ios && $.browser.special.safari && !$.browser.special.qq && (t.get("nf") && !t.get("a2d") ? (_.utils.a2d = $.ui.add2desktop({
                    el: "body",
                    icon: cfg.imgPath + "/ui/add2desktop/icon.png"
                }).show(), t.set("a2d", 1, e), _.utils.log({
                    type: "a2d_show"
                })) : t.set("nf", 9, e)))
            })
        }, c = function(t) {
            if ("undefined" == typeof window.Crc32Table) {
                window.Crc32Table = new Array(256);
                var e, n, i;
                for (e = 0; 256 > e; e++) {
                    for (i = e, n = 0; 8 > n; n++) i = 1 & i ? i >> 1 & 2147483647 ^ 3988292384 : i >> 1 & 2147483647;
                    Crc32Table[e] = i
                }
                for ("string" != typeof t && (t = "" + t), i = 4294967295, e = 0; e < t.length; e++) i = i >> 8 & 16777215 ^ Crc32Table[255 & i ^ t.charCodeAt(e)];
                return i ^= 4294967295
            }
        }, p = function(t, e, n, i) {
            n = n || 31104e7, i = i || "/";
            var r = new Date;
            r.setTime(r.getTime() + n), document.cookie = t + "=" + encodeURIComponent(e) + "; expires=" + r.toUTCString() + "; path=" + i
        }, d = function(t) {
            var e = "(?:; )?" + encodeURIComponent(t) + "=([^;]*);?";
            return e = new RegExp(e), e.test(document.cookie) ? decodeURIComponent(RegExp.$1) : ""
        }, _.extend(e, {
            api: n,
            os: a,
            add2desk: add2desk,
            browserVersion: i,
            log: o,
            checkLogin: r,
            getCrc32: c,
            setCookie: p,
            getCookie: d,
            shareDialog: function(t) {
                var e, n;
                if (!app.shareDialog) return e = app.shareDialog = $.ui.dialog({
                    title: "åˆ†äº«åˆ°",
                    width: 290,
                    closeAction: !1,
                    onclose: t ? t.onclose : void 0
                }), n = $.os.ios ? window.cfg.iosWeixinLink : window.cfg.androidWeixinLink, window.isWeixinEmbedded && (n = window.cfg.nativeYybLink), e.content('<div id="bdshare" class="bdshare_t bds_tools_32 get-codes-bdshare"><span  class="bds-delegate" style="display: block;"><a class="bds_qzone bdslog needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "qqzone"
                }) + '>QQç©ºé—´</a></span><span class="bds-delegate" style="display: block;"><a  href="' + n + '" class="moment ref needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "wxhy"
                }) + '>å¾®ä¿¡æœ‹å‹åœˆ</a></span><span class="bds-delegate" style="display: block;"><a href="' + n + '" class="contact ref needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "wxpyq"
                }) + '>å¾®ä¿¡å¥½å‹</a></span><span  class="bds-delegate" style="display: block;"><a class="bds_tsina bdslog needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "sina"
                }) + '>æ–°æµªå¾®åš</a></span><span  class="bds-delegate" style="display: block;"><a class="bds_tqq bdslog needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "tengxun"
                }) + '>è…¾è®¯å¾®åš</a></span><span  class="bds-delegate" style="display: block;"><a class="bds_renren bdslog needsclick" data-log=' + JSON.stringify({
                    page: "panel",
                    pos: "renren"
                }) + ">äººäººç½‘</a></span></div>"), e.setData = function(t) {
                    var n;
                    if (t) {
                        e.widget().find("#bdshare").attr("data", JSON.stringify(t));
                        var n = t.logMap || {};
                        for (var i in n) n[i] && e.widget().find("." + i).data("log", n[i])
                    }
                    return e
                }, require(["http://bdimg.share.baidu.com/static/js/bds_s_v2.js?version=20130703", "http://bdimg.share.baidu.com/static/js/logger.js"], function() {
                    return e.widget().find(".bds-delegate").bind("click", function(t) {
                        var n = $(t.target).data("log");
                        return _.utils.log(n), ($(t.target).hasClass("contact") || $(t.target).hasClass("moment")) && (location.href = $(t.target).attr("href")), e.hide()
                    })
                })
            },
            deleteRedHeart: function(t) {
                var e, n, i, r, o, a, s;
                return e = $.Deferred(), s = window.cfg.apiCode, a = s.SUCCESS, n = s.SONG_COLLECTED, r = s.USER_COLLECT_FULL, o = s.USER_NOT_LOGIN, i = s.OPERATION_FREQUENT, _.utils.api("baidu.ting.favorite.delCollectSong", {
                    songId: t,
                    _r: +new Date
                }).done(function(n) {
                    switch (n.error_code) {
                        case a:
                            app.userAction.trigger("fav:delete", n, t), e.resolve(!0, "success");
                            break;
                        default:
                            e.resolve(!1, "fail")
                    }
                }).fail(function(t) {
                    switch (t.error_code) {
                        case o:
                            e.resolve(!1, "notlogin");
                            break;
                        default:
                            e.resolve(!1, "unkown")
                    }
                }), e.promise()
            },
            addRedHeart: function(t) {
                var e, n, i, r, o, a, s, u, l;
                return e = $.Deferred(), u = window.cfg.apiCode, a = u.SUCCESS, n = u.SONG_COLLECTED, s = u.USER_NO_ACCESS, r = u.USER_COLLECT_FULL, o = u.USER_NOT_LOGIN, i = u.OPERATION_FREQUENT, l = t.song_id, _.utils.api("baidu.ting.favorite.addSongFavorite", {
                    songId: l,
                    _r: +new Date
                }).done(function(u) {
                    switch (u.error_code) {
                        case a:
                            app.userAction.trigger("fav:add", u, l), e.resolve(!0, "success");
                            break;
                        case n:
                            e.resolve(!1, "duplicated");
                            break;
                        case r:
                            e.resolve(!1, "exceed");
                            break;
                        case o:
                            _.utils.showTips("ç™»å½•åŽæ”¶è—æ­Œæ›²"), setTimeout(function() {
                                return window.location.href = window.cfg.loginURL()
                            }, 1200), e.resolve(!1, "notlogin");
                            break;
                        case s:
                            _.utils.showTips("æ­¤æ­Œæ›²éœ€ä»˜è´¹æ”¶è—"), setTimeout(function() {
                                return window.location.href = window.cfg.sellURL(t.song_id, "cloud")
                            }, 1200), e.resolve(!1, "notbuy");
                            break;
                        case i:
                            e.resolve(!1, "toobusy");
                            break;
                        default:
                            return e.resolve(!1, "unknow")
                    }
                }).fail(function(t) {
                    switch (t.error_code) {
                        case o:
                            e.resolve(!1, "notlogin");
                            break;
                        default:
                            return e.resolve(!1, "error")
                    }
                }), e.promise()
            },
            isRedHearted: function(t) {
                var e;
                return t = [].concat(t), e = $.Deferred(), _.utils.api("baidu.ting.favorite.isCollect", {
                    songId: t.join(","),
                    _r: +new Date
                }).done(function(t) {
                    var n, i, r, o, a, s;
                    switch (s = window.cfg.apiCode, a = s.SUCCESS, n = s.SONG_COLLECTED, r = s.USER_COLLECT_FULL, o = s.USER_NOT_LOGIN, i = s.OPERATION_FREQUENT, t.error_code) {
                        case a:
                            e.resolve(!0, t.result);
                            break;
                        default:
                            return e.resolve(!1)
                    }
                }).fail(function() {
                    return e.resolve(!1)
                }), e.promise()
            },
            getAndroidPage: function() {},
            showTips: function(t) {
                var e;
                return t || (t = ""), e = $('<div class="ui-bubble-tip">' + t + "</div>"), $body.append(e), e.css({
                    marginLeft: -e.width() / 2,
                    marginTop: -e.height() / 2,
                    top: "50%",
                    left: "50%"
                }), setTimeout(function() {
                    e.remove()
                }, 1256)
            },
            duration: function(t) {
                var e, n, i, r;
                return t = Math.ceil(t), e = function(t) {
                    return 10 > t ? "0" + t : t
                }, n = function(t) {
                    return Math.floor(t)
                }, r = function(t) {
                    var i, r;
                    return i = n(t / 60), r = t % 60, e(i) + ":" + e(r)
                }, t ? 60 > t ? "00:" + e(t) : 3600 > t ? r(t) : (i = n(t / 3600), e(i) + ":" + r(t % 3600)) : "00:00"
            },
            fetchTmpl: function(t) {
                var e;
                return e = $.Deferred(), JST[t] ? e.resolve(JST[t], !0) : "development" === MWA.mode ? require(["tpl/" + t], function() {
                    e.resolve(JST[t], !0)
                }) : require(["tpl"], function() {
                    e.resolve(JST[t], !0)
                }), e.promise()
            },
            checkNative: function(t, e) {
                if (!$.os.ios) {
                    if ("function" != typeof t && (t = function() {}), "function" != typeof e && (e = function() {}), win.isNativeInstalled === !1 ? e() : win.isNativeInstalled === !0 && t(), window.call_up_fn_stack) return void call_up_fn_stack.push([t, e]);
                    call_up_fn_stack = [
                        [t, e]
                    ], require(["widgets/mp-openapp"], function(t) {
                        window.nativeAppFun = t, t.apiAvail().done(function(t, e) {
                            if (win.isNativeInstalled = t, win.androidVersion = e, t) {
                                for (; call_up_fn_stack.length > 0;) {
                                    var n = call_up_fn_stack.shift();
                                    n[0](), "development" == MWA.mode && console.log("ok fn called", +new Date)
                                }
                                _.utils.log({
                                    type: "exposure",
                                    page: app.curRoute,
                                    expoitem: "app_check"
                                })
                            } else
                                for (; call_up_fn_stack.length > 0;) {
                                    var n = call_up_fn_stack.shift();
                                    n[1](), "development" == MWA.mode && console.log("fail fn called", +new Date)
                                }
                        })
                    })
                }
            },
            callNativeMV: function(t, e) {
                var n = function() {
                        var n = win.androidVersion,
                            i = n ? n.substring(0, 3) : 0;
                        (+i > 4.4 || 4.4 === +i && n.length > 3 && "4.4.0" != n) && nativeAppFun.openAndroid({
                            type: "mv",
                            data: {
                                type: "mv",
                                mvid: t,
                                mvlist: e.join(",")
                            },
                            callback: {
                                success: function() {
                                    window.video.pause(), _.utils.log({
                                        type: "callapp",
                                        act: "playmv",
                                        issuc: "1"
                                    })
                                },
                                error: function() {}
                            }
                        })
                    },
                    i = function() {};
                if ($.os.ios) {
                    e = _.map(e, function(t) {
                        return t.toString()
                    });
                    var r = {
                            action: "playmv",
                            args: {
                                list: e,
                                cur: _.indexOf(e, t.toString())
                            },
                            callback: ""
                        },
                        o = "baidumusicnew://hybrid?info=" + JSON.stringify(r);
                    this.openios(o)
                } else this.checkNative(n, i)
            },
            getBK: function(t, e) {
                return 1 === app.store.get("c_bi") ? void e.$el.find(".info .content").css("display", "block") : void _.utils.api("baidu.ting.openBaidu.getAccessToken", null).done(function(n) {
                    require(["http://music.baidu.com/cms/webapp/js/access_token.js"], function(i) {
                        var r, o, a;
                        return a = n.result.access_token, r = i.artists, o = e.$el.find(".info .content"), r && !r[t] ? void o.css("display", "block") : $.ajaxJSONP({
                            data: {
                                bk_key: t,
                                bk_length: 150,
                                access_token: a,
                                appid: 921444,
                                bk_category: "æ­Œæ‰‹"
                            },
                            url: "https://openapi.baidu.com/rest/2.0/baike/openapi/BaikeLemmaCardApi?format=jsonp&callback=?&t=" + +new Date,
                            success: function(e) {
                                var n, i, a;
                                return a = {
                                    ext: "bdmusic",
                                    fr: "bdmusic",
                                    sublemmaid: r ? r[t] : ""
                                }, e["abstract"] ? (i = JSON.stringify({
                                    page: "artist",
                                    pos: "singerinfo",
                                    page_url: location.href
                                }), n = $('<p class="abstract">' + e["abstract"] + '</p><a href="' + e.url + "?" + $.param(a) + '" class="ref ref-out log" target="_blank" data-log=' + i + ">åŽ»ç™¾ç§‘æŸ¥çœ‹æ›´å¤š>></a>"), o.html(n), o.css("display", "block")) : (_.utils.log({
                                    type: "baikeError"
                                }), void o.css("display", "block"))
                            }
                        })
                    })
                })
            },
            fetchGuide: function() {
                var t = $.os.ios ? win.cfg.iosLink + "&type=guide" : win.cfg.andriodGuideLink,
                    e = null,
                    n = $('<div id="msk"><div>'),
                    i = function() {
                        var t = $doc.height();
                        _.delay(function() {
                            n.height(t)
                        }, 1500)
                    };
                return i(), require(["http://music.baidu.com/cms/webapp/js/webappGuideNew.js?_r=" + +new Date], function(i) {
                    return n.appendTo($body), i ? (e = $(i), e.click(function(t) {
                        ($(t.target).parent().hasClass("close") || $(t.target).parent().hasClass("skip")) && (e.remove(), n.remove(), _.utils.log({
                            type: "skipGuide",
                            page: "guide"
                        }))
                    }).appendTo($body).show(), e.find(".download").attr("href", t), void _.utils.log({
                        type: "show",
                        page_url: win.location.href,
                        page: "guide"
                    }, {
                        src: "pvlog"
                    })) : void n.remove()
                }), i
            },
            fetchSimpleAd: function(e) {
                var n = $(app.layout),
                    i = n.find(".slot-da1").first(),
                    r = function() {
                        var e = cfg.storages.bannerAd,
                            n = t.get(e.key),
                            r = i.find(".bannerAD").length > 0;
                        return n || r ? !1 : (/bannerad/.test(location.href) && t.set(e.key, 1, e.expires), !0)
                    },
                    o = function(t) {
                        var n, r = $(t),
                            o = $(r[1]),
                            a = $(r[0]),
                            s = app.store,
                            u = "hide-ads",
                            l = $.os.ios ? window.cfg.iosLink + "&type=top" : window.cfg.androidBannerLink + "?type=top";
                        app.$adTmpl = r, i.length && (n = s.get(u) || [], -1 === n.indexOf(e.id) && (a.attr("href", l), o.click(function() {
                            n.push(e.id), s.set(u, JSON.stringify(n)), _.utils.log({
                                page: "ad",
                                pos: "close"
                            })
                        }), r.appendTo(i), i.show()))
                    };
                r() && app.getADKeeper().done(function(t) {
                    var e, n = t["topBanner_" + app.curRoute] || t.topBanner;
                    n && n.pic && (e = '<a class="bannerAD ref log" target="_blank" data-log=' + JSON.stringify({
                        page: app.curRoute,
                        pos: "downapp",
                        sub: 1
                    }) + '><img src="' + n.pic + '"/></a><div class="close"></div>', o(e))
                })
            },
            fetchTextLink: function(t) {
                1 != app.store.get("c_td") && app.getADKeeper().done(function(e) {
                    var n = {
                            link1: e.btmTextLink_01,
                            link2: e.btmTextLink_02,
                            link3: e.btmTextLink_03
                        },
                        i = ["<div class='tl'>", "<% if(app.store.get('c_td') !== 2) { %>", "<a href='<%= link1.url %>' class='ref log item' data-log='<%= JSON.stringify({pos: \"wenzi\", caldl: 0}) %>'><%= link1.text %></a>", "<% } %>", "<% if(app.store.get('c_td') !== 3) { %>", "<div class='ok item'>", "<% if (link3) { %>", "<div class='sc-ctn'>", "<a href='<%= link2.url %>' class='ref ref-out log' data-log='<%= JSON.stringify({pos: \"wenzi2\"}) %>'><%= link2.text %></a>", "<a href='<%= link3.url %>' class='ref ref-out log' data-log='<%= JSON.stringify({pos: \"wenzi3\"}) %>'><%= link3.text %></a>", "<a href='<%= link2.url %>' class='ref ref-out log' data-log='<%= JSON.stringify({pos: \"wenzi2\"}) %>'><%= link2.text %></a>", "</div>", "<% } else { %>", "<div>", "<a href='<%= link2.url %>' class='ref ref-out log' data-log='<% JSON.stringify({pos: \"wenzi2\"}) %>'><%= link2.text %></a>", "</div>", "<% } %>", "</div>", "<% } %>", "</div>"].join(""),
                        r = $(_.template(i)(n));
                    r.insertBefore($("footer", t))
                })
            },
            playList: function(t, e) {
                var n;
                n = app.player;
                var i = [].concat(t);
                e && (i = i.unshift(e)), n.add(t), n.emit("webapp:playList"), app.usePlayer().then(function() {
                    var r = function() {
                        var t = win.androidVersion,
                            e = t ? t.substring(0, 3) : 0;
                        (+e > 4.4 || 4.4 === +e && t.length > 3 && "4.4.0" != t) && nativeAppFun.openAndroid({
                            type: "songNew",
                            data: {
                                songid: _.utils.getNumericSongids(i).join(",")
                            },
                            callback: {
                                success: function() {
                                    app.player.pause(), _.utils.log({
                                        page: app.curRoute,
                                        act: "playall",
                                        type: "callapp",
                                        issuc: 1
                                    })
                                },
                                error: function() {
                                    _.utils.log({
                                        page: app.curRoute,
                                        act: "playall",
                                        type: "callapp",
                                        issuc: 0
                                    })
                                }
                            }
                        })
                    };
                    _.utils.checkNative(r), n.setCur(e || t[0]).play(), app.updatePlayerHeight()
                })
            },
            html2text: function(t) {
                return t && t.replace(/<(?:.|\n)*?>/gm, "") || ""
            },
            getNumericSongids: function(t) {
                var e;
                e = [];
                for (var n = 0; n < t.length; n++) /^[0-9]*$/.test(t[n]) && e.push(t[n] + "");
                return e
            },
            getFormatBitMap: function(t) {
                var e = {
                        24: {
                            min: 1,
                            max: 63
                        },
                        64: {
                            min: 64,
                            max: 127
                        },
                        128: {
                            min: 128,
                            max: 223
                        },
                        320: {
                            min: 224,
                            max: 320
                        }
                    },
                    n = {};
                for (var i in e)
                    for (var r = t.length - 1; r >= 0; r--) {
                        var o = t[r],
                            a = ~~o.file_bitrate;
                        e[i].min <= a && e[i].max >= a && o.file_link && (n[i] = o)
                    }
                return n
            },
            openios: function(t, e) {
                var n, i = document.createElement("iframe"),
                    r = document.body,
                    o = "",
                    a = "",
                    s = function(t, o) {
                        window.removeEventListener("pagehide", s, !0), window.removeEventListener("pageshow", s, !0), void 0 == o && clearTimeout(n), "function" == typeof e && e(o || void 0 === o ? !0 : !1), i && (i.onload = null, r.removeChild(i), i = null)
                    };
                t && (window.addEventListener("pagehide", s, !0), window.addEventListener("pageshow", s, !0), o = +new Date, n = setTimeout(function() {
                    n = setTimeout(function() {
                        a = +new Date, a - o > 1e3 ? s(null, !1) : s(null, !0)
                    }, 900)
                }, 100), parseFloat($.os.version) < 9 ? (i.style.display = "none", i.onload = s, i.src = t, r.appendChild(i)) : location.href = t)
            },
            openadr: function(t, e) {
                var n, i = document.createElement("iframe"),
                    r = document.body,
                    o = "",
                    a = "",
                    s = function(t, o) {
                        window.removeEventListener("pagehide", s, !0), window.removeEventListener("pageshow", s, !0), void 0 == o && clearTimeout(n), "function" == typeof e && e(o ? !0 : !1), i && (i.onload = null, r.removeChild(i), i = null)
                    };
                t && (window.addEventListener("pagehide", s, !0), window.addEventListener("pageshow", s, !0), o = +new Date, n = setTimeout(function() {
                    n = setTimeout(function() {
                        a = +new Date, a - o > 2e3 ? s(null, !1) : s(null, !0)
                    }, 1900)
                }, 100), i.style.display = "none", i.onload = s, i.src = t, r.appendChild(i))
            },
            queryString: function(t) {
                var e = {};
                if (t = void 0 !== t ? t : window.location.search, "string" == typeof t && t.length > 0) {
                    "?" === t[0] && (t = t.substring(1)), t = t.split("&");
                    for (var n = 0, i = t.length; i > n; n++) {
                        var r, o, a = t[n],
                            s = a.indexOf("=");
                        s >= 0 ? (r = a.substr(0, s), o = a.substr(s + 1)) : (r = a, o = ""), o = decodeURIComponent(o), void 0 === e[r] ? e[r] = o : e[r] instanceof Array ? e[r].push(o) : e[r] = [e[r], o]
                    }
                }
                return e
            },
            initModelConfig: function(t) {
                var e = _.utils.queryString(),
                    n = e.fr || "";
                e.fr && /ch_91/.test(e.fr) && (e.fr = "ch_91");
                var i = n.replace("ch_91", "").replace(/[a-z]+=[0-4]/g, function(t) {
                        return t + "&"
                    }),
                    r = this.queryString(i);
                _.extend(e, r), e && (e.tn && t.store.set("c_tn", e.tn), e.bb && t.store.set("c_bb", e.bb), e.bbf && t.store.set("c_bbf", e.bbf), e.pc && t.store.set("c_pc", e.pc), e.mm && t.store.set("c_mm", e.mm), e.lr && t.store.set("c_lr", e.lr), e.lch && t.store.set("c_lch", e.lch), e.noad && t.store.set("noad", 1), e.pa && t.store.set("c_pa", e.pa), e.da && t.store.set("c_da", e.da), e.bd && t.store.set("c_bd", e.bd), e.me && t.store.set("c_me", e.me), e.hd && t.store.set("c_hd", e.hd), e.vd && t.store.set("c_vd", e.vd), e.dsa && t.store.set("c_dsa", e.dsa), e.td && t.store.set("c_td", e.td), e.ta && t.store.set("c_ta", e.ta), e.bi && t.store.set("c_bi", e.bi), e.sl && t.store.set("c_sl", e.sl))
            },
            dealWithModel: function(t) {
                var e = app.store.get,
                    n = (_.utils.os, function(e, n) {
                        n = n || t, $(e, n).hide()
                    });
                1 == e("c_bd") && (n(".downloadSongs,.download-songs"), n(".c_bb_1")), 1 == e("c_lr") && n(".icon-ring,.ring"), 4 == e("c_bd") && n(".c_bb_4"), 2 == e("c_bd") && n(".c_bb_2"), 3 == e("c_bd") && n(".c_bb_3"), 1 == e("c_bbf") && n(".c_bbf_1"), 1 == e("c_pc") && n(".collect", $("#player")), 2 == e("c_mm") && n(".c_mm_2"), 1 == e("c_me") && n(".c_me_1"), e("noad") || n(".da-slot"), e("c_lch") && n(".chorus")
            },
            openIosFunc: function(t, e, n) {
                if ($.os.ios) {
                    var i = $(t.target).data("native") || e || "baidumusic://",
                        r = $(t.target).data("cb") || n,
                        o = $(t.target).data("log"),
                        a = $(t.target).data("unsuclog");
                    _.utils.openios(i, function(t) {
                        t || (window.isWeixinEmbedded && (r = window.cfg.nativeYybLink), _.utils.log(a), window.location = r)
                    }), _.utils.log(o)
                }
            },
            openAdrFunc: function(t, e, n) {
                if (!$.os.ios) {
                    var i = $(t.target).data("native") || $(t.target).parent().data("native") || e || "baidumusic://",
                        r = $(t.target).data("cb") || $(t.target).parent().data("cb") || n,
                        o = $(t.target).data("log") || $(t.target).parent().data("log"),
                        a = $(t.target).data("unsuclog") || $(t.target).parent().data("unsuclog");
                    _.utils.openadr(i, function(t) {
                        t || (window.isWeixinEmbedded && (r = window.cfg.nativeYybLink), _.utils.log(a), window.location = r)
                    }), _.utils.log(o)
                }
            },
            openAdrLink: function(t, e, n, i) {
                $.os.ios || (_.utils.openadr(t, function(t) {
                    t || (window.isWeixinEmbedded && (cblink = window.cfg.nativeYybLink), _.utils.log(i), e.apply(this))
                }), _.utils.log(n))
            },
            hmLog: function() {
                window._hmt && _hmt && _hmt.push(["_trackPageview", "/" + location.hash])
            },
            redirectInstall: function(t) {
                var e;
                switch (t) {
                    case "install_mvtop":
                        e = $.os.ios ? window.cfg.iosMVLink : window.cfg.androidMVLink;
                        break;
                    case "install_mvend":
                        e = $.os.ios ? window.cfg.iosMVLink : window.cfg.androidMVendLink;
                        break;
                    case "install_homeslider":
                        e = $.os.ios ? window.cfg.iosSliderLink : window.cfg.androidSliderLink;
                        break;
                    default:
                        e = $.os.ios ? window.cfg.iosLink : window.cfg.androidLink
                }
                window.isWeixinEmbedded && (e = window.cfg.nativeYybLink), e || (e = $.os.ios ? window.cfg.iosLink : window.cfg.androidLink), location.href = e
            },
            originAndroidBrowser: function() {
                if (!$.os.android) return !1;
                var t = navigator.userAgent,
                    e = t.match(/QQBrowser\/([\d.]+)/),
                    n = t.match(/UCBrowser\/([\d.]+)/);
                return e || n || $.browser.chrome ? !1 : !0
            },
            fetchView: function(t, e) {
                var n = $.Deferred();
                return $.ajax({
                    url: "/view/" + t,
                    data: e,
                    success: function(t) {
                        200 !== t.err_code ? n.reject() : n.resolve(t)
                    },
                    error: function() {
                        n.reject()
                    }
                }), n.promise()
            },
            openInWeixin: function() {
                return /MicroMessenger/i.test(window.navigator.userAgent)
            }(),
            getImgPath: function(t) {
                var e = MWA.cdn_host + "/img/";
                return e + (MWA.imgHashMap[t] || t)
            }
        })
    }), define("lazyload", [], function() {
        var t = $(window),
            e = 0,
            n = 0,
            i = 0,
            r = 0,
            o = null,
            a = function() {
                function s(t) {
                    return "object" == typeof t && t && t.constructor == String || "string" == typeof t
                }

                function u(t) {
                    var e = t.offset();
                    return {
                        top: e.top,
                        left: e.left
                    }
                }

                function l(t) {
                    return {
                        height: t.css("height").replace("px", ""),
                        width: t.css("width").replace("px", "")
                    }
                }

                function c(t) {
                    return "item-" + t
                }

                function p(t) {
                    for (var e = t.checkfunc, n = t.renderfunc, i = t.content, r = 0; r < i.length; r++) {
                        for (var o = !0, a = 0; a < e.length; a++) {
                            var s = e[a];
                            if (!s(i[r])) {
                                o = !1;
                                break
                            }
                        }
                        if (o) {
                            for (var u = 0; u < n.length; u++) {
                                var s = n[u];
                                s(i[r])
                            }
                            t.content.splice(r, 1), r--
                        }
                    }
                }

                function d(t) {
                    for (var e = t.renderfunc, n = t.content, i = null, r = k = 0; k < n.length; k++) {
                        for (; r < e.length; r++)(i = e[r])(n[k]);
                        t.content.splice(k, 1), k--
                    }
                }
                var f = "org_src",
                    h = {
                        diff: 0
                    },
                    g = 0,
                    m = {},
                    y = {
                        "default": function(t) {
                            var o, a;
                            if (t.ifcache !== !1) o = t.position.top, a = t.position.left;
                            else {
                                var s = t.element.offset();
                                o = s.top, a = s.left
                            }
                            if (0 == o && 0 == a) return !1;
                            var u = parseFloat(o - h.diff) <= parseFloat(e + i),
                                l = parseFloat(e) <= parseFloat(o + t.hw.height + h.diff),
                                c = parseFloat(a - h.diff) <= parseFloat(n + r),
                                p = parseFloat(n) <= parseFloat(a + t.hw.width + h.diff);
                            return u && l && c && p ? !0 : !1
                        }
                    },
                    v = {
                        "default": function(t) {
                            var e = t.element.attr(f);
                            t.element.attr("src", e)
                        }
                    };
                return {
                    resetHeight: 0,
                    add: function(t, e) {
                        function n(t, e, i) {
                            if ($.isArray(t))
                                for (var r = 0; r < t.length; r++) {
                                    var o = t[r];
                                    n(o, e, i)
                                } else $.isFunction(t) ? e.push(t) : s(t) && i[t] && e.push(i[t])
                        }
                        var i, r, o, p = [],
                            d = [],
                            f = [];
                        if (i = t instanceof $ ? t : $(t), r = i.length, !(r > 0)) return -1;
                        for (var h = 0; r > h; h++) {
                            var _ = $(i[h]),
                                b = {
                                    top: 0,
                                    left: 0
                                },
                                w = !0,
                                T = l(_);
                            e && e.ifcache === !1 ? w = !1 : (b = u(_), w = !0), p.push({
                                element: _,
                                position: b,
                                ifcache: w,
                                hw: T
                            })
                        }
                        e && e.checkfunc || d.push(y["default"]), e && e.renderfunc || f.push(v["default"]), e && (n(e.checkfunc, d, y), n(e.renderfunc, f, v)), o = c(++g), m[o] = {
                            content: p,
                            checkfunc: d,
                            renderfunc: f
                        };
                        var S = function(t) {
                            setTimeout(function() {
                                a.check(t)
                            }, 100)
                        };
                        return S(g), g
                    },
                    check: function(a) {
                        function s() {
                            o = null;
                            for (var t in m) l = m[t], p(l)
                        }
                        var u, l;
                        e = t[0].scrollY, n = t[0].scrollX, i = t[0].innerHeight, r = t[0].innerWidth, null === o && (arguments.length > 0 ? (u = c(a), l = m[u], p(l)) : o = setTimeout(s, 50))
                    },
                    load: function(t) {
                        var e, n;
                        if (t) e = c(t), n = m[e], d(n);
                        else
                            for (var i in m) n = m[i], d(n)
                    },
                    remove: function(t) {
                        if (t) {
                            var e = c(t);
                            try {
                                delete m[e]
                            } catch (n) {
                                return !1
                            }
                            return !0
                        }
                        return m = {}, !0
                    }
                }
            }();
        return t.bind("resize", function() {
            setTimeout(function() {
                a.check()
            }, 100)
        }), $(window).bind("scroll", function() {
            setTimeout(function() {
                a.check()
            }, 300)
        }), a
    }), define("router", ["utils"], function(t) {
        var e, n, i;
        return i = {
            "": "home",
            home: "home",
            fm: "fm",
            "/:id": "song",
            "song/:id": "song",
            "song/s/:idx": "songidx",
            "songs/:category": "songs",
            "song/:id/download": "download",
            "artists/:area/:sex": "artists",
            "artists/:other/": "artists",
            artists: "artists",
            artist: "artistclass",
            "top/artist": "artistclass",
            "artist/:id": "artist",
            "artist/:id/:name": "artist",
            listcate: "listcate",
            mv: "mvs",
            "playmv/:mv_id": "playmv",
            "mv/:song_id": "mv",
            "topic/:uid": "topic",
            "topic/:type/:uid": "topic",
            tags: "tags",
            "tag/:name": "tag",
            rings: "rings",
            "ring/:id": "ring",
            "album/:id": "album",
            "film/:id": "film",
            product: "product",
            feedback: "feedback",
            "share/:id": "share",
            songlists: "songlists",
            "songlist/:id": "songlist",
            mysongs: "mysongs",
            "collect/:list_id": "collect",
            ucenter: "ucenter",
            "search/:query": "search",
            search: "search",
            s: "search"
        }, e = Backbone.Router.extend({
            routes: function(t) {
                var e, n;
                for (n in t) "*actions" !== n && (e = /\/$/.test(n) ? n.replace(/\/$/, "") : n + "/"), !(e in t) && (t[e] = t[n]);
                return t["*actions"] = "notFound", t
            }(i),
            home: function() {
                return t.getAndroidPage({
                    page: "home",
                    id: 0,
                    info: ""
                }), app.use({
                    name: "home",
                    js: ["mod/home/index"],
                    el: elMain
                }), $(window).trigger("resize"), $(window).trigger("orientationchange")
            },
            fm: function() {
                return app.use({
                    name: "fm",
                    js: ["mod/fm"],
                    el: elMain
                })
            },
            artistclass: function() {
                return app.use({
                    name: "artist",
                    js: ["mod/artistclass"],
                    el: elMain
                })
            },
            listcate: function() {
                return app.use({
                    name: "listcate",
                    js: ["mod/listcate"],
                    el: elMain
                })
            },
            tags: function() {
                return app.use({
                    name: "tags",
                    el: elMain
                })
            },
            feedback: function() {
                return app.use({
                    name: "feedback",
                    el: elMain,
                    js: ["mod/feedback"]
                })
            },
            product: function() {
                return app.use({
                    name: "product",
                    el: elMain
                })
            },
            songs: function(t) {
                var e;
                return e = t, app.use({
                    name: "/songs/" + e,
                    el: elMain,
                    js: ["mod/songs"]
                })
            },
            tag: function(t) {
                return t = encodeURIComponent(t), app.use({
                    name: "/tag/" + t + "/",
                    js: ["mod/tag"],
                    el: elMain
                }, t)
            },
            songlists: function() {
                return app.use({
                    name: "songlists",
                    js: ["mod/songlists"],
                    el: elMain
                })
            },
            songlist: function(t) {
                return app.use({
                    name: "songlist/" + t,
                    js: ["mod/songlist/index"],
                    el: elMain
                })
            },
            album: function(t) {
                return app.use({
                    name: "/album/" + t,
                    el: elMain,
                    js: ["mod/album"]
                })
            },
            film: function(t) {
                return app.use({
                    name: "/film/" + t,
                    el: elMain,
                    js: ["mod/album/index"]
                })
            },
            topic: function(t) {
                return app.use({
                    name: "/topic/" + t,
                    js: ["mod/topic"],
                    el: elMain
                })
            },
            artist: function(t, e) {
                return app.use({
                    name: e ? "/artist/" + t + "/" + e : "/artist/" + t,
                    el: elMain,
                    js: ["mod/artist/index"]
                }, t)
            },
            share: function(t) {
                return app.use({
                    name: "share",
                    el: elMain,
                    js: ["mod/share/module/share"]
                }, t)
            },
            ucenter: function() {
                return app.use({
                    name: "ucenter",
                    el: elMain,
                    js: ["mod/ucenter"]
                })
            },
            mysongs: function() {
                return app.use({
                    name: "mysongs",
                    el: elMain,
                    js: ["mod/mysongs"]
                })
            },
            collect: function(t) {
                return app.use({
                    name: "/collect/" + t,
                    el: elMain,
                    js: ["mod/collect"]
                }, t)
            },
            song: function(t) {
                var e;
                return /^\d+$/.test(t) ? (e = arguments, bigpipe._partial = !0, require(["mod/song/index"], function(t) {
                    return t.initialize.apply(null, e)
                })) : this.notFound()
            },
            songidx: function(t) {
                var e;
                return /^\w+$/.test(t) ? (t = n(t), e = arguments, bigpipe._partial = !0, require(["mod/song/index"], function(t) {
                    return t.initialize.apply(null, e)
                })) : this.notFound()
            },
            artists: function(t, e) {
                var n, i;
                return t || (t = "all"), e || (e = "other"), n = {
                    all: 0,
                    cn: 6,
                    west: 3,
                    jpkr: 4,
                    jp: 60,
                    kr: 7,
                    other: 5
                }, i = {
                    male: 1,
                    female: 2,
                    group: 3,
                    other: 0
                }, app.use({
                    name: "/artists/" + t + "/" + e + "/",
                    el: elMain,
                    js: ["mod/artists"]
                }, {
                    area: n[t],
                    sex: i[e]
                })
            },
            rings: function() {
                return app.use({
                    name: "rings",
                    el: elMain,
                    js: ["mod/rings"]
                })
            },
            ring: function(t) {
                return t = encodeURIComponent(t), app.use({
                    name: "/ring/" + t + "/",
                    js: ["mod/ring/index"],
                    el: elMain
                }, t)
            },
            mvs: function() {
                return app.use({
                    name: "mv",
                    el: elMain,
                    js: ["mod/mvs"]
                })
            },
            mv: function(t) {
                var e;
                return app.MV_Visited && (e = $(".layout.mv").get(0)), app.use({
                    name: "mv/" + t,
                    el: elMain,
                    js: ["mod/mv/index"]
                }, [t, e, "mv"]), app.MV_Visited || (app.MV_Visited = !0)
            },
            playmv: function(t) {
                var e;
                return app.MV_Visited && (e = $(".layout.mv").get(0)), app.use({
                    name: "playmv/" + t,
                    el: elMain,
                    js: ["mod/mv/index"]
                }, [t, e, "playmv"]), app.MV_Visited || (app.MV_Visited = !0)
            },
            download: function(t) {
                return app.use({
                    name: "song/" + t + "/download",
                    el: elMain,
                    js: []
                }, t)
            },
            search: function(e) {
                var n;
                return n = t.queryString(), e = e || n.key || n.word || "", app.use({
                    name: "search/" + e,
                    el: elMain,
                    js: ["mod/search"]
                }, e)
            },
            notFound: function() {
                return app.use({
                    name: "404",
                    el: elMain,
                    js: []
                })
            }
        }, n = function(t) {
            var e, n, i, r, o, a;
            return r = ~~t.substr(2, 2), i = t.substr(4, r), r !== i.length ? 0 : (a = t.substr(r + 4, 2), o = t.substr(r + 6), "0" === a.substr(0, 1) && (a = a.substr(1, 1)), a = ~~a, a !== o.length ? 0 : (e = parseInt(i, 16), n = ~~t.substr(0, 2), e % 99 !== n ? 0 : e))
        })
    }),
    function(t) {
        var e = Object.prototype,
            n = e.toString;
        t.isString = function(t) {
            return "[object String]" === n.call(t)
        }, t.isNumeric = function(t) {
            return "[object Number]" === n.call(t)
        }, t.getScript = function(e, n) {
            var i = document,
                r = i.createElement("script");
            r.async = "async", n ? t.isFunction(n) && (n = {
                callback: n
            }) : n = {}, n.charset && (r.charset = n.charset), r.src = e;
            var o = i.getElementsByTagName("head")[0];
            r.onload = r.onreadystatechange = function(t, e) {
                (e || !r.readyState || /loaded|complete/.test(r.readyState)) && (r.onload = r.onreadystatechange = null, o && r.parentNode && o.removeChild(r), r = void 0, !e && n.callback && n.callback())
            }, o.insertBefore(r, o.firstChild)
        }
    }(Zepto),
    function(t, e) {
        return "undefined" == typeof t._mu && (t._mu = {}), "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/cfg", e) : t._mu.cfg = e()
    }(this, function() {
        var t;
        return t = this, $.extend({
            namespace: t._mu,
            version: "1.0.0",
            timerResolution: 25,
            cdn: "http://apps.bdimg.com/libs/muplayer/",
            engine: {
                TYPES: {
                    FLASH_MP3: "FlashMP3Core",
                    FLASH_MP4: "FlashMP4Core",
                    AUDIO: "AudioCore"
                },
                EVENTS: {
                    STATECHANGE: "engine:statechange",
                    POSITIONCHANGE: "engine:postionchange",
                    PROGRESS: "engine:progress",
                    ERROR: "engine:error",
                    INIT: "engine:init",
                    INIT_FAIL: "engine:init_fail",
                    WAITING_TIMEOUT: "engine:waiting_timeout"
                },
                STATES: {
                    CANPLAYTHROUGH: "canplaythrough",
                    PREBUFFER: "waiting",
                    BUFFERING: "loadeddata",
                    PLAYING: "playing",
                    PAUSE: "pause",
                    STOP: "suspend",
                    END: "ended"
                },
                ERRCODE: {
                    MEDIA_ERR_ABORTED: "1",
                    MEDIA_ERR_NETWORK: "2",
                    MEDIA_ERR_DECODE: "3",
                    MEDIA_ERR_SRC_NOT_SUPPORTED: "4"
                }
            }
        }, "undefined" == typeof t._mu ? {} : t._mu.cfg)
    }),
    function(t, e) {
        return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/bmCfg", ["muplayer/core/cfg"], e) : t._mu.bmCfg = e(_mu.cfg)
    }(this, function(t) {
        return $.extend(t, {
            apiHost: "http://tingapi.ting.baidu.com/v1/restserver/ting?method={{method}}&format=jsonp&callback=?",
            apiCode: {
                SUCCESS: 22e3,
                FAILED: 22001
            },
            ad: {
                listenType: {
                    artist: 1,
                    album: 2,
                    playlist: 3,
                    toplist: 4,
                    topic: 5,
                    scene: 6,
                    fm: 7,
                    templist: 8,
                    first: 9
                },
                STATES: {
                    ENABLE: "enable",
                    DISABLE: "disable"
                },
                EVENTS: {
                    CHECK: "ad:check",
                    MATERIAL: "ad:material",
                    EFFECTIVE_PLAY: "ad:effective-play"
                }
            }
        })
    }),
    function(t, e) {
        return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/utils", ["muplayer/core/cfg"], e) : t._mu.utils = e(t._mu.cfg)
    }(this, function(t) {
        var e, n, i, r, o, a, s, u, l, c, p, d, f, h, g, m, y;
        for (y = {}, r = String.prototype, n = Number.prototype, i = Object.prototype, e = Array.prototype, f = e.push, g = e.slice, m = i.toString, u = i.hasOwnProperty, d = Object.create, s = /\.(\w+)(\?.*)?$/, h = ["Arguments", "Function", "String", "Number", "Date", "RegExp"], l = 0, c = h.length; c > l; l++) p = h[l], y["is" + p] = function(t) {
            return function(e) {
                return m.call(e) === "[object " + t + "]"
            }
        }(p);
        return $.isFunction(r.startsWith) || (r.startsWith = function(t) {
            return this.slice(0, t.length) === t
        }), $.isFunction(r.endsWith) || (r.endsWith = function(t) {
            return this.slice(-t.length) === t
        }), n.toFixed = function(t) {
            var e, n, i;
            if (i = Math.pow(10, t), e = (Math.round(this * i) / i).toString(), 0 === t) return e;
            for (e.indexOf(".") < 0 && (e += "."), n = t + 1 - (e.length - e.indexOf(".")); n--;) e += "0";
            return e
        }, o = function(t) {
            var e;
            return $.isPlainObject(t) ? d ? d(t) : (Ctor.prototype = t, e = new Ctor, Ctor.prototype = null, e) : {}
        }, a = function(t, e, n, i, r) {
            var a, s;
            return i instanceof e ? (s = o(t.prototype), a = t.apply(s, r), $.isPlainObject(a) ? a : s) : t.apply(n, r)
        }, $.extend(y, {
            isBoolean: function(t) {
                return t === !0 || t === !1 || "[object Boolean]" === m.call(t)
            },
            has: function(t, e) {
                return u.call(t, e)
            },
            random: function(t, e) {
                return e || (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
            },
            shuffle: function(t) {
                var e, n, i, r, o, a;
                for (e = 0, a = [], i = 0, r = t.length; r > i; i++) n = t[i], o = this.random(e++), a[e - 1] = a[o], a[o] = n;
                return a
            },
            time2str: function(t) {
                var e, n, i, r, o, a;
                return o = [], e = Math.floor, t = Math.round(t), n = e(t / 3600), i = e((t - 3600 * n) / 60), a = t % 60, r = function(t, e) {
                    var n, i, r;
                    return i = "", n = "", 0 > t && (n = "-"), r = String(Math.abs(t)), r.length < e && (i = new Array(e - r.length + 1).join("0")), n + i + r
                }, n && o.push(n), o.push(r(i, 2)), o.push(r(a, 2)), o.join(":")
            },
            namespace: function() {
                var e, n, i, r, o, a, s, u, l, c;
                for (e = arguments, l = ".", o = 0, s = e.length; s > o; o++)
                    if (n = e[o], u = t.namespace, n.indexOf(l) > -1)
                        for (i = n.split(l), c = [0, i.length], r = c[0], a = c[1]; a > r;) u[i[r]] = u[i[r]] || {}, u = u[i[r]], r++;
                    else u[n] = u[n] || {}, u = u[n];
                return u
            },
            partial: function(t) {
                var e, n;
                return n = g.call(arguments, 1), e = function() {
                    var i, r, o, s;
                    for (s = 0, o = n.length, i = Array(o), r = 0; o > r;) i[r] = n[r] === y ? arguments[s++] : n[r], r++;
                    for (; s < arguments.length;) i.push(arguments[s++]);
                    return a(t, e, this, this, i)
                }
            },
            wrap: function(t, e) {
                return y.partial(e, t)
            },
            toAbsoluteUrl: function(t) {
                var e;
                return e = document.createElement("div"), e.innerHTML = "<a></a>", e.firstChild.href = t, e.innerHTML = e.innerHTML, e.firstChild.href
            },
            getExt: function(t) {
                var e;
                return e = "", s.test(decodeURIComponent(t)) && (e = RegExp.$1.toLocaleLowerCase()), e
            }
        }), y
    }),
    function(t, e) {
        return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/bmUtils", ["muplayer/core/utils", "muplayer/core/bmCfg"], e) : t._mu.bmUtils = e(_mu.utils, _mu.bmCfg)
    }(this, function(t, e) {
        var n;
        return n = e.apiCode, $.extend(t, {
            api: function(t, i, r) {
                var o, a, s, u, l;
                return o = $.Deferred(), a = {
                    type: "GET",
                    dataType: "json",
                    handleError: function() {}
                }, $.isPlainObject(t) && (r = i, i = t.data, t = t.url), u = $.extend(a, r), null == i && (i = {}), s = function(t) {
                    return (u.apiHost || e.apiHost).replace("{{method}}", t)
                }, t = s(t), l = t + "?" + $.param(i), $.ajax({
                    url: t,
                    data: i,
                    dataType: u.dataType,
                    type: u.type,
                    success: function(t, e, i) {
                        var r, a;
                        return r = t.error_code, r === n.SUCCESS ? o.resolve(t) : (a = {
                            xhr: i,
                            requestUrl: l,
                            code: r
                        }, o.reject(a), u.handleError(a))
                    },
                    error: function(t) {
                        var e;
                        return e = {
                            xhr: t,
                            requestUrl: l
                        }, o.reject(e), u.handleError(e)
                    }
                }), o.promise()
            },
            clone: function(t) {
                return !$.isPlainObject(t), $.isArray(t) ? t.slice() : $.extend({}, t)
            },
            object: function(t, e) {
                var n, i, r, o, a;
                if (!t) return {};
                for (a = {}, n = r = 0, o = t.length; o > r; n = ++r) i = t[n], e ? a[i] = e[n] : a[i[0]] = i[1];
                return a
            },
            capitalize: function(t) {
                return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()
            },
            getQueryParams: function(t) {
                var e, n, i, r;
                for (null == t && (t = location.search || ""), n = {}, e = decodeURIComponent, t = t.split("+").join(" "), i = /[?&]?([^=]+)=([^&]*)/g; r = i.exec(t);) n[e(r[1])] = e(r[2]);
                return n
            }
        })
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/lib/Timer", e) : t._mu.Timer = e()
    }(this, function() {
        function t(t) {
            if ("string" == typeof t) {
                isNaN(parseInt(t, 10)) && (t = "1" + t);
                var e = t.replace(/[^a-z0-9\.]/g, "").match(/(?:(\d+(?:\.\d+)?)(?:days?|d))?(?:(\d+(?:\.\d+)?)(?:hours?|hrs?|h))?(?:(\d+(?:\.\d+)?)(?:minutes?|mins?|m\b))?(?:(\d+(?:\.\d+)?)(?:seconds?|secs?|s))?(?:(\d+(?:\.\d+)?)(?:milliseconds?|ms))?/);
                if (e[0]) return 864e5 * parseFloat(e[1] || 0) + 36e5 * parseFloat(e[2] || 0) + 6e4 * parseFloat(e[3] || 0) + 1e3 * parseFloat(e[4] || 0) + parseInt(e[5] || 0, 10);
                if (!isNaN(parseInt(t, 10))) return parseInt(t, 10)
            }
            return "number" == typeof t ? t : 0
        }

        function e(t, e) {
            return parseInt(t / e, 10) || 1
        }

        function n(e) {
            return this instanceof n == !1 ? new n(e) : (this._notifications = [], this._resolution = t(e) || 1e3, this._running = !1, this._ticks = 0, this._timer = null, void(this._drift = 0))
        }
        return n.prototype = {
            start: function() {
                var t = this;
                return this._running || (this._running = !this._running, setTimeout(function e() {
                    t._ticks++;
                    for (var n = 0, i = t._notifications.length; i > n; n++) t._notifications[n] && t._ticks % t._notifications[n].ticks === 0 && t._notifications[n].callback.call(t._notifications[n], {
                        ticks: t._ticks,
                        resolution: t._resolution
                    });
                    t._running && (clearTimeout(t._timer), t._timer = setTimeout(e, t._resolution + t._drift), t._drift = 0)
                }, this._resolution)), this
            },
            stop: function() {
                return this._running && (this._running = !this._running, clearTimeout(this._timer)), this
            },
            reset: function() {
                return this.stop(), this._ticks = 0, this
            },
            clear: function() {
                return this.reset(), this._notifications = [], this
            },
            ticks: function() {
                return this._ticks
            },
            resolution: function() {
                return this._resolution
            },
            running: function() {
                return this._running
            },
            bind: function(n, i) {
                if (n && i) {
                    var r = e(t(n), this._resolution);
                    this._notifications.push({
                        ticks: r,
                        callback: i
                    })
                }
                return this
            },
            unbind: function(t) {
                if (t)
                    for (var e = 0, n = this._notifications.length; n > e; e++) this._notifications[e] && this._notifications[e].callback === t && this._notifications.splice(e, 1);
                else this._notifications = [];
                return this
            },
            drift: function(t) {
                return this._drift = t, this
            }
        }, n.prototype.every = n.prototype.bind, n.prototype.after = function(t, e) {
            var i = this;
            return n.prototype.bind.call(i, t, function r() {
                n.prototype.unbind.call(i, r), e.apply(this, arguments)
            }), this
        }, n
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/lib/events", e) : t._mu.Events = e()
    }(this, function() {
        function t() {}

        function e(t, e, n) {
            if (t) {
                var i = 0,
                    r = t.length,
                    o = e[0],
                    a = e[1],
                    s = e[2],
                    u = !0;
                switch (e.length) {
                    case 0:
                        for (; r > i; i += 2) u = t[i].call(t[i + 1] || n) !== !1 && u;
                        break;
                    case 1:
                        for (; r > i; i += 2) u = t[i].call(t[i + 1] || n, o) !== !1 && u;
                        break;
                    case 2:
                        for (; r > i; i += 2) u = t[i].call(t[i + 1] || n, o, a) !== !1 && u;
                        break;
                    case 3:
                        for (; r > i; i += 2) u = t[i].call(t[i + 1] || n, o, a, s) !== !1 && u;
                        break;
                    default:
                        for (; r > i; i += 2) u = t[i].apply(t[i + 1] || n, e) !== !1 && u
                }
            }
            return u
        }

        function n(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }
        var i = /\s+/;
        t.prototype.on = function(t, e, n) {
            var r, o, a;
            if (!e) return this;
            for (r = this.__events || (this.__events = {}), t = t.split(i); o = t.shift();) a = r[o] || (r[o] = []), a.push(e, n);
            return this
        }, t.prototype.once = function(t, e, n) {
            var i = this,
                r = function() {
                    i.off(t, r), e.apply(this, arguments)
                };
            this.on(t, r, n)
        }, t.prototype.off = function(t, e, n) {
            var o, a, s, u;
            if (!(o = this.__events)) return this;
            if (!(t || e || n)) return delete this.__events, this;
            for (t = t ? t.split(i) : r(o); a = t.shift();)
                if (s = o[a])
                    if (e || n)
                        for (u = s.length - 2; u >= 0; u -= 2) e && "" + s[u] != "" + e || n && s[u + 1] !== n || s.splice(u, 2);
                    else delete o[a];
            return this
        }, t.prototype.trigger = function(t) {
            var n, r, o, a, s, u, l = [],
                c = !0;
            if (!(n = this.__events)) return this;
            for (t = t.split(i), s = 1, u = arguments.length; u > s; s++) l[s - 1] = arguments[s];
            for (; r = t.shift();)(o = n.all) && (o = o.slice()), (a = n[r]) && (a = a.slice()), c = e(a, l, this) && c, c = e(o, [r].concat(l), this) && c;
            return c
        }, t.prototype.emit = t.prototype.trigger, t.mixTo = function(e) {
            e = n(e) ? e.prototype : e;
            var i = t.prototype;
            for (var r in i) i.hasOwnProperty(r) && (e[r] = i[r])
        };
        var r = Object.keys;
        return r || (r = function(t) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            return e
        }), t
    });
var indexOf = [].indexOf || function(t) {
    for (var e = 0, n = this.length; n > e; e++)
        if (e in this && this[e] === t) return e;
    return -1
};
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/playlist", ["muplayer/core/utils", "muplayer/lib/events"], e) : t._mu.Playlist = e(_mu.utils, _mu.Events)
}(this, function(t, e) {
    var n;
    return n = function() {
        function e(t) {
            this.opts = $.extend({}, this.defaults, t), this.reset()
        }
        return e.prototype.reset = function() {
            return this.cur = "", $.isArray(this.list) ? this.list.length = 0 : this.list = [], this
        }, e.prototype.destroy = function() {
            return this.reset().off()
        }, e.prototype._resetListRandom = function(e) {
            var n;
            return "list-random" === this.mode ? (e = e || 0, this._listRandomIndex = e, this._listRandom = t.shuffle(function() {
                n = [];
                for (var t = 0, e = this.list.length; e >= 0 ? e > t : t > e; e >= 0 ? t++ : t--) n.push(t);
                return n
            }.apply(this)), this.cur = this.list[this._listRandom[e]], this.trigger("playlist:resetListRandom")) : void 0
        }, e.prototype._formatSid = function(e) {
            var n, i, r;
            return n = this.opts.absoluteUrl, i = function(e) {
                return n && t.toAbsoluteUrl(e) || "" + e
            }, $.isArray(e) && function() {
                var t, n, o;
                for (o = [], t = 0, n = e.length; n > t; t++) r = e[t], r && o.push(i(r));
                return o
            }() || i(e)
        }, e.prototype.setMode = function(t) {
            return ("single" === t || "random" === t || "list-random" === t || "list" === t || "loop" === t) && (this.mode = t), this._resetListRandom()
        }, e.prototype.add = function(t, e) {
            return null == e && (e = !0), t = this._formatSid(t), this.remove(t), $.isArray(t) ? t.length && (this.list = e && t.concat(this.list) || this.list.concat(t)) : t && this.list[e && "unshift" || "push"](t), this.trigger("playlist:add", t), this._resetListRandom()
        }, e.prototype.remove = function(t) {
            var e, n, i, r;
            if (r = function(t) {
                    return function(e) {
                        var n;
                        return n = $.inArray(e, t.list), -1 !== n ? t.list.splice(n, 1) : void 0
                    }
                }(this), t = this._formatSid(t), $.isArray(t))
                for (n = 0, i = t.length; i > n; n++) e = t[n], r(e);
            else r(t);
            return this.trigger("playlist:remove", t), this._resetListRandom()
        }, e.prototype.prev = function() {
            var e, n, i, r;
            switch (i = this.list, e = $.inArray(this.cur, i), -1 === e && (e = 0), n = i.length, r = e - 1, this.mode) {
                case "single":
                    r = e;
                    break;
                case "random":
                    r = t.random(0, n - 1);
                    break;
                case "list":
                    if (e = 0) return this.cur = "", !1;
                    break;
                case "list-random":
                    return e = this._listRandomIndex--, r = e - 1, 0 === e && (r = n - 1, this._resetListRandom(r)), this.cur = i[this._listRandom[r]];
                case "loop":
                    0 === e && (r = n - 1)
            }
            return this.cur = i[r]
        }, e.prototype.next = function() {
            var e, n, i, r;
            switch (i = this.list, e = $.inArray(this.cur, i), -1 === e && (e = 0), n = i.length, r = e + 1, this.mode) {
                case "single":
                    r = e;
                    break;
                case "random":
                    r = t.random(0, n - 1);
                    break;
                case "list":
                    if (e === n - 1) return this.cur = "", !1;
                    break;
                case "list-random":
                    return e = this._listRandomIndex++, r = e + 1, e === n - 1 && (r = 0, this._resetListRandom(r)), this.cur = i[this._listRandom[r]];
                case "loop":
                    e === n - 1 && (r = 0)
            }
            return this.cur = i[r]
        }, e.prototype.setCur = function(t) {
            return t = this._formatSid(t), indexOf.call(this.list, t) < 0 && this.add(t), this.cur = t
        }, e
    }(), e.mixTo(n), n
});
var indexOf = [].indexOf || function(t) {
    for (var e = 0, n = this.length; n > e; e++)
        if (e in this && this[e] === t) return e;
    return -1
};
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/engines/engineCore", ["muplayer/core/cfg", "muplayer/core/utils", "muplayer/lib/events"], e) : t._mu.EngineCore = e(_mu.cfg, _mu.utils, _mu.Events)
}(this, function(t, e, n) {
    var i, r, o, a, s, u, l;
    return u = t.engine, i = u.EVENTS, o = u.STATES, a = function() {
        var t;
        t = [];
        for (s in o) l = o[s], t.push(l);
        return t
    }(), r = function() {
        function t() {}
        return t.prototype._supportedTypes = [], t.prototype.getSupportedTypes = function() {
            return this._supportedTypes
        }, t.prototype.canPlayType = function(t) {
            return "mp4a" === t && (t = "m4a"), -1 !== $.inArray(t, this.getSupportedTypes())
        }, t.prototype.reset = function() {
            return this.stop(), this._url = "", this._canPlayThrough = !1, this.trigger(i.PROGRESS, 0), this.trigger(i.POSITIONCHANGE, 0), this
        }, t.prototype.destroy = function() {
            return this.reset().off()
        }, t.prototype.play = function() {
            return this
        }, t.prototype.pause = function() {
            return this
        }, t.prototype.stop = function() {
            return this
        }, t.prototype.setUrl = function(t) {
            return t && (this._url = t), this
        }, t.prototype.getUrl = function() {
            return this._url
        }, t.prototype.setState = function(t) {
            var e;
            return this.getUrl() || (t = o.STOP), indexOf.call(a, t) < 0 || t === this._state || this._canPlayThrough && (t === o.PREBUFFER || t === o.BUFFERING) ? void 0 : (e = this._state, this._state = t, this.trigger(i.STATECHANGE, {
                oldState: e,
                newState: t
            }))
        }, t.prototype.getState = function() {
            return this._state
        }, t.prototype.setVolume = function(t) {
            return this._volume = t, this
        }, t.prototype.getVolume = function() {
            return this._volume
        }, t.prototype.setMute = function(t) {
            return this._mute = t, this
        }, t.prototype.getMute = function() {
            return this._mute
        }, t.prototype.setCurrentPosition = function() {
            return this
        }, t.prototype.getCurrentPosition = function() {
            return 0
        }, t.prototype.getLoadedPercent = function() {
            return 0
        }, t.prototype.getTotalTime = function() {
            return 0
        }, t
    }(), n.mixTo(r), r
}),
function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/lib/modernizr.audio", e) : t._mu.Modernizr = e()
}(this, function() {
    return function(t, e, n) {
        function i(t) {
            f.cssText = t
        }

        function r(t, e) {
            return typeof t === e
        }
        var o, a, s, u = "2.7.1",
            l = {},
            c = e.documentElement,
            p = "modernizr",
            d = e.createElement(p),
            f = d.style,
            h = ({}.toString, {}),
            g = [],
            m = g.slice,
            y = {}.hasOwnProperty;
        s = r(y, "undefined") || r(y.call, "undefined") ? function(t, e) {
            return e in t && r(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return y.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var n = m.call(arguments, 1),
                i = function() {
                    if (this instanceof i) {
                        var r = function() {};
                        r.prototype = e.prototype;
                        var o = new r,
                            a = e.apply(o, n.concat(m.call(arguments)));
                        return Object(a) === a ? a : o
                    }
                    return e.apply(t, n.concat(m.call(arguments)))
                };
            return i
        }), h.audio = function() {
            var t = e.createElement("audio"),
                n = !1;
            try {
                (n = !!t.canPlayType) && (n = new Boolean(n), n.ogg = t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (i) {}
            return n
        };
        for (var v in h) s(h, v) && (a = v.toLowerCase(), l[a] = h[v](), g.push((l[a] ? "" : "no-") + a));
        return l.addTest = function(t, e) {
            if ("object" == typeof t)
                for (var i in t) s(t, i) && l.addTest(i, t[i]);
            else {
                if (t = t.toLowerCase(), l[t] !== n) return l;
                e = "function" == typeof e ? e() : e, "undefined" != typeof enableClasses && enableClasses && (c.className += " " + (e ? "" : "no-") + t), l[t] = e
            }
            return l
        }, i(""), d = o = null, l._version = u, l
    }(this, this.document)
});
var bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    extend = function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var i in e) hasProp.call(e, i) && (t[i] = e[i]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/engines/audioCore", ["muplayer/core/cfg", "muplayer/core/utils", "muplayer/core/engines/engineCore", "muplayer/lib/modernizr.audio"], e) : t._mu.AudioCore = e(_mu.cfg, _mu.utils, _mu.EngineCore, _mu.Modernizr)
}(this, function(t, e, n, i) {
    var r, o, a, s, u, l, c, p;
    return p = window, c = navigator.userAgent, l = t.engine, u = l.TYPES, a = l.EVENTS, s = l.STATES, o = l.ERRCODE, r = function(t) {
        function n(t) {
            this._playEmpty = bind(this._playEmpty, this);
            var e, r, o, a, u, l, c;
            if (this.opts = $.extend({}, n.defaults, t), this.opts.emptyMP3 = this.opts.baseDir + this.opts.emptyMP3, l = this.opts, u = {
                    "": 0,
                    maybe: 1,
                    probably: 2
                }, a = u[l.confidence], r = i.audio, !r) return this;
            for (o in r) c = r[o], u[c] >= a && this._supportedTypes.push(o);
            e = {}, r = new Audio, r.preload = l.preload, r.autoplay = l.autoplay, r.loop = !1, r.on = function(t, n) {
                var i;
                return r.addEventListener(t, n, !1), i = e[t], i || (i = []), i.push(n), r
            }, r.off = function(t, n) {
                var i, o, a;
                if (t || n) r.removeEventListener(t, n, !1);
                else
                    for (t in e)
                        for (a = e[t], i = 0, o = a.length; o > i; i++) n = a[i], r.removeEventListener(t, n, !1);
                return r
            }, this.audio = r, this._needCanPlay(["setCurrentPosition"]), this.setState(s.STOP)._initEvents(), l.needPlayEmpty && p.addEventListener("touchstart", this._playEmpty, !1)
        }
        return extend(n, t), n.defaults = {
            confidence: "maybe",
            preload: !1,
            autoplay: !1,
            needPlayEmpty: !0,
            emptyMP3: "empty.mp3"
        }, n.prototype._supportedTypes = [], n.prototype.engineType = u.AUDIO, n.prototype._test = function() {
            return i.audio && this._supportedTypes.length ? !0 : !1
        }, n.prototype._playEmpty = function() {
            return this.getUrl() || this.setUrl(this.opts.emptyMP3).play(), p.removeEventListener("touchstart", this._playEmpty, !1)
        }, n.prototype._isEmpty = function() {
            return this.getUrl() === this.opts.emptyMP3
        }, n.prototype._initEvents = function() {
            var t, e, n, i, r, o, u;
            return o = this, t = this.audio, u = this.trigger, r = [null, null], e = r[0], i = r[1], this.trigger = function(t, e) {
                return o._isEmpty() ? o : u.call(o, t, e)
            }, n = function(t) {
                return t = t || o.getLoadedPercent(), o.trigger(a.PROGRESS, t), 1 === t ? (clearInterval(i), o._canPlayThrough = !0, o.setState(s.CANPLAYTHROUGH)) : void 0
            }, t.on("loadstart", function() {
                return clearInterval(i), i = setInterval(function() {
                    return n()
                }, 50), o.setState(s.PREBUFFER)
            }).on("playing", function() {
                return clearTimeout(e), o.setState(s.PLAYING)
            }).on("ended", function() {
                return o.setState(s.END)
            }).on("error", function(t) {
                return clearTimeout(e), e = setTimeout(function() {
                    return o.trigger(a.ERROR, t)
                }, 2e3)
            }).on("waiting", function() {
                return o.setState(s.PREBUFFER)
            }).on("loadeddata", function() {
                return o.setState(s.BUFFERING)
            }).on("timeupdate", function() {
                return o.trigger(a.POSITIONCHANGE, o.getCurrentPosition())
            }).on("progress", function(t) {
                var e, r;
                return clearInterval(i), o._canPlayThrough ? void 0 : (e = t.loaded || 0, r = t.total || 1, n(e && 1 * (e / r).toFixed(2)))
            }).on("play", function() {
                return this.autoplay = !1
            })
        }, n.prototype._needCanPlay = function(t) {
            var n, i, r, o, a, s;
            for (s = this, n = this.audio, a = [], i = 0, r = t.length; r > i; i++) o = t[i], a.push(this[o] = e.wrap(this[o], function() {
                var t, e, i, r;
                return e = arguments[0], t = 2 <= arguments.length ? slice.call(arguments, 1) : [], r = null, i = function() {
                    return clearTimeout(r), e.apply(s, t), n.off("canplay", i)
                }, /webkit/.test(c.toLowerCase()) ? n.readyState < 3 ? n.on("canplay", i) : e.apply(s, t) : (r = setTimeout(function() {
                    var r;
                    try {
                        return e.apply(s, t)
                    } catch (o) {
                        return r = o, "undefined" != typeof console && null !== console && "function" == typeof console.error ? console.error("error: ", r) : void 0
                    } finally {
                        n.off("canplay", i)
                    }
                }, 1e3), n.on("canplay", i)), s
            }));
            return a
        }, n.prototype.destroy = function() {
            return n.__super__.destroy.call(this), this.audio.off(), this
        }, n.prototype.play = function() {
            return this.audio.autoplay = !0, this.audio.play(), this
        }, n.prototype.aaa = function() {
            return this.audio.autoplay = !0, this.audio.play(), this
        }, n.prototype.pause = function() {
            return this.audio.pause()
        }, n.prototype.stop = function() {
            try {
                return this.audio.currentTime = 0
            } catch (t) {} finally {
                this.audio.pause()
            }
        }, n.prototype.setUrl = function(t) {
            return t && (this.audio.src = t, this.audio.load()), n.__super__.setUrl.call(this, t)
        }, n.prototype.setVolume = function(t) {
            return this.audio.volume = t / 100, n.__super__.setVolume.call(this, t)
        }, n.prototype.setMute = function(t) {
            return this.audio.muted = t, n.__super__.setMute.call(this, t)
        }, n.prototype.setState = function(t) {
            return this._isEmpty() ? this : n.__super__.setState.call(this, t)
        }, n.prototype.setCurrentPosition = function(t) {
            try {
                this.audio.currentTime = t / 1e3
            } catch (e) {
                return
            } finally {
                this.play()
            }
            return this
        }, n.prototype.getCurrentPosition = function() {
            return ~~(1e3 * this.audio.currentTime)
        }, n.prototype.getLoadedPercent = function() {
            var t, e, n, i, r, o;
            if (t = this.audio, e = t.currentTime, i = t.buffered)
                for (n = i.length; n--;)
                    if (i.start(n) <= (o = t.currentTime) && o <= i.end(n)) {
                        e = i.end(n);
                        break
                    }
            return r = this.getTotalTime() / 1e3, e = e > r ? r : e, r && 1 * (e / r).toFixed(2) || 0
        }, n.prototype.getTotalTime = function() {
            var t, e, n, i, r;
            return r = this.audio, i = r.duration, e = r.buffered, n = r.currentTime, i = ~~i, 0 === i && e && (t = e.length, i = t > 0 ? e.end(--t) : n), i && 1e3 * i || 0
        }, n
    }(n)
}),
function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/engines/engine", ["muplayer/core/cfg", "muplayer/core/utils", "muplayer/lib/events", "muplayer/core/engines/engineCore", "muplayer/core/engines/audioCore"], e) : t._mu.Engine = e(_mu.cfg, _mu.utils, _mu.Events, _mu.EngineCore, _mu.AudioCore)
}(this, function(cfg, utils, Events, EngineCore, AudioCore, FlashMP3Core, FlashMP4Core) {
    var EVENTS, Engine, STATES, ref, timerResolution;
    return ref = cfg.engine, EVENTS = ref.EVENTS, STATES = ref.STATES, timerResolution = cfg.timerResolution, Engine = function() {
        function Engine(t) {
            this.opts = $.extend({}, this.defaults, t), this._initEngines()
        }
        return Engine.el = '<div id="muplayer_container_{{DATETIME}}" style="width: 1px; height: 1px; background: transparent; position: absolute; left: 0; top: 0;"></div>', Engine.prototype.defaults = {
            engines: [{
                type: AudioCore
            }]
        }, Engine.prototype._initEngines = function() {
            var $el, args, engine, i, j, len, opts, ref1, type;
            for (this.engines = [], opts = this.opts, this.$el = $el = $(Engine.el.replace(/{{DATETIME}}/g, +new Date)).appendTo("body"), this._lastE = {}, ref1 = opts.engines, i = j = 0, len = ref1.length; len > j; i = ++j) {
                engine = ref1[i], type = engine.type, args = engine.args, args = args || {}, args.baseDir = opts.baseDir, args.$el = $el;
                try {
                    $.isFunction(type) || (type = eval(type)), engine = new type(args)
                } catch (_error) {
                    throw new Error("Missing engine type: " + String(engine.type))
                }
                engine._test && engine._test() && this.engines.push(engine)
            }
            return this.setEngine(this.engines.length ? this.engines[0] : new EngineCore)
        }, Engine.prototype.setEngine = function(t) {
            var e, n, i, r, o, a, s, u;
            return a = this, s = function(t) {
                var e, n, i;
                return e = a._lastE, n = t.newState, i = t.oldState, i !== e.oldState || n !== e.newState ? (a._lastE = {
                    oldState: i,
                    newState: n
                }, a.trigger(EVENTS.STATECHANGE, t), n !== STATES.CANPLAYTHROUGH || i !== STATES.PLAYING && i !== STATES.PAUSE && i !== STATES.STOP ? void 0 : a.setState(i)) : void 0
            }, r = function(t) {
                return a.trigger(EVENTS.POSITIONCHANGE, t)
            }, o = function(t) {
                return a.trigger(EVENTS.PROGRESS, t)
            }, n = function(t) {
                return a.trigger(EVENTS.ERROR, t)
            }, e = function(t) {
                return t.on(EVENTS.STATECHANGE, s).on(EVENTS.POSITIONCHANGE, r).on(EVENTS.PROGRESS, o).on(EVENTS.ERROR, n)
            }, u = function(t) {
                return t.off(EVENTS.STATECHANGE, s).off(EVENTS.POSITIONCHANGE, r).off(EVENTS.PROGRESS, o).off(EVENTS.ERROR, n)
            }, this.curEngine ? this.curEngine !== t ? (i = this.curEngine, u(i).reset(), this.curEngine = e(t), this.curEngine.setVolume(i.getVolume()).setMute(i.getMute())) : void 0 : this.curEngine = e(t)
        }, Engine.prototype.canPlayType = function(t) {
            return "mp4a" === t && (t = "m4a"), -1 !== $.inArray(t, this.getSupportedTypes())
        }, Engine.prototype.getSupportedTypes = function() {
            var t, e, n, i, r;
            for (r = [], i = this.engines, e = 0, n = i.length; n > e; e++) t = i[e], r = r.concat(t.getSupportedTypes());
            return r
        }, Engine.prototype.switchEngineByType = function(t) {
            var e, n, i, r, o;
            for (r = !1, o = this.engines, n = 0, i = o.length; i > n; n++)
                if (e = o[n], e.canPlayType(t)) {
                    this.setEngine(e), r = !0;
                    break
                }
            return r ? void 0 : this.setEngine(this.engines[0])
        }, Engine.prototype.reset = function() {
            return this.curEngine.reset(), this
        }, Engine.prototype.destroy = function() {
            var t, e, n, i;
            for (this.reset().off(), i = this.engines, e = 0, n = i.length; n > e; e++) t = i[e], t.destroy();
            return this.engines.length = 0, this.$el.off().remove(), delete this.curEngine, this
        }, Engine.prototype.setUrl = function(t) {
            var e;
            if (!t) return this;
            if (e = utils.getExt(t), !this.canPlayType(e)) throw new Error("Can not play with: " + e);
            return this.curEngine.canPlayType(e) || this.switchEngineByType(e), this.curEngine.reset().setUrl(t), this
        }, Engine.prototype.getUrl = function() {
            return this.curEngine.getUrl()
        }, Engine.prototype.play = function() {
            return this.curEngine.aaa(), this
        }, Engine.prototype.pause = function() {
            return this.curEngine.pause(), this.trigger(EVENTS.POSITIONCHANGE, this.getCurrentPosition()), this.setState(STATES.PAUSE)
        }, Engine.prototype.stop = function() {
            return this.curEngine.stop(), this.trigger(EVENTS.POSITIONCHANGE, 0), this.setState(STATES.STOP)
        }, Engine.prototype.setState = function(t) {
            return this.curEngine.setState(t), this
        }, Engine.prototype.getState = function() {
            return this.curEngine.getState()
        }, Engine.prototype.setMute = function(t) {
            return this.curEngine.setMute(!!t), this
        }, Engine.prototype.getMute = function() {
            return this.curEngine.getMute()
        }, Engine.prototype.setVolume = function(t) {
            return $.isNumeric(t) && t >= 0 && 100 >= t && this.curEngine.setVolume(t), this
        }, Engine.prototype.getVolume = function() {
            return this.curEngine.getVolume()
        }, Engine.prototype.setCurrentPosition = function(t) {
            return t = ~~t, this.curEngine.setCurrentPosition(t), this
        }, Engine.prototype.getCurrentPosition = function() {
            return this.getState() === STATES.STOP && this.setCurrentPosition(0), this.curEngine.getCurrentPosition()
        }, Engine.prototype.getLoadedPercent = function() {
            return this.curEngine.getLoadedPercent()
        }, Engine.prototype.getTotalTime = function() {
            return this.curEngine.getTotalTime()
        }, Engine.prototype.getEngineType = function() {
            return this.curEngine.engineType
        }, Engine
    }(), Events.mixTo(Engine), Engine
});
var slice = [].slice;
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/player", ["muplayer/core/cfg", "muplayer/core/utils", "muplayer/lib/Timer", "muplayer/lib/events", "muplayer/core/playlist", "muplayer/core/engines/engine"], e) : t._mu.Player = e(_mu.cfg, _mu.utils, _mu.Timer, _mu.Events, _mu.Playlist, _mu.Engine)
}(this, function(t, e, n, i, r, o) {
    var a, s, u, l, c, p;
    return c = t.engine, a = c.EVENTS, u = c.STATES, p = e.time2str, l = function(t, e) {
        var n, i;
        return "prev" !== t && "next" !== t ? this : (i = function(n) {
            return function() {
                var i;
                return i = {
                    cur: n.getCur()
                }, e && (i.auto = e), n.trigger("player:" + t, i), n.stop(!1).play()
            }
        }(this), this.getSongsNum() && (n = this.playlist, n.cur ? n[t].call(n, e) ? i() : this.trigger("player:" + t + ":fail", e) : i()), this)
    }, s = function() {
        function i(t) {
            var e, a;
            if (this.opts = a = $.extend({}, i.defaults, t), this.waitingTimer = new n(100), this._checkFrozen(["play", "pause", "stop", "next", "prev", "retry", "replay", "setVolume", "setMute", "setUrl", "setCurrentPosition", "_startWaitingTimer"]), e = a.baseDir, e === !1) e = "";
            else if (!e) throw new Error("baseDir must be set! Usually, it should point to the MuPlayer's dist directory.");
            if (e && !e.endsWith("/") && (e += "/"), a.singleton) {
                if (s) return s;
                s = this
            }
            this.playlist = new r({
                absoluteUrl: a.absoluteUrl
            }), this.playlist.setMode(a.mode), this._initEngine(new o({
                baseDir: e,
                engines: a.engines
            })), this.setMute(a.mute), this.setVolume(a.volume), this.reset()
        }
        var s;
        return s = null, i.defaults = {
            baseDir: "" + t.cdn + t.version,
            mode: "loop",
            mute: !1,
            volume: 80,
            singleton: !0,
            absoluteUrl: !0,
            maxRetryTimes: 1,
            maxWaitingTime: 4,
            recoverMethod: "retry",
            fetch: function() {
                var t, e;
                return e = $.Deferred(), t = this.getCur(), setTimeout(function(n) {
                    return function() {
                        return n.setUrl(t), e.resolve()
                    }
                }(this), 0), e.promise()
            }
        }, i.prototype._initEngine = function(t) {
            var e, n;
            return n = this, e = this.opts.recoverMethod, this.engine = t, this.engine.on(a.STATECHANGE, function(t) {
                var e;
                return e = t.newState, n.trigger("player:statechange", t), n.trigger(e), e === u.END ? n._clearWaitingTimer().next(!0) : void 0
            }).on(a.POSITIONCHANGE, function(t) {
                var e;
                return (t = ~~t) ? (e = n.getState(), !n.getUrl() || e !== u.PLAYING && e !== u.PREBUFFER && e !== u.BUFFERING && e !== u.CANPLAYTHROUGH ? void 0 : (n.trigger("timeupdate", t), n._startWaitingTimer())) : void 0
            }).on(a.PROGRESS, function(t) {
                return n.trigger("progress", t)
            }).on(a.ERROR, function(t) {
                return n.getUrl() ? ("undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("error: ", t), n.trigger("error", t)) : void 0
            }).on(a.WAITING_TIMEOUT, function() {
                return "AudioCore" === n.getEngineType() && n.engine.curEngine._isEmpty() || !n.getUrl() ? void 0 : (("retry" === e || "next" === e) && n[e](), n.trigger("player:waiting_timeout"))
            })
        }, i.prototype.retry = function() {
            var t, e, n;
            return this._retryTimes++ < this.opts.maxRetryTimes ? (this._startWaitingTimer().trigger("player:retry", this._retryTimes), t = this.engine, n = this.getUrl(), e = t.getCurrentPosition(), this.pause().once("timeupdate", function() {
                return t.setCurrentPosition(e)
            }), t.setUrl(n).play()) : (this._retryTimes = 0, this.trigger("player:retry:max")), this
        }, i.prototype.play = function(t) {
            var e, n, i, r, o;
            return r = this, n = this.engine, e = $.Deferred(), i = function() {
                return r._frozen || (r._startWaitingTimer(), r.getUrl() && (n.play(), $.isNumeric(t) && n.setCurrentPosition(t))), e.resolve()
            }, o = this.getState(), o === u.STOP || o === u.END ? (this.trigger("player:fetch:start"), this.opts.fetch.call(this).done(function() {
                return i(), r.trigger("player:fetch:done")
            }).fail(function(t) {
                return r.trigger("player:fetch:fail", t)
            })) : i(), r.trigger("player:play", t), e.promise()
        }, i.prototype.pause = function(t) {
            return null == t && (t = !0), this.engine.pause(), this._clearWaitingTimer(), t && this.trigger("player:pause"), this
        }, i.prototype.stop = function(t) {
            return null == t && (t = !0), this.engine.stop(), this._clearWaitingTimer(), t && this.trigger("player:stop"), this
        }, i.prototype.replay = function() {
            return this.pause(!1).play(0), this
        }, i.prototype.prev = function() {
            return l.apply(this, ["prev"])
        }, i.prototype.next = function(t) {
            return l.apply(this, ["next", t])
        }, i.prototype.getCur = function() {
            var t, e;
            return e = this.playlist, t = e.cur, !t && this.getSongsNum() && (e.cur = t = e.list[0]), this._sid = "" + t
        }, i.prototype.setCur = function(t) {
            var e;
            return t = "" + t, e = this.playlist, !t && this.getSongsNum() && (t = e.list[0]), t && this._sid !== t && (e.setCur(t), this._sid = t, this.stop(!1)), this.trigger("player:setCur", t), this
        }, i.prototype.curPos = function(t) {
            var e;
            return e = this.engine.getCurrentPosition() / 1e3, t ? p(e) : e
        }, i.prototype.duration = function(t) {
            var e;
            return e = this.engine.getTotalTime() / 1e3, t ? p(e) : e
        }, i.prototype.add = function(t, e) {
            return null == e && (e = !0), t && this.playlist.add(t, e), this.trigger("player:add", t), this
        }, i.prototype.remove = function(t) {
            return t && this.playlist.remove(t), this.getSongsNum() || this.reset(), this.trigger("player:remove", t), this
        }, i.prototype.reset = function() {
            return delete this._sid, this._retryTimes = 0, this.playlist.reset(), this.engine.reset(), this.trigger("player:reset"), this.stop(!1)
        }, i.prototype.destroy = function() {
            return this.reset().off(), this.engine.destroy(), this.playlist.destroy(), s = null, this
        }, i.prototype.getState = function() {
            return this.engine.getState()
        }, i.prototype.setUrl = function(t) {
            return t ? (this.stop(!1).engine.setUrl(t), this.trigger("player:setUrl", t), this) : this
        }, i.prototype.getUrl = function() {
            return this.engine.getUrl()
        }, i.prototype.getExt = function() {
            return e.getExt(this.getUrl())
        }, i.prototype.setVolume = function(t) {
            return this.engine.setVolume(t), this.trigger("player:setVolume", t), this
        }, i.prototype.getVolume = function() {
            return this.engine.getVolume()
        }, i.prototype.setMute = function(t) {
            return this.engine.setMute(t), this.trigger("player:setMute", t), this
        }, i.prototype.getMute = function() {
            return this.engine.getMute()
        }, i.prototype.canPlayType = function(t) {
            return this.engine.canPlayType(t)
        }, i.prototype.getSongsNum = function() {
            return this.playlist.list.length
        }, i.prototype.setMode = function(t) {
            return this.playlist.setMode(t), this.trigger("player:setMode", t), this
        }, i.prototype.getMode = function() {
            return this.playlist.mode
        }, i.prototype.getEngineType = function() {
            return this.engine.curEngine.engineType
        }, i.prototype.setFrozen = function(t) {
            return this._frozen = !!t, this
        }, i.prototype.cheatPlayer = function() {
            return "AudioCore" === this.getEngineType() && this.engine.curEngine._playEmpty(), this
        }, i.prototype._checkFrozen = function(t) {
            var n, i, r, o, a;
            for (a = this, o = [], n = 0, i = t.length; i > n; n++) r = t[n], o.push(a[r] = e.wrap(a[r], function() {
                var t, e;
                return e = arguments[0], t = 2 <= arguments.length ? slice.call(arguments, 1) : [], a._frozen || e.apply(a, t), a
            }));
            return o
        }, i.prototype._startWaitingTimer = function() {
            var t;
            return t = this.opts.maxWaitingTime, t > 0 && this.waitingTimer.clear().after(t + " seconds", function(t) {
                return function() {
                    return t.engine.trigger(a.WAITING_TIMEOUT)
                }
            }(this)).start(), this
        }, i.prototype._clearWaitingTimer = function() {
            return this.waitingTimer.clear(), this
        }, i
    }(), i.mixTo(s), s
});
var bind = function(t, e) {
    return function() {
        return t.apply(e, arguments)
    }
};
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/bmLogger", ["muplayer/core/bmCfg", "muplayer/core/bmUtils", "muplayer/lib/Timer", "muplayer/lib/events"], e) : t._mu.BmLogger = e(_mu.bmCfg, _mu.bmUtils, _mu.Timer, _mu.Events)
}(this, function(t, e, n, i) {
    var r, o, a, s, u;
    return u = t.timerResolution, s = t.engine, a = s.STATES, n.prototype.time = function() {
        return this.ticks() * this.resolution()
    }, r = $(window), o = function() {
        function t(e, i) {
            this.sendPlayEnd = bind(this.sendPlayEnd, this), this.send60s = bind(this.send60s, this), this.send100ms = bind(this.send100ms, this), this.sendPlayStart = bind(this.sendPlayStart, this);
            var r, o;
            this.opts = r = $.extend({}, t.defaults, i), this.player = e, this._data = $.extend({
                UA: encodeURIComponent(navigator.userAgent)
            }, r.data), o = $.os, o && (this._data.os = o.iphone ? "iphone" : o.android ? "android" : "other"), this.timer = new n(u), this.bufferTimer = new n(u), this._initListeners()
        }
        return t.defaults = {
            debug: !1
        }, t.prototype.reset = function() {
            return this._hasSendPlayEnd = !1, this._data = $.extend(this._data, {
                timestamp: "13_" + Math.random().toString().substr(2),
                flag: 1,
                buffct: 0,
                from: location.href
            }), this.timer.clear(), this.bufferTimer.clear(), this.player.once("timeupdate", function(t) {
                return function() {
                    return t.send100ms()
                }
            }(this)), this
        }, t.prototype._initListeners = function() {
            var t;
            return t = this, r.on("beforeunload", function() {
                return void t.sendPlayEnd({
                    endflag: 2
                })
            }), this.player.on("player:fetchstart", function() {
                return t.reset(), t.timer.after("59 seconds", t.send60s).start()
            }).on("player:fetchend", function() {
                return t._data.s2l = t.timer.time(), t.sendPlayStart()
            }).on("player:fetcherr", function(e) {
                return t.sendPlayEnd({
                    flag: 0,
                    lerr: e.error_code
                })
            }).on("player:next", function(e) {
                return e.auto ? void 0 : t.sendPlayEnd({
                    endflag: 0
                })
            }).on("player:setCur", function() {
                return t.sendPlayEnd({
                    endflag: 0
                })
            }).on("player:retry:max error", function() {
                return t.sendPlayEnd({
                    flag: 2
                })
            }).on(a.PLAYING, function() {
                return t.timer.start(), t.bufferTimer.stop()
            }).on(a.PAUSE, function() {
                return t.timer.stop()
            }).on(a.END, function() {
                return t.sendPlayEnd()
            }).on(a.PREBUFFER, function() {
                return t.player.curPos() && t._data.buffct++, t.bufferTimer.start()
            })
        }, t.prototype._send = function(t, n) {
            var i, r, o, a;
            a = $.extend({
                src: "http://nsclick.baidu.com/v.gif",
                key: "_data"
            }, n), t = $.extend(e.clone(this[a.key]), t), this.opts.debug && "undefined" != typeof console && null !== console && "function" == typeof console.debug && console.debug(t.type, t, this.player.getCur());
            try {
                o = new Image, o.src = a.src + "?" + $.param(t)
            } catch (s) {
                r = s, "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error(r)
            }
            return i = this["_cb_" + t.type], i && i.call(this, t), this
        }, t.prototype.sendPlayStart = function() {
            var t, n, i;
            return n = this.player, i = n.getCur(), t = e.getExt(n.getUrl()), $.extend(this._data, {
                sid: i,
                songfrom: $.isNumeric(+i) ? "owner" : "thirdParty",
                fileid: n._curSong.bitrate.song_file_id,
                source_type: t
            }), this._send({
                type: "playstart"
            })
        }, t.prototype.send100ms = function() {
            return $.extend(this._data, {
                l2p: this.bufferTimer.time(),
                s2p: this.timer.time()
            }), this.bufferTimer.clear(), this._send({
                type: "playsong100ms"
            })
        }, t.prototype.send60s = function() {
            this.trigger("log:send60s");
            var t, e, n, i;
            return t = {
                type: "60play"
            }, i = this.player, n = ~~i._curSong.bitrate.file_duration, e = i.duration(), n && Math.abs(e - n) > 10 && (t.duration = e), this._send(t)
        }, t.prototype.sendPlayEnd = function(t) {
            return this._hasSendPlayEnd ? void 0 : (this._hasSendPlayEnd = !0, this._send($.extend({
                type: "playend",
                endflag: 1,
                s2e: this.timer.time(),
                pos: 1e3 * this.player.curPos()
            }, t)))
        }, t
    }(), i.mixTo(o), o
});
var bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    extend = function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var i in e) hasProp.call(e, i) && (t[i] = e[i]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    },
    hasProp = {}.hasOwnProperty;
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/bmAdLogger", ["muplayer/core/bmCfg", "muplayer/core/bmUtils", "muplayer/lib/Timer", "muplayer/lib/events", "muplayer/core/bmLogger"], e) : t._mu.BmAdLogger = e(_mu.bmCfg, _mu.bmUtils, _mu.Timer, _mu.Events, _mu.BmLogger)
}(this, function(t, e, n, i, r) {
    var o, a, s, u, l, c, p;
    return p = t.timerResolution, c = t.engine, u = c.STATES, a = t.ad.STATES, n.prototype.time = function() {
        return this.ticks() * this.resolution()
    }, l = function() {
        return "13_" + Math.random().toString().substr(2)
    }, o = $(window), s = function(t) {
        function i(t, r) {
            this.sendPlayEnd = bind(this.sendPlayEnd, this), this.send100ms = bind(this.send100ms, this), this.sendPlayStart = bind(this.sendPlayStart, this), this.sendLoadMatieral = bind(this.sendLoadMatieral, this), this.sendLoadTactic = bind(this.sendLoadTactic, this), this.sendLoadPic = bind(this.sendLoadPic, this), this._send = bind(this._send, this);
            var o, a, s, u, l;
            this.opts = s = $.extend({}, i.defaults, r), l = t.opts.apiArgs, a = l.from, u = l.product, o = {
                from: a,
                product: u,
                ua: encodeURIComponent(navigator.userAgent)
            }, this.ad = t, this.player = t.adplayer, this._dataPic = e.clone(o), this._dataTactics = e.clone(o), this._dataMaterial = e.clone(o), this.picTimer = new n(p), this.tacticsTimer = new n(p), this.materialTimer = new n(p), this._initListeners()
        }
        return extend(i, t), i.defaults = {
            debug: !1,
            needLogPic: !0,
            getPic: function(t) {
                return t.picture_web.front
            }
        }, i.prototype.resetData = function(t, n, i) {
            var r;
            return null == i && (i = {}), r = "_data" + e.capitalize(t), this[r] = $.extend(this[r], {
                timestamp: l(),
                tactics_id: n.tactics_id,
                listen_type: n.listenType,
                listen_type_id: n.listenTypeId
            }, i), this[t + "Timer"].clear(), this
        }, i.prototype.resetPic = function(t) {
            return this.resetData("pic", t)
        }, i.prototype.resetTactics = function(t) {
            return this.resetData("tactics", t)
        }, i.prototype.resetMaterial = function(t) {
            return this._hasSendPlayEnd = !1, this.resetData("material", t, {
                buffct: 0
            }), this.player.once("timeupdate", function(t) {
                return function() {
                    return t.send100ms()
                }
            }(this)), this
        }, i.prototype._initListeners = function() {
            var t, e, n;
            return n = this, t = this.ad, e = this.player, t.on("tactics:fetchstart", function(t) {
                return n.resetTactics(t).tacticsTimer.start()
            }).on("tactics:fetchend", function() {
                return n.sendLoadTactic({
                    s2l: n.tacticsTimer.time()
                })
            }).on("tactics:fetcherr", function() {
                return n.sendLoadTactic({
                    s2l: -1
                })
            }).on("material:fetchstart", function(t) {
                return n.resetMaterial(t).materialTimer.start()
            }).on("material:fetchend", function(t) {
                return $.extend(n._dataPic, {
                    com_id: t.id
                }), $.extend(n._dataMaterial, {
                    com_id: t.id,
                    s2l: n.materialTimer.time()
                }), n.sendLoadPic(t), n.sendPlayStart(), n.sendLoadMatieral()
            }).on("material:fetcherr", function() {
                return n.sendLoadMatieral({
                    s2l: -1
                })
            }).on("ad:playerr", function() {
                return n.sendPlayEnd({
                    l2p: -1
                })
            }), e.on(u.PLAYING, function() {
                return n.materialTimer.start()
            }).on(u.PAUSE, function() {
                return n.materialTimer.stop()
            }).on(u.END, function() {
                return n.sendPlayEnd()
            }).on("player:waiting_timeout", function() {
                return n._dataMaterial.buffct++
            })
        }, i.prototype._send = function(t, e) {
            return this.ad.getState() === a.DISABLE ? this : i.__super__._send.call(this, t, $.extend({
                src: "http://log.music.baidu.com/maamonitor/v.gif",
                key: "_dataMaterial"
            }, e))
        }, i.prototype.sendLoadPic = function(t) {
            var e, n, i, r, o, a;
            return a = this, o = this.opts, i = o.needLogPic, e = o.getPic, r = e(t), i && r ? (n = new Image, $(n).one("load", function() {
                return a._send({
                    type: "loadpic",
                    pic2load: a.picTimer.time()
                }, {
                    key: "_dataPic"
                }), a.picTimer.clear()
            }), a.resetPic(t).picTimer.start(), n.src = r) : void 0
        }, i.prototype.sendLoadTactic = function(t) {
            return this._send($.extend({
                type: "loadtactic"
            }, t), {
                key: "_dataTactics"
            }), this.tacticsTimer.clear(), this
        }, i.prototype.sendLoadMatieral = function() {
            return this._send({
                type: "loadmatieral"
            })
        }, i.prototype.sendPlayStart = function() {
            return this._send({
                type: "playstart"
            })
        }, i.prototype.send100ms = function() {
            return $.extend(this._dataMaterial, {
                l2p: this.materialTimer.time() - this._dataMaterial.s2l
            }), this._send({
                type: "playsong100ms"
            })
        }, i.prototype.sendPlayEnd = function() {
            return this._hasSendPlayEnd ? void 0 : (this._hasSendPlayEnd = !0, this._send({
                type: "playend"
            }))
        }, i
    }(r), i.mixTo(s), s
});
var bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    indexOf = [].indexOf || function(t) {
        for (var e = 0, n = this.length; n > e; e++)
            if (e in this && this[e] === t) return e;
        return -1
    };
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/core/bmAd", ["muplayer/core/bmCfg", "muplayer/core/bmUtils", "muplayer/player", "muplayer/lib/Timer", "muplayer/lib/events", "muplayer/core/bmAdLogger"], e) : t._mu.BmAd = e(_mu.bmCfg, _mu.bmUtils, _mu.Player, _mu.Timer, _mu.Events, _mu.BmAdLogger)
}(this, function(cfg, utils, Player, Timer, Events, BmAdLogger) {
    var AD_EVENTS, AD_STATES, BmAd, EVENTS, STATES, adCfg, availableStates, k, listenType, mathRound, ref, send, time2str, timerResolution, v;
    return mathRound = Math.round, time2str = utils.time2str, adCfg = cfg.ad, listenType = adCfg.listenType, AD_EVENTS = adCfg.EVENTS, AD_STATES = adCfg.STATES, availableStates = function() {
        var t;
        t = [];
        for (k in AD_STATES) v = AD_STATES[k], t.push(v);
        return t
    }(), timerResolution = 1e3, ref = cfg.engine, STATES = ref.STATES, EVENTS = ref.EVENTS, Timer.prototype.time = function() {
        return this.ticks() * this.resolution()
    }, send = function(t, e) {
        var n, i;
        try {
            return i = new Image, i.src = t + "?" + $.param(e)
        } catch (r) {
            return n = r, "undefined" != typeof console && null !== console && "function" == typeof console.error ? console.error(n) : void 0
        }
    }, BmAd = function() {
        function BmAd(t) {
            this._fetchAd = bind(this._fetchAd, this), this._offPlayerPlaying = bind(this._offPlayerPlaying, this), this._onPlayerPlaying = bind(this._onPlayerPlaying, this);
            var e, n, i;
            i = this, this.opts = e = $.extend({}, BmAd.defaults, t), this._setState(e.enable && AD_STATES.ENABLE || AD_STATES.DISABLE), n = utils.clone(e.playerOpts), n.fetch = void 0, n.singleton = !1, n.initLogger = !1, n.maxRetryTimes = 1, n.maxWaitingTime = 4, this.player = e.player, this.player._name = "player", this.adplayer = new Player(n), this.adplayer._name = "adplayer", this.adplayer.duration = function(t) {
                var e, n;
                return e = Math.round(((null != (n = i._ad) ? n.audio_duration : void 0) || this.engine.getTotalTime()) / 1e3 + .5), t && time2str(e) || e
            }, this.minTimer = new Timer(timerResolution), this.songTimer = new Timer(timerResolution), this.reset({
                adplayer: !0
            })._initEvents(), e.needFetchFirst && this.fetchFirst(), e.needFetchStrategy && this.fetchStrategy()
        }
        return BmAd.defaults = {
            enable: !0,
            effectiveTimeout: 60,
            needFetchFirst: !0,
            needFetchStrategy: !0,
            apiArgs: {
                from: "pcweb",
                product: "music"
            },
            apiOpts: {
                apiHost: "http://baifen.music.baidu.com/api/v1/{{method}}?format=jsonp&callback=?"
            },
            initLogger: !0,
            loggerArgs: {}
        }, BmAd.init = function(t) {
            var e, n, i, r, o;
            return o = t.setUrl, $.extend(t, {
                setUrl: function(e) {
                    var n;
                    return t._frozen && (t._url = e), o.call(t, e), n = t.ad, n.check() && n.play(), t
                }
            }), r = t.opts, t.ad = e = new BmAd($.extend({
                player: t,
                playerOpts: r
            }, r.adArgs)), n = e.opts, n.initLogger && new BmAdLogger(e, n.loggerArgs), i = e.adplayer, t.engine.off(EVENTS.ERROR), t.engine.on(EVENTS.ERROR, function(e) {
                var n;
                return (n = i.getState()) === STATES.STOP || n === STATES.PAUSE || n === STATES.END ? ("undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("error: ", e), t.trigger("error", e)) : void 0
            })
        }, BmAd.prototype._initEvents = function() {
            var t, e, n, i, r, o;
            return o = this, i = this.opts, r = this.player, t = this.adplayer, e = function() {
                return o.minTimer.clear(), o._minTimer = !0
            }, n = function() {
                return o.songTimer.clear(), o.trigger(AD_EVENTS.EFFECTIVE_PLAY, ++o._count)
            }, r.on("player:setUrl", function() {
                var t;
                return t = o._strategy, t && o.getState() === AD_STATES.ENABLE ? (o.minTimer.after(t.minimum_time + " seconds", e).start(), o.songTimer.clear().after(i.effectiveTimeout + " seconds", n).start()) : void 0
            }).on(STATES.PLAYING, function() {
                return o.minTimer.start(), o.songTimer.start()
            }).on(STATES.PAUSE + " " + STATES.STOP, function() {
                return o.minTimer.stop(), o.songTimer.stop()
            }).on(STATES.END, function() {
                return o.songTimer.clear()
            }), t.on(STATES.END, function() {
                return o._offPlayerPlaying(), clearTimeout(o._hackTimer), r.setFrozen(!1), r._url && (r.engine.setUrl(r._url), delete r._url), r.replay(), "AudioCore" === t.getEngineType() ? t.setUrl(t.engine.curEngine.opts.emptyMP3).play() : void 0
            }).on("player:statechange", function(t) {
                return o.trigger(t.newState)
            }).on("timeupdate", function(t) {
                return o.trigger("timeupdate", t)
            }).on("player:retry:max error", o._handlePlayErr), this
        }, BmAd.prototype._handlePlayErr = function() {
            return this.trigger("ad:playerr"), this.stop()
        }, BmAd.prototype._setState = function(t) {
            return indexOf.call(availableStates, t) < 0 || t === this._state ? this : (this._state = t, this)
        }, BmAd.prototype.getState = function() {
            return this._state
        }, BmAd.prototype.enable = function() {
            return this._setState(AD_STATES.ENABLE)
        }, BmAd.prototype.disable = function() {
            return this._setState(AD_STATES.DISABLE)
        }, BmAd.prototype._onPlayerPlaying = function() {
            return this.player.setFrozen(!1).pause().setFrozen(!0)
        }, BmAd.prototype._offPlayerPlaying = function() {
            return this.player.off("playing", this._onPlayerPlaying)
        }, BmAd.prototype.play = function(t) {
            var e, n, i, r, o, a;
            return this.getState() === AD_STATES.DISABLE ? this : (a = this, n = {
                callback: a._fetchAd
            }, i = $.extend(n, t), r = this.player, e = this.adplayer, (o = e.getState()) !== STATES.STOP && o !== STATES.PAUSE && o !== STATES.END ? this : (i.callback(function(t) {
                return t ? (r.pause().setFrozen(!0).on("playing", a._onPlayerPlaying), e.setUrl(t.audio_url).play().setVolume(r.getVolume()).setMute(r.getMute()), a.trigger(AD_EVENTS.MATERIAL, t), a._hackTimer = setTimeout(function() {
                    var t, n, i;
                    return n = e.getState(), i = [STATES.PAUSE, STATES.STOP], n === STATES.PLAYING && 0 === e.curPos() ? a._handlePlayErr() : indexOf.call(i, n) >= 0 && (t = r.getState(), indexOf.call(i, t) >= 0) ? (e.play(), a._hackTimer = setTimeout(function() {
                        var t;
                        return t = e.getState(), indexOf.call(i, t) >= 0 ? a._handlePlayErr() : void 0
                    }, 3e3)) : void 0
                }, 3e3)) : a.stop()
            }), this))
        }, BmAd.prototype.stop = function() {
            return this.trigger("ad:stop"), this.adplayer.reset().trigger(STATES.END), this
        }, BmAd.prototype.check = function() {
            var conditions, count, interval, item, items, player, ref1, sec, start;
            return ~~utils.getQueryParams().ad_test ? !0 : this._strategy && this.getState() !== AD_STATES.DISABLE ? (count = this._count, player = this.player, ref1 = this._strategy, start = ref1.start, interval = ref1.interval, sec = ref1.sec, start--, this._first ? count >= start ? (this.trigger(AD_EVENTS.CHECK, {
                "first time": "count = start"
            }), !0) : !1 : (items = ["!this._first", "count >= interval", "sec === 0 || mathRound(player.curPos() + .5) >= sec"], conditions = function() {
                var i, len, results;
                for (results = [], i = 0, len = items.length; len > i; i++) item = items[i], results.push(eval(item));
                return results
            }(), this.trigger(AD_EVENTS.CHECK, $.extend(utils.object(items, conditions), {
                _minTimer: this._minTimer
            })), this._check ? this._minTimer : indexOf.call(conditions, !1) >= 0 ? !1 : (this._check = !0, this._minTimer))) : !1
        }, BmAd.prototype.reset = function(t) {
            var e, n;
            return e = {
                first: !0,
                adplayer: !1
            }, n = $.extend(e, t), this._count = 0, this._check = !1, this._first = n.first, this._minTimer = !1, this.minTimer.reset(), this.songTimer.reset(), n.adplayer && this.adplayer.reset(), this
        }, BmAd.prototype._setStrategy = function(t) {
            var e, n, i, r, o;
            return t.minimum_time = ~~t.minimum_time, i = function() {
                var e, i, r, o;
                for (r = t.afrequency.split(","), o = [], e = 0, i = r.length; i > e; e++) n = r[e], o.push(~~n);
                return o
            }(), o = i[0], e = i[1], r = i[2], this.reset(), this._strategy = $.extend(t, {
                start: o,
                interval: e,
                sec: r
            })
        }, BmAd.prototype.fetchStrategy = function(t, e) {
            var n, i, r, o, a, s, u;
            return u = this, s = this.opts, n = s.apiArgs, i = s.apiOpts, o = {
                reset: !0,
                callback: function() {}
            }, a = $.extend(o, e), a.reset && delete this._strategy, this._strategy ? a.callback(this._strategy) : (r = $.extend({}, n, t), this.trigger("tactics:fetchstart", r), utils.api("tactics", r, i).done(function(t) {
                return t = t.result, u._setStrategy($.extend(t, {
                    listenType: r.listenType,
                    listenTypeId: r.listenTypeId
                })), a.callback(u._strategy), u.trigger("tactics:fetchend", t)
            }).fail(function() {
                return u.trigger("tactics:fetcherr")
            }))
        }, BmAd.prototype._fetchAd = function(t) {
            var e, n, i, r, o;
            return o = this, r = this.opts, e = r.apiArgs, n = r.apiOpts, i = $.extend({}, e, {
                tactics_id: this._strategy.tactics_id,
                listenType: this._strategy.listenType
            }), this.reset({
                first: !1
            }), this.trigger("material:fetchstart", i), utils.api("material", i, n).done(function(e) {
                return e = e.result[0], o._ad = e, t && t(e), o.trigger("material:fetchend", e)
            }).fail(function(e) {
                return 25001 !== e.code && o.trigger("material:fetcherr"), t()
            })
        }, BmAd.prototype.fetchFirst = function(t) {
            var e, n, i, r, o, a, s, u;
            return u = this, a = this.player, e = this.adplayer, o = this.opts, s = this.opts, n = s.apiArgs, i = s.apiOpts, r = $.extend({}, n, t, {
                listenType: listenType.first
            }), this.trigger("material:fetchstart", r), utils.api("material", r, i).done(function(t) {
                return t = t.result[0], u.trigger("material:fetchend", t), u._ad = t, u._ad.listenType = r.listenType, u._ad.listenTypeId = r.listenTypeId, u.play({
                    callback: function(n) {
                        return e.once(STATES.END, function() {
                            return u.reset({
                                adplayer: !0
                            }), a.once("timeupdate", function() {
                                return o.effectiveTimeout < 3 ? u._count = 1 : void 0
                            })
                        }), n && n(t)
                    }
                })
            }).fail(function(t) {
                return 25001 !== t.code ? u.trigger("material:fetcherr") : void 0
            })
        }, BmAd.prototype.timeLeft = function(t) {
            var e, n;
            return e = this.adplayer, n = Math.floor(e.duration() - e.curPos()), 0 > n && (n = 0), t && time2str(n) || n
        }, BmAd.prototype.sendLog = function(t, e) {
            var n, i, r, o, a, s, u, l;
            if (this.getState() !== AD_STATES.DISABLE) return i = this._strategy, n = this._ad, u = this.opts, r = u.apiArgs, a = {
                src: "http://comlog.music.baidu.com/comlog",
                args: {
                    from: r.from,
                    product: r.product,
                    com_id: 0,
                    pt: 0,
                    ps: 1,
                    tactics_id: i && i.tactics_id || 0,
                    action: function(t) {
                        return {
                            played: 1,
                            click: 2
                        }[t] || 0
                    }(t)
                }
            }, n && ($.extend(!0, a, {
                args: {
                    com_id: n.id,
                    pt: n.audio_duration
                }
            }), n.listenType === listenType.first && $.extend(!0, a, {
                args: {
                    tactics_id: 0,
                    listenType: n.listenType,
                    listenTypeId: n.listenTypeId
                }
            })), s = $.extend(!0, a, e), l = s.src, o = s.args, send(l, o)
        }, BmAd
    }(), Events.mixTo(BmAd), BmAd
});
var extend = function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var i in e) hasProp.call(e, i) && (t[i] = e[i]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
    },
    hasProp = {}.hasOwnProperty;
! function(t, e) {
    return "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define("muplayer/bmPlayer", ["muplayer/core/bmCfg", "muplayer/core/bmUtils", "muplayer/player", "muplayer/core/bmLogger", "muplayer/core/bmAd"], e) : t._mu.BmPlayer = e(_mu.bmCfg, _mu.bmUtils, _mu.Player, _mu.BmLogger, _mu.BmAd)
}(this, function(t, e, n, i, r) {
    var o, a;
    return a = e.time2str, o = function(t) {
        function n(t) {
            var e;
            n.__super__.constructor.call(this, $.extend({}, n.defaults, t)), e = this.opts, e.initLogger && (this.logger = new i(this, e.loggerArgs)), e.initAd && r.init(this)
        }
        return extend(n, t), n.defaults = {
            absoluteUrl: !1,
            initLogger: !0,
            loggerArgs: {},
            initAd: !0,
            adArgs: {},
            engines: [{
                type: "AudioCore"
            }],
            fetch: function() {
                var t, n, i, r, o;
                return i = this, n = $.Deferred(), r = function() {
                    var t;
                    return t = i._cache[i.getCur()], i._curSong = t, i.engine.reset(), i.setUrl(t.bitrate.file_link), i.trigger("player:fetchend", t), n.resolve(t)
                }, (o = this.getCur()) ? (this.trigger("player:fetchstart"), e.has(this._cache, o) ? r() : (t = this.canPlayType("m4a") ? "baidu.ting.song.playAAC" : "baidu.ting.song.play", e.api(t, {
                    songid: o
                }, {
                    handleError: function(t) {
                        return i.trigger("player:fetcherr", t), i.opts.handleFetchError.call(i, t, o)
                    }
                }).done(function(t) {
                    return i._cache[o] = t, r()
                })), n.promise()) : (n.reject(), n.promise())
            },
            handleFetchError: function(t, e) {
                return "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("player fetch error: ", e, t.error_code), this.trigger("error", t)
            }
        }, n.prototype._cache = {}, n.prototype.duration = function(t) {
            var e, n, i;
            return e = function(t, e) {
                return e && a(t) || t
            }, this._curSong ? (i = this._curSong, n = i.bitrate && i.bitrate.file_duration || 0, n = n || this.engine.getTotalTime() / 1e3, e(n, t)) : (n = this.engine.getTotalTime() / 1e3, e(n, t))
        }, n
    }(n)
}), define("muplayer/bmPlayer", function() {}), define("handler", ["utils"], function(t) {
        return {
            routeChange: function(e, n) {
                return app.shareDialog && app.shareDialog.hide && app.shareDialog.hide(), $win.DialogMngr && _.forEach($win.DialogMngr, function(t) {
                    return t.close()
                }), app.curRoute = n, $body.attr("class", "route-" + app.curRoute), "song" === n && "song" !== app.lastRoute && (app.mainPos = $(window).scrollTop()), app.lastRoute && "song" === app.lastRoute && setTimeout(function() {
                    return $(window).scrollTop(app.mainPos)
                }, 100), app.lastRoute = app.curRoute, -1 !== ["song", "mv", "playmv"].indexOf(n) ? (window.scrollTo(0, 1), $player.hide()) : app.player && app.player.getCur() && ($player.show(), t.log({
                    type: "exposure",
                    page: "playbar"
                }), app.updatePlayerHeight()), "mv" !== n && app.mvplayer && (app.mvplayer.pause(), app.$mvplayer.hide()), /search/.test(location.pathname || location.hash) ? ($("#main").removeClass("on-product"), $(".search input").css("display", "block")) : $(".search input").css("display", "none"), t.log({
                    type: "",
                    page_url: win.location.href,
                    page: n
                }, "pvlog")
            },
            bindTouch: function() {
                var t, e, n;
                return e = null, n = function(t) {
                    var e;
                    return e = $(t.target), e.hasClass("need-active") || e.hasClass("url") ? e : e.parents(".need-active, .url").first()
                }, t = $("body"), t.on("touchstart", function(t) {
                    return $(".active").removeClass("active"), clearTimeout(e), e = setTimeout(function() {
                        return n(t).addClass("active")
                    }, 100)
                }), t.on("touchend", function(t) {
                    return clearTimeout(e), n(t).removeClass("active")
                })
            }
        }
    }), define("widgets/ad", [], function() {
        var t, e, n, i, r, o, a, s, u;
        return t = $("#head-ad"), n = t.find(".countdown"), e = t.find(".btn-close"), o = function() {
            var e, i, o, a;
            return app.player.on("webapp:playList", function() {
                return "playing" === app.player.ad.adplayer.getState() ? app.player.ad.stop() : void 0
            }), o = null, e = null, a = function() {
                var t;
                return t = "<img src='" + o + "'/>", e || (e = "#"), t = $("<a class='ref ref-out audioAd' href='" + e + '\' target="_blank">\n    ' + t + "\n</a>"), t.click(function() {
                    return app.player.ad.sendLog("click", {
                        args: {
                            ps: 0,
                            pt: Math.round(app.player.ad.adplayer.curPos()) || 0,
                            action_d: 0,
                            page: app.curRoute
                        }
                    })
                }), u(t)
            }, i = function() {
                return s.enablePlayBtns(), !s.showPicAd.isHideInCurrentSession && s.showPicAd.picAdCache ? u(s.showPicAd.picAdCache) : r()
            }, app.player.ad.on("ad:material", function(t) {
                var n, i, r;
                return i = t.display_content, n = i.picture, r = i.weburl, o = n, e = r, a(), s.disablePlayBtns()
            }).on("timeupdate", function() {
                return t.find(".picAd").length > 0 && a(), n.text("-" + app.player.ad.timeLeft(!0))
            }).on("ended", function() {
                return app.player.ad.sendLog("played", {
                    args: {
                        ps: 1,
                        pt: Math.round(app.player.ad.adplayer.curPos()) || 0,
                        page: app.curRoute
                    }
                }), i()
            }).on("ad:stop", function() {
                return $(".audioAd").length && app.player.ad.sendLog("played", {
                    args: {
                        ps: 2,
                        pt: Math.round(app.player.ad.adplayer.curPos()) || 0,
                        page: app.curRoute
                    }
                }), i()
            })
        }, a = function(t) {
            var i;
            return s.showPicAd.isHideInCurrentSession = !0, e.hide(), n.text("-00:0" + t), i = setInterval(function() {
                return t--, n.text("-00:0" + t), 0 === t ? (r(), e.show(), clearInterval(i)) : void 0
            }, 1e3)
        }, u = function(e) {
            return n.empty(), t.find(".material").empty().append(e), t.show(), t.find("img").on("load", function() {
                return s.updateHeaderHeight()
            }), s.updateHeaderHeight()
        }, r = function() {
            return t.hide(), s.updateHeaderHeight()
        }, i = function() {
            return $(".player").find(".btn-prev, .btn-play, .btn-next, .download, .play, .next")
        }, s = {
            init: function() {
                return app.ad = s, o(), e.click(function() {
                    return "playing" === app.player.ad.adplayer.getState() ? app.player.ad.stop() : s.showPicAd.isHideInCurrentSession ? void 0 : (a(3), _.utils.log({
                        page: "ad",
                        pos: "close"
                    }))
                })
            },
            disablePlayBtns: function() {
                return i().addClass("disable")
            },
            enablePlayBtns: function() {
                return i().removeClass("disable")
            },
            updateHeaderHeight: function() {
                var e, n;
                return n = t.height(), e = $("#header"), $("#header").css("top", n), $("#main").css("margin-top", e.height() + n)
            },
            showPicAd: function() {
                return s.showPicAd.isHideInCurrentSession ? void 0 : (s.showPicAd.picAdCache ? $.Deferred().resolve(s.showPicAd.picAdCache).promise() : app.getADKeeper().then(function(t) {
                    var e, n, i, r, o;
                    return e = t["topBanner_" + app.curRoute] || t.topBanner, e && e.pic ? (r = JSON.stringify({
                        page: app.curRoute,
                        pos: "ad_ba",
                        caldl: 0
                    }), i = $.os.ios ? window.cfg.iosLink + "%26type=top" : window.cfg.androidBannerLink + "%3Ftype=top", $.os.ios === !0 && (o = location.href, n = app.curRoute || "", "songlist" === n && -1 !== o.indexOf("share=") ? (i = window.cfg.iosSongShareLink, $(".c_bb_2").attr("href", i)) : "album" === n && -1 !== o.indexOf("share=") && (i = window.cfg.iosalbumShareLink, $(".c_bb_2").attr("href", i))), s.showPicAd.picAdCache = $('<a class="picAd ref log" href="' + i + '" target="_blank" data-log=\'' + r + "'>\n    <img src=\"" + e.pic + '"/>\n</a>')) : void 0
                })).done(u)
            }
        }
    }), define("app", ["router", "utils", "muplayer/bmPlayer", "handler", "widgets/ad"], function(t, e, n, i, r) {
        var o, a, s, u, l;
        return require(["libs/fastclick"], function(t) {
            return new t(document.body)
        }), s = document, window.win = window, u = window.history, a = {}, l = function(t) {
            return _.isString(t) || (t = JSON.stringify(t)), t
        }, o = function() {
            function o(t) {
                this.options = t, i.bindTouch(), this.initPlayer(), e.initModelConfig(this), this.initGlobalVals(), this.bindEvents(), this.initRouter(), this.initGoTop(), this.vipLog()
            }
            return o.prototype.initGlobalVals = function() {
                return win.$win = $(window), win.$doc = $(s), win.$body = $doc.find("body"), win.$main = $body.find("#main"), win.$player = $body.find("#player"), win.elMain = $main[0]
            }, o.prototype.getHistory = function() {
                var t;
                return bigpipe.pageletStack = _.unique(bigpipe.pageletStack), bigpipe.pageletStack.shift(), (t = bigpipe.pageletStack.shift()) ? (this.$header.setTitle(), Backbone.history.history.back(), Backbone.history.trigger("route")) : void 0
            }, o.prototype.bindEvents = function() {
                var t;
                t = this,
                    function() {
                        var e;
                        return e = function() {
                            return window.weixinStore = $.os.ios ? {
                                txt: "Safari",
                                shareSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-weixin-share-ios.png",
                                lineSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-step-line.png",
                                browserSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-weixin-browser-ios.png"
                            } : {
                                txt: "æµè§ˆå™¨",
                                shareSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-weixin-share-android.png",
                                lineSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-step-line.png",
                                browserSrc: "http://music.baidu.com/cms/webapp/img/light-dialog/icon-weixin-browser-android.png"
                            }, window.isWeixinEmbedded = !0, t.channel = "wechat"
                        }, document.addEventListener("WeixinJSBridgeReady", function() {
                            return e()
                        }), "object" == typeof WeixinJSBridge ? e() : void 0
                    }(), $doc.on("click", ".ref:not(.ref-out)", function(t) {
                        return t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), window.isWeixinEmbedded ? (window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ting.mp3.android&g_f=991695", !1) : (window.location = t.currentTarget.href, !1)
                    }), $body.on("click", ".slot-da1 .close", function() {
                        var t, e;
                        return e = {
                            data: {
                                time: 3,
                                link: $(".slot-da1 a").attr("href")
                            },
                            tpl: ['<div class="gentle-tips">', '<p class="txt">æ¸©é¦¨æç¤ºï¼šå®¢æˆ·ç«¯ç»¿è‰²æ— å¹¿å‘Š</p>', '<a href="<%= link %>" class="btn-try ref log" >è¯•ä¸€è¯•</a>', '<div class="couter"><span class="num"><%= time %></span><br>ç§’æ¶ˆå¤±</div>', "</div>"].join(""),
                            remove: function() {
                                return this.$el.remove()
                            },
                            tick: function() {
                                var t, e, n;
                                return n = this, t = this.data.time, e = setInterval(function() {
                                    return t--, 0 >= t && (clearInterval(e), n.remove()), $(".num", n.$el).text(t)
                                }, 1256)
                            },
                            render: function() {
                                return this.$el = $(_.template(this.tpl)(this.data)), this.tick(), this.$el
                            }
                        }, t = e.render(), t.insertAfter($(".slot-da1", app.layout)), t.find("a.btn-try").data("log", $(".slot-da1 a").data("log")), $(".slot-da1").remove()
                    }), $body.on("click", ".log", function(t) {
                        var n;
                        n = $(t.currentTarget).data("log");
                        try {
                            n = "string" == typeof n ? JSON.parse(n) : n
                        } catch (i) {
                            console.log("log error")
                        }
                        return e.log(n)
                    }), $body.on("focus", "input", function() {
                        return $("#header").css("position", "absolute"), $(".ui-suggestion").height($("body").height()), $(".hot-novel").hide(), window.scrollTo(0, 1)
                    }), $body.on("blur", "input", function() {
                        return $("#header").css("position", "fixed"), $(".ui-suggestion").height($(window).height()), $(".hot-novel").hide()
                    }), $body.on("click", "a.redirect", function(t) {
                        var n;
                        return n = $(t.currentTarget).data("redirect"), n && e.redirectInstall(n), !1
                    }), $body.on("click", ".url, a:not(.ref)", function(t) {
                        return function(n) {
                            var i, r, o, a, s, u;
                            return o = $(n.currentTarget), a = o.data("url") || o.attr("href"), 0 === a.indexOf("http://") ? window.location.href = a : (a = a.replace(/#/g, ""), !a || /undefined/.test(a) ? !1 : !/\/song\/\d+/.test(a) || $(o).is(".player") || $(o).is(".search-item, .landing-item") ? (/song\//.test(a) && (o.data("nohistory") || bigpipe.pageletStack.unshift(a)), t.router.navigate(a, {
                                trigger: !0
                            }), !1) : (i = $(o).parent(), u = i.find(".song"), r = $(o).data("sid"), s = i.is(".searchlist") ? $(o).data("sid") : _.map(u, function(t) {
                                return $(t).data("sid")
                            }), e.playList(s, r), !1))
                        }
                    }(this)), $doc.on("click", ".openios", function(t) {
                        return t.stopImmediatePropagation(), window.isWeixinEmbedded ? (window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ting.mp3.android&g_f=991695", !1) : (e.openIosFunc(t), !1)
                    }), $doc.on("click", ".openadr", function(t) {
                        return t.stopImmediatePropagation(), window.isWeixinEmbedded ? (window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ting.mp3.android&g_f=991695", !1) : (e.openAdrFunc(t), !1)
                    }),
                    function() {
                        return require(["mod/base/item-action"], function() {})
                    }()
            }, o.prototype.initGoTop = function() {
                return window.$goTop = $('<div id="goTop"></div>'), $body.append($goTop.hide()), $goTop.click(function() {
                    return e.log({
                        page: app.curRoute,
                        pos: "go2top"
                    }), win.scrollTo(0, 1)
                }), $win.on("scroll", _.debounce(function() {
                    return 2 * $(window).height() < document.body.scrollTop ? $goTop.css("display", "block") : $goTop.css("display", "none")
                }))
            }, o.prototype.initRouter = function() {
                return win.app = this, win.router = this.router = new t, Backbone.history.on("route", i.routeChange), Backbone.history.start({
                    pushState: !!u.pushState
                })
            }, o.prototype.vipLog = function() {
                return e.checkLogin().done(function(t, n) {
                    var i, r;
                    return r = t ? n.level : 0, i = {
                        type: "",
                        vip_type: r
                    }, e.log(i, "pvlog")
                })
            }, o.prototype.use = function() {
                var t, n, i, o, a, s, u, l, c, p, d, f, h;
                if (t = [].concat.apply([], arguments), p = t.shift(), f = [].concat.apply([], t), n = p.css && [].concat(p.css) || [], u = p.js && [].concat(p.js) || [], o = p.el, l = p.keep || !1, c = p.name, h = bigpipe.pageletStack[0], bigpipe.pageletStack.unshift(c), s = function(t) {
                        return app.store.get("c_bb") ? $(t).find(".c_bb_1").remove() : void 0
                    }, d = function() {
                        app.$header.setTitle($(app.layout).data("title")), app.store.get("noad") || ("iphone" !== e.os ? e.checkNative(null, function() {
                            return r.showPicAd()
                        }) : "iphone" === e.os && r.showPicAd(), e.dealWithModel(app.layout, c))
                    }, bigpipe._partial !== !1) return h && bigpipe._domCached[h] && (bigpipe._domCached[h].scrollTop = $("body").scrollTop()), a = p.reg ? bigpipe.getCachedDom(p.reg) : bigpipe._domCached[c], AJAX_MONITOR.pdc_pagelet.start_send(), a ? (app.layout = a.el, a.w += 1, $(".layout").hide(), AJAX_MONITOR.pdc_pagelet.transfer_time(), d(), AJAX_MONITOR.pdc_pagelet.ready(), e.hmLog(), $(app.layout).show(), window.scrollTo(0, a.scrollTop || 1), l ? require(u, function(t) {
                    t && t.init && t.init.apply(t, f)
                }) : void 0) : (p.params = f, $(".page-loading").css({
                    visibility: "visible"
                }), bigpipe.getPagelet(p, function(t) {
                    var n, i;
                    return AJAX_MONITOR.pdc_pagelet.transfer_time(), s(t), e.fetchTextLink(t), d(), window.scrollTo(0, 1), app.player && app.player.getCur() && (n = $(app.layout).find("#footer"), i = 10 + $player.height(), n.css("padding-bottom", i)), AJAX_MONITOR.pdc_pagelet.ready(), e.hmLog(), $(".page-loading").css("visibility", "hidden")
                }));
                bigpipe._partial = !0;
                try {
                    app.layout = o.children[0], e.fetchTextLink(app.layout), s(app.layout), bigpipe.doDomCache(c, app.layout), AJAX_MONITOR.pdc_pagelet.transfer_time(), require(u, function(t) {
                        return t && t.init && t.init.apply(t, f), d()
                    })
                } catch (g) {
                    i = g, console.error("refresh fully requirejs error: ", i)
                }
            }, o.prototype.usePlayer = function() {
                var t, n;
                return t = $.Deferred(), n = this, app.songModel ? t.resolve() : require(["mod/song/index"], function(i) {
                    var r;
                    return r = i.PlayerWidget, n.songModel = new i.Model, n.$playerWidget = new r({
                        model: n.songModel
                    }), n.player.on("player:fetchend", function(t) {
                        return n.songModel.format(t), n.player.trigger("timeupdate")
                    }), "song" !== n.curRoute ? ($player.show(), e.log({
                        type: "exposure",
                        page: "playbar"
                    })) : $player.hide(), n.$playerWidget.render(), t.resolve()
                }), t.promise()
            }, o.prototype.initPlayer = function() {
                var t, i;
                return t = !0, $.os.android && $.browser.special.qq && (t = !1), i = function() {
                    var t, n, i, r, o;
                    return i = this, n = $.Deferred(), r = function() {
                        var t, e;
                        return t = i._cache[i.getCur()], i._curSong = t, i.engine.reset(), e = t.songinfo.song_id, 22e3 === t.error_code && 0 === t.bitrate.free ? (app.player.engine.curEngine.audio.src = "http://mu5.bdstatic.com/cms/muplayer/1-0-0/empty.mp3", i.trigger("player:fetchHQ", t)) : i.setUrl(t.bitrate.file_link), i.trigger("player:fetchend", t), n.resolve(t)
                    }, (o = this.getCur()) ? (this.trigger("player:fetchstart"), _.has(this._cache, o) ? r() : (t = this.canPlayType("m4a") ? "baidu.ting.song.playAAC" : "baidu.ting.song.play", e.api(t, {
                        songid: o
                    }, {
                        handleError: function(t) {
                            return i.trigger("player:fetcherr", t), i.opts.handleFetchError.call(i, t, o)
                        }
                    }).done(function(t) {
                        return i._cache[o] = t, r()
                    })), n.promise()) : (n.reject(), n.promise())
                }, this.player = new n({
                    loggerArgs: {
                        data: {
                            pid: "323",
                            ref: "webapp",
                            wfs: "wfs",
                            filter: 0
                        }
                    },
                    maxWaitingTime: 0,
                    fetch: i,
                    adArgs: {
                        enable: t,
                        needFetchFirst: !1,
                        apiArgs: {
                            listenType: 8,
                            from: "webapp_music"
                        },
                        apiOpts: "development" === MWA.mode ? {
                            apiHost: "http://" + location.host + "/{{method}}"
                        } : void 0,
                        loggerArgs: {
                            debug: "development" === MWA.mode,
                            getPic: function(t) {
                                var e;
                                return e = t.display_content, e && e.picture || ""
                            }
                        },
                        effectiveTimeout: "development" === MWA.mode ? 0 : void 0
                    },
                    handleFetchError: function(t) {
                        return this.logger.sendPlayEnd({
                            flag: 0,
                            lerr: t.error_code
                        }), t.error_code !== window.cfg.apiCode.USER_IP_LIMIT ? this.trigger("error", t) : (e.showTips("å—ç‰ˆæƒä¿æŠ¤é™åˆ¶ï¼Œæ’­æ”¾æœåŠ¡ä»…é’ˆå¯¹ä¸­å›½å¤§é™†ç”¨æˆ·"), this.reset(), this.trigger("pause"), "song" === app.curRoute ? app.router.navigate("/home", {
                            trigger: !0
                        }) : void 0)
                    }
                })
            }, o.prototype.store = {
                set: function(t, e) {
                    return t = l(t), e = l(e), a[t] = e
                },
                get: function(t) {
                    var e;
                    return t = l(t), void 0 === t ? "" : (e = a[t], e ? JSON.parse(e) : "")
                },
                clear: function(t) {
                    return t ? (t = !_.isString(t) && JSON.stringify(t), delete a[t]) : a = {}
                }
            }, o.prototype.updatePlayerHeight = function() {
                var t, e, n;
                return t = $(app.layout).find("#footer"), e = 10 + $player.height(), n = function() {
                    return $goTop.css({
                        position: "absolute",
                        top: win.innerHeight - $player.height() + win.scrollY - parseInt($goTop.css("bottom"), 10)
                    })
                }, t.css("padding-bottom", e), $.os.ios && parseFloat($.os.version) < 5 ? ($player.css({
                    position: "absolute",
                    top: win.innerHeight + win.scrollY - 65
                }), n(), $doc.on("touchend", function() {
                    return _.delay(function() {
                        return $player.css({
                            position: "absolute",
                            top: win.innerHeight - $player.height() + win.scrollY
                        }), n()
                    }, 300)
                })) : void 0
            }, o.prototype.userAction = function() {
                var t;
                return this.userActoin ? this.userActoin : new(t = Backbone.Model.extend({
                    initialize: function() {
                        return this.on("fav:delete", this.onFavDelete), this.on("fav:add", this.onFavAdd)
                    },
                    onFavAdd: function() {},
                    onFavDelete: function() {}
                }))
            }(), o.prototype.getADKeeper = function() {
                var t;
                return t = $.Deferred(), app.ADKeeper ? t.resolve(app.ADKeeper) : e.api("baidu.ting.adv.showlist").done(function(e) {
                    var n;
                    return n = $.os.ios ? "ios" : "android", app.ADKeeper = {}, _.map(e.result, function(t) {
                        var e;
                        return e = t.code, app.ADKeeper[e] = {
                            url: t[n + "_url"],
                            text: t[n + "_text"],
                            pic: t[n + "_pic"]
                        }
                    }), app.ADKeeper.panelBanner && app.ADKeeper.panelBanner.pic && (window.cfg.androidPanelAdPic = app.ADKeeper.panelBanner.pic), t.resolve(app.ADKeeper)
                }), t.promise()
            }, o
        }()
    }), define("widgets/hotsug", [], function() {
        return Backbone.View.extend({
            manage: !1,
            itemTpl: "<span class='item' data-author='<%= author %>'><%= title %></span>",
            itemSelector: "item",
            className: "hot-sug",
            events: {
                "click .item": "pickItem"
            },
            initialize: function(t) {
                var e = this;
                this.options = _.extend({
                    container: document.body
                }, t), this.render(), this.updateHeight(), $win.resize(function() {
                    e.updateHeight()
                }), _.bindAll(this, "render", "hide", "show")
            },
            updateHeight: function() {
                this.$el.height(window.innerHeight)
            },
            show: function() {
                this.$el.css("display", "block")
            },
            hide: function() {
                this.$el.css("display", "none")
            },
            pickItem: function(t) {
                var e = $(t.target);
                this.options.onItemClick({
                    title: e.text(),
                    author: e.data("author")
                }), $(".search").removeClass("on")
            },
            render: function() {
                var t = this;
                return this.fetchData().done(function(e) {
                    for (var n = "", i = e.song_list, r = 0; r < i.length; r++) n += _.template(t.itemTpl)(i[r]);
                    t.$el.css({
                        position: "absolute",
                        left: "0",
                        right: "0",
                        top: "0",
                        display: "none",
                        bottom: "0"
                    }).html(n).appendTo(t.options.container)
                }), this
            },
            fetchData: function() {
                var t = $.Deferred();
                return _.utils.api("baidu.ting.billboard.billList", {
                    type: 1,
                    size: 10
                }).done(function(e) {
                    t.resolve(e)
                }), t.promise()
            }
        })
    }),
    function(t, e) {
        function n(t) {
            this.callback = t, this.ticking = !1
        }

        function i(e) {
            return e && "undefined" != typeof t && (e === t || e.nodeType)
        }

        function r(t) {
            if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
            var e, n, o = t || {};
            for (n = 1; n < arguments.length; n++) {
                var a = arguments[n] || {};
                for (e in a) o[e] = "object" != typeof o[e] || i(o[e]) ? o[e] || a[e] : r(o[e], a[e])
            }
            return o
        }

        function o(t) {
            return t === Object(t) ? t : {
                down: t,
                up: t
            }
        }

        function a(t, e) {
            e = r(e, a.options), this.lastKnownScrollY = 0, this.elem = t, this.debouncer = new n(this.update.bind(this)), this.tolerance = o(e.tolerance), this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop
        }
        var s = {
            bind: !! function() {}.bind,
            classList: "classList" in e.documentElement,
            rAF: !!(t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame)
        };
        t.requestAnimationFrame = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame, n.prototype = {
            constructor: n,
            update: function() {
                this.callback && this.callback(), this.ticking = !1
            },
            requestTick: function() {
                this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
            },
            handleEvent: function() {
                this.requestTick()
            }
        }, a.prototype = {
            constructor: a,
            init: function() {
                return a.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
            },
            destroy: function() {
                var t = this.classes;
                this.initialised = !1, this.elem.classList.remove(t.unpinned, t.pinned, t.top, t.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
            },
            attachEvent: function() {
                this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
            },
            unpin: function() {
                var t = this.elem.classList,
                    e = this.classes;
                (t.contains(e.pinned) || !t.contains(e.unpinned)) && (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this))
            },
            pin: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this))
            },
            top: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this))
            },
            notTop: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this))
            },
            getScrollY: function() {
                return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (e.documentElement || e.body.parentNode || e.body).scrollTop
            },
            getViewportHeight: function() {
                return t.innerHeight || e.documentElement.clientHeight || e.body.clientHeight
            },
            getDocumentHeight: function() {
                var t = e.body,
                    n = e.documentElement;
                return Math.max(t.scrollHeight, n.scrollHeight, t.offsetHeight, n.offsetHeight, t.clientHeight, n.clientHeight)
            },
            getElementHeight: function(t) {
                return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
            },
            getScrollerHeight: function() {
                return this.scroller === t || this.scroller === e.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            },
            isOutOfBounds: function(t) {
                var e = 0 > t,
                    n = t + this.getViewportHeight() > this.getScrollerHeight();
                return e || n
            },
            toleranceExceeded: function(t, e) {
                return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e]
            },
            shouldUnpin: function(t, e) {
                var n = t > this.lastKnownScrollY,
                    i = t >= this.offset;
                return n && i && e
            },
            shouldPin: function(t, e) {
                var n = t < this.lastKnownScrollY,
                    i = t <= this.offset;
                return n && e || i
            },
            update: function() {
                var t = this.getScrollY(),
                    e = t > this.lastKnownScrollY ? "down" : "up",
                    n = this.toleranceExceeded(t, e);
                this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(t, n) ? this.unpin() : this.shouldPin(t, n) && this.pin(), this.lastKnownScrollY = t)
            }
        }, a.options = {
            tolerance: {
                up: 0,
                down: 0
            },
            offset: 0,
            scroller: t,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                initial: "headroom"
            }
        }, a.cutsTheMustard = "undefined" != typeof s && s.rAF && s.bind && s.classList, t.Headroom = a
    }(window, document), define("libs/headroom", function() {}), define("widgets/header", ["widgets/hotsug", "utils", "widgets/ad", "libs/headroom"], function(t, e, n) {
        var i, r, o, a;
        return o = e.queryString().key || "", r = function() {
            function t(t) {
                this.limit = t.limit || 3, this.key = t.key || "local-suggestion"
            }
            return t.prototype.addItem = function(t) {
                var e;
                return e = this.getAll(), e.unshift(t), e = _.unique(e), localStorage.setItem(this.key, e.slice(0, this.limit).join(","))
            }, t.prototype.clearAll = function() {
                return localStorage.setItem(this.key, "")
            }, t.prototype.getAll = function() {
                var t, e;
                return e = localStorage.getItem(this.key), e ? (t = e.split(","), t.slice(0, this.limit)) : []
            }, t
        }(), a = new r({}), i = function() {
            function i(t) {
                this.opts = t, this.el = t.el, this.$el = $(this.el), this.initialize(), this.bindEvents()
            }
            return i.prototype.events = {
                "click .url": "onChangeNav",
                "click li.more": "onToggleMoreNav",
                "click .more-nav a": "hideMoreNav",
                "click .btn-search": "onSearchDrop",
                "focus .search-input input": "onInput",
                "click .search-input .btn": "onSearch",
                "click .btn-return": "onReturn",
                "click .btn-product": "onProduct",
                "click .btn-back": "onBack",
                "click .btn-ucenter": "logUCenter"
            }, i.prototype.bindEvents = function() {
                var t, n, i, r, o, a, s, u, l;
                s = this.events;
                for (n in s) o = s[n], u = n.split(/\s+/), i = u.shift(), t = this, $(this.el).on(i, u.join(" "), function(t, e) {
                    return function(n) {
                        return t[e].call(t, n)
                    }
                }(t, o));
                e.originAndroidBrowser() ? (a = "show", l = "hide") : (a = "slideDown", l = "slideUp"), r = new Headroom(this.el, {
                    offset: 110,
                    tolerance: 20,
                    classes: {
                        initial: "animated",
                        pinned: a,
                        unpinned: l
                    }
                }), r.init()
            }, i.prototype.$ = function(t) {
                return $(t, this.el)
            }, i.prototype.initialize = function() {
                var t, e;
                return t = this, this.$title = this.$(".title"), this.$subNav = this.$(".sub-nav"), this.$moreNav = this.$(".more-nav"), this.$moreBtn = this.$subNav.find(".more"), this.$menu = this.$(".drop-menu"), this.$search = this.$(".search"), this.$query = this.$search.find("input[name=query]"), this.$queryBtn = this.$search.find(".btn"), this.$form = this.$search.find("#se_form"), this.$btnClearLocal = this.$(".ui-suggestion-clear"), this.titleMap = {}, e = [], this.$("li.url").each(function() {
                    var t;
                    return t = $(this).data("name"), t ? ("mv" === t && (t = "mvs"), "artist" === t && (t = "artistclass"), e.push(t)) : void 0
                }), this.urlNavs = e, this.initSug(), this.initHotSug(), this.initRouteChange(), n.init()
            }, i.prototype.setTitle = function(t, n) {
                var i, r, o, a, s, u, l, c;
                if (n = n || location.pathname || "/", c = location.pathname, t = t || this.titleMap[c] || "", u = function(t) {
                        return function(e, n) {
                            return t.titleMap[n] ? void 0 : t.titleMap[n] = e
                        }
                    }(this), s = {
                        "/": "0",
                        "/home": "0",
                        "/listcate": "1",
                        "/artistclass": "2",
                        "/tags": "3",
                        "/songlists": "4",
                        "/mv": "5"
                    }, _.isString(t)) {
                    if (t = e.html2text(t), this.$title.removeClass("multi-line").html(t), u(t, c), win.bdmusic && win.bdmusic.setTitle) return win.bdmusic.setTitle(JSON.stringify({
                        title: t,
                        artistnmae: "",
                        index: s[n] || ""
                    }))
                } else if (_.isArray(t)) {
                    for (o = 0, a = t.length, i = [], r = "", l = ""; a > o; o++) 0 === o ? (i.push("<p>" + t[o] + "</p>"), l = t[o]) : (i.push("<div>" + t[o] + "</div>"), r = t[o]);
                    if (t = i.join(""), this.$title.addClass("multi-line").html(t), u(t, c), win.bdmusic && win.bdmusic.setTitle) return win.bdmusic.setTitle(JSON.stringify({
                        title: l,
                        artistnmae: r,
                        index: s[n] || ""
                    }))
                }
            }, i.prototype.initRouteChange = function() {
                return Backbone.history.on("route", function(t) {
                    return function(e, n, i) {
                        return t.novel && t.novel.$el.hide(), t.onRouteChange(e, n, i)
                    }
                }(this)), this.onRouteChange({}, app.curRoute, void 0)
            }, i.prototype.onToggleMoreNav = function(t) {
                return this.$moreNav.toggleClass("on"), this.$(t.currentTarget).toggleClass("on")
            }, i.prototype.hideMoreNav = function() {
                return this.$moreNav.removeClass("on"), this.$moreBtn.removeClass("on")
            }, i.prototype.onChangeNav = function(t) {
                var e;
                return e = t.currentTarget, $(e).addClass("on").siblings().removeClass("on")
            }, i.prototype.logUCenter = function() {
                return e.log({
                    pos: "mysongs"
                })
            }, i.prototype.onInput = function() {
                return this.$(".search .hot-sug").hide()
            }, i.prototype.onSearch = function() {
                var t, e;
                return (e = this.$query.val()) ? (a.addItem(e), t = encodeURI(e), app.router.navigate("/search/" + t + "/", {
                    trigger: !0
                }), this.$search.removeClass("on")) : !1
            }, i.prototype.menu = function(t) {
                var e, n, i, r, o, a;
                return n = $(this.el), r = this.$subNav, i = this.$moreNav, a = function() {
                    return r.find("li").removeClass("on"), n.removeClass("product-on")
                }, a(), o = [], i.find("li.url").each(function() {
                    return $(this).data("name") ? o.push($(this).data("name")) : void 0
                }), _.include(o, t) && (e = r.find("li:nth-child(4)").removeClass("on"), i.find("li[data-name=" + t + "]").insertBefore(e), i.prepend(e)), _.include(this.urlNavs, t) ? (r.find("li[data-name=" + t + "]").addClass("on"), i.removeClass("on"), r.find(".more").removeClass("on")) : void 0
            }, i.prototype.onSearchDrop = function(t) {
                var n;
                return n = $(t.currentTarget), this.suggestion.$del.hide(), n.hasClass("on") ? (n.add("div.search").removeClass("on"), this.novel && this.novel.$el.hide(), this.$(".search input").css("display", "none"), ("mv" === app.curRoute || "playmv" === app.curRoute) && $(app.mvplayer).show()) : (this.novel && this.novel.$el.show(), n.add("div.search").addClass("on"), this.$(".search .hot-sug").show(), e.log({
                    page: "search",
                    expoitem: "hotword"
                }), this.$(".search input").css("display", "block"), ("mv" === app.curRoute || "playmv" === app.curRoute) && (app.mvplayer.pause(), $(app.mvplayer).hide())), this.$(".search").on("touchmove scroll", function(t) {
                    return t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), !1
                })
            }, i.prototype.setActiveItem = function(t) {
                return this.$(".url[data-name=" + t + "]").addClass("on").siblings().removeClass("on")
            }, i.prototype.initHotSug = function() {
                var n;
                return n = $(".search .ui-suggestion"), n.height(window.innerHeight), self.$hotSug = new t({
                    container: n,
                    onItemClick: function(t) {
                        var n;
                        return n = t.title + "-" + t.author, app.router.navigate("/search/" + n, {
                            trigger: !0
                        }), e.log({
                            page: "search",
                            pos: "hotword"
                        })
                    }
                })
            }, i.prototype.initSug = function() {
                var t, n;
                return n = this, t = function() {
                    function t(t) {
                        this.$input = t.input, this.$del = t.deletor, this.$container = t.sugContainer, this.$clear = t.clear, this.emptyTip = '<div class="ui-suggestion-result no-result">æš‚æ— æœç´¢è®°å½•</div>', this.init()
                    }
                    return t.prototype.init = function() {
                        var t;
                        return t = this, $(t.$input).on("input", function() {
                            var e, i;
                            return e = $(this).val(), n.$search.removeClass("show-input"), i = a.getAll(), e ? (t.$clear.hide(), t.$del.show(), t.renderHistoryList(i)) : (t.$del.hide(), t.clearItems(), i.length <= 0 ? (t.$clear.hide(), t.$container.html(t.emptyTip)) : (t.$clear.show(), t.renderHistoryList(i))), clearTimeout(this.pid), this.pid = setTimeout(function() {
                                return t.getMatch(e)
                            }, 400)
                        }), $(t.$input).on("focus", function() {
                            var e;
                            return n.$search.removeClass("show-input"), e = a.getAll(), e.length <= 0 ? (t.$clear.hide(), t.$container.html(t.emptyTip)) : (t.$clear.show(), t.renderHistoryList(e))
                        }), $(n.$form).on("submit", function() {
                            var t;
                            return (t = n.$query.val()) ? (n.$queryBtn.trigger("click"), n.$query.blur(), !1) : !1
                        }), $(n.$btnClearLocal).on("click", function() {
                            return a.clearAll(), t.clearItems(), t.$container.html(t.emptyTip), t.$clear.hide()
                        }), $(this.$del).on("click", function(e) {
                            var n;
                            return $(t.$input).val(""), $(t.$input).focus(), $(t.$del).hide(), t.clearItems(), n = a.getAll(), n.length <= 0 ? (t.$clear.hide(), t.$container.html(t.emptyTip)) : (t.$clear.show(), t.renderHistoryList(n)), t.onDelete.call(t, e), e.preventDefault(), e.stopPropagation(), !1
                        }), $(t.$container).on("click", function(e) {
                            var n;
                            if (!$(e.target).is(".no-result")) return n = $(e.target).text(), t.$input.val(n), $(e.target).is(".url") ? void t.$del.hide() : app.router.navigate("/search/" + n, {
                                trigger: !0
                            })
                        })
                    }, t.prototype.getMatch = function(t) {
                        var n;
                        return n = this, e.api("baidu.ting.search.catalogSug", {
                            query: t
                        }, {
                            handleError: function() {}
                        }).done(function(t) {
                            return n.renderList(t)
                        })
                    }, t.prototype.format = function(t) {
                        var e, n, i, r, o, a, s;
                        for (s = t.order.split(","), r = {}, e = 0, o = 3, n = 0, i = s.length; i > n && (a = s[n], r[a] = t[a].slice(0, o - e), e += r[a].length, !(e >= 3)); n++);
                        return r.count = e, r
                    }, t.prototype.clearItems = function() {
                        return this.$container.empty()
                    }, t.prototype.renderHistoryList = function(t) {
                        var e, n, i, r, o;
                        for (this.clearItems(), e = "", i = 0, r = t.length; r > i; i++) n = t[i], o = '<div class="ui-suggestion-result"><span><%= word %></span></div>', e += _.template(o)({
                            word: n
                        });
                        return this.$container.html(e)
                    }, t.prototype.renderList = function(t) {
                        var e, n, i, r, o, a, s, u;
                        if (e = this.format(t), s = {
                                song: '<div class="url song ui-suggestion-result search-item song-<%= songid %>" data-url="/song/<%= songid %>">å•æ›²<span><%= songname %> </span>â€” <%= artistname %></div>',
                                artist: '<div class="url ui-suggestion-result" data-url="/artist/<%= artistid %>/<%= artistname %>">æ­Œæ‰‹<span><%= artistname %></span></div>',
                                album: '<div class="url ui-suggestion-result" data-url="/album/<%= albumid %>">ä¸“è¾‘<span><%= albumname %></span>â€” <%= artistname %></div>'
                            }, n = "", e.count <= 0) return n = this.emptyTip, void this.$container.html(n);
                        for (u in e)
                            for (a = e[u], r = 0, o = a.length; o > r; r++) i = a[r], n += _.template(s[u])(i);
                        return this.$container.html(n)
                    }, t.prototype.onDelete = function() {}, t
                }(), this.suggestion = new t({
                    input: n.$query,
                    deletor: n.$query.next(),
                    sugContainer: $(".ui-suggestion .ui-suggestion-content"),
                    clear: n.$btnClearLocal,
                    template: "",
                    onItemClick: function() {}
                }), this.$queryBtn.click(function() {
                    var t;
                    return n.suggestion && n.suggestion.clearItems(), e.log({
                        page: "topnav",
                        page_url: location.href,
                        pos: "searchenter"
                    }), t = n.$query.val(), t = t.replace(/[<>'"&]/g, function(t) {
                        var e;
                        return e = {
                            "<": "&lt;",
                            ">": "&gt;",
                            "'": "&lsquo;",
                            '"': "&quot;",
                            "&": "&amp;"
                        }, e[t]
                    }), (t = encodeURIComponent(t)) ? app.router.navigate("/search/" + t, {
                        trigger: !0
                    }) : void 0
                })
            }, i.prototype.addBtn = function(t, e) {
                var n, i, r;
                return r = this, i = function(t) {
                    return t = t || "left", _.include(["both", "left", "right"], t) ? "both" === t ? (r.$(".left").empty(), r.$(".right").empty()) : r.$("." + t).empty() : void 0
                }, n = function(t) {
                    var e, n, i, o;
                    return n = {
                        pos: "left",
                        type: "btn-return",
                        txt: "",
                        className: "btn need-active",
                        log: {
                            pos: "return"
                        },
                        tmpl: '<span class="<%- className %> log" data-log="<%- log %>"></span>'
                    }, i = _.extend(n, t), i.log.page = "searchup" === i.log.pos ? "home" : "topnav", o = i.type, e = $(_.template(i.tmpl)({
                        className: i.className,
                        log: JSON.stringify(i.log)
                    })), r.$("." + i.pos).append(e.addClass(o).text(i.txt))
                }, i(e), _.isArray(t) ? _.each(t, function(t) {
                    return !!t && n(t)
                }) : n(t)
            }, i.prototype.onReturn = function() {
                return this.$search.removeClass("on"), app.router.navigate("home", {
                    trigger: !0
                })
            }, i.prototype.onProduct = function() {
                var t, e;
                return e = this, this.$search.removeClass("on"), "search" === app.curRoute ? (t = e.$(".btn-rect"), $main.removeClass("on-product"), t.hasClass("on") ? (e.$(".btn-rect").removeClass("on"), $(e.el).removeClass("product-on")) : (e.$(".btn-rect").addClass("on"), $(e.el).addClass("product-on"), $main.addClass("on-product"))) : app.router.navigate("product", {
                    trigger: !0
                })
            }, i.prototype.onBack = function() {
                return this.$search.removeClass("on"), app.getHistory()
            }, i.prototype.onRouteChange = function(t, i, r) {
                var a, s, u, l, c, p, d, f;
                for (f = this, f.menu(i, r), this.$search.removeClass("on"), r && r[0] && r[0] !== location.search.slice(1) ? (this.$(".left").removeClass("none-flex").find(".logo").remove(), this.$title.show()) : 0 === this.$(".left .logo").length && (this.$(".left").addClass("none-flex").empty().append("<span class='logo'></span>"), this.$title.hide()), "search" === i ? (o = location.pathname.replace(/^\//, "").split("/")[1] || o || "", e.log({
                        type: "clicksearch",
                        search_res: 1,
                        page_type: "first",
                        key: decodeURIComponent(o)
                    }), f.$query.show().val(decodeURIComponent(o))) : f.$query.val(""), u = "ucenter" === i || 1 === app.store.get("c_mm") ? null : {
                        pos: "right",
                        type: "btn-ucenter",
                        log: {
                            pos: "mysongs"
                        },
                        tmpl: '<span class="btn btn-ucenter url" data-name="ucenter" data-url="/ucenter" data-transition="none"></span>'
                    }, f.addBtn([u, {
                        pos: "right",
                        type: "btn-search",
                        className: "btn",
                        log: {
                            pos: "searchup",
                            page: "home"
                        }
                    }], "right"), _.include(this.urlNavs, i) ? (s = $.os.ios ? cfg.iosDingbuLink : cfg.androidHeaderLink, f.addBtn([{
                        type: "btn-product",
                        className: "btn",
                        pos: "right",
                        log: {
                            pos: "guide"
                        }
                    }, {
                        type: "btn-client log",
                        pos: "right",
                        txt: "å®¢æˆ·ç«¯",
                        tmpl: '<a class="btn-rect ref" data-log=<%= log %> href="' + s + '"></a>',
                        log: {
                            page: "topnav",
                            pos: "downapp",
                            caldl: 0
                        }
                    }], "none"), $.os.ios && f.$(".btn-client").click(function(t) {
                        return e.openIosFunc(t, null, this.href), !1
                    }), 4 === app.store.get("c_tn") && (f.$(".btn-client").hide(), f.$(".btn-product").hide())) : 1 === bigpipe.pageletStack.length ? f.addBtn() : f.addBtn({
                        type: "btn-back",
                        log: {
                            pos: "return"
                        }
                    }, "left"), _.include(["search"], i) && (f.$queryBtn.text("ç™¾åº¦ä¸€ä¸‹"), f.$search.addClass("show-input"), f.suggestion.$del.show(), a = $(".product-nav").find("a"), p = a.length, c = 0, l = "", d = app.curQuery, f.curQuery = app.curQuery, f.setTitle("æœç´¢ç»“æžœ")); p > c; c++) $item = $(a[c]), l = $item.attr("href").replace(/(word=|kw=)(.*)/, function(t, e) {
                    return e + o
                }), $item.attr("href", l);
                return 1 === app.store.get("c_tn") ? $main.css({
                    "margin-top": 44
                }) : _.include(this.urlNavs, i) ? 1 === app.store.get("c_tn") && $main.css({
                    "margin-top": 37
                }) : 1 === app.store.get("c_tn") && $main.css({
                    "margin-top": 0
                }), f.$(".btn-search").removeClass("on"), n.updateHeaderHeight()
            }, i
        }(), {
            init: function() {
                return app.$header = new i({
                    el: $("#header")[0]
                })
            }
        }
    }), define("init", ["utils", "lazyload", "app", "widgets/header"], function(t, e, n, i) {
        _.utils = t, t.lazyload = e, Backbone.history.once("route", function(t, e, n) {
            return setTimeout(function() {
                return app.$header.onRouteChange(t, e, n)
            }, 0)
        }), window.app = new n, i.init(), 1 === app.store.get("c_tn") && (app.$header.$(".bar").hide(), app.$header.$(".product-nav").hide(), app.$header.$(".search").css({
            top: 0
        }))
    }), define("widgets/mp-openapp", ["moplus"], function(t) {
        t = win.Box, win.moplus = moplus = t.moplus();
        var e = {
            apiAvail: function() {
                var t = $.Deferred();
                return moplus.api("getpackageinfo", {
                    packagename: "com.ting.mp3.android"
                }, function(e) {
                    0 != e.error ? (console.log("Call Native Fall: ", e.error), t.resolve(!1)) : (version = e.package_infos[0].version_name, 0 === e.error && parseFloat(version.substring(0, 3)) >= 3.1 ? t.resolve(!0, version) : t.resolve(!1))
                }), t.promise()
            },
            openAndroid: function(t) {
                var e = t.callback,
                    n = function() {
                        return e ? e.error : function() {}
                    }(),
                    i = function() {
                        return e ? e.success : function() {}
                    }(),
                    r = this.intentMap[t.type].intent,
                    o = this.intentMap[t.type].schema,
                    a = t.data,
                    s = null;
                for (s in a)
                    if (r = r.replace("{" + s + "}", a[s]), o = o.replace("#" + s + "#", a[s]), "songid" === s && "" === a[s]) return void n();
                moplus.sendIntent(r, function(t) {
                    0 != t.error ? (console.log("Call Native Fall: ", t.error), n()) : i()
                })
            },
            intentMap: {
                downloadNew: {
                    intent: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=download;S.songid={songid};S.launcher_type=musicwebapp;end",
                    schema: 'baidumusicnew://hybrid?info={"fr":"musicwebapp", "action":"download", "args": [#songid#], "callback":""}'
                },
                songNew: {
                    intent: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=playsong;S.songid={songid};S.launcher_type=musicwebapp;end",
                    schema: 'baidumusicnew://hybrid?info={"fr":"musicwebapp", action":"play", "args":{"list": [#songid#], "cur": 0}, "callback":""}'
                },
                mv: {
                    intent: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type={type};S.mvid={mvid};S.mvlist={mvlist};S.launcher_type=musicwebapp;end",
                    schema: 'baidumusicnew://hybrid?info={"fr":"musicwebapp", action":"playmv", "args":{"list": [#mvid#], "cur": 0}, "callback":""}'
                }
            }
        };
        return e
    }), define("mod/base/item-action", ["widgets/mp-openapp"], function() {
        var t;
        return t = function(t, e, n, i) {
            var r, o, a, s, u, l, c, p, d;
            if (a = !1, d = Math.min(e.length, n.length), p = !0, c = !0, s = 0, l = u = r = e.indexOf(t), o = e.indexOf(t), i || (i = 2), -1 !== r && -1 !== o && (a = !0), !a) return 0;
            for (; p || c;) l -= 1, u += 1, l > -1 && e[l] === n[l] ? s++ : p = !1, d > u && e[u] === n[u] ? s++ : c = !1;
            return i >= d ? 0 : (1 + s) / d
        }, $main.on("click", ".song.url .icon-ring, .song.playring .icon-ring", function(t) {
            var e;
            return e = $(t.currentTarget).parents(".song.url").data("sid"), _.utils.api("baidu.ting.song.play", {
                songid: e
            }).done(function(t) {
                require(["widgets/panel"], function(e) {
                    var n;
                    n = t.songinfo, n.title = _.utils.html2text(n.title), n.content = "å“‡ï¼è¿™é¦–æ­Œæœ‰å¥½å¬çš„å½©é“ƒå“¦", e.show({
                        type: "ring",
                        title: "å½©é“ƒ",
                        data: n
                    }), _.utils.log({
                        page: app.curRoute,
                        pos: "in_cailing"
                    })
                })
            }), !1
        }), $main.on("click", ".icon-collected", function(t) {
            var e, n;
            return t.preventDefault(), t.stopPropagation(), n = $(this).parent().data("sid"), title = $(this).siblings(".left").find("span:first-child").text(), e = $(t.currentTarget), e.hasClass("do-shake") ? void 0 : e.hasClass("fav") ? (_.utils.log({
                pos: "cancel_fav",
                sub: "mysongs"
            }), e.addClass("do-shake"), _.utils.deleteRedHeart(n).done(function(t) {
                return t ? setTimeout(function() {
                    return e.removeClass("fav do-shake").addClass("unfav")
                }, 1e3) : _.utils.showTips("èº«ä»½è¿‡æœŸï¼Œè¯·é‡æ–°ç™»å½•")
            })) : (_.utils.log({
                pos: "fav",
                sub: "mysongs"
            }), _.utils.addRedHeart({
                song_id: n,
                title: title
            }).done(function() {
                return e.removeClass("unfav").addClass("fav")
            }))
        }), $main.on("click", ".song .icon-mv", function() {
            _.utils.log({
                pos: "mvbtn"
            })
        }), $main.on("click", ".song.url .download, .song.playring .download", function(t) {
            var e;
            return t.preventDefault(), t.stopImmediatePropagation(), $(this).hasClass("log") && $(this).data("log") && _.utils.log($(this).data("log")), e = $(t.currentTarget).parents(".song.url").data("sid") || $(t.currentTarget).parents(".song.playring").data("sid"), _.utils.initDownloadSongHQ({
                songId: e
            }, app.curRoute), _.utils.log({
                pos: "popdownload",
                page: app.curRoute
            })
        })
    }), define("widgets/openapp", [], function() {
        var t = {
            openApp: function(t) {
                var e = {
                        newOpenAppUri: "http://127.0.0.1:6259/sendintent?intent=" + window.encodeURIComponent(t.openAppUri) + "&t=",
                        openAppUri: ""
                    },
                    n = {};
                n = $.extend(e, t || {}), n.checkSuccess = n.checkSuccess || function() {}, n.checkError = n.checkError || function() {}, this.checkApp(n, n.checkSuccess, n.checkError)
            },
            jsonpy: function(t, e, n, i) {
                var r = "__jsonp" + parseInt(1e4 * Math.random(), 10),
                    o = "string" == typeof t ? t : t.url,
                    a = t.field || "callback",
                    s = t.timeout || !1,
                    u = null,
                    l = document.createElement("script"),
                    c = null,
                    p = null,
                    d = {
                        done: [],
                        fail: [],
                        always: []
                    },
                    f = function(t, e) {
                        for (; cb = t.shift();) cb.apply(this, e)
                    },
                    h = function() {
                        c && (f(d[c], p), f(d.always, p))
                    },
                    g = {
                        done: function(t) {
                            return d.done.push(t), h(), g
                        },
                        fail: function(t) {
                            return d.fail.push(t), h(), g
                        },
                        always: function(t) {
                            return d.always.push(t), h(), g
                        }
                    },
                    m = function() {
                        c || (delete window[r], document.body.removeChild(l), u && (clearTimeout(u), u = null))
                    },
                    y = function() {
                        c || (m(), setStatus(!0, arguments))
                    },
                    v = function() {
                        c || (m(), setStatus(!1, arguments))
                    };
                return setStatus = function(t, e) {
                    c || (c = ["fail", "done"][+t], p = e, h())
                }, buildUrl = function() {
                    return o + ["?", "&"][+(o.indexOf("?") >= 0)] + [encodeURIComponent(a), encodeURIComponent(r)].join("=")
                }, init = function() {
                    l.type = "text/javascript", l.src = buildUrl(), l.async = !0, l.addEventListener("error", v, !0), t.done && g.done(t.done), t.fail && g.fail(t.fail), t.always && g.always(t.always), e && g.done(e), n && g.fail(n), i && g.always(i)
                }, connect = function() {
                    window[r] = y, document.body.appendChild(l), s && (u = setTimeout(v, s))
                }, init(), connect(), g
            },
            checkApp: function(t, e, n) {
                this.jsonpy({
                    url: t.newOpenAppUri + +new Date,
                    timeout: 2e3,
                    done: function(t) {
                        0 === t.error ? e() : n()
                    },
                    fail: function() {
                        n()
                    },
                    always: function() {}
                })
            },
            apiAvail: function() {
                var t = $.Deferred();
                return $.ajax({
                    url: "http://127.0.0.1:6259/getpackageinfo?packagename=com.ting.mp3.android",
                    dataType: "jsonp"
                }).then(function(e) {
                    0 != e.error && (console.log("Call Native Fall: ", e.error), t.resolve(!1)), version = e.package_infos[0].version_name, 0 === e.error && parseFloat(version.substring(0, 3)) >= 3.1 ? t.resolve(!0, version) : t.resolve(!1)
                }, function() {
                    console.log("Call Native Fall"), t.resolve(!1)
                }), t.promise()
            },
            openAndroid: function(t) {
                var e = this,
                    n = t.callback,
                    i = function() {
                        return n ? n.error : function() {}
                    }(),
                    r = function() {
                        return n ? n.success : function() {}
                    }(),
                    o = this.intentMap[t.type],
                    a = t.data,
                    s = null;
                for (s in a)
                    if (o = o.replace("{" + s + "}", a[s]), "songid" === s && "" === a[s]) return void i();
                _.utils.checkNative(function() {
                    e.openApp({
                        openAppUri: o,
                        checkError: i,
                        checkSuccess: r
                    })
                }, function() {
                    i()
                })
            },
            intentMap: {
                download: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=download;l.songid={songid};S.allrate={allrate};i.charge={charge};i.havehigh={havehigh};S.launcher_type=musicwebapp;end",
                song: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/.activity.MusicPlayingActivity;S.launcher_from=aladdin;S.type=playsong;l.songid={songid};S.trackname={songname};S.artistname={artistname};S.launcher_type=musicwebapp;end",
                artist: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=artist;l.artistid={artistid};S.launcher_type=musicwebapp;end",
                downloadSongs: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.download.BatchDownloadSelectActivity;S.launcher_from=aladdin;S.type=batch_download;S.batch_download_type=artist;l.artistid={artistid};S.launcher_type=musicwebapp;end",
                downloadSongsNew: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.download.BatchDownloadActivity;S.launcher_from=aladdin;S.type=batch_download;S.batch_download_type=artist;l.artistid={artistid};S.launcher_type=musicwebapp;end",
                songNew: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=playsong;S.songid={songid};S.launcher_type=musicwebapp;end",
                page: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type={type};l.id={id};S.info={info};S.launcher_type=musicwebapp;end",
                share: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type={type};S.title={title};S.artistname={artistname};l.listid={listid};S.desc={desc};S.piclink={piclink};l.songid={songid};S.launcher_type=musicwebapp;end",
                downloadNew: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type=download;S.songid={songid};S.launcher_type=musicwebapp;end",
                mv: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;component=com.ting.mp3.android/com.baidu.music.ui.UIMain;S.launcher_from=aladdin;S.type={type};S.mvid={mvid};S.mvlist={mvlist};S.launcher_type=musicwebapp;end"
            }
        };
        return t
    });