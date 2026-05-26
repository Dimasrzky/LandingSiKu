export type Feature = {
  slug: string
  title: string
  shortTitle: string
  desc: string
  iconBg: string
  iconColor: string
  badge?: string
  items: string[]
  details: {
    heading: string
    body: string
    footerInfo?: string
    icon?: string
    variant?: 'side-icon'
  }[]
}

export const features: Feature[] = [
  {
    slug: 'manajemen-tagihan',
    title: 'Manajemen Tagihan',
    shortTitle: 'Manajemen Tagihan',
    desc: 'Generate tagihan otomatis setiap bulan untuk seluruh siswa. Kelola berbagai jenis biaya dalam satu sistem.',
    iconBg: '#EFF6FF',
    iconColor: '#1D4ED8',
    badge: 'UNGGULAN',
    items: ['SPP, uang gedung, ekskul, dll.', 'Tagihan per kelas/jenjang/yayasan', 'Cicilan & diskon otomatis', 'Riwayat pembayaran lengkap', 'Mengatur beasiswa'],
    details: [
      {
        heading: 'Tagihan Otomatis\nSetiap Bulan',
        body: 'Tidak perlu input manual. Sistem generate tagihan SPP untuk seluruh siswa secara otomatis setiap bulan berdasarkan data kelas dan jenjang masing-masing.',
        footerInfo: 'Hemat waktu rekap bulanan',
        icon: 'IconBanner',
      },
      {
        heading: 'Berbagai Jenis Biaya \ndalam Satu Tempat',
        body: 'Kelola SPP bulanan, uang gedung, biaya ekskul, seragam, dan biaya lainnya dalam satu dasbor. Tidak perlu spreadsheet terpisah untuk setiap jenis biaya.',
        footerInfo: 'Terpusat & terorganisir',
        icon: 'IconTab',
      },
      {
        heading: 'Cicilan & Diskon \nFleksibel',
        body: 'Atur kebijakan cicilan dan diskon khusus untuk siswa tertentu tanpa harus mengubah tagihan secara global. Sistem mencatat dan memantau sisa cicilan secara otomatis.',
        footerInfo: 'Fleksibel per siswa',
        icon: 'SlidersHorizontal',
      },
      {
        heading: 'Riwayat \nPembayaran',
        body: 'Setiap transaksi tercatat lengkap dengan timestamp, metode pembayaran, dan petugas yang memproses. Audit trail tersedia kapan saja.',
        footerInfo: 'Siap audit kapan saja',
        icon: 'IconReverb',
      },
      {
        heading: 'Mengatur Beasiswa/Potongan',
        body: 'Tetapkan beasiswa atau potongan biaya untuk siswa tertentu dengan pengurangan otomatis pada tagihan bulanan. Kelola jenis, besaran, dan periode beasiswa maupun potongan langsung dari dasbor tanpa perlu penyesuaian manual setiap bulan.',
        footerInfo: 'Tanpa penyesuaian manual setiap bulan',
        icon: 'IconSettingWhite',
        variant: 'side-icon',
      },
    ],
  },
  {
    slug: 'notifikasi-whatsapp',
    title: 'Notifikasi WhatsApp Otomatis',
    shortTitle: 'Notifikasi WhatsApp',
    desc: 'Sistem kirim pesan WA otomatis ke orang tua — tagihan, konfirmasi \nbayar, hingga pengingat tunggakan.',
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
    items: ['Reminder H-3, H-1 jatuh tempo', 'Konfirmasi pembayaran instan', 'Laporan bulanan ke orang tua'],
    details: [
      {
        heading: 'Pengingat Jatuh Tempo Otomatis',
        body: 'Sistem secara otomatis mengirim pesan WhatsApp kepada orang tua H-3 dan H-1 sebelum jatuh tempo tagihan. Tidak ada lagi tunggakan yang terlewat karena orang tua lupa.',
        footerInfo: 'Nol tunggakan terlewat',
        icon: 'IconDate',
      },
      {
        heading: 'Konfirmasi Pembayaran \nReal-time',
        body: 'Setiap kali pembayaran masuk dan terverifikasi, orang tua langsung mendapat notifikasi WhatsApp berisi detail transaksi. Tidak perlu konfirmasi manual dari bendahara.',
        footerInfo: 'Instan tanpa manual',
        icon: 'IconLoading',
      },
      {
        heading: 'Laporan Bulanan \nke Orang Tua',
        body: 'Kirim ringkasan status keuangan bulanan ke seluruh orang tua hanya dengan satu klik. Orang tua dapat memantau tagihan dan riwayat pembayaran anak mereka.',
        footerInfo: 'Transparan ke orang tua  ',
        icon: 'IconDocument',
      },
    ],
  },
  {
    slug: 'pembayaran-digital',
    title: 'Integrasi Pembayaran Digital',
    shortTitle: 'Pembayaran Digital',
    desc: 'Orang tua bayar via transfer bank. Dana otomatis terverifikasi di sistem.',
    iconBg: '#FFF7ED',
    iconColor: '#C2410C',
    items: ['Virtual Account semua bank', 'Rekonsiliasi otomatis harian'],
    details: [
      {
        heading: 'Virtual Account \nSemua Bank',
        body: 'Orang tua dapat membayar melalui transfer bank apa pun menggunakan nomor Virtual Account unik per siswa. Pembayaran terverifikasi otomatis tanpa konfirmasi manual.',
        footerInfo: 'Bayar dari bank mana saja',
        icon: 'IconBank',
      },
      {
        heading: 'Rekonsiliasi Otomatis \nHarian',
        body: 'Setiap hari sistem mencocokkan dana masuk dengan tagihan secara otomatis. Bendahara tidak perlu lagi cross-check mutasi rekening secara manual.',
        footerInfo: 'Hemat waktu bendahara',
        icon: 'IconData',
      },
    ],
  },
  {
    slug: 'laporan-dashboard',
    title: 'Laporan & Dashboard Real-time',
    shortTitle: 'Laporan & Dashboard',
    desc: 'Kepala sekolah dan yayasan pantau kondisi keuangan kapan saja. \nEkspor ke Excel/PDF sekali klik.',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    items: ['Dashboard tunggakan & pelunasan', 'Laporan per jenjang & kelas', 'Ekspor Excel & PDF'],
    details: [
      {
        heading: 'Dashboard Kondisi \nKeuangan Real-time',
        body: 'Kepala sekolah dan pengurus yayasan dapat memantau total tagihan, pelunasan, dan tunggakan secara langsung tanpa harus menunggu laporan bulanan dari bendahara.',
        footerInfo: 'Pantau kapan saja',
        icon: 'IconDashboard',
      },
      {
        heading: 'Laporan Terperinci \nper Jenjang & Kelas',
        body: 'Saring laporan berdasarkan jenjang pendidikan, kelas, atau periode tertentu. Temukan dengan cepat kelas mana yang memiliki tunggakan terbanyak.',
        footerInfo: 'Filter sesuai kebutuhan',
        icon: 'IconRinci',
      },
      {
        heading: 'Ekspor Excel & PDF \nSatu Klik',
        body: 'Unduh laporan keuangan dalam format Excel atau PDF kapan pun dibutuhkan untuk keperluan rapat, audit, atau pengarsipan. Format sudah siap cetak.',
        footerInfo: 'Siap cetak & arsip',
        icon: 'IconPDF',
      },
    ],
  },
  {
    slug: 'multi-jenjang',
    title: 'Multi-Jenjang & Multi-Sekolah',
    shortTitle: 'Multi-Jenjang',
    desc: 'Satu akun yayasan untuk mengelola TK, SD, SMP, dan SMA sekaligus. \nLaporan konsolidasi yayasan tersedia.',
    iconBg: '#FFF1F2',
    iconColor: '#BE123C',
    items: ['TK/PAUD · SD · SMP · SMA', 'Laporan konsolidasi yayasan', 'Pengaturan biaya per jenjang'],
    details: [
      {
        heading: 'Satu Platform, \nSemua Jenjang',
        body: 'Kelola keuangan TK, SD, SMP, SMA, dan SMK dalam satu akun yayasan. Setiap jenjang memiliki pengaturan biaya, tarif, dan laporan tersendiri.',
        footerInfo: 'Satu login untuk semua',
        icon: 'IconAllinOne',
      },
      {
        heading: 'Laporan Konsolidasi \nYayasan',
        body: 'Lihat gambaran besar keuangan seluruh unit sekolah dalam satu layar. Bandingkan performa tiap unit dan pantau kesehatan keuangan yayasan secara keseluruhan.',
        footerInfo: 'Gambaran besar sekaligus',
        icon: 'IconList',
      },
      {
        heading: 'Pengaturan Biaya \nIndependen per Jenjang',
        body: 'Setiap jenjang dapat memiliki tarif SPP, kebijakan cicilan, dan jenis tagihan yang berbeda. Fleksibel sesuai kebutuhan operasional masing-masing unit.',
        footerInfo: 'Fleksibel per unit sekolah',
        icon: 'IconSetting',
      },
    ],
  },
  {
    slug: 'manajemen-siswa',
    title: 'Manajemen Siswa & Kelas',
    shortTitle: 'Manajemen Siswa',
    desc: 'Data master siswa terintegrasi dengan sistem keuangan. \nImport data siswa dari Excel dengan mudah.',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    items: ['Import data siswa via Excel', 'Naik kelas & pindah sekolah', 'Riwayat keuangan per siswa'],
    details: [
      {
        heading: 'Import Data Siswa \ndari Excel',
        body: 'Tidak perlu input ulang data siswa yang sudah ada. Upload file Excel yang sudah Anda miliki dan sistem akan otomatis mengimpor seluruh data siswa beserta informasi kelas mereka.',
        footerInfo: 'Migrasi data mudah',
        icon: 'IconSave',
      },
      {
        heading: 'Proses Naik Kelas & Mutasi Mudah',
        body: 'Proses kenaikan kelas massal di akhir tahun ajaran hanya perlu beberapa klik. Data siswa yang pindah sekolah juga dapat diarsipkan dengan riwayat keuangan lengkap.',
        footerInfo: 'Efisien di akhir tahun ajaran',
        icon: 'IconUp',
      },
      {
        heading: 'Riwayat Keuangan \nPer Siswa',
        body: 'Lihat seluruh riwayat tagihan dan pembayaran setiap siswa dari pertama kali masuk hingga lulus. Berguna untuk keperluan sertifikasi, beasiswa, atau rekap akhir tahun.',
        footerInfo: 'Rekam jejak lengkap',
        icon: 'IconHistory',
      },
    ],
  },
]

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}
