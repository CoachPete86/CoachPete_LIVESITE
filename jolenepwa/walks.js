<!-- Save as: walks.js -->
<script>
/* ========= Walks + Apple Maps (standalone, non-destructive) ========= */

(function () {
  const HOME_COORDS = "51.5475,-0.1420"; // Gaisford St, Kentish Town (above “Earth”)
  const STEPS_PER_MILE = 2000;

  // Make sure we can hide the Meals DOM without editing your HTML:
  function ensureMealsRoot() {
    // Prefer an existing #meals-app; otherwise tag your main content wrapper.
    let meals = document.getElementById('meals-app');
    if (meals) return meals;
    meals = document.querySelector('main, .content, #content, #app, body > section, body > div'); // best guess
    if (meals && !meals.id) meals.id = 'meals-app';
    return meals || null;
  }

  const ROUTE_LIBRARY = [
    { id: "regents-park-loop", name: "Regent’s Park Loop", miles: 4.2, start: HOME_COORDS, end: "51.5313,-0.1569", desc: "From home to Regent’s Park, loop Primrose/Inner Circle, return." },
    { id: "primrose-hill", name: "Primrose Hill + Park", miles: 4.5, start: HOME_COORDS, end: "51.5363,-0.1608", desc: "Out-and-back with a hill view." },
    { id: "hampstead-heath", name: "Hampstead Heath Circuit", miles: 5.5, start: HOME_COORDS, end: "51.5607,-0.1657", desc: "Mix of paths; great greenery." },
    { id: "canal-little-venice", name: "Regent’s Canal → Little Venice", miles: 5.8, start: "51.5396,-0.1438", end: "51.5150,-0.1830", desc: "Bus/tube to start; canal-side walk." },
    { id: "buck-traf-westminster", name: "Buckingham → Trafalgar → Westminster", miles: 5.6, start: "51.5014,-0.1419", end: "51.5007,-0.1246", desc: "Central landmarks; flat pavements." },
    { id: "south-bank", name: "South Bank Highlights", miles: 6.2, start: "51.5033,-0.1133", end: "51.5076,-0.0994", desc: "Waterloo → Tate route; easy navigation." },
    { id: "regents-park-extended", name: "Regent’s Park Extended", miles: 6.8, start: HOME_COORDS, end: "51.5313,-0.1569", desc: "Longer lap including Outer Circle." },
    { id: "heath-long", name: "Hampstead Heath Long", miles: 7.5, start: HOME_COORDS, end: "51.5607,-0.1657", desc: "Longer heath loop; rolling." },
    { id: "central-grand", name: "Central Grand Loop", miles: 7.8, start: "51.5033,-0.1133", end: "51.5033,-0.1133", desc: "Waterloo loop across bridges & sights." },
    { id: "regents-park-8", name: "Regent’s Park ~8", miles: 8.0, start: HOME_COORDS, end: "51.5313,-0.1569", desc: "Build week goal with long park laps." }
  ];

  function buildWeeklySchedule() {
    const baseWeek = [4.0, 4.5, 5.0, 4.0, 5.5, 6.0, 4.0]; // Mon..Sun
    const weeks = [];
    for (let w = 0; w < 12; w++) {
      const bump = Math.min(4, w * 0.35);
      const taper = (w % 3 === 2) ? -0.75 : 0;
      const week = baseWeek.map((m, i) => {
        const dayBump = (i === 1 || i === 2 || i === 5) ? 0.3 : (i === 3 || i === 6 ? -0.3 : 0);
        let val = m + bump + taper + dayBump;
        if (i === 6) val = Math.max(4, val - 0.5);
        return Math.min(8, Math.max(3.5, Math.round(val * 10) / 10));
      });
      weeks.push(week);
    }
    return weeks;
  }
  const WEEKLY_SCHEDULE = buildWeeklySchedule();

  function nearestRoute(targetMiles) {
    let best = ROUTE_LIBRARY[0], bestDiff = Math.abs(best.miles - targetMiles);
    for (const r of ROUTE_LIBRARY) {
      const d = Math.abs(r.miles - targetMiles);
      if (d < bestDiff) { best = r; bestDiff = d; }
    }
    return best;
  }

  function appleMapsLinks({ saddr, daddr, mode = "w" }) {
    const ios = `maps://?saddr=${encodeURIComponent(saddr)}&daddr=${encodeURIComponent(daddr)}&dirflg=${mode}`;
    const web = `https://maps.apple.com/?saddr=${encodeURIComponent(saddr)}&daddr=${encodeURIComponent(daddr)}&dirflg=${mode}`;
    return { ios, web };
  }

  function setMode(mode) {
    document.body.dataset.mode = mode;
    const meals = ensureMealsRoot();
    const walks = document.getElementById('walks-app');
    if (meals) meals.classList.toggle('hidden', mode === 'walks');
    if (walks) walks.classList.toggle('hidden', mode !== 'walks');

    const m = document.getElementById('tab-meals');
    const w = document.getElementById('tab-walks');
    if (m) { m.classList.toggle('active', mode === 'meals'); m.setAttribute('aria-selected', mode === 'meals' ? 'true' : 'false'); }
    if (w) { w.classList.toggle('active', mode === 'walks'); w.setAttribute('aria-selected', mode === 'walks' ? 'true' : 'false'); }
  }

  class WalksApp {
    constructor() {
      this.week = 1;
      this.day = 1;
      this.initDOM();
      this.hookSteps();
      this.readHash();
    }
    initDOM() {
      // Render week options
      const weekSel = document.getElementById('walks-week');
      if (weekSel) {
        weekSel.innerHTML = Array.from({length:12}, (_,i)=>`<option value="${i+1}">Week ${i+1}</option>`).join('');
        weekSel.value = String(this.week);
        weekSel.addEventListener('change', () => { this.week = parseInt(weekSel.value,10); this.renderWeek(); this.hideDay(); this.writeHash(); });
      }
      const back = document.getElementById('walks-back');
      if (back) back.addEventListener('click', () => this.hideDay());
      this.renderWeek();
    }
    readHash() {
      if (location.hash === '#walks') setMode('walks');
    }
    writeHash() {
      if (document.body.dataset.mode === 'walks') location.hash = '#walks';
    }
    renderWeek() {
      const grid = document.getElementById('walks-week-grid');
      if (!grid) return;
      grid.innerHTML = '';
      const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      WEEKLY_SCHEDULE[this.week-1].forEach((miles, idx) => {
        const btn = document.createElement('button');
        btn.className = 'day-tile';
        btn.style.textAlign = 'left';
        btn.style.padding = '.75rem';
        btn.style.border = '1px solid #333';
        btn.style.borderRadius = '0.75rem';
        btn.style.background = '#111';
        btn.innerHTML = `
          <div class="day-name">${days[idx]}</div>
          <div class="mini-note">Target: <span class="pill">${miles} mi</span></div>
        `;
        btn.addEventListener('click', () => this.showDay(idx+1, miles));
        grid.appendChild(btn);
      });
    }
    showDay(day, targetMiles) {
      this.day = day;
      const detail = document.getElementById('walks-day-detail');
      const title = document.getElementById('walks-day-title');
      const body = document.getElementById('walks-detail-body');
      if (!detail || !title || !body) return;

      const route = nearestRoute(targetMiles);
      title.textContent = `Week ${this.week} — Day ${this.day} (${targetMiles} mi target)`;

      const fromHomeWalk = appleMapsLinks({ saddr: HOME_COORDS, daddr: route.end, mode: 'w' });
      const toStartTransit = appleMapsLinks({ saddr: 'Current Location', daddr: route.start, mode: 'r' });

      body.innerHTML = `
        <div class="route-box">
          <div><strong>Suggested route:</strong> ${route.name} <span class="pill">~${route.miles} mi</span></div>
          <div class="mini-note" style="margin-top:.25rem;">${route.desc}</div>
          <div class="route-actions" style="margin-top:.5rem;">
            <a class="btn btn--outline" href="${fromHomeWalk.ios}" target="_self" rel="noopener">Open Apple Maps — Walk from home</a>
            <a class="btn btn--outline" href="${fromHomeWalk.web}" target="_blank" rel="noopener">Open in Browser (fallback)</a><br/>
            <a class="btn btn--outline" href="${toStartTransit.ios}" target="_self" rel="noopener">Apple Maps — Bus/Tube to start</a>
            <a class="btn btn--outline" href="${toStartTransit.web}" target="_blank" rel="noopener">Browser (fallback)</a>
          </div>
        </div>
        <div style="margin-top:.75rem;" class="mini-note">
          Or do your own walk and use the steps converter below: <code>${STEPS_PER_MILE} steps ≈ 1 mile</code>.
        </div>
      `;
      detail.style.display = 'block';
      this.writeHash();
    }
    hideDay() {
      const detail = document.getElementById('walks-day-detail');
      if (detail) detail.style.display = 'none';
    }
    hookSteps() {
      const input = document.getElementById('steps-input');
      const out = document.getElementById('steps-miles');
      if (!input || !out) return;
      const update = () => {
        const steps = Math.max(0, parseInt(input.value || '0', 10));
        const miles = steps / STEPS_PER_MILE;
        out.textContent = `${steps.toLocaleString()} steps ≈ ${miles.toFixed(2)} miles`;
      };
      input.addEventListener('input', update);
      update();
    }
  }

  // Expose minimal API in case you want to switch tabs externally
  window.JoleneWalks = { setMode };

  document.addEventListener('DOMContentLoaded', () => {
    // Wire tabs
    const tMeals = document.getElementById('tab-meals');
    const tWalks = document.getElementById('tab-walks');
    if (tMeals) tMeals.addEventListener('click', () => { setMode('meals'); history.replaceState(null, '', location.pathname); });
    if (tWalks) tWalks.addEventListener('click', () => { setMode('walks'); location.hash = '#walks'; });

    // Default tab from hash
    if (location.hash === '#walks') setMode('walks'); else setMode('meals');

    // Init
    ensureMealsRoot();
    new WalksApp();
  });
})();
</script>
