export type WeddingSide = 'trai' | 'gai'

export interface TimelineItem {
  time: string
  title: string
  description?: string
}

export interface FamilyInfo {
  title: string
  father: string
  mother: string
}

export interface BankAccount {
  title: string
  accountHolder: string
  bankName: string
  accountNumber: string
  qrImage?: string
}

export interface SwatchColor {
  name: string
  hex: string
}

export interface SideSpecificConfig {
  sideName: string
  invitationTitle: string
  invitationSubtitle: string
  countdownHeader?: string
  partyLabel: string
  // Thứ tự tên cô dâu & chú rể theo từng nhà:
  // Nhà trai: Chú rể trước, Cô dâu sau (Thành & Trang, Xuân Thành & Thu Trang)
  // Nhà gái: Cô dâu trước, Chú rể sau (Trang & Thành, Thu Trang & Xuân Thành)
  heroNames: string
  firstPersonName: string
  secondPersonName: string
  saveTheDateText: string
  firstFamily: FamilyInfo // Gia đình ở cột trước (bên trái)
  secondFamily: FamilyInfo // Gia đình ở cột sau (bên phải)
  timelineTitle?: string
  timeline: TimelineItem[]
  event: {
    date: string // ISO string for countdown: YYYY-MM-DDTHH:mm:ss
    day: string
    month: string
    year: string
    time: string
    formattedDate: string
    lunarDate: string
    venueTitle: string
    venueAddress: string
    mapUrl: string
  }
  banking: BankAccount
  meta: {
    title: string
    description: string
  }
}

export interface SharedWeddingConfig {
  groom: {
    name: string
    shortName: string
    father: string
    mother: string
  }
  bride: {
    name: string
    shortName: string
    father: string
    mother: string
  }
  meta: {
    ogImage: string
    canonicalUrl: string
  }
  music: {
    title: string
    src: string
    fallbackSrc: string
  }
  wishesApi: {
    endpoint: string
    weddingId: string
  }
}

// 1. THÔNG TIN CHUNG (Áp dụng cho cả Nhà trai & Nhà gái)
export const weddingShared: SharedWeddingConfig = {
  groom: {
    name: 'Dương Xuân Thành',
    shortName: 'Xuân Thành',
    father: 'Ông Dương Xuân Thu',
    mother: 'Bà Vũ Thị Loan'
  },
  bride: {
    name: 'Vũ Thu Trang',
    shortName: 'Thu Trang',
    father: 'Ông Vũ Đức Khải',
    mother: 'Bà Hoàng Thị Phương'
  },
  meta: {
    ogImage: 'https://static.ladipage.net/6322a62f2dad980013bb5005/571372648_1401349385330791_7634124945013556421_n-20251031104042-8uzz1.jpg',
    canonicalUrl: 'https://invitations.jmiiwedding.com/doha'
  },
  music: {
    title: 'Ngày Này, Người Con Gái Này',
    src: encodeURI('/audio/Ngày Này, Người Con Gái Này.mp3'),
    fallbackSrc: encodeURI('/audio/Ngày Này, Người Con Gái Này.mp3')
  },
  wishesApi: {
    endpoint: 'https://script.google.com/macros/s/AKfycbxttwY2SD9BgiYW9SqA7GbuMb-QQjCUZjOCFnOgWUml-1Tvi4UdZ-5dThgYYxrgPsHqvQ/exec',
    weddingId: 'thanhtrang'
  }
}

// 2. NỘI DUNG RIÊNG TỪNG NHÀ (Được phân biệt qua param URL ?side=trai hoặc ?side=gai)
export const weddingSides: Record<WeddingSide, SideSpecificConfig> = {
  // ==========================================
  // NHÀ TRAI (?side=trai hoặc không truyền param)
  // ==========================================
  trai: {
    sideName: 'Nhà trai',
    invitationTitle: 'Lễ Thành Hôn',
    invitationSubtitle: 'You’re invited to the wedding of',
    countdownHeader: 'NGÀY TRỌNG ĐẠI SẼ DIỄN RA SAU',
    partyLabel: 'TRÂN TRỌNG MỜI BẠN ĐẾN CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI',
    // Nhà trai: Chú rể trước, Cô dâu sau
    heroNames: 'Thành&nbsp; &amp;Trang',
    firstPersonName: 'Xuân Thành',
    secondPersonName: 'Thu Trang',
    saveTheDateText: '27.12.2026',
    firstFamily: {
      title: 'NHÀ TRAI',
      father: 'Ông Dương Xuân Thu',
      mother: 'Bà Vũ Thị Loan'
    },
    secondFamily: {
      title: 'NHÀ GÁI',
      father: 'Ông Vũ Đức Khải',
      mother: 'Bà Hoàng Thị Phương'
    },
    timelineTitle: 'Lịch trình buổi tiệc',
    timeline: [
      { time: '10:30', title: 'ĐÓN KHÁCH' },
      { time: '11:00', title: 'LỄ THÀNH HÔN' },
      { time: '11:30', title: 'KHAI TIỆC' }
    ],
    event: {
      date: '2026-12-27T10:30:00+07:00',
      day: '27',
      month: 'tháng 12',
      year: 'năm 2026',
      time: '10:30, CHỦ NHẬT',
      formattedDate: 'Chủ Nhật, ngày 27 tháng 12 năm 2026',
      lunarDate: '(19 THÁNG 11 NĂM BÍNH NGỌ)',
      venueTitle: 'SẢNH SAPPHIRE,<br>TRUNG TÂM TIỆC CƯỚI ÂU CƠ',
      venueAddress: 'SỐ 1A, ĐƯỜNG NGUYỄN HỮU CẦU, PHƯỜNG HẢI DƯƠNG, TP. HẢI PHÒNG',
      mapUrl: 'https://maps.app.goo.gl/8nEB8VrL8uGrgUmC6'
    },
    banking: {
      title: 'Chú rể',
      accountHolder: 'Lê Quang Hưng',
      bankName: 'HD Bank',
      accountNumber: '010704070064676',
      qrImage: 'https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/screenshot_1763309137-20251116160544-zqlfc.png'
    },
    meta: {
      title: 'Xuân Thành & Thu Trang',
      description: 'Thiệp cưới điện tử của Xuân Thành & Thu Trang'
    }
  },

  // ==========================================
  // NHÀ GÁI (?side=gai)
  // (Sẵn sàng cập nhật nội dung chi tiết theo yêu cầu sau của bạn)
  // ==========================================
  gai: {
    sideName: 'Nhà gái',
    invitationTitle: 'Lễ Vu Quy',
    invitationSubtitle: 'You’re invited to the wedding of',
    countdownHeader: 'NGÀY TRỌNG ĐẠI SẼ DIỄN RA SAU',
    partyLabel: 'TRÂN TRỌNG MỜI BẠN ĐẾN CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI',
    // Nhà gái: Cô dâu trước, Chú rể sau
    heroNames: 'Trang&nbsp; &amp;Thành',
    firstPersonName: 'Thu Trang',
    secondPersonName: 'Xuân Thành',
    saveTheDateText: '26.12.2026',
    firstFamily: {
      title: 'NHÀ GÁI',
      father: 'Ông Vũ Đức Khải',
      mother: 'Bà Hoàng Thị Phương'
    },
    secondFamily: {
      title: 'NHÀ TRAI',
      father: 'Ông Dương Xuân Thu',
      mother: 'Bà Vũ Thị Loan'
    },
    timelineTitle: 'Lịch trình buổi tiệc',
    timeline: [
      { time: '13:30', title: 'LỄ ĂN HỎI' },
      { time: '15:00', title: 'CHỤP ẢNH LƯU NIỆM' },
      { time: '16:00', title: 'KHAI TIỆC' }
    ],
    event: {
      date: '2026-12-26T16:00:00+07:00',
      day: '26',
      month: 'tháng 12',
      year: 'năm 2026',
      time: '16:00, THỨ BẢY',
      formattedDate: 'Thứ Bảy, ngày 26 tháng 12 năm 2026',
      lunarDate: '(18 THÁNG 11 NĂM BÍNH NGỌ)',
      venueTitle: 'TƯ GIA NHÀ GÁI',
      venueAddress: 'SỐ 4 NGÕ 9, LIỄU TRÀNG, PHƯỜNG TÂN HƯNG, TP HẢI PHÒNG',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=20.90443514932916,106.32111051971562&gidzl=SXneCrG5Psns2syrNnvdRNuAQpT0IMKyDbm_Oq8OCszc3Jaq4naqFc1OEZ5273jcPbrcEZ8G83bkK0veQm'
    },
    banking: {
      title: 'Cô dâu',
      accountHolder: 'Dương Thu Trang',
      bankName: 'Vietcombank',
      accountNumber: '0123456789',
      qrImage: 'https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/screenshot_1763309137-20251116160544-zqlfc.png'
    },
    meta: {
      title: 'Thu Trang & Xuân Thành',
      description: 'Thiệp cưới điện tử của Thu Trang & Xuân Thành'
    }
  }
}

/**
 * Hàm phân tích param URL để xác định Nhà trai hay Nhà gái
 * Hỗ trợ các biến thể param phổ biến:
 * - ?side=trai | ?side=gai
 * - ?side=nhatrai | ?side=nhagai
 * - ?side=groom | ?side=bride
 * - ?nha=trai | ?nha=gai
 * - ?t=trai | ?t=gai
 * Mặc định khi không truyền param: 'trai' (Nhà trai)
 */
export function resolveWeddingSide(rawParam?: unknown): WeddingSide {
  if (!rawParam) return 'trai'
  const val = String(rawParam).toLowerCase().trim()
  const brideKeywords = ['gai', 'nhagai', 'nha_gai', 'nha-gai', 'bride', 'nu']
  return brideKeywords.includes(val) ? 'gai' : 'trai'
}

/**
 * Định dạng dòng chữ lời mời khách ở thiệp trong phong bì (HEADLINE7)
 * Cấu trúc 3 dòng riêng biệt:
 * Dòng 1: Trân trọng kính mời
 * Dòng 2: “Tên khách” (hoặc “Quý khách” khi không có param URL)
 * Dòng 3: Đến dự lễ cưới của
 */
export function formatInvitationLead(guestName?: string, side: WeddingSide = 'trai'): string {
  const raw = guestName ? guestName.trim() : ''
  const clean = raw.replace(/^["“'”«]+|["“'”»]+$/g, '').trim()
  const name = clean
    ? clean.split(/\s+/).map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : '')).join(' ')
    : 'Quý khách'

  return `Trân trọng kính mời<br><span class="guest-name-highlight">${name}</span><br>Đến dự lễ cưới của`
}
