export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideCallout {
  type: 'warning' | 'tip' | 'info';
  title: string;
  text: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  table?: GuideTable;
  callout?: GuideCallout;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'an-toan-gas' | 'xu-ly-su-co' | 'kinh-nghiem-mua-gas';
  categoryLabel: string;
  badgeColor: string;
  heroIcon: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorRole: string;
  excerpt: string;
  tldr: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedProductSlugs: string[];
  relatedDistrictSlugs: string[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: 'cach-kiem-tra-binh-gas-chinh-hang-du-ky',
    title: 'Bí Quyết Kiểm Tra Bình Gas 12kg Chính Hãng, Đủ Ký Cho Gian Bếp Gia Đình (Cẩm Nang 2026)',
    metaTitle: 'Cách Kiểm Tra Bình Gas 12kg Chính Hãng & Đủ Ký – Gas Nhà Mình',
    metaDescription: 'Cẩm nang dành cho người nội trợ: 5 bước nhận biết bình gas 12kg chính hãng, cách cộng trọng lượng vỏ bình (W + 12kg), kiểm tra màng co chống giả và hạn kiểm định.',
    category: 'kinh-nghiem-mua-gas',
    categoryLabel: 'Mẹo Hay Nội Trợ',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    heroIcon: '🛡️',
    readingTime: '6 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Tổ Kỹ Thuật Chăm Sóc Gian Bếp – Gas Nhà Mình',
    authorRole: 'Chuyên viên Kiểm định An toàn Bếp Gia Đình TP.HCM',
    excerpt: 'Mỗi lần gọi đổi gas, làm sao người nội trợ biết chắc bình gas 12kg mang vào bếp nhà mình có đủ 12kg nước gas tinh khiết và vỏ bình an toàn? Lưu ngay 5 bước kiểm tra cực dễ chỉ trong 1 phút.',
    tldr: [
      'Cách tính trọng lượng chuẩn của bình gas 12kg đầy: Lấy số ký vỏ bình dập trên quai xách (ký hiệu W hoặc TW, thường từ 12.8kg – 14.5kg) cộng thêm 12kg nước gas = Tổng nặng từ 24.8kg – 26.5kg.',
      'Kiểm tra niêm phong trước khi lắp: Bình chính hãng tại Gas Nhà Mình luôn còn nguyên màng co nhiệt bọc kín cổ van kèm tem chống giả QR Code của nhà máy.',
      'Chữ dập nổi trên vai bình thép (PETROLIMEX, V-GAS, TUẤN KHANG...) phải khớp với nhãn hiệu in trên thân bình, không có vết mài xóa hàn đè.',
      'Kỹ thuật viên Gas Nhà Mình luôn thử kín cổ van và dây dẫn bằng bọt xà phòng chuyên dụng, bật thử bếp lên lửa xanh đều rồi mới bàn giao.',
    ],
    sections: [
      {
        id: 'cong-thuc-kiem-tra-trong-luong',
        heading: '1. Cách đọc số ký vỏ bình (W / TW) trên quai xách để biết bình gas 12kg có đủ ký không',
        paragraphs: [
          'Nhiều cô chú và chị em nội trợ thường thắc mắc vì sao gọi là "bình gas 12kg" nhưng khi nhấc thử lại nặng hơn 25kg. Thực chất, 12kg là trọng lượng phần nước gas hóa lỏng (LPG) được nạp vào bên trong, còn phần vỏ thép bên ngoài nặng khoảng 13kg – 14.5kg tùy hãng.',
          'Để minh bạch tuyệt đối, nhà máy sản xuất vỏ bình luôn dập chìm con số Trọng lượng vỏ rỗng (ký hiệu chữ W hoặc TW) ngay trên tai xách của bình gas. Khi nhận bình mới tại nhà, gia đình mình chỉ cần đối chiếu theo bảng sau:',
        ],
        table: {
          caption: 'Bảng đối chiếu trọng lượng vỏ và tổng số ký bình gas 12kg đầy cho hộ gia đình',
          headers: ['Loại bình gas gia đình', 'Số ký vỏ bình dập trên quai (W)', 'Trọng lượng nước gas', 'Tổng cân nặng cả vỏ và ruột'],
          rows: [
            ['Bình V-Gas Xám / Đỏ / Vàng 12kg', '13.0 kg – 14.2 kg', '12.0 kg (±0.15kg)', '25.0 kg – 26.2 kg'],
            ['Bình V-Gas Bọc Nhựa PE 12kg', '13.5 kg – 14.8 kg', '12.0 kg (±0.15kg)', '25.5 kg – 26.8 kg'],
            ['Bình Petrolimex Đứng / Shell 12kg', '12.8 kg – 13.8 kg', '12.0 kg (±0.15kg)', '24.8 kg – 25.8 kg'],
            ['Bình Tuấn Khang Vàng / Xanh 12kg', '13.0 kg – 14.0 kg', '12.0 kg (±0.15kg)', '25.0 kg – 26.0 kg'],
            ['Bình Gas Bò 45kg (Quán ăn / Nhà hàng)', '35.0 kg – 38.5 kg', '45.0 kg (±0.4kg)', '80.0 kg – 83.5 kg'],
          ],
        },
        callout: {
          type: 'tip',
          title: 'Mẹo nhỏ kiểm tra bình cũ đã hết sạch gas chưa:',
          text: 'Khi bếp vừa tắt lửa hết gas, nếu nhà mình có sẵn chiếc cân sức khỏe, hãy thử đặt vỏ bình rỗng lên cân: nếu số cân hiển thị đúng bằng số W dập trên quai bình (ví dụ 13.4kg) nghĩa là bình gas cũ đã cháy cạn 100%, không bị đọng nước hay gas tạp chất dưới đáy.',
        },
      },
      {
        id: 'kiem-tra-mang-co-va-tem-chong-gia',
        heading: '2. Quan sát màng co niêm phong cổ van và Tem QR chống hàng giả',
        paragraphs: [
          'Một bình gas chính hãng xuất từ trạm chiết nạp chuẩn PCCC luôn có 2 lớp bảo vệ niêm phong ở đầu van bình. Trước khi nhân viên tháo lắp vào bếp, bạn hãy nhìn nhanh 3 điểm này:',
        ],
        bullets: [
          {
            label: 'Màng co nhiệt in logo sắc nét:',
            text: 'Lớp màng nhựa bọc quanh cổ van phải căng phẳng, chữ in rõ ràng và có đường chấm răng cưa để xé. Các cơ sở sang chiết lậu thường dùng màng nilon mỏng khò thủ công nên bị nhăn và rất dễ tuột.',
          },
          {
            label: 'Tem chống giả QR Code dán niêm phong:',
            text: 'Trên đỉnh van luôn có tem vỡ chống giả của hãng (Petrolimex, V-Gas, Tuấn Khang...). Bạn có thể mở ứng dụng Zalo quét mã QR trên tem để kiểm tra thông tin nhà máy chiết nạp.',
          },
          {
            label: 'Bóc tem trực tiếp tại gian bếp:',
            text: 'Nhân viên của Gas Nhà Mình luôn giữ nguyên màng co khi mang bình vào nhà, chỉ khi khách hàng đồng kiểm xong mới xé niêm phong để lắp van điều áp.',
          },
        ],
      },
      {
        id: 'kiem-tra-vo-binh-va-han-dang-kiem',
        heading: '3. Kiểm tra tình trạng vỏ bình và hạn kiểm định an toàn trên tai xách',
        paragraphs: [
          'Vỏ bình gas là thiết bị chịu áp lực cao đặt ngay trong bếp ăn hàng ngày của gia đình. Vì vậy, ngoài việc đủ ký, vỏ bình bắt buộc phải đạt chuẩn an toàn vật lý:',
        ],
        bullets: [
          {
            label: 'Chữ dập nổi trên vai bình rõ ràng:',
            text: 'Tên hãng gas dập nổi trên vai thép phải trùng khớp với tên thương hiệu sơn trên thân bình. Không nhận các bình có dấu hiệu bị mài xước chữ nổi hoặc hàn đè tai xách.',
          },
          {
            label: 'Chân đế bình gas cứng cáp, không mục rỉ:',
            text: 'Lớp sơn tĩnh điện sáng màu, phần chân đế tiếp xúc với sàn bếp không bị mục nát hay ăn mòn sâu.',
          },
          {
            label: 'Còn hạn kiểm định định kỳ 5 năm:',
            text: 'Trên quai bình luôn dập rõ tháng/năm tái kiểm định (ví dụ: 2028, 2029). Toàn bộ bình gas từ hệ thống Gas Nhà Mình đều được kiểm tra hạn đăng kiểm nghiêm ngặt trước khi giao tới tay khách hàng.',
          },
        ],
        callout: {
          type: 'warning',
          title: 'Gợi ý cho căn hộ và nhà bếp lát gạch sáng màu:',
          text: 'Nếu sàn bếp nhà mình lát gạch men trắng hoặc sàn gỗ sợ bị vết ố rỉ sét từ đáy bình thép, bạn có thể chọn dòng Bình V-Gas-PE 12kg (vỏ bọc nhựa Polyethylene cao cấp) giúp sạch nền bếp tuyệt đối và cách điện an toàn.',
        },
      },
      {
        id: 'quy-trinh-cham-soc-gian-bep-gas-nha-minh',
        heading: '4. Quy trình 5 bước lắp đặt & chăm sóc gian bếp miễn phí của Gas Nhà Mình',
        paragraphs: [
          'Với phương châm "Hết gas, gọi Nhà Mình – Chăm sóc kỹ như người nhà", mỗi lần giao bình gas mới qua Hotline 0888 113 831, kỹ thuật viên luôn thực hiện trọn vẹn 5 bước an toàn:',
        ],
        bullets: [
          {
            label: 'Bước 1 – Mời gia chủ kiểm tra nguyên tem màng co:',
            text: 'Xác nhận đúng thương hiệu bình đã đặt và nguyên vẹn tem chống giả nhà máy.',
          },
          {
            label: 'Bước 2 – Thay mới gioăng cao su (O-ring) cổ van nếu bị chai cứng:',
            text: 'Kiểm tra vòng đệm cao su bên trong cổ bình gas và thay mới hoàn toàn miễn phí nếu phát hiện dấu hiệu lão hóa.',
          },
          {
            label: 'Bước 3 – Quét bọt xà phòng thử kín 100% các khớp nối:',
            text: 'Thử kín tại cổ van bình, hai đầu kẹp cổ dê và toàn bộ chiều dài dây dẫn gas để đảm bảo không rò rỉ dù là nhỏ nhất.',
          },
          {
            label: 'Bước 4 – Vệ sinh sơ bộ họng bếp & chỉnh lửa xanh:',
            text: 'Bật thử cả 2 lò nấu, chỉnh lại thanh gạt gió dưới bụng bếp nếu ngọn lửa bị đỏ hoặc phựt lửa.',
          },
          {
            label: 'Bước 5 – Bàn giao và lưu số bảo hành 24/7:',
            text: 'Hướng dẫn người lớn tuổi trong nhà cách khóa van an toàn và dán lịch nhắc bảo dưỡng định kỳ.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Nhà mình đang dùng vỏ bình hãng khác muốn đổi sang bình của Gas Nhà Mình có tốn phí đổi vỏ không?',
        answer: 'Hoàn toàn KHÔNG tốn phí! Gas Nhà Mình hỗ trợ đổi ngang miễn phí 100% giữa tất cả các loại vỏ bình gas 12kg chính hãng thông dụng trên thị trường (V-Gas, Petrolimex, Saigon Petro, Tuấn Khang, Gia Đình Gas...) còn trong hạn kiểm định.',
      },
      {
        question: 'Tổng trọng lượng bình gas 12kg cả vỏ và ruột là bao nhiêu ký?',
        answer: 'Tùy theo độ dày vỏ thép của từng hãng (dập trên quai bình từ 12.8kg đến 14.5kg), khi cộng thêm 12kg nước gas bên trong thì tổng trọng lượng bình đầy sẽ nặng từ 24.8kg đến 26.5kg.',
      },
      {
        question: 'Kỹ thuật viên Gas Nhà Mình kiểm tra van dây và chỉnh bếp có tính thêm tiền công không?',
        answer: 'Dịch vụ kiểm tra rò rỉ gas, thay gioăng cao su cổ bình, vệ sinh mâm lửa và chỉnh gió bếp gas là hoàn toàn MIỄN PHÍ dành cho mọi khách hàng gọi gas tại hệ thống Gas Nhà Mình.',
      },
      {
        question: 'Làm sao để đặt bình gas chính hãng nhanh nhất khi đang nấu dở bữa cơm?',
        answer: 'Bạn chỉ cần bấm gọi trực tiếp Hotline 0888 113 831 hoặc nhắn Zalo, trạm kho Gas Nhà Mình gần nhất sẽ giao bình mới tới tận gian bếp chỉ trong 15 – 20 phút.',
      },
    ],
    relatedProductSlugs: [
      'gas-v-gas-xam-12kg',
      'gas-petrolimex-dung-12kg',
      'gas-v-gas-pe-12kg',
      'gas-tuan-khang-vang-12kg',
    ],
    relatedDistrictSlugs: ['quan-8', 'tan-phu', 'quan-6', 'hoc-mon', 'binh-tan', 'quan-7'],
  },
  {
    slug: 'canh-bao-chieu-tro-dan-decal-so-dien-thoai-gas-gia-mao-tphcm',
    title: 'Cảnh Báo Chiêu Trò Dán Tờ Rơi Số Điện Thoại Gas Lạ Vào Nhà Dân TP.HCM & Cách Bảo Vệ Gia Đình',
    metaTitle: 'Cảnh Báo Tờ Rơi Số Điện Thoại Gas Giả Mạo Tại TP.HCM – Gas Nhà Mình',
    metaDescription: 'Cảnh giác thủ đoạn dán đè decal số điện thoại gọi gas lạ lên cửa sắt, giả danh nhân viên kiểm tra bếp để tráo vỏ bình giả, cân thiếu ký và chặt chém tiền van dây.',
    category: 'an-toan-gas',
    categoryLabel: 'Cảnh Giác Cho Gia Đình',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    heroIcon: '🚨',
    readingTime: '5 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Ban Bảo Vệ Khách Hàng – Gas Nhà Mình',
    authorRole: 'Hệ thống Phân phối Gas Chính Hãng Tận Nhà TP.HCM',
    excerpt: 'Rất nhiều gia đình có ông bà lớn tuổi ở nhà một mình đã bị các đối tượng giả danh "nhân viên kiểm tra an toàn gas" lừa vào bếp, dán đè số điện thoại lạ và ép thay van dây kém chất lượng giá gần cả triệu đồng.',
    tldr: [
      'Chiêu trò phổ biến: Kẻ xấu đi dọc các con hẻm dán tờ rơi/decal số điện thoại lạ đè lên cửa sắt hoặc giả danh "nhân viên công ty gas đi kiểm tra định kỳ" để lẻn vào bếp dán đè tem lên thân bình gas.',
      'Nguy cơ khi gọi nhầm số decal lạ: Nhận phải bình gas sang chiết lậu thiếu 2–3kg, bị tráo mất vỏ bình Petrolimex/V-Gas xịn lấy vỏ cũ rỉ sét, và bị vẽ bệnh "hư van" để thu 600.000đ – 900.000đ tiền linh kiện trôi nổi.',
      'Cách bảo vệ gia đình: Dặn dò ông bà/người thân tuyệt đối không cho người lạ tự xưng kiểm tra gas vào nhà; bóc bỏ tờ rơi lạ ở cửa sắt và lưu cố định số Gas Nhà Mình (0888 113 831) vào điện thoại.',
    ],
    sections: [
      {
        id: '3-chieu-tro-gia-mao-can-canh-giac',
        heading: '1. 3 Thủ đoạn giả danh cửa hàng gas đánh lừa các hộ gia đình tại TP.HCM',
        paragraphs: [
          'Thời gian qua, nhiều khách hàng tại Quận 8, Tân Phú, Quận 6, Bình Tân, Gò Vấp, Hóc Môn phản ánh với Gas Nhà Mình về việc bị mất oan hàng trăm ngàn đồng chỉ vì vô tình gọi vào các số điện thoại dán ở cổng nhà. Dưới đây là 3 kịch bản mà các nhóm bán gas trôi nổi thường dùng:',
        ],
        bullets: [
          {
            label: 'Thủ đoạn 1 – Dán đè tờ rơi nam châm / decal siêu dính ở cửa sắt:',
            text: 'Lợi dụng ban đêm hoặc lúc chủ nhà đi làm, các đối tượng dán đè tờ decal in chữ "TRẠM ĐỔI GAS KHU VỰC", "TỔNG ĐÀI GIAO GAS NHANH" lên cổng sắt hoặc hộp điện. Khi bếp hết gas đột ngột lúc đang nấu cơm, người nhà vội vàng nhìn ra cửa thấy số điện thoại liền bấm gọi mà không biết đó là số của nhóm gas dạo.',
          },
          {
            label: 'Thủ đoạn 2 – Giả danh "Nhân viên đi kiểm tra định kỳ" nhắm vào người lớn tuổi:',
            text: 'Thấy trong nhà chỉ có ông bà lớn tuổi hoặc người giúp việc, kẻ gian mặc áo bảo hộ bước vào nói "Bên hãng cử xuống kiểm tra van bếp miễn phí". Khi vào được bếp, chúng lén dán tem số điện thoại của chúng đè lên tem đại lý cũ trên bình gas, rồi cố tình bẻ gãy lẫy van hoặc nói dối "van sắp nổ" để ép ông bà trả 600.000đ – 850.000đ thay bộ van dây rẻ tiền.',
          },
          {
            label: 'Thủ đoạn 3 – Chào giá rẻ hơn 40.000đ – 50.000đ nhưng rút ruột và tráo vỏ bình:',
            text: 'Để dụ khách đổi gas, chúng báo giá cực rẻ qua điện thoại. Nhưng bình mang tới là bình sang chiết lậu chỉ có 9kg gas (ăn bớt tới 3kg gas của khách) và lấy đi vỏ bình chính hãng của gia đình, để lại vỏ bình lạ không có giá trị thế chân.',
          },
        ],
        callout: {
          type: 'warning',
          title: 'Lời nhắn quan trọng tới mọi gia đình:',
          text: 'Hệ thống Gas Nhà Mình CHỈ cử kỹ thuật viên đến nhà khi gia đình bạn chủ động gọi đặt gas hoặc gọi yêu cầu bảo hành qua Hotline duy nhất 0888 113 831. Chúng tôi tuyệt đối không bao giờ tự ý đi gõ cửa từng nhà để xin vào kiểm tra hay gạ bán phụ kiện!',
        },
      },
      {
        id: 'bang-phan-biet-gas-nha-minh-va-gas-to-roi',
        heading: '2. Bảng đối chiếu giữa Hệ thống Gas Nhà Mình và Nhóm giao gas tờ rơi dán tường',
        paragraphs: [
          'Gia đình mình có thể dễ dàng phân biệt dịch vụ chính hãng và các điểm bán gas dạo qua 4 điểm khác biệt rõ rệt sau:',
        ],
        table: {
          caption: 'Sự khác biệt minh bạch giữa Gas Nhà Mình và các số điện thoại dán trộm trên tường',
          headers: ['Tiêu chí an tâm', 'Hệ thống Gas Nhà Mình (gasnhaminh.com)', 'Số điện thoại tờ rơi / Decal lạ dán cổng'],
          rows: [
            ['Hệ thống cửa hàng vật lý', '5 chi nhánh kho trạm rõ ràng tại Quận 8, Tân Phú, Quận 6, Bà Điểm & Tân Hiệp (Hóc Môn)', 'Không có cửa hàng thật, chỉ dùng số điện thoại rác và sang chiết lén lút'],
            ['Giá bán & Phụ kiện', 'Niêm yết công khai tại gasnhaminh.com/bang-gia, miễn phí kiểm tra & vệ sinh bếp', 'Báo giá ảo rồi ép khách thay van, dây dẫn, chụp kiềng với giá cao gấp 3–4 lần'],
            ['Nguồn gốc bình gas', '100% bình V-Gas, Petrolimex, Tuấn Khang nguyên màng co, tem QR và đủ 12kg ruột', 'Màng co giả, thiếu từ 1.5kg – 3kg gas, vỏ bình cũ mài chữ tiềm ẩn nguy cơ xì gas'],
            ['Trách nhiệm bảo hành', 'Bảo hành an toàn 24/7 suốt thời gian dùng bình; có mặt trong 15 phút khi khách cần hỗ trợ', 'Khi bếp gặp sự cố gọi lại thì khóa máy, chặn số hoặc đổ lỗi cho khách hàng'],
          ],
        },
      },
      {
        id: '3-buoc-bao-ve-gian-bep-nha-minh',
        heading: '3. 3 Bước đơn giản để bảo vệ ông bà và người thân khỏi bẫy gas giả',
        paragraphs: [
          'Hãy dành 2 phút hôm nay để thực hiện ngay 3 việc nhỏ nhưng cực kỳ thiết thực cho tổ ấm của mình:',
        ],
        bullets: [
          {
            label: 'Bước 1 – Gỡ bỏ toàn bộ decal lạ trên cửa cổng và bình gas:',
            text: 'Kiểm tra mặt trong cửa sắt, tường bếp và thân bình gas hiện tại, bóc bỏ ngay các tờ decal không rõ địa chỉ cửa hàng.',
          },
          {
            label: 'Bước 2 – Lưu số "Gas Nhà Mình - 0888 113 831" vào danh bạ người thân:',
            text: 'Lưu sẵn số Hotline 0888 113 831 vào điện thoại của ông bà, bố mẹ và dặn người nhà chỉ gọi duy nhất số này khi hết gas hoặc khi bếp có vấn đề.',
          },
          {
            label: 'Bước 3 – Gọi kiểm tra miễn phí nếu nghi ngờ bình gas trong nhà bị tráo:',
            text: 'Nếu lần trước lỡ gọi nhầm số lạ và thấy lửa bếp cháy đỏ, có mùi hôi gas hoặc nghi bị tráo vỏ, hãy gọi 0888 113 831 để kỹ thuật viên Gas Nhà Mình ghé kiểm tra độ kín hoàn toàn miễn phí.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Nhà mình lỡ gọi số lạ trên tờ rơi và bị họ tráo mất vỏ bình Petrolimex sang vỏ bình lạ thì giờ đổi lại được không?',
        answer: 'Được bạn nhé! Khi dùng hết bình gas đó, bạn chỉ cần gọi Hotline 0888 113 831 của Gas Nhà Mình. Kỹ thuật viên sẽ kiểm tra độ an toàn của vỏ bình hiện tại và hỗ trợ gia đình mình chuyển đổi lại sang bình Petrolimex hoặc V-Gas chính hãng một cách thuận tiện và tiết kiệm nhất.',
      },
      {
        question: 'Làm sao để người lớn tuổi ở nhà nhận biết đúng nhân viên của Gas Nhà Mình?',
        answer: 'Nhân viên của Gas Nhà Mình chỉ đến khi gia đình vừa đặt đơn qua số 0888 113 831 hoặc website gasnhaminh.com, đọc đúng tên người đặt, giao đúng loại bình nguyên tem niêm phong và thu đúng số tiền niêm yết trên website, tuyệt đối không bao giờ tự ý gõ cửa khi khách chưa gọi.',
      },
      {
        question: 'Khi nào thì gia đình thực sự cần thay van điều áp hoặc dây dẫn gas mới?',
        answer: 'Theo khuyến cáo an toàn PCCC, dây dẫn gas và van điều áp chính hãng có tuổi thọ sử dụng an toàn từ 3 đến 5 năm (trừ trường hợp bị chuột cắn thủng hoặc rỉ sét nặng). Khi cần thay, kỹ thuật viên Gas Nhà Mình luôn báo giá niêm yết minh bạch trước để chủ nhà quyết định.',
      },
    ],
    relatedProductSlugs: [
      'gas-petrolimex-dung-12kg',
      'gas-petrolimex-shell-12kg',
      'gas-v-gas-xam-12kg',
      'gas-v-gas-do-12kg',
    ],
    relatedDistrictSlugs: ['quan-8', 'tan-phu', 'go-vap', 'quan-12', 'hoc-mon', 'quan-6'],
  },
  {
    slug: 'cach-xu-ly-khi-ngui-thay-mui-gas-ro-ri',
    title: 'Ngửi Thấy Mùi Gas Trong Bếp Phải Làm Sao? 5 Bước Xử Lý An Toàn Mọi Gia Đình Cần Nhớ',
    metaTitle: 'Ngửi Thấy Mùi Gas Phải Làm Sao? 5 Bước Xử Lý An Toàn – Gas Nhà Mình',
    metaDescription: 'Hướng dẫn chi tiết 5 bước xử lý an toàn khi ngửi thấy mùi gas rò rỉ trong nhà bếp. Lưu ý sống còn: tuyệt đối không bật tắt công tắc điện hay quạt máy.',
    category: 'an-toan-gas',
    categoryLabel: 'An Toàn Phòng Cháy',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    heroIcon: '🔥',
    readingTime: '5 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Tổ Kỹ Thuật Chăm Sóc Gian Bếp – Gas Nhà Mình',
    authorRole: 'Đội Hỗ Trợ Khẩn Cấp An Toàn Khí Gas 24/7 TP.HCM',
    excerpt: 'Bước vào bếp buổi sáng hoặc khi đi làm về bỗng ngửi thấy mùi gas nồng nặc? Hãy bình tĩnh làm đúng 5 bước dưới đây và tuyệt đối tránh chạm vào công tắc điện!',
    tldr: [
      'NGUYÊN TẮC SỐ 1: Tuyệt đối KHÔNG bật hoặc tắt công tắc đèn, quạt điện, máy hút mùi, không rút ổ cắm điện và không bật lửa trong bếp (tia lửa điện nhỏ xíu trong công tắc sẽ gây cháy nổ khí gas).',
      'Bước 1: Nhanh chóng khóa chặt van cổ bình gas (xoay núm tròn theo chiều kim đồng hồ về hướng chữ CLOSE hoặc gạt cần van chụp về OFF).',
      'Bước 2: Mở toang cửa chính, cửa sổ, cửa tủ bếp và dùng quạt tay/bìa cứng quạt thấp sát mặt sàn nhà để đẩy khí gas ra ngoài.',
      'Bước 3: Đi ra khỏi khu vực có mùi gas rồi gọi ngay đội kỹ thuật Gas Nhà Mình (0888 113 831) đến kiểm tra khắc phục miễn phí.',
    ],
    sections: [
      {
        id: 'tai-sao-khong-duoc-bat-tat-dien',
        heading: '1. Vì sao tuyệt đối KHÔNG ĐƯỢC bật/tắt công tắc điện hay quạt máy khi có mùi gas?',
        paragraphs: [
          'Khí gas dân dụng (LPG) vốn không màu, không mùi, nhưng đã được nhà máy pha thêm hợp chất Mercaptan có mùi hăng đặc trưng để bất kỳ ai trong nhà cũng phát hiện được ngay khi rò rỉ. Khi khí gas thoát ra phòng kín, chỉ cần một tia lửa cực nhỏ cũng đủ kích hoạt phản ứng cháy.',
          'Điều nhiều người không ngờ tới là tia lửa đó lại nằm ngay trong các công tắc điện gia đình:',
        ],
        bullets: [
          {
            label: 'Không bấm công tắc đèn hoặc quạt điện (dù là bật hay tắt):',
            text: 'Mỗi khi hai lá đồng bên trong công tắc điện đóng hoặc ngắt mạch, nó luôn tạo ra một tia lửa điện (hồ quang) nhỏ. Vì vậy, đèn đang tắt thì cứ để tắt, quạt đang quay thì cứ để quay, tuyệt đối không chạm tay vào công tắc hay ổ cắm.',
          },
          {
            label: 'Không bật máy hút mùi trên bếp:',
            text: 'Khí gas nặng hơn không khí khoảng 1.5 lần nên luôn chìm xuống sát nền gạch chứ không bay lên cao. Bật máy hút mùi vừa không hút được gas dưới sàn, vừa làm phát sinh tia lửa ở mô-tơ điện.',
          },
          {
            label: 'Không đi giày cao gót đế kim loại hoặc dùng điện thoại ngay cạnh bình gas:',
            text: 'Hãy di chuyển nhẹ nhàng và chỉ bấm gọi điện thoại sau khi đã bước ra ngoài sân hoặc ban công thoáng khí.',
          },
        ],
        callout: {
          type: 'warning',
          title: 'Ghi nhớ nhanh cho cả gia đình:',
          text: 'Khi ngửi thấy mùi gas: "Đừng chạm công tắc điện – Khóa chặt van bình – Mở toang cửa sổ – Quạt tay sát sàn nhà!".',
        },
      },
      {
        id: '5-buoc-xu-ly-an-toan-trong-30-giay',
        heading: '2. 5 Bước xử lý rò rỉ gas an toàn trong 30 giây',
        paragraphs: [
          'Khi phát hiện mùi gas trong bếp, bạn hãy thực hiện lần lượt từng bước sau:',
        ],
        bullets: [
          {
            label: 'Bước 1 – Khóa van đầu bình gas:',
            text: 'Vặn chặt núm van trên cổ bình gas theo chiều kim đồng hồ (chiều mũi tên CLOSE). Nếu bếp đang cháy thì khóa van bình trước để lửa tự tắt hết phần gas trong ống rồi mới vặn núm bếp về OFF.',
          },
          {
            label: 'Bước 2 – Mở hết cửa sổ, cửa ra vào và cánh tủ bếp:',
            text: 'Tạo luồng gió tự nhiên thông thoáng tối đa cho căn bếp. Đừng quên mở toang cánh cửa hộc tủ nơi đặt bình gas.',
          },
          {
            label: 'Bước 3 – Dùng quạt nan, quạt nhựa hoặc tấm bìa quạt sát nền gạch:',
            text: 'Vì khí gas nằm là là sát mặt đất và trong các góc gầm tủ, hãy dùng quạt tay quạt thấp sát sàn nhà hướng ra phía cửa chính để khí gas tản nhanh ra ngoài.',
          },
          {
            label: 'Bước 4 – Dùng khăn ướt xử lý nếu cổ bình bị xì trực tiếp:',
            text: 'Trong trường hợp hiếm gặp khi khóa van rồi mà cổ bình vẫn xì kêu "xè xè", hãy lấy khăn ướt trùm lên cổ van, tháo van điều áp và bê bình ra khoảng sân trống thoáng gió ngoài trời.',
          },
          {
            label: 'Bước 5 – Gọi kỹ thuật viên Gas Nhà Mình đến kiểm tra bằng máy dò chuyên dụng:',
            text: 'Ra ngoài khu vực thông thoáng và gọi Hotline 0888 113 831. Kỹ thuật viên trực tại trạm gần nhất sẽ có mặt sau 15 phút để kiểm tra toàn bộ đường ống và xử lý an toàn 100% trước khi gia đình nấu nướng trở lại.',
          },
        ],
      },
      {
        id: 'nguyen-nhan-ro-ri-gas-trong-nha-bep',
        heading: '3. Các nguyên nhân gây rò rỉ gas phổ biến nhất và cách phòng ngừa định kỳ',
        paragraphs: [
          'Hầu hết các trường hợp có mùi gas trong nhà phố tại TP.HCM đều bắt nguồn từ những chi tiết nhỏ dễ bị bỏ quên dưới gầm bếp:',
        ],
        table: {
          caption: '4 nguyên nhân gây xì gas phổ biến trong gian bếp gia đình và giải pháp phòng ngừa',
          headers: ['Thủ phạm gây rò rỉ', 'Vì sao xảy ra?', 'Dấu hiệu nhận biết sớm', 'Cách phòng ngừa an toàn'],
          rows: [
            ['Chuột cắn dây dẫn gas', 'Dây dẫn cao su dính mùi dầu mỡ thức ăn thu hút chuột chui vào gầm tủ cắn rách', 'Ngửi thấy mùi gas mỗi lần mở van bình để nấu ăn', 'Sử dụng dây dẫn gas lõi thép hoặc bọc lưới inox chống chuột'],
            ['Mòn rách gioăng cao su cổ bình', 'Vòng đệm cao su trong cổ van bình gas bị chai cứng hoặc nứt sau nhiều lần tháo lắp', 'Có mùi gas quanh đầu bình ngay sau khi vừa mở van', 'Yêu cầu nhân viên kiểm tra và thay gioăng mới miễn phí mỗi lần đổi bình'],
            ['Lỏng cổ dê (kẹp siết 2 đầu dây)', 'Đầu dây cao su cắm vào bếp bị giãn lỏng hoặc đai ốc siết bị rỉ sét', 'Quét nước xà phòng lên đầu nối sau lưng bếp thấy sủi bọt', 'Kiểm tra siết chặt cổ dê inox định kỳ 6 tháng/lần'],
            ['Quên khóa van bình sau khi nấu', 'Chỉ tắt núm vặn trên mặt bếp mà không khóa van cổ bình gas khiến gas ngâm áp suất cao trong dây suốt đêm', 'Dây dẫn nhanh bị phồng, lão hóa và rò khí ngầm', 'Tập thói quen khóa van bình gas mỗi tối trước khi đi ngủ'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Tại sao lúc bình gas gần hết lại có mùi hôi nồng hơn lúc mới đổi?',
        answer: 'Do chất tạo mùi cảnh báo (Mercaptan) có tỷ trọng nặng nên thường lắng xuống đáy bình. Khi bình gas dùng gần cạn, lượng chất tạo mùi này đi lên theo hơi gas cuối bình đậm đặc hơn nên bạn sẽ ngửi thấy mùi hăng rõ hơn. Tuy vậy, bạn vẫn nên kiểm tra lại dây dẫn để yên tâm tuyệt đối.',
      },
      {
        question: 'Cách thử xì gas bằng nước rửa chén tại nhà làm như thế nào?',
        answer: 'Bạn pha nước rửa chén với một chút nước rồi đánh cho lên thật nhiều bọt. Mở van bình gas (nhưng không bật bếp), dùng cọ hoặc miếng rửa chén quét bọt lên quanh cổ van, thân dây dẫn và chỗ nối vào bếp. Nếu chỗ nào có bong bóng phồng lên liên tục thì chỗ đó đang bị rò gas.',
      },
      {
        question: 'Gọi kỹ thuật viên Gas Nhà Mình qua kiểm tra mùi gas có tốn phí không?',
        answer: 'Hoàn toàn miễn phí cho khách hàng của Gas Nhà Mình! Đội ngũ kỹ thuật viên tại 5 trạm kho TP.HCM luôn sẵn sàng hỗ trợ kiểm tra độ kín, cắt đầu dây bị lão hóa và siết lại cổ dê an toàn cho gia đình bạn.',
      },
    ],
    relatedProductSlugs: [
      'gas-v-gas-shell-12kg',
      'gas-petrolimex-shell-12kg',
      'gas-v-gas-pe-12kg',
      'gas-v-gas-xam-12kg',
    ],
    relatedDistrictSlugs: ['quan-8', 'quan-6', 'tan-phu', 'binh-tan', 'quan-10', 'quan-11'],
  },
  {
    slug: 'nguyen-nhan-bep-gas-lua-do-den-day-noi',
    title: 'Bếp Gas Bị Đỏ Lửa, Đen Đáy Nồi Phải Làm Sao? Mẹo Chỉnh Lửa Xanh Trong 3 Phút Tại Nhà',
    metaTitle: 'Bếp Gas Bị Đỏ Lửa, Đen Đáy Nồi: Cách Chỉnh Lửa Xanh – Gas Nhà Mình',
    metaDescription: 'Mẹo xử lý bếp gas bị đỏ lửa, làm đen đáy xoong nồi cực nhanh cho người nội trợ: cách vệ sinh mâm chia lửa, chỉnh cần gạt gió dưới gầm bếp và nhận biết khi bình sắp hết.',
    category: 'xu-ly-su-co',
    categoryLabel: 'Mẹo Chăm Sóc Bếp',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    heroIcon: '🔧',
    readingTime: '5 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Tổ Kỹ Thuật Chăm Sóc Gian Bếp – Gas Nhà Mình',
    authorRole: 'Chuyên viên Bảo dưỡng Bếp Gas Gia Đình TP.HCM',
    excerpt: 'Nấu cơm xong thấy đáy nồi inox bám đầy nhọ đen rất vất vả chùi rửa? Cùng Gas Nhà Mình tìm hiểu nguyên nhân vì sao bếp gas bị đỏ lửa và cách tự chỉnh lại ngọn lửa xanh biếc chỉ trong 3 phút!',
    tldr: [
      'Ngọn lửa đỏ cam xuất hiện khi khí gas cháy không hết do thiếu gió (Oxy) hoặc khe chia lửa bị bám cặn dầu mỡ, thức ăn trào.',
      'Nếu chỉ 1 bên bếp bị đỏ lửa (bên kia vẫn xanh): 100% là do mâm đồng chia lửa bị bẩn hoặc lệch cần gạt gió của bên lò đó.',
      'Nếu cả 2 bên bếp cùng đỏ lửa và yếu dần sau 2–3 tháng sử dụng: Đó là dấu hiệu báo bình gas nhà mình sắp hết sạch.',
      'Cách tự chỉnh tại nhà: Đợi bếp nguội -> Tháo mâm đồng đi cọ rửa sạch, lau thật khô -> Lắp lại ngay ngắn và xoay nhẹ "cần gạt gió" dưới bụng bếp cho đến khi ngọn lửa chuyển sang màu xanh lam.',
    ],
    sections: [
      {
        id: 'vi-sao-bep-gas-bi-do-lua',
        heading: '1. Bắt bệnh nhanh: Vì sao bếp gas đang cháy xanh bỗng chuyển sang lửa đỏ làm đen nồi?',
        paragraphs: [
          'Nhiều chị em nội trợ lo lắng bếp bị hỏng hoặc bình gas có vấn đề khi thấy ngọn lửa bỗng dưng bùng màu vàng đỏ và làm đen kịt đáy nồi. Thực tế, có 4 nguyên nhân rất đời thường trong gian bếp gây ra hiện tượng này:',
        ],
        table: {
          caption: 'Bảng bắt bệnh nhanh hiện tượng bếp gas bị đỏ lửa trong gia đình',
          headers: ['Dấu hiệu bạn nhìn thấy', 'Nguyên nhân thực sự', 'Cách khắc phục nhanh'],
          rows: [
            ['Một bên bếp lửa đỏ, bên còn lại lửa vẫn xanh đẹp', 'Do nước canh trào hoặc dầu mỡ làm bít các khe nhỏ trên mâm chia lửa, hoặc lệch lẫy gió bên lò đó', 'Vệ sinh mâm đồng & chỉnh lại lẫy gió dưới gầm bếp'],
            ['Cả 2 bên bếp đều lửa đỏ và ngọn lửa nhỏ dần sau vài tháng nấu', 'Bình gas đã cạn gần hết đáy, áp suất hơi gas yếu đi', 'Gọi đổi bình gas mới để không bị tắt bếp giữa chừng'],
            ['Lửa chỉ đỏ ở chỗ tiếp xúc với đáy nồi vừa rửa xong', 'Đáy xoong nồi còn đọng nước ướt hoặc dính dầu mỡ bên ngoài', 'Lau khô đáy nồi trước khi bắc lên bếp'],
            ['Lửa đỏ kèm mùi hắc ngay từ ngày đầu mới đổi bình ở tiệm lạ', 'Gas sang chiết lậu pha tạp chất hoặc van điều áp bị lỗi áp suất', 'Khóa van và gọi kỹ thuật viên Gas Nhà Mình kiểm tra miễn phí'],
          ],
        },
      },
      {
        id: '3-buoc-chinh-lua-xanh-tai-nha',
        heading: '2. 3 Bước tự vệ sinh họng bếp và chỉnh cần gạt gió để lửa xanh biếc trở lại',
        paragraphs: [
          'Không cần dùng đến tua-vít hay dụng cụ phức tạp, bạn hoàn toàn có thể tự làm sạch và chỉnh lửa xanh cho bếp gas nhà mình với 3 bước sau:',
        ],
        bullets: [
          {
            label: 'Bước 1 – Tháo mâm chia lửa khi bếp đã nguội:',
            text: 'Khóa van bình gas và chờ kiềng bếp nguội hẳn. Nhấc kiềng ra, lấy chiếc mâm đồng tròn (bộ phận chia lửa ở giữa bếp) đem ra bồn rửa chén.',
          },
          {
            label: 'Bước 2 – Chải sạch các rãnh nhỏ và lau khô 100%:',
            text: 'Dùng bàn chải đánh răng cũ cùng nước rửa chén cọ sạch lớp muội đen quanh các khe răng cưa của mâm đồng; dùng tăm nhọn khơi thông các lỗ bị nghẹt. Sau đó lau thật khô bằng khăn sạch rồi đặt lại thật khớp vào họng bếp (lưu ý: nếu đặt kênh hoặc còn ướt nước thì lửa vẫn sẽ bị đỏ!).',
          },
          {
            label: 'Bước 3 – Gạt lẫy chỉnh gió dưới gầm bếp:',
            text: 'Cúi nhẹ nhìn xuống gầm bếp (ngay phía sau núm vặn bật bếp), bạn sẽ thấy một lẫy kim loại nhỏ có thể gạt qua lại. Hãy bật bếp lên rồi dùng tay đẩy nhẹ lẫy gió này sang trái hoặc phải một chút để lấy thêm oxy, bạn sẽ thấy ngọn lửa lập tức gom gọn và xanh trong trở lại.',
          },
        ],
        callout: {
          type: 'tip',
          title: 'Dịch vụ chăm sóc bếp miễn phí từ Gas Nhà Mình:',
          text: 'Mỗi lần gọi đổi gas tại Gas Nhà Mình (0888 113 831), bạn đừng ngại nhờ anh kỹ thuật viên: "Em ơi vệ sinh giùm chị cái họng bếp và chỉnh lại lửa xanh nhé!". Đội ngũ kỹ thuật của chúng tôi luôn mang sẵn dụng cụ thông kim phun và phục vụ hoàn toàn miễn phí!',
        },
      },
    ],
    faqs: [
      {
        question: 'Lỡ tay làm đổ nước hoặc trào canh tắt bếp, bật lại không lên lửa thì làm sao?',
        answer: 'Khi nước trào làm ướt đầu sứ đánh lửa (cục sứ màu trắng cạnh mâm đồng), tia lửa điện sẽ bị truyền xuống vỏ bếp nên bật không cháy. Bạn chỉ cần tắt bếp, nhấc mâm đồng ra lau khô, dùng khăn giấy khô thấm thật sạch đầu sứ trắng và lỗ kim phun ở giữa, đợi 3–5 phút bật lại bếp sẽ lên lửa ngay.',
      },
      {
        question: 'Đun nấu bằng ngọn lửa đỏ có làm tốn gas hơn không?',
        answer: 'Có! Lửa đỏ là hiện tượng khí gas không được đốt cháy hết 100% mà thất thoát thành muội than đen bám vào đáy nồi, khiến thời gian đun sôi lâu hơn và làm hao phí thêm khoảng 15% – 20% lượng gas hàng tháng của gia đình.',
      },
      {
        question: 'Dòng bình gas nào tại Gas Nhà Mình có chất lượng nước gas sạch, không đen nồi?',
        answer: 'Tất cả các dòng bình chính hãng tại Gas Nhà Mình như Gas V-Gas Vàng, V-Gas Đỏ, V-Gas Xám, Petrolimex 12kg và Tuấn Khang 12kg đều sử dụng nguồn LPG tinh khiết đạt chuẩn quốc gia, cho ngọn lửa xanh lam nhiệt lượng cao và bảo vệ đáy nồi sáng bóng.',
      },
    ],
    relatedProductSlugs: [
      'gas-v-gas-vang-12kg',
      'gas-v-gas-xam-12kg',
      'gas-petrolimex-dung-12kg',
      'gas-tuan-khang-xanh-12kg',
    ],
    relatedDistrictSlugs: ['tan-phu', 'quan-8', 'quan-6', 'tan-binh', 'phu-nhuan', 'binh-thanh'],
  },
  {
    slug: 'binh-gas-12kg-dung-duoc-bao-lau-nang-bao-nhieu-kg',
    title: 'Gia Đình 4 Người Dùng Bình Gas 12kg Được Bao Lâu? Kích Thước & Trọng Lượng Chuẩn (2026)',
    metaTitle: 'Bình Gas 12kg Dùng Được Bao Lâu? Kích Thước & Cân Nặng – Gas Nhà Mình',
    metaDescription: 'Giải đáp bình gas 12kg gia đình dùng được mấy tháng, chiều cao và đường kính bình gas 12kg để đóng hộc tủ bếp vừa đẹp, cùng 3 dấu hiệu nhận biết bình sắp hết gas.',
    category: 'kinh-nghiem-mua-gas',
    categoryLabel: 'Kinh Nghiệm Gia Đình',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    heroIcon: '⏱️',
    readingTime: '5 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Tổ Kỹ Thuật Chăm Sóc Gian Bếp – Gas Nhà Mình',
    authorRole: 'Chuyên viên Tư vấn Thiết bị Bếp & Tiết kiệm Gas',
    excerpt: 'Trung bình một hộ gia đình 3–5 người tại TP.HCM dùng bao lâu thì hết 1 bình gas 12kg? Khi đóng tủ bếp mới cần chừa khoang chứa bình gas rộng và cao bao nhiêu cm? Xem ngay thông số chuẩn.',
    tldr: [
      'Thời gian dùng 1 bình gas 12kg: Gia đình 3–5 người nấu ăn đều đặn mỗi ngày dùng được từ 2.5 đến 3.5 tháng. Gia đình ít người hoặc chỉ nấu buổi tối dùng được từ 4 đến 5.5 tháng.',
      'Cân nặng bình gas 12kg đầy: Khoảng 25.0kg – 26.5kg (bao gồm 12kg nước gas bên trong + khoảng 13kg–14.5kg vỏ thép).',
      'Kích thước chuẩn để đóng hộc tủ bếp: Đường kính bình 30cm, chiều cao bình 58cm – 60cm (khoang tủ bếp nên làm rộng tối thiểu 40cm và cao tối thiểu 68cm – 72cm để dễ lắp van điều áp).',
    ],
    sections: [
      {
        id: 'thoi-gian-su-dung-binh-gas-12kg-gia-dinh',
        heading: '1. Một bình gas 12kg dùng được mấy tháng theo thói quen nấu nướng của gia đình?',
        paragraphs: [
          'Lượng gas tiêu thụ nhanh hay chậm phụ thuộc trực tiếp vào số bữa nấu mỗi ngày và các món ăn thường xuyên chế biến (ví dụ: gia đình hay ninh hầm xương, kho thịt lâu hoặc đun nước uống bằng bếp gas sẽ dùng nhiều gas hơn gia đình chỉ nấu các món xào, canh nhanh).',
          'Dưới đây là bảng thống kê thực tế từ các hộ gia đình thân thiết đang gọi gas định kỳ tại Gas Nhà Mình:',
        ],
        table: {
          caption: 'Bảng ước tính thời gian sử dụng bình gas 12kg cho từng quy mô hộ gia đình',
          headers: ['Quy mô hộ gia đình', 'Thói quen nấu ăn hàng ngày', 'Thời gian bật bếp trung bình', 'Chu kỳ đổi bình gas 12kg'],
          rows: [
            ['Vợ chồng trẻ / Sinh viên (1–2 người)', 'Sáng ăn ngoài, tối nấu cơm đơn giản', '25 – 35 phút / ngày', '4.0 – 5.5 tháng / bình'],
            ['Gia đình tiêu chuẩn (3–4 người)', 'Nấu điểm tâm sáng + bữa tối, cuối tuần nấu đủ 3 bữa', '60 – 75 phút / ngày', '2.5 – 3.5 tháng / bình'],
            ['Gia đình 3 thế hệ (5–7 người)', 'Nấu đủ 3 bữa/ngày, có hầm cháo cho bé hoặc ninh canh', '90 – 120 phút / ngày', '1.5 – 2.2 tháng / bình'],
            ['Quán ăn gia đình / Bán đồ ăn sáng', 'Nấu nồi nước dùng lớn hoặc chiên xào liên tục', '4 – 6 tiếng / ngày', '8 – 12 ngày (Nên dùng bình 45kg tiết kiệm hơn)'],
          ],
        },
      },
      {
        id: 'kich-thuoc-hoc-tu-bep-chua-binh-gas',
        heading: '2. Kích thước bình gas 12kg chuẩn để thiết kế hộc tủ bếp đẹp và thoáng',
        paragraphs: [
          'Nếu gia đình mình đang chuẩn bị sửa sang nhà bếp hoặc đóng tủ bếp mới, hãy gửi ngay thông số kích thước bình gas 12kg dưới đây cho thợ mộc/thợ nhôm kính để khoang chứa bình vừa vặn, dễ thao tác:',
        ],
        bullets: [
          {
            label: 'Đường kính vòng bụng bình gas 12kg:',
            text: '30 cm. Do đó chiều ngang và chiều sâu lọt lòng của hộc tủ nên để từ 38 cm – 45 cm.',
          },
          {
            label: 'Chiều cao bình gas 12kg:',
            text: 'Từ 58 cm – 60 cm. Tuy nhiên khi lắp van chụp hoặc thò tay vào khóa mở van, bạn cần khoảng trống phía trên đỉnh bình ít nhất 10cm, nên chiều cao lọt lòng khoang tủ bếp lý tưởng là từ 68 cm – 75 cm.',
          },
          {
            label: 'Lưu ý lỗ thoáng khí cho cánh tủ bếp:',
            text: 'Cánh tủ nơi đặt bình gas nên thiết kế dạng lá sách (cửa chớp) hoặc khoét lỗ thông hơi ở phía dưới chân tủ để không gian luôn khô thoáng, an toàn.',
          },
        ],
        callout: {
          type: 'info',
          title: 'Mẹo ghi nhớ ngày đổi gas:',
          text: 'Mỗi khi giao bình mới, nhân viên Gas Nhà Mình đều ghi rõ ngày lắp đặt lên phiếu bảo hành dán trên bình, đồng thời hệ thống phần mềm của chúng tôi cũng lưu lại lịch sử để bạn dễ dàng tra cứu xem bình trước gia đình mình dùng được bao nhiêu ngày!',
        },
      },
      {
        id: 'dau-hieu-binh-gas-sap-het',
        heading: '3. Cách nhận biết bình gas sắp hết trước 2 ngày để chủ động gọi đổi bình',
        paragraphs: [
          'Để không bao giờ gặp cảnh đang chiên cá hay nấu canh lúc tối muộn thì hết gas, bạn có thể nhận biết bình gas chỉ còn dùng được 1–2 bữa nữa qua các dấu hiệu sau:',
        ],
        bullets: [
          {
            label: 'Ngọn lửa cháy yếu và nhỏ hơn hẳn dù đã vặn núm bếp hết cỡ:',
            text: 'Áp suất hơi gas trong bình giảm mạnh khi phần gas lỏng dưới đáy sắp cạn.',
          },
          {
            label: 'Đầu ngọn lửa hơi ngả màu vàng cam và nghe mùi gas đậm hơn:',
            text: 'Chất tạo mùi cảnh báo lắng ở đáy bình thoát ra theo lượng hơi gas cuối cùng.',
          },
          {
            label: 'Nghiêng nhẹ bình thấy nhẹ hẫng:',
            text: 'Chỉ cần nhấc nhẹ quai bình thấy nhẹ bẫng, không còn độ đầm của nước gas bên trong là lúc bạn có thể gọi trước cho Gas Nhà Mình (0888 113 831) để hẹn giờ giao bình mới thuận tiện nhất.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Lỡ đang nấu cơm tối lúc 8–9 giờ đêm mới phát hiện hết gas thì Gas Nhà Mình còn giao không?',
        answer: 'Còn bạn nhé! Các trạm kho của Gas Nhà Mình phục vụ liên tục từ 06:00 sáng đến 22:00 đêm mỗi ngày (kể cả Chủ Nhật và ngày Lễ). Bạn chỉ cần gọi 0888 113 831 là nhân viên sẽ mang bình tới tận bếp trong 15 phút để gia đình kịp bữa cơm tối.',
      },
      {
        question: 'Làm sao để nấu ăn tiết kiệm gas hơn cho gia đình đông người?',
        answer: 'Bạn nên lau khô đáy nồi trước khi đặt lên bếp, điều chỉnh ngọn lửa vừa khít diện tích đáy nồi (không để lửa liếm ra ngoài thành nồi), dùng nồi áp suất khi ninh hầm và định kỳ nhờ kỹ thuật viên vệ sinh họng đốt để lửa luôn xanh mạnh.',
      },
      {
        question: 'Gia đình ít nấu ăn, để bình gas 6 tháng mới dùng hết thì có sao không?',
        answer: 'Bình gas chính hãng được làm bằng thép chịu lực kín hoàn toàn nên để 6 tháng hay 1 năm chất lượng nước gas bên trong vẫn giữ nguyên. Bạn chỉ cần nhớ khóa chặt van cổ bình sau mỗi lần nấu để bảo vệ dây dẫn bền lâu.',
      },
    ],
    relatedProductSlugs: [
      'gas-v-gas-xam-12kg',
      'gas-petrolimex-dung-12kg',
      'gas-tuan-khang-vang-12kg',
      'gas-bo-45kg',
    ],
    relatedDistrictSlugs: ['quan-8', 'tan-phu', 'hoc-mon', 'quan-6', 'quan-12', 'binh-tan'],
  },
  {
    slug: 'so-sanh-cac-loai-binh-gas-12kg-tot-nhat-hien-nay',
    title: 'Gia Đình Nên Dùng Bình Gas Hãng Nào Tốt & An Toàn Nhất? So Sánh Chi Tiết Các Loại Bình 12kg',
    metaTitle: 'Nên Dùng Bình Gas Hãng Nào Tốt Nhất Cho Gia Đình? – Gas Nhà Mình',
    metaDescription: 'Tư vấn chọn bình gas 12kg tốt nhất cho gia đình tại TP.HCM: So sánh bình Petrolimex, V-Gas (Xám, Đỏ, Vàng, Bọc nhựa PE, Van chụp Shell) và Tuấn Khang.',
    category: 'kinh-nghiem-mua-gas',
    categoryLabel: 'Tư Vấn Chọn Bình Gas',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    heroIcon: '⚖️',
    readingTime: '7 phút đọc',
    publishedAt: '2026-10-18',
    updatedAt: '2026-10-18',
    authorName: 'Tổ Kỹ Thuật Chăm Sóc Gian Bếp – Gas Nhà Mình',
    authorRole: 'Chuyên viên Tư vấn Thiết bị & Thương hiệu Gas Chính Hãng',
    excerpt: 'Nên chọn bình gas Petrolimex, V-Gas hay Tuấn Khang? Bình gas vỏ bọc nhựa PE và bình van chụp Shell có ưu điểm gì đặc biệt cho người lớn tuổi và căn hộ hiện đại? Xem ngay bảng so sánh dễ hiểu nhất.',
    tldr: [
      'Thương hiệu Quốc gia uy tín lâu năm: Bình Gas Petrolimex 12kg (có đủ 2 chuẩn Van đứng vặn ngang và Van chụp Shell).',
      'Dòng bình hiện đại sạch nền bếp & siêu an toàn: Bình Gas V-Gas-PE 12kg (vỏ bọc nhựa chống rỉ sét gạch nền) và V-Gas-Shell 12kg (van chụp tự khóa 1 chạm).',
      'Dòng bình tiết kiệm kinh tế nhất cho gia đình nấu nhiều: Bình Gas V-Gas Xám 12kg và Gas Tuấn Khang 12kg.',
      'Mẹo chọn nhanh: Tất cả các hãng chính hãng tại Gas Nhà Mình đều đổi ngang vỏ miễn phí; bạn chỉ cần chọn loại bình có cùng chuẩn cổ van (Van đứng hoặc Van chụp) với bộ van bếp đang dùng ở nhà.',
    ],
    sections: [
      {
        id: 'so-sanh-chi-tiet-cac-dong-binh-gas-gia-dinh',
        heading: '1. Bảng so sánh các dòng bình gas 12kg chính hãng được các gia đình TP.HCM ưa chuộng nhất',
        paragraphs: [
          'Tại hệ thống Gas Nhà Mình, chúng tôi tuyển chọn và phân phối trực tiếp 11 dòng sản phẩm bình gas chính hãng đạt chuẩn kiểm định PCCC. Mỗi dòng bình có những thế mạnh riêng phù hợp với từng không gian bếp:',
        ],
        table: {
          caption: 'Bảng so sánh đặc điểm và ưu thế của các loại bình gas 12kg tại Gas Nhà Mình',
          headers: ['Tên bình gas 12kg', 'Loại cổ van lắp đặt', 'Ưu điểm nổi bật cho gian bếp', 'Phù hợp nhất với gia đình nào?'],
          rows: [
            ['Gas Petrolimex Đứng 12kg', 'Van đứng (Vặn ngang)', 'Thương hiệu Quốc gia lâu đời, nước gas nhập khẩu cháy xanh đều, đầy đủ tem QR chống giả', 'Gia đình yêu thích thương hiệu Petrolimex truyền thống'],
            ['Gas Petrolimex Shell 12kg', 'Van chụp (Úp thẳng)', 'Kết hợp uy tín Petrolimex với đầu van chụp tự khóa thông minh, tháo lắp cực nhanh', 'Gia đình đang dùng đầu van chụp Shell / Bình Minh / Total'],
            ['Gas V-Gas Xám 12kg', 'Van đứng (Vặn ngang)', 'Mức giá tiết kiệm nhất trong phân khúc chính hãng, đủ 12kg chuẩn nhà máy, lửa mạnh', 'Gia đình đông người nấu nướng nhiều, nhà trọ, quán ăn nhỏ'],
            ['Gas V-Gas Đỏ / Vàng / Xanh Đen 12kg', 'Van đứng (Vặn ngang)', 'Vỏ bình sơn tĩnh điện dày dặn, nước gas tinh khiết nhiệt lượng cao, bảo vệ đáy nồi inox', 'Hộ gia đình nhà phố sử dụng bếp đôi dương hoặc bếp âm mặt kính'],
            ['Gas V-Gas-PE 12kg (Bọc Nhựa)', 'Van đứng (Vặn ngang)', 'Bên ngoài vỏ thép được bọc lớp nhựa PE cao cấp: cách điện, chống va đập, không bao giờ để lại vết rỉ sét trên sàn gạch', 'Căn hộ chung cư, nhà bếp mới xây lát gạch men sáng màu hoặc tủ gỗ'],
            ['Gas V-Gas-Shell 12kg', 'Van chụp (Ngắt tự động)', 'Cổ van chụp an toàn chuẩn châu Âu, gạt nhẹ 1 ngón tay để khóa/mở gas mỗi ngày', 'Gia đình có ông bà lớn tuổi hoặc chị em ngại vặn van đồng cứng'],
            ['Gas Tuấn Khang Vàng / Xanh 12kg', 'Van đứng (Vặn ngang)', 'Thương hiệu thân thuộc tại TP.HCM, chất lượng ổn định, dịch vụ đổi vỏ linh hoạt', 'Hộ gia đình truyền thống và tiệm ăn uống gia đình'],
          ],
        },
      },
      {
        id: 'phan-biet-van-dung-va-van-chup',
        heading: '2. Cách nhìn cổ bình để biết nhà mình đang dùng Van Đứng (Van Ngang) hay Van Chụp (Shell)',
        paragraphs: [
          'Nhiều chị em khi gọi đổi gas lần đầu thường bối rối khi nhân viên hỏi: "Bình ở nhà chị là van ngang hay van chụp?". Thực ra chỉ cần nhìn vào đầu bình gas 3 giây là bạn phân biệt được ngay:',
        ],
        bullets: [
          {
            label: 'Bình Van Đứng (lắp với van điều áp vặn ngang):',
            text: 'Trên đỉnh cổ bình có một bánh xe vặn hình tròn bằng đồng (xoay nhiều vòng như vặn vòi nước để mở/khóa). Đây là chuẩn phổ biến nhất (chiếm 3/4 số hộ gia đình hiện nay), dùng rất bền và tương thích với các loại van Namilux, Katsura, Watashi.',
          },
          {
            label: 'Bình Van Chụp (van Compact / Shell úp từ trên xuống):',
            text: 'Trên cổ bình không có tay vặn tròn mà trơn gọn; cục van điều áp sẽ úp chụp thẳng lên đầu bình và có một nút gạt nhỏ bên hông. Khi nấu chỉ cần gạt nhẹ nút này lên (ON), nấu xong gạt xuống (OFF) cực kỳ nhẹ tay.',
          },
        ],
        callout: {
          type: 'tip',
          title: 'Mẹo đặt gas không cần nhớ tên van:',
          text: 'Nếu không chắc bình nhà mình thuộc loại nào, bạn cứ nhắn tin Zalo 0888 113 831 hoặc nói màu bình đang dùng, nhân viên Gas Nhà Mình ở trạm gần nhà bạn sẽ mang theo sẵn cả 2 chuẩn bình hoặc đầu van phù hợp để hỗ trợ tận nơi!',
        },
      },
      {
        id: 'loi-khuyen-chon-binh-gas-cho-gia-dinh-moi',
        heading: '3. Gợi ý chọn bình gas cho gia đình mới chuyển nhà hoặc mua trọn bộ lần đầu',
        paragraphs: [
          'Nếu bạn vừa chuyển về nhà mới, căn hộ mới hoặc ra ở riêng chưa có sẵn vỏ bình gas, dưới đây là 3 lựa chọn tối ưu nhất:',
        ],
        bullets: [
          {
            label: 'Ưu tiên sạch đẹp không gian bếp hiện đại:',
            text: 'Chọn ngay Bình V-Gas-PE 12kg (vỏ bọc nhựa chống rỉ sét sàn bếp) kết hợp bộ van điều áp tự động ngắt gas an toàn.',
          },
          {
            label: 'Ưu tiên thao tác khóa mở nhẹ nhàng cho bố mẹ lớn tuổi:',
            text: 'Chọn Bình Petrolimex Shell 12kg hoặc V-Gas-Shell 12kg (chuẩn van chụp 1 chạm).',
          },
          {
            label: 'Ưu tiên chi phí tiết kiệm và thông dụng nhất:',
            text: 'Chọn Bình V-Gas Xám 12kg hoặc Petrolimex Đứng 12kg (chuẩn van đứng truyền thống, dễ dàng đổi ở bất kỳ đâu).',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Nhà mình chưa có vỏ bình gas thì mua mới trọn bộ lần đầu tính giá như thế nào?',
        answer: 'Khi mua mới lần đầu chưa có vỏ đổi, bạn chỉ cần thanh toán tiền nước gas theo bảng giá niêm yết cộng với tiền thế chân vỏ bình 12kg là 250.000đ/vỏ (có ghi phiếu cọc rõ ràng). Sau này khi không dùng nữa, Gas Nhà Mình sẽ thu hồi lại vỏ và hoàn trả 100% tiền cọc cho gia đình.',
      },
      {
        question: 'Đổi từ bình màu Xám sang bình màu Đỏ hoặc bình bọc nhựa PE có phải bù thêm tiền vỏ không?',
        answer: 'Hoàn toàn không phải bù tiền vỏ! Gas Nhà Mình hỗ trợ đổi ngang vỏ bình 12kg miễn phí giữa tất cả các màu và các hãng trong hệ thống, bạn chỉ thanh toán đúng tiền ruột gas của loại bình mới.',
      },
      {
        question: 'Bình gas Petrolimex và bình V-Gas loại nào dùng lâu hết hơn?',
        answer: 'Cả hai dòng bình đều được chiết nạp chuẩn xác đủ 12.0kg khí LPG tại nhà máy nên thời gian đun nấu là tương đương nhau. Để xem giá ưu đãi hôm nay của từng loại, bạn có thể bấm vào mục Bảng giá gas hôm nay trên website.',
      },
    ],
    relatedProductSlugs: [
      'gas-petrolimex-dung-12kg',
      'gas-v-gas-pe-12kg',
      'gas-v-gas-shell-12kg',
      'gas-v-gas-xam-12kg',
      'gas-tuan-khang-vang-12kg',
      'gas-bo-45kg',
    ],
    relatedDistrictSlugs: ['quan-1', 'quan-7', 'quan-8', 'tan-phu', 'binh-thanh', 'thu-duc'],
  },
];

export function getAllGuides(): GuideArticle[] {
  return GUIDES_DATA;
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES_DATA.find((g) => g.slug === slug);
}

export const DISTRICT_STREETS_AND_AREAS: Record<
  string,
  { majorStreets: string[]; residentialAreas: string[] }
> = {
  'quan-1': {
    majorStreets: ['Trần Hưng Đạo', 'Nguyễn Thị Minh Khai', 'Hai Bà Trưng', 'Lê Thánh Tôn', 'Nguyễn Trãi', 'Cống Quỳnh', 'Võ Văn Kiệt', 'Điện Biên Phủ', 'Hoàng Sa'],
    residentialAreas: ['Khu phố Nguyễn Cư Trinh', 'Khu Đa Kao – Tân Định', 'Phố ẩm thực Cô Giang – Cầu Ông Lãnh', 'Khu Bến Thành – Phạm Ngũ Lão'],
  },
  'quan-2': {
    majorStreets: ['Nguyễn Thị Định', 'Trần Não', 'Xa Lộ Hà Nội', 'Mai Chí Thọ', 'Lương Định Của', 'Nguyễn Duy Trinh', 'Đồng Văn Cống', 'Xuân Thủy'],
    residentialAreas: ['Khu đô thị Thảo Điền', 'Khu đô thị An Phú – An Khánh', 'Khu dân cư Bình Trưng Đông – Bình Trưng Tây', 'Khu đô thị Cát Lái – Thạnh Mỹ Lợi'],
  },
  'quan-3': {
    majorStreets: ['Cách Mạng Tháng 8', 'Lê Văn Sỹ', 'Nguyễn Đình Chiểu', 'Võ Văn Tần', 'Nam Kỳ Khởi Nghĩa', 'Hai Bà Trưng', 'Trường Sa', 'Hoàng Sa', 'Điện Biên Phủ'],
    residentialAreas: ['Cư xá Đô Thành (Phường Bàn Cờ)', 'Chung cư Nguyễn Thiện Thuật', 'Khu dân cư Lê Văn Sỹ – Kỳ Đồng', 'Khu Xuân Hòa – Võ Thị Sáu'],
  },
  'quan-4': {
    majorStreets: ['Hoàng Diệu', 'Khánh Hội', 'Tôn Đản', 'Đoàn Văn Bơ', 'Bến Vân Đồn', 'Nguyễn Tất Thành', 'Tân Vĩnh', 'Vĩnh Khánh'],
    residentialAreas: ['Phố ẩm thực Vĩnh Khánh', 'Khu căn hộ dọc Bến Vân Đồn', 'Cư xá Vĩnh Hội', 'Khu dân cư Tôn Đản – Đoàn Văn Bơ'],
  },
  'quan-5': {
    majorStreets: ['Trần Hưng Đạo', 'Nguyễn Trãi', 'An Dương Vương', 'Hồng Bàng', 'Hùng Vương', 'Trần Phú', 'Châu Văn Liêm', 'Nguyễn Tri Phương'],
    residentialAreas: ['Khu phố cổ Chợ Lớn', 'Chung cư Sư Vạn Hạnh – An Đông', 'Khu ẩm thực Hoa Kiều Trần Phú – Nguyễn Trãi', 'Khu Chợ Quán'],
  },
  'quan-6': {
    majorStreets: ['Hậu Giang', 'Kinh Dương Vương', 'Bà Hom', 'Nguyễn Văn Luông', 'Chợ Lớn', 'Đường 32B Cư Xá Bình Phú', 'Phạm Văn Chí', 'Lò Gốm', 'Tân Hòa Đông'],
    residentialAreas: ['Cư xá Bình Phú (Trạm kho Quận 6)', 'Cư xá Phú Lâm A, B, D', 'Khu vực Chợ Bình Tây – Bình Tiên', 'Khu căn hộ Him Lam Chợ Lớn'],
  },
  'quan-7': {
    majorStreets: ['Nguyễn Thị Thập', 'Huỳnh Tấn Phát', 'Nguyễn Văn Linh', 'Lê Văn Lương', 'Trần Xuân Soạn', 'Lâm Văn Bền', 'Nguyễn Hữu Thọ', 'Phạm Hữu Lầu'],
    residentialAreas: ['Khu đô thị Phú Mỹ Hưng', 'Khu dân cư Tân Quy – Tân Kiểng', 'Khu Him Lam Kênh Tẻ', 'Khu dân cư Phú Mỹ – Tân Thuận'],
  },
  'quan-8': {
    majorStreets: ['Phạm Thế Hiển', 'Tạ Quang Bửu', 'Dương Bá Trạc', 'Tùng Thiện Vương', 'Âu Dương Lân', 'Hưng Phú', 'Bến Bình Đông', 'Quốc Lộ 50', 'An Dương Vương'],
    residentialAreas: ['Trạm trung tâm 1009 Phạm Thế Hiển (P. Chánh Hưng)', 'Khu căn hộ Giai Việt – Tạ Quang Bửu', 'Khu dân cư Đồng Diều – Âu Dương Lân', 'Khu Bình Đông – Xóm Củi'],
  },
  'quan-9': {
    majorStreets: ['Lê Văn Việt', 'Đỗ Xuân Hợp', 'Nguyễn Duy Trinh', 'Nguyễn Xiển', 'Lã Xuân Oai', 'Man Thiện', 'Hoàng Hữu Nam', 'Tăng Nhơn Phú'],
    residentialAreas: ['Khu đô thị Vinhomes Grand Park', 'Khu dân cư Phước Long A – Phước Long B', 'Làng Đại học Tăng Nhơn Phú', 'Khu Công Nghệ Cao Quận 9'],
  },
  'quan-10': {
    majorStreets: ['Sư Vạn Hạnh', 'Đường 3 Tháng 2', 'Thành Thái', 'Tô Hiến Thành', 'Lý Thường Kiệt', 'CMT8', 'Bà Hạt', 'Nguyễn Tri Phương', 'Hòa Hảo'],
    residentialAreas: ['Cư xá Bắc Hải', 'Chung cư Ngô Gia Tự – Hòa Hảo', 'Chung cư Nguyễn Kim – Nhật Tảo', 'Khu ẩm thực Sư Vạn Hạnh – Vườn Lài'],
  },
  'quan-11': {
    majorStreets: ['Lạc Long Quân', 'Âu Cơ', 'Lãnh Binh Thăng', 'Ông Ích Khiêm', 'Hàn Hải Nguyên', 'Minh Phụng', 'Ba Tháng Hai', 'Bình Thới', 'Lê Đại Hành'],
    residentialAreas: ['Cư xá Lữ Gia – Phú Thọ', 'Cư xá Bình Thới', 'Khu dân cư Đầm Sen – Hòa Bình', 'Chung cư Phú Thọ – Thuận Việt'],
  },
  'quan-12': {
    majorStreets: ['Nguyễn Ảnh Thủ', 'Lê Văn Khương', 'Hà Huy Giáp', 'Tô Ký', 'Trường Chinh', 'Phan Văn Hớn', 'Nguyễn Văn Quá', 'Lê Thị Riêng', 'Quốc Lộ 1A'],
    residentialAreas: ['Khu dân cư Hiệp Thành City', 'Chung cư Thái An – Nguyễn Văn Quá', 'Khu dân cư Thới An – Thạnh Lộc', 'Khu Tân Thới Nhất – Đông Hưng Thuận'],
  },
  'binh-tan': {
    majorStreets: ['Hương Lộ 2', 'Tỉnh Lộ 10', 'Tên Lửa', 'Kinh Dương Vương', 'Mã Lò', 'Lê Văn Quới', 'Bình Long', 'Tân Kỳ Tân Quý', 'Liên Khu 4-5', 'Võ Văn Vân'],
    residentialAreas: ['Khu đô thị Tên Lửa – Bình Trị Đông B', 'Khu dân cư Vĩnh Lộc (Bình Hưng Hòa B)', 'Chung cư Akari City – Võ Văn Kiệt', 'Khu dân cư Tân Tạo – Ao Đôi'],
  },
  'binh-thanh': {
    majorStreets: ['Xô Viết Nghệ Tĩnh', 'Bạch Đằng', 'Phan Đăng Lưu', 'Đinh Bộ Lĩnh', 'Lê Quang Định', 'Nơ Trang Long', 'Nguyễn Hữu Cảnh', 'Ung Văn Khiêm', 'Phạm Văn Đồng'],
    residentialAreas: ['Khu cư xá Thanh Đa – Bình Quới', 'Khu dân cư Văn Thánh – Thị Nghè', 'Khu Phan Xích Long – Gia Định', 'Khu D2 (Nguyễn Gia Trí) – Pearl Plaza'],
  },
  'go-vap': {
    majorStreets: ['Quang Trung', 'Phan Văn Trị', 'Nguyễn Oanh', 'Lê Đức Thọ', 'Thống Nhất', 'Phạm Văn Chiêu', 'Phan Huy Ích', 'Nguyễn Văn Khối (Cây Trâm)', 'Lê Văn Thọ'],
    residentialAreas: ['Khu đô thị CityLand Park Hills', 'Chung cư Khang Gia – Phan Huy Ích', 'Khu dân cư Hạnh Thông Tây – An Nhơn', 'Khu chợ Xóm Mới – Lê Đức Thọ'],
  },
  'phu-nhuan': {
    majorStreets: ['Phan Xích Long', 'Phan Đăng Lưu', 'Phan Đình Phùng', 'Nguyễn Kiệm', 'Hoàng Văn Thụ', 'Lê Văn Sỹ', 'Huỳnh Văn Bánh', 'Trích Sài', 'Thích Quảng Đức'],
    residentialAreas: ['Phố ẩm thực Phan Xích Long (Phường Cầu Kiệu)', 'Khu dân cư Rạch Miễu', 'Khu Huỳnh Văn Bánh – Đặng Văn Ngữ', 'Khu Nguyễn Trọng Tuyển – Đức Nhuận'],
  },
  'tan-binh': {
    majorStreets: ['Cộng Hòa', 'Trường Chinh', 'Âu Cơ', 'Lạc Long Quân', 'Phổ Quang', 'Hoàng Hoa Thám', 'Lê Văn Sỹ', 'Phạm Văn Bạch', 'Đồng Đen', 'Bàu Cát'],
    residentialAreas: ['Khu đô thị Bàu Cát (Phường Bảy Hiền)', 'Khu K300 – K200 Cộng Hòa', 'Khu sân bay Tân Sơn Nhất – Phổ Quang', 'Khu chợ Phạm Văn Hai – Tân Sơn Hòa'],
  },
  'tan-phu': {
    majorStreets: ['Nguyễn Văn Huyên', 'Lũy Bán Bích', 'Tân Kỳ Tân Quý', 'Tân Sơn Nhì', 'Gò Dầu', 'Vườn Lài', 'Phạm Văn Xảo', 'Hòa Bình', 'Thoại Ngọc Hầu', 'Bình Long'],
    residentialAreas: ['Trạm trung tâm 36 Nguyễn Văn Huyên (P. Phú Thọ Hòa)', 'Khu đô thị Celadon City – Sơn Kỳ', 'Khu dân cư Tân Sơn Nhì – Trương Vĩnh Ký', 'Khu chợ vải Phú Thọ Hòa – Tân Hương'],
  },
  'thu-duc': {
    majorStreets: ['Võ Văn Ngân', 'Kha Vạn Cân', 'Phạm Văn Đồng', 'Tô Ngọc Vân', 'Quốc Lộ 13', 'Hiệp Bình', 'Đặng Văn Bi', 'Hoàng Diệu 2', 'Linh Đông'],
    residentialAreas: ['Khu đô thị Vạn Phúc City (Hiệp Bình Phước)', 'Khu Làng Đại Học Linh Trung – Linh Xuân', 'Khu dân cư Hiệp Bình Chánh – Gigamall', 'Khu Chợ Thủ Đức – Trường Thọ'],
  },
  'binh-chanh': {
    majorStreets: ['Quốc Lộ 50', 'Phạm Hùng nối dài', 'Nguyễn Văn Linh', 'Trần Đại Nghĩa', 'Vĩnh Lộc', 'Quách Điêu', 'Đinh Đức Thiện', 'Trịnh Quang Nghị'],
    residentialAreas: ['Khu dân cư Trung Sơn (Bình Hưng)', 'Khu dân cư Phong Phú 4 – Lovera Park', 'Khu dân cư Vĩnh Lộc A – Vĩnh Lộc B', 'Khu Mizuki Park – Nguyễn Văn Linh'],
  },
  'hoc-mon': {
    majorStreets: ['Nguyễn Thị Hai', 'Phan Văn Hớn', 'Nguyễn Ảnh Thủ', 'Quốc Lộ 22', 'Lê Thị Hà', 'Song Hành', 'Trần Văn Mười', 'Tân Hiệp 18', 'Đặng Thúc Vịnh', 'Dương Công Khi'],
    residentialAreas: ['Trạm Bà Điểm (64A Nguyễn Thị Hai)', 'Trạm Tân Hiệp (111/7H Ấp Thới Tây 2, Tân Hiệp 18)', 'Khu chợ Đầu Mối Hóc Môn', 'Khu dân cư Xuân Thới Thượng – Đông Thạnh'],
  },
  'nha-be': {
    majorStreets: ['Nguyễn Hữu Thọ', 'Huỳnh Tấn Phát', 'Lê Văn Lương', 'Phạm Hữu Lầu', 'Nguyễn Bình', 'Đào Sư Tích', 'Long Thới – Nhơn Đức'],
    residentialAreas: ['Khu căn hộ Hoàng Anh Gia Lai – Nguyễn Hữu Thọ', 'Khu đô thị Zeitgeist / Phú Xuân', 'Khu dân cư Phước Kiển – Làng Đại Học ABC', 'Thị trấn Nhà Bè'],
  },
  'can-gio': {
    majorStreets: ['Rừng Sác', 'Duyên Hải', 'Đào Cử', 'Lương Văn Nho', 'Tắc Xuất'],
    residentialAreas: ['Thị trấn Cần Thạnh', 'Xã Bình Khánh (Phà Bình Khánh)', 'Khu dân cư Long Hòa – Cần Giờ'],
  },
  'cu-chi': {
    majorStreets: ['Quốc Lộ 22 (Xuyên Á)', 'Tỉnh Lộ 8', 'Tỉnh Lộ 15', 'Nguyễn Văn Khạ', 'Lê Minh Nhựt', 'Hà Duy Phiên'],
    residentialAreas: ['Thị trấn Củ Chi', 'Xã Tân Phú Trung (KCN Tân Phú Trung)', 'Xã Bình Mỹ – Hòa Phú (Giáp Hóc Môn)'],
  },
};

export function getDistrictStreetsAndAreas(districtSlug: string) {
  return (
    DISTRICT_STREETS_AND_AREAS[districtSlug] || {
      majorStreets: ['Các trục đường chính trung tâm', 'Các tuyến liên phường và hẻm xe máy'],
      residentialAreas: ['Toàn bộ khu dân cư, chung cư và hộ gia đình trên địa bàn'],
    }
  );
}
