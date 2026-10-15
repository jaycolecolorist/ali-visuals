/* ALI. — page behaviour. Data lives in js/data.js. */
(function () {
  "use strict";

  var D = window.ALI;
  if (!D) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var ICON = {
    play: '<svg viewBox="0 0 11 12" aria-hidden="true"><path d="M1 1.2v9.6c0 .5.5.8.9.5l8.1-4.8a.6.6 0 0 0 0-1L1.9.7A.6.6 0 0 0 1 1.2Z" fill="currentColor"/></svg>',
    photos: '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="2" width="10" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="4.3" cy="5" r="1" fill="currentColor"/><path d="M2 9.2 5 6.5l2 1.8 1.5-1.2L10.6 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    insta: '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="6" cy="6" r="2.3" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="8.9" cy="3.1" r=".7" fill="currentColor"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg viewBox="0 0 8 14" aria-hidden="true"><path d="M7 1 1 7l6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  var catLabel = {};
  D.categories.forEach(function (c) { catLabel[c.id] = c.label; });

  // Figures shown in more than one place come from data.js only.
  var FIG = {
    "ig-followers": D.following.instagram.followers,
    "ig-posts": D.following.instagram.posts,
    "tt-followers": D.following.tiktok.followers,
    "tt-likes": D.following.tiktok.likes,
    "tt-videos": D.following.tiktok.videos,
    "tt-top": D.following.tiktok.topPlays,
    "checked": D.figuresCheckedOn
  };
  document.querySelectorAll("[data-fig]").forEach(function (el) {
    var v = FIG[el.getAttribute("data-fig")];
    if (v) el.textContent = v;
  });

  /* ---------- Summary (one text, three pages) ---------- */
  if (D.summary) {
    document.querySelectorAll("[data-summary]").forEach(function (el) {
      var t = D.summary[+el.getAttribute("data-summary")];
      if (t) el.textContent = t;
    });
  }

  /* ---------- Hero films: play while on screen ---------- */
  var autos = Array.prototype.slice.call(document.querySelectorAll("video.js-auto"));
  if (autos.length && !reduceMotion && !saveData) {
    autos.forEach(function (v) {
      v.autoplay = true;
      v.src = v.getAttribute("data-src");
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
          else e.target.pause();
        });
      }, { threshold: 0.15 });
      autos.forEach(function (v) { io.observe(v); });
    } else {
      autos.forEach(function (v) { v.play(); });
    }
  }

  /* ---------- Portrait slot ---------- */
  var portrait = $("#portrait");
  if (portrait && D.portrait) {
    portrait.innerHTML = '<img src="' + esc(D.portrait) + '" alt="Ali, visual creator" loading="lazy">';
    portrait.hidden = false;
  }

  /* ---------- Work grid ---------- */
  var grid = $("#grid");
  var filter = $("#filter");

  function badgeFor(w) {
    if (w.type === "film") return ICON.play + "Film";
    if (w.type === "photos") return ICON.photos + w.photos.length + " photos";
    return ICON.insta + "On Instagram";
  }

  if (grid) {
    grid.innerHTML = D.work.map(function (w, i) {
      var hint = w.type === "film" ? "Play" : w.type === "photos" ? "View photos" : "View";
      return (
        '<article class="tile" data-cat="' + esc(w.cat) + '" data-id="' + esc(w.id) + '">' +
          '<button class="tile__media" type="button" data-open="' + i + '" aria-label="' + esc(hint + ": " + w.title + ", " + w.client) + '">' +
            '<img src="' + esc(w.poster) + '" alt="" loading="' + (i < 4 ? "eager" : "lazy") + '" decoding="async">' +
            (w.preview && finePointer ? '<video muted loop playsinline preload="none" data-src="' + esc(w.preview) + '" aria-hidden="true"></video>' : "") +
            '<span class="badge">' + badgeFor(w) + "</span>" +
          "</button>" +
          '<h3 class="tile__title">' + esc(w.title) + "</h3>" +
          '<p class="tile__meta">' + esc(w.client) + ", " + esc(w.date) + "</p>" +
        "</article>"
      );
    }).join("");

    // Hover previews on desktop only.
    if (finePointer && !reduceMotion && !saveData) {
      grid.querySelectorAll(".tile").forEach(function (tile) {
        var v = tile.querySelector("video");
        if (!v) return;
        var media = tile.querySelector(".tile__media");
        media.addEventListener("mouseenter", function () {
          if (!v.src) v.src = v.getAttribute("data-src");
          var p = v.play();
          if (p && p.then) p.then(function () { tile.classList.add("is-playing"); }).catch(function () {});
        });
        media.addEventListener("mouseleave", function () {
          tile.classList.remove("is-playing");
          v.pause();
        });
      });
    }

    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open]");
      if (b) openViewer(D.work[+b.getAttribute("data-open")], b);
    });
  }

  if (filter) {
    filter.innerHTML = D.categories.map(function (c) {
      return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + esc(c.label) + "</button>";
    }).join("");
    var applyFilter = function (b) {
      var cat = b.getAttribute("data-cat");
      filter.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      grid.querySelectorAll(".tile").forEach(function (t) { t.hidden = cat !== "all" && t.getAttribute("data-cat") !== cat; });
    };
    filter.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cat]");
      if (b) applyFilter(b);
    });
    // The About page links here as ?cat=<id>#work to open one category.
    var wanted = new URLSearchParams(location.search).get("cat");
    var start = wanted && filter.querySelector('button[data-cat="' + wanted.replace(/[^a-z]/g, "") + '"]');
    if (start) applyFilter(start);
  }

  /* ---------- Viewer ---------- */
  var viewer = $("#viewer");
  var lastTrigger = null;

  function row(label, value) {
    return '<div class="row"><span class="row__label">' + esc(label) + '</span><span class="row__value">' + esc(value) + "</span></div>";
  }

  function openViewer(w, trigger) {
    if (!viewer || !w) return;
    lastTrigger = trigger || null;
    var media = $("#viewer-media");
    media.className = "sheet__media";
    viewer.querySelector(".sheet__panel").classList.toggle("sheet__panel--photos", w.type === "photos");

    if (w.type === "film") {
      media.innerHTML = '<video src="' + esc(w.film) + '" poster="' + esc(w.poster) + '" muted autoplay loop playsinline controls controlslist="nodownload noplaybackrate" disablepictureinpicture></video>';
    } else if (w.type === "photos") {
      media.innerHTML =
        '<div class="gallery" tabindex="0" aria-label="' + esc(w.photos.length + " photos, swipe or use the arrows") + '">' +
          w.photos.map(function (src, i) {
            return '<img src="' + esc(src) + '" alt="' + esc(w.title + ", photo " + (i + 1) + " of " + w.photos.length) + '" loading="' + (i ? "lazy" : "eager") + '">';
          }).join("") +
        "</div>" +
        '<div class="gallery__nav"><button class="gallery__btn" type="button" data-step="-1" aria-label="Previous photo">' + ICON.left + "</button>" +
        '<span class="gallery__count" aria-live="polite">1 / ' + w.photos.length + "</span>" +
        '<button class="gallery__btn" type="button" data-step="1" aria-label="Next photo">' + ICON.right + "</button></div>";
      wireGallery(media);
    } else {
      media.innerHTML =
        '<img src="' + esc(w.poster) + '" alt="' + esc(w.title + ", cover frame") + '">' +
        '<div class="post-cta"><a class="btn btn--primary" href="' + esc(w.source) + '" target="_blank" rel="noopener">' + ICON.play.replace("<svg", '<svg class="btn__icon" style="width:12px;height:12px"') + "Play on Instagram</a></div>";
    }

    $("#viewer-client").textContent = w.client;
    $("#viewer-title").textContent = w.title;

    var facts = '<div class="group group--compact">' + row("Ali's role", w.role) + row("Posted", w.date) + row("Category", catLabel[w.cat] || "") + "</div>";
    // Ali's own credit is already the "Ali's role" row, so only the rest of the team is listed.
    var team = (w.credits || []).filter(function (c) { return c[1] !== "@ali_visualss"; });
    if (team.length) {
      facts += '<div class="group group--compact">' + team.map(function (c) { return row(c[0], c[1]); }).join("") + "</div>";
    }
    $("#viewer-facts").innerHTML = facts;

    $("#viewer-note").textContent =
      w.type === "film" ? "Plays here without sound. The music on the original is licensed to Instagram, so watch it there with sound." :
      w.type === "post" ? "This film plays on Instagram, with its original sound." : "";

    var src = $("#viewer-source");
    src.href = w.source;
    src.textContent = w.type === "film" ? "Watch with sound on Instagram" : w.type === "photos" ? "See the post on Instagram" : "Open the post on Instagram";
    var book = $("#viewer-book");
    book.setAttribute("data-book", w.book || "");

    if (typeof viewer.showModal === "function") viewer.showModal(); else viewer.setAttribute("open", "");
    try { history.replaceState(null, "", "#w-" + w.id); } catch (e) {}
  }

  function closeViewer() {
    if (!viewer || !viewer.open) return;
    viewer.close();
  }

  function wireGallery(media) {
    var g = media.querySelector(".gallery");
    var count = media.querySelector(".gallery__count");
    var btns = media.querySelectorAll("[data-step]");
    var n = g.children.length;
    function index() { return g.clientWidth ? Math.round(g.scrollLeft / g.clientWidth) : 0; }
    var target = null; // the photo a button press is heading to, while it scrolls there
    function show(i) {
      count.textContent = (i + 1) + " / " + n;
      btns[0].disabled = i <= 0;
      btns[1].disabled = i >= n - 1;
    }
    function update() { if (target === null) show(index()); }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var from = target === null ? index() : target;
        var i = Math.max(0, Math.min(n - 1, from + +b.getAttribute("data-step")));
        target = i;
        show(i);
        g.scrollTo({ left: i * g.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
        clearTimeout(g._t);
        g._t = setTimeout(function () {
          // If smooth scrolling was interrupted, finish the move instantly.
          if (Math.abs(g.scrollLeft - target * g.clientWidth) > 2) g.scrollLeft = target * g.clientWidth;
          target = null;
          update();
        }, 700);
      });
    });
    g.addEventListener("scroll", update, { passive: true });
    g.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { btns[1].click(); e.preventDefault(); }
      if (e.key === "ArrowLeft") { btns[0].click(); e.preventDefault(); }
    });
    update();
    window.requestAnimationFrame(update);
  }

  if (viewer) {
    $("#viewer-close").addEventListener("click", closeViewer);
    viewer.addEventListener("click", function (e) { if (e.target === viewer) closeViewer(); });
    viewer.addEventListener("close", function () {
      if (viewer.open) return; // a new piece was opened before this close event arrived
      var v = viewer.querySelector("video");
      if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
      $("#viewer-media").innerHTML = "";
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
    $("#viewer-book").addEventListener("click", function (e) {
      e.preventDefault();
      var type = this.getAttribute("data-book");
      lastTrigger = null;
      closeViewer();
      goToBooking(type);
    });

    // Open straight to a piece when the link carries #w-<id>.
    var m = /^#w-(.+)$/.exec(location.hash);
    if (m) {
      var hit = D.work.filter(function (w) { return w.id === m[1]; })[0];
      if (hit) openViewer(hit);
    }
  }

  /* ---------- Booking ---------- */
  var form = $("#book-form");

  function goToBooking(type) {
    var section = $("#book");
    if (!section) return;
    if (type) {
      var radio = document.querySelector('#shoot-types input[value="' + type.replace(/"/g, '\\"') + '"]');
      if (radio) { radio.checked = true; $("#err-type").hidden = true; }
    }
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    var name = form && form.elements.name;
    if (name) setTimeout(function () { name.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
  }

  if (form) {
    $("#shoot-types").innerHTML = D.shootTypes.map(function (t, i) {
      return '<input type="radio" name="type" id="t-' + i + '" value="' + esc(t) + '" required><label for="t-' + i + '">' + esc(t) + "</label>";
    }).join("");

    var waBase = "https://wa.me/" + D.whatsapp;
    var lastMessage = "";

    form.addEventListener("change", function (e) {
      if (e.target.name === "type") $("#err-type").hidden = true;
    });
    form.elements.name.addEventListener("input", function () {
      if (this.value.trim()) { $("#err-name").hidden = true; this.removeAttribute("aria-invalid"); }
    });

    function niceDate(v) {
      if (!v) return "Not decided yet";
      var p = v.split("-");
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = f.name.value.trim();
      var typeInput = form.querySelector('input[name="type"]:checked');
      var firstBad = null;

      $("#err-name").hidden = !!name;
      if (!name) { f.name.setAttribute("aria-invalid", "true"); firstBad = f.name; }
      $("#err-type").hidden = !!typeInput;
      if (!typeInput && !firstBad) firstBad = form.querySelector('input[name="type"]');
      if (firstBad) { firstBad.focus(); return; }

      var medium = form.querySelector('input[name="medium"]:checked');
      var lines = [
        "Hi Ali, I'd like to book a shoot.",
        "",
        "Name: " + name,
        "Shoot: " + typeInput.value,
        "I need: " + (medium ? medium.value : "Film"),
        "Date: " + niceDate(f.date.value),
        "Location: " + (f.location.value.trim() || "Not decided yet")
      ];
      if (f.budget.value.trim()) lines.push("Budget: " + f.budget.value.trim());
      if (f.details.value.trim()) lines.push("", f.details.value.trim());
      lastMessage = lines.join("\n");

      var url = waBase + "?text=" + encodeURIComponent(lastMessage);
      $("#sent-link").href = url;
      $("#sent").hidden = false;
      window.open(url, "_blank", "noopener");
    });

    $("#copy-msg").addEventListener("click", function () {
      var b = this;
      var done = function () { b.textContent = "message copied"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastMessage).then(done, function () { window.prompt("Copy this message:", lastMessage); });
      } else {
        window.prompt("Copy this message:", lastMessage);
      }
    });
  }

  // Any "Book" link on the page pre-scrolls and focuses the form.
  document.querySelectorAll('a[href="#book"]').forEach(function (a) {
    if (a.id === "viewer-book") return;
    a.addEventListener("click", function (e) {
      if (!form) return;
      e.preventDefault();
      goToBooking("");
      try { history.replaceState(null, "", "#book"); } catch (err) {}
    });
  });

  /* ---------- Profile page ---------- */
  var credits = $("#credits");
  if (credits) {
    credits.innerHTML = D.work.filter(function (w) { return w.partner; }).map(function (w) {
      return (
        '<a class="row row--link credit print-url" href="' + esc(w.source) + '" target="_blank" rel="noopener">' +
          '<span class="credit__main"><span class="credit__client">' + esc(w.partner) + "</span>" +
          '<span class="credit__work">' + esc(w.title) + (/[.!?”]$/.test(w.title) ? " " : ". ") + esc(w.role) + "</span></span>" +
          '<span class="credit__date">' + esc(w.date) + "</span>" + ICON.chev +
        "</a>"
      );
    }).join("");
  }
  var reach = $("#reach");
  if (reach) {
    var num = function (s) {
      var m = /([\d.,]+)\s*([KM]?)/i.exec(s || "");
      if (!m) return 0;
      return parseFloat(m[1].replace(/,/g, "")) * ({ K: 1e3, M: 1e6 }[m[2].toUpperCase()] || 1);
    };
    reach.innerHTML = D.work.filter(function (w) { return w.partnerFollowers; })
      .sort(function (a, b) { return num(b.partnerFollowers) - num(a.partnerFollowers); })
      .map(function (w) {
        return (
          '<a class="row row--link print-url" href="' + esc(w.source) + '" target="_blank" rel="noopener">' +
            '<span class="row__label">' + esc(w.partner) + "</span>" +
            '<span class="row__value">' + esc(w.partnerFollowers) + " followers</span>" + ICON.chev +
          "</a>"
        );
      }).join("");
  }

  var shoots = $("#shoots");
  if (shoots) {
    shoots.innerHTML = D.categories.filter(function (c) { return c.id !== "all"; }).map(function (c) {
      var n = D.work.filter(function (w) { return w.cat === c.id; }).length;
      return (
        '<a class="shoot" href="./?cat=' + esc(c.id) + '#work">' +
          '<span class="shoot__img"><img src="' + esc(c.cover) + '" alt="" loading="lazy"></span>' +
          '<span class="shoot__title">' + esc(c.long) + "</span>" +
          '<span class="shoot__count">' + n + (n === 1 ? " piece" : " pieces") + "</span>" +
        "</a>"
      );
    }).join("");
  }

  var names = $("#names");
  if (names) {
    names.innerHTML = D.work.filter(function (w) { return w.partner; }).map(function (w) {
      return '<li><a href="./#w-' + esc(w.id) + '">' + esc(w.partner) + "</a></li>";
    }).join("");
  }

  var strip = $("#strip");
  if (strip) {
    strip.innerHTML = D.work.slice(0, 6).map(function (w) {
      return '<a href="index.html#w-' + esc(w.id) + '"><img src="' + esc(w.poster) + '" alt="' + esc(w.title + ", " + w.client) + '" loading="lazy"></a>';
    }).join("");
  }
  var printBtn = $("#print");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
