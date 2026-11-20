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
  banking: {
    title: string
    accountHolder: string
    bankName: string
    accountNumber: string
    qrImage?: string
  }
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
    mother: 'Bà Hoàng Thị Phượng'
  },
  meta: {
    ogImage: 'https://static.ladipage.net/6322a62f2dad980013bb5005/571372648_1401349385330791_7634124945013556421_n-20251031104042-8uzz1.jpg',
    canonicalUrl: 'https://invitations.jmiiwedding.com/doha'
  },
  music: {
    title: 'Ngày Đầu Tiên',
    src: '/audio/wedding-song.mp3',
    fallbackSrc: 'https://camcui.vn/bai157.mp3'
  },
  wishesApi: {
    endpoint: 'https://script.google.com/macros/s/AKfycbxMQvp2C4Dz6ntvpPoNHzJl0doaknjNmX86VmeI83E64dJ8M25RVl5-t01aqyuZR7PS/exec',
    weddingId: 'vuquynh1'
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
      mother: 'Bà Hoàng Thị Phượng'
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
      venueTitle: 'SẢNH SAPPHIRE, TRUNG TÂM TIỆC CƯỚI ÂU CƠ',
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
      title: 'Xuân Thành & Thu Trang - Tiệc Mừng Nhà Trai',
      description: 'Thiệp cưới điện tử của Xuân Thành & Thu Trang (Tiệc mừng Nhà trai)'
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
      mother: 'Bà Hoàng Thị Phượng'
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
      title: 'Thu Trang & Xuân Thành - Tiệc Mừng Nhà Gái',
      description: 'Thiệp cưới điện tử của Thu Trang & Xuân Thành (Tiệc mừng Nhà gái)'
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
 * Cấu trúc: "TRÂN TRỌNG KÍNH MỜI ... ĐẾN DỰ LỄ ĂN HỎI CỦA"
 * Chỗ ... sẽ được thay thế bằng tên khách mời lấy từ param URL (?to=, ?guest=, ?name=, ?khach=)
 * Mặc định khi không truyền param: 'QUÝ KHÁCH'
 */
export function formatInvitationLead(guestName?: string): string {
  const name = guestName && guestName.trim() ? guestName.trim() : 'QUÝ KHÁCH'
  return `TRÂN TRỌNG KÍNH MỜI <span class="guest-name-highlight">${name}</span><br>ĐẾN DỰ LỄ ĂN HỎI CỦA`
}
