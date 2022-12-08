use db_project;

INSERT STOCK(code, stock_name) 
VALUES
('005930', '삼성전자'),
('000660', 'SK하이닉스'),
('051910', 'LG화학'),
('005380', '현대차'),
('000270', '기아'),
('005490', 'POSCO홀딩스'),
('006400', '삼성SDI'),
('012330', '현대모비스'),
('028260', '삼성물산'),
('035720', '카카오'),
('068270', '셀트리온'),
('207940', '삼성바이오로직스'),
('000880', '한화'),
('009540', '한국조선해양'),
('105560', 'KB금융'),
('035420', 'NAVER'),
('032830', '삼성생명'),
('225570', '넥슨게임즈'),
('003550', 'LG'),
('017670', 'SK텔레콤'),
('036570', '엔씨소프트');

INSERT user(id, pw, name, age, phone, email, money)
VALUES
('aaaaa', '123aaaaa', '홍길동', '21', '01011111111', 'aaaaa@naver.com', '0'),
('bbbbb', '123bbbbb', '최부자', '35', '01022222222', 'bbbbb@naver.com', '0'),
('ccccc', '123ccccc', '박주식', '42', '01033333333', 'ccccc@naver.com', '0'),
('ddddd', '123ddddd', '박준용', '26', '01044444444', 'ddddd@naver.com', '0'),
('eeeee', '123eeeee', '전승권', '51', '01055555555', 'eeeee@naver.com', '0'),
('fffff', '123fffff', '이민석', '33', '01066666666', 'fffff@naver.com', '0'),
('ggggg', '123ggggg', '이세연', '25', '01077777777', 'ggggg@naver.com', '0'),
('hhhhh', '123hhhhh', '이기업', '27', '01088888888', 'hhhhh@naver.com', '0'),
('iiiii', '123iiiii', '김무식', '39', '01099999999', 'iiiii@naver.com', '0'),
('jjjjj', '123jjjjj', '신짱구', '58', '01000000000', 'jjjjj@naver.com', '0'),
('kkkkk', '123kkkkk', '우영우', '26', '01012121212', 'kkkkk@naver.com', '0'),
('lllll', '123lllll', '이수만', '32', '01013131313', 'lllll@naver.com', '0'),
('mmmmm', '123mmmmm', '양현석', '25', '01014141414', 'mmmmm@naver.com', '0');

INSERT COMPANY(code, company_name, stock_count, company_info)
VALUES
('005930', '삼성전자', '5969782550', '한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 233개의 종속기업으로 구성된 글로벌 전자기업임.'),
('000660', 'SK하이닉스', '72800236', '1983년 현대전자로 설립됐고, 2001년 하이닉스반도체를 거쳐 2012년 최대주주가 SK텔레콤으로 바뀌면서 SK하이닉스로 상호를 변경함.'),
('051910', 'LG화학', '7059234', '동사는 석유화학 사업부문, 전지 사업부문, 첨단소재 사업부문, 생명과학 사업부문, 공통 및 기타부문의 사업을 영위하고 있음.'),
('005380', '현대차', '21366818', '동사는 1967년 12월에 설립되어 1974년 6월 28일에 유가증권시장에 상장됨.'),
('000270', '기아', '40536334', '1999년 아시아자동차와 함께 현대자동차에 인수되었고, 기아차판매, 아시아자동차, 기아대전판매, 아시아차판매 등 4개사를 통합함.'),
('005490', 'POSCO홀딩스', '8457123', '동사는 자동차, 조선, 가전 등 산업에 원자재를 공급하는 철강사업(포스코)을 주력으로 영위하고 있으며, 무역/건설/에너지를 포함한 친환경인프라사업(포스코인터내셔널, 포스코건설, 포스코에너지 등)도 운영.'),
('006400', '삼성SDI', '6876453', '동사 사업은 에너지 솔루션 부문과 전자재료 부문으로 분류됨. 에너지 솔루션 부문은 소형전지, 중대형전지 등의 리튬이온 2차 전지를 생산, 판매함.'),
('012330', '현대모비스', '9457309', '동사는 1977년 6월 설립되었으며, 1989년 9월 5일 한국거래소 유가증권시장에 주식을 상장하였음.'),
('028260', '삼성물산', '18688708', '동사는 1938년 설립되었으며 2015년 삼성물산과 제일모직을 합병하였음 .'),
('035720', '카카오', '44531118', '국내 시장 점유율 1위 메신저 카카오톡을 중심으로 커머스, 모빌리티, 페이, 게임, 뮤직, 콘텐츠 등 다양한 영역에서 수익을 창출하고 있음. 매출은 플랫폼 부문 52.3%, 콘텐츠 부문 47.7%로 구성됐음.'),
('068270', '셀트리온','14079186', '동사는 생명공학기술 및 동물세포대량배양기술을 기반으로 항암제 등 각종 단백질 치료제(therapeutic proteins)를 개발, 생산하는 것을 목적사업으로 하고 있음.'),
('207940', '삼성바이오로직스', '7117400', '삼성그룹의 계열사로 2011년 4월 설립되었으며, 국내외 제약회사의 첨단 바이오의약품을 위탁 생산하는 CMO 사업을 영위.'),
('000880', '한화', '7495873', '한화그룹의 지주회사 역할을 하고 있으며 한화생명, 한화에어로스페이스, 한화케미칼 등 계열사 지분 보유, 자체사업은 화약/방산/기계/무역 부문이 있음.'),
('009540', '한국조선해양', '7077311', '지주회사로 다른 회사를 지배함과 동시에 미래기술사업 등을 영위하고 있으며, 주요 종속회사로는 현대중공업, 현대삼호중공업, 현대미포조선 등이 있음.'),
('105560', 'KB금융', '40889706', '2008년 설립된 KB금융그룹의 지주회사로서 업계 선두권의 시장지위와 높은 브랜드 인지도를 바탕으로 은행, 카드, 증권, 생명보험, 손해보험, 저축은행 등 다양한 사업을 영위함.'),
('035420', 'NAVER', '16404908', '동사는 국내 1위 포털 서비스를 기반으로 광고, 쇼핑, 디지털 간편결제 사업을 영위하고 있으며, 공공/금융 분야를 중심으로 클라우드를 비롯한 다양한 IT 인프라 및 기업향 솔루션 제공을 확대해가고 있음.'),
('032830', '삼성생명', '20000000', '1957년에 설립되어 업계 최대의 전속 설계사 조직과 계리 전문인력을 보유하고 있는 삼성그룹 계열의 생명보험사.'),
('225570', '넥슨게임즈', '65761094', '동사는 2013년 5월 6일에 설립된 온라인, 모바일게임 소프트웨어 개발업을 주요 사업으로 영위함.'),
('003550', 'LG', '15730099', '1947년 설립되었으며, LGCI와 LGEI와의 합병을 통해 2003년 3월 순수 지주회사로 전환함.'),
('017670', 'SK텔레콤', '21883314', '동사의 사업은 이동전화, 무선데이터, 정보통신사업 등의 무선통신사업, 전화, 초고속인터넷, 데이터 및 통신망 임대서비스 등을 포함한 유선통신사업, 플랫폼 서비스, 인터넷포털 서비스 등의 기타사업으로 구분됨.'),
('036570', '엔씨소프트', '2195402', "온라인, 모바일 게임을 개발해 운영함. PC게임 '리니지'와 '리니지2', '아이온', '블레이드앤소울', 모바일 게임 '리니지M', '리니지2M', '리니지W' 등이 주요 게임임.");

INSERT stock_p(code, date, n_price, l_price, h_price, e_price, price_count)
VALUES
('000660', '2022-10-31', '84300', '82400', '85400', '83400', '6190029'),
('005380', '2022-10-31', '166000', '162000', '166500', '164000', '612141'),
('005930', '2022-10-31', '58100', '58000', '59900', '57300', '18926454'),
('051910', '2022-10-31', '627000', '609000', '627000', '615000', '740191'),
('207940', '2022-10-31', '884000', '871000', '892000', '876000', '39500');

INSERT user_a(ID, A_num)
VALUES
('aaaaa', '3333123456789'),
('aaaaa', '3021249201259'),
('ccccc', '3521247204918'),
('aaaaa', '100245593010'),
('ddddd', '2112020496017'),
('ddddd', '1021748392019'),
('ddddd', '1234556789012'),
('ggggg', '111122223333'),
('hhhhh', '999998888898'),
('ccccc', '123123456456000'),
('jjjjj', '98765432101234'),
('ggggg', '123567890123'),
('bbbbb', '4568904230122'),
('aaaaa', '58902034302');

INSERT stock_u(ID, code, stock_num, stock_price)
VALUES
('aaaaa', '000660', '35', '2950500'),
('bbbbb', '005380', '10', '1660000'),
('ccccc', '005930', '5', '290500'),
('ddddd', '051910', '1', '627000'),
('eeeee', '207940', '1', '884000'),
('ggggg', '005380', '5', '840000'),
('aaaaa', '005930', '20', '3320000'),
('aaaaa', '005930', '20', '3330000'),
('aaaaa', '005380', '1', '166000'),
('iiiii', '051910', '2', '1254000'),
('jjjjj', '000660', '10', '843000'),
('kkkkk', '005930', '20', '1162000'),
('lllll', '207940', '2', '1768000'),
('mmmmm', '005380', '5', '830000'),
('hhhhh', '005380', '5', '830000'),
('ddddd', '000660', '15', '1264500'),
('kkkkk', '207940', '3', '2652000');

INSERT stock_uz(ID, code)
VALUES
('aaaaa', '000660'),
('bbbbb', '000660'),
('ccccc', '207940'),
('ccccc', '005380'),
('ddddd', '051910'),
('eeeee', '051910'),
('ggggg', '000660'),
('jjjjj', '005380'),
('mmmmm', '000660'),
('mmmmm', '207940'),
('kkkkk', '000660');

INSERT stock_uc(ID, code, time)
VALUES
('aaaaa', '000660', '00:04:20'),
('fffff', '051910', '00:03:20'),
('jjjjj', '005380', '00:00:50'),
('aaaaa', '005380', '00:00:20'),
('kkkkk', '207940', '00:01:52'),
('mmmmm', '005380', '00:02:21'),
('eeeee', '000660', '00:00:55');

INSERT stock_O(code, stock_owner, stock_num, stock_p)
VALUES
('005930', '삼성생명보험 외 15인', '1241176035', '20.79'),
('005930', '국민연금공단', '458637667', '7.68'),
('005930', 'BlackRock Fund Advisors 외 15인', '300391061', '5.03'),
('000660', '에스케이스퀘어 외 9인', '146125674', '20.07'),
('000660', '국민연금공단', '59508387', '8.17'),
('000660', 'The Capital Group Companies Inc.외 33인', '36787079', '5.05'),
('207940', '삼성물산 외 4인', '52935334', '74.37'),
('207940', '국민연금공단', '3986605', '5.6'),
('051910', 'LG 외 2인', '23555557', '33.37'),
('051910', '국민연금공단', '4825752', '6.84'),
('051910', 'LG화학', '367529', '0.52'),
('005380', '현대모비스 외 8인', '62781378', '29.38'),
('005380', '국민연금공단', '16629665', '7.78'),
('005380', '현대차', '14902914', '6.97');

INSERT ADMIN(ID, PW)
VALUES
('admin1', 'admin123!'),
('admin2', 'adminqaz00)'),
('admin3', 'adminppap3#');

INSERT A_BOARD(ID, title, text, name, time, num) 
VALUES
('admin1', '공지사항입니다.', '첫 공지 내용입니다.', '관리자1', '07:30:22', '10'),
('admin2', '탈퇴 회원 명단', 'nnnnn: 부적절한 언어 사용', '관리자2', '10:40:53', '50'),
('admin3', '신규 종목 출시 예정', '종목 Z, 추후 자세한 공지 예정', '관리자3', '16:05:12', '100');

INSERT U_BOARD(ID, t_id, code, title, text, time, num)
VALUES
('aaaaa',  null, '005930', '삼성전자 좋아', '삼전 오른다 ㄷㄷ', '12:20:43', '10'),
('ddddd', null, '207940', '삼바로라고 읽는게 맞음?', '.', '17:54:11', '3'),
('mmmmm', null, '005380', '나 탈퇴당한줄 알았네;', '아이디 너무 비슷해', '11:40:22', '50');

INSERT D_BOARD(ID, t_id, text, time)
VALUES
('aaaaa', '2', '아마 ㅇㅇ', '18:02:43'),
('ddddd', '3', 'ㅋㅋㅋㅋㅋㅋ', '12:30:11'),
('eeeee', '3', '헷갈릴만하네', '12:34:40'),
('kkkkk', '1', '드가자', '12:22:00'),
('mmmmm', '3', '다들 그렇구나ㅋㅋ', '14:30:20');
