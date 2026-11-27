/**
 * ============================================================================
 * SMK NEGERI 2 KEC. GUGUAK - INTERACTIVE APPLICATION CONTROLLER
 * Synthesizing: Westbourne Intro, Stratford Layout, BMCHS Features, ISZL Motion
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initWestbourneIntro();
  initStratfordNavigation();
  initBMCHSCounters();
  initProgramFilterAndModal();
  initCampusFacilitiesTour();
  initISZLScrollEffects();
  initPPDBModal();
  initInquireModal();
  initFAQAccordion();
  initModalScrollProtection();
});

/* ============================================================================
   1. LOGO ASSEMBLY INTRO ANIMATION CONTROLLER (OPTIMIZED TIMING)
   ============================================================================ */
function initWestbourneIntro() {
  const introOverlay = document.getElementById('westbourne-intro-overlay');

  // Dismiss intro smoothly after full assembly and laser sweep complete
  setTimeout(() => {
    introOverlay?.classList.add('hide-intro');
  }, 3200);
}

/* ============================================================================
   2. STRATFORD ACADEMY SIGNATURE TWO-TIER HEADER & MOBILE DRAWER
   ============================================================================ */
function initStratfordNavigation() {
  const siteHeader = document.getElementById('site-header') || document.getElementById('iszl-site-header');
  const sideDock = document.getElementById('stratford-side-dock');
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtn = document.getElementById('btn-close-mobile-menu');
  const centerMenuBtn = document.getElementById('btn-iszl-center-menu');

  // Sticky header background transition & dynamic side dock on scroll
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 35) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Stratford dynamic side dock: horizontal at top of page, morphs into vertical tabs on scroll
    if (scrollY > 150) {
      sideDock?.classList.add('dock-scrolled');
    } else {
      sideDock?.classList.remove('dock-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Navigation Drawer toggle (Stratford mobile menu & drawer)
  const openDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (window.lenis) window.lenis.stop();
    else if (window.iszlScroller?.stop) window.iszlScroller.stop();
    if (window.lucide) window.lucide.createIcons();
  };

  const closeDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (window.lenis) window.lenis.start();
    else if (window.iszlScroller?.start) window.iszlScroller.start();
  };

  const toggleDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!mobileMenuDrawer) return;
    const isHidden = mobileMenuDrawer.classList.contains('hidden');
    if (isHidden) {
      openDrawer(e);
    } else {
      closeDrawer(e);
    }
  };

  window.openSchoolMenu = openDrawer;
  window.closeSchoolMenu = closeDrawer;

  if (centerMenuBtn) {
    centerMenuBtn.addEventListener('click', toggleDrawer);
  }
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleDrawer);
  }

  if (closeMobileMenuBtn && mobileMenuDrawer) {
    closeMobileMenuBtn.addEventListener('click', closeDrawer);
  }

  // Close drawer if clicking outside the sidebar container
  if (mobileMenuDrawer) {
    mobileMenuDrawer.addEventListener('click', (e) => {
      if (e.target === mobileMenuDrawer) {
        closeDrawer(e);
      }
    });
  }

  // Portal Dropdown Toggle & Auto-Close
  const portalBtn = document.getElementById('btn-toggle-portal');
  const portalDropdown = document.getElementById('portal-dropdown');
  const portalChevron = document.getElementById('portal-chevron-icon');

  if (portalBtn && portalDropdown) {
    portalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = portalDropdown.classList.contains('hidden');
      portalDropdown.classList.toggle('hidden');
      portalBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      if (portalChevron) {
        portalChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });

    // Close portal dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!portalBtn.contains(e.target) && !portalDropdown.contains(e.target)) {
        portalDropdown.classList.add('hidden');
        portalBtn.setAttribute('aria-expanded', 'false');
        if (portalChevron) portalChevron.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Search Modal Controller
  const openSearchBtn = document.getElementById('btn-open-search');
  const openSearchMobileBtn = document.getElementById('btn-open-search-mobile');
  const searchModal = document.getElementById('search-modal');
  const closeSearchBtn = document.getElementById('btn-close-search');
  const searchInput = document.getElementById('search-input');
  const searchTagLinks = document.querySelectorAll('.search-tag-link');

  const openSearch = () => {
    if (!searchModal) return;
    searchModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (window.lenis) window.lenis.stop();
    else if (window.iszlScroller?.stop) window.iszlScroller.stop();
    setTimeout(() => searchInput?.focus(), 100);
  };

  const closeSearch = () => {
    if (!searchModal) return;
    searchModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (window.lenis) window.lenis.start();
    else if (window.iszlScroller?.start) window.iszlScroller.start();
  };

  window.closeSearchModal = closeSearch;

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (openSearchMobileBtn) openSearchMobileBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  searchTagLinks.forEach(tag => {
    tag.addEventListener('click', () => {
      closeSearch();
    });
  });

  // Keyboard accessibility: ESC key closes modals & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (portalDropdown && !portalDropdown.classList.contains('hidden')) {
        portalDropdown.classList.add('hidden');
        portalBtn?.setAttribute('aria-expanded', 'false');
        if (portalChevron) portalChevron.style.transform = 'rotate(0deg)';
      }
      if (searchModal && !searchModal.classList.contains('hidden')) {
        closeSearch();
      }
      if (mobileMenuDrawer && !mobileMenuDrawer.classList.contains('hidden')) {
        mobileMenuDrawer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        if (window.lenis) window.lenis.start();
        else if (window.iszlScroller?.start) window.iszlScroller.start();
      }
    }
  });

  // Search Input Quick Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchTagLinks.forEach(tag => {
        const text = tag.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          tag.style.display = 'inline-flex';
        } else {
          tag.style.display = 'none';
        }
      });
    });
  }
}

/* ============================================================================
   3. BMCHS STYLE: AT A GLANCE COUNTERS (INTERSECTION OBSERVER)
   ============================================================================ */
function initBMCHSCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = 20;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.innerText = prefix + target.toLocaleString('id-ID') + suffix;
              clearInterval(timer);
            } else {
              counter.innerText = prefix + Math.floor(count).toLocaleString('id-ID') + suffix;
            }
          }, stepTime);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('at-a-glance-section');
  if (statsSection) counterObserver.observe(statsSection);
}

/* ============================================================================
   4. BMCHS & ISZL: INTERACTIVE PROGRAM EXPLORER & MODAL DETAILS
   ============================================================================ */
const PROGRAM_DATABASE = {
  pplg: {
    title: 'Pengembangan Perangkat Lunak dan Gim (PPLG)',
    alias: 'Rekayasa Perangkat Lunak (RPL)',
    category: 'Teknologi Informasi & Komunikasi',
    badge: 'Unggulan IT & Coding',
    icon: 'code-2',
    description: 'Konsentrasi keahlian yang membekali siswa dengan kemampuan rekayasa perangkat lunak modern, pengembangan web frontend/backend, aplikasi mobile Android/iOS, basis data, dan arsitektur logika sistem gim berstandar industri.',
    competencies: [
      'Pemrograman Berorientasi Objek (OOP) & Clean Code',
      'Fullstack Web Development (HTML5, Tailwind, JS, PHP/Node.js, MySQL)',
      'Pengembangan Aplikasi Mobile (Flutter / React Native)',
      'UI/UX Design & Prototyping dengan Figma',
      'Manajemen Versi Kode dengan Git & GitHub',
      'Pengujian Perangkat Lunak (Quality Assurance)'
    ],
    facilities: 'Laboratorium Software & Coding ber-AC dengan PC Core i7, koneksi fiber optik gigabit, dan smart monitor presentasi.',
    careers: ['Junior Software Engineer', 'Web Developer', 'Mobile App Developer', 'UI/UX Designer', 'Software QA Tester', 'Tech Entrepreneur / Freelancer'],
    certification: 'Sertifikasi Profesi BNSP Skema Junior Web Programmer & LSP-P1 SMKN 2 Guguak'
  },
  tjkt: {
    title: 'Teknik Jaringan Komputer & Telekomunikasi (TJKT)',
    alias: 'Teknik Komputer dan Jaringan (TKJ)',
    category: 'Teknologi Informasi & Komunikasi',
    badge: 'Jaringan & Infrastruktur Server',
    icon: 'network',
    description: 'Mempersiapkan siswa menjadi teknisi andal dalam perancangan, instalasi, dan administrasi jaringan kabel & nirkabel, konfigurasi router/switch enterprise (MikroTik/Cisco), server cloud, serta dasar pertahanan siber.',
    competencies: [
      'Instalasi & Konfigurasi Jaringan LAN, WAN, & Wireless Enterprise',
      'Routing & Switching (MikroTik MTCNA Standard & Cisco CCNA)',
      'Administrasi Server Linux & Windows Server (DNS, Web, Mail, FTP)',
      'Fiber Optic Splicing, OTDR & Pengkabelan Terstruktur',
      'Dasar Keamanan Siber (Firewall, VPN, IDS/IPS)',
      'Virtualisasi & Cloud Computing Fundamentals'
    ],
    facilities: 'Lab Cisco & MikroTik Academy, rak server blade, splicing tool fiber optic, dan tester kabel berstandar industri.',
    careers: ['Network Administrator', 'Computer & Network Technician', 'System Administrator', 'Fiber Optic Specialist', 'Helpdesk Support IT'],
    certification: 'MikroTik Certified Network Associate (MTCNA) & BNSP Teknisi Madya Jaringan'
  },
  dkv: {
    title: 'Desain Komunikasi Visual (DKV)',
    alias: 'Multimedia Kreatif',
    category: 'Teknologi Informasi & Seni Kreatif',
    badge: 'Media Digital & Industri Kreatif',
    icon: 'palette',
    description: 'Mengasah daya cipta visual dan estetika digital siswa dalam bidang desain grafis, ilustrasi, fotografi profesional, videografi komersial, animasi 2D/3D, serta manajemen konten media sosial.',
    competencies: [
      'Desain Grafis Komersial (Adobe Photoshop, Illustrator, CorelDRAW)',
      'Produksi Audio & Video Editing (Adobe Premiere Pro & After Effects)',
      'Fotografi Studio & Lighting Profesional',
      'Animasi 2D & Motion Graphics',
      'Branding, Packaging Design & Copywriting',
      'Social Media Content Creation & Podcast Production'
    ],
    facilities: 'Studio Fotografi & Green Screen, Ruang Podcast Kedap Suara, dan Workstation Apple iMac / PC Render bertenaga GPU RTX.',
    careers: ['Graphic Designer', 'Video Editor / Videographer', 'Motion Graphic Animator', 'Content Creator', 'Photographer', 'Creative Director Agency'],
    certification: 'Sertifikasi BNSP Skema Desainer Grafis Muda & Operator Kamera Video'
  },
  akl: {
    title: 'Akuntansi dan Keuangan Lembaga (AKL)',
    alias: 'Akuntansi Digital & Perbankan',
    category: 'Bisnis dan Manajemen',
    badge: 'Keuangan & Fintech',
    icon: 'bar-chart-3',
    description: 'Mencetak tenaga ahli keuangan yang teliti, jujur, dan terampil mengoperasikan sistem akuntansi modern, perpajakan, komputer akuntansi (MYOB/Accurate/Spreadsheet), serta administrasi perbankan syariah dan konvensional.',
    competencies: [
      'Penyusunan Laporan Keuangan Jasa, Dagang, & Manufaktur',
      'Komputer Akuntansi (MYOB Accounting, Accurate, & Excel Advanced)',
      'Administrasi Perpajakan (PPh, PPN, dan e-Faktur/e-SPT)',
      'Pengelolaan Kas Kecil & Rekonsiliasi Bank',
      'Akuntansi Lembaga / Instansi Pemerintahan',
      'Layanan Perbankan & Lembaga Keuangan Mikro'
    ],
    facilities: 'Bank Mini SMKN 2 Guguak (Simulasi Teller & Customer Service), Lab Komputer Akuntansi lengkap dengan software akuntansi legal berlisensi.',
    careers: ['Staff Akuntansi / Pembukuan', 'Staff Administrasi Keuangan Perusahaan', 'Teller / Customer Service Bank', 'Staff Pajak', 'Kasir & Pengelola UMKM'],
    certification: 'Sertifikasi BNSP Teknisi Akuntansi Yunior & Sertifikasi MYOB Authorized'
  },
  mplb: {
    title: 'Manajemen Perkantoran dan Layanan Bisnis (MPLB)',
    alias: 'Otomatisasi Tata Kelola Perkantoran (OTKP)',
    category: 'Bisnis dan Manajemen',
    badge: 'Administrasi & Corporate Affairs',
    icon: 'briefcase',
    description: 'Mendidik sekretaris dan administrator kantor modern yang memiliki kecakapan komunikasi bisnis prima, kearsipan elektronik, keprotokolan, manajemen rapat virtual, dan penguasaan bahasa asing untuk lingkungan kerja korporat.',
    competencies: [
      'Korespondensi Bahasa Indonesia & Bahasa Inggris Bisnis',
      'Otomatisasi Perkantoran (Google Workspace & Microsoft 365 Enterprise)',
      'Kearsipan Elektronik & Manajemen Dokumen Digital',
      'Tata Kelola Rapat, Notulensi & Keprotokolan',
      'Public Relations, Grooming & Etika Pelayanan Prima',
      'Pengelolaan Kas Kecil & Administrasi Kepegawaian'
    ],
    facilities: 'Ruang Simulasi Kantor Modern (Office Mock-up), peralatan presentasi interaktif, mesin kearsipan modern, dan ruang konferensi mini.',
    careers: ['Sekretaris Eksekutif', 'Staff Administrasi Perkantoran', 'Customer Care Representative', 'Event Organizer / Protokoler', 'Arsiparis Digital'],
    certification: 'Sertifikasi BNSP Skema Asisten Sekretaris & Administrasi Perkantoran Modern'
  }
};

function initProgramFilterAndModal() {
  const filterBtns = document.querySelectorAll('.program-filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  const modal = document.getElementById('program-detail-modal');
  const modalContent = document.getElementById('modal-program-content');
  const closeModalBtn = document.getElementById('btn-close-program-modal');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-emerald-800', 'text-white'));
      btn.classList.add('active', 'bg-emerald-800', 'text-white');
      
      const filter = btn.getAttribute('data-filter');
      programCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.classList.add('fade-in-delayed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal open trigger
  document.querySelectorAll('.btn-open-program-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const programKey = btn.getAttribute('data-program');
      const data = PROGRAM_DATABASE[programKey];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="p-6 md:p-8">
          <div class="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-2">
                ${data.category}
              </span>
              <h3 class="text-2xl md:text-3xl font-bold text-slate-900 font-serif-title">${data.title}</h3>
              <p class="text-emerald-700 font-medium text-sm mt-1">Dikenal juga sebagai: ${data.alias}</p>
            </div>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <h4 class="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2">Deskripsi Program</h4>
              <p class="text-slate-700 leading-relaxed">${data.description}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-600"></span> Kompetensi Inti
                </h4>
                <ul class="space-y-2 text-sm text-slate-600">
                  ${data.competencies.map(comp => `<li class="flex items-start gap-2">✓ <span>${comp}</span></li>`).join('')}
                </ul>
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span> Prospek Karier & Lulusan
                </h4>
                <ul class="space-y-2 text-sm text-slate-600">
                  ${data.careers.map(car => `<li class="flex items-start gap-2">💼 <span>${car}</span></li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="border-t border-slate-200 pt-5 space-y-4">
              <div>
                <h4 class="text-xs uppercase font-bold text-slate-500 mb-1">Fasilitas Praktik Unggulan</h4>
                <p class="text-sm text-slate-700">🔬 ${data.facilities}</p>
              </div>
              <div>
                <h4 class="text-xs uppercase font-bold text-slate-500 mb-1">Standar Sertifikasi</h4>
                <p class="text-sm text-emerald-800 font-medium">📜 ${data.certification}</p>
              </div>
            </div>

            <div class="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200">
              <a href="#ppdb-section" onclick="document.getElementById('program-detail-modal').classList.remove('active')" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-md transition-all">
                Daftar Jurusan Ini di PPDB
              </a>
              <span class="text-xs text-slate-500">SMK Pusat Keunggulan TIK & Bisman Lima Puluh Kota</span>
            </div>
          </div>
        </div>
      `;

      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
      if (window.lenis) window.lenis.stop();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      if (window.lenis) window.lenis.start();
    });
  }

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      if (window.lenis) window.lenis.start();
    }
  });
}

/* ============================================================================
   5. ISZL STYLE: INTERACTIVE CAMPUS FACILITIES & VIRTUAL TOUR
   ============================================================================ */
function initCampusFacilitiesTour() {
  const facilityTabs = document.querySelectorAll('.facility-tab-btn');
  const facilityImage = document.getElementById('facility-display-image');
  const facilityTitle = document.getElementById('facility-display-title');
  const facilityDesc = document.getElementById('facility-display-desc');
  const facilityTag = document.getElementById('facility-display-tag');

  const FACILITIES_DATA = {
    green_campus: {
      title: 'Lingkungan Asri & Hijau (Green Campus 12.120 m²)',
      desc: 'Dikelilingi pepohonan rindang dan panorama alam Nagari VII Koto Talago, SMKN 2 Guguak memberikan iklim belajar yang sejuk, bebas kebisingan, dan menunjang konsentrasi para siswa.',
      tag: 'Karakter & Kenyamanan Belajar',
      img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'
    },
    it_lab: {
      title: 'Laboratorium Software & Jaringan Standar Industri',
      desc: 'Dilengkapi puluhan unit PC berspesifikasi tinggi, routerboard MikroTik, switch manageable, fiber optic toolkit, dan koneksi internet fiber optik berkecepatan tinggi.',
      tag: 'Fasilitas Praktik TIK',
      img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
    },
    multimedia_studio: {
      title: 'Studio Multimedia, Podcast & Green Screen',
      desc: 'Ruang kedap suara khusus produksi konten visual, kamera video 4K, lighting profesional, audio capture, dan workstation render untuk kreasi grafis & animasi.',
      tag: 'Fasilitas Kreatif DKV',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
    },
    bank_mini: {
      title: 'Bank Mini & Ruang Simulasi Kantor Modern',
      desc: 'Sarana teaching factory untuk siswa Akuntansi dan MPLB. Mempraktikkan alur transaksi perbankan, administrasi arsip digital, dan pelayanan tamu secara nyata.',
      tag: 'Teaching Factory Bisman',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    },
    perpustakaan: {
      title: 'Perpustakaan & Pojok Baca Digital',
      desc: 'Pusat literasi terpadu dengan koleksi ribuan buku pelajaran, referensi kejuruan, e-book reader, dan area baca representatif berkonsep modern.',
      tag: 'Pusat Sumber Belajar',
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
    }
  };

  facilityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      facilityTabs.forEach(t => t.classList.remove('bg-emerald-800', 'text-white', 'border-emerald-800'));
      tab.classList.add('bg-emerald-800', 'text-white', 'border-emerald-800');

      const facilityKey = tab.getAttribute('data-facility');
      const data = FACILITIES_DATA[facilityKey];
      if (!data) return;

      // Smooth crossfade effect
      if (facilityImage) {
        facilityImage.style.opacity = '0';
        setTimeout(() => {
          facilityImage.src = data.img;
          facilityImage.style.opacity = '1';
        }, 200);
      }
      if (facilityTitle) facilityTitle.innerText = data.title;
      if (facilityDesc) facilityDesc.innerText = data.desc;
      if (facilityTag) facilityTag.innerText = data.tag;
    });
  });
}

/* ============================================================================
   6. ISZL SWISS STYLE: LENIS INERTIA MOMENTUM SCROLL & KINETIC CHOREOGRAPHY
   ============================================================================ */

/**
 * Fallback Standalone Inertia Momentum Scroll Engine
 * Emulates the exact physics of Swiss agency web builds (ISZL / Lenis / Locomotive)
 * Runs if Lenis is not available; fully synchronized with scrollbars & keyboards.
 */
class ISZLSmoothScrollEngine {
  constructor(options = {}) {
    this.ease = options.ease || 0.082;
    this.wheelMultiplier = options.wheelMultiplier || 1.15;
    this.current = window.scrollY || window.pageYOffset || 0;
    this.target = this.current;
    this.isScrolling = false;
    this.isStopped = false;
    this.callbacks = [];

    this.init();
  }

  init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Keep target synchronized when user drags native browser scrollbar or touches
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        this.current = window.scrollY || window.pageYOffset || 0;
        this.target = this.current;
      }
    }, { passive: true });

    window.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('resize', () => this.updateMaxScroll());

    this.updateMaxScroll();
    this.startLoop();
  }

  updateMaxScroll() {
    this.maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  onWheel(e) {
    const openModal = document.querySelector('.modal-overlay.active, #mobile-drawer:not(.hidden), #search-modal:not(.hidden)');
    if (openModal && openModal.contains(e.target)) return;

    e.preventDefault();
    this.updateMaxScroll();

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 36; // lines to px
    else if (e.deltaMode === 2) delta *= window.innerHeight;

    this.target += delta * this.wheelMultiplier;
    this.target = Math.max(0, Math.min(this.target, this.maxScroll));
    this.isScrolling = true;
  }

  onKeyDown(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    const openModal = document.querySelector('.modal-overlay.active, #mobile-drawer:not(.hidden), #search-modal:not(.hidden)');
    if (openModal) return;

    this.updateMaxScroll();
    let delta = 0;
    if (e.key === 'ArrowDown') delta = 100;
    else if (e.key === 'ArrowUp') delta = -100;
    else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) delta = window.innerHeight * 0.85;
    else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) delta = -window.innerHeight * 0.85;
    else if (e.key === 'Home') delta = -this.target;
    else if (e.key === 'End') delta = this.maxScroll - this.target;

    if (delta !== 0) {
      e.preventDefault();
      this.target = Math.max(0, Math.min(this.target + delta, this.maxScroll));
      this.isScrolling = true;
    }
  }

  scrollTo(targetY, options = {}) {
    this.updateMaxScroll();
    let dest = 0;
    if (typeof targetY === 'number') {
      dest = targetY;
    } else if (targetY instanceof HTMLElement) {
      const offset = options.offset || 0;
      dest = targetY.getBoundingClientRect().top + this.current + offset;
    }
    this.target = Math.max(0, Math.min(dest, this.maxScroll));
    this.isScrolling = true;
  }

  stop() {
    this.isStopped = true;
  }

  start() {
    this.isStopped = false;
  }

  on(event, cb) {
    if (event === 'scroll') this.callbacks.push(cb);
  }

  startLoop() {
    const tick = () => {
      if (this.isStopped) {
        requestAnimationFrame(tick);
        return;
      }

      const diff = this.target - this.current;

      if (Math.abs(diff) > 0.2) {
        this.current += diff * this.ease;
        window.scrollTo(0, this.current);

        const velocity = diff * this.ease;
        const progress = this.maxScroll > 0 ? this.current / this.maxScroll : 0;

        for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i]({
            scroll: this.current,
            target: this.target,
            velocity: velocity,
            progress: progress
          });
        }
      } else if (this.isScrolling) {
        this.current = this.target;
        window.scrollTo(0, this.current);
        this.isScrolling = false;

        const progress = this.maxScroll > 0 ? this.current / this.maxScroll : 0;
        for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i]({
            scroll: this.current,
            target: this.target,
            velocity: 0,
            progress: progress
          });
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}

let iszlScroller = null;

function initISZLScrollEffects() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const floatingActions = document.getElementById('floating-scroll-actions');
  const scrollPercentageEl = document.getElementById('scroll-percentage');
  const backToTopBtn = document.getElementById('btn-back-to-top');
  const heroTrack = document.getElementById('hero-pinned-track');
  const heroMediaFrame = document.getElementById('hero-media-frame');
  const heroOverlay = document.getElementById('hero-overlay');
  const heroBg = document.getElementById('hero-bg-img');
  const heroContent = document.getElementById('hero-content');
  const heroGlassCard = document.getElementById('hero-editorial-glass-card');
  const siteHeader = document.getElementById('site-header');
  const heroScrollCue = document.getElementById('hero-scroll-cue');
  const manifestoSection = document.getElementById('manifesto-strip-section');
  const manifestoStrip = document.getElementById('manifesto-bg-strip');
  const manifestoCard = document.getElementById('manifesto-card');
  const photoRail = document.getElementById('iszl-photo-rail');
  const railPrevBtn = document.getElementById('manifesto-rail-prev');
  const railNextBtn = document.getElementById('manifesto-rail-next');
  const atAGlanceSection = document.getElementById('at-a-glance-section');
  const statSlotStudents = document.getElementById('stat-slot-students');
  const statSlotPartners = document.getElementById('stat-slot-partners');
  const statOrbitStudents = document.getElementById('stat-orbit-students');
  const statOrbitPartners = document.getElementById('stat-orbit-partners');
  const parallaxImages = document.querySelectorAll('.stratford-division-card img, .stratford-news-card img');

  let manualRailOffset = 0;
  let railDragState = 'idle';
  let railDragStartX = 0;
  let railDragStartY = 0;
  let railDragStartManualOffset = 0;
  let railSmoothTimeout = null;

  function syncManifestoStripBounds() {
    if (!manifestoStrip || !manifestoSection || !manifestoCard) return;
    if (window.innerWidth >= 768) {
      const secRect = manifestoSection.getBoundingClientRect();
      const cardRect = manifestoCard.getBoundingClientRect();
      const leftInsideCard = Math.max(0, Math.round(cardRect.left - secRect.left + 18));
      manifestoStrip.style.left = `${leftInsideCard}px`;
    } else {
      manifestoStrip.style.left = '';
    }
  }

  function getManifestoProgress() {
    if (!manifestoSection) return 0;
    const rect = manifestoSection.getBoundingClientRect();
    const totalTravel = window.innerHeight + rect.height;
    return Math.min(1, Math.max(0, (window.innerHeight - rect.top) / totalTravel));
  }

  function getManifestoMaxShift() {
    if (!photoRail || !manifestoStrip) return window.innerWidth >= 768 ? 1100 : 1400;
    const stripWidth = manifestoStrip.clientWidth || window.innerWidth;
    return Math.max(400, photoRail.scrollWidth - stripWidth);
  }

  function applyManifestoRailTransform(mProgress) {
    if (!photoRail) return;
    const maxShift = getManifestoMaxShift();
    const autoOffset = mProgress * maxShift;

    let totalOffset = autoOffset + manualRailOffset;
    if (totalOffset < 0) {
      totalOffset = 0;
      manualRailOffset = -autoOffset;
    } else if (totalOffset > maxShift) {
      totalOffset = maxShift;
      manualRailOffset = maxShift - autoOffset;
    }

    photoRail.style.transform = `translate3d(-${totalOffset.toFixed(1)}px, 0, 0)`;

    if (railPrevBtn) railPrevBtn.disabled = totalOffset <= 2;
    if (railNextBtn) railNextBtn.disabled = totalOffset >= maxShift - 2;
  }

  function nudgeManifestoRail(deltaPx) {
    if (!photoRail) return;
    clearTimeout(railSmoothTimeout);
    photoRail.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    manualRailOffset += deltaPx;
    applyManifestoRailTransform(getManifestoProgress());
    railSmoothTimeout = setTimeout(() => {
      if (railDragState !== 'dragging') photoRail.style.transition = '';
    }, 360);
  }

  if (manifestoStrip && photoRail) {
    manifestoStrip.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      clearTimeout(railSmoothTimeout);
      railDragStartX = e.clientX;
      railDragStartY = e.clientY;
      railDragStartManualOffset = manualRailOffset;

      if (e.pointerType === 'mouse') {
        railDragState = 'dragging';
        manifestoStrip.classList.add('is-dragging');
        photoRail.style.transition = 'none';
        try { manifestoStrip.setPointerCapture(e.pointerId); } catch (_) {}
      } else {
        railDragState = 'pending';
      }
    });

    manifestoStrip.addEventListener('pointermove', (e) => {
      if (railDragState === 'idle') return;
      const dx = e.clientX - railDragStartX;
      const dy = e.clientY - railDragStartY;

      if (railDragState === 'pending') {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          railDragState = 'dragging';
          manifestoStrip.classList.add('is-dragging');
          photoRail.style.transition = 'none';
          try { manifestoStrip.setPointerCapture(e.pointerId); } catch (_) {}
        } else if (Math.abs(dy) > 8) {
          railDragState = 'idle';
          return;
        } else {
          return;
        }
      }

      manualRailOffset = railDragStartManualOffset - dx;
      applyManifestoRailTransform(getManifestoProgress());
    });

    const endRailDrag = (e) => {
      if (railDragState === 'idle') return;
      railDragState = 'idle';
      manifestoStrip.classList.remove('is-dragging');
      photoRail.style.transition = '';
      if (e && e.pointerId !== undefined) {
        try {
          if (manifestoStrip.hasPointerCapture(e.pointerId)) {
            manifestoStrip.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
      }
    };

    manifestoStrip.addEventListener('pointerup', endRailDrag);
    manifestoStrip.addEventListener('pointercancel', endRailDrag);

    manifestoStrip.addEventListener('wheel', (e) => {
      const horizontalIntent = Math.abs(e.deltaX) > Math.abs(e.deltaY) || (e.shiftKey && e.deltaY !== 0);
      if (!horizontalIntent) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      manualRailOffset += delta;
      applyManifestoRailTransform(getManifestoProgress());
    }, { passive: false });
  }

  if (railPrevBtn) railPrevBtn.addEventListener('click', () => nudgeManifestoRail(-300));
  if (railNextBtn) railNextBtn.addEventListener('click', () => nudgeManifestoRail(300));

  syncManifestoStripBounds();
  applyManifestoRailTransform(getManifestoProgress());
  window.addEventListener('resize', () => {
    syncManifestoStripBounds();
    applyManifestoRailTransform(getManifestoProgress());
  });

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Unified visual feedback callback (ISZL Agency Standard)
  function onScrollUpdate(scrollY, progress, velocity) {
    // 1. Progress Bar Update
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    }

    // 2. Percentage in floating pill
    if (scrollPercentageEl) {
      scrollPercentageEl.innerText = `${Math.round(progress * 100)}%`;
    }

    // 3. Floating Action Visibility
    if (floatingActions) {
      if (scrollY > 300) {
        floatingActions.classList.add('visible');
      } else {
        floatingActions.classList.remove('visible');
      }
    }

    // 4. ISZL Hero Shrink-to-Frame & Frosted Glass Editorial Card Choreography
    const trackRange = heroTrack ? Math.max(1, heroTrack.offsetHeight - window.innerHeight) : 1200;
    const extendedHeroProgress = Math.max(0, scrollY / trackRange);
    const heroProgress = Math.min(1, extendedHeroProgress);
    const isDesktop = window.innerWidth >= 768;

    if (scrollY <= trackRange + window.innerHeight * 0.9) {
      // Scroll Cue fades out early
      if (heroScrollCue) {
        const cueOpacity = Math.max(0, 1 - heroProgress / 0.14);
        heroScrollCue.style.opacity = `${cueOpacity}`;
        heroScrollCue.style.pointerEvents = cueOpacity > 0.1 ? 'auto' : 'none';
      }

      // Hero Headline & Action Buttons lift and fade out cleanly
      if (heroContent) {
        const contentFade = Math.min(1, heroProgress / 0.32);
        const contentEase = contentFade * (2 - contentFade);
        heroContent.style.transform = `translate3d(0, -${contentEase * 75}px, 0)`;
        const contentOpacity = Math.max(0, 1 - contentFade * 1.15);
        heroContent.style.opacity = `${contentOpacity}`;
        heroContent.style.pointerEvents = contentOpacity > 0.15 ? 'auto' : 'none';
      }

      // Hero Background Image Frame shrinks into centered Swiss editorial frame
      if (heroMediaFrame) {
        const shrinkRaw = Math.min(1, Math.max(0, (heroProgress - 0.10) / 0.56));
        const s = easeInOutCubic(shrinkRaw);

        if (isDesktop) {
          const top = s * 15;
          const right = s * 28;
          const bottom = s * 15;
          const left = s * 12;
          const radius = s * 16;
          heroMediaFrame.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
        } else {
          const top = s * 12;
          const right = s * 6;
          const bottom = s * 28;
          const left = s * 6;
          const radius = s * 14;
          heroMediaFrame.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
        }

        if (heroOverlay) {
          heroOverlay.style.opacity = `${Math.max(0.06, 1 - s * 0.94)}`;
        }
      }

      // Subtle scale-down on background photo inside frame
      if (heroBg) {
        heroBg.style.transform = `scale(${1.06 - heroProgress * 0.06})`;
      }

      // Frosted Glass Editorial Card: enters smoothly, rises upward with scroll, and blurs/vanishes past 1cm below the top navbar
      if (heroGlassCard) {
        const enterRaw = Math.min(1, Math.max(0, (extendedHeroProgress - 0.38) / 0.24));
        const enterEase = 1 - Math.pow(1 - enterRaw, 3);

        const riseProgress = Math.max(0, extendedHeroProgress - 0.46);
        const upRange = isDesktop
          ? Math.max(240, window.innerHeight * 0.36)
          : Math.max(220, window.innerHeight * 0.52);
        const yOffsetPx = (isDesktop ? 44 : 36) * (1 - enterEase) - riseProgress * upRange;
        const xOffsetPx = isDesktop ? (1 - enterEase) * 32 : 0;

        if (isDesktop) {
          heroGlassCard.style.transform = `translate3d(${xOffsetPx.toFixed(1)}px, calc(-50% + ${yOffsetPx.toFixed(1)}px), 0)`;
        } else {
          heroGlassCard.style.transform = `translate3d(0, ${yOffsetPx.toFixed(1)}px, 0)`;
        }

        const headerBottom = siteHeader ? siteHeader.getBoundingClientRect().bottom : 88;
        const cardTop = heroGlassCard.getBoundingClientRect().top;
        const gapToHeaderPx = cardTop - headerBottom;
        const oneCmPx = 38;
        const exitRaw = Math.min(1, Math.max(0, (oneCmPx - gapToHeaderPx) / 110));
        const exitEase = exitRaw * exitRaw * (3 - 2 * exitRaw);

        const cardOpacity = Math.max(0, enterEase * (1 - exitEase * 1.05));
        const cardBlur = exitEase * 16;

        heroGlassCard.style.opacity = `${cardOpacity.toFixed(3)}`;
        heroGlassCard.style.filter = cardBlur > 0.05 ? `blur(${cardBlur.toFixed(2)}px)` : 'none';
        heroGlassCard.style.pointerEvents = cardOpacity > 0.25 ? 'auto' : 'none';
      }
    } else if (heroGlassCard) {
      heroGlassCard.style.opacity = '0';
      heroGlassCard.style.filter = 'blur(16px)';
      heroGlassCard.style.pointerEvents = 'none';
    }

    // 5. Manifesto Horizontal Photo Rail Scrubbing + Manual Drag & Frosted Glass Blur/Vanish
    if (photoRail && manifestoSection) {
      syncManifestoStripBounds();
      const mProgress = getManifestoProgress();
      applyManifestoRailTransform(mProgress);

      if (manifestoCard) {
        // Turn increasingly translucent / frosted-glass as images move behind the card
        const glassP = Math.min(1, Math.max(0, (mProgress - 0.14) / 0.40));
        // Deepen blur & fade out as user keeps scrolling down past the card
        const vanishRaw = Math.min(1, Math.max(0, (mProgress - 0.54) / 0.34));
        const v = vanishRaw * vanishRaw * (3 - 2 * vanishRaw);

        const backdropBlur = 12 + glassP * 12 + v * 14;
        const alphaTop = Math.max(0.14, 0.84 - glassP * 0.30 - v * 0.38);
        const alphaBot = Math.max(0.10, 0.78 - glassP * 0.32 - v * 0.34);
        const cardBlur = v * 16;
        const cardOpacity = Math.max(0, 1 - v * 1.05);
        const cardLift = v * 28;
        const cardScale = 1 - v * 0.04;

        manifestoCard.style.background = `linear-gradient(135deg, rgba(6, 56, 37, ${alphaTop.toFixed(3)}) 0%, rgba(4, 31, 21, ${alphaBot.toFixed(3)}) 100%)`;
        manifestoCard.style.backdropFilter = `blur(${backdropBlur.toFixed(1)}px)`;
        manifestoCard.style.webkitBackdropFilter = `blur(${backdropBlur.toFixed(1)}px)`;
        manifestoCard.style.filter = cardBlur > 0.05 ? `blur(${cardBlur.toFixed(2)}px)` : 'none';
        manifestoCard.style.opacity = `${cardOpacity.toFixed(3)}`;
        manifestoCard.style.transform = `translate3d(0, -${cardLift.toFixed(1)}px, 0) scale(${cardScale.toFixed(4)})`;
        manifestoCard.style.pointerEvents = cardOpacity > 0.15 ? 'auto' : 'none';
      }
    }

    // 6. Continuous Orbital Rotation for Two Stat Circles ("1.250+" & "45+") While Visible on Scroll
    if (atAGlanceSection && statOrbitStudents && statOrbitPartners && statSlotStudents && statSlotPartners) {
      const slotARect = statSlotStudents.getBoundingClientRect();
      const slotBRect = statSlotPartners.getBoundingClientRect();
      const widthA = statOrbitStudents.offsetWidth || slotARect.width;
      const widthB = statOrbitPartners.offsetWidth || slotBRect.width;
      const circlesTop = Math.min(slotARect.top, slotBRect.top);
      const circlesBottom = Math.max(slotARect.top + widthA, slotBRect.top + widthB);

      if (circlesBottom > -40 && circlesTop < window.innerHeight + 40) {
        const angle = ((window.innerHeight * 0.52 - slotARect.top) / 340) * Math.PI;
        const swapT = (1 - Math.cos(angle)) / 2;
        const arcSin = Math.sin(angle);

        if (window.innerWidth >= 1024) {
          const centerAx = slotARect.left + slotARect.width / 2;
          const centerAy = slotARect.top + widthA / 2;
          const centerBx = slotBRect.left + slotBRect.width / 2;
          const centerBy = slotBRect.top + widthB / 2;

          const distX = centerBx - centerAx;
          const distY = centerBy - centerAy;
          const arcY = Math.min(68, Math.abs(distX) * 0.20);

          const ax = swapT * distX;
          const ay = swapT * distY - arcSin * arcY;
          const bx = -swapT * distX;
          const by = -swapT * distY + arcSin * arcY;

          const targetScaleA = widthA > 0 ? Math.max(0.72, widthB / widthA) : 0.78;
          const targetScaleB = widthB > 0 ? Math.min(1.25, widthA / widthB) : 1.2;
          const scaleA = 1 + (targetScaleA - 1) * swapT + arcSin * 0.05;
          const scaleB = 1 + (targetScaleB - 1) * swapT - arcSin * 0.05;

          statOrbitStudents.style.zIndex = arcSin >= 0 ? '25' : '15';
          statOrbitPartners.style.zIndex = arcSin >= 0 ? '15' : '25';
          statOrbitStudents.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) scale(${scaleA.toFixed(3)})`;
          statOrbitPartners.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) scale(${scaleB.toFixed(3)})`;
        } else {
          const arcCos = Math.cos(angle);
          statOrbitStudents.style.zIndex = arcSin >= 0 ? '25' : '15';
          statOrbitPartners.style.zIndex = arcSin >= 0 ? '15' : '25';
          statOrbitStudents.style.transform = `translate3d(${(arcSin * 16).toFixed(1)}px, ${(-arcCos * 10).toFixed(1)}px, 0)`;
          statOrbitPartners.style.transform = `translate3d(${(-arcSin * 16).toFixed(1)}px, ${(arcCos * 10).toFixed(1)}px, 0)`;
        }
      }
    }

    // 7. Parallax scrubbing on cards
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
        img.style.transform = `translate3d(0, ${centerOffset * 0.08}px, 0) scale(1.08)`;
      }
    });
  }

  // A. Initialize Engine: Official Lenis (Swiss agency standard) or Standalone Fallback
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.25, // Swiss velvet glide deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple / Swiss exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15, // Effortless and responsive momentum
      touchMultiplier: 1.5,
      infinite: false
    });

    window.lenis = lenis;
    iszlScroller = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
      onScrollUpdate(e.scroll, e.progress, e.velocity);
    });

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1.4 });
      });
    }

    // Smooth Anchor Navigation Interception
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -70, duration: 1.35 });
        }
      });
    });

  } else {
    // Zero-dependency Fallback
    iszlScroller = new ISZLSmoothScrollEngine({
      ease: 0.082,
      wheelMultiplier: 1.15
    });

    iszlScroller.on('scroll', (data) => {
      onScrollUpdate(data.scroll, data.progress, data.velocity);
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        iszlScroller.scrollTo(0);
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          iszlScroller.scrollTo(targetEl, { offset: -70 });
        }
      });
    });
  }

  // B. ISZL Scroll-Triggered Reveals & Stagger
  const revealElements = document.querySelectorAll('.iszl-reveal');
  const staggerGroups = document.querySelectorAll('.iszl-stagger-group');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Staggered reveal for grid items
  staggerGroups.forEach(group => {
    const items = group.querySelectorAll('.iszl-stagger-item');
    const groupObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('revealed');
            }, index * 90);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    groupObserver.observe(group);
  });

  // C. ISZL Masked Typography Reveals (Swiss Editorial Slide-Up)
  const maskTextElements = document.querySelectorAll('.iszl-mask-text');
  const maskObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  maskTextElements.forEach(el => maskObserver.observe(el));

  // Auto reveal hero masked texts on page entry
  setTimeout(() => {
    document.querySelectorAll('#hero-content .iszl-mask-text').forEach((el, idx) => {
      setTimeout(() => el.classList.add('revealed'), idx * 130);
    });
  }, 2600);
}

/* ============================================================================
   7. PPDB ONLINE MODAL & SIMULATOR ALUR
   ============================================================================ */
function initPPDBModal() {
  const openPPDBBtns = document.querySelectorAll('.btn-open-ppdb-modal');
  const ppdbModal = document.getElementById('ppdb-modal');
  const closePPDBBtn = document.getElementById('btn-close-ppdb-modal');

  openPPDBBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (ppdbModal) {
        ppdbModal.classList.add('active');
        document.body.classList.add('overflow-hidden');
        if (window.lenis) window.lenis.stop();
        else if (iszlScroller?.stop) iszlScroller.stop();
      }
    });
  });

  if (closePPDBBtn && ppdbModal) {
    closePPDBBtn.addEventListener('click', () => {
      ppdbModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      if (window.lenis) window.lenis.start();
      else if (iszlScroller?.start) iszlScroller.start();
    });
  }

  if (ppdbModal) {
    ppdbModal.addEventListener('click', (e) => {
      if (e.target === ppdbModal) {
        ppdbModal.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        if (window.lenis) window.lenis.start();
        else if (iszlScroller?.start) iszlScroller.start();
      }
    });
  }
}

/* ============================================================================
   7.B STRATFORD SIGNATURE: INQUIRE MODAL FORM
   ============================================================================ */
function initInquireModal() {
  const openInquireBtns = document.querySelectorAll('.btn-open-inquire-modal');
  const inquireModal = document.getElementById('inquire-modal');
  const closeInquireBtn = document.getElementById('btn-close-inquire-modal');

  const openModal = () => {
    if (inquireModal) {
      inquireModal.classList.add('active');
      document.body.classList.add('overflow-hidden');
      if (window.lenis) window.lenis.stop();
      else if (iszlScroller?.stop) iszlScroller.stop();
    }
  };

  const closeModal = () => {
    if (inquireModal) {
      inquireModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      if (window.lenis) window.lenis.start();
      else if (iszlScroller?.start) iszlScroller.start();
    }
  };

  openInquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeInquireBtn) {
    closeInquireBtn.addEventListener('click', closeModal);
  }

  if (inquireModal) {
    inquireModal.addEventListener('click', (e) => {
      if (e.target === inquireModal) {
        closeModal();
      }
    });

    const inquireForm = inquireModal.querySelector('form');
    if (inquireForm) {
      inquireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan pertanyaan Anda telah terkirim. Panitia PPDB akan segera menghubungi nomor WhatsApp Anda.');
        closeModal();
      });
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquireModal?.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ============================================================================
   8. FAQ ACCORDION (STRATFORD & BMCHS INQUIRY STYLE)
   ============================================================================ */
function initFAQAccordion() {
  const accordionHeaders = document.querySelectorAll('.faq-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');

      const isOpen = !content.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ============================================================================
   9. MODAL SCROLL ISOLATION & WHEEL PROTECTION
   Ensures inner modal containers scroll freely via mouse wheel, trackpad & touch,
   preventing Lenis or window scroll listeners from hijacking or canceling events.
   ============================================================================ */
function initModalScrollProtection() {
  const scrollableContainers = document.querySelectorAll(
    '.modal-container, #mobile-drawer > div, #search-modal > div'
  );
  const modalOverlays = document.querySelectorAll(
    '.modal-overlay, #mobile-drawer, #search-modal'
  );

  // 1. Isolate scrollable dialog containers
  scrollableContainers.forEach(container => {
    container.setAttribute('data-lenis-prevent', 'true');

    // Stop wheel events from bubbling up to window where Lenis captures them
    container.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });

    // Stop touch gestures from bubbling up to Lenis
    container.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: true });
  });

  // 2. Isolate overlays & route wheel on backdrop directly to internal container
  modalOverlays.forEach(overlay => {
    overlay.setAttribute('data-lenis-prevent', 'true');

    overlay.addEventListener('wheel', (e) => {
      e.stopPropagation();
      if (e.target === overlay) {
        const targetContainer = overlay.querySelector('.modal-container') || overlay.querySelector('.overflow-y-auto');
        if (targetContainer) {
          targetContainer.scrollTop += e.deltaY;
        }
      }
    }, { passive: true });

    overlay.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: true });
  });
}
