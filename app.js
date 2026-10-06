(function () {
  const trip = window.TRIP;
  const deck = document.getElementById("deck");
  const counter = document.getElementById("counter");
  const bar = document.querySelector("#progress span");

  const TYPE_ICON = {
    hotel: "🏨", move: "🚃", taxi: "🚕", spot: "📍", meal: "🍽️", cafe: "☕", split: "💞", flight: "✈️"
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function photo(src, emoji, label) {
    return `
      <div class="photo" data-src="${esc(src)}">
        <div class="photo-fallback">
          <span class="photo-emoji">${emoji}</span>
          <span class="photo-label">${esc(label)}</span>
          <span class="photo-hint">${esc(src)}</span>
        </div>
      </div>`;
  }

  function coverSlide() {
    return `
      <section class="slide cover">
        ${photo(trip.coverImage, "🍁", "교토")}
        <div class="cover-shade"></div>
        <div class="cover-body">
          <p class="eyebrow">KYOTO FAMILY TRIP</p>
          <h1>${esc(trip.title)}</h1>
          <p class="cover-sub">${esc(trip.subtitle)}</p>
          <div class="cover-meta">
            <span>📅 ${esc(trip.period)}</span>
            <span>🏨 ${esc(trip.hotel)}</span>
          </div>
        </div>
      </section>`;
  }

  function overviewSlide() {
    const cards = trip.days.map((d) => `
      <article class="ov-card" style="--day:${d.color}">
        <div class="ov-head">
          <span class="ov-label">${d.emoji} ${esc(d.label)}</span>
          <span class="ov-date">${esc(d.date)}</span>
        </div>
        <h3>${esc(d.theme)}</h3>
        <ul>${d.spots.map((s) => `<li>${s.emoji} ${esc(s.name)}</li>`).join("")}</ul>
      </article>`).join("");
    return `
      <section class="slide overview">
        <header class="slide-head">
          <p class="eyebrow">OVERVIEW</p>
          <h2>한눈에 보는 3박 4일</h2>
        </header>
        <div class="ov-grid">${cards}</div>
      </section>`;
  }

  function daySlide(d) {
    const rows = d.timeline.map(([time, title, type, note]) => `
      <li class="tl-row tl-${type}">
        <span class="tl-time">${esc(time)}</span>
        <span class="tl-dot">${TYPE_ICON[type] || "•"}</span>
        <span class="tl-title">${esc(title)}</span>
        <span class="tl-note">${esc(note)}</span>
      </li>`).join("");
    return `
      <section class="slide day" style="--day:${d.color}">
        <aside class="day-side">
          <p class="day-num">DAY ${d.id}</p>
          <p class="day-date">${esc(d.date)}</p>
          <h2>${esc(d.theme)}</h2>
          <div class="legend">
            <span>📍 관광</span><span>🚃 열차</span><span>🚕 택시</span><span>🍽️ 식사</span>
          </div>
        </aside>
        <ol class="timeline ${d.timeline.length > 8 ? "dense" : ""}">${rows}</ol>
      </section>`;
  }

  function spotSlide(d, s) {
    let detail = "";
    if (s.subs) {
      detail = `<ul class="subs">${s.subs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    } else if (s.split) {
      detail = `<div class="split">${s.split.map((p) => `
        <div class="split-card">
          <span class="split-icon">${p.icon}</span>
          <div><strong>${esc(p.who)}</strong><p>${esc(p.text)}</p></div>
        </div>`).join("")}</div>`;
    } else if (s.points) {
      detail = `<ul class="points">${s.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    }
    const tip = s.tip ? `<div class="tip"><span>${s.tip.icon}</span>${esc(s.tip.text)}</div>` : "";
    return `
      <section class="slide spot" style="--day:${d.color}">
        ${photo(s.image, s.emoji, s.name)}
        <div class="spot-body">
          <div class="spot-tags">
            <span class="tag-day">${d.emoji} ${esc(d.label)} · ${esc(d.date)}</span>
          </div>
          <h2>${esc(s.name)}</h2>
          <p class="local">${esc(s.local)}</p>
          <div class="when">
            <span>🕒 ${esc(s.time)}</span>
            <span class="dur">${esc(s.duration)}</span>
          </div>
          <p class="desc">${esc(s.desc)}</p>
          ${detail}
          ${tip}
        </div>
      </section>`;
  }

  function endSlide() {
    return `
      <section class="slide ending">
        <div class="end-body">
          <p class="end-emoji">🍁</p>
          <h2>함께라서 더 따뜻한 교토</h2>
          <p>어머님의 힐링, 연우의 덕질, 그리고 우리 셋의 추억</p>
          <p class="end-meta">${esc(trip.period)}</p>
        </div>
      </section>`;
  }

  const html = [coverSlide(), overviewSlide()];
  trip.days.forEach((d) => {
    html.push(daySlide(d));
    d.spots.forEach((s) => html.push(spotSlide(d, s)));
  });
  html.push(endSlide());
  deck.innerHTML = html.join("");

  document.querySelectorAll(".photo").forEach((el) => {
    const img = new Image();
    img.alt = "";
    img.onload = () => {
      el.classList.add("loaded");
      el.prepend(img);
    };
    img.src = el.dataset.src;
  });

  const slides = Array.from(deck.querySelectorAll(".slide"));
  let current = 0;

  function show(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    counter.textContent = `${current + 1} / ${slides.length}`;
    bar.style.width = `${((current + 1) / slides.length) * 100}%`;
    history.replaceState(null, "", `#${current + 1}`);
  }

  function fit() {
    const s = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    deck.style.transform = `translate(-50%, -50%) scale(${s})`;
  }

  document.getElementById("prev").onclick = () => show(current - 1);
  document.getElementById("next").onclick = () => show(current + 1);
  document.getElementById("fullscreen").onclick = toggleFullscreen;

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); show(current + 1); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); show(current - 1); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "f" || e.key === "F") toggleFullscreen();
  });

  let touchX = null;
  document.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  window.addEventListener("resize", fit);
  fit();
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
