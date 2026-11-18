export interface SwatchColor {
  name: string
  hex: string
}

export interface TimelineItem {
  time: string
  title: string
  description?: string
  icon?: string
}

export interface BankAccount {
  title: string
  bankName: string
  accountNumber: string
  accountHolder: string
  qrImage: string
}

export interface WeddingConfig {
  meta: {
    title: string
    description: string
    ogImage: string
    canonicalUrl: string
  }
  groom: {
    name: string
    shortName: string
    father: string
    mother: string
    title: string
    sideName: string
  }
  bride: {
    name: string
    shortName: string
    father: string
    mother: string
    title: string
    sideName: string
  }
  event: {
    date: string // ISO string for countdown: YYYY-MM-DDTHH:mm:ss
    formattedDate: string
    lunarDate: string
    time: string
    venueName: string
    venueAddress: string
    mapUrl: string
    saveTheDate: string
  }
  timeline: TimelineItem[]
  dressCode: {
    title: string
    description: string
    colors: SwatchColor[]
  }
  story: {
    quote: string
    content: string
    month: number
    year: number
    highlightDay: number
  }
  gallery: {
    url: string
    caption?: string
  }[]
  banking: BankAccount[]
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

export const weddingConfig: WeddingConfig = {
  meta: {
    title: 'Xuân Thành & Thu Trang - Lễ Thành Hôn',
    description: 'Thiệp cưới điện tử của Xuân Thành & Thu Trang',
    ogImage: 'https://static.ladipage.net/6322a62f2dad980013bb5005/571372648_1401349385330791_7634124945013556421_n-20251031104042-8uzz1.jpg',
    canonicalUrl: 'https://invitations.jmiiwedding.com/doha'
  },
  groom: {
    name: 'Vũ Xuân Thành',
    shortName: 'Xuân Thành',
    father: 'Ông Vũ Đức Khải',
    mother: 'Bà Hoàng Thị Phượng',
    title: 'Chú rể',
    sideName: 'Nhà trai'
  },
  bride: {
    name: 'Dương Thu Trang',
    shortName: 'Thu Trang',
    father: 'Ông Dương Xuân Thu',
    mother: 'Bà Vũ Thị Loan',
    title: 'Cô dâu',
    sideName: 'Nhà gái'
  },
  event: {
    date: '2025-12-21T11:30:00+07:00',
    formattedDate: 'Chủ Nhật, ngày 21 tháng 12 năm 2025',
    lunarDate: '(Tức ngày 2 tháng 11 năm Ất Tỵ)',
    time: '11:30',
    venueName: 'Tư gia nhà trai',
    venueAddress: 'Thôn 16, xã Bảo Lâm 3, tỉnh Lâm Đồng',
    mapUrl: 'https://maps.google.com/?q=Th%C3%B4n+16,+x%C3%A3+B%E1%BA%A3o+L%C3%A2m+3,+t%E1%BB%89nh+L%C3%A2m+%C4%90%E1%BB%93ng',
    saveTheDate: '26.12.2025'
  },
  timeline: [
    {
      time: '11:30',
      title: 'Đón khách',
      description: 'Chụp hình kỷ niệm & đón chào người thương',
      icon: 'camera'
    },
    {
      time: '12:00',
      title: 'Khai tiệc',
      description: 'Nghi thức thành hôn & nhập tiệc chung vui',
      icon: 'utensils'
    },
    {
      time: '13:00',
      title: 'After party',
      description: 'Âm nhạc, giao lưu & chia sẻ niềm vui',
      icon: 'sparkles'
    }
  ],
  dressCode: {
    title: 'Dress code',
    description: 'Để những bức ảnh kỷ niệm thêm phần hài hòa, trân trọng mời quý khách mặc theo tone màu:',
    colors: [
      { name: 'Nude / Be nhạt', hex: '#EAE1D7' },
      { name: 'Nâu cát ấm', hex: '#BA9F84' },
      { name: 'Nâu đồng trầm', hex: '#705628' }
    ]
  },
  story: {
    quote: 'This day, our hearts become one',
    content: 'Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử thách để cùng nhau bước đến ngày trọng đại – đám cưới của chúng mình. Hôm nay là ngày chúng mình cùng nắm tay bước vào hành trình mới, hành trình của yêu thương và sẻ chia.',
    month: 12,
    year: 2025,
    highlightDay: 21
  },
  gallery: [
    { url: 'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/571277216_1401349858664077_4926377004531498903_n-20251030040733-2xnh6.jpg', caption: 'Sweet Moments' },
    { url: 'https://w.ladicdn.com/s750x650/6322a62f2dad980013bb5005/572524211_1401350018664061_6624378457772842585_n-20251030041304-s8aeq.jpg', caption: 'Together Forever' },
    { url: 'https://w.ladicdn.com/s400x450/6322a62f2dad980013bb5005/571777292_1401349608664102_6343894689797935376_n-20251030041113-1ztpv.jpg', caption: 'Love In The Air' },
    { url: 'https://w.ladicdn.com/s550x550/6322a62f2dad980013bb5005/571765088_1401349365330793_1662366587190655600_n-1-20251030042127-nm_mv.jpg', caption: 'Smile & Happiness' },
    { url: 'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/573515766_1401349518664111_5588135098780626000_n-20251031103549-zdinw.jpg', caption: 'Pure Emotion' },
    { url: 'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/571085293_1401349451997451_4525686150093079759_n-20251031103549-ckb3c.jpg', caption: 'Unforgettable Day' },
    { url: 'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/572065120_1401349761997420_1500589351470969014_n-20251031103549-lhl_g.jpg', caption: 'Golden Hour' }
  ],
  banking: [
    {
      title: 'Hộp mừng Chú rể',
      bankName: 'HD Bank',
      accountNumber: '010704070064676',
      accountHolder: 'LÊ QUANG HƯNG',
      qrImage: 'https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/screenshot_1763309137-20251116160544-zqlfc.png'
    }
  ],
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
