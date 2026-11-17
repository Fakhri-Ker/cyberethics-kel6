/* Adab Digital - script bersama semua halaman */
(function () {
  // Daftar halaman: dipakai untuk menu dan pencarian (satu sumber data)
  var PAGES = [
    { id: "beranda", url: "index.html", title: "Beranda", desc: "Video ringkasan dan pintu masuk ke semua materi", kw: "video ringkasan etika cyberethics adab digital" },
    { id: "cyberethics", url: "cyberethics.html", title: "Apa itu Cyberethics", desc: "Pengertian dan empat fase perkembangannya", kw: "pengertian etika dunia maya empat fase mainframe internet" },
    { id: "cyberspace", url: "cyberspace.html", title: "Perkembangan Cyberspace", desc: "Dari revolusi industri ke revolusi digital", kw: "cyberspace dunia maya transformasi e-commerce e-banking e-voting" },
    { id: "real-space", url: "real-space.html", title: "Dunia Nyata dan Dunia Maya", desc: "Norma yang sama di dua ruang", kw: "real space cyber space norma kesopanan kesusilaan hukum" },
    { id: "dimensi-moral", url: "dimensi-moral.html", title: "Sistem Moral dan Lima Dimensi", desc: "Hak informasi, hak milik, kualitas sistem, dan lainnya", kw: "moral etika privasi hak kekayaan intelektual akuntabilitas kualitas hidup" },
    { id: "cybercrime", url: "cybercrime.html", title: "Cybercrime dan Kasus", desc: "Kejahatan komputer dan cara menanganinya", kw: "kejahatan komputer virus penipuan pencurian data kasus penanganan" },
    { id: "perspektif-islam", url: "perspektif-islam.html", title: "Perspektif Islam", desc: "Akhlak, tabayyun, dan amanah di dunia digital", kw: "islam akhlak tabayyun amanah hoaks ghibah agama" },
    { id: "kuis", url: "kuis.html", title: "Kuis", desc: "Uji pemahamanmu", kw: "kuis latihan soal skor" },
    { id: "tim", url: "tim.html", title: "Tim dan Sumber", desc: "Anggota kelompok dan daftar pustaka", kw: "tim anggota kelompok sumber daftar pustaka" }
  ];
  var body = document.body;
  var current = body.getAttribute("data-page") || "beranda";
  var author = body.getAttribute("data-author") || "Tim Kelas 1D PAI";

  // Header
  var nav = PAGES.map(function (p) {
    return '<a href="' + p.url + '"' + (p.id === current ? ' aria-current="page"' : "") + ">" + p.title + "</a>";
  }).join("");
  var head = document.createElement("header");
  head.className = "site-head";
  head.innerHTML =
    '<div class="wrap head-in">' +
    '<a class="brand" href="index.html">Adab<b>Digital</b></a>' +
    '<nav class="nav" id="nav" aria-label="Menu utama">' + nav + "</nav>" +
    '<div class="tools"><input id="cari" type="search" placeholder="Cari materi" aria-label="Cari materi" autocomplete="off">' +
    '<div id="hasil" role="listbox"></div>' +
    '<button class="btn-i" id="tema" type="button" aria-label="Ganti tema terang atau gelap">Tema</button>' +
    '<button class="btn-i" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">Menu</button></div></div>';
  body.insertBefore(head, body.firstChild);
  var bar = document.createElement("div");
  bar.id = "bar";
  body.insertBefore(bar, body.firstChild);

  // Footer: tiap halaman memuat nama penyusunnya
  var foot = document.createElement("footer");
  foot.className = "site-foot";
  foot.innerHTML =
    '<div class="wrap"><p>Halaman ini disusun oleh <b>' + author + "</b>.</p>" +
    "<p>Designed by F</p><p>&copy; 2026 Kelas 1D PAI. Materi: Etika di Era Teknologi Informasi.</p></div>";
  body.appendChild(foot);

  // Tema terang/gelap
  var root = document.documentElement;
  try { var t = localStorage.getItem("tema"); if (t) root.setAttribute("data-theme", t); } catch (e) {}
  document.getElementById("tema").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme:dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tema", next); } catch (e) {}
  });

  // Menu di layar kecil
  var mb = document.getElementById("menuBtn");
  mb.addEventListener("click", function () {
    var open = document.getElementById("nav").classList.toggle("open");
    mb.setAttribute("aria-expanded", open);
  });

  // Pencarian materi
  var cari = document.getElementById("cari"), hasil = document.getElementById("hasil");
  cari.addEventListener("input", function () {
    var q = cari.value.trim().toLowerCase();
    if (!q) { hasil.style.display = "none"; return; }
    var found = PAGES.filter(function (p) {
      return (p.title + " " + p.desc + " " + p.kw).toLowerCase().indexOf(q) > -1;
    });
    hasil.innerHTML = found.length
      ? found.map(function (p) { return '<a href="' + p.url + '">' + p.title + "<small>" + p.desc + "</small></a>"; }).join("")
      : '<p style="padding:.5rem .7rem;margin:0">Tidak ada hasil untuk "' + q.replace(/</g, "") + '". Coba kata lain, misalnya "privasi".</p>';
    hasil.style.display = "block";
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".tools")) hasil.style.display = "none";
  });

  // Bilah progres baca
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }, { passive: true });

  // Intro "Get Started": klik membuka pintu dan langsung memutar video
  var intro = document.getElementById("intro"), video = document.getElementById("video");
  if (intro) {
    body.classList.add("lock");
    var start = document.getElementById("start");
    start.focus();
    start.addEventListener("click", function () {
      intro.classList.add("buka");
      body.classList.remove("lock");
      if (video) {
        var p = video.play();
        if (p && p.catch) p.catch(function () { video.setAttribute("controls", ""); });
      }
      setTimeout(function () { intro.remove(); }, 1100);
    });
  }
  if (video) {
    video.addEventListener("error", function () { video.parentNode.classList.add("err"); }, true);
  }
})();
