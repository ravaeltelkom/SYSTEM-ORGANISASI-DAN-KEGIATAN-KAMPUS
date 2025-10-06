// script.js - client-side interactions for the multi-page app (simulated behavior)

// Simple "auth" simulation for the login page
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // simple validation
      const email = document.getElementById('email').value.trim();
      if (!email.endsWith('@kampus.ac.id')) {
        alert('Gunakan email kampus (contoh: nama@kampus.ac.id)');
        return;
      }
      // simulate login success -> redirect to home.html
      localStorage.setItem('campus_user', JSON.stringify({name: 'Raka Mahasiswa', email}));
      location.href = 'home.html';
    });
  }

  // If on pages other than login, fill profile info from localStorage
  const user = JSON.parse(localStorage.getItem('campus_user') || 'null');
  if (user) {
    // update profile displays
    document.querySelectorAll('.profileName').forEach(el => el.innerText = user.name);
    document.querySelectorAll('.profileEmail').forEach(el => el.innerText = user.email);
  }

  // populate organisations and events on respective pages
  const orgs = [
    {id:1,name:'Art Club',short:'Komunitas seni & desain',desc:'Komunitas yang fokus pada seni rupa, desain grafis, dan workshop.'},
    {id:2,name:'Sportive',short:'Komunitas olahraga',desc:'Anggota aktif dibola, futsal, dan kegiatan kebugaran.'},
    {id:3,name:'Debate Squad',short:'Komunitas debat',desc:'Latihan debat dan ikut turnamen antar kampus.'},
    {id:4,name:'Green Action',short:'Komunitas lingkungan',desc:'Kegiatan peduli lingkungan dan kampanye hijau.'}
  ];

  const events = [
    {id:1,title:'Pelatihan Public Speaking',date:'2025-10-20',place:'Gedung Serba Guna',org:'Debate Squad'},
    {id:2,title:'Workshop UX',date:'2025-10-24',place:'Lab RPL',org:'Art Club'},
    {id:3,title:'Bakti Sosial',date:'2025-10-22',place:'Lapangan',org:'Green Action'}
  ];

  // populate organisasi page
  const orgGrid = document.querySelector('.org-grid');
  if (orgGrid) {
    orgGrid.innerHTML = orgs.map(o => `
      <div class="card">
        <div style="display:flex;gap:10px;align-items:center">
          <div style="width:48px;height:48px;border-radius:10px;background:#eef2ff;display:flex;align-items:center;justify-content:center;color:#2563eb;font-weight:700">${o.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
          <div>
            <div style="font-weight:700">${o.name}</div>
            <div style="font-size:13px;color:var(--muted)">${o.short}</div>
          </div>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:flex-end">
          <button class="btn" onclick="openOrg(${o.id})">Detail</button>
        </div>
      </div>
    `).join('');
  }

  // populate events page
  const eventsList = document.getElementById('eventsList');
  if (eventsList) {
    eventsList.innerHTML = events.map(ev => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-radius:8px;background:#fff">
        <div>
          <div style="font-weight:700">${ev.title}</div>
          <div style="font-size:13px;color:var(--muted)">${ev.date} • ${ev.place} • ${ev.org}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" onclick="alert('Detail event (simulasi)')">Detail</button>
          <button class="btn" onclick="alert('Kamu mengikuti event (simulasi)')">Ikuti</button>
        </div>
      </div>
    `).join('\n<div style="height:8px"></div>') ;
  }

  // filter page results initial render
  const resultsList = document.getElementById('resultsList');
  if (resultsList) {
    resultsList.innerHTML = events.map(ev => `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${ev.title}</div>
          <div style="font-size:13px;color:var(--muted)">${ev.date} • ${ev.place}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" onclick="alert('Detail event (simulasi)')">Detail</button>
          <button class="btn" onclick="alert('Kamu mengikuti event (simulasi)')">Ikuti</button>
        </div>
      </div>
    `).join('<div style="height:8px"></div>');
  }

  // function for opening org modal (if on organisasi page)
  window.openOrg = function(id) {
    const o = orgs.find(x=>x.id===id);
    const wrap = document.getElementById('orgModalWrap');
    if (!wrap) return alert('Modal: not available on this page');
    wrap.innerHTML = `
      <div class="modal-backdrop" onclick="closeOrgModal(event)">
        <div class="modal" onclick="event.stopPropagation()">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="font-weight:700">${o.name}</div>
            <div style="font-size:13px;color:var(--muted)">${o.short}</div>
          </div>
          <p style="margin-top:12px;color:var(--muted)">${o.desc}</p>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
            <button class="btn ghost" onclick="closeOrgModal()">Tutup</button>
            <button class="btn" onclick="alert('Gabung organisasi (simulasi)')">Gabung</button>
          </div>
        </div>
      </div>
    `;
  };

  window.closeOrgModal = function(ev) {
    const wrap = document.getElementById('orgModalWrap');
    if (wrap) wrap.innerHTML = '';
  };

  // filter functions
  window.applyFilter = function() {
    const cat = document.getElementById('category').value;
    const loc = document.getElementById('location').value.toLowerCase();
    const date = document.getElementById('date').value;
    // simple filter on events dataset above
    const filtered = events.filter(e=>{
      if (cat && cat!=='') return true; // categories not attached to events in demo; keep simple
      if (loc && !e.place.toLowerCase().includes(loc)) return false;
      if (date && e.date!==date) return false;
      return true;
    });
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
      resultsList.innerHTML = filtered.length ? filtered.map(ev=>`<div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:700">${ev.title}</div><div style="font-size:13px;color:var(--muted)">${ev.date} • ${ev.place}</div></div><div style="display:flex;gap:8px"><button class='btn ghost' onclick="alert('Detail event (simulasi)')">Detail</button><button class='btn' onclick="alert('Ikuti event (simulasi)')">Ikuti</button></div></div>`).join('<div style="height:8px"></div>') : '<div style="color:var(--muted)">Tidak ada hasil</div>';
    }
  };

  window.resetFilter = function() {
    document.getElementById('category').value='';
    document.getElementById('location').value='';
    document.getElementById('date').value='';
    applyFilter();
  };

});
