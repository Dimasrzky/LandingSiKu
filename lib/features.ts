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
        heading: 'Tagihan Otomatis Setiap Bulan',
        body: 'Tidak perlu input manual. Sistem generate tagihan SPP untuk seluruh siswa secara otomatis setiap bulan berdasarkan data kelas dan jenjang masing-masing.',
      },
      {
        heading: 'Berbagai Jenis Biaya dalam Satu Tempat',
        body: 'Kelola SPP bulanan, uang gedung, biaya ekskul, seragam, dan biaya lainnya dalam satu dasbor. Tidak perlu spreadsheet terpisah untuk setiap jenis biaya.',
      },
      {
        heading: 'Cicilan & Diskon Fleksibel',
        body: 'Atur kebijakan cicilan dan diskon khusus untuk siswa tertentu tanpa harus mengubah tagihan secara global. Sistem mencatat dan memantau sisa cicilan secara otomatis.',
      },
      {
        heading: 'Riwayat Pembayaran Lengkap',
        body: 'Setiap transaksi tercatat lengkap dengan timestamp, metode pembayaran, dan petugas yang memproses. Audit trail tersedia kapan saja.',
      },
      {
        heading: 'Mengatur Beasiswa/Potongan',
        body: 'Tetapkan beasiswa atau potongan biaya untuk siswa tertentu dengan pengurangan otomatis pada tagihan bulanan. Kelola jenis, besaran, dan periode beasiswa maupun potongan langsung dari dasbor tanpa perlu penyesuaian manual setiap bulan.',
      },
    ],
  },
  {
    slug: 'notifikasi-whatsapp',
    title: 'Notifikasi WhatsApp Otomatis',
    shortTitle: 'Notifikasi WhatsApp',
    desc: 'Sistem kirim pesan WA otomatis ke orang tua — tagihan, konfirmasi bayar, hingga pengingat tunggakan.',
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
    items: ['Reminder H-3, H-1 jatuh tempo', 'Konfirmasi pembayaran instan', 'Laporan bulanan ke orang tua'],
    details: [
      {
        heading: 'Pengingat Jatuh Tempo Otomatis',
        body: 'Sistem secara otomatis mengirim pesan WhatsApp kepada orang tua H-3 dan H-1 sebelum jatuh tempo tagihan. Tidak ada lagi tunggakan yang terlewat karena orang tua lupa.',
      },
      {
        heading: 'Konfirmasi Pembayaran Real-time',
        body: 'Setiap kali pembayaran masuk dan terverifikasi, orang tua langsung mendapat notifikasi WhatsApp berisi detail transaksi. Tidak perlu konfirmasi manual dari bendahara.',
      },
      {
        heading: 'Laporan Bulanan ke Orang Tua',
        body: 'Kirim ringkasan status keuangan bulanan ke seluruh orang tua hanya dengan satu klik. Orang tua dapat memantau tagihan dan riwayat pembayaran anak mereka.',
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
        heading: 'Virtual Account Semua Bank',
        body: 'Orang tua dapat membayar melalui transfer bank apa pun menggunakan nomor Virtual Account unik per siswa. Pembayaran terverifikasi otomatis tanpa konfirmasi manual.',
      },
      {
        heading: 'Rekonsiliasi Otomatis Harian',
        body: 'Setiap hari sistem mencocokkan dana masuk dengan tagihan secara otomatis. Bendahara tidak perlu lagi cross-check mutasi rekening secara manual.',
      },
    ],
  },
  {
    slug: 'laporan-dashboard',
    title: 'Laporan & Dashboard Real-time',
    shortTitle: 'Laporan & Dashboard',
    desc: 'Kepala sekolah dan yayasan pantau kondisi keuangan kapan saja. Ekspor ke Excel/PDF sekali klik.',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    items: ['Dashboard tunggakan & pelunasan', 'Laporan per jenjang & kelas', 'Ekspor Excel & PDF'],
    details: [
      {
        heading: 'Dashboard Kondisi Keuangan Real-time',
        body: 'Kepala sekolah dan pengurus yayasan dapat memantau total tagihan, pelunasan, dan tunggakan secara langsung tanpa harus menunggu laporan bulanan dari bendahara.',
      },
      {
        heading: 'Laporan Terperinci per Jenjang & Kelas',
        body: 'Saring laporan berdasarkan jenjang pendidikan, kelas, atau periode tertentu. Temukan dengan cepat kelas mana yang memiliki tunggakan terbanyak.',
      },
      {
        heading: 'Ekspor Excel & PDF Satu Klik',
        body: 'Unduh laporan keuangan dalam format Excel atau PDF kapan pun dibutuhkan untuk keperluan rapat, audit, atau pengarsipan. Format sudah siap cetak.',
      },
    ],
  },
  {
    slug: 'multi-jenjang',
    title: 'Multi-Jenjang & Multi-Sekolah',
    shortTitle: 'Multi-Jenjang',
    desc: 'Satu akun yayasan untuk mengelola TK, SD, SMP, dan SMA sekaligus. Laporan konsolidasi yayasan tersedia.',
    iconBg: '#FFF1F2',
    iconColor: '#BE123C',
    items: ['TK/PAUD · SD · SMP · SMA', 'Laporan konsolidasi yayasan', 'Pengaturan biaya per jenjang'],
    details: [
      {
        heading: 'Satu Platform, Semua Jenjang',
        body: 'Kelola keuangan TK, SD, SMP, SMA, dan SMK dalam satu akun yayasan. Setiap jenjang memiliki pengaturan biaya, tarif, dan laporan tersendiri.',
      },
      {
        heading: 'Laporan Konsolidasi Yayasan',
        body: 'Lihat gambaran besar keuangan seluruh unit sekolah dalam satu layar. Bandingkan performa tiap unit dan pantau kesehatan keuangan yayasan secara keseluruhan.',
      },
      {
        heading: 'Pengaturan Biaya Independen per Jenjang',
        body: 'Setiap jenjang dapat memiliki tarif SPP, kebijakan cicilan, dan jenis tagihan yang berbeda. Fleksibel sesuai kebutuhan operasional masing-masing unit.',
      },
    ],
  },
  {
    slug: 'manajemen-siswa',
    title: 'Manajemen Siswa & Kelas',
    shortTitle: 'Manajemen Siswa',
    desc: 'Data master siswa terintegrasi dengan sistem keuangan. Import data siswa dari Excel dengan mudah.',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    items: ['Import data siswa via Excel', 'Naik kelas & pindah sekolah', 'Riwayat keuangan per siswa'],
    details: [
      {
        heading: 'Import Data Siswa dari Excel',
        body: 'Tidak perlu input ulang data siswa yang sudah ada. Upload file Excel yang sudah Anda miliki dan sistem akan otomatis mengimpor seluruh data siswa beserta informasi kelas mereka.',
      },
      {
        heading: 'Proses Naik Kelas & Mutasi Mudah',
        body: 'Proses kenaikan kelas massal di akhir tahun ajaran hanya perlu beberapa klik. Data siswa yang pindah sekolah juga dapat diarsipkan dengan riwayat keuangan lengkap.',
      },
      {
        heading: 'Riwayat Keuangan Per Siswa',
        body: 'Lihat seluruh riwayat tagihan dan pembayaran setiap siswa dari pertama kali masuk hingga lulus. Berguna untuk keperluan sertifikasi, beasiswa, atau rekap akhir tahun.',
      },
    ],
  },
]

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}
