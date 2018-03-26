!
function(e) {
    if (! ("indexOf" in Array.prototype)) {
        Array.prototype.indexOf = function(k, j) {
            if (j === undefined) {
                j = 0

            }
            if (j < 0) {
                j += this.length

            }
            if (j < 0) {
                j = 0

            }
            for (var l = this.length; j < l; j++) {
                if (j in this && this[j] === k) {
                    return j

                }

            }
            return - 1

        }

    }
    function b(k) {
        var j = e(k);
        var i = j.add(j.parents());
        var l = false;
        i.each(function() {
            if (e(this).css("position") === "fixed") {
                l = true;
                return false

            }

        });
        return l

    }
    function h() {
        return new Date(Date.UTC.apply(Date, arguments))

    }
    function c() {
        var i = new Date();
        return h(i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate(), i.getUTCHours(), i.getUTCMinutes(), i.getUTCSeconds(), 0)

    }
    var g = function(k, j) {
        var m = this;
        this.element = e(k);
        this.container = j.container || "body";
        this.language = j.language || this.element.data("date-language") || "en";
        this.language = this.language in f ? this.language: this.language.split("-")[0];
        this.language = this.language in f ? this.language: "en";
        this.isRTL = f[this.language].rtl || false;
        this.formatType = j.formatType || this.element.data("format-type") || "standard";
        this.format = d.parseFormat(j.format || this.element.data("date-format") || f[this.language].format || d.getDefaultFormat(this.formatType, "input"), this.formatType);
        this.isInline = false;
        this.isVisible = false;
        this.isInput = this.element.is("input");
        this.fontAwesome = j.fontAwesome || this.element.data("font-awesome") || false;
        this.bootcssVer = j.bootcssVer || (this.isInput ? (this.element.is(".form-control") ? 3: 2) : (this.bootcssVer = this.element.is(".input-group") ? 3: 2));
        this.component = this.element.is(".date") ? (this.bootcssVer == 3 ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar .fa-calendar .fa-clock-o").parent()) : false;
        this.componentReset = this.element.is(".date") ? (this.bootcssVer == 3 ? this.element.find(".input-group-addon .glyphicon-remove, .input-group-addon .fa-times").parent() : this.element.find(".add-on .icon-remove, .add-on .fa-times").parent()) : false;
        this.hasInput = this.component && this.element.find("input").length;
        if (this.component && this.component.length === 0) {
            this.component = false

        }
        this.linkField = j.linkField || this.element.data("link-field") || false;
        this.linkFormat = d.parseFormat(j.linkFormat || this.element.data("link-format") || d.getDefaultFormat(this.formatType, "link"), this.formatType);
        this.minuteStep = j.minuteStep || this.element.data("minute-step") || 5;
        this.pickerPosition = j.pickerPosition || this.element.data("picker-position") || "bottom-right";
        this.showMeridian = j.showMeridian || this.element.data("show-meridian") || false;
        this.initialDate = j.initialDate || new Date();
        this.zIndex = j.zIndex || this.element.data("z-index") || undefined;
        this.icons = {
            leftArrow: this.fontAwesome ? "fa-arrow-left": (this.bootcssVer === 3 ? "glyphicon-arrow-left": "icon-arrow-left"),
            rightArrow: this.fontAwesome ? "fa-arrow-right": (this.bootcssVer === 3 ? "glyphicon-arrow-right": "icon-arrow-right")

        };
        this.icontype = this.fontAwesome ? "fa": "glyphicon";
        this._attachEvents();
        this.clickedOutside = function(n) {
            if (e(n.target).closest(".datetimepicker").length === 0) {
                m.hide()

            }

        };
        this.formatViewType = "datetime";
        if ("formatViewType" in j) {
            this.formatViewType = j.formatViewType

        } else {
            if ("formatViewType" in this.element.data()) {
                this.formatViewType = this.element.data("formatViewType")

            }

        }
        this.minView = 0;
        if ("minView" in j) {
            this.minView = j.minView

        } else {
            if ("minView" in this.element.data()) {
                this.minView = this.element.data("min-view")

            }

        }
        this.minView = d.convertViewMode(this.minView);
        this.maxView = d.modes.length - 1;
        if ("maxView" in j) {
            this.maxView = j.maxView

        } else {
            if ("maxView" in this.element.data()) {
                this.maxView = this.element.data("max-view")

            }

        }
        this.maxView = d.convertViewMode(this.maxView);
        this.wheelViewModeNavigation = false;
        if ("wheelViewModeNavigation" in j) {
            this.wheelViewModeNavigation = j.wheelViewModeNavigation

        } else {
            if ("wheelViewModeNavigation" in this.element.data()) {
                this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")

            }

        }
        this.wheelViewModeNavigationInverseDirection = false;
        if ("wheelViewModeNavigationInverseDirection" in j) {
            this.wheelViewModeNavigationInverseDirection = j.wheelViewModeNavigationInverseDirection

        } else {
            if ("wheelViewModeNavigationInverseDirection" in this.element.data()) {
                this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")

            }

        }
        this.wheelViewModeNavigationDelay = 100;
        if ("wheelViewModeNavigationDelay" in j) {
            this.wheelViewModeNavigationDelay = j.wheelViewModeNavigationDelay

        } else {
            if ("wheelViewModeNavigationDelay" in this.element.data()) {
                this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")

            }

        }
        this.startViewMode = 2;
        if ("startView" in j) {
            this.startViewMode = j.startView

        } else {
            if ("startView" in this.element.data()) {
                this.startViewMode = this.element.data("start-view")

            }

        }
        this.startViewMode = d.convertViewMode(this.startViewMode);
        this.viewMode = this.startViewMode;
        this.viewSelect = this.minView;
        if ("viewSelect" in j) {
            this.viewSelect = j.viewSelect

        } else {
            if ("viewSelect" in this.element.data()) {
                this.viewSelect = this.element.data("view-select")

            }

        }
        this.viewSelect = d.convertViewMode(this.viewSelect);
        this.forceParse = true;
        if ("forceParse" in j) {
            this.forceParse = j.forceParse

        } else {
            if ("dateForceParse" in this.element.data()) {
                this.forceParse = this.element.data("date-force-parse")

            }

        }
        var l = this.bootcssVer === 3 ? d.templateV3: d.template;
        while (l.indexOf("{iconType}") !== -1) {
            l = l.replace("{iconType}", this.icontype)

        }
        while (l.indexOf("{leftArrow}") !== -1) {
            l = l.replace("{leftArrow}", this.icons.leftArrow)

        }
        while (l.indexOf("{rightArrow}") !== -1) {
            l = l.replace("{rightArrow}", this.icons.rightArrow)

        }
        this.picker = e(l).appendTo(this.isInline ? this.element: this.container).on({
            click: e.proxy(this.click, this),
            mousedown: e.proxy(this.mousedown, this)

        });
        if (this.wheelViewModeNavigation) {
            if (e.fn.mousewheel) {
                this.picker.on({
                    mousewheel: e.proxy(this.mousewheel, this)

                })

            } else {
                console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")

            }

        }
        if (this.isInline) {
            this.picker.addClass("datetimepicker-inline")

        } else {
            this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu")

        }
        if (this.isRTL) {
            this.picker.addClass("datetimepicker-rtl");
            var i = this.bootcssVer === 3 ? ".prev span, .next span": ".prev i, .next i";
            this.picker.find(i).toggleClass(this.icons.leftArrow + " " + this.icons.rightArrow)

        }
        e(document).on("mousedown", this.clickedOutside);
        this.autoclose = false;
        if ("autoclose" in j) {
            this.autoclose = j.autoclose

        } else {
            if ("dateAutoclose" in this.element.data()) {
                this.autoclose = this.element.data("date-autoclose")

            }

        }
        this.keyboardNavigation = true;
        if ("keyboardNavigation" in j) {
            this.keyboardNavigation = j.keyboardNavigation

        } else {
            if ("dateKeyboardNavigation" in this.element.data()) {
                this.keyboardNavigation = this.element.data("date-keyboard-navigation")

            }

        }
        this.todayBtn = (j.todayBtn || this.element.data("date-today-btn") || false);
        this.todayHighlight = (j.todayHighlight || this.element.data("date-today-highlight") || false);
        this.weekStart = ((j.weekStart || this.element.data("date-weekstart") || f[this.language].weekStart || 0) % 7);
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(j.startDate || this.element.data("date-startdate"));
        this.setEndDate(j.endDate || this.element.data("date-enddate"));
        this.setDaysOfWeekDisabled(j.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
        this.setMinutesDisabled(j.minutesDisabled || this.element.data("date-minute-disabled"));
        this.setHoursDisabled(j.hoursDisabled || this.element.data("date-hour-disabled"));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        if (this.isInline) {
            this.show()

        }

    };
    g.prototype = {
        constructor: g,
        _events: [],
        _attachEvents: function() {
            this._detachEvents();
            if (this.isInput) {
                this._events = [[this.element, {
                    focus: e.proxy(this.show, this),
                    keyup: e.proxy(this.update, this),
                    keydown: e.proxy(this.keydown, this)

                }]]

            } else {
                if (this.component && this.hasInput) {
                    this._events = [[this.element.find("input"), {
                        focus: e.proxy(this.show, this),
                        keyup: e.proxy(this.update, this),
                        keydown: e.proxy(this.keydown, this)

                    }], [this.component, {
                        click: e.proxy(this.show, this)

                    }]];
                    if (this.componentReset) {
                        this._events.push([this.componentReset, {
                            click: e.proxy(this.reset, this)

                        }])

                    }

                } else {
                    if (this.element.is("div")) {
                        this.isInline = true

                    } else {
                        this._events = [[this.element, {
                            click: e.proxy(this.show, this)

                        }]]

                    }

                }

            }
            for (var j = 0, k, l; j < this._events.length; j++) {
                k = this._events[j][0];
                l = this._events[j][1];
                k.on(l)

            }

        },
        _detachEvents: function() {
            for (var j = 0, k, l; j < this._events.length; j++) {
                k = this._events[j][0];
                l = this._events[j][1];
                k.off(l)

            }
            this._events = []

        },
        show: function(i) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            if (this.forceParse) {
                this.update()

            }
            this.place();
            e(window).on("resize", e.proxy(this.place, this));
            if (i) {
                i.stopPropagation();
                i.preventDefault()

            }
            this.isVisible = true;
            this.element.trigger({
                type: "show",
                date: this.date

            })

        },
        hide: function(i) {
            if (!this.isVisible) {
                return

            }
            if (this.isInline) {
                return

            }
            this.picker.hide();
            e(window).off("resize", this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                e(document).off("mousedown", this.hide)

            }
            if (this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val())) {
                this.setValue()

            }
            this.isVisible = false;
            this.element.trigger({
                type: "hide",
                date: this.date

            })

        },
        remove: function() {
            this._detachEvents();
            e(document).off("mousedown", this.clickedOutside);
            this.picker.remove();
            delete this.picker;
            delete this.element.data().datetimepicker

        },
        getDate: function() {
            var i = this.getUTCDate();
            return new Date(i.getTime() + (i.getTimezoneOffset() * 60000))

        },
        getUTCDate: function() {
            return this.date

        },
        setDate: function(i) {
            this.setUTCDate(new Date(i.getTime() - (i.getTimezoneOffset() * 60000)))

        },
        setUTCDate: function(i) {
            if (i >= this.startDate && i <= this.endDate) {
                this.date = i;
                this.setValue();
                this.viewDate = this.date;
                this.fill()

            } else {
                this.element.trigger({
                    type: "outOfRange",
                    date: i,
                    startDate: this.startDate,
                    endDate: this.endDate

                })

            }

        },
        setFormat: function(j) {
            this.format = d.parseFormat(j, this.formatType);
            var i;
            if (this.isInput) {
                i = this.element

            } else {
                if (this.component) {
                    i = this.element.find("input")

                }

            }
            if (i && i.val()) {
                this.setValue()

            }

        },
        setValue: function() {
            var i = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component) {
                    this.element.find("input").val(i)

                }
                this.element.data("date", i)

            } else {
                this.element.val(i)

            }
            if (this.linkField) {
                e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))

            }

        },
        getFormattedDate: function(i) {
            if (i == undefined) {
                i = this.format

            }
            return d.formatDate(this.date, i, this.language, this.formatType)

        },
        setStartDate: function(i) {
            this.startDate = i || -Infinity;
            if (this.startDate !== -Infinity) {
                this.startDate = d.parseDate(this.startDate, this.format, this.language, this.formatType)

            }
            this.update();
            this.updateNavArrows()

        },
        setEndDate: function(i) {
            this.endDate = i || Infinity;
            if (this.endDate !== Infinity) {
                this.endDate = d.parseDate(this.endDate, this.format, this.language, this.formatType)

            }
            this.update();
            this.updateNavArrows()

        },
        setDaysOfWeekDisabled: function(i) {
            this.daysOfWeekDisabled = i || [];
            if (!e.isArray(this.daysOfWeekDisabled)) {
                this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)

            }
            this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, 
            function(j) {
                return parseInt(j, 10)

            });
            this.update();
            this.updateNavArrows()

        },
        setMinutesDisabled: function(i) {
            this.minutesDisabled = i || [];
            if (!e.isArray(this.minutesDisabled)) {
                this.minutesDisabled = this.minutesDisabled.split(/,\s*/)

            }
            this.minutesDisabled = e.map(this.minutesDisabled, 
            function(j) {
                return parseInt(j, 10)

            });
            this.update();
            this.updateNavArrows()

        },
        setHoursDisabled: function(i) {
            this.hoursDisabled = i || [];
            if (!e.isArray(this.hoursDisabled)) {
                this.hoursDisabled = this.hoursDisabled.split(/,\s*/)

            }
            this.hoursDisabled = e.map(this.hoursDisabled, 
            function(j) {
                return parseInt(j, 10)

            });
            this.update();
            this.updateNavArrows()

        },
        place: function() {
            if (this.isInline) {
                return

            }
            if (!this.zIndex) {
                var j = 0;
                e("div").each(function() {
                    var o = parseInt(e(this).css("zIndex"), 10);
                    if (o > j) {
                        j = o

                    }

                });
                this.zIndex = j + 10

            }
            var n,
            m,
            l,
            k;
            if (this.container instanceof e) {
                k = this.container.offset()

            } else {
                k = e(this.container).offset()

            }
            if (this.component) {
                n = this.component.offset();
                l = n.left;
                if (this.pickerPosition == "bottom-left" || this.pickerPosition == "top-left") {
                    l += this.component.outerWidth() - this.picker.outerWidth()

                }

            } else {
                n = this.element.offset();
                l = n.left

            }
            var i = document.body.clientWidth || window.innerWidth;
            if (l + 220 > i) {
                l = i - 220

            }
            if (this.pickerPosition == "top-left" || this.pickerPosition == "top-right") {
                m = n.top - this.picker.outerHeight()

            } else {
                m = n.top + this.height

            }
            m = m - k.top;
            l = l - k.left;
            if (!b(this.element)) {
                // m = m + document.body.scrollTop
            	top = top

            }
            this.picker.css({
                top: m,
                left: l,
                zIndex: this.zIndex

            })

        },
        update: function() {
            var i,
            j = false;
            if (arguments && arguments.length && (typeof arguments[0] === "string" || arguments[0] instanceof Date)) {
                i = arguments[0];
                j = true

            } else {
                i = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate;
                if (typeof i == "string" || i instanceof String) {
                    i = i.replace(/^\s+|\s+$/g, "")

                }

            }
            if (!i) {
                i = new Date();
                j = false

            }
            this.date = d.parseDate(i, this.format, this.language, this.formatType);
            if (j) {
                this.setValue()

            }
            if (this.date < this.startDate) {
                this.viewDate = new Date(this.startDate)

            } else {
                if (this.date > this.endDate) {
                    this.viewDate = new Date(this.endDate)

                } else {
                    this.viewDate = new Date(this.date)

                }

            }
            this.fill()

        },
        fillDow: function() {
            var i = this.weekStart,
            j = "<tr>";
            while (i < this.weekStart + 7) {
                j += '<th class="dow">' + f[this.language].daysMin[(i++) % 7] + "</th>"

            }
            j += "</tr>";
            this.picker.find(".datetimepicker-days thead").append(j)

        },
        fillMonths: function() {
            var k = "",
            j = 0;
            while (j < 12) {
                k += '<span class="month">' + f[this.language].monthsShort[j++] + "</span>"

            }
            this.picker.find(".datetimepicker-months td").html(k)

        },
        fill: function() {
            if (this.date == null || this.viewDate == null) {
                return

            }
            var H = new Date(this.viewDate),
            u = H.getUTCFullYear(),
            I = H.getUTCMonth(),
            n = H.getUTCDate(),
            D = H.getUTCHours(),
            y = H.getUTCMinutes(),
            z = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
            E = this.startDate !== -Infinity ? this.startDate.getUTCMonth() + 1: -Infinity,
            q = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
            A = this.endDate !== Infinity ? this.endDate.getUTCMonth() + 1: Infinity,
            r = (new h(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
            G = new Date();
            this.picker.find(".datetimepicker-days thead th:eq(1)").text(f[this.language].months[I] + " " + u);
            if (this.formatViewType == "time") {
                var k = this.getFormattedDate();
                this.picker.find(".datetimepicker-hours thead th:eq(1)").text(k);
                this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(k)

            } else {
                this.picker.find(".datetimepicker-hours thead th:eq(1)").text(n + " " + f[this.language].months[I] + " " + u);
                this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(n + " " + f[this.language].months[I] + " " + u)

            }
            this.picker.find("tfoot th.today").text(f[this.language].today).toggle(this.todayBtn !== false);
            this.updateNavArrows();
            this.fillMonths();
            var K = h(u, I - 1, 28, 0, 0, 0, 0),
            C = d.getDaysInMonth(K.getUTCFullYear(), K.getUTCMonth());
            K.setUTCDate(C);
            K.setUTCDate(C - (K.getUTCDay() - this.weekStart + 7) % 7);
            var j = new Date(K);
            j.setUTCDate(j.getUTCDate() + 42);
            j = j.valueOf();
            var s = [];
            var v;
            while (K.valueOf() < j) {
                if (K.getUTCDay() == this.weekStart) {
                    s.push("<tr>")

                }
                v = "";
                if (K.getUTCFullYear() < u || (K.getUTCFullYear() == u && K.getUTCMonth() < I)) {
                    v += " old"

                } else {
                    if (K.getUTCFullYear() > u || (K.getUTCFullYear() == u && K.getUTCMonth() > I)) {
                        v += " new"

                    }

                }
                if (this.todayHighlight && K.getUTCFullYear() == G.getFullYear() && K.getUTCMonth() == G.getMonth() && K.getUTCDate() == G.getDate()) {
                    v += " today"

                }
                if (K.valueOf() == r) {
                    v += " active"

                }
                if ((K.valueOf() + 86400000) <= this.startDate || K.valueOf() > this.endDate || e.inArray(K.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
                    v += " disabled"

                }
                s.push('<td class="day' + v + '">' + K.getUTCDate() + "</td>");
                if (K.getUTCDay() == this.weekEnd) {
                    s.push("</tr>")

                }
                K.setUTCDate(K.getUTCDate() + 1)

            }
            this.picker.find(".datetimepicker-days tbody").empty().append(s.join(""));
            s = [];
            var w = "",
            F = "",
            t = "";
            var l = this.hoursDisabled || [];
            for (var B = 0; B < 24; B++) {
                if (l.indexOf(B) !== -1) {
                    continue

                }
                var x = h(u, I, n, B);
                v = "";
                if ((x.valueOf() + 3600000) <= this.startDate || x.valueOf() > this.endDate) {
                    v += " disabled"

                } else {
                    if (D == B) {
                        v += " active"

                    }

                }
                if (this.showMeridian && f[this.language].meridiem.length == 2) {
                    F = (B < 12 ? f[this.language].meridiem[0] : f[this.language].meridiem[1]);
                    if (F != t) {
                        if (t != "") {
                            s.push("</fieldset>")

                        }
                        s.push('<fieldset class="hour"><legend>' + F.toUpperCase() + "</legend>")

                    }
                    t = F;
                    w = (B % 12 ? B % 12: 12);
                    s.push('<span class="hour' + v + " hour_" + (B < 12 ? "am": "pm") + '">' + w + "</span>");
                    if (B == 23) {
                        s.push("</fieldset>")

                    }

                } else {
                    w = B + ":00";
                    s.push('<span class="hour' + v + '">' + w + "</span>")

                }

            }
            this.picker.find(".datetimepicker-hours td").html(s.join(""));
            s = [];
            w = "",
            F = "",
            t = "";
            var m = this.minutesDisabled || [];
            for (var B = 0; B < 60; B += this.minuteStep) {
                if (m.indexOf(B) !== -1) {
                    continue

                }
                var x = h(u, I, n, D, B, 0);
                v = "";
                if (x.valueOf() < this.startDate || x.valueOf() > this.endDate) {
                    v += " disabled"

                } else {
                    if (Math.floor(y / this.minuteStep) == Math.floor(B / this.minuteStep)) {
                        v += " active"

                    }

                }
                if (this.showMeridian && f[this.language].meridiem.length == 2) {
                    F = (D < 12 ? f[this.language].meridiem[0] : f[this.language].meridiem[1]);
                    if (F != t) {
                        if (t != "") {
                            s.push("</fieldset>")

                        }
                        s.push('<fieldset class="minute"><legend>' + F.toUpperCase() + "</legend>")

                    }
                    t = F;
                    w = (D % 12 ? D % 12: 12);
                    s.push('<span class="minute' + v + '">' + w + ":" + (B < 10 ? "0" + B: B) + "</span>");
                    if (B == 59) {
                        s.push("</fieldset>")

                    }

                } else {
                    w = B + ":00";
                    s.push('<span class="minute' + v + '">' + D + ":" + (B < 10 ? "0" + B: B) + "</span>")

                }

            }
            this.picker.find(".datetimepicker-minutes td").html(s.join(""));
            var L = this.date.getUTCFullYear();
            var p = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(u).end().find("span").removeClass("active");
            if (L == u) {
                var o = p.length - 12;
                p.eq(this.date.getUTCMonth() + o).addClass("active")

            }
            if (u < z || u > q) {
                p.addClass("disabled")

            }
            if (u == z) {
                p.slice(0, E + 1).addClass("disabled")

            }
            if (u == q) {
                p.slice(A).addClass("disabled")

            }
            s = "";
            u = parseInt(u / 10, 10) * 10;
            var J = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(u + "-" + (u + 9)).end().find("td");
            u -= 1;
            for (var B = -1; B < 11; B++) {
                s += '<span class="year' + (B == -1 || B == 10 ? " old": "") + (L == u ? " active": "") + (u < z || u > q ? " disabled": "") + '">' + u + "</span>";
                u += 1

            }
            J.html(s);
            this.place()

        },
        updateNavArrows: function() {
            var m = new Date(this.viewDate),
            k = m.getUTCFullYear(),
            l = m.getUTCMonth(),
            j = m.getUTCDate(),
            i = m.getUTCHours();
            switch (this.viewMode) {
                case 0:
                if (this.startDate !== -Infinity && k <= this.startDate.getUTCFullYear() && l <= this.startDate.getUTCMonth() && j <= this.startDate.getUTCDate() && i <= this.startDate.getUTCHours()) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"

                    })

                }
                if (this.endDate !== Infinity && k >= this.endDate.getUTCFullYear() && l >= this.endDate.getUTCMonth() && j >= this.endDate.getUTCDate() && i >= this.endDate.getUTCHours()) {
                    this.picker.find(".next").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"

                    })

                }
                break;
                case 1:
                if (this.startDate !== -Infinity && k <= this.startDate.getUTCFullYear() && l <= this.startDate.getUTCMonth() && j <= this.startDate.getUTCDate()) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"

                    })

                }
                if (this.endDate !== Infinity && k >= this.endDate.getUTCFullYear() && l >= this.endDate.getUTCMonth() && j >= this.endDate.getUTCDate()) {
                    this.picker.find(".next").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"

                    })

                }
                break;
                case 2:
                if (this.startDate !== -Infinity && k <= this.startDate.getUTCFullYear() && l <= this.startDate.getUTCMonth()) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"

                    })

                }
                if (this.endDate !== Infinity && k >= this.endDate.getUTCFullYear() && l >= this.endDate.getUTCMonth()) {
                    this.picker.find(".next").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"

                    })

                }
                break;
                case 3:
            case 4:
                if (this.startDate !== -Infinity && k <= this.startDate.getUTCFullYear()) {
                    this.picker.find(".prev").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".prev").css({
                        visibility: "visible"

                    })

                }
                if (this.endDate !== Infinity && k >= this.endDate.getUTCFullYear()) {
                    this.picker.find(".next").css({
                        visibility: "hidden"

                    })

                } else {
                    this.picker.find(".next").css({
                        visibility: "visible"

                    })

                }
                break

            }

        },
        mousewheel: function(j) {
            j.preventDefault();
            j.stopPropagation();
            if (this.wheelPause) {
                return

            }
            this.wheelPause = true;
            var i = j.originalEvent;
            var l = i.wheelDelta;
            var k = l > 0 ? 1: (l === 0) ? 0: -1;
            if (this.wheelViewModeNavigationInverseDirection) {
                k = -k

            }
            this.showMode(k);
            setTimeout(e.proxy(function() {
                this.wheelPause = false

            },
            this), this.wheelViewModeNavigationDelay)

        },
        click: function(m) {
            m.stopPropagation();
            m.preventDefault();
            var n = e(m.target).closest("span, td, th, legend");
            if (n.is("." + this.icontype)) {
                n = e(n).parent().closest("span, td, th, legend")

            }
            if (n.length == 1) {
                if (n.is(".disabled")) {
                    this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate

                    });
                    return

                }
                switch (n[0].nodeName.toLowerCase()) {
                    case "th":
                    switch (n[0].className) {
                        case "switch":
                        this.showMode(1);
                        break;
                        case "prev":
                    case "next":
                        var i = d.modes[this.viewMode].navStep * (n[0].className == "prev" ? -1: 1);
                        switch (this.viewMode) {
                            case 0:
                            this.viewDate = this.moveHour(this.viewDate, i);
                            break;
                            case 1:
                            this.viewDate = this.moveDate(this.viewDate, i);
                            break;
                            case 2:
                            this.viewDate = this.moveMonth(this.viewDate, i);
                            break;
                            case 3:
                        case 4:
                            this.viewDate = this.moveYear(this.viewDate, i);
                            break

                        }
                        this.fill();
                        this.element.trigger({
                            type: n[0].className + ":" + this.convertViewModeText(this.viewMode),
                            date: this.viewDate,
                            startDate: this.startDate,
                            endDate: this.endDate

                        });
                        break;
                        case "today":
                        var j = new Date();
                        j = h(j.getFullYear(), j.getMonth(), j.getDate(), j.getHours(), j.getMinutes(), j.getSeconds(), 0);
                        if (j < this.startDate) {
                            j = this.startDate

                        } else {
                            if (j > this.endDate) {
                                j = this.endDate

                            }

                        }
                        this.viewMode = this.startViewMode;
                        this.showMode(0);
                        this._setDate(j);
                        this.fill();
                        if (this.autoclose) {
                            this.hide()

                        }
                        break

                    }
                    break;
                    case "span":
                    if (!n.is(".disabled")) {
                        var p = this.viewDate.getUTCFullYear(),
                        o = this.viewDate.getUTCMonth(),
                        q = this.viewDate.getUTCDate(),
                        r = this.viewDate.getUTCHours(),
                        k = this.viewDate.getUTCMinutes(),
                        s = this.viewDate.getUTCSeconds();
                        if (n.is(".month")) {
                            this.viewDate.setUTCDate(1);
                            o = n.parent().find("span").index(n);
                            q = this.viewDate.getUTCDate();
                            this.viewDate.setUTCMonth(o);
                            this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate

                            });
                            if (this.viewSelect >= 3) {
                                this._setDate(h(p, o, q, r, k, s, 0))

                            }

                        } else {
                            if (n.is(".year")) {
                                this.viewDate.setUTCDate(1);
                                p = parseInt(n.text(), 10) || 0;
                                this.viewDate.setUTCFullYear(p);
                                this.element.trigger({
                                    type: "changeYear",
                                    date: this.viewDate

                                });
                                if (this.viewSelect >= 4) {
                                    this._setDate(h(p, o, q, r, k, s, 0))

                                }

                            } else {
                                if (n.is(".hour")) {
                                    r = parseInt(n.text(), 10) || 0;
                                    if (n.hasClass("hour_am") || n.hasClass("hour_pm")) {
                                        if (r == 12 && n.hasClass("hour_am")) {
                                            r = 0

                                        } else {
                                            if (r != 12 && n.hasClass("hour_pm")) {
                                                r += 12

                                            }

                                        }

                                    }
                                    this.viewDate.setUTCHours(r);
                                    this.element.trigger({
                                        type: "changeHour",
                                        date: this.viewDate

                                    });
                                    if (this.viewSelect >= 1) {
                                        this._setDate(h(p, o, q, r, k, s, 0))

                                    }

                                } else {
                                    if (n.is(".minute")) {
                                        k = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0;
                                        this.viewDate.setUTCMinutes(k);
                                        this.element.trigger({
                                            type: "changeMinute",
                                            date: this.viewDate

                                        });
                                        if (this.viewSelect >= 0) {
                                            this._setDate(h(p, o, q, r, k, s, 0))

                                        }

                                    }

                                }

                            }

                        }
                        if (this.viewMode != 0) {
                            var l = this.viewMode;
                            this.showMode( - 1);
                            this.fill();
                            if (l == this.viewMode && this.autoclose) {
                                this.hide()

                            }

                        } else {
                            this.fill();
                            if (this.autoclose) {
                                this.hide()

                            }

                        }

                    }
                    break;
                    case "td":
                    if (n.is(".day") && !n.is(".disabled")) {
                        var q = parseInt(n.text(), 10) || 1;
                        var p = this.viewDate.getUTCFullYear(),
                        o = this.viewDate.getUTCMonth(),
                        r = this.viewDate.getUTCHours(),
                        k = this.viewDate.getUTCMinutes(),
                        s = this.viewDate.getUTCSeconds();
                        if (n.is(".old")) {
                            if (o === 0) {
                                o = 11;
                                p -= 1

                            } else {
                                o -= 1

                            }

                        } else {
                            if (n.is(".new")) {
                                if (o == 11) {
                                    o = 0;
                                    p += 1

                                } else {
                                    o += 1

                                }

                            }

                        }
                        this.viewDate.setUTCFullYear(p);
                        this.viewDate.setUTCMonth(o, q);
                        this.element.trigger({
                            type: "changeDay",
                            date: this.viewDate

                        });
                        if (this.viewSelect >= 2) {
                            this._setDate(h(p, o, q, r, k, s, 0))

                        }

                    }
                    var l = this.viewMode;
                    this.showMode( - 1);
                    this.fill();
                    if (l == this.viewMode && this.autoclose) {
                        this.hide()

                    }
                    break

                }

            }

        },
        _setDate: function(i, k) {
            if (!k || k == "date") {
                this.date = i

            }
            if (!k || k == "view") {
                this.viewDate = i

            }
            this.fill();
            this.setValue();
            var j;
            if (this.isInput) {
                j = this.element

            } else {
                if (this.component) {
                    j = this.element.find("input")

                }

            }
            if (j) {
                j.change();
                if (this.autoclose && (!k || k == "date")) {}

            }
            this.element.trigger({
                type: "changeDate",
                date: this.date

            });
            if (i == null) {
                this.date = this.viewDate

            }

        },
        moveMinute: function(j, i) {
            if (!i) {
                return j

            }
            var k = new Date(j.valueOf());
            k.setUTCMinutes(k.getUTCMinutes() + (i * this.minuteStep));
            return k

        },
        moveHour: function(j, i) {
            if (!i) {
                return j

            }
            var k = new Date(j.valueOf());
            k.setUTCHours(k.getUTCHours() + i);
            return k

        },
        moveDate: function(j, i) {
            if (!i) {
                return j

            }
            var k = new Date(j.valueOf());
            k.setUTCDate(k.getUTCDate() + i);
            return k

        },
        moveMonth: function(j, k) {
            if (!k) {
                return j

            }
            var n = new Date(j.valueOf()),
            r = n.getUTCDate(),
            o = n.getUTCMonth(),
            m = Math.abs(k),
            q,
            p;
            k = k > 0 ? 1: -1;
            if (m == 1) {
                p = k == -1 ? 
                function() {
                    return n.getUTCMonth() == o

                }: function() {
                    return n.getUTCMonth() != q

                };
                q = o + k;
                n.setUTCMonth(q);
                if (q < 0 || q > 11) {
                    q = (q + 12) % 12

                }

            } else {
                for (var l = 0; l < m; l++) {
                    n = this.moveMonth(n, k)

                }
                q = n.getUTCMonth();
                n.setUTCDate(r);
                p = function() {
                    return q != n.getUTCMonth()

                }

            }
            while (p()) {
                n.setUTCDate(--r);
                n.setUTCMonth(q)

            }
            return n

        },
        moveYear: function(j, i) {
            return this.moveMonth(j, i * 12)

        },
        dateWithinRange: function(i) {
            return i >= this.startDate && i <= this.endDate

        },
        keydown: function(m) {
            if (this.picker.is(":not(:visible)")) {
                if (m.keyCode == 27) {
                    this.show()

                }
                return

            }
            var o = false,
            j,
            p,
            n,
            q,
            i;
            switch (m.keyCode) {
                case 27:
                this.hide();
                m.preventDefault();
                break;
                case 37:
            case 39:
                if (!this.keyboardNavigation) {
                    break

                }
                j = m.keyCode == 37 ? -1: 1;
                viewMode = this.viewMode;
                if (m.ctrlKey) {
                    viewMode += 2

                } else {
                    if (m.shiftKey) {
                        viewMode += 1

                    }

                }
                if (viewMode == 4) {
                    q = this.moveYear(this.date, j);
                    i = this.moveYear(this.viewDate, j)

                } else {
                    if (viewMode == 3) {
                        q = this.moveMonth(this.date, j);
                        i = this.moveMonth(this.viewDate, j)

                    } else {
                        if (viewMode == 2) {
                            q = this.moveDate(this.date, j);
                            i = this.moveDate(this.viewDate, j)

                        } else {
                            if (viewMode == 1) {
                                q = this.moveHour(this.date, j);
                                i = this.moveHour(this.viewDate, j)

                            } else {
                                if (viewMode == 0) {
                                    q = this.moveMinute(this.date, j);
                                    i = this.moveMinute(this.viewDate, j)

                                }

                            }

                        }

                    }

                }
                if (this.dateWithinRange(q)) {
                    this.date = q;
                    this.viewDate = i;
                    this.setValue();
                    this.update();
                    m.preventDefault();
                    o = true

                }
                break;
                case 38:
            case 40:
                if (!this.keyboardNavigation) {
                    break

                }
                j = m.keyCode == 38 ? -1: 1;
                viewMode = this.viewMode;
                if (m.ctrlKey) {
                    viewMode += 2

                } else {
                    if (m.shiftKey) {
                        viewMode += 1

                    }

                }
                if (viewMode == 4) {
                    q = this.moveYear(this.date, j);
                    i = this.moveYear(this.viewDate, j)

                } else {
                    if (viewMode == 3) {
                        q = this.moveMonth(this.date, j);
                        i = this.moveMonth(this.viewDate, j)

                    } else {
                        if (viewMode == 2) {
                            q = this.moveDate(this.date, j * 7);
                            i = this.moveDate(this.viewDate, j * 7)

                        } else {
                            if (viewMode == 1) {
                                if (this.showMeridian) {
                                    q = this.moveHour(this.date, j * 6);
                                    i = this.moveHour(this.viewDate, j * 6)

                                } else {
                                    q = this.moveHour(this.date, j * 4);
                                    i = this.moveHour(this.viewDate, j * 4)

                                }

                            } else {
                                if (viewMode == 0) {
                                    q = this.moveMinute(this.date, j * 4);
                                    i = this.moveMinute(this.viewDate, j * 4)

                                }

                            }

                        }

                    }

                }
                if (this.dateWithinRange(q)) {
                    this.date = q;
                    this.viewDate = i;
                    this.setValue();
                    this.update();
                    m.preventDefault();
                    o = true

                }
                break;
                case 13:
                if (this.viewMode != 0) {
                    var l = this.viewMode;
                    this.showMode( - 1);
                    this.fill();
                    if (l == this.viewMode && this.autoclose) {
                        this.hide()

                    }

                } else {
                    this.fill();
                    if (this.autoclose) {
                        this.hide()

                    }

                }
                m.preventDefault();
                break;
                case 9:
                this.hide();
                break

            }
            if (o) {
                var k;
                if (this.isInput) {
                    k = this.element

                } else {
                    if (this.component) {
                        k = this.element.find("input")

                    }

                }
                if (k) {
                    k.change()

                }
                this.element.trigger({
                    type: "changeDate",
                    date: this.date

                })

            }

        },
        showMode: function(i) {
            if (i) {
                var j = Math.max(0, Math.min(d.modes.length - 1, this.viewMode + i));
                if (j >= this.minView && j <= this.maxView) {
                    this.element.trigger({
                        type: "changeMode",
                        date: this.viewDate,
                        oldViewMode: this.viewMode,
                        newViewMode: j

                    });
                    this.viewMode = j

                }

            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + d.modes[this.viewMode].clsName).css("display", "block");
            this.updateNavArrows()

        },
        reset: function(i) {
            this._setDate(null, "date")

        },
        convertViewModeText: function(i) {
            switch (i) {
                case 4:
                return "decade";
                case 3:
                return "year";
                case 2:
                return "month";
                case 1:
                return "day";
                case 0:
                return "hour"

            }

        }

    };
    var a = e.fn.datetimepicker;
    e.fn.datetimepicker = function(k) {
        var i = Array.apply(null, arguments);
        i.shift();
        var j;
        this.each(function() {
            var n = e(this),
            m = n.data("datetimepicker"),
            l = typeof k == "object" && k;
            if (!m) {
                n.data("datetimepicker", (m = new g(this, e.extend({},
                e.fn.datetimepicker.defaults, l))))

            }
            if (typeof k == "string" && typeof m[k] == "function") {
                j = m[k].apply(m, i);
                if (j !== undefined) {
                    return false

                }

            }

        });
        if (j !== undefined) {
            return j

        } else {
            return this

        }

    };
    e.fn.datetimepicker.defaults = {};
    e.fn.datetimepicker.Constructor = g;
    var f = e.fn.datetimepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today"

        }

    };
    var d = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1

        },
        {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1

        },
        {
            clsName: "days",
            navFnc: "Month",
            navStep: 1

        },
        {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1

        },
        {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10

        }],
        isLeapYear: function(i) {
            return (((i % 4 === 0) && (i % 100 !== 0)) || (i % 400 === 0))

        },
        getDaysInMonth: function(i, j) {
            return [31, (d.isLeapYear(i) ? 29: 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][j]

        },
        getDefaultFormat: function(i, j) {
            if (i == "standard") {
                if (j == "input") {
                    return "yyyy-mm-dd hh:ii"

                } else {
                    return "yyyy-mm-dd hh:ii:ss"

                }

            } else {
                if (i == "php") {
                    if (j == "input") {
                        return "Y-m-d H:i"

                    } else {
                        return "Y-m-d H:i:s"

                    }

                } else {
                    throw new Error("Invalid format type.")

                }

            }

        },
        validParts: function(i) {
            if (i == "standard") {
                return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g

            } else {
                if (i == "php") {
                    return /[dDjlNwzFmMnStyYaABgGhHis]/g

                } else {
                    throw new Error("Invalid format type.")

                }

            }

        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function(l, j) {
            var i = l.replace(this.validParts(j), "\0").split("\0"),
            k = l.match(this.validParts(j));
            if (!i || !i.length || !k || k.length == 0) {
                throw new Error("Invalid date format.")

            }
            return {
                separators: i,
                parts: k

            }

        },
        parseDate: function(n, w, q, u) {
            if (n instanceof Date) {
                var y = new Date(n.valueOf() - n.getTimezoneOffset() * 60000);
                y.setMilliseconds(0);
                return y

            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(n)) {
                w = this.parseFormat("yyyy-mm-dd", u)

            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(n)) {
                w = this.parseFormat("yyyy-mm-dd hh:ii", u)

            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(n)) {
                w = this.parseFormat("yyyy-mm-dd hh:ii:ss", u)

            }
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)) {
                var z = /([-+]\d+)([dmwy])/,
                o = n.match(/([-+]\d+)([dmwy])/g),
                j,
                m;
                n = new Date();
                for (var p = 0; p < o.length; p++) {
                    j = z.exec(o[p]);
                    m = parseInt(j[1]);
                    switch (j[2]) {
                        case "d":
                        n.setUTCDate(n.getUTCDate() + m);
                        break;
                        case "m":
                        n = g.prototype.moveMonth.call(g.prototype, n, m);
                        break;
                        case "w":
                        n.setUTCDate(n.getUTCDate() + m * 7);
                        break;
                        case "y":
                        n = g.prototype.moveYear.call(g.prototype, n, m);
                        break

                    }

                }
                return h(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), 0)

            }
            var o = n && n.toString().match(this.nonpunctuation) || [],
            n = new Date(0, 0, 0, 0, 0, 0, 0),
            t = {},
            v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"],
            x = {
                hh: function(s, i) {
                    return s.setUTCHours(i)

                },
                h: function(s, i) {
                    return s.setUTCHours(i)

                },
                HH: function(s, i) {
                    return s.setUTCHours(i == 12 ? 0: i)

                },
                H: function(s, i) {
                    return s.setUTCHours(i == 12 ? 0: i)

                },
                ii: function(s, i) {
                    return s.setUTCMinutes(i)

                },
                i: function(s, i) {
                    return s.setUTCMinutes(i)

                },
                ss: function(s, i) {
                    return s.setUTCSeconds(i)

                },
                s: function(s, i) {
                    return s.setUTCSeconds(i)

                },
                yyyy: function(s, i) {
                    return s.setUTCFullYear(i)

                },
                yy: function(s, i) {
                    return s.setUTCFullYear(2000 + i)

                },
                m: function(s, i) {
                    i -= 1;
                    while (i < 0) {
                        i += 12

                    }
                    i %= 12;
                    s.setUTCMonth(i);
                    while (s.getUTCMonth() != i) {
                        if (isNaN(s.getUTCMonth())) {
                            return s

                        } else {
                            s.setUTCDate(s.getUTCDate() - 1)

                        }

                    }
                    return s

                },
                d: function(s, i) {
                    return s.setUTCDate(i)

                },
                p: function(s, i) {
                    return s.setUTCHours(i == 1 ? s.getUTCHours() + 12: s.getUTCHours())

                }

            },
            l,
            r,
            j;
            x.M = x.MM = x.mm = x.m;
            x.dd = x.d;
            x.P = x.p;
            n = h(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());
            if (o.length == w.parts.length) {
                for (var p = 0, k = w.parts.length; p < k; p++) {
                    l = parseInt(o[p], 10);
                    j = w.parts[p];
                    if (isNaN(l)) {
                        switch (j) {
                            case "MM":
                            r = e(f[q].months).filter(function() {
                                var i = this.slice(0, o[p].length),
                                s = o[p].slice(0, i.length);
                                return i == s

                            });
                            l = e.inArray(r[0], f[q].months) + 1;
                            break;
                            case "M":
                            r = e(f[q].monthsShort).filter(function() {
                                var i = this.slice(0, o[p].length),
                                s = o[p].slice(0, i.length);
                                return i.toLowerCase() == s.toLowerCase()

                            });
                            l = e.inArray(r[0], f[q].monthsShort) + 1;
                            break;
                            case "p":
                        case "P":
                            l = e.inArray(o[p].toLowerCase(), f[q].meridiem);
                            break

                        }

                    }
                    t[j] = l

                }
                for (var p = 0, A; p < v.length; p++) {
                    A = v[p];
                    if (A in t && !isNaN(t[A])) {
                        x[A](n, t[A])

                    }

                }

            }
            return n

        },
        formatDate: function(j, o, q, m) {
            if (j == null) {
                return ""

            }
            var p;
            if (m == "standard") {
                p = {
                    yy: j.getUTCFullYear().toString().substring(2),
                    yyyy: j.getUTCFullYear(),
                    m: j.getUTCMonth() + 1,
                    M: f[q].monthsShort[j.getUTCMonth()],
                    MM: f[q].months[j.getUTCMonth()],
                    d: j.getUTCDate(),
                    D: f[q].daysShort[j.getUTCDay()],
                    DD: f[q].days[j.getUTCDay()],
                    p: (f[q].meridiem.length == 2 ? f[q].meridiem[j.getUTCHours() < 12 ? 0: 1] : ""),
                    h: j.getUTCHours(),
                    i: j.getUTCMinutes(),
                    s: j.getUTCSeconds()

                };
                if (f[q].meridiem.length == 2) {
                    p.H = (p.h % 12 == 0 ? 12: p.h % 12)

                } else {
                    p.H = p.h

                }
                p.HH = (p.H < 10 ? "0": "") + p.H;
                p.P = p.p.toUpperCase();
                p.hh = (p.h < 10 ? "0": "") + p.h;
                p.ii = (p.i < 10 ? "0": "") + p.i;
                p.ss = (p.s < 10 ? "0": "") + p.s;
                p.dd = (p.d < 10 ? "0": "") + p.d;
                p.mm = (p.m < 10 ? "0": "") + p.m

            } else {
                if (m == "php") {
                    p = {
                        y: j.getUTCFullYear().toString().substring(2),
                        Y: j.getUTCFullYear(),
                        F: f[q].months[j.getUTCMonth()],
                        M: f[q].monthsShort[j.getUTCMonth()],
                        n: j.getUTCMonth() + 1,
                        t: d.getDaysInMonth(j.getUTCFullYear(), j.getUTCMonth()),
                        j: j.getUTCDate(),
                        l: f[q].days[j.getUTCDay()],
                        D: f[q].daysShort[j.getUTCDay()],
                        w: j.getUTCDay(),
                        N: (j.getUTCDay() == 0 ? 7: j.getUTCDay()),
                        S: (j.getUTCDate() % 10 <= f[q].suffix.length ? f[q].suffix[j.getUTCDate() % 10 - 1] : ""),
                        a: (f[q].meridiem.length == 2 ? f[q].meridiem[j.getUTCHours() < 12 ? 0: 1] : ""),
                        g: (j.getUTCHours() % 12 == 0 ? 12: j.getUTCHours() % 12),
                        G: j.getUTCHours(),
                        i: j.getUTCMinutes(),
                        s: j.getUTCSeconds()

                    };
                    p.m = (p.n < 10 ? "0": "") + p.n;
                    p.d = (p.j < 10 ? "0": "") + p.j;
                    p.A = p.a.toString().toUpperCase();
                    p.h = (p.g < 10 ? "0": "") + p.g;
                    p.H = (p.G < 10 ? "0": "") + p.G;
                    p.i = (p.i < 10 ? "0": "") + p.i;
                    p.s = (p.s < 10 ? "0": "") + p.s

                } else {
                    throw new Error("Invalid format type.")

                }

            }
            var j = [],
            n = e.extend([], o.separators);
            for (var l = 0, k = o.parts.length; l < k; l++) {
                if (n.length) {
                    j.push(n.shift())

                }
                j.push(p[o.parts[l]])

            }
            if (n.length) {
                j.push(n.shift())

            }
            return j.join("")

        },
        convertViewMode: function(i) {
            switch (i) {
                case 4:
            case "decade":
                i = 4;
                break;
                case 3:
            case "year":
                i = 3;
                break;
                case 2:
            case "month":
                i = 2;
                break;
                case 1:
            case "day":
                i = 1;
                break;
                case 0:
            case "hour":
                i = 0;
                break

            }
            return i

        },
        headTemplate: '<thead><tr><th class="prev"><i class="{iconType} {leftArrow}"/></th><th colspan="5" class="switch"></th><th class="next"><i class="{iconType} {rightArrow}"/></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><span class="{iconType} {leftArrow}"></span> </th><th colspan="5" class="switch"></th><th class="next"><span class="{iconType} {rightArrow}"></span> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'

    };
    d.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + d.headTemplate + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + d.headTemplate + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + d.headTemplate + "<tbody></tbody>" + d.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + d.headTemplate + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + d.headTemplate + d.contTemplate + d.footTemplate + "</table></div></div>";
    d.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + d.headTemplateV3 + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + d.headTemplateV3 + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + d.headTemplateV3 + "<tbody></tbody>" + d.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + d.headTemplateV3 + d.contTemplate + d.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + d.headTemplateV3 + d.contTemplate + d.footTemplate + "</table></div></div>";
    e.fn.datetimepicker.DPGlobal = d;
    e.fn.datetimepicker.noConflict = function() {
        e.fn.datetimepicker = a;
        return this

    };
    e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', 
    function(j) {
        var i = e(this);
        if (i.data("datetimepicker")) {
            return

        }
        j.preventDefault();
        i.datetimepicker("show")

    });
    e(function() {
        e('[data-provide="datetimepicker-inline"]').datetimepicker()

    })

} (window.jQuery);